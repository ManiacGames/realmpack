'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{spawn}=require('node:child_process'),{once}=require('node:events'),{chromium}=require('playwright');
(async()=>{
 const project=path.resolve(__dirname,'..'),server=spawn(process.execPath,[path.join(project,'scripts/serve.cjs'),'--port=4175',...(process.env.REALMPACK_BUILT?['--built']:[])]);let browser;
 try{
  await once(server.stdout,'data');browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME||undefined,args:['--no-sandbox','--no-zygote','--single-process','--disable-dev-shm-usage']});const page=await browser.newPage({viewport:{width:1366,height:768}}),errors=[];
  page.on('pageerror',e=>{console.error(e.stack);errors.push(e.message)});page.on('response',r=>{if(r.status()>=400)errors.push('HTTP '+r.status()+' '+r.url())});
  await page.goto('http://127.0.0.1:4175/phaser/');await page.waitForFunction(()=>!!window.realmScene);
  assert.equal(await page.evaluate(()=>Phaser.VERSION),'3.90.0');assert.equal(await page.locator('#game canvas').count(),1);
  const save=await page.evaluate(()=>localStorage.getItem('realmpack-v4'));
  const point=()=>page.evaluate(()=>{const n=realmScene.itemNodes.get(RealmModel.state.items[0].id),r=document.querySelector('canvas').getBoundingClientRect();return {id:n.itemId,x:r.x+n.x+n.w/2,y:r.y+n.y+n.h/2,stashX:r.x+realmScene.stash.x+realmScene.stash.cell/2,stashY:r.y+realmScene.stash.y+realmScene.stash.cell/2}});
  let p=await point();await page.mouse.move(p.x,p.y);await page.mouse.click(p.x,p.y);assert.equal(await page.evaluate(()=>RealmModel.selected),p.id);
  await page.keyboard.press('f');assert(await page.locator('#item-details').evaluate(e=>e.open));await page.keyboard.press('Escape');
  const nodesBefore=await page.evaluate(()=>realmScene.children.length);for(let n=0;n<20;n++)await page.mouse.move(p.x+(n%2),p.y);assert.equal(await page.evaluate(()=>realmScene.children.length),nodesBefore,'Hover must not rebuild scene');
  await page.mouse.move(p.x,p.y);await page.mouse.down();await page.mouse.move(p.stashX,p.stashY,{steps:8});await page.mouse.up();await page.waitForTimeout(80);assert(await page.evaluate(id=>RealmModel.state.stash.some(i=>i.id===id),p.id),'Actual Phaser drag into stash');
  const back=await page.evaluate(id=>{const n=realmScene.itemNodes.get(id),r=document.querySelector('canvas').getBoundingClientRect(),b=realmScene.pack;return {x:r.x+n.x+n.w/2,y:r.y+n.y+n.h/2,tx:r.x+b.x+b.cell/2,ty:r.y+b.y+b.cell/2}},p.id);await page.mouse.move(back.x,back.y);await page.mouse.down();await page.mouse.move(back.tx,back.ty,{steps:8});await page.mouse.up();await page.waitForTimeout(80);assert(await page.evaluate(id=>RealmModel.state.items.some(i=>i.id===id),p.id),'Actual drag from stash into backpack');
  p=await point();await page.mouse.click(p.x,p.y);await page.keyboard.press('d');assert(await page.locator('#discard-confirm').evaluate(e=>e.open));await page.keyboard.press('Escape');assert(await page.evaluate(id=>!!RealmModel.item(id),p.id));
  await page.keyboard.press('Escape');await page.locator('#fight').click();await page.waitForTimeout(350);assert(await page.evaluate(()=>RealmModel.state.time>0));await page.locator('#menu').click();const time=await page.evaluate(()=>RealmModel.state.time);await page.waitForTimeout(180);assert.equal(await page.evaluate(()=>RealmModel.state.time),time);await page.keyboard.press('Escape');await page.waitForTimeout(180);assert(await page.evaluate(t=>RealmModel.state.time>t,time));
  await page.evaluate(()=>{RealmModel.state.hp=0;finishBattle(false)});await page.waitForFunction(()=>document.getElementById('result').open);await page.locator('#retry').click();assert.equal(await page.evaluate(()=>RealmModel.state.phase),'prep');
  await page.evaluate(()=>{RealmModel.reset('knight','dungeon_0');realmScene.rebuild()});
  await page.waitForTimeout(100);const touch=await point(),cdp=await page.context().newCDPSession(page);await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:true,maxTouchPoints:1});
  await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:touch.x,y:touch.y}]});for(let n=1;n<=8;n++)await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x:touch.x+(touch.stashX-touch.x)*n/8,y:touch.y+(touch.stashY-touch.y)*n/8}]});await page.waitForTimeout(50);await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});await page.waitForTimeout(80);assert(await page.evaluate(id=>RealmModel.state.stash.some(i=>i.id===id),touch.id),'Real touch drag');await cdp.send('Emulation.setTouchEmulationEnabled',{enabled:false});await cdp.detach();
  let views=0;for(const [width,height] of [[1920,1080],[1366,768],[1024,600],[700,400],[390,844],[360,640]]){
   await page.setViewportSize({width,height});await page.waitForTimeout(100);
   assert(await page.evaluate(()=>document.documentElement.scrollHeight<=innerHeight+1&&document.documentElement.scrollWidth<=innerWidth+1),`${width}x${height} page overflow`);
   assert(await page.evaluate(()=>[...realmScene.itemNodes.values()].every(n=>n.x>=0&&n.y>=0&&n.x+n.w<=realmScene.scale.width+1&&n.y+n.h<=realmScene.scale.height+1)),`${width}x${height} item clipping`);
   await page.locator('#menu').click();assert(await page.locator('#settings').evaluate(e=>{const r=e.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight&&r.left>=0&&r.right<=innerWidth}));await page.keyboard.press('Escape');
   if(width===1366||width===390)await page.screenshot({path:`/tmp/realmpack-phaser-${width}.png`});views++;
  }
  await page.getByRole('tab',{name:'Stash',exact:true}).click();assert.equal(await page.evaluate(()=>realmScene.view),'stash');await page.getByRole('tab',{name:'Backpack',exact:true}).click();
  await page.locator('#menu').click();await page.locator('#class-choice').selectOption('wizard');await page.locator('#dungeon-choice').selectOption('dungeon_1');await page.locator('#new-run').click();assert.equal(await page.evaluate(()=>RealmModel.state.classId),'wizard');assert.equal(await page.evaluate(()=>RealmModel.room.dungeonId),'dungeon_1');assert.equal(await page.evaluate(()=>localStorage.getItem('realmpack-v4')),save);
  assert.deepEqual(errors,[]);console.log(`PASS: Phaser canvas/textures, real pointer drags both directions and touch dragging, inspection/cancel, stable hover nodes, combat clock/pause/results, ${views} responsive views, mobile tabs, class/dungeon selection, production save isolation`);
 }finally{await browser?.close();server.kill()}
})().catch(error=>{console.error(error);process.exit(1)});
