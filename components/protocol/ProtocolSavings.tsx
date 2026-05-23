import { Eyebrow } from '@/components/ui/eyebrow';
import type { ProtocolStep } from '@/lib/protocols/architecture';

/**
 * Layer 4 of the new protocol-page architecture — explicit rupee
 * savings math. Of the 15 reference brands surveyed in the
 * bundle-pages research, none surface this cleanly:
 *   - EltaMD never shows the sum of individual product prices
 *   - SkinCeuticals shows it as a "Worth $X" value statement, no
 *     subtraction
 *   - LRP shows the dollar saving but not the per-item math
 *   - Drunk Elephant publishes the discount % but not the calculation
 *
 * For a COD audience deciding whether to accept a courier parcel at the
 * door, the explicit math ("Buy separately: Rs. 8,750 / Protocol price:
 * Rs. 6,499 / You save: Rs. 2,251") is the highest-conversion pricing
 * element we can ship. This is Clarté's distinctive move.
 *
 * Server component — pure rendering from already-computed totals.
 */
export function ProtocolSavings({
  steps,
  bundleName,
  bundlePricePkr,
  savedPkr,
  savedPct,
}: {
  steps: ProtocolStep[];
  bundleName: string;
  bundlePricePkr: number;
  savedPkr: number;
  savedPct: number;
}) {
  const listSum = steps.reduce(
    (s, step) => s + (step.product.listPricePkr ?? step.product.pricePkr),
    0,
  );

  return (
    <section className="border-y border-sand/40 bg-canvas-soft py-20 md:py-24">
      <div className="mx-auto max-w-[75rem] px-6">
        <header className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-[36rem]">
            <Eyebrow className="mb-4 text-cobalt">— The arithmetic</Eyebrow>
            <h2 className="font-display font-light text-navy text-[clamp(28px,4vw,40px)] leading-[1.1] tracking-[-0.02em]">
              What the protocol saves you, in rupees.
            </h2>
          </div>
          {savedPct > 0 && (
            <div className="font-display text-cobalt text-[clamp(48px,7vw,72px)] font-light italic leading-none">
              {savedPct}% <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-ink-faint">off</span>
            </div>
          )}
        </header>

        <div className="overflow-hidden rounded-2xl border border-sand/60 bg-card">
          <table className="w-full text-left">
            <thead className="bg-canvas-warm/40">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute"
                >
                  Item
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-right font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute"
                >
                  List price
                </th>
              </tr>
            </thead>
            <tbody>
              {steps.map((step) => (
                <tr
                  key={step.product.sku}
                  className="border-t border-sand/30 align-baseline"
                >
                  <td className="px-6 py-3.5">
                    <div className="font-display italic text-[15px] text-navy">
                      {step.product.name}
                    </div>
                    {step.product.actives && (
                      <div className="mt-0.5 font-mono text-[10.5px] uppercase tracking-[0.08em] text-ink-faint">
                        {step.product.actives}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-3.5 text-right">
                    <span className="font-mono tabular-nums text-[14px] text-ink-2">
                      Rs.{' '}
                      {(step.product.listPricePkr ?? step.product.pricePkr).toLocaleString(
                        'en-PK',
                      )}
                    </span>
                  </td>
                </tr>
              ))}

              <tr className="border-t border-sand/60 bg-canvas-soft/60">
                <td className="px-6 py-4 font-mono text-[10.5px] uppercase tracking-[0.18em] text-ink-mute">
                  Buy separately
                </td>
                <td className="px-6 py-4 text-right font-mono tabular-nums text-[15px] text-ink-2">
                  Rs. {listSum.toLocaleString('en-PK')}
                </td>
              </tr>

              <tr className="border-t border-sand/40">
                <td className="px-6 py-4">
                  <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt">
                    {bundleName} price
                  </div>
                  <div className="mt-1 font-mono text-[10.5px] tracking-[0.05em] text-ink-faint">
                    What you pay
                  </div>
                </td>
                <td className="px-6 py-4 text-right font-display text-[clamp(22px,3vw,28px)] font-light text-navy tabular-nums">
                  Rs. {bundlePricePkr.toLocaleString('en-PK')}
                </td>
              </tr>

              {savedPkr > 0 && (
                <tr className="border-t border-cobalt/30 bg-cobalt/5">
                  <td className="px-6 py-5">
                    <div className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-cobalt">
                      You save
                    </div>
                    <div className="mt-1 font-mono text-[10.5px] tracking-[0.05em] text-ink-faint">
                      vs. buying individually
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <span className="font-display text-[clamp(22px,3vw,28px)] font-light italic text-cobalt tabular-nums">
                      − Rs. {savedPkr.toLocaleString('en-PK')}
                    </span>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <p className="mt-6 max-w-[44rem] font-display italic text-[15px] leading-relaxed text-ink-mute">
          Cash on delivery across Pakistan · flat Rs. 250 shipping · no advance payment.
        </p>
      </div>
    </section>
  );
}
