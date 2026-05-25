import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import ProductForm from '@/components/admin/product-form.client';

export const dynamic = 'force-dynamic';

export default async function NewProductPage() {
  await requireAdminSession(AREA_ACCESS.products);
  return (
    <div>
      <Link
        href="/admin/products"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Products
      </Link>
      <PageHeader title="Add product" />
      <ProductForm />
    </div>
  );
}
