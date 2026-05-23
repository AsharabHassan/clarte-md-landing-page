/* eslint-disable react/no-unescaped-entities */
import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_URL } from '@/lib/schema/json-ld';
import { Eyebrow } from '@/components/ui/eyebrow';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const TITLE = 'About — Dermatologist-led skincare from Lahore';
const DESCRIPTION =
  'How Clarté MD works — a GMC-registered doctor formulating clinical protocols at our Lahore lab. Honest expectations, fully sealed packaging, COD across Pakistan.';

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

// Reusable container — the inner max-width pattern shared across About
// sections. 1080px reads as a "brand-story" width, narrower than the
// 1312px site chrome max.
const sectionInner = 'mx-auto max-w-[67.5rem] px-6';

// Placeholder photo treatment used in two spots (doctor portrait + lab
// shot). Stays as a labelled empty frame until the operator supplies
// real photography (spec §15).
function PhotoPlaceholder({
  label,
  aspect,
  variant = 'navy',
  className,
}: {
  label: string;
  aspect: 'portrait' | 'landscape';
  variant?: 'navy' | 'sky';
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-2xl',
        aspect === 'portrait' ? 'aspect-[4/5]' : 'aspect-[4/3]',
        variant === 'navy' &&
          'bg-gradient-to-br from-navy-2 to-[#2d3c5d] text-[#6b7896] border border-white/5',
        variant === 'sky' && 'bg-gradient-to-br from-sky to-sky-2 text-ink-faint border border-rule',
        className,
      )}
    >
      <span className="font-mono text-xs">{label}</span>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div>
      {/* HERO */}
      <section className="border-b border-rule bg-gradient-to-b from-sky to-card pt-[88px] pb-20">
        <div className={cn(sectionInner, 'max-w-[51.25rem] text-center')}>
          <Eyebrow className="mb-[18px] text-cobalt">— How we work —</Eyebrow>
          <h1 className="mb-7 font-display font-light text-navy text-[clamp(36px,5vw,56px)] leading-[1.1] tracking-[-0.02em]">
            We don't sell single bottles.
            <br />
            <em className="italic text-cobalt">We dispatch protocols.</em>
          </h1>
          <p className="text-[17px] leading-relaxed text-ink-2">
            Clarté MD ships 12-week clinical regimens formulated by our GMC-registered doctor —
            never an active sold in isolation, never a routine the patient builds without
            guidance. Manufactured in Lahore.
          </p>
        </div>
      </section>

      {/* DOCTOR BLOCK */}
      <section className="bg-navy py-24 text-white">
        <div
          className={cn(sectionInner, 'grid grid-cols-1 items-center gap-16 lg:grid-cols-[2fr_3fr]')}
        >
          <PhotoPlaceholder label="[Doctor portrait pending]" aspect="portrait" variant="navy" />
          <div>
            <Eyebrow className="mb-3.5 text-cobalt-glow">The prescribing doctor</Eyebrow>
            <h2 className="mb-5 font-display text-4xl font-normal leading-[1.15] text-white">
              Our GMC-registered doctor.
            </h2>
            <p className="mb-4 text-base leading-[1.65] text-white/85">
              MBBS · GMC-Registered Dermatologist · London &amp; Lahore. Every Clarté MD protocol
              is reviewed and signed off by the same clinician — not assembled by a marketing
              team, not "formulated by experts" with no name behind it.
            </p>
            <p className="mb-4 text-base leading-[1.65] text-white/85">
              The doctor's clinical practice runs in both cities. Protocols are designed for
              Pakistani skin types, climate, and the medications patients are already taking.
            </p>
            <dl className="mt-7 grid grid-cols-1 gap-[18px] border-t border-white/10 pt-6 sm:grid-cols-3">
              {[
                ['MBBS', 'Medical degree'],
                ['GMC-Registered', 'General Medical Council, UK'],
                ['Dermatologist', 'London & Lahore'],
              ].map(([title, sub]) => (
                <div key={title} className="flex flex-col">
                  <dt className="font-display text-base font-medium text-white">{title}</dt>
                  <dd className="mt-0.5 font-mono text-xs tracking-[0.03em] text-white/55">
                    {sub}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section className="bg-card py-24">
        <div className={sectionInner}>
          <Eyebrow className="mb-3.5 block text-center text-cobalt">— What we believe —</Eyebrow>
          <h2 className="mb-14 text-center font-display font-normal text-navy text-[clamp(28px,4vw,38px)] leading-[1.2]">
            Honest dermatology means honest expectations.
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
            <PhilosophyPillar
              title="Clinically dosed actives"
              body="Niacinamide at 10%, not 2%. Vitamin C at 15%. Retinol at 0.3-0.5%. Doses that actually do clinical work, not the homeopathic concentrations most local brands ship."
            />
            <PhilosophyPillar
              title="One protocol, twelve weeks"
              body="Skin biology runs on weeks, not days. Every protocol is dosed for 12 weeks of consistent use — no half-bottles, no top-up upsells, no Instagram quick-fixes."
            />
            <PhilosophyPillar
              title="Sealed packaging, COD payment"
              body="Every parcel ships sealed and labeled. Pay the courier in cash when it arrives. If your order arrives damaged or incorrect, WhatsApp us within 24 hours and we'll arrange a refund or re-ship."
            />
            <PhilosophyPillar
              title="WhatsApp consult, free"
              body="A real person — our team — answers within 2 hours during business hours. Ask about your skin, your routine, side effects, anything. No bot."
            />
          </div>
        </div>
      </section>

      {/* MANUFACTURING */}
      <section className="bg-sky py-24">
        <div
          className={cn(sectionInner, 'grid grid-cols-1 items-center gap-14 lg:grid-cols-[3fr_2fr]')}
        >
          <div>
            <Eyebrow className="mb-3.5 text-cobalt">— Where we make it —</Eyebrow>
            <h2 className="mb-5 font-display font-normal text-navy text-[clamp(28px,4vw,38px)]">
              Made in Lahore.
            </h2>
            <p className="mb-4 text-base leading-[1.65] text-ink-2">
              All Clarté MD products are manufactured at our Lahore facility. Every batch is
              tested before release. Stability data on file. Active concentrations verified by
              independent assay.
            </p>
            <p className="mb-4 text-base leading-[1.65] text-ink-2">
              Ingredient sourcing prioritises pharma-grade actives from European and Korean
              suppliers. We publish the actives and their concentrations on every product label —
              no proprietary-complex obfuscation.
            </p>
            <ul className="mt-6 list-none p-0">
              {[
                'Batch-tested, stability-validated',
                'Active concentrations independently assayed',
                'Full ingredient transparency on labels',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-rule py-2 font-mono text-sm text-ink"
                >
                  <span aria-hidden="true" className="font-bold text-cobalt">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <PhotoPlaceholder
            label="[Lab / manufacturing photo pending]"
            aspect="landscape"
            variant="sky"
          />
        </div>
      </section>

      {/* CTA TO PROTOCOLS */}
      <section className="border-t border-rule bg-card pt-20 pb-[100px] text-center">
        <div className={cn(sectionInner, 'max-w-[42.5rem]')}>
          <h2 className="mb-3 font-display font-normal text-navy text-[clamp(32px,4vw,42px)]">
            Find your protocol.
          </h2>
          <p className="mb-7 text-base text-ink-mute">
            30 seconds. Upload a selfie, get a recommendation.
          </p>
          <div className="flex flex-wrap justify-center gap-3.5">
            <Button asChild size="lg">
              <Link href="/quiz">Take the skin quiz →</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/products">Browse all 4 protocols</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

function PhilosophyPillar({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <h3 className="mb-3 font-display text-xl font-medium text-navy">{title}</h3>
      <p className="text-[15px] leading-relaxed text-ink-mute">{body}</p>
    </div>
  );
}
