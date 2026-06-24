'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';
import { Eyebrow } from '@/components/ui/eyebrow';
import { useCart } from '@/lib/cart/use-cart';
import { cn } from '@/lib/utils';

/**
 * Right-side cart drawer (shadcn Sheet). Replaces the previous
 * cart-icon-as-direct-link to /cart, which was the outlier across the 8
 * cart references (04-cart.md). All 8 reference brands slide a drawer on
 * add or icon-click.
 *
 * Composition rules:
 *   - Items list shows human-friendly names via /api/cart/preview (same
 *     endpoint OrderSummary uses).
 *   - Shipping is free on all orders — surfaced as a fact, not a threshold,
 *     per feedback_unverified_claims.
 *   - WhatsApp concierge link in the footer (04-cart.md + 06-thank-you.md):
 *     the Bader empty-bag pattern translated to PK's WhatsApp-first market.
 *   - The opt-in sample tile (BoJ pattern) is deferred until sample SKUs
 *     exist operationally — see the SAMPLE_TILE_SLOT comment for where it
 *     drops in.
 *   - "View full cart" link preserves the existing /cart page for
 *     deep editing (quantity, remove with confirmation).
 *
 * Trigger: the CartIcon component owns the trigger button; this file just
 * exports the drawer body keyed by an external open/onOpenChange.
 */

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

const WHATSAPP_HREF = 'https://wa.me/923249986822';

