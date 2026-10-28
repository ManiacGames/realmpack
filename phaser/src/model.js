'use strict';
// Transitional adapter: the original simulation runs headlessly. Phaser owns presentation
// and the clock. Never boot the legacy UI or read/write the production save slot.
save=()=>{};
const RealmModel={
 version:'0.1.0',speed:1,paused:false,revision:0,accumulator:0,
 classes:()=>Object.values(classes),
 dungeons:()=>Object.values(dungeonDefs),
 get state(){return s},get room(){return ROOMS[s.room]},get definitions(){return defs},
 get rewards(){return reward},get journal(){return logs},
 reset(classId='knight',dungeonId=null){
  clearInterval(timer);this.paused=false;this.accumulator=0;this.speed=1;
  selectedDifficulty='normal';freshRun(classId,true);
  if(dungeonId&&dungeonDefs[dungeonId])s.portalChoices=[dungeonId];
  selectPortal(s.portalChoices[0]);closeModal(true);inventoryCancel();selected=null;
  this.revision++;return s;
 },
 item(id){return [...s.items,...s.stash].find(i=>i.id===id)},
 select(id){selected=selected===id?null:id;return selected},
 get selected(){return selected},
 size:item=>dims(item),count:item=>stackCount(item),remaining:item=>stackRemaining(item),
 cooldown:item=>cooldown(item),
 inspect(id){const item=this.item(id);if(!item)return null;const d=defs[item.type];return {item,definition:d,title:d.name,summary:describe(d),timing:itemTiming(d),enchantments:enchantMarkup(item),mechanic:d.mechanic?mechanicCard(d):'',adjacency:adjacencyGuide(d),compatibility:affinityNote(d),quantity:stackCount(item),used:stackRemaining(item)}},
 canPlace(id,x,y,rot=null){const i=this.item(id);if(!i||s.phase!=='prep')return false;const candidate={...i,rot:rot??i.rot};const stack=stackAtCell(candidate,x,y);return !!(stack&&stackCount(stack)<STACK_LIMIT)||fits(candidate,x,y,candidate.rot)},
 move(id,x,y,rot=null){const i=this.item(id);if(!i||s.phase!=='prep')return false;inventoryPick(i);const ok=inventoryCommit(i,{x,y,rot:rot??i.rot});inventoryCancel();selected=ok?null:id;if(ok)this.revision++;return ok},
 stash(id){const i=this.item(id);if(!i||s.phase!=='prep'||!s.items.includes(i))return false;selected=id;const before=s.items.length;stashSelected();inventoryCancel();selected=null;if(s.items.length<before){this.revision++;return true}return false},
 rotate(id){const i=this.item(id);if(!i||s.phase!=='prep')return false;const rot=!i.rot;if(s.stash.includes(i)){i.rot=rot;this.revision++;return true}return this.move(id,i.x,i.y,rot)},
 discard(id){if(s.phase!=='prep'||!this.item(id))return false;removeItem(id);this.revision++;return true},
 start(){if(s.phase!=='prep')return false;startFight();clearInterval(timer);timer=null;this.accumulator=0;this.revision++;return s.phase==='fight'},
 step(seconds){
  if(this.paused||s.phase!=='fight'||!Number.isFinite(seconds)||seconds<=0)return;
  this.accumulator+=Math.min(.25,seconds);while(this.accumulator>=.05&&s.phase==='fight'){this.accumulator-=.05;tick(.05*this.speed)}
 },
 retry(){if(s.phase==='fight')return false;reward=[];s.pendingSupplies=[];s.hp=s.max;s.phase='prep';setEnemy();closeModal(true);selected=null;this.accumulator=0;this.revision++;return true},
 loot(id){if(s.phase!=='reward'||!reward.includes(id))return false;const taken=receiveItem(makeItem(id));if(!taken)return false;this.retry();return true},
 links(){return itemLinks()},
 manaMax:()=>manaCapacity(),
 snapshot(){return JSON.stringify({s,uid,reward,stock})}
};
window.RealmModel=RealmModel;
