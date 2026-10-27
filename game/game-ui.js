/* Game presentation only. Original inventory, combat, save and trading handlers stay in control. */
'use strict';
let gameInspectorPinned=false,gameInspectorTimer=0,gameInspectorQuietUntil=0,gameUiSounds=false,gameUiAudio=null;
function gameUiSetText(id,value){const el=document.getElementById(id);if(el&&el.textContent!==String(value))el.textContent=String(value)}
function gameUiSound(kind='click'){
 if(!gameUiSounds||document.hidden)return;
 try{const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;gameUiAudio??=new Audio();if(gameUiAudio.state==='suspended')gameUiAudio.resume();const o=gameUiAudio.createOscillator(),g=gameUiAudio.createGain(),t=gameUiAudio.currentTime;o.type='triangle';o.frequency.setValueAtTime(kind==='buy'?660:kind==='place'?330:440,t);o.frequency.exponentialRampToValueAtTime(kind==='buy'?880:220,t+.07);g.gain.setValueAtTime(.025,t);g.gain.exponentialRampToValueAtTime(.001,t+.09);o.connect(g);g.connect(gameUiAudio.destination);o.start(t);o.stop(t+.1)}catch{}
}
function toggleGameUiSounds(){gameUiSounds=!gameUiSounds;try{localStorage.setItem('realmpack-ui-sounds',String(gameUiSounds))}catch{}gameUiSound();screenMenu()}
function gameUiInspectorClose(){clearTimeout(gameInspectorTimer);gameInspectorPinned=false;document.documentElement.classList.remove('game-inspector-open');gameUiSetText('gameInspectorPin','Pin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed','false')}
function gameUiInspectorPin(){gameInspectorPinned=!gameInspectorPinned;gameUiSetText('gameInspectorPin',gameInspectorPinned?'Unpin':'Pin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed',String(gameInspectorPinned))}
function gameUiInspectorShow(target){
 if(innerWidth<=900||modalKind||inventoryDrag?.active||Date.now()<gameInspectorQuietUntil)return;
 clearTimeout(gameInspectorTimer);const root=document.documentElement,panel=document.querySelector('.layout>.right');if(!panel)return;
 screenTab('item');root.classList.add('game-inspector-open');
 if(!gameInspectorPinned){const r=target.getBoundingClientRect(),w=Math.min(330,innerWidth-24),x=r.right+w+16<innerWidth?r.right+10:Math.max(12,r.left-w-10);panel.style.left=x+'px';panel.style.top=Math.max(66,Math.min(innerHeight-panel.getBoundingClientRect().height-12,r.top-40))+'px'}
 screenReflow();
}
function gameUiJournal(){modal('Combat journal','Recent combat.',`<div>${logs.map(line=>`<p>${esc(line)}</p>`).join('')||'<p>No entries yet.</p>'}</div><button class="gold" onclick="restorePhaseModal()">Return to run</button>`,'help')}

