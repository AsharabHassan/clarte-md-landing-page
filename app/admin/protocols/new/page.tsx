import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { requireAdminSession } from '@/lib/auth/admin';
import { AREA_ACCESS } from '@/lib/auth/roles';
import { PageHeader } from '@/components/admin/page-header';
import BundleForm from '@/components/admin/bundle-form.client';

export const dynamic = 'force-dynamic';

export default async function NewProtocolPage() {
  await requireAdminSession(AREA_ACCESS.protocols);
  return (
    <div>
      <Link
        href="/admin/protocols"
        className="mb-4 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" /> Protocols
      </Link>
      <PageHeader title="Add protocol" description="Create the kit, then add its products on the next screen." />
      <BundleForm />
    </div>
  );
}
