import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { asc, eq } from 'drizzle-orm';
import { ArrowLeft } from 'lucide-react';
import { db, schema } from '@/lib/db/client';
import { getPortalCustomer } from '@/lib/auth/portal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccountNav from '@/components/account/account-nav.client';
import ReviewForm from '@/components/account/review-form.client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Write a review' };

export default async function WriteReviewPage() {
  // Not signed in → send to login, then come back here.
  const customer = await getPortalCustomer();
  if (!customer) redirect('/account/login?next=/account/reviews/new');

  // The review can be attributed to a protocol OR a single product.
  const [protocols, products] = await Promise.all([
    db.select({ name: schema.bundles.name }).from(schema.bundles).orderBy(asc(schema.bundles.name)),
    db
      .select({ name: schema.products.name })
      .from(schema.products)
      .where(eq(schema.products.active, true))
      .orderBy(asc(schema.products.name)),
  ]);

  return (
    <div className="mx-auto max-w-2xl px-5 py-12">
      <AccountNav name={customer.name} />
      <Link
        href="/account/orders"
        className="mb-4 inline-flex items-center gap-1 text-sm text-ink-mute hover:text-navy"
      >
        <ArrowLeft className="size-4" /> Your account
      </Link>
      <h1 className="mb-1 font-display text-2xl text-navy">Write a review</h1>
      <p className="mb-6 text-sm text-ink-mute">
        Share your honest experience — it helps others choose the right protocol or product.
      </p>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Reviewing as {customer.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <ReviewForm
            protocols={protocols.map((p) => p.name)}
            products={products.map((p) => p.name)}
          />
        </CardContent>
      </Card>
    </div>
  );
}
