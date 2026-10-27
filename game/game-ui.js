/* Game presentation only. Original inventory, combat, save and trading handlers stay in control. */
'use strict';
let gameInspectorPinned=false,gameInspectorTimer=0,gameInspectorQuietUntil=0,gameInspectorRestoreTimer=0,gameUiSounds=false,gameUiVolume=50,gameUiAudio=null;
function gameUiSetText(id,value){const el=document.getElementById(id);if(el&&el.textContent!==String(value))el.textContent=String(value)}
function gameUiSound(kind='click'){
 if(!gameUiSounds||gameUiVolume<=0||document.hidden)return;
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;gameUiAudio??=new Audio();if(gameUiAudio.state==='suspended')gameUiAudio.resume();const o=gameUiAudio.createOscillator(),g=gameUiAudio.createGain(),t=gameUiAudio.currentTime;o.type='triangle';o.frequency.setValueAtTime(kind==='buy'?660:kind==='place'?330:440,t);o.frequency.exponentialRampToValueAtTime(kind==='buy'?880:220,t+.07);g.gain.setValueAtTime(.05*gameUiVolume/100,t);g.gain.exponentialRampToValueAtTime(.00001,t+.09);o.connect(g);g.connect(gameUiAudio.destination);o.start(t);o.stop(t+.1)}catch{}
}
function setGameUiVolume(value){const number=Number(value);if(!Number.isFinite(number))return false;gameUiVolume=Math.max(0,Math.min(100,Math.round(number)));try{localStorage.setItem('realmpack-ui-volume',String(gameUiVolume))}catch{}gameUiSetText('gameUiVolumeOutput',gameUiVolume+'%');const slider=document.getElementById('gameUiVolume');if(slider){slider.value=String(gameUiVolume);slider.setAttribute('aria-valuetext',gameUiVolume===0?'Muted':gameUiVolume+' percent')}return true}
function gameUiHotkeyItem(){const el=document.querySelector('.item:hover,#stash [data-item-id]:hover')||document.activeElement?.closest?.('.item,#stash [data-item-id]');if(el){const id=Number(el.dataset.itemId||el.id.replace(/^item/,''));return [...s.items,...s.stash].find(i=>i.id===id)}if(document.querySelector('.layout>.right:hover'))return findInspected();return findSelected()}
function gameUiKeyboard(e){
 if(e.defaultPrevented||e.isComposing||e.ctrlKey||e.metaKey||e.altKey)return;
 const typing=!!e.target.closest?.('input,select,textarea,[contenteditable]:not([contenteditable="false"]),[role="textbox"]'),key=e.key.toLowerCase(),handled=()=>{e.preventDefault();e.stopImmediatePropagation()};
 if(e.key==='Escape'){
  if(e.repeat){handled();return}
  if(document.querySelector('#overlay .game-shortcuts')){handled();screenMenu();return}
  if(modalKind==='menu'){handled();closeModal();return}
  if(modalKind){if(typing){handled();if(catalogueOpen)closeCatalogue();else if(bestiaryOpen)closeBestiary();else closeModal()}return}
  if(typing)return;
  handled();if(document.documentElement.classList.contains('game-inspector-open'))gameUiInspectorClose();else screenMenu();return;
 }
 if(typing||e.repeat||modalKind||inventoryDrag||!s)return;
 if(key==='d'){const item=findSelected();if(s.phase==='prep'&&item){handled();inventoryCancel();discardSelected(item.id)}}
 else if(key==='f'){const item=gameUiHotkeyItem();if(item){handled();showItemDetails(item.id)}}
 else if(key==='i'){handled();inventoryCancel();openCatalogue()}
 else if(key==='e'){handled();inventoryCancel();openBestiary()}
}
function showGameUiHotkeys(){modal('Keyboard shortcuts','Available outside typing fields.',`<table class="game-hotkeys"><thead><tr><th scope="col">Key</th><th scope="col">Action</th></tr></thead><tbody>${[['R','Rotate'],['S','Backpack → stash'],['D','Discard selected (confirm)'],['F','Hovered/focused item details'],['I','Item catalogue'],['E','Encounter bestiary'],['Esc','Back/cancel; Menu when clear']].map(([key,action])=>`<tr><th scope="row"><kbd>${key}</kbd></th><td>${action}</td></tr>`).join('')}</tbody></table><button class="gold" onclick="screenMenu()">Back to menu</button>`,'help');document.querySelector('#overlay .modal')?.classList.add('game-shortcuts')}
function toggleGameUiSounds(){gameUiSounds=!gameUiSounds;try{localStorage.setItem('realmpack-ui-sounds',String(gameUiSounds))}catch{}gameUiSound();screenMenu()}
function gameUiInspectorClose(){clearTimeout(gameInspectorTimer);clearTimeout(gameInspectorRestoreTimer);gameInspectorPinned=false;document.documentElement.classList.remove('game-inspector-open');gameUiSetText('gameInspectorPin','Pin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed','false')}
function gameUiInspectorPin(){gameInspectorPinned=!gameInspectorPinned;gameUiSetText('gameInspectorPin',gameInspectorPinned?'Unpin':'Pin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed',String(gameInspectorPinned))}
function gameUiInspectorShow(target){
 if(innerWidth<=900||modalKind||inventoryDrag||Date.now()<gameInspectorQuietUntil)return;
 clearTimeout(gameInspectorTimer);const root=document.documentElement,panel=document.querySelector('.layout>.right');if(!panel)return;
 screenTab('item');root.classList.add('game-inspector-open');
 gameUiInspectorPosition(target);
 screenReflow();
}
function gameUiInspectorPosition(target){
 const panel=document.querySelector('.layout>.right');if(innerWidth<=900||!panel||!target||!document.documentElement.classList.contains('game-inspector-open'))return;
 const r=target.getBoundingClientRect(),w=Math.min(330,innerWidth-24),x=r.right+w+16<innerWidth?r.right+10:Math.max(12,r.left-w-10);panel.style.left=x+'px';panel.style.top=Math.max(66,Math.min(innerHeight-panel.getBoundingClientRect().height-12,r.top-40))+'px';
}
function gameUiInspectorTarget(id=findInspected()?.id){return document.getElementById('item'+id)||document.querySelector('#stash [data-item-id="'+id+'"]')}
function gameUiJournal(){modal('Combat journal','Recent combat.',`<div>${logs.map(line=>`<p>${esc(line)}</p>`).join('')||'<p>No entries yet.</p>'}</div><button class="gold" onclick="restorePhaseModal()">Return to run</button>`,'help')}

