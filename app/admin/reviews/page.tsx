import Link from 'next/link';
import { sql } from 'drizzle-orm';
import { Star } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS, canDelete, getUserRole } from '@/lib/auth/roles';
import { getReviewsByStatus } from '@/lib/db/review-queries';
import { REVIEW_STATUSES } from '@/lib/validators/admin-reviews';
import { PageHeader } from '@/components/admin/page-header';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/admin/format';
import { cn } from '@/lib/utils';
import ReviewActions from './review-actions.client';
import ReviewPhotos from '@/components/admin/review-photos.client';

export const dynamic = 'force-dynamic';

type SP = Record<string, string | undefined>;

const STATUS_VARIANT: Record<string, 'outline' | 'success' | 'destructive'> = {
  pending: 'outline',
  approved: 'success',
  disapproved: 'destructive',
};

export default async function AdminReviewsPage({ searchParams }: { searchParams: Promise<SP> }) {
  const user = await requireAdminSession(AREA_ACCESS.reviews);
  const params = await searchParams;
  const status = (REVIEW_STATUSES as readonly string[]).includes(params.status ?? '')
    ? params.status
    : undefined;

  const [list, countRows] = await Promise.all([
    getReviewsByStatus(status),
    db
      .select({ status: schema.reviews.status, c: sql<number>`count(*)::int` })
      .from(schema.reviews)
      .groupBy(schema.reviews.status),
  ]);
  const counts: Record<string, number> = {};
  let total = 0;
  for (const r of countRows) {
    counts[r.status] = Number(r.c);
    total += Number(r.c);
  }
  const showDelete = canDelete(getUserRole(user));
  const pending = counts.pending ?? 0;

  const tab = (label: string, value?: string, n?: number) => {
    const active = status === value;
    const href = value ? `/admin/reviews?status=${value}` : '/admin/reviews';
    return (
      <Link
        href={href}
        className={cn(
          'rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors',
          active ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:bg-muted',
        )}
      >
        {label}
        {typeof n === 'number' && <span className="ml-1.5 tabular-nums opacity-70">{n}</span>}
      </Link>
    );
  };

  return (
    <div>
      <PageHeader
        title="Reviews"
        description={
          pending > 0
            ? `${pending} pending approval · ${total} total`
            : `${total} total · all reviewed`
        }
      />

      <div className="mb-4 flex flex-wrap gap-1.5">
        {tab('All', undefined, total)}
        {tab('Pending', 'pending', counts.pending ?? 0)}
        {tab('Approved', 'approved', counts.approved ?? 0)}
        {tab('Disapproved', 'disapproved', counts.disapproved ?? 0)}
      </div>

      <div className="space-y-3">
        {list.map((r) => (
          <Card key={r.id} className="py-0">
            <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="font-medium text-foreground">{r.name}</span>
                  {r.location && <span className="text-xs text-muted-foreground">{r.location}</span>}
                  {r.verified && <Badge variant="secondary">Verified</Badge>}
                  <span className="inline-flex items-center gap-0.5 text-sm tabular-nums">
                    {r.rating}
                    <Star className="size-3.5 fill-[var(--clarte-rust)] text-[var(--clarte-rust)]" />
                  </span>
                  <Badge variant={STATUS_VARIANT[r.status] ?? 'outline'} className="capitalize">
                    {r.status}
                  </Badge>
                </div>
                {r.protocol && (
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-wide text-secondary">
                    {r.protocol}
                  </div>
                )}
                <p className="mt-2 text-sm text-foreground/80">{r.body}</p>
                {r.photos && r.photos.length > 0 && <ReviewPhotos photos={r.photos} />}
                <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{formatDate(r.reviewDate)}</span>
                  {r.photos && r.photos.length > 0 && <span>{r.photos.length} photo(s) · tap to enlarge</span>}
                  {r.source && <span className="uppercase tracking-wide">{r.source}</span>}
                </div>
              </div>
              <div className="shrink-0">
                <ReviewActions id={r.id} status={r.status} name={r.name} canDelete={showDelete} />
              </div>
            </CardContent>
          </Card>
        ))}
        {list.length === 0 && (
          <Card className="py-0">
            <CardContent className="py-12 text-center text-muted-foreground">
              No reviews{status ? ` with status “${status}”` : ''} yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
