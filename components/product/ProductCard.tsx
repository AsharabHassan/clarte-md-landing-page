'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';
import { PRODUCT_CONTENT, productImagePaths } from '@/lib/products/content';
import { cn } from '@/lib/utils';

/**
 * Card composition (post Phase 3a research-driven polish):
 *   - Hover image-swap (hero → view-1) — pure CSS opacity crossfade.
 *     Pattern present on 5 of 8 reference PLPs (02-shop.md).
 *   - Price baked into the Add button — Glossier pattern (02-shop.md).
 *     Reduces order-cancellation calls on COD by confirming price at
 *     the moment of click.
 *   - Add button uses cobalt outline (not navy filled) so it reads as a
 *     soft quick-add — the primary protocol-purchase CTA stays on the
 *     PDP / protocol page.
 */
export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const content = PRODUCT_CONTENT[product.sku];
  const images = content ? productImagePaths(product.sku) : null;
  const heroImage = images ? images.hero : product.imageUrl;
  const swapImage = images ? images.views[0] : null;

  return (
    <article
      className={cn(
        'group flex h-full flex-col overflow-hidden rounded-2xl border border-rule bg-card',
        'transition-[border-color,transform] duration-200',
        'hover:-translate-y-0.5 hover:border-navy',
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
            'group/btn flex w-full items-center justify-between gap-3',
            'rounded-md border border-cobalt/40 bg-transparent px-4 py-3 text-cobalt',
            'font-mono text-[11px] font-medium uppercase tracking-[0.18em]',
            'transition-colors duration-150',
            'hover:border-cobalt hover:bg-cobalt hover:text-white',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas',
          )}
        >
          <span>+ Add</span>
          <span className="font-mono tracking-[0.08em]">
            Rs. {product.pricePkr.toLocaleString('en-PK')}
          </span>
        </button>
      </div>
    </article>
  );
}
