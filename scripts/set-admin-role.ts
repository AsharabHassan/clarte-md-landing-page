/**
 * Assign an admin RBAC role to a Supabase user (stored in
 * app_metadata.role). Roles: owner | ops | clinical.
 *
 * The originally-seeded admin needs no role (defaults to 'owner'); use
 * this only when adding scoped staff.
 *
 * Run: npx tsx --env-file=.env.local scripts/set-admin-role.ts <email> <role>
 */
import { createClient } from '@supabase/supabase-js';
import { ADMIN_ROLES } from '../lib/auth/roles';

const [, , email, role] = process.argv;
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY');
  process.exit(1);
}
if (!email || !role || !(ADMIN_ROLES as readonly string[]).includes(role)) {
  console.error(`Usage: set-admin-role.ts <email> <${ADMIN_ROLES.join('|')}>`);
  process.exit(1);
}

const supa = createClient(url, serviceKey, { auth: { persistSession: false } });

async function main() {
  const { data: listed, error: listErr } = await supa.auth.admin.listUsers({ page: 1, perPage: 200 });
  if (listErr) throw listErr;
  const user = listed?.users?.find((u) => u.email === email);
  if (!user) {
    console.error(`No user with email ${email}`);
    process.exit(1);
  }
  const { error } = await supa.auth.admin.updateUserById(user.id, {
    app_metadata: { ...user.app_metadata, role },
  });
  if (error) throw error;
  console.log(`✓ ${email} → role=${role}`);
  process.exit(0);
}

main().catch((e) => {
  console.error('Failed:', e);
  process.exit(1);
});
