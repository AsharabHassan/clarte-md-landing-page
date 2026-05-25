import Link from 'next/link';
import { asc, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { Phone, MessageCircle, ArrowLeft, Sparkles, User } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import { OrderStatusBadge } from '@/components/admin/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatPkr, formatDateTime, whatsappLink } from '@/lib/admin/format';
import OrderStatusActions from './status-actions.client';
import OrderFulfillmentForm from './fulfillment-form.client';
import ConfirmDeleteButton from '@/components/admin/confirm-delete-button.client';

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireAdminSession(AREA_ACCESS.orders);
  const { id } = await params;

  const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id)).limit(1);
  if (!order) notFound();
  const showDelete = canDelete(getUserRole(user));

  const [items, history, ai] = await Promise.all([
    db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, id)),
    db
      .select()
      .from(schema.orderStatusHistory)
      .where(eq(schema.orderStatusHistory.orderId, id))
      .orderBy(asc(schema.orderStatusHistory.createdAt)),
    order.aiSessionId
      ? db.select().from(schema.aiSessions).where(eq(schema.aiSessions.id, order.aiSessionId)).limit(1)
      : Promise.resolve([]),
  ]);
  const aiSession = ai[0] ?? null;

  return (
    <div className="max-w-5xl">
      <Link
        href="/admin/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> All orders
      </Link>

      <PageHeader title={order.orderNumber} description={formatDateTime(order.createdAt)}>
        <OrderStatusBadge status={order.status} />
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left column: customer, shipping, items */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="font-medium">{order.customerName}</div>
                <div className="text-sm text-muted-foreground">{order.customerEmail}</div>
                <div className="text-sm text-muted-foreground">{order.customerPhone}</div>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button asChild size="sm" variant="outline">
                  <a href={whatsappLink(order.customerPhone)} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="size-4" /> WhatsApp
                  </a>
                </Button>
                <Button asChild size="sm" variant="outline">
                  <a href={`tel:${order.customerPhone}`}>
                    <Phone className="size-4" /> Call
                  </a>
                </Button>
                {order.customerId && (
                  <Button asChild size="sm" variant="ghost">
                    <Link href={`/admin/customers/${order.customerId}`}>
                      <User className="size-4" /> Profile
                    </Link>
                  </Button>
                )}
              </div>
              <Separator />
              <div>
                <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Shipping</div>
                <p className="mt-1 text-sm">
                  {order.shippingAddress}
                  <br />
                  {order.shippingCity}
                  {order.shippingPostal ? ` ${order.shippingPostal}` : ''}
                </p>
                {order.shippingNotes && (
                  <p className="mt-1 text-sm text-muted-foreground">Notes: {order.shippingNotes}</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Items</CardTitle>
            </CardHeader>
            <CardContent>
              <table className="w-full text-sm">
                <tbody>
                  {items.map((i) => (
                    <tr key={i.id} className="border-b border-border last:border-0">
                      <td className="py-2">
                        {i.name}
                        {i.isBundle && <span className="ml-2 text-xs text-muted-foreground">(bundle)</span>}
                      </td>
                      <td className="py-2 text-muted-foreground">×{i.qty}</td>
                      <td className="py-2 text-right tabular-nums">{formatPkr(i.unitPricePkr * i.qty)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <td className="pt-3" colSpan={2}>Subtotal</td>
                    <td className="pt-3 text-right tabular-nums">{formatPkr(order.subtotalPkr)}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>Shipping</td>
                    <td className="text-right tabular-nums">{formatPkr(order.shippingPkr)}</td>
                  </tr>
                  <tr className="font-semibold">
                    <td className="pt-1" colSpan={2}>Total</td>
                    <td className="pt-1 text-right tabular-nums">{formatPkr(order.totalPkr)}</td>
                  </tr>
                </tfoot>
              </table>
              <Separator className="my-3" />
              <div className="text-sm text-muted-foreground">
                Payment: <span className="font-medium text-foreground uppercase">{order.paymentMethod}</span> · {order.paymentStatus}
              </div>
              {aiSession && (
                <Link
                  href={`/admin/ai-sessions/${aiSession.id}`}
                  className="mt-3 inline-flex items-center gap-1 text-sm text-secondary hover:underline"
                >
                  <Sparkles className="size-4" /> AI session ({aiSession.kind}) →
                </Link>
              )}
            </CardContent>
          </Card>

          {/* Status timeline */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              {history.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  No transitions recorded yet. Status changes from here on are logged.
                </p>
              ) : (
                <ol className="space-y-3">
                  {history.map((h) => (
                    <li key={h.id} className="flex items-start gap-3 text-sm">
                      <span className="mt-1.5 size-2 shrink-0 rounded-full bg-secondary" />
                      <div>
                        <div>
                          <span className="capitalize">{h.fromStatus ?? 'created'}</span>
                          <span className="text-muted-foreground"> → </span>
                          <span className="font-medium capitalize">{h.toStatus}</span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {formatDateTime(h.createdAt)}
                          {h.actorEmail ? ` · ${h.actorEmail}` : ''}
                        </div>
                        {h.note && <div className="mt-0.5 text-muted-foreground">“{h.note}”</div>}
                      </div>
                    </li>
                  ))}
                </ol>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right column: status actions + fulfillment */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Status</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderStatusActions orderId={order.id} current={order.status} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Fulfillment & notes</CardTitle>
            </CardHeader>
            <CardContent>
              <OrderFulfillmentForm
                orderId={order.id}
                courier={order.courier ?? ''}
                trackingNumber={order.trackingNumber ?? ''}
                internalNotes={order.internalNotes ?? ''}
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
                  Permanently deletes this order and its items &amp; history. To cancel an order
                  instead, set its status to <span className="font-medium">cancelled</span>.
                </p>
                <ConfirmDeleteButton
                  deleteUrl={`/api/admin/orders/${order.id}`}
                  triggerLabel="Delete order"
                  title="Delete this order?"
                  description={`This permanently removes order ${order.orderNumber}, its line items, and status history. This cannot be undone.`}
                  confirmLabel="Delete order"
                  redirectTo="/admin/orders"
                />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
