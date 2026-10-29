'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'../..'),slots={'realmpack-v4':'production-save-sentinel'};let productionReads=0,productionWrites=0;
const ctx={window:{__TEST__:true},Date,console,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{getItem(key){if(key==='realmpack-v4')productionReads++;return slots[key]||null},setItem(key,value){if(key==='realmpack-v4')productionWrites++;slots[key]=value}}};vm.createContext(ctx);
for(const file of JSON.parse(fs.readFileSync(path.join(root,'phaser/core-files.json'))))vm.runInContext(fs.readFileSync(path.join(root,'game',file),'utf8'),ctx,{filename:file});vm.runInContext(fs.readFileSync(path.join(root,'phaser/src/model.js'),'utf8'),ctx);
const run=code=>vm.runInContext(code,ctx);
run("RealmModel.campaign('knight')");assert.equal(run('s.phase'),'portal');assert(slots['realmpack-phaser-v1']);assert.equal(slots['realmpack-v4'],'production-save-sentinel');
run('selectPortal(s.portalChoices[0])');const depth=run('s.room'),gold=run('s.gold');run('RealmModel.start();s.enemy.hp=0;finishBattle(true)');assert.equal(run('s.phase'),'reward');assert.equal(run('s.room'),depth);assert(run('s.gold')>gold);assert(run('s.pendingSupplies.length===2'));const stashBefore=run('s.stash.length');run('takeLoot(null)');assert.equal(run('s.phase'),'reward');assert.equal(run('s.stash.length'),stashBefore,'Supplies must not auto-loot');run('claimSupply(s.pendingSupplies[0].id);leaveSupplies()');assert.equal(run('s.phase'),'path');
const savedPaths=run('JSON.stringify(s.pathChoices)'),saved=slots['realmpack-phaser-v1'];run('s.hp=1');assert(run('RealmModel.load()'));assert.equal(run('JSON.stringify(s.pathChoices)'),savedPaths);assert.equal(JSON.parse(saved).run.s.hp,run('s.hp'));
// Run progression uses scripted victories to exercise every transition, not balance.
run("RealmModel.campaign('knight')");let steps=0,shops=0,events=0;
while(run('s.phase')!=='won'&&steps++<350){
 const phase=run('s.phase');switch(phase){
 case'portal':run('selectPortal(s.portalChoices[0])');break;
 case'path':run('selectPath(s.pathChoices.findIndex((r,n)=>mapChoiceAvailable(s.room,n)))');break;
 case'prep':run('RealmModel.start()');break;
 case'fight':run('s.enemy.hp=0;finishBattle(true)');break;
 case'reward':run('if(!s.lootChoiceDone)takeLoot(null);else leaveSupplies()');break;
 case'boon':run("takeBoon('life')");break;
 case'shop':shops++;run('refreshShop()');const after=run('JSON.stringify({stock,gold:s.gold})');run('refreshShop()');assert.equal(run('JSON.stringify({stock,gold:s.gold})'),after,'Only one refresh');run('leaveShop()');break;
 case'rest':run("resolveRest('heal')");break;
 case'event':events++;run("resolveEvent('leave')");break;
 case'eventResult':run('continueEvent()');break;
 default:throw Error('Unexpected phase '+phase);
 }}
assert.equal(run('s.phase'),'won');assert.equal(run('s.dungeons.length'),5);assert.equal(run('s.room'),39);assert.equal(run('s.bosses'),5);assert.equal(run('s.boons.length'),5);assert(events>0);assert(run('s.history.length>10'));
// Merchant, sacrifice and paid enchant operations still use original services.
run("RealmModel.campaign('knight');selectPortal(s.portalChoices[0]);ROOMS[s.room].type='event';ROOMS[s.room].eventId='enchanter';s.activeEvent=null;enterEvent();globalThis.gear=s.items[0];globalThis.color=enchantDustColor(gear)");assert(run("enchantService('reroll',gear.id,-1,s.activeEvent.enchantRevision)"));const pending=run('JSON.stringify(s.activeEvent.pendingEnchant)'),dust=run('enchantDustBank()[color]');assert(run('RealmModel.load()'));assert.equal(run('JSON.stringify(s.activeEvent.pendingEnchant)'),pending);assert.equal(run('enchantDustBank()[color]'),dust);assert.equal(run('RealmModel.canEdit'),false);run('decideEnchant(true,s.activeEvent.enchantRevision)');assert(run('itemEnchants(s.items[0]).length>0'));
run("s.activeEvent=null;ROOMS[s.room].eventId='merchant';enterEvent();s.stash.push(makeItem(DATA.byName['Ring of Magic']));ensureMerchantState();chooseMerchantItem(s.stash[0].id);globalThis.beforeGold=s.gold");assert(run('sellEventItem(s.activeEvent.merchantItem,1,s.activeEvent.tradeRevision)'));assert(run('s.gold>beforeGold'));
// Inventory editing during a shop/event must persist the true phase, not prep.
const priorPhase=run('s.phase'),item=run('s.items[0].id');assert(run(`RealmModel.stash(${item})`));assert.equal(run('s.phase'),priorPhase);assert.equal(JSON.parse(slots['realmpack-phaser-v1']).run.s.phase,priorPhase);
const before=run('RealmModel.snapshot()');assert.equal(run("RealmModel.load({run:{s:{version:4}}})"),false);assert.equal(run('RealmModel.snapshot()'),before);
assert.equal(productionReads,0);assert.equal(productionWrites,0);console.log('PASS: complete five-dungeon progression, connected routes, supplies, boss blessings, single shop refresh, paid enchant/save recovery, merchant sales, noncombat inventory saves and production save isolation');
