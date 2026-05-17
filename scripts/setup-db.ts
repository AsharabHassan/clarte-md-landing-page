/**
 * Idempotent Supabase Postgres setup that runs AFTER `npm run db:push`.
 *
 * drizzle-kit push handles tables/columns/indexes/FKs from the Drizzle
 * schema. It does NOT handle the rest of what we need:
 *   1. Row Level Security (denies anon access via Supabase's PostgREST)
 *   2. Public read policies on catalog tables (so the storefront can read
 *      products/bundles/bundle_items without using service_role in the browser)
 *   3. The Postgres sequence `order_seq` used by lib/orders/order-number.ts
 *
 * This script applies all of the above and is safe to re-run.
 *
 * Run: npx tsx scripts/setup-db.ts
 */
import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing — check .env.local');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL);

const ALL_TABLES = [
  'products',
  'bundles',
  'bundle_items',
  'orders',
  'order_items',
  'ai_sessions',
] as const;

const CATALOG_POLICIES = [
  { table: 'products', policy: 'products_public_read' },
  { table: 'bundles', policy: 'bundles_public_read' },
  { table: 'bundle_items', policy: 'bundle_items_public_read' },
] as const;

async function main() {
  console.log('── enabling RLS on all 6 tables ──');
  for (const t of ALL_TABLES) {
    await sql.unsafe(`ALTER TABLE "${t}" ENABLE ROW LEVEL SECURITY`);
    console.log(`  ✓ ${t}`);
  }

  console.log('\n── creating order number sequence ──');
  await sql`CREATE SEQUENCE IF NOT EXISTS order_seq START 1`;
  console.log('  ✓ order_seq');

  console.log('\n── public read policies on catalog tables ──');
  for (const { table, policy } of CATALOG_POLICIES) {
    await sql.unsafe(`DROP POLICY IF EXISTS "${policy}" ON "${table}"`);
    await sql.unsafe(
      `CREATE POLICY "${policy}" ON "${table}" FOR SELECT TO anon, authenticated USING (true)`,
    );
    console.log(`  ✓ ${policy} on ${table}`);
  }

  console.log('\n── verification ──');
  const tableState = await sql<Array<{ tablename: string; rowsecurity: boolean }>>`
    SELECT tablename, rowsecurity
    FROM pg_tables
    WHERE schemaname = 'public'
    ORDER BY tablename
  `;
  for (const r of tableState) {
    console.log(`  ${r.tablename.padEnd(15)} RLS=${r.rowsecurity}`);
  }

  const policies = await sql<Array<{ tablename: string; policyname: string }>>`
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
    ORDER BY tablename, policyname
  `;
  console.log(`\n${policies.length} policies:`);
  for (const p of policies) {
    console.log(`  ${p.tablename} → ${p.policyname}`);
  }

  const seq = await sql<Array<{ sequencename: string }>>`
    SELECT sequencename FROM pg_sequences WHERE schemaname = 'public'
  `;
  console.log(`\n${seq.length} sequences: ${seq.map((s) => s.sequencename).join(', ') || '(none)'}`);

  await sql.end();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
