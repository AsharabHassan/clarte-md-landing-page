'use client';
import { useState } from 'react';
import Link from 'next/link';
import { Star, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const PROTOCOLS = [
  'Clear Skin Protocol',
  'Even Tone Protocol',
  'Renewal Protocol',
  'Barrier Protocol',
];

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [protocol, setProtocol] = useState('');
  const [body, setBody] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (rating < 1) {
      setError('Please choose a star rating.');
      return;
    }
    setBusy(true);
    const res = await fetch('/api/account/reviews', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ rating, body: body.trim(), protocol: protocol || null }),
    });
    setBusy(false);
    if (!res.ok) {
      const data = await res.json().catch(() => null);
      setError(data?.error ?? 'Could not submit your review.');
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <CheckCircle2 className="size-12 text-[var(--clarte-success)]" />
        <div>
          <h2 className="font-display text-xl text-navy">Thank you — review submitted.</h2>
          <p className="mt-2 max-w-md text-sm text-ink-mute">
            Our team will review it before it’s published. Verified reviews usually appear within a
            day or two.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/account/orders">Back to your orders</Link>
        </Button>
      </div>
    );
  }

  const shown = hover || rating;

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-2">
        <Label>Your rating</Label>
        <div className="flex items-center gap-1" onMouseLeave={() => setHover(0)}>
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              aria-label={`${n} star${n === 1 ? '' : 's'}`}
              onMouseEnter={() => setHover(n)}
              onClick={() => setRating(n)}
              className="p-0.5"
            >
              <Star
                className={cn(
                  'size-7 transition-colors',
                  n <= shown ? 'fill-[var(--clarte-rust)] text-[var(--clarte-rust)]' : 'text-sand',
                )}
              />
            </button>
          ))}
          {rating > 0 && <span className="ml-2 text-sm text-ink-mute">{rating}/5</span>}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="protocol">Which protocol? (optional)</Label>
        <select
          id="protocol"
          value={protocol}
          onChange={(e) => setProtocol(e.target.value)}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="">— Select —</option>
          {PROTOCOLS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="body">Your review</Label>
        <Textarea
          id="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          maxLength={2000}
          placeholder="What changed for your skin? How did you find the routine and the service?"
        />
        <p className="text-xs text-ink-faint">{body.trim().length}/2000 · at least 20 characters</p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? 'Submitting…' : 'Submit review'}
        </Button>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
      <p className="text-xs text-ink-faint">
        Your name and city come from your account. Reviews are checked before publishing.
      </p>
    </form>
  );
}
