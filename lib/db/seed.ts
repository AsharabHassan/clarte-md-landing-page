/**
 * Seeds products + bundles + bundle_items from the values currently
 * hardcoded in acne-protocol.html's PRODUCTS config. Idempotent —
 * re-running updates existing rows by sku/slug rather than duplicating.
 *
 * Run: npm run db:seed
 * Env: loaded by `tsx --env-file=.env.local` (see package.json script).
 */
import { sql } from 'drizzle-orm';
import { db, schema } from './client';

const PRODUCTS = [
  { sku: 'prep',   name: 'Radiance Prep Cleanser',      pricePkr: 1799, listPricePkr: 2000, actives: 'PHA 4% · Aloe',                       imageUrl: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Prep.png?v=1773743330' },
  { sku: 'rescue', name: 'Clarifying Rescue Face Wash', pricePkr: 1799, listPricePkr: 2000, actives: 'Salicylic 2% · Zinc',                 imageUrl: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/wash.png?v=1773743070' },
  { sku: 'vitc',   name: 'Vitamin CE Ferrulic Serum',   pricePkr: 2250, listPricePkr: 2950, actives: 'Vit C 15% · Vit E · Ferulic',         imageUrl: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/3390b799-35fe-425b-bae9-41e4c8e41139.png?v=1773338016' },
  { sku: 'acne',   name: 'Clarifying Acne Serum',       pricePkr: 2100, listPricePkr: 3000, actives: 'Niacinamide 10% · Azelaic 10%',       imageUrl: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Generated_Image_March_13_2026_-_3_48AM.png?v=1773743197' },
  { sku: 'ha',     name: 'Hyaluronic Acid Serum',       pricePkr: 2000, listPricePkr: 2500, actives: 'HA · Panthenol',                      imageUrl: 'https://clartemd.com.pk/cdn/shop/files/d9a4c8e3-fcbb-4411-b5a3-fb59422d0040.png' },
  { sku: 'reti',   name: 'Retinol Serum',               pricePkr: 2000, listPricePkr: 2500, actives: 'Retinol 0.5%',                        imageUrl: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Gemini_Generated_Image_rwcfs4rwcfs4rwcf.png?v=1773881855' },
  { sku: 'light',  name: 'Radiance Lightening Cream',   pricePkr: 2500, listPricePkr: 4500, actives: 'Tranexamic 3% · Kojic · Arbutin',     imageUrl: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/Generated_Image_March_13_2026_-_3_37AM.png?v=1773743441' },
  { sku: 'spf',    name: 'Barrier Restore SPF 50+',     pricePkr: 1900, listPricePkr: 2500, actives: 'SPF 50+ PA++++ · Centella',           imageUrl: 'https://cdn.shopify.com/s/files/1/0782/5113/1112/files/91edf02b-ef9c-4062-a6b9-f0975d941393.png?v=1773337514' },
];

const BUNDLES = [
  {
    slug: 'clear-skin-protocol',
    name: 'The Clear Skin Protocol',
    concern: 'acne',
    pricePkr: 6499,
    items: ['rescue', 'acne', 'ha', 'spf'],
  },
  {
    slug: 'even-tone-protocol',
    name: 'The Even Tone Protocol',
    concern: 'pigmentation',
    pricePkr: 6999,
    items: ['prep', 'vitc', 'light', 'spf'],
  },
  {
    slug: 'renewal-protocol',
    name: 'The Renewal Protocol',
    concern: 'anti-ageing',
    pricePkr: 7999,
    items: ['prep', 'vitc', 'reti', 'ha', 'spf'],
  },
  {
    slug: 'barrier-protocol',
    name: 'The Barrier Protocol',
    concern: 'hydration',
    pricePkr: 4799,
    items: ['prep', 'ha', 'spf'],
  },
];

async function main() {
  console.log('Seeding products...');
  for (const p of PRODUCTS) {
    await db.insert(schema.products).values(p).onConflictDoUpdate({
      target: schema.products.sku,
      set: {
        name: p.name,
        pricePkr: p.pricePkr,
        listPricePkr: p.listPricePkr,
        actives: p.actives,
        imageUrl: p.imageUrl,
        updatedAt: new Date(),
      },
    });
    console.log(`  ✓ ${p.sku}`);
  }

  console.log('Seeding bundles...');
  for (const b of BUNDLES) {
    const [bundle] = await db
      .insert(schema.bundles)
      .values({ slug: b.slug, name: b.name, concern: b.concern, pricePkr: b.pricePkr })
      .onConflictDoUpdate({
        target: schema.bundles.slug,
        set: { name: b.name, concern: b.concern, pricePkr: b.pricePkr, updatedAt: new Date() },
      })
      .returning();

    // Rebuild bundle items for this bundle (don't duplicate on re-seed)
    await db.delete(schema.bundleItems).where(sql`bundle_id = ${bundle.id}`);
    const products = await db.select().from(schema.products);
    const skuMap = new Map(products.map((p) => [p.sku, p.id]));

    for (let i = 0; i < b.items.length; i++) {
      const productId = skuMap.get(b.items[i]);
      if (!productId) throw new Error(`Unknown SKU in bundle ${b.slug}: ${b.items[i]}`);
      await db.insert(schema.bundleItems).values({ bundleId: bundle.id, productId, position: i });
    }
    console.log(`  ✓ ${b.slug} (${b.items.length} items)`);
  }

  console.log('\nSeed complete.');
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
