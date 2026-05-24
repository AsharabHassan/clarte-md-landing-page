'use client';

import { useEffect, useState } from 'react';

/**
 * ⚠ MOCK URGENCY — fake "sale ends in" countdown.
 *
 * Per-session sticky countdown stored in localStorage so it doesn't
 * reset on every page refresh (which would tip the user off). When it
 * hits zero, restart at the default window.
 *
 * Swap to a real promo end-date by replacing `windowMs` with a fixed
 * Date.now() comparison against an env-configured end timestamp.
 */
const DEFAULT_WINDOW_MS = 6 * 60 * 60 * 1000; // 6 hours

const STORAGE_KEY = 'clarte:sale-end';

function getOrCreateEndTime(windowMs: number): number {
  if (typeof window === 'undefined') return Date.now() + windowMs;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const end = parseInt(raw, 10);
      if (Number.isFinite(end) && end > Date.now()) return end;
    }
  } catch {
    /* localStorage may be blocked in private mode */
  }
  const end = Date.now() + windowMs;
  try {
    window.localStorage.setItem(STORAGE_KEY, String(end));
  } catch {
    /* ignore */
  }
  return end;
}

export interface CountdownState {
  hours: number;
  minutes: number;
  seconds: number;
  totalMs: number;
  expired: boolean;
}

export function useSaleCountdown(windowMs = DEFAULT_WINDOW_MS): CountdownState {
  const [endTime, setEndTime] = useState<number | null>(null);
  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    setEndTime(getOrCreateEndTime(windowMs));
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [windowMs]);

  // Reset the window when it expires so the timer keeps showing urgency.
  useEffect(() => {
    if (!endTime) return;
    if (now >= endTime) {
      try {
        window.localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      setEndTime(getOrCreateEndTime(windowMs));
    }
  }, [now, endTime, windowMs]);

  if (!endTime) {
    // Before hydration, render the full window so SSR/CSR match cleanly.
    const totalMs = windowMs;
    return {
      hours: Math.floor(totalMs / 3_600_000),
      minutes: Math.floor((totalMs % 3_600_000) / 60_000),
      seconds: Math.floor((totalMs % 60_000) / 1000),
      totalMs,
      expired: false,
    };
  }

  const totalMs = Math.max(0, endTime - now);
  return {
    hours: Math.floor(totalMs / 3_600_000),
    minutes: Math.floor((totalMs % 3_600_000) / 60_000),
    seconds: Math.floor((totalMs % 60_000) / 1000),
    totalMs,
    expired: totalMs === 0,
  };
}
