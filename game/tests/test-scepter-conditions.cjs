'use strict';
const assert=require('node:assert/strict'),{ctx,vm}=require('./load-game.cjs');
const facts=require('../../docs/ability-source-facts.json').items;
const targets=facts.filter(d=>d.kind==='scepter'&&!d.shiny&&d.activate.some(a=>a.CondEffect));
assert.deepEqual(targets.map(d=>d.id).sort(),['wiki_14265','wiki_3120','wiki_49693']);
for(const d of targets){const a=d.activate.find(a=>a.CondEffect),p=require('../../docs/ability-profiles.json')[d.id];assert(p.actions.some(x=>x.kind==='status'&&x.effect===({Slowed:'chill',Weak:'weaken'})[a.CondEffect]&&x.amount===+a.CondDuration));}
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};passive=()=>{};enemyProfiles=()=>[];log=()=>{};
function setup(type){freshRun('sorcerer',true);selectPortal(s.portalChoices[0]);s.items=[];s.stash=[];const i=Object.assign(makeItem(type),{x:0,y:0});s.items=[i];s.max=s.hp=1000;setEnemy();s.phase='fight';s.enemy.hp=s.enemy.max=100000;s.enemy.ward=s.enemy.veil=s.enemy.vulnerable=0;s.mana=50;s.power=0;return i}
for(const [type,effect,seconds] of [['wiki_3120','chill',3],['wiki_14265','chill',3],['wiki_49693','weaken',4],['wiki_38520','chill',3],['wiki_3045','weaken',4]]){
 const i=setup(type),mana=s.mana,hp=s.enemy.hp;check(activate(i),'Cast '+type);check(s.enemy.hp<hp&&s.enemy[effect]===seconds,'Damage and sourced condition '+type);check(s.mana<mana,'Mana paid '+type);
 check(describe(defs[type]).includes(effect)||mechanicCard(defs[type]).includes(effect),'Visible condition '+type);
 s.enemy[effect]=1;s.mana=50;activate(i);check(s.enemy[effect]===seconds,'Refresh '+type);s.mana=50;activate(i);check(s.enemy[effect]===seconds,'No duration stacking '+type);
 s.enemy[effect]=8;s.mana=50;activate(i);check(s.enemy[effect]===8,'Preserve longer effect '+type);
 s.enemy[effect]=0;s.mana=0;check(!activate(i)&&s.enemy[effect]===0,'No free condition without mana '+type);
 s.mana=50;activate(i);s.items=[];s.enemy.charge=0;s.enemy.cd=10;tickCombatStep(.05);check(Math.abs(s.enemy[effect]-(seconds-.05))<1e-8,'Duration decay '+type);
 if(effect==='chill')check(Math.abs(s.enemy.charge-.05/1.35)<1e-8,'Chill slows attack clock '+type);
 if(effect==='weaken'){s.block=0;s.hp=1000;playerDamage(100);check(s.hp===925,'Weaken reduces damage '+type)}
 setEnemy();check(!s.enemy[effect],'Encounter reset '+type);
}
const i=setup('wiki_3120'),shiny=Object.assign(makeItem('wiki_38520'),{x:3,y:0});s.items.push(shiny);activate(i);s.mana=50;activate(shiny);check(s.enemy.chill===3,'Normal and shiny refresh shared duration');
return 'PASS: sourced lightning conditions, normal/Shiny casts, damage and mana, refresh without stacking, decay, attack slowing, weaken damage and encounter reset';
})()`,ctx));
