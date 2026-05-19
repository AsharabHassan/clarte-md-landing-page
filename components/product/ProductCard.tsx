'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';
import { PRODUCT_CONTENT, productImagePaths } from '@/lib/products/content';

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
    <article className="product-card">
      <Link href={`/products/${product.sku}`} className="product-card-image-link">
        <div className="product-card-image">
          {cardImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={cardImage} alt={product.name} loading="lazy" />
          ) : (
            <span className="product-card-placeholder mono">[Photo pending]</span>
          )}
        </div>
      </Link>
      <div className="product-card-body">
        <Link href={`/products/${product.sku}`} className="product-card-name-link">
          <h3 className="product-card-name">{product.name}</h3>
        </Link>
        {product.actives && (
          <p className="product-card-actives mono">{product.actives}</p>
        )}
        <div className="product-card-foot">
          <div className="product-card-price">
            <span className="product-card-current">
              Rs. {product.pricePkr.toLocaleString()}
            </span>
            {hasDiscount && product.listPricePkr !== null && (
              <span className="product-card-list">
                Rs. {product.listPricePkr.toLocaleString()}
              </span>
            )}
          </div>
          <button
            type="button"
            className="product-card-add"
            onClick={() => addProduct(product.sku)}
            aria-label={`Add ${product.name} to cart`}
          >
            + Add
          </button>
        </div>
      </div>
    </article>
  );
}
