import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import {
  bundleLd,
  faqPageLd,
  parseProtocolFaqs,
  SITE_URL,
} from '@/lib/schema/json-ld';
import { getProtocolPageData } from '@/lib/protocols/architecture';
import { ProtocolHero } from './ProtocolHero';
import { ProtocolEvidence } from './ProtocolEvidence';
import { ProtocolSteps } from './ProtocolSteps';
import { ProtocolSavings } from './ProtocolSavings';
import { ProtocolDivider } from './ProtocolDivider';

/*
 * Scoped CSS overrides shared across all four protocol pages. Hides
 * the legacy site-chrome that lives INSIDE each protocol's
 * dangerouslySetInnerHTML body, now that SiteHeader + SiteFooter mount
 * via (protocols)/layout.tsx.
 *
 * Hidden:
 *   .topbar           — legacy "Vol. I · Case Study 00X" decorative strip
 *   nav.nav           — legacy nav with WhatsApp pill + brand link
 *   section.hero      — legacy hero (ProtocolHero owns this slot)
 *   top-level footer  — legacy site footer
 *   aside.sticky-cta  — legacy mobile sticky add-to-cart bar
 *
 * Preserved (these are CARD chrome inside review/before-after blocks):
 *   footer.review-meta
 *   footer.ba-meta
 *
 * Selectors use `.legacy-body >` to target only direct children of the
 * dangerouslySetInnerHTML wrapper, so card-level footers deeper in the
 * tree are untouched.
 *
 * Reversal: delete this constant and the <style> below — legacy chrome
 * returns unchanged, no further edits needed.
 */
const LEGACY_OVERRIDES = `
  .protocol-page-redesigned .legacy-body > header.topbar,
  .protocol-page-redesigned .legacy-body > nav.nav,
  .protocol-page-redesigned .legacy-body > section.hero,
  .protocol-page-redesigned .legacy-body > footer,
  .protocol-page-redesigned .legacy-body > aside.sticky-cta {
    display: none !important;
  }
`;

export interface ProtocolPageShellProps {
  /** The bundle's DB slug (e.g. 'clear-skin-protocol'). */
  bundleSlug: string;
  /** Public route path (e.g. '/acne') — used for canonical / JSON-LD URLs. */
  route: string;
  /** Description string used in the bundle JSON-LD. */
  description: string;
  /** The raw legacy HTML body to render inline. */
  legacyBody: string;
  /** The legacy client component element (e.g. <AcneClient />) — hydrates the body. */
  legacyClient: ReactNode;
  /** Anchor target inside the legacy body for the hero's secondary CTA. */
  secondaryAnchor?: string;
  secondaryLabel?: string;
}

/**
 * Composes all six layers of the Phase 4 protocol architecture and
 * renders them around the preserved legacy body. Returns 404 if the
 * bundle slug doesn't exist.
 *
 * Each protocol page (app/(protocols)/<slug>/page.tsx) becomes a thin
 * wrapper around this shell — declaring metadata, choosing the slug,
 * and handing off the legacy body + client.
 *
 * Server Component (no 'use client') — ProtocolHero is the only client
 * piece downstream, and it self-marks.
 */
export async function ProtocolPageShell({
  bundleSlug,
  route,
  description,
  legacyBody,
  legacyClient,
  secondaryAnchor = 'ai-generator',
  secondaryLabel = 'Try the 12-week AI projection',
}: ProtocolPageShellProps) {
  const data = await getProtocolPageData(bundleSlug);
  if (!data) notFound();
  const { bundle, outcome, steps, savings } = data;

  const faqs = parseProtocolFaqs(legacyBody);

  return (
    <div className="protocol-page-redesigned">
      <style dangerouslySetInnerHTML={{ __html: LEGACY_OVERRIDES }} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            bundleLd(bundle, { url: `${SITE_URL}${route}`, description }),
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
        secondaryAnchor={secondaryAnchor}
        secondaryLabel={secondaryLabel}
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

      {/* ─── Layer 6: legacy body (site-chrome hidden via .legacy-body) ── */}
      <div className="legacy-body" dangerouslySetInnerHTML={{ __html: legacyBody }} />
      {legacyClient}
    </div>
  );
}
