/**
 * Idempotent, additive-only migration for the v2 admin panel.
 *
 * Safe to run against the live Supabase Postgres — every statement is
 * guarded (ADD COLUMN IF NOT EXISTS / CREATE TABLE IF NOT EXISTS) so it
 * never drops or rewrites existing data.
 *
 * Adds:
 *   - products.description, products.stock_qty, products.low_stock_threshold
 *   - orders.courier, orders.tracking_number, orders.internal_notes
 *   - table order_status_history  (order timeline)
 *   - table audit_log             (privileged-action log)
 *   - RLS enabled on both new tables (no public policy → PostgREST denies
 *     anon/authenticated; Drizzle via DATABASE_URL is table owner, unaffected)
 *
 * Run: npx tsx --env-file=.env.local scripts/admin-panel-migration.ts
 */
import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing — check .env.local');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function main() {
  console.log('── products: inventory + description columns ──');
  await sql.unsafe(`ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "description" text`);
  await sql.unsafe(`ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "stock_qty" integer`);
  await sql.unsafe(`ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "low_stock_threshold" integer`);
  console.log('  ✓ description, stock_qty, low_stock_threshold');

  console.log('\n── orders: fulfillment + notes columns ──');
  await sql.unsafe(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "courier" text`);
  await sql.unsafe(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "tracking_number" text`);
  await sql.unsafe(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "internal_notes" text`);
  console.log('  ✓ courier, tracking_number, internal_notes');

  console.log('\n── order_status_history table ──');
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "order_status_history" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "order_id" uuid NOT NULL REFERENCES "orders"("id") ON DELETE CASCADE,
      "from_status" text,
      "to_status" text NOT NULL,
      "note" text,
      "actor_email" text,
      "created_at" timestamptz NOT NULL DEFAULT now()
    )
  `);
  await sql.unsafe(
    `CREATE INDEX IF NOT EXISTS "order_status_history_order_idx" ON "order_status_history" ("order_id","created_at")`,
  );
  console.log('  ✓ order_status_history (+ index)');

  console.log('\n── audit_log table ──');
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "audit_log" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "actor_email" text,
      "action" text NOT NULL,
      "entity_type" text NOT NULL,
      "entity_id" text,
      "meta" jsonb,
      "created_at" timestamptz NOT NULL DEFAULT now()
    )
  `);
  await sql.unsafe(
    `CREATE INDEX IF NOT EXISTS "audit_log_created_idx" ON "audit_log" ("created_at")`,
  );
  await sql.unsafe(
    `CREATE INDEX IF NOT EXISTS "audit_log_entity_idx" ON "audit_log" ("entity_type","entity_id")`,
  );
  console.log('  ✓ audit_log (+ indexes)');

  console.log('\n── RLS on new tables (deny anon PostgREST; owner unaffected) ──');
  for (const t of ['order_status_history', 'audit_log']) {
    await sql.unsafe(`ALTER TABLE "${t}" ENABLE ROW LEVEL SECURITY`);
    console.log(`  ✓ ${t}`);
  }

  console.log('\n── verification ──');
  const cols = await sql<Array<{ table_name: string; column_name: string }>>`
    SELECT table_name, column_name
    FROM information_schema.columns
    WHERE table_schema = 'public'
      AND ((table_name = 'products' AND column_name IN ('description','stock_qty','low_stock_threshold'))
        OR (table_name = 'orders' AND column_name IN ('courier','tracking_number','internal_notes')))
    ORDER BY table_name, column_name
  `;
  for (const c of cols) console.log(`  ${c.table_name}.${c.column_name}`);

  const tables = await sql<Array<{ tablename: string; rowsecurity: boolean }>>`
    SELECT tablename, rowsecurity FROM pg_tables
    WHERE schemaname = 'public' AND tablename IN ('order_status_history','audit_log')
  `;
  for (const t of tables) console.log(`  ${t.tablename} (RLS=${t.rowsecurity})`);

  await sql.end();
  console.log('\n✓ migration complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
