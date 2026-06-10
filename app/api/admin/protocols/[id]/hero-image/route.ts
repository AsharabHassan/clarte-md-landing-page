import { NextRequest, NextResponse } from 'next/server';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { guardAdminApi } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { createSupabaseAdminClient } from '@/lib/supabase/server';
import { recordAudit } from '@/lib/audit/log';

const BUCKET = 'protocol-heroes';
const MAX_BYTES = 8 * 1024 * 1024;

export async function POST(
  req: NextRequest,
  ctx: { params: Promise<{ id: string }> },
) {
  const guard = await guardAdminApi(AREA_ACCESS.protocols);
  if ('response' in guard) return guard.response;

  const { id } = await ctx.params;
  const [bundle] = await db
    .select()
    .from(schema.bundles)
    .where(eq(schema.bundles.id, id))
    .limit(1);
  if (!bundle) return NextResponse.json({ ok: false, error: 'Not found' }, { status: 404 });

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid form data' }, { status: 400 });
  }

  const file = formData.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ ok: false, error: 'No file provided' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ ok: false, error: 'File must be an image (JPEG, PNG, or WebP)' }, { status: 400 });
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ ok: false, error: 'Image must be under 8 MB' }, { status: 413 });
  }

  const ext = file.type === 'image/webp' ? 'webp' : file.type === 'image/png' ? 'png' : 'jpg';
  // Always overwrite the same path so there's one canonical hero per protocol.
  const storagePath = `${bundle.slug}/hero.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());

  const supa = createSupabaseAdminClient();
  const { error: uploadError } = await supa.storage
    .from(BUCKET)
    .upload(storagePath, bytes, { contentType: file.type, upsert: true });

  if (uploadError) {
    console.error('[hero-image] Supabase upload failed', uploadError);
    return NextResponse.json(
      { ok: false, error: 'Storage upload failed. Make sure the "protocol-heroes" bucket exists in Supabase and is set to public.' },
      { status: 500 },
    );
  }

  const { data: urlData } = supa.storage.from(BUCKET).getPublicUrl(storagePath);

  await db
    .update(schema.bundles)
    .set({ heroImageUrl: urlData.publicUrl, updatedAt: new Date() })
    .where(eq(schema.bundles.id, id));

  await recordAudit({
    actorEmail: guard.user.email ?? null,
    action: 'protocol.hero_image_updated',
    entityType: 'bundle',
    entityId: id,
    meta: { slug: bundle.slug, path: storagePath },
  });

  return NextResponse.json({ ok: true, url: urlData.publicUrl });
}
