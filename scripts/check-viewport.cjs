'use strict';
// Optional browser QA: requires Playwright and a Chromium binary.
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME||undefined,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});
 const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(process.env.REALMPACK_URL||pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);
 let views=0,pages=0;
 for(const [width,height] of [[1920,1080],[1366,768],[1280,720],[1024,768],[390,844],[360,640]]){
  await page.setViewportSize({width,height});
  await page.evaluate(()=>{freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);render()});
  for(const state of ['pack','battle','details','class','encounter','journal','help','shop','classes','map','catalogue','bestiary','rewards','inspection','menu','event','trade']){
   await page.evaluate(state=>{
    closeModal(true);hideSpriteDetails();catalogueOpen=false;bestiaryOpen=false;
    if(['pack','battle','details'].includes(state))screenView(state);
    else if(state==='encounter'){screenView('battle');showEnemyDetails()}
    else if(state==='class'){screenView('battle');showClassDetails()}
    else if(['journal'].includes(state)){screenView('details');screenTab(state);if(state==='journal')for(let n=0;n<30;n++)log('Journal entry '+n)}
    else if(state==='help')showHelp();
    else if(state==='shop'){s.phase='prep';ROOMS[s.room].shopKind='shield';enterShop()}
    else if(state==='classes')chooseClass();else if(state==='map')showRunMap();else if(state==='catalogue')openCatalogue();else if(state==='bestiary')openBestiary();
    else if(state==='rewards'){s.phase='reward';reward=rollLoot(4);showRewards()}
    else if(state==='inspection'){s.phase='shop';stock=rollSpecialistStock(5,'dagger');inspectShop(stock[0])}
    else if(state==='menu')screenMenu();
    else if(state==='event'){s.phase='prep';ROOMS[s.room].type='event';ROOMS[s.room].eventId='provisioner';enterEvent()}
    else if(state==='trade'){s.phase='prep';ROOMS[s.room].type='event';ROOMS[s.room].eventId='merchant';delete s.activeEvent;enterEvent()}
   },state);
   await page.waitForTimeout(50);
   const result=await page.evaluate(()=>{
    const issues=[];let count=0;for(const p of screenPagers){if(!p.host.isConnected||!p.host.getBoundingClientRect().height)continue;const old=p.page;for(let n=0;n<p.pages.length;n++){p.page=n;screenShowPage(p);count++;if(p.content.scrollHeight>p.content.clientHeight+3)issues.push('Clipped page: '+p.host.className+' '+n+' '+p.content.scrollHeight+'/'+p.content.clientHeight)}p.page=old;screenShowPage(p)}
    for(const e of document.querySelectorAll('.layout .grid,.layout .invfoot,#fight,.play-tabs,.topright,.screen-modal,#enemyDetails,#classDetails')){if(!e.getBoundingClientRect().height)continue;const r=e.getBoundingClientRect();if(r.bottom>innerHeight+1||r.right>innerWidth+1||r.top<0)issues.push('Outside viewport: '+(e.id||e.className))}
    if(document.documentElement.scrollHeight>innerHeight+1||document.documentElement.scrollWidth>innerWidth+1)issues.push('Document overflow');
    if(!document.querySelector('.classbox')||!document.getElementById('encounterInfo'))issues.push('Lost live information node');return {issues,count}
   });assert.deepEqual(result.issues,[],width+'×'+height+' '+state);views++;pages+=result.count;
  }
 }
 // Use the actual keyboard handler and actual DOM hover/focus, not a helper call.
 await page.setViewportSize({width:1366,height:768});await page.evaluate(()=>{closeModal(true);freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);screenView('pack');screenTab('item');render()});await page.waitForTimeout(60);
 const id=await page.evaluate(()=>s.items[0].id);await page.locator('#item'+id).hover();await page.keyboard.press('s');assert(await page.evaluate(id=>s.stash.some(i=>i.id===id)&&!s.items.some(i=>i.id===id),id),'S failed to stash hovered backpack item');
 await page.locator('#stash [data-item-id="'+id+'"]').hover();const before=await page.evaluate(()=>JSON.stringify(s.items)+JSON.stringify(s.stash));await page.keyboard.press('s');assert.equal(await page.evaluate(()=>JSON.stringify(s.items)+JSON.stringify(s.stash)),before,'S equipped a stashed item');
 await page.evaluate(()=>toggleLargeText());await page.waitForTimeout(60);assert(await page.evaluate(()=>[...screenPagers].filter(p=>p.host.isConnected&&p.host.getBoundingClientRect().height).every(p=>p.content.scrollHeight<=p.content.clientHeight+3)),'Large text clipped');
 await page.evaluate(()=>{closeModal(true);openCatalogue()});await page.waitForTimeout(60);await page.locator('#catalogueSearch').click();await page.keyboard.type('Shield',{delay:75});await page.waitForTimeout(60);assert.equal(await page.locator('#catalogueSearch').inputValue(),'Shield','Catalogue search lost focus during rerender');assert.equal(await page.evaluate(()=>document.activeElement.id),'catalogueSearch');
 await page.evaluate(()=>inspectCatalogueItem(DATA.byName['Health Potion']));await page.waitForTimeout(60);assert(await page.locator('button').filter({hasText:'Back to catalogue'}).isVisible(),'Catalogue inspection return missing');
 await page.evaluate(()=>{closeModal(true);freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);primary()});await page.waitForTimeout(1000);assert(await page.evaluate(()=>s.time>0),'Combat did not advance');await page.evaluate(()=>screenMenu());const paused=await page.evaluate(()=>s.time);await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>s.time),paused,'Menu did not pause combat');await page.evaluate(()=>closeModal(true));await page.waitForTimeout(150);assert(await page.evaluate(t=>s.time>t,paused),'Combat did not resume');
 assert.deepEqual(errors,[]);console.log(`PASS: ${views} browser views, ${pages} content pages, six viewport sizes, live DOM nodes, keyboard stash and larger text`);await browser.close()
})().catch(e=>{console.error(e);process.exit(1)});
