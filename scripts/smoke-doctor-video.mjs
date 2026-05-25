// Confirms a dedicated doctor video actually loads (valid, playable file)
// on the product page and screenshots the section.
import { chromium } from 'playwright';

const BASE = process.env.SMOKE_BASE_URL || 'http://localhost:3000';
const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1280, height: 1200 } })).newPage();
let bad = false;

await page.goto(`${BASE}/products/reti`, { waitUntil: 'networkidle' });
const video = page.locator('video').first();
await video.waitFor({ timeout: 10000 });
const src = await video.getAttribute('src');
console.log(`video src = ${src}`);

// Force-load metadata and read duration — proves the mp4 is valid/decodable.
const info = await video.evaluate(async (el) => {
  const v = el;
  if (v.readyState < 1) {
    await new Promise((res) => {
      v.addEventListener('loadedmetadata', res, { once: true });
      v.load();
      setTimeout(res, 8000);
    });
  }
  return { readyState: v.readyState, duration: v.duration, w: v.videoWidth, h: v.videoHeight };
});
console.log(`readyState=${info.readyState} duration=${info.duration?.toFixed?.(1)}s dims=${info.w}x${info.h}`);

if (src?.includes('/videos/doctor/reti.mp4')) console.log('✓ PDP embeds the real video');
else { console.error('✗ wrong/missing src'); bad = true; }
if (info.duration > 0 && info.w > 0) console.log('✓ video metadata loaded (valid, playable file)');
else { console.error('✗ video did not load metadata'); bad = true; }

await page.screenshot({ path: 'scripts/smoke-out/pdp-doctor-video.png', fullPage: true });
await browser.close();
console.log(bad ? '\n✗ doctor video smoke failed' : '\n✓ doctor videos OK');
process.exit(bad ? 1 : 0);
