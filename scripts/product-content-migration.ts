/**
 * Idempotent migration: move the hardcoded per-SKU PDP content out of
 * lib/products/content.ts and into products.content (jsonb), so the
 * admin panel can edit it and the storefront can read it from the DB.
 *
 *   - ADD COLUMN products.content jsonb (if missing)
 *   - Backfill each SKU's content from PRODUCT_CONTENT, but ONLY where
 *     content IS NULL — re-running never clobbers later admin edits.
 *
 * Run: npx tsx --env-file=.env.local scripts/product-content-migration.ts
 */
import { config } from 'dotenv';
import postgres from 'postgres';
import { PRODUCT_CONTENT } from '../lib/products/content';

config({ path: '.env.local' });

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL missing — check .env.local');
  process.exit(1);
}

const sql = postgres(process.env.DATABASE_URL, { prepare: false });

async function main() {
  console.log('── products.content column ──');
  await sql.unsafe(`ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "content" jsonb`);
  console.log('  ✓ content jsonb');

  console.log('\n── backfill from lib/products/content.ts (only where NULL) ──');
  let filled = 0;
  for (const [sku, content] of Object.entries(PRODUCT_CONTENT)) {
    const res = await sql`
      UPDATE "products" SET content = ${JSON.stringify(content)}::jsonb, updated_at = now()
      WHERE sku = ${sku} AND content IS NULL
    `;
    if (res.count > 0) {
      filled += res.count;
      console.log(`  ✓ ${sku}`);
    } else {
      console.log(`  ↺ ${sku} (no matching product or already set)`);
    }
  }
  console.log(`  filled ${filled} product(s)`);

  console.log('\n── verification ──');
  const rows = await sql<Array<{ sku: string; has: boolean }>>`
    SELECT sku, (content IS NOT NULL) AS has FROM products ORDER BY sku
  `;
  for (const r of rows) console.log(`  ${r.sku.padEnd(10)} content=${r.has}`);

  await sql.end();
  console.log('\n✓ product content migration complete');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
