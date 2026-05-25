'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface CustomerFormValues {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  postal: string;
  notes: string;
}

export default function CustomerForm({ initial }: { initial: CustomerFormValues }) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof CustomerFormValues>(k: K, v: CustomerFormValues[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    setError(null);
    const res = await fetch(`/api/admin/customers/${initial.id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        phone: form.phone.trim(),
        email: form.email.trim() || null,
        address: form.address.trim() || null,
        city: form.city.trim() || null,
        postal: form.postal.trim() || null,
        notes: form.notes.trim() || null,
      }),
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
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="phone">Phone</Label>
          <Input id="phone" value={form.phone} onChange={(e) => set('phone', e.target.value)} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="city">City</Label>
          <Input id="city" value={form.city} onChange={(e) => set('city', e.target.value)} />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="postal">Postal code</Label>
          <Input id="postal" value={form.postal} onChange={(e) => set('postal', e.target.value)} />
        </div>
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="address">Address</Label>
        <Textarea id="address" value={form.address} onChange={(e) => set('address', e.target.value)} rows={2} />
      </div>
      <div className="grid gap-1.5">
        <Label htmlFor="notes">Internal notes</Label>
        <Textarea
          id="notes"
          value={form.notes}
          onChange={(e) => set('notes', e.target.value)}
          rows={3}
          placeholder="Staff-only notes about this customer"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save profile'}
        </Button>
        {saved && <span className="text-sm text-[var(--clarte-success)]">Saved</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  );
}
