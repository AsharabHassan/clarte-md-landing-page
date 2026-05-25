import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { getDashboardMetrics } from '@/lib/db/admin-metrics';
import { PageHeader } from '@/components/admin/page-header';
import { StatCard } from '@/components/admin/stat-card';
import { OrderStatusBadge } from '@/components/admin/status-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { formatPkr, formatDateTime } from '@/lib/admin/format';

export const dynamic = 'force-dynamic';

// Funnel order (left→right). Terminal/dead states render separately.
const FUNNEL = ['pending', 'confirmed', 'dispatched', 'delivered'] as const;

export default async function AdminDashboardPage() {
  await requireAdminSession(AREA_ACCESS.dashboard);

  const [metrics, recentOrders] = await Promise.all([
    getDashboardMetrics(),
    db.select().from(schema.orders).orderBy(desc(schema.orders.createdAt)).limit(8),
  ]);

  const countFor = (status: string) =>
    metrics.statusCounts.find((s) => s.status === status)?.count ?? 0;
  const funnelMax = Math.max(1, ...FUNNEL.map(countFor));
  const rtoPct = (metrics.rtoRate * 100).toFixed(1);

  return (
    <div>
      <PageHeader title="Dashboard" description="Last 30 days unless noted." />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Revenue · 7d" value={formatPkr(metrics.revenue7)} hint="net of cancels/RTO" />
        <StatCard label="Revenue · 30d" value={formatPkr(metrics.revenue30)} hint="net of cancels/RTO" />
        <StatCard label="Orders · 30d" value={metrics.orders30} hint={`${metrics.ordersTotal} all-time`} />
        <StatCard label="AOV · 30d" value={formatPkr(metrics.aov30)} hint="net orders" />
        <StatCard
          label="Pending"
          value={metrics.pendingCount}
          hint="awaiting confirmation"
          tone={metrics.pendingCount > 0 ? 'warning' : 'default'}
        />
        <StatCard
          label="RTO rate"
          value={`${rtoPct}%`}
          hint="returned ÷ (delivered+returned)"
          tone={metrics.rtoRate >= 0.25 ? 'danger' : metrics.rtoRate > 0 ? 'warning' : 'default'}
        />
        <StatCard
          label="Low stock"
          value={metrics.lowStockCount}
          hint="active products at/below threshold"
          tone={metrics.lowStockCount > 0 ? 'warning' : 'default'}
        />
        <StatCard label="Subscribers" value={metrics.subscribers} hint="newsletter opt-ins" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        {/* Fulfillment funnel */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Fulfillment funnel</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {FUNNEL.map((status) => {
              const count = countFor(status);
              return (
                <div key={status}>
                  <div className="mb-1 flex items-center justify-between text-sm">
                    <span className="capitalize text-muted-foreground">{status}</span>
                    <span className="font-medium tabular-nums">{count}</span>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${(count / funnelMax) * 100}%` }}
                    />
                  </div>
                </div>
              );
            })}
            <div className="flex flex-wrap gap-2 pt-2 text-xs text-muted-foreground">
              {(['cancelled', 'returned', 'refunded'] as const).map((s) => (
                <span key={s} className="rounded bg-muted px-2 py-1 capitalize">
                  {s}: <span className="font-medium tabular-nums">{countFor(s)}</span>
                </span>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI tool usage */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">AI tools · 30 days</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              {(['before_after', 'skin_analysis'] as const).map((kind) => (
                <div key={kind} className="rounded-lg border border-border p-3">
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    {kind === 'before_after' ? 'Before/After' : 'Skin analysis'}
                  </div>
                  <div className="mt-1 text-xl font-semibold tabular-nums">
                    {metrics.aiByKind.find((a) => a.kind === kind)?.count ?? 0}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Orders that used an AI preview</span>
              <span className="font-medium tabular-nums">{metrics.aiUsed30}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">AI errors</span>
              <span
                className={
                  metrics.aiErrors30 > 0 ? 'font-medium tabular-nums text-destructive' : 'font-medium tabular-nums'
                }
              >
                {metrics.aiErrors30}
              </span>
            </div>
            <Link href="/admin/ai-sessions" className="text-sm text-secondary underline-offset-4 hover:underline">
              Review AI sessions →
            </Link>
          </CardContent>
        </Card>
      </div>

      {/* Recent orders */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Recent orders</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>When</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentOrders.map((o) => (
                <TableRow key={o.id} className="cursor-pointer">
                  <TableCell className="font-mono text-xs">
                    <Link href={`/admin/orders/${o.id}`} className="hover:underline">
                      {o.orderNumber}
                    </Link>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{formatDateTime(o.createdAt)}</TableCell>
                  <TableCell>{o.customerName}</TableCell>
                  <TableCell>{o.shippingCity}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatPkr(o.totalPkr)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={o.status} />
                  </TableCell>
                </TableRow>
              ))}
              {recentOrders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-8 text-center text-muted-foreground">
                    No orders yet.
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
