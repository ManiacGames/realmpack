'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
const {prepareCombatWorkload}=require('./profile-combat.cjs');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);await page.evaluate(prepareCombatWorkload);await page.waitForTimeout(100);
 // Track forced layouts for a fresh crowded-pack inspector. Avoid timing assertions
 // because CPU speed varies; batching should require far fewer layouts per hover.
 const session=await page.context().newCDPSession(page);await session.send('Performance.enable');
 const before=(await session.send('Performance.getMetrics')).metrics.find(m=>m.name==='LayoutCount').value;
 await page.evaluate(()=>inspectItem(s.items[1].id));await page.waitForTimeout(80);
 const after=(await session.send('Performance.getMetrics')).metrics.find(m=>m.name==='LayoutCount').value;
 assert(after-before<=8,'hover must batch layout measurements, saw '+(after-before));
 let views=0,pages=0;
 for(const [width,height] of [[1366,768],[1024,600],[700,400],[390,844],[360,640]])for(const large of [false,true]){
  await page.setViewportSize({width,height});
  const count=await page.evaluate(large=>{setLargeText(large);screenView('details');screenTab('item');const picks=[s.items[0],s.items[1]];for(const d of DATA.items.filter(d=>defs[d.id].mechanic&&!d.isShiny).slice(0,4)){const i=makeItem(d.id);s.stash.push(i);picks.push(i)}window.hoverTestItems=picks;return picks.length},large);
  for(let n=0;n<count;n++){
   const expected=await page.evaluate(n=>{inspected=hoverTestItems[n].id;effectHover=inspected;renderDetail();return $('detail').textContent.replace(/\s+/g,'')},n);await page.waitForTimeout(90);
   const content=await page.evaluate(()=>{const p=[...screenPagers].find(p=>p.host===$('detail'));return p.nodes.map(n=>n.textContent).join(' ').replace(/\s+/g,'')});assert.equal(content,expected,'pagination preserves every inspection block');
   let turns=0;do{
    const result=await page.evaluate(()=>{const p=[...screenPagers].find(p=>p.host===$('detail'));return {overflow:p.content.scrollHeight-p.content.clientHeight,scroll:document.documentElement.scrollHeight-innerHeight,hasNext:p.page<p.pages.length-1}});
    assert(result.overflow<=3,JSON.stringify({width,height,large,n,turns,...result}));assert(result.scroll<=1,'no document scrolling');pages++;
    if(!result.hasNext)break;
    await page.locator('#detail .screen-page-nav button').last().click();await page.waitForTimeout(10);
   }while(++turns<80);assert(turns<80,'finite inspection pages');views++;
  }
 }
 // A stationary hover must leave inspection DOM and pages intact while combat runs.
 await page.setViewportSize({width:1366,height:768});await page.evaluate(prepareCombatWorkload);await page.evaluate(()=>{screenTab('item');inspectItem(s.items[2].id)});await page.waitForTimeout(100);
 const stable=await page.evaluate(()=>{const node=$('detail').firstChild;const state=JSON.stringify(s);let pages=0;const original=screenPaginate;screenPaginate=p=>{pages++;return original(p)};for(let n=0;n<50;n++)inspectItem(s.items[2].id);const unchanged=state===JSON.stringify(s);for(let n=0;n<20;n++)tick(.2);screenPaginate=original;return {same:node===$('detail').firstChild,unchanged,pages}});assert.deepEqual(stable,{same:true,unchanged:true,pages:0});
 if(process.env.REALMPACK_HOVER_SCREENSHOT)await page.screenshot({path:process.env.REALMPACK_HOVER_SCREENSHOT});assert.deepEqual(errors,[]);console.log(JSON.stringify({views,pages,hoverLayouts:after-before,stationaryHover:stable,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