function gameUiRefresh(){
 if(window.__TEST__||!s)return;
 gameUiSetText('gameHudClass',classes[s.classId].name);gameUiSetText('gameHudHealth','♥ '+Math.ceil(s.hp)+'/'+s.max);gameUiSetText('gameHudMana','✦ '+Math.round((s.phase==='prep'?eventOpeningMana():s.mana)*10)/10+'/'+(s.phase==='prep'?openingManaCapacity():manaCapacity()));gameUiSetText('gameHudGold','◈ '+s.gold);gameUiSetText('gameHudDepth','Dungeon '+(actIndex()%runDungeonCount()+1)+'/'+runDungeonCount()+' · '+(s.room+1)+'/'+runRoomCount());
 const e=s.enemy,r=ROOMS[s.room],el=document.getElementById('gameEnemyIntent');
 if(el&&e&&r){const vitals=document.getElementById('gameEnemyVitals');if(vitals){vitals.hidden=!e.max;gameUiSetText('gameEnemyVitals',Math.ceil(e.hp)+' / '+e.max+' HP'+(e.ward>0?' + '+Math.ceil(e.ward)+' ward':'')+((r.waves||1)>1?' · Wave '+e.wave+'/'+r.waves:'')+(e.phaseTwo?' · Phase II':''))}el.hidden=!e.max||!['prep','fight'].includes(s.phase);if(!el.hidden){const profiles=enemyProfiles(),attack=e.attacks+1;let hit=e.damage+Math.max(0,Math.floor((s.time-30)/10)+1)*5;if(profiles.includes('raider')&&attack%3===0)hit*=encounterTuning(r).heavyStrike||1.5;if(profiles.includes('berserker')&&e.hp<=e.max/2)hit*=1.25;const rate=(e.chill>0?1/1.35:1)*(profiles.includes('berserker')&&e.hp<e.max/2?1.25:1),time=Math.max(0,(e.cd-e.charge)/rate)+(e.frozen||0),text='⚔ '+Math.round(hit)+(profiles.includes('duelist')&&attack%4===0?' ×2':'')+' base hit · '+(s.phase==='fight'?time.toFixed(1)+'s':e.cd.toFixed(1)+'s cycle')+(r.type==='boss'?' · 15% pierce':r.type==='elite'?' · 8% pierce':'');if(el.textContent!==text)el.textContent=text}}

}
if(!window.__TEST__){
 document.documentElement.classList.add('game-ui');try{gameUiSounds=localStorage.getItem('realmpack-ui-sounds')==='true'}catch{}
 const header=document.querySelector('header'),hud=document.createElement('div');hud.className='game-hud';hud.setAttribute('aria-label','Run resources');hud.innerHTML='<span id="gameHudClass"></span><span id="gameHudHealth" title="Current / maximum health"></span><span id="gameHudMana" title="Mana / capacity"></span><span id="gameHudGold" title="Gold"></span><small id="gameHudDepth"></small>';header.insertBefore(hud,header.querySelector('.topright'));
 const bar=document.createElement('div');bar.className='game-inspector-controls';bar.innerHTML='<span>Item card</span><button id="gameInspectorPin" aria-pressed="false" onclick="gameUiInspectorPin()">Pin</button><button aria-label="Close inspection" onclick="gameUiInspectorClose()">Close</button>';document.querySelector('.layout>.right').prepend(bar);
 const intent=document.createElement('div');intent.id='gameEnemyIntent';intent.className='game-enemy-intent';intent.title='Next normal attack before player mitigation. Future phase changes, extra pulses and dodges can change the result.';intent.hidden=true;const vitals=document.createElement('small');vitals.id='gameEnemyVitals';vitals.className='game-enemy-vitals';document.getElementById('estats').after(vitals,intent);
 const originalDetail=renderDetail;renderDetail=function(){originalDetail();if(innerWidth>900){const adj=document.querySelector('#detail .inspection-adjacency'),text=adj?.querySelector('.adjacency-live-summary')?.textContent||'';if(adj)adj.hidden=/^(No incoming|Stashed)/.test(text)}};
 const originalStats=updateStats;updateStats=function(){originalStats();gameUiRefresh()};const originalRender=render;render=function(){originalRender();gameUiRefresh()};
 const originalMenu=screenMenu;screenMenu=function(){originalMenu();const menu=document.querySelector('.screen-menu');if(menu){const journal=document.createElement('button');journal.textContent='Combat journal';journal.onclick=()=>{closeModal(true);gameUiJournal()};menu.append(journal);const sound=document.createElement('button');sound.textContent='UI sounds: '+(gameUiSounds?'On':'Off');sound.setAttribute('aria-pressed',String(gameUiSounds));sound.onclick=toggleGameUiSounds;menu.append(sound)}};
 document.querySelector('.screen-menu-button').onclick=()=>screenMenu();
 const originalView=screenView;screenView=function(view){if(innerWidth>900&&view==='details'){document.documentElement.classList.add('game-inspector-open');gameInspectorPinned=true;const p=document.querySelector('.layout>.right');p.style.left=Math.max(12,innerWidth-350)+'px';p.style.top='66px';gameUiSetText('gameInspectorPin','Unpin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed','true')}originalView(view)};
 const originalTab=screenTab;screenTab=function(tab){if(innerWidth>900&&tab==='journal')screenView('details');originalTab(tab)};
 const originalFresh=freshRun;freshRun=function(...args){gameUiInspectorClose();return originalFresh(...args)};
 const originalDetails=showItemDetails;showItemDetails=function(id){if(innerWidth>900){gameInspectorPinned=true;document.documentElement.classList.add('game-inspector-open');gameUiSetText('gameInspectorPin','Unpin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed','true')}return originalDetails(id)};
 const originalBuy=buy;buy=function(id){const gold=s?.gold;const result=originalBuy(id);if(s&&s.gold<gold)gameUiSound('buy');return result};
 const selector='.item,#stash [data-item-id]';let downItem=null;
 document.addEventListener('pointerover',e=>{const target=e.target.closest(selector);if(target&&e.pointerType!=='touch')gameUiInspectorShow(target);else if(e.target.closest('.layout>.right'))clearTimeout(gameInspectorTimer)});
 const scheduleHide=()=>{clearTimeout(gameInspectorTimer);if(!gameInspectorPinned)gameInspectorTimer=setTimeout(()=>{if(!gameInspectorPinned)document.documentElement.classList.remove('game-inspector-open')},180)};
 document.addEventListener('pointerout',e=>{if(e.target.closest(selector+',.layout>.right')&&!e.relatedTarget?.closest(selector+',.layout>.right'))scheduleHide()});
 document.addEventListener('focusin',e=>{const target=e.target.closest(selector);if(target)gameUiInspectorShow(target)});
 document.addEventListener('pointerdown',e=>{const t=e.target.closest(selector);if(t){gameUiInspectorClose();const id=Number(t.dataset.itemId||t.id.replace(/^item/,'')),i=[...s.items,...s.stash].find(i=>i.id===id);downItem=i?{id:i.id,x:i.x,y:i.y,rot:i.rot,stash:s.stash.includes(i)}:null}});
 document.addEventListener('pointerup',()=>{if(inventoryDrag?.active){gameInspectorQuietUntil=Date.now()+250;gameUiInspectorClose()}},true);
 document.addEventListener('pointerup',()=>{if(downItem){const i=[...s.items,...s.stash].find(i=>i.id===downItem.id);if(i&&(i.x!==downItem.x||i.y!==downItem.y||i.rot!==downItem.rot||s.stash.includes(i)!==downItem.stash))gameUiSound('place');downItem=null}});
 document.addEventListener('click',e=>{const t=e.target.closest(selector);if(t&&!inventoryDrag?.active&&!inventorySuppressClick&&Date.now()>=gameInspectorQuietUntil){gameUiInspectorShow(t);if(innerWidth>900){gameInspectorPinned=true;gameUiSetText('gameInspectorPin','Unpin');document.getElementById('gameInspectorPin')?.setAttribute('aria-pressed','true')}}});
 document.addEventListener('keydown',e=>{if(e.key==='Escape')gameUiInspectorClose()});window.addEventListener('resize',gameUiInspectorClose);gameUiRefresh();
}
