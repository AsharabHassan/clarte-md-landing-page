'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

export interface ProductFormValues {
  id?: string;
  sku: string;
  name: string;
  pricePkr: string;
  listPricePkr: string;
  actives: string;
  imageUrl: string;
  description: string;
  stockQty: string;
  lowStockThreshold: string;
  active: boolean;
}

const EMPTY: ProductFormValues = {
  sku: '',
  name: '',
  pricePkr: '',
  listPricePkr: '',
  actives: '',
  imageUrl: '',
  description: '',
  stockQty: '',
  lowStockThreshold: '',
  active: true,
};

export default function ProductForm({ initial }: { initial?: ProductFormValues }) {
  const router = useRouter();
  const isEdit = Boolean(initial?.id);
  const [form, setForm] = useState<ProductFormValues>({ ...EMPTY, ...initial });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function update<K extends keyof ProductFormValues>(key: K, value: ProductFormValues[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    const payload = {
      sku: form.sku.trim(),
      name: form.name.trim(),
      pricePkr: form.pricePkr,
      listPricePkr: form.listPricePkr === '' ? null : form.listPricePkr,
      actives: form.actives.trim() || null,
      imageUrl: form.imageUrl.trim() || null,
      description: form.description.trim() || null,
      stockQty: form.stockQty === '' ? null : form.stockQty,
      lowStockThreshold: form.lowStockThreshold === '' ? null : form.lowStockThreshold,
      active: form.active,
    };

    const url = isEdit ? `/api/admin/products/${initial!.id}` : '/api/admin/products';
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
    router.push('/admin/products');
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="max-w-2xl space-y-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={form.sku}
            onChange={(e) => update('sku', e.target.value.toLowerCase())}
            placeholder="e.g. prep"
            disabled={isEdit}
            required
          />
          {isEdit && <p className="text-xs text-muted-foreground">SKU can’t be changed after creation.</p>}
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" value={form.name} onChange={(e) => update('name', e.target.value)} required />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="price">Price (PKR)</Label>
          <Input
            id="price"
            type="number"
            min={0}
            value={form.pricePkr}
            onChange={(e) => update('pricePkr', e.target.value)}
            required
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="listPrice">List price (PKR)</Label>
          <Input
            id="listPrice"
            type="number"
            min={0}
            value={form.listPricePkr}
            onChange={(e) => update('listPricePkr', e.target.value)}
            placeholder="optional — for strike-through"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="stock">Stock quantity</Label>
          <Input
            id="stock"
            type="number"
            min={0}
            value={form.stockQty}
            onChange={(e) => update('stockQty', e.target.value)}
            placeholder="blank = untracked"
          />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="lowStock">Low-stock threshold</Label>
          <Input
            id="lowStock"
            type="number"
            min={0}
            value={form.lowStockThreshold}
            onChange={(e) => update('lowStockThreshold', e.target.value)}
            placeholder="alert at/below"
          />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="actives">Actives</Label>
        <Input
          id="actives"
          value={form.actives}
          onChange={(e) => update('actives', e.target.value)}
          placeholder="e.g. PHA 4% · Aloe"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="image">Image URL</Label>
        <Input
          id="image"
          value={form.imageUrl}
          onChange={(e) => update('imageUrl', e.target.value)}
          placeholder="https://…"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={form.description}
          onChange={(e) => update('description', e.target.value)}
          rows={4}
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.active}
          onChange={(e) => update('active', e.target.checked)}
        />
        Active (visible in storefront)
      </label>

      <div className="flex items-center gap-3 pt-2">
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : isEdit ? 'Save changes' : 'Create product'}
        </Button>
        <Button type="button" variant="ghost" onClick={() => router.push('/admin/products')}>
          Cancel
        </Button>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  );
}
