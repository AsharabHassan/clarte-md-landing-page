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
import { EVEN_TONE_PROTOCOL_BODY } from './protocol.html';
import EvenToneClient from './client';

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

export default async function EvenToneProtocolPage() {
  const [bundle] = await db
    .select()
    .from(schema.bundles)
    .where(eq(schema.bundles.slug, BUNDLE_SLUG))
    .limit(1);
  const faqs = parseProtocolFaqs(EVEN_TONE_PROTOCOL_BODY);

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
      <div dangerouslySetInnerHTML={{ __html: EVEN_TONE_PROTOCOL_BODY }} />
      <EvenToneClient />
    </>
  );
}
