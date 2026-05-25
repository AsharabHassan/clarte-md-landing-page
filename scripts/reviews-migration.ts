/**
 * Idempotent migration for customer reviews + approval workflow.
 *
 *   - CREATE TABLE reviews (status defaults to 'pending')
 *   - RLS on (deny anon PostgREST; Drizzle owner unaffected)
 *   - Backfill the existing hand-curated reviews from
 *     lib/marketing/reviews.ts as status='approved', source='seed'
 *     (they're the current live, curated set — keep the site populated).
 *
 * Re-running never duplicates the seed (guarded by a deterministic check).
 * Run: npx tsx --env-file=.env.local scripts/reviews-migration.ts
 */
import { config } from 'dotenv';
import postgres from 'postgres';
import { REVIEWS } from '../lib/marketing/reviews';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing — check .env.local');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function main() {
  console.log('── reviews table ──');
  await sql.unsafe(`
    CREATE TABLE IF NOT EXISTS "reviews" (
      "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
      "customer_id" uuid REFERENCES "customers"("id") ON DELETE SET NULL,
      "name" text NOT NULL,
      "location" text,
      "rating" integer NOT NULL,
      "protocol" text,
      "body" text NOT NULL,
      "verified" boolean NOT NULL DEFAULT false,
      "photos" jsonb,
      "status" text NOT NULL DEFAULT 'pending',
      "source" text,
      "review_date" timestamptz NOT NULL DEFAULT now(),
      "client_ip_hash" text,
      "created_at" timestamptz NOT NULL DEFAULT now(),
      "updated_at" timestamptz NOT NULL DEFAULT now()
    )
  `);
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS "reviews_status_idx" ON "reviews" ("status","review_date")`);
  await sql.unsafe(`ALTER TABLE "reviews" ENABLE ROW LEVEL SECURITY`);
  console.log('  ✓ reviews (+ index, RLS)');

  console.log('\n── backfill seed reviews (status=approved) ──');
  let inserted = 0;
  for (const r of REVIEWS) {
    // Dedupe on (name, review_date, source=seed) so re-runs don't duplicate.
    const existing = await sql`
      SELECT 1 FROM reviews WHERE source = 'seed' AND name = ${r.name} AND review_date = ${r.date} LIMIT 1`;
    if (existing.length > 0) {
      console.log(`  ↺ ${r.name} (${r.date}) already seeded`);
      continue;
    }
    await sql`
      INSERT INTO reviews (name, location, rating, protocol, body, verified, photos, status, source, review_date)
      VALUES (
        ${r.name}, ${r.location}, ${r.rating}, ${r.protocol ?? null}, ${r.body},
        ${r.verified ?? false}, ${r.photos ? JSON.stringify(r.photos) : null}::jsonb,
        'approved', 'seed', ${r.date}
      )`;
    inserted++;
    console.log(`  ✓ ${r.name} (${r.protocol ?? '—'})`);
  }
  console.log(`  inserted ${inserted} seed review(s)`);

  console.log('\n── verification ──');
  const rows = await sql<Array<{ status: string; c: number }>>`
    SELECT status, count(*)::int AS c FROM reviews GROUP BY status ORDER BY status`;
  for (const r of rows) console.log(`  ${r.status.padEnd(12)} ${r.c}`);

  await sql.end();
  console.log('\n✓ reviews migration complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
