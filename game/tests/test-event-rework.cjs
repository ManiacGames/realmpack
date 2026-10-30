'use strict';
const assert=require('node:assert/strict'),crypto=require('node:crypto'),{ctx,vm}=require('./load-game.cjs');
ctx.document={addEventListener(){}};
assert.equal(crypto.createHash('sha256').update(vm.runInContext('JSON.stringify(DATA.items)',ctx)).digest('hex'),'3a4975b141c25b784b885767394702242cb7af9572486e69e6136a8a6c0eb57e','Item definitions changed');
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};log=()=>{};
function setup(id,act=0,mode='normal',classId='wizard'){
 freshRun(classId,true);s.seed=123456;s.room=act*10+2;s.max=200;s.hp=mode==='full'?200:mode==='low'?10:100;s.gold=mode==='poor'?0:500;s.mana=mode==='fullMana'?manaCapacity():5;s.eventBuffs={};s.stash=[];s.items=[];
 for(const type of classes[classId].startingIds.slice(0,3))check(autoPlace(makeItem(type)),'Fixture packing');
 s.stash.push(Object.assign(makeItem(DATA.byName['Health Potion']),{quantity:5}),Object.assign(makeItem(DATA.byName['Magic Potion']),{quantity:3}),makeItem(DATA.items.find(d=>!d.isShiny&&!d.lootExcluded&&d.group==='armor'&&d.quality===2).id));
 if(mode==='fullStash')while(s.stash.length<9)s.stash.push(makeItem(DATA.byName['Ring of Magic']));
 s.activeEvent=null;ROOMS[s.room]={type:'event',eventId:id,dungeonId:'dungeon_6',hp:0,damage:0,cd:3};enterEvent();return s.activeEvent;
}
let checks=0;
for(const e of NONCOMBAT_EVENTS)for(const act of[0,1,2])for(const mode of['normal','full','low','poor','fullStash','fullMana']){
 let a=setup(e.id,act,mode);const ids=a.choices.map(c=>c.id);
 for(const id of ids){a=setup(e.id,act,mode);const c=a.choices.find(c=>c.id===id),target=c.target?selectedEventTarget(c):null,reason=choiceBlockReason(c,target),before=JSON.stringify(s),roll=a.roll,gold=s.gold;
 if(reason){resolveEvent(id,target?.id);check(JSON.stringify(s)===before,'Blocked choice mutated '+e.id+':'+id+':'+mode)}
 else{resolveEvent(id,target?.id);check(s.phase==='eventResult','Unresolved choice '+e.id+':'+id);check(Number.isFinite(s.hp)&&s.hp>0&&s.max>=20&&s.hp<=s.max&&s.gold>=0,'Invalid resources '+e.id);check(s.stash.length<=9&&s.stash.every(i=>stackCount(i)<=5),'Capacity violated '+e.id);const committed=JSON.stringify(s);resolveEvent(id,target?.id);check(JSON.stringify(s)===committed,'Choice replay '+e.id)}checks++;
 }
}
let a=setup('workbench'),p=s.stash.find(i=>defs[i.type].name==='Health Potion');resolveEvent('recycle',p.id);check(stackCount(p)===4,'Field dressing consumed whole stack');
a=setup('pond');p=s.stash.find(i=>defs[i.type].once);resolveEvent('picnic',p.id);check(stackCount(p)===4&&s.max===207,'Picnic stack cost');
a=setup('curios');p=s.stash.find(i=>defs[i.type].name==='Health Potion');a.offers.sell=DATA.byName['Magic Potion'];resolveEvent('sell',p.id);check(stackCount(p)===4,'Supply exchange stack cost');
a=setup('goblins');p=s.stash.find(i=>defs[i.type].once);resolveEvent('scavenge',p.id);check(stackCount(p)===4,'Barter stack cost');
a=setup('broker');check(!eventCandidates('rareGear').some(i=>defs[i.type].once),'Broker treats potions as rare equipment');const target=eventCandidates('rareGear')[0],quote=eventSaleQuote(target,1.15);check(quote<=Math.floor(defs[target.type].price*.75),'Broker arbitrage cap');
a=setup('healer',0,'full');let gold=s.gold;resolveEvent('treat');check(s.phase==='event'&&s.gold===gold,'Paid for zero healing');
a=setup('surgeon',0,'full');resolveEvent('procedure');check(s.max===200&&s.phase==='event','Surgery removed max HP without healing');
a=setup('mana',0,'fullMana');s.eventBuffs={mana:manaCapacity()};let hp=s.hp;resolveEvent('touch');check(s.hp===hp&&s.phase==='event','Paid health for capped mana');
a=setup('runes');let ring=makeItem(DATA.byName['Ring of Magic']);s.stash.push(ring);const donor=s.stash[2];check(runeforgePreview(donor,ring,'tempo').reason,'Inactive passive ring accepts tempering');
a=setup('ward');s.eventBuffs.block=120;gold=s.gold;resolveEvent('ward');check(s.phase==='event'&&s.gold===gold,'Paid for capped opening ward');
a=setup('spirit');gold=s.gold;resolveEvent('coin');check(s.phase==='event'&&s.gold===gold,'Paid to cleanse a nonexistent curse');
a=setup('armory',1);const max=s.max;resolveEvent('curse');check(s.eventCursedHealth===10&&s.max===max-10,'Armory curse not tracked');s.room++;ROOMS[s.room]={type:'event',eventId:'spirit',hp:0,damage:0,cd:3};s.activeEvent=null;enterEvent();resolveEvent('coin');check(s.max===max&&s.eventCursedHealth===0,'Curse not reversed exactly');
a=setup('goblins');hp=s.hp;resolveEvent('leave');check(s.hp===hp-8,'Goblin detour free');const snapshot=JSON.stringify(s);resolveEvent('leave');check(JSON.stringify(s)===snapshot,'Repeated detour damage');
a=setup('goblins',0,'low');s.hp=1;resolveEvent('leave');check(s.hp===1,'Detour can kill');
a=setup('goblins');s.eventBuffs.dodge=3;resolveEvent('pay');check(s.phase==='eventResult','Safe passage blocked by a capped bonus');
a=setup('pilgrim',2);for(const options of Object.values(a.offerOptions))for(const type of options)check(defs[type].classes.includes(s.classId)&&!defs[type].lootExcluded&&!defs[type].isShiny,'Invalid native offer');const options=a.offerOptions.gift;if(options.length>1){const seed=s.seed;gold=s.gold;chooseEventOffer('gift',options[1]);check(a.offers.gift===options[1]&&s.seed===seed&&s.gold===gold,'Reward selection rerolls/spends');const view=JSON.stringify(s);showEvent();check(JSON.stringify(s)===view,'Reopen rerolled visit');check(!chooseEventOffer('gift','bad'),'Unlisted reward accepted')}
a=setup('curios',0,'fullStash');p=s.stash[0];const c=a.choices.find(c=>c.id==='sell');a.offers.sell=DATA.byName['Health Potion'];check(!choiceBlockReason(c,p),'Partial consumption did not free stack space');resolveEvent('sell',p.id);check(s.phase==='eventResult'&&stackCount(p)===5&&s.stash.length===9,'Partial consume-and-refill transaction');
a=setup('curios',0,'fullStash');p=s.stash[0];a.offers.sell=DATA.byName['Chalice of Ambrosia'];const before=JSON.stringify(s);resolveEvent('sell',p.id);check(JSON.stringify(s)===before,'Partial consumption falsely freed stash slot');
a=setup('well',0,'fullStash');let c2=a.choices.find(c=>c.id==='wish'),r1=choiceBlockReason(c2);a.roll=.9;check(r1===choiceBlockReason(c2),'Lottery capacity leaks outcome');
for(const roll of[.1,.9]){a=setup('well');a.roll=roll;resolveEvent('wish');check(s.phase==='eventResult'&&!/Recovered 0/.test(s.eventResult.text),'Well has empty outcome');a=setup('pond');a.roll=roll;hp=s.hp;resolveEvent('fish');check(s.hp>=hp,'Failed fishing harms player')}
a=setup('provisioner');s.items=s.items.filter(i=>!defs[i.type].once);s.stash=[];gold=s.gold;check(buyProvisionKit(0)&&s.gold===gold-6&&s.stash.some(i=>defs[i.type].name==='Health Potion'),'Empty provisioner fallback');check(!buyProvisionKit(1),'Supply kit replay');
a=setup('smith');const weapon=s.items.find(i=>defs[i.type].group==='weapon');resolveEvent('temper',weapon.id);check(weapon.eventInfusion===.12,'Smith did not sharpen');
a=setup('runes');const ability=s.items.find(i=>defs[i.type].group==='ability');resolveEvent('etch',ability.id);check(ability.potionUpgrades.potency>0,'Runes did not tune ability');
a=setup('workbench');const armor=s.items.find(i=>defs[i.type].group==='armor'),oldCooldown=cooldown(armor);resolveEvent('fit',armor.id);check(armor.potionUpgrades.cooldown>0&&cooldown(armor)<oldCooldown,'Robe not refitted in combat calculations');
a=setup('library');const dust=s.enchantDust.purple;resolveEvent('study');check(s.enchantDust.purple===dust+12,'Library research dust');
// A paid/selected new visit survives the actual save/load path without rerolling.
const stored={};localStorage.setItem=(key,value)=>stored[key]=value;localStorage.getItem=key=>stored[key]||null;
a=setup('cache');const reward=a.offerOptions.unlock.at(-1);chooseEventOffer('unlock',reward);const savedVisit=JSON.stringify(a),savedSeed=s.seed;save();s=null;ROOMS=[];boot();check(JSON.stringify(s.activeEvent)===savedVisit&&s.seed===savedSeed,'Saved visit rerolled or lost choices');resolveEvent('unlock');check(s.phase==='eventResult'&&[...s.items,...s.stash].some(i=>i.type===reward),'Saved chosen reward changed');
a=setup('spirit');s.eventCursedHealth=10;s.seenEvents=['spirit'];const originalRng=rng;rng=()=>0;const otherEvents=NONCOMBAT_EVENTS.filter(e=>e.id!=='spirit');s.seenEvents=otherEvents.map(e=>e.id).concat('spirit');check(pickNoncombatEvent({dungeonId:'dungeon_6'})==='spirit','A previously seen spirit cannot return to lift a later curse');rng=originalRng;
for(const floor of Object.values(BATTLE_FLOORS))check(EVENT_THEMES[floor.pattern]?.length,'Missing dungeon theme '+floor.slug);
// Old saved visits retain old costs, offers and outcomes after the update.
a=setup('smith');delete a.rules;delete a.choices;const oldWeapon=s.items.find(i=>defs[i.type].group==='weapon');gold=s.gold;resolveEvent('temper',oldWeapon.id);check(s.gold===gold-28&&oldWeapon.eventHaste===.08&&!oldWeapon.eventInfusion,'Legacy visit changed rules');
a=setup('gambler');delete a.rules;delete a.choices;a.roll=.1;gold=s.gold;resolveEvent('stake');check(s.gold===gold+22,'Legacy fixed gambling payout changed');
a=setup('enchanter');s.items=[makeItem(DATA.items.find(d=>d.group==='weapon'&&d.tier==='T14'&&!d.isShiny&&!d.lootExcluded).id)];s.stash=[];s.enchantDust={green:100,red:0,purple:0};const gearSnapshot=JSON.stringify(s.items);check(!eventUseful(noncombatById.enchanter)&&JSON.stringify(s.items)===gearSnapshot,'Wrong dust color counted as affordable or mutated slots');s.enchantDust.purple=100;check(eventUseful(noncombatById.enchanter),'Affordable enchantment not useful');
a=setup('provisioner');s.items=s.items.filter(i=>!defs[i.type].once);const legacySupply=DATA.items.find(d=>d.once&&d.group==='consumable'&&d.lootExcluded);s.stash=[makeItem(legacySupply.id)];check(!provisionerItems().length&&provisionerQuote(s.stash[0],1).reason,'Unavailable legacy consumable can be restocked');
// Theme weights use the room being generated; selection never revises a committed route.
a=setup('pilgrim');s.seenEvents=[];ROOMS.forEach(r=>{if(r)delete r.eventId});check(eventWeight(noncombatById.spirit,{dungeonId:'dungeon_6'})>eventWeight(noncombatById.spirit,{dungeonId:'dungeon_0'}),'Crypt weighting absent');check(eventWeight(noncombatById.pond,{dungeonId:'dungeon_1'})>eventWeight(noncombatById.pond,{dungeonId:'dungeon_9'}),'Forest weighting absent');s.hp=s.max;check(eventUseful(noncombatById.healer),'Healthy visitor has no portable-care fallback');while(s.stash.length<9)s.stash.push(makeItem(DATA.byName['Ring of Magic']));check(!eventUseful(noncombatById.healer),'Unavailable full-health care counted as useful');for(const e of NONCOMBAT_EVENTS){s.seenEvents=NONCOMBAT_EVENTS.map(e=>e.id);const id=pickNoncombatEvent({dungeonId:'dungeon_6'});check(noncombatById[id]&&eventUseful(noncombatById[id]),'Empty selection pool fallback')}
return 'PASS: '+checks+' event/act/resource checks; single-copy costs, no-op guards, caps, native revealed offers, fixed RNG/choices, partial-stack capacity, lottery outcomes, curse recovery, detours, distinct upgrades, empty supply fallback, replay and legacy visit compatibility';
})()`,ctx));
