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
// Resolve live elements each time: inventory nodes and room dialogs can be replaced.
function gameplayHintTarget(id){
 const item=predicate=>s.items.concat(s.stash).find(predicate),node=i=>i?document.querySelector('[data-item-id="'+i.id+'"]'):null;
 const packTab=()=>({el:document.querySelector('[data-play-view="pack"]'),cue:'Open Pack & stash to see it.'});
 const battleTab=()=>({el:document.querySelector('[data-play-view="battle"]'),cue:'Open Battle to see it.'});
 let elements=[],fallback=null;
 switch(id){
  case 'pack':elements=[$('grid')];fallback=packTab;break;
  case 'stash':elements=[$('stash')];fallback=packTab;break;
  case 'adjacency':{const first=s.items.find(i=>nearbyItems(i).length)||s.items[0];elements=[node(first),node(first&&nearbyItems(first)[0])];fallback=packTab;break}
  case 'stacks':elements=[node(item(i=>defs[i.type].once))];fallback=packTab;break;
  case 'combat':elements=[$('grid')];fallback=packTab;break;
  case 'mana':elements=[$('mana')];fallback=battleTab;break;
  case 'healing':elements=[node(item(i=>isHealingConsumable(defs[i.type])))];fallback=packTab;break;
  case 'pressure':elements=[$('effects')];fallback=battleTab;break;
  case 'class':elements=[$('playerSprite')];fallback=battleTab;break;
  case 'loot':elements=[...document.querySelectorAll('#overlay .loot-card')].filter(gameplayHintTargetVisible).slice(0,1);if(!elements.length)elements=[document.querySelector('#overlay .loot-footer')];break;
  case 'shop':elements=[document.querySelector('#overlay [onclick="refreshShop()"]')];break;
  case 'event':elements=[...document.querySelectorAll('#overlay .trade-select,#overlay .event-choice,#overlay .choice')].filter(gameplayHintTargetVisible).slice(0,1);break;
  case 'dungeon':elements=[...document.querySelectorAll('#overlay .portal-choice .dungeon-difficulty')].filter(gameplayHintTargetVisible).slice(0,1);break;
 }
 elements=elements.filter(gameplayHintTargetVisible);
 if(!elements.length&&id==='dungeon'){const legend=document.querySelector('#overlay .dungeon-marker-legend summary');if(gameplayHintTargetVisible(legend))elements=[legend]}
 if(elements.length)return {elements,cue:''};
 if(modalKind){const next=[...document.querySelectorAll('#overlay .screen-page-nav button:not(:disabled)')].find(gameplayHintTargetVisible);if(next)return {elements:[next],cue:'Use '+next.textContent.replace(/[←→]/g,'').trim()+' to see it.'}}
 const alternative=fallback?.();return alternative&&gameplayHintTargetVisible(alternative.el)?{elements:[alternative.el],cue:alternative.cue}:{elements:[],cue:''};
}
function gameplayHintTargetVisible(el){
 if(!el||!el.getClientRects().length||el.closest('[hidden],[data-screen-hidden]'))return false;
 const r=el.getBoundingClientRect();if(r.width<2||r.height<2||r.left<0||r.top<0||r.right>innerWidth+1||r.bottom>innerHeight+1)return false;
 for(let parent=el;parent;parent=parent.parentElement){const style=getComputedStyle(parent);if(style.visibility==='hidden'||style.display==='none')return false;if(parent!==el&&/(hidden|clip|auto|scroll)/.test(style.overflow+style.overflowX+style.overflowY)){const b=parent.getBoundingClientRect();if(r.left<b.left-2||r.right>b.right+2||r.top<b.top-2||r.bottom>b.bottom+2)return false}}
 return true;
}
function hideGameplayHintPointer(){const svg=$('gameplayHintPointer');if(svg){svg.style.display='none';svg.replaceChildren()}const card=$('gameplayHint');if(card)delete card.dataset.target}
function positionGameplayHintPointer(){
 const card=$('gameplayHint'),svg=$('gameplayHintPointer');if(!svg)return;
 if(!gameplayHintsEnabled||!gameplayHintCurrent||!card||card.hidden||!gameplayHintCurrent.when()||inventoryIntent){hideGameplayHintPointer();return}
 const {elements,cue}=gameplayHintTarget(gameplayHintCurrent.id),copy=gameplayHintCurrent.text+(cue?' '+cue:'');
 if(card.querySelector('p').textContent!==copy){card.querySelector('p').textContent=copy;screenReflow()}
 if(!elements.length){hideGameplayHintPointer();return}
 const r=elements[0].getBoundingClientRect(),c=card.getBoundingClientRect(),tx=r.left+r.width/2,ty=r.top+r.height/2,cx=c.left+c.width/2,cy=c.top+c.height/2;
 let sx,sy;if(r.bottom<=c.top){sx=Math.max(c.left+16,Math.min(c.right-16,tx));sy=c.top-5}else if(r.top>=c.bottom){sx=Math.max(c.left+16,Math.min(c.right-16,tx));sy=c.bottom+5}else{sx=tx<cx?c.left-5:c.right+5;sy=Math.max(c.top+12,Math.min(c.bottom-12,ty))}
 const dx=sx-tx,dy=sy-ty,scale=Math.min((r.width/2+8)/(Math.abs(dx)||1),(r.height/2+8)/(Math.abs(dy)||1)),ex=tx+dx*scale,ey=ty+dy*scale;
 // Keep the arrow outside the highlighted control, so the control remains legible.
 const path=`M ${sx} ${sy} L ${ex} ${ey}`,rects=elements.map(el=>{const b=el.getBoundingClientRect(),x=Math.max(2,b.left-4),y=Math.max(2,b.top-4),w=Math.min(innerWidth-2,b.right+4)-x,h=Math.min(innerHeight-2,b.bottom+4)-y;return `<rect x="${x}" y="${y}" width="${w}" height="${h}" class="hint-target-shadow"/><rect x="${x}" y="${y}" width="${w}" height="${h}" class="hint-target-outline"/>`}).join('');
 svg.setAttribute('viewBox',`0 0 ${innerWidth} ${innerHeight}`);svg.innerHTML=`<defs><marker id="gameplayHintArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#f2d28c"/></marker></defs>${rects}<path d="${path}" class="hint-arrow-shadow"/><path d="${path}" class="hint-arrow" marker-end="url(#gameplayHintArrow)"/>`;svg.style.display='block';card.dataset.target=elements[0].id||elements[0].getAttribute('data-play-view')||elements[0].className;
}
function saveGameplayHints(){try{localStorage.setItem(gameplayHintKey,JSON.stringify({enabled:gameplayHintsEnabled,seen:[...gameplayHintsSeen]}))}catch{}}
function syncGameplayHintControls(){if(window.__TEST__)return;document.querySelectorAll('[data-hints-toggle]').forEach(b=>{b.textContent='Gameplay tips: '+(gameplayHintsEnabled?'On':'Off');b.setAttribute('aria-pressed',String(gameplayHintsEnabled))})}
function toggleGameplayHints(){gameplayHintsEnabled=!gameplayHintsEnabled;gameplayHintCurrent=null;gameplayHintNextAt=0;saveGameplayHints();updateGameplayHints()}
function resetGameplayHints(){gameplayHintsSeen.clear();gameplayHintsEnabled=true;gameplayHintCurrent=null;gameplayHintNextAt=0;saveGameplayHints();updateGameplayHints()}
function dismissGameplayHint(){gameplayHintCurrent=null;gameplayHintNextAt=Date.now()+15000;updateGameplayHints()}
function setGameplayHintVisible(card,visible){if(!visible)hideGameplayHintPointer();const changed=card.hidden===visible;card.hidden=!visible;document.documentElement.classList.toggle('has-gameplay-hint',visible&&card.parentElement===document.querySelector('.wrap'));if(changed&&typeof screenReflow==='function')screenReflow()}
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
 setGameplayHintVisible(card,true);requestAnimationFrame(positionGameplayHintPointer);
}
function initGameplayHints(){
 const pointer=document.createElementNS('http://www.w3.org/2000/svg','svg');pointer.id='gameplayHintPointer';pointer.setAttribute('aria-hidden','true');pointer.setAttribute('focusable','false');document.body.append(pointer);
 window.addEventListener('resize',()=>requestAnimationFrame(positionGameplayHintPointer));document.addEventListener('scroll',()=>requestAnimationFrame(positionGameplayHintPointer),true);setInterval(positionGameplayHintPointer,100);
 const card=document.createElement('aside');card.id='gameplayHint';card.className='gameplay-hint';card.hidden=true;card.setAttribute('aria-label','Gameplay tip');card.innerHTML='<div role="status" aria-live="polite"><strong></strong><p></p></div><div class="gameplay-hint-actions"><button onclick="dismissGameplayHint()">Got it</button><button onclick="toggleGameplayHints()">Tips off</button></div>';document.querySelector('.wrap').insertBefore(card,document.querySelector('.bottom'));
 // Modal replacement removes its old contents. Keep the same tip card alive.
 new MutationObserver(()=>{if(!card.isConnected)document.querySelector('.wrap').insertBefore(card,document.querySelector('.bottom'));updateGameplayHints()}).observe(document.getElementById('overlay'),{childList:true});
 setInterval(updateGameplayHints,500);updateGameplayHints();
}
if(!window.__TEST__)initGameplayHints();
