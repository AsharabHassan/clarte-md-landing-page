import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AdminOrdersQuerySchema } from '@/lib/validators/admin-orders';
import { buildAdminOrdersWhere } from '@/lib/db/admin-queries';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; q?: string }>;
}) {
  await requireAdminSession();
  const params = await searchParams;

  const parsed = AdminOrdersQuerySchema.safeParse({
    status: params.status,
    q: params.q,
  });
  const { status, q } = parsed.success ? parsed.data : { status: undefined, q: undefined };
  const where = buildAdminOrdersWhere({ status, q });

  const baseQuery = db.select().from(schema.orders);
  const orders = await (where ? baseQuery.where(where) : baseQuery)
    .orderBy(desc(schema.orders.createdAt))
    .limit(100);

  const statusHref = (next?: string) => {
    const sp = new URLSearchParams();
    if (next) sp.set('status', next);
    if (q) sp.set('q', q);
    const qs = sp.toString();
    return qs ? `/admin/orders?${qs}` : '/admin/orders';
  };

  return (
    <main style={{ maxWidth: 1200, margin: '40px auto', padding: 24, fontFamily: 'system-ui' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: 24,
        }}
      >
        <h1 style={{ fontSize: 24 }}>Orders</h1>
        <nav style={{ display: 'flex', gap: 12, fontSize: 14 }}>
          <Link href={statusHref()}>All</Link>
          <Link href={statusHref('pending')}>Pending</Link>
          <Link href={statusHref('confirmed')}>Confirmed</Link>
          <Link href={statusHref('dispatched')}>Dispatched</Link>
          <Link href={statusHref('delivered')}>Delivered</Link>
        </nav>
      </header>
      <form
        method="get"
        action="/admin/orders"
        style={{ display: 'flex', gap: 8, marginBottom: 16, fontSize: 14 }}
      >
        {status && <input type="hidden" name="status" value={status} />}
        <input
          type="search"
          name="q"
          defaultValue={q ?? ''}
          placeholder="Search order # / name / phone / email / city"
          maxLength={80}
          style={{
            flex: 1,
            padding: '6px 10px',
            border: '1px solid #ccc',
            borderRadius: 4,
            fontFamily: 'inherit',
            fontSize: 14,
          }}
        />
        <button
          type="submit"
          style={{
            padding: '6px 14px',
            border: '1px solid #333',
            background: '#fff',
            cursor: 'pointer',
            fontSize: 14,
          }}
        >
          Search
        </button>
        {q && (
          <Link
            href={statusHref(status)}
            style={{ padding: '6px 0', color: '#888', textDecoration: 'underline' }}
          >
            clear
          </Link>
        )}
      </form>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
        <thead>
          <tr style={{ textAlign: 'left', borderBottom: '1px solid #ddd' }}>
            <th style={{ padding: 8 }}>Order #</th>
            <th>When</th>
            <th>Customer</th>
            <th>City</th>
            <th>Total</th>
            <th>Status</th>
            <th>AI?</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} style={{ borderBottom: '1px solid #f0f0f0' }}>
              <td style={{ padding: 8, fontFamily: 'monospace' }}>{o.orderNumber}</td>
              <td>{new Date(o.createdAt).toLocaleString('en-PK')}</td>
              <td>
                {o.customerName}
                <br />
                <span style={{ color: '#888' }}>{o.customerPhone}</span>
              </td>
              <td>{o.shippingCity}</td>
              <td>Rs. {o.totalPkr.toLocaleString()}</td>
              <td>{o.status}</td>
              <td>{o.usedAiPreview ? '✓' : ''}</td>
              <td>
                <Link href={`/admin/orders/${o.id}`}>open →</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {orders.length === 0 && <p style={{ marginTop: 32, color: '#888' }}>No orders.</p>}
    </main>
  );
}
