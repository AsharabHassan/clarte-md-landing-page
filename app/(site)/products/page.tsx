import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { ProductCard } from '@/components/product/ProductCard';
import { BundleCard } from '@/components/product/BundleCard';
import { Eyebrow } from '@/components/ui/eyebrow';
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

async function getCatalog() {
  const products = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.active, true));

  const bundles = await db.select().from(schema.bundles);

  // For each bundle, count items and sum list prices (for the "save Rs X" math)
  const bundleEnriched = await Promise.all(
    bundles.map(async (b) => {
      const items = await db
        .select()
        .from(schema.bundleItems)
        .where(eq(schema.bundleItems.bundleId, b.id));
      const itemProducts = await Promise.all(
        items.map(async (i) => {
          const [p] = await db
            .select()
            .from(schema.products)
            .where(eq(schema.products.id, i.productId))
            .limit(1);
          return p;
        }),
      );
      const listSum = itemProducts.reduce(
        (s, p) => s + (p?.listPricePkr ?? p?.pricePkr ?? 0),
        0,
      );
      return { bundle: b, itemCount: items.length, listPriceSum: listSum };
    }),
  );

  // Canonical protocol order: acne, even-tone, renewal, barrier
  const order = [
    'clear-skin-protocol',
    'even-tone-protocol',
    'renewal-protocol',
    'barrier-protocol',
  ];
  bundleEnriched.sort(
    (a, b) => order.indexOf(a.bundle.slug) - order.indexOf(b.bundle.slug),
  );

  return { products, bundles: bundleEnriched };
}

export default async function CatalogPage() {
  const { products, bundles } = await getCatalog();

  return (
    <div className="mx-auto max-w-[75rem] px-6 pt-12 pb-20">
      <header className="mb-14 text-center">
        <h1 className="mb-3 font-display font-normal text-navy text-[clamp(32px,4vw,42px)]">
          The Catalogue
        </h1>
        <p className="text-base text-ink-mute">
          4 protocol bundles · {products.length} individual products
        </p>
      </header>

      <div>
        <div className="mt-12 mb-5 flex items-center justify-between border-b border-rule pb-3.5">
          <h2 className="font-display text-[22px] font-medium text-navy">Protocols</h2>
          <Eyebrow className="text-ink-mute">{bundles.length} bundles</Eyebrow>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(17.5rem,1fr))]">
          {bundles.map(({ bundle, itemCount, listPriceSum }) => (
            <BundleCard
              key={bundle.id}
              bundle={bundle}
              itemCount={itemCount}
              listPriceSum={listPriceSum}
            />
          ))}
        </div>
      </div>

      <div>
        <div className="mt-12 mb-5 flex items-center justify-between border-b border-rule pb-3.5">
          <h2 className="font-display text-[22px] font-medium text-navy">Individual products</h2>
          <Eyebrow className="text-ink-mute">{products.length} products</Eyebrow>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
}
