import Link from 'next/link';
import { desc } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';

export const dynamic = 'force-dynamic';

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  await requireAdminSession();
  const params = await searchParams;

  const orders = await db
    .select()
    .from(schema.orders)
    .orderBy(desc(schema.orders.createdAt))
    .limit(100);
  const filtered = params.status ? orders.filter((o) => o.status === params.status) : orders;

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
          <Link href="/admin/orders">All</Link>
          <Link href="/admin/orders?status=pending">Pending</Link>
          <Link href="/admin/orders?status=confirmed">Confirmed</Link>
          <Link href="/admin/orders?status=dispatched">Dispatched</Link>
          <Link href="/admin/orders?status=delivered">Delivered</Link>
        </nav>
      </header>
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
          {filtered.map((o) => (
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
      {filtered.length === 0 && <p style={{ marginTop: 32, color: '#888' }}>No orders.</p>}
    </main>
  );
}
