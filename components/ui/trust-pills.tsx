import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

/**
 * TrustPills — horizontal row of 3-5 single-word pills shown under the
 * PDP buy box. Universal pattern (EltaMD 7-icon row, Paula's Choice skin
 * type icons, Tatcha small-caps chain, COSRX credential pills).
 *
 * IMPORTANT: only pass claims Clarté can back. Per feedback_unverified_claims,
 * no ISO 22716, no GMP, no 2x refund. Stick to ingredient or sensory
 * claims that are factually true of each SKU: e.g. "Fragrance-Free",
 * "Non-Comedogenic", "Sensitive-Skin-Safe", "Dermatologist-Formulated",
 * "Made in Pakistan".
 */
export interface TrustPillsProps extends HTMLAttributes<HTMLUListElement> {
  pills: string[];
}

export function TrustPills({ pills, className, ...rest }: TrustPillsProps) {
  if (pills.length === 0) return null;
  return (
    <ul className={cn('flex flex-wrap items-center gap-2', className)} {...rest}>
      {pills.map((pill) => (
        <li
          key={pill}
          className={cn(
            'rounded-full border border-rule bg-card px-3 py-1',
            'text-xs font-medium text-ink-mute',
            'whitespace-nowrap',
          )}
        >
          {pill}
        </li>
      ))}
    </ul>
  );
}
