import type { Metadata } from 'next';
import { requirePortalCustomer } from '@/lib/auth/portal';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AccountNav from '@/components/account/account-nav.client';
import AccountProfileForm from '@/components/account/profile-form.client';

export const dynamic = 'force-dynamic';
export const metadata: Metadata = { title: 'Your profile' };

export default async function AccountProfilePage() {
  const customer = await requirePortalCustomer();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12">
      <AccountNav name={customer.name} />
      <h1 className="mb-1 font-display text-2xl text-navy">Your profile</h1>
      <p className="mb-6 text-sm text-ink-mute">Keep your contact and shipping details up to date.</p>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Details</CardTitle>
        </CardHeader>
        <CardContent>
          <AccountProfileForm
            phone={customer.phone}
            initial={{
              name: customer.name,
              email: customer.email ?? '',
              address: customer.address ?? '',
              city: customer.city ?? '',
              postal: customer.postal ?? '',
            }}
          />
        </CardContent>
      </Card>
    </div>
  );
}
