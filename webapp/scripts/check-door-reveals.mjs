import assert from 'node:assert/strict';
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
  await card.locator('img').evaluateAll(images=>Promise.all(images.map(image=>image.decode())));
  if(name==='ipad')await page.getByRole('button',{name:`Show ${title}`,exact:true}).click();
  await card.getByRole('button',{name:`Open ${title}`,exact:true}).scrollIntoViewIfNeeded();

  await card.getByRole('button',{name:`Open ${title}`,exact:true}).click();
  assert.equal(await page.locator('.portal-design').getAttribute('inert'),'');
  const samples=[];
  for(let i=0;i<3;i++){await page.waitForTimeout(100);samples.push(await card.locator('.door-closed').evaluate(el=>({opacity:Number(getComputedStyle(el).opacity),width:el.getBoundingClientRect().width,x:el.getBoundingClientRect().x,cover:getComputedStyle(el.closest('.book-cover')).transform})));}
  for(let i=1;i<samples.length;i++){assert.ok(samples[i].opacity<samples[i-1].opacity);assert.equal(samples[i].width,samples[0].width);assert.equal(samples[i].x,samples[0].x);assert.equal(samples[i].cover,'none');}
  await page.getByRole('textbox').first().waitFor();
 }
 await page.close();
}
assert.deepEqual(errors,[]);console.log('PASS: all three production reveals, phone and iPad, stable positions, decreasing opacity, input guard, setup arrival and no browser errors.');
}finally{await browser.close()}