function gameUiRefresh(){
 if(window.__TEST__||!s)return;
 gameUiSetText('gameHudClass',classes[s.classId].name);gameUiSetText('gameHudHealth','♥ '+Math.ceil(s.hp)+'/'+s.max);gameUiSetText('gameHudMana','✦ '+Math.round((s.phase==='prep'?eventOpeningMana():s.mana)*10)/10+'/'+(s.phase==='prep'?openingManaCapacity():manaCapacity()));gameUiSetText('gameHudGold','◈ '+s.gold);gameUiSetText('gameHudDepth','Dungeon '+(actIndex()%runDungeonCount()+1)+'/'+runDungeonCount()+' · '+(s.room+1)+'/'+runRoomCount());
 const e=s.enemy,r=ROOMS[s.room],el=document.getElementById('gameEnemyIntent');
 if(el&&e&&r){const vitals=document.getElementById('gameEnemyVitals');if(vitals){vitals.hidden=!e.max;gameUiSetText('gameEnemyVitals',Math.ceil(e.hp)+' / '+e.max+' HP'+(e.ward>0?' + '+Math.ceil(e.ward)+' ward':'')+((r.waves||1)>1?' · Wave '+e.wave+'/'+r.waves:'')+(e.phaseTwo?' · Phase II':''))}el.hidden=!e.max||!['prep','fight'].includes(s.phase);if(!el.hidden){const profiles=enemyProfiles(),attack=e.attacks+1;let hit=e.damage+Math.max(0,Math.floor((s.time-30)/10)+1)*5;if(profiles.includes('raider')&&attack%3===0)hit*=encounterTuning(r).heavyStrike||1.5;if(profiles.includes('berserker')&&e.hp<=e.max/2)hit*=1.25;const rate=(e.chill>0?1/1.35:1)*(profiles.includes('berserker')&&e.hp<e.max/2?1.25:1),time=Math.max(0,(e.cd-e.charge)/rate)+(e.frozen||0),text='⚔ '+Math.round(hit)+(profiles.includes('duelist')&&attack%4===0?' ×2':'')+' base hit · '+(s.phase==='fight'?time.toFixed(1)+'s':e.cd.toFixed(1)+'s cycle')+(r.type==='boss'?' · 15% pierce':r.type==='elite'?' · 8% pierce':'');if(el.textContent!==text)el.textContent=text}}

}
if(!window.__TEST__){
 document.documentElement.classList.add('game-ui');try{gameUiSounds=localStorage.getItem('realmpack-ui-sounds')==='true';const savedVolume=localStorage.getItem('realmpack-ui-volume');if(savedVolume!==null&&savedVolume.trim()!==''&&Number.isFinite(Number(savedVolume)))gameUiVolume=Math.max(0,Math.min(100,Math.round(Number(savedVolume))))}catch{}
 const header=document.querySelector('header'),hud=document.createElement('div');hud.className='game-hud';hud.setAttribute('aria-label','Run resources');hud.innerHTML='<span id="gameHudClass"></span><span id="gameHudHealth" title="Current / maximum health"></span><span id="gameHudMana" title="Mana / capacity"></span><span id="gameHudGold" title="Gold"></span><small id="gameHudDepth"></small>';header.insertBefore(hud,header.querySelector('.topright'));
 const bar=document.createElement('div');bar.className='game-inspector-controls';bar.innerHTML='<span>Item card</span><button id="gameInspectorPin" aria-pressed="false" onclick="gameUiInspectorPin()">Pin</button><button aria-label="Close inspection" onclick="gameUiInspectorClose()">Close</button>';document.querySelector('.layout>.right').prepend(bar);
 const intent=document.createElement('div');intent.id='gameEnemyIntent';intent.className='game-enemy-intent';intent.title='Next normal attack before player mitigation. Future phase changes, extra pulses and dodges can change the result.';intent.hidden=true;const vitals=document.createElement('small');vitals.id='gameEnemyVitals';vitals.className='game-enemy-vitals';document.getElementById('estats').after(vitals,intent);
 const originalDetail=renderDetail;renderDetail=function(){originalDetail();if(innerWidth>900){const adj=document.querySelector('#detail .inspection-adjacency'),text=adj?.querySelector('.adjacency-live-summary')?.textContent||'';if(adj)adj.hidden=/^(No incoming|Stashed)/.test(text)}};
 const originalStats=updateStats;updateStats=function(){originalStats();gameUiRefresh()};const originalRender=render;render=function(){originalRender();gameUiRefresh();gameUiInspectorPosition(gameUiInspectorTarget())};
 const originalMenu=screenMenu;screenMenu=function(){originalMenu();const menu=document.querySelector('.screen-menu');if(menu){const journal=document.createElement('button');journal.textContent='Combat journal';journal.onclick=()=>{closeModal(true);gameUiJournal()};menu.append(journal);const sound=document.createElement('button');sound.textContent='UI sounds: '+(gameUiSounds?'On':'Off');sound.setAttribute('aria-pressed',String(gameUiSounds));sound.onclick=toggleGameUiSounds;menu.append(sound);const volume=document.createElement('label');volume.className='game-volume-control';volume.innerHTML=`<span>Sound volume <output id="gameUiVolumeOutput" for="gameUiVolume">${gameUiVolume}%</output></span><input id="gameUiVolume" aria-label="Sound volume" aria-valuetext="${gameUiVolume===0?'Muted':gameUiVolume+' percent'}" type="range" min="0" max="100" step="1" value="${gameUiVolume}">`;volume.querySelector('input').oninput=e=>setGameUiVolume(e.target.value);volume.querySelector('input').onchange=()=>gameUiSound();menu.append(volume);const keys=document.createElement('button');keys.textContent='Keyboard shortcuts';keys.onclick=showGameUiHotkeys;menu.append(keys)}};
 document.querySelector('.screen-menu-button').onclick=()=>screenMenu();
 const originalView=screenView;screenView=function(view){if(innerWidth>900&&view==='details'){document.documentElement.classList.add('game-inspector-open');gameInspectorPinned=true;const p=document.querySelector('.layout>.right');p.style.left=Math.max(12,innerWidth-350)+'px';p.style.top='66px';gameUiSetText('gameInspectorPin','Unpin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed','true')}originalView(view)};
 const originalTab=screenTab;screenTab=function(tab){if(innerWidth>900&&tab==='journal')screenView('details');originalTab(tab)};
 const originalFresh=freshRun;freshRun=function(...args){gameUiInspectorClose();return originalFresh(...args)};
 const originalBuy=buy;buy=function(id){const gold=s?.gold;const result=originalBuy(id);if(s&&s.gold<gold)gameUiSound('buy');return result};
 const selector='.item,#stash [data-item-id]';let downItem=null;
 document.addEventListener('pointerover',e=>{const target=e.target.closest(selector);if(target&&e.pointerType!=='touch')gameUiInspectorShow(target);else if(e.target.closest('.layout>.right'))clearTimeout(gameInspectorTimer)});
 const scheduleHide=()=>{clearTimeout(gameInspectorTimer);if(!gameInspectorPinned)gameInspectorTimer=setTimeout(()=>{const panel=document.querySelector('.layout>.right');if(!gameInspectorPinned&&!panel?.matches(':hover,:focus-within'))document.documentElement.classList.remove('game-inspector-open')},125)};
 document.addEventListener('pointerout',e=>{if(e.target.closest(selector+',.layout>.right')&&!e.relatedTarget?.closest(selector+',.layout>.right'))scheduleHide()});
 document.addEventListener('focusin',e=>{const target=e.target.closest(selector);if(target)gameUiInspectorShow(target);else if(e.target.closest('.layout>.right'))clearTimeout(gameInspectorTimer)});
 document.addEventListener('pointerdown',e=>{const t=e.target.closest(selector);if(t){const pinned=gameInspectorPinned,open=document.documentElement.classList.contains('game-inspector-open');gameUiInspectorClose();const id=Number(t.dataset.itemId||t.id.replace(/^item/,'')),i=[...s.items,...s.stash].find(i=>i.id===id);downItem=i?{id:i.id,x:i.x,y:i.y,rot:i.rot,stash:s.stash.includes(i),pinned,open,pointerType:e.pointerType}:null}});
 document.addEventListener('pointerup',()=>{if(inventoryDrag?.active){gameInspectorQuietUntil=Date.now()+250;gameUiInspectorClose()}},true);
 document.addEventListener('pointerup',()=>{if(downItem){const i=[...s.items,...s.stash].find(i=>i.id===downItem.id);if(i&&(i.x!==downItem.x||i.y!==downItem.y||i.rot!==downItem.rot||s.stash.includes(i)!==downItem.stash)){gameUiSound('place');const moved=downItem;if(moved.open&&moved.pointerType!=='touch')gameInspectorRestoreTimer=setTimeout(()=>{const target=gameUiInspectorTarget(moved.id);if(!target||modalKind||inventoryDrag||!s||(!moved.pinned&&!target.matches(':hover')))return;inspectItem(moved.id);gameInspectorPinned=moved.pinned;gameUiSetText('gameInspectorPin',moved.pinned?'Unpin':'Pin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed',String(moved.pinned));gameUiInspectorShow(target)},Math.max(0,gameInspectorQuietUntil-Date.now())+1)}downItem=null}});
 document.addEventListener('click',e=>{const t=e.target.closest(selector);if(t&&!inventoryDrag?.active&&!inventorySuppressClick&&Date.now()>=gameInspectorQuietUntil){gameUiInspectorShow(t);if(innerWidth>900){gameInspectorPinned=true;gameUiSetText('gameInspectorPin','Unpin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed','true')}}},true);
 document.addEventListener('focusout',e=>{if(e.target.closest('.layout>.right')&&!e.relatedTarget?.closest('.layout>.right'))scheduleHide()});
 document.addEventListener('keydown',gameUiKeyboard,true);window.addEventListener('resize',gameUiInspectorClose);gameUiRefresh();
}
