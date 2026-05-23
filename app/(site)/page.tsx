import type { Metadata } from 'next';
import Link from 'next/link';
import { eq } from 'drizzle-orm';
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
  // Homepage title intentionally bypasses the layout %s template so the
  // brand name isn't appended twice.
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
  acne: 'Acne · PIH',
  pigmentation: 'Pigmentation · Melasma',
  'anti-ageing': 'Anti-ageing · Fine lines',
  hydration: 'Sensitivity · Hydration',
};

const PROTOCOL_ROUTES: Record<string, string> = {
  'clear-skin-protocol': '/acne',
  'even-tone-protocol': '/even-tone',
  'renewal-protocol': '/renewal',
  'barrier-protocol': '/barrier',
};

const PROTOCOL_TAGLINES: Record<string, string> = {
  'clear-skin-protocol':
    'Niacinamide 10% · Azelaic · 2% Salicylic — for active breakouts and post-acne marks.',
  'even-tone-protocol':
    'L-Ascorbic 15% · Tranexamic · Alpha-Arbutin · SPF 50 — for pigmentation and melasma.',
  'renewal-protocol':
    'Retinol 0.3% · L-Ascorbic · HA · Ceramides — for fine lines, dullness, and texture.',
  'barrier-protocol':
    'Triple HA · B5 · Ceramides · SPF 50 — no actives, calms compromised barriers.',
};

// Display order for the homepage individual-products strip. Mirrors
// the routine sequence (cleanse → serum actives → moisturiser → SPF)
// so customers reading top-to-bottom see the natural application
// order, not the seed order.
const PRODUCT_DISPLAY_ORDER = ['prep', 'rescue', 'vitc', 'acne', 'ha', 'reti', 'light', 'spf'];

