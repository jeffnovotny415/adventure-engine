import assert from 'node:assert/strict';
import { DOOR_MOTION } from '../src/components/screens/HomeScreen/doorMotion.js';
// Optional WebKit checks, isolated contexts; never touches device saves.
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.READER_URL || 'http://127.0.0.1:5190';
const browser=await webkit.launch();const errors=[];
try{
for(const [name,viewport] of [['phone',{width:390,height:844}],['ipad',{width:1024,height:768}]]){
 const page=await browser.newPage({viewport});page.on('pageerror',e=>errors.push(e.message));
 for(const [id,title] of [['the_can_opener','The Can Opener'],['summoned_mage','The Summoned Mage'],['space_walker','The Space Walker']]){
  await page.goto(base);await page.evaluate(()=>document.fonts.ready);
  const card=page.locator(`[data-book="${id}"]`);
  await card.locator('canvas[data-ready=true]').waitFor({state:'attached'});
  await card.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
  if(name==='ipad')await page.getByRole('button',{name:`Show ${title}`,exact:true}).click();
  await card.getByRole('button',{name:`Open ${title}`,exact:true}).scrollIntoViewIfNeeded();

  await card.getByRole('button',{name:`Open ${title}`,exact:true}).click();
  assert.equal(await page.locator('.portal-design').getAttribute('inert'),'');
  const samples=[];
  for(let i=0;i<3;i++){await page.waitForTimeout(100);samples.push(await card.locator('.door-motion').evaluate(el=>({frame:Number(el.dataset.frame),width:el.getBoundingClientRect().width,x:el.getBoundingClientRect().x,cover:getComputedStyle(el.closest('.book-cover')).transform,opacity:getComputedStyle(el).opacity})));}
  for(let i=1;i<samples.length;i++){assert.ok(samples[i].frame>samples[i-1].frame);assert.equal(samples[i].width,samples[0].width);assert.equal(samples[i].x,samples[0].x);assert.equal(samples[i].cover,'none');assert.equal(samples[i].opacity,'1');}
  await page.waitForFunction(({id,last})=>Number(document.querySelector(`[data-book="${id}"] canvas`)?.dataset.frame)===last,{id,last:DOOR_MOTION[id].lastFrame},{timeout:2500});
  await page.getByRole('textbox').first().waitFor();
 }
 await page.close();
}
// Decode failures and Reduce Motion must not trap a reader on the shelf.
for(const mode of ['failed','late','reduced']) {
 const page=await browser.newPage({viewport:{width:390,height:844}});
 page.on('pageerror',e=>errors.push(e.message));
 const pending=[];
 if(mode==='reduced') await page.emulateMedia({reducedMotion:'reduce'});
 else await page.route('**/*-motion-v*.webp',route=>mode==='failed'?route.abort():pending.push(route));
 await page.goto(base);
 const card=page.locator('[data-book="the_can_opener"]');
 await card.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
 await card.getByRole('button',{name:'Open The Can Opener',exact:true}).click();
 assert.equal(await page.locator('.door-portal--playing').count(),0,mode+' fallback');
 if(mode==='late') {
  await Promise.all(pending.map(route=>route.continue()));
  await page.waitForTimeout(150);
  assert.equal(await page.locator('.door-portal--playing').count(),0,'late decode must not change active transition');
 }
 await page.getByRole('textbox').first().waitFor();
 await page.close();
}
assert.deepEqual(errors,[]);console.log('PASS: all three production reveals, phone and iPad, stable positions, advancing frames, final frame reached, reduced motion and failed/late decode fallbacks, input guard, setup arrival and no browser errors.');
}finally{await browser.close()}
