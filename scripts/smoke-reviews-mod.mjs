import { chromium } from 'playwright';
import postgres from 'postgres';
const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const { ADMIN_EMAIL: EMAIL, ADMIN_PASSWORD: PASSWORD } = process.env;
const sql = postgres(process.env.DATABASE_URL, { prepare: false });
const fail = (m) => { console.error('✗ ' + m); process.exitCode = 1; };
const MARK = `SMOKE-REVIEW-${Date.now()}`;

const [rev] = await sql`
  INSERT INTO reviews (name, location, rating, protocol, body, verified, status, source, review_date)
  VALUES ('ZZ Smoke Reviewer', 'Testville', 5, 'Clear Skin Protocol', ${MARK + ' — excellent results.'}, true, 'pending', 'seed', now())
  RETURNING id`;
console.log('seeded pending review', rev.id);

const dbStatus = async () => (await sql`SELECT status FROM reviews WHERE id = ${rev.id}`)[0]?.status;
const waitForStatus = async (expected, ms = 12000) => {
  const end = Date.now() + ms;
  while (Date.now() < end) {
    if ((await dbStatus()) === expected) return true;
    await new Promise((r) => setTimeout(r, 300));
  }
  return false;
};
const storefrontHasMark = async (page) => {
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  const sec = page.locator('section:has-text("Real skin")');
  return (await sec.count()) ? (await sec.innerText()).includes(MARK) : false;
};

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1000 } })).newPage();
try {
  (!(await storefrontHasMark(page))) ? console.log('✓ pending review NOT shown on storefront') : fail('pending leaked to storefront');

  await page.goto(BASE + '/admin/login', { waitUntil: 'networkidle' });
  await page.fill('#email', EMAIL); await page.fill('#password', PASSWORD);
  await page.click('button[type="submit"]'); await page.waitForURL(BASE + '/admin', { timeout: 15000 });

  const card = () => page.locator('[data-slot="card"]').filter({ hasText: MARK });

  // approve
  await page.goto(BASE + '/admin/reviews?status=pending', { waitUntil: 'networkidle' });
  (await card().count()) ? console.log('✓ pending review appears in admin') : fail('missing from admin pending');
  await page.screenshot({ path: 'scripts/smoke-out/admin-reviews.png', fullPage: true });
  await card().getByRole('button', { name: 'Approve', exact: true }).click();
  (await waitForStatus('approved')) ? console.log('✓ Approve set status=approved') : fail('approve did not persist');
  (await storefrontHasMark(page)) ? console.log('✓ approved review now shows on storefront') : fail('approved not on storefront');

  // disapprove
  await page.goto(BASE + '/admin/reviews?status=approved', { waitUntil: 'networkidle' });
  await card().getByRole('button', { name: 'Disapprove', exact: true }).click();
  (await waitForStatus('disapproved')) ? console.log('✓ Disapprove set status=disapproved') : fail('disapprove did not persist');
  (!(await storefrontHasMark(page))) ? console.log('✓ disapproved review hidden from storefront') : fail('disapproved still on storefront');

  // delete (confirm dialog)
  await page.goto(BASE + '/admin/reviews', { waitUntil: 'networkidle' });
  await card().getByRole('button', { name: 'Delete', exact: true }).click();
  await page.waitForTimeout(400);
  (await page.getByRole('alertdialog').count()) ? console.log('✓ delete confirm dialog appeared') : fail('no confirm dialog');
  await page.locator('[data-slot="alert-dialog-content"]').getByRole('button', { name: 'Delete review' }).click();
  await page.waitForTimeout(1800);
  ((await sql`SELECT 1 FROM reviews WHERE id = ${rev.id}`).length === 0) ? console.log('✓ review deleted from DB') : fail('review not deleted');
} catch (e) {
  fail('exception: ' + e.message);
} finally {
  await browser.close().catch(() => {});
  await sql`DELETE FROM reviews WHERE id = ${rev.id}`;
  await sql.end();
  console.log('✓ cleaned up');
  console.log(process.exitCode ? '\n✗ reviews moderation smoke failed' : '\n✓ reviews moderation OK');
}
