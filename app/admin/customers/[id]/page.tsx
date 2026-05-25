import Link from 'next/link';
import { desc, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft, MessageCircle, Phone } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { OrderStatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPkr, formatDateTime, whatsappLink } from '@/lib/admin/format';
import CustomerForm from '@/components/admin/customer-form.client';
import ConfirmDeleteButton from '@/components/admin/confirm-delete-button.client';

export const dynamic = 'force-dynamic';

export default async function CustomerDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminSession(AREA_ACCESS.customers);
  const { id } = await params;

  const [customer] = await db.select().from(schema.customers).where(eq(schema.customers.id, id)).limit(1);
  if (!customer) notFound();

  const orders = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.customerId, id))
    .orderBy(desc(schema.orders.createdAt));

  const lifetime = orders
    .filter((o) => !['cancelled', 'refunded', 'returned'].includes(o.status))
    .reduce((sum, o) => sum + o.totalPkr, 0);
  const showDelete = canDelete(getUserRole(user));

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/customers"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Customers
      </Link>

      <PageHeader title={customer.name} description={`${orders.length} orders · ${formatPkr(lifetime)} lifetime`}>
        <Button asChild size="sm" variant="outline">
          <a href={whatsappLink(customer.phone)} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="size-4" /> WhatsApp
          </a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href={`tel:${customer.phone}`}>
            <Phone className="size-4" /> Call
          </a>
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <CustomerForm
                initial={{
                  id: customer.id,
                  name: customer.name,
                  phone: customer.phone,
                  email: customer.email ?? '',
                  address: customer.address ?? '',
                  city: customer.city ?? '',
                  postal: customer.postal ?? '',
                  notes: customer.notes ?? '',
                }}
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <Row label="Orders" value={String(orders.length)} />
              <Row label="Lifetime value" value={formatPkr(lifetime)} />
              <Row label="Customer since" value={formatDateTime(customer.createdAt)} />
            </CardContent>
          </Card>

          {showDelete && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Danger zone</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Deletes this profile. Their orders are kept (unlinked) and can be removed separately.
                </p>
                <ConfirmDeleteButton
                  deleteUrl={`/api/admin/customers/${customer.id}`}
                  triggerLabel="Delete customer"
                  title="Delete this customer?"
                  description={`This permanently removes ${customer.name}'s profile. Their ${orders.length} order(s) will be kept but unlinked. This cannot be undone.`}
                  confirmLabel="Delete customer"
                  redirectTo="/admin/customers"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card className="mt-6 py-0">
        <CardHeader className="pt-6">
          <CardTitle className="text-base">Orders</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>When</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((o) => (
                <TableRow key={o.id}>
                  <TableCell className="font-mono text-xs">
                    <Link href={`/admin/orders/${o.id}`} className="text-secondary hover:underline">
                      {o.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(o.createdAt)}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatPkr(o.totalPkr)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={o.status} />
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-muted-foreground">
                    No orders linked to this customer.
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

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right font-medium">{value}</span>
    </div>
  );
}
