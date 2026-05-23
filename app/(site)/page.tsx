import type { Metadata } from 'next';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
import { CalendarRange, HandCoins, MessageCircle, ArrowUpRight } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/ui/eyebrow';
import { SITE_URL } from '@/lib/schema/json-ld';
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
          HERO — Bader-grade. Warm cream, dramatic Fraunces, one CTA.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-canvas">
        <div className="mx-auto max-w-[75rem] px-6 pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-40 lg:pb-32">
          {/* Top-left brand line in mono — small, restrained */}
          <div className="mb-12 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-mute md:mb-16">
            Clarté MD · Lahore, Pakistan
          </div>

          {/* The headline — Fraunces Light, dramatic scale + tight leading */}
          <h1
            className={cn(
              'mb-8 font-display font-light text-navy',
              'text-[clamp(48px,8vw,96px)] leading-[0.95] tracking-[-0.025em]',
              'max-w-[64rem]',
            )}
          >
            Dermatologist-led skincare,
            <br />
            <em className="italic text-cobalt">for Pakistan.</em>
          </h1>

          {/* Italic descriptive line — Fraunces italic, pull-quote scale */}
          <p
            className={cn(
              'mb-12 max-w-[40rem] font-display italic text-ink-2',
              'text-[clamp(18px,2vw,24px)] leading-[1.4]',
            )}
          >
            A twelve-week protocol per concern, dosed by our GMC-registered doctor.
          </p>

          {/* Single primary CTA. Restraint = Bader. */}
          <div className="mb-8 flex flex-wrap items-center gap-5">
            <Button
              asChild
              size="lg"
              className="h-14 px-8 text-[15px] font-medium tracking-wide"
            >
              <Link href="/quiz" className="inline-flex items-center gap-2">
                Find your protocol
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
            <Link
              href="/products"
              className="text-sm text-ink-mute underline-offset-4 transition-colors hover:text-navy hover:underline"
            >
              Or browse the catalogue
            </Link>
          </div>

          {/* Mono trust footer */}
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-faint">
            <span>30-Second AI Skin Quiz</span>
            <span aria-hidden="true">·</span>
            <span>Made in Lahore</span>
            <span aria-hidden="true">·</span>
            <span>COD across Pakistan</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          RECEIPT BAND — honest placeholder until panel data exists.
          Per feedback_unverified_claims: never invent. State the gap.
          ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-sand/40 bg-canvas-soft">
        <div className="mx-auto flex max-w-[75rem] flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center md:py-12">
          <p className="font-display italic text-[clamp(18px,1.6vw,22px)] leading-snug text-navy">
            Honest dermatology. Honest expectations.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
            Outcome data publishing after our first 30-customer panel
          </p>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          PROTOCOLS — sculptural: 1 feature card + 3 supporting.
          Uses the 4 protocol-accent tokens (previously unused).
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[75rem] px-6">
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

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1.4fr_1fr]">
            {/* Feature card */}
            {featured && (
              <Link
                href={PROTOCOL_ROUTES[featured.slug] || '/'}
                className={cn(
                  'group relative flex min-h-[28rem] flex-col justify-between overflow-hidden',
                  'rounded-3xl border border-sand/40 bg-canvas-soft p-10 md:p-14',
                  'no-underline text-inherit',
                  'transition-[border-color,transform] duration-300',
                  'hover:-translate-y-1 hover:border-navy/30',
                )}
              >
                {/* Protocol-accent left bar */}
                <div
                  aria-hidden="true"
                  className={cn(
                    'absolute left-0 top-0 h-full w-1.5',
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
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-cobalt transition-transform group-hover:translate-x-1">
                    Start the protocol
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            )}

            {/* Supporting cards */}
            <div className="grid grid-cols-1 gap-5">
              {supporting.map((b) => (
                <Link
                  key={b.id}
                  href={PROTOCOL_ROUTES[b.slug] || '/'}
                  className={cn(
                    'group relative flex flex-col justify-between overflow-hidden',
                    'rounded-2xl border border-sand/40 bg-canvas-soft p-7',
                    'no-underline text-inherit',
                    'transition-[border-color,transform] duration-300',
                    'hover:-translate-y-0.5 hover:border-navy/30',
                  )}
                >
                  {/* Protocol-accent left bar */}
                  <div
                    aria-hidden="true"
                    className={cn(
                      'absolute left-0 top-0 h-full w-1',
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
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          HOW IT WORKS — 3-step (NEW). Apostrophe / Curology pattern.
          ───────────────────────────────────────────────────────────── */}
      <section className="border-y border-sand/40 bg-canvas-warm/50 py-24 md:py-32">
        <div className="mx-auto max-w-[75rem] px-6">
          <header className="mb-14 max-w-[40rem]">
            <Eyebrow className="mb-4 text-cobalt">— How it works</Eyebrow>
            <h2 className="font-display font-light text-navy text-[clamp(28px,4vw,44px)] leading-[1.1] tracking-[-0.02em]">
              Three steps. One protocol. Twelve weeks.
            </h2>
          </header>
          <ol className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
            <HowStep
              num="01"
              title="Take the quiz"
              body="Upload a selfie. Our AI projects week 12 across acne, pigmentation, aging, and barrier markers — and routes you to one of four protocols."
            />
            <HowStep
              num="02"
              title="We dispatch"
              body="Each protocol is a sealed twelve-week regimen, formulated by our GMC-registered doctor and packed in Lahore. WhatsApp confirmation before the courier moves."
            />
            <HowStep
              num="03"
              title="Pay on arrival"
              body="Cash on delivery across Pakistan. Flat Rs. 250 shipping. If anything's wrong, our team is on WhatsApp within two hours."
            />
          </ol>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          INDIVIDUAL PRODUCTS — numbered cadence (Tatcha editorial feel)
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-canvas py-24 md:py-32">
        <div className="mx-auto max-w-[75rem] px-6">
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
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-mute">
              01 / 0{orderedProducts.length}
            </span>
          </header>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(15rem,1fr))] sm:gap-5">
            {orderedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <div className="mt-12 text-center">
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
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          BRAND STORY — navy heritage moment. Signature concept named.
          ───────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-navy py-24 text-white md:py-32">
        <div className="mx-auto grid max-w-[75rem] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[6fr_5fr]">
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
          <div
            aria-hidden="true"
            className={cn(
              'flex aspect-[4/5] items-center justify-center rounded-2xl',
              'bg-gradient-to-br from-navy-2 via-[#1c2b4a] to-[#243958]',
              'border border-white/5 font-mono text-[11px] uppercase tracking-[0.18em] text-white/30',
            )}
          >
            <span>Doctor / clinic still life</span>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          TRUST STRIP — icons + Fraunces italic numbers
          ───────────────────────────────────────────────────────────── */}
      <section className="bg-canvas-soft py-20 md:py-24">
        <div className="mx-auto grid max-w-[75rem] grid-cols-1 gap-10 px-6 md:grid-cols-3 md:gap-14">
          <TrustCell
            icon={<CalendarRange className="h-6 w-6" strokeWidth={1.4} />}
            headline="Twelve"
            unit="weeks"
            body="Every protocol is dosed for twelve weeks of consistent use. No half-bottles, no top-up upsells."
          />
          <TrustCell
            icon={<HandCoins className="h-6 w-6" strokeWidth={1.4} />}
            headline="Cash"
            unit="on delivery"
            body="Pay the courier when your parcel arrives. Flat Rs. 250 shipping, anywhere in Pakistan."
          />
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
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          FINAL CTA — restate the single primary action
          ───────────────────────────────────────────────────────────── */}
      <section className="border-t border-sand/40 bg-canvas py-24 text-center md:py-32">
        <div className="mx-auto max-w-[42rem] px-6">
          <Eyebrow className="mb-4 text-cobalt">— Find yours</Eyebrow>
          <h2 className="mb-6 font-display font-light text-navy text-[clamp(32px,4.5vw,52px)] leading-[1.05] tracking-[-0.02em]">
            Thirty seconds. One protocol.
            <br />
            <em className="italic">Twelve weeks to clearer skin.</em>
          </h2>
          <Button asChild size="lg" className="h-14 px-8 text-[15px]">
            <Link href="/quiz" className="inline-flex items-center gap-2">
              Take the skin quiz
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
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
