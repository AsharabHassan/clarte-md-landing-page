// End-to-end customer portal smoke. Seeds a throwaway customer + order
// via postgres, drives the portal in a browser (incl. a LIVE status
// update mid-poll), checks auth rejection + cross-customer isolation,
// then cleans up. Run: node --env-file=.env.local scripts/smoke-portal.mjs
import { chromium } from 'playwright';
import postgres from 'postgres';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const fail = (m) => { console.error(`✗ ${m}`); process.exitCode = 1; };

const PHONE = '03009998887';
const EMAIL = 'portal-smoke@example.com';
const TAG = `PORTAL-${Date.now()}`;

// ── seed ──
const [cust] = await sql`
  INSERT INTO customers (name, phone, email, city) VALUES ('Portal Smoke', ${PHONE}, ${EMAIL}, 'Lahore')
  RETURNING id`;
const [order] = await sql`
  INSERT INTO orders (order_number, customer_id, status, source_page, customer_name, customer_phone,
    customer_email, shipping_address, shipping_city, payment_method, payment_status,
    subtotal_pkr, shipping_pkr, total_pkr, bundle_in_cart, used_ai_preview, client_ip_hash)
  VALUES (${TAG}, ${cust.id}, 'pending', 'smoke', 'Portal Smoke', ${PHONE}, ${EMAIL},
    'House 7', 'Lahore', 'cod', 'pending', 6499, 250, 6749, false, false, 'smoke')
  RETURNING id`;
await sql`INSERT INTO order_items (order_id, sku, name, qty, unit_price_pkr, is_bundle)
          VALUES (${order.id}, 'clear-skin-protocol', 'The Clear Skin Protocol', 1, 6499, true)`;
const [foreign] = await sql`SELECT order_number FROM orders WHERE customer_id IS DISTINCT FROM ${cust.id} LIMIT 1`;
console.log(`seeded customer=${cust.id} order=${TAG} foreignOrder=${foreign?.order_number ?? '(none)'}`);

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1200, height: 1000 } })).newPage();

try {
  // ── login ──
  await page.goto(`${BASE}/account/login`, { waitUntil: 'networkidle' });
  await page.fill('#phone', PHONE);
  await page.fill('#email', EMAIL);
  await page.click('button[type="submit"]');
  await page.waitForURL(`${BASE}/account/orders`, { timeout: 15000 });
  console.log('✓ login redirects to orders');

  // ── orders list ──
  const listText = await page.locator('body').innerText();
  listText.includes(TAG) ? console.log('✓ seeded order shows in list') : fail('order missing from list');
  await page.screenshot({ path: 'scripts/smoke-out/portal-orders.png', fullPage: true });

  // ── order detail + tracking placeholder ──
  await page.goto(`${BASE}/account/orders/${TAG}`, { waitUntil: 'networkidle' });
  let body = await page.locator('body').innerText();
  body.includes('Status & tracking') && body.includes('Order placed')
    ? console.log('✓ order detail renders status stepper')
    : fail('status stepper missing');
  body.toLowerCase().includes('once your order is dispatched')
    ? console.log('✓ tracking placeholder shown (not yet dispatched)')
    : fail('tracking placeholder missing');

  // ── LIVE update: change status+tracking in DB, expect poll to update UI ──
  await sql`UPDATE orders SET status='dispatched', courier='TCS', tracking_number='LIVE-TRACK-123', updated_at=now() WHERE id=${order.id}`;
  await page.locator('text=LIVE-TRACK-123').first().waitFor({ timeout: 25000 });
  console.log('✓ LIVE poll picked up dispatch + tracking number (no reload)');
  await page.screenshot({ path: 'scripts/smoke-out/portal-order-detail.png', fullPage: true });

  // ── profile edit ──
  await page.goto(`${BASE}/account/profile`, { waitUntil: 'networkidle' });
  await page.fill('#city', 'PortalTest');
  const patch = page.waitForResponse((r) => r.url().includes('/api/account/profile') && r.request().method() === 'PATCH', { timeout: 15000 });
  await page.getByRole('button', { name: 'Save changes' }).click();
  await patch;
  await page.getByText('Saved', { exact: true }).waitFor({ timeout: 5000 }).catch(() => {});
  await page.reload({ waitUntil: 'networkidle' });
  (await page.locator('#city').inputValue()) === 'PortalTest'
    ? console.log('✓ profile edit persisted')
    : fail('profile edit not saved');

  // phone must be locked (read-only)
  (await page.locator('#phone').isEditable()) === false
    ? console.log('✓ phone field is locked (login identity)')
    : fail('phone field should be read-only');

  // ── cross-customer isolation ──
  if (foreign?.order_number) {
    const res = await page.goto(`${BASE}/account/orders/${foreign.order_number}`, { waitUntil: 'networkidle' });
    res?.status() === 404 ? console.log("✓ cannot view another customer's order (404)") : fail(`foreign order not blocked (status ${res?.status()})`);
  }

  // ── logout + wrong credentials ──
  await page.goto(`${BASE}/account/orders`, { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Sign out' }).click();
  await page.waitForURL(`${BASE}/account/login`, { timeout: 10000 });
  console.log('✓ sign out returns to login');
  await page.fill('#phone', PHONE);
  await page.fill('#email', 'wrong@example.com');
  await page.click('button[type="submit"]');
  await page.locator('text=/couldn.t match|failed/i').first().waitFor({ timeout: 8000 });
  console.log('✓ wrong credentials rejected with error');
} finally {
  await browser.close();
  // ── cleanup ──
  await sql`DELETE FROM orders WHERE id=${order.id}`;
  await sql`DELETE FROM customers WHERE id=${cust.id}`;
  await sql`DELETE FROM order_lookups WHERE target_order_number LIKE 'portal-login:%' AND created_at > now() - interval '10 minutes'`;
  await sql.end();
  console.log('✓ cleaned up seeded data');
  console.log(process.exitCode ? '\n✗ portal smoke failed' : '\n✓ portal flows OK');
}
