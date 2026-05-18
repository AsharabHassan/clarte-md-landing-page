import { eq } from 'drizzle-orm';
import type { MetadataRoute } from 'next';
import { db, schema } from '@/lib/db/client';

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://lp.clartemd.com.pk';

// Sub-project #6 plan Task 31. Lists every destination page Google
// should index — funnel pages (/cart, /checkout, /order, /admin, /api)
// are excluded both here and in robots.ts. Product list is pulled from
// the DB so new SKUs appear automatically without a code change.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();

  const products = await db
    .select({ sku: schema.products.sku })
    .from(schema.products)
    .where(eq(schema.products.active, true));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${SITE}/quiz`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE}/products`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE}/about`, lastModified, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ];

  const protocols: MetadataRoute.Sitemap = (
    ['acne', 'even-tone', 'renewal', 'barrier'] as const
  ).map((slug) => ({
    url: `${SITE}/${slug}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  const legal: MetadataRoute.Sitemap = (
    ['privacy', 'terms', 'returns', 'shipping'] as const
  ).map((slug) => ({
    url: `${SITE}/legal/${slug}`,
    lastModified,
    changeFrequency: 'yearly',
    priority: 0.3,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE}/products/${p.sku}`,
    lastModified,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...protocols, ...legal, ...productPages];
}
