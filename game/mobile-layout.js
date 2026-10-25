/* Presentation only: no inventory, combat or saved-route mutations. */
const mobileLayoutQuery=window.__TEST__?null:window.matchMedia('(max-width:550px), (max-width:900px) and (pointer:coarse)');
function mobileLayoutActive(){return !window.__TEST__&&!!mobileLayoutQuery?.matches}
if(!window.__TEST__){
 const originalMapPreview=previewMapConnections;
 previewMapConnections=function(button){
  originalMapPreview(button);
  if(!mobileLayoutActive())return;
  const caption=button.closest('.run-map-modal')?.querySelector('.map-caption');
  if(caption){caption.textContent=button.getAttribute('aria-label').replace(' · Preview connections','');caption.setAttribute('role','status')}
 };
 const originalHelp=showHelp;
 showHelp=function(){originalHelp();if(!mobileLayoutActive())return;const controls=document.querySelector('.quick-controls');if(controls)controls.textContent='Drag to move · Rotate turns selected gear · Drag into the stash to store. Tap characters for details.';const combo=document.querySelector('.quick-guide>div:nth-child(2) p');if(combo)combo.textContent='Touching edges can grant bonuses. Tap gear, then open Details to inspect.';screenReflow()};
 const originalHints=updateGameplayHints;
 const originalPackVisible=visualPackVisible;
 visualPackVisible=function(){return originalPackVisible()||(mobileLayoutActive()&&innerWidth<=550&&innerHeight>=600&&!document.hidden&&!modalKind&&document.documentElement.dataset.playView==='battle')};
 const touchTips={pack:'Backpack gear is active. Tap to select; drag to move. Rotate turns selected gear.',stash:'Drag spare gear into the stash. Drag it back into the pack to equip it.',adjacency:'Place items beside each other to activate their adjacency bonuses.',class:'Tap your character or enemy for details. Off-class gear is slower.',combat:'Full bar = ready. Move gear between fights.'};
 updateGameplayHints=function(){originalHints();if(mobileLayoutActive()){const card=$('gameplayHint'),text=touchTips[card?.dataset.tip];if(text)card.querySelector('p').textContent=text;const pane=document.querySelector('.stash-pane'),toggle=pane?.querySelector('.mobile-stash-toggle');if(toggle){const folded=pane.classList.contains('mobile-stash-collapsed')||document.documentElement.classList.contains('has-gameplay-hint');toggle.textContent=folded?'Show':'Hide';toggle.setAttribute('aria-expanded',String(!folded))}}};
 function syncMobileControls(){
  const pane=document.querySelector('.stash-pane');if(!pane)return;
  let toggle=pane.querySelector('.mobile-stash-toggle');
  if(!mobileLayoutActive()){
   toggle?.remove();pane.classList.remove('mobile-stash-collapsed');
   const card=$('gameplayHint');if(card){delete card.dataset.tip;originalHints()}return;
  }
  if(!toggle){toggle=document.createElement('button');toggle.type='button';toggle.className='mobile-stash-toggle';toggle.setAttribute('aria-controls','stash');toggle.onclick=()=>{if(document.documentElement.classList.contains('has-gameplay-hint')){dismissGameplayHint();pane.classList.remove('mobile-stash-collapsed')}else pane.classList.toggle('mobile-stash-collapsed');syncMobileControls()};pane.querySelector('.panelhead').append(toggle)}
  const collapsed=pane.classList.contains('mobile-stash-collapsed')||document.documentElement.classList.contains('has-gameplay-hint');toggle.textContent=collapsed?'Show':'Hide';toggle.setAttribute('aria-expanded',String(!collapsed));
  updateGameplayHints();
 }
 mobileLayoutQuery.addEventListener('change',syncMobileControls);
 syncMobileControls();
}
