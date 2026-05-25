import { NextResponse } from 'next/server';
import { PORTAL_COOKIE, portalCookieOptions } from '@/lib/auth/portal';

export async function POST() {
  const res = NextResponse.json({ ok: true });
  // Expire the cookie immediately.
  res.cookies.set(PORTAL_COOKIE, '', portalCookieOptions(0));
  return res;
}
