'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowUpRight } from 'lucide-react';
import { useCart } from '@/lib/cart/use-cart';
import { Eyebrow } from '@/components/ui/eyebrow';
import { cn } from '@/lib/utils';

/**
 * Layer 1 of the new protocol-page architecture. Replaces nothing —
 * sits ABOVE the legacy `<section class="hero">` (which is hidden via
 * a scoped CSS override in the page wrapper).
 *
 * Composition cues lifted from the bundle-pages research:
 *   - Outcome claim as the page H1 (SkinCeuticals + Tatcha pattern)
 *   - Italic Fraunces over Plus Jakarta body (Bader / Tatcha typography
 *     ramp — already a Phase 0 token rule)
 *   - Mono eyebrow above the H1 — JetBrains Mono, ≤5 words, ALL-CAPS,
 *     tracking-[0.22em]
 *   - Single primary CTA with price baked in (Hers + The Ordinary
 *     "Add routine to cart" / Drunk Elephant "Add All to Bag")
 *   - Savings line directly under CTA (none of the 15 reference brands
 *     do this cleanly — Clarté is the brand that does it best)
 *   - Secondary CTA scrolls to the legacy AI-projection section
 *     (#ai-generator) which is the killer feature for our acquisition
 *     funnel and lives in the deep-dive body
 */

interface ProtocolHeroProps {
  bundleSlug: string;
  bundleName: string;
  bundlePricePkr: number;
  savedPkr: number;
  savedPct: number;
  outcomeEmphasized: string;
  outcomeHeadline: string;
  outcomeSub: string;
  /**
   * Anchor for the secondary CTA's smooth-scroll target. Must exist
   * inside the legacy body (e.g. "ai-generator" on /acne). Hidden when
   * empty / no target.
   */
  secondaryAnchor?: string;
  secondaryLabel?: string;
}

export function ProtocolHero({
  bundleSlug,
  bundleName,
  bundlePricePkr,
  savedPkr,
  savedPct,
  outcomeEmphasized,
  outcomeHeadline,
  outcomeSub,
  secondaryAnchor,
  secondaryLabel = 'Try the 12-week AI projection',
}: ProtocolHeroProps) {
  const router = useRouter();
  const { addBundle } = useCart();

  function handleAddBundle() {
    addBundle(bundleSlug);
    // Mirror the legacy DOM-side flag so the customer's "✓ Added" state
    // in the legacy intake form also updates. The legacy AcneClient (and
    // its siblings) exposes addBundleToCart on window for exactly this.
    const legacyFn = (window as Window & { addBundleToCart?: () => void })
      .addBundleToCart;
    if (typeof legacyFn === 'function') {
      try {
        legacyFn();
      } catch {
        /* legacy DOM might be mid-mount — safe to swallow */
      }
    }
    router.push('/cart');
  }

  return (
    <section className="relative overflow-hidden bg-canvas-soft border-b border-sand/40">
      <div className="mx-auto max-w-[75rem] px-6 pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32">
        <Eyebrow className="mb-8 text-cobalt md:mb-10">
          — Twelve-week clinical protocol · Pakistan
        </Eyebrow>

        <h1
          className={cn(
            'mb-8 font-display font-light text-navy',
            'text-[clamp(44px,8vw,88px)] leading-[0.95] tracking-[-0.025em]',
            'max-w-[60rem]',
          )}
        >
          <em className="italic text-cobalt">{outcomeEmphasized}</em>
          <br />
          <span>{outcomeHeadline}</span>
        </h1>

        <p
          className={cn(
            'mb-12 max-w-[40rem] font-display italic text-ink-2',
            'text-[clamp(18px,2vw,24px)] leading-[1.4]',
          )}
        >
          {outcomeSub}
        </p>

        <div className="mb-6 flex flex-wrap items-center gap-5">
          <button
            type="button"
            onClick={handleAddBundle}
            className={cn(
              'inline-flex h-14 items-center gap-3 rounded-md bg-navy px-8 text-white',
              'font-mono text-[12px] font-semibold uppercase tracking-[0.18em]',
              'transition-colors hover:bg-navy-2',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 focus-visible:ring-offset-canvas-soft',
            )}
          >
            <span>
              Add the {bundleName.replace(/^The\s+/, '')} — Rs.{' '}
              {bundlePricePkr.toLocaleString('en-PK')}
            </span>
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>
          {secondaryAnchor && (
            <Link
              href={`#${secondaryAnchor}`}
              className={cn(
                'inline-flex h-14 items-center gap-2 rounded-md border border-cobalt/40 px-7',
                'font-mono text-[11.5px] font-semibold uppercase tracking-[0.18em] text-cobalt',
                'transition-colors hover:border-cobalt hover:bg-cobalt hover:text-white',
              )}
            >
              {secondaryLabel}
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          )}
        </div>

        {savedPkr > 0 && (
          <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt">
            Save Rs. {savedPkr.toLocaleString('en-PK')} · {savedPct}% off vs buying individually
          </p>
        )}

        <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-ink-faint">
          <li>Dermatologist-formulated</li>
          <li aria-hidden="true">·</li>
          <li>Cash on delivery</li>
          <li aria-hidden="true">·</li>
          <li>Flat Rs. 250 shipping</li>
          <li aria-hidden="true">·</li>
          <li>Made in Lahore</li>
        </ul>
      </div>
    </section>
  );
}
