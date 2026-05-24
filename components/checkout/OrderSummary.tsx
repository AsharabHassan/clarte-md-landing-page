'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Lock, ShieldCheck } from 'lucide-react';
import type { Cart } from '@/lib/cart/types';
import { PRODUCT_META, BUNDLE_META } from '@/lib/products/catalog';
import { bundleCinematicPath } from '@/lib/products/content';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

interface PreviewItem {
  sku: string;
  name: string;
  qty: number;
  unit_price_pkr: number;
  line_total_pkr: number;
  is_bundle: boolean;
}

interface Preview {
  items: PreviewItem[];
  totals: { subtotal_pkr: number; shipping_pkr: number; total_pkr: number };
}

interface OrderSummaryProps {
  cart: Cart;
  showPlaceOrderButton: boolean;
  submitting?: boolean;
  onPlaceOrder?: () => void;
  /** When true (default), summary collapses on mobile behind a tap-to-expand pill. */
  collapsibleOnMobile?: boolean;
}

/**
 * Renders the live cart preview (real names + prices from the server)
 * with thumbnails, line-item savings, and a sticky desktop sidebar.
 *
 * On mobile the whole summary collapses behind a tap-to-expand pill so
 * the form stays in view. Override via `collapsibleOnMobile={false}`.
 */
