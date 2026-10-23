'use strict';
const {ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
 const check=(ok,msg)=>{if(!ok)throw Error(msg)};
 freshRun('knight',true);selectPortal(s.portalChoices[0]);
 const bundles=DATA.items.filter(d=>d.once&&/\\s[x×]\\d+$/i.test(d.name)),ring=DATA.byName['Ring of Magic'];
 const reset=()=>{s.phase='prep';s.items=[];s.stash=[];s.gold=1000};
 const total=type=>[...s.items,...s.stash].filter(i=>i.type===type).reduce((n,i)=>n+stackCount(i),0);
 for(const d of bundles){reset();const count=Number(/(\\d+)$/.exec(d.name)[1]);check(makeItem(d.id).quantity===count,'Initial quantity: '+d.name);check(receiveItem(makeItem(d.id))&&total(d.id)===count,'Missing copies: '+d.name);check(s.stash.every(i=>i.quantity<=5)&&new Set(s.stash.map(i=>i.id)).size===s.stash.length,'Stack cap or duplicate IDs');check(count===1||describe(d).includes('Contains '+count+' copies.'),'Bundle description');check(merchantUnitPrice(s.stash[0])*count<=d.price,'Bundle buy/sell arbitrage')}
 const originalFour=DATA.byName["Vamp Steak Flambe' x4"],originalSix=DATA.byName['Chocolate Bonbon x6'];check(originalFour&&originalSix,'Legacy fixtures');check(defs[originalFour].lootExcluded&&defs[originalSix].lootExcluded,'Retired bundles still obtainable');const four='test_bundle_four',six='test_bundle_six';for(const [id,original] of [[four,originalFour],[six,originalSix]])defs[id]={...defs[original],id,lootExcluded:false,catalogueHidden:false,consumableRework:false,consumable:undefined};
 reset();s.stash=Array.from({length:8},()=>makeItem(ring));const incoming=makeItem(six),before=JSON.stringify(s);check(!stashCanReceive(incoming)&&!receiveItem(incoming)&&JSON.stringify(s)===before&&incoming.quantity===6,'Atomic oversized refusal');
 reset();s.stash=Array.from({length:7},()=>makeItem(ring));receiveItem(makeItem(six));check(s.stash.length===9&&total(six)===6&&s.stash.slice(-2).map(i=>i.quantity).join(',')==='5,1','Six splits into five and one');
 reset();const owned=makeItem(four);owned.quantity=1;s.stash=[owned,...Array.from({length:8},()=>makeItem(ring))];check(stashCanReceive({id:-1,type:four})&&receiveItem(makeItem(four))&&owned.quantity===5&&s.stash.length===9,'Whole bundle merge into full stash');
 reset();const partial=makeItem(four);partial.quantity=3;s.stash=[partial,...Array.from({length:8},()=>makeItem(ring))];s.phase='shop';stock=[four];const gold=s.gold;buy(four);check(s.gold===gold&&stock.includes(four)&&partial.quantity===3,'Blocked purchase charged gold or merged partially');s.stash.pop();buy(four);check(s.gold===gold-defs[four].price&&!stock.includes(four)&&total(four)===7,'Purchase whole bundle and remainder');
 reset();s.phase='reward';reward=[four];takeLoot(four);check(total(four)===4,'Loot bundle');
 reset();addSandbox(six);check(total(six)===6,'Sandbox bundle');
 reset();s.phase='event';s.activeEvent={id:'cook',depth:s.room,offers:{ration:four}};resolveEvent('ration');check(total(four)===4,'Event bundle');
 reset();s.phase='event';s.activeEvent={id:'cook',depth:s.room,offers:{ration:six}};s.stash=Array.from({length:8},()=>makeItem(ring));check(eventStashReason(noncombatById.cook.choices.find(c=>c.id==='ration')),'Event preflight counts all slots');
 reset();const legacy=makeItem(four);legacy.quantity=2;s.stash=[legacy];check(stackCount(legacy)===2,'Existing partial quantity changed');splitSelectedStack(legacy.id);check(total(four)===2&&s.stash.length===2,'Split generated a new bundle');
 for(const d of DATA.items.filter(d=>d.once&&!/\\s[x×]\\d+$/i.test(d.name)))check(makeItem(d.id).quantity===1,'Unrelated number parsed as quantity: '+d.name);
 reset();defs.bundle_clone={...defs[four],id:'bundle_clone',quality:1,lootExcluded:false};const clone=makeItem('bundle_clone');clone.quantity=2;s.stash=[clone];s.phase='event';s.activeEvent={id:'mirror',depth:s.room,offers:{}};resolveEvent('copy',clone.id);check(total('bundle_clone')===3,'Clone should add one copy, not a fresh bundle');
 reset();const old=makeItem(four);delete old.quantity;Object.assign(old,{x:0,y:0});s.items=[old];selected=old.id;stashSelected();check(total(four)===1,'Legacy missing quantity inflated during transfer');
 // Repeated per-copy use still respects the current healing threshold.
 reset();const healing=makeItem(four);Object.assign(healing,{x:0,y:0});s.items=[healing];s.phase='fight';s.max=1000;s.hp=100;s.enemy.hp=s.enemy.max=1e6;
 for(let n=0;n<4;n++)activate(healing);check(healing.used&&stackRemaining(healing)===0&&healing.activations===4,'Bundle use budget');
 return 'PASS: '+bundles.length+' numbered variants, exact counts, five-copy overflow, unique IDs, atomic capacity/purchases, loot/events/Sandbox, legacy/split safety, unrelated digits, sale pricing and per-copy healing';
})()`,ctx));
