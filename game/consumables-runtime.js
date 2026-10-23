/* Consumable identities, run upgrades and encounter settlement. Imported IDs remain valid. */
'use strict';
(()=>{
 const data=window.REALM_DATA,statNames=['Attack','Defense','Dexterity','Speed','Vitality','Wisdom','Mana','Life'];
 for(const d of data.items){if(d.group!=='consumable')continue;
  const name=d.name;let p=null;
  if(/^(Greater )?(Health|Magic) Potion$/.test(name)){const greater=name.startsWith('Greater');p={mode:'supply',effect:name.includes('Health')?'heal':'mana',amount:name.includes('Health')?(greater?50:25):(greater?12:6)}}
  const stat=/^(Greater )?Potion of (Attack|Defense|Dexterity|Speed|Vitality|Wisdom|Mana|Life)$/.exec(name);
  if(stat)p={mode:'upgrade',stat:stat[2].toLowerCase(),greater:!!stat[1]};
  const buff=/^(Tincture|Effusion) of (Attack|Defense|Dexterity|Speed|Vitality|Wisdom|Mana|Life)$/.exec(name);
  if(buff)p={mode:'buff',stat:buff[2].toLowerCase(),amount:({attack:[2,5],defense:[2,5],dexterity:[2,4],speed:[.1,.2],vitality:[5,10],wisdom:[1,2],mana:[10,25],life:[25,50]})[buff[2].toLowerCase()][buff[1]==='Effusion'?1:0]};
  if(name==='Ambrosia'||name==='Chalice of Ambrosia')p={mode:'openingHeal',fraction:name==='Ambrosia'?1:.5};
  if(name==='Chaos Cake')p={mode:'chaos'};
  if(name==='Frost Cake')p={mode:'freeze',amount:2};
  if(name==='Enchantment Slot Drop Chance Potion (25%)')p={mode:'slot'};
  if(name==='Loot Drop Potion')p={mode:'lootDrop'};
  if(name==='Loot Tier Potion')p={mode:'lootTier'};
  if(name==='Stat Potion Drop Potion (33%)')p={mode:'statDrop'};
  if(name==='Transformation Potion')p={mode:'transform'};
  if(name==='Stat Potion Choice Chest')p={mode:'chest'};
  d.consumableRework=true;d.consumable=p||{mode:'legacy'};d.balanceNote='Copies are permanently consumed after use.';
  if(!p){d.lootExcluded=true;d.catalogueHidden=true;d.catalogueHiddenReason='Temporarily unobtainable';}
  else{d.lootExcluded=false;d.catalogueHidden=false;delete d.mechanic;d.affix=null;d.bonus=0;d.condition='none';d.mana=0;d.cd=3;d.effect=p.mode==='supply'?p.effect:'consumable';d.amount=p.amount||1;d.price=p.mode==='supply'?(name.startsWith('Greater')?20:10):p.mode==='upgrade'?(p.greater?40:24):p.mode==='buff'?(name.startsWith('Effusion')?38:20):45;}
  if(/^Potion of Health[1-6]$/.test(name))d.consumableReplacement=data.byName['Health Potion'];
  if(/^(Steampunk Epic Quest|Steamworks Compensation|Steamworks Engraving) Chest$/.test(name))d.consumableReplacement=data.byName['Stat Potion Choice Chest'];
 }
 data.consumableStats=statNames;
})();
function consumableProfile(i){const d=defs[i.type];return d?.once&&d.group==='consumable'&&d.consumableRework?d.consumable:undefined}
function consumableBattle(){return s.consumableBattle||(s.consumableBattle={buffs:{},used:{},actions:[],tempHP:0,tempMana:0})}
function consumablePrimary(i,amount){const d=defs[i.type],u=i.potionUpgrades||{},b=s.consumableBattle?.buffs||{};return amount+(d.group==='weapon'&&['damage','drain'].includes(d.effect)?u.damage||0:0)+(d.group==='ability'&&d.effect!=='dodge'?u.potency||0:0)+(['damage','drain'].includes(d.effect)?b.attack||0:0)}
function consumableCooldown(i,base){const d=defs[i.type],u=i.potionUpgrades||{},flat=Math.min(d.cd*.25,u.cooldown||0),temporary=Math.min(d.cd*.2,s.consumableBattle?.buffs?.speed||0);return Math.max(d.cd*.1,base-flat-temporary)}
function consumableAbilityRate(i){return defs[i.type].group==='ability'&&defs[i.type].effect==='dodge'?(i.potionUpgrades?.evasion||0):0}
function gainMana(amount,source=null){if(amount>0&&source)amount+=s.consumableBattle?.buffs?.wisdom||0;s.mana=Math.max(0,Math.min(manaCapacity(),s.mana+amount))}
function consumableTargets(i){const p=consumableProfile(i);if(!p||!s.items.includes(i))return [];return nearbyItems(i).filter(j=>{const d=defs[j.type];if(p.mode==='slot')return gearEnchantable(j)&&enchantCapacity(j)<4;if(p.mode!=='upgrade')return false;return p.stat==='attack'?d.group==='weapon'&&['damage','drain'].includes(d.effect):p.stat==='defense'?d.group==='armor':p.stat==='dexterity'?d.group==='weapon':p.stat==='speed'?d.group==='armor':p.stat==='vitality'?d.group==='ring':['wisdom','mana'].includes(p.stat)?d.group==='ability':false})}
function consumableTarget(i){const targets=consumableTargets(i);return i.consumableTarget==null?targets[0]:targets.find(j=>j.id===i.consumableTarget)}
function chooseConsumableTarget(id,value){if(s.phase!=='prep')return false;const i=s.items.find(i=>i.id===id),target=Number(value);if(!i||!consumableTargets(i).some(j=>j.id===target))return false;i.consumableTarget=target;save();renderDetail();return true}
function potionUpgradePlan(source,target){const p=consumableProfile(source),d=target&&defs[target.type],u=target?.potionUpgrades||{};if(!d)return null;let key,step,cap;
 switch(p.stat){
 case'attack':key='damage';step=p.greater?2:1;cap=Math.max(2,Math.floor(d.amount*.25));break;
 case'defense':key='block';step=p.greater?2:1;cap=Math.max(2,Math.floor((d.effect==='block'?d.amount:d.affix==='block'?d.affixAmount:0)*.25));break;
 case'vitality':if(passiveRing(d)){key='ringStrength';step=p.greater?.10:.05;cap=.25;break} // Active rings use their activation cadence.
 case'dexterity':case'speed':case'wisdom':key='cooldown';step=p.greater?.2:.1;cap=d.cd*.25;break;
 case'mana':if(d.effect==='dodge'){key='evasion';step=p.greater?.10:.05;cap=.25}else{key='potency';step=d.effect==='mana'||d.effect==='summon'?(p.greater?2:1):['haste','chill','weaken','vulnerable'].includes(d.effect)?(p.greater?2:1):(p.greater?4:2);cap=Math.max(step,Math.floor(d.amount*.25*100)/100)}break;
 }
 if(!key)return null;const before=u[key]||0,after=Math.min(cap,Math.round((before+step)*10000)/10000);return after>before+1e-8?{key,before,after,cap}:null
}
function spendReworkedCopy(i){consumeStackUse(i);i.charge=0;i.activations++;if(consumableProfile(i).mode!=='supply'&&consumableProfile(i).mode!=='legacy')i.used=true;itemFxPulse(i,'utility','✓')}
function activateReworkedConsumable(i,opening=false){const p=consumableProfile(i);if(!p||p.mode==='legacy')return null;if(i.used||stackRemaining(i)<=0||!s.items.includes(i))return false;const b=consumableBattle();
 if(p.mode==='supply'){
  if(opening)return false;if(p.effect==='heal'&&s.hp>s.max*HEALING_CONSUMABLE_THRESHOLD||p.effect==='mana'&&manaCapacity()-s.mana<p.amount)return false;
  apply(p.effect,enchantPrimary(i,p.amount,true),i);spendReworkedCopy(i);triggerEnchantments(i);return true
 }
 if(p.mode==='freeze'){
  if(opening||s.enemy.charge<s.enemy.cd*.65||s.enemy.frozen>0)return false;const e=s.enemy,window=Math.floor(s.time/5);if(e.delayWindow!==window){e.delayWindow=window;e.delaySpent=0}const duration=Math.min(2,Math.max(0,2-(e.delaySpent||0)));if(duration<=0)return false;e.delaySpent=(e.delaySpent||0)+duration;e.frozen=duration;spendReworkedCopy(i);return true
 }
 if(!opening||p.mode==='chest')return false;
 if(p.mode==='upgrade'||p.mode==='slot'){
  if(p.stat==='life'){const bonus=Math.min(p.greater?10:5,60-(s.potionLifeBonus||0));if(bonus<=0||b.used.life)return false;s.max+=bonus;s.potionLifeBonus=(s.potionLifeBonus||0)+bonus;b.used.life=true;spendReworkedCopy(i);return true}
  const target=consumableTarget(i);if(!target)return false;
  if(p.mode==='slot'){if(b.used['slot:'+target.id])return false;target.enchantSlots=Math.min(4,enchantCapacity(target)+1);b.used['slot:'+target.id]=true;spendReworkedCopy(i);return true}
  const plan=potionUpgradePlan(i,target);if(!plan||b.used[target.id+':'+plan.key])return false;target.potionUpgrades={...(target.potionUpgrades||{}),[plan.key]:plan.after};b.used[target.id+':'+plan.key]=true;spendReworkedCopy(i);return true
 }
 if(p.mode==='openingHeal'){if(s.hp>=s.max)return false;restore(Math.ceil(s.max*p.fraction),false);spendReworkedCopy(i);return true}
 if(p.mode==='buff'){
  if((b.buffs[p.stat]||0)>=p.amount)return false;b.buffs[p.stat]=p.amount;
  if(p.stat==='life'){s.max+=p.amount-b.tempHP;b.tempHP=p.amount}
  if(p.stat==='mana')b.tempMana=p.amount;
  if(p.stat==='dexterity')for(const j of s.items)j.hasteRemaining=Math.max(j.hasteRemaining||0,p.amount);
  spendReworkedCopy(i);return true
 }
 if(p.mode==='chaos'){if(b.used.chaos)return false;b.used.chaos=true;const outcomes=[['attack',3],['defense',3],['speed',.1],['attack',-2],['defense',-2],['slow',1]];const [stat,value]=outcomes[Math.floor(rng()*outcomes.length)];if(stat==='slow')b.chaosSlow=true;else b.buffs[stat]=(b.buffs[stat]||0)+value;b.chaosText=(value>0?'+':'')+value+' '+stat;log('Chaos Cake: '+b.chaosText+' for this encounter.');spendReworkedCopy(i);return true}
 if(['lootDrop','lootTier','statDrop','transform'].includes(p.mode)){
  if(b.used[p.mode])return false;let target=null;if(p.mode==='transform'){target=s.items.find(j=>j.id!==i.id&&occupied(j).some(([x,y])=>x===5&&y===4));if(!target)return false}
  b.used[p.mode]=true;b.actions.push({mode:p.mode,sourceId:i.id,targetId:target?.id});spendReworkedCopy(i);return true
 }
 return false
}
function startConsumableEffects(){const b=consumableBattle();if(b.started)return;b.started=true;const opening=s.items.filter(i=>consumableProfile(i)&&!['supply','legacy','freeze','openingHeal','chest'].includes(consumableProfile(i).mode)).sort((a,c)=>(consumableProfile(c).amount||Number(consumableProfile(c).greater)||0)-(consumableProfile(a).amount||Number(consumableProfile(a).greater)||0));for(const i of opening)activateReworkedConsumable(i,true);syncRingVitals()}
function startConsumableHealing(){for(const i of s.items.filter(i=>consumableProfile(i)?.mode==='openingHeal').sort((a,b)=>consumableProfile(b).fraction-consumableProfile(a).fraction))activateReworkedConsumable(i,true)}
function finishConsumableEffects(victory){const b=s.consumableBattle;if(!b)return;
 s.consumableRewardMods=victory?{lootDrop:!!b.used.lootDrop,lootTier:!!b.used.lootTier}:{};
 for(const action of b.actions){if(!victory)continue;if(action.mode==='statDrop')queueSupply(makeItem(randomStatPotion()));
  if(action.mode==='transform'){
   const target=s.items.find(i=>i.id===action.targetId&&(!defs[i.type].once||stackRemaining(i)>0)),source=s.items.find(i=>i.id===action.sourceId);
   const [w,h]=target?dims(target):[];const lastDamage=target&&tradeDamageSource(target)&&!s.items.some(i=>i!==target&&tradeDamageSource(i));const pool=target?DATA.items.filter(d=>!d.lootExcluded&&!d.isShiny&&(d.w===w&&d.h===h||d.h===w&&d.w===h)&&(!lastDamage||['damage','drain','poison','burn','bleed','summon'].includes(d.effect))&&d.id!==target.type):[];
   if(!pool.length){if(source){source.usesSpent=Math.max(0,source.usesSpent-1);source.used=false}continue}
   const d=pool[Math.floor(rng()*pool.length)],replacement=makeItem(d.id),position={id:target.id,x:target.x,y:target.y,rot:d.w!==w};for(const key of Object.keys(target))delete target[key];Object.assign(target,replacement,position);log('Transformation Potion: received '+d.name+'.')
  }
 }
 // Actual copies disappear once the whole encounter ends, not between waves.
 for(const i of [...s.items,...s.stash])if(defs[i.type].consumableRework){const left=Math.max(0,stackCount(i)-(i.usesSpent||0));i.quantity=left;i.usesSpent=0;if(!left){s.items=s.items.filter(j=>j!==i);s.stash=s.stash.filter(j=>j!==i);if(selected===i.id)selected=null;if(inspected===i.id)inspected=null}else i.used=false}
 s.max-=b.tempHP;s.hp=Math.min(s.hp,s.max);s.consumableBattle=null;syncRingVitals();s.mana=Math.min(s.mana,manaCapacity())
}
function randomStatPotion(){const pool=DATA.items.filter(d=>d.consumable?.mode==='upgrade'&&!d.consumable.greater&&!d.lootExcluded);return pool[Math.floor(rng()*pool.length)].id}
function queueSupply(item){(s.pendingSupplies||(s.pendingSupplies=[])).push(item)}
function autoClaimSupplies(){for(const i of [...(s.pendingSupplies||[])])if(stashCanReceive(i)){receiveItem(i);s.pendingSupplies=s.pendingSupplies.filter(j=>j!==i)}}
function awardCombatSupplies(){const level=dungeonRating(dungeonIdForRoom(ROOMS[s.room]))?.level||0,prefix=level>=4?'Greater ':'';for(const name of [prefix+'Health Potion',prefix+'Magic Potion'])queueSupply(makeItem(DATA.byName[name]));autoClaimSupplies()}
function showSupplies(){if(s.phase!=='reward')return;autoClaimSupplies();const pending=s.pendingSupplies||[];modal('Encounter supplies',pending.length?'Claim these in addition to your normal loot choice. Stacks hold five copies.':'All supplies claimed.',`<div class="supply-options">${pending.map(i=>`<p>${art(i.type)} ${esc(defs[i.type].name)} <button ${stashCanReceive(i)?'':'disabled'} onclick="claimSupply(${i.id})">Take</button></p>`).join('')}</div>${s.items.length+s.stash.length?`<label>Make room by discarding an item<select id="supplyDiscard">${[...s.stash,...s.items].map(i=>`<option value="${i.id}">${esc(defs[i.type].name)} ×${stackCount(i)}</option>`).join('')}</select></label><button onclick="discardForSupplies(Number(document.getElementById('supplyDiscard').value))">Discard selected item…</button>`:''}<button class="gold" onclick="${s.lootChoiceDone?'continueRewardSupplies()':'showRewards()'}">${s.lootChoiceDone?'Finish rewards':'Back to loot'}</button>${pending.length?'<button onclick="leaveSupplies()">Leave unclaimed supplies</button>':''}`,'supplies')}
function claimSupply(id){if(s.phase!=='reward')return false;const i=s.pendingSupplies?.find(i=>i.id===id);if(!i||!stashCanReceive(i))return false;receiveItem(i);s.pendingSupplies=s.pendingSupplies.filter(j=>j!==i);save();showSupplies();return true}
function discardForSupplies(id,confirmed=false){if(s.phase!=='reward')return;const i=[...s.items,...s.stash].find(i=>i.id===id);if(!i)return;const reason=itemRemovalReason(i,stackCount(i));if(reason)return toast(reason);if(!confirmed)return modal('Discard '+defs[i.type].name+'?','Discard this item to make room for encounter supplies.',`<button onclick="showSupplies()">Keep item</button><button class="gold" onclick="discardForSupplies(${id},true)">Discard item</button>`,'confirm');s.items=s.items.filter(j=>j!==i);s.stash=s.stash.filter(j=>j!==i);autoClaimSupplies();save();render();showSupplies()}
function leaveSupplies(){if(s.phase!=='reward')return;s.pendingSupplies=[];save();if(s.lootChoiceDone)advanceReward();else showRewards()}
function continueRewardSupplies(){if(s.phase!=='reward'||!s.lootChoiceDone)return;if(s.pendingSupplies?.length)return showSupplies();advanceReward()}
function advanceReward(){if(s.phase!=='reward'||!s.lootChoiceDone)return;s.lootChoiceDone=false;s.consumableRewardMods=null;if(ROOMS[s.room].type==='boss'){s.phase='boon';save();showBoon()}else nextRoom()}
function openStatChest(id){if(s.phase!=='prep')return false;const i=[...s.items,...s.stash].find(i=>i.id===id);if(!i||consumableProfile(i)?.mode!=='chest')return false;i.chestOffer??=randomStatPotion();const rewardItem=makeItem(i.chestOffer),removed=stackCount(i)===1?[i.id]:[];if(!stashCanReceive(rewardItem,true,removed)){save();toast('Make a stash slot or room in a matching potion stack before opening.');return false}if(stackCount(i)===1){s.items=s.items.filter(j=>j!==i);s.stash=s.stash.filter(j=>j!==i)}else{i.quantity--;delete i.chestOffer}receiveItem(rewardItem);save();render();if(modalKind==='itemdetails'){if([...s.items,...s.stash].some(j=>j.id===id))showItemDetails(id);else closeItemDetails()}return true}
function migrateConsumables(){for(const i of [...s.items,...s.stash]){const d=defs[i.type];if(d?.consumableReplacement){i.type=d.consumableReplacement;i.consumableTarget=null}if(defs[i.type]?.consumableRework){i.quantity=stackCount(i);i.usesSpent=0;i.used=false}}if(s.consumableBattle){s.max-=s.consumableBattle.tempHP||0;s.consumableBattle=null;s.hp=Math.min(s.hp,s.max)}syncRingVitals();stock=stock.filter(id=>!defs[id].lootExcluded);reward=reward.filter(id=>!defs[id].lootExcluded);if(s.activeEvent?.offers)for(const [key,id] of Object.entries(s.activeEvent.offers))if(defs[id]?.lootExcluded)s.activeEvent.offers[key]=eventOffer(0,true)}
function consumableDescription(d){const p=d.consumable;if(!p)return '';const suffix=' Permanently spent after use; stacks to five.';
 if(p.mode==='legacy')return effectText(d.effect,d.amount)+'. Temporarily unobtainable; existing copies are spent after use.'+(consumableBundleSize(d.id)>1?' Contains '+consumableBundleSize(d.id)+' copies.':'');
 if(p.mode==='supply')return effectText(p.effect,p.amount)+'. '+(p.effect==='heal'?'Waits until 50% health or lower.':'Waits until at least '+p.amount+' mana is missing.')+suffix;
 if(p.mode==='upgrade')return p.stat==='life'?`At battle start: +${p.greater?10:5} maximum HP for this run (potion cap +60). One copy per encounter; does not heal.`+suffix:`At battle start: permanently improve one chosen adjacent ${({attack:'weapon’s damage',defense:'armor’s block',dexterity:'weapon’s cooldown',speed:'armor’s cooldown',vitality:'ring’s main effect or active cooldown',wisdom:'ability’s cooldown',mana:'ability’s primary effect'})[p.stat]} for this run. ${['dexterity','speed','wisdom'].includes(p.stat)?(p.greater?.2:.1)+'s reduction; potion cap 25% of base cooldown.':p.stat==='attack'||p.stat==='defense'?'+'+(p.greater?2:1)+' output; capped per item.':p.stat==='vitality'?(p.greater?10:5)+'% stronger passive ring, or '+(p.greater?.2:.1)+'s shorter active cooldown.':'Family-scaled potency; dodge abilities gain recharge instead.'} One copy per encounter; no eligible improvement means no consumption.`+suffix;
 if(p.mode==='buff')return `At battle start: ${({attack:'+'+p.amount+' primary damage for damaging items',defense:'+'+p.amount+' block to item-sourced block gains',dexterity:p.amount+'s haste for all packed items',speed:p.amount+'s shorter cooldown for all items (20% base cap)',vitality:'+'+p.amount+' item healing',wisdom:'+'+p.amount+' mana from item mana gains',mana:'+'+p.amount+' maximum mana',life:'+'+p.amount+' maximum HP'})[p.stat]} for this encounter, including all waves. Strongest tincture/effusion of each stat only; unused weaker copies stay.`+suffix;
 return ({openingHeal:`At battle start: restore ${p.fraction===1?'all missing':'50% of maximum'} HP. Uses one copy only when wounded.`,chaos:'At battle start: roll one temporary damage, defense or speed buff/debuff for this encounter.',freeze:'When the enemy nears an attack: freeze it for up to 2s. Shares the 2s-per-5s control budget.',slot:'At battle start: add one enchantment slot to a chosen adjacent enchantable item, up to Divine (4). No roll required.',lootDrop:'For this victory: each normal loot slot has a 25% chance to favor a UT/ST item. Does not increase Shiny chance.',lootTier:'For this victory: a 50% chance per tiered loot choice to upgrade to a higher available tier in its own family.',statDrop:'This victory also grants one guaranteed ordinary stat potion, separate from normal loot.',transform:'After victory: replace the item covering the bottom-right backpack cell with a random available item of the same occupied size. Old upgrades are lost. No valid replacement means this potion is kept.',chest:'Open between battles to receive one random ordinary stat potion. Has no combat effect.'})[p.mode]+suffix
}
function consumableControls(i){const p=consumableProfile(i);if(!p)return '';if(p.mode==='chest')return `<div class="consumable-controls"><button onclick="openStatChest(${i.id})" ${s.phase==='prep'?'':'disabled'}>Open one chest</button></div>`;if(!['upgrade','slot'].includes(p.mode)||p.stat==='life')return '';const targets=consumableTargets(i),target=consumableTarget(i);return `<div class="consumable-controls"><label>Upgrade target<select aria-label="Consumable upgrade target" onchange="chooseConsumableTarget(${i.id},this.value)" ${s.phase==='prep'&&s.items.includes(i)?'':'disabled'}>${!target?'<option value="">Choose an eligible adjacent item</option>':''}${targets.map(j=>`<option value="${j.id}" ${j===target?'selected':''}>${esc(defs[j.type].name)}</option>`).join('')}</select></label><small>${target?'One copy improves this item at battle start, within its potion cap.':'Pack this beside an eligible item; it will be kept until it can improve one.'}</small></div>`}

function potionUpgradeMarkup(i){const u=i.potionUpgrades;if(!u)return '';const labels={damage:'weapon damage',block:'armor block',cooldown:'seconds off base cooldown',potency:'ability potency',ringStrength:'ring bonus strength',evasion:'dodge-ability recharge'};return '<p class="synergy">Potion upgrades · '+Object.entries(u).map(([key,n])=>['ringStrength','evasion'].includes(key)?'+'+Math.round(n*100)+'% '+labels[key]:'+'+Number(n.toFixed(3))+' '+labels[key]).join(' · ')+'</p>'}
