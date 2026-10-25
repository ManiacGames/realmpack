'use strict';
const {ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};
function setup(){freshRun('wizard',true);s.seed=123456;selectPortal(s.portalChoices[0]);s.phase='prep';s.items=[];s.stash=[];ROOMS[s.room]={...ROOMS[s.room],type:'combat',hp:10000000,damage:0,cd:10000000,waves:1};}
setup();const weapon=makeItem(classes.wizard.startingIds[0]);autoPlace(weapon);s.mana=49;let expected=eventOpeningMana();startFight();check(s.mana===10&&s.mana===expected,'Full pool carried over');s.phase='prep';s.mana=0;startFight();check(s.mana===10,'Empty pool penalized next fight');
check(battleManaReserve(50)===10&&battleManaReserve(55)===11&&battleManaReserve(100)===20&&battleManaReserve(500)===20&&battleManaReserve(8)===8,'Reserve capacity bounds');
setup();autoPlace(makeItem(classes.wizard.startingIds[0]));autoPlace(makeItem(DATA.byName['Ring of Magic']));expected=eventOpeningMana();startFight();check(s.mana===12&&s.mana===expected,'Magic ring opening scaling');
setup();autoPlace(makeItem(classes.wizard.startingIds[0]));const buff=makeItem(DATA.byName['Effusion of Mana']);autoPlace(buff);s.eventBuffs={mana:8};expected=eventOpeningMana();startFight();check(s.mana===23&&s.mana===expected&&s.consumableBattle.tempMana===25,'Opening buff/capacity preview mismatch');
setup();autoPlace(makeItem(classes.wizard.startingIds[0]));const gear=s.items[0];gear.enchantments=[{key:'reservoir',value:4,rank:1}];s.eventBuffs={mana:8};expected=eventOpeningMana();startFight();check(s.mana===expected&&s.mana===22,'Reservoir/event startup lost');
s.phase='prep';s.eventBuffs={mana:8};autoPlace(makeItem(DATA.byName['Effusion of Wisdom']));expected=eventOpeningMana();startFight();check(s.mana===24&&s.mana===expected,'Wisdom reservoir preview mismatch');
// No generation gear: half a mana per simulated second; silences and suppressing wands still gate it.
s.items=[];s.mana=0;tick(1.05);check(s.mana===.5,'Universal regen not halved');s.silence=3;tick(1);check(s.mana===.5,'Silence bypassed');s.silence=0;const suppress=wandManaSuppressed;wandManaSuppressed=()=>true;tick(1);check(s.mana===.5,'Wand suppression bypassed');wandManaSuppressed=suppress;
s.consumableBattle=null;const potion=makeItem(DATA.byName['Magic Potion']);potion.quantity=3;const spell=makeItem(classes.wizard.startingIds[1]);s.items=[potion,spell];s.mana=0;s.silence=0;spell.charge=0;
check(!activate(potion)&&!potion.usesSpent,'Potion refilled without ready caster');spell.charge=cooldown(spell);s.mana=2;check(!activate(potion),'Potion fired with affordable spell');s.mana=1;const before=stackRemaining(potion);check(activate(potion)&&s.mana===7&&stackRemaining(potion)===before-1,'Potion failed at genuine shortage');check(!activate(potion),'Second copy wasted after refill');
s.mana=0;s.silence=2;check(!activate(potion),'Potion wasted during silence');s.silence=0;spell.used=true;check(!activate(potion),'Used spell triggered potion');spell.used=false;
spell.enchantments=[{key:'insight',value:.5,rank:1}];s.mana=itemManaCost(defs[spell.type],spell);check(!activate(potion),'Discounted affordable spell triggered refill');s.mana=0;spell.charge=0;const paidWeapon=makeItem(weapon.type);defs.testPaidWeapon={...defs[paidWeapon.type],id:'testPaidWeapon',mana:3,mechanic:null};paidWeapon.type='testPaidWeapon';paidWeapon.charge=cooldown(paidWeapon);s.items=[potion,paidWeapon];check(activate(potion),'Mana-costing weapon not recognized');
// A potion after its caster in pack order unblocks it on the following simulation step.
potion.used=false;potion.usesSpent=0;potion.charge=cooldown(potion);spell.used=false;spell.charge=cooldown(spell);s.items=[spell,potion];s.mana=0;s.time=0;const casts=spell.activations;tick(.1);check(spell.activations===casts+1&&potion.activations>0,'Live tick did not resolve shortage');
check(describe(defs[potion.type]).includes('ready equipment'),'Potion inspection missing activation condition');
// Starting a wave is not starting a new battle.
s.mana=3;setupWave();check(s.mana===3,'Wave transition reset mana');
return 'PASS: mana carryover reset, reserve bounds/capacity/rings, temporary buffs, event/reservoir previews, regen/silence/suppression, potion shortage/cost/weapon/order gates and wave continuity';
})()`,ctx));
