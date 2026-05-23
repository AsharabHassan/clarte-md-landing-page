'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart/use-cart';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { cn } from '@/lib/utils';

/**
 * Cart trigger in the site header. Previously a direct link to /cart;
 * now opens the right-side cart drawer (composed via CartDrawer). The
 * deep /cart page is still reachable from inside the drawer for the
 * full editing UX.
 */
export function CartIcon() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const count = cart.items.reduce((n, i) => n + i.qty, 0);

  return (
    <CartDrawer
      open={open}
      onOpenChange={setOpen}
      trigger={
        <button
          type="button"
          aria-label={count > 0 ? `Cart (${count} item${count === 1 ? '' : 's'})` : 'Cart'}
          aria-haspopup="dialog"
          aria-expanded={open}
          className={cn(
            'relative inline-flex h-10 w-10 cursor-pointer items-center justify-center bg-transparent',
            'text-ink transition-colors hover:text-cobalt',
            'focus-visible:outline-none focus-visible:text-cobalt',
          )}
        >
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path
              d="M3 4h2l2 12h12l2-8H6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <circle cx="9" cy="20" r="1.5" fill="currentColor" />
            <circle cx="17" cy="20" r="1.5" fill="currentColor" />
          </svg>
          {count > 0 && (
            <span
              aria-hidden="true"
              className={cn(
                'absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center',
                'rounded-full bg-cobalt px-[5px]',
                'text-[11px] font-semibold leading-none text-white',
              )}
            >
              {count}
            </span>
          )}
        </button>
      }
    />
  );
}
