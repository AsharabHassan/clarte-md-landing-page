'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProtocolVisibilityToggle({
  bundleId,
  active,
}: {
  bundleId: string;
  active: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function toggle() {
    setBusy(true);
    setError(null);
    const res = await fetch(`/api/admin/protocols/${bundleId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ active: !active }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Update failed');
      return;
    }
    router.refresh();
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-8 w-14 items-center rounded-full px-1 transition-colors ${
            active ? 'bg-[var(--clarte-success)]' : 'bg-muted-foreground/30'
          }`}
        >
          <div
            className={`size-6 rounded-full bg-white shadow transition-transform ${
              active ? 'translate-x-6' : 'translate-x-0'
            }`}
          />
        </div>
        <span className="text-sm font-medium">
          {active ? 'Visible on site' : 'Hidden from site'}
        </span>
      </div>

      <Button variant="outline" size="sm" onClick={toggle} disabled={busy}>
        {active ? (
          <><EyeOff className="size-4" /> Hide protocol</>
        ) : (
          <><Eye className="size-4" /> Show protocol</>
        )}
      </Button>

      {error && <span className="text-sm text-destructive">{error}</span>}
    </div>
  );
}
