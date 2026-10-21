'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME||undefined,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
 const page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);
 let views=0;
 for(const [width,height] of [[1920,1080],[1366,768],[1280,720],[768,935],[700,400],[390,844],[360,640]]){
  await page.setViewportSize({width,height});
  for(const large of [false,true]){
   await page.evaluate(large=>{freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);render();setLargeText(large)},large);
   const before=await page.evaluate(()=>JSON.stringify(s));await page.evaluate(()=>confirmRestart());await page.waitForTimeout(80);
   const layout=await page.evaluate(()=>{const m=document.querySelector('.compact-confirm-modal'),r=m.getBoundingClientRect(),buttons=[...m.querySelectorAll('button')].map(b=>b.getBoundingClientRect());return{height:r.height,width:r.width,top:r.top,bottom:r.bottom,overflow:m.scrollHeight>m.clientHeight+1,pagers:m.querySelectorAll('.screen-paged').length,focus:document.activeElement.id,visible:buttons.every(b=>b.top>=r.top&&b.bottom<=r.bottom),sameRow:Math.abs(buttons[0].top-buttons[1].top)<2}});
   assert.ok(layout.height<300,JSON.stringify({width,height,large,layout}));assert.ok(layout.width<=480&&layout.top>=0&&layout.bottom<=height);assert.equal(layout.overflow,false);assert.equal(layout.pagers,0);assert.equal(layout.focus,'cancelRestart');assert.ok(layout.visible&&layout.sameRow);await page.keyboard.press('Shift+Tab');assert.equal(await page.evaluate(()=>document.activeElement.textContent),'Choose character →');await page.keyboard.press('Tab');assert.equal(await page.evaluate(()=>document.activeElement.id),'cancelRestart');
   if(width===1920&&!large)await page.screenshot({path:'/tmp/restart-desktop.png'});
   if(width===360&&large)await page.screenshot({path:'/tmp/restart-phone.png'});
   await page.click('#cancelRestart');assert.equal(await page.evaluate(()=>JSON.stringify(s)),before);
   await page.evaluate(()=>confirmRestart());await page.waitForTimeout(30);await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>JSON.stringify(s)),before);assert.equal(await page.locator('.compact-confirm-modal').count(),0);
   await page.evaluate(()=>confirmRestart());await page.getByRole('button',{name:'Choose character →',exact:true}).click();assert.equal(await page.evaluate(()=>modalKind),'classes');assert.equal(await page.evaluate(()=>JSON.stringify(s)),before);assert.equal(await page.locator('.roster-class').count(),19);
   await page.evaluate(()=>closeModal(true));views++;
  }
 }
 await page.evaluate(()=>{s.phase='rest';showRest();confirmRestart()});await page.waitForTimeout(30);const resting=await page.evaluate(()=>JSON.stringify(s));await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>modalKind),'rest');assert.equal(await page.evaluate(()=>JSON.stringify(s)),resting);await page.evaluate(()=>closeModal(true));
 await page.evaluate(()=>{s.phase='fight';confirmRestart()});assert.equal(await page.locator('.compact-confirm-modal').count(),0);assert.deepEqual(errors,[]);console.log(`PASS: ${views} compact restart views, cancellation, Escape, safe character selection and fight guard`);await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
