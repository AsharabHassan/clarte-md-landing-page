import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { PortalReviewSchema } from '@/lib/validators/portal';
import { getPortalCustomer } from '@/lib/auth/portal';
import { extractClientIp, hashIp } from '@/lib/ai/rate-limit';

// A customer may submit at most this many reviews per hour (anti-spam).
const REVIEW_LIMIT_PER_HOUR = 5;

export async function POST(req: NextRequest) {
  const customer = await getPortalCustomer();
  if (!customer) return NextResponse.json({ ok: false, error: 'Please sign in first.' }, { status: 401 });

  const body = await req.json().catch(() => null);
  const parsed = PortalReviewSchema.safeParse(body);
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

  // Name/location come from the verified customer profile, not the form.
  await db.insert(schema.reviews).values({
    customerId: customer.id,
    name: customer.name,
    location: customer.city ?? null,
    rating: parsed.data.rating,
    protocol: parsed.data.protocol ?? null,
    body: parsed.data.body,
    verified: true, // signed-in customer
    status: 'pending', // requires admin approval before publishing
    source: 'portal',
    clientIpHash: ipHash,
  });

  return NextResponse.json({ ok: true });
}
