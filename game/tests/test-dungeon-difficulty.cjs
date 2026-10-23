'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const root=path.resolve(__dirname,'..');let storage={};const ctx={window:{__TEST__:true},document:{addEventListener(){}},console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(k,v){storage[k]=v},getItem(k){return storage[k]||null}}};vm.createContext(ctx);for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','item-balance.js','realm-specials.js','dagger-update.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','consumables-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','class-runtime.js','shop-specialists.js','game.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};freshRun('knight',true);selectPortal(s.portalChoices[0]);
check(ENCOUNTERS.dungeons.length===35&&Object.keys(DUNGEON_RATINGS).length===35,'Coverage');
const ids=Object.fromEntries(ENCOUNTERS.dungeons.map(d=>[d.name,d.id]));
for(const d of ENCOUNTERS.dungeons){const t=dungeonRating(d.id),badge=dungeonDifficultyBadge(d.id);check(t.level>=1&&t.level<=5&&t.hp>0&&t.damage>0&&t.rate>0,'Invalid tier '+d.name);check(badge.includes(t.level+'/5')&&badge.includes(t.name)&&(badge.match(/class="filled"/g)||[]).length===t.level,'Invalid marker '+d.name)}
check(dungeonRating(ids['Lair of Draconis']).level===3&&dungeonRating(ids['Parasite Chambers']).level===3,'Non-exalt misclassified');check(dungeonRating(ids['The Nest']).level===4&&dungeonRating(ids['The Shatters']).level===5,'Exalt hierarchy');
let portalMarkup='';modal=(title,desc,body)=>{portalMarkup=body};s.phase='portal';s.portalChoices=pickDungeonPortals();const markerSeed=s.seed;showPortal();check((portalMarkup.match(/class="dungeon-difficulty"/g)||[]).length===3&&portalMarkup.includes('How dungeon difficulty works')&&s.seed===markerSeed,'Portal markers or render reroll');
const compared=[];for(const mode of Object.keys(DIFFICULTIES)){s.difficulty=mode;for(const depth of [1,10,20,30,60])for(const role of ['combat','elite','boss']){const groups=[[],[]];for(const d of ENCOUNTERS.dungeons){const t=dungeonRating(d.id);if(t.level===3)continue;for(const e of ENCOUNTERS.encounters.filter(e=>e.dungeon===d.id&&e.role===role)){const r=scaledRoom(e.id,depth);check(r.hp>0&&r.damage>0&&r.cd>=.95&&r.balanceVersion===DUNGEON_BALANCE_VERSION,'Invalid scaled room');const pressure=r.hp*r.damage/r.cd;groups[t.level<=2?0:1].push({hp:r.hp,pressure});const risky=scaledRoom(e.id,depth,true);check(risky.hp>r.hp&&risky.damage>=r.damage&&risky.gold>r.gold,'Risk not rewarded')}}
const easyMaxHP=Math.max(...groups[0].map(r=>r.hp)),exaltMinHP=Math.min(...groups[1].map(r=>r.hp)),easyMaxThreat=Math.max(...groups[0].map(r=>r.pressure)),exaltMinThreat=Math.min(...groups[1].map(r=>r.pressure));check(exaltMinHP>easyMaxHP&&exaltMinThreat>easyMaxThreat,'Difficulty inversion '+mode+'/'+depth+'/'+role);if(mode==='normal'&&depth===20&&role==='boss')compared.push({easyMaxHP,exaltMinHP,threatRatio:Math.round(exaltMinThreat/easyMaxThreat*100)/100})}}
s.difficulty='normal';const seen=new Set();for(let seed=1;seed<=200;seed++)for(let act=0;act<3;act++){s.seed=seed;s.room=act*10;const choices=pickDungeonPortals(),grades=choices.map(id=>dungeonRating(id).level);check(choices.length===3&&new Set(choices).size===3,'Duplicate/missing portals');check(grades.join()===(act===0?'1,1,2':act===1?'2,3,3':'3,4,5'),'Wrong portal band');choices.forEach(id=>seen.add(id))}check(seen.size===35,'Some dungeons unreachable');
// Rebalance stale route/branch stats without rerolling the route or touching past encounters.
freshRun('knight');selectPortal(s.portalChoices[0]);s.room=1;preparePath();const seed=s.seed,taken=JSON.stringify(s.mapTaken),past=JSON.stringify(ROOMS[0]);const stale=ROOMS[1];stale.hp=1;stale.balanceVersion=2;s.pathChoices[0].hp=1;s.pathChoices[0].balanceVersion=2;s.mapBranches[1][1]=scaledRoom(stale.encounterId,stale.depth,true);const branch=s.mapBranches[1][1];branch.hp=1;branch.balanceVersion=2;migrateDungeonBalance();check(stale.hp===scaledRoom(stale.encounterId,stale.depth,stale.risk,stale.type).hp&&branch.hp>1&&branch.balanceVersion===DUNGEON_BALANCE_VERSION,'Stale branches retained');check(JSON.stringify(ROOMS[0])===past&&s.seed===seed&&JSON.stringify(s.mapTaken)===taken,'Migration changed history/route RNG');s.phase='prep';save();const expected=ROOMS[1].hp;s=null;ROOMS=[];boot();check(ROOMS[1].hp===expected&&ROOMS[1].balanceVersion===DUNGEON_BALANCE_VERSION,'Migration not stable on reload');
// Rapid attacks must not repeatedly reset silence without a cooldown.
s.phase='fight';ROOMS[s.room]={...ROOMS[s.room],profile:'hexer',type:'combat'};s.enemy.hp=s.enemy.max=100000;s.enemy.damage=0;s.enemy.attacks=2;s.time=3;s.silence=0;s.mana=10;enemyAttack();check(s.silence===3&&s.enemy.lastHexAt===3,'First hex missing');s.silence=0;s.enemy.attacks=5;s.time=6;enemyAttack();check(s.silence===0&&s.enemy.lastHexAt===3,'Rapid hex chain');s.enemy.attacks=8;s.time=12;enemyAttack();check(s.silence===3&&s.enemy.lastHexAt===12,'Hex cooldown never recovers');
// Starter builds should still clear the first Pirate Cave encounter.
const openings=[];for(const c of Object.values(classes)){freshRun(c.id);selectPortal(s.portalChoices[0]);const enemy=ENCOUNTERS.encounters.find(e=>e.dungeon===ids['Pirate Cave']&&e.role==='combat');ROOMS[0]=scaledRoom(enemy.id,1);startFight();for(let n=0;n<3100&&s.phase==='fight';n++)tick(.05);check(s.phase==='reward','Unfair beginner opening '+c.id);openings.push(c.id)}
return {dungeons:seen.size,comparisons:4*5*3,matchedBossComparison:compared,starterOpeningVictories:openings.length,checks:'five readable tiers, all run modes/depths/roles, no easy-vs-exalt baseline inversions, risk rewards, portal reachability and saved-branch migration'};
})()`,ctx));
// Maximum-upgrade reachability fixture, using native tiered equipment and legal four-slot enchants.
console.log(vm.runInContext(`(()=>{
const results=[];
for(const classId of ['knight','wizard','priest'])for(const dungeon of ['Pirate Cave','Cultist Hideout','The Nest','The Shatters','Oryx’s Sanctuary']){
 selectedDifficulty='normal';freshRun(classId,true);selectPortal(s.portalChoices[0]);s.items=[];s.stash=[];
 const ranked=kind=>DATA.items.filter(d=>d.kind===kind&&/^T[0-9]+$/.test(d.tier)&&!d.isShiny).sort((a,b)=>b.progressionRank-a.progressionRank)[0];
 const weapon=ranked(defs[classes[classId].startingIds[0]].kind),ability=ranked(defs[classes[classId].startingIds[1]].kind),armor=ranked(defs[classes[classId].startingIds[2]].kind);
 for(const type of [...Array(4).fill(weapon.id),ability.id,armor.id,DATA.byName['Tome of Holy Protection'],DATA.byName['Ring of Magic'],DATA.byName['Health Potion']]){
  const i=makeItem(type),d=defs[type];if(!autoPlace(i))throw Error('Endgame fixture does not fit');
  if(d.once){i.quantity=5;continue}
  i.eventHaste=.20;if(['damage','drain','heal','block','mana','poison','burn','bleed','summon'].includes(d.effect)&&Math.round(d.amount*1.3)>d.amount)i.eventInfusion=.30;
  const fourth=['damage','drain'].includes(d.effect)?'might':d.effect==='block'?'bulwark':d.effect==='heal'?'restoration':'ward';
  i.enchantments=['quickening','barrier','siphon',fourth].map(key=>{if(!ENCHANT_TYPES[key].eligible(d))throw Error('Illegal benchmark enchant');return {key,value:ENCHANT_TYPES[key].values[2],rank:3}});
 }
 s.max+=80;s.hp=s.max;s.relicPower=6;s.relicHaste=.24;
 const id=ENCOUNTERS.dungeons.find(d=>d.name===dungeon).id,enemy=ENCOUNTERS.encounters.find(e=>e.dungeon===id&&e.role==='boss');ROOMS[0]=scaledRoom(enemy.id,30);startFight();
 for(let n=0;n<3100&&s.phase==='fight';n++)tick(.05);
 results.push({classId,dungeon,won:s.phase==='reward',seconds:Math.round(s.time),hp:Math.round(s.hp)})
}
for(const name of ['Pirate Cave','Cultist Hideout','The Nest','The Shatters','Oryx’s Sanctuary'])if(!results.some(r=>r.dungeon===name&&r.won))throw Error('No legal endgame benchmark can clear '+name);
return {upgradedBuildBenchmarks:results};
})()`,ctx));
