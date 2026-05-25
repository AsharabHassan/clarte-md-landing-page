/**
 * Idempotent, additive migration for the Customers module.
 *
 *   - CREATE TABLE customers (phone unique)
 *   - ADD orders.customer_id  (uuid FK → customers.id, ON DELETE SET NULL)
 *   - Backfill: one customer per distinct order phone, using that phone's
 *     most-recent order for the profile fields.
 *   - Link existing orders to the backfilled customers by phone.
 *   - RLS on customers (deny anon PostgREST; Drizzle owner unaffected).
 *
 * Safe to re-run. Run:
 *   npx tsx --env-file=.env.local scripts/customers-migration.ts
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
  console.log('── customers table ──');
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "customers" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "name" text NOT NULL,
      "phone" text NOT NULL UNIQUE,
      "email" text,
      "address" text,
      "city" text,
      "postal" text,
      "notes" text,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `);
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS "customers_email_idx" ON "customers" ("email")`);
  console.log('  ✓ customers (+ email index)');

  console.log('\n── orders.customer_id column + FK ──');
  await sql.unsafe(`ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "customer_id" uuid`);
  // Add the FK only if it doesn't already exist.
  await sql.unsafe(`
    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints
        WHERE constraint_name = 'orders_customer_id_fkey' AND table_name = 'orders'
      ) THEN
        ALTER TABLE "orders"
          ADD CONSTRAINT "orders_customer_id_fkey"
          FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE SET NULL;
      END IF;
    END $$;
  `);
  console.log('  ✓ orders.customer_id (+ FK, SET NULL)');

  console.log('\n── backfill customers from orders (latest order per phone) ──');
  // DISTINCT ON picks the most-recent order row per phone for the profile.
  const inserted = await sql.unsafe(`
    INSERT INTO "customers" (name, phone, email, address, city, postal, created_at)
    SELECT DISTINCT ON (customer_phone)
      customer_name, customer_phone, customer_email, shipping_address, shipping_city, shipping_postal, created_at
    FROM "orders"
    WHERE customer_phone IS NOT NULL AND customer_phone <> ''
    ORDER BY customer_phone, created_at DESC
    ON CONFLICT (phone) DO NOTHING
    RETURNING id
  `);
  console.log(`  ✓ inserted ${inserted.count} customer profile(s)`);

  console.log('\n── link orders to customers by phone ──');
  const linked = await sql.unsafe(`
    UPDATE "orders" o
    SET customer_id = c.id
    FROM "customers" c
    WHERE o.customer_phone = c.phone AND o.customer_id IS NULL
  `);
  console.log(`  ✓ linked ${linked.count} order(s)`);

  console.log('\n── RLS on customers ──');
  await sql.unsafe(`ALTER TABLE "customers" ENABLE ROW LEVEL SECURITY`);
  console.log('  ✓ customers (RLS on)');

  console.log('\n── verification ──');
  const counts = await sql<Array<{ customers: number; linked: number }>>`
    SELECT
      (SELECT count(*)::int FROM customers) AS customers,
      (SELECT count(*)::int FROM orders WHERE customer_id IS NOT NULL) AS linked
  `;
  console.log(`  customers=${counts[0].customers} · linked orders=${counts[0].linked}`);

  await sql.end();
  console.log('\n✓ customers migration complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
