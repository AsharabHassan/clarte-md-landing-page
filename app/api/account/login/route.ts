import { NextRequest, NextResponse } from 'next/server';
import { sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { PortalLoginSchema } from '@/lib/validators/portal';
import { extractClientIp, hashIp } from '@/lib/ai/rate-limit';
import {
  signPortalToken,
  normalizePhone,
  PORTAL_COOKIE,
  PORTAL_COOKIE_MAX_AGE,
  portalCookieOptions,
} from '@/lib/auth/portal';
import type { Customer } from '@/lib/db/schema';

// Per-IP login attempt ceiling per hour. Logged into order_lookups
// (a generic per-IP "lookup attempt" log) so we don't need a new table.
const PORTAL_LOGIN_LIMIT = 15;

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  const parsed = PortalLoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'Enter a valid phone and email.' }, { status: 400 });
  }
  const { phone, email } = parsed.data;

  const ipHash = hashIp(extractClientIp(req.headers));
  const recent = (await db.execute(sql`
    SELECT count(*)::int AS c FROM order_lookups
    WHERE client_ip_hash = ${ipHash}
      AND created_at > now() - interval '1 hour'
      AND target_order_number LIKE 'portal-login:%'
  `)) as unknown as Array<{ c: number }>;
  if (Number(recent[0]?.c ?? 0) >= PORTAL_LOGIN_LIMIT) {
    return NextResponse.json(
      { ok: false, error: 'Too many attempts. Please wait an hour or WhatsApp us.' },
      { status: 429 },
    );
  }

  const wantPhone = normalizePhone(phone);
  const candidates = (await db
    .select()
    .from(schema.customers)
    .where(sql`lower(${schema.customers.email}) = ${email.toLowerCase()}`)
    .limit(20)) as Customer[];

  const customer = candidates.find((c) => normalizePhone(c.phone) === wantPhone) ?? null;

  // Log every attempt (found or not) for per-IP rate-limiting.
  await db.insert(schema.orderLookups).values({
    clientIpHash: ipHash,
    targetOrderNumber: `portal-login:${wantPhone.slice(-4)}`,
    found: !!customer,
  });

  if (!customer) {
    return NextResponse.json(
      { ok: false, error: "We couldn't match that phone and email. Use the details from your order." },
      { status: 401 },
    );
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(
    PORTAL_COOKIE,
    signPortalToken(customer.id),
    portalCookieOptions(PORTAL_COOKIE_MAX_AGE),
  );
  return res;
}
