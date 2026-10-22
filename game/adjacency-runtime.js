/* Shared rules drive combat, inspection, and connection markers. */
'use strict';
const ADJACENCY_RULES=[
 {name:'Runic edge',kind:'damage',target:d=>d.group==='weapon'&&['damage','drain'].includes(d.effect),source:d=>d.group==='ring'&&!d.ringAttribute,stat:'primary',value:.10,text:'+10% primary damage per adjacent ring (max +20%)'},
 {name:'Guarded strike',kind:'defense',target:d=>d.group==='weapon',source:d=>d.group==='armor',stat:'block',value:2,text:'Gain 2 block per adjacent armor on activation (max 4)'},
 {name:'Battle casting',kind:'damage',target:d=>d.group==='ability'&&['damage','drain'].includes(d.effect),source:d=>d.group==='weapon',stat:'primary',value:.10,text:'+10% primary damage per adjacent weapon (max +20%)'},
 {name:'Arcane circuit',kind:'cooldown',target:d=>d.group==='ability',source:d=>d.effect==='mana',stat:'rate',value:.08,text:'+8% recharge rate per adjacent mana-generating item (max +16%)'},
 {name:'Layered guard',kind:'defense',target:d=>d.effect==='block',source:d=>d.group==='armor',stat:'primary',value:.10,text:'+10% primary block per adjacent armor (max +20%)'},
 {name:'Sheltered recovery',kind:'healing',target:d=>d.effect==='heal',source:d=>d.group==='armor',stat:'primary',value:.10,text:'+10% primary healing per adjacent armor (max +20%)'},
 {name:'Mana reservoir',kind:'mana',target:d=>d.effect==='mana',source:d=>d.group==='ability',stat:'mana',value:1,text:'Generate 1 extra mana per adjacent ability on activation (max 2)'},
 {name:'Affliction pairing',kind:'status',target:d=>['burn','poison','bleed'].includes(d.effect),source:(d,t)=>d.effect===t.effect,stat:'status',value:1,text:'Apply 1 extra primary affliction per adjacent item with the same primary affliction (max 2)'},
 {name:'Charmed supplies',kind:'utility',target:d=>!!d.once&&['damage','drain','heal','block','mana'].includes(d.effect),source:d=>d.group==='ring'&&!d.ringAttribute,stat:'primary',value:.10,text:'+10% primary amount per adjacent ring (max +20%)'},
 {name:'Protected supplies',kind:'defense',target:d=>!!d.once,source:d=>d.group==='armor',stat:'block',value:2,text:'Gain 2 block per adjacent armor on use (max 4)'},
 {name:'Attack ring',kind:'damage',target:d=>d.group==='weapon'&&['damage','drain'].includes(d.effect),source:d=>d.ringAttribute==='attack',stat:'primary',value:(d,i)=>ringStrength(i)/100,text:'Adjacent Attack rings increase weapon primary damage; strongest two, shared +35% primary cap'},
 {name:'Defense ring',kind:'defense',target:d=>true,source:d=>d.ringAttribute==='defense',stat:'ringBlock',value:(d,i)=>ringStrength(i)/100,text:'Adjacent Defense rings increase item-sourced block gain; strongest two, max +50%'},
 {name:'Wisdom ring',kind:'utility',target:d=>d.group==='ability',source:d=>d.ringAttribute==='wisdom',stat:'primary',value:(d,i)=>ringStrength(i)/100,text:'Adjacent Wisdom rings increase ability primary output (rounded), or recharge rate for dodge abilities; strongest two, shared +35% primary cap'},
 {name:'Speed ring',kind:'cooldown',target:d=>true,source:d=>d.ringAttribute==='speed',stat:'ringSpeed',value:(d,i)=>ringStrength(i)/100,text:'Adjacent Speed rings reduce cooldown continuously; strongest two, max 20% reduction'}
];
function adjacencyConnections(i){if(!s.items.includes(i))return [];const cache=prepareCombatGeometry();if(cache?.connections.has(i))return cache.connections.get(i);const d=defs[i.type],near=nearbyItems(i),connections=ADJACENCY_RULES.filter(r=>r.target(d)).flatMap(rule=>near.filter(j=>rule.source(defs[j.type],d)).sort((a,b)=>typeof rule.value==='function'?rule.value(defs[b.type],b)-rule.value(defs[a.type],a):0).slice(0,2).map(source=>({rule,source})));if(cache){cache.connections.set(i,connections);const stats={};for(const c of connections)stats[c.rule.stat]=(stats[c.rule.stat]||0)+adjacencyValue(c);cache.stats.set(i,stats)}return connections}
function adjacencyValue(c){return typeof c.rule.value==='function'?c.rule.value(defs[c.source.type],c.source):c.rule.value}
function adjacencyStat(i,stat){const cache=prepareCombatGeometry();if(cache?.neighbors.has(i)){adjacencyConnections(i);return cache.stats.get(i)?.[stat]||0}return adjacencyConnections(i).filter(c=>c.rule.stat===stat).reduce((n,c)=>n+adjacencyValue(c),0)}
function adjacencyPrimary(i,amount){if(defs[i.type].group==='ability'&&defs[i.type].effect==='dodge')return amount;return amount*(1+Math.min(.35,adjacencyStat(i,'primary')))}
function adjacencyOnActivation(i){const block=adjacencyStat(i,'block'),mana=adjacencyStat(i,'mana'),status=adjacencyStat(i,'status');if(block)gainBlock(block,i);if(mana)s.mana=Math.min(manaCapacity(),s.mana+mana);if(status)apply(defs[i.type].effect,status)}
const ADJACENCY_COPY={
 'Attack ring':['Weapon primary output ↑','per adjacent Attack ring · strongest two · shared +35% cap'],
 'Defense ring':['Item block gain ↑','per adjacent Defense ring · strongest two · +50% cap'],
 'Wisdom ring':['Ability output / evasion recharge ↑','per adjacent Wisdom ring · strongest two · shared +35% cap'],
 'Speed ring':['Cooldown reduced continuously','per adjacent Speed ring · strongest two · 20% cap'],
 'Runic edge':['+10% damage','per adjacent ring · max +20%'],
 'Guarded strike':['+2 block on activation','per adjacent armor · max 4'],
 'Battle casting':['+10% damage','per adjacent weapon · max +20%'],
 'Arcane circuit':['+8% recharge rate','per adjacent mana item · max +16%'],
 'Layered guard':['+10% block','per adjacent armor · max +20%'],
 'Sheltered recovery':['+10% healing','per adjacent armor · max +20%'],
 'Mana reservoir':['+1 mana on activation','per adjacent ability · max 2'],
 'Affliction pairing':['+1 affliction on activation','per neighbor with the same affliction · max 2'],
 'Charmed supplies':['+10% primary amount','per adjacent ring · max +20%'],
 'Protected supplies':['+2 block on use','per adjacent armor · max 4']
};
function adjacencyCopy(rule){const [bonus,neighbor]=ADJACENCY_COPY[rule.name]||[rule.name,rule.text];return {bonus,neighbor}}
function adjacencyLinkLabel(rule,source){if(typeof rule.value==='function'&&source)return rule.name+': '+ringStrength(source)+'% '+({primary:'ability/weapon output (dodge abilities: recharge)',ringBlock:'block gain',ringSpeed:'shorter cooldown'})[rule.stat]+' (shared edge; strongest two; capped)';return rule.name+': '+adjacencyCopy(rule).bonus}
function adjacencyGuide(d){const rules=ADJACENCY_RULES.filter(r=>r.target(d));return rules.length?`<section class="adjacency-guide" aria-label="Adjacency bonuses"><b>Adjacency bonuses</b><ul>${rules.map(r=>{const copy=adjacencyCopy(r);return `<li title="${esc(r.name+': '+r.text)}"><strong>${esc(copy.bonus)}</strong><span>${esc(copy.neighbor)}</span></li>`}).join('')}</ul><details class="adjacency-rules"><summary>Placement rules</summary><p>Items must share an edge. Each neighbor counts once, regardless of stack size. Combined primary bonuses cap at +35%.</p></details></section>`:''}

