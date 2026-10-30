'use strict';
// One simulation, two presentations. Campaign saves never use the production slot.
const RealmModel={
 version:'0.5.6',mode:'lab',speed:1,paused:false,revision:0,accumulator:0,presentation:null,
 saveKey:'realmpack-phaser-v1',restoring:false,inventoryMutation:false,
 classes:()=>Object.values(classes),dungeons:()=>Object.values(dungeonDefs),
 get state(){return s},get room(){return ROOMS[s.room]},get definitions(){return defs},
 get rewards(){return reward},get journal(){return logs},get selected(){return selected},
 get canEdit(){return !!s&&!['fight','lost','won'].includes(s.phase)&&!s.activeEvent?.pendingEnchant},
 reset(classId='knight',dungeonId=null){
  this.mode='lab';this.restoring=true;clearInterval(timer);this.paused=false;this.accumulator=0;this.speed=1;
  selectedDifficulty='normal';freshRun(classId,true);if(dungeonId&&dungeonDefs[dungeonId])s.portalChoices=[dungeonId];
  selectPortal(s.portalChoices[0]);closeModal(true);inventoryCancel();selected=null;this.restoring=false;this.revision++;return s;
 },
 campaign(classId='knight',practice=false,difficultyId='normal'){
  this.mode='campaign';this.paused=false;this.accumulator=0;this.speed=1;selectedDifficulty=DIFFICULTIES[difficultyId]?difficultyId:'normal';
  clearInterval(timer);freshRun(classId,practice);this.revision++;this.persist();return s;
 },
 item(id){return s&&[...s.items,...s.stash].find(i=>i.id===id)},
 select(id){selected=selected===id?null:id;return selected},
 size:item=>dims(item),count:item=>stackCount(item),remaining:item=>stackRemaining(item),cooldown:item=>cooldown(item),
 inspect(id){const item=this.item(id);if(!item)return null;const d=defs[item.type];return {item,definition:d,title:d.name,summary:describe(d),timing:itemTiming(d),enchantments:enchantMarkup(item),mechanic:d.mechanic?mechanicCard(d):'',adjacency:adjacencyGuide(d),compatibility:affinityNote(d),quantity:stackCount(item),used:stackRemaining(item)}},
 edit(action){
  if(!this.canEdit)return false;const phase=s.phase;this.inventoryMutation=true;s.phase='prep';let result;
  try{result=action()}finally{s.phase=phase;this.inventoryMutation=false;inventoryCancel()}
  this.revision++;this.persist();return result;
 },
 canPlace(id,x,y,rot=null){const i=this.item(id);if(!i||!this.canEdit)return false;const candidate={...i,rot:rot??i.rot},stack=stackAtCell(candidate,x,y);return !!(stack&&stackCount(stack)<STACK_LIMIT)||fits(candidate,x,y,candidate.rot)},
 move(id,x,y,rot=null){const i=this.item(id);if(!i)return false;return this.edit(()=>{inventoryPick(i);const ok=inventoryCommit(i,{x,y,rot:rot??i.rot});selected=ok?null:id;return ok})},
 stash(id,rot=null){const i=this.item(id);if(!i||!s.items.includes(i))return false;return this.edit(()=>{const prior=selected;selected=id;const before=s.items.length;stashSelected();const moved=s.items.length<before;if(moved&&rot!==null)i.rot=!!rot;selected=moved?null:prior;return moved})},
 rotate(id){const i=this.item(id);if(!i||!this.canEdit)return false;const rot=!i.rot;if(s.stash.includes(i))return this.edit(()=>{i.rot=rot;selected=id;return true});const [w,h]=dims({...i,rot}),anchor={x:Math.min(i.x,6-w),y:Math.min(i.y,5-h)},candidates=[];for(let y=0;y<=5-h;y++)for(let x=0;x<=6-w;x++){const distance=Math.abs(x-anchor.x)+Math.abs(y-anchor.y);if(distance<=2&&fits(i,x,y,rot))candidates.push({x,y,distance})}candidates.sort((a,b)=>a.distance-b.distance||a.y-b.y||a.x-b.x);if(!candidates.length)return false;return this.edit(()=>{const ok=inventoryCommit(i,{x:candidates[0].x,y:candidates[0].y,rot});selected=id;return ok})},
 discard(id){if(!this.item(id))return false;return this.edit(()=>{removeItem(id);return true})},
 start(){if(s.phase!=='prep'){if(this.mode==='campaign')restorePhaseModal();return false}this.persist();startFight();clearInterval(timer);timer=null;this.accumulator=0;this.revision++;return s.phase==='fight'},
 step(seconds){if(this.paused||s.phase!=='fight'||!Number.isFinite(seconds)||seconds<=0)return;this.accumulator+=Math.min(.25,seconds);while(this.accumulator>=.05&&s.phase==='fight'){this.accumulator-=.05;tick(.05*this.speed)}},
 retry(){if(this.mode!=='lab'||s.phase==='fight')return false;reward=[];s.pendingSupplies=[];s.hp=s.max;s.phase='prep';setEnemy();closeModal(true);selected=null;this.accumulator=0;this.revision++;return true},
 loot(id){if(s.phase!=='reward'||id&&!reward.includes(id))return false;if(this.mode==='campaign'){takeLoot(id);this.revision++;return true}if(id&&!receiveItem(makeItem(id)))return false;this.retry();return true},
 links(){return itemLinks()},manaMax:()=>manaCapacity(),snapshot(){return JSON.stringify({s,uid,reward,stock})},
 export(){return {format:'RealmPack Phaser',schema:1,version:this.version,mode:'campaign',speed:this.speed,run:JSON.parse(this.snapshot())}},
 persist(){
  if(this.mode!=='campaign'||this.restoring||this.inventoryMutation||!s||s.phase==='fight')return false;
  try{syncRingVitals();localStorage.setItem(this.saveKey,JSON.stringify(this.export()));this.saveError=false;return true}catch{this.saveError=true;window.realmNotice?.('Save unavailable. Export your run from Menu to keep a backup.');return false}
 },
 valid(data){try{return this.validRun(data)}catch{return false}},
 validRun(data){
  const run=data?.run||data,t=run?.s;if(!t||t.version!==4||!classes[t.classId]||!Array.isArray(t.route)||!t.route.length||t.route.length>5000||!Number.isInteger(t.room)||t.room<0||t.room>=t.route.length)return false;
  if(!['prep','fight','portal','path','reward','rest','shop','event','eventResult','boon','won','lost'].includes(t.phase)||!Array.isArray(t.items)||!Array.isArray(t.stash)||t.items.length+t.stash.length>200)return false;
  const owned=[...t.items,...t.stash];if(owned.some(i=>!i||!defs[i.type]||!Number.isSafeInteger(i.id)||i.id<=0||!Number.isFinite(i.charge??0))||new Set(owned.map(i=>i.id)).size!==owned.length)return false;
  if(!t.enemy||!Array.isArray(t.dungeons)||!Array.isArray(t.boons)||!Array.isArray(t.history))return false;
  if(t.phase==='event'&&(!t.activeEvent||t.activeEvent.depth!==t.room))return false;
  const pending=t.activeEvent?.pendingEnchant;if(pending&&(!owned.some(i=>i.id===pending.itemId)||pending.kind==='batch'&&(!Array.isArray(pending.next)||!Array.isArray(pending.old))))return false;
  if(!['hp','max','mana','gold'].every(k=>Number.isFinite(t[k]))||t.max<=0||!t.route.every(r=>r&&typeof r==='object'&&typeof r.type==='string'))return false;
  if(!Array.isArray(run.reward||[])||!Array.isArray(run.stock||[]))return false;
  if((run.reward||[]).some(id=>!defs[id])||(run.stock||[]).some(id=>!defs[id]))return false;return true;
 },
 readSaved(){try{const data=JSON.parse(localStorage.getItem(this.saveKey)||'null');return this.valid(data)?data:null}catch{return null}},
 load(data=null){
  let candidate;try{candidate=data||JSON.parse(localStorage.getItem(this.saveKey)||'null')}catch{return false}if(!this.valid(candidate))return false;
  const previous={state:s,route:ROOMS,uid,reward,stock,mode:this.mode,logs,selectedDifficulty};
  const run=JSON.parse(JSON.stringify(candidate.run||candidate));this.mode='campaign';this.restoring=true;clearInterval(timer);s=run.s;ROOMS=s.route;uid=Math.max(Number(run.uid)||0,...[...s.items,...s.stash].map(i=>i.id));reward=run.reward||[];stock=run.stock||[];selected=null;inventoryCancel();modalKind='';catalogueOpen=false;bestiaryOpen=false;logs=[];this.presentation=null;this.speed=[1,2,4].includes(candidate.speed)?candidate.speed:1;selectedDifficulty=DIFFICULTIES[s.difficulty]?s.difficulty:'normal';s.difficulty=selectedDifficulty;
  try{migrateDaggerItems();migrateConsumables();rebalanceSavedRoute();if(s.phase==='fight'){s.phase='prep';setEnemy()}refreshEncounterArtwork();rebalanceGold()}catch{ s=previous.state;ROOMS=previous.route;uid=previous.uid;reward=previous.reward;stock=previous.stock;this.mode=previous.mode;logs=previous.logs;selectedDifficulty=previous.selectedDifficulty;return false }finally{this.restoring=false}
  this.accumulator=0;this.paused=false;this.revision++;this.persist();return true;
 },
 resume(){if(this.mode==='campaign')restorePhaseModal()},
 present(title,desc,body,kind){this.presentation={title,desc,body,kind};window.onRealmPresentation?.(this.presentation)},
 dismiss(){this.presentation=null;modalKind='';catalogueOpen=false;bestiaryOpen=false;window.onRealmDismiss?.()}
};
window.RealmModel=RealmModel;
save=()=>RealmModel.persist();
const legacyRender=render,legacyClose=closeModal,legacySprite=spriteMarkup,legacyChooseClass=chooseClass,legacyFreshRun=freshRun;
render=function(...args){const result=legacyRender(...args);RealmModel.revision++;return result};
modal=function(title,desc,body,kind='normal'){
 if(RealmModel.inventoryMutation||RealmModel.mode==='lab'&&['portal','path','reward','supplies','rewardinspect','event','rest','boon','defeat','ending','eventResult'].includes(kind))return;
 modalKind=kind;RealmModel.present(title,desc,body,kind);
};
closeModal=function(force=false){if(RealmModel.inventoryMutation)return;const result=legacyClose(force);if(!modalKind)RealmModel.dismiss();return result};
spriteMarkup=function(...args){return legacySprite(...args).replaceAll("url('assets/","url('../game/assets/")};
chooseClass=function(...args){legacyChooseClass(...args);if(typeof document!=='undefined'&&document.getElementById('classPreviewContent'))previewClass(classPreviewId)};
freshRun=function(...args){const result=legacyFreshRun(...args);RealmModel.revision++;return result};
toast=function(message){window.realmNotice?.(message)};

const legacyConfirmClass=confirmClassStart;
confirmClassStart=function(revision){const oldMode=RealmModel.mode;if(pendingClassStart?.revision===revision)RealmModel.mode='campaign';const result=legacyConfirmClass(revision);if(!result)RealmModel.mode=oldMode;else RealmModel.persist();return result};
