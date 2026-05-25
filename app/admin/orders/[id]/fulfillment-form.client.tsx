'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export default function OrderFulfillmentForm({
  orderId,
  courier,
  trackingNumber,
  internalNotes,
}: {
  orderId: string;
  courier: string;
  trackingNumber: string;
  internalNotes: string;
}) {
  const router = useRouter();
  const [form, setForm] = useState({ courier, trackingNumber, internalNotes });
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    setError(null);
    const res = await fetch(`/api/admin/orders/${orderId}/fulfillment`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Save failed');
      return;
    }
    setSaved(true);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-1.5">
        <Label htmlFor="courier">Courier</Label>
        <Input
          id="courier"
          value={form.courier}
          onChange={(e) => setForm((f) => ({ ...f, courier: e.target.value }))}
          placeholder="e.g. TCS, Leopards, M&P"
          maxLength={80}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="tracking">Tracking number</Label>
        <Input
          id="tracking"
          value={form.trackingNumber}
          onChange={(e) => setForm((f) => ({ ...f, trackingNumber: e.target.value }))}
          maxLength={120}
        />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Internal notes</Label>
        <Textarea
          id="notes"
          value={form.internalNotes}
          onChange={(e) => setForm((f) => ({ ...f, internalNotes: e.target.value }))}
          placeholder="Visible to staff only"
          rows={4}
          maxLength={2000}
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" size="sm" disabled={busy}>
          {busy ? 'Saving…' : 'Save'}
        </Button>
        {saved && <span className="text-sm text-[var(--clarte-success)]">Saved</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  );
}
