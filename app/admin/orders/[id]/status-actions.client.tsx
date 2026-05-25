'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ORDER_STATUSES } from '@/lib/validators/admin-orders';
import { cn } from '@/lib/utils';

export default function OrderStatusActions({
  orderId,
  current,
}: {
  orderId: string;
  current: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState<string | null>(null);
  const [note, setNote] = useState('');
  const [error, setError] = useState<string | null>(null);

  async function set(status: string) {
    if (status === current || busy) return;
    setBusy(status);
    setError(null);
    const res = await fetch(`/api/admin/orders/${orderId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status, note: note.trim() || undefined }),
    });
    setBusy(null);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Update failed');
      return;
    }
    setNote('');
    router.refresh();
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        {ORDER_STATUSES.map((s) => (
          <Button
            key={s}
            type="button"
            size="sm"
            variant={s === current ? 'default' : 'outline'}
            disabled={s === current || busy !== null}
            onClick={() => set(s)}
            className={cn('capitalize', busy === s && 'opacity-70')}
          >
            {busy === s ? 'Saving…' : s}
          </Button>
        ))}
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="status-note" className="text-xs text-muted-foreground">
          Optional note (saved to timeline)
        </Label>
        <Input
          id="status-note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="e.g. confirmed via WhatsApp"
          maxLength={500}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
    </div>
  );
}
