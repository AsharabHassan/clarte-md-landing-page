import { and, desc, eq } from 'drizzle-orm';
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

/** Approved reviews only — what the public storefront renders. */
export async function getApprovedReviews(): Promise<Review[]> {
  const rows = await db
    .select()
    .from(schema.reviews)
    .where(eq(schema.reviews.status, 'approved'))
    .orderBy(desc(schema.reviews.reviewDate));
  return rows.map(toReview);
}

/** Admin: reviews filtered by status (or all), newest first. */
export async function getReviewsByStatus(status?: string): Promise<ReviewRow[]> {
  const base = db.select().from(schema.reviews);
  const where = status ? and(eq(schema.reviews.status, status)) : undefined;
  return (where ? base.where(where) : base).orderBy(desc(schema.reviews.reviewDate));
}
