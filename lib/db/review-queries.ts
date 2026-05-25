import { and, desc, eq, inArray, sql } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';
import type { Review } from '@/lib/marketing/reviews';
import type { ReviewRow } from '@/lib/db/schema';

/** Map a DB review row to the storefront `Review` shape (date as ISO string). */
export function toReview(r: ReviewRow): Review {
  return {
    id: r.id,
    name: r.name,
    location: r.location ?? '',
    rating: r.rating,
    protocol: r.protocol ?? undefined,
    date: r.reviewDate.toISOString(),
    verified: r.verified,
    body: r.body,
    photos: r.photos ?? undefined,
  };
}

/** All approved reviews, newest first. */
export async function getApprovedReviews(): Promise<Review[]> {
  const rows = await db
    .select()
    .from(schema.reviews)
    .where(eq(schema.reviews.status, 'approved'))
    .orderBy(desc(schema.reviews.reviewDate));
  return rows.map(toReview);
}

/** Random mix of approved reviews — homepage social proof. */
export async function getRandomReviews(limit = 9): Promise<Review[]> {
  const rows = await db
    .select()
    .from(schema.reviews)
    .where(eq(schema.reviews.status, 'approved'))
    .orderBy(sql`random()`)
    .limit(limit);
  return rows.map(toReview);
}

/** Admin: reviews filtered by status (or all), newest first. */
export async function getReviewsByStatus(status?: string): Promise<ReviewRow[]> {
  const base = db.select().from(schema.reviews);
  const where = status ? and(eq(schema.reviews.status, status)) : undefined;
  return (where ? base.where(where) : base).orderBy(desc(schema.reviews.reviewDate));
}

/** Result for a subject page: the list to render + whether any are truly about the subject. */
export interface SubjectReviews {
  reviews: Review[];
  hasSpecific: boolean;
}

/**
 * Merge the tiers in priority order (subject-specific first), de-duplicating
 * by id, until `limit` is reached. Guarantees the subject's own reviews are
 * always included, then tops up with related ones so the section stays full.
 */
function dedupeCap(parts: ReviewRow[][], limit: number): ReviewRow[] {
  const seen = new Set<string>();
  const out: ReviewRow[] = [];
  for (const part of parts) {
    for (const r of part) {
      if (seen.has(r.id)) continue;
      seen.add(r.id);
      out.push(r);
      if (out.length >= limit) return out;
    }
  }
  return out;
}

/** Approved reviews matching `extra`, best (highest-rated, newest) first. */
const approvedWhere = (extra: ReturnType<typeof and>) =>
  db
    .select()
    .from(schema.reviews)
    .where(and(eq(schema.reviews.status, 'approved'), extra))
    .orderBy(desc(schema.reviews.rating), desc(schema.reviews.reviewDate));

/**
 * Reviews for a product page. The product's own reviews always come first
 * (a must), then the section is topped up to at least `limit` with related
 * reviews — the protocols this product belongs to, its sibling products in
 * those protocols, then general/any approved — so every page shows a full set.
 * `hasSpecific` lets the page pick an honest heading.
 */
export async function getReviewsForProduct(sku: string, limit = 6): Promise<SubjectReviews> {
  const specific = (await approvedWhere(
    and(eq(schema.reviews.subjectType, 'product'), eq(schema.reviews.subjectRef, sku)),
  )) as ReviewRow[];

  if (specific.length >= limit) {
    return { reviews: specific.slice(0, limit).map(toReview), hasSpecific: true };
  }

  // Protocols that contain this product, and the sibling products inside them.
  const slugRows = await db
    .select({ slug: schema.bundles.slug })
    .from(schema.bundleItems)
    .innerJoin(schema.bundles, eq(schema.bundleItems.bundleId, schema.bundles.id))
    .innerJoin(schema.products, eq(schema.bundleItems.productId, schema.products.id))
    .where(eq(schema.products.sku, sku));
  const slugs = [...new Set(slugRows.map((r) => r.slug))];

  let siblingSkus: string[] = [];
  if (slugs.length > 0) {
    const sibRows = await db
      .select({ sku: schema.products.sku })
      .from(schema.bundleItems)
      .innerJoin(schema.bundles, eq(schema.bundleItems.bundleId, schema.bundles.id))
      .innerJoin(schema.products, eq(schema.bundleItems.productId, schema.products.id))
      .where(inArray(schema.bundles.slug, slugs));
    siblingSkus = [...new Set(sibRows.map((r) => r.sku))].filter((s) => s !== sku);
  }

  const protocolReviews =
    slugs.length > 0
      ? ((await approvedWhere(
          and(eq(schema.reviews.subjectType, 'protocol'), inArray(schema.reviews.subjectRef, slugs)),
        )) as ReviewRow[])
      : [];
  const siblingReviews =
    siblingSkus.length > 0
      ? ((await approvedWhere(
          and(eq(schema.reviews.subjectType, 'product'), inArray(schema.reviews.subjectRef, siblingSkus)),
        )) as ReviewRow[])
      : [];
  const general = (await approvedWhere(eq(schema.reviews.subjectType, 'general'))) as ReviewRow[];
  const anyApproved = (await approvedWhere(undefined)) as ReviewRow[];

  return {
    reviews: dedupeCap([specific, protocolReviews, siblingReviews, general, anyApproved], limit).map(toReview),
    hasSpecific: specific.length > 0,
  };
}

/**
 * Reviews for a protocol page. The protocol's own reviews come first, then
 * topped up to at least `limit` with its member products' reviews, then
 * general/any approved.
 */
export async function getReviewsForProtocol(slug: string, limit = 6): Promise<SubjectReviews> {
  const specific = (await approvedWhere(
    and(eq(schema.reviews.subjectType, 'protocol'), eq(schema.reviews.subjectRef, slug)),
  )) as ReviewRow[];

  if (specific.length >= limit) {
    return { reviews: specific.slice(0, limit).map(toReview), hasSpecific: true };
  }

  const skuRows = await db
    .select({ sku: schema.products.sku })
    .from(schema.bundleItems)
    .innerJoin(schema.bundles, eq(schema.bundleItems.bundleId, schema.bundles.id))
    .innerJoin(schema.products, eq(schema.bundleItems.productId, schema.products.id))
    .where(eq(schema.bundles.slug, slug));
  const skus = [...new Set(skuRows.map((r) => r.sku))];

  const productReviews =
    skus.length > 0
      ? ((await approvedWhere(
          and(eq(schema.reviews.subjectType, 'product'), inArray(schema.reviews.subjectRef, skus)),
        )) as ReviewRow[])
      : [];
  const general = (await approvedWhere(eq(schema.reviews.subjectType, 'general'))) as ReviewRow[];
  const anyApproved = (await approvedWhere(undefined)) as ReviewRow[];

  return {
    reviews: dedupeCap([specific, productReviews, general, anyApproved], limit).map(toReview),
    hasSpecific: specific.length > 0,
  };
}
