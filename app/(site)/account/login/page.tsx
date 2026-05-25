import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getPortalCustomer } from '@/lib/auth/portal';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AccountLoginForm from '@/components/account/login-form.client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Sign in' };

/** Only allow internal /account redirects (no open-redirect). */
function safeNext(next?: string): string {
  return typeof next === 'string' && /^\/account(\/|$)/.test(next) ? next : '/account/orders';
}

export default async function AccountLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;
  const dest = safeNext(next);

  // Already signed in → go where they were headed.
  if (await getPortalCustomer()) redirect(dest);

  const writingReview = dest.startsWith('/account/reviews');

  return (
    <div className="mx-auto max-w-md px-5 py-16">
      <Card>
        <CardHeader>
          <CardTitle className="font-display text-2xl">
            {writingReview ? 'Sign in to write a review' : 'Your account'}
          </CardTitle>
          <CardDescription>
            {writingReview
              ? 'Reviews are from verified customers — sign in with the phone & email from your order.'
              : 'Track orders and manage your details.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AccountLoginForm next={dest} />
        </CardContent>
      </Card>
    </div>
  );
}
