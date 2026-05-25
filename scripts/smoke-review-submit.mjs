import { chromium } from 'playwright';
import postgres from 'postgres';
const BASE = 'http://localhost:3000';
const { ADMIN_EMAIL: AE, ADMIN_PASSWORD: AP } = process.env;
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const fail = (m) => { console.error('✗ ' + m); process.exitCode = 1; };
const PHONE = '03007654321', EMAIL = 'review-writer@example.com';
const MARK = `SUBMIT-REVIEW-${Date.now()}`;

const [cust] = await sql`INSERT INTO customers (name, phone, email, city) VALUES ('ZZ Review Writer', ${PHONE}, ${EMAIL}, 'Testville') RETURNING id`;
console.log('seeded customer', cust.id);

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
const page = await ctx.newPage();
let reviewId = null;
try {
  // 1) logged-out: click "Write a review" on storefront → should land on login w/ next
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const sec = page.locator('section:has-text("Real skin")');
  await sec.scrollIntoViewIfNeeded();
  await sec.getByRole('link', { name: /Write a review/i }).click();
  await page.waitForURL(/\/account\/login\?next=/, { timeout: 10000 });
  page.url().includes('next=%2Faccount%2Freviews') || page.url().includes('next=/account/reviews')
    ? console.log('✓ logged-out → redirected to login with next=review form')
    : fail('login next param missing: ' + page.url());

  // 2) login → should bounce to the review form
  await page.fill('#phone', PHONE); await page.fill('#email', EMAIL);
  await page.click('button[type="submit"]');
  await page.waitForURL(/\/account\/reviews\/new$/, { timeout: 15000 });
  console.log('✓ after login, landed on the review form');

  // 3) fill + submit
  await page.getByRole('button', { name: '5 stars' }).click();
  await page.locator('#protocol').selectOption('Clear Skin Protocol');
  await page.fill('#body', MARK + ' — genuinely cleared my skin over twelve weeks, very happy.');
  await page.getByRole('button', { name: 'Submit review' }).click();
  await page.getByText('review submitted', { exact: false }).waitFor({ timeout: 10000 });
  console.log('✓ review submitted (success state shown)');

  // 4) DB: pending, verified, source portal, linked to customer
  const [row] = await sql`SELECT id, status, verified, source, rating FROM reviews WHERE customer_id = ${cust.id} ORDER BY created_at DESC LIMIT 1`;
  reviewId = row?.id;
  (row && row.status === 'pending' && row.verified === true && row.source === 'portal' && row.rating === 5)
    ? console.log(`✓ DB row: status=pending verified=true source=portal rating=5`)
    : fail('review row wrong: ' + JSON.stringify(row));

  // 5) storefront does NOT show it (pending)
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  !((await sec.count()) && (await sec.innerText()).includes(MARK))
    ? console.log('✓ pending submission NOT on storefront')
    : fail('pending submission leaked to storefront');

  // 6) admin sees it in Pending
  const actx = await browser.newContext({ viewport: { width: 1280, height: 1000 } });
  const ap = await actx.newPage();
  await ap.goto(BASE + '/admin/login', { waitUntil: 'networkidle' });
  await ap.fill('#email', AE); await ap.fill('#password', AP);
  await ap.click('button[type="submit"]'); await ap.waitForURL(BASE + '/admin', { timeout: 15000 });
  await ap.goto(BASE + '/admin/reviews?status=pending', { waitUntil: 'networkidle' });
  (await ap.locator('[data-slot="card"]').filter({ hasText: MARK }).count())
    ? console.log('✓ submission appears in admin Pending queue')
    : fail('submission missing from admin pending');
  await actx.close();

  // 7) approve (DB) → storefront shows it
  await sql`UPDATE reviews SET status='approved' WHERE id = ${reviewId}`;
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  ((await sec.count()) && (await sec.innerText()).includes(MARK))
    ? console.log('✓ after approval, submission shows on storefront')
    : fail('approved submission not on storefront');
} catch (e) {
  fail('exception: ' + e.message);
} finally {
  await browser.close().catch(() => {});
  if (reviewId) await sql`DELETE FROM reviews WHERE id = ${reviewId}`;
  await sql`DELETE FROM reviews WHERE customer_id = ${cust.id}`;
  await sql`DELETE FROM customers WHERE id = ${cust.id}`;
  await sql`DELETE FROM order_lookups WHERE target_order_number LIKE 'portal-login:%' AND created_at > now() - interval '10 minutes'`;
  await sql.end();
  console.log('✓ cleaned up');
  console.log(process.exitCode ? '\n✗ review submission smoke failed' : '\n✓ review submission loop OK');
}
