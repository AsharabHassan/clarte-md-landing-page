import type { User } from '@supabase/supabase-js';

/**
 * Admin roles (RBAC). Stored on the Supabase user as
 * `app_metadata.role`. The originally-seeded single admin has no role
 * set, so we DEFAULT to 'owner' — this keeps the existing login working
 * with full access while letting v2 add scoped staff later.
 *
 * Set a role with the service-role key, e.g.:
 *   supa.auth.admin.updateUserById(id, { app_metadata: { role: 'ops' } })
 * (see scripts/set-admin-role.ts).
 */
export const ADMIN_ROLES = ['owner', 'ops', 'clinical'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

export const DEFAULT_ROLE: AdminRole = 'owner';

export function getUserRole(user: Pick<User, 'app_metadata'> | null | undefined): AdminRole {
  const raw = user?.app_metadata?.role;
  return ADMIN_ROLES.includes(raw as AdminRole) ? (raw as AdminRole) : DEFAULT_ROLE;
}

/**
 * Which roles may access each admin area. Owner can do everything.
 * Ops handles orders/fulfillment. Clinical reviews AI + (future) intake.
 */
export const AREA_ACCESS = {
  dashboard: ['owner', 'ops', 'clinical'],
  orders: ['owner', 'ops'],
  customers: ['owner', 'ops'],
  reviews: ['owner', 'ops'],
  products: ['owner'],
  protocols: ['owner'],
  ai: ['owner', 'clinical'],
  subscribers: ['owner'],
} as const satisfies Record<string, readonly AdminRole[]>;

export type AdminArea = keyof typeof AREA_ACCESS;

export function canAccess(role: AdminRole, area: AdminArea): boolean {
  return (AREA_ACCESS[area] as readonly AdminRole[]).includes(role);
}

/**
 * Destructive deletes (customer profiles, orders) are restricted to the
 * owner even within an area that ops can otherwise view/edit.
 */
export function canDelete(role: AdminRole): boolean {
  return role === 'owner';
}

/** Human label for a role, used in the admin chrome. */
export function roleLabel(role: AdminRole): string {
  switch (role) {
    case 'owner':
      return 'Owner';
    case 'ops':
      return 'Operations';
    case 'clinical':
      return 'Clinical';
  }
}
