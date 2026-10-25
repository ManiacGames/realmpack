'use strict';
const {ctx,vm}=require('./load-game.cjs');ctx.document={addEventListener(){}};
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};let routes=0;const layouts=new Set(),seen=new Set();
for(const c of Object.keys(classes))for(let seed=1;seed<=10;seed++){
 freshRun(c,true);s.seed=(seed*2654435761)>>>0;s.portalChoices=pickDungeonPortals();check(ROOMS.length===40,'Route length');const picked=[];
 for(let stage=0;stage<5;stage++){
  s.room=stage*8;s.phase='portal';s.portalChoices=pickDungeonPortals();check(s.portalChoices.length===3&&new Set(s.portalChoices).size===3,'Portal count');check(s.portalChoices.every(id=>!picked.includes(id)),'Repeated dungeon offered');
  const state=s.seed;for(const id of s.portalChoices)portalLootPreview(id);check(s.seed===state,'Loot preview rerolls');
  s.portalChoices.forEach(id=>seen.add(id));const id=s.portalChoices[seed%3];selectPortal(id);picked.push(id);seen.add(id);
  const part=ROOMS.slice(stage*8,stage*8+8),types=Object.entries(s.mapBranches).filter(([idx])=>+idx>=stage*8&&+idx<stage*8+8).flatMap(([,rooms])=>rooms.map(r=>r.type));layouts.add(JSON.stringify(s.mapLinks));
  for(const[type,count]of [['combat',2],['elite',1],['rest',1],['shop',1],['event',2],['boss',1]])check(types.filter(t=>t===type).length>=1,'Missing service '+type);
  check(part[7].type==='boss'&&part[6].eventId==='enchanter','Boss/enchanter positions');check(part.every(r=>r.dungeonId===id),'Mixed dungeon');check(mapRows().length===8,'Map rows');
  s.phase='prep';const before=JSON.stringify(ROOMS),rngBefore=s.seed;s=JSON.parse(JSON.stringify(s));ROOMS=s.route;rebalanceSavedRoute();check(JSON.stringify(ROOMS)===before&&s.seed===rngBefore,'Reload rewrites route');
 }
 check(new Set(picked).size===5,'Repeated dungeon visited');s.room=39;s.phase='boon';const base=s.relicPower;takeBoon('power');check(s.phase==='won'&&s.room===39&&s.relicPower===base+1,'Victory boundary or boon');continueEndless();check(ROOMS.length===80&&s.room===40&&s.phase==='portal','Endless circuit');routes++;
}
for(let seed=1;seed<=200;seed++)for(let stage=0;stage<5;stage++){s.seed=(seed*2654435761)>>>0;s.room=stage*8;s.dungeons=[];pickDungeonPortals().forEach(id=>seen.add(id))}
check(layouts.size>=10&&seen.size===35,'Missing layout/dungeon coverage '+layouts.size+'/'+seen.size);
freshRun('wizard',true);for(let n=0;n<5;n++)check(progressionDepth((n+1)*8)===10+n*5,'Boss curve');const boss=ENCOUNTERS.encounters.find(e=>e.role==='boss');const modern=scaledRoom(boss.id,40);delete s.runFormat;const old=scaledRoom(boss.id,30);check(modern.hp===old.hp&&modern.damage===old.damage&&modern.cd===old.cd&&modern.gold===old.gold,'Endgame endpoint drift');
// Legacy saves retain their 30-room circuit, ten-room maps and original progression.
s.route=ROOMS=emptyRoute();s.dungeons=[];s.room=0;s.phase='portal';s.portalChoices=pickDungeonPortals();selectPortal(s.portalChoices[0]);check(ROOMS.length===30&&mapRows().length===10&&dungeonRoomCount()===10&&progressionDepth(30)===30,'Legacy format changed');s.room=29;s.phase='boon';takeBoon('life');check(s.phase==='won','Legacy victory moved');continueEndless();check(ROOMS.length===60&&s.room===30,'Legacy endless changed');
return {routes,classes:19,dungeons:seen.size,layouts:layouts.size,checks:'40-room routes, unique portals, services, loot previews, save round trips, boss scaling, victory/endless, legacy compatibility'};
})()`,ctx));
