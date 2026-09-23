// Optional browser regression runner. Uses Playwright installed by the developer,
// never adventure saves. Start Vite first; see README for configuration.
import assert from 'node:assert/strict';
const { webkit, chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browserType = process.env.BROWSER === 'chromium' ? chromium : webkit;
const browser = await browserType.launch(process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {});
const base = process.env.READER_URL || 'http://127.0.0.1:5190';
try {
  for (const viewport of [{ width: 667, height: 375 }, { width: 568, height: 320 }, { width: 1024, height: 768 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    let releaseImage;
    await page.route('**/images/**', async route => {
      await new Promise(resolve => { releaseImage = resolve; });
      await route.continue();
    }, { times: 1 });
    await page.goto(`${base}/test/browser/story-artwork.html?scene=scene_001&animated`, { waitUntil: 'domcontentloaded' });
    await page.locator('.page-status').waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const bounds = await page.locator('.reader-viewport').boundingBox();
    const x = bounds.x + bounds.width * .85, y = bounds.y + 50;
    await page.mouse.move(x, y);
    await page.mouse.down();
    await page.mouse.move(x - 160, y, { steps: 10 });
    assert.equal(await page.locator('.page-turn-overlay').count(), 1);
    assert.ok(releaseImage, 'a real image request must be held');
    releaseImage();
    await page.evaluate(() => Promise.all([...document.images].map(image => image.decode().catch(() => {}))));
    await page.waitForTimeout(100);
    assert.equal(await page.locator('.page-turn-overlay').count(), 1, 'late image load must not cancel the drag');
    await page.mouse.move(x - 250, y, { steps: 4 });
    await page.mouse.up();
    await page.waitForTimeout(500);
    assert.equal(await page.locator('.page-status').getAttribute('data-page'), '2');
    assert.equal(await page.locator('.page-turn-overlay').count(), 0);
    for (const scene of ['scene_006', 'scene_036', 'scene_066']) {
      await page.goto(`${base}/test/browser/story-artwork.html?scene=${scene}&large`);
      await page.locator('.page-status').waitFor();
      await page.evaluate(() => document.fonts.ready);
      await page.waitForTimeout(100);
      const sizes = await page.evaluate(() => {
        const viewport = document.querySelector('.reader-viewport');
        return [...document.querySelectorAll('.scene-image--inline img')].map(image => ({
          height: image.getBoundingClientRect().height, limit: viewport.clientHeight * .46,
          ratio: image.getBoundingClientRect().width / image.getBoundingClientRect().height,
          expected: Number(image.getAttribute('width')) / Number(image.getAttribute('height')),
        }));
      });
      assert.ok(sizes.length);
      for (const size of sizes) {
        assert.ok(size.height <= size.limit, 'art should leave room for prose');
        assert.ok(Math.abs(size.ratio - size.expected) < .01, 'no reserved letterbox gap');
      }
    }
    assert.deepEqual(errors, []);
    console.log(`PASS delayed-load swipe and illustration proportions ${viewport.width}x${viewport.height}`);
    await page.close();
  }
} finally { await browser.close(); }
