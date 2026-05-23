import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Eyebrow } from '@/components/ui/eyebrow';
import type { ProtocolStep } from '@/lib/protocols/architecture';
import { cn } from '@/lib/utils';

/**
 * Layer 3 of the new protocol-page architecture — numbered-step
 * composition. COSRX Glass Skin Routine pattern (most directly
 * adoptable from the bundle-pages research): each product in the
 * regimen becomes a card with a step number, functional stage
 * eyebrow ("STEP 02 · TREAT"), italic Fraunces product name, a
 * one-line role description, the price, and a link to the SKU's PDP.
 *
 * Server component — pure rendering, no client state. Reads ProtocolStep
 * objects assembled in lib/protocols/architecture.ts.
 */
export function ProtocolSteps({
  steps,
  totalWeeks = 12,
}: {
  steps: ProtocolStep[];
  totalWeeks?: number;
}) {
  return (
    <section className="bg-canvas py-24 md:py-32">
      <div className="mx-auto max-w-[75rem] px-6">
        <header className="mb-14 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end md:mb-20">
          <div className="max-w-[40rem]">
            <Eyebrow className="mb-4 text-cobalt">— The protocol</Eyebrow>
            <h2 className="mb-4 font-display font-light text-navy text-[clamp(32px,5vw,52px)] leading-[1.05] tracking-[-0.02em]">
              {numberWord(steps.length)} steps. {totalWeeks} weeks. One regimen.
            </h2>
            <p className="font-display italic text-[clamp(16px,1.6vw,20px)] text-ink-mute leading-relaxed">
              Each step is clinically dosed and sequenced — the order matters as much as the
              active.
            </p>
          </div>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
            Step 01 / {steps.length.toString().padStart(2, '0')}
          </span>
        </header>

        <ol className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(16rem,1fr))]">
          {steps.map((step) => (
            <StepCard key={step.product.sku} step={step} />
          ))}
        </ol>
      </div>
    </section>
  );
}

function StepCard({ step }: { step: ProtocolStep }) {
  return (
    <li className="relative">
      <Link
        href={`/products/${step.product.sku}`}
        className={cn(
          'group flex h-full flex-col overflow-hidden rounded-2xl border border-sand/40 bg-card',
          'no-underline text-inherit transition-[border-color,transform] duration-200',
          'hover:-translate-y-0.5 hover:border-navy/30',
        )}
      >
        <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-canvas-soft">
          {step.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={step.image}
              alt={step.product.name}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="font-mono text-[11px] text-ink-faint">[Photo pending]</span>
          )}
          <span
            aria-hidden="true"
            className={cn(
              'absolute left-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full',
              'bg-navy text-white font-mono text-[12px] font-semibold',
            )}
          >
            {step.num.toString().padStart(2, '0')}
          </span>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-6">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-cobalt">
            Step {step.num.toString().padStart(2, '0')} · {step.stage}
          </span>

          <h3 className="font-display text-[clamp(20px,2.2vw,24px)] font-light italic leading-tight text-navy">
            {step.product.name}
          </h3>

          {step.purpose && (
            <p className="flex-1 font-body text-[14px] leading-relaxed text-ink-mute">
              {step.purpose}
            </p>
          )}

          <div className="mt-2 flex items-baseline justify-between border-t border-sand/40 pt-4">
            <span className="font-display text-base text-navy">
              Rs. {step.product.pricePkr.toLocaleString('en-PK')}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt transition-transform group-hover:translate-x-1">
              View product
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

const NUMBER_WORDS: Record<number, string> = {
  2: 'Two',
  3: 'Three',
  4: 'Four',
  5: 'Five',
  6: 'Six',
};

function numberWord(n: number): string {
  return NUMBER_WORDS[n] ?? `${n}`;
}
