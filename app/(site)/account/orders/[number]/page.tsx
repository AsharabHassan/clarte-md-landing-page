import Link from 'next/link';
import type { Metadata } from 'next';
import { and, eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requirePortalCustomer } from '@/lib/auth/portal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccountNav from '@/components/account/account-nav.client';
import OrderLiveStatus from '@/components/account/order-live-status.client';
import { formatPkr, formatDateTime } from '@/lib/admin/format';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Order details' };

export default async function AccountOrderDetailPage({
  params,
}: {
  params: Promise<{ number: string }>;
}) {
  const customer = await requirePortalCustomer();
  const { number } = await params;

  const [order] = await db
    .select()
    .from(schema.orders)
    .where(and(eq(schema.orders.orderNumber, number), eq(schema.orders.customerId, customer.id)))
    .limit(1);
  if (!order) notFound();

  const items = await db.select().from(schema.orderItems).where(eq(schema.orderItems.orderId, order.id));

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <AccountNav name={customer.name} />

      <Link
        href="/account/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm text-ink-mute hover:text-navy"
      >
        <ArrowLeft className="size-4" /> All orders
      </Link>

      <div className="mb-6">
        <h1 className="font-mono text-2xl font-medium text-navy">{order.orderNumber}</h1>
        <p className="text-sm text-ink-mute">Placed {formatDateTime(order.createdAt)}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-[1.2fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Status &amp; tracking</CardTitle>
          </CardHeader>
          <CardContent>
            <OrderLiveStatus
              orderNumber={order.orderNumber}
              initial={{
                status: order.status,
                courier: order.courier,
                tracking_number: order.trackingNumber,
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Order summary</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <tbody>
                {items.map((i) => (
                  <tr key={i.id} className="border-b border-rule-soft last:border-0">
                    <td className="py-2">
                      {i.name}
                      {i.isBundle && <span className="ml-1 text-xs text-ink-mute">(kit)</span>}
                    </td>
                    <td className="py-2 text-ink-mute">×{i.qty}</td>
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
            <div className="mt-4 border-t border-rule-soft pt-3 text-sm text-ink-mute">
              <div>Payment: <span className="font-medium uppercase text-ink">{order.paymentMethod}</span> · {order.paymentStatus}</div>
              <div className="mt-1">Ship to: {order.shippingCity}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
