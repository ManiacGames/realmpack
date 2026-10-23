const fs=require('fs');const path=require('node:path');const {ctx,vm}=require('../game/tests/load-game.cjs');
vm.runInContext(`
log=()=>{};
let cache=null;const rawConnections=adjacencyConnections;adjacencyConnections=i=>{if(!cache)return rawConnections(i);if(!cache.has(i.id))cache.set(i.id,rawConnections(i));return cache.get(i.id)};
function nativeRun(classId,variant,enemy){
cache=null;selectedDifficulty='normal';freshRun(classId,true);s.seed=123456;s.room=0;s.items=[];s.stash=[];s.max+=60;s.hp=s.max;s.relicPower=4;s.relicHaste=.12;
const gear=[];
for(const baseId of classes[classId].startingIds.slice(0,3)){
 const base=defs[baseId],pool=DATA.items.filter(d=>!d.isShiny&&!d.lootExcluded&&/^T[0-9]+$/.test(d.tier)&&d.group===base.group&&d.kind===base.kind&&d.classes.includes(classId));
 const top=Math.max(...pool.map(d=>+d.tier.slice(1))),fraction=(base.group==='ability'?[.67,.83,1]:[.6,.7,.8])[variant],target=Math.round(top*fraction);
 pool.sort((a,b)=>Math.abs(+a.tier.slice(1)-target)-Math.abs(+b.tier.slice(1)-target)||a.id.localeCompare(b.id));
 const chosen=pool[0]||base;
 gear.push(chosen.id);
}
gear.push(gear[0],DATA.byName['Ring of Magic'],DATA.byName['Health Potion'],DATA.byName['Healing Tome']);
for(const type of gear){const i=makeItem(type);if(!defs[type].once){i.eventHaste=.1;if(['damage','drain','heal','block','mana','poison','burn','bleed','summon'].includes(defs[type].effect)&&Math.round(defs[type].amount*1.15)>defs[type].amount)i.eventInfusion=.15;i.enchantments=[{key:'quickening',value:.05,rank:2}]}if(defs[type].once)i.quantity=3;if(!autoPlace(i))s.stash.push(i)}
if(s.stash.length)throw Error('Benchmark packing failed for '+classId);
ROOMS[0]=scaledRoom(enemy.id,20);s.route=ROOMS;s.phase='prep';startFight();if(s.phase!=='fight')throw Error('No battle');cache=new Map();
for(let n=0;n<3002&&s.phase==='fight';n++)tick(.05);
return {classId,variant,dungeon:enemy.dungeon,tier:dungeonRating(enemy.dungeon).level,won:s.phase==='reward',seconds:+s.time.toFixed(2),hp:Math.round(s.hp),enemyRemaining:Math.round(s.enemy.hp/s.enemy.max*100),packed:s.items.map(i=>defs[i.type].name),stashed:s.stash.map(i=>defs[i.type].name)}
}
`,ctx);
const rows=[];
for(const c of vm.runInContext('Object.keys(classes)',ctx)){
 ctx.auditClass=c;
 rows.push(...vm.runInContext(`ENCOUNTERS.dungeons.flatMap(d=>[0,1,2].map(v=>nativeRun(auditClass,v,ENCOUNTERS.encounters.find(e=>e.dungeon===d.id&&e.role==='boss'))))`,ctx));
 if(process.stderr.isTTY)process.stderr.write(c+' done\n');
}

const summary={gameVersion:fs.readFileSync(path.join(__dirname,'../game/index.html'),'utf8').match(/0\.\d+\.\d+/)[0],runMode:'normal',depth:20,dungeons:35,variants:3,fights:rows.length,results:[...new Set(rows.map(r=>r.classId))].map(classId=>{const group=rows.filter(r=>r.classId===classId);return {classId,wins:group.filter(r=>r.won).length,fights:group.length,variants:[0,1,2].map(v=>group.filter(r=>r.variant===v&&r.won).length)}})};
summary.classes=summary.results.length;
const out=process.argv.indexOf('--output');if(out>=0){if(!process.argv[out+1])throw Error('--output needs a path');fs.writeFileSync(path.resolve(process.argv[out+1]),JSON.stringify({summary,rows},null,2)+'\n')}
console.log(JSON.stringify(summary,null,2));
