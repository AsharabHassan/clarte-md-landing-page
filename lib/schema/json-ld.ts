/**
 * Schema.org JSON-LD builders for the Clarté MD storefront.
 *
 * All builders return plain JS objects ready for
 * `JSON.stringify(...)` inside a `<script type="application/ld+json">`
 * tag. Use the existing canonical SITE_URL fallback so production
 * picks up `lp.clartemd.com.pk` automatically.
 */

import type { Product as DbProduct, Bundle as DbBundle } from '@/lib/db/schema';

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://lp.clartemd.com.pk';

const BRAND_NAME = 'Clarté MD';
const BRAND_DESCRIPTION =
  'Dermatologist-led 12-week clinical regimens for acne, pigmentation, anti-ageing, and barrier repair. Formulated in Lahore by our GMC-registered doctor. COD across Pakistan.';
const WHATSAPP_E164 = '+923249986822';
const SUPPORT_EMAIL = 'hello@clartemd.com.pk';

/**
 * Site-wide Organization + LocalBusiness merged into a single
 * `@graph` document — Google reads both off one JSON-LD block.
 *
 * Anonymized — see [[feedback_anonymize_doctor]]. Doctor's individual
 * Person schema is intentionally omitted on public surfaces.
 */
export function organizationGraphLd() {
  const org = {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#organization`,
    name: BRAND_NAME,
    url: SITE_URL,
    description: BRAND_DESCRIPTION,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        telephone: WHATSAPP_E164,
        email: SUPPORT_EMAIL,
        availableLanguage: ['English', 'Urdu'],
        areaServed: 'PK',
      },
    ],
  };

  const localBusiness = {
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: BRAND_NAME,
    url: SITE_URL,
    image: `${SITE_URL}/opengraph-image`,
    telephone: WHATSAPP_E164,
    email: SUPPORT_EMAIL,
    priceRange: 'Rs. 4,000 – Rs. 8,000',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Lahore',
      addressRegion: 'Punjab',
      addressCountry: 'PK',
    },
    areaServed: {
      '@type': 'Country',
      name: 'Pakistan',
    },
  };

  return {
    '@context': 'https://schema.org',
    '@graph': [org, localBusiness],
  };
}

/**
 * Product JSON-LD for a /products/[sku] page. Accepts the DB Product
 * row plus a resolved absolute URL.
 */
export function productLd(p: DbProduct) {
  const url = `${SITE_URL}/products/${p.sku}`;
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.name,
    sku: p.sku,
    url,
    description: p.actives
      ? `${p.name} — ${p.actives}. Clinically dosed, dermatologist-formulated, manufactured in Lahore under ISO 22716 GMP.`
      : `${p.name} — clinically dosed, dermatologist-formulated, manufactured in Lahore under ISO 22716 GMP.`,
    image: p.imageUrl ? [p.imageUrl] : [`${SITE_URL}/opengraph-image`],
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'PKR',
      price: p.pricePkr,
      availability: p.active
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME,
      },
    },
  };
}

/**
 * Bundle (a protocol like /acne) modelled as a Product whose offer is
 * the bundle price. Each protocol page emits one of these.
 */
export function bundleLd(
  b: DbBundle,
  opts: { url: string; description: string; image?: string },
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: b.name,
    sku: b.slug,
    url: opts.url,
    description: opts.description,
    image: [opts.image ?? `${SITE_URL}/opengraph-image`],
    brand: {
      '@type': 'Brand',
      name: BRAND_NAME,
    },
    offers: {
      '@type': 'Offer',
      url: opts.url,
      priceCurrency: 'PKR',
      price: b.pricePkr,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: BRAND_NAME,
      },
    },
  };
}

export interface Faq {
  q: string;
  a: string;
}

/**
 * FAQPage JSON-LD. Pass `{ q, a }` pairs already stripped of HTML.
 */
export function faqPageLd(faqs: Faq[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };
}

/**
 * Extract `<details class="qa"><summary>Q</summary><p class="a">A</p></details>`
 * blocks from a protocol HTML string. Whitespace + inline tags inside
 * the answer are stripped to give clean text for FAQPage JSON-LD.
 *
 * This is a deliberately permissive regex — the protocol.html.ts
 * files are author-controlled, so we don't need an HTML parser. If a
 * protocol ever moves to a different FAQ markup, update this matcher.
 */
export function parseProtocolFaqs(html: string): Faq[] {
  const out: Faq[] = [];
  const blockRe =
    /<details[^>]*class="qa"[^>]*>\s*<summary[^>]*>([\s\S]*?)<\/summary>\s*<p[^>]*class="a"[^>]*>([\s\S]*?)<\/p>\s*<\/details>/g;
  let match: RegExpExecArray | null;
  while ((match = blockRe.exec(html)) !== null) {
    out.push({
      q: stripTags(match[1]),
      a: stripTags(match[2]),
    });
  }
  return out;
}

function stripTags(s: string): string {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}
