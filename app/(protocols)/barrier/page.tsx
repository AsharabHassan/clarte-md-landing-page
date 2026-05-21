import type { Metadata } from 'next';
import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import {
  bundleLd,
  faqPageLd,
  parseProtocolFaqs,
  SITE_URL,
} from '@/lib/schema/json-ld';
import './protocol.css';
import { BARRIER_PROTOCOL_BODY } from './protocol.html';
import BarrierClient from './client';

const BUNDLE_SLUG = 'barrier-protocol';
const ROUTE = '/barrier';
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

export default async function BarrierProtocolPage() {
  const [bundle] = await db
    .select()
    .from(schema.bundles)
    .where(eq(schema.bundles.slug, BUNDLE_SLUG))
    .limit(1);
  const faqs = parseProtocolFaqs(BARRIER_PROTOCOL_BODY);

  return (
    <>
      {bundle && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              bundleLd(bundle, {
                url: `${SITE_URL}${ROUTE}`,
                description: DESCRIPTION,
              }),
            ),
          }}
        />
      )}
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageLd(faqs)) }}
        />
      )}
      <div dangerouslySetInnerHTML={{ __html: BARRIER_PROTOCOL_BODY }} />
      <BarrierClient />
    </>
  );
}
