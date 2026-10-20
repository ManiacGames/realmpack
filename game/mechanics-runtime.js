'use strict';
function grantsItemHaste(d){return d.effect==='haste'||!!d.mechanic?.localHaste||d.affix==='haste'&&(!d.mechanic||d.mechanic.keepAffix)}
function itemHasHaste(i){return s.haste>0||(i.hasteRemaining||0)>0}
function grantItemHaste(source,duration){if(!source||!s.items.includes(source)||s.phase!=='fight')return;const seconds=Math.max(0,Math.min(15,Number(duration)||0));if(!seconds)return;for(const target of nearbyItems(source)){target.hasteRemaining=Math.max(target.hasteRemaining||0,seconds);itemFxPulse(target,'cooldown','↑')}}

function resetItemMechanics(){s.itemBombs=[];s.lastItemEffect=null;resetRealmSpecials();for(const i of s.items)i.special={counter:0,stored:0,wave:0,rescued:false,refilled:false,relayWindow:0,relayTotal:0};}
function specialState(i){return i.special||(i.special={counter:0,stored:0,wave:0,rescued:false,refilled:false,relayWindow:0,relayTotal:0})}
function nearbyItems(i){return s.items.filter(j=>j.id!==i.id&&adjacent(i,j))}
function rechargeItem(i,fraction,source=null){const state=specialState(i),window=Math.floor(s.time);if(state.relayWindow!==window){state.relayWindow=window;state.relayTotal=0}const allowed=Math.max(0,Math.min(fraction,.35-state.relayTotal));state.relayTotal+=allowed;if(allowed>0){itemFxPulse(i,'cooldown','↻');if(source)itemFxPulse(source,'cooldown','↗')}i.charge=Math.min(cooldown(i),i.charge+cooldown(i)*allowed);}
function itemEvent(event,amount,source=null){if(s.phase!=='fight'||amount<=0)return;if(event==='hurt')realmOnHurt(amount);for(const i of s.items){const m=defs[i.type].mechanic;if(!m||source?.id===i.id)continue;const state=specialState(i);if(event==='weapon'&&m.key==='realmhex'){if(state.hexWave!==s.enemy.wave){state.counter=0;state.hexWave=s.enemy.wave}state.counter=Math.min(6,state.counter+amount)}if((event==='block'&&['barrier','guardlink'].includes(m.key))||(event==='heal'&&m.key==='healecho')||(event==='hurt'&&m.key==='reprisal'))state.stored=Math.min(m.n*3,state.stored+amount);if(event==='weapon'&&m.key==='combination'||event==='ability'&&m.key==='spellchain')state.counter=Math.min(3,state.counter+amount);}}
function tickItemMechanics(dt){if(s.phase!=='fight')return;tickRealmSpecials(dt);const pending=s.itemBombs||[];for(const bomb of pending){bomb.time-=dt;if(bomb.time<=0){hit(bomb.damage);log('✦ '+bomb.name+' delayed blast: '+bomb.damage+' damage.')}}s.itemBombs=pending.filter(b=>b.time>0)}
function tryItemRescue(){if(s.hp>0||s.time>=150)return false;const item=s.items.find(i=>defs[i.type].mechanic?.key==='phoenix'&&!specialState(i).rescued);if(!item)return false;specialState(item).rescued=true;item.used=true;restore(Math.max(1,Math.round(s.max*.18)),false);log('✦ '+defs[item.type].name+' prevents death!');flash('item'+item.id);return s.hp>0}
function mechanicCard(d){return d.mechanic?`<div class="mechanic-note"><b>◆ ${esc(d.mechanic.title)}</b><p>${esc(d.mechanic.text)}</p></div>${realmSetMarkup(d)}`:''}
function activateSignature(i){if(!healingConsumableReady(i))return false;const d=defs[i.type],m=d.mechanic,state=specialState(i),n=m.n,e=s.enemy;const manaCost=itemManaCost(d,i);if(i.used||manaCost>s.mana)return false;const ordinal=i.activations+1,near=nearbyItems(i),previous=s.lastItemEffect;const boosted=m.keepCondition&&conditionActive(i);let amount=d.amount;
 switch(m.key){case'charge':amount*=ordinal%3===0?1.8:.65;break;case'double':amount*=.8;break;case'ambush':amount*=ordinal===1?1.7:.9;break;case'execute':amount*=e.hp<e.max*.25?2:.85;break;case'isolation':amount*=near.length?.85:1.25;break;case'corner':{const [w,h]=dims(i);amount*=((i.x===0||i.x+w===6)&&(i.y===0||i.y+h===5))?1.2:.9;break}case'row':{const [w,h]=dims(i);const weapons=s.items.filter(j=>j.id!==i.id&&defs[j.type].group==='weapon'&&j.y<i.y+h&&j.y+dims(j)[1]>i.y).length;amount*=Math.min(1.2,.9+.06*weapons);break}case'ramp':amount*=Math.min(1.25,.85+i.activations*.04);break;case'wave':amount*=state.wave!==e.wave?1.45:.85;state.wave=e.wave;break;}
 if(d.realmIdentity)amount=realmPrimaryAmount(i,amount);amount=classPrimaryAmount(i,enchantPrimary(i,Math.max(1,Math.round(amount))));s.mana-=manaCost;passive('mana',manaCost);i.activations++;i.charge=0;consumeStackUse(i);if(d.realmIdentity)realmApplyPrimary(i,amount);else apply(d.effect,amount,i);
 switch(m.key){
 case'double':if(ordinal%2===0)apply(d.effect,Math.max(1,Math.round(d.amount*.35)),i);break;
 case'blood':s.hp=Math.max(1,s.hp-Math.max(1,Math.round(s.max*.02)));hit(n);restore(Math.floor(n/2));break;
 case'shieldbash':{const spent=Math.min(s.block,n*3);s.block-=spent;hit(spent);break}
 case'overdrive':{const spent=Math.min(3,s.mana);s.mana-=spent;passive('mana',spent);hit(n*spent);break}
 case'relay':{const target=near.filter(j=>defs[j.type].group==='weapon').sort((a,b)=>a.charge/cooldown(a)-b.charge/cooldown(b))[0];if(target)rechargeItem(target,.18,i);break}
 case'conduit':s.mana=Math.min(50,Math.max(0,s.mana+(near.some(j=>defs[j.type].group==='ability')?1:-1)));break;
 case'capacitor':if(ordinal%3===0){s.mana=Math.min(50,s.mana+2);near.filter(j=>defs[j.type].group==='ability').forEach(j=>rechargeItem(j,.1,i))}break;
 case'mirror':if(previous&&near.some(j=>j.id===previous.itemId)&&['damage','drain','block','heal','mana'].includes(previous.effect)){const echo=Math.max(1,Math.round(previous.amount*.25));if(previous.effect==='damage'||previous.effect==='drain')hit(echo);else if(previous.effect==='block')gainBlock(echo);else if(previous.effect==='heal')restore(echo);else s.mana=Math.min(50,s.mana+echo)}break;
 case'poisonburst':case'fireburst':case'bleedburst':{const field=m.key==='poisonburst'?'poison':m.key==='fireburst'?'burn':'bleed',stacks=Math.min(n,e[field]);e[field]-=stacks;hit(stacks*3);break}
 case'purify':{const had=s.venom>0||s.silence>0;s.venom=Math.max(0,s.venom-n);s.silence=Math.max(0,s.silence-1);if(had)s.mana=Math.min(50,s.mana+1);break}
 case'stasis':if(ordinal%3===0)delayEnemyAttack(.8);break;
 case'barrier':hit(state.stored);state.stored=0;break;
 case'healecho':if(state.stored>=n*3){const target=near.find(j=>defs[j.type].group==='weapon');if(target){rechargeItem(target,.25,i);state.stored=0}}break;
 case'guardlink':if(state.stored>=n*3){s.mana=Math.min(50,s.mana+n);state.stored=0}break;
 case'companion':if(s.summons.length){s.summons[0].duration=Math.min(12,s.summons[0].duration+2);restore(n)}break;
 case'sacrifice':if(s.summons.length){const pet=s.summons.shift();hit(pet.power*3);gainBlock(n)}break;
 case'laststand':if(s.hp<s.max*.35){gainBlock(n);s.mana=Math.min(50,s.mana+1)}break;
 case'combination':if(state.counter>=3){hit(n*2);state.counter=0}break;
 case'spellchain':if(state.counter>=2){s.mana=Math.min(50,s.mana+2);hit(n);state.counter=0}break;
 case'reprisal':if(state.stored>=n*3){restore(n);apply('weaken',2);state.stored=0}break;
 case'fuse':if(ordinal%3===0&&(s.itemBombs||[]).length<12)(s.itemBombs||(s.itemBombs=[])).push({time:3,damage:n*3,name:d.name});break;
 case'wardbreak':{const removed=Math.min(e.ward||0,n*2);e.ward=Math.max(0,e.ward-removed);if(removed)e.vulnerable=Math.max(1,e.vulnerable);break}
 case'potionbelt':if(s.hp<s.max*.35&&!state.refilled){const potion=near.find(j=>defs[j.type].once&&j.used);if(potion){refillStackUse(potion);state.refilled=true;log('✦ Emergency refill: '+defs[potion.type].name)}}break;
 case'prism':apply(['burn','poison','bleed'][(ordinal-1)%3],2);break;
 case'manasave':if(ordinal%4===0)s.mana=Math.min(50,s.mana+Math.min(3,d.mana));break;
 }
 if(d.realmIdentity)realmAfterActivation(i);
 // Legacy signatures retain their named core effect.
 if(m.keepAffix&&d.affix)apply(d.affix,d.affixAmount,i);if(boosted){if(['damage','drain','block','heal'].includes(d.effect))apply(d.effect,d.bonus,i);else hit(d.bonus)}
 if(d.group==='weapon'){passive('attack',1);itemEvent('weapon',1,i)}else if(d.group==='ability')itemEvent('ability',1,i);
 triggerEnchantments(i);classActivation(i,amount);itemFxActivation(i,boosted);if(d.realmIdentity&&m.shots>1)itemFxPulse(i,'damage','×'+m.shots);s.lastItemEffect={itemId:i.id,effect:d.effect,amount};log(d.name+' · '+m.title+': '+effectText(d.effect,amount)+'.');flash('item'+i.id);return true;
}
