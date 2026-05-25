import { z } from 'zod';

export const REVIEW_STATUSES = ['pending', 'approved', 'disapproved'] as const;
export type ReviewStatus = (typeof REVIEW_STATUSES)[number];

export const UpdateReviewStatusSchema = z.object({
  status: z.enum(REVIEW_STATUSES),
});

export type UpdateReviewStatusInput = z.infer<typeof UpdateReviewStatusSchema>;
