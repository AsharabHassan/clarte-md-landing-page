import type { Metadata } from 'next';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import {
  CalendarRange,
  HandCoins,
  MessageCircle,
  ArrowUpRight,
  Microscope,
  ClipboardList,
  LineChart,
  BookOpen,
} from 'lucide-react';
import { EVIDENCE_BY_BUNDLE } from '@/lib/protocols/evidence';
import { db, schema } from '@/lib/db/client';
import { ProductCard } from '@/components/product/ProductCard';
import { Reviews } from '@/components/marketing/Reviews';
import { getApprovedReviews } from '@/lib/db/review-queries';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SITE_URL } from '@/lib/schema/json-ld';
import { bundleCinematicPath } from '@/lib/products/content';
import { Reveal, RevealGroup } from '@/lib/anim/reveal';
import { SplitReveal } from '@/lib/anim/split-reveal';
import { Magnetic } from '@/lib/anim/magnetic';
import { CursorGlow } from '@/lib/anim/cursor-glow';
import { CinematicPhoto } from '@/lib/anim/cinematic-photo';
import { cn } from '@/lib/utils';

const TITLE = 'Clarté MD — Dermatologist-led skincare for Pakistan';
const DESCRIPTION =
  'Four 12-week clinical regimens for acne, pigmentation, anti-ageing, and barrier repair. Take the 30-second AI skin quiz to find yours. Formulated in Lahore. COD across Pakistan.';

export const metadata: Metadata = {
  title: { absolute: TITLE },
  description: DESCRIPTION,
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    type: 'website',
  },
};

export const dynamic = 'force-dynamic';

const CONCERN_LABELS: Record<string, string> = {
  acne: 'Acne · Post-acne marks',
  pigmentation: 'Melasma · Hyperpigmentation',
  'anti-ageing': 'Fine lines · Texture',
  hydration: 'Sensitive · Barrier',
};

const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

const PROTOCOL_TAGLINES: Record<string, string> = {
  'clear-skin-protocol':
    'Niacinamide 10% · Azelaic · Salicylic 2% — for active breakouts and post-acne marks.',
  'even-tone-protocol':
    'L-Ascorbic 15% · Tranexamic · Alpha-Arbutin · SPF 50 — for pigmentation and melasma.',
  'renewal-protocol':
    'Retinol 0.3% · L-Ascorbic · HA · Ceramides — for fine lines, dullness, and texture.',
  'barrier-protocol':
    'Triple HA · B5 · Ceramides · SPF 50 — no actives, calms compromised barriers.',
};

// Per-protocol accent color class for the left-bar treatment.
// Maps onto the 4 protocol-accent tokens defined in globals.css.
const PROTOCOL_ACCENT_CLASS: Record<string, string> = {
  'clear-skin-protocol': 'bg-acne-accent',
  'even-tone-protocol': 'bg-eventone-accent',
  'renewal-protocol': 'bg-renewal-accent',
  'barrier-protocol': 'bg-barrier-accent',
};

const PRODUCT_DISPLAY_ORDER = ['prep', 'rescue', 'vitc', 'acne', 'ha', 'reti', 'light', 'spf'];

async function getCatalog() {
  const bundles = await db.select().from(schema.bundles);
  const products = await db
    .select()
    .from(schema.products)
    .where(eq(schema.products.active, true));
  return { bundles, products };
}

