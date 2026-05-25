import Link from 'next/link';
import type { Metadata } from 'next';
import { desc, eq } from 'drizzle-orm';
import { ChevronRight } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requirePortalCustomer } from '@/lib/auth/portal';
import { OrderStatusBadge } from '@/components/admin/status-badge';
import { Card, CardContent } from '@/components/ui/card';
import AccountNav from '@/components/account/account-nav.client';
import { formatPkr, formatDate } from '@/lib/admin/format';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Your orders' };

export default async function AccountOrdersPage() {
  const customer = await requirePortalCustomer();
  const orders = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.customerId, customer.id))
    .orderBy(desc(schema.orders.createdAt));

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <AccountNav name={customer.name} />
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="mb-1 font-display text-2xl text-navy">Your orders</h1>
          <p className="text-sm text-ink-mute">Tap an order to see live status and tracking.</p>
        </div>
        <Link
          href="/account/reviews/new"
          className="inline-flex items-center gap-1.5 rounded-md border border-rule px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-navy no-underline transition-colors hover:bg-sky"
        >
          Write a review
        </Link>
      </div>

      {orders.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center text-ink-mute">
            You don’t have any orders yet.
            <div className="mt-3">
              <Link href="/products" className="text-cobalt underline-offset-4 hover:underline">
                Browse products →
              </Link>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {orders.map((o) => (
            <Link key={o.id} href={`/account/orders/${o.orderNumber}`} className="block no-underline">
              <Card className="py-0 transition-colors hover:border-cobalt/40">
                <CardContent className="flex items-center justify-between gap-4 p-4">
                  <div>
                    <div className="font-mono text-sm font-medium text-navy">{o.orderNumber}</div>
                    <div className="text-xs text-ink-mute">
                      {formatDate(o.createdAt)} · {o.shippingCity}
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-medium tabular-nums text-ink">{formatPkr(o.totalPkr)}</div>
                      <OrderStatusBadge status={o.status} />
                    </div>
                    <ChevronRight className="size-4 text-ink-faint" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
