'use client';

import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotion } from './hooks';
import { cn } from '@/lib/utils';

/**
 * Thin progress bar that tracks page scroll. Pin to top of any container
 * by giving it `fixed top-0`. Color via `className`.
 */
export function ScrollProgress({
  className,
  height = 2,
}: {
  className?: string;
  height?: number;
}) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.6,
  });
  const reduced = useReducedMotion();

  if (reduced) return null;

  return (
    <motion.div
      style={{ scaleX, height, transformOrigin: '0% 50%' }}
      className={cn(
        'fixed left-0 right-0 top-0 z-[60] origin-left bg-cobalt',
        className,
      )}
      aria-hidden="true"
    />
  );
}
