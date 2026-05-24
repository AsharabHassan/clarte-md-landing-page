'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useCart } from '@/lib/cart/use-cart';
import { CartDrawer } from '@/components/cart/CartDrawer';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

export function CartIcon() {
  const { cart } = useCart();
  const [open, setOpen] = useState(false);
  const count = cart.items.reduce((n, i) => n + i.qty, 0);
  const reduced = useReducedMotion();
  const prevCount = useRef(count);
  const [bumpKey, setBumpKey] = useState(0);

  useEffect(() => {
    if (count > prevCount.current) setBumpKey((k) => k + 1);
    prevCount.current = count;
  }, [count]);

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
          <motion.span
            key={`bump-${bumpKey}`}
            initial={reduced ? false : { scale: 1 }}
            animate={reduced ? undefined : { scale: [1, 1.25, 0.95, 1] }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex"
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
          </motion.span>
          {count > 0 && (
            <motion.span
              key={`count-${count}`}
              initial={reduced ? false : { y: -6, opacity: 0, scale: 0.7 }}
              animate={reduced ? undefined : { y: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
              className={cn(
                'absolute right-0.5 top-0.5 flex h-[18px] min-w-[18px] items-center justify-center',
                'rounded-full bg-cobalt px-[5px]',
                'text-[11px] font-semibold leading-none text-white',
              )}
            >
              {count}
            </motion.span>
          )}
        </button>
      }
    />
  );
}
