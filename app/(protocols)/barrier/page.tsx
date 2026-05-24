import type { Metadata } from 'next';
import { SITE_URL } from '@/lib/schema/json-ld';
import './protocol.css';
import { BARRIER_PROTOCOL_BODY } from './protocol.html';
import BarrierClient from './client';
import { ProtocolPageShell } from '@/components/protocol/ProtocolPageShell';

const BUNDLE_SLUG = 'barrier-protocol';
const ROUTE = '/barrier';
const HERO_IMAGE = '/protocols/barrier-protocol/hero-gpt.webp';
const TITLE = 'Barrier Protocol — Sensitivity + hydration';
const DESCRIPTION =
  'A gentle clinical regimen for compromised, sensitive, or dehydrated skin. Ceramide-rich cleanser, panthenol serum, and barrier-repair moisturiser — clinically dosed, dermatologist-formulated, manufactured in Lahore.';

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

export default function BarrierProtocolPage() {
  return (
    <ProtocolPageShell
      bundleSlug={BUNDLE_SLUG}
      route={ROUTE}
      description={DESCRIPTION}
      heroImageSrc={HERO_IMAGE}
      legacyBody={BARRIER_PROTOCOL_BODY}
      legacyClient={<BarrierClient />}
    />
  );
}
