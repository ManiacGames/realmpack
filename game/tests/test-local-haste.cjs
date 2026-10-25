'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const root=path.resolve(__dirname,'..');const ctx={window:{__TEST__:true},console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(){},getItem(){return null}}};vm.createContext(ctx);
for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','item-balance.js','realm-specials.js','dagger-update.js','sword-update.js','staff-update.js','wand-update.js','katana-update.js','ring-update.js','armor-update.js','ability-update.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','consumables-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','battle-floors.js','class-runtime.js','shop-specialists.js','game.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)},close=(a,b)=>Math.abs(a-b)<1e-8;
freshRun('knight',true);selectPortal(s.portalChoices[0]);s.phase='fight';s.max=200;s.hp=100;s.mana=50;s.time=0;s.relicHaste=0;s.haste=0;
const base=defs[DATA.byName['Health Potion']];
const fixture=(id,extra={})=>defs[id]={...base,consumableRework:false,consumable:undefined,id,name:id,group:'ring',kind:'ring',effect:'block',amount:1,mana:0,cd:4,w:1,h:1,once:false,mechanic:null,affix:null,condition:'none',bonus:0,classes:['knight'],...extra};
fixture('speed',{effect:'haste',amount:3});fixture('target');
const pack=(type,x,y)=>Object.assign(makeItem(type),{x,y});
const source=pack('speed',1,1),target=pack('target',2,1),diagonal=pack('target',2,2),far=pack('target',5,4),above=pack('target',1,0),stashed=pack('target',null,null);
s.items=[source,target,diagonal,far,above];s.stash=[stashed];
const baseline=cooldown(target),selfBaseline=cooldown(source);check(activate(source),'Normal haste activation failed');
check(s.haste===0&&target.hasteRemaining===3&&above.hasteRemaining===3,'Haste not local');
check(!source.hasteRemaining&&!diagonal.hasteRemaining&&!far.hasteRemaining&&!stashed.hasteRemaining,'Self/diagonal/distant/stash received haste');
check(close(cooldown(target),baseline/1.25)&&close(cooldown(source),selfBaseline),'Recharge strength or self exclusion wrong');
check(itemLinks().some(l=>l.source===source.id&&l.target===target.id&&l.label.includes('haste')),'Missing haste link');
check(!itemLinks().some(l=>l.source===source.id&&l.target===diagonal.id&&l.label.includes('haste')),'Diagonal haste link');
check(itemEffectNotes(target).some(n=>n.text.includes('Adjacent haste')),'Missing recipient note');
activate(source);check(target.hasteRemaining===3,'Repeated haste stacked duration');
const second=pack('speed',3,1);s.items.push(second);activate(second);check(target.hasteRemaining===3&&close(cooldown(target),baseline/1.25),'Overlapping sources stacked');
grantItemHaste(source,1);check(target.hasteRemaining===3,'Short buff shortened existing haste');grantItemHaste(source,100);check(target.hasteRemaining===15,'Duration cap lost');
s.haste=4;check(close(cooldown(target),baseline/1.25)&&close(cooldown(far),baseline/1.25),'Class overlap doubled bonus or class haste not global');
s.haste=0;
// Signature primary and active affix paths must carry their source, including double activations.
fixture('signature',{effect:'haste',amount:3,mechanic:{key:'double',n:1,title:'Double',text:'Test'}});const signature=pack('signature',1,1);s.items=[signature,target];target.hasteRemaining=0;activate(signature);activate(signature);check(target.hasteRemaining===2&&!signature.hasteRemaining&&s.haste===0,'Signature source or double changed locality');
fixture('affix',{affix:'haste',affixAmount:2});const affix=pack('affix',1,1);s.items=[affix,target];target.hasteRemaining=0;activate(affix);check(target.hasteRemaining===2,'Ordinary haste affix missed');
defs.affix.mechanic={key:'capacitor',n:1,title:'Capacitor',text:'Test',keepAffix:true};target.hasteRemaining=0;activate(affix);check(target.hasteRemaining===2,'Retained signature affix missed');
defs.affix.mechanic.keepAffix=false;target.hasteRemaining=0;activate(affix);check(!target.hasteRemaining&&!grantsItemHaste(defs.affix),'Suppressed affix grants haste or link');
// Large-item edge contact counts once and corner-only contact does not count.
source.x=0;source.y=0;defs.speed.w=2;defs.speed.h=2;target.x=2;target.y=1;diagonal.x=2;diagonal.y=2;s.items=[source,target,diagonal];target.hasteRemaining=0;diagonal.hasteRemaining=0;grantItemHaste(source,3);check(target.hasteRemaining===3&&!diagonal.hasteRemaining,'Multi-cell adjacency incorrect');
// Tick timers and legacy items without a timer; no source in the pack cannot grant haste.
s.items=[target,far];s.stash=[source];target.hasteRemaining=.05;delete far.hasteRemaining;target.charge=0;far.charge=0;s.enemy.hp=s.enemy.max=100000;s.enemy.cd=1000;s.enemy.charge=0;
grantItemHaste(source,5);check(target.hasteRemaining===.05,'Stashed source granted haste');tick(.1);check(target.hasteRemaining===0&&far.hasteRemaining===0&&close(cooldown(target),baseline),'Timer expiration or legacy default failed');
s.classId='warrior';s.progress=0;passive('attack',3);check(s.haste===0&&s.fury===1,'Warrior Fury should not grant global haste');
s.classId='bard';s.progress=0;s.haste=0;passive('rhythm',4);check(s.haste===0,'Bard Rhythm should not grant global haste');
setEnemy();check(target.hasteRemaining===0&&s.haste===0,'Battle reset retained haste');
check(effectText('haste',3).includes('adjacent')&&effectText('haste',3).includes('excludes self'),'Missing description');
return 'PASS: ordinary/signature/affix haste locality, self/diagonal/stash exclusion, multi-cell edges, no duration or speed stacking, overlap with class haste, source links/notes, ticking/legacy defaults, class passives and battle reset';
})()`,ctx));
