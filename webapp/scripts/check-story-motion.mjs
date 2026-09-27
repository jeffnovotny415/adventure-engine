// Development-only artwork review; never reads/writes story saves.
import assert from 'node:assert/strict';
const {webkit} = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const browser=await webkit.launch();
const base=process.env.READER_URL || 'http://127.0.0.1:5190';
try {
 const page=await browser.newPage({viewport:{width:1100,height:820}});const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(`${base}/test/browser/story-motion.html`);
 await page.locator('article').first().waitFor();
 assert.equal(await page.locator('article').count(),23);
 const eye=page.locator('article[data-type="eyes-shutdown"] .story-art').first();
 await page.waitForFunction(()=>document.querySelector('article[data-type="eyes-shutdown"] .story-art')?.getAttribute('data-progress') !== null);
 assert.equal(await eye.getAttribute('data-progress'), '0.000','offscreen illustration must not run');
 await eye.scrollIntoViewIfNeeded();await page.waitForTimeout(800);
 assert.ok(Number(await eye.getAttribute('data-progress'))>0);
 await page.evaluate(()=>window.scrollTo(0,0));await page.waitForTimeout(150);
 const stopped=await eye.getAttribute('data-progress');await page.waitForTimeout(400);
 assert.equal(await eye.getAttribute('data-progress'),stopped,'offscreen time pauses');
 await eye.scrollIntoViewIfNeeded();await eye.locator('..').click();
 const modal=page.locator('dialog.image-viewer');await modal.waitFor();
 await page.getByRole('button',{name:'Pause animation',exact:true}).click();
 const inside=modal.locator('.story-art');const paused=await inside.getAttribute('data-progress');await page.waitForTimeout(200);assert.equal(await inside.getAttribute('data-progress'),paused);
 await page.getByRole('button',{name:'Replay',exact:true}).click();await page.waitForTimeout(400);assert.ok(Number(await inside.getAttribute('data-progress'))>0);
 await page.evaluate(()=>{Object.defineProperty(document,'hidden',{configurable:true,value:true});document.dispatchEvent(new Event('visibilitychange'));});
 const background=await inside.getAttribute('data-progress');await page.waitForTimeout(350);assert.equal(await inside.getAttribute('data-progress'),background);
 await page.evaluate(()=>{delete document.hidden;document.dispatchEvent(new Event('visibilitychange'));});await page.waitForTimeout(150);assert.ok(Number(await inside.getAttribute('data-progress'))>Number(background));
 await page.getByRole('button',{name:'Zoom in',exact:true}).click();assert.equal(await modal.locator('.image-viewer__canvas').getAttribute('data-zoom'),'1.50');
 await modal.locator('.image-viewer__canvas').evaluate(el=>{
   el.setPointerCapture=()=>{};el.hasPointerCapture=()=>false;
   const r=el.getBoundingClientRect();
   for(const [type,id,x] of [['pointerdown',1,-40],['pointerdown',2,40],['pointermove',1,-95],['pointermove',2,95],['pointerup',1,-95],['pointerup',2,95]])el.dispatchEvent(new PointerEvent(type,{pointerId:id,pointerType:'touch',button:0,clientX:r.x+r.width/2+x,clientY:r.y+r.height/2,bubbles:true}));
 });
 assert.ok(Number(await modal.locator('.image-viewer__canvas').getAttribute('data-zoom'))>2);
 await page.getByRole('button',{name:'Close',exact:true}).click();
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);assert.equal(await eye.getAttribute('data-progress'),'1.000');
 await eye.locator('..').click();assert.equal(await page.getByRole('button',{name:'Replay',exact:true}).isDisabled(),true);await page.getByRole('button',{name:'Close',exact:true}).click();
 assert.deepEqual(errors,[]);await page.close();
 console.log('PASS: 23 previews including all robot routes; offscreen/background pause, replay, pause, pinch, zoom and live Reduced Motion');
 const fallback=await browser.newPage();await fallback.route('**/tool-off.webp',route=>route.abort());await fallback.goto(`${base}/test/browser/story-motion.html`);await fallback.waitForTimeout(300);
 assert.equal(await fallback.locator('article[data-type="blade"] .story-art__drawing').count(),0);
 assert.equal(await fallback.locator('article[data-type="blade"] .scene-image__img').evaluate(img=>getComputedStyle(img).opacity),'1');await fallback.close();
 console.log('PASS: failed animation asset retains approved still');
 for(const viewport of [{width:667,height:375},{width:568,height:320},{width:1024,height:768},{width:390,height:844}]) {
  const page=await browser.newPage({viewport});const faults=[];page.on('pageerror',e=>faults.push(e.message));
  for(const [book,scene] of [['the_can_opener','scene_005'],['the_can_opener','scene_014'],['summoned_mage','scene_049'],['space_walker','scene_061']]) {
   await page.goto(`${base}/test/browser/story-artwork.html?story=${book}&scene=${scene}&large&animated`);
   await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(200);
   assert.ok(await page.locator('.story-art[data-motion]').count()>0,'approved animations render without review opt-in');
   const count=await page.locator('.page-status').getAttribute('data-total');
   const ratios=await page.locator('.reader-viewport .scene-image--inline img').evaluateAll(imgs=>imgs.map(img=>{const r=img.getBoundingClientRect();return {ratio:r.width/r.height,expected:Number(img.getAttribute('width'))/Number(img.getAttribute('height')),height:r.height,limit:document.querySelector('.reader-viewport').clientHeight*.46};}));
   for(const r of ratios){assert.ok(Math.abs(r.ratio-r.expected)<.02);assert.ok(r.height<=r.limit+.5);}
   const box=await page.locator('.reader-viewport').boundingBox();
   await page.mouse.move(box.x+box.width*.85,box.y+40);await page.mouse.down();await page.mouse.move(box.x+box.width*.2,box.y+42,{steps:10});await page.mouse.up();await page.waitForTimeout(450);
   assert.equal(await page.locator('.page-status').getAttribute('data-page'),'2');
   assert.equal(await page.locator('.page-status').getAttribute('data-total'),count,'animation cannot repaginate');
   await page.setViewportSize({width:viewport.height,height:viewport.width});await page.waitForTimeout(200);
   const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+2);assert.equal(overflow,false);
   await page.setViewportSize(viewport);
  }
  assert.deepEqual(faults,[]);await page.close();console.log(`PASS: animated art, large text, swipe, pagination and rotation ${viewport.width}x${viewport.height}`);
 }
} finally {await browser.close();}
