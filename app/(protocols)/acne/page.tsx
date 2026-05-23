import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  bundleLd,
  faqPageLd,
  parseProtocolFaqs,
  SITE_URL,
} from '@/lib/schema/json-ld';
import './protocol.css';
import { ACNE_PROTOCOL_BODY } from './protocol.html';
import AcneClient from './client';
import { getProtocolPageData } from '@/lib/protocols/architecture';
import { ProtocolHero } from '@/components/protocol/ProtocolHero';
import { ProtocolEvidence } from '@/components/protocol/ProtocolEvidence';
import { ProtocolSteps } from '@/components/protocol/ProtocolSteps';
import { ProtocolSavings } from '@/components/protocol/ProtocolSavings';
import { ProtocolDivider } from '@/components/protocol/ProtocolDivider';

const BUNDLE_SLUG = 'clear-skin-protocol';
const ROUTE = '/acne';
const TITLE = 'Clear Skin Protocol — Active acne + post-acne marks';
const DESCRIPTION =
  'A 12-week clinical regimen for active breakouts and PIH. Niacinamide 10%, azelaic acid, and 2% salicylic — clinically dosed, dermatologist-formulated, manufactured in Lahore.';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}${ROUTE}` },
  openGraph: {
    title: `${TITLE} · Clarté MD`,
    description: DESCRIPTION,
    url: `${SITE_URL}${ROUTE}`,
    type: 'website',
  },
};

/*
 * Scoped CSS override that hides the legacy `<header class="topbar">`
 * and `<section class="hero">` that live INSIDE ACNE_PROTOCOL_BODY's
 * dangerouslySetInnerHTML. The new Tailwind layers (ProtocolHero,
 * ProtocolEvidence, ProtocolSteps, ProtocolSavings) above the legacy
 * body now own the top of the page; the legacy versions would create
 * a duplicate hero + double nav if left visible.
 *
 * Legacy `<nav class="nav">` is PRESERVED — it has the WhatsApp pill
 * and brand-home link that protocol pages depend on (no SiteHeader in
 * this route group).
 *
 * Reversal: delete this <style> block and the four `<Protocol*>` JSX
 * imports — the legacy hero returns and the page goes back to its
 * pre-Phase-4a shape with zero further changes needed.
 */
const LEGACY_OVERRIDES = `
  .protocol-page-redesigned header.topbar,
  .protocol-page-redesigned section.hero {
    display: none !important;
  }
`;

export default async function AcneProtocolPage() {
  const data = await getProtocolPageData(BUNDLE_SLUG);
  if (!data) notFound();
  const { bundle, outcome, steps, savings } = data;

  const faqs = parseProtocolFaqs(ACNE_PROTOCOL_BODY);

  return (
    <div className="protocol-page-redesigned">
      <style dangerouslySetInnerHTML={{ __html: LEGACY_OVERRIDES }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            bundleLd(bundle, { url: `${SITE_URL}${ROUTE}`, description: DESCRIPTION }),
          ),
        }}
      />
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(faqs)) }}
        />
      )}

      {/* ─── Layer 1: NEW magazine hero ──────────────────────── */}
      <ProtocolHero
        bundleSlug={bundle.slug}
        bundleName={bundle.name}
        bundlePricePkr={bundle.pricePkr}
        savedPkr={savings.saved}
        savedPct={savings.pct}
        outcomeEmphasized={outcome.emphasized}
        outcomeHeadline={outcome.headline}
        outcomeSub={outcome.sub}
        secondaryAnchor="ai-generator"
        secondaryLabel="Try the 12-week AI projection"
      />

      {/* ─── Layer 2: NEW placeholder evidence band ──────────── */}
      <ProtocolEvidence panelSize={30} weeks={12} />

      {/* ─── Layer 3: NEW numbered-step composition ──────────── */}
      <ProtocolSteps steps={steps} totalWeeks={12} />

      {/* ─── Layer 4: NEW explicit savings math ──────────────── */}
      <ProtocolSavings
        steps={steps}
        bundleName={bundle.name}
        bundlePricePkr={bundle.pricePkr}
        savedPkr={savings.saved}
        savedPct={savings.pct}
      />

      {/* ─── Layer 5: divider into the legacy deep-dive body ── */}
      <ProtocolDivider />

      {/* ─── Layer 6: legacy body PRESERVED (topbar + hero hidden) ── */}
      <div dangerouslySetInnerHTML={{ __html: ACNE_PROTOCOL_BODY }} />
      <AcneClient />
    </div>
  );
}
