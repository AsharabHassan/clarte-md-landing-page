import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { ACNE_PROTOCOL_BODY } from './protocol.html';
import AcneClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'clear-skin-protocol';
const ROUTE = '/acne';
const HERO_IMAGE = '/protocols/clear-skin-protocol/hero-gpt.webp';
const TITLE = 'Pimple & Acne Treatment — Clear Skin Protocol';
const DESCRIPTION =
  'A dermatologist-formulated 12-week pimple & acne treatment for active breakouts, blackheads, whiteheads, and post-acne marks & dark spots. Niacinamide 10%, azelaic acid, and 2% salicylic acid — clinically dosed, made in Lahore. COD across Pakistan.';

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
      hideEvidence
    />
  );
}
