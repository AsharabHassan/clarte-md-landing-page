'use client';

import { motion } from 'motion/react';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { NumberTicker } from '@/lib/anim/number-ticker';
import { useReducedMotion } from '@/lib/anim/hooks';
import { getEvidence, type EvidenceStat } from '@/lib/protocols/evidence';
import { cn } from '@/lib/utils';

/**
 * Layer 2 — Evidence band. Shows the actives in this protocol with the
 * single most cited peer-reviewed figure for each. The numbers belong to
 * the ACTIVES (and the cited paper's population), not to Clarté — that
 * distinction is shown verbatim on every panel via the citation footer
 * and the "in published numbers" headline.
 *
 * This satisfies the feedback_unverified_claims brand rule:
 *   - no invented Clarté percentages
 *   - every number traceable to a real paper
 *   - bottom band acknowledges Clarté's own panel is still pending
 *
 * Bundle slug picks the per-protocol data from lib/protocols/evidence.
 * If the slug isn't recognized we fall back to the "pending" placeholder
 * treatment, preserving the brand rule.
 */
export function ProtocolEvidence({
  bundleSlug,
  panelSize = 30,
}: {
  bundleSlug?: string;
  /** Panel size shown only in the fallback "pending" header (n = X). */
  panelSize?: number;
}) {
  const reduced = !!useReducedMotion();
  const evidence = bundleSlug ? getEvidence(bundleSlug) : null;

  return (
    <section className="relative isolate overflow-hidden border-b border-sand/40 bg-canvas-soft py-20 md:py-28">
      {/* Blueprint grid — quiet, technical, never decorative noise */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#0e1f3a_1px,transparent_1px),linear-gradient(to_bottom,#0e1f3a_1px,transparent_1px)] [background-size:64px_64px]"
      />
      {/* Soft cobalt halo from the right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[-12rem] top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full bg-cobalt/8 blur-3xl"
      />

      <div className="relative mx-auto max-w-[75rem] px-6">
        {/* ─── Header ─── */}
        <Reveal>
          <header className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:mb-20">
            <div className="max-w-[44rem]">
              <Eyebrow className="mb-4 text-cobalt">— The evidence</Eyebrow>
              <h2 className="font-display font-light text-navy text-[clamp(30px,4.5vw,52px)] leading-[1.05] tracking-[-0.02em]">
                {evidence ? (
                  <>
                    {evidence.headlinePre}{' '}
                    <em className="italic text-cobalt">
                      {evidence.headlineEmphasis}
                    </em>{' '}
                    {evidence.headlinePost}
                  </>
                ) : (
                  <>
                    What we&apos;ll measure.{' '}
                    <em className="italic text-cobalt">Honestly.</em>
                  </>
                )}
              </h2>
            </div>
            <div className="flex flex-col items-start gap-1 md:items-end">
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt">
                {evidence ? 'Peer-reviewed sources' : 'Clinical panel · CS-001'}
              </span>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
                {evidence
                  ? 'Active-ingredient literature · Clarté panel pending'
                  : (
                    <>
                      n =
                      <NumberTicker
                        value={panelSize}
                        className="mx-1 inline-flex tabular-nums"
                      />
                      · Publishing 2026 Q3
                    </>
                  )}
              </span>
            </div>
          </header>
        </Reveal>

        {/* ─── 3 stat panels ─── */}
        <RevealGroup stagger={0.1}>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sand/60 bg-sand/60 sm:grid-cols-3">
            {evidence
              ? evidence.stats.map((s, i) => (
                  <Reveal key={i}>
                    <CitedPanel stat={s} index={i} reduced={reduced} />
                  </Reveal>
                ))
              : (
                  // Fallback: original pending state, unchanged contract.
                  [
                    { weekLabel: 'WK 08', metric: 'Visible improvement reported' },
                    { weekLabel: 'WK 12', metric: 'Would recommend to a friend' },
                    { weekLabel: 'WK 12', metric: 'Routine still active' },
                  ].map((s, i) => (
                    <Reveal key={i}>
                      <PendingPanel
                        weekLabel={s.weekLabel}
                        metric={s.metric}
                        index={i}
                        reduced={reduced}
                      />
                    </Reveal>
                  ))
                )}
          </dl>
        </RevealGroup>

      </div>
    </section>
  );
}

/**
 * Cited-research panel. Shows: index/total + active name, large NumberTicker
 * figure with cobalt italic + suffix, context line, full metric, citation
 * footer with population.
 */
function CitedPanel({
  stat,
  index,
  reduced,
}: {
  stat: EvidenceStat;
  index: number;
  reduced: boolean;
}) {
  return (
    <div className="group relative flex h-full flex-col justify-between gap-6 bg-canvas-soft p-7 transition-colors duration-500 hover:bg-canvas-warm/30 md:p-9">
      {/* Top row: index + active name */}
      <div className="flex items-baseline justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-ink-faint">
          {(index + 1).toString().padStart(2, '0')} / 03
        </span>
        <span className="text-cobalt text-right">{stat.active}</span>
      </div>

      {/* Headline figure */}
      <div>
        <div className="flex items-baseline gap-1 font-display font-light italic text-cobalt text-[clamp(56px,8vw,96px)] leading-[0.85] tracking-[-0.02em]">
          <NumberTicker value={stat.figure} className="tabular-nums" />
          {stat.suffix && (
            <span className="text-[clamp(28px,4vw,44px)]">{stat.suffix}</span>
          )}
        </div>
        <p className="mt-3 max-w-[20rem] font-body text-[13.5px] leading-snug text-ink-2 md:text-[14px]">
          {stat.context}
        </p>
      </div>

      {/* Metric description */}
      <p className="font-body text-[13px] leading-relaxed text-ink-mute">
        {stat.metric}
      </p>

      {/* Citation footer */}
      <div className="flex items-baseline justify-between gap-4 border-t border-sand/60 pt-4 font-mono text-[10px] uppercase tracking-[0.18em]">
        <span className="italic normal-case tracking-[0.02em] text-[10.5px] text-ink-2">
          {stat.citation}
        </span>
        {stat.population && (
          <span className="shrink-0 text-ink-faint">{stat.population}</span>
        )}
      </div>

      {/* Accent corner mark */}
      <div
        aria-hidden="true"
        className="absolute right-5 top-5 h-2 w-2 rounded-full bg-cobalt/0 transition-colors duration-500 group-hover:bg-cobalt"
      />
      {reduced ? null : null}
    </div>
  );
}

/**
 * Pre-data placeholder panel. Used as the fallback when no bundle slug
 * is provided OR no evidence entry exists for the slug.
 */
function PendingPanel({
  weekLabel,
  metric,
  index,
  reduced,
}: {
  weekLabel: string;
  metric: string;
  index: number;
  reduced: boolean;
}) {
  return (
    <div className="group relative flex h-full flex-col justify-between gap-6 bg-canvas-soft p-7 transition-colors duration-500 hover:bg-canvas-warm/30 md:p-9">
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-ink-faint">
          {(index + 1).toString().padStart(2, '0')} / 03
        </span>
        <span className="text-cobalt">{weekLabel}</span>
      </div>

      <motion.div
        aria-hidden="true"
        animate={reduced ? undefined : { opacity: [0.28, 0.42, 0.28] }}
        transition={{
          duration: 3.4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: index * 0.6,
        }}
        className="flex items-end gap-3"
      >
        <span className="font-display font-light italic text-navy text-[clamp(64px,9vw,112px)] leading-[0.8]">
          —
        </span>
        <span className="mb-3 font-display italic text-[clamp(20px,2.2vw,26px)] text-navy/35">
          pending
        </span>
      </motion.div>

      <div className="flex items-end justify-between gap-4 border-t border-sand/60 pt-5">
        <p className="font-body text-[14px] leading-snug text-ink-2 md:text-[15px]">
          {metric}
        </p>
      </div>
    </div>
  );
}
