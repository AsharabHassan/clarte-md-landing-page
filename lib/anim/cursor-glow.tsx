'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from './hooks';

export function CursorGlow({
  color = 'rgba(138, 176, 224, 0.18)',
  size = 480,
}: {
  color?: string;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(hover: none)').matches) return;

    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    let raf = 0;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;

    function onMove(e: MouseEvent) {
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      targetX = e.clientX - r.left;
      targetY = e.clientY - r.top;
    }
    function loop() {
      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      if (el) {
        el.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    }
    parent.addEventListener('mousemove', onMove);
    raf = requestAnimationFrame(loop);
    return () => {
      parent.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduced, size]);

  if (reduced) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-0 rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color}, transparent 65%)`,
        willChange: 'transform',
      }}
    />
  );
}
