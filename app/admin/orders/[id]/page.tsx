import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import OrderStatusButtons from './buttons.client';

export const dynamic = 'force-dynamic';

export default async function AdminOrderDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  await requireAdminSession();
  const { id } = await params;

  const [order] = await db.select().from(schema.orders).where(eq(schema.orders.id, id)).limit(1);
  if (!order) notFound();

  const items = await db
    .select()
    .from(schema.orderItems)
    .where(eq(schema.orderItems.orderId, id));
  const ai = order.aiSessionId
    ? (
        await db
          .select()
          .from(schema.aiSessions)
          .where(eq(schema.aiSessions.id, order.aiSessionId))
          .limit(1)
      )[0]
    : null;

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 24, fontFamily: 'system-ui' }}>
      <Link href="/admin/orders">← all orders</Link>
      <h1 style={{ fontSize: 24, fontFamily: 'monospace', marginTop: 16 }}>{order.orderNumber}</h1>
      <p style={{ color: '#888' }}>{new Date(order.createdAt).toLocaleString('en-PK')}</p>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Customer</h2>
        <p>
          {order.customerName} · {order.customerPhone} · {order.customerEmail}
        </p>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Shipping</h2>
        <p>
          {order.shippingAddress}
          <br />
          {order.shippingCity}
          {order.shippingPostal ? ` ${order.shippingPostal}` : ''}
        </p>
        {order.shippingNotes && <p style={{ color: '#666' }}>Notes: {order.shippingNotes}</p>}
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Items</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
          <tbody>
            {items.map((i) => (
              <tr key={i.id}>
                <td style={{ padding: 4 }}>{i.name}</td>
                <td>×{i.qty}</td>
                <td style={{ textAlign: 'right' }}>
                  Rs. {(i.unitPricePkr * i.qty).toLocaleString()}
                </td>
              </tr>
            ))}
            <tr style={{ borderTop: '1px solid #ddd' }}>
              <td colSpan={2} style={{ padding: 4 }}>
                Subtotal
              </td>
              <td style={{ textAlign: 'right' }}>Rs. {order.subtotalPkr.toLocaleString()}</td>
            </tr>
            <tr>
              <td colSpan={2}>Shipping</td>
              <td style={{ textAlign: 'right' }}>Rs. {order.shippingPkr.toLocaleString()}</td>
            </tr>
            <tr style={{ fontWeight: 'bold' }}>
              <td colSpan={2}>Total</td>
              <td style={{ textAlign: 'right' }}>Rs. {order.totalPkr.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>
      </section>

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Payment</h2>
        <p>
          {order.paymentMethod.toUpperCase()} · {order.paymentStatus}
        </p>
      </section>

      {ai && (
        <section
          style={{ marginTop: 24, padding: 12, background: '#f8f8f8', borderRadius: 6 }}
        >
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>AI Preview Used</h2>
          <p style={{ fontSize: 13, color: '#666' }}>
            Model: {ai.modelVersion}
            <br />
            Latency: {ai.latencyMs}ms
            <br />
            Created: {new Date(ai.createdAt).toLocaleString('en-PK')}
          </p>
        </section>
      )}

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 16, marginBottom: 8 }}>Status</h2>
        <p>
          Current: <strong>{order.status}</strong>
        </p>
        <OrderStatusButtons orderId={order.id} current={order.status} />
      </section>
    </main>
  );
}
