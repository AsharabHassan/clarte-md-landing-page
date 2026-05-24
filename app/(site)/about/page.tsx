/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { SITE_URL } from '@/lib/schema/json-ld';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { SplitReveal } from '@/lib/anim/split-reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { cn } from '@/lib/utils';

const TITLE = 'About — Dermatologist-led skincare from Lahore';
const DESCRIPTION =
  'Clarté MD is formulated by a team of dermatologists practicing in London and Lahore. 12-week clinical protocols, COD across Pakistan.';

const ABOUT_IMAGES = {
  hero: '/about/about-hero.webp',
  team: '/about/about-team-process.webp',
  lab: '/about/about-lab.webp',
  londonCard: '/about/card-london-review.webp',
  lahoreCard: '/about/card-lahore-dispatch.webp',
  twelveWeeksCard: '/about/card-twelve-weeks.webp',
  sealedDispatchCard: '/about/card-sealed-dispatch.webp',
};

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `${TITLE} · Clarté MD`,
    description: DESCRIPTION,
    url: `${SITE_URL}/about`,
    type: 'website',
  },
};

export default function AboutPage() {
  return (
    <div>
      {/* ─── HERO ────────────────────────────────────────────── */}
      <section className="relative isolate min-h-[82vh] overflow-hidden bg-navy-deep text-white">
        <Image
          src={ABOUT_IMAGES.hero}
          alt="Clarte MD clinical skincare lab in Lahore"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-deep via-navy-deep/80 to-navy-deep/25"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-deep/35 via-transparent to-navy-deep/82"
        />
        {/* Blueprint grid + halos */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:96px_96px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-40 top-1/2 h-[44rem] w-[44rem] -translate-y-1/2 rounded-full bg-cobalt/15 blur-3xl"
        />
        <CursorGlow color="rgba(138, 176, 224, 0.18)" size={560} />

        <div className="relative mx-auto flex min-h-[82vh] max-w-[75rem] flex-col justify-end px-6 pb-20 pt-32 md:pb-28 md:pt-40">
          <Reveal>
            <span className="mb-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
              <span aria-hidden="true" className="h-px w-8 bg-cobalt-glow" />
              Clart&eacute; MD &middot; Lahore
            </span>
          </Reveal>
          <SplitReveal
            as="h1"
            text={`We don't sell single bottles. *We dispatch protocols.*`}
            italicMarkers
            baseDelay={0.1}
            stagger={0.06}
            className={cn(
              'mb-8 max-w-[58rem] font-display font-light text-white',
              'text-[clamp(40px,7vw,88px)] leading-[0.95] tracking-[-0.025em]',
              '[&_.italic_span]:text-cobalt-glow',
            )}
          />
          <Reveal>
            <p className="max-w-[44rem] font-display italic text-[clamp(18px,1.8vw,22px)] leading-[1.5] text-white/85">
              Twelve-week clinical regimens, formulated by a team of doctors
              practicing in London and Lahore. Never an active sold in
              isolation, never a routine the patient builds without guidance.
            </p>
          </Reveal>
          <Reveal>
            <div className="mt-10 flex max-w-[44rem] flex-wrap gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/70">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                Doctor-led protocols
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                Made in Pakistan
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur">
                COD across Pakistan
              </span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─── THE TEAM — generic, no individuals named ──────────── */}
      <section className="relative isolate overflow-hidden border-y border-sand/40 bg-canvas-soft py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#0e1f3a_1px,transparent_1px),linear-gradient(to_bottom,#0e1f3a_1px,transparent_1px)] [background-size:80px_80px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/4 h-[36rem] w-[36rem] rounded-full bg-cobalt/8 blur-3xl"
        />

        <div className="relative mx-auto max-w-[75rem] px-6">
          <div className="grid grid-cols-1 items-start gap-14 lg:grid-cols-[1fr_1.1fr]">
            <Reveal>
              <div>
                <Eyebrow className="mb-5 text-cobalt">— The team</Eyebrow>
                <h2 className="font-display font-light text-navy text-[clamp(32px,5.5vw,60px)] leading-[1] tracking-[-0.025em]">
                  A team of doctors.
                  <br />
                  <em className="italic text-cobalt">London &amp; Lahore.</em>
                </h2>
                <p className="mt-6 max-w-[34rem] font-display italic text-[clamp(16px,1.5vw,19px)] leading-relaxed text-ink-2">
                  Every Clarté MD protocol is reviewed and signed off by
                  practising clinicians — not assembled by a marketing team,
                  not "formulated by experts" with no medicine behind them.
                </p>
                <p className="mt-4 max-w-[34rem] font-body text-[15px] leading-[1.65] text-ink-mute">
                  The team's clinical practice runs across two cities. Every
                  protocol is designed for Pakistani skin types, climate, and
                  the medications patients are already taking — then dispatched
                  sealed from Lahore.
                </p>
              </div>
            </Reveal>

            {/* Right side: two-city composition */}
            <Reveal delay={0.15}>
              <div className="grid grid-cols-1 gap-4">
                <figure className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-sand/60 bg-navy-deep shadow-[0_28px_70px_-34px_rgba(14,31,58,0.5)]">
                  <Image
                    src={ABOUT_IMAGES.team}
                    alt="Clarte MD protocol review with skin-analysis imagery and clinical skincare bottles"
                    fill
                    unoptimized
                    sizes="(min-width: 1024px) 46vw, 100vw"
                    className="object-cover"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 bg-gradient-to-t from-navy-deep/82 via-navy-deep/10 to-transparent"
                  />
                  <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-navy-deep/72 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cobalt-glow backdrop-blur">
                    Clart&eacute; MD
                  </div>
                  <figcaption className="absolute inset-x-5 bottom-5 rounded-lg border border-white/15 bg-white/10 p-4 text-white backdrop-blur-md">
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-cobalt-glow">
                      Protocol review
                    </span>
                    <p className="mt-2 max-w-[30rem] font-display text-xl font-light italic leading-tight">
                      Doctor-led routines, reviewed as complete regimens instead
                      of isolated bottles.
                    </p>
                  </figcaption>
                </figure>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <CityCard
                  label="London"
                  meta="Formulation review"
                  coordinates="51.50° N · 0.12° W"
                  imageSrc={ABOUT_IMAGES.londonCard}
                  imageAlt="Clarte MD London formulation review desk with skincare vials"
                />
                <CityCard
                  label="Lahore"
                  meta="Clinic + dispatch"
                  coordinates="31.55° N · 74.34° E"
                  imageSrc={ABOUT_IMAGES.lahoreCard}
                  imageAlt="Clarte MD Lahore clinic dispatch counter with sealed protocol box"
                  accent
                />
                <ValueCard
                  title="Twelve weeks"
                  body="Skin biology runs on weeks, not days. Every protocol is dosed for a complete 12-week course."
                  imageSrc={ABOUT_IMAGES.twelveWeeksCard}
                  imageAlt="Clarte MD twelve week protocol planning cards and skincare bottles"
                />
                <ValueCard
                  title="Sealed dispatch"
                  body="Every parcel ships sealed and labeled from our Lahore facility. COD across Pakistan."
                  imageSrc={ABOUT_IMAGES.sealedDispatchCard}
                  imageAlt="Clarte MD sealed skincare parcel prepared for dispatch"
                />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── PHILOSOPHY PILLARS ────────────────────────────────── */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[75rem] px-6">
          <Reveal>
            <div className="mb-14 max-w-[44rem] md:mb-20">
              <Eyebrow className="mb-5 text-cobalt">— What we believe</Eyebrow>
              <h2 className="font-display font-light text-navy text-[clamp(30px,4.5vw,52px)] leading-[1.05] tracking-[-0.02em]">
                Honest dermatology means{' '}
                <em className="italic text-cobalt">honest expectations.</em>
              </h2>
            </div>
          </Reveal>

          <RevealGroup stagger={0.08}>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-sand/60 bg-sand/60 md:grid-cols-3">
              <Reveal>
                <PhilosophyPillar
                  num="01"
                  title="Clinically dosed actives"
                  body="Niacinamide at 10%, not 2%. L-Ascorbic at 15%. Retinol at 0.3–0.5%. Doses that actually do clinical work, not the homeopathic concentrations most local brands ship."
                />
              </Reveal>
              <Reveal>
                <PhilosophyPillar
                  num="02"
                  title="One protocol, twelve weeks"
                  body="Skin biology runs on weeks, not days. Every protocol is dosed for 12 weeks of consistent use — no half-bottles, no top-up upsells, no Instagram quick-fixes."
                />
              </Reveal>
              <Reveal>
                <PhilosophyPillar
                  num="03"
                  title="Sealed packaging, COD payment"
                  body="Every parcel ships sealed and labeled. Pay the courier in cash when it arrives. If your order arrives damaged or incorrect, WhatsApp us within 24 hours."
                />
              </Reveal>
            </div>
          </RevealGroup>
        </div>
      </section>

      {/* ─── MANUFACTURING / LAHORE ───────────────────────────── */}
      <section className="relative isolate overflow-hidden border-y border-sand/40 bg-canvas-warm/40 py-24 md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-cobalt/6 blur-3xl"
        />
        <div className="relative mx-auto max-w-[75rem] px-6">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1.1fr_1fr]">
            <Reveal>
              <div>
                <Eyebrow className="mb-5 text-cobalt">— Where we make it</Eyebrow>
                <h2 className="font-display font-light text-navy text-[clamp(32px,5vw,56px)] leading-[1.02] tracking-[-0.025em]">
                  Made in <em className="italic text-cobalt">Lahore.</em>
                </h2>
                <p className="mt-6 max-w-[34rem] font-display italic text-[clamp(16px,1.5vw,19px)] leading-relaxed text-ink-2">
                  Every Clarté MD product is manufactured at our Lahore
                  facility. Every batch is tested before release; stability data
                  on file; active concentrations independently assayed.
                </p>
                <p className="mt-4 max-w-[34rem] font-body text-[15px] leading-[1.65] text-ink-mute">
                  Ingredient sourcing prioritises pharma-grade actives from
                  European and Korean suppliers. We publish the actives and
                  their concentrations on every product label — no
                  proprietary-complex obfuscation.
                </p>

                <ul className="mt-8 flex flex-col gap-3">
                  {[
                    'Batch-tested, stability-validated',
                    'Active concentrations independently assayed',
                    'Full ingredient transparency on labels',
                  ].map((line) => (
                    <li
                      key={line}
                      className="flex items-baseline gap-3 border-b border-sand/40 pb-3 font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink"
                    >
                      <span aria-hidden="true" className="text-cobalt">
                        ✓
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            {/* Visual: blueprint-styled card stack */}
            <Reveal delay={0.15}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/15 bg-navy-deep p-8 text-white shadow-[0_28px_70px_-34px_rgba(14,31,58,0.55)]">
                <Image
                  src={ABOUT_IMAGES.lab}
                  alt="Clarte MD Lahore skincare lab with batch testing and skincare packaging"
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy-deep/92 via-navy-deep/34 to-transparent"
                />
                {/* Decorative grid + corner markers */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-15 [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:48px_48px]"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-5 top-5 h-7 w-7 border-l-2 border-t-2 border-cobalt/60"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-5 top-5 h-7 w-7 border-r-2 border-t-2 border-cobalt/60"
                />
                <span
                  aria-hidden="true"
                  className="absolute left-5 bottom-5 h-7 w-7 border-l-2 border-b-2 border-cobalt/60"
                />
                <span
                  aria-hidden="true"
                  className="absolute right-5 bottom-5 h-7 w-7 border-r-2 border-b-2 border-cobalt/60"
                />

                <div className="relative z-10 flex h-full flex-col justify-between">
                  <div>
                    <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt">
                      Lab · CMD-LH-001
                    </span>
                    <h3 className="mt-3 font-display font-light italic text-white text-[clamp(24px,3vw,34px)] leading-[1.05]">
                      Clarté MD Lab
                    </h3>
                    <p className="mt-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-white/60">
                      Lahore, Pakistan
                    </p>
                  </div>

                  <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                    {[
                      ['Founded', 'MMXXIV'],
                      ['Production', 'In-house'],
                      ['Batch QA', 'Every release'],
                      ['Shipping', 'Nationwide PK'],
                    ].map(([k, v]) => (
                      <div key={k} className="border-t border-white/20 pt-2">
                        <dt className="font-mono text-[9.5px] uppercase tracking-[0.22em] text-white/55">
                          {k}
                        </dt>
                        <dd className="mt-1 font-display italic text-[15px] text-white">
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-center text-white md:py-32">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] [background-size:96px_96px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cobalt-glow/12 blur-3xl"
        />
        <CursorGlow color="rgba(138, 176, 224, 0.18)" size={520} />

        <div className="relative mx-auto max-w-[44rem] px-6">
          <RevealGroup stagger={0.1}>
            <Reveal>
              <Eyebrow className="mb-5 text-cobalt-glow">— Find yours</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="font-display font-light text-white text-[clamp(36px,5vw,64px)] leading-[1.02] tracking-[-0.025em]">
                Thirty seconds. <em className="italic text-cobalt-glow">One protocol.</em>
                <br />
                Twelve weeks to clearer skin.
              </h2>
            </Reveal>
            <Reveal>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                <Magnetic strength={6}>
                  <Link
                    href="/quiz"
                    className={cn(
                      'group/cta inline-flex h-14 items-center gap-3 rounded-md bg-white px-7 text-navy-deep',
                      'font-mono text-[12px] font-semibold uppercase tracking-[0.18em] no-underline',
                      'shadow-[0_18px_36px_-16px_rgba(0,0,0,0.55)]',
                      'transition-colors duration-300 hover:bg-cobalt-glow',
                    )}
                  >
                    Take the skin quiz
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </Link>
                </Magnetic>
                <Magnetic strength={4}>
                  <Link
                    href="/products"
                    className="inline-flex h-12 items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur transition-colors hover:bg-white/12"
                  >
                    Browse all 4 protocols
                  </Link>
                </Magnetic>
              </div>
            </Reveal>
            <Reveal>
              <p className="mt-8 inline-flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[0.22em] text-white/55">
                <MessageCircle className="h-3.5 w-3.5" /> Questions? WhatsApp our team
              </p>
            </Reveal>
          </RevealGroup>
        </div>
      </section>
    </div>
  );
}

/* ─── small composition pieces ─── */

function CityCard({
  label,
  meta,
  coordinates,
  imageSrc,
  imageAlt,
  accent = false,
}: {
  label: string;
  meta: string;
  coordinates: string;
  imageSrc?: string;
  imageAlt?: string;
  accent?: boolean;
}) {
  const hasImage = Boolean(imageSrc);

  return (
    <div
      className={cn(
        'group relative isolate flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl border p-6',
        'transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1',
        hasImage
          ? 'border-white/15 bg-navy-deep text-white shadow-[0_22px_54px_-28px_rgba(14,31,58,0.55)] hover:shadow-[0_30px_70px_-30px_rgba(14,31,58,0.7)]'
          : accent
          ? 'border-cobalt/30 bg-navy-deep text-white hover:shadow-[0_28px_56px_-24px_rgba(46,91,168,0.4)]'
          : 'border-sand/60 bg-card text-navy hover:border-navy/30 hover:shadow-[0_18px_36px_-18px_rgba(14,31,58,0.18)]',
      )}
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            fill
            unoptimized
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/88 via-navy-deep/42 to-navy-deep/28"
          />
        </>
      )}
      {/* corner markers */}
      <span aria-hidden="true" className={cn('absolute left-3 top-3 h-5 w-5 border-l border-t', hasImage || accent ? 'border-cobalt-glow/70' : 'border-cobalt/50')} />
      <span aria-hidden="true" className={cn('absolute right-3 top-3 h-5 w-5 border-r border-t', hasImage || accent ? 'border-cobalt-glow/70' : 'border-cobalt/50')} />

      <div className="relative z-10">
        <span className={cn('font-mono text-[10px] uppercase tracking-[0.22em]', hasImage || accent ? 'text-cobalt-glow' : 'text-cobalt')}>
          — {meta}
        </span>
        <h3
          className={cn(
            'mt-3 font-display font-light italic leading-none tracking-[-0.025em]',
            'text-[clamp(38px,4.5vw,56px)]',
            hasImage || accent ? 'text-white' : 'text-navy',
          )}
        >
          {label}
        </h3>
      </div>
      <span className={cn('relative z-10 font-mono text-[10px] uppercase tracking-[0.18em]', hasImage || accent ? 'text-white/65' : 'text-ink-faint')}>
        {coordinates}
      </span>
    </div>
  );
}

function ValueCard({
  title,
  body,
  imageSrc,
  imageAlt,
}: {
  title: string;
  body: string;
  imageSrc?: string;
  imageAlt?: string;
}) {
  const hasImage = Boolean(imageSrc);

  return (
    <div
      className={cn(
        'group relative isolate flex aspect-[3/4] flex-col justify-between overflow-hidden rounded-2xl border p-6',
        'transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-1',
        hasImage
          ? 'border-white/15 bg-navy-deep text-white shadow-[0_22px_54px_-28px_rgba(14,31,58,0.55)]'
          : 'border-sand/60 bg-card hover:border-navy/30 hover:shadow-[0_18px_36px_-18px_rgba(14,31,58,0.18)]',
      )}
    >
      {imageSrc && (
        <>
          <Image
            src={imageSrc}
            alt={imageAlt ?? ''}
            fill
            unoptimized
            sizes="(min-width: 1024px) 22vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-navy-deep/90 via-navy-deep/44 to-navy-deep/20"
          />
        </>
      )}
      <span className={cn('relative z-10 font-mono text-[10px] uppercase tracking-[0.22em]', hasImage ? 'text-cobalt-glow' : 'text-cobalt')}>
        — Principle
      </span>
      <div className="relative z-10">
        <h3 className={cn('font-display text-[clamp(18px,2.4vw,22px)] font-light italic leading-tight', hasImage ? 'text-white' : 'text-navy')}>
          {title}
        </h3>
        <p className={cn('mt-2 font-body text-[13px] leading-snug', hasImage ? 'text-white/76' : 'text-ink-mute')}>
          {body}
        </p>
      </div>
    </div>
  );
}

function PhilosophyPillar({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="group relative flex h-full flex-col gap-4 bg-canvas-soft p-8 transition-colors duration-500 hover:bg-canvas-warm/30 md:p-10">
      <div className="flex items-baseline justify-between font-mono text-[10px] uppercase tracking-[0.22em]">
        <span className="text-ink-faint">{num} / 03</span>
        <span className="text-cobalt">Principle</span>
      </div>
      <h3 className="font-display text-[clamp(22px,2.6vw,30px)] font-light italic leading-tight text-navy">
        {title}
      </h3>
      <p className="font-body text-[14.5px] leading-relaxed text-ink-2 md:text-[15.5px]">
        {body}
      </p>
      <div
        aria-hidden="true"
        className="absolute right-5 top-5 h-2 w-2 rounded-full bg-cobalt/0 transition-colors duration-500 group-hover:bg-cobalt"
      />
    </div>
  );
}
