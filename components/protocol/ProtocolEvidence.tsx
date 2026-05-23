import { Eyebrow } from '@/components/ui/eyebrow';

/**
 * Layer 2 of the new protocol-page architecture — placeholder evidence
 * band. Same stat-skeleton composition as the homepage trust-receipt
 * band (Phase 3a.2). Renders three "—" placeholders in italic Fraunces
 * with a methodology line in mono.
 *
 * Why a placeholder: per feedback_unverified_claims, Clarté never
 * invents percentages. The n=30 panel completes 2026-Q3 — until then
 * the visual structure is reserved, the values stay at "—", and the
 * methodology line declares what we WILL measure (legally clean
 * promise, not a backed claim).
 *
 * When real data arrives, swap to <ClinicalProof variant="data" .../>
 * — same visual footprint, real numbers in place of dashes.
 */
export function ProtocolEvidence({
  panelSize = 30,
  weeks = 12,
}: {
  panelSize?: number;
  weeks?: number;
}) {
  return (
    <section className="border-b border-sand/40 bg-canvas py-16 md:py-20">
      <div className="mx-auto max-w-[75rem] px-6">
        <header className="mb-10 flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
          <Eyebrow className="text-cobalt">— The evidence</Eyebrow>
          <span className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-ink-faint">
            {weeks}-week clinic panel · n={panelSize} · publishing 2026 Q3
          </span>
        </header>

        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3 md:gap-12">
          <PendingStat label="Visible improvement reported at week 8" />
          <PendingStat label="Would recommend the protocol to a friend" />
          <PendingStat label="Routine still active at week 12" />
        </dl>

        <p className="mt-10 max-w-[40rem] font-display italic text-[clamp(15px,1.4vw,18px)] leading-relaxed text-ink-2">
          Honest dermatology. Honest expectations. No borrowed percentages, no invented
          claims — the first real numbers publish after this protocol&apos;s panel completes.
        </p>
      </div>
    </section>
  );
}

function PendingStat({ label }: { label: string }) {
  return (
    <div className="border-l border-sand/60 pl-5">
      <span
        aria-hidden="true"
        className="block font-display font-light italic text-[clamp(40px,5.5vw,64px)] leading-none text-navy/25"
      >
        —
      </span>
      <p className="mt-3 font-body text-[14px] leading-snug text-ink-mute">{label}</p>
    </div>
  );
}
