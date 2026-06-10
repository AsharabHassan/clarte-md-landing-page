import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { ACNE_GLOW_PROTOCOL_BODY } from './protocol.html';
import AcneGlowClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'acne-glow-protocol';
const ROUTE = '/acne-glow';
const HERO_IMAGE = '/protocols/acne-glow-protocol/hero.webp';
const TITLE = 'Acne Glow Protocol — Active acne + radiance';
const DESCRIPTION =
  'A twelve-week clinical regimen that clears active acne while building luminosity. Clinically dosed actives, dermatologist-formulated, manufactured in Lahore.';

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

export default function AcneGlowProtocolPage() {
  return (
    <ProtocolPageShell
      bundleSlug={BUNDLE_SLUG}
      route={ROUTE}
      description={DESCRIPTION}
      heroImageSrc={HERO_IMAGE}
      legacyBody={ACNE_GLOW_PROTOCOL_BODY}
      legacyClient={<AcneGlowClient />}
    />
  );
}
