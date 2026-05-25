/**
 * Idempotent: add reviews.subject_type + subject_ref so reviews can be
 * surfaced on the right product/protocol page, and backfill existing rows
 * from their free-text `protocol` label.
 *
 * Run: npx tsx --env-file=.env.local scripts/reviews-subject-migration.ts
 */
import { config } from 'dotenv';
import postgres from 'postgres';

config({ path: '.env.local' });
if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing');
  process.exit(1);
}
const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function main() {
  console.log('── add columns + index ──');
  await sql.unsafe(`ALTER TABLE "reviews" ADD COLUMN IF NOT EXISTS "subject_type" text`);
  await sql.unsafe(`ALTER TABLE "reviews" ADD COLUMN IF NOT EXISTS "subject_ref" text`);
  await sql.unsafe(`CREATE INDEX IF NOT EXISTS "reviews_subject_idx" ON "reviews" ("subject_type","subject_ref","status")`);
  console.log('  ✓ subject_type, subject_ref (+ index)');

  console.log('\n── backfill from protocol label (only where subject_type IS NULL) ──');
  // Protocol name fragments → slug
  const protoMap: Array<[string, string]> = [
    ['clear skin', 'clear-skin-protocol'],
    ['even tone', 'even-tone-protocol'],
    ['renewal', 'renewal-protocol'],
    ['barrier', 'barrier-protocol'],
  ];
  for (const [frag, slug] of protoMap) {
    const r = await sql`
      UPDATE reviews SET subject_type='protocol', subject_ref=${slug}
      WHERE subject_type IS NULL AND protocol ILIKE ${'%' + frag + '%'}`;
    if (r.count) console.log(`  ✓ protocol "${frag}" → ${slug} (${r.count})`);
  }

  // Any remaining whose protocol exactly matches a product name → product/sku
  const prodMatched = await sql`
    UPDATE reviews r SET subject_type='product', subject_ref=p.sku
    FROM products p
    WHERE r.subject_type IS NULL AND r.protocol IS NOT NULL AND lower(r.protocol) = lower(p.name)`;
  if (prodMatched.count) console.log(`  ✓ matched product names (${prodMatched.count})`);

  // Everything else → general
  const gen = await sql`UPDATE reviews SET subject_type='general' WHERE subject_type IS NULL`;
  if (gen.count) console.log(`  ✓ general (${gen.count})`);

  console.log('\n── verification ──');
  const rows = await sql<Array<{ subject_type: string; subject_ref: string | null; c: number }>>`
    SELECT subject_type, subject_ref, count(*)::int c FROM reviews GROUP BY subject_type, subject_ref ORDER BY subject_type, subject_ref`;
  for (const r of rows) console.log(`  ${r.subject_type.padEnd(9)} ${(r.subject_ref ?? '—').padEnd(22)} ${r.c}`);

  await sql.end();
  console.log('\n✓ subject migration complete');
}
main().catch((e) => { console.error(e); process.exit(1); });
