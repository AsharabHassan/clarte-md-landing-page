'use client';
import { useEffect, useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReviewPhoto } from '@/lib/marketing/reviews';

/**
 * Admin photo viewer for review moderation: a thumbnail strip + a
 * click-to-enlarge lightbox so the admin can actually inspect attached
 * customer photos before approving/disapproving.
 */
export default function ReviewPhotos({ photos }: { photos: ReviewPhoto[] }) {
  const [index, setIndex] = useState<number | null>(null);
  const open = index !== null;
  const multi = photos.length > 1;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIndex(null);
      if (multi && e.key === 'ArrowRight') setIndex((i) => (i === null ? 0 : (i + 1) % photos.length));
      if (multi && e.key === 'ArrowLeft') setIndex((i) => (i === null ? 0 : (i - 1 + photos.length) % photos.length));
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, multi, photos.length]);

  if (!photos || photos.length === 0) return null;

  return (
    <>
      <div className="mt-3 flex flex-wrap gap-2">
        {photos.map((p, i) => (
          <button
            key={`${p.src}-${i}`}
            type="button"
            onClick={() => setIndex(i)}
            className="group relative h-16 w-16 overflow-hidden rounded-md border border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label={`View photo: ${p.caption ?? p.alt}`}
            title={p.caption ?? p.alt}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-105"
            />
            {p.caption && (
              <span className="absolute inset-x-0 bottom-0 truncate bg-black/65 px-1 py-0.5 text-center text-[8px] uppercase tracking-wide text-white">
                {p.caption}
              </span>
            )}
          </button>
        ))}
      </div>

      {open && index !== null && (
        <div
          className="fixed inset-0 z-[9999] flex flex-col bg-black/90 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Review photo viewer"
          onClick={() => setIndex(null)}
        >
          <div className="flex items-center justify-between px-5 py-4 text-white">
            <span className="text-xs uppercase tracking-wide text-white/80">
              {photos[index].caption ?? 'Customer photo'}
              {multi && <span className="ml-2 text-white/50">{index + 1} / {photos.length}</span>}
            </span>
            <button
              type="button"
              onClick={() => setIndex(null)}
              aria-label="Close"
              className="grid h-9 w-9 place-items-center rounded-full border border-white/20 bg-white/10 hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="relative flex flex-1 items-center justify-center px-4 pb-8" onClick={(e) => e.stopPropagation()}>
            {multi && (
              <button
                type="button"
                onClick={() => setIndex((index - 1 + photos.length) % photos.length)}
                aria-label="Previous photo"
                className="absolute left-3 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 md:left-8"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={photos[index].src}
              alt={photos[index].alt}
              className="max-h-[80vh] max-w-[92vw] rounded-lg object-contain"
            />
            {multi && (
              <button
                type="button"
                onClick={() => setIndex((index + 1) % photos.length)}
                aria-label="Next photo"
                className="absolute right-3 grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20 md:right-8"
              >
                <ChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
