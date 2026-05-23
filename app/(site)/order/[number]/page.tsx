/* eslint-disable react/no-unescaped-entities */
import { headers } from 'next/headers';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PageParams {
  params: Promise<{ number: string }>;
  searchParams: Promise<{ phone?: string; placed?: string }>;
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

// Status callout uses a left-bar color keyed to outcome severity.
// Neutral (cobalt) = in progress; green = delivered; destructive = cancelled/refunded.
function statusCalloutClass(status: string): string {
  switch (status) {
    case 'delivered':
      return 'bg-emerald-50 border-l-emerald-600';
    case 'cancelled':
    case 'refunded':
      return 'bg-rose-50 border-l-destructive';
    default:
      return 'bg-sky border-l-cobalt';
  }
}

async function fetchOrder(number: string, phone: string): Promise<OrderPayload | null> {
  // Derive base URL from the incoming request so this works on any
  // localhost port (dev, E2E) AND on prod (lp.clartemd.com.pk).
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

const containerClass = 'mx-auto max-w-[45rem] px-6 pt-12 pb-24';

export default async function OrderPage({ params, searchParams }: PageParams) {
  const { number } = await params;
  const { phone, placed } = await searchParams;
  const isFirstVisit = placed === '1';

  if (!phone) {
    // Phone-input form to start the lookup
    return (
      <div className={containerClass}>
        <h1 className="mb-3 mt-6 font-display text-3xl font-normal text-navy">
          Track your order
        </h1>
        <p className="mb-7 text-base text-ink-mute">
          Enter the last 4 digits of the phone number you ordered with.
        </p>
        <form method="get">
          <label className="mb-3.5 block">
            <span className="mb-1.5 block text-[13px] text-ink-mute">
              Last 4 digits of your phone
            </span>
            <Input
              name="phone"
              type="text"
              inputMode="numeric"
              maxLength={4}
              pattern="[0-9]{4}"
              required
              placeholder="XXXX"
              autoFocus
              className="h-14 text-center font-mono text-lg tracking-[0.5em]"
            />
          </label>
          <Button type="submit" size="lg" className="mt-3.5 w-full">
            Look up {number} →
          </Button>
        </form>
        <p className="mt-8 text-center text-sm text-ink-mute">
          Can't find your order?{' '}
          <a
            href="https://wa.me/923249986822"
            className="font-semibold text-cobalt no-underline hover:underline"
          >
            WhatsApp our team
          </a>
          .
        </p>
      </div>
    );
  }

  const order = await fetchOrder(number, phone);

  if (!order) {
    return (
      <div className={containerClass}>
        <h1 className="mb-3 mt-6 font-display text-3xl font-normal text-navy">
          Order not found.
        </h1>
        <p className="mb-7 text-base text-ink-mute leading-relaxed">
          We couldn't find an order matching{' '}
          <code className="rounded bg-sky px-1.5 py-0.5 font-mono text-[13px] text-navy">
            {number}
          </code>{' '}
          with phone ending{' '}
          <code className="rounded bg-sky px-1.5 py-0.5 font-mono text-[13px] text-navy">
            {phone}
          </code>
          . Double-check the order number and the phone you used at checkout.
        </p>
        <p className="text-center text-sm text-ink-mute">
          Still stuck?{' '}
          <a
            href="https://wa.me/923249986822"
            className="font-semibold text-cobalt no-underline hover:underline"
          >
            WhatsApp our team
          </a>{' '}
          and we will look it up manually.
        </p>
      </div>
    );
  }

  const copy = STATUS_COPY[order.status] || {
    label: order.status,
    sub: '',
  };

  return (
    <div className={containerClass}>
      {/*
        Mode-aware thank-you band — renders only when the user just placed
        the order (the checkout redirect appends ?placed=1). Subsequent
        visits via WhatsApp / email links omit the flag and the band stays
        hidden, so the same route doubles as the tracker.
        Per 06-thank-you.md: highest-conversion confirmation pattern in
        the Baymard data; no separate /thank-you route needed.
      */}
      {isFirstVisit && (
        <section className="mb-10 rounded-2xl border border-cobalt/25 bg-canvas-soft px-7 py-8 md:px-9 md:py-10">
          <Eyebrow className="mb-3 text-cobalt">— Order confirmed</Eyebrow>
          <h1 className="mb-3 font-display font-light text-navy text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-0.02em]">
            <em className="italic">Thank you, {order.customer_first_name}.</em>
          </h1>
          <p className="mb-7 max-w-[34rem] font-body text-[15px] leading-relaxed text-ink-2">
            We&apos;ve received order{' '}
            <span className="font-mono text-[13px] tracking-[0.02em] text-navy">
              {order.order_number}
            </span>{' '}
            and will dispatch within 24 hours. A WhatsApp confirmation is on its way.
          </p>

          <ol className="mb-7 grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
            <NextStep
              num="01"
              title="We confirm"
              body="A WhatsApp message lands within 2 hours."
            />
            <NextStep
              num="02"
              title="Courier collects"
              body="Sealed protocol leaves Lahore within 24 hours."
            />
            <NextStep
              num="03"
              title="Pay on delivery"
              body={`Rs. ${order.totals.total_pkr.toLocaleString('en-PK')} in cash to the courier.`}
            />
          </ol>

          <a
            href="https://wa.me/923249986822"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt hover:underline"
          >
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.5} />
            Need to change something? WhatsApp us
            <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
          </a>
        </section>
      )}

      <header className="mb-8 border-b border-rule pb-[22px]">
        <Eyebrow className="mb-2 text-ink-mute">Order</Eyebrow>
        {/*
          Heading level: on the first visit the celebration band's H1 is the
          page subject, so this becomes H2. On return-tracker visits there's
          no celebration band and this IS the page subject — H1.
        */}
        {isFirstVisit ? (
          <h2 className="mb-2 font-mono text-[28px] font-semibold tracking-[0.02em] text-navy">
            {order.order_number}
          </h2>
        ) : (
          <h1 className="mb-2 font-mono text-[28px] font-semibold tracking-[0.02em] text-navy">
            {order.order_number}
          </h1>
        )}
        <p className="font-mono text-[13px] text-ink-mute">
          Placed {new Date(order.created_at).toLocaleString('en-PK')} · {order.shipping_city}
        </p>
      </header>

      <section className={cn('mb-9 rounded-2xl border-l-4 px-7 py-6', statusCalloutClass(order.status))}>
        <h2 className="mb-2 font-display text-[22px] font-medium text-navy">{copy.label}</h2>
        <p className="text-[15px] leading-relaxed text-ink-2">{copy.sub}</p>
      </section>

      <section className="mb-7">
        <Eyebrow className="mb-3.5">Items</Eyebrow>
        <ul className="mb-[18px] list-none border-b border-rule p-0">
          {order.items.map((i, idx) => (
            <li
              key={idx}
              className="grid grid-cols-[1fr_auto_auto] gap-3 border-t border-rule-soft py-3 text-sm"
            >
              <span className="font-medium text-ink">
                {i.name}
                {i.is_bundle && (
                  <span className="ml-2 inline-block rounded bg-cobalt/10 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.05em] text-cobalt">
                    Bundle
                  </span>
                )}
              </span>
              <span className="font-mono text-ink-mute">×{i.qty}</span>
              <span className="text-ink tabular-nums">
                Rs. {i.line_total_pkr.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-[18px]">
          <div className="flex justify-between py-1.5 text-sm text-ink-2">
            <span>Subtotal</span>
            <span>Rs. {order.totals.subtotal_pkr.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1.5 text-sm text-ink-2">
            <span>Shipping</span>
            <span>
              {order.totals.shipping_pkr === 0
                ? 'FREE'
                : `Rs. ${order.totals.shipping_pkr.toLocaleString()}`}
            </span>
          </div>
          <div className="mt-1.5 flex justify-between border-t border-rule pt-3 font-display text-xl font-medium text-navy">
            <span>Total</span>
            <span>Rs. {order.totals.total_pkr.toLocaleString()}</span>
          </div>
        </div>
        <p className="mt-[18px] font-mono text-xs text-ink-mute">
          Payment: {order.payment_method} · {order.payment_status}
        </p>
      </section>

      <p className="mt-8 text-center text-sm text-ink-mute">
        Questions?{' '}
        <a
          href="https://wa.me/923249986822"
          className="font-semibold text-cobalt no-underline hover:underline"
        >
          WhatsApp our team
        </a>
        .
      </p>
    </div>
  );
}

function NextStep({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <li className="flex flex-col gap-2">
      <span
        aria-hidden="true"
        className="font-display italic text-cobalt text-[clamp(24px,3vw,32px)] leading-none"
      >
        {num}
      </span>
      <h3 className="font-display text-base font-medium text-navy">{title}</h3>
      <p className="font-body text-[13.5px] leading-snug text-ink-mute">{body}</p>
    </li>
  );
}
