'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..');let saveReads=0,saveWrites=0,timerCount=0;
const ctx={window:{__TEST__:true},console,Date,setInterval(){timerCount++;return timerCount},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{getItem(key){if(key==='realmpack-v4')saveReads++;return null},setItem(key){if(key==='realmpack-v4')saveWrites++}}};
vm.createContext(ctx);for(const file of JSON.parse(fs.readFileSync(path.join(root,'phaser/core-files.json'))))vm.runInContext(fs.readFileSync(path.join(root,'game',file),'utf8'),ctx,{filename:file});vm.runInContext(fs.readFileSync(path.join(root,'phaser/src/model.js'),'utf8'),ctx);
const run=code=>vm.runInContext(code,ctx);
run(`RealmModel.reset('knight','dungeon_0')`);assert.equal(run('s.phase'),'prep');assert.equal(run('ROOMS[0].dungeonId'),'dungeon_0');
for(const id of run('Object.keys(classes)')){run(`RealmModel.reset(${JSON.stringify(id)},'dungeon_0')`);assert(run('s.items.length>0'));assert(run('s.items.every(i=>fits(i,i.x,i.y))'))}
for(const id of run('Object.keys(dungeonDefs)')){run(`RealmModel.reset('knight',${JSON.stringify(id)})`);assert.equal(run('ROOMS[0].dungeonId'),id);assert(run('s.enemy.hp>0'))}
run(`RealmModel.reset('knight','dungeon_0');globalThis.weapon=s.items[0].id`);
assert(run('RealmModel.stash(weapon)'));assert(run('s.stash.some(i=>i.id===weapon)'));assert.equal(run('RealmModel.stash(weapon)'),false);
assert(run('RealmModel.move(weapon,0,0)'));assert.equal(run('RealmModel.move(weapon,-1,0)'),false);assert.equal(run('RealmModel.move(weapon,1,0)'),false);
assert(run('RealmModel.inspect(weapon).title.length>0'));assert(run('RealmModel.links().every(l=>s.items.some(i=>i.id===l.source)&&s.items.some(i=>i.id===l.target))'));
run(`s.stash=Array.from({length:9},()=>makeItem(DATA.byName['Ring of Magic']))`);assert.equal(run('RealmModel.stash(weapon)'),false);assert.equal(run('s.stash.length'),9);
run(`s.stash=[];s.items=[];globalThis.pot=makeItem(DATA.byName['Health Potion']);pot.quantity=3;autoPlace(pot);globalThis.other=makeItem(pot.type);other.quantity=4;s.stash=[other]`);assert(run('RealmModel.move(other.id,0,0)'));assert.equal(run('stackCount(pot)'),5);assert.equal(run('stackCount(other)'),2);
run(`RealmModel.reset('knight','dungeon_0');globalThis.beforeStart=JSON.stringify(s);RealmModel.start()`);assert.equal(run('s.phase'),'fight');assert.equal(run('timer'),null);
assert.equal(run('RealmModel.move(s.items[0].id,0,4)'),false);assert.equal(run('RealmModel.stash(s.items[0].id)'),false);assert.equal(run('RealmModel.discard(s.items[0].id)'),false);assert.equal(run('RealmModel.retry()'),false);
run('RealmModel.paused=true');const paused=run('RealmModel.snapshot()');run('RealmModel.step(.2)');assert.equal(run('RealmModel.snapshot()'),paused);run('RealmModel.paused=false');
for(const rate of [1,2,4]){
 run(`RealmModel.reset('knight','dungeon_0');RealmModel.start();s.seed=123456;s.enemy.hp=s.enemy.max=100000;s.hp=s.max=100000;RealmModel.speed=${rate};globalThis.base=JSON.stringify(s);globalThis.baseUid=uid;globalThis.baseReward=reward.slice();globalThis.baseStock=stock.slice();RealmModel.accumulator=0`);
 run(`for(let n=0;n<100;n++)RealmModel.step(.05)`);const adapter=run('RealmModel.snapshot()');
 run(`s=JSON.parse(base);ROOMS=s.route;uid=baseUid;reward=baseReward.slice();stock=baseStock.slice();for(let n=0;n<100;n++)tick(.05*${rate})`);assert.equal(run('RealmModel.snapshot()'),adapter,`Combat parity ${rate}x`);
}
run(`RealmModel.reset('knight','dungeon_0');RealmModel.start();s.enemy.hp=0;finishBattle(true)`);assert.equal(run('s.phase'),'reward');assert(run('RealmModel.rewards.length===3'));run('s.stash=[]');assert(run('RealmModel.loot(reward[0])'));assert.equal(run('s.phase'),'prep');assert(run('s.stash.length===1'));assert.equal(run('s.hp'),run('s.max'));
run(`RealmModel.start();s.hp=0;finishBattle(false)`);assert.equal(run('s.phase'),'lost');assert(run('RealmModel.retry()'));assert.equal(run('s.phase'),'prep');
assert.equal(saveReads,0,'Must not read production saves');assert.equal(saveWrites,0,'Must not write production saves');assert(timerCount>0);
console.log('PASS: all 19 classes / 35 dungeons, shared collision and stack rules, stash capacity, battle locks, loot/retry, seeded simulation parity at 1x/2x/4x, and zero production save access');
