import Link from 'next/link';
import { asc, ilike, or, sql, type SQL } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { getCustomerAggregates } from '@/lib/db/customer-queries';
import { PageHeader } from '@/components/admin/page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { formatPkr, formatDate } from '@/lib/admin/format';

export const dynamic = 'force-dynamic';

const PAGE_SIZE = 50;
type SP = Record<string, string | undefined>;

export default async function CustomersPage({ searchParams }: { searchParams: Promise<SP> }) {
  await requireAdminSession(AREA_ACCESS.customers);
  const params = await searchParams;
  const q = params.q?.trim() || undefined;
  const offset = Math.max(0, Number(params.offset ?? 0) || 0);

  let where: SQL | undefined;
  if (q) {
    const needle = `%${q}%`;
    where = or(
      ilike(schema.customers.name, needle),
      ilike(schema.customers.phone, needle),
      ilike(schema.customers.email, needle),
      ilike(schema.customers.city, needle),
    );
  }

  const base = db.select().from(schema.customers);
  const [customers, countRows, agg] = await Promise.all([
    (where ? base.where(where) : base).orderBy(asc(schema.customers.name)).limit(PAGE_SIZE).offset(offset),
    db.select({ c: sql<number>`count(*)::int` }).from(schema.customers).where(where),
    getCustomerAggregates(),
  ]);
  const total = Number(countRows[0]?.c ?? 0);

  const hrefWith = (next: SP) => {
    const sp = new URLSearchParams();
    for (const [k, v] of Object.entries({ q, ...next })) if (v) sp.set(k, String(v));
    const s = sp.toString();
    return `/admin/customers${s ? `?${s}` : ''}`;
  };

  return (
    <div>
      <PageHeader title="Customers" description={`${total.toLocaleString('en-PK')} ${q ? 'matching' : 'total'}`}>
        <Button asChild size="sm" variant="outline">
          {/* CSV download endpoint, not a page — a real anchor is correct here. */}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/api/admin/customers/export">Export CSV</a>
        </Button>
      </PageHeader>

      <form method="get" action="/admin/customers" className="mb-4 flex gap-2">
        <Input name="q" defaultValue={q ?? ''} placeholder="Search name / phone / email / city" maxLength={80} className="max-w-md" />
        <Button type="submit" size="sm">Search</Button>
        {q && (
          <Button asChild variant="ghost" size="sm">
            <Link href="/admin/customers">Reset</Link>
          </Button>
        )}
      </form>

      <Card className="py-0">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>City</TableHead>
                <TableHead className="text-right">Orders</TableHead>
                <TableHead className="text-right">Total spent</TableHead>
                <TableHead>Last order</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((c) => {
                const a = agg.get(c.id);
                return (
                  <TableRow key={c.id}>
                    <TableCell className="font-medium">
                      <Link href={`/admin/customers/${c.id}`} className="text-secondary hover:underline">
                        {c.name}
                      </Link>
                      {c.email && <div className="text-xs text-muted-foreground">{c.email}</div>}
                    </TableCell>
                    <TableCell className="tabular-nums">{c.phone}</TableCell>
                    <TableCell>{c.city ?? '—'}</TableCell>
                    <TableCell className="text-right tabular-nums">{a?.orders ?? 0}</TableCell>
                    <TableCell className="text-right tabular-nums">{formatPkr(a?.spent ?? 0)}</TableCell>
                    <TableCell className="text-muted-foreground">{a?.lastOrder ? formatDate(a.lastOrder) : '—'}</TableCell>
                  </TableRow>
                );
              })}
              {customers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                    No customers found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {total === 0 ? 0 : offset + 1}–{Math.min(offset + PAGE_SIZE, total)} of {total.toLocaleString('en-PK')}
        </span>
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" disabled={offset === 0}>
            <Link href={hrefWith({ offset: String(Math.max(0, offset - PAGE_SIZE)) })}>Previous</Link>
          </Button>
          <Button asChild variant="outline" size="sm" disabled={offset + PAGE_SIZE >= total}>
            <Link href={hrefWith({ offset: String(offset + PAGE_SIZE) })}>Next</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
