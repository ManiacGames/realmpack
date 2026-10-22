'use strict';
// Reproducible simulation audit. Leaves gameplay rules and encounter data unchanged.
const fs=require('node:fs'),path=require('node:path'),{ctx,vm}=require('../game/tests/load-game.cjs');
const arg=(name,fallback)=>{const n=process.argv.indexOf(name);return n<0?fallback:process.argv[n+1]};
const output=path.resolve(arg('--output','/tmp/realmpack-encounter-audit.ndjson')),limit=+arg('--limit','350'),seeds=arg('--seeds','123456,987654,424242').split(',').map(Number);
vm.runInContext(`
log=()=>{};save=()=>{};rollLoot=()=>[];
const auditTemplates=[],auditBuilds=['starter','developing','established'];
selectedDifficulty='normal';
for(const classId of Object.keys(classes))for(let build=0;build<3;build++){
 freshRun(classId,true);s.items=[];s.stash=[];s.route=[];s.history=[];s.portalChoices=[];s.enemy=null;s.seed=123456;
 const gear=[];
 for(const baseId of classes[classId].startingIds.slice(0,3)){
  const base=defs[baseId];if(!build){gear.push(baseId);continue}
  const pool=DATA.items.filter(d=>!d.isShiny&&!d.lootExcluded&&/^T[0-9]+$/.test(d.tier)&&d.group===base.group&&d.kind===base.kind&&d.classes.includes(classId));
  const top=Math.max(...pool.map(d=>+d.tier.slice(1))),fraction=build===1?(base.group==='ability'?.5:.35):(base.group==='ability'?.83:.7),target=Math.round(top*fraction);
  pool.sort((a,b)=>Math.abs(+a.tier.slice(1)-target)-Math.abs(+b.tier.slice(1)-target)||a.id.localeCompare(b.id));gear.push((pool[0]||base).id)
 }
 if(build)gear.push(gear[0]);gear.push(DATA.byName['Ring of Magic'],DATA.byName['Health Potion']);if(build)gear.push(DATA.byName['Healing Tome']);
 s.max+=[0,25,60][build];s.hp=s.max;s.relicPower=[0,1,4][build];s.relicHaste=[0,.04,.12][build];
 for(const type of gear){const i=makeItem(type);if(defs[type].once)i.quantity=build+1;else if(build){i.eventHaste=build===1?.04:.1;if(build===2){if(['damage','drain','heal','block','mana','poison','burn','bleed','summon'].includes(defs[type].effect)&&Math.round(defs[type].amount*1.15)>defs[type].amount)i.eventInfusion=.15;i.enchantments=[{key:'quickening',value:.05,rank:2}]}}if(!autoPlace(i))throw Error('Illegal audit packing '+classId+'/'+build)}
 auditTemplates.push({classId,build:auditBuilds[build],state:JSON.stringify(s),uid,gear:s.items.map(i=>({type:i.type,name:defs[i.type].name,x:i.x,y:i.y,rot:i.rot,quantity:i.quantity,eventHaste:i.eventHaste||0,eventInfusion:i.eventInfusion||0,enchantments:itemEnchants(i)}))})
}
let auditHealing=0,auditAttacks=0;
const auditRestore=restore,auditAttack=enemyAttack;
restore=(...args)=>{const healed=auditRestore(...args);auditHealing+=healed;return healed};enemyAttack=()=>{auditAttacks++;return auditAttack()};
function auditFight(template,encounter,depth,seed,patch=null){
 s=JSON.parse(template.state);uid=template.uid;s.seed=seed;s.room=0;ROOMS=[scaledRoom(encounter.id,depth)];if(patch)Object.assign(ROOMS[0],patch);s.route=ROOMS;modalKind='';catalogueOpen=false;bestiaryOpen=false;selected=null;inspected=null;effectHover=null;s.phase='prep';auditHealing=0;auditAttacks=0;startFight();if(s.phase!=='fight')throw Error('No fight');
 let silenceSeconds=0,phaseTwoSeconds=0,minHP=s.hp;
 for(let n=0;n<3002&&s.phase==='fight';n++){silenceSeconds+=Math.min(.05,s.silence||0);if(s.enemy.phaseTwo)phaseTwoSeconds+=.05;tick(.05);minHP=Math.min(minHP,s.hp)}
 const won=s.phase==='reward',e=s.enemy,r=ROOMS[0],remaining=won?0:(Math.max(0,e.hp)+((r.waves||1)-e.wave)*e.max)/(e.max*(r.waves||1));
 return {id:encounter.id,classId:template.classId,build:template.build,seed,depth,won,timeout:!won&&s.time>=150,seconds:+s.time.toFixed(2),hpPct:+(100*s.hp/s.max).toFixed(2),minHpPct:+(100*minHP/s.max).toFixed(2),damageTaken:+(s.max+auditHealing-s.hp).toFixed(2),healing:auditHealing,attacks:auditAttacks,silenceSeconds:+silenceSeconds.toFixed(2),phaseTwoSeconds:+phaseTwoSeconds.toFixed(2),enemyRemainingPct:+(100*remaining).toFixed(2)}
}
function auditEncounter(id,seeds,depths=[10],patch=null){const encounter=encounterDefs[id],rows=[];for(const depth of depths)for(const t of auditTemplates)for(const seed of seeds)rows.push(auditFight(t,encounter,depth,seed,patch));return rows}
`,ctx);
if(require.main===module){
const encounters=vm.runInContext('ENCOUNTERS.encounters.map(e=>({...e,dungeonName:dungeonDefs[e.dungeon].name,tier:dungeonRating(e.dungeon).level,effectiveSecondary:dungeonBossSecondary(e),stats:scaledRoom(e.id,10)}))',ctx).slice(+arg('--start','0'),+arg('--start','0')+limit);
fs.writeFileSync(output,'');const started=Date.now();let fights=0;
for(let n=0;n<encounters.length;n++){
 const e=encounters[n];ctx.auditInput=e.id;ctx.auditSeeds=seeds;
 const rows=vm.runInContext('auditEncounter(auditInput,auditSeeds)',ctx);for(const row of rows)fs.appendFileSync(output,JSON.stringify(row)+'\n');fights+=rows.length;
 if(n%25===0||n===encounters.length-1)console.error(JSON.stringify({encounters:n+1,fights,elapsedSeconds:Math.round((Date.now()-started)/1000)}));
}
fs.writeFileSync(output.replace(/\.ndjson$/,'.metadata.json'),JSON.stringify({version:(fs.readFileSync(path.resolve(__dirname,'../game/index.html'),'utf8').match(/EXPERIMENTAL BUILD ([0-9.]+)/)||[])[1],mode:'normal',depth:10,dt:.05,seeds,encounters,templates:vm.runInContext('auditTemplates.map(({state,...t})=>({...t,maxHP:JSON.parse(state).max,relicPower:JSON.parse(state).relicPower,relicHaste:JSON.parse(state).relicHaste}))',ctx)},null,2));
console.log(JSON.stringify({output,fights,seconds:(Date.now()-started)/1000}));
}
module.exports={ctx,vm};
