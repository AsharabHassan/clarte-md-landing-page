import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { ProductDetailPage } from '@/components/product/ProductDetailPage';
import { productLd, SITE_URL } from '@/lib/schema/json-ld';

export const dynamic = 'force-dynamic';

interface PageParams {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { sku } = await params;
  const [p] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.sku, sku))
    .limit(1);
  if (!p) return { title: 'Product not found' };
  const description = p.actives
    ? `${p.name} — ${p.actives}. Clinically dosed, dermatologist-formulated, manufactured in Lahore.`
    : `${p.name} — clinically dosed, dermatologist-formulated, manufactured in Lahore.`;
  const canonical = `${SITE_URL}/products/${p.sku}`;
  return {
    title: p.name,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${p.name} · Clarté MD`,
      description,
      url: canonical,
      type: 'website',
      images: p.imageUrl ? [{ url: p.imageUrl, alt: p.name }] : undefined,
    },
  };
}

// Maps bundle.slug → user-facing protocol page route (the /acne, /even-tone,
// /renewal, /barrier landings). Kept inline since this is the only consumer
// here; the same map exists in the homepage for the protocol grid.
const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

export default async function ProductPage({ params }: PageParams) {
  const { sku } = await params;

  const [product] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.sku, sku))
    .limit(1);

  if (!product || !product.active) notFound();

  /*
   * Protocol-shaped cross-sell (03-pdp.md #6):
   * 1. Find every bundle this product is part of (bundle_items rows).
   * 2. Collect the sibling product IDs in those bundles.
   * 3. Fetch the sibling products + the bundle itself.
   *
   * If the product is in multiple bundles (e.g. niacinamide serum is in
   * both Clear-Skin and Even-Tone), we pick the first bundle as the
   * primary "complete the protocol" target — the cross-sell card lists
   * its siblings. Replaces the previous random-3-other-products pattern.
   */
  const allBundleItems = await db.select().from(schema.bundleItems);
  const allProducts = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.active, true));
  const allBundles = await db.select().from(schema.bundles);

  const myBundleIds = allBundleItems
    .filter((i) => i.productId === product.id)
    .map((i) => i.bundleId);

  const primaryBundle =
    myBundleIds.length > 0
      ? allBundles.find((b) => b.id === myBundleIds[0]) ?? null
      : null;

  const protocolSiblings = primaryBundle
    ? allProducts.filter(
        (p) =>
          p.id !== product.id &&
          allBundleItems.some(
            (bi) => bi.bundleId === primaryBundle.id && bi.productId === p.id,
          ),
      )
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd(product)) }}
      />
      <ProductDetailPage
        product={product}
        protocolSiblings={protocolSiblings}
        primaryBundle={
          primaryBundle
            ? {
                slug: primaryBundle.slug,
                name: primaryBundle.name,
                pricePkr: primaryBundle.pricePkr,
                route: PROTOCOL_ROUTES[primaryBundle.slug] ?? null,
              }
            : null
        }
      />
    </>
  );
}
