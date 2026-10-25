'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']}),page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);await page.evaluate(()=>document.fonts.ready);
 const ids=await page.evaluate(()=>[DATA.items.find(d=>d.name==='Neo Loaded Core').id,...DATA.items.filter(d=>!d.lootExcluded&&adjacencyGuide(d)).sort((a,b)=>itemCard(b.id,'').length-itemCard(a.id,'').length).slice(0,2).map(d=>d.id)]);
 let views=0;
 for(const[width,height]of[[1366,768],[800,900],[700,400],[390,844],[360,640]])for(const large of[false,true])for(const id of ids)for(const scene of['reward','shop']){
  await page.setViewportSize({width,height});
  await page.evaluate(({id,large,scene})=>{freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);gameplayHintsEnabled=false;updateGameplayHints();setLargeText(large);s.gold=10000;s.phase=scene;reward=[id];stock=[id];if(scene==='reward')inspectReward(id);else inspectShop(id);clearTimeout(toastTimer);$('toast').style.display='none';screenFitModal()},{id,large,scene});
  await page.waitForTimeout(50);
  const original=await page.locator('.adjacency-rules').evaluate(el=>el.outerHTML);
  const gold=await page.evaluate(()=>s.gold);
  for(let cycle=0;cycle<3;cycle++){
   const summary=page.locator('.adjacency-rules>summary');await summary.scrollIntoViewIfNeeded();await summary.click();await page.waitForTimeout(80);
   assert.equal(await page.locator('.adjacency-rules').evaluate(el=>el.open),true,'Expanded rules lost');
   assert.equal(await page.locator('#overlay .screen-page-nav').count(),0,'Inspection uses destructive paginator');
   assert.equal(await page.locator('.adjacency-rules').count(),1,'Disclosure cloned');
   const bad=await page.evaluate(()=>{const m=document.querySelector('#overlay .modal'),r=m.getBoundingClientRect(),bad=[];if(r.top<0||r.left<0||r.right>innerWidth+1||r.bottom>innerHeight+1)bad.push('outside viewport');if(m.scrollHeight>m.clientHeight+2)bad.push('modal overflow');if(document.documentElement.scrollHeight>innerHeight+1)bad.push('page scroll');for(const b of m.querySelectorAll(':scope>.loot-inspect-footer button,:scope>.shop-footer button')){const r=b.getBoundingClientRect();if(!b.contains(document.elementFromPoint(r.left+r.width/2,r.top+r.height/2)))bad.push('blocked action')}return bad});assert.deepEqual(bad,[],JSON.stringify({width,height,large,id,scene}));
   await page.locator('.adjacency-rules li').last().scrollIntoViewIfNeeded();assert(await page.locator('.adjacency-rules li').last().isVisible());
   await summary.scrollIntoViewIfNeeded();await summary.click();await page.waitForTimeout(80);assert.equal(await page.locator('.adjacency-rules').evaluate(el=>el.outerHTML),original,'Collapse changed original markup');
  }
  assert.equal(await page.evaluate(()=>s.gold),gold,'Inspection spent gold');
  await page.locator(scene==='reward'?'.loot-inspect-footer button':'.shop-footer button').first().click();await page.waitForTimeout(30);assert.equal(await page.evaluate(()=>modalKind),scene,'Back lost offer screen');
  await page.evaluate(({scene,id})=>{if(scene==='reward')inspectReward(id);else inspectShop(id)},{scene,id});await page.waitForTimeout(30);await page.locator('.adjacency-rules>summary').scrollIntoViewIfNeeded();await page.locator('.adjacency-rules>summary').click();await page.waitForTimeout(40);await page.locator(scene==='reward'?'.loot-inspect-footer .gold':'.shop-footer .gold').click();await page.waitForTimeout(30);assert(await page.evaluate(id=>s.items.some(i=>i.type===id)||s.stash.some(i=>i.type===id),id),'Take/buy failed');views++;
 }
 assert.deepEqual(errors,[]);console.log(`PASS: ${views} loot/shop inspections; repeated expand/collapse, complete rules, fixed actions, back and take/buy across five viewport sizes and both text modes.`);await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
