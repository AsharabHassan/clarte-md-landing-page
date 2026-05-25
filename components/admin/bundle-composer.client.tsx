'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowUp, ArrowDown, Trash2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProductLite { id: string; name: string; sku: string }

export default function BundleComposer({
  bundleId,
  allProducts,
  initialItems,
}: {
  bundleId: string;
  allProducts: ProductLite[];
  initialItems: ProductLite[];
}) {
  const router = useRouter();
  const [items, setItems] = useState<ProductLite[]>(initialItems);
  const [toAdd, setToAdd] = useState('');
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const available = allProducts.filter((p) => !items.some((i) => i.id === p.id));

  function move(idx: number, dir: -1 | 1) {
    const next = [...items];
    const j = idx + dir;
    if (j < 0 || j >= next.length) return;
    [next[idx], next[j]] = [next[j], next[idx]];
    setItems(next);
    setSaved(false);
  }
  function remove(idx: number) {
    setItems(items.filter((_, i) => i !== idx));
    setSaved(false);
  }
  function add() {
    const p = allProducts.find((x) => x.id === toAdd);
    if (!p) return;
    setItems([...items, p]);
    setToAdd('');
    setSaved(false);
  }

  async function save() {
    setBusy(true);
    setSaved(false);
    setError(null);
    const res = await fetch(`/api/admin/protocols/${bundleId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ items: items.map((i) => i.id) }),
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
    <div className="space-y-4">
      <ol className="space-y-2">
        {items.map((p, idx) => (
          <li key={p.id} className="flex items-center gap-2 rounded-md border border-border bg-card p-2">
            <span className="w-5 text-center text-sm text-muted-foreground">{idx + 1}</span>
            <div className="min-w-0 flex-1">
              <div className="truncate text-sm font-medium">{p.name}</div>
              <div className="font-mono text-xs text-muted-foreground">{p.sku}</div>
            </div>
            <Button type="button" variant="ghost" size="icon" aria-label="Move up" disabled={idx === 0} onClick={() => move(idx, -1)}>
              <ArrowUp className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Move down" disabled={idx === items.length - 1} onClick={() => move(idx, 1)}>
              <ArrowDown className="size-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon" aria-label="Remove" onClick={() => remove(idx)}>
              <Trash2 className="size-4" />
            </Button>
          </li>
        ))}
        {items.length === 0 && (
          <li className="rounded-md border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
            No products in this protocol yet.
          </li>
        )}
      </ol>

      <div className="flex flex-wrap items-center gap-2">
        <select
          value={toAdd}
          onChange={(e) => setToAdd(e.target.value)}
          className="h-9 min-w-0 flex-1 rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 sm:max-w-sm"
        >
          <option value="">Add a product…</option>
          {available.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name} ({p.sku})
            </option>
          ))}
        </select>
        <Button type="button" variant="outline" size="sm" disabled={!toAdd} onClick={add}>
          <Plus className="size-4" /> Add
        </Button>
      </div>

      <div className="flex items-center gap-3 border-t border-border pt-4">
        <Button type="button" onClick={save} disabled={busy}>
          {busy ? 'Saving…' : 'Save composition'}
        </Button>
        {saved && <span className="text-sm text-[var(--clarte-success)]">Saved</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </div>
  );
}
