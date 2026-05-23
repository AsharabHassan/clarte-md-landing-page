'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';
import { PRODUCT_CONTENT, productImagePaths } from '@/lib/products/content';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ProductCard({ product }: { product: Product }) {
  const { addProduct } = useCart();
  const hasDiscount =
    product.listPricePkr !== null && product.listPricePkr > product.pricePkr;
  // Prefer the operator-supplied local gallery hero (post 2026-05-19)
  // over the legacy Shopify imageUrl in the DB.
  const cardImage = PRODUCT_CONTENT[product.sku]
    ? productImagePaths(product.sku).hero
    : product.imageUrl;

  return (
    <article
      className={cn(
        'flex flex-col overflow-hidden rounded-2xl border border-rule bg-card',
        'transition-[border-color,transform] duration-200',
        'hover:-translate-y-0.5 hover:border-navy',
      )}
    >
      <Link href={`/products/${product.sku}`} className="block">
        <div className="flex aspect-square items-center justify-center overflow-hidden bg-sky">
          {cardImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={cardImage}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
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
          <p className="mb-[18px] flex-1 font-mono text-[11px] tracking-[0.03em] text-ink-mute">
            {product.actives}
          </p>
        )}
        <div className="flex items-center justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            <span className="font-display text-lg text-navy">
              Rs. {product.pricePkr.toLocaleString()}
            </span>
            {hasDiscount && product.listPricePkr !== null && (
              <span className="font-mono text-[11px] text-ink-faint line-through">
                Rs. {product.listPricePkr.toLocaleString()}
              </span>
            )}
          </div>
          <Button
            type="button"
            size="sm"
            onClick={() => addProduct(product.sku)}
            aria-label={`Add ${product.name} to cart`}
          >
            + Add
          </Button>
        </div>
      </div>
    </article>
  );
}
