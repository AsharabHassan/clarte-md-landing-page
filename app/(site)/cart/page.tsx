'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import { OrderSummary } from '@/components/checkout/OrderSummary';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { cn } from '@/lib/utils';

export default function CartPage() {
  const { cart, removeItem, updateQty } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="mx-auto max-w-[30rem] px-6 pt-24 pb-32 text-center">
        <h1 className="mb-3 font-display text-3xl font-normal text-navy">
          Your cart is empty.
        </h1>
        <p className="mb-7 text-base text-ink-mute">
          Browse our protocols or individual products to get started.
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <Button asChild size="lg">
            <Link href="/products">Browse the catalogue →</Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/quiz">Take the skin quiz</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[75rem] px-6 pt-12 pb-20">
      <header className="mb-8 border-b border-rule pb-[18px]">
        <h1 className="mb-1.5 font-display text-4xl font-normal text-navy">Your cart</h1>
        <p className="font-mono text-[13px] text-ink-mute">
          {cart.items.length} {cart.items.length === 1 ? 'item' : 'items'}
        </p>
      </header>
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_23.75rem]">
        <div className="flex flex-col">
          {cart.items.map((item, idx) => (
            <div
              key={`${item.type}-${idx}`}
              className="flex items-center justify-between border-b border-rule-soft py-5"
            >
              <div className="flex-1">
                <Eyebrow className="mb-1 text-cobalt">
                  {item.type === 'bundle' ? 'Bundle' : 'Product'}
                </Eyebrow>
                <div className="font-display text-[17px] font-medium text-navy">
                  {item.type === 'bundle' ? item.slug : item.sku}
                </div>
              </div>
              <div className="flex items-center gap-3.5">
                {item.type === 'product' ? (
                  <div className="flex items-center gap-2 rounded-md border border-rule p-1">
                    <button
                      type="button"
                      onClick={() => updateQty(idx, item.qty - 1)}
                      aria-label="Decrease quantity"
                      className={cn(
                        'h-7 w-7 rounded-md text-base text-navy',
                        'cursor-pointer transition-colors hover:bg-sky',
                      )}
                    >
                      −
                    </button>
                    <span className="min-w-[22px] text-center font-mono text-sm">
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      onClick={() => updateQty(idx, item.qty + 1)}
                      aria-label="Increase quantity"
                      className={cn(
                        'h-7 w-7 rounded-md text-base text-navy',
                        'cursor-pointer transition-colors hover:bg-sky',
                      )}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <span className="min-w-8 text-center font-mono text-sm text-ink-mute">
                    ×1
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => removeItem(idx)}
                  aria-label="Remove"
                  className={cn(
                    'cursor-pointer bg-transparent px-2.5 py-1.5',
                    'text-[13px] text-ink-mute',
                    'transition-colors hover:text-destructive hover:underline',
                  )}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6">
            <Button asChild size="lg">
              <Link href="/checkout">Proceed to checkout →</Link>
            </Button>
            <Link
              href="/products"
              className="text-sm text-ink-mute no-underline transition-colors hover:text-navy hover:underline"
            >
              ← Keep browsing
            </Link>
          </div>
        </div>
        <OrderSummary cart={cart} showPlaceOrderButton={false} />
      </div>
    </div>
  );
}
