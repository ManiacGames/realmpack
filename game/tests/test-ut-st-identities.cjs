'use strict';
const {ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)},near=(a,b)=>Math.abs(a-b)<1e-8;
const normalPassive=passive;passive=()=>{}; // Isolate item mechanics from class proc damage.
const type=name=>DATA.items.find(d=>d.name===name&&!d.isShiny).id;
function setup(name){freshRun('wizard',true);selectPortal(s.portalChoices[0]);s.items=[];s.stash=[];const i=Object.assign(makeItem(type(name)),{x:0,y:0});s.items=[i];s.phase='prep';setEnemy();s.phase='fight';s.enemy.hp=s.enemy.max=100000;s.enemy.ward=0;s.enemy.veil=0;s.enemy.vulnerable=0;s.hp=s.max=1000;s.mana=50;s.power=0;s.silence=0;return i}
const loss=()=>100000-s.enemy.hp;
// Imported identities, Shiny inheritance and source-backed profile metadata.
check(Object.keys(window.REALM_SPECIALS.profiles).length===48,'Profile coverage changed');
for(const d of DATA.items.filter(d=>d.realmIdentity)){check(d.mechanic&&d.source&&d.amount>0&&d.cd>0&&Number.isFinite(d.cd),'Invalid profile '+d.name);if(d.isShiny){const b=defs[d.baseId];check(d.mechanic.key===b.mechanic.key&&d.realmSet===b.realmSet&&d.amount>=b.amount&&d.cd<=b.cd,'Shiny identity '+d.name)}}
// Cadence and layout replace arbitrary name effects, self-harm and resource drains.
let i=setup('Doom Bow');const doom=defs[i.type];activate(i);const first=loss();s.enemy.hp=100000;activate(i);check(loss()===first&&s.itemBombs.length===0,'Doom still has charge cycle');check(doom.cd>defs[type('Leaf Bow')].cd*2,'Heavy/rapid cadence missing');
i=setup('Demon Blade');const hp=s.hp;activate(i);const front=loss();s.enemy.hp=100000;i.y=2;activate(i);check(front>loss()*1.5&&s.hp===hp,'Close-range tradeoff/self-harm');
i=setup('Corruption Cutter');s.enemy.poison=10;activate(i);check(s.enemy.poison===10,'Cutter consumes unrelated poison');
// Multi-shot applies flat power once, and counts one activation/weapon event.
i=setup('Superior');activate(i);const plain=loss();i=setup('Superior');s.power=10;activate(i);check(loss()===plain+10&&i.activations===1,'Pellet power or activation multiplication');
i=setup('Divinity');s.enemy.ward=1000;activate(i);check(loss()>0&&s.enemy.ward<1000&&s.itemBombs.length===0,'Beam bypass/bombs');
i=setup('Lumiaire');const mp=s.mana;activate(i);check(loss()===0&&s.mana===mp&&s.realmProjectiles.length===1,'Lumiaire timing/mana');tickRealmSpecials(.6);check(loss()>0&&s.realmProjectiles.length===0,'Lumiaire arrival');activate(i);s.enemy.wave++;const beforeWave=loss();tickRealmSpecials(.6);check(loss()===beforeWave,'Bolts crossed a defeated wave');
// Purification clears all represented debuffs and is permitted through silence.
i=setup('Tome of Purification');s.venom=8;s.venomTime=10;s.silence=4;s.slow=3;i.charge=cooldown(i);tick(.05);check(!s.venom&&!s.silence&&!s.slow&&i.activations===1,'Silenced cleanser');
i=setup('Cloak of the Planewalker');s.venom=8;const weapon=Object.assign(makeItem(type('Avarice')),{x:2,y:0});s.items.push(weapon);activate(i);check(s.dodge===1&&weapon.charge>0&&s.venom===8,'Plane shift identity');
// Armor refreshes rather than stacking; Crystal retaliation is rate-limited.
i=setup('Tome of Holy Protection');activate(i);check(s.hp===s.max&&s.block===20,'Protection instant-heal identity');s.block=0;playerDamage(100,0,false);check(s.hp===920,'Armored reduction');activate(i);s.block=0;playerDamage(100,0,false);check(s.hp===840,'Armored stacked');s.time=4;s.block=0;playerDamage(100,0,false);check(s.hp===740,'Armored expiry');
i=setup('Crystal Shield');activate(i);s.block=0;playerDamage(100,0,false);const retaliation=loss();check(retaliation===8&&s.hp===923,'Crystal shard/heal');playerDamage(100,0,false);check(loss()===retaliation,'Crystal retaliation lock');s.time=1.1;playerDamage(100,0,false);check(loss()===16,'Crystal retaliation recovery');
// Oreo protects one direct attack, with a shared lock across copies; DoT still hurts.
i=setup('Seal of Blasphemous Prayer');activate(i);playerDamage(100,0,false);check(s.hp===900,'Invulnerability swallowed DoT');playerDamage(100);check(s.hp===900,'Divine protection did not prevent attack');playerDamage(100);check(s.hp===800,'Divine protection blocked multiple attacks');const oreo=Object.assign(makeItem(i.type),{x:2,y:0});s.items.push(oreo);activate(oreo);s.hp=800;playerDamage(100);check(s.hp===700,'Duplicate immunity chained');
// Hex counts weapon activations, is capped, consumes once, and resets at waves.
i=setup('Orb of Conflict');for(let n=0;n<20;n++)itemEvent('weapon',1,{id:-1});check(specialState(i).counter===6,'Hex cap');activate(i);check(loss()===32&&s.summons.length===1&&specialState(i).counter===0,'Hex consume/soulshard');itemEvent('weapon',1,{id:-1});s.enemy.wave++;itemEvent('weapon',1,{id:-1});check(specialState(i).counter===1,'Hex crossed wave');
// Mushroom heals over time, applies fatigue, uses one strongest field, resets per battle.
i=setup('Tome of the Mushroom Tribes');s.hp=500;activate(i);check(s.hp===500,'Mushroom instant heal');tickRealmSpecials(1);check(s.hp===506,'Mushroom first pulse');activate(i);tickRealmSpecials(1);check(s.hp===512,'Mushrooms stacked');tickRealmSpecials(5);check(s.hp===542&&!s.realmMushroom,'Mushroom total/expiry');s.time=50;activate(i);tickRealmSpecials(1);check(s.hp===545,'Mushroom bypassed fatigue');resetItemMechanics();check(!s.realmMushroom&&s.realmProjectiles.length===0&&s.realmArmoredUntil===0,'Transient state persisted');
// Set thresholds count distinct packed slots, not stash, duplicates, other sets or legacy.
i=setup('Etherite Dagger');const set=window.REALM_SPECIALS.sets.skuld,pieces=set.pieces.map(name=>Object.assign(makeItem(type(name)),{x:0,y:0}));s.items=[pieces[0]];s.stash=pieces.slice(1);check(realmSetCount('skuld')===1,'Stash counted');s.items.push(makeItem(pieces[0].type));check(realmSetCount('skuld')===1,'Duplicate counted');s.items.push(makeItem(type('Legacy Etherite Dagger')));check(realmSetCount('skuld')===1,'Legacy counted');s.items=pieces.slice(0,2);check(realmSetCount('skuld')===2&&near(realmPrimaryAmount(pieces[0],100),108)&&realmSetRate(pieces[0])===0,'Two-piece threshold');s.items.push(pieces[2]);check(realmSetRate(pieces[0])===.08,'Three-piece threshold');s.items.push(pieces[3]);const body=mechanicCard(defs[pieces[0].type]);check(body.includes('4/4 packed')&&body.includes('Ghastly Drape')&&body.includes('Distinct packed pieces'),'Set inspection');const ability=pieces[1];activate(ability);check(loss()===18,'Full Skuld nova');const duplicate=Object.assign(makeItem(ability.type),{x:0,y:0});s.items.push(duplicate);activate(duplicate);check(loss()===28,'Duplicate set proc');realmFullSetProc(ability);check(loss()===28,'Set proc cooldown');s.time=4;realmFullSetProc(ability);check(loss()===36,'Set proc recovery');
// Each set fits the actual board and delivers its advertised full-set effect.
for(const [key,set] of Object.entries(window.REALM_SPECIALS.sets)){i=setup(set.pieces[0]);s.items=[];for(const name of set.pieces)check(autoPlace(makeItem(type(name))),'Set cannot fit '+key);check(realmSetCount(key)===4,'Missing '+key);const ability=s.items.find(j=>defs[j.type].realmSlot===1);s.hp=500;const old={hp:s.hp,block:s.block,mana:s.mana,enemy:s.enemy.hp,summons:s.summons.length};s.mana=20;realmFullSetProc(ability);check(s.realmSetReady[key]===4,'No full proc '+key);check(key==='skuld'||key==='pirate'?s.enemy.hp<old.enemy:key==='swoll'||key==='oryx'?s.block>old.block:key==='geb'?s.hp>old.hp&&s.mana===21:s.summons.length===old.summons+1,'Wrong proc '+key)}
// Exercise complete legal set builds through the real combat tick with class procs enabled.
passive=normalPassive;log=()=>{};let fights=0;
for(const set of Object.values(window.REALM_SPECIALS.sets))for(const level of [1,4,5]){
 const native=defs[type(set.pieces[1])].classes[0];freshRun(native,true);s.items=[];s.stash=[];s.max+=60;s.hp=s.max;
 for(const name of set.pieces)check(autoPlace(makeItem(type(name))),'Combat layout '+set.name);
 const dungeon=ENCOUNTERS.dungeons.find(d=>dungeonRating(d.id).level===level),enemy=ENCOUNTERS.encounters.find(e=>e.dungeon===dungeon.id&&e.role==='boss');ROOMS[0]=scaledRoom(enemy.id,20);s.phase='prep';setEnemy();startFight();for(let n=0;n<3002&&s.phase==='fight';n++)tick(.05);
 check(['reward','lost'].includes(s.phase)&&Number.isFinite(s.hp)&&Number.isFinite(s.enemy.hp),'Combat invalid '+set.name);fights++;
}
check(fights===18,'Missing combat coverage');
return 'PASS: 48 researched profiles, Shiny identities, cadence/layout, pellet budgets, beam, travel/waves, cleanse, plane shift, armor/retaliation, shared immunity lock, Hex, mushroom/fatigue, six legal sets, distinct slots, thresholds, inspection, proc replay limits and 18 full-set combat simulations';
})()`,ctx));
