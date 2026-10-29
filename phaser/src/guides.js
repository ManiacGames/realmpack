'use strict';
// Contextual presentation only: no timers, combat hooks, save migration or run mutations.
const REALM_GUIDE_STEPS={
 classes:{title:'Choose your class',text:'Hover to compare passives. Click any adventurer to confirm a new run.'},
 portal:{title:'Pick a dungeon',text:'More skulls mean harder enemies. Choose the dungeon you want to tackle next.'},
 pack:{title:'Build your backpack',text:'Packed gear activates automatically. Drag items to arrange them; touching edges can grant bonuses.'},
 inspect:{title:'Read the full rules',text:'Hover or select gear, then press F for its full effects and placement rules.'},
 stash:{title:'Keep spare gear here',text:'The stash holds nine inactive stacks. S moves hovered backpack gear here.'},
 fight:{title:'Watch the battle',text:'Gear fights automatically. Click an enemy effect icon to learn what it does.'},
 reward:{title:'Choose your spoils',text:'Take one item, or leave the loot to recover health. Supplies are a separate choice.'},
 supplies:{title:'Take or leave supplies',text:'Potions join your stacks only when you choose Take. Leave anything you do not want.'},
 path:{title:'Follow connected routes',text:'Only connected rooms are reachable. Open the map to compare your options.'},
 map:{title:'Trace your route',text:'Highlighted markers are reachable. Hover a room to trace its incoming and outgoing paths.'},
 shop:{title:'Shop by specialty',text:'Each merchant stocks one equipment type. You get one free refresh per visit.'},
 rest:{title:'Recover between fights',text:'Health carries between rooms. Rest heals you; training raises your maximum health.'},
 event:{title:'Check the trade',text:'Check your HP and gold before choosing. Each offer shows what you pay and receive.'},
 forge:{title:'Trade gear for an upgrade',text:'Sacrifice one copy to improve another item. Check the preview before confirming.'},
 merchant:{title:'Sell spare items',text:'Sell a copy or a whole stack. You must keep at least one damage source.'},
 provisioner:{title:'Restock a stack',text:'Buy matching copies of a consumable you own. Each stack holds up to five.'},
 enchanter:{title:'Attune your equipment',text:'Dust rerolls unlocked modifiers. Locks cost extra; one item can be enchanted per visit.'},
 paidRoll:{title:'Compare the paid roll',text:'The roll is already paid for. Keep your current modifiers or use the new ones.'},
 boon:{title:'Claim a lasting blessing',text:'Boss blessings last for this run. Each choice also restores some health.'},
 catalogue:{title:'Find the item you need',text:'Search by name or mechanic. Filters include item type, class and unobtainable items.'}
};
const RealmGuide={
 key:'realmpack-phaser-guides-v1',enabled:true,seen:new Set(),current:null,frame:0,lastGeometry:'',
 init(){
  try{const data=JSON.parse(localStorage.getItem(this.key)||'{}');if(typeof data.enabled==='boolean')this.enabled=data.enabled;if(Array.isArray(data.seen))for(const id of data.seen)if(REALM_GUIDE_STEPS[id])this.seen.add(id)}catch{}
  this.host=document.createElement('div');this.host.id='realm-guide';this.host.hidden=true;
  this.host.innerHTML='<div class="realm-guide-mark" aria-hidden="true"></div><svg class="realm-guide-arrow" aria-hidden="true"><path></path><polygon></polygon></svg><aside class="realm-guide-card" role="note" aria-live="polite" aria-labelledby="realm-guide-title"><strong id="realm-guide-title"></strong><p id="realm-guide-copy"></p><div><button id="realm-guide-next">Got it</button><button id="realm-guide-off">Hide hints</button></div></aside>';
  document.getElementById('game').append(this.host);this.mark=this.host.querySelector('.realm-guide-mark');this.arrow=this.host.querySelector('svg');this.card=this.host.querySelector('aside');
  document.getElementById('realm-guide-next').onclick=()=>this.acknowledge();document.getElementById('realm-guide-off').onclick=()=>this.setEnabled(false);
  document.addEventListener('scroll',()=>this.refresh(),true);window.addEventListener('resize',()=>this.refresh());
  document.addEventListener('visibilitychange',()=>this.refresh());
  document.addEventListener('click',event=>{const target=event.target.closest?.('[onclick],button');if(!target||this.host.contains(target))return;const code=target.getAttribute('onclick')||'';
   if(target.closest('.class-roster'))this.complete('classes');
   const actions={selectPortal:'portal',selectPath:'path',chooseMapPath:'map',takeLoot:'reward',claimSupply:'supplies',leaveSupply:'supplies',leaveSupplies:'supplies',refreshShop:'shop',buy:'shop',buyHeal:'shop',leaveShop:'shop',resolveRest:'rest',resolveEvent:'event',commitRuneforge:'forge',sellEventItem:'merchant',buyProvisions:'provisioner',buyProvisionKit:'provisioner',enchantService:'enchanter',decideEnchant:'paidRoll',takeBoon:'boon',inspectCatalogueItem:'catalogue'};
   const name=code.match(/^([A-Za-z_]\w*)\(/)?.[1];if(actions[name]&&!target.disabled)this.complete(actions[name]);
   if(target.id==='fight'&&RealmModel.state?.phase==='prep')this.complete('pack');
   if(target.dataset.view==='stash')this.complete('stash');
   this.refresh();
  },true);
  this.syncButtons();
 },
 persist(){try{localStorage.setItem(this.key,JSON.stringify({enabled:this.enabled,seen:[...this.seen]}))}catch{}},
 syncButtons(){const toggle=document.getElementById('hints-button');if(toggle){toggle.textContent='Gameplay hints: '+(this.enabled?'On':'Off');toggle.setAttribute('aria-pressed',String(this.enabled))}},
 setEnabled(enabled){this.enabled=!!enabled;this.persist();this.syncButtons();if(!this.enabled)this.hide();this.refresh()},
 reset(){this.seen.clear();this.enabled=true;this.persist();this.syncButtons();this.current=null;this.refresh()},
 complete(id){if(!this.enabled||!REALM_GUIDE_STEPS[id]||this.seen.has(id))return;this.seen.add(id);this.persist();if(this.current?.id===id)this.hide();this.refresh()},
 acknowledge(){if(!this.current)return;const target=this.current.element,focused=this.host.contains(document.activeElement);this.complete(this.current.id);if(focused){const focus=target?.matches('button,input,select')?target:target?.querySelector('button:not(:disabled)');(focus||document.querySelector('dialog[open] #campaign-close')||document.getElementById('fight')||document.getElementById('menu')).focus({preventScroll:true})}},
 refresh(){if(this.frame)return;this.frame=requestAnimationFrame(()=>{this.frame=0;this.showContext()})},
 context(){
  if(!this.enabled||document.hidden||!window.realmScene||!RealmModel.state||RealmModel.mode!=='campaign')return null;
  const dialogs=[...document.querySelectorAll('dialog[open]')],dialog=dialogs.at(-1);if(dialog&&dialog.id!=='campaign-dialog')return null;
  const get=(id,selector)=>{if(this.seen.has(id))return null;for(const part of selector.split(',')){const element=document.querySelector(part.trim());if(!element)continue;const context={id,element,root:dialog||document.getElementById('game')};if(this.bounds(context))return context}return null};
  if(dialog){
   const kind=dialog.dataset.kind;let id,selector;
   if(kind==='itemdetails'){this.complete('inspect');return null}
   if(kind==='classes'){id='classes';selector='.class-roster .roster-class'}
   else if(kind==='portal'){id='portal';selector='#campaign-content .choices .choice'}
   else if(kind==='path'){id='path';selector='#campaign-content .choices .choice'}
   else if(kind==='reward'){id='reward';selector='.loot-card'}
   else if(kind==='supplies'){id='supplies';selector='.supply-options>p'}
   else if(kind==='runmap'){id='map';selector='.map-node.available,.map-node.current'}
   else if(kind==='shop'){id='shop';selector='#campaign-actions button[onclick="refreshShop()"]'}
   else if(kind==='rest'){id='rest';selector='#campaign-content .choices'}
   else if(kind==='boon'){id='boon';selector='#campaign-content .choices'}
   else if(kind==='event'){id='event';selector='#campaign-wallet'}
   else if(kind==='enchanter'){id=RealmModel.state.activeEvent?.pendingEnchant?'paidRoll':'enchanter';selector=id==='paidRoll'?'.enchant-comparison':'.dust-wallet'}
   else if(kind==='trade'){id=({runeforge:'forge',merchant:'merchant',provisioner:'provisioner'})[RealmModel.state.activeEvent?.id];selector='.trade-preview,.trade-form,#campaign-wallet'}
   else if(kind==='catalogue'&&catalogueOpen){id='catalogue';selector='#catalogueSearch'}
   return id?get(id,selector):null;
  }
  const scene=window.realmScene,state=RealmModel.state;
  const canvas=(id,board)=>this.seen.has(id)||!board?null:{id,board,root:document.getElementById('game')};
  if(state.phase==='fight')return canvas('fight',{x:scene.enemySprite.x-scene.enemySprite.displayWidth/2,y:scene.enemySprite.y-scene.enemySprite.displayHeight/2,cols:1,rows:1,cell:scene.enemySprite.displayWidth});
  if(!RealmModel.canEdit)return null;
  if(!this.seen.has('pack')&&(!scene.compact||scene.view==='pack'))return canvas('pack',scene.pack);
  if(!this.seen.has('inspect')&&(scene.hovered||RealmModel.selected))return get('inspect','#details');
  if(state.stash.length&&!this.seen.has('stash'))return scene.compact&&scene.view!=='stash'?get('stash','[data-view="stash"]'):canvas('stash',scene.stash);
  return null;
 },
 bounds(context){
  let rect;if(context.element){const r=context.element.getBoundingClientRect();if(!r.width||!r.height)return null;rect={left:r.left,top:r.top,right:r.right,bottom:r.bottom};const scroller=context.element.closest('#campaign-content');if(scroller){const s=scroller.getBoundingClientRect();rect.top=Math.max(rect.top,s.top);rect.bottom=Math.min(rect.bottom,s.bottom);rect.left=Math.max(rect.left,s.left);rect.right=Math.min(rect.right,s.right)}}
  else{const r=document.querySelector('#game canvas').getBoundingClientRect(),s=window.realmScene.scale,b=context.board;rect={left:r.left+b.x*r.width/s.width,top:r.top+b.y*r.height/s.height,right:r.left+(b.x+b.cols*b.cell)*r.width/s.width,bottom:r.top+(b.y+b.rows*b.cell)*r.height/s.height}}
  rect.left=Math.max(4,rect.left);rect.top=Math.max(4,rect.top);rect.right=Math.min(innerWidth-4,rect.right);rect.bottom=Math.min(innerHeight-4,rect.bottom);return rect.right-rect.left>=8&&rect.bottom-rect.top>=8?rect:null;
 },
 showContext(){
  const context=this.context(),rect=context&&this.bounds(context);if(!context||!rect){this.hide();return}
  const changed=this.current?.id!==context.id||this.host.parentElement!==context.root;this.current=context;
  if(this.host.parentElement!==context.root)context.root.append(this.host);this.host.hidden=false;
  if(changed){document.getElementById('realm-guide-title').textContent=REALM_GUIDE_STEPS[context.id].title;document.getElementById('realm-guide-copy').textContent=REALM_GUIDE_STEPS[context.id].text;this.lastGeometry=''}
  this.card.style.width='';const baseWidth=this.card.offsetWidth,sideSpace=Math.max(rect.left,innerWidth-rect.right)-24;if(context.board&&sideSpace>=210&&sideSpace<baseWidth)this.card.style.width=Math.floor(sideSpace)+'px';
  const width=this.card.offsetWidth,height=this.card.offsetHeight,margin=12,cx=(rect.left+rect.right)/2,cy=(rect.top+rect.bottom)/2;
  const candidates=[{x:rect.right+margin,y:cy-height/2},{x:rect.left-width-margin,y:cy-height/2},{x:cx-width/2,y:rect.bottom+margin},{x:cx-width/2,y:rect.top-height-margin},{x:innerWidth-width-margin,y:innerHeight-height-80},{x:margin,y:margin+58}];
  const obstacles=[...document.querySelectorAll('header button,.run-actions button,.mobile-tabs button,dialog[open] button:not(#realm-guide-next):not(#realm-guide-off),dialog[open] select,dialog[open] input')].filter(n=>n.getClientRects().length).map(n=>n.getBoundingClientRect());
  const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.left,b.left))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top));let best,score=Infinity;
  for(const candidate of candidates){const x=Math.max(margin,Math.min(innerWidth-width-margin,candidate.x)),y=Math.max(margin,Math.min(innerHeight-height-margin,candidate.y)),box={left:x,top:y,right:x+width,bottom:y+height},penalty=overlap(box,rect)*20+obstacles.reduce((n,r)=>n+overlap(box,r),0)*2+Math.hypot(x+width/2-cx,y+height/2-cy)*.2;if(penalty<score){score=penalty;best={x,y,box}}}
  const geometry=[context.id,rect.left,rect.top,rect.right,rect.bottom,best.x,best.y,width,height].join('|');if(geometry===this.lastGeometry)return;this.lastGeometry=geometry;
  this.card.style.left=best.x+'px';this.card.style.top=best.y+'px';Object.assign(this.mark.style,{left:rect.left-3+'px',top:rect.top-3+'px',width:rect.right-rect.left+6+'px',height:rect.bottom-rect.top+6+'px'});
  const start={x:Math.max(best.x+10,Math.min(best.x+width-10,cx)),y:Math.max(best.y+10,Math.min(best.y+height-10,cy))};
  if(cx<best.x)start.x=best.x;else if(cx>best.x+width)start.x=best.x+width;else start.y=cy<best.y?best.y:best.y+height;
  const end={x:cx,y:cy};if(start.x<rect.left)end.x=rect.left;else if(start.x>rect.right)end.x=rect.right;else end.y=start.y<rect.top?rect.top:rect.bottom;
  this.arrow.setAttribute('viewBox',`0 0 ${innerWidth} ${innerHeight}`);this.arrow.querySelector('path').setAttribute('d',`M ${start.x} ${start.y} L ${end.x} ${end.y}`);
  const angle=Math.atan2(end.y-start.y,end.x-start.x),size=9;this.arrow.querySelector('polygon').setAttribute('points',`${end.x},${end.y} ${end.x-size*Math.cos(angle-.5)},${end.y-size*Math.sin(angle-.5)} ${end.x-size*Math.cos(angle+.5)},${end.y-size*Math.sin(angle+.5)}`);
 },
 hide(){if(!this.host)return;this.host.hidden=true;this.current=null;this.lastGeometry='';if(this.host.parentElement?.tagName==='DIALOG')document.getElementById('game').append(this.host)}
};
window.RealmGuide=RealmGuide;RealmGuide.init();
