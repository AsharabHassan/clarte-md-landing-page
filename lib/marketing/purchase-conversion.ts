import { eq } from 'drizzle-orm';
import { db, schema } from '@/lib/db/client';

export interface PurchaseConversionItem {
  id: string; // SKU — Google Ads product-level "item_id"
  name: string;
  qty: number;
  price: number;
}

export interface PurchaseConversionData {
  transactionId: string;
  value: number;
  currency: 'PKR';
  items: PurchaseConversionItem[];
  /** Unhashed — GTM SHA-256 hashes before sending (enhanced conversions). */
  email: string;
  /** E.164, e.g. +923001234567 — GTM hashes before sending. */
  phone: string;
}

/**
 * Normalize a Pakistani phone number to E.164 (+92…), the format Google
 * requires for enhanced-conversion phone matching. Customers typically
 * enter `03001234567`; some paste `+92…` or `92…`.
 */
export function toE164PK(raw: string): string {
  const digits = (raw || '').replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('92')) return `+${digits}`;
  if (digits.startsWith('0')) return `+92${digits.slice(1)}`;
  if (digits.length === 10 && digits.startsWith('3')) return `+92${digits}`;
  return `+${digits}`;
}

/**
 * Server-side fetch of everything Google Ads needs to record a purchase
 * conversion for `orderNumber`, including enhanced-conversion user data
 * (email/phone).
 *
 * Returns null unless the supplied phone's last 4 digits match the order —
 * the same ownership check the public order API uses — so the customer's
 * email/phone only ever reach the browser on their own just-placed order,
 * never via the sanitized public lookup endpoint.
 */
export async function getPurchaseConversionData(
  orderNumber: string,
  phoneInput: string,
): Promise<PurchaseConversionData | null> {
  const last4 = (phoneInput || '').replace(/\D/g, '').slice(-4);
  if (last4.length < 4) return null;

  const [order] = await db
    .select()
    .from(schema.orders)
    .where(eq(schema.orders.orderNumber, orderNumber))
    .limit(1);
  if (!order) return null;
  if (order.customerPhone.replace(/\D/g, '').slice(-4) !== last4) return null;

  const items = await db
    .select()
    .from(schema.orderItems)
    .where(eq(schema.orderItems.orderId, order.id));

  return {
    transactionId: order.orderNumber,
    value: order.totalPkr,
    currency: 'PKR',
    items: items.map((i) => ({
      id: i.sku,
      name: i.name,
      qty: i.qty,
      price: i.unitPricePkr,
    })),
    email: order.customerEmail.trim().toLowerCase(),
    phone: toE164PK(order.customerPhone),
  };
}
