// Optional WebKit integration checks in isolated browser contexts. Never touches device saves.
import assert from 'node:assert/strict';
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.READER_URL || 'http://127.0.0.1:5190';
const browser=await webkit.launch();
const errors=[];
try {
 for (const viewport of [{width:390,height:844},{width:320,height:568},{width:667,height:375},{width:1024,height:768},{width:768,height:1024}]) {
  const page=await browser.newPage({viewport});page.on('pageerror',e=>errors.push(e.message));
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  for(const scale of [1,2,3.12]) {
   await page.evaluate(n=>document.documentElement.style.fontSize=`${n*100}%`,scale);
   assert.equal(await page.locator('.book-feature').count(),3);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,'library overflow');
  }
  await page.evaluate(()=>document.documentElement.style.fontSize='100%');
  await page.getByRole('button',{name:'Open The Can Opener',exact:true}).click();
  await page.getByRole('textbox').first().waitFor();
  await page.getByRole('textbox').nth(0).fill('Ollie');await page.getByRole('textbox').nth(1).fill('Test Town');
  await page.getByRole('button',{name:'Open your book',exact:true}).click();
  await page.locator('[data-screen=welcome]').waitFor();
  await page.evaluate(()=>document.fonts.ready);
  for(const scale of [1,2,3.12]) {
   await page.evaluate(n=>document.documentElement.style.fontSize=`${n*100}%`,scale);
   assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2),false,'welcome overflow');
  }
  await page.getByRole('button',{name:'Turn the page',exact:true}).click();
  await page.locator('.story-shell').waitFor();
  await page.reload();await page.getByRole('button',{name:'Open The Can Opener',exact:true}).click();
  await page.locator('.story-shell').waitFor();assert.equal(await page.locator('[data-screen=welcome]').count(),0);
  await page.reload();await page.getByRole('button',{name:'Open The Can Opener',exact:true}).click();
  await page.locator('.story-shell').waitFor();
  assert.equal(await page.locator('.saved-place').count(),0);
  await page.getByRole('button',{name:'Reading settings',exact:true}).click();
  await page.getByRole('button',{name:'Start again',exact:true}).click();
  await page.getByRole('button',{name:'Keep my place',exact:true}).click();
  await page.getByRole('button',{name:'Start again',exact:true}).click();
  await page.getByRole('button',{name:'Start again',exact:true}).click();
  await page.locator('[data-screen=welcome]').waitFor();
  await page.getByRole('button',{name:'Turn the page',exact:true}).click();await page.locator('.story-shell').waitFor();
  await page.close();
 }
 const page=await browser.newPage({viewport:{width:1024,height:768}});
 page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});
 for(const title of ['The Can Opener','The Summoned Mage','The Space Walker']) {
  await page.goto(base);
  await page.getByRole('button',{name:`Show ${title}`,exact:true}).click();
  await page.getByRole('button',{name:`Open ${title}`,exact:true}).click();
  await page.getByRole('textbox').nth(0).fill('Reader');await page.getByRole('textbox').nth(1).fill('Home');
  await page.evaluate(()=>{window.originalWrite=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new DOMException('test quota','QuotaExceededError');};});
  await page.getByRole('button',{name:'Open your book',exact:true}).click();
  await page.locator('.persistence-notice').waitFor();assert.equal(await page.locator('[data-screen=welcome]').count(),0);
  await page.evaluate(()=>{Storage.prototype.setItem=window.originalWrite;});
  await page.locator('.persistence-notice button').first().click();
  await page.locator('[data-screen=welcome]').waitFor();
  assert.equal(await page.locator('.welcome-copy h1').textContent(),title);
  const illustration=page.locator('.welcome-interior img');
  await illustration.evaluate(image=>image.decode());
  assert.ok((await illustration.getAttribute('src')).startsWith('/images/welcome/'));
  await page.locator('.welcome-interior button').click();
  await page.locator('.image-viewer[open]').waitFor();
  await page.getByRole('button',{name:'Zoom in',exact:true}).click();
  assert.equal(await page.locator('.image-viewer__canvas').getAttribute('data-zoom'),'1.50');
  await page.keyboard.press('Escape');
  assert.equal(await page.locator(':focus').getAttribute('class'),'scene-image__open');
  assert.equal(await page.locator('[data-screen=welcome]').count(),1,'Viewing art must not turn the welcome page');

  const box=await page.locator('.welcome-description').boundingBox();
  await page.mouse.move(box.x+box.width*.8,box.y+20);await page.mouse.down();await page.mouse.move(box.x+box.width*.8-15,box.y+20,{steps:6});await page.mouse.up();
  assert.equal(await page.locator('[data-screen=welcome]').count(),1,'short swipe should cancel');
  await page.mouse.move(box.x+box.width*.9,box.y+20);await page.mouse.down();await page.mouse.move(box.x+box.width*.1,box.y+20,{steps:8});await page.mouse.up();
  await page.locator('.story-shell').waitFor();
 }
 await page.goto(`${base}/test/browser/bookshelf.html?bookmarks=2`);
 await page.getByRole('button',{name:'Run bookshelf checks',exact:true}).click();
 await page.getByRole('status').filter({hasText:'PASS:'}).waitFor();
 await page.close();
 assert.deepEqual(errors,[]);console.log('PASS: five viewports at 100/200/312% text; new/resume/restart flows; all welcome identities; failed-save retries; short/complete swipes; direct bookshelf entry and restart confirmation; no browser errors.');
} finally {await browser.close();}
