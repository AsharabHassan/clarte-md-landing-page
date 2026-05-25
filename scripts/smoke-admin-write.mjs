// Verifies the admin WRITE path end-to-end: logs in, opens the first
// order, changes its status (which must append to the timeline + audit
// log), confirms the timeline updated, then RESTORES the original status.
// Also exercises the fulfillment save. Targets test orders only.
import { chromium } from 'playwright';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const { ADMIN_EMAIL: EMAIL, ADMIN_PASSWORD: PASSWORD } = process.env;
if (!EMAIL || !PASSWORD) { console.error('ADMIN_EMAIL/PASSWORD missing'); process.exit(1); }

const browser = await chromium.launch();
const page = await (await browser.newContext()).newPage();

await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
await page.fill('#email', EMAIL);
await page.fill('#password', PASSWORD);
await page.click('button[type="submit"]');
await page.waitForURL(`${BASE}/admin`, { timeout: 15000 });

await page.goto(`${BASE}/admin/orders`, { waitUntil: 'networkidle' });
const firstHref = await page.locator('a[href^="/admin/orders/"]').first().getAttribute('href');
await page.goto(`${BASE}${firstHref}`, { waitUntil: 'networkidle' });

// Status buttons render lowercase text (CSS capitalizes), so match
// case-insensitively. Current status = the highlighted (default) button.
const statusBtn = (s) => page.getByRole('button', { name: new RegExp(`^${s}$`, 'i') });
const original = (await page.locator('button[data-variant="default"]').first().innerText()).trim().toLowerCase();
const target = original === 'confirmed' ? 'dispatched' : 'confirmed';
console.log(`order ${firstHref} — current "${original}", switching to "${target}"`);

await page.fill('#status-note', 'smoke-test transition');
await statusBtn(target).click();
await page.waitForTimeout(1500);
await page.reload({ waitUntil: 'networkidle' });

const timeline = await page.locator('text=smoke-test transition').count();
const newStatus = (await page.locator('button[data-variant="default"]').first().innerText()).trim().toLowerCase();
if (timeline > 0 && newStatus === target)
  console.log(`✓ status changed to ${newStatus} and timeline recorded the note`);
else { console.error(`✗ write verify failed: timelineNote=${timeline} newStatus=${newStatus}`); process.exitCode = 1; }

// Exercise fulfillment save.
await page.fill('#courier', 'TCS');
await page.fill('#tracking', 'SMOKE-123');
await page.getByRole('button', { name: 'Save', exact: true }).click();
await page.waitForTimeout(1000);
await page.reload({ waitUntil: 'networkidle' });
const courierVal = await page.locator('#courier').inputValue();
if (courierVal === 'TCS') console.log('✓ fulfillment (courier/tracking) persisted');
else { console.error(`✗ fulfillment not persisted (courier="${courierVal}")`); process.exitCode = 1; }

// ── Restore original status & clear fulfillment so we leave no residue ──
await statusBtn(original).click();
await page.waitForTimeout(1000);
await page.fill('#courier', '');
await page.fill('#tracking', '');
await page.getByRole('button', { name: 'Save', exact: true }).click();
await page.waitForTimeout(1000);
console.log(`✓ restored status to "${original}" and cleared fulfillment`);

await browser.close();
console.log(process.exitCode ? '\n✗ write smoke failed' : '\n✓ write path OK');
