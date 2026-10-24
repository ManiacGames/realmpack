'use strict';
const fs=require('node:fs'),path=require('node:path');
const cases=[['Vampire Rogue set','rogue',['Soulcursed Scythe','Vampiric Cape','Hallowed Hide',"Ruthven's Rosary"]],['Skuld set','rogue',['Etherite Dagger','Ghastly Drape','Mantle of Skuld','Spectral Ring of Horrors']]];
const arg=name=>{const at=process.argv.indexOf(name);return at<0?null:process.argv[at+1]};
function run(root){const {ctx,vm}=require(path.join(root,'game/tests/load-game.cjs'));ctx.auditCases=cases;
 vm.runInContext(`
 log=()=>{};const itemType=name=>DATA.items.find(d=>d.name===name&&!d.isShiny&&!d.lootExcluded).id;
 function auditFight(c,v,e){freshRun(c[1],true);selectedDifficulty='normal';s.difficulty='normal';s.seed=123456;s.room=0;s.items=[];s.stash=[];s.max+=50;s.hp=s.max;s.relicHaste=.08;
 const tiered=classes[c[1]].startingIds.slice(0,3).map(id=>{const d=defs[id],pool=DATA.items.filter(j=>!j.isShiny&&!j.lootExcluded&&j.kind===d.kind&&/^T[0-9]+$/.test(j.tier)),top=Math.max(...pool.map(j=>+j.tier.slice(1))),target=Math.round(top*[.6,.9][v]);return pool.sort((a,b)=>Math.abs(+a.tier.slice(1)-target)-Math.abs(+b.tier.slice(1)-target)||a.id.localeCompare(b.id))[0].id});
 const ring=DATA.items.find(d=>d.ringAttribute==='magic'&&d.tier==='T'+[3,6][v]).id;let build=[...tiered,ring];
 if(c[2])build=c[2].map(n=>itemType(n));else if(c[0]!=='Tiered control'){const id=itemType(c[0]),d=defs[id],slot=d.group==='ring'?3:['weapon','ability','armor'].indexOf(d.group);build[slot]=id}
 build.push(tiered[0],DATA.byName['Health Potion']);for(const id of build){const i=makeItem(id);if(defs[id].once)i.quantity=3;if(!autoPlace(i))throw Error('Illegal benchmark pack '+c[0]);}
 for(const name of ['The Forgotten Crown','Hallowed Hide','Toga Picta']){const item=s.items.find(i=>defs[i.type].name===name),weapon=s.items.find(i=>defs[i.type].group==='weapon');if(item&&weapon){let done=false;for(let y=0;y<5&&!done;y++)for(let x=0;x<6&&!done;x++)if(fits(item,x,y,item.rot)&&adjacent({...item,x,y},weapon)){Object.assign(item,{x,y});done=true}}}
 syncRingVitals();s.hp=s.max;
 ROOMS[0]=scaledRoom(e.id,20);s.route=ROOMS;s.phase='prep';setEnemy();startFight();if(s.phase!=='fight')throw Error('Battle did not start '+c[0]);for(let n=0;n<3002&&s.phase==='fight';n++){tick(.05);if(!Number.isFinite(s.hp)||!Number.isFinite(s.enemy.hp)||s.summons.length>8)throw Error('Invalid combat '+c[0])}
 return {case:c[0],variant:v,dungeon:e.dungeon,won:s.phase==='reward',seconds:+s.time.toFixed(2),hp:Math.round(s.hp),max:s.max,enemyRemaining:Math.round(s.enemy.hp/s.enemy.max*100)}
 }
 `,ctx);
 const rows=[];for(let n=0;n<cases.length;n++){ctx.auditN=n;rows.push(...vm.runInContext(`ENCOUNTERS.dungeons.flatMap(d=>[0,1].map(v=>auditFight(auditCases[auditN],v,ENCOUNTERS.encounters.find(e=>e.dungeon===d.id&&e.role==='boss'))))`,ctx));}
 return {rows,summary:cases.map(c=>{const r=rows.filter(x=>x.case===c[0]);return {item:c[0],fights:r.length,wins:r.filter(x=>x.won).length,averageSeconds:+(r.reduce((n,x)=>n+x.seconds,0)/r.length).toFixed(2)}})};
}
const currentRoot=path.resolve(__dirname,'..'),baseline=arg('--baseline-root'),before=baseline?run(path.resolve(baseline)):null,after=run(currentRoot),report={version:'0.34.0',assumptions:'Adventurer, depth 20, all 35 bosses; native tiered gear at 60% and 90% family max, extra native weapon, 3 Health Potions, +50 base HP and full equipped HP, beneficial weapon-adjacent placement for Crown/Hide/Toga when legal, +8% blessing recharge, seed 123456, 0.05s tick. One changed slot or a complete named set; no infused/enhanced gear. Legal packs required. This is a fixed-build comparison, not a full-run economy or optimized build search.',before:before?.summary,after:after.summary};
if(before)report.changedFights=before.rows.filter((r,n)=>JSON.stringify(r)!==JSON.stringify(after.rows[n])).length;
const output=arg('--output');if(output)fs.writeFileSync(path.resolve(output),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
