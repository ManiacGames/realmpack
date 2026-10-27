'use strict';
const assert=require('node:assert/strict'),{chromium}=require('playwright'),path=require('node:path'),{pathToFileURL}=require('node:url');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']}),page=await browser.newPage(),errors=[];
 page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);
 assert.equal(await page.evaluate(()=>soundContext),null,'Audio must wait for a gesture');
 await page.evaluate(()=>{freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);inventoryCancel();gameplayHintsEnabled=false;updateGameplayHints();showSoundSettings()});
 await page.getByRole('button',{name:'Test sound',exact:true}).click();assert.equal(await page.evaluate(()=>soundContext.state),'running');
 await page.locator('#sound-master').fill('37');await page.locator('#sound-interface').fill('42');await page.locator('#sound-combat').fill('29');
 await page.getByRole('button',{name:'Mute sounds',exact:true}).click();assert.equal(await page.evaluate(()=>playSound('loot')),false);
 await page.reload();assert.deepEqual(await page.evaluate(()=>soundSettings),{master:37,interface:42,combat:29,muted:true});
 await page.evaluate(()=>{freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);inventoryCancel();gameplayHintsEnabled=false;updateGameplayHints();showSoundSettings()});
 await page.getByRole('button',{name:'Unmute sounds',exact:true}).click();await page.waitForTimeout(200);
 const audio=await page.evaluate(async()=>{
  const real=soundContext,offline=new OfflineAudioContext(1,48000,48000);soundContext={state:"running",currentTime:0,createOscillator:()=>offline.createOscillator(),createGain:()=>offline.createGain()};soundMaster=offline.createGain();soundMaster.connect(offline.destination);soundChannels={};for(const key of ['interface','combat']){soundChannels[key]=offline.createGain();soundChannels[key].connect(soundMaster)}soundApplyVolumes();soundLast.clear();soundLastCombat=-Infinity;soundVoices=0;
  const accepted=playSound('victory'),buffer=await offline.startRendering(),energy=buffer.getChannelData(0).reduce((n,v)=>n+v*v,0);soundContext=real;soundMaster=real.createGain();soundMaster.connect(real.destination);soundChannels={};for(const key of ['interface','combat']){soundChannels[key]=real.createGain();soundChannels[key].connect(soundMaster)}soundApplyVolumes();soundLast.clear();soundLastCombat=-Infinity;soundVoices=0;return {accepted,energy};
 });assert(audio.accepted);assert(audio.energy>0,'Cue must produce audio samples');
 const burst=await page.evaluate(()=>{soundLast.clear();soundLastCombat=-Infinity;const first=playSound('hit'),repeat=playSound('hit');for(let n=0;n<1000;n++)playSound('heal');return {first,repeat,voices:soundVoices}});assert(burst.first);assert.equal(burst.repeat,false);assert(burst.voices<=8);
 const hooks=await page.evaluate(()=>{
  const calls=[],original=playSound;playSound=name=>{calls.push(name);return false};
  freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);inventoryCancel();calls.length=0;
  const item=s.items[0];inventoryPick(item);inventoryCommit(item,{x:item.x,y:item.y,rot:item.rot});selected=item.id;stashSelected();removeItem(item.id);
  s.phase='shop';stock=[DATA.byName['Ring of Magic']];s.gold=1000;buy(stock[0]);const successful=calls.slice();calls.length=0;buy('invalid');removeItem(-1);const failed=calls.slice();
  s.phase='fight';s.hp=s.max-20;s.enemy.hp=1000;s.enemy.max=1000;hit(5);restore(4,false);s.mana=0;gainMana(1);s.block=10;playerDamage(4,0,false);s.block=0;playerDamage(4,0,false);const combat=calls.slice();
  playSound=original;return {successful,failed,combat};
 });for(const cue of ['move','discard','loot','coin'])assert(hooks.successful.includes(cue),cue);assert.deepEqual(hooks.failed,[]);for(const cue of ['hit','heal','mana','block','hurt'])assert(hooks.combat.includes(cue),cue);
 const rates=await page.evaluate(()=>{
  const results=[];for(const rate of [1,2,4]){
   freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);inventoryCancel();startFight();clearInterval(timer);s.hp=s.max=100000;s.enemy.hp=s.enemy.max=100000;s.seed=12345;const base=JSON.stringify(s),id=uid;
   const run=muted=>{s=JSON.parse(base);ROOMS=s.route;uid=id;soundSettings.muted=muted;for(let n=0;n<30;n++)tick(.05*rate);return JSON.stringify(s)};results.push(run(true)===run(false));
  }s.phase='prep';setSoundSetting('muted',false);return results;
 });assert.deepEqual(rates,[true,true,true],'Audio must not change seeded combat at any speed');
 let views=0;for(const [width,height] of [[1366,768],[1024,600],[700,400],[390,844],[360,640]])for(const large of [false,true]){
  await page.setViewportSize({width,height});await page.evaluate(large=>{setLargeText(large);showSoundSettings()},large);await page.waitForTimeout(80);
  const bad=await page.evaluate(()=>{const modal=document.querySelector('.modal'),r=modal.getBoundingClientRect();return r.top<0||r.bottom>innerHeight+1||r.left<0||r.right>innerWidth+1||modal.scrollHeight>modal.clientHeight+2||[...modal.querySelectorAll('input,button')].some(el=>{const b=el.getBoundingClientRect();return b.bottom>r.bottom||b.top<r.top})});if(bad)console.log(await page.evaluate(()=>{const m=document.querySelector(".modal");return {rect:m.getBoundingClientRect().toJSON(),scroll:m.scrollHeight,client:m.clientHeight,children:[...m.querySelectorAll("input,button")].map(e=>({tag:e.tagName,text:e.textContent,rect:e.getBoundingClientRect().toJSON()}))}}));assert.equal(bad,false,`${width}x${height}, large=${large}`);views++;
 }
 await page.screenshot({path:'/tmp/realmpack-sound-settings.png'});assert.deepEqual(errors,[]);await browser.close();console.log(`PASS: gesture unlock, audible samples, mute/persistence, successful action hooks, failed-action silence, seeded combat parity at 1x/2x/4x, ${views} volume layouts`);
})().catch(e=>{console.error(e);process.exit(1)});
