import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { createEmptySave } from '../src/state/saveSchema.js';
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base=process.env.READER_URL || 'http://127.0.0.1:5190';
const browser=await webkit.launch(), errors=[];
const key='paths_of_wonder_save';
const screenshots=process.env.SCREENSHOT_DIR;
if(screenshots) await mkdir(screenshots,{recursive:true});
try {
for(const viewport of [{width:390,height:844},{width:1024,height:768}]) {
 const page=await browser.newPage({viewport});page.on('pageerror',e=>errors.push(e.message));
 await page.emulateMedia({reducedMotion:'reduce'});await page.goto(base);
 const book={...createEmptySave(),storyId:'the_can_opener',currentSceneId:'scene_005',heroName:'Ollie',worldName:'Home',uiPrefs:{...createEmptySave().uiPrefs,textScale:1.28,readingFont:'serif',alwaysShowControls:true}};
 const other={...createEmptySave(),storyId:'summoned_mage',currentSceneId:'scene_002',heroName:'Reader',worldName:'Elsewhere'};
 await page.evaluate(({key,book,other})=>localStorage.setItem(key,JSON.stringify({format:'paths_of_wonder_library',version:1,lastStoryId:book.storyId,books:{[book.storyId]:book,[other.storyId]:other}})),{key,book,other});
 await page.reload();
 if(screenshots) await page.screenshot({path:`${screenshots}/library-${viewport.width}.png`,fullPage:true});
 assert.equal(await page.locator('.saved-place').count(),0);
 await page.getByRole('button',{name:'Open The Can Opener',exact:true}).click();
 await page.locator('.story-shell').waitFor();assert.equal(await page.locator('dialog[open]').count(),0);assert.equal(await page.locator('[data-screen=welcome]').count(),0);
 const readSave=()=>page.evaluate(key=>JSON.parse(localStorage.getItem(key)),key);
 const next=page.locator('.reader-footer-next button');
 await next.click();await page.waitForTimeout(300);
 const pageNumber=await page.locator('.page-status').getAttribute('data-page');assert.ok(Number(pageNumber)>1);
 await page.getByRole('button',{name:'Library',exact:true}).click();
 await page.getByRole('button',{name:'Open The Can Opener',exact:true}).click();
 await page.waitForFunction(n=>document.querySelector('.page-status')?.dataset.page===n,pageNumber);
 await page.getByRole('button',{name:'Reading settings',exact:true}).click();
 const before=await readSave();
 await page.getByRole('button',{name:'Start again',exact:true}).click();
 assert.equal(await page.locator(':focus').textContent(),'Keep my place');
 if(screenshots) await page.screenshot({path:`${screenshots}/restart-${viewport.width}.png`});
 for(const scale of [1,2,3.12]){
  await page.evaluate(n=>document.documentElement.style.fontSize=`${100*n}%`,scale);
  assert.equal(await page.locator('dialog[open]').evaluate(el=>el.scrollWidth>el.clientWidth+1),false);
  await page.getByRole('button',{name:'Keep my place',exact:true}).scrollIntoViewIfNeeded();
 }
 await page.evaluate(()=>document.documentElement.style.fontSize='100%');
 await page.keyboard.press('Escape');
 assert.equal(await page.locator(':focus').textContent(),'Start again');
 assert.deepEqual(await readSave(),before,'cancel must preserve saved progress');
 await page.getByRole('button',{name:'Start again',exact:true}).click();
 await page.evaluate(()=>{window.originalWrite=Storage.prototype.setItem;Storage.prototype.setItem=()=>{throw new DOMException('test quota','QuotaExceededError');};});
 await page.getByRole('button',{name:'Start again',exact:true}).click();
 await page.locator('.persistence-notice').waitFor();assert.equal(await page.locator('[data-screen=welcome]').count(),0);
 assert.deepEqual(await readSave(),before,'failed restart must preserve all books');
 await page.evaluate(()=>{Storage.prototype.setItem=window.originalWrite;});
 await page.locator('.persistence-notice button').first().click();
 await page.locator('[data-screen=welcome]').waitFor();
 const after=await readSave();assert.equal(after.books.the_can_opener.currentSceneId,'scene_001');
 assert.equal(after.books.the_can_opener.heroName,'Ollie');assert.deepEqual(after.books.the_can_opener.uiPrefs,before.books.the_can_opener.uiPrefs);
 assert.deepEqual(after.books.summoned_mage,before.books.summoned_mage);
 await page.close();
}
assert.deepEqual(errors,[]);console.log('PASS: direct resume restores page; restart cancel/focus/large text; failed write preserves saves; retry shows welcome; names/settings/other book preserved.');
}finally{await browser.close();}
