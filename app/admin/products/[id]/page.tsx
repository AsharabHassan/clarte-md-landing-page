import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import ProductForm, { type ProductFormValues } from '@/components/admin/product-form.client';
import ProductContentEditor from '@/components/admin/product-content-editor.client';

export const dynamic = 'force-dynamic';

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession(AREA_ACCESS.products);
  const { id } = await params;

  const [product] = await db.select().from(schema.products).where(eq(schema.products.id, id)).limit(1);
  if (!product) notFound();

  const initial: ProductFormValues = {
    id: product.id,
    sku: product.sku,
    name: product.name,
    pricePkr: String(product.pricePkr),
    listPricePkr: product.listPricePkr != null ? String(product.listPricePkr) : '',
    actives: product.actives ?? '',
    imageUrl: product.imageUrl ?? '',
    description: product.description ?? '',
    stockQty: product.stockQty != null ? String(product.stockQty) : '',
    lowStockThreshold: product.lowStockThreshold != null ? String(product.lowStockThreshold) : '',
    active: product.active,
  };

  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Products
      </Link>
      <PageHeader title={product.name} description={`SKU: ${product.sku}`} />

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Product details</CardTitle>
        </CardHeader>
        <CardContent>
          <ProductForm initial={initial} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Storefront content</CardTitle>
          <p className="text-sm text-muted-foreground">
            Everything shown on the public product page — tags, benefits, ingredients, directions and warnings.
          </p>
        </CardHeader>
        <CardContent>
          <ProductContentEditor productId={product.id} initial={product.content ?? null} />
        </CardContent>
      </Card>
    </div>
  );
}
