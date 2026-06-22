import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { EVEN_TONE_PROTOCOL_BODY } from './protocol.html';
import EvenToneClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'even-tone-protocol';
const ROUTE = '/even-tone';
const HERO_IMAGE = '/protocols/even-tone-protocol/hero-gpt.webp';
const TITLE = 'Pigmentation & Melasma Treatment — Even Tone Protocol';
const DESCRIPTION =
  'A dermatologist-formulated 12-week treatment for pigmentation, melasma, dark spots & uneven skin tone. Tranexamic acid, alpha arbutin, kojic acid + broad-spectrum SPF 50 — clinically dosed, made in Lahore. COD across Pakistan.';

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
      heroImageSrc={HERO_IMAGE}
      legacyBody={EVEN_TONE_PROTOCOL_BODY}
      legacyClient={<EvenToneClient />}
      hideEvidence
    />
  );
}
