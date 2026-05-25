'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { ProductContent } from '@/lib/products/content';

const linesToArray = (s: string) => s.split('\n').map((x) => x.trim()).filter(Boolean);
const csvToArray = (s: string) => s.split(',').map((x) => x.trim()).filter(Boolean);

interface IngredientRow { name: string; role: string }
interface DirectionRow { text: string; duration: string }

export default function ProductContentEditor({
  productId,
  initial,
}: {
  productId: string;
  initial: ProductContent | null;
}) {
  const router = useRouter();
  const [tags, setTags] = useState((initial?.tags ?? []).join(', '));
  const [badges, setBadges] = useState((initial?.badges ?? []).join(', '));
  const [formulation, setFormulation] = useState(initial?.formulation ?? '');
  const [bestFor, setBestFor] = useState(initial?.bestFor ?? '');
  const [benefits, setBenefits] = useState((initial?.benefits ?? []).join('\n'));
  const [important, setImportant] = useState((initial?.important ?? []).join('\n'));
  const [ingredients, setIngredients] = useState<IngredientRow[]>(
    initial?.ingredients?.map((i) => ({ name: i.name, role: i.role })) ?? [],
  );
  const [directions, setDirections] = useState<DirectionRow[]>(
    (initial?.directions ?? []).map((d, i) => ({ text: d, duration: initial?.directionDurations?.[i] ?? '' })),
  );

  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function dirty() {
    setSaved(false);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setSaved(false);
    setError(null);

    const cleanDirections = directions.filter((d) => d.text.trim());
    const hasDurations = cleanDirections.some((d) => d.duration.trim());

    const content = {
      tags: csvToArray(tags),
      badges: csvToArray(badges),
      formulation: formulation.trim(),
      ...(bestFor.trim() ? { bestFor: bestFor.trim() } : {}),
      benefits: linesToArray(benefits),
      ingredients: ingredients
        .filter((i) => i.name.trim())
        .map((i) => ({ name: i.name.trim(), role: i.role.trim() })),
      directions: cleanDirections.map((d) => d.text.trim()),
      ...(hasDurations ? { directionDurations: cleanDirections.map((d) => d.duration.trim()) } : {}),
      important: linesToArray(important),
    };

    const res = await fetch(`/api/admin/products/${productId}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ content }),
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
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-1.5">
          <Label htmlFor="tags">Tags <span className="text-muted-foreground">(comma-separated)</span></Label>
          <Input id="tags" value={tags} onChange={(e) => { setTags(e.target.value); dirty(); }} placeholder="Anti-Aging, Renewing" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="badges">Trust badges <span className="text-muted-foreground">(comma-separated)</span></Label>
          <Input id="badges" value={badges} onChange={(e) => { setBadges(e.target.value); dirty(); }} placeholder="Cruelty-Free, Vegan" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="formulation">Formulation line</Label>
          <Input id="formulation" value={formulation} onChange={(e) => { setFormulation(e.target.value); dirty(); }} placeholder="For all skin types · 30ml / 1.0 fl oz" />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="bestFor">“Best for” line</Label>
          <Input id="bestFor" value={bestFor} onChange={(e) => { setBestFor(e.target.value); dirty(); }} placeholder="Best for fine lines — evening use only." />
        </div>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="benefits">Benefits <span className="text-muted-foreground">(one per line)</span></Label>
        <Textarea id="benefits" value={benefits} onChange={(e) => { setBenefits(e.target.value); dirty(); }} rows={5} />
      </div>

      {/* Ingredients — name + role rows */}
      <div className="space-y-2">
        <Label>Ingredients</Label>
        {ingredients.map((ing, idx) => (
          <div key={idx} className="flex gap-2">
            <Input
              value={ing.name}
              onChange={(e) => { const next = [...ingredients]; next[idx] = { ...next[idx], name: e.target.value }; setIngredients(next); dirty(); }}
              placeholder="Ingredient"
              className="sm:max-w-[14rem]"
            />
            <Input
              value={ing.role}
              onChange={(e) => { const next = [...ingredients]; next[idx] = { ...next[idx], role: e.target.value }; setIngredients(next); dirty(); }}
              placeholder="What it does"
            />
            <Button type="button" variant="ghost" size="icon" aria-label="Remove ingredient" onClick={() => { setIngredients(ingredients.filter((_, i) => i !== idx)); dirty(); }}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => { setIngredients([...ingredients, { name: '', role: '' }]); dirty(); }}>
          <Plus className="size-4" /> Add ingredient
        </Button>
      </div>

      {/* Directions — step + optional duration rows */}
      <div className="space-y-2">
        <Label>How to use <span className="text-muted-foreground">(step + optional duration)</span></Label>
        {directions.map((d, idx) => (
          <div key={idx} className="flex gap-2">
            <span className="mt-2 w-5 shrink-0 text-right text-sm text-muted-foreground">{idx + 1}.</span>
            <Textarea
              value={d.text}
              onChange={(e) => { const next = [...directions]; next[idx] = { ...next[idx], text: e.target.value }; setDirections(next); dirty(); }}
              placeholder="Step instruction"
              rows={2}
            />
            <Input
              value={d.duration}
              onChange={(e) => { const next = [...directions]; next[idx] = { ...next[idx], duration: e.target.value }; setDirections(next); dirty(); }}
              placeholder="45s"
              className="w-20 shrink-0"
            />
            <Button type="button" variant="ghost" size="icon" aria-label="Remove step" onClick={() => { setDirections(directions.filter((_, i) => i !== idx)); dirty(); }}>
              <Trash2 className="size-4" />
            </Button>
          </div>
        ))}
        <Button type="button" variant="outline" size="sm" onClick={() => { setDirections([...directions, { text: '', duration: '' }]); dirty(); }}>
          <Plus className="size-4" /> Add step
        </Button>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="important">Important / warnings <span className="text-muted-foreground">(one per line)</span></Label>
        <Textarea id="important" value={important} onChange={(e) => { setImportant(e.target.value); dirty(); }} rows={5} />
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? 'Saving…' : 'Save storefront content'}
        </Button>
        {saved && <span className="text-sm text-[var(--clarte-success)]">Saved</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  );
}
