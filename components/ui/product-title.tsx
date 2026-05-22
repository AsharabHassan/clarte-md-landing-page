import { cn } from '@/lib/utils';
import { Eyebrow } from './eyebrow';

/**
 * ProductTitle — the Tatcha pattern. Italic Fraunces product name as
 * identity signal; Plus Jakarta sans descriptor below; optional
 * JetBrains Mono eyebrow above. The single highest-leverage typography
 * move in the segment (see research synthesis §2.2).
 *
 * Composes into PDP buy box, protocol page hero, and any place a SKU
 * needs to read as a named character rather than a catalog row.
 */
export interface ProductTitleProps {
  name: string;
  descriptor?: string;
  eyebrow?: string;
  className?: string;
  /** Rendering element for the name. Default h1; pass h2/h3 inside sections. */
  as?: 'h1' | 'h2' | 'h3';
}

export function ProductTitle({
  name,
  descriptor,
  eyebrow,
  className,
  as: Heading = 'h1',
}: ProductTitleProps) {
  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          'font-display italic text-navy',
          // Heading scale — calmer than display text; product titles aren't billboards
          Heading === 'h1' && 'text-3xl md:text-4xl leading-[1.15]',
          Heading === 'h2' && 'text-2xl md:text-3xl leading-[1.2]',
          Heading === 'h3' && 'text-xl md:text-2xl leading-[1.25]',
        )}
      >
        {name}
      </Heading>
      {descriptor && (
        <p className="font-body text-base text-ink-mute leading-relaxed">{descriptor}</p>
      )}
    </div>
  );
}
