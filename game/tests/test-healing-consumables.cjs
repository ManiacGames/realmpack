'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const root=path.resolve(__dirname,'..');const ctx={window:{__TEST__:true},console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(){},getItem(){return null}}};vm.createContext(ctx);
for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','item-balance.js','realm-specials.js','dagger-update.js','sword-update.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','consumables-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','battle-floors.js','class-runtime.js','shop-specialists.js','game.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};
freshRun('knight',true);selectPortal(s.portalChoices[0]);s.phase='fight';s.items=[];s.stash=[];s.max=200;s.hp=200;s.mana=20;s.time=0;
const potion=makeItem(DATA.byName['Health Potion']);potion.quantity=3;potion.charge=cooldown(potion);s.items=[potion];
const startingMana=s.mana,readyCharge=potion.charge;
check(!activate(potion),'Full-health potion fired');
const signatureType='testSignatureHeal';defs[signatureType]={...defs[potion.type],id:signatureType,mechanic:{key:'purify',n:1,title:'Purify',text:'Test'}};const signature=makeItem(signatureType);check(!activateSignature(signature)&&!signature.special,'Full-health signature potion mutated state');
check(potion.activations===0&&!potion.usesSpent&&potion.charge===readyCharge&&s.mana===startingMana,'Waiting spent resources or charge');
s.hp=101;check(!activate(potion),'Above threshold fired');s.hp=100;
check(activate(potion)&&s.hp>100&&stackRemaining(potion)===2,'Exact threshold did not heal');
potion.charge=cooldown(potion);check(!activate(potion)&&stackRemaining(potion)===2&&potion.charge===cooldown(potion),'Next copy wasted above threshold');
s.hp=50;check(activate(potion)&&stackRemaining(potion)===1,'Next copy failed below threshold');
check(describe(defs[potion.type]).includes('50% health'),'Missing displayed rule');
// Ordinary healing and heal-affix consumables use the same gate; repeating gear and non-healing consumables do not.
defs.testheal={...defs[potion.type],consumableRework:false,consumable:undefined,id:'testheal',mechanic:null,mana:2,affix:null};
const normal=makeItem('testheal');normal.charge=cooldown(normal);s.items=[normal];s.hp=s.max;s.mana=20;
check(!activate(normal)&&s.mana===20&&normal.activations===0,'Normal consumable wasted resources');
s.hp=100;check(activate(normal)&&s.mana===18&&normal.used,'Normal consumable failed');
defs.testaffix={...defs.testheal,id:'testaffix',effect:'block',affix:'heal',affixAmount:10};const affix=makeItem('testaffix');s.hp=200;check(!activate(affix),'Healing affix bypassed rule');
defs.testrepeat={...defs.testheal,id:'testrepeat',once:false};const repeat=makeItem('testrepeat');check(activate(repeat),'Repeating healing gear changed');
defs.testmana={...defs.testheal,id:'testmana',effect:'mana'};const mana=makeItem('testmana');check(activate(mana),'Non-healing consumable changed');
// Exercise actual battle tick: waiting must retain readiness and fire on the next tick after damage.
s.items=[potion];potion.used=false;potion.usesSpent=0;potion.activations=0;potion.charge=cooldown(potion);s.hp=s.max;s.mana=20;s.silence=0;s.enemy.hp=s.enemy.max=100000;s.enemy.cd=1000;s.enemy.charge=0;
tick(.05);check(potion.activations===0&&potion.charge===cooldown(potion),'Tick spent waiting charge');
s.hp=100;tick(.05);check(potion.activations===1&&potion.charge===0&&stackRemaining(potion)===2,'Ready heal did not trigger immediately');
potion.charge=cooldown(potion);tick(.05);check(potion.activations===1&&stackRemaining(potion)===2,'Tick wasted next copy');
setEnemy();check(stackRemaining(potion)===2&&!potion.used,'Spent potion returned on the next battle');
return 'PASS: full-health prevention, exact 50% boundary, ordinary/signature/affix healing, resource preservation, per-copy health checks, ready cooldown tick behavior, unaffected gear/non-healing consumables and permanent consumption';
})()`,ctx));