export default async function HomePage() {
  const { bundles, products } = await getCatalog();
  const approvedReviews = await getApprovedReviews();
  const ordered = [
    'clear-skin-protocol',
    'even-tone-protocol',
    'renewal-protocol',
    'barrier-protocol',
  ]
    .map((slug) => bundles.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => !!b);
  const orderedProducts = PRODUCT_DISPLAY_ORDER
    .map((sku) => products.find((p) => p.sku === sku))
    .filter((p): p is NonNullable<typeof p> => !!p);

  // The feature protocol — first card gets the editorial-hero treatment.
  // Acne is the default funnel target (the AI generator was built around it
  // and acne is the bestseller in PK skincare market-wide).
  const featured = ordered[0];
  const supporting = ordered.slice(1);

  return (
    <div className="bg-canvas">
      {/* ─────────────────────────────────────────────────────────────
          HERO — full-bleed dark cinematic with backdrop product still.
          Matches the protocol-page hero system so the brand entry feels
          like a continuation of the same visual language.
          ───────────────────────────────────────────────────────────── */}
      <section
        className={cn(
          'relative isolate overflow-hidden bg-navy-deep text-white',
          'min-h-[85vh] md:min-h-screen',
        )}
      >
        {/* Layer 1: cinematic backdrop photo, parallax + ken-burns */}
        {featured && (
          <CinematicPhoto
            src={bundleCinematicPath(featured.slug)}
            alt={`${featured.name} cinematic still`}
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

        {/* Layer 2: top-to-bottom legibility gradient */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-b from-navy-deep/50 via-navy-deep/65 to-navy-deep/95"
        />
        {/* Side gradient — dark column on left for headline legibility */}
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 from-0% via-navy-deep/75 via-50% to-navy-deep/30 to-100%"
        />

        {/* Layer 3: cursor-glow accent */}
        <CursorGlow color="rgba(138, 176, 224, 0.22)" size={640} />

        {/* Layer 4: vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [box-shadow:inset_0_0_240px_60px_rgba(0,0,0,0.55)]"
        />

        {/* Layer 5: hero content */}
        <div
          className="relative z-10 mx-auto flex min-h-[85vh] max-w-[75rem] flex-col justify-end px-6 pb-20 pt-32 md:min-h-screen md:pb-28 md:pt-40 [text-shadow:0_2px_18px_rgba(8,21,42,0.55)]"
        >
          <RevealGroup stagger={0.1}>
            <Reveal>
              <span className="mb-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-cobalt-glow">
                <span aria-hidden="true" className="h-px w-8 bg-cobalt-glow" />
                Clarté MD · Pakistan
              </span>
            </Reveal>
          </RevealGroup>

          {/* Headline — per-word split reveal */}
          <h1
            style={{ color: '#ffffff' }}
            className={cn(
              'mb-8 max-w-[46rem] font-display font-light',
              'text-[clamp(44px,7.5vw,92px)] leading-[0.94] tracking-[-0.025em]',
              '[&_.italic>span]:!text-cobalt-glow',
            )}
          >
            <SplitReveal
              as="span"
              text="Dermatologist-led skincare,"
              baseDelay={0.2}
              stagger={0.07}
              className="block text-white"
            />
            <SplitReveal
              as="span"
              text="*for Pakistan.*"
              italicMarkers
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
                  'text-[clamp(17px,1.9vw,22px)] leading-[1.45]',
                )}
              >
                A twelve-week protocol per concern, formulated by a team of doctors in London and Lahore.
              </p>
            </Reveal>

            <Reveal>
              <div className="mb-6 flex flex-wrap items-center gap-4">
                <Magnetic strength={6}>
                  <Button
                    asChild
                    size="lg"
                    className={cn(
                      'group/cta h-14 px-8 text-[15px] font-medium tracking-wide',
                      '!bg-white !text-navy-deep hover:!bg-cobalt-glow hover:!text-navy-deep',
                      'shadow-[0_18px_40px_-16px_rgba(0,0,0,0.6)]',
                    )}
                  >
                    <Link href="/quiz" className="inline-flex items-center gap-2">
                      Find your protocol
                      <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                    </Link>
                  </Button>
                </Magnetic>
                <Magnetic strength={4}>
                  <Link
                    href="/products"
                    className={cn(
                      'group inline-flex h-14 items-center gap-2 rounded-md border border-white/35 bg-white/5 px-7 text-white backdrop-blur-md',
                      'font-mono text-[11.5px] font-semibold uppercase tracking-[0.18em]',
                      'transition-[background-color,border-color,color] duration-300 hover:border-white hover:bg-white/15',
                    )}
                  >
                    Or browse the catalogue
                    <ArrowUpRight
                      className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </Link>
                </Magnetic>
              </div>
            </Reveal>

            <Reveal>
              <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/75">
                <li>30-Second AI Skin Quiz</li>
                <li aria-hidden="true" className="text-white/40">·</li>
                <li>Made in Pakistan</li>
                <li aria-hidden="true" className="text-white/40">·</li>
                <li>COD across Pakistan</li>
              </ul>
            </Reveal>
          </RevealGroup>
        </div>

        {/* Scroll cue */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-6 z-10 flex justify-center"
        >
          <div className="flex animate-bounce flex-col items-center gap-2 text-white/55">
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
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          EVIDENCE BAND — Cinematic two-part: (1) the methodology we
          will publish, (2) the published research that already backs
          every active in the protocols.

          Per feedback_unverified_claims: no Clarté trial percentages.
          The bottom row uses ingredient research with verbatim citations
          (sourced from lib/protocols/evidence.ts) — those numbers ARE
          real and peer-reviewed; what's pending is our own panel.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden border-y border-navy/10 bg-navy-deep py-20 text-white md:py-28">
        {/* Blueprint grid + cobalt halo (matches the protocol-page system) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,#8ab0e0_1px,transparent_1px),linear-gradient(to_bottom,#8ab0e0_1px,transparent_1px)] [background-size:80px_80px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -left-40 top-1/3 h-[40rem] w-[40rem] rounded-full bg-cobalt/15 blur-[120px]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -bottom-32 h-[32rem] w-[32rem] rounded-full bg-cobalt-glow/10 blur-[100px]"
        />

        <div className="relative mx-auto max-w-[75rem] px-6">
          {/* Header */}
          <Reveal>
            <header className="mb-12 flex flex-col items-start justify-between gap-6 md:mb-16 md:flex-row md:items-end">
              <div className="max-w-[44rem]">
                <Eyebrow className="mb-4 inline-flex items-center gap-2 text-cobalt-glow">
                  <span aria-hidden="true" className="h-px w-6 bg-cobalt-glow" />
                  The evidence
                </Eyebrow>
                <h2 className="font-display font-light text-white text-[clamp(28px,4.5vw,48px)] leading-[1.05] tracking-[-0.02em]">
                  We publish what we measure
                  <em className="italic text-cobalt-glow">.</em>
                </h2>
                <p className="mt-3 max-w-[36rem] font-display italic text-[clamp(15px,1.5vw,18px)] leading-relaxed text-white/70">
                  Our own 30-customer panel is mid-flight. Until those numbers publish,
                  here is the peer-reviewed research that justifies every active in the kit.
                </p>
              </div>
              <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt-glow/80">
                Clinic panel · n=30 · publishing 2026 Q3
              </span>
            </header>
          </Reveal>

          {/* Row 1 — methodology pillars (what we WILL measure, plainly) */}
          <RevealGroup stagger={0.1}>
            <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm sm:grid-cols-3">
              <Reveal>
                <MethodCard
                  icon={<Microscope className="h-4 w-4" />}
                  label="What we measure at week 8"
                  body="Visible improvement, scored from before/after standardised photos by our review doctors."
                />
              </Reveal>
              <Reveal>
                <MethodCard
                  icon={<ClipboardList className="h-4 w-4" />}
                  label="Recommend to a friend"
                  body="Single yes / no question at week 12, asked to every panel participant — no aggregation tricks."
                />
              </Reveal>
              <Reveal>
                <MethodCard
                  icon={<LineChart className="h-4 w-4" />}
                  label="Still on routine at week 12"
                  body="Compliance check — did the customer actually finish the protocol, or quit halfway?"
                />
              </Reveal>
            </div>
          </RevealGroup>

          {/* Divider */}
          <div className="my-14 flex items-center gap-4 md:my-16">
            <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
            <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt-glow/80">
              Published research · per active
            </span>
            <span aria-hidden="true" className="h-px flex-1 bg-white/15" />
          </div>

          {/* Row 2 — cited published research, one per protocol */}
          <RevealGroup stagger={0.08}>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  protocol: 'Clear Skin',
                  accent: 'text-amber-200',
                  stat: EVIDENCE_BY_BUNDLE['clear-skin-protocol'].stats[0],
                },
                {
                  protocol: 'Even Tone',
                  accent: 'text-rose-200',
                  stat: EVIDENCE_BY_BUNDLE['even-tone-protocol'].stats[1],
                },
                {
                  protocol: 'Renewal',
                  accent: 'text-violet-200',
                  stat: EVIDENCE_BY_BUNDLE['renewal-protocol'].stats[0],
                },
                {
                  protocol: 'Barrier',
                  accent: 'text-emerald-200',
                  stat: EVIDENCE_BY_BUNDLE['barrier-protocol'].stats[1],
                },
              ].map(({ protocol, accent, stat }) => (
                <Reveal key={protocol}>
                  <EvidenceCard protocol={protocol} accent={accent} stat={stat} />
                </Reveal>
              ))}
            </div>
          </RevealGroup>

          {/* Honest closing line */}
          <Reveal>
            <p className="mt-12 flex max-w-[44rem] items-start gap-3 font-display italic text-[clamp(15px,1.4vw,18px)] leading-relaxed text-white/75 md:mt-14">
              <BookOpen className="mt-1 h-4 w-4 shrink-0 text-cobalt-glow" aria-hidden="true" />
              <span>
                Honest dermatology, honest expectations. The first Clarté MD numbers will publish after
                our 30-customer panel completes — no borrowed percentages, no invented claims.
              </span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROTOCOLS — sculptural: 1 feature card + 3 supporting.
          Uses the 4 protocol-accent tokens (previously unused).
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[75rem] px-6">
          <Reveal>
            <header className="mb-14 max-w-[44rem] md:mb-20">
              <Eyebrow className="mb-4 text-cobalt">— The Protocols</Eyebrow>
              <h2 className="mb-4 font-display font-light text-navy text-[clamp(32px,5vw,56px)] leading-[1.05] tracking-[-0.02em]">
                Pick the protocol that matches your skin.
              </h2>
              <p className="font-display italic text-[clamp(16px,1.6vw,20px)] text-ink-mute leading-relaxed">
                Each is a twelve-week regimen — clinically dosed, fully sealed, dispatched from
                Lahore.
              </p>
            </header>
          </Reveal>

          <Reveal>
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
              {/* Feature card */}
              {featured && (
                <Link
                  href={PROTOCOL_ROUTES[featured.slug] || '/'}
                  className={cn(
                    'group relative isolate flex min-h-[32rem] flex-col justify-between overflow-hidden',
                    'rounded-3xl border border-sand/40 bg-canvas-soft p-10 md:p-14',
                    'no-underline text-inherit',
                    'transition-[border-color,box-shadow,transform] duration-500',
                    'hover:-translate-y-1 hover:border-navy/30 hover:shadow-[0_30px_60px_-20px_rgba(14,31,58,0.18)]',
                  )}
                >
                  {/* Cinematic backdrop, lightly overlaid */}
                  <div className="absolute inset-0 -z-10">
                    <CinematicPhoto
                      src={bundleCinematicPath(featured.slug)}
                      alt=""
                      width={1200}
                      height={900}
                      kenBurns
                      aspectClass="h-full w-full"
                      wrapperClassName="h-full w-full"
                      className="object-cover opacity-[0.16] mix-blend-multiply"
                      sizes="(min-width: 1024px) 60vw, 100vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-canvas-soft/40 via-transparent to-canvas-soft/80" />
                  </div>
                  {/* Protocol-accent left bar — grows on hover */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 top-0 h-full w-1.5 origin-top transition-transform duration-500 group-hover:scale-y-110',
                      PROTOCOL_ACCENT_CLASS[featured.slug],
                    )}
                  />
                  <div>
                    <Eyebrow className="mb-4 text-ink-mute">
                      Most prescribed · {CONCERN_LABELS[featured.concern]}
                    </Eyebrow>
                    <h3 className="mb-6 font-display font-light text-navy text-[clamp(34px,4.5vw,52px)] leading-[1.05] tracking-[-0.02em]">
                      <em className="italic">{featured.name.split(' ').slice(0, -1).join(' ')}</em>{' '}
                      <span className="font-normal">{featured.name.split(' ').slice(-1)}</span>
                    </h3>
                    <p className="max-w-[28rem] font-display italic text-base leading-relaxed text-ink-2 md:text-lg">
                      {PROTOCOL_TAGLINES[featured.slug]}
                    </p>
                  </div>
                  <div className="mt-10 flex items-baseline justify-between border-t border-sand/40 pt-6">
                    <span className="font-display text-2xl text-navy md:text-3xl">
                      Rs. {featured.pricePkr.toLocaleString()}
                    </span>
                    <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-cobalt transition-transform duration-300 group-hover:translate-x-1">
                      Start the protocol
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>
                </Link>
              )}

              {/* Supporting cards */}
              <RevealGroup stagger={0.08}>
                <div className="grid grid-cols-1 gap-5">
                  {supporting.map((b) => (
                    <Reveal key={b.id}>
                      <Link
                        href={PROTOCOL_ROUTES[b.slug] || '/'}
                        className={cn(
                          'group relative flex flex-col justify-between overflow-hidden',
                          'rounded-2xl border border-sand/40 bg-canvas-soft p-7',
                          'no-underline text-inherit',
                          'transition-[border-color,transform,box-shadow] duration-300',
                          'hover:-translate-y-0.5 hover:border-navy/30 hover:shadow-[0_18px_36px_-18px_rgba(14,31,58,0.18)]',
                        )}
                      >
                        {/* Protocol-accent left bar — grows on hover */}
                        <div
                          aria-hidden="true"
                          className={cn(
                            'absolute left-0 top-0 h-full w-1 origin-top transition-transform duration-500 group-hover:scale-y-110',
                            PROTOCOL_ACCENT_CLASS[b.slug],
                          )}
                        />
                        <div>
                          <Eyebrow className="mb-2 text-ink-mute">{CONCERN_LABELS[b.concern]}</Eyebrow>
                          <h3 className="mb-2 font-display italic text-navy text-[clamp(20px,2.5vw,28px)] leading-tight">
                            {b.name}
                          </h3>
                          <p className="font-body text-sm leading-snug text-ink-mute">
                            {PROTOCOL_TAGLINES[b.slug]}
                          </p>
                        </div>
                        <div className="mt-5 flex items-baseline justify-between border-t border-sand/30 pt-3">
                          <span className="font-display text-lg text-navy">
                            Rs. {b.pricePkr.toLocaleString()}
                          </span>
                          <span className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-[0.16em] text-cobalt transition-transform group-hover:translate-x-1">
                            Open
                            <ArrowUpRight className="h-3 w-3" />
                          </span>
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </div>
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          HOW IT WORKS — 3-step (NEW). Apostrophe / Curology pattern.
          ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-sand/40 bg-canvas-warm/50 py-24 md:py-32">
        <div className="mx-auto max-w-[75rem] px-6">
          <Reveal>
            <header className="mb-14 max-w-[40rem]">
              <Eyebrow className="mb-4 text-cobalt">— How it works</Eyebrow>
              <h2 className="font-display font-light text-navy text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-[-0.02em]">
                Three steps. One protocol. Twelve weeks.
              </h2>
            </header>
          </Reveal>
          <RevealGroup stagger={0.12}>
            <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
              <Reveal>
                <HowStep
                  num="01"
                  title="Take the quiz"
                  body="Upload a selfie. Our AI projects week 12 across acne, pigmentation, aging, and barrier markers — and routes you to one of four protocols."
                />
              </Reveal>
              <Reveal>
                <HowStep
                  num="02"
                  title="We dispatch"
                  body="Each protocol is a sealed twelve-week regimen, formulated by our GMC-registered doctor and packed in Lahore. WhatsApp confirmation before the courier moves."
                />
              </Reveal>
              <Reveal>
                <HowStep
                  num="03"
                  title="Pay on arrival"
                  body="Cash on delivery across Pakistan. Flat Rs. 250 shipping. If anything's wrong, our team is on WhatsApp within two hours."
                />
              </Reveal>
            </ol>
          </RevealGroup>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INDIVIDUAL PRODUCTS — numbered cadence (Tatcha editorial feel)
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[75rem] px-6">
          <Reveal>
            <header className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div className="max-w-[40rem]">
                <Eyebrow className="mb-4 text-cobalt">— À la carte</Eyebrow>
                <h2 className="mb-4 font-display font-light text-navy text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-[-0.02em]">
                  Or shop individual formulations.
                </h2>
                <p className="font-display italic text-[clamp(15px,1.4vw,18px)] text-ink-mute leading-relaxed">
                  Same formulation, same batch, same dose as the protocol — buy individually when
                  you know what you need.
                </p>
              </div>
              <div className="flex flex-col items-start gap-1.5 md:items-end">
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
                  {orderedProducts.length.toString().padStart(2, '0')} formulations · 1 protocol family
                </span>
                <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt sm:hidden">
                  Swipe to explore →
                </span>
              </div>
            </header>
          </Reveal>
          <RevealGroup stagger={0.05}>
            <div
              className={cn(
                '-mx-6 flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-4',
                'sm:mx-0 sm:grid sm:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] sm:gap-5',
                'sm:overflow-visible sm:px-0 sm:pb-0 sm:snap-none',
                '[scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
              )}
            >
              {orderedProducts.map((p) => (
                /* Sizing must live on the flex item itself (the Reveal div),
                   not a nested child — otherwise w-[72%]/flex-shrink-0 never
                   apply and the cards collapse to ~120px on mobile. */
                <Reveal
                  key={p.id}
                  className="w-[72%] flex-shrink-0 snap-start sm:w-auto sm:flex-shrink"
                >
                  <ProductCard product={p} />
                </Reveal>
              ))}
            </div>
          </RevealGroup>
          <Reveal>
            <div className="mt-12 text-center">
              <Magnetic strength={4}>
                <Link
                  href="/products"
                  className={cn(
                    'inline-flex items-center gap-2 rounded-md border border-navy bg-transparent px-7 py-3.5',
                    'font-mono text-[12px] font-semibold uppercase tracking-[0.18em] text-navy no-underline',
                    'transition-colors hover:bg-navy hover:text-white',
                  )}
                >
                  View the full catalogue
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          REVIEWS — verified patient testimonials with before/after
          photos (lightbox). Data: lib/marketing/reviews.ts.
          ───────────────────────────────────────────────────────────── */}
      <Reviews reviews={approvedReviews} />

      {/* ─────────────────────────────────────────────────────────────
          BRAND STORY — navy heritage moment. Signature concept named.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
        <CursorGlow color="rgba(138, 176, 224, 0.2)" size={560} />
        <div className="relative z-10 mx-auto grid max-w-[75rem] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[6fr_5fr]">
          <Reveal>
            <div>
              <Eyebrow className="mb-6 text-cobalt-glow">— The brand</Eyebrow>
              <h2 className="mb-8 font-display font-light leading-[1.05] tracking-[-0.02em] text-white text-[clamp(36px,5.5vw,64px)]">
                <em className="italic">The Clarté Protocol</em>
              </h2>
              <p className="mb-5 max-w-[34rem] font-display italic text-[clamp(17px,1.6vw,22px)] leading-[1.5] text-white/90">
                Four concerns. Four regimens. One signature method — dermatologist-formulated,
                clinically dosed, twelve weeks of consistent use.
              </p>
              <p className="mb-10 max-w-[34rem] font-body text-base leading-[1.7] text-white/75">
                No single-active hero products sold in isolation. No &ldquo;formulated by experts&rdquo;
                without a name behind it. Every Clarté protocol is reviewed by the same GMC-registered
                doctor and dispatched sealed from Lahore — never a routine the patient builds
                without guidance.
              </p>
              <Link
                href="/about"
                className={cn(
                  'inline-flex items-center gap-1.5 pb-0.5 font-mono text-xs font-semibold uppercase tracking-[0.18em] no-underline',
                  'border-b border-cobalt-glow text-cobalt-glow',
                  'transition-colors hover:border-white hover:text-white',
                )}
              >
                About the brand
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={0.15}>
            <CinematicPhoto
              src={bundleCinematicPath('renewal-protocol')}
              alt=""
              width={800}
              height={1000}
              parallax={0.1}
              lightSweep
              aspectClass="aspect-[4/5]"
              wrapperClassName="rounded-2xl border border-white/10 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]"
              className="object-cover opacity-90"
              sizes="(min-width: 1024px) 40vw, 90vw"
            />
          </Reveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TRUST STRIP — icons + Fraunces italic numbers
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-canvas-soft py-20 md:py-24">
        <RevealGroup stagger={0.1}>
          <div className="mx-auto grid max-w-[75rem] grid-cols-1 gap-10 px-6 md:grid-cols-3 md:gap-14">
            <Reveal>
              <TrustCell
                icon={<CalendarRange className="h-6 w-6" strokeWidth={1.4} />}
                headline="Twelve"
                unit="weeks"
                body="Every protocol is dosed for twelve weeks of consistent use. No half-bottles, no top-up upsells."
              />
            </Reveal>
            <Reveal>
              <TrustCell
                icon={<HandCoins className="h-6 w-6" strokeWidth={1.4} />}
                headline="Cash"
                unit="on delivery"
                body="Pay the courier when your parcel arrives. Flat Rs. 250 shipping, anywhere in Pakistan."
              />
            </Reveal>
            <Reveal>
              <TrustCell
                icon={<MessageCircle className="h-6 w-6" strokeWidth={1.4} />}
                headline="Two-hour"
                unit="WhatsApp"
                body={
                  <>
                    A real person answers — usually within two hours.{' '}
                    <a
                      href="https://wa.me/923249986822"
                      target="_blank"
                      rel="noopener"
                      className="font-semibold text-cobalt underline-offset-4 hover:underline"
                    >
                      Message our team →
                    </a>
                  </>
                }
              />
            </Reveal>
          </div>
        </RevealGroup>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FINAL CTA — restate the single primary action
          ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-sand/40 bg-canvas py-24 text-center md:py-32">
        <RevealGroup stagger={0.1}>
          <div className="mx-auto max-w-[42rem] px-6">
            <Reveal>
              <Eyebrow className="mb-4 text-cobalt">— Find yours</Eyebrow>
            </Reveal>
            <Reveal>
              <h2 className="mb-6 font-display font-light text-navy text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[-0.02em]">
                Thirty seconds. One protocol.
                <br />
                <em className="italic">Twelve weeks to clearer skin.</em>
              </h2>
            </Reveal>
            <Reveal>
              <Magnetic strength={6}>
                <Button asChild size="lg" className="h-14 px-8 text-[15px]">
                  <Link href="/quiz" className="inline-flex items-center gap-2">
                    Take the skin quiz
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </Magnetic>
            </Reveal>
          </div>
        </RevealGroup>
      </section>
    </div>
  );
}

function MethodCard({
  icon,
  label,
  body,
}: {
  icon: React.ReactNode;
  label: string;
  body: string;
}) {
  return (
    <div className="group relative isolate flex flex-col gap-3 bg-navy-deep/30 p-7 transition-colors duration-300 hover:bg-navy-deep/10 md:p-8">
      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-cobalt-glow">
        <span className="grid h-7 w-7 place-items-center rounded-full border border-cobalt-glow/40 bg-cobalt/15 text-cobalt-glow">
          {icon}
        </span>
        {label}
      </span>
      <p className="font-body text-[14.5px] leading-[1.55] text-white/80">{body}</p>
    </div>
  );
}

function EvidenceCard({
  protocol,
  accent,
  stat,
}: {
  protocol: string;
  accent: string;
  stat: import('@/lib/protocols/evidence').EvidenceStat;
}) {
  return (
    <article className="group relative isolate flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-[border-color,background-color,transform] duration-300 hover:-translate-y-0.5 hover:border-cobalt-glow/40 hover:bg-white/[0.07]">
      <span className={cn('font-mono text-[9.5px] uppercase tracking-[0.22em]', accent)}>
        {protocol} protocol
      </span>
      <div className="mt-4 flex items-baseline gap-1.5">
        <span className={cn('font-display font-light leading-none text-[clamp(40px,4.5vw,56px)]', accent)}>
          {stat.figure}
        </span>
        <span className={cn('font-display text-[clamp(20px,2vw,26px)] font-light leading-none', accent)}>
          {stat.suffix ?? ''}
        </span>
      </div>
      <p className="mt-3 font-body text-[13px] leading-snug text-white/90">{stat.context}</p>
      <p className="mt-2 font-body text-[12px] leading-snug text-white/55">{stat.active} · {stat.population ?? ''}</p>
      <p className="mt-auto pt-5 font-mono text-[9.5px] uppercase tracking-[0.18em] text-white/45">
        {stat.citation}
      </p>
    </article>
  );
}

function HowStep({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <li className="flex flex-col gap-4">
      <span
        aria-hidden="true"
        className="font-display italic text-cobalt text-[clamp(36px,4vw,48px)] leading-none"
      >
        {num}
      </span>
      <h3 className="font-display text-xl font-normal text-navy md:text-2xl">{title}</h3>
      <p className="font-body text-[15px] leading-[1.65] text-ink-mute">{body}</p>
    </li>
  );
}

function TrustCell({
  icon,
  headline,
  unit,
  body,
}: {
  icon: React.ReactNode;
  headline: string;
  unit: string;
  body: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-cobalt" aria-hidden="true">
        {icon}
      </span>
      <h3 className="font-display leading-[1.05] text-navy">
        <em className="italic text-[clamp(28px,3.5vw,40px)]">{headline}</em>{' '}
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
          {unit}
        </span>
      </h3>
      <p className="font-body text-[15px] leading-[1.65] text-ink-mute">{body}</p>
    </div>
  );
}
