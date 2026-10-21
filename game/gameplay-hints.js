/* Small, optional reminders. Preferences live separately from run saves. */
'use strict';
const gameplayHintKey='realmpack-gameplay-tips-v1';
let gameplayHintsEnabled=true,gameplayHintsSeen=new Set(),gameplayHintCurrent=null,gameplayHintNextAt=0;
try{const saved=JSON.parse(localStorage.getItem(gameplayHintKey));if(saved){gameplayHintsEnabled=saved.enabled!==false;gameplayHintsSeen=new Set(Array.isArray(saved.seen)?saved.seen.filter(id=>typeof id==='string'):[])}}catch{}
const gameplayHintRules=[
 {id:'loot',title:'Make room for loot',text:'Rewards go to your stash. Matching consumables join a stack, up to five copies.',when:()=>modalKind==='reward'},
 {id:'shop',title:'A shop with a specialty',text:'Each merchant sells one type of gear. You get one free stock refresh per visit.',when:()=>modalKind==='shop'},
 {id:'event',title:'Check the trade',text:'Some events cost an item or gold. Read the offer before you commit.',when:()=>['event','trade'].includes(modalKind)},
 {id:'dungeon',title:'Pick your challenge',text:'More skulls mean tougher enemies. Choose a dungeon that suits your build.',when:()=>modalKind==='portal'},
 {id:'mana',title:'Ready, but waiting?',text:'An item with a full cooldown bar may need more mana. You recover 1 mana each second.',when:()=>!modalKind&&s?.phase==='fight'&&s.items.some(i=>!i.used&&i.charge>=cooldown(i)&&itemManaCost(defs[i.type],i)>s.mana)},
 {id:'healing',title:'Potions wait until you need them',text:'Healing consumables wait until you are at half health or lower, so they aren’t wasted.',when:()=>!modalKind&&s?.phase==='fight'&&s.time>=5&&s.items.some(i=>isHealingConsumable(defs[i.type]))},
 {id:'pressure',title:'Long fights get harder',text:'Healing weakens after 20 seconds. Enemy damage starts rising after 30. Aim for a faster kill next time.',when:()=>!modalKind&&s?.phase==='fight'&&s.time>=20},
 {id:'combat',title:'Your pack does the fighting',text:'Items fire when their cooldown bars fill. Plan your next changes; you can move gear after the fight.',when:()=>!modalKind&&s?.phase==='fight'},
 {id:'pack',title:'Pack before you fight',text:'Drag gear into your backpack to use it. Press R to rotate. Spare items in the stash stay inactive.',when:()=>!modalKind&&s?.phase==='prep'},
 {id:'stash',title:'Move a spare out of the way',text:'Hover over a backpack item and press S to stash it. The stash has nine slots; drag gear back to equip it.',when:()=>!modalKind&&s?.phase==='prep'},
 {id:'adjacency',title:'Try moving items together',text:'Hover over gear to see its bonuses. Items count as neighbors when their edges touch, not their corners.',when:()=>!modalKind&&s?.phase==='prep'},
 {id:'class',title:'Get to know your build',text:'Hover over your character for its passive, or the enemy for its tricks. Off-class gear has longer cooldowns.',when:()=>!modalKind&&s?.phase==='prep'},
 {id:'stacks',title:'Keep a few copies',text:'Identical consumables stack up to five. Each copy gets one use per battle, and all uses return next battle.',when:()=>!modalKind&&s?.phase==='prep'&&s.items.concat(s.stash).some(i=>defs[i.type].once)}
];
function saveGameplayHints(){try{localStorage.setItem(gameplayHintKey,JSON.stringify({enabled:gameplayHintsEnabled,seen:[...gameplayHintsSeen]}))}catch{}}
function syncGameplayHintControls(){if(window.__TEST__)return;document.querySelectorAll('[data-hints-toggle]').forEach(b=>{b.textContent='Gameplay tips: '+(gameplayHintsEnabled?'On':'Off');b.setAttribute('aria-pressed',String(gameplayHintsEnabled))})}
function toggleGameplayHints(){gameplayHintsEnabled=!gameplayHintsEnabled;gameplayHintCurrent=null;gameplayHintNextAt=0;saveGameplayHints();updateGameplayHints()}
function resetGameplayHints(){gameplayHintsSeen.clear();gameplayHintsEnabled=true;gameplayHintCurrent=null;gameplayHintNextAt=0;saveGameplayHints();updateGameplayHints()}
function dismissGameplayHint(){gameplayHintCurrent=null;gameplayHintNextAt=Date.now()+15000;updateGameplayHints()}
function setGameplayHintVisible(card,visible){const changed=card.hidden===visible;card.hidden=!visible;document.documentElement.classList.toggle('has-gameplay-hint',visible&&card.parentElement===document.querySelector('.wrap'));if(changed&&typeof screenReflow==='function')screenReflow()}
function updateGameplayHints(){
 if(window.__TEST__)return;
 syncGameplayHintControls();const card=document.getElementById('gameplayHint'),modal=document.querySelector('#overlay .modal');if(!card||modal&&!modal.dataset.screenFit)return;
 if(!gameplayHintsEnabled){setGameplayHintVisible(card,false);return}
 if(gameplayHintCurrent&&!gameplayHintCurrent.when())gameplayHintCurrent=null;
 if(!gameplayHintCurrent&&Date.now()>=gameplayHintNextAt){gameplayHintCurrent=gameplayHintRules.find(rule=>!gameplayHintsSeen.has(rule.id)&&rule.when())||null;if(gameplayHintCurrent){gameplayHintsSeen.add(gameplayHintCurrent.id);saveGameplayHints()}}
 const rule=gameplayHintCurrent;
 if(!rule){setGameplayHintVisible(card,false);return}
 if(modal){const footer=modal.lastElementChild;if(card.parentElement!==modal){modal.insertBefore(card,footer);screenReflow()}}else{const wrap=document.querySelector('.wrap');if(card.parentElement!==wrap){wrap.insertBefore(card,wrap.querySelector('.bottom'));screenReflow()}}
 if(card.dataset.tip!==rule.id){card.dataset.tip=rule.id;card.querySelector('strong').textContent=rule.title;card.querySelector('p').textContent=rule.text}
 setGameplayHintVisible(card,true);
}
function initGameplayHints(){
 const card=document.createElement('aside');card.id='gameplayHint';card.className='gameplay-hint';card.hidden=true;card.setAttribute('aria-label','Gameplay tip');card.innerHTML='<div role="status" aria-live="polite"><strong></strong><p></p></div><div class="gameplay-hint-actions"><button onclick="dismissGameplayHint()">Got it</button><button onclick="toggleGameplayHints()">Tips off</button></div>';document.querySelector('.wrap').insertBefore(card,document.querySelector('.bottom'));
 // Modal replacement removes its old contents. Keep the same tip card alive.
 new MutationObserver(()=>{if(!card.isConnected)document.querySelector('.wrap').insertBefore(card,document.querySelector('.bottom'));updateGameplayHints()}).observe(document.getElementById('overlay'),{childList:true});
 setInterval(updateGameplayHints,500);updateGameplayHints();
}
if(!window.__TEST__)initGameplayHints();
