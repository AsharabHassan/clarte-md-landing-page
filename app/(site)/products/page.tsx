import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import {
  CatalogFilterChips,
  type EnrichedBundle,
  type EnrichedProduct,
} from '@/components/product/CatalogFilterChips';
import { SITE_URL } from '@/lib/schema/json-ld';

const TITLE = 'All protocols + individual products';
const DESCRIPTION =
  'Browse all 4 Clarté MD protocol bundles and 8 individual products. Clinically dosed actives, dermatologist-formulated, manufactured in Lahore.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/products` },
  openGraph: {
    title: `${TITLE} · Clarté MD`,
    description: DESCRIPTION,
    url: `${SITE_URL}/products`,
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

/**
 * Server-side enrichment: walk bundle_items to attach the list of
 * concerns each product is part of. A product can ship in multiple
 * protocols (e.g. niacinamide serum is in both Clear-Skin and
 * Even-Tone), so concerns is a string[] not a single value.
 */
async function getCatalog(): Promise<{
  products: EnrichedProduct[];
  bundles: EnrichedBundle[];
}> {
  const rawProducts = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.active, true));

  const rawBundles = await db.select().from(schema.bundles);
  const allBundleItems = await db.select().from(schema.bundleItems);

  // Map productId → concerns[] via bundle membership
  const concernsBySku = new Map<string, Set<string>>();
  for (const item of allBundleItems) {
    const product = rawProducts.find((p) => p.id === item.productId);
    const bundle = rawBundles.find((b) => b.id === item.bundleId);
    if (!product || !bundle) continue;
    if (!concernsBySku.has(product.sku)) concernsBySku.set(product.sku, new Set());
    concernsBySku.get(product.sku)!.add(bundle.concern);
  }

  const products: EnrichedProduct[] = rawProducts.map((p) => ({
    product: p,
    concerns: Array.from(concernsBySku.get(p.sku) ?? []),
  }));

  // Enrich bundles with itemCount + listPriceSum (existing pattern)
  const bundlesEnriched: EnrichedBundle[] = await Promise.all(
    rawBundles.map(async (b) => {
      const items = allBundleItems.filter((i) => i.bundleId === b.id);
      const itemProducts = items.map((i) =>
        rawProducts.find((p) => p.id === i.productId),
      );
      const listPriceSum = itemProducts.reduce(
        (s, p) => s + (p?.listPricePkr ?? p?.pricePkr ?? 0),
        0,
      );
      return { bundle: b, itemCount: items.length, listPriceSum };
    }),
  );

  // Canonical protocol order: acne, even-tone, renewal, barrier
  const protocolOrder = [
    'clear-skin-protocol',
    'even-tone-protocol',
    'renewal-protocol',
    'barrier-protocol',
  ];
  bundlesEnriched.sort(
    (a, b) =>
      protocolOrder.indexOf(a.bundle.slug) - protocolOrder.indexOf(b.bundle.slug),
  );

  return { products, bundles: bundlesEnriched };
}

export default async function CatalogPage() {
  const { products, bundles } = await getCatalog();

  return (
    <div className="mx-auto max-w-[75rem] px-6 pt-12 pb-20">
      <header className="mb-12 text-center">
        <h1 className="mb-3 font-display font-light text-navy text-[clamp(32px,4.5vw,48px)] leading-[1.05] tracking-[-0.02em]">
          The Catalogue
        </h1>
        <p className="font-display italic text-[clamp(15px,1.4vw,18px)] text-ink-mute">
          {bundles.length} protocol bundles · {products.length} individual formulations
        </p>
      </header>

      <CatalogFilterChips bundles={bundles} products={products} />
    </div>
  );
}
