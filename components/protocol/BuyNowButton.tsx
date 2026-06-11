'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart/use-cart';
import { cn } from '@/lib/utils';

/**
 * Per-product express buy. Adds the single product to the existing cart
 * (no clear/replace) then routes straight to checkout. Rendered as a
 * sibling BELOW the step card's PDP link — never nested inside the anchor.
 */
export function BuyNowButton({
  sku,
  pricePkr,
}: {
  sku: string;
  pricePkr: number;
}) {
  const { addProduct } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  function buyNow(e: React.MouseEvent) {
    // The button sits near the card's PDP <Link>; guard against any
    // bubbling that would navigate to the product page instead.
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);
    try {
      addProduct(sku);
      router.push('/checkout');
    } catch {
      // Re-enable the button if the add or navigation throws, so the
      // user isn't stuck on a permanently-disabled control.
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={buyNow}
      disabled={busy}
      className={cn(
        'mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-navy px-5 py-3',
        'font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white',
        'transition-colors hover:bg-navy-2 disabled:opacity-70',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
      )}
    >
      <ShoppingBag className="h-3.5 w-3.5" aria-hidden="true" />
      {busy ? 'Adding…' : `Buy now · Rs. ${pricePkr.toLocaleString('en-PK')}`}
    </button>
  );
}
