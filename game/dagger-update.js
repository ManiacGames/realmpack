/* The Dagger Update: explicit user-authored recipes; see docs/dagger-update.md. */
'use strict';
(()=>{
 const data=window.REALM_DATA,items=data.items,original=new Map(items.map(d=>[d.id,{...d}])),names=[];
 const find=name=>items.find(d=>!d.isShiny&&d.name===name),snap=name=>original.get(find(name)?.id);
 const tier=n=>original.get(items.find(d=>!d.isShiny&&d.kind==='dagger'&&d.tier==='T'+n).id);
 function tune(name,stats={},rules={},text=''){
  names.push(name);for(const d of items.filter(d=>!d.isShiny&&d.name===name)){
   const base=stats.ref?typeof stats.ref==='number'?tier(stats.ref):snap(stats.ref):original.get(d.id);
   for(const key of ['effect','amount','cd','mana','price'])d[key]=base[key];
   d.affix=null;d.affixAmount=0;d.condition='none';d.bonus=0;
   for(const key of ['effect','amount','cd','price'])if(stats[key]!==undefined)d[key]=stats[key];
   d.realmIdentity=true;d.daggerUpdate=true;d.mechanic={key:'dagger',title:rules.title||'Dagger specialty',text,n:0,keepAffix:false,keepCondition:false,...rules};
   d.balanceNote='The Dagger Update: explicit recipe and per-battle effects.';
  }
 }
 tune('An Icicle',{}, {status:'chill',duration:.5},'Apply 0.5s chill on every use.');
 for(const name of ['Ashen Talon',"Queen's Stinger"])tune(name,{}, {pierce:.5},'50% of each attack bypasses enemy ward (block).');
 tune("Archangel's Judgement",{amount:4},{shots:3,perShot:true},'Fire three shots for 4 base damage each (12 total). Flat power and activation procs apply once per volley.');
 tune('Blade of Fates',{amount:Math.round(snap('Blade of Fates').amount*1.85),cd:snap('Blade of Fates').cd*2},{},'Double the former cooldown; +85% former hit damage, rounded to an integer.');
 tune('Bone Dagger',{amount:10},{bleed:1},'Apply 1 bleed per use.');
 tune('Boomerang Blades',{amount:snap('Boomerang Blades').amount*2,cd:snap('Boomerang Blades').cd*2},{},'Double former damage and cooldown.');
 tune("Bounty Hunter's Dagger",{amount:2},{shots:3,perShot:true},'Fire three shots for 2 base damage each (6 total). Flat power applies once per volley.');
 tune('Chain Dagger',{amount:10},{bleed:2,bleedCeiling:6},'Apply 2 bleed per use, building enemy bleed only up to 6 stacks. Never reduces higher bleed from other items.');
 tune('Chicken Leg of Doom',{amount:1},{killMax:5},'Gain 5 maximum health per defeated enemy wave while packed. Does not heal. Each packed copy contributes once per defeated wave; persists for the run.');
 tune('Corruption Cutter',{amount:6},{shots:2},'Two weaving cuts share 6 total base damage. Keeps its fast crossing-cut cadence.');
 tune('Crescent Dagger',{ref:13},{},'A T13 dagger reskin: identical damage and base cooldown.');
 tune('Dagger of Eternal Chaos',{ref:12},{afterUses:5,afterBonus:2},'After five uses, gain +2 primary damage starting with use six. This bonus does not grow further and resets each battle.');
 tune('Dagger of the Amethyst Prism',{ref:12,price:tier(12).price*10},{merchantValue:Math.floor(tier(12).price*.4)*10},'T12 damage/cooldown. Sells for exactly 10× the ordinary T12 dagger merchant offer; purchase price is also 10× T12.');
 tune('Dagger of the Hasteful Rabbit',{ref:12},{localHaste:.5},'Each use grants adjacent items 0.5s of haste (+25% recharge). Shared edges only; excludes self and does not stack.');
 tune('Dagger of the Terrible Talon',{ref:11},{bonusEvery:5,bonusHit:5},'Every fifth use deals one additional 5-damage hit. Counter resets each battle.');
 tune('Dirk of Cronus',{}, {extraMana:1},'Gain 1 mana on every use, replacing the former every-fourth-use mana proc.');
 tune('Dual Pops',{ref:'Moonstone Blades'},{},'Same damage and cooldown as T13 Moonstone Blades.');
 tune('Dueling Daggers',{amount:6,cd:snap('Corruption Cutter').cd},{shots:2,summonEvery:5,summonPower:1,summonDuration:6},'Two weaving cuts share 6 total damage. Every fifth use summons a 1-damage companion for 6s (existing eight-summon cap).');
 tune('Evergreen Dagger',{cd:3},{rampStep:.5,rampFloor:.8},'Starts at 3s cooldown; each use reduces its base cooldown by 0.5s, to a final minimum of 0.8s even with haste/upgrades. Resets each battle.');
 tune('Fractal Blades',{}, {shots:2,perShot:true,missChance:.5},'Fire two full-damage shots; each independently has a 50% chance to miss. Flat power is split across the two shots.');
 tune('Groovy Mango',{amount:9},{hasteRate:.5},'Haste grants this item +50% recharge instead of +25%. Does not stack with class haste.');
 tune('Hatchling Blades',{ref:'Boomerang Blades',amount:snap('Boomerang Blades').amount*2,cd:snap('Boomerang Blades').cd*2},{},'Same damage and cooldown as the updated Boomerang Blades.');
 for(const [name,ref] of [['Heart Jewel Blades','Occult Blades'],['Heartfind Dagger',11]])tune(name,{ref},{invulnEvery:10,invulnDuration:1},'Every tenth use grants 1s immunity to direct enemy attacks. Damage-over-time still applies. Multiple copies refresh rather than add duration.');
 const disabled=["Hero's Blades","Hero's Dagger",'Legacy Etherite Dagger','Venerable Spirit Dagger'];
 for(const name of disabled){names.push(name);for(const d of items.filter(d=>d.name===name)){d.lootExcluded=true;d.daggerUnavailable=true;d.balanceNote='Temporarily unobtainable; existing saved copies remain usable.'}}
 tune('Legion Elite Dagger',{ref:13},{critChance:.05},'Each shot has a 5% chance to deal double damage.');
 tune('Marionette Ravager',{}, {status:'vulnerable',duration:.5},'Expose the enemy for 0.5s on each use.');
 tune('Mischief',{amount:15},{},'15 base damage per use.');
 tune('Mister Mango',{amount:10},{hasteRate:.5},'Haste grants this item +50% recharge instead of +25%.');
 tune('Needlessly Large Spoon',{}, {extraMana:1,extraHeal:1},'Each use restores 1 health and 1 mana. Healing fatigue applies.');
 tune('Neo Corrosion Cutter',{amount:13},{poison:1},'13 base damage and 1 poison per use, preserving its poison effect.');
 tune('Neo Dueling Daggers',{amount:6,cd:snap('Corruption Cutter').cd},{shots:2,summonEvery:5,summonPower:3,summonDuration:6},'Two weaving cuts share 6 total damage. Every fifth use summons a 3-damage companion for 6s.');
 tune('Phantasm Dirk',{ref:'Dirk of Cronus'},{extraHeal:1},'Cronus damage/cooldown; heal 1 per use instead of generating mana.');
 tune('Phantom Sickle',{amount:30,cd:2.5},{},'30 base damage every 2.5s.');
 tune("Pirate's Sidearms",{amount:12},{partnerNames:['Sunken Fire Opal Ring','Faded Heart Scarab','Fractured Hannya']},'Double primary damage while any listed partner ring is packed: Sunken Fire Opal Ring, Faded Heart Scarab or Fractured Hannya. Duplicates and multiple partners do not stack; stash does not count.');
 const fang=items.find(d=>!d.isShiny&&d.name==='Poison Fang Dagger'&&d.shinyIds?.length);
 const removed=items.find(d=>!d.isShiny&&d.name==='Poison Fang Dagger'&&!d.shinyIds?.length);
 names.push('Poison Fang Dagger');removed.lootExcluded=true;removed.daggerUnavailable=true;removed.catalogueHidden=true;removed.daggerReplacement=fang.id;data.byName['Poison Fang Dagger']=fang.id;
 tune('Prismatic Slasher',{amount:2,cd:.5},{},'2 base damage every 0.5s.');
 tune('Reliable Pugio',{ref:13},{ringBonus:1},'Gain +1 primary damage per adjacent ring item (shared edges).');
 tune('Retrowinds Dagger',{ref:13},{initialEnchants:2},'Starts with two random enchantments: Rare enchantment grade. Initial rolls occur once per item and survive saves.');
 tune('Rosebite Dagger',{ref:13},{noncombatGold:2,noncombatHeal:2},'While packed, receive +2 gold and heal 2 on entering a rest, shop or event room. Once per room; copies do not stack.');
 tune("Seeker's Chisel",{ref:13},{initialEnchants:3},'Starts with three random enchantments: Legendary enchantment grade. Initial rolls occur once per item and survive saves.');
 tune('Spatula Dagger',{ref:11},{},'Same damage and cooldown as T11 dagger.');
 tune('Sunshine Shiv',{}, {dungeonName:'The Shatters',dungeonMultiplier:2},'Double primary damage against every enemy in The Shatters, including waves and bosses.');
 tune('Sweettreats Dagger',{amount:6,cd:snap('Corruption Cutter').cd},{shots:2,extraHeal:1},'Updated Corruption Cutter stats and crossing cuts; heal 1 on every use.');
 tune('Symbiotic Ripper',{ref:11},{bleed:1},'T11 dagger stats plus 1 bleed per use.');
 tune('The Right Hook',{amount:12},{vitalityBonus:1},'Gain +1 primary damage for each packed item whose name contains Vitality. Stashed items do not count.');
 tune('Throwing Knives',{amount:10,cd:1},{},'10 base damage every 1s.');
 tune('Toxic Toad',{effect:'poison',amount:6,cd:2},{},'Apply 6 poison every 2s; no direct damage. Existing poison cap and decay apply.');
 tune('Toxin Tooth',{amount:10},{poison:1},'10 base damage plus 1 poison per use.');
 tune('Toy Knife',{amount:1},{extraBlock:1,extraHeal:1,extraMana:1,extraDodge:1,bleed:1},'Each use: 1 damage, 1 block, 1 healing, 1 mana, 1 dodge charge and 1 bleed. Existing dodge cap/no-consecutive-dodge rule applies.');
 tune('Void Blades',{}, {dungeonName:'The Void',dungeonMultiplier:2},'Double primary damage against every enemy in The Void.');
 const round=n=>Math.round(n*100)/100;
 for(const d of items.filter(d=>d.isShiny)){
  const base=items.find(b=>b.id===d.baseId);if(!base?.daggerUpdate)continue;
  for(const key of ['effect','mana','affix','affixAmount','condition','bonus','realmIdentity','daggerUpdate','balanceNote'])d[key]=base[key];
  d.amount=Math.max(base.amount+1,Math.round(base.amount*1.05));d.cd=round(base.cd*.95);d.price=base.price*3;
  const m=d.mechanic={...base.mechanic};
  for(const key of ['bleed','poison','extraMana','extraHeal','extraBlock','bonusHit','summonPower','ringBonus','vitalityBonus','afterBonus','killMax'])if(m[key])m[key]=Math.ceil(m[key]*1.1);
  for(const key of ['duration','localHaste','invulnDuration'])if(m[key])m[key]=round(m[key]*1.2);
  if(m.bleedCeiling)m.bleedCeiling=8;
  if(m.pierce)m.pierce=Math.min(1,round(m.pierce+.1));if(m.missChance)m.missChance=Math.max(0,m.missChance-.05);if(m.hasteRate)m.hasteRate=.55;
  if(m.rampStep){m.rampStep=.55;m.rampFloor=.72}if(m.merchantValue)m.merchantValue=Math.ceil(m.merchantValue*1.1);
  m.text=daggerRuleText(d);
 }
 for(const d of items.filter(d=>d.daggerUpdate&&!d.isShiny))d.mechanic.text=daggerRuleText(d);
 window.DAGGER_UPDATE={names,disabled,removedFang:removed.id,canonicalFang:fang.id};
 data.stats.realmIdentities=items.filter(d=>d.realmIdentity).length;data.stats.signatureItems=items.filter(d=>d.mechanic).length;data.stats.mechanicTypes=new Set(items.filter(d=>d.mechanic).map(d=>d.mechanic.key)).size;data.stats.uniqueSignatures=new Set(items.map(d=>JSON.stringify([d.kind,d.tier,d.effect,d.amount,d.cd,d.mana,d.affix,d.affixAmount,d.mechanic,d.realmSet]))).size;
})();

