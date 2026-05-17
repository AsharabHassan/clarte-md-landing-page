/**
 * Creates the admin user in Supabase Auth using the service-role key.
 * Idempotent — if a user with the same email already exists, it just
 * resets the password to the env value.
 *
 * Run: npx tsx --env-file=.env.local scripts/create-admin-user.ts
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;

if (!url || !serviceKey || !email || !password) {
  console.error('Missing env: NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADMIN_EMAIL, ADMIN_PASSWORD');
  process.exit(1);
}

const supa = createClient(url, serviceKey, { auth: { persistSession: false } });

async function main() {
  // Look up by email first to keep this idempotent
  const { data: listed, error: listErr } = await supa.auth.admin.listUsers({ page: 1, perPage: 100 });
  if (listErr) throw listErr;

  const existing = listed?.users?.find((u) => u.email === email);

  if (existing) {
    console.log(`User exists (id=${existing.id}) — resetting password`);
    const { error } = await supa.auth.admin.updateUserById(existing.id, {
      password,
      email_confirm: true,
    });
    if (error) throw error;
    console.log('✓ Password reset, email confirmed');
  } else {
    console.log(`Creating new admin user ${email}`);
    const { data, error } = await supa.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
    });
    if (error) throw error;
    console.log(`✓ Created user id=${data.user?.id}`);
  }

  process.exit(0);
}

main().catch((e) => {
  console.error('Failed:', e);
  process.exit(1);
});
