'use client';

import { useEffect, useRef, useState } from 'react';
import NumberFlow, { type Format } from '@number-flow/react';
import { useInView } from 'motion/react';
import { useReducedMotion } from './hooks';

/**
 * Animated number that counts up from 0 to the target value when it
 * scrolls into view. Wraps @number-flow/react. Reduced-motion shows the
 * final value instantly with no animation.
 */
export function NumberTicker({
  value,
  format,
  prefix,
  suffix,
  className,
}: {
  value: number;
  format?: Format;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();
  const [n, setN] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setN(value);
      return;
    }
    if (inView) setN(value);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <NumberFlow value={n} format={format} willChange />
      {suffix}
    </span>
  );
}