function daggerRuleText(d){const m=d.mechanic;if(!d.isShiny)return m.text;const parts=['Shiny: '+d.amount+' base '+d.effect+' · '+d.cd+'s cooldown.'];if(m.perShot)parts.push(m.shots+' shots per use; damage is per shot.');else if(m.shots)parts.push(m.shots+' cuts share the displayed total damage.');if(m.pierce)parts.push(Math.round(m.pierce*100)+'% bypasses ward.');if(m.missChance)parts.push(Math.round(m.missChance*100)+'% independent miss chance per shot.');for(const [key,label] of [['bleed','bleed'],['poison','poison'],['extraMana','mana'],['extraHeal','healing'],['extraBlock','block']])if(m[key])parts.push('+'+m[key]+' '+label+' per use.');if(m.bleedCeiling)parts.push('Can build enemy bleed up to '+m.bleedCeiling+' stacks; never reduces higher bleed from other sources.');if(m.status)parts.push(m.duration+'s '+m.status+' per use.');if(m.summonEvery)parts.push('Every '+m.summonEvery+' uses: '+m.summonPower+'-damage summon for '+m.summonDuration+'s.');if(m.localHaste)parts.push('Adjacent haste for '+m.localHaste+'s; excludes self, no stacking.');if(m.rampStep)parts.push('Base cooldown falls '+m.rampStep+'s per use to a final floor of '+m.rampFloor+'s; resets each battle.');if(m.extraDodge)parts.push('+'+m.extraDodge+' dodge per use.');if(m.bonusEvery)parts.push('Every '+m.bonusEvery+' uses: '+m.bonusHit+' extra damage.');if(m.vitalityBonus)parts.push('+'+m.vitalityBonus+' primary damage per packed Vitality item.');return parts.join(' ')}
function daggerAvailable(type){return !!defs[type]&&!defs[type].daggerUnavailable}
function daggerPrimary(i,amount){const d=defs[i.type],m=d.mechanic;if(m.afterUses&&i.activations>=m.afterUses)amount+=m.afterBonus;if(m.ringBonus)amount+=nearbyItems(i).filter(j=>defs[j.type].group==='ring').length*m.ringBonus;if(m.vitalityBonus)amount+=s.items.filter(j=>/vitality/i.test(defs[j.type].name)).length*m.vitalityBonus;if(m.partnerNames&&s.items.some(j=>m.partnerNames.includes(defs[j.type].name)))amount*=2;if(m.dungeonName&&dungeonDefs[ROOMS[s.room].dungeonId]?.name===m.dungeonName)amount*=m.dungeonMultiplier;if(m.perShot)amount*=m.shots;return amount}
function daggerDamage(i,total){const m=defs[i.type].mechanic,count=m.shots||1,budget=Math.max(0,Math.round(total+s.power));let dealt=0;for(let n=0;n<count;n++){if(m.missChance&&rng()<m.missChance)continue;let part=Math.floor(budget*(n+1)/count)-Math.floor(budget*n/count);if(m.critChance&&rng()<m.critChance)part*=2;const bypass=Math.round(part*(m.pierce||0));if(part-bypass)dealt+=hit(part-bypass);if(bypass){const ward=s.enemy.ward;s.enemy.ward=0;dealt+=hit(bypass);s.enemy.ward=ward}}return dealt}
function daggerAfterActivation(i){const m=defs[i.type].mechanic;if(m.bleed){const amount=m.bleedCeiling?Math.max(0,Math.min(m.bleed,m.bleedCeiling-s.enemy.bleed)):m.bleed;if(amount>0)apply('bleed',amount,i);}if(m.poison)apply('poison',m.poison,i);if(m.extraMana)s.mana=Math.min(manaCapacity(),s.mana+m.extraMana);if(m.extraDodge)s.dodge=Math.min(3,s.dodge+m.extraDodge);if(m.bonusEvery&&i.activations%m.bonusEvery===0)hit(m.bonusHit);if(m.summonEvery&&i.activations%m.summonEvery===0)summon(m.summonPower,m.summonDuration);if(m.invulnEvery&&i.activations%m.invulnEvery===0)s.daggerInvulnerableUntil=Math.max(s.daggerInvulnerableUntil||0,s.time+m.invulnDuration)}
function daggerCooldown(i,base){const m=defs[i.type].mechanic;return m?.rampStep?Math.max(m.rampFloor,base-m.rampStep*i.activations):base}
function daggerHasteRate(i){return itemHasHaste(i)?defs[i.type].mechanic?.hasteRate||.25:0}
function initDaggerEnchantments(i){const wanted=defs[i.type].mechanic?.initialEnchants;if(!wanted||i.daggerInitialEnchants)return i;i.enchantments=itemEnchants(i).map(e=>({...e}));while(i.enchantments.length<wanted)i.enchantments.push(rollEnchantment(i));i.daggerInitialEnchants=true;return i}
function migrateDaggerItems(){for(const i of [...s.items,...s.stash]){if(defs[i.type]?.daggerReplacement)i.type=defs[i.type].daggerReplacement;initDaggerEnchantments(i)}stock=stock.map(t=>defs[t]?.daggerReplacement||t).filter(daggerAvailable);reward=reward.map(t=>defs[t]?.daggerReplacement||t).filter(daggerAvailable)}
function daggerEnemyDefeated(){if(s.phase!=='fight'||s.enemy.hp>0)return;const wave=s.enemy.wave;if((s.daggerRewardedWaves||[]).includes(wave))return;(s.daggerRewardedWaves||(s.daggerRewardedWaves=[])).push(wave);const amount=s.items.reduce((sum,i)=>sum+(defs[i.type].mechanic?.killMax||0),0);if(amount){s.max+=amount;log('✦ Chicken Leg of Doom: +'+amount+' maximum health.')}}
function daggerNoncombatBonus(){if(!s||!['rest','shop','event'].includes(ROOMS[s.room]?.type)||(s.daggerRoseVisits||[]).includes(s.room))return;const item=s.items.find(i=>defs[i.type].mechanic?.noncombatGold);if(!item)return;const m=defs[item.type].mechanic;(s.daggerRoseVisits||(s.daggerRoseVisits=[])).push(s.room);s.gold+=m.noncombatGold;const healed=restore(m.noncombatHeal,false);log('✦ Rosebite: +'+m.noncombatGold+' gold and '+healed+' health.');}
