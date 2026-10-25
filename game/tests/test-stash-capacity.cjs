'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const root=path.resolve(__dirname,'..');const ctx={window:{__TEST__:true},console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(){},getItem(){return null}}};vm.createContext(ctx);
for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','item-balance.js','realm-specials.js','dagger-update.js','sword-update.js','staff-update.js','wand-update.js','katana-update.js','ring-update.js','armor-update.js','ability-update.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','consumables-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','battle-floors.js','class-runtime.js','shop-specialists.js','game.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};
// New runs grant class gear and shared supplies, with no universal spare tome.
for(const classId of Object.keys(classes))for(const practice of [false,true]){
 freshRun(classId,practice);
 const expected=[...classes[classId].startingIds.slice(0,3),DATA.byName['Ring of Magic'],DATA.byName['Health Potion']].sort();
 const actual=[...s.items,...s.stash].map(i=>i.type).sort();
 check(JSON.stringify(actual)===JSON.stringify(expected),'Unexpected starting gear for '+classId);
 if(classId==='priest')check(actual.includes(DATA.byName['Healing Tome']),'Priest lost its class tome');
}
freshRun('knight',true);selectPortal(s.portalChoices[0]);
const weaponType=classes.knight.startingIds[0],potionType=DATA.byName['Health Potion'],ringType=DATA.byName['Ring of Magic'];
const fill=n=>{s.stash=Array.from({length:n},()=>makeItem(ringType))};
const prepare=()=>{s.phase='prep';s.items=[];s.stash=[];const w=makeItem(weaponType);Object.assign(w,{x:0,y:0});s.items.push(w);return w};
let w=prepare();fill(8);const ninth=makeItem(weaponType);check(receiveItem(ninth)&&s.stash.length===9,'Ninth slot blocked');const tenth=makeItem(weaponType);check(receiveItem(tenth)===null&&s.stash.length===9&&!s.stash.includes(tenth),'Tenth slot admitted');
selected=w.id;stashSelected();check(s.items.includes(w)&&w.x===0&&w.y===0&&s.stash.length===9,'Failed transfer lost packed gear');
const partial=makeItem(potionType);partial.quantity=4;s.stash[0]=partial;const incoming=makeItem(potionType);incoming.quantity=2;check(receiveItem(incoming)===null&&partial.quantity===4&&incoming.quantity===2,'Failed merge partially mutated quantities');
incoming.quantity=1;check(receiveItem(incoming)&&partial.quantity===5&&s.stash.length===9,'Full stash cannot merge');
const variant=makeItem(potionType);variant.eventInfusion=.12;check(receiveItem(variant)===null,'Different infusion merged or exceeded cap');
selected=partial.id;splitSelectedStack();check(partial.quantity===5&&s.stash.length===9,'Split bypassed cap');
s.stash.pop();splitSelectedStack();check(partial.quantity===4&&s.stash.length===9,'Split into ninth slot failed');
// Inventory transfers can merge entirely into existing stash stacks, but not partly.
w=prepare();fill(9);const packed=makeItem(potionType);packed.quantity=2;Object.assign(packed,{x:2,y:0});s.items.push(packed);const dest=makeItem(potionType);dest.quantity=3;s.stash[0]=dest;selected=packed.id;stashSelected();check(!s.items.includes(packed)&&dest.quantity===5&&s.stash.length===9,'Packed stack merge blocked');
// Buying and claiming blocked items must leave currency, offers and phase untouched.
fill(9);s.phase='shop';s.gold=1000;stock=[weaponType];buy(weaponType);check(s.gold===1000&&stock.includes(weaponType)&&s.stash.length===9,'Full stash purchase spent gold/stock');
s.phase='reward';reward=[weaponType];takeLoot(weaponType);check(s.phase==='reward'&&reward.includes(weaponType)&&s.stash.length===9,'Blocked reward advanced room');
ROOMS[s.room].type='boss';takeLoot(null);check(s.phase==='boon','Full stash prevents skipping loot');
// Event cost guards happen before payment; sacrificing a stashed donor frees one slot.
s.phase='event';s.activeEvent={id:'cache',depth:s.room,roll:.2,offers:{unlock:weaponType}};s.gold=1000;const hp=s.hp;resolveEvent('unlock');check(s.gold===1000&&s.hp===hp&&s.phase==='event','Blocked event consumed cost');
s.activeEvent={id:'well',depth:s.room,roll:.2,offers:{wish:weaponType}};const wish=noncombatById.well.choices.find(c=>c.id==='wish'),luckyReason=choiceBlockReason(wish);s.activeEvent.roll=.8;check(luckyReason===choiceBlockReason(wish)&&luckyReason===STASH_FULL_MESSAGE,'Capacity gate leaks lottery outcome');
s.activeEvent={id:'curios',depth:s.room,roll:.2,offers:{trade:weaponType}};const donor=s.stash[0];resolveEvent('trade',donor.id);check(s.phase==='eventResult'&&s.gold===985&&s.stash.length===9&&!s.stash.includes(donor),'Full-stash exchange did not use freed slot');
// Exact clone upgrades are considered before merging, not applied to the recipient afterward.
s.phase='event';fill(9);const upgraded=makeItem(potionType);upgraded.quantity=2;upgraded.eventInfusion=.12;s.stash[0]=upgraded;s.activeEvent={id:'mirror',depth:s.room,roll:.2,offers:{}};check(!eventStashReason({effects:[['clone',0]]},upgraded),'Compatible upgraded clone blocked');const plain={...upgraded,id:-1,eventInfusion:0};check(!stashCanReceive(plain),'Mismatched clone accepted');
// Both modes use the same receiver; legacy over-cap saves retain items but cannot begin battle.
s.phase='prep';s.practice=true;fill(9);addSandbox(weaponType);check(s.stash.length===9,'Sandbox bypassed cap');
s.practice=false;fill(10);const previousType=ROOMS[s.room].type;ROOMS[s.room].type='shop';startFight();check(s.phase==='shop','Over-cap legacy stash cannot enter a merchant');s.phase='prep';ROOMS[s.room].type=previousType;const ids=s.stash.map(i=>i.id).join();startFight();check(s.phase==='prep'&&s.stash.map(i=>i.id).join()===ids,'Legacy over-cap stash lost items or fought');s.stash.pop();startFight();check(s.phase==='fight','Legal stash cannot begin battle');
return 'PASS: all 19 class starters in normal/Sandbox modes, ninth-slot boundary, atomic partial merges, variant safety, packed transfers, splitting, purchases/rewards without loss, event costs and freed slots, clone compatibility, Sandbox and legacy over-cap battle guard';
})()`,ctx));
