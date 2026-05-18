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
import { RENEWAL_PROTOCOL_BODY } from './protocol.html';
import RenewalClient from './client';

const BUNDLE_SLUG = 'renewal-protocol';
const ROUTE = '/renewal';
const TITLE = 'Renewal Protocol — Anti-ageing + fine lines';
const DESCRIPTION =
  'A 12-week clinical regimen for fine lines, dullness, and loss of firmness. Encapsulated retinol, peptides, and vitamin C — clinically dosed, dermatologist-formulated, manufactured in Lahore under ISO 22716 GMP.';

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

export default async function RenewalProtocolPage() {
  const [bundle] = await db
    .select()
    .from(schema.bundles)
    .where(eq(schema.bundles.slug, BUNDLE_SLUG))
    .limit(1);
  const faqs = parseProtocolFaqs(RENEWAL_PROTOCOL_BODY);

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
      <div dangerouslySetInnerHTML={{ __html: RENEWAL_PROTOCOL_BODY }} />
      <RenewalClient />
    </>
  );
}
