import type { MetadataRoute } from 'next';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://lp.clartemd.com.pk';

// Sub-project #6 plan Task 31. Allow indexing of all destination pages;
// block funnel + admin + API surfaces so they don't compete with the
// canonical product/protocol pages in search.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/api/', '/cart', '/checkout', '/order'],
      },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
