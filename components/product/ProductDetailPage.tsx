/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';
import { PRODUCT_CONTENT, productImagePaths } from '@/lib/products/content';

interface ProductDetailPageProps {
  product: Product;
  related: Product[];
}

export function ProductDetailPage({ product, related }: ProductDetailPageProps) {
  const { addProduct } = useCart();
  const hasDiscount =
    product.listPricePkr !== null && product.listPricePkr > product.pricePkr;

  // Editorial content keyed by SKU. Falls back gracefully for any SKU
  // without a content entry (we still render the commerce hero).
  const content = PRODUCT_CONTENT[product.sku];
  const images = productImagePaths(product.sku);
  const gallery = content ? [images.hero, ...images.views] : [];
  const [activeImage, setActiveImage] = useState(0);

  // Hero image: prefer the optimized local gallery hero; fall back to
  // the DB's imageUrl (Shopify CDN) when no local gallery exists yet.
  const heroSrc = content ? gallery[activeImage] : product.imageUrl;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.actives ?? 'Clinically dosed dermatologist-formulated product.',
    sku: product.sku,
    brand: { '@type': 'Brand', name: 'Clarté MD' },
    image: content ? gallery : product.imageUrl ? [product.imageUrl] : undefined,
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
        <div className="pdp-gallery">
          <div className="pdp-hero-image">
            {heroSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroSrc} alt={product.name} />
            ) : (
              <span className="pdp-placeholder">[Photo pending]</span>
            )}
          </div>
          {content && gallery.length > 1 && (
            <div className="pdp-gallery-thumbs" role="tablist" aria-label="Product views">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === activeImage}
                  className={`pdp-gallery-thumb ${i === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(i)}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`${product.name} view ${i + 1}`} loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="pdp-hero-body">
          {content && content.tags.length > 0 && (
            <div className="pdp-tags">
              {content.tags.map((t) => (
                <span key={t} className="pdp-tag">{t}</span>
              ))}
            </div>
          )}
          <h1>{product.name}</h1>
          {content?.formulation && (
            <p className="pdp-hero-formulation">{content.formulation}</p>
          )}
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
          {content && content.badges.length > 0 && (
            <ul className="pdp-badges">
              {content.badges.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          )}
          <div className="pdp-hero-foot">
            Free shipping over Rs. 4,000 · COD across Pakistan · Pay courier on arrival
          </div>
        </div>
      </div>

      {content ? (
        <>
          <section className="pdp-section">
            <h2>Benefits</h2>
            <ul className="pdp-list">
              {content.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </section>

          <section className="pdp-section">
            <h2>Ingredients</h2>
            <div className="pdp-ingredients">
              {content.ingredients.map((ing) => (
                <div key={ing.name} className="pdp-ingredient">
                  <div className="pdp-ingredient-name">{ing.name}</div>
                  <div className="pdp-ingredient-role">{ing.role}</div>
                </div>
              ))}
            </div>
          </section>

          <section className="pdp-section">
            <h2>How to use</h2>
            <ol className="pdp-steps">
              {content.directions.map((d, i) => (
                <li key={i}>{d}</li>
              ))}
            </ol>
            <p className="pdp-protocol-note">
              For best results, follow the full{' '}
              <Link href="/products">Clarté MD protocol</Link> for your concern rather
              than buying products à la carte — protocols are designed to work in
              combination.
            </p>
          </section>

          <section className="pdp-section pdp-important">
            <h2>Important</h2>
            <ul className="pdp-list">
              {content.important.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          </section>
        </>
      ) : (
        <>
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
          </section>
        </>
      )}

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
            Yes. We ship across Pakistan with COD as the default. Pay the courier in
            cash when your parcel arrives. If anything's wrong with your order, WhatsApp
            our team within 24 hours and we'll arrange a refund or re-ship.
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
            {related.map((p) => {
              const rContent = PRODUCT_CONTENT[p.sku];
              const rImg = rContent ? productImagePaths(p.sku).hero : p.imageUrl;
              return (
                <article key={p.id} className="product-card">
                  <Link href={`/products/${p.sku}`} className="product-card-image-link">
                    <div className="product-card-image">
                      {rImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={rImg} alt={p.name} loading="lazy" />
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
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
