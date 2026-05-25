import Link from 'next/link';
import { desc, sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { AdminOrdersQuerySchema, ORDER_STATUSES } from '@/lib/validators/admin-orders';
import { buildAdminOrdersWhere } from '@/lib/db/admin-queries';
import { PageHeader } from '@/components/admin/page-header';
import { OrderStatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPkr, formatDateTime } from '@/lib/admin/format';
import { cn } from '@/lib/utils';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 25;

type SP = Record<string, string | undefined>;

function buildQs(params: SP): string {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) if (v) sp.set(k, v);
  const s = sp.toString();
  return s ? `?${s}` : '';
}

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  await requireAdminSession(AREA_ACCESS.orders);
  const params = await searchParams;

  const parsed = AdminOrdersQuerySchema.safeParse({
    status: params.status,
    q: params.q,
    city: params.city,
    ai: params.ai,
    from: params.from,
    to: params.to,
    limit: PAGE_SIZE,
    offset: params.offset,
  });
  const filters = parsed.success
    ? parsed.data
    : { limit: PAGE_SIZE, offset: 0 as number };
  const { status, q, city, ai, from, to, offset } = filters as typeof filters & { offset: number };
  const where = buildAdminOrdersWhere({ status, q, city, ai, from, to });

  const base = db.select().from(schema.orders);
  const [orders, countRows] = await Promise.all([
    (where ? base.where(where) : base)
      .orderBy(desc(schema.orders.createdAt))
      .limit(PAGE_SIZE)
      .offset(offset),
    db
      .select({ c: sql<number>`count(*)::int` })
      .from(schema.orders)
      .where(where),
  ]);
  const total = Number(countRows[0]?.c ?? 0);

  // Preserve non-status filters when switching status tabs / pages.
  const carry: SP = { q, city, ai, from, to };
  const tabHref = (next?: string) => `/admin/orders${buildQs({ ...carry, status: next })}`;
  const pageHref = (nextOffset: number) =>
    `/admin/orders${buildQs({ ...carry, status, offset: nextOffset > 0 ? String(nextOffset) : undefined })}`;
  const exportHref = `/api/admin/orders/export${buildQs({ status, q, city, ai, from, to })}`;

  const pageStart = total === 0 ? 0 : offset + 1;
  const pageEnd = Math.min(offset + PAGE_SIZE, total);

  return (
    <div>
      <PageHeader title="Orders" description={`${total.toLocaleString('en-PK')} matching`}>
        <Button asChild variant="outline" size="sm">
          <a href={exportHref}>Export CSV</a>
        </Button>
      </PageHeader>

      {/* Status tabs */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        <Link
          href={tabHref()}
          className={cn(
            'rounded-md px-3 py-1.5 text-sm font-medium transition-colors',
            !status ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted',
          )}
        >
          All
        </Link>
        {ORDER_STATUSES.map((s) => (
          <Link
            key={s}
            href={tabHref(s)}
            className={cn(
              'rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors',
              status === s ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted',
            )}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Filter form */}
      <form method="get" action="/admin/orders" className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
        {status && <input type="hidden" name="status" value={status} />}
        <Input name="q" defaultValue={q ?? ''} placeholder="Order # / name / phone / email" maxLength={80} className="lg:col-span-2" />
        <Input name="city" defaultValue={city ?? ''} placeholder="City" maxLength={80} />
        <Input type="date" name="from" defaultValue={from ?? ''} aria-label="From date" />
        <Input type="date" name="to" defaultValue={to ?? ''} aria-label="To date" />
        <div className="flex items-center gap-3 lg:col-span-3">
          <label className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <input type="checkbox" name="ai" value="1" defaultChecked={ai === '1'} /> Used AI preview
          </label>
        </div>
        <div className="flex gap-2 lg:col-span-2 lg:justify-end">
          <Button type="submit" size="sm">Apply filters</Button>
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/orders">Reset</Link>
          </Button>
        </div>
      </form>

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order #</TableHead>
                <TableHead>When</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>AI</TableHead>
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
                  <TableCell>
                    <div>{o.customerName}</div>
                    <div className="text-xs text-muted-foreground">{o.customerPhone}</div>
                  </TableCell>
                  <TableCell>{o.shippingCity}</TableCell>
                  <TableCell className="text-right tabular-nums">{formatPkr(o.totalPkr)}</TableCell>
                  <TableCell>
                    <OrderStatusBadge status={o.status} />
                  </TableCell>
                  <TableCell>{o.usedAiPreview && <Badge variant="secondary">AI</Badge>}</TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="py-10 text-center text-muted-foreground">
                    No orders match these filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {pageStart}–{pageEnd} of {total.toLocaleString('en-PK')}
        </span>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" disabled={offset === 0}>
            <Link href={pageHref(Math.max(0, offset - PAGE_SIZE))} aria-disabled={offset === 0}>
              Previous
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" disabled={pageEnd >= total}>
            <Link href={pageHref(offset + PAGE_SIZE)} aria-disabled={pageEnd >= total}>
              Next
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
