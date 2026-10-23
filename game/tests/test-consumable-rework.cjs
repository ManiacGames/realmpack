'use strict';
const assert=require('node:assert/strict'),{ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)},close=(a,b)=>Math.abs(a-b)<1e-7;
 const active=DATA.items.filter(d=>d.group==='consumable'&&!d.lootExcluded);check(active.length===46,'Unexpected obtainable consumable count '+active.length);
 check(DATA.items.filter(d=>d.group==='consumable'&&d.lootExcluded).every(d=>d.catalogueHidden),'Disabled catalogue leak');
 check(!ADJACENCY_RULES.some(r=>r.target(defs[DATA.byName['Potion of Attack']])),'Startup potions advertise inactive adjacency bonuses');
 check(ADJACENCY_RULES.some(r=>r.name==='Protected supplies'&&r.target(defs[DATA.byName['Health Potion']])),'Supply adjacency lost');
 const def=(id,group,effect,amount=20)=>defs[id]={id,name:id,group,kind:group==='weapon'?'sword':group==='armor'?'plate':'spell',effect,amount,cd:4,mana:0,w:1,h:1,once:false,classes:[],condition:'none',bonus:0,price:10};
 def('cr_weapon','weapon','damage');def('cr_armor','armor','block');def('cr_ability','ability','heal');
 const item=(type,x=0,y=0)=>Object.assign(makeItem(defs[type]?type:DATA.byName[type]),{x,y});
 function reset(){freshRun('knight',true);selectPortal(s.portalChoices[0]);s.items=[];s.stash=[];s.pendingSupplies=[];s.phase='prep';s.max=130;s.ringHealthBonus=0;s.hp=100;s.mana=5;s.seed=123456;Object.assign(ROOMS[s.room],{type:'combat',profile:'raider',secondary:null,waves:1,hp:100000,damage:1,cd:1000,risk:false});s.enemy.hp=s.enemy.max=100000;return item('cr_weapon',0,0)}
 function load(sourceName,targetType='cr_weapon',quantity=5){const weapon=reset(),target=targetType==='cr_weapon'?weapon:item(targetType,2,2),source=item(sourceName,target.x+1,target.y);source.quantity=quantity;s.items=target===weapon?[target,source]:[weapon,target,source];return {weapon,target,source}}
 let x=load('Health Potion');s.phase='fight';s.hp=40;check(activate(x.source)&&stackRemaining(x.source)===4,'Supply use');finishConsumableEffects(false);check(x.source.quantity===4&&s.items.includes(x.source),'Spent supply refreshed or disappeared whole');
 s.phase='prep';setEnemy();check(stackRemaining(x.source)===4,'Supply refilled next battle');
 x=load('Magic Potion');s.phase='fight';s.mana=50;check(!activate(x.source),'Full mana wasted potion');s.mana=44;check(activate(x.source)&&s.mana===50,'Mana threshold/refill');
 x=load('Greater Health Potion');s.phase='fight';s.hp=20;activate(x.source);check(s.hp===70,'Greater HP is not double');
 x=load('Greater Magic Potion');s.phase='fight';s.mana=20;activate(x.source);check(s.mana===32,'Greater MP is not double');
 x=load('Potion of Attack');startFight();check(x.target.potionUpgrades.damage===1&&x.source.usesSpent===1&&x.source.used,'Attack upgrade not applied once');const hp=s.enemy.hp;activate(x.target);check(hp-s.enemy.hp===21,'Attack upgrade combat value');startConsumableEffects();check(x.target.potionUpgrades.damage===1&&x.source.usesSpent===1,'Opening replay');setupWave();check(x.target.potionUpgrades.damage===1,'Wave repeat');finishConsumableEffects(true);check(x.source.quantity===4&&x.target.potionUpgrades.damage===1,'Permanent upgrade settlement');s.phase='prep';setEnemy();check(x.target.potionUpgrades.damage===1,'Permanent upgrade lost');
 x=load('Greater Potion of Attack');x.source.x=3;x.source.y=3;startFight();check(!x.source.used&&!x.target.potionUpgrades,'Distant target consumed');
 x=load('Greater Potion of Attack');x.source.y=1;startFight();check(!x.source.used,'Diagonal target consumed');
 x=load('Greater Potion of Attack');x.target.potionUpgrades={damage:5};startFight();check(!x.source.used&&x.source.usesSpent===0,'Capped target consumed');
 x=load('Potion of Dexterity');startFight();check(close(cooldown(x.target),3.9),'Weapon cooldown upgrade');
 x=load('Greater Potion of Dexterity');x.target.potionUpgrades={cooldown:.9};startFight();check(close(x.target.potionUpgrades.cooldown,1)&&close(cooldown(x.target),3),'Cooldown cap');
 x=load('Potion of Defense','cr_armor');startFight();s.block=0;activate(x.target);check(s.block===21,'Armor block upgrade');
 x=load('Potion of Speed','cr_armor');startFight();check(close(cooldown(x.target),3.9),'Armor cooldown upgrade');
 x=load('Potion of Wisdom','cr_ability');startFight();check(close(cooldown(x.target),3.9),'Ability cooldown upgrade');
 x=load('Potion of Mana','cr_ability');startFight();s.hp=20;activate(x.target);check(s.hp===42,'Ability potency upgrade');
 defs.cr_ability.effect='dodge';x=load('Potion of Mana','cr_ability');startFight();check(close(cooldown(x.target),4/1.05),'Dodge ability family scaling');defs.cr_ability.effect='heal';
 const healthRing=DATA.items.find(d=>d.ringAttribute==='health'&&d.tier==='T1');x=load('Potion of Vitality',healthRing.id);startFight();check(x.target.potionUpgrades.ringStrength===.05&&s.ringHealthBonus===13,'Passive ring potion');
 const vitalityRing=DATA.items.find(d=>d.ringAttribute==='vitality'&&d.tier==='T1');x=load('Potion of Vitality',vitalityRing.id);startFight();check(close(x.target.potionUpgrades.cooldown,.1),'Active ring potion');
 x=load('Greater Potion of Life');s.potionLifeBonus=55;startFight();check(s.max===135&&s.potionLifeBonus===60&&s.hp===100,'Life potion cap/free heal');
 x=load('Enchantment Slot Drop Chance Potion (25%)');x.target.enchantSlots=3;startFight();check(x.target.enchantSlots===4&&x.source.used,'Divine slot increase');
 x=load('Enchantment Slot Drop Chance Potion (25%)');x.target.enchantSlots=4;startFight();check(!x.source.used,'Capped slot consumed');
 // Strongest temporary effect only, and all effects persist across waves then expire.
 x=load('Effusion of Attack');const weaker=item('Tincture of Attack',3,0);weaker.quantity=5;s.items.push(weaker);startFight();check(x.source.used&&!weaker.used,'Weaker buff wasted');const damageBefore=s.enemy.hp;activate(x.weapon);check(damageBefore-s.enemy.hp===25,'Effusion damage');setupWave();const damageWave=s.enemy.hp;activate(x.weapon);check(damageWave-s.enemy.hp===25,'Buff lost between waves');finishConsumableEffects(true);check(!s.consumableBattle&&weaker.quantity===5,'Buff cleanup');
 x=load('Effusion of Life');startFight();check(s.max===180&&s.hp===100,'Temporary HP refilled or missing');s.hp=175;finishConsumableEffects(true);check(s.max===130&&s.hp===130,'Temporary HP did not expire cleanly');
 x=load('Effusion of Mana');startFight();check(manaCapacity()===75&&s.mana===5,'Temporary MP wrong');s.mana=70;finishConsumableEffects(true);check(s.mana===50&&manaCapacity()===50,'Temporary MP cleanup');
 x=load('Tincture of Defense','cr_armor');startFight();s.block=0;activate(x.target);check(s.block===22,'Tincture block');
 x=load('Effusion of Vitality','cr_ability');startFight();s.hp=20;activate(x.target);check(s.hp===50,'Effusion healing');
 defs.cr_ability.effect='mana';x=load('Effusion of Wisdom','cr_ability');startFight();s.mana=0;activate(x.target);check(s.mana===22,'Effusion mana');defs.cr_ability.effect='heal';
 x=load('Effusion of Dexterity');startFight();check(x.weapon.hasteRemaining===4&&close(cooldown(x.weapon),4/1.25),'Global potion haste');
 x=load('Effusion of Speed');startFight();check(close(cooldown(x.weapon),3.8),'Flat temporary speed');
 x=load('Ambrosia');s.hp=20;startFight();check(s.hp===130&&x.source.usesSpent===1,'Ambrosia');
 x=load('Ambrosia');s.hp=s.max;startFight();check(!x.source.used&&!x.source.usesSpent,'Full HP wasted Ambrosia');
 x=load('Chalice of Ambrosia');s.hp=20;startFight();check(s.hp===85,'Chalice half max HP');
 x=load('Chaos Cake');startFight();const chaos=s.consumableBattle.chaosText;check(chaos&&x.source.used,'Chaos effect');startConsumableEffects();check(s.consumableBattle.chaosText===chaos,'Chaos rerolled');
 x=load('Frost Cake');startFight();s.enemy.cd=4;s.enemy.charge=3;check(activate(x.source)&&s.enemy.frozen===2,'Freeze activation');const charge=s.enemy.charge;tick(.5);check(s.enemy.charge===charge,'Frozen enemy advanced attack');const other=item('Frost Cake',5,0);s.items.push(other);check(!activate(other),'Freeze stacked');
 // One guaranteed supply of each type, independent of normal choice; no duplicate waves.
 reset();s.items=[item('cr_weapon')];s.enemy.hp=0;finishBattle(true);check(s.phase==='reward'&&s.stash.length===0&&s.pendingSupplies.some(i=>i.type===DATA.byName['Health Potion'])&&s.pendingSupplies.some(i=>i.type===DATA.byName['Magic Potion']),'Guaranteed basic supply');
 reset();s.items=[item('cr_weapon')];const exalt=ENCOUNTERS.encounters.find(e=>dungeonRating(e.dungeon).level===4&&e.role==='combat');ROOMS[s.room]=scaledRoom(exalt.id,20);s.enemy.wave=ROOMS[s.room].waves||1;s.enemy.hp=0;finishBattle(true);check(s.stash.length===0&&s.pendingSupplies.some(i=>i.type===DATA.byName['Greater Health Potion'])&&s.pendingSupplies.some(i=>i.type===DATA.byName['Greater Magic Potion']),'Exalt supply tier');
 reset();s.items=[item('cr_weapon')];s.stash=Array.from({length:9},()=>item(DATA.byName['Ring of Magic']));s.enemy.hp=0;finishBattle(true);check(s.pendingSupplies.length===2&&s.stash.length===9,'Supply overflow lost or exceeded cap');
 const originalNext=nextRoom;let advances=0;nextRoom=()=>{advances++;s.phase='prep'};takeLoot(null);check(s.lootChoiceDone&&s.phase==='reward','Reward skipped supply decision');const recovered=s.hp;takeLoot(null);check(s.hp===recovered,'Normal choice replay');check(!claimSupply(s.pendingSupplies[0].id)&&s.pendingSupplies.length===2,'Full stash silently looted/lost supply');discardForSupplies(s.stash[0].id,true);check(s.stash.length===8&&s.pendingSupplies.length===2,'Discard automatically claimed supplies');check(claimSupply(s.pendingSupplies[0].id)&&s.stash.length===9&&s.pendingSupplies.length===1,'Explicit supply claim failed');leaveSupplies();check(advances===1&&s.phase==='prep','Supply continuation');nextRoom=originalNext;
 // Neither an open stack, opening the panel nor returning from it is permission to loot.
 {reset();const weapon=item('cr_weapon'),hp=item('Health Potion',1,0),mp=item('Magic Potion');hp.quantity=2;mp.quantity=3;s.items=[weapon,hp];s.stash=[mp];awardCombatSupplies();s.phase='reward';
 check(hp.quantity===2&&mp.quantity===3&&s.pendingSupplies.length===2,'Award silently merged into packed/stashed stacks');showSupplies();showSupplies();check(hp.quantity===2&&mp.quantity===3&&s.pendingSupplies.length===2,'Opening supplies auto-looted');
 const healthDrop=s.pendingSupplies.find(i=>i.type===hp.type),manaDrop=s.pendingSupplies.find(i=>i.type===mp.type);check(claimSupply(healthDrop.id)&&hp.quantity===3&&mp.quantity===3,'Explicit Take did not merge only chosen supply');check(!claimSupply(healthDrop.id)&&hp.quantity===3,'Supply Take replay');check(leaveSupply(manaDrop.id)&&mp.quantity===3&&!s.pendingSupplies.length,'Leave added/retained chosen potion');check(!leaveSupply(manaDrop.id),'Supply Leave replay');s.phase='prep';check(!claimSupply(healthDrop.id)&&!leaveSupply(manaDrop.id),'Supply action outside rewards');
 }
 x=load('Stat Potion Drop Potion (33%)');startFight();finishConsumableEffects(true);check(s.pendingSupplies.length===1&&defs[s.pendingSupplies[0].type].consumable.mode==='upgrade','Guaranteed stat potion');
 x=load('Transformation Potion');s.items.push(item(DATA.byName['Ring of Magic'],5,4));const old=s.items.at(-1).type,oldId=s.items.at(-1).id;startFight();finishConsumableEffects(true);const transformed=s.items.find(i=>i.id===oldId);check(transformed&&transformed.type!==old&&transformed.x===5&&transformed.y===4&&dims(transformed).join()==='1,1'&&x.source.quantity===4,'Transformation size/settlement');
 x=load('Transformation Potion');startFight();check(!x.source.used,'No-corner transform consumed');
 reset();const chest=item('Stat Potion Choice Chest');s.stash=[chest];check(openStatChest(chest.id)&&s.stash.length===1&&defs[s.stash[0].type].consumable.mode==='upgrade','Chest open');check(!openStatChest(chest.id),'Chest replay');
 reset();const retired=item('Potion of Health6');retired.quantity=3;s.stash=[retired];stock=[DATA.byName['Rice Wine']];reward=[DATA.byName['Blue Ice Candy']];migrateConsumables();check(retired.type===DATA.byName['Health Potion']&&retired.quantity===3&&!stock.length&&!reward.length,'Removed item/save migration');
 // Loot modifiers use eligible pools and retain the ordinary role-based Shiny rates.
 reset();s.items=[item('cr_weapon')];s.consumableRewardMods={lootDrop:true,lootTier:true};for(let n=0;n<100;n++)check(rollLoot(4).every(id=>!defs[id].lootExcluded),'Disabled reward leaked');
 const saved=JSON.parse(JSON.stringify(x.target.potionUpgrades||{}));check(typeof saved==='object','Serializable upgrades');
 return {activeConsumables:active.length,retiredConsumables:DATA.items.filter(d=>d.group==='consumable'&&d.lootExcluded).length,checks:'true per-copy consumption, permanent family upgrades/caps/targeting, temporary buffs, all-wave persistence, opening heals, freeze budget, supplies/overflow/replay, transform, chest, loot and save migration'};
})()`,ctx));
