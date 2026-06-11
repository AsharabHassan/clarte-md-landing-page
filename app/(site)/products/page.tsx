import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import {
  CatalogFilterChips,
  type EnrichedBundle,
  type EnrichedProduct,
} from '@/components/product/CatalogFilterChips';
import { SITE_URL } from '@/lib/schema/json-ld';
import { bundleCinematicPath } from '@/lib/products/content';
import { Reveal } from '@/lib/anim/reveal';
import { CinematicPhoto } from '@/lib/anim/cinematic-photo';

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

  const rawBundles = await db
    .select()
    .from(schema.bundles)
    .where(eq(schema.bundles.active, true));
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
    <div className="bg-canvas">
      {/* Cinematic catalog banner — dark gradient over existing protocol shot */}
      <section className="relative overflow-hidden border-b border-sand/40">
        <CinematicPhoto
          src={bundleCinematicPath('even-tone-protocol')}
          alt=""
          width={2400}
          height={900}
          priority
          parallax={0.08}
          aspectClass="aspect-[21/9] md:aspect-[24/7]"
          wrapperClassName="w-full"
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/70 to-canvas/0" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-canvas/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-[75rem] px-6">
            <Reveal>
              <span className="mb-4 inline-block font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt">
                — The full catalogue
              </span>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="max-w-[40rem] font-display font-light text-navy text-[clamp(36px,6vw,72px)] leading-[0.95] tracking-[-0.025em]">
                Every <em className="italic text-cobalt">formulation,</em>
                <br />
                à la carte.
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-4 font-display italic text-[clamp(15px,1.4vw,18px)] text-ink-mute">
                {bundles.length} protocol bundles · {products.length} individual formulations
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-[75rem] px-6 pt-16 pb-20">
        <CatalogFilterChips bundles={bundles} products={products} />
      </div>
    </div>
  );
}