export function CartDrawer({
  open,
  onOpenChange,
  trigger,
}: {
  open: boolean;
  onOpenChange: (next: boolean) => void;
  trigger: React.ReactNode;
}) {
  const { cart, removeItem, updateQty } = useCart();
  const [preview, setPreview] = useState<Preview | null>(null);
  const [previewError, setPreviewError] = useState<string | null>(null);

  // Re-fetch preview every time the cart contents change OR the drawer opens.
  // /api/cart/preview is cheap (in-process DB read) and the open trigger
  // is the moment the customer is most likely to spot a stale total.
  useEffect(() => {
    let cancelled = false;
    if (cart.items.length === 0 || !open) {
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
        const data = (await res.json()) as Preview & { ok?: boolean; error?: string };
        if (cancelled) return;
        if (!res.ok || data.ok === false) {
          setPreviewError(data.error || 'Could not load totals.');
          return;
        }
        setPreview(data);
        setPreviewError(null);
      } catch (e: unknown) {
        if (!cancelled)
          setPreviewError(e instanceof Error ? e.message : 'Could not load totals.');
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cart, open]);

  const isEmpty = cart.items.length === 0;

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="flex w-full flex-col gap-0 p-0 bg-canvas sm:w-[27rem] sm:max-w-[27rem]"
      >
        <SheetHeader className="border-b border-rule px-6 py-5">
          <SheetTitle className="flex items-baseline justify-between gap-3 font-display text-xl font-normal text-navy">
            <span>Your cart</span>
            {!isEmpty && (
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
              </span>
            )}
          </SheetTitle>
        </SheetHeader>

        {isEmpty ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-12 text-center">
            <ShoppingBag
              className="h-10 w-10 text-ink-faint"
              strokeWidth={1.25}
              aria-hidden="true"
            />
            <p className="font-display italic text-xl text-navy">Your cart is empty.</p>
            <p className="max-w-[16rem] font-body text-sm text-ink-mute">
              Browse the four protocols or shop individual formulations to get started.
            </p>
            <div className="flex flex-col gap-2.5">
              <SheetClose asChild>
                <Link
                  href="/products"
                  className={cn(
                    'inline-flex items-center justify-center rounded-md border border-navy px-6 py-2.5',
                    'font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-navy',
                    'transition-colors hover:bg-navy hover:text-white',
                  )}
                >
                  Browse the catalogue
                </Link>
              </SheetClose>
              <SheetClose asChild>
                <Link
                  href="/quiz"
                  className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt hover:underline"
                >
                  Or take the 30-second quiz
                </Link>
              </SheetClose>
            </div>
            <ConciergeLink className="mt-6" />
          </div>
        ) : (
          <>
            {/* Items list — scrolls independently of header/footer */}
            <ul className="flex-1 overflow-y-auto px-6 py-4">
              {cart.items.map((item, idx) => {
                const previewItem = preview?.items[idx];
                const displayName =
                  previewItem?.name ||
                  (item.type === 'bundle' ? item.slug : item.sku);
                const linePrice = previewItem?.line_total_pkr;
                return (
                  <li
                    key={`${item.type}-${idx}`}
                    className="border-b border-rule-soft py-4 last:border-b-0"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <Eyebrow className="mb-1 text-cobalt">
                          {item.type === 'bundle' ? 'Protocol bundle' : 'Single SKU'}
                        </Eyebrow>
                        <p className="font-display text-[15px] font-medium leading-tight text-navy">
                          {displayName}
                        </p>
                      </div>
                      {linePrice != null && (
                        <span className="whitespace-nowrap font-display text-[15px] text-navy">
                          Rs. {linePrice.toLocaleString('en-PK')}
                        </span>
                      )}
                    </div>
                    <div className="mt-3 flex items-center justify-between gap-3">
                      {item.type === 'product' ? (
                        <div className="inline-flex items-center gap-1 rounded-md border border-rule p-0.5">
                          <button
                            type="button"
                            onClick={() => updateQty(idx, item.qty - 1)}
                            aria-label="Decrease quantity"
                            className="h-7 w-7 cursor-pointer rounded text-navy transition-colors hover:bg-sky"
                          >
                            −
                          </button>
                          <span className="min-w-[20px] text-center font-mono text-[13px]">
                            {item.qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQty(idx, item.qty + 1)}
                            aria-label="Increase quantity"
                            className="h-7 w-7 cursor-pointer rounded text-navy transition-colors hover:bg-sky"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
                          ×1 bundle
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => removeItem(idx)}
                        className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute transition-colors hover:text-destructive"
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                );
              })}

              {/*
                SAMPLE_TILE_SLOT — when 1ml sample SKUs ship, render the
                opt-in tile here per the BoJ pattern (04-cart.md #1):
                  <SampleOptInTile />
                Single card with 2-3 sample swatches, each with its own
                explicit Add button (no auto-bundle). Operationally gated on
                whoever ships the sample SKUs.
              */}
            </ul>

            {/* Totals + CTAs in a sticky footer */}
            <div className="border-t border-rule bg-canvas-soft px-6 py-5">
              {previewError ? (
                <p className="mb-3 font-mono text-[11px] tracking-[0.05em] text-destructive">
                  {previewError}
                </p>
              ) : preview ? (
                <dl className="mb-4 space-y-1.5">
                  <div className="flex justify-between font-body text-sm text-ink-mute">
                    <dt>Subtotal</dt>
                    <dd>Rs. {preview.totals.subtotal_pkr.toLocaleString('en-PK')}</dd>
                  </div>
                  <div className="flex justify-between font-body text-sm text-ink-mute">
                    <dt>Shipping</dt>
                    <dd>
                      {preview.totals.shipping_pkr === 0
                        ? 'FREE'
                        : `Rs. ${preview.totals.shipping_pkr.toLocaleString('en-PK')}`}
                    </dd>
                  </div>
                  <div className="flex justify-between border-t border-rule pt-2 font-display text-base font-medium text-navy">
                    <dt>Total</dt>
                    <dd>Rs. {preview.totals.total_pkr.toLocaleString('en-PK')}</dd>
                  </div>
                </dl>
              ) : (
                <p className="mb-4 font-mono text-[11px] tracking-[0.05em] text-ink-mute">
                  Loading totals…
                </p>
              )}

              <p className="mb-4 rounded-md border border-cobalt/30 bg-card px-3 py-2.5 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt">
                Cash on delivery · pay courier on arrival
              </p>

              <div className="flex flex-col gap-2.5">
                <SheetClose asChild>
                  <Link
                    href="/checkout"
                    className={cn(
                      'inline-flex items-center justify-center gap-2 rounded-md bg-navy px-6 py-3.5 text-white',
                      'font-mono text-[12px] font-semibold uppercase tracking-[0.18em]',
                      'transition-colors hover:bg-navy-2',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2',
                    )}
                  >
                    Checkout →
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    href="/cart"
                    className="text-center font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-mute hover:text-navy hover:underline"
                  >
                    View the full cart
                  </Link>
                </SheetClose>
              </div>

              <ConciergeLink className="mt-5 border-t border-rule pt-4" />
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}

function ConciergeLink({ className }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_HREF}
      target="_blank"
      rel="noopener"
      className={cn(
        'flex items-center justify-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em]',
        'text-ink-mute transition-colors hover:text-cobalt',
        className,
      )}
    >
      <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" strokeWidth={1.5} />
      Questions before you order? WhatsApp us
    </a>
  );
}
