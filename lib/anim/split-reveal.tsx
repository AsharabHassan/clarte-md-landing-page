'use client';

import { motion } from 'motion/react';
import { useReducedMotion } from './hooks';
import { cn } from '@/lib/utils';

interface SplitRevealProps {
  text: string;
  /** Tag to render the wrapper as. Inline by default. */
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span' | 'div';
  className?: string;
  /** Per-word stagger delay in seconds. */
  stagger?: number;
  /** Base delay before the first word animates. */
  baseDelay?: number;
  /** Direction the words travel in (default 'up'). */
  from?: 'up' | 'down';
  /** Wrap each word in an em via `*word*` syntax — italic-Fraunces moments. */
  italicMarkers?: boolean;
}

/**
 * Splits text into per-word spans and stagger-reveals them on mount.
 * Use for headlines that need a "rolled-out" cinematic entrance.
 *
 * Each word is wrapped in inline-block + overflow-hidden so the translate
 * looks like it slides up from behind the line below.
 *
 * `italicMarkers` lets you mark words with asterisks (`*word*`) that
 * render as `<em>` — matches our Fraunces italic emphasis pattern.
 */
interface Token {
  text: string;
  italic: boolean;
}

/**
 * Parse `text` into ordered word/whitespace tokens, honoring `*…*` italic
 * runs that may span multiple words. The asterisks are stripped from the
 * output text.
 */
function tokenize(text: string, italicMarkers: boolean): Token[] {
  if (!italicMarkers) {
    return text.split(/(\s+)/).map((t) => ({ text: t, italic: false }));
  }
  const tokens: Token[] = [];
  const segmentRe = /\*([^*]+)\*|([^*]+)/g;
  let m: RegExpExecArray | null;
  while ((m = segmentRe.exec(text)) !== null) {
    const [, italicSeg, plainSeg] = m;
    const seg = italicSeg ?? plainSeg ?? '';
    if (!seg) continue;
    for (const piece of seg.split(/(\s+)/)) {
      if (piece) tokens.push({ text: piece, italic: italicSeg !== undefined });
    }
  }
  return tokens;
}

export function SplitReveal({
  text,
  as = 'span',
  className,
  stagger = 0.06,
  baseDelay = 0,
  from = 'up',
  italicMarkers = false,
}: SplitRevealProps) {
  const reduced = useReducedMotion();
  const Tag = motion[as] as typeof motion.span;
  const tokens = tokenize(text, italicMarkers);
  const cleanLabel = text.replace(/\*/g, '');
  const y = from === 'up' ? '110%' : '-110%';

  if (reduced) {
    return (
      <Tag className={className}>
        {tokens.map((t, i) =>
          t.italic && !/^\s+$/.test(t.text) ? (
            <em key={i}>{t.text}</em>
          ) : (
            <span key={i}>{t.text}</span>
          ),
        )}
      </Tag>
    );
  }

  let wordIdx = 0;
  return (
    <Tag className={className} aria-label={cleanLabel}>
      {tokens.map((t, i) => {
        if (/^\s+$/.test(t.text)) return <span key={i}>{t.text}</span>;
        const idx = wordIdx;
        wordIdx += 1;
        return (
          <span
            key={i}
            aria-hidden="true"
            className={cn('inline-block overflow-hidden align-bottom', t.italic && 'italic')}
            style={{ verticalAlign: 'baseline' }}
          >
            <motion.span
              className="inline-block"
              initial={{ y, opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              transition={{
                duration: 0.85,
                delay: baseDelay + idx * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t.text}
            </motion.span>
          </span>
        );
      })}
    </Tag>
  );
}
