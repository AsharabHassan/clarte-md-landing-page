'use client';

import { useEffect } from 'react';

interface PurchaseItem {
  id: string;
  name: string;
  qty: number;
  price: number;
}

interface PurchaseConversionProps {
  transactionId: string;
  value: number;
  currency: string;
  items: PurchaseItem[];
  /** Unhashed email — GTM hashes for enhanced conversions. */
  email?: string;
  /** E.164 phone — GTM hashes for enhanced conversions. */
  phone?: string;
}

/**
 * Fires a single GTM `purchase` event for Google Ads conversion tracking
 * (Option A — counted when the COD order is placed). Renders nothing.
 *
 * The event is consumed in GTM (container GTM-5NP9NGPD) by a Google Ads
 * Conversion Tracking tag on a Custom Event trigger named `purchase`:
 *   - Conversion Value  → {{DLV - value}}
 *   - Transaction ID    → {{DLV - transaction_id}}   (also Google's dedup key)
 *   - Currency          → PKR  (or {{DLV - currency}})
 *   - Enhanced conversions (User-Provided Data, manual mode):
 *       Email → {{DLV - email}}   Phone → {{DLV - phone}}
 *   - Product-level sales data reads ecommerce.items[].item_id.
 *
 * Dedup: a sessionStorage flag stops a page refresh from re-pushing;
 * Google Ads independently dedups on transaction_id as a backstop.
 *
 * email/phone are sent UNHASHED on purpose — GTM SHA-256 hashes them in
 * the browser before they leave. Do not hash here.
 */
export function PurchaseConversion({
  transactionId,
  value,
  currency,
  items,
  email,
  phone,
}: PurchaseConversionProps) {
  useEffect(() => {
    if (!transactionId) return;

    const key = `clarte:purchase:${transactionId}`;
    try {
      if (sessionStorage.getItem(key)) return;
      sessionStorage.setItem(key, '1');
    } catch {
      // sessionStorage blocked (private mode / cookies off) — proceed;
      // Google's transaction_id dedup still prevents double-counting.
    }

    const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
    w.dataLayer = w.dataLayer || [];
    // Reset any prior ecommerce object so stale items can't merge in.
    w.dataLayer.push({ ecommerce: null });
    w.dataLayer.push({
      event: 'purchase',
      transaction_id: transactionId,
      value,
      currency,
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      ecommerce: {
        transaction_id: transactionId,
        value,
        currency,
        items: items.map((i) => ({
          item_id: i.id,
          item_name: i.name,
          quantity: i.qty,
          price: i.price,
        })),
      },
    });
  }, [transactionId, value, currency, items, email, phone]);

  return null;
}
