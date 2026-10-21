'use strict';
// Optional browser regression. Uses the same Playwright/Chromium setup as check-viewport.cjs.
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME||undefined,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.REALMPACK_URL||pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);
 const ids=await page.evaluate(()=>Object.keys(classes));let previews=0;
 for(const [width,height] of [[1920,1080],[1366,768],[1280,720],[1024,768],[700,600],[390,844],[360,640]]){
  await page.setViewportSize({width,height});await page.evaluate(()=>chooseClass(false));await page.waitForTimeout(40);const before=await page.evaluate(()=>JSON.stringify(s));
  assert.equal(await page.locator('.roster-class').count(),19);assert.equal(await page.locator('.screen-class-modal .screen-page-nav').count(),0,'Roster must not paginate');
  for(const id of ids){
   const button=page.locator('.roster-class[data-class-id="'+id+'"]');await button.hover();await button.focus();
   assert(await page.evaluate(id=>classPreviewId===id&&document.getElementById('classPreviewContent').textContent.includes(classes[id].desc)&&document.getElementById('classPreviewContent').textContent.includes(classes[id].rule)&&document.getElementById('classPreviewContent').textContent.includes(classes[id].hp+' starting health'),id),'Incorrect preview '+id);
   for(const tab of ['overview','passive']){
    await page.evaluate(tab=>classPreviewSection(tab),tab);
    const issues=await page.evaluate(()=>[...document.querySelectorAll('.roster-class,.class-preview,.class-selection-footer,.roster-settings')].filter(el=>{const r=el.getBoundingClientRect();return r.bottom>innerHeight+1||r.right>innerWidth+1||r.top<0||el.scrollHeight>el.clientHeight+3||el.scrollWidth>el.clientWidth+3}).map(el=>el.className));assert.deepEqual(issues,[],width+'×'+height+' '+id+' '+tab);
   }previews++;
  }
  assert.equal(await page.evaluate(()=>JSON.stringify(s)),before,'Preview changed active run');
 }
 // Touch only previews. Starting uses the chosen class, mode and difficulty.
 await page.setViewportSize({width:390,height:844});await page.evaluate(()=>{chooseClass(true);selectedDifficulty='exalted'});await page.waitForTimeout(30);const before=await page.evaluate(()=>JSON.stringify(s));await page.locator('.roster-class[data-class-id="druid"]').dispatchEvent('pointerenter',{pointerType:'touch'});await page.locator('.roster-class[data-class-id="druid"]').click();assert.equal(await page.evaluate(()=>JSON.stringify(s)),before,'Tap started run');await page.locator('#startClass').click();assert(await page.evaluate(()=>s.classId==='druid'&&s.practice&&s.difficulty==='exalted'),'Start lost class/mode/difficulty');
 await page.evaluate(()=>{closeModal(true);s.phase='prep';chooseClass(false)});await page.waitForTimeout(30);await page.locator('.roster-class[data-class-id="knight"]').focus();await page.locator('#startClass').click();assert(await page.evaluate(()=>s.classId==='knight'&&!s.practice),'Dungeon run start failed');
 await page.evaluate(()=>{closeModal(true);s.phase='fight'});const html=await page.locator('#overlay').innerHTML();await page.evaluate(()=>chooseClass());assert.equal(await page.locator('#overlay').innerHTML(),html,'Class selection opened during combat');
 assert.deepEqual(errors,[]);console.log(`PASS: ${previews} class previews across seven viewports, all 19 visible, no roster pages, HP/description/passive fidelity, hover/focus/tap, safe preview, mode/difficulty start and combat guard`);await browser.close()
})().catch(e=>{console.error(e);process.exit(1)});
