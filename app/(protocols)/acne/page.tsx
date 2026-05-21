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
import { ACNE_PROTOCOL_BODY } from './protocol.html';
import AcneClient from './client';

const BUNDLE_SLUG = 'clear-skin-protocol';
const ROUTE = '/acne';
const TITLE = 'Clear Skin Protocol — Active acne + post-acne marks';
const DESCRIPTION =
  'A 12-week clinical regimen for active breakouts and PIH. Niacinamide 10%, azelaic acid, and 2% salicylic — clinically dosed, dermatologist-formulated, manufactured in Lahore.';

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

export default async function AcneProtocolPage() {
  const [bundle] = await db
    .select()
    .from(schema.bundles)
    .where(eq(schema.bundles.slug, BUNDLE_SLUG))
    .limit(1);
  const faqs = parseProtocolFaqs(ACNE_PROTOCOL_BODY);

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
      <div dangerouslySetInnerHTML={{ __html: ACNE_PROTOCOL_BODY }} />
      <AcneClient />
    </>
  );
}
