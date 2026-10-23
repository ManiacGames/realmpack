'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),{ctx,vm}=require('./load-game.cjs');
const floors=vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)};
 freshRun('knight',true);selectPortal(s.portalChoices[0]);
 check(ENCOUNTERS.dungeons.every(d=>BATTLE_FLOORS[d.id]),'Missing dungeon floor');
 for(const encounter of ENCOUNTERS.encounters)check(battleFloorForRoom({encounterId:encounter.id})===BATTLE_FLOORS[encounter.dungeon],'Encounter floor follows selected act instead of actual encounter');
 s.dungeons[actIndex()]='dungeon_20';check(battleFloorForRoom({type:'event'})===BATTLE_FLOORS.dungeon_20,'Act fallback for event room');
 check(battleFloorForRoom({dungeonId:'dungeon_34'})===BATTLE_FLOORS.dungeon_34,'Explicit dungeon override');
 check(battleFloorForRoom({encounterId:'missing'})===null,'Unknown encounter fallback');
 let writes=0;const arena={dataset:{},style:{setProperty(){writes++}}};document={querySelector:()=>arena};window.__TEST__=false;
 const before=JSON.stringify(s);updateBattleFloor({dungeonId:'dungeon_9'});check(arena.dataset.dungeonFloor==='abyss-of-demons'&&writes===2,'Floor switch not applied');
 for(let n=0;n<100;n++)updateBattleFloor({dungeonId:'dungeon_9'});check(writes===2,'Unchanged floor writes styles repeatedly');
 updateBattleFloor({dungeonId:'dungeon_20'});check(arena.dataset.dungeonFloor==='ice-cave'&&writes===4,'Portal floor switch failed');
 updateBattleFloor({dungeonId:'missing'});check(arena.dataset.dungeonFloor==='vault','Unknown floor not reset');check(JSON.stringify(s)===before,'Floor presentation changed gameplay state');
 window.__TEST__=true;return Object.values(BATTLE_FLOORS);
})()`,ctx);
assert.equal(floors.length,35);assert.equal(new Set(floors.map(f=>f.image)).size,35);
for(const f of floors){const svg=fs.readFileSync(path.join(__dirname,'..',f.image),'utf8');assert(svg.includes('shape-rendering="crispEdges"'));assert(!/filter|animate|script|foreignObject|https?:\/\//.test(svg.replace('http://www.w3.org/2000/svg','')));}
console.log('PASS: 35 static floor assets, all 350 encounter mappings, route/event/practice fallbacks, dungeon switches, style caching and unchanged gameplay state');
