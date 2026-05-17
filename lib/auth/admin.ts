import { NextResponse } from 'next/server';
import { createSupabaseServerClient } from '@/lib/supabase/server';

/**
 * Thrown by requireAdminSession() when no valid session is found.
 * Route handlers should catch and return `unauthorizedResponse()`;
 * Server Components should redirect to /admin/login.
 */
export class UnauthorizedError extends Error {
  constructor() {
    super('Unauthorized');
    this.name = 'UnauthorizedError';
  }
}

/**
 * Verify the request comes from a logged-in admin user.
 *
 * v1 has a single admin (the one seeded via ADMIN_EMAIL/ADMIN_PASSWORD)
 * so a valid Supabase Auth session is sufficient — no role check needed.
 * When v2 adds multiple users with mixed roles, add a role lookup here
 * (e.g. `data.user.app_metadata.role === 'admin'`).
 */
export async function requireAdminSession() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new UnauthorizedError();
  }
  return data.user;
}

/** Standard 401 response shape for API routes. */
export function unauthorizedResponse() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
}