// Shared section-head pattern: centered eyebrow + Fraunces h2 + lede.
function SectionHead({
  eyebrow,
  heading,
  lede,
}: {
  eyebrow: string;
  heading: string;
  lede?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-[42.5rem] px-6 text-center">
      <Eyebrow className="mb-3.5 text-cobalt">{eyebrow}</Eyebrow>
      <h2 className="mb-4 font-display font-normal text-navy text-[clamp(32px,4vw,44px)] leading-[1.15] tracking-[-0.01em]">
        {heading}
      </h2>
      {lede && <p className="text-base text-ink-mute leading-snug">{lede}</p>}
    </div>
  );
}

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
  const ordered = ['clear-skin-protocol', 'even-tone-protocol', 'renewal-protocol', 'barrier-protocol']
    .map((slug) => bundles.find((b) => b.slug === slug))
    .filter((b): b is NonNullable<typeof b> => !!b);
  const orderedProducts = PRODUCT_DISPLAY_ORDER
    .map((sku) => products.find((p) => p.sku === sku))
    .filter((p): p is NonNullable<typeof p> => !!p);

  return (
    <div>
      {/* HERO */}
      <section className="border-b border-rule bg-gradient-to-b from-sky to-card">
        <div className="mx-auto max-w-[67.5rem] px-6 pt-[88px] pb-24 text-center">
          <div className="mb-5 font-mono text-xs uppercase tracking-[0.15em] text-cobalt">
            Clarté MD · Lahore
          </div>
          <h1 className="mb-7 font-display font-light text-navy text-[clamp(40px,6vw,64px)] leading-[1.05] tracking-[-0.02em]">
            Dermatologist-led skincare,
            <br />
            <em className="italic text-cobalt">for Pakistan.</em>
          </h1>
          <p className="mx-auto mb-9 max-w-[38.75rem] text-lg leading-relaxed text-ink-2">
            Four 12-week clinical protocols, each formulated by our GMC-registered doctor.
            Clinically dosed actives. Honest expectations. Manufactured in Lahore.
          </p>
          <div className="mb-8 flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="px-7 py-4 text-[15px]">
              <Link href="/quiz">Take the 30-second skin quiz →</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-7 py-4 text-[15px]">
              <Link href="/products">Browse all protocols</Link>
            </Button>
          </div>
          <div className="flex flex-wrap justify-center gap-3 font-mono text-xs tracking-[0.04em] text-ink-mute">
            <span>Made in Lahore</span>
            <span aria-hidden="true">·</span>
            <span>COD across Pakistan</span>
          </div>
        </div>
      </section>

      {/* 4-PROTOCOL GRID */}
      <section className="bg-card py-22 sm:py-24">
        <SectionHead
          eyebrow="— 01 — The Protocols"
          heading="Pick the protocol matching your concern."
          lede="Each is a 12-week regimen — clinically dosed, fully sealed, dispatched from Lahore."
        />
        <div className="mx-auto grid max-w-[67.5rem] grid-cols-1 gap-5 px-6 md:grid-cols-2">
          {ordered.map((b) => (
            <Link
              key={b.id}
              href={PROTOCOL_ROUTES[b.slug] || '/'}
              className={cn(
                'flex flex-col rounded-2xl border border-rule bg-card p-8 text-inherit no-underline',
                'transition-[border-color,transform] duration-200',
                'hover:-translate-y-0.5 hover:border-navy',
              )}
            >
              <Eyebrow className="mb-3 text-cobalt">{CONCERN_LABELS[b.concern]}</Eyebrow>
              <h3 className="mb-3.5 font-display text-[26px] font-normal leading-[1.15] text-navy">
                {b.name}
              </h3>
              <p className="mb-6 flex-1 text-sm leading-snug text-ink-mute">
                {PROTOCOL_TAGLINES[b.slug]}
              </p>
              <div className="flex items-center justify-between border-t border-rule-soft pt-5">
                <span className="font-display text-xl text-navy">
                  Rs. {b.pricePkr.toLocaleString()}
                </span>
                <span className="text-[13px] font-semibold text-cobalt">Start the Protocol →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* INDIVIDUAL PRODUCTS */}
      <section className="mx-auto max-w-[75rem] px-6 py-24">
        <SectionHead
          eyebrow="— 02 — Or shop individual products"
          heading="Build your own routine, à la carte."
          lede="Each product in the catalogue is the same formulation sold in the protocols — identical batch, identical dose. Buy individually when you already know what your skin needs."
        />
        <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-[repeat(auto-fill,minmax(13.75rem,1fr))] sm:gap-[18px]">
          {orderedProducts.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="mt-9 text-center">
          <Link
            href="/products"
            className={cn(
              'inline-block rounded-md border border-navy bg-transparent px-6 py-3',
              'font-mono text-[13px] font-semibold tracking-[0.04em] text-navy no-underline',
              'transition-colors hover:bg-navy hover:text-white',
            )}
          >
            View the full catalogue →
          </Link>
        </div>
      </section>

      {/* BRAND-STORY PREVIEW */}
      <section className="bg-navy py-24 text-white">
        <div className="mx-auto grid max-w-[67.5rem] grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[6fr_5fr]">
          <div>
            <Eyebrow className="mb-3.5 text-cobalt-glow">— 03 — How we work</Eyebrow>
            <h2 className="mb-6 font-display font-normal leading-[1.15] text-white text-[clamp(32px,4vw,44px)]">
              No bottles before consultation.
            </h2>
            <p className="mb-[18px] text-base leading-[1.65] text-white/85">
              Clarté MD only ships clinical protocols — never single actives sold as cure-alls.
              Every regimen is formulated by our GMC-registered doctor at our Lahore clinic and
              dispatched with full ingredient transparency and dosed expectations.
            </p>
            <p className="mb-[18px] text-base leading-[1.65] text-white/85">
              You upload a selfie. The AI projects week 12. You choose the protocol. The
              courier knocks. You pay on delivery — and the 12-week clock starts.
            </p>
            <Link
              href="/about"
              className={cn(
                'mt-3 inline-block pb-0.5 text-sm font-semibold no-underline',
                'border-b border-cobalt-glow text-cobalt-glow',
                'transition-colors hover:border-white hover:text-white',
              )}
            >
              About the brand →
            </Link>
          </div>
          <div
            className={cn(
              'flex aspect-[4/5] items-center justify-center rounded-2xl lg:aspect-[4/5]',
              'aspect-[16/10] bg-gradient-to-br from-navy-2 to-[#2d3c5d]',
              'border border-white/5 font-mono text-xs text-[#6b7896]',
            )}
          >
            <span>[Doctor / lab portrait pending]</span>
          </div>
        </div>
      </section>

      {/* WHATSAPP / TRUST STRIP */}
      <section className="border-b border-rule bg-sky py-20">
        <div className="mx-auto grid max-w-[67.5rem] grid-cols-1 gap-9 px-6 md:grid-cols-3">
          <TrustCell title="12 weeks">
            Every protocol is dosed for 12 weeks. No half-bottles, no upsells.
          </TrustCell>
          <TrustCell title="COD">
            Pay the courier in cash when your parcel arrives. Damaged order? WhatsApp us within
            24 hours.
          </TrustCell>
          <TrustCell title="WhatsApp">
            A real person answers — usually within 2 hours during the day.{' '}
            <a
              href="https://wa.me/923249986822"
              target="_blank"
              rel="noopener"
              className="font-semibold text-cobalt no-underline hover:underline"
            >
              Message our team →
            </a>
          </TrustCell>
        </div>
      </section>
    </div>
  );
}

function TrustCell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-3xl font-normal leading-[1.1] text-navy">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-mute">{children}</p>
    </div>
  );
}