// Capacity bonuses are derived from packed rings, never granted permanently.
function ringStrength(i){if(!i)return 0;const d=defs[i.type],value=d.amount*(1+Math.min(.3,Math.max(0,i.eventInfusion||0)));return ['health','magic'].includes(d.ringAttribute)?Math.round(value):Math.round(value*100)/100}
function packedRingBonus(attribute,cap){
 const cache=prepareCombatGeometry();if(cache){cache.ringBonuses??={};if(attribute in cache.ringBonuses)return cache.ringBonuses[attribute]}
 const value=Math.min(cap,s.items.reduce((sum,i)=>sum+(defs[i.type].ringAttribute===attribute?ringStrength(i):0),0));
 if(cache)cache.ringBonuses[attribute]=value;return value
}
function manaCapacity(){return 50+packedRingBonus('magic',40)}
function syncRingVitals(){if(!s)return;const health=packedRingBonus('health',100);s.max=Math.max(20,s.max+health-(s.ringHealthBonus||0));s.ringHealthBonus=health;s.hp=Math.min(s.hp,s.max);s.mana=Math.min(s.mana,manaCapacity())}
function passiveRing(d){return d.group==='ring'&&d.effect==='support'&&!!d.ringAttribute}
function ringCanActivate(i){return itemEnchants(i).some(e=>['barrier','siphon','relay'].includes(e.key))}
function ringDescription(d){
 const n=d.amount;
 return ({attack:`Adjacent weapons gain +${n}% primary damage. Strongest two rings; shared +35% primary cap.`,defense:`Adjacent items gain +${n}% block from their effects and enchantments. Strongest two rings; +50% cap.`,wisdom:`Adjacent abilities gain +${n}% primary output, rounded to whole units. Dodge abilities gain recharge rate instead. Strongest two rings; shared +35% primary cap.`,speed:`Adjacent items have ${n}% shorter cooldowns while packed. Strongest two rings; 20% cap. Stacks with temporary haste.`,health:`While packed: +${n} maximum health (ring cap +100). Does not heal; removing it lowers the cap.`,magic:`While packed: +${n} maximum mana (base 50; ring cap +40). Does not generate mana.`})[d.ringAttribute]||''
}
function itemTiming(d,i=null){return passiveRing(d)?'Passive':(i?cooldown(i):affinityCooldown(d)).toFixed(2)+'s'}
