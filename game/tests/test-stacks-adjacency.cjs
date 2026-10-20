const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const base=path.resolve(__dirname,'..');let saves={};
const ctx={window:{__TEST__:true},console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(k,v){saves[k]=v},getItem(k){return saves[k]||null}}};vm.createContext(ctx);
for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','item-balance.js','realm-specials.js','dagger-update.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','class-runtime.js','shop-specialists.js','game.js'])vm.runInContext(fs.readFileSync(path.join(base,f),'utf8'),ctx);
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};freshRun('knight',true);selectPortal(s.portalChoices[0]);
const fixture=(id,group,effect,once=false)=>defs[id]={id,name:id,group,kind:group,effect,once,amount:100,mana:0,cd:4,w:1,h:1,bonus:0,condition:'none',classes:[],quality:0,price:1};
const pack=(type,x,y)=>Object.assign(makeItem(type),{x,y});
fixture('weapon','weapon','damage');fixture('ring','ring','damage');fixture('armor','armor','block');fixture('ability','ability','damage');fixture('mana','ring','mana');fixture('heal','ring','heal');fixture('poison','weapon','poison');fixture('potion','consumable','heal',true);
const setups=[['weapon','ring'],['weapon','armor'],['ability','weapon'],['ability','mana'],['armor','armor'],['heal','armor'],['mana','ability'],['poison','poison'],['potion','ring'],['potion','armor']];
for(let n=0;n<ADJACENCY_RULES.length;n++){
 const rule=ADJACENCY_RULES[n],[a,b]=setups[n],i=pack(a,0,0),j=pack(b,1,0);s.items=[i,j];s.stash=[];s.phase='fight';s.hp=20;s.max=1000;s.mana=20;s.block=0;s.enemy.hp=s.enemy.max=100000;
 check(adjacencyConnections(i).some(c=>c.rule===rule),'Missing '+rule.name);check(itemLinks().some(l=>l.source===j.id&&l.target===i.id&&l.label.startsWith(rule.name)), 'Missing displayed link '+rule.name);
 if(rule.stat==='primary')check(enchantPrimary(i,100)===110,'Primary '+rule.name);
 if(rule.stat==='rate')check(Math.abs(cooldown(i)-4/1.08)<1e-8,'Recharge '+rule.name);
 if(rule.stat==='block'){activate(i);check(s.block===2,'Block '+rule.name)}
 if(rule.stat==='mana'){activate(i);check(s.mana===50,'Mana cap '+rule.name);s.mana=0;defs.mana.amount=1;i.used=false;activate(i);check(s.mana===2,'Extra mana '+rule.name);defs.mana.amount=100}
 if(rule.stat==='status'){defs.poison.amount=1;activate(i);check(s.enemy.poison===2,'Extra affliction');defs.poison.amount=100;s.enemy.poison=0}
 j.x=1;j.y=1;check(!adjacencyConnections(i).some(c=>c.rule===rule),'Diagonal counted '+rule.name);j.x=4;check(!adjacencyConnections(i).some(c=>c.rule===rule),'Distance counted '+rule.name);s.items=[i];s.stash=[j];check(!adjacencyConnections(i).length,'Stash provided adjacency');
}
let i=pack('weapon',2,2);s.items=[i,pack('ring',1,2),pack('ring',3,2),pack('ring',2,1)];check(adjacencyStat(i,'primary')===.2,'Neighbor cap');defs.weapon.once=true;check(Math.abs(adjacencyPrimary(i,100)-135)<1e-9,'Combined cap');defs.weapon.once=false;
// Multi-cell edge counts each neighbor once, independent of quantity.
defs.potion.w=2;i=pack('heal',0,0);let j=pack('armor',1,0);defs.armor.h=2;defs.heal.h=2;s.items=[i,j];check(adjacencyStat(i,'primary')===.1,'Multi-cell edge double counted');defs.heal.h=defs.armor.h=defs.potion.w=1;
// Twelve copies form 5/5/2, combining across acquisition routes without losing extras.
s.phase='prep';s.items=[];s.stash=[];for(let n=0;n<12;n++)receiveItem(makeItem('potion'));check(s.stash.map(stackCount).join() === '5,5,2','Automatic overflow');
i=s.stash.shift();Object.assign(i,{x:0,y:0});s.items=[i];let partial=s.stash[1];selected=i.id;splitSelectedStack();check(stackCount(i)===4&&stackCount(findSelected())===1,'Split one');const copy=findSelected();check(mergeStacks(copy,i)&&stackCount(i)===5&&!s.stash.includes(copy),'Recombine');
i.quantity=4;partial.quantity=2;check(mergeStacks(partial,i)&&stackCount(i)===5&&stackCount(partial)===1,'Partial merge loss');check(!mergeStacks(partial,i),'Merged into full stack');
const different=makeItem('potion');different.eventHaste=.1;check(!mergeStacks(different,i),'Different upgrades merged');fixture('variant','consumable','heal',true);check(!stackCompatible(makeItem('variant'),i),'Variant merged');check(!stackCompatible(makeItem('weapon'),makeItem('weapon')),'Gear stacked');
s.phase='fight';check(!mergeStacks(partial,i),'Combat merge');selected=i.id;const count=stackCount(i);splitSelectedStack();check(stackCount(i)===count,'Combat split');
// All copies spend separate activations, and cooldown resets after every use.
s.items=[i];i.quantity=5;i.usesSpent=0;i.used=false;i.activations=0;s.hp=0;s.max=10000;for(let n=0;n<5;n++){i.charge=4;check(activate(i),'Activation '+n);check(i.charge===0&&stackRemaining(i)===4-n,'Use accounting '+n)}check(!activate(i)&&i.used,'Sixth use');refillStackUse(i);check(stackRemaining(i)===1&&activate(i)&&i.used,'Refill one only');
setEnemy();check(stackRemaining(i)===5&&!i.used&&i.activations===0,'Battle reset');s.phase='prep';save();const data=JSON.parse(localStorage.getItem('realmpack-v4'));check(data.s.items[0].quantity===5,'Saved quantity');delete i.quantity;check(stackCount(i)===1,'Legacy count');
// Signature consumables use the same charge limit.
defs.potion.mechanic={key:'purify',n:1,title:'Test',text:'Test'};i.quantity=2;i.usesSpent=0;i.used=false;s.phase='fight';check(activate(i)&&activate(i)&&!activate(i),'Signature stack limit');
// Placement merges matching stacks before collision checks.
s.phase='prep';i.quantity=3;i.usesSpent=0;s.items=[i];const incoming=makeItem('potion');s.stash=[incoming];inventoryPick(incoming);check(inventoryCommit(incoming,{x:i.x,y:i.y,rot:false})&&stackCount(i)===4&&!s.stash.length,'Drop merge');
return 'PASS: all 10 adjacency rules, combat values and displayed links, edge geometry, caps, stack overflow/merge/split, variant safety, battle locks, activation budgets, cooldown reset, refill, battle refresh, legacy saves and placement';
})()`,ctx));
