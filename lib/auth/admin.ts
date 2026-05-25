import { NextResponse } from 'next/server';
import type { User } from '@supabase/supabase-js';
import { createSupabaseServerClient } from '@/lib/supabase/server';
import { getUserRole, type AdminRole } from '@/lib/auth/roles';

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
 * Thrown when a user is authenticated but lacks the required role.
 * Route handlers return `forbiddenResponse()`; Server Components render
 * a "no access" view (or redirect to the dashboard they CAN see).
 */
export class ForbiddenError extends Error {
  constructor() {
    super('Forbidden');
    this.name = 'ForbiddenError';
  }
}

/**
 * Verify the request comes from a logged-in admin user, and (optionally)
 * that the user holds one of `allowedRoles`.
 *
 * The originally-seeded admin has no `app_metadata.role`, so it defaults
 * to 'owner' (see lib/auth/roles.ts) — i.e. full access, unchanged from
 * v1 behaviour. Passing `allowedRoles` is what scopes the new staff roles.
 */
export async function requireAdminSession(allowedRoles?: readonly AdminRole[]): Promise<User> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    throw new UnauthorizedError();
  }
  if (allowedRoles && allowedRoles.length > 0) {
    const role = getUserRole(data.user);
    if (!allowedRoles.includes(role)) {
      throw new ForbiddenError();
    }
  }
  return data.user;
}

/** Standard 401 response shape for API routes. */
export function unauthorizedResponse() {
  return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
}

/** Standard 403 response shape for API routes. */
export function forbiddenResponse() {
  return NextResponse.json({ ok: false, error: 'Forbidden' }, { status: 403 });
}

/**
 * Guard helper for API route handlers: runs `requireAdminSession` and
 * maps the auth/role errors to the right JSON response. Returns the
 * authenticated user on success, or a NextResponse to return on failure.
 */
export async function guardAdminApi(
  allowedRoles?: readonly AdminRole[],
): Promise<{ user: User } | { response: NextResponse }> {
  try {
    const user = await requireAdminSession(allowedRoles);
    return { user };
  } catch (e) {
    if (e instanceof ForbiddenError) return { response: forbiddenResponse() };
    if (e instanceof UnauthorizedError) return { response: unauthorizedResponse() };
    throw e;
  }
}
