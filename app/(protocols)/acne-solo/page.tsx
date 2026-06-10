import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { ACNE_SOLO_PROTOCOL_BODY } from './protocol.html';
import AcneSoloClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'acne-solo-protocol';
const ROUTE = '/acne-solo';
const HERO_IMAGE = '/protocols/acne-solo-protocol/hero.webp';
const TITLE = 'Acne Solo Protocol — Single active acne treatment';
const DESCRIPTION =
  'A focused single-active clinical protocol for acne. Clinically dosed, dermatologist-formulated, manufactured in Lahore.';

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

export default function AcneSoloProtocolPage() {
  return (
    <ProtocolPageShell
      bundleSlug={BUNDLE_SLUG}
      route={ROUTE}
      description={DESCRIPTION}
      heroImageSrc={HERO_IMAGE}
      legacyBody={ACNE_SOLO_PROTOCOL_BODY}
      legacyClient={<AcneSoloClient />}
    />
  );
}
