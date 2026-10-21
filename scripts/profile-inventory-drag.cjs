'use strict';
// Optional browser workload: compare counters and CPU time on the same machine.
const path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME||undefined,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']});const page=await browser.newPage({viewport:{width:1366,height:768}});await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);
 await page.evaluate(()=>{freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);gameplayHintsEnabled=false;updateGameplayHints();s.items=[];s.stash=[];const types=DATA.items.filter(d=>d.w===1&&d.h===1&&!d.lootExcluded&&!d.isShiny&&!d.once);for(let n=0;n<30;n++){const i=makeItem(types[n%types.length].id);Object.assign(i,{x:n%6,y:Math.floor(n/6)});s.items.push(i)}render()});await page.waitForTimeout(100);
 await page.evaluate(()=>{window.dragProfile={};for(const name of ['inventoryPreview','inventoryGeometry','art','renderDetail','updateItemEffects','itemLinks','screenPaginate']){const original=window[name];window[name]=function(...args){const t=performance.now();try{return original.apply(this,args)}finally{const m=dragProfile[name]||(dragProfile[name]={calls:0,ms:0});m.calls++;m.ms+=performance.now()-t}}}const previewObserver=new MutationObserver(records=>{dragProfile.previewChildChanges=(dragProfile.previewChildChanges||0)+records.filter(r=>r.type==='childList'&&r.target.id==='inventoryPreview').length});previewObserver.observe(document.getElementById('grid'),{subtree:true,childList:true});});
 const rect=await page.locator('#grid').boundingBox(),pitch=(rect.width+5)/6;await page.mouse.move(rect.x+pitch/2,rect.y+pitch/2);await page.mouse.down();
 // Four samples per cell, including redundant motion inside each destination.
 for(let n=0;n<120;n++){const cell=Math.floor(n/4)%30;await page.mouse.move(rect.x+(cell%6+.45+(n%4)*.02)*pitch,rect.y+(Math.floor(cell/6)+.5)*pitch)}
 await page.mouse.up();await page.waitForTimeout(100);const result=await page.evaluate(()=>dragProfile);for(const value of Object.values(result))if(value&&typeof value==='object')value.ms=Math.round(value.ms*100)/100;console.log(JSON.stringify(result,null,2));await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
