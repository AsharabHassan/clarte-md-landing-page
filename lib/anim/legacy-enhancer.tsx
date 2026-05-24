'use client';

import { useEffect } from 'react';
import { useReducedMotion } from './hooks';

/**
 * Mount inside `.protocol-page-redesigned` after the legacy body has
 * rendered. Finds top-level <section>s inside `.legacy-body`, marks them
 * with data-reveal-in, then flips to true when they intersect viewport.
 *
 * The CSS in legacy-cinematic.css drives the fade-up via the attribute
 * selector. No motion library overhead — pure IntersectionObserver.
 */
export function LegacyEnhancer() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const body = document.querySelector('.protocol-page-redesigned .legacy-body');
    if (!body) return;
    const sections = body.querySelectorAll<HTMLElement>(':scope > section');

    if (reduced) {
      // Reduced motion: leave sections in their default fully-visible state.
      return;
    }

    // First pass: mark every section as `false` (the dimmed pre-reveal state).
    // We use rAF so the browser commits the dimmed style before the observer
    // flips visible sections to `true` in the same frame.
    sections.forEach((s) => s.setAttribute('data-reveal-in', 'false'));

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).setAttribute('data-reveal-in', 'true');
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.05, rootMargin: '0px 0px -8% 0px' },
    );

    requestAnimationFrame(() => {
      sections.forEach((s) => obs.observe(s));
    });

    // Safety net: any section still dimmed after 4s flips to revealed.
    // Prevents stuck-dim states if observer never fires (e.g. user lands
    // mid-page via anchor link, or fonts shift the layout late).
    const safety = window.setTimeout(() => {
      sections.forEach((s) => {
        if (s.getAttribute('data-reveal-in') !== 'true') {
          s.setAttribute('data-reveal-in', 'true');
        }
      });
    }, 4000);

    return () => {
      obs.disconnect();
      window.clearTimeout(safety);
    };
  }, [reduced]);

  return null;
}
