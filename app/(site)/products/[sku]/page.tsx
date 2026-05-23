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

export default async function ProductPage({ params }: PageParams) {
  const { sku } = await params;

  const [product] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.sku, sku))
    .limit(1);

  if (!product || !product.active) notFound();

  // "You might also need" — show 3 random other active products
  const allOthers = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.active, true));
  const related = allOthers.filter((p) => p.sku !== sku).slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd(product)) }}
      />
      <ProductDetailPage product={product} related={related} />
    </>
  );
}
