'use client';

import Image from 'next/image';
import { motion } from 'motion/react';
import { Plus, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart/use-cart';
import { suggestUpsells, type ProductMeta } from '@/lib/products/catalog';
import { useReducedMotion } from '@/lib/anim/hooks';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { cn } from '@/lib/utils';

interface UpsellRowProps {
  /** Section heading (cart vs checkout vs thank-you can tune the tone). */
  title?: string;
  /** Italic sub line under the heading. */
  sub?: string;
  /** Max items to render. */
  limit?: number;
  /** When true, render against a dark navy background. */
  tone?: 'light' | 'dark';
  /** When true, hide the section if there's nothing to suggest. */
  hideWhenEmpty?: boolean;
  className?: string;
}

/**
 * Cross-sell row used on cart, checkout, and order-confirmation pages.
 *
 * Reads the current cart, computes the highest-priority SKUs the user
 * doesn't have yet, and renders them as 1-tap "Add" cards. SPF and HA
 * win first because they pair with every protocol — see suggestUpsells().
 *
 * Self-contained: pulls from useCart so any page can drop this in
 * without prop drilling.
 */
export function UpsellRow({
  title = 'Pairs well with what you have.',
  sub = 'Quick add-ons our doctors recommend most often.',
  limit = 3,
  tone = 'light',
  hideWhenEmpty = true,
  className,
}: UpsellRowProps) {
  const { cart, addProduct } = useCart();
  const skusInCart = cart.items
    .filter((i): i is { type: 'product'; sku: string; qty: number } => i.type === 'product')
    .map((i) => i.sku);
  const suggestions = suggestUpsells(skusInCart, limit);

  if (suggestions.length === 0 && hideWhenEmpty) return null;
  const isDark = tone === 'dark';

  return (
    <section
      className={cn(
        'relative isolate overflow-hidden',
        isDark ? 'bg-navy-deep text-white' : 'bg-canvas-soft text-navy',
        className,
      )}
    >
      {/* Blueprint grid — only on dark variant for cinematic feel */}
      {isDark && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#8ab0e0_1px,transparent_1px),linear-gradient(to_bottom,#8ab0e0_1px,transparent_1px)] [background-size:60px_60px]"
        />
      )}

      <div className="relative mx-auto max-w-[75rem] px-6 py-12 md:py-16">
        <RevealGroup stagger={0.08}>
          <Reveal>
            <header className="mb-7 flex flex-wrap items-end justify-between gap-3 md:mb-9">
              <div className="max-w-[36rem]">
                <span
                  className={cn(
                    'mb-2 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em]',
                    isDark ? 'text-cobalt-glow' : 'text-cobalt',
                  )}
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  Add to your order
                </span>
                <h2
                  className={cn(
                    'font-display font-light text-[clamp(22px,3vw,32px)] leading-[1.1] tracking-[-0.02em]',
                    isDark ? 'text-white' : 'text-navy',
                  )}
                  style={isDark ? { color: '#ffffff' } : undefined}
                >
                  {title}
                </h2>
                <p
                  className={cn(
                    'mt-1.5 font-display italic text-[14px] leading-relaxed md:text-[15.5px]',
                    isDark ? 'text-white/70' : 'text-ink-mute',
                  )}
                >
                  {sub}
                </p>
              </div>
              <span
                className={cn(
                  'font-mono text-[10px] uppercase tracking-[0.22em]',
                  isDark ? 'text-white/45' : 'text-ink-faint',
                )}
              >
                One-tap add · COD
              </span>
            </header>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {suggestions.map((p) => (
              <Reveal key={p.sku}>
                <UpsellCard product={p} tone={tone} onAdd={() => addProduct(p.sku, 1)} />
              </Reveal>
            ))}
          </div>
        </RevealGroup>
      </div>
    </section>
  );
}

function UpsellCard({
  product,
  tone,
  onAdd,
}: {
  product: ProductMeta;
  tone: 'light' | 'dark';
  onAdd: () => void;
}) {
  const isDark = tone === 'dark';
  const reduced = useReducedMotion();
  const savings = product.listPricePkr - product.pricePkr;
  const pctOff = savings > 0 ? Math.round((savings / product.listPricePkr) * 100) : 0;

  return (
    <motion.article
      whileHover={reduced ? undefined : { y: -2 }}
      transition={{ type: 'spring', stiffness: 260, damping: 22 }}
      className={cn(
        'group relative flex items-center gap-4 overflow-hidden rounded-2xl border p-4 transition-[border-color,background-color] duration-300',
        isDark
          ? 'border-white/10 bg-white/[0.04] hover:border-cobalt-glow/40 hover:bg-white/[0.08]'
          : 'border-rule bg-card shadow-[0_12px_28px_-20px_rgba(14,31,58,0.18)] hover:border-navy/30',
      )}
    >
      {/* Thumbnail */}
      <div
        className={cn(
          'relative h-20 w-20 shrink-0 overflow-hidden rounded-xl',
          isDark ? 'bg-navy-2' : 'bg-canvas-soft',
        )}
      >
        <Image
          src={product.imagePath}
          alt={product.name}
          fill
          sizes="80px"
          className="object-cover"
        />
      </div>

      {/* Copy */}
      <div className="min-w-0 flex-1">
        <h3
          className={cn(
            'truncate font-display text-[15px] font-medium italic leading-tight md:text-[16px]',
            isDark ? 'text-white' : 'text-navy',
          )}
          style={isDark ? { color: '#ffffff' } : undefined}
        >
          {product.shortName}
        </h3>
        <p
          className={cn(
            'mt-0.5 line-clamp-2 font-body text-[12px] leading-snug',
            isDark ? 'text-white/65' : 'text-ink-mute',
          )}
        >
          {product.upsellHook}
        </p>
        <div className="mt-2 flex items-baseline gap-2">
          <span
            className={cn(
              'font-mono text-[13px] font-semibold tabular-nums',
              isDark ? 'text-white' : 'text-navy',
            )}
          >
            Rs. {product.pricePkr.toLocaleString('en-PK')}
          </span>
          {savings > 0 && (
            <>
              <span
                className={cn(
                  'font-mono text-[11px] line-through',
                  isDark ? 'text-white/40' : 'text-ink-faint',
                )}
              >
                Rs. {product.listPricePkr.toLocaleString('en-PK')}
              </span>
              <span
                className={cn(
                  'rounded px-1.5 py-0.5 font-mono text-[9.5px] font-semibold tracking-[0.1em]',
                  isDark ? 'bg-cobalt-glow/20 text-cobalt-glow' : 'bg-cobalt/10 text-cobalt',
                )}
              >
                −{pctOff}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Add button */}
      <button
        type="button"
        onClick={onAdd}
        aria-label={`Add ${product.name} to cart`}
        className={cn(
          'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200',
          isDark
            ? 'bg-cobalt-glow text-navy-deep hover:bg-white'
            : 'bg-navy text-white hover:bg-cobalt',
        )}
      >
        <Plus className="h-5 w-5" strokeWidth={2} />
      </button>
    </motion.article>
  );
}
