import Link from 'next/link';
import { asc } from 'drizzle-orm';
import { Plus } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPkr } from '@/lib/admin/format';
import ProductActions from './product-actions.client';

export const dynamic = 'force-dynamic';

function StockCell({
  stockQty,
  threshold,
}: {
  stockQty: number | null;
  threshold: number | null;
}) {
  if (stockQty === null) return <span className="text-sm text-muted-foreground">untracked</span>;
  if (stockQty <= 0) return <Badge variant="destructive">Out of stock</Badge>;
  if (threshold !== null && stockQty <= threshold)
    return <Badge variant="warning">Low · {stockQty}</Badge>;
  return <span className="tabular-nums">{stockQty}</span>;
}

export default async function AdminProductsPage() {
  await requireAdminSession(AREA_ACCESS.products);
  const products = await db.select().from(schema.products).orderBy(asc(schema.products.name));

  return (
    <div>
      <PageHeader title="Products" description={`${products.length} in catalog`}>
        <Button asChild size="sm">
          <Link href="/admin/products/new">
            <Plus className="size-4" /> Add product
          </Link>
        </Button>
      </PageHeader>

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>SKU</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{p.sku}</TableCell>
                  <TableCell className="text-right">
                    <span className="tabular-nums">{formatPkr(p.pricePkr)}</span>
                    {p.listPricePkr && p.listPricePkr > p.pricePkr && (
                      <span className="ml-2 text-xs text-muted-foreground line-through">
                        {formatPkr(p.listPricePkr)}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    <StockCell stockQty={p.stockQty} threshold={p.lowStockThreshold} />
                  </TableCell>
                  <TableCell>
                    {p.active ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="outline">Archived</Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <ProductActions id={p.id} active={p.active} />
                  </TableCell>
                </TableRow>
              ))}
              {products.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No products yet. Add your first one.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
