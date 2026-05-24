import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { ACNE_PROTOCOL_BODY } from './protocol.html';
import AcneClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'clear-skin-protocol';
const ROUTE = '/acne';
const HERO_IMAGE = '/protocols/clear-skin-protocol/hero-gpt.webp';
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

export default function AcneProtocolPage() {
  return (
    <ProtocolPageShell
      bundleSlug={BUNDLE_SLUG}
      route={ROUTE}
      description={DESCRIPTION}
      heroImageSrc={HERO_IMAGE}
      legacyBody={ACNE_PROTOCOL_BODY}
      legacyClient={<AcneClient />}
    />
  );
}
