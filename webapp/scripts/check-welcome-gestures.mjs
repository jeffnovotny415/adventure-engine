import assert from 'node:assert/strict';
const { webkit } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
const base = process.env.READER_URL || 'http://127.0.0.1:5190';
const browser = await webkit.launch(), errors = [];
let checks = 0;
try {
 for (const viewport of [{width:390,height:844},{width:568,height:320},{width:1024,height:768}]) {
  const page = await browser.newPage({viewport});
  page.on('pageerror',error=>errors.push(error.message));
  const open = async (motion='no-preference') => {
    await page.emulateMedia({reducedMotion:motion});
    await page.goto(`${base}/test/browser/welcome-gestures.html`);
    await page.locator('.welcome-interior img').evaluate(img=>img.decode());
  };
  // Actual browser mouse drags exercise capture, including a touch starting on
  // an illustration button. Synthetic touch checks below cover OS event order.
  for (const selector of ['.welcome-interior button','.welcome-description']) {
    await open();
    const target=page.locator(selector); await target.scrollIntoViewIfNeeded();
    const box=await target.boundingBox(), y=box.y+Math.min(20,box.height/2);
    const x=box.x+box.width*.85;
    await page.mouse.move(x,y);await page.mouse.down();
    await page.mouse.move(Math.max(8,x-160),y,{steps:12});await page.mouse.up();
    await page.getByRole('status').filter({hasText:'Entered story'}).waitFor();
    assert.equal(await page.locator('.image-viewer').count(),0);
    checks++;
  }
  for (const kind of ['short','vertical','reverse','second-finger','cancel','capture-loss','slow-start-flick','reduced-motion','child-capture-handoff']) {
    await open(kind==='reduced-motion'?'reduce':'no-preference');
    const completed=['slow-start-flick','reduced-motion','child-capture-handoff'].includes(kind);
    await page.evaluate(async kind=>{
      const paper=document.querySelector('.open-book'), target=document.querySelector('.welcome-interior img');
      const captures=new Set();
      paper.setPointerCapture=id=>captures.add(id);paper.hasPointerCapture=id=>captures.has(id);
      paper.releasePointerCapture=id=>captures.delete(id);
      const send=(element,type,x,y=100,id=1)=>element.dispatchEvent(new PointerEvent(type,{
        bubbles:true,cancelable:true,pointerId:id,pointerType:'touch',isPrimary:id===1,button:0,clientX:x,clientY:y
      }));
      send(target,'pointerdown',300);
      if(kind==='slow-start-flick') await new Promise(resolve=>setTimeout(resolve,450));
      if(kind==='vertical') {send(target,'pointermove',297,145);send(paper,'pointerup',200,150);}
      else if(kind==='reverse') {send(target,'pointermove',330);send(paper,'pointerup',390);}
      else if(kind==='second-finger') {
        send(target,'pointermove',275);send(document.body,'pointerdown',400,100,2);
        send(paper,'pointermove',100);send(paper,'pointerup',100);
      } else if(kind==='cancel'||kind==='capture-loss') {
        send(target,'pointermove',250);send(paper,kind==='cancel'?'pointercancel':'lostpointercapture',250);
        send(paper,'pointerup',100);
      } else if(kind==='short') {
        send(target,'pointermove',285);send(paper,'pointerup',285);
        target.closest('button').dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,detail:1}));
      } else {
        const end=kind==='slow-start-flick'?260:100;
        if(kind==='slow-start-flick') {send(target,'pointermove',285);await new Promise(resolve=>setTimeout(resolve,16));}
        send(target,'pointermove',end);
        if(kind==='child-capture-handoff') send(target,'lostpointercapture',end);
        send(paper,'pointerup',end);
      }
    },kind);
    if(completed) await page.getByRole('status').filter({hasText:'Entered story'}).waitFor();
    else {
      await page.waitForTimeout(450);
      assert.equal(await page.locator('[data-screen=welcome]').count(),1,kind);
      assert.equal(await page.locator('.image-viewer').count(),0,kind);
      // A fresh tap after cancellation must still open the illustration.
      await page.locator('.welcome-interior button').click();
      await page.locator('.image-viewer[open]').waitFor();
      await page.keyboard.press('Escape');
      await page.getByRole('button',{name:'Turn the page',exact:true}).click();
      await page.getByRole('status').filter({hasText:'Entered story'}).waitFor();
    }
    checks++;
  }
  await page.close();
 }
 assert.deepEqual(errors,[]);
 console.log(`PASS: ${checks} welcome swipe checks; image/text drag, slow-start flick, cancelled turns, vertical scroll intent, second finger, capture handoff, image taps and Reduced Motion.`);
} finally {await browser.close();}