export function OrderSummary({
  cart,
  showPlaceOrderButton,
  submitting,
  onPlaceOrder,
  collapsibleOnMobile = true,
}: OrderSummaryProps) {
  const reduced = useReducedMotion();
  const [preview, setPreview] = useState<Preview | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    if (cart.items.length === 0) {
      setPreview(null);
      return;
    }
    (async () => {
      try {
        const res = await fetch('/api/cart/preview', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ items: cart.items }),
        });
        const data = await res.json();
        if (cancelled) return;
        if (!res.ok || !data.ok) {
          setErr(data.error || 'Could not load cart totals');
          return;
        }
        setPreview(data);
        setErr(null);
      } catch (e: unknown) {
        if (!cancelled)
          setErr(e instanceof Error ? e.message : 'Could not load cart totals');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cart]);

  if (cart.items.length === 0) {
    return (
      <aside className="rounded-2xl border border-rule bg-canvas-soft p-7 text-center">
        <h3 className="font-display text-[18px] font-medium text-navy">Order summary</h3>
        <p className="mt-3 font-display italic text-ink-mute">Your cart is empty.</p>
      </aside>
    );
  }

  if (err) {
    return (
      <aside className="rounded-2xl border border-destructive/30 bg-rose-50/50 p-7">
        <h3 className="font-display text-[18px] font-medium text-navy">Order summary</h3>
        <p className="mt-3 text-[14px] text-destructive">{err}</p>
      </aside>
    );
  }

  if (!preview) {
    return (
      <aside className="rounded-2xl border border-rule bg-canvas-soft p-7">
        <h3 className="font-display text-[18px] font-medium text-navy">Order summary</h3>
        <p className="mt-3 font-display italic text-ink-mute">Loading…</p>
      </aside>
    );
  }

  // Compute total list-price savings across the preview (sum of unit list - unit paid).
  // For bundles we already get the discounted bundle price; per-line list pricing isn't
  // returned, so we approximate via the static catalog for products.
  const productSavings = preview.items
    .filter((i) => !i.is_bundle)
    .reduce((sum, i) => {
      const meta = PRODUCT_META[i.sku];
      if (!meta) return sum;
      const lineSave = (meta.listPricePkr - i.unit_price_pkr) * i.qty;
      return sum + Math.max(0, lineSave);
    }, 0);

  const itemCount = preview.items.reduce((n, i) => n + i.qty, 0);

  return (
    <aside
      className={cn(
        'overflow-hidden rounded-2xl border border-navy/15 bg-navy-deep text-white',
        'shadow-[0_24px_60px_-24px_rgba(8,21,42,0.45)]',
        'lg:sticky lg:top-24',
      )}
    >
      {/* Mobile collapse pill — tap to reveal the line items */}
      {collapsibleOnMobile && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left lg:hidden"
        >
          <span className="inline-flex items-center gap-2">
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt-glow">
              Order summary
            </span>
            <span className="rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] tabular-nums text-white/75">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </span>
          </span>
          <span className="inline-flex items-center gap-2">
            <span className="font-display text-[16px] font-medium tabular-nums">
              Rs. {preview.totals.total_pkr.toLocaleString('en-PK')}
            </span>
            <ChevronDown
              className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')}
              strokeWidth={1.8}
            />
          </span>
        </button>
      )}

      {/* Desktop heading (always shown) + mobile body (collapsible) */}
      <div className={cn('px-6 pb-6', collapsibleOnMobile ? 'hidden lg:block' : 'pt-6')}>
        <h3 className="hidden font-display text-[18px] font-medium tracking-tight text-white lg:block">
          Order summary
          <span className="ml-2 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-white/55">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        </h3>

        <ItemsList items={preview.items} />
        <TotalsBlock
          subtotal={preview.totals.subtotal_pkr}
          shipping={preview.totals.shipping_pkr}
          total={preview.totals.total_pkr}
          savings={productSavings}
        />
        <PlaceOrderButton
          show={showPlaceOrderButton}
          submitting={submitting}
          total={preview.totals.total_pkr}
          onPlaceOrder={onPlaceOrder}
        />
        <TrustFooter />
      </div>

      {/* Mobile body — collapsible */}
      {collapsibleOnMobile && (
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              key="mobile-body"
              initial={reduced ? { height: 0 } : { height: 0, opacity: 0 }}
              animate={reduced ? { height: 'auto' } : { height: 'auto', opacity: 1 }}
              exit={reduced ? { height: 0 } : { height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="px-5 pb-5">
                <ItemsList items={preview.items} />
                <TotalsBlock
                  subtotal={preview.totals.subtotal_pkr}
                  shipping={preview.totals.shipping_pkr}
                  total={preview.totals.total_pkr}
                  savings={productSavings}
                />
                <TrustFooter />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* Mobile-only sticky place-order — ALWAYS visible when the form is in view */}
      {showPlaceOrderButton && collapsibleOnMobile && (
        <div className="border-t border-white/10 bg-navy-deep/95 px-5 py-4 backdrop-blur lg:hidden">
          <PlaceOrderButton
            show={true}
            submitting={submitting}
            total={preview.totals.total_pkr}
            onPlaceOrder={onPlaceOrder}
            compact
          />
        </div>
      )}
    </aside>
  );
}

function thumbForItem(item: PreviewItem): string | null {
  if (item.is_bundle) return bundleCinematicPath(item.sku);
  return PRODUCT_META[item.sku]?.imagePath ?? null;
}

function ItemsList({ items }: { items: PreviewItem[] }) {
  return (
    <ul className="my-5 flex flex-col gap-3 border-b border-white/10 pb-5">
      {items.map((i, idx) => {
        const thumb = thumbForItem(i);
        const displayName =
          i.is_bundle ? BUNDLE_META[i.sku]?.name ?? i.name : PRODUCT_META[i.sku]?.shortName ?? i.name;
        return (
          <li key={idx} className="flex items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-white/5">
              {thumb && (
                <Image src={thumb} alt={displayName} fill sizes="48px" className="object-cover" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="truncate font-display text-[13.5px] font-medium text-white">
                  {displayName}
                </span>
                {i.is_bundle && (
                  <span className="rounded bg-cobalt/30 px-1.5 py-0.5 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-cobalt-glow">
                    Bundle
                  </span>
                )}
              </div>
              <span className="font-mono text-[11px] text-white/55">×{i.qty}</span>
            </div>
            <span className="shrink-0 font-mono text-[13px] tabular-nums text-white">
              Rs. {i.line_total_pkr.toLocaleString('en-PK')}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

function TotalsBlock({
  subtotal,
  shipping,
  total,
  savings,
}: {
  subtotal: number;
  shipping: number;
  total: number;
  savings: number;
}) {
  return (
    <div className="flex flex-col gap-1.5 text-[13.5px] text-white/85">
      <Row label="Subtotal" value={`Rs. ${subtotal.toLocaleString('en-PK')}`} />
      <Row
        label="Shipping"
        value={shipping === 0 ? 'FREE' : `Rs. ${shipping.toLocaleString('en-PK')}`}
      />
      {savings > 0 && (
        <Row
          label="You save"
          value={`− Rs. ${savings.toLocaleString('en-PK')}`}
          accent
        />
      )}
      <div className="mt-3 flex items-baseline justify-between border-t border-white/15 pt-3">
        <span className="font-display text-[15px] font-medium text-white">Total</span>
        <span className="font-display text-[20px] font-semibold tabular-nums text-white">
          Rs. {total.toLocaleString('en-PK')}
        </span>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span>{label}</span>
      <span className={cn('font-mono tabular-nums', accent ? 'text-cobalt-glow' : 'text-white')}>
        {value}
      </span>
    </div>
  );
}

function PlaceOrderButton({
  show,
  submitting,
  total,
  onPlaceOrder,
  compact,
}: {
  show: boolean;
  submitting?: boolean;
  total: number;
  onPlaceOrder?: () => void;
  compact?: boolean;
}) {
  if (!show) return null;
  return (
    <button
      type="button"
      disabled={submitting}
      onClick={onPlaceOrder}
      className={cn(
        'mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-5 font-display text-[15px] font-semibold text-navy-deep transition-colors duration-200',
        'hover:bg-cobalt-glow',
        'disabled:cursor-wait disabled:bg-white/40 disabled:text-navy-deep/60',
        compact ? 'h-12' : 'h-14',
      )}
    >
      {submitting ? (
        <>Placing order…</>
      ) : (
        <>
          <Lock className="h-4 w-4" strokeWidth={2} />
          Place order — Rs. {total.toLocaleString('en-PK')}
        </>
      )}
    </button>
  );
}

function TrustFooter() {
  return (
    <p className="mt-4 inline-flex items-start gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/55">
      <ShieldCheck className="mt-px h-3.5 w-3.5 shrink-0 text-cobalt-glow" strokeWidth={1.5} />
      No advance payment · Pay courier on delivery · 30-day returns
    </p>
  );
}
