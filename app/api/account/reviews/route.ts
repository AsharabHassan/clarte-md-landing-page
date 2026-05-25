import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { PortalReviewSchema } from '@/lib/validators/portal';
import { getPortalCustomer } from '@/lib/auth/portal';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { extractClientIp, hashIp } from '@/lib/ai/rate-limit';
import type { ReviewPhoto } from '@/lib/marketing/reviews';

const REVIEW_LIMIT_PER_HOUR = 5;
const MAX_PHOTOS = 3;
const MAX_BYTES = 8 * 1024 * 1024;
const EXT: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
};

export async function POST(req: NextRequest) {
  const customer = await getPortalCustomer();
  if (!customer) return NextResponse.json({ ok: false, error: 'Please sign in first.' }, { status: 401 });

  const raw = await req.json().catch(() => null);
  const parsed = PortalReviewSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: parsed.error.issues[0]?.message ?? 'Please add a rating and at least a sentence or two.' },
      { status: 400 },
    );
  }

  const ipHash = hashIp(extractClientIp(req.headers));
  const recent = (await db.execute(sql`
    SELECT count(*)::int AS c FROM reviews
    WHERE client_ip_hash = ${ipHash} AND created_at > now() - interval '1 hour'
  `)) as unknown as Array<{ c: number }>;
  if (Number(recent[0]?.c ?? 0) >= REVIEW_LIMIT_PER_HOUR) {
    return NextResponse.json(
      { ok: false, error: 'You’ve submitted several reviews recently — please try again later.' },
      { status: 429 },
    );
  }

  // ── Optional photo uploads → public review-photos bucket ──────────────
  // Body shape: images: [{ base64, mime }]. Best-effort: a single bad/oversized
  // image is skipped rather than failing the whole submission.
  const photos: ReviewPhoto[] = [];
  const images: Array<{ base64?: string; mime?: string }> = Array.isArray(raw?.images)
    ? raw.images.slice(0, MAX_PHOTOS)
    : [];
  if (images.length > 0) {
    const supa = createSupabaseAdminClient();
    for (const img of images) {
      const ext = img.mime ? EXT[img.mime] : undefined;
      if (!img.base64 || !ext) continue;
      let buf: Buffer;
      try {
        buf = Buffer.from(img.base64, 'base64');
      } catch {
        continue;
      }
      if (buf.length === 0 || buf.length > MAX_BYTES) continue;
      const path = `reviews/${customer.id}/${randomUUID()}.${ext}`;
      const { error } = await supa.storage
        .from('review-photos')
        .upload(path, buf, { contentType: img.mime, upsert: false });
      if (error) {
        console.error('review photo upload failed', error.message);
        continue;
      }
      const { data } = supa.storage.from('review-photos').getPublicUrl(path);
      if (data?.publicUrl) {
        photos.push({ src: data.publicUrl, alt: `${customer.name} — review photo` });
      }
    }
  }

  // Resolve the selected label to a structured subject so it surfaces on
  // the right page: a product (by sku) or a protocol (by slug), else general.
  let subjectType = 'general';
  let subjectRef: string | null = null;
  const label = parsed.data.protocol?.trim();
  if (label) {
    const [prod] = await db
      .select({ sku: schema.products.sku })
      .from(schema.products)
      .where(sql`lower(${schema.products.name}) = ${label.toLowerCase()}`)
      .limit(1);
    if (prod) {
      subjectType = 'product';
      subjectRef = prod.sku;
    } else {
      const [bundle] = await db
        .select({ slug: schema.bundles.slug })
        .from(schema.bundles)
        .where(sql`lower(${schema.bundles.name}) = ${label.toLowerCase()}`)
        .limit(1);
      if (bundle) {
        subjectType = 'protocol';
        subjectRef = bundle.slug;
      }
    }
  }

  await db.insert(schema.reviews).values({
    customerId: customer.id,
    name: customer.name,
    location: customer.city ?? null,
    rating: parsed.data.rating,
    protocol: parsed.data.protocol ?? null, // a protocol OR a single product name (display label)
    subjectType,
    subjectRef,
    body: parsed.data.body,
    photos: photos.length > 0 ? photos : null,
    verified: true,
    status: 'pending', // requires admin approval before publishing
    source: 'portal',
    clientIpHash: ipHash,
  });

  return NextResponse.json({ ok: true });
}
