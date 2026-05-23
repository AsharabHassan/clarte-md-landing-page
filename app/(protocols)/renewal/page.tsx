import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { RENEWAL_PROTOCOL_BODY } from './protocol.html';
import RenewalClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'renewal-protocol';
const ROUTE = '/renewal';
const TITLE = 'Renewal Protocol — Anti-ageing + fine lines';
const DESCRIPTION =
  'A 12-week clinical regimen for fine lines, dullness, and loss of firmness. Encapsulated retinol, peptides, and vitamin C — clinically dosed, dermatologist-formulated, manufactured in Lahore.';

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

export default function RenewalProtocolPage() {
  return (
    <ProtocolPageShell
      bundleSlug={BUNDLE_SLUG}
      route={ROUTE}
      description={DESCRIPTION}
      legacyBody={RENEWAL_PROTOCOL_BODY}
      legacyClient={<RenewalClient />}
    />
  );
}
