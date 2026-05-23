import { cn } from '@/lib/utils';

/**
 * Sticky promo band that sits above the main nav.
 *
 * Per `feedback_unverified_claims` and `feedback_cod_policy`:
 *   - NEVER use this slot for a discount, threshold, or
 *     "open before paying" promise.
 *   - The two facts shown here are the only two backable claims
 *     we surface site-wide: flat Rs. 250 shipping and cash on
 *     delivery. Both are independently verified at /api/create-order
 *     and reflected in the order confirmation.
 *
 * Composition follows the 5-of-8 reference brands that run a
 * promo above the header — single line, no rotation, mono type,
 * navy on warm cream so it reads as a trust signal not retail noise.
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
        <span>Flat Rs. 250 shipping</span>
        <span aria-hidden="true" className="text-cobalt-glow/60">
          ·
        </span>
        <span>Cash on delivery across Pakistan</span>
      </div>
    </div>
  );
}
