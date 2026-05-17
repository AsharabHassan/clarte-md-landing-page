/* eslint-disable react/no-unescaped-entities */
'use client';

import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';

interface ProductDetailPageProps {
  product: Product;
  related: Product[];
}

export function ProductDetailPage({ product, related }: ProductDetailPageProps) {
  const { addProduct } = useCart();
  const hasDiscount =
    product.listPricePkr !== null && product.listPricePkr > product.pricePkr;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.actives ?? 'Clinically dosed dermatologist-formulated product.',
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'Clarté MD' },
    image: product.imageUrl ? [product.imageUrl] : undefined,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'PKR',
      price: String(product.pricePkr),
      availability: product.active
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `/products/${product.sku}`,
    },
  };

  return (
    <div className="pdp">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="pdp-hero">
        <div className="pdp-hero-image">
          {product.imageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.imageUrl} alt={product.name} />
          ) : (
            <span className="pdp-placeholder">[Photo pending]</span>
          )}
        </div>
        <div className="pdp-hero-body">
          <h1>{product.name}</h1>
          {product.actives && <p className="pdp-hero-actives">{product.actives}</p>}
          <div className="pdp-hero-price">
            <span className="pdp-hero-current">
              Rs. {product.pricePkr.toLocaleString()}
            </span>
            {hasDiscount && product.listPricePkr !== null && (
              <span className="pdp-hero-list">
                Rs. {product.listPricePkr.toLocaleString()}
              </span>
            )}
          </div>
          <button
            type="button"
            className="pdp-hero-add"
            onClick={() => addProduct(product.sku)}
          >
            Add to cart →
          </button>
          <div className="pdp-hero-foot">
            Free shipping over Rs. 4,000 · COD across Pakistan · 2× refund if fake
          </div>
        </div>
      </div>

      <section className="pdp-section">
        <h2>What is it</h2>
        <p>
          A single-product purchase from Clarté MD's clinical catalogue. Each product is
          dosed at clinically meaningful concentrations and manufactured at our Lahore
          facility under ISO 22716 Cosmetics GMP standards.
        </p>
        {product.actives && (
          <p>
            <strong>Key actives:</strong> {product.actives}.
          </p>
        )}
      </section>

      <section className="pdp-section">
        <h2>How to use</h2>
        <p>
          Apply after cleansing, before moisturiser. Patch-test for 48 hours before full-face
          use if you have a sensitive barrier or are layering actives for the first time.
          Always finish your AM routine with SPF.
        </p>
        <p>
          For best results, follow the full <Link href="/products">Clarté MD protocol</Link>{' '}
          for your concern rather than buying products à la carte — protocols are designed
          to work in combination.
        </p>
      </section>

      <section className="pdp-section pdp-faqs">
        <h2>Common questions</h2>
        <details>
          <summary>Is this the same product sold in the protocol bundle?</summary>
          <p>
            Yes — identical formulation, identical batch process. The bundle just pairs
            this with 2-4 other products dosed for a complete 12-week regimen and prices
            the set lower than buying each individually.
          </p>
        </details>
        <details>
          <summary>Can I order this with cash on delivery?</summary>
          <p>
            Yes. We ship across Pakistan with COD as the default. Open the parcel at your
            door, inspect the seal, then pay the courier. Refuse anything that doesn't
            look right — no charge, no questions.
          </p>
        </details>
        <details>
          <summary>What if the active concentration causes irritation?</summary>
          <p>
            Start with patch-testing and introduce slowly (every other day for 1 week,
            then daily). If irritation persists, message our team on WhatsApp — a real
            person will respond within ~2 hours and can recommend an alternate or paired
            barrier product.
          </p>
        </details>
      </section>

      {related.length > 0 && (
        <section className="pdp-section">
          <h2>You might also need</h2>
          <div className="catalog-grid" style={{ marginTop: 18 }}>
            {related.map((p) => (
              <article key={p.id} className="product-card">
                <Link href={`/products/${p.sku}`} className="product-card-image-link">
                  <div className="product-card-image">
                    {p.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={p.imageUrl} alt={p.name} loading="lazy" />
                    ) : (
                      <span className="product-card-placeholder mono">[Photo]</span>
                    )}
                  </div>
                </Link>
                <div className="product-card-body">
                  <Link href={`/products/${p.sku}`} className="product-card-name-link">
                    <h3 className="product-card-name">{p.name}</h3>
                  </Link>
                  <div className="product-card-foot">
                    <span className="product-card-current">
                      Rs. {p.pricePkr.toLocaleString()}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
