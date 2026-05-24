'use client';

import dynamic from 'next/dynamic';

/**
 * Client-side wrapper for OrderTicker.
 *
 * The actual OrderTicker is a marketing toast that polls + animates;
 * it has no SEO value and only needs to mount after hydration.
 *
 * Why this wrapper exists: `next/dynamic` with `{ ssr: false }` is not
 * allowed in Server Components in Next.js 15. Wrapping it in a tiny
 * client module is the documented workaround.
 *
 * Net effect: OrderTicker's JS ships as a separate chunk loaded after
 * the page is interactive, and never blocks first paint.
 */
const OrderTicker = dynamic(
  () => import('./OrderTicker').then((m) => m.OrderTicker),
  { ssr: false },
);

export function OrderTickerLoader() {
  return <OrderTicker />;
}
