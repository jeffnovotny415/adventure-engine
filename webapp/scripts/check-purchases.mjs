import assert from 'node:assert/strict';
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser = await webkit.launch();
const base = process.env.READER_URL || 'http://127.0.0.1:5190';
const sizes = [{width:568,height:320}, {width:667,height:375}, {width:390,height:844},
  {width:320,height:568}, {width:1024,height:768}, {width:768,height:1024}];
const books = ['the_can_opener', 'summoned_mage', 'space_walker'];
const errors = [];
let layouts = 0, flows = 0;
async function fixture(story, extra = '', viewport = sizes[0]) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage(); page.setDefaultTimeout(8000);
  page.on('pageerror', e => errors.push(e.message));
  await page.goto(`${base}/test/browser/purchases.html?story=${story}${extra}`);
  await page.locator('.book-bar').first().waitFor();
  return { page, context };
}
async function resume(page) {
  await page.locator('.book-bookmark').click();
  await page.getByRole('button', {name:'Continue reading',exact:true}).click();
}
async function boundary(page, story) {
  await resume(page);
  await page.locator('.choice-button').nth(story === 'the_can_opener' ? 1 : 0).click();
  await page.locator('.library-unlock[open]').waitFor();
}
const save = page => page.evaluate(() => localStorage.getItem('paths_of_wonder_save'));
async function checkDialog(page) {
  const result = await page.locator('.library-unlock').evaluate(d => {
    const r = d.getBoundingClientRect(), b = d.querySelector('.reading-settings__body');
    const close = d.querySelector('header button').getBoundingClientRect();
    return { fits:r.left >= 0 && r.top >= 0 && r.right <= innerWidth+1 && r.bottom <= innerHeight+1,
      overflow:d.scrollWidth > d.clientWidth+1, body:b.clientHeight,
      close:close.width >= 44 && close.height >= 44 && close.bottom <= r.bottom,
      buttons:[...d.querySelectorAll('button')].every(x => x.getBoundingClientRect().height >= 44) };
  });
  assert.ok(result.fits && result.close && !result.overflow && result.body >= 65 && result.buttons, JSON.stringify(result));
}
try {
  for (const story of books) for (const viewport of sizes) for (const scale of [1, 53/17]) {
    const {page,context} = await fixture(story, `&scale=${scale}`, viewport);
    await boundary(page,story); await checkDialog(page);
    assert.equal(await page.getByRole('button',{name:'Developer Test Mode',exact:true}).count(),0);
    await page.getByRole('button',{name:'Close library unlock',exact:true}).click();
    await page.locator('.decision-page').waitFor();
    layouts++; await context.close();
  }
  for (const story of books) {
    const {page,context} = await fixture(story);
    await boundary(page,story); const before = await save(page); assert.ok(before);
    await page.getByRole('button',{name:'Unlock all three books — $4.99',exact:true}).click();
    await page.locator('.library-unlock').waitFor({state:'detached'});
    await page.locator('.reader-viewport').waitFor();
    assert.notEqual(await save(page), before);
    assert.equal(await page.evaluate(() => window.purchaseTest.calls),1);
    await page.evaluate(() => window.purchaseTest.revoke());
    await page.locator('.library-unlock').waitFor();
    assert.equal(await page.locator('.reader-viewport').count(),0,'Revocation hides protected content');
    flows++; await context.close();
  }
  for (const outcome of ['cancelled','pending','error','verification_failed']) {
    const {page,context} = await fixture('space_walker',`&outcome=${outcome}`);
    await boundary(page,'space_walker'); const before = await save(page);
    await page.getByRole('button',{name:'Unlock all three books — $4.99',exact:true}).click();
    await page.waitForFunction(() => !document.querySelector('.library-unlock__buy').disabled);
    assert.equal(await save(page), before);
    if (outcome === 'pending') {
      await page.getByRole('button',{name:'Close library unlock',exact:true}).click();
      await page.evaluate(() => window.purchaseTest.approve());
      assert.equal(await save(page),before,'Closed request must not auto-navigate on late approval');
      await page.locator('.choice-button').first().click();
      await page.locator('.reader-viewport').waitFor();
    }
    flows++; await context.close();
  }
  for (const extra of ['&unavailable','&restricted']) {
    const {page,context} = await fixture('summoned_mage',extra);
    await boundary(page,'summoned_mage');
    assert.equal(await page.locator('.library-unlock__buy').isDisabled(),true);
    await page.getByRole('button',{name:'Restore purchases',exact:true}).click();
    await page.locator('.library-unlock').waitFor({state:'detached'});
    await page.locator('.reader-viewport').waitFor();
    flows++; await context.close();
  }
  {
    const {page,context} = await fixture('summoned_mage','&scale=3.1176470588',sizes[2]);
    await boundary(page,'summoned_mage'); const before = await save(page);
    await page.setViewportSize(sizes[0]); await checkDialog(page);
    await page.setViewportSize(sizes[5]); await checkDialog(page);
    assert.equal(await save(page),before,'Rotation must preserve the pending choice and bookmark');
    await page.getByRole('button',{name:'Close library unlock',exact:true}).click();
    await page.locator('.decision-page').waitFor();
    flows++; await context.close();
  }
  {
    const {page,context} = await fixture('space_walker','&scene=scene_050');
    const before = await save(page); await resume(page);
    await page.locator('.library-unlock').waitFor();
    assert.equal(await page.locator('.reader-viewport').count(),0);
    await page.getByRole('button',{name:'Close library unlock',exact:true}).click();
    assert.equal(await save(page),before,'Old bookmark preserved');
    await page.locator('.library-passages').click();
    assert.ok((await page.locator('.passage-bookmarks__excerpt').textContent()).includes('Unlock'));
    await page.locator('.passage-bookmarks__open').click();
    assert.equal(await page.locator('.saved-passage').count(),0);
    await page.locator('.passage-bookmarks').getByRole('button',{name:'Unlock the library',exact:true}).click();
    await page.getByRole('button',{name:'Restore purchases',exact:true}).click();
    await page.getByRole('button',{name:'Close library unlock',exact:true}).click();
    await page.locator('.saved-passage').waitFor();
    flows++; await context.close();
  }
  assert.deepEqual(errors,[]);
  console.log(`Purchase UI passed: ${layouts} book/device/type layouts; ${flows} purchase, cancellation, approval, restore, revocation and saved-content flows.`);
} finally { await browser.close(); }
