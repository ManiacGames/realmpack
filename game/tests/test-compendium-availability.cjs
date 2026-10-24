'use strict';
const assert=require('node:assert/strict'),{ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)};
 freshRun('knight',true);selectPortal(s.portalChoices[0]);
 const available=catalogueMatches();check(available.length>0&&available.every(d=>!itemUnobtainable(d)),'Default includes unavailable gear');
 catalogueFilter('availability','unobtainable');const retired=catalogueMatches();
 check(retired.length===193&&retired.filter(d=>d.swordHelper).length===8&&retired.every(itemUnobtainable),'Unavailable pool missing retired consumables, daggers or internal sword helpers');
 catalogueFilter('availability','all');const all=catalogueMatches();check(all.length===DATA.items.length&&all.length===available.length+retired.length,'All items not a complete partition');
 catalogueState.page=9;catalogueFilter('availability','unobtainable');check(catalogueState.page===0,'Availability change retains stale page');
 catalogueFilter('group','consumable');check(catalogueMatches().length===168,'Type filter does not combine with availability');
 catalogueFilter('search','Potion of Health');check(catalogueMatches().length===6,'Removed health bundles cannot be searched');
 resetReferenceFilters('catalogue');check(catalogueState.availability==='obtainable'&&catalogueState.search===''&&catalogueState.group==='','Reset does not restore default');
 const legacy=DATA.items.filter(d=>d.legacyUnavailable);check(legacy.length===13&&legacy.every(d=>d.lootExcluded&&retired.includes(d)),'Legacy versions not all excluded');
 check(legacy.some(d=>d.name==='Staff of Esben Legacy'),'Suffix Legacy version missed');check(!itemUnobtainable(DATA.items.find(d=>d.name==="Legacy's Pendant")),'Possessive Pendant excluded');
 for(const kind of new Set(legacy.map(d=>d.kind)))check(specialistItems(kind).every(d=>!d.legacyUnavailable),'Specialist offers Legacy '+kind);
 for(let n=0;n<200;n++){for(const q of [0,1,2,3])check(!defs[eventOffer(q)].legacyUnavailable,'Event grants Legacy');check(rollLoot(3).every(id=>!defs[id].legacyUnavailable),'Loot grants Legacy')}
 // Existing possessions survive migration; pending offers do not grant new copies.
 for(const d of legacy){freshRun('knight',true);selectPortal(s.portalChoices[0]);const owned=makeItem(d.id);owned.eventHaste=.1;owned.eventInfusion=.15;s.stash=[owned];stock=[d.id];reward=[d.id];s.activeEvent={id:'wishingwell',depth:s.room,offers:{wish:d.id}};const before=JSON.stringify(owned);migrateDaggerItems();migrateConsumables();check(s.stash.includes(owned)&&JSON.stringify(owned)===before,'Owned Legacy modified '+d.name);check(!stock.includes(d.id)&&!reward.includes(d.id)&&!defs[s.activeEvent.offers.wish].lootExcluded,'Saved Legacy offers survive '+d.name);check(defs[s.activeEvent.offers.wish].quality===d.quality,'Saved event rarity changed');check(tradeInventory().includes(owned),'Owned Legacy cannot be traded');const clone={id:'copy',effects:[['clone',0]]};check(eventStashReason(clone,owned).includes('unavailable'),'Legacy clone allowed');const stale={id:'wish',effects:[['loot',3]]};s.activeEvent.offers.wish=d.id;check(eventStashReason(stale).includes('unavailable'),'Stale Legacy offer allowed');s.phase='prep';const inventory=JSON.stringify([s.items,s.stash]);addSandbox(d.id);check(inventory===JSON.stringify([s.items,s.stash]),'Sandbox grants Legacy');s.items=[Object.assign(owned,{x:0,y:0})];s.stash=[];s.phase='prep';setEnemy();s.phase='fight';s.mana=50;s.enemy.hp=s.enemy.max=100000;check(passiveRing(d)||activate(owned),'Owned Legacy cannot activate '+d.name)}
 freshRun('knight',true);selectPortal(s.portalChoices[0]);resetReferenceFilters('catalogue');
 const d=retired.find(d=>d.catalogueHidden);let captured=null;modal=(...args)=>captured=args;
 inspectCatalogueItem(d.id);check(captured&&captured[3]==='catalogueinspect'&&captured[2].includes('Cannot be obtained during gameplay'),'Retired item inspection missing warning');
 const item=makeItem(d.id);s.stash=[item];check(itemInspectionMarkup(item).includes('Cannot be obtained during gameplay'),'Saved legacy copy missing warning');
 const before=JSON.stringify(s);addSandbox(d.id);addSandbox('missing-item');check(JSON.stringify(s)===before,'Unavailable/invalid sandbox acquisition changed inventory');
 check(itemAvailabilityNote(available[0])==='','Available gear mislabeled');
 return {obtainable:available.length,unobtainable:retired.length,total:all.length,checks:'availability partition, 13 Legacy versions, Pendant exception, loot/event/shop/Sandbox guards, saved offer migration/rarity, owned copies/trading, clone/stale offers and inspection'};
})()`,ctx));
