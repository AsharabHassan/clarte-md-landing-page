'use client';
import { useRef, useState } from 'react';
import Link from 'next/link';
import { Star, CheckCircle2, ImagePlus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const MAX_PHOTOS = 3;
const MAX_BYTES = 8 * 1024 * 1024;
const ALLOWED = ['image/jpeg', 'image/png', 'image/webp'];

interface PendingImage {
  base64: string;
  mime: string;
  preview: string;
  name: string;
}

export default function ReviewForm({
  protocols = [],
  products = [],
}: {
  protocols?: string[];
  products?: string[];
}) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [images, setImages] = useState<PendingImage[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function onPickFiles(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const files = Array.from(e.target.files ?? []);
    if (fileRef.current) fileRef.current.value = ''; // allow re-picking the same file
    for (const file of files) {
      if (images.length >= MAX_PHOTOS) {
        setError(`You can add up to ${MAX_PHOTOS} photos.`);
        break;
      }
      if (!ALLOWED.includes(file.type)) {
        setError('Photos must be JPG, PNG, or WebP.');
        continue;
      }
      if (file.size > MAX_BYTES) {
        setError('Each photo must be under 8 MB.');
        continue;
      }
      const dataUrl: string = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(String(r.result));
        r.onerror = rej;
        r.readAsDataURL(file);
      });
      const base64 = dataUrl.split(',')[1] ?? '';
      setImages((prev) =>
        prev.length >= MAX_PHOTOS
          ? prev
          : [...prev, { base64, mime: file.type, preview: dataUrl, name: file.name }],
      );
    }
  }

  function removeImage(i: number) {
    setImages((prev) => prev.filter((_, idx) => idx !== i));
  }

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
      body: JSON.stringify({
        rating,
        body: body.trim(),
        protocol: subject || null,
        images: images.map(({ base64, mime }) => ({ base64, mime })),
      }),
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
            Our team will review it (and any photos) before it’s published. Verified reviews usually
            appear within a day or two.
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
        <Label htmlFor="subject">What are you reviewing? (optional)</Label>
        <select
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-9 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50"
        >
          <option value="">— Select —</option>
          {protocols.length > 0 && (
            <optgroup label="Protocols (full kits)">
              {protocols.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </optgroup>
          )}
          {products.length > 0 && (
            <optgroup label="Individual products">
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </optgroup>
          )}
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

      {/* Photos */}
      <div className="grid gap-2">
        <Label>Photos (optional)</Label>
        <div className="flex flex-wrap items-center gap-3">
          {images.map((img, i) => (
            <div key={i} className="relative h-20 w-20 overflow-hidden rounded-md border border-rule">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.preview} alt={img.name} className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removeImage(i)}
                aria-label="Remove photo"
                className="absolute right-0.5 top-0.5 grid h-5 w-5 place-items-center rounded-full bg-navy-deep/80 text-white hover:bg-navy-deep"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
          {images.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-20 w-20 flex-col items-center justify-center gap-1 rounded-md border border-dashed border-rule text-ink-mute transition-colors hover:border-cobalt hover:text-cobalt"
            >
              <ImagePlus className="h-5 w-5" />
              <span className="text-[10px] uppercase tracking-wide">Add</span>
            </button>
          )}
        </div>
        <input
          ref={fileRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          onChange={onPickFiles}
          className="hidden"
        />
        <p className="text-xs text-ink-faint">
          Up to {MAX_PHOTOS} photos (e.g. before/after) · JPG/PNG/WebP · max 8 MB each.
        </p>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={busy}>
          {busy ? 'Submitting…' : 'Submit review'}
        </Button>
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
      <p className="text-xs text-ink-faint">
        Your name and city come from your account. Reviews and photos are checked before publishing.
      </p>
    </form>
  );
}
