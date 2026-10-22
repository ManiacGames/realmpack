'use strict';
const assert=require('node:assert/strict'),{ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)},near=(a,b)=>Math.abs(a-b)<1e-8;
 freshRun('knight',true);selectPortal(s.portalChoices[0]);
 const ring=(attribute,tier=1)=>DATA.items.find(d=>d.ringAttribute===attribute&&d.tier==='T'+tier);
 const pack=(type,x,y)=>Object.assign(makeItem(type),{x,y});
 defs.ringTestWeapon={id:'ringTestWeapon',name:'Test weapon',group:'weapon',kind:'sword',effect:'damage',amount:100,cd:4,mana:0,w:1,h:1,classes:[],condition:'none'};
 defs.ringTestArmor={...defs.ringTestWeapon,id:'ringTestArmor',name:'Test armor',group:'armor',kind:'plate',effect:'block'};
 defs.ringTestAbility={...defs.ringTestWeapon,id:'ringTestAbility',name:'Test ability',group:'ability',kind:'spell'};
 const begin=(target,attribute,tier=1)=>{s.phase='fight';s.max=1000;s.ringHealthBonus=0;s.hp=100;s.block=0;s.mana=0;s.power=0;s.relicHaste=0;s.haste=0;s.fury=0;s.focus=0;s.time=0;s.enemy.hp=s.enemy.max=100000;s.enemy.vulnerable=0;const i=pack(target,2,2),r=pack(ring(attribute,tier).id,1,2);s.items=[i,r];s.stash=[];return [i,r]};
 const tiered=DATA.items.filter(d=>d.ringAttribute);check(tiered.length===57,'All 57 tiered attribute rings covered');
 for(const key of ['attack','defense','dexterity','speed','wisdom','vitality','health','magic']){check(ring(key)&&ring(key,7),'Missing ring family '+key);check(ring(key,7).amount>ring(key).amount,'Tier progression '+key)}
 check(DATA.items.filter(d=>d.group==='ring'&&!/^T/.test(d.tier)).every(d=>!d.ringAttribute),'UT/ST ring changed');
 let [i,r]=begin('ringTestWeapon','attack');check(activate(i)&&s.enemy.hp===99892,'Attack buffs weapon output');check(!activate(r)&&r.activations===0,'Attack ring attacks on its own');
 r.eventInfusion=.25;check(enchantPrimary(i,100)===110,'Attack ring infusion');check(itemLinks().some(l=>l.source===r.id&&l.target===i.id&&l.label.includes('10%')),'Infused link amount');r.eventInfusion=0;
 check(itemLinks().some(l=>l.source===r.id&&l.target===i.id&&l.label.includes('8%')),'Accurate Attack link');
 r.x=0;check(enchantPrimary(i,100)===100,'Distant Attack ring');r.x=1;r.y=1;check(enchantPrimary(i,100)===100,'Diagonal Attack ring');s.items=[i];s.stash=[r];check(enchantPrimary(i,100)===100,'Stashed Attack ring');
 [i,r]=begin('ringTestAbility','attack');check(enchantPrimary(i,100)===100,'Attack buffs abilities');
 [i,r]=begin('ringTestWeapon','attack',7);const low=pack(ring('attack').id,3,2),high=pack(ring('attack',7).id,2,1);s.items=[i,low,r,high];check(near(adjacencyStat(i,'primary'),.4)&&near(adjacencyPrimary(i,100),135),'Strongest two Attack / primary cap');s.items.reverse();check(near(adjacencyPrimary(i,100),135),'Order changes ring strength');
 [i,r]=begin('ringTestArmor','defense');activate(i);check(s.block===113,'Defense boosts primary block');s.block=0;i.enchantments=[{key:'barrier',rank:3,value:10}];triggerEnchantments(i);check(s.block===11,'Defense boosts enchantment block');s.block=0;i.enchantments=[{key:'ward',rank:3,value:10}];startEnchantments();check(s.block===11,'Defense boosts battle-start block');
 s.block=0;gainBlock(100);check(s.block===100,'Defense boosts class/global block');s.block=0;s.items.push(pack(ring('defense',7).id,3,2),pack(ring('defense',7).id,2,1));gainBlock(100,i);check(s.block===150,'Defense cap');
 [i,r]=begin('ringTestAbility','wisdom');check(activate(i)&&s.enemy.hp===99892,'Wisdom ability damage');defs.ringTestAbility.effect='heal';s.hp=100;activate(i);check(s.hp===208,'Wisdom ability healing');defs.ringTestAbility.effect='mana';s.mana=0;activate(i);check(s.mana===50,'Wisdom ability mana and cap');defs.ringTestAbility.effect='dodge';check(enchantPrimary(i,1)===1&&near(cooldown(i),4/1.08),'Wisdom dodge recharge/charges');defs.ringTestAbility.effect='damage';
 [i,r]=begin('ringTestWeapon','speed');check(near(cooldown(i),3.84),'Speed passive reduction');check(!itemHasHaste(i),'Speed counts as temporary haste');
 apply('haste',2,r);check(itemHasHaste(i)&&near(cooldown(i),3.84/1.25),'Speed stacks with haste');check(!itemHasHaste(r),'Haste self target');
 [i,r]=begin('ringTestWeapon','dexterity');check(near(cooldown(i),4),'Dexterity grants permanent Speed');activate(r);check(itemHasHaste(i)&&near(cooldown(i),3.2),'Dexterity grants adjacent haste');const duration=i.hasteRemaining;activate(r);check(i.hasteRemaining===duration&&near(cooldown(i),3.2),'Dexterity refreshes without stacking');
 [i,r]=begin('ringTestWeapon','speed',7);s.items.push(pack(ring('speed',7).id,3,2),pack(ring('speed',7).id,2,1));check(near(cooldown(i),3.2),'Speed stacking cap');
 [i,r]=begin('ringTestWeapon','vitality');s.hp=20;activate(r);check(s.hp===29,'Vitality heals');check(!adjacencyConnections(i).some(c=>c.rule.name==='Runic edge'),'Vitality still buffs weapon');
 // Capacity moves never create HP/mana; repeated synchronization and reload are idempotent.
 s.phase='prep';s.max=130;s.ringHealthBonus=0;s.hp=100;s.mana=40;s.items=[];s.stash=[];
 const health=pack(ring('health').id,0,0),magic=pack(ring('magic').id,1,0);s.items=[health,magic];syncRingVitals();check(s.max===142&&s.hp===100&&manaCapacity()===55&&s.mana===40,'Passive capacity adds or refills wrong resource');syncRingVitals();check(s.max===142,'Capacity doubled on reflow');
 s.mana=54;s.hp=140;s.items=[];s.stash=[health,magic];syncRingVitals();check(s.max===130&&s.hp===130&&s.mana===50&&manaCapacity()===50,'Removing capacity rings');s.items=[health,magic];s.stash=[];syncRingVitals();check(s.hp===130&&s.mana===50,'Re-equip restores resources');
 s=JSON.parse(JSON.stringify(s));syncRingVitals();check(s.max===142&&s.ringHealthBonus===12,'Saved health bonus applied twice');
 delete s.ringHealthBonus;s.max=130;syncRingVitals();check(s.max===142,'Legacy save missing passive stat migration');
 s.items=[...Array.from({length:4},(_,n)=>pack(ring('health',7).id,n,0)),...Array.from({length:4},(_,n)=>pack(ring('magic',7).id,n,1))];syncRingVitals();check(s.max===230&&manaCapacity()===90,'Capacity caps');s.mana=89;apply('mana',10);check(s.mana===90,'Mana effect ignores capacity');
 s.phase='fight';s.mana=89;const reserve=s.items[4];reserve.enchantments=[{key:'reservoir',rank:3,value:3}];startEnchantments();check(s.mana===90,'Reservoir ignores capacity');
 [i,r]=begin('ringTestWeapon','attack');r.enchantments=[{key:'barrier',rank:3,value:3}];check(activate(r)&&s.block===3&&s.enemy.hp===100000,'Passive ring lost legacy activation enchantments');check(enchantMarkup(r).includes('Enchantment cycle'),'Missing passive enchantment timing');
 // Fractional Wisdom is per item, activation-only and resets at the next battle.
 [i,r]=begin('ringTestAbility','wisdom',7);defs.ringTestAbility.effect='mana';defs.ringTestAbility.amount=2;
 const generated=[];for(let n=0;n<5;n++){s.mana=0;activate(i);generated.push(s.mana)}
 check(generated.join() === '2,2,3,2,3','Wisdom fractional mana distribution');check(Math.abs(i.wisdomCarry)<1e-8,'Wisdom carry did not conserve output');
 // A pre-existing adjacency bonus uses its share of the cap first.
 i.wisdomCarry=0;const weaponNeighbor=pack('ringTestWeapon',3,2),secondWisdom=pack(ring('wisdom',7).id,2,1);s.items.push(weaponNeighbor,secondWisdom);defs.ringTestAbility.effect='damage';
 let total=0;for(let n=0;n<4;n++){const before=s.enemy.hp;activate(i);total+=before-s.enemy.hp}check(total===10,'Wisdom bypassed shared primary cap or rounded other adjacency differently');
 s.items=[i,r];defs.ringTestAbility.effect='mana';i.wisdomCarry=0;
 const copy=pack('ringTestAbility',1,1);s.items.push(copy);s.mana=0;activate(copy);check(s.mana===2&&near(copy.wisdomCarry,.4),'Wisdom carries leak between items');
 const stored=i.wisdomCarry;for(let n=0;n<10;n++)enchantPrimary(i,2);check(i.wisdomCarry===stored,'Inspection/preview consumed Wisdom carry');
 defs.ringTestAbility.mana=3;s.mana=0;check(!activate(i)&&i.wisdomCarry===stored,'Failed activation consumed Wisdom carry');defs.ringTestAbility.mana=0;
 // Signature abilities follow the same carry path; healing applies after that output.
 defs.ringTestAbility.effect='heal';defs.ringTestAbility.mechanic={key:'purify',n:1,title:'Test',text:'Test'};i.wisdomCarry=0;s.hp=100;
 for(let n=0;n<5;n++)activate(i);check(s.hp===112,'Signature ability fractional output');delete defs.ringTestAbility.mechanic;
 setEnemy();check(i.wisdomCarry===0&&copy.wisdomCarry===0,'Wisdom carry survived a new battle');defs.ringTestAbility.effect='damage';defs.ringTestAbility.amount=100;
 // Battle-start mana is separate from capacity and cannot be farmed by moving rings.
 s.phase='prep';s.items=[];s.stash=[];s.ringHealthBonus=0;s.max=s.hp=130;s.mana=5;
 const magicRings=[1,4,7].map((tier,n)=>pack(ring('magic',tier).id,n,0));check(magicRings.map(i=>magicRingBattleMana(defs[i.type])).join()==='1,2,3','Magic tier start bonus');
 s.items=[magicRings[0]];syncRingVitals();check(s.mana===5,'Equip refilled mana');s.magicRingManaGranted=false;check(startRingBattle()===1&&s.mana===6,'T1 battle mana');check(startRingBattle()===0&&s.mana===6,'Repeated battle-start mana');
 s.items=magicRings;s.magicRingManaGranted=false;s.mana=5;startRingBattle();check(s.mana===11,'Magic start total cap');
 s.magicRingManaGranted=false;s.mana=manaCapacity()-1;check(startRingBattle()===1&&s.mana===manaCapacity(),'Magic start ignores capacity');
 const weapon=pack('ringTestWeapon',2,2);s.items=[weapon,magicRings[2]];s.phase='prep';s.mana=0;ROOMS[s.room].type='combat';startFight();check(s.phase==='fight'&&s.mana===8,'StartFight did not apply T7 start mana');
 s.mana=0;setupWave();check(startRingBattle()===0&&s.mana===0,'New wave repeated start mana');
 return 'PASS: all 57 tiered rings, eight identities, caps, strongest neighbors, real damage/heal/block/haste/cooldown effects, links, stash/diagonal exclusion, UT/ST preservation, capacity movement/save migration, legacy enchantments, fractional Wisdom and once-per-battle Magic mana';
})()`,ctx));
