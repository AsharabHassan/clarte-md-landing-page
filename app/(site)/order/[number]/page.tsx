/* eslint-disable react/no-unescaped-entities */
import { headers } from 'next/headers';
import './order.css';

interface PageParams {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ phone?: string }>;
}

interface OrderPayload {
  order_number: string;
  status: string;
  payment_status: string;
  payment_method: string;
  customer_first_name: string;
  shipping_city: string;
  items: Array<{
    name: string;
    qty: number;
    unit_price_pkr: number;
    line_total_pkr: number;
    is_bundle: boolean;
  }>;
  totals: { subtotal_pkr: number; shipping_pkr: number; total_pkr: number };
  created_at: string;
}

const STATUS_COPY: Record<string, { label: string; sub: string }> = {
  pending: {
    label: 'Order received',
    sub: 'We are confirming and will dispatch within 24 hours.',
  },
  confirmed: {
    label: 'Confirmed — preparing',
    sub: 'Packing now. Courier collects within 24 hours.',
  },
  dispatched: {
    label: 'On the way',
    sub: 'The courier has it. You will receive a tracking SMS shortly.',
  },
  delivered: {
    label: 'Delivered',
    sub: 'Welcome to the protocol. Message our team on WhatsApp anytime.',
  },
  cancelled: {
    label: 'Cancelled',
    sub: 'This order was cancelled. WhatsApp us if you need help.',
  },
  refunded: {
    label: 'Refunded',
    sub: 'A refund was issued. WhatsApp us with questions.',
  },
};

async function fetchOrder(number: string, phone: string): Promise<OrderPayload | null> {
  // Derive base URL from the incoming request so this works on any
  // localhost port (dev, E2E) AND on prod (lp.clartemd.com.pk). The
  // previous hardcoded :3000 fallback crashed the page if the dev
  // server ran on a different port and NEXT_PUBLIC_SITE_URL was unset.
  const h = await headers();
  const host = h.get('host') ?? 'localhost:3000';
  const proto = h.get('x-forwarded-proto') ?? (host.startsWith('localhost') ? 'http' : 'https');
  const base = `${proto}://${host}`;
  const res = await fetch(
    `${base}/api/order/${encodeURIComponent(number)}?phone=${encodeURIComponent(phone)}`,
    { cache: 'no-store' },
  );
  if (!res.ok) return null;
  const data = await res.json();
  return data.order;
}

export default async function OrderPage({ params, searchParams }: PageParams) {
  const { number } = await params;
  const { phone } = await searchParams;

  if (!phone) {
    // Phone-input form to start the lookup
    return (
      <div className="order-page-empty">
        <h1>Track your order</h1>
        <p className="order-lede">
          Enter the last 4 digits of the phone number you ordered with.
        </p>
        <form method="get" className="order-lookup-form">
          <label>
            Last 4 digits of your phone
            <input
              name="phone"
              type="text"
              inputMode="numeric"
              maxLength={4}
              pattern="[0-9]{4}"
              required
              placeholder="XXXX"
              autoFocus
            />
          </label>
          <button type="submit" className="btn btn-primary">
            Look up {number} →
          </button>
        </form>
        <p className="order-foot">
          Can't find your order? <a href="https://wa.me/923249986822">WhatsApp our team</a>.
        </p>
      </div>
    );
  }

  const order = await fetchOrder(number, phone);

  if (!order) {
    return (
      <div className="order-page-empty">
        <h1>Order not found.</h1>
        <p className="order-lede">
          We couldn't find an order matching <code>{number}</code> with phone ending{' '}
          <code>{phone}</code>. Double-check the order number and the phone you used at
          checkout.
        </p>
        <p className="order-foot">
          Still stuck? <a href="https://wa.me/923249986822">WhatsApp our team</a> and we will
          look it up manually.
        </p>
      </div>
    );
  }

  const copy = STATUS_COPY[order.status] || {
    label: order.status,
    sub: '',
  };

  return (
    <div className="order-page">
      <header className="order-header">
        <div className="mono eyebrow">Order</div>
        <h1>{order.order_number}</h1>
        <p className="order-meta mono">
          Placed {new Date(order.created_at).toLocaleString('en-PK')} ·{' '}
          {order.shipping_city}
        </p>
      </header>

      <section className={`order-status order-status-${order.status}`}>
        <h2>{copy.label}</h2>
        <p>{copy.sub}</p>
      </section>

      <section className="order-items-section">
        <h3>Items</h3>
        <ul className="order-items">
          {order.items.map((i, idx) => (
            <li key={idx} className="order-item">
              <span className="order-item-name">
                {i.name}
                {i.is_bundle && <span className="order-item-tag">Bundle</span>}
              </span>
              <span className="order-item-qty">×{i.qty}</span>
              <span className="order-item-price">
                Rs. {i.line_total_pkr.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="order-totals">
          <div className="row">
            <span>Subtotal</span>
            <span>Rs. {order.totals.subtotal_pkr.toLocaleString()}</span>
          </div>
          <div className="row">
            <span>Shipping</span>
            <span>
              {order.totals.shipping_pkr === 0
                ? 'FREE'
                : `Rs. ${order.totals.shipping_pkr.toLocaleString()}`}
            </span>
          </div>
          <div className="row grand">
            <span>Total</span>
            <span>Rs. {order.totals.total_pkr.toLocaleString()}</span>
          </div>
        </div>
        <p className="order-payment mono">
          Payment: {order.payment_method} · {order.payment_status}
        </p>
      </section>

      <p className="order-foot">
        Questions? <a href="https://wa.me/923249986822">WhatsApp our team</a>.
      </p>
    </div>
  );
}
