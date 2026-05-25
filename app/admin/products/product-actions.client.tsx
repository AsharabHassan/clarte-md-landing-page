'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ProductActions({ id, active }: { id: string; active: boolean }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    const res = active
      ? await fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
      : await fetch(`/api/admin/products/${id}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ active: true }),
        });
    setBusy(false);
    if (res.ok) router.refresh();
  }

  return (
    <div className="flex justify-end gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href={`/admin/products/${id}`}>Edit</Link>
      </Button>
      <Button size="sm" variant={active ? 'ghost' : 'secondary'} disabled={busy} onClick={toggle}>
        {busy ? '…' : active ? 'Archive' : 'Activate'}
      </Button>
    </div>
  );
}
