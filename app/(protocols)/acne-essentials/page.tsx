import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { ACNE_ESSENTIALS_PROTOCOL_BODY } from './protocol.html';
import AcneEssentialsClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'acne-essentials-protocol';
const ROUTE = '/acne-essentials';
const HERO_IMAGE = '/protocols/acne-essentials-protocol/hero.webp';
const TITLE = 'Acne Essentials Protocol — Core acne treatment';
const DESCRIPTION =
  'The essential clinical regimen for active acne. Clinically dosed actives, dermatologist-formulated, manufactured in Lahore.';

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

export default function AcneEssentialsProtocolPage() {
  return (
    <ProtocolPageShell
      bundleSlug={BUNDLE_SLUG}
      route={ROUTE}
      description={DESCRIPTION}
      heroImageSrc={HERO_IMAGE}
      legacyBody={ACNE_ESSENTIALS_PROTOCOL_BODY}
      legacyClient={<AcneEssentialsClient />}
    />
  );
}
