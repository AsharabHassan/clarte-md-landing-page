'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useScroll, useTransform } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useCart } from '@/lib/cart/use-cart';
import { CinematicPhoto } from '@/lib/anim/cinematic-photo';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { SplitReveal } from '@/lib/anim/split-reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { useReducedMotion } from '@/lib/anim/hooks';
import { LowStockTag } from '@/components/marketing/LowStockTag';
import { CountdownTimer } from '@/components/marketing/CountdownTimer';
import { cn } from '@/lib/utils';

interface ProtocolHeroProps {
  bundleSlug: string;
  bundleName: string;
  bundlePricePkr: number;
  savedPkr: number;
  savedPct: number;
  outcomeEmphasized: string;
  outcomeHeadline: string;
  outcomeSub: string;
  secondaryAnchor?: string;
  secondaryLabel?: string;
  heroImageSrc?: string;
}

/**
 * Per-protocol accent glow color used by the cursor-glow overlay on the
 * dark hero. Each protocol gets a different cinematic mood lighting.
 */
const PROTOCOL_GLOW: Record<string, string> = {
  'clear-skin-protocol': 'rgba(200, 152, 128, 0.30)', // terracotta
  'even-tone-protocol': 'rgba(212, 165, 160, 0.30)', // rose
  'renewal-protocol': 'rgba(184, 168, 200, 0.30)', // lavender
  'barrier-protocol': 'rgba(168, 192, 168, 0.28)', // sage
};

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
  heroImageSrc,
}: ProtocolHeroProps) {
  const router = useRouter();
  const { addBundle } = useCart();
  const reduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Parallax: as the hero scrolls out, the foreground content slides up
  // slightly while the background image scales — depth illusion.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scrollCueOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  function handleAddBundle() {
    addBundle(bundleSlug);
    const legacyFn = (window as Window & { addBundleToCart?: () => void })
      .addBundleToCart;
    if (typeof legacyFn === 'function') {
      try {
        legacyFn();
      } catch {
        /* Legacy DOM might be mid-mount. */
      }
    }
    router.push('/cart');
  }

  const glowColor = PROTOCOL_GLOW[bundleSlug] ?? 'rgba(138, 176, 224, 0.22)';

  return (
    <section
      ref={sectionRef}
      className={cn(
        'relative isolate overflow-hidden bg-navy-deep text-white',
        'min-h-[85vh] md:min-h-screen',
      )}
    >
      {/* ─── Layer 1: cinematic backdrop image (full bleed, parallax + Ken-Burns) ─── */}
      {heroImageSrc && (
        <CinematicPhoto
          src={heroImageSrc}
          alt={`${bundleName} hero backdrop`}
          width={2400}
          height={1600}
          priority
          parallax={0.22}
          kenBurns
          aspectClass="absolute inset-0 h-full w-full"
          wrapperClassName="absolute inset-0"
          className="object-cover"
          sizes="100vw"
        />
      )}

      {/* ─── Layer 2: legibility gradient — 60% dark overlay per Video-First Hero pattern ─── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-navy-deep/65 to-navy-deep/95"
      />
      {/* Side gradient — strong dark column under the copy on the left
          to guarantee legibility over any bright spots in the backdrop. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 from-0% via-navy-deep/75 via-50% to-navy-deep/30 to-100%"
      />

      {/* ─── Layer 3: cursor-glow accent (protocol-specific mood color) ─── */}
      <CursorGlow color={glowColor} size={640} />

      {/* ─── Layer 4: vignette for premium feel ─── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_240px_60px_rgba(0,0,0,0.55)]"
      />

      {/* ─── Layer 5: hero content ─── */}
      <motion.div
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex min-h-[85vh] max-w-[75rem] flex-col justify-end px-6 pb-20 pt-32 md:min-h-screen md:pb-28 md:pt-40 [text-shadow:0_2px_18px_rgba(8,21,42,0.55)]"
      >
        <RevealGroup stagger={0.1}>
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
              <span
                aria-hidden="true"
                className="h-px w-8 bg-cobalt-glow"
              />
              Twelve-week clinical protocol &middot; Pakistan
            </span>
          </Reveal>
        </RevealGroup>

        {/* Headline — per-word split reveal (two stacked lines).
            Width capped at ~44rem so it stays inside the dark gradient
            column and never collides with bright spots on the right.
            Inline `color:#fff` defeats the legacy global `h1 { color: var(--ink) }`
            inherited from protocol.css. */}
        <h1
          style={{ color: '#ffffff' }}
          className={cn(
            'mb-8 max-w-[44rem] font-display font-light',
            'text-[clamp(44px,7.5vw,92px)] leading-[0.94] tracking-[-0.025em]',
            '[&_.italic>span]:!text-cobalt-glow',
          )}
        >
          <SplitReveal
            as="span"
            text={`*${outcomeEmphasized}*`}
            italicMarkers
            baseDelay={0.2}
            stagger={0.07}
            className="block text-white"
          />
          <SplitReveal
            as="span"
            text={outcomeHeadline}
            baseDelay={0.55}
            stagger={0.07}
            className="block text-white"
          />
        </h1>

        <RevealGroup stagger={0.08} baseDelay={0.9}>
          <Reveal>
            <p
              className={cn(
                'mb-12 max-w-[40rem] font-display italic text-white/95',
                'text-[clamp(18px,2vw,24px)] leading-[1.4]',
              )}
            >
              {outcomeSub}
            </p>
          </Reveal>

          <Reveal>
            <div className="mb-6 flex flex-wrap items-center gap-4">
              <Magnetic strength={6}>
                <button
                  type="button"
                  onClick={handleAddBundle}
                  className={cn(
                    'group/btn relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-md bg-white px-8 text-navy',
                    'font-mono text-[12px] font-semibold uppercase tracking-[0.18em]',
                    'transition-colors duration-300 hover:bg-cobalt-glow hover:text-navy-deep',
                    'shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt-glow focus-visible:ring-offset-2 focus-visible:ring-offset-navy-deep',
                  )}
                >
                  <span className="relative z-10">
                    Add the {bundleName.replace(/^The\s+/, '')} &mdash; Rs.{' '}
                    {bundlePricePkr.toLocaleString('en-PK')}
                  </span>
                  <ArrowUpRight
                    className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </button>
              </Magnetic>
              {secondaryAnchor && (
                <Magnetic strength={4}>
                  <Link
                    href={`#${secondaryAnchor}`}
                    className={cn(
                      'group inline-flex h-14 items-center gap-2 rounded-md border border-white/35 bg-white/5 px-7 text-white backdrop-blur-md',
                      'font-mono text-[11.5px] font-semibold uppercase tracking-[0.18em]',
                      'transition-[background-color,border-color,color] duration-300 hover:border-white hover:bg-white/15',
                    )}
                  >
                    {secondaryLabel}
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Magnetic>
              )}
            </div>
          </Reveal>

          {savedPkr > 0 && (
            <Reveal>
              <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt-glow">
                Save Rs. {savedPkr.toLocaleString('en-PK')} &middot; {savedPct}% off vs buying individually
              </p>
            </Reveal>
          )}

          <Reveal>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <LowStockTag sku={bundleSlug} />
              <CountdownTimer
                variant="pill"
                label="Offer ends in"
                windowHours={6}
                className="border-cobalt-glow/40 bg-white/8 [&_span.uppercase]:text-white/75 [&_span.tabular-nums]:!text-cobalt-glow [&>span:first-child]:!bg-cobalt-glow"
              />
            </div>
          </Reveal>

          <Reveal>
            <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/75">
              <li>Dermatologist-formulated</li>
              <li aria-hidden="true" className="text-white/40">&middot;</li>
              <li>Cash on delivery</li>
              <li aria-hidden="true" className="text-white/40">&middot;</li>
              <li>Flat Rs. 250 shipping</li>
              <li aria-hidden="true" className="text-white/40">&middot;</li>
              <li>Made in Pakistan</li>
            </ul>
          </Reveal>
        </RevealGroup>
      </motion.div>

      {/* ─── Layer 6: scroll cue at bottom ─── */}
      <motion.div
        style={reduced ? undefined : { opacity: scrollCueOpacity }}
        className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
        aria-hidden="true"
      >
        <motion.div
          animate={reduced ? undefined : { y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: [0.4, 0, 0.6, 1],
          }}
          className="flex flex-col items-center gap-2 text-white/55"
        >
          <span className="font-mono text-[9.5px] uppercase tracking-[0.3em]">
            Scroll
          </span>
          <svg
            width="14"
            height="22"
            viewBox="0 0 14 22"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 1v18M1 13l6 6 6-6" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
