/* eslint-disable react/no-unescaped-entities */
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/cart/use-cart';
import type { Product } from '@/lib/db/schema';
import { PRODUCT_CONTENT, productImagePaths } from '@/lib/products/content';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { ProductTitle } from '@/components/ui/product-title';
import { TrustPills } from '@/components/ui/trust-pills';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductCard } from './ProductCard';
import { cn } from '@/lib/utils';

interface ProductDetailPageProps {
  product: Product;
  related: Product[];
}

export function ProductDetailPage({ product, related }: ProductDetailPageProps) {
  const { addProduct } = useCart();
  const hasDiscount =
    product.listPricePkr !== null && product.listPricePkr > product.pricePkr;

  const content = PRODUCT_CONTENT[product.sku];
  const images = productImagePaths(product.sku);
  const gallery = content ? [images.hero, ...images.views] : [];
  const [activeImage, setActiveImage] = useState(0);

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
    <div className="mx-auto max-w-[67.5rem] px-6 pt-10 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — gallery + buy box */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-4">
          <div className="flex aspect-square items-center justify-center overflow-hidden rounded-2xl bg-sky">
            {heroSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={heroSrc} alt={product.name} className="h-full w-full object-cover" />
            ) : (
              <span className="font-mono text-xs text-ink-faint">[Photo pending]</span>
            )}
          </div>
          {content && gallery.length > 1 && (
            <div className="grid grid-cols-5 gap-2" role="tablist" aria-label="Product views">
              {gallery.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  role="tab"
                  aria-selected={i === activeImage}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    'flex aspect-square items-center justify-center overflow-hidden rounded-md',
                    'border-2 transition-colors bg-sky',
                    i === activeImage ? 'border-cobalt' : 'border-transparent hover:border-rule',
                  )}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={`${product.name} view ${i + 1}`}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-5">
          {content && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {content.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-sky px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] text-cobalt"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          <ProductTitle
            name={product.name}
            descriptor={content?.formulation}
          />

          {product.actives && (
            <p className="font-mono text-xs uppercase tracking-[0.08em] text-ink-mute">
              {product.actives}
            </p>
          )}

          <div className="mt-2 flex items-baseline gap-3">
            <span className="font-display text-3xl text-navy">
              Rs. {product.pricePkr.toLocaleString()}
            </span>
            {hasDiscount && product.listPricePkr !== null && (
              <span className="font-mono text-sm text-ink-faint line-through">
                Rs. {product.listPricePkr.toLocaleString()}
              </span>
            )}
          </div>

          <Button
            type="button"
            size="lg"
            onClick={() => addProduct(product.sku)}
            className="mt-1 w-full sm:w-auto sm:min-w-[16rem]"
          >
            Add to cart →
          </Button>

          {content && content.badges.length > 0 && (
            <TrustPills pills={content.badges} className="mt-2" />
          )}

          <div className="mt-2 font-mono text-xs uppercase tracking-[0.08em] text-ink-mute">
            COD across Pakistan · Pay courier on arrival
          </div>
        </div>
      </div>

      {/* CONTENT BODY */}
      {content ? (
        <>
          <Section title="Benefits">
            <ul className="space-y-2.5">
              {content.benefits.map((b, i) => (
                <li key={i} className="flex gap-3 text-base text-ink-2 leading-relaxed">
                  <span aria-hidden="true" className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cobalt" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </Section>

          <Section title="Ingredients">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {content.ingredients.map((ing) => (
                <div
                  key={ing.name}
                  className="rounded-xl border border-rule bg-card p-4"
                >
                  <div className="mb-1 font-display italic text-lg text-navy">{ing.name}</div>
                  <div className="font-body text-sm text-ink-mute leading-snug">{ing.role}</div>
                </div>
              ))}
            </div>
          </Section>

          <Section title="How to use">
            <ol className="space-y-3">
              {content.directions.map((d, i) => (
                <li key={i} className="flex gap-4 text-base text-ink-2 leading-relaxed">
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy font-mono text-xs text-white"
                  >
                    {i + 1}
                  </span>
                  <span>{d}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-lg border border-rule-soft bg-sky px-4 py-3 text-sm text-ink-mute leading-relaxed">
              For best results, follow the full{' '}
              <Link href="/products" className="text-cobalt underline underline-offset-2 hover:text-cobalt-2">
                Clarté MD protocol
              </Link>{' '}
              for your concern rather than buying products à la carte — protocols are designed
              to work in combination.
            </p>
          </Section>

          <Section title="Important">
            <ul className="space-y-2.5 rounded-xl border-l-[3px] border-rust bg-amber-50/40 px-5 py-4">
              {content.important.map((w, i) => (
                <li key={i} className="flex gap-3 text-sm text-ink-2 leading-relaxed">
                  <span aria-hidden="true" className="text-rust">⚠</span>
                  <span>{w}</span>
                </li>
              ))}
            </ul>
          </Section>
        </>
      ) : (
        <>
          <Section title="What is it">
            <p className="text-base text-ink-2 leading-relaxed">
              A single-product purchase from Clarté MD's clinical catalogue. Each product is
              dosed at clinically meaningful concentrations and manufactured at our Lahore
              facility.
            </p>
            {product.actives && (
              <p className="mt-3 text-base text-ink-2 leading-relaxed">
                <strong className="font-semibold text-navy">Key actives:</strong>{' '}
                {product.actives}.
              </p>
            )}
          </Section>

          <Section title="How to use">
            <p className="text-base text-ink-2 leading-relaxed">
              Apply after cleansing, before moisturiser. Patch-test for 48 hours before full-face
              use if you have a sensitive barrier or are layering actives for the first time.
              Always finish your AM routine with SPF.
            </p>
          </Section>
        </>
      )}

      {/* FAQ */}
      <Section title="Common questions">
        <Accordion type="single" collapsible className="border-t border-rule">
          <AccordionItem value="bundle">
            <AccordionTrigger className="font-display text-base text-navy">
              Is this the same product sold in the protocol bundle?
            </AccordionTrigger>
            <AccordionContent className="text-base text-ink-2 leading-relaxed">
              Yes — identical formulation, identical batch process. The bundle just pairs this
              with 2-4 other products dosed for a complete 12-week regimen and prices the set
              lower than buying each individually.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="cod">
            <AccordionTrigger className="font-display text-base text-navy">
              Can I order this with cash on delivery?
            </AccordionTrigger>
            <AccordionContent className="text-base text-ink-2 leading-relaxed">
              Yes. We ship across Pakistan with COD as the default. Pay the courier in cash when
              your parcel arrives. If anything's wrong with your order, WhatsApp our team within
              24 hours and we'll arrange a refund or re-ship.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="irritation">
            <AccordionTrigger className="font-display text-base text-navy">
              What if the active concentration causes irritation?
            </AccordionTrigger>
            <AccordionContent className="text-base text-ink-2 leading-relaxed">
              Start with patch-testing and introduce slowly (every other day for 1 week, then
              daily). If irritation persists, message our team on WhatsApp — a real person will
              respond within ~2 hours and can recommend an alternate or paired barrier product.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Section>

      {related.length > 0 && (
        <Section title="You might also need">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mt-14">
      <Eyebrow className="mb-4 text-cobalt">{title}</Eyebrow>
      {children}
    </section>
  );
}
