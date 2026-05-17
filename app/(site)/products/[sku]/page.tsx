import { notFound } from 'next/navigation';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { ProductDetailPage } from '@/components/product/ProductDetailPage';
import '@/components/product/product.css';

export const dynamic = 'force-dynamic';

interface PageParams {
  params: Promise<{ sku: string }>;
}

export async function generateMetadata({ params }: PageParams) {
  const { sku } = await params;
  const [p] = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.sku, sku))
    .limit(1);
  if (!p) return { title: 'Product not found' };
  return {
    title: p.name,
    description: p.actives
      ? `${p.name} — ${p.actives}. Clinically dosed, dermatologist-formulated, manufactured in Lahore under ISO 22716 GMP.`
      : `${p.name} — clinically dosed, dermatologist-formulated, manufactured in Lahore under ISO 22716 GMP.`,
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

  return <ProductDetailPage product={product} related={related} />;
}
