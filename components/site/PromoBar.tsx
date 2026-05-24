'use client';

import { CountdownTimer } from '@/components/marketing/CountdownTimer';
import { cn } from '@/lib/utils';

/**
 * Sticky promo band that sits above the main nav.
 *
 * Shows: flat shipping + COD policy + a fake "offer ends in" countdown
 * (per the marketing urgency system in lib/marketing/*). Swap the
 * countdown to a real promo end date by editing CountdownTimer's
 * windowHours prop or hooking it to a real env-configured end.
 */
export function PromoBar() {
  return (
    <div
      role="region"
      aria-label="Shipping and payment policy"
      className={cn(
        'w-full border-b border-rule bg-navy text-white',
        'font-mono text-[10.5px] uppercase tracking-[0.22em]',
      )}
    >
      <div className="mx-auto flex h-9 max-w-[82rem] items-center justify-center gap-3 px-5 text-center">
        <span className="hidden sm:inline">Flat Rs. 250 shipping</span>
        <span aria-hidden="true" className="hidden text-cobalt-glow/60 sm:inline">
          ·
        </span>
        <span className="hidden sm:inline">Cash on delivery across Pakistan</span>
        <span aria-hidden="true" className="hidden text-cobalt-glow/60 sm:inline">
          ·
        </span>
        <CountdownTimer
          variant="inline"
          label="Offer ends in"
          windowHours={6}
          className="text-white [&_span.font-mono.uppercase]:text-white/80 [&_span.tabular-nums]:!text-cobalt-glow [&>span:first-child]:!bg-cobalt-glow"
        />
      </div>
    </div>
  );
}
