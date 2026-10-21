/* Viewport workspace. Secondary information is paged, never clipped out of reach. */
'use strict';
const screenPagers=new Set();
let screenPagerFrame=0;
function screenView(view){hideSpriteDetails();document.documentElement.dataset.playView=view;document.querySelectorAll('[data-play-view]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.playView===view)));screenReflow()}
function screenTab(tab){document.querySelectorAll('[data-info-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.infoTab===tab)));document.querySelectorAll('[data-info-pane]').forEach(p=>{p.hidden=p.dataset.infoPane!==tab});screenReflow()}
function screenFocus(){const el=document.activeElement;return el&&el!==document.body?{el,start:el.selectionStart,end:el.selectionEnd}:null}
function screenRestoreFocus(f){if(!f?.el.isConnected||!f.el.getClientRects().length)return;f.el.focus({preventScroll:true});if(typeof f.start==='number'&&f.el.setSelectionRange)f.el.setSelectionRange(f.start,f.end)}
function screenReflow(all=true){if(all)for(const pager of screenPagers)pager.dirty=true;cancelAnimationFrame(screenPagerFrame);screenPagerFrame=requestAnimationFrame(()=>{if(inventoryDrag?.active)return;const focus=screenFocus(),reference=document.querySelector('.reference-modal');if(reference)sizeReferenceBrowser(reference);for(const pager of screenPagers){if(!pager.host.isConnected){screenPagers.delete(pager);continue}if(pager.dirty&&pager.host.getBoundingClientRect().height){screenPaginate(pager);pager.dirty=false}}screenRestoreFocus(focus)})}
function screenPager(host){
 if(!host||host.dataset.screenPaged)return;
 for(const old of screenPagers)if(old.host===host)screenPagers.delete(old);
 host.dataset.screenPaged='true';host.classList.add('screen-paged');
 const nodes=[...host.childNodes],content=document.createElement('div'),nav=document.createElement('nav');content.className='screen-page-content';nav.className='screen-page-nav';nav.setAttribute('aria-label','Content pages');
 const prev=document.createElement('button'),label=document.createElement('span'),next=document.createElement('button');prev.textContent='← Previous';next.textContent='Next →';label.setAttribute('aria-live','polite');nav.append(prev,label,next);content.append(...nodes);host.replaceChildren(content,nav);
 const pager={host,content,nav,prev,label,next,nodes,page:0,pages:[],dirty:true};screenPagers.add(pager);
 const turn=delta=>{pager.page=Math.max(0,Math.min(pager.pages.length-1,pager.page+delta));screenShowPage(pager);(delta>0?next:prev).focus()};prev.onclick=()=>turn(-1);next.onclick=()=>turn(1);screenReflow(false)
}
function screenPaginate(p){
 p.nav.hidden=false;const height=p.content.clientHeight;if(height<30)return;
 const units=[];
 for(let node of p.nodes){
  if(node.nodeType===3){if(!node.textContent.trim())continue;const span=document.createElement('div');span.append(node);node=span}
  node.removeAttribute('data-screen-hidden');p.content.replaceChildren(node);
  if(p.content.scrollHeight>height+2&&!node.id&&node.children.length>1&&!node.matches('.classbox,button,select,svg,.loot-card,.class-card,.choice,.codex-card,.event-scene')){
   const children=[...node.childNodes].filter(n=>n.nodeType!==3||n.textContent.trim()),columns=getComputedStyle(node).display==='grid'?getComputedStyle(node).gridTemplateColumns.split(' ').length:1;
   for(let n=0;n<children.length;n+=columns){const wrap=node.cloneNode(false);wrap.append(...children.slice(n,n+columns));units.push(wrap)}
  }else units.push(node)
 }
 p.nodes=units;p.content.replaceChildren(...units);for(const n of units)n.setAttribute('data-screen-hidden','');
 let page=[];p.pages=[];
 for(const node of units){node.removeAttribute('data-screen-hidden');if(p.content.scrollHeight>height+2&&page.length){p.pages.push(page);for(const n of page)n.setAttribute('data-screen-hidden','');page=[]}page.push(node)}
 if(page.length)p.pages.push(page);if(!p.pages.length)p.pages=[[]];p.page=Math.min(p.page,p.pages.length-1);screenShowPage(p)
}
function screenShowPage(p){const visible=new Set(p.pages[p.page]||[]);for(const n of p.nodes){if(visible.has(n))n.removeAttribute('data-screen-hidden');else n.setAttribute('data-screen-hidden','')}p.label.textContent=(p.page+1)+' / '+p.pages.length;p.prev.disabled=p.page===0;p.next.disabled=p.page>=p.pages.length-1;p.nav.classList.toggle('single-page',p.pages.length===1)}
function screenFitModal(){
 const focus=screenFocus(),modal=document.querySelector('#overlay .modal');if(!modal||modal.dataset.screenFit)return;modal.dataset.screenFit='true';modal.classList.add('screen-modal');
 if(modalKind==='defeat'){modal.classList.add('defeat-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.querySelector('h1').id='defeatTitle';modal.setAttribute('aria-labelledby','defeatTitle');modal.querySelector('p').id='defeatCause';modal.setAttribute('aria-describedby','defeatCause');modal.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();modal.querySelector('.defeat-continue').focus()}});modal.querySelector('.defeat-continue')?.focus({preventScroll:true});return}
 if(modalKind==='help'){modal.classList.add('quick-help-modal');return}
 if(modalKind==='confirm'){modal.classList.add('compact-confirm-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.querySelector('h1').id='restartTitle';modal.setAttribute('aria-labelledby','restartTitle');modal.querySelector('p').id='restartDescription';modal.setAttribute('aria-describedby','restartDescription');modal.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const buttons=[...modal.querySelectorAll('button')],first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});modal.querySelector('#cancelRestart')?.focus({preventScroll:true});return}
 if(modal.querySelector('.reference-grid')){fitReferenceBrowser(modal);return}
 if(modalKind==='runmap'){fitSingleRunMap(modal);return}
 if(modal.classList.contains('classes-modal')){modal.classList.add('screen-class-modal');return}
 for(const node of modal.querySelectorAll('.map-node,.map-depth')){const y=parseFloat(node.style.top);node.style.top=(y/860*100)+'%'}
 for(const line of modal.querySelectorAll('.map-canvas line'))for(const key of ['y1','y2'])line.setAttribute(key,(parseFloat(line.getAttribute(key))/860*100)+'%');
 const nodes=[...modal.children],body=document.createElement('div');body.className='screen-modal-body';
 // Keep title, description and the final action/footer reachable on every page.
 const start=nodes.findIndex(n=>n.tagName==='H1')+2;const rest=nodes.slice(start),last=rest[rest.length-1];
 const footer=last&&(last.matches('button,.shop-footer,.loot-footer,.loot-inspect-footer,.pagination,.catalogue-note')||last.querySelector('button')&&last.children.length<4&&!last.matches('.choices,.class-grid,.shop-offers,.loot-grid'))?last:null;
 const description=nodes[start-1];if(description?.tagName==='P'&&description.getBoundingClientRect().height>52)body.append(description);
 for(const node of rest)if(node!==footer)body.append(node);modal.insertBefore(body,footer);screenPager(body);screenRestoreFocus(focus);
}
function fitReferenceBrowser(modal){
 modal.classList.add('reference-modal');document.getElementById('toast').style.display='none';const heading=document.createElement('div');heading.className='reference-heading';for(const node of [...modal.children].slice(0,3))heading.append(node);modal.prepend(heading);sizeReferenceBrowser(modal)
}
function sizeReferenceBrowser(modal){
 const grid=modal.querySelector('.reference-grid');if(!grid)return;const kind=grid.dataset.reference,r=grid.getBoundingClientRect();if(r.height<40||r.width<40)return;
 const columns=Math.max(1,Math.min(5,Math.floor((r.width+10)/270))),rows=Math.max(1,Math.floor((r.height+10)/(document.documentElement.dataset.largeText==='true'?188:154))),size=columns*rows;
 grid.style.setProperty('--reference-cols',columns);grid.style.setProperty('--reference-rows',rows);
 if(referenceSizes[kind]!==size){const oldSize=referenceSizes[kind],page=kind==='catalogue'?catalogueState.page:bestiaryPage;referenceSizes[kind]=size;const next=Math.floor(page*oldSize/size);if(kind==='catalogue'){catalogueState.page=next;drawCatalogue()}else{bestiaryPage=next;drawBestiary()}}
}
function fitSingleRunMap(modal){
 modal.classList.add('run-map-modal');
 const heading=document.createElement('header');heading.className='run-map-heading';for(const node of [...modal.children].slice(0,3))heading.append(node);
 const toolbar=document.createElement('div');toolbar.className='run-map-toolbar';for(const selector of ['.map-dungeon-rating','.map-legend']){const node=modal.querySelector(selector);if(node)toolbar.append(node)}
 const footer=document.createElement('footer');footer.className='run-map-footer';const caption=modal.querySelector('.map-caption'),back=modal.querySelector('button.gold');if(caption)footer.append(caption);if(back)footer.append(back);
 modal.prepend(heading,toolbar);modal.append(footer);
 for(const node of modal.querySelectorAll('.map-node,.map-depth'))node.style.top=(parseFloat(node.style.top)/860*100)+'%';
 for(const line of modal.querySelectorAll('.map-canvas line'))for(const key of ['y1','y2'])line.setAttribute(key,(parseFloat(line.getAttribute(key))/860*100)+'%')
}
function screenMenu(){modal('Run menu','Reference, settings and run controls.',`<div class="screen-menu"><button onclick="openCatalogue()">Item catalogue</button><button onclick="openBestiary()">Encounter bestiary</button><button onclick="showHelp()">Controls & synergies</button><button onclick="toggleLargeText();screenReflow()">Toggle larger text</button><button data-hints-toggle onclick="toggleGameplayHints()">Gameplay tips</button><button onclick="confirmRestart()">Start a new run</button></div><button onclick="closeModal()">Return to run</button>`,'menu')}
const spriteDetailsPanels={};
function positionSpriteDetails(key){
 const p=spriteDetailsPanels[key];if(!p||p.panel.hidden)return;const {trigger,panel}=p,r=trigger.getBoundingClientRect();if(!r.height){hideSpriteDetails(key);return}const width=panel.offsetWidth;
 let left,top,height=Math.min(Number(panel.dataset.fittedHeight)||360,innerHeight-16);
 if(r.left>=width+16){left=r.left-width-8;top=Math.max(8,Math.min(innerHeight-height-8,r.top))}
 else if(innerWidth-r.right>=width+16){left=r.right+8;top=Math.max(8,Math.min(innerHeight-height-8,r.top))}
 else {const below=innerHeight-r.bottom-16,above=r.top-16,useBelow=below>=above;height=Math.min(height,Math.max(120,useBelow?below:above));left=Math.max(8,Math.min(innerWidth-width-8,r.right-width));top=useBelow?r.bottom+8:r.top-height-8}
 panel.style.height=height+'px';panel.style.left=left+'px';panel.style.top=Math.max(8,top)+'px'
}
function showSpriteDetails(key,pin=false){
 const p=spriteDetailsPanels[key];if(!p||modalKind)return;
 for(const other of Object.keys(spriteDetailsPanels))if(other!==key)hideSpriteDetails(other);
 const {panel,trigger,host,title,nameId}=p;clearTimeout(p.timer);if(pin)p.pinned=true;delete panel.dataset.fittedHeight;panel.hidden=false;trigger.setAttribute('aria-expanded','true');title.textContent=document.getElementById(nameId).textContent;positionSpriteDetails(key);
 for(const pager of screenPagers)if(pager.host===host)pager.dirty=true;screenReflow(false);requestAnimationFrame(()=>{
  if(panel.hidden)return;const pager=[...screenPagers].find(pager=>pager.host===host);if(!pager||pager.pages.length!==1)return;
  const top=pager.content.getBoundingClientRect().top,bottom=Math.max(top,...[...pager.content.children].filter(n=>!n.hasAttribute('data-screen-hidden')).map(n=>n.getBoundingClientRect().bottom));
  panel.dataset.fittedHeight=String(Math.ceil(bottom-top+panel.firstElementChild.offsetHeight+20+pager.nav.offsetHeight+18));positionSpriteDetails(key);pager.dirty=true;screenReflow(false)
 })
}
function hideSpriteDetails(key,restoreFocus=false){
 if(!key){for(const id of Object.keys(spriteDetailsPanels))hideSpriteDetails(id);return}
 const p=spriteDetailsPanels[key];if(!p)return;clearTimeout(p.timer);p.pinned=false;p.panel.hidden=true;p.trigger.setAttribute('aria-expanded','false');
 if(restoreFocus){p.suppressFocus=true;p.trigger.focus({preventScroll:true});p.suppressFocus=false}
}
function scheduleSpriteDetailsHide(key){const p=spriteDetailsPanels[key];clearTimeout(p.timer);p.timer=setTimeout(()=>{if(!p.pinned&&!p.panel.matches(':hover')&&!p.trigger.matches(':hover')&&!p.panel.contains(document.activeElement)&&!p.trigger.contains(document.activeElement))hideSpriteDetails(key)},150)}
function initSpriteDetails({key,triggerId,nameId,label,selectors,sourcePager=false}){
 const trigger=document.getElementById(triggerId);if(!trigger)return;const panel=document.createElement('section');panel.id=key+'Details';panel.className='panel enemy-details '+key+'-details';panel.hidden=true;panel.setAttribute('role','dialog');panel.setAttribute('aria-labelledby',key+'DetailsName');
 panel.innerHTML=`<div class="panelhead"><h2 id="${key}DetailsName">${label}</h2><button aria-label="Close ${label.toLowerCase()}" onclick="hideSpriteDetails('${key}',true)">✕</button></div><div id="${key}DetailsBody"></div>`;
 const sources=selectors.map(selector=>document.querySelector(selector));for(const node of sources)panel.lastChild.append(node);document.body.append(panel);
 const host=sourcePager?sources[0]:panel.lastChild;const p={panel,trigger,nameId,title:panel.firstElementChild.firstElementChild,host,pinned:false,timer:0,suppressFocus:false};spriteDetailsPanels[key]=p;screenPager(host);
 trigger.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')showSpriteDetails(key)});trigger.addEventListener('pointerleave',()=>scheduleSpriteDetailsHide(key));
 trigger.addEventListener('focus',()=>{if(!p.suppressFocus)showSpriteDetails(key)});trigger.addEventListener('blur',()=>scheduleSpriteDetailsHide(key));trigger.addEventListener('click',()=>{if(p.pinned)hideSpriteDetails(key);else showSpriteDetails(key,true)});
 panel.addEventListener('pointerenter',()=>clearTimeout(p.timer));panel.addEventListener('pointerleave',()=>scheduleSpriteDetailsHide(key));panel.addEventListener('focusout',()=>scheduleSpriteDetailsHide(key));
 document.addEventListener('pointerdown',e=>{if(!panel.contains(e.target)&&!trigger.contains(e.target))hideSpriteDetails(key)});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden){e.preventDefault();e.stopImmediatePropagation();hideSpriteDetails(key,true)}},true);
 const observer=new MutationObserver(()=>{
  if(sourcePager){observer.disconnect();delete host.dataset.screenPaged;screenPager(host);observer.observe(host,{childList:true})}
  if(!panel.hidden){p.title.textContent=document.getElementById(nameId).textContent;for(const pager of screenPagers)if(pager.host===host)pager.dirty=true;screenReflow(false)}
 });for(const node of sources)observer.observe(node,{childList:true,subtree:!sourcePager});
 window.addEventListener('resize',()=>positionSpriteDetails(key));document.fonts?.ready.then(()=>positionSpriteDetails(key))
}
function showEnemyDetails(pin=false){showSpriteDetails('enemy',pin)}
function hideEnemyDetails(restoreFocus=false){hideSpriteDetails('enemy',restoreFocus)}
function showClassDetails(pin=false){showSpriteDetails('class',pin)}
function hideClassDetails(restoreFocus=false){hideSpriteDetails('class',restoreFocus)}
function initScreenLayout(){
 const layout=document.querySelector('.layout'),right=document.querySelector('.right');if(!layout||!right)return;
 const menu=document.createElement('button');menu.className='screen-menu-button';menu.textContent='Menu';menu.onclick=screenMenu;document.querySelector('.topright').append(menu);
 const nav=document.createElement('nav');nav.className='play-tabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Play view');nav.innerHTML=['battle','pack','details'].map((v,n)=>`<button role="tab" data-play-view="${v}" aria-selected="${n===1}" onclick="screenView('${v}')">${['Battle','Pack & stash','Details'][n]}</button>`).join('');layout.before(nav);
 const inspector=right.children[0],journal=right.children[1];inspector.dataset.infoPane='item';journal.dataset.infoPane='journal';journal.hidden=true;
 const tabbar=document.createElement('nav');tabbar.className='info-tabs';tabbar.setAttribute('role','tablist');tabbar.setAttribute('aria-label','Run information');tabbar.innerHTML=[['item','Item'],['journal','Journal']].map(([id,name])=>`<button role="tab" data-info-tab="${id}" aria-selected="${id==='item'}" onclick="screenTab('${id}')">${name}</button>`).join('');right.prepend(tabbar);
 initSpriteDetails({key:'enemy',triggerId:'enemySprite',nameId:'ename',label:'Encounter details',selectors:['#encounterInfo','#dungeonDifficulty']});
 initSpriteDetails({key:'class',triggerId:'playerSprite',nameId:'playerName',label:'Class information',selectors:['.classbox'],sourcePager:true});
 // Long explanations remain available in the guide, instead of occupying the playfield.
 const hints=document.createElement('button');hints.textContent='How to play';hints.onclick=showHelp;document.querySelector('.pack-pane .invfoot>div').append(hints);
 const detail=document.getElementById('detail'),log=document.getElementById('log');
 const watch=host=>{let observer;const refresh=()=>{observer.disconnect();delete host.dataset.screenPaged;screenPager(host);observer.observe(host,{childList:true});};observer=new MutationObserver(refresh);refresh()};watch(detail);watch(log);
 document.addEventListener('pointerdown',e=>{const filters=document.getElementById('referenceFilters'),toggle=document.getElementById('referenceFilterToggle');if(referenceFiltersOpen&&innerWidth<=700&&filters&&!filters.contains(e.target)&&!toggle.contains(e.target))toggleReferenceFilters()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(modalKind==='catalogueinspect'||modalKind==='bestiaryinspect')){e.preventDefault();e.stopImmediatePropagation();returnReference(modalKind==='catalogueinspect'?'catalogue':'bestiary');return}if(e.key==='Escape'&&referenceFiltersOpen&&innerWidth<=700&&document.querySelector('.reference-modal')){e.preventDefault();e.stopImmediatePropagation();toggleReferenceFilters();document.getElementById('referenceFilterToggle')?.focus()}},true);
 document.addEventListener('toggle',()=>screenReflow(),true);
 new MutationObserver(()=>{if(document.querySelector('#overlay .modal'))hideSpriteDetails();screenFitModal();screenReflow(false)}).observe(document.getElementById('overlay'),{childList:true});
 new ResizeObserver(screenReflow).observe(document.documentElement);window.addEventListener('resize',screenReflow);
 document.fonts?.ready.then(()=>screenReflow());
 document.documentElement.dataset.playView='pack';screenFitModal();screenReflow()
}
if(!window.__TEST__)initScreenLayout();
