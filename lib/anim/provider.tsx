'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './hooks';

/**
 * Sitewide smooth-scroll provider.
 *
 * Disabled when:
 *   - prefers-reduced-motion is on (accessibility),
 *   - the primary pointer is coarse (mobile/tablet) — native scroll is
 *     better-engineered for touch and the RAF cost (~1ms/frame) is
 *     wasted on devices that don't benefit from interpolated easing.
 *
 * The hook order here matters: we must call useReducedMotion at the
 * top level so the render is consistent, but the actual Lenis startup
 * happens inside the effect so we can branch on a media-query check
 * that's only safe to evaluate post-mount.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;

    // Skip on touch-first devices — native scroll is smoother there
    // and saves a 60fps RAF loop on the main thread.
    if (window.matchMedia('(pointer: coarse)').matches) return;

    if ((window as unknown as { __lenis?: Lenis }).__lenis) return;

    const lenis = new Lenis({
      duration: 1.05,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
    });
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    let raf = 0;
    function tick(time: number) {
      lenis.raf(time);
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, [reduced]);

  return <>{children}</>;
}
