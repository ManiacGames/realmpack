'use strict';
window.realmPlainText=html=>{const el=document.createElement('div');el.innerHTML=html;return el.textContent.trim()};
window.realmNotice=message=>{document.getElementById('notice').textContent=message};
const byId=id=>document.getElementById(id),dialogs=[...document.querySelectorAll('dialog')];
function syncPause(){RealmModel.paused=dialogs.some(dialog=>dialog.open)||document.hidden}
function openRealmDialog(id){window.realmScene?.cancelDrag();byId(id).showModal();syncPause()}
for(const dialog of dialogs){dialog.addEventListener('close',syncPause);dialog.addEventListener('cancel',()=>queueMicrotask(syncPause));for(const close of dialog.querySelectorAll('[data-close]'))close.onclick=()=>dialog.close()}
document.addEventListener('visibilitychange',()=>{syncPause();RealmModel.accumulator=0});
window.updateRealmControls=()=>{const state=RealmModel.state;if(!state)return;byId('fight').disabled=state.phase!=='prep';byId('speed').textContent=RealmModel.speed+'×';const selectedItem=RealmModel.item(RealmModel.selected),item=RealmModel.item(window.realmScene?.inspected)||selectedItem;byId('rotate').disabled=!selectedItem||state.phase!=='prep';byId('stash-item').disabled=!selectedItem||!state.items.includes(selectedItem)||state.phase!=='prep';byId('discard').disabled=!selectedItem||state.phase!=='prep';byId('details').disabled=!item;byId('new-run').disabled=state.phase==='fight';};
function detailItem(){return RealmModel.item(window.realmScene?.inspected)||RealmModel.item(RealmModel.selected)}
function showRealmDetails(){const item=detailItem(),info=item&&RealmModel.inspect(item.id);if(!info)return;const d=info.definition;byId('item-title').textContent=d.name;byId('item-copy').innerHTML=`<p class="item-facts">${esc(d.tier)} · ${esc(d.kind)} · ${RealmModel.size(item).join('×')} cells · ${esc(info.timing)}${d.mana?' · '+d.mana+' mana':''}</p><p>${esc(window.realmPlainText(info.summary))}</p>${info.mechanic}${info.enchantments}${info.adjacency}${info.compatibility}${d.once?'<p>Stack: '+info.quantity+' · Uses remaining this battle: '+info.used+'</p>':''}`;openRealmDialog('item-details')}
let discardId=null;
function requestRealmDiscard(){const item=RealmModel.item(RealmModel.selected);if(!item||RealmModel.state.phase!=='prep')return;discardId=item.id;byId('discard-copy').textContent=RealmModel.definitions[item.type].name+(RealmModel.count(item)>1?' ×'+RealmModel.count(item):'');openRealmDialog('discard-confirm')}
byId('confirm-discard').onclick=()=>{if(RealmModel.discard(discardId)){window.realmScene.inspected=null;window.realmScene.rebuild();updateRealmControls()}byId('discard-confirm').close()};
byId('details').onclick=showRealmDetails;byId('discard').onclick=requestRealmDiscard;
byId('rotate').onclick=()=>{window.realmScene.cancelDrag();if(!RealmModel.rotate(RealmModel.selected))realmNotice('Rotation blocked · make room before rotating.');window.realmScene.rebuild();updateRealmControls()};
byId('stash-item').onclick=()=>{if(!RealmModel.stash(RealmModel.selected))realmNotice('Stash full · nine slots maximum.');window.realmScene.rebuild();updateRealmControls()};
byId('fight').onclick=()=>{if(RealmModel.start()){realmNotice('Battle · items activate automatically');updateRealmControls()}};
byId('speed').onclick=()=>{RealmModel.speed=RealmModel.speed===4?1:RealmModel.speed*2;updateRealmControls()};
byId('menu').onclick=()=>openRealmDialog('settings');
for(const button of document.querySelectorAll('[data-view]'))button.onclick=()=>{for(const other of document.querySelectorAll('[data-view]'))other.setAttribute('aria-selected',String(other===button));window.realmScene.setView(button.dataset.view)};
for(const c of RealmModel.classes())byId('class-choice').add(new Option(c.name,c.id));
for(const d of RealmModel.dungeons())byId('dungeon-choice').add(new Option(d.name,d.id));
byId('class-choice').value='knight';byId('dungeon-choice').value='dungeon_0';
byId('new-run').onclick=()=>{RealmModel.reset(byId('class-choice').value,byId('dungeon-choice').value);window.realmScene.inspected=null;window.realmScene.rebuild();updateRealmControls();byId('settings').close();realmNotice('Combat lab · one encounter · no production save changes')};
window.showRealmResult=()=>{if(byId('result').open)return;const won=RealmModel.state.phase==='reward';byId('result-title').textContent=won?'Victory!':'Dead!';byId('result-copy').textContent=won?'Choose one reward, then test your new loadout against another bout.':'Defeated by '+RealmModel.room.enemy+' after '+RealmModel.state.time.toFixed(1)+' seconds. Rearrange your pack and try again.';byId('loot').replaceChildren();if(won)for(const id of RealmModel.rewards){const d=RealmModel.definitions[id],button=document.createElement('button');button.textContent=d.name+' · '+window.realmPlainText(describe(d));button.onclick=()=>{if(RealmModel.loot(id)){byId('result').close();window.realmScene.rebuild();updateRealmControls();realmNotice('Reward added to stash · ready for another bout')}else realmNotice('Stash full · prepare another bout without a reward')};byId('loot').append(button)}openRealmDialog('result')};
byId('retry').onclick=()=>{RealmModel.retry();byId('result').close();window.realmScene.rebuild();updateRealmControls();realmNotice('Health restored · the same encounter is ready for testing')};
document.addEventListener('keydown',e=>{
 if(e.defaultPrevented||e.repeat||e.isComposing||e.ctrlKey||e.metaKey||e.altKey||e.target.closest('input,select,textarea,[contenteditable="true"]'))return;
 if(dialogs.some(dialog=>dialog.open))return;
 const key=e.key.toLowerCase();if(!['r','s','f','d','escape'].includes(key))return;e.preventDefault();
 if(key==='r')byId('rotate').click();if(key==='s')byId('stash-item').click();if(key==='f')showRealmDetails();if(key==='d')requestRealmDiscard();if(key==='escape'){if(window.realmScene.dragging||RealmModel.selected){window.realmScene.cancelDrag();selected=null;window.realmScene.paintSelection();updateRealmControls()}else openRealmDialog('settings')}
});
window.addEventListener('realm-ready',()=>{updateRealmControls();realmNotice('Drag to arrange · select an item for R rotate, S stash or F details')});
async function launchRealm(){try{if(!window.Phaser)throw Error('Phaser did not load. Run npm ci and npm run dev from the phaser folder.');await document.fonts.load('20px ChronoType');RealmModel.reset('knight','dungeon_0');window.realmGame=new Phaser.Game({type:Phaser.AUTO,parent:'game',backgroundColor:'#111a14',pixelArt:true,roundPixels:true,antialias:false,scale:{mode:Phaser.Scale.RESIZE,width:byId('game').clientWidth,height:byId('game').clientHeight},scene:RealmScene,input:{activePointers:2,touch:true},audio:{noAudio:true},fps:{target:60}})}catch(error){byId('load-error').hidden=false;byId('load-error').textContent=error.message}}
launchRealm();
