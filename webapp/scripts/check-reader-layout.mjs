// Optional all-book UI regression runner; uses isolated browser and passage storage.
import assert from 'node:assert/strict';
import { readFile, mkdir } from 'node:fs/promises';
const { webkit, chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await (process.env.BROWSER === 'chromium' ? chromium : webkit).launch(
  process.env.BROWSER_EXECUTABLE ? { executablePath: process.env.BROWSER_EXECUTABLE } : {});
const base = process.env.READER_URL || 'http://127.0.0.1:5190';
const shots = process.env.READER_SCREENSHOTS;
if (shots) await mkdir(shots, { recursive: true });
const sizes = [{width:390,height:844}, {width:320,height:568}, {width:667,height:375}, {width:568,height:320}, {width:1024,height:768}, {width:768,height:1024}];
const failures = [];
const artwork = JSON.parse(await readFile(new URL('../src/content/story_artwork.json', import.meta.url)));
async function ready(page) {
  await page.locator('.reader-toolbar').waitFor();
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(80);
}
async function toolbar(page) {
  const result = await page.evaluate(() => {
    const bar = document.querySelector('.reader-toolbar').getBoundingClientRect();
    const buttons = [...document.querySelectorAll('.reader-toolbar button')].filter(b => getComputedStyle(b).visibility !== 'hidden').map(b => b.getBoundingClientRect());
    return { height: bar.height, overflow: document.documentElement.scrollWidth > innerWidth + 1,
      outside: buttons.some(b => b.left < bar.left - 1 || b.right > bar.right + 1 || b.top < bar.top || b.bottom > bar.bottom + 1),
      tooSmall: buttons.some(b => b.width < 43.9 || b.height < 43.9),
      overlaps: buttons.some((a,i) => buttons.slice(i+1).some(b => a.right > b.left + 1 && b.right > a.left + 1 && a.bottom > b.top + 1 && b.bottom > a.top + 1)) };
  });
  assert.ok(result.height <= 67, `toolbar wraps: ${JSON.stringify(result)}`);
  assert.equal(result.overflow || result.outside || result.tooSmall || result.overlaps, false, JSON.stringify(result));
}
async function dialog(page, selector) {
  const metrics = await page.locator(selector).evaluate(d => {
    const r = d.getBoundingClientRect();
    const body = d.querySelector('.reading-settings__body');
    const done = d.querySelector('.reading-settings__header button:last-child').getBoundingClientRect();
    return { fits: r.left >= 0 && r.right <= innerWidth + 1 && r.top >= 0 && r.bottom <= innerHeight + 1,
      doneVisible: done.top >= r.top && done.bottom <= r.bottom + 1,
      bodyHeight: body.clientHeight, overflow: d.scrollWidth > d.clientWidth + 1 };
  });
  assert.ok(metrics.fits && metrics.doneVisible && !metrics.overflow && metrics.bodyHeight >= 65, JSON.stringify(metrics));
}
try {
 for (const story of ['the_can_opener','summoned_mage','space_walker']) {
  const data = JSON.parse(await readFile(new URL(`../src/data/stories/${story}.json`, import.meta.url)));
  const ending = Object.entries(data.scenes).find(([,s]) => s.ending)?.[0];
  const choices = Object.entries(data.scenes).sort(([,a],[,b]) => Object.keys(b.choices??{}).length-Object.keys(a.choices??{}).length)[0][0];
  for (const viewport of sizes) for (const scale of ['', '&large', '&system']) {
   const context = await browser.newContext({ viewport });
   const page = await context.newPage();
   page.setDefaultTimeout(6000);
   const errors = [];
   page.on('pageerror', error => errors.push(error.message));
   const visit = async (query = '', scene = data.start_scene) => { await page.goto(`${base}/test/browser/story-artwork.html?story=${story}&scene=${scene}${scale}${query}`); await ready(page); };
   const label = `${story} ${viewport.width}x${viewport.height} ${scale || 'default'}`;
   try {
    await visit(); await toolbar(page);
    assert.equal(await page.locator('.reader-choice-back').count(), 0, 'no undo before the first choice');
    const start = await page.locator('.reader-viewport').boundingBox();
    await visit('&history'); await toolbar(page);
    const history = await page.locator('.reader-viewport').boundingBox();
    assert.deepEqual(history, start, 'history must not move/resize the page');
    assert.equal(await page.locator('.reader-footer-previous .reader-choice-back').count(), 1);
    if (Number(await page.locator('.page-status').getAttribute('data-total')) > 1) {
      await page.locator('.reader-footer-next button').evaluate(b => b.click());
      await page.waitForTimeout(60);
      assert.equal(await page.locator('.reader-choice-back').count(), 0, 'undo only appears on the first page');
      await page.getByRole('button', {name:'Previous', exact:true}).click();
      await page.locator('.reader-choice-back').waitFor();
      // Clicking an offscreen footer at accessibility sizes scrolls the
      // document. Restore the audit's starting scroll before comparing boxes.
      await page.evaluate(() => window.scrollTo(0, 0));
    }
    await page.getByRole('button',{name:'Hide controls',exact:true}).click();
    assert.deepEqual(await page.locator('.reader-viewport').boundingBox(), history, 'hiding tools must not move/resize passage');
    await page.getByRole('button',{name:'Show controls',exact:true}).click();
    if (!scale) { const footer=await page.locator('.reader-footer').boundingBox(); assert.ok(footer.y+footer.height <= viewport.height+1, 'page footer pushed below screen'); }
    await page.getByRole('button',{name:'Reading settings',exact:true}).click();
    for (const section of ['Text','Page','Controls']) {
      await page.getByRole('tab',{name:section,exact:true}).click();
      await dialog(page,'.reading-settings--reader');
    }
    await page.getByRole('button',{name:'Done',exact:true}).click();
    assert.deepEqual(await page.locator('.reader-viewport').boundingBox(), history, 'settings return must retain layout');
    await page.locator('.bookmark-button').click();
    await dialog(page,'.passage-bookmarks');
    await page.getByRole('button',{name:'Done',exact:true}).click();
    if (shots && !scale && [390,667,1024].includes(viewport.width)) await page.screenshot({path:`${shots}/${story}-${viewport.width}-reading.png`,fullPage:true});
    await visit('&history&choices',choices); await toolbar(page);
    assert.equal(await page.locator('.reader-choice-back').count(), 0, 'undo is absent while choosing');
    for (const button of await page.locator('.choice-button').all()) {
      const box = await button.boundingBox();
      assert.ok(box.width >= 44 && box.height >= 44 && box.x >= 0 && box.x + box.width <= viewport.width + 1);
    }
    if (shots && !scale && viewport.width===390) await page.screenshot({path:`${shots}/${story}-choices.png`,fullPage:true});
    if (ending) {
      await visit('&history',ending);
      for (let i=0; i<300 && await page.locator('.reader-footer-next button').count(); i++) {
        await page.locator('.reader-footer-next button').evaluate(b=>b.click());
        await page.waitForTimeout(20);
      }
      await page.locator('.ending-actions').waitFor(); await toolbar(page);
      for(const button of await page.locator('.ending-actions button').all()) {
        await button.scrollIntoViewIfNeeded(); const box=await button.boundingBox();
        assert.ok(box.x>=0 && box.x+box.width<=viewport.width+1, 'ending action overflows');
      }
    }
    if (viewport.height === 320 && scale !== '&large') {
      await visit('&history', artwork[story][0].sceneId);
      const illustration = page.locator('.scene-image__open[tabindex="0"]').first();
      for (let i = 0; i < 40 && !await illustration.count(); i++) {
        await page.locator('.reader-footer-next button').evaluate(b => b.click());
        await page.waitForTimeout(40);
      }
      const originalPage = await page.locator('.page-status').getAttribute('data-page');
      await illustration.click();
      assert.ok(await page.locator('.image-viewer__canvas').evaluate(e => e.clientHeight >= 80), 'viewer tools must leave room for the illustration');
      await page.getByRole('button', {name:'Zoom in', exact:true}).click();
      assert.equal(await page.locator('.image-viewer__canvas').getAttribute('data-zoom'), '1.50');
      await page.setViewportSize({width:viewport.height, height:viewport.width});
      await page.getByRole('button', {name:'Fit image', exact:true}).click();
      await page.setViewportSize(viewport);
      await page.waitForTimeout(150);
      await page.getByRole('button', {name:'Close', exact:true}).click();
      assert.equal(await page.locator('.page-status').getAttribute('data-page'), originalPage, 'viewer/rotation return to the same page');
    }
    assert.deepEqual(errors,[]);
    console.log(`PASS ${label}: toolbar, settings, bookmarks, choices, ending`);
   } catch(error) { failures.push(`${label}: ${error.message}`); console.error(`FAIL ${failures.at(-1)}`); }
   finally { await context.close(); }
  }
 }
} finally { await browser.close(); }
assert.deepEqual(failures, []);
