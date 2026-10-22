'use strict';
const fs=require('node:fs'),path=require('node:path'),{ctx,vm}=require('../game/tests/load-game.cjs');
const benchmarkVersion=fs.readFileSync(path.resolve(__dirname,'../game/index.html'),'utf8').match(/EXPERIMENTAL BUILD ([\d.]+)/)[1];
vm.runInContext(`
log=()=>{};
const ringBenchAttributes=['none','attack','defense','dexterity','speed','wisdom','vitality','health','magic'];
function ringBenchmark(classId,variant,enemy,attribute){
 selectedDifficulty='normal';freshRun(classId,true);s.seed=123456;s.room=0;s.items=[];s.stash=[];s.max+=60;s.hp=s.max;s.relicPower=4;s.relicHaste=.12;
 const gear=[];
 for(const id of classes[classId].startingIds.slice(0,3)){
  const base=defs[id],pool=DATA.items.filter(d=>!d.isShiny&&!d.lootExcluded&&/^T[0-9]+$/.test(d.tier)&&d.group===base.group&&d.kind===base.kind&&d.classes.includes(classId));
  const top=Math.max(...pool.map(d=>+d.tier.slice(1))),fraction=(base.group==='ability'?[.67,.83,1]:[.6,.7,.8])[variant],target=Math.round(top*fraction);
  pool.sort((a,b)=>Math.abs(+a.tier.slice(1)-target)-Math.abs(+b.tier.slice(1)-target)||a.id.localeCompare(b.id));gear.push((pool[0]||base).id)
 }
 gear.push(gear[0],DATA.byName['Health Potion'],DATA.byName['Healing Tome']);
 for(const type of gear){const i=makeItem(type),d=defs[type];if(!d.once){i.eventHaste=.1;if(['damage','drain','heal','block','mana','poison','burn','bleed','summon'].includes(d.effect)&&Math.round(d.amount*1.15)>d.amount)i.eventInfusion=.15;i.enchantments=[{key:'quickening',value:.05,rank:2}]}else i.quantity=3;if(!autoPlace(i))throw Error('Packing failed '+classId)}
 const mainAbility=s.items[1],baseMax=s.max;let eligibleNeighbors=0;
 if(attribute!=='none'){
  const d=DATA.items.find(d=>d.ringAttribute===attribute&&d.tier==='T'+[1,4,7][variant]),i=makeItem(d.id),options=[];
  // No gear moves between archetypes. Maximize relevant neighbors, then native gear.
  const eligible=j=>{const d=defs[j.type];return attribute==='attack'?d.group==='weapon':attribute==='defense'?d.effect==='block'||d.affix==='block':attribute==='wisdom'?d.group==='ability':['speed','dexterity'].includes(attribute)?!d.once&&!passiveRing(d):attribute==='vitality'?d.group==='armor':false};
  for(let y=0;y<5;y++)for(let x=0;x<6;x++)if(fits(i,x,y,false)){Object.assign(i,{x,y});const neighbors=s.items.filter(j=>adjacent(i,j)&&eligible(j));options.push({x,y,count:neighbors.length,score:neighbors.length*100+neighbors.filter(j=>!isOffClass(defs[j.type])).length})}
  options.sort((a,b)=>b.score-a.score||a.y-b.y||a.x-b.x);const best=options[0];if(!best)throw Error('No ring slot '+classId);Object.assign(i,{x:best.x,y:best.y});s.items.push(i);eligibleNeighbors=best.count
 }
 ROOMS[0]=scaledRoom(enemy.id,20);s.route=ROOMS;s.phase='prep';startFight();if(s.phase!=='fight')throw Error('Battle did not start');
 let peakMana=s.mana,atManaCap=0,starved=0,peakHP=s.hp;
 for(let n=0;n<3002&&s.phase==='fight';n++){if(s.mana>=manaCapacity())atManaCap+=.05;if(s.mana<itemManaCost(defs[mainAbility.type],mainAbility))starved+=.05;tick(.05);peakMana=Math.max(peakMana,s.mana);peakHP=Math.max(peakHP,s.hp)}
 return {classId,variant,ringTier:[1,4,7][variant],attribute,dungeon:enemy.dungeon,won:s.phase==='reward',seconds:s.time,hp:s.hp,peakMana,atManaCap,starved,healthAboveBase:Math.max(0,peakHP-baseMax),eligibleNeighbors}
}
`,ctx);
const rows=[],ids=vm.runInContext('Object.keys(classes)',ctx);
for(const classId of ids){ctx.ringBenchClass=classId;rows.push(...vm.runInContext(`ENCOUNTERS.dungeons.flatMap(d=>[0,1,2].flatMap(v=>ringBenchAttributes.map(a=>ringBenchmark(ringBenchClass,v,ENCOUNTERS.encounters.find(e=>e.dungeon===d.id&&e.role==='boss'),a))))`,ctx));process.stderr.write(classId+' complete\n')}
const round=n=>Math.round(n*100)/100;
function summary(group){return {fights:group.length,clears:group.filter(x=>x.won).length,meanSeconds:round(group.reduce((n,x)=>n+x.seconds,0)/group.length),meanPeakMana:round(group.reduce((n,x)=>n+x.peakMana,0)/group.length),manaCappedSeconds:round(group.reduce((n,x)=>n+x.atManaCap,0)),abilityStarvedSeconds:round(group.reduce((n,x)=>n+x.starved,0)),meanEligibleNeighbors:round(group.reduce((n,x)=>n+x.eligibleNeighbors,0)/group.length),fightsUsingHealthBonus:group.filter(x=>x.healthAboveBase>0).length}}
const attributes=vm.runInContext('ringBenchAttributes',ctx),result={version:benchmarkVersion,date:'2026-10-22',classes:19,dungeons:35,depth:20,fights:rows.length,fixture:'Fixed native tiered builds plus duplicate weapon, three Health Potions and an off-class Healing Tome. One unenchanted attribute ring at T1/T4/T7 matched to the three gear variants; none baseline leaves that cell empty. Same gear positions across attributes; deterministic placement maximizes eligible adjacent items, then native items, without inspecting battle outcomes. Full base HP and five mana before ring bonuses; Normal difficulty.',limitations:'Results compare these builds and placements, not every build, starting condition, dungeon depth or ring combination. Clear counts are not player win probabilities. Amounts differ by archetype and mana cost affects usefulness. No ring stacking is simulated.',byAttribute:Object.fromEntries(attributes.map(a=>[a,summary(rows.filter(x=>x.attribute===a))])),byClass:ids.map(classId=>({classId,attributes:Object.fromEntries(attributes.map(a=>[a,summary(rows.filter(x=>x.classId===classId&&x.attribute===a))]))})),byTier:[1,4,7].map(tier=>({tier,attributes:Object.fromEntries(attributes.map(a=>[a,summary(rows.filter(x=>x.ringTier===tier&&x.attribute===a))]))}))};
const out=process.argv.indexOf('--output');if(out>=0){if(!process.argv[out+1])throw Error('Missing output path');fs.writeFileSync(path.resolve(process.argv[out+1]),JSON.stringify(result,null,2)+'\n')}
console.log(JSON.stringify({version:result.version,fights:result.fights,byAttribute:result.byAttribute},null,2));
