'use strict';
const {ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)};
function setup(name){freshRun('wizard',true);s.seed=123456;s.portalChoices=[ENCOUNTERS.dungeons[0].id];selectPortal(s.portalChoices[0]);const d=DATA.items.find(d=>d.name===name&&!d.isShiny);check(d,'Missing '+name);const i=Object.assign(makeItem(d.id),{x:0,y:0});s.items=[i];s.stash=[];setEnemy();s.phase='fight';s.enemy.hp=s.enemy.max=100000;s.enemy.ward=0;s.enemy.vulnerable=0;s.enemy.damage=0;s.enemy.cd=10000;s.mana=0;s.max=s.hp=100;s.block=0;s.venom=3;s.slow=3;s.gold=100;i.activations=3;return i}
let i=setup('Groovy Mango');vanityAfterActivation(i);check(s.venom===2,'Mango cleanse');i=setup('Mister Mango');vanityAfterActivation(i);check(s.mana===1,'Mango mana');s.mana=2;vanityAfterActivation(i);check(s.mana===2,'Mana threshold');
i=setup('Butter Bow');i.activations=4;vanityAfterActivation(i);check(s.enemy.chill===1,'Butter chill');
i=setup('Brilliance Bow');s.enemy.ward=3;s.enemy.vulnerable=4;const hp=s.enemy.hp;vanityAfterActivation(i);check(s.enemy.ward===0&&s.enemy.hp===hp,'Ward bonus leaked into health');
i=setup('Baked Bow');vanityAfterActivation(i);check(s.enemy.hp===100000,'Cold toast');s.enemy.burn=1;vanityAfterActivation(i);check(s.enemy.hp===99994,'Toast bonus');
i=setup('Useless Katana');i.activations=4;s.enemy.hp=11;vanityAfterActivation(i);check(s.enemy.hp===11,'Finisher threshold');s.enemy.hp=10;vanityAfterActivation(i);check(s.enemy.hp===3,'Finisher');
i=setup('Luxurious Leather');vanityAfterActivation(i);check(s.block===5,'Dress code');const w=Object.assign(makeItem(classes.wizard.startingIds[0]),{x:1,y:0});s.items.push(w);s.block=0;vanityAfterActivation(i);check(s.block===0,'Touching weapon bypass');
i=setup('Mirror Cloak');s.dodge=2;vanityAfterActivation(i);check(s.block===0,'Mirror threshold');s.dodge=3;vanityAfterActivation(i);check(s.block===4,'Mirror full dodge');
i=setup('Regal Ring');vanityAfterActivation(i);check(s.block===2&&s.gold===100,'Royal allowance spends gold');i=setup('Omni-Impotence Ring');check(ringCanActivate(i),'Novelty passive never cycles');vanityAfterActivation(i);check(s.block===2,'Nothing to lose');
for(const name of Object.keys(VANITY_QUIRKS)){i=setup(name);check(describe(defs[i.type]).includes(VANITY_QUIRKS[name][1]),'Missing rule '+name);i.activations=1;const before=JSON.stringify({mana:s.mana,block:s.block,hp:s.enemy.hp,venom:s.venom,slow:s.slow});vanityAfterActivation(i);check(before===JSON.stringify({mana:s.mana,block:s.block,hp:s.enemy.hp,venom:s.venom,slow:s.slow}),'Early proc '+name);i.activations=3;s.phase='prep';vanityAfterActivation(i);check(s.block===0,'Prep proc '+name);s.phase='fight';s.items=[];vanityAfterActivation(i);check(s.block===0,'Stash proc '+name)}
let scenarios=0;for(const name of Object.keys(VANITY_QUIRKS)){const results=[];for(const speed of[1,2,4]){i=setup(name);i.activations=0;s.enemy.burn=5;for(let n=0;n<400/speed;n++)tick(.05*speed);results.push(JSON.stringify([i.activations,s.mana,s.block,s.enemy.hp,s.venom,+s.slow.toFixed(4)]));scenarios++}check(new Set(results).size===1,'Playback drift '+name)}
return {quirks:Object.keys(VANITY_QUIRKS).length,combatScenarios:scenarios,checks:'conditions, caps, ward-only damage, mana threshold, no early/prep/stash procs, descriptions, speed parity'};
})()`,ctx));
