'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';
import { PRODUCT_CONTENT, productImagePaths } from '@/lib/products/content';
import { useReducedMotion } from '@/lib/anim/hooks';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const reduced = useReducedMotion();
  const content = PRODUCT_CONTENT[product.sku];
  const images = content ? productImagePaths(product.sku) : null;
  const heroImage = images ? images.hero : product.imageUrl;
  const swapImage = images ? images.views[0] : null;

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-card',
        'transition-[border-color,box-shadow] duration-300',
        'hover:border-navy hover:shadow-[0_24px_48px_-20px_rgba(14,31,58,0.2)]',
      )}
    >
      <Link href={`/products/${product.sku}`} className="block">
        <div className="relative flex aspect-square items-center justify-center overflow-hidden bg-sky">
          {heroImage ? (
            <>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={heroImage}
                alt={product.name}
                loading="lazy"
                className={cn(
                  'absolute inset-0 h-full w-full object-cover',
                  'transition-opacity duration-500 ease-out',
                  swapImage ? 'group-hover:opacity-0' : '',
                )}
              />
              {swapImage && (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={swapImage}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className={cn(
                    'absolute inset-0 h-full w-full object-cover opacity-0',
                    'transition-opacity duration-500 ease-out',
                    'group-hover:opacity-100',
                  )}
                />
              )}
              <div className="lightsweep-overlay" aria-hidden="true" />
            </>
          ) : (
            <span className="font-mono text-[11px] tracking-[0.05em] text-ink-faint">
              [Photo pending]
            </span>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link href={`/products/${product.sku}`} className="text-inherit">
          <h3 className="mb-2 font-display text-[17px] font-medium leading-tight text-navy">
            {product.name}
          </h3>
        </Link>
        {product.actives && (
          <p className="mb-5 flex-1 font-mono text-[11px] tracking-[0.03em] text-ink-mute">
            {product.actives}
          </p>
        )}
        <button
          type="button"
          onClick={() => addProduct(product.sku)}
          aria-label={`Add ${product.name} to cart for Rs. ${product.pricePkr.toLocaleString('en-PK')}`}
          className={cn(
            // Tighter on mobile (narrow rail cards); identical to original on sm+.
            'group/btn flex w-full items-center justify-between gap-2 whitespace-nowrap sm:gap-3',
            'rounded-md border border-cobalt/40 bg-transparent px-3 py-3 text-cobalt sm:px-4',
            'font-mono text-[10px] font-medium uppercase tracking-[0.06em] sm:text-[11px] sm:tracking-[0.18em]',
            'transition-colors duration-150',
            'hover:border-cobalt hover:bg-cobalt hover:text-white',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          )}
        >
          <span>+ Add</span>
          <span className="font-mono tracking-[0.04em] sm:tracking-[0.08em]">
            Rs. {product.pricePkr.toLocaleString('en-PK')}
          </span>
        </button>
      </div>
    </motion.article>
  );
}
