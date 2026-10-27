'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
const {prepareCombatWorkload}=require('./profile-combat.cjs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);await page.evaluate(prepareCombatWorkload);await page.waitForTimeout(100);
 let views=0,detailPages=0;
 for(const [width,height] of [[1144,938],[1366,900],[1366,768],[1024,600],[700,400],[390,844],[360,640]])for(const large of [false,true]){
  await page.setViewportSize({width,height});
  const count=await page.evaluate(large=>{setLargeText(large);screenView('details');screenTab('item');s.stash=[];const cloak=DATA.items.find(d=>d.name==='Cloak of Nightmares'),picks=[s.items[0],s.items[1]];for(const d of [DATA.items.find(d=>d.name==='Robe of the Neophyte'),cloak,...DATA.items.filter(d=>defs[d.id].mechanic&&!d.isShiny).slice(0,3)].filter(Boolean)){const i=makeItem(d.id);i.enchantments=[{key:'reservoir',rank:1,value:1}];s.stash.push(i);picks.push(i)}window.hoverTestItems=picks;return picks.length},large);
  for(let n=0;n<count;n++){
   await page.evaluate(n=>inspectItem(hoverTestItems[n].id),n);await page.waitForTimeout(40);
   const overview=await page.evaluate(()=>{const host=$('detail'),action=host.querySelector('.inspection-actions'),r=host.getBoundingClientRect(),a=action.getBoundingClientRect();return {pages:host.querySelectorAll('.screen-page-nav').length,overflow:host.scrollHeight-host.clientHeight,scroll:document.documentElement.scrollHeight-innerHeight,actionsVisible:a.bottom<=r.bottom+1&&a.top>=r.top,name:host.querySelector('h2').textContent}});
   assert.equal(overview.pages,0);assert(overview.overflow<=2,JSON.stringify({width,height,large,n,...overview}));assert(overview.actionsVisible);assert(overview.scroll<=1);views++;
   await page.locator('#detail .inspection-actions button').first().click();await page.waitForTimeout(60);
   if(overview.name==='Robe of the Neophyte'&&width>=1100&&height>=768){assert.equal(await page.evaluate(()=>[...screenPagers].find(p=>p.host.closest('.item-details-modal')).pages.length),1,'desktop robe fits on one page');if(width===1144&&large&&process.env.REALMPACK_DETAILS_SCREENSHOT)await page.screenshot({path:process.env.REALMPACK_DETAILS_SCREENSHOT})}
   const complete=await page.evaluate(()=>{const p=[...screenPagers].find(p=>p.host.closest('.item-details-modal'));return p.nodes.map(n=>n.textContent).join('').replace(/\s+/g,'')});
   // Compare text via a DOM parser, including decoded entities and collapsed rules.
   const decoded=await page.evaluate(()=>{const el=document.createElement('div');el.innerHTML=itemInspectionMarkup(findInspected());return el.textContent.replace(/\s+/g,'')});assert.equal(complete,decoded);
   for(let turn=0;turn<80;turn++){
    const data=await page.evaluate(()=>{const p=[...screenPagers].find(p=>p.host.closest('.item-details-modal'));return {overflow:p.content.scrollHeight-p.content.clientHeight,next:p.page<p.pages.length-1}});assert(data.overflow<=3,JSON.stringify({width,height,large,n,turn,...data}));detailPages++;if(!data.next)break;await page.locator('.item-details-modal .screen-page-nav button').last().click();await page.waitForTimeout(10)
   }
   await page.evaluate(()=>closeModal(true));
  }
 }
 await page.setViewportSize({width:1366,height:900});await page.evaluate(prepareCombatWorkload);await page.evaluate(()=>{screenView('details');screenTab('item');inspectItem(s.items[2].id)});await page.waitForTimeout(80);
 const stable=await page.evaluate(()=>{inspectItem(s.items[2].id);const node=$('detail').firstChild,state=JSON.stringify(s);let pages=0;const original=screenPaginate;screenPaginate=p=>{pages++;return original(p)};for(let n=0;n<50;n++)inspectItem(s.items[2].id);const unchanged=state===JSON.stringify(s);for(let n=0;n<20;n++)tick(.2);screenPaginate=original;return {same:node===$('detail').firstChild,unchanged,pages}});assert.deepEqual(stable,{same:true,unchanged:true,pages:0});
 await page.locator('#detail .inspection-actions button').first().click();await page.waitForTimeout(60);await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>!modalKind&&document.activeElement===$('detail').querySelector('.inspection-actions button')),true,'details Escape restores focus');
 if(process.env.REALMPACK_HOVER_SCREENSHOT)await page.screenshot({path:process.env.REALMPACK_HOVER_SCREENSHOT});assert.deepEqual(errors,[]);console.log(JSON.stringify({views,detailPages,stationaryHover:stable,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
