'use strict';
const fs=require('node:fs'),path=require('node:path'),sourceFacts=require('../docs/katana-source-facts.json').items.filter(d=>!d.shiny);
const arg=name=>{const at=process.argv.indexOf(name);return at<0?null:process.argv[at+1]};
const selected=arg('--only-ids')?.split(',');
const facts=sourceFacts.filter(d=>(!arg('--only-id')||d.id===arg('--only-id'))&&(!selected||selected.includes(d.id)));
function run(root){const {ctx,vm}=require(path.join(root,'game/tests/load-game.cjs'));ctx.katanaAuditCases=facts.map(d=>({id:d.id,name:d.name}));
 vm.runInContext(`
 log=()=>{};
 function katanaAuditFight(c,classId,v,e){selectedDifficulty='normal';freshRun(classId,true);s.difficulty='normal';s.seed=123456;s.room=0;s.items=[];s.stash=[];s.max+=50;s.hp=s.max;s.relicHaste=.08;
 const tiered=classes[classId].startingIds.slice(0,3).map(id=>{const d=defs[id],pool=DATA.items.filter(j=>!j.isShiny&&!j.lootExcluded&&j.kind===d.kind&&/^T[0-9]+$/.test(j.tier)),top=Math.max(...pool.map(j=>+j.tier.slice(1))),target=Math.round(top*[.6,.9][v]);return pool.sort((a,b)=>Math.abs(+a.tier.slice(1)-target)-Math.abs(+b.tier.slice(1)-target)||a.id.localeCompare(b.id))[0].id});
 const ring=DATA.items.find(d=>d.ringAttribute==='magic'&&d.tier==='T'+[3,6][v]).id;
 for(const id of [c.id,tiered[1],tiered[2],ring,tiered[0],DATA.byName['Health Potion']]){const i=makeItem(id);if(defs[id].once)i.quantity=3;if(!autoPlace(i))throw Error('Illegal pack '+c.name+' '+classId)}
 syncRingVitals();s.hp=s.max;ROOMS[0]=scaledRoom(e.id,20);s.route=ROOMS;s.phase='prep';setEnemy();startFight();if(s.phase!=='fight')throw Error('No battle');
 for(let n=0;n<3002&&s.phase==='fight';n++){tick(.05);if(!Number.isFinite(s.hp)||!Number.isFinite(s.enemy.hp)||(s.katanaProjectiles||[]).length>48||s.summons.length>8)throw Error('Invalid combat '+c.id)}
 return {id:c.id,classId,variant:v,dungeon:e.dungeon,won:s.phase==='reward',seconds:+s.time.toFixed(2),hp:Math.round(s.hp),max:s.max,enemyRemaining:Math.round(s.enemy.hp/s.enemy.max*100)}
 }
 `,ctx);
 const rows=[];
 for(let n=0;n<facts.length;n++){ctx.katanaAuditN=n;rows.push(...vm.runInContext(`['ninja','samurai','kensei'].flatMap(classId=>[0,4,9,14,19,24,29,34].flatMap(k=>[0,1].map(v=>katanaAuditFight(katanaAuditCases[katanaAuditN],classId,v,ENCOUNTERS.encounters.find(e=>e.dungeon===ENCOUNTERS.dungeons[k].id&&e.role==='boss')))))`,ctx));}
 return {rows,summary:facts.map(c=>{const r=rows.filter(x=>x.id===c.id);return {id:c.id,name:c.name,fights:r.length,wins:r.filter(x=>x.won).length,byClass:Object.fromEntries(['ninja','samurai','kensei'].map(k=>[k,r.filter(x=>x.classId===k&&x.won).length])),averageSeconds:+(r.reduce((n,x)=>n+x.seconds,0)/r.length).toFixed(2)}})}
}
const root=path.resolve(__dirname,'..'),baseline=arg('--baseline-root'),before=baseline?run(path.resolve(baseline)):null,after=run(root);
const report={version:'0.37.0',baselineCommit:'b5b0ee8519c186032800e47992e9d9c8c62fea17',assumptions:(arg('--only-id')||selected?'Selected non-Shiny katana definitions; ':'All 69 non-Shiny katana definitions, ')+'including historical Doku and reskins; Ninja/Samurai/Kensei, eight bosses at dungeon indices 0,4,9,14,19,24,29,34; two tiered support levels at 60%/90% family maximum, magic ring T3/T6, extra native tiered katana, 3 Health Potions, +50 base HP and full equipped HP, +8% relic recharge, seed 123456, Adventurer depth 20, 0.05s tick. Tested katana packed first in top row; no enhancements, enchantments, infused gear or paired special rings. Same fixtures in both versions. Fixed-build comparison, not an optimized-build or full-run economy test.',fightsPerVersion:after.rows.length,before:before?.summary,after:after.summary};
if(before){report.changedFights=before.rows.filter((r,n)=>JSON.stringify(r)!==JSON.stringify(after.rows[n])).length;report.totalWins={before:before.rows.filter(r=>r.won).length,after:after.rows.filter(r=>r.won).length}}
if(arg('--output'))fs.writeFileSync(path.resolve(arg('--output')),JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify({fightsPerVersion:report.fightsPerVersion,totalWins:report.totalWins,changedFights:report.changedFights,items:report.after.length},null,2));

if(arg('--compare-report')){const expected=JSON.parse(fs.readFileSync(path.resolve(arg('--compare-report')),'utf8'));for(const item of report.after){const prior=expected.after.find(d=>d.id===item.id);if(JSON.stringify(prior)!==JSON.stringify(item))throw Error('Final source differs from paired report: '+item.id)}console.log('PASS: final-source summaries match '+report.after.length+' paired profiles / '+report.fightsPerVersion+' fights')}
