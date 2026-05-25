'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface AccountProfileValues {
  name: string;
  email: string;
  address: string;
  city: string;
  postal: string;
}

export default function AccountProfileForm({
  phone,
  initial,
}: {
  phone: string;
  initial: AccountProfileValues;
}) {
  const router = useRouter();
  const [form, setForm] = useState(initial);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof AccountProfileValues>(k: K, v: AccountProfileValues[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    setError(null);
    const res = await fetch('/api/account/profile', {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: form.name.trim(),
        email: form.email.trim() || null,
        address: form.address.trim() || null,
        city: form.city.trim() || null,
        postal: form.postal.trim() || null,
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
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Phone (used to sign in)</Label>
          <Input id="phone" value={phone} disabled readOnly />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="city">City</Label>
          <Input id="city" value={form.city} onChange={(e) => set('city', e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="postal">Postal code</Label>
          <Input id="postal" value={form.postal} onChange={(e) => set('postal', e.target.value)} />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="address">Shipping address</Label>
        <Textarea id="address" value={form.address} onChange={(e) => set('address', e.target.value)} rows={2} />
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save changes'}
        </Button>
        {saved && <span className="text-sm text-[var(--clarte-success)]">Saved</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
      <p className="text-xs text-muted-foreground">
        To change your phone number, please WhatsApp us — it’s how you sign in.
      </p>
    </form>
  );
}
