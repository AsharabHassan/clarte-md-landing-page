'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import type { Product } from '@/lib/db/schema';
import { useCart } from '@/lib/cart/use-cart';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

export function StickyAddBar({
  product,
  triggerSelector,
}: {
  product: Product;
  triggerSelector: string;
}) {
  const { addProduct } = useCart();
  const reduced = useReducedMotion();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.querySelector(triggerSelector);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) =>
        setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0),
      { threshold: 0 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [triggerSelector]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={reduced ? { opacity: 0 } : { y: '110%', opacity: 0 }}
          animate={reduced ? { opacity: 1 } : { y: 0, opacity: 1 }}
          exit={reduced ? { opacity: 0 } : { y: '110%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            'fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-canvas/95 backdrop-blur-md',
            'shadow-[0_-10px_40px_-10px_rgba(14,31,58,0.18)]',
          )}
        >
          <div className="mx-auto flex max-w-[75rem] items-center justify-between gap-6 px-6 py-4">
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-base font-medium text-navy md:text-lg">
                {product.name}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-ink-mute">
                Rs. {product.pricePkr.toLocaleString('en-PK')}
              </p>
            </div>
            <button
              type="button"
              onClick={() => addProduct(product.sku)}
              className={cn(
                'rounded-md bg-navy px-5 py-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white',
                'transition-colors hover:bg-navy-2',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
              )}
            >
              Add to cart
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
