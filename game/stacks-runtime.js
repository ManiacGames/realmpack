/* Single-use copies share space and recharge one use at a time. */
'use strict';
const STACK_LIMIT=5;
const STASH_LIMIT=9;
const STASH_FULL_MESSAGE='Stash is full (9 slots). Equip, sell or discard an item first.';
const HEALING_CONSUMABLE_THRESHOLD=.5;
function isHealingConsumable(d){return !!d.once&&(d.effect==='heal'||d.affix==='heal'&&(!d.mechanic||d.mechanic.keepAffix))}
function healingConsumableReady(i){return !isHealingConsumable(defs[i.type])||s.hp<=s.max*HEALING_CONSUMABLE_THRESHOLD}
function healingConsumableNote(d){return isHealingConsumable(d)?' Activates only at 50% health or lower; holds its ready cooldown while waiting.':''}
function stackCount(i){return defs[i.type]?.once?Math.max(1,Math.min(STACK_LIMIT,Math.floor(Number(i.quantity)||1))):1}
function stackRemaining(i){return Math.max(0,stackCount(i)-(i.usesSpent||0))}
function stackCompatible(a,b){return a.id!==b.id&&a.type===b.type&&!!defs[a.type]?.once&&(a.eventHaste||0)===(b.eventHaste||0)&&(a.eventInfusion||0)===(b.eventInfusion||0)&&JSON.stringify(itemEnchants(a))===JSON.stringify(itemEnchants(b))}
function stackCanReceive(type){const item={id:-1,type};return [...s.items,...s.stash].some(j=>stackCompatible(j,item)&&stackCount(j)<STACK_LIMIT)}
function stashCanReceive(i,includePacked=true,removed=[]){const stash=s.stash.filter(j=>!removed.includes(j.id));if(stash.some(j=>j.id===i.id))return true;const targets=[...(includePacked?s.items:[]),...stash].filter(j=>j.id!==i.id&&!removed.includes(j.id));const space=defs[i.type]?.once?targets.filter(j=>stackCompatible(j,i)).reduce((n,j)=>n+STACK_LIMIT-stackCount(j),0):0;return space>=stackCount(i)||stash.length<STASH_LIMIT}
function receiveItem(i,includePacked=true){if(s.stash.includes(i))return i;if(!stashCanReceive(i,includePacked)){toast(STASH_FULL_MESSAGE);return null}if(defs[i.type].once){i.quantity=stackCount(i);for(const target of [...(includePacked?s.items:[]),...s.stash]){if(target.id===i.id||!stackCompatible(target,i)||stackCount(target)>=STACK_LIMIT)continue;const n=Math.min(STACK_LIMIT-stackCount(target),i.quantity);target.quantity=stackCount(target)+n;i.quantity-=n;if(!i.quantity)return target}}Object.assign(i,{x:null,y:null});s.stash.push(i);return i}
function mergeStacks(source,target){if(s.phase!=='prep'||!source||!target||!stackCompatible(source,target))return false;const n=Math.min(STACK_LIMIT-stackCount(target),stackCount(source));if(!n)return false;target.quantity=stackCount(target)+n;source.quantity=stackCount(source)-n;if(!source.quantity){s.items=s.items.filter(j=>j.id!==source.id);s.stash=s.stash.filter(j=>j.id!==source.id)}inventoryIntent=null;selected=target.id;render();save();return true}
function stackAtCell(i,x,y){return s.items.find(j=>j.id!==i.id&&occupied(j).some(([a,b])=>a===x&&b===y)&&stackCompatible(i,j))}
function splitSelectedStack(id=selected){if(s.phase!=='prep')return;const i=[...s.items,...s.stash].find(i=>i.id===id);if(!i||!defs[i.type].once||stackCount(i)<2)return;if(s.stash.length>=STASH_LIMIT)return toast(STASH_FULL_MESSAGE);const copy={...i,id:++uid,x:null,y:null,quantity:1,charge:0,activations:0,used:false,usesSpent:0};i.quantity=stackCount(i)-1;s.stash.push(copy);inventoryIntent=null;selected=copy.id;inspected=copy.id;render();save()}
function consumeStackUse(i){if(!defs[i.type].once)return;i.usesSpent=(i.usesSpent||0)+1;i.used=stackRemaining(i)===0}
function refillStackUse(i){i.usesSpent=Math.max(0,(i.usesSpent??stackCount(i))-1);i.used=false;i.charge=0}
function stackLabel(i){return defs[i.type].once?`×${stackCount(i)}${s.phase==='fight'?' · '+stackRemaining(i)+' left':''}`:''}
function updateStackBadge(el,i){if(!defs[i.type].once)return;let badge=el.querySelector('.stack-count');if(!badge){badge=document.createElement('span');badge.className='stack-count';el.appendChild(badge)}setTextValue(badge,stackLabel(i));const title=`${stackCount(i)}/5 copies · one activation per copy each battle`;if(badge.title!==title)badge.title=title}
function stackDetail(i){if(!defs[i.type].once)return '';const count=stackCount(i);return `<details class="stack-rules"><summary>Stack ${count} / 5 · <span id="stackUses">${s.phase==='fight'?stackRemaining(i):count}</span> ${s.phase==='fight'?'uses left':'uses per battle'}</summary><p>Each copy activates once, with a cooldown between uses. All copies refresh next battle.</p></details>${count>1?`<button onclick="splitSelectedStack(${i.id})" ${s.phase!=='prep'||s.stash.length>=STASH_LIMIT?'disabled':''}>Split one into stash</button>`:''}`}
