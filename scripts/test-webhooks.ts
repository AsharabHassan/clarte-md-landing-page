/**
 * Sends a SAMPLE order.created payload to every configured webhook
 * URL in .env.local. Useful for:
 *  - Verifying a fresh Zapier hook URL is wired correctly
 *  - Confirming each Zap fans out to SMS / email / WhatsApp as expected
 *  - Sanity-checking before flipping ad traffic on
 *
 * Run: npx tsx --env-file=.env.local scripts/test-webhooks.ts
 */
import { dispatchWebhook } from '../lib/webhooks/dispatcher';
import type { OrderEvent, OrderEventPayload } from '../lib/webhooks/types';

const SAMPLE_ORDER = {
  id: '00000000-0000-0000-0000-000000000000',
  order_number: 'CLM-2026-TEST',
  status: 'pending',
  concern: 'acne',
  source_page: 'acne-protocol',
  customer: {
    name: 'Test Patient',
    phone: '03001234567',
    email: 'test@clartemd.com.pk',
  },
  shipping: {
    address: 'House 1, Street 1, Gulberg',
    city: 'Lahore',
    postal: '54000',
    notes: null,
  },
  payment_method: 'COD',
  payment_status: 'pending',
  items: [
    {
      sku: 'clear-skin-protocol',
      name: 'The Clear Skin Protocol · 4-product kit',
      qty: 1,
      unit_price_pkr: 6499,
      is_bundle: true,
    },
  ],
  totals: { subtotal_pkr: 6499, shipping_pkr: 0, total_pkr: 6499 },
  used_ai_preview: false,
  ai_session_id: null,
  created_at: new Date().toISOString(),
  admin_link: (process.env.NEXT_PUBLIC_SITE_URL || 'https://lp.clartemd.com.pk') + '/admin/orders/00000000-0000-0000-0000-000000000000',
};

const HOOKS: Array<{ envVar: string; event: OrderEvent; previousStatus?: string }> = [
  { envVar: 'WEBHOOK_ORDER_CREATED', event: 'order.created' },
  { envVar: 'WEBHOOK_ORDER_CONFIRMED', event: 'order.confirmed', previousStatus: 'pending' },
  { envVar: 'WEBHOOK_ORDER_DISPATCHED', event: 'order.dispatched', previousStatus: 'confirmed' },
  { envVar: 'WEBHOOK_ORDER_DELIVERED', event: 'order.delivered', previousStatus: 'dispatched' },
  { envVar: 'WEBHOOK_ORDER_CANCELLED', event: 'order.cancelled', previousStatus: 'pending' },
  { envVar: 'WEBHOOK_ORDER_REFUNDED', event: 'order.refunded', previousStatus: 'delivered' },
];

async function main() {
  console.log('Testing automation webhooks against .env.local config\n');

  let configured = 0;
  let skipped = 0;
  for (const { envVar, event, previousStatus } of HOOKS) {
    const url = process.env[envVar];
    if (!url || url.trim() === '') {
      console.log(`  ⏭  ${envVar}  (blank — skipped)`);
      skipped++;
      continue;
    }
    configured++;
    const payload: OrderEventPayload = {
      event,
      timestamp: new Date().toISOString(),
      order: {
        ...SAMPLE_ORDER,
        status: event === 'order.created' ? 'pending' : event.split('.')[1],
        ...(previousStatus ? { previous_status: previousStatus } : {}),
      },
    };
    console.log(`  ▶  ${envVar}  firing ${event}...`);
    await dispatchWebhook(url, payload as unknown as Record<string, unknown>, event);
  }

  console.log(`\nDone — ${configured} configured, ${skipped} skipped (blank).`);
}

main().then(() => process.exit(0)).catch((e) => { console.error(e); process.exit(1); });
