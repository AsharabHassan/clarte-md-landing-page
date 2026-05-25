import { createHmac, timingSafeEqual } from 'node:crypto';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import type { Customer } from '@/lib/db/schema';

/**
 * Lightweight customer portal session — no external auth provider.
 *
 * A customer proves identity with the phone + email they used at
 * checkout (see /api/account/login). We then issue a stateless,
 * HMAC-signed, HTTP-only cookie of the form `<customerId>.<exp>.<sig>`.
 * No password store, no DB session table — the signature is the
 * tamper-proofing and `exp` is the lifetime. Moderate security, suited
 * to a COD store's order portal (not financial-grade).
 *
 * Secret: PORTAL_SESSION_SECRET if set, else the existing IP_HASH_PEPPER
 * (already a 32-byte secret) so this works with zero new config.
 */
export const PORTAL_COOKIE = 'clarte_portal';
export const PORTAL_COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

function secret(): string {
  const s = process.env.PORTAL_SESSION_SECRET || process.env.IP_HASH_PEPPER;
  if (!s) throw new Error('PORTAL_SESSION_SECRET or IP_HASH_PEPPER required');
  return s;
}

export function signPortalToken(customerId: string, ttlSec = PORTAL_COOKIE_MAX_AGE): string {
  const exp = Math.floor(Date.now() / 1000) + ttlSec;
  const payload = `${customerId}.${exp}`;
  const sig = createHmac('sha256', secret()).update(payload).digest('hex');
  return `${payload}.${sig}`;
}

export function verifyPortalToken(token: string | undefined | null): string | null {
  if (!token) return null;
  const parts = token.split('.');
  if (parts.length !== 3) return null;
  const [id, expStr, sig] = parts;
  const expected = createHmac('sha256', secret()).update(`${id}.${expStr}`).digest('hex');
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp * 1000 < Date.now()) return null;
  return id;
}

/** Cookie attributes shared by login (set) and logout (clear). */
export function portalCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge,
  };
}

/** Read + verify the session cookie and load the customer (or null). */
export async function getPortalCustomer(): Promise<Customer | null> {
  const store = await cookies();
  const id = verifyPortalToken(store.get(PORTAL_COOKIE)?.value);
  if (!id) return null;
  const [c] = await db.select().from(schema.customers).where(eq(schema.customers.id, id)).limit(1);
  return c ?? null;
}

/** Server-component guard: redirect to login when not signed in. */
export async function requirePortalCustomer(): Promise<Customer> {
  const c = await getPortalCustomer();
  if (!c) redirect('/account/login');
  return c;
}

/**
 * Normalise a Pakistani phone to its bare 10-digit subscriber number so
 * "0300 1234567", "+92 300 1234567", "923001234567" all compare equal.
 */
export function normalizePhone(input: string): string {
  let d = (input || '').replace(/\D/g, '');
  if (d.startsWith('92')) d = d.slice(2);
  if (d.startsWith('0')) d = d.slice(1);
  return d.slice(-10);
}
