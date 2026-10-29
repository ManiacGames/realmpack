'use strict';
const campaignDialog=document.getElementById('campaign-dialog'),campaignContent=document.getElementById('campaign-content');
let campaignReturn=null;
window.onRealmPresentation=function(view){
 if(!campaignDialog)return;
 const active=document.activeElement,focus=active?.id&&campaignDialog.contains(active)?{id:active.id,start:active.selectionStart,end:active.selectionEnd}:null;
 window.realmScene?.cancelDrag();campaignDialog.dataset.kind=view.kind;
 document.getElementById('campaign-title').textContent=window.realmPlainText?realmPlainText(view.title):view.title;
 document.getElementById('campaign-description').textContent=realmPlainText(view.desc||'').replace(view.kind==='shop'?/^\d+ gold\s*·\s*/:/^$/, '');
 campaignContent.innerHTML=view.body;
 const actions=document.getElementById('campaign-actions');actions.replaceChildren();
 const footer=campaignContent.querySelector('.shop-footer,.loot-footer,.loot-inspect-footer,.reference-pagination,.event-footer,.enchant-footer,.class-selection-footer,.catalogue-item-footer');if(footer)actions.append(footer);
 if(view.kind==='defeat'){const next=campaignContent.querySelector('.defeat-continue');if(next){next.classList.add('realm-primary');actions.append(next)}const extra=document.createElement('details');extra.className='death-extra';extra.innerHTML='<summary>Final loadout · '+s.items.length+' items</summary><div class=death-loadout>'+s.items.map(i=>'<div>'+spriteMarkup(defs[i.type].sprite,defs[i.type].name)+'<span>'+esc(defs[i.type].name)+'</span></div>').join('')+'</div>';campaignContent.append(extra);const facts=document.createElement('p');facts.className='death-location';facts.textContent=(ROOMS[s.room].dungeonName||dungeonDefs[ROOMS[s.room].dungeonId]?.name||ROOMS[s.room].name)+' · Final battle '+s.time.toFixed(1)+'s';campaignContent.querySelector('.defeat-progress')?.after(facts)}
 normalizeRealmActions(view.kind,actions);if(view.kind==='runmap')window.RealmAtlas?.decorate();
 campaignDialog.dataset.mapEmpty=String(view.kind==='runmap'&&!campaignContent.querySelector('.map-canvas'));
 campaignDialog.dataset.choiceCount=campaignContent.querySelectorAll('.event-choice').length;
 const state=RealmModel.state;document.getElementById('campaign-wallet').innerHTML=state?`<span class="wallet-meter hp" role="meter" aria-label="Health" aria-valuemin="0" aria-valuemax="${state.max}" aria-valuenow="${Math.max(0,Math.min(state.max,Math.ceil(state.hp)))}"><i style="width:${Math.max(0,Math.min(100,state.hp/state.max*100))}%"></i><b>HP ${Math.ceil(state.hp)}/${state.max}</b></span><span class="wallet-meter mp" role="meter" aria-label="Mana" aria-valuemin="0" aria-valuemax="${manaCapacity()}" aria-valuenow="${Math.max(0,Math.min(manaCapacity(),Math.floor(state.mana)))}"><i style="width:${Math.max(0,Math.min(100,state.mana/manaCapacity()*100))}%"></i><b>MP ${Math.floor(state.mana)}/${manaCapacity()}</b></span><span class="wallet-gold">◈ ${state.gold} gold</span><span class="wallet-depth">Depth ${state.room+1}</span>`:'';
 const manage=document.getElementById('campaign-pack');manage.disabled=!RealmModel.canEdit;manage.hidden=['catalogue','catalogueinspect','bestiaryinspect','classes','classconfirm','help','runmap','defeat','ending','eventResult'].includes(view.kind);
 for(const node of campaignContent.querySelectorAll('.map-node,.map-depth'))node.style.top=(parseFloat(node.style.top)/860*100)+'%';
 campaignContent.querySelectorAll('.map-canvas svg').forEach(svg=>svg.setAttribute('height','100%'));
 campaignReturn=null;if(view.kind==='confirm'&&state?.phase==='reward')campaignReturn=showSupplies;
 if(view.kind==='classes')queueMicrotask(()=>{if(modalKind==='classes')previewClass(classPreviewId)});
 const wasOpen=campaignDialog.open;if(!wasOpen)campaignDialog.showModal();if(view.kind==='eventResult')requestAnimationFrame(()=>{if(modalKind==='eventResult')actions.querySelector('.realm-primary')?.focus({preventScroll:true})});
 if(view.kind==='runmap')requestAnimationFrame(fitCampaignMap);
 if(focus){const field=document.getElementById(focus.id);field?.focus({preventScroll:true});if(typeof focus.start==='number'&&field?.setSelectionRange)try{field.setSelectionRange(focus.start,focus.end)}catch{}}
 window.syncRealmPause?.();window.updateRealmControls?.();
};
window.onRealmDismiss=function(){if(campaignDialog.open)campaignDialog.close();window.syncRealmPause?.();window.updateRealmControls?.()};
function normalizeRealmActions(kind,actions){
 const plainAdvance=/^(continueEvent|continueRewardSupplies|leaveShop|leaveSupplies|closeRunMap|continueRun|retryRun)\(/;
 for(const button of [...campaignContent.querySelectorAll(':scope>button')]){const code=button.getAttribute('onclick')||'';if(plainAdvance.test(code)||kind==='supplies'&&code==='showRewards()')actions.append(button)}
 for(const button of actions.querySelectorAll('button')){const code=button.getAttribute('onclick')||'',advance=plainAdvance.test(code)||code.startsWith('takeLoot(null)')||code.startsWith('commitRuneforge(')||code.startsWith('decideEnchant(true')||kind==='trade'&&s.activeEvent?.id==='merchant'&&code.startsWith("resolveEvent('leave')");button.classList.toggle('realm-primary',advance);if(code.startsWith("resolveEvent('leave')")&&!advance)button.classList.add('realm-decline')}
 if(kind==='enchanter'&&s.activeEvent?.enchantLockedItem&&!s.activeEvent.pendingEnchant){const leave=actions.querySelector('button[onclick="resolveEvent(\'leave\')"]');if(leave){leave.textContent='Continue ↗';leave.classList.add('realm-primary')}}
 for(const card of campaignContent.querySelectorAll('.event-choice')){const choice=card.querySelector('.event-choice-actions .gold');if(choice)choice.classList.add('realm-primary')}
 for(const wallet of campaignContent.querySelectorAll('.event-wallet')){if(!s.eventCursedHealth)wallet.remove()}
 const review=actions.querySelector('button[onclick="showSupplies()"]');if(review&&review.textContent==='Manage inventory')review.textContent='Review supplies';
}
function dismissCampaignView(){
 const kind=modalKind;if(kind==='catalogue'&&referenceFiltersOpen)return toggleReferenceFilters();if(kind==='classconfirm')return cancelClassStart();
 if(campaignReturn)return campaignReturn();
 if(kind==='rewardinspect')return showRewards();if(kind==='shopinspect')return showShop();if(kind==='eventdetails')return showEvent();
 if(kind==='catalogueinspect')return returnReference('catalogue');if(kind==='bestiaryinspect')return returnReference('bestiary');
 if(kind==='enchanter'&&s.activeEvent?.pendingEnchant){toast('Keep or replace the paid roll before leaving.');return}
 closeModal(true);
}
function manageCampaignInventory(){if(!RealmModel.canEdit)return;closeModal(true);window.realmNotice('Arrange your gear, then use the highlighted Continue button to return.');window.updateRealmControls()}
function restoreCampaignView(){if(RealmModel.mode==='campaign')restorePhaseModal()}
for(const type of ['click','change','input'])campaignContent.addEventListener(type,()=>queueMicrotask(()=>{RealmModel.revision++;window.updateRealmControls?.()}));
campaignDialog.addEventListener('cancel',event=>{event.preventDefault();dismissCampaignView()});
document.getElementById('campaign-close').onclick=dismissCampaignView;
document.getElementById('campaign-pack').onclick=manageCampaignInventory;
function showCampaignJournal(){modal('Combat journal','Most recent actions first.',`<div class="realm-journal">${RealmModel.journal.map(line=>'<p>'+esc(line)+'</p>').join('')||'<p>No actions yet.</p>'}</div><button onclick="closeModal(true)">Return to game</button>`,'help')}
function showRealmHelp(){modal('How to play','Pack. Fight. Descend.',`<div class="quick-guide"><p><b>Pack:</b> backpack gear activates; stash gear stays inactive. Touching edges can grant bonuses.</p><p><b>Fight:</b> start a battle, then choose loot and supplies. Health persists between rooms.</p><p><b>Descend:</b> follow connected routes through five dungeons. Shops, events and bosses build your loadout.</p><p><b>Item icons:</b> base recipe amounts: sword = damage, grey shield = block, heart = healing, blue crystal = mana. % marks support bonuses; s marks seconds. Special effects and modifiers are in Full details.</p><p><b>Controls:</b> drag items · R rotates hovered/dragged gear · right-click rotates · S stash · F details · D discard · I catalogue · E bestiary · Esc menu.</p></div><button onclick="closeModal(true)">Return to game</button>`,'help')}
showHelp=showRealmHelp;
function showRealmCombatInfo(){const c=classes[s.classId],room=ROOMS[s.room],enemy=encounterDefs[room.encounterId];modal(c.name+' · '+c.title,c.desc,`<p>${esc(c.rule)}</p><hr><h2>${esc(room.enemy||room.name)}</h2><p>${esc(enemy?encounterProfileDescription(enemy):eventRouteSummary(room.eventId)||room.type)}</p>${dungeonDifficultyBadge(room.dungeonId)}<button onclick="closeModal(true)">Return to game</button>`,'help')}
function resizeRealmReferences(){const count=innerHeight<500?2:innerWidth>=1100?(innerHeight>=900?12:9):innerWidth>=700?6:4;referenceSizes.catalogue=count;referenceSizes.bestiary=count}
resizeRealmReferences();window.addEventListener('resize',()=>{resizeRealmReferences();if(campaignDialog.open&&modalKind==='catalogue'){if(bestiaryOpen)drawBestiary();else drawCatalogue()}});

function fitCampaignMap(){const canvas=campaignContent.querySelector('.map-canvas');if(!canvas)return;const extras=campaignContent.scrollHeight-canvas.offsetHeight;canvas.style.height=Math.max(140,campaignContent.clientHeight-extras-8)+'px';window.RealmAtlas?.layout();window.RealmGuide?.refresh()}
window.addEventListener('resize',()=>{if(modalKind==='runmap')requestAnimationFrame(fitCampaignMap)});
for(const type of ['click','change','input'])document.getElementById('campaign-actions').addEventListener(type,()=>queueMicrotask(()=>{RealmModel.revision++;window.updateRealmControls?.()}));
