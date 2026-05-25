'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export interface BundleFormValues {
  id?: string;
  slug: string;
  name: string;
  concern: string;
  pricePkr: string;
}

const CONCERNS = ['acne', 'pigmentation', 'anti-ageing', 'hydration'];

export default function BundleForm({ initial }: { initial?: BundleFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState<BundleFormValues>(
    initial ?? { slug: '', name: '', concern: '', pricePkr: '' },
  );
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function set<K extends keyof BundleFormValues>(k: K, v: BundleFormValues[K]) {
    setForm((f) => ({ ...f, [k]: v }));
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    setError(null);

    const url = isEdit ? `/api/admin/protocols/${initial!.id}` : '/api/admin/protocols';
    const payload = isEdit
      ? { name: form.name.trim(), concern: form.concern.trim(), pricePkr: form.pricePkr }
      : { slug: form.slug.trim(), name: form.name.trim(), concern: form.concern.trim(), pricePkr: form.pricePkr };

    const res = await fetch(url, {
      method: isEdit ? 'PATCH' : 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(payload),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Save failed');
      return;
    }
    if (isEdit) {
      setSaved(true);
      router.refresh();
    } else {
      const data = await res.json().catch(() => null);
      // Jump to the edit page so the operator can compose products next.
      router.push(data?.bundle?.id ? `/admin/protocols/${data.bundle.id}` : '/admin/protocols');
      router.refresh();
    }
  }

  return (
    <form onSubmit={onSubmit} className="max-w-xl space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={form.slug}
            onChange={(e) => set('slug', e.target.value.toLowerCase())}
            placeholder="clear-skin-protocol"
            disabled={isEdit}
            required
          />
          {isEdit ? (
            <p className="text-xs text-muted-foreground">Slug is fixed (links the landing page &amp; cart).</p>
          ) : (
            <p className="text-xs text-muted-foreground">Must end in “-protocol”.</p>
          )}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="The Clear Skin Protocol" required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="concern">Concern</Label>
          <Input id="concern" list="concern-options" value={form.concern} onChange={(e) => set('concern', e.target.value)} placeholder="acne" required />
          <datalist id="concern-options">
            {CONCERNS.map((c) => <option key={c} value={c} />)}
          </datalist>
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="price">Kit price (PKR)</Label>
          <Input id="price" type="number" min={0} value={form.pricePkr} onChange={(e) => set('pricePkr', e.target.value)} required />
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : isEdit ? 'Save details' : 'Create protocol'}
        </Button>
        {saved && <span className="text-sm text-[var(--clarte-success)]">Saved</span>}
        {!isEdit && (
          <Button type="button" variant="ghost" onClick={() => router.push('/admin/protocols')}>
            Cancel
          </Button>
        )}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  );
}
