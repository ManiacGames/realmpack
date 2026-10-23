'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');

(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);await page.evaluate(()=>{freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);gameplayHintsEnabled=false;updateGameplayHints()});await page.waitForTimeout(100);
 let views=0,detailPages=0;
 for(const [width,height] of (process.env.REALMPACK_UI_FLOWS_ONLY?[]:[[1366,768],[700,400],[360,640]]))for(const large of [false,true]){
  await page.setViewportSize({width,height});
  const count=await page.evaluate(large=>{setLargeText(large);screenView('details');screenTab('item');window.hoverTestItems=DATA.items.filter(d=>d.group==='consumable'&&!d.lootExcluded).map(d=>makeItem(d.id));return hoverTestItems.length},large);
  for(let n=0;n<count;n++){
   await page.evaluate(n=>{s.stash=[hoverTestItems[n]];inspected=null;inspectItem(hoverTestItems[n].id)},n);await page.waitForTimeout(40);
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
 await page.setViewportSize({width:1366,height:900});
 const selectedTarget=await page.evaluate(()=>{setLargeText(false);freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);gameplayHintsEnabled=false;updateGameplayHints();screenView('details');screenTab('item');const d=DATA.items.find(d=>d.group==='weapon'&&d.w===1&&!d.lootExcluded),a=makeItem(d.id),b=makeItem(d.id),p=makeItem(DATA.byName['Potion of Attack']);Object.assign(a,{x:0,y:0});Object.assign(b,{x:2,y:0});Object.assign(p,{x:1,y:0});s.items=[a,b,p];s.stash=[];render();inspectItem(p.id);return {p:p.id,target:b.id}});
 await page.locator('#detail select[aria-label="Consumable upgrade target"]').selectOption(String(selectedTarget.target));
 assert.equal(await page.evaluate(id=>s.items.find(i=>i.id===id).consumableTarget,selectedTarget.p),selectedTarget.target);
 await page.reload();await page.waitForTimeout(80);
 assert.equal(await page.evaluate(id=>s.items.find(i=>i.id===id).consumableTarget,selectedTarget.p),selectedTarget.target,'target save/reload');
 await page.evaluate(id=>{s.items.find(i=>i.id===id).potionUpgrades={damage:1};save()},selectedTarget.target);await page.reload();
 assert.equal(await page.evaluate(id=>s.items.find(i=>i.id===id).potionUpgrades.damage,selectedTarget.target),1,'upgrade save/reload');
 await page.evaluate(()=>{s.phase='prep';s.stash=[makeItem(DATA.byName['Stat Potion Choice Chest'])];s.stash[0].quantity=2;s.stash[0].chestOffer=DATA.byName['Potion of Mana'];screenTab('item');inspected=null;inspectItem(s.stash[0].id)});
 await page.getByRole('button',{name:'Open one chest',exact:true}).click();
 assert.equal(await page.evaluate(()=>s.stash.find(i=>consumableProfile(i)?.mode==='chest').quantity),1,'chest click consumes one');
 assert.equal(await page.evaluate(()=>s.stash.filter(i=>consumableProfile(i)?.mode==='upgrade').length),1,'chest grants stat potion');
 await page.evaluate(()=>{s.phase='reward';s.lootChoiceDone=false;s.stash=Array.from({length:9},()=>makeItem(DATA.byName['Ring of Magic']));s.pendingSupplies=[makeItem(DATA.byName['Health Potion']),makeItem(DATA.byName['Magic Potion'])];reward=[s.items[0].type];showSupplies();save()});
 if(process.env.REALMPACK_SUPPLIES_SCREENSHOT)await page.screenshot({path:process.env.REALMPACK_SUPPLIES_SCREENSHOT});
 await page.getByRole('button',{name:'Discard selected item…',exact:true}).click();await page.getByRole('button',{name:'Discard item',exact:true}).click();
 assert.equal(await page.evaluate(()=>s.stash.length),9,'stash remains capped');assert.equal(await page.evaluate(()=>s.pendingSupplies.length),1,'one queued supply claimed');
 await page.getByRole('button',{name:'Back to loot',exact:true}).click();assert.equal(await page.evaluate(()=>modalKind),'reward','return to normal loot');
 await page.reload();await page.waitForTimeout(60);assert.equal(await page.evaluate(()=>s.pendingSupplies.length),1,'supply queue save/reload');assert.equal(await page.evaluate(()=>modalKind),'reward');
 assert.deepEqual(errors,[]);console.log(JSON.stringify({views,detailPages,errors}));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
