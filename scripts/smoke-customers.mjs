// Drives the Customers module + both deletion confirmation dialogs.
// Requires scripts/_seed-smoke.ts to have run first (reads _ids.json).
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const { ADMIN_EMAIL: EMAIL, ADMIN_PASSWORD: PASSWORD } = process.env;
const ids = JSON.parse(readFileSync('scripts/smoke-out/_ids.json', 'utf8'));

const fail = (m) => { console.error(`✗ ${m}`); process.exitCode = 1; };

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 900 } })).newPage();

// login
await page.goto(`${BASE}/admin/login`, { waitUntil: 'networkidle' });
await page.fill('#email', EMAIL);
await page.fill('#password', PASSWORD);
await page.click('button[type="submit"]');
await page.waitForURL(`${BASE}/admin`, { timeout: 15000 });
console.log('✓ logged in');

// customers list
await page.goto(`${BASE}/admin/customers`, { waitUntil: 'networkidle' });
const listOk = (await page.locator('body').innerText()).includes('Customers');
listOk ? console.log('✓ /admin/customers list renders') : fail('customers list missing');
await page.screenshot({ path: 'scripts/smoke-out/admin-customers.png', fullPage: true });

// customer detail
await page.goto(`${BASE}/admin/customers/${ids.customerId}`, { waitUntil: 'networkidle' });
const detailText = await page.locator('body').innerText();
if (detailText.includes('ZZ Smoke Customer') && detailText.includes('Profile')) console.log('✓ customer detail renders (profile + orders)');
else fail('customer detail missing profile');
await page.screenshot({ path: 'scripts/smoke-out/admin-customer-detail.png', fullPage: true });

// edit profile note — wait for the PATCH to resolve, then for the "Saved"
// indicator, before reloading (the first call compiles the route and is slow).
await page.fill('#notes', 'edited-by-smoke');
const patchDone = page.waitForResponse(
  (r) => r.url().includes(`/api/admin/customers/${ids.customerId}`) && r.request().method() === 'PATCH',
  { timeout: 20000 },
);
await page.getByRole('button', { name: 'Save profile' }).click();
await patchDone;
await page.getByText('Saved', { exact: true }).waitFor({ timeout: 5000 }).catch(() => {});
await page.reload({ waitUntil: 'networkidle' });
const noteVal = await page.locator('#notes').inputValue();
noteVal === 'edited-by-smoke' ? console.log('✓ profile edit persisted') : fail(`profile edit not saved (notes="${noteVal}")`);

// DELETE CUSTOMER — dialog must appear; cancel first, then confirm
await page.getByRole('button', { name: 'Delete customer' }).click();
await page.waitForTimeout(400);
let dialog = await page.getByRole('alertdialog').count();
dialog ? console.log('✓ delete-customer confirmation dialog appeared') : fail('no confirm dialog for customer delete');
await page.getByRole('button', { name: 'Cancel' }).click();
await page.waitForTimeout(300);
if ((await page.getByRole('alertdialog').count()) === 0) console.log('✓ cancel dismisses dialog (no deletion)');
else fail('dialog did not dismiss on cancel');
// now confirm for real
await page.getByRole('button', { name: 'Delete customer' }).click();
await page.waitForTimeout(300);
await page.locator('[data-slot="alert-dialog-content"]').getByRole('button', { name: 'Delete customer' }).click();
await page.waitForURL(`${BASE}/admin/customers`, { timeout: 10000 }).catch(() => {});
const afterDel = await page.goto(`${BASE}/admin/customers/${ids.customerId}`, { waitUntil: 'networkidle' });
afterDel?.status() === 404 ? console.log('✓ customer deleted (detail now 404)') : fail(`customer not deleted (status ${afterDel?.status()})`);

// DELETE ORDER — dialog + confirm
await page.goto(`${BASE}/admin/orders/${ids.orderId}`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Delete order' }).click();
await page.waitForTimeout(400);
dialog = await page.getByRole('alertdialog').count();
dialog ? console.log('✓ delete-order confirmation dialog appeared') : fail('no confirm dialog for order delete');
await page.locator('[data-slot="alert-dialog-content"]').getByRole('button', { name: 'Delete order' }).click();
await page.waitForURL(`${BASE}/admin/orders`, { timeout: 10000 }).catch(() => {});
const orderAfter = await page.goto(`${BASE}/admin/orders/${ids.orderId}`, { waitUntil: 'networkidle' });
orderAfter?.status() === 404 ? console.log('✓ order deleted (detail now 404)') : fail(`order not deleted (status ${orderAfter?.status()})`);

await browser.close();
console.log(process.exitCode ? '\n✗ customers/deletion smoke failed' : '\n✓ customers + deletion flows OK');
