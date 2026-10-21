/* Shared rules drive combat, inspection, and connection markers. */
'use strict';
const ADJACENCY_RULES=[
 {name:'Runic edge',kind:'damage',target:d=>d.group==='weapon'&&['damage','drain'].includes(d.effect),source:d=>d.group==='ring',stat:'primary',value:.10,text:'+10% primary damage per adjacent ring (max +20%)'},
 {name:'Guarded strike',kind:'defense',target:d=>d.group==='weapon',source:d=>d.group==='armor',stat:'block',value:2,text:'Gain 2 block per adjacent armor on activation (max 4)'},
 {name:'Battle casting',kind:'damage',target:d=>d.group==='ability'&&['damage','drain'].includes(d.effect),source:d=>d.group==='weapon',stat:'primary',value:.10,text:'+10% primary damage per adjacent weapon (max +20%)'},
 {name:'Arcane circuit',kind:'cooldown',target:d=>d.group==='ability',source:d=>d.effect==='mana',stat:'rate',value:.08,text:'+8% recharge rate per adjacent mana-generating item (max +16%)'},
 {name:'Layered guard',kind:'defense',target:d=>d.effect==='block',source:d=>d.group==='armor',stat:'primary',value:.10,text:'+10% primary block per adjacent armor (max +20%)'},
 {name:'Sheltered recovery',kind:'healing',target:d=>d.effect==='heal',source:d=>d.group==='armor',stat:'primary',value:.10,text:'+10% primary healing per adjacent armor (max +20%)'},
 {name:'Mana reservoir',kind:'mana',target:d=>d.effect==='mana',source:d=>d.group==='ability',stat:'mana',value:1,text:'Generate 1 extra mana per adjacent ability on activation (max 2)'},
 {name:'Affliction pairing',kind:'status',target:d=>['burn','poison','bleed'].includes(d.effect),source:(d,t)=>d.effect===t.effect,stat:'status',value:1,text:'Apply 1 extra primary affliction per adjacent item with the same primary affliction (max 2)'},
 {name:'Charmed supplies',kind:'utility',target:d=>!!d.once&&['damage','drain','heal','block','mana'].includes(d.effect),source:d=>d.group==='ring',stat:'primary',value:.10,text:'+10% primary amount per adjacent ring (max +20%)'},
 {name:'Protected supplies',kind:'defense',target:d=>!!d.once,source:d=>d.group==='armor',stat:'block',value:2,text:'Gain 2 block per adjacent armor on use (max 4)'}
];
function adjacencyConnections(i){if(!s.items.includes(i))return [];const cache=prepareCombatGeometry();if(cache?.connections.has(i))return cache.connections.get(i);const d=defs[i.type],near=nearbyItems(i),connections=ADJACENCY_RULES.filter(r=>r.target(d)).flatMap(rule=>near.filter(j=>rule.source(defs[j.type],d)).slice(0,2).map(source=>({rule,source})));if(cache){cache.connections.set(i,connections);const stats={};for(const {rule} of connections)stats[rule.stat]=(stats[rule.stat]||0)+rule.value;cache.stats.set(i,stats)}return connections}
function adjacencyStat(i,stat){const cache=prepareCombatGeometry();if(cache?.neighbors.has(i)){adjacencyConnections(i);return cache.stats.get(i)?.[stat]||0}return adjacencyConnections(i).filter(c=>c.rule.stat===stat).reduce((n,c)=>n+c.rule.value,0)}
function adjacencyPrimary(i,amount){return amount*(1+Math.min(.35,adjacencyStat(i,'primary')))}
function adjacencyOnActivation(i){const block=adjacencyStat(i,'block'),mana=adjacencyStat(i,'mana'),status=adjacencyStat(i,'status');if(block)gainBlock(block);if(mana)s.mana=Math.min(50,s.mana+mana);if(status)apply(defs[i.type].effect,status)}
const ADJACENCY_COPY={
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
function adjacencyLinkLabel(rule){return rule.name+': '+adjacencyCopy(rule).bonus}
function adjacencyGuide(d){const rules=ADJACENCY_RULES.filter(r=>r.target(d));return rules.length?`<section class="adjacency-guide" aria-label="Adjacency bonuses"><b>Adjacency bonuses</b><ul>${rules.map(r=>{const copy=adjacencyCopy(r);return `<li title="${esc(r.name+': '+r.text)}"><strong>${esc(copy.bonus)}</strong><span>${esc(copy.neighbor)}</span></li>`}).join('')}</ul><details class="adjacency-rules"><summary>Placement rules</summary><p>Items must share an edge. Each neighbor counts once, regardless of stack size. Combined primary bonuses cap at +35%.</p></details></section>`:''}
