import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { EVEN_TONE_PROTOCOL_BODY } from './protocol.html';
import EvenToneClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'even-tone-protocol';
const ROUTE = '/even-tone';
const TITLE = 'Even Tone Protocol — Pigmentation + melasma';
const DESCRIPTION =
  'A 12-week clinical regimen for hyperpigmentation and melasma. Tranexamic acid, alpha arbutin, and broad-spectrum SPF — clinically dosed, dermatologist-formulated, manufactured in Lahore.';

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

export default function EvenToneProtocolPage() {
  return (
    <ProtocolPageShell
      bundleSlug={BUNDLE_SLUG}
      route={ROUTE}
      description={DESCRIPTION}
      legacyBody={EVEN_TONE_PROTOCOL_BODY}
      legacyClient={<EvenToneClient />}
    />
  );
}
