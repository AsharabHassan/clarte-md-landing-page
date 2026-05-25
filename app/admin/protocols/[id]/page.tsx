import Link from 'next/link';
import { asc, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatPkr } from '@/lib/admin/format';
import BundleForm from '@/components/admin/bundle-form.client';
import BundleComposer from '@/components/admin/bundle-composer.client';
import ConfirmDeleteButton from '@/components/admin/confirm-delete-button.client';

export const dynamic = 'force-dynamic';

const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

export default async function EditProtocolPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminSession(AREA_ACCESS.protocols);
  const { id } = await params;

  const [bundle] = await db.select().from(schema.bundles).where(eq(schema.bundles.id, id)).limit(1);
  if (!bundle) notFound();

  const [itemRows, allProducts] = await Promise.all([
    db
      .select({ id: schema.products.id, name: schema.products.name, sku: schema.products.sku, position: schema.bundleItems.position })
      .from(schema.bundleItems)
      .innerJoin(schema.products, eq(schema.bundleItems.productId, schema.products.id))
      .where(eq(schema.bundleItems.bundleId, id))
      .orderBy(asc(schema.bundleItems.position)),
    db
      .select({ id: schema.products.id, name: schema.products.name, sku: schema.products.sku })
      .from(schema.products)
      .orderBy(asc(schema.products.name)),
  ]);

  const route = PROTOCOL_ROUTES[bundle.slug];
  const showDelete = canDelete(getUserRole(user));

  return (
    <div className="max-w-4xl">
      <Link
        href="/admin/protocols"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Protocols
      </Link>

      <PageHeader title={bundle.name} description={`${bundle.slug} · ${formatPkr(bundle.pricePkr)}`}>
        {route && (
          <a
            href={route}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-secondary hover:underline"
          >
            View page {route} <ExternalLink className="size-3.5" />
          </a>
        )}
      </PageHeader>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <BundleForm
            initial={{
              id: bundle.id,
              slug: bundle.slug,
              name: bundle.name,
              concern: bundle.concern,
              pricePkr: String(bundle.pricePkr),
            }}
          />
        </CardContent>
      </Card>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-base">Products in this protocol</CardTitle>
          <p className="text-sm text-muted-foreground">
            Order is the order shown on the storefront. The kit price above is what the customer pays.
          </p>
        </CardHeader>
        <CardContent>
          <BundleComposer
            bundleId={bundle.id}
            allProducts={allProducts}
            initialItems={itemRows.map((r) => ({ id: r.id, name: r.name, sku: r.sku }))}
          />
        </CardContent>
      </Card>

      {showDelete && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Danger zone</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="text-sm text-muted-foreground">
              Deletes this protocol and its product list. If a landing page points to this slug, it
              will stop working. Past orders are unaffected.
            </p>
            <ConfirmDeleteButton
              deleteUrl={`/api/admin/protocols/${bundle.id}`}
              triggerLabel="Delete protocol"
              title="Delete this protocol?"
              description={`This permanently removes "${bundle.name}" and its product composition. ${route ? `The ${route} landing page will break until updated. ` : ''}This cannot be undone.`}
              confirmLabel="Delete protocol"
              redirectTo="/admin/protocols"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
