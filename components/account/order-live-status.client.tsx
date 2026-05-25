'use client';
import { useEffect, useState } from 'react';
import { CheckCircle2, Circle, AlertTriangle, Copy, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

const STEPS = [
  { key: 'pending', label: 'Order placed' },
  { key: 'confirmed', label: 'Confirmed' },
  { key: 'dispatched', label: 'Dispatched' },
  { key: 'delivered', label: 'Delivered' },
] as const;

const NEGATIVE: Record<string, string> = {
  cancelled: 'This order was cancelled.',
  refunded: 'This order was refunded.',
  returned: 'This order was returned to us.',
};

interface LiveOrder {
  status: string;
  courier: string | null;
  tracking_number: string | null;
}

export default function OrderLiveStatus({
  orderNumber,
  initial,
}: {
  orderNumber: string;
  initial: LiveOrder;
}) {
  const [order, setOrder] = useState<LiveOrder>(initial);
  const [copied, setCopied] = useState(false);

  // Poll for live updates every 15s while the page is open and visible.
  useEffect(() => {
    let active = true;
    async function tick() {
      if (document.visibilityState !== 'visible') return;
      try {
        const res = await fetch(`/api/account/orders/${orderNumber}`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (active && data?.ok) {
          setOrder({
            status: data.order.status,
            courier: data.order.courier,
            tracking_number: data.order.tracking_number,
          });
        }
      } catch {
        /* network blip — keep last known state */
      }
    }
    const id = setInterval(tick, 15000);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, [orderNumber]);

  const negative = NEGATIVE[order.status];
  const currentIndex = STEPS.findIndex((s) => s.key === order.status);

  async function copyTracking() {
    if (!order.tracking_number) return;
    await navigator.clipboard.writeText(order.tracking_number).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-xs text-ink-mute">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-[var(--clarte-success)] opacity-60" />
          <span className="relative inline-flex size-2 rounded-full bg-[var(--clarte-success)]" />
        </span>
        Live — updates automatically
      </div>

      {negative ? (
        <div className="flex items-start gap-2 rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm">
          <AlertTriangle className="mt-0.5 size-4 shrink-0 text-destructive" />
          <span>{negative} If you have questions, please WhatsApp us.</span>
        </div>
      ) : (
        <ol className="space-y-0">
          {STEPS.map((step, i) => {
            const done = currentIndex >= 0 && i <= currentIndex;
            const isCurrent = i === currentIndex;
            return (
              <li key={step.key} className="flex gap-3">
                <div className="flex flex-col items-center">
                  {done ? (
                    <CheckCircle2 className="size-5 text-[var(--clarte-success)]" />
                  ) : (
                    <Circle className="size-5 text-ink-faint" />
                  )}
                  {i < STEPS.length - 1 && (
                    <span className={cn('my-1 w-px flex-1', i < currentIndex ? 'bg-[var(--clarte-success)]' : 'bg-rule')} />
                  )}
                </div>
                <div className={cn('pb-6', i === STEPS.length - 1 && 'pb-0')}>
                  <div className={cn('text-sm font-medium', isCurrent ? 'text-navy' : done ? 'text-ink' : 'text-ink-faint')}>
                    {step.label}
                  </div>
                  {isCurrent && <div className="text-xs text-cobalt">Current status</div>}
                </div>
              </li>
            );
          })}
        </ol>
      )}

      {/* Tracking */}
      <div className="rounded-lg border border-rule bg-canvas-soft p-4">
        <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-mute">Courier tracking</div>
        {order.tracking_number ? (
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <div>
              <div className="text-sm text-ink-mute">{order.courier ?? 'Courier'}</div>
              <div className="font-mono text-base font-medium text-navy">{order.tracking_number}</div>
            </div>
            <button
              type="button"
              onClick={copyTracking}
              className="inline-flex items-center gap-1.5 rounded-md border border-rule px-2.5 py-1.5 text-xs text-ink-mute transition-colors hover:bg-sky"
            >
              {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        ) : (
          <p className="mt-2 text-sm text-ink-mute">
            A tracking number will appear here once your order is dispatched.
          </p>
        )}
      </div>
    </div>
  );
}
