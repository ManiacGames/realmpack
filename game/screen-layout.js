/* Viewport workspace. Secondary information is paged, never clipped out of reach. */
'use strict';
const screenPagers=new Set();
let screenPagerFrame=0;
function screenView(view){hideSpriteDetails();document.documentElement.dataset.playView=view;document.querySelectorAll('[data-play-view]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.playView===view)));screenReflow();if(typeof stopItemPulses==='function'&&!visualPackVisible())stopItemPulses();if(typeof updateStats==='function')updateStats();if(typeof flushJournal==='function')flushJournal()}
function screenTab(tab){document.querySelectorAll('[data-info-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.infoTab===tab)));document.querySelectorAll('[data-info-pane]').forEach(p=>{p.hidden=p.dataset.infoPane!==tab});screenReflow();if(typeof flushJournal==='function')flushJournal()}
function screenFocus(){const el=document.activeElement;return el&&el!==document.body?{el,start:el.selectionStart,end:el.selectionEnd}:null}
function screenRestoreFocus(f){if(!f?.el.isConnected||!f.el.getClientRects().length)return;f.el.focus({preventScroll:true});if(typeof f.start==='number'&&f.el.setSelectionRange)f.el.setSelectionRange(f.start,f.end)}
function screenReflow(all=true){if(all)for(const pager of screenPagers)pager.dirty=true;cancelAnimationFrame(screenPagerFrame);screenPagerFrame=requestAnimationFrame(()=>{if(inventoryDrag?.active)return;const focus=screenFocus(),reference=document.querySelector('.reference-modal');if(reference)sizeReferenceBrowser(reference);const offers=document.querySelector('.offer-modal');if(offers)sizeOfferModal(offers);for(const pager of screenPagers){if(!pager.host.isConnected){screenPagers.delete(pager);continue}if(pager.dirty&&pager.host.getBoundingClientRect().height){if(pager.host.closest('.adaptive-modal'))sizeAdaptiveModal(pager);screenPaginate(pager);pager.dirty=false}}screenRestoreFocus(focus)})}
function screenPager(host){
 if(!host||host.dataset.screenPaged)return;
 for(const old of screenPagers)if(old.host===host)screenPagers.delete(old);
 host.dataset.screenPaged='true';host.classList.add('screen-paged');
 const nodes=[...host.childNodes],content=document.createElement('div'),nav=document.createElement('nav');content.className='screen-page-content';nav.className='screen-page-nav';nav.setAttribute('aria-label','Content pages');
 const prev=document.createElement('button'),label=document.createElement('span'),next=document.createElement('button');prev.textContent='← Previous';next.textContent='Next →';label.setAttribute('aria-live','polite');nav.append(prev,label,next);content.append(...nodes);host.replaceChildren(content,nav);
 const pager={host,content,nav,prev,label,next,nodes,page:0,pages:[],dirty:true};screenPagers.add(pager);
 const turn=delta=>{pager.page=Math.max(0,Math.min(pager.pages.length-1,pager.page+delta));screenShowPage(pager);(delta>0?next:prev).focus()};prev.onclick=()=>turn(-1);next.onclick=()=>turn(1);screenReflow(false)
}
// Inspection changes frequently during combat. Measure all blocks together instead
// of forcing layout after inserting each block and each candidate page.
function screenPaginateInspection(p,height){
 const parts=node=>{
  if(node.nodeType!==1||node.id||node.matches('button,select,svg,.detailtitle,.stats'))return null;
  const children=[...node.childNodes].filter(n=>n.nodeType!==3||n.textContent.trim());
  if(children.length>1)return children.map(child=>{const shell=node.cloneNode(false);shell.append(child.cloneNode(true));return shell});
  const nested=children.length===1?parts(children[0]):null;
  return nested?.map(child=>{const shell=node.cloneNode(false);shell.append(child);return shell})||null
 };
 if(p.host.closest('.item-details-columns')){
  p.content.replaceChildren(...p.nodes);
  if(p.content.scrollWidth>p.content.clientWidth+2){sizeAdaptiveModal(p,false);return screenPaginateInspection(p,p.content.clientHeight)}
  p.pages=[p.nodes];p.page=0;screenShowPage(p);return true
 }
 let units=p.nodes;
 for(let pass=0;pass<8;pass++){
  for(const node of units)node.removeAttribute('data-screen-hidden');
  p.content.replaceChildren(...units);
  // No DOM writes between these reads: the browser needs only one layout.
  const sizes=units.map(node=>{const style=getComputedStyle(node);return node.getBoundingClientRect().height+(parseFloat(style.marginTop)||0)+(parseFloat(style.marginBottom)||0)});
  let split=false,unsupported=false;
  const next=[];
  for(let n=0;n<units.length;n++){
   if(sizes[n]>height+1){const pieces=parts(units[n]);if(pieces){next.push(...pieces);split=true;continue}unsupported=true}
   next.push(units[n])
  }
  if(unsupported)return false; // Retain word-level splitting on very short screens.
  if(split){units=next;continue}
  p.nodes=units;p.pages=[];let page=[],used=0;
  for(let n=0;n<units.length;n++){
   if(page.length&&used+sizes[n]>height+1){p.pages.push(page);page=[];used=0}
   page.push(units[n]);used+=sizes[n]
  }
  if(page.length)p.pages.push(page);if(!p.pages.length)p.pages=[[]];
  p.page=Math.min(p.page,p.pages.length-1);screenShowPage(p);return true
 }
 return false
}
function screenPaginate(p){
 p.nav.hidden=!!p.host.closest('.adaptive-modal')&&!p.host.closest('.adaptive-modal').classList.contains('dialog-paginated');let height=p.content.clientHeight;if(height<30)return;
 if((p.host.id==='detail'||modalKind==='itemdetails')&&screenPaginateInspection(p,height))return;
 height=p.content.clientHeight;
 const units=[];
 const collect=(node,depth=0,reserve=0)=>{
  if(node.nodeType===3){if(!node.textContent.trim())return;const span=document.createElement('div');span.append(node);node=span}
  node.removeAttribute('data-screen-hidden');p.content.replaceChildren(node);
  const oversized=p.content.scrollHeight>height-reserve+2;
  if(oversized&&!node.id&&depth<8&&!node.matches('.classbox,button,select,svg,.loot-card,.class-card,.codex-card,.event-scene')){
   const children=[...node.childNodes].filter(n=>n.nodeType!==3||n.textContent.trim());const style=getComputedStyle(node),inset=['paddingTop','paddingBottom','borderTopWidth','borderBottomWidth','marginTop','marginBottom'].reduce((sum,key)=>sum+(parseFloat(style[key])||0),0);
   if(node.children.length){
    const columns=getComputedStyle(node).display==='grid'?getComputedStyle(node).gridTemplateColumns.split(' ').length:1;
    if(columns>1){for(let n=0;n<children.length;n+=columns){const row=node.cloneNode(false);row.append(...children.slice(n,n+columns));units.push(row)}return}
    for(const child of children){const before=units.length;collect(child,depth+1,reserve+inset);const parts=units.splice(before);for(const part of parts){const shell=node.cloneNode(false);shell.append(part);units.push(shell)}}return
   }
   if(node.tagName==='P'&&node.textContent.trim()){
    const words=node.textContent.trim().split(/\s+/);let part=node.cloneNode(false);
    for(const word of words){const before=part.textContent;part.textContent+=(before?' ':'')+word;p.content.replaceChildren(part);if(p.content.scrollHeight>height-reserve+2&&before){part.textContent=before;units.push(part);part=node.cloneNode(false);part.textContent=word}}
    if(part.textContent)units.push(part);return
   }
  }
  units.push(node)
 };
 for(const node of p.nodes)collect(node);
 p.nodes=units;p.content.replaceChildren(...units);for(const n of units)n.setAttribute('data-screen-hidden','');
 let page=[];p.pages=[];
 for(const node of units){node.removeAttribute('data-screen-hidden');if(p.content.scrollHeight>height+2&&page.length){p.pages.push(page);for(const n of page)n.setAttribute('data-screen-hidden','');page=[]}page.push(node)}
 if(page.length)p.pages.push(page);if(!p.pages.length)p.pages=[[]];p.page=Math.min(p.page,p.pages.length-1);screenShowPage(p)
}
function screenShowPage(p){const visible=new Set(p.pages[p.page]||[]);for(const n of p.nodes){if(visible.has(n))n.removeAttribute('data-screen-hidden');else n.setAttribute('data-screen-hidden','')}p.label.textContent=(p.page+1)+' / '+p.pages.length;p.prev.disabled=p.page===0;p.next.disabled=p.page>=p.pages.length-1;p.nav.classList.toggle('single-page',p.pages.length===1);if(p.host.closest('.adaptive-modal'))shrinkDialogPage(p)}
function screenFitModal(){
 const focus=screenFocus(),modal=document.querySelector('#overlay .modal');if(!modal||modal.dataset.screenFit)return;modal.dataset.screenFit='true';modal.classList.add('screen-modal');
 if(modalKind==='reward'||modalKind==='shop'){fitOfferModal(modal);return}
 if(modalKind==='catalogueinspect'){fitCatalogueInspection(modal);return}
 if(modalKind==='rewardinspect'||modalKind==='shopinspect'){fitOfferInspection(modal);return}
 if(modalKind==='defeat'){modal.classList.add('defeat-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.querySelector('h1').id='defeatTitle';modal.setAttribute('aria-labelledby','defeatTitle');modal.querySelector('p').id='defeatCause';modal.setAttribute('aria-describedby','defeatCause');modal.addEventListener('keydown',e=>{if(e.key==='Tab'){e.preventDefault();modal.querySelector('.defeat-continue').focus()}});modal.querySelector('.defeat-continue')?.focus({preventScroll:true});return}
 if(modalKind==='enchanter'){modal.classList.add('enchanter-modal');return}
 if(modalKind==='help'){modal.classList.add('quick-help-modal');return}
 if(modalKind==='confirm'){modal.classList.add('compact-confirm-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.querySelector('h1').id='restartTitle';modal.setAttribute('aria-labelledby','restartTitle');modal.querySelector('p').id='restartDescription';modal.setAttribute('aria-describedby','restartDescription');modal.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const buttons=[...modal.querySelectorAll('button')],first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});modal.querySelector('#cancelRestart,#cancelDiscard')?.focus({preventScroll:true});return}
 if(modal.querySelector('.reference-grid')){fitReferenceBrowser(modal);return}
 if(modalKind==='runmap'){fitSingleRunMap(modal);return}
 if(modal.classList.contains('classes-modal')){modal.classList.add('screen-class-modal');return}
 for(const node of modal.querySelectorAll('.map-node,.map-depth')){const y=parseFloat(node.style.top);node.style.top=(y/860*100)+'%'}
 for(const line of modal.querySelectorAll('.map-canvas line'))for(const key of ['y1','y2'])line.setAttribute(key,(parseFloat(line.getAttribute(key))/860*100)+'%');
 if(modalKind==='classconfirm'){modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.querySelector('h1').id='classStartTitle';modal.setAttribute('aria-labelledby','classStartTitle');modal.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const first=modal.querySelector('#cancelClassStart'),last=modal.querySelector('#confirmClassStart');if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}})}
 modal.classList.add('adaptive-modal');if(modalKind==='itemdetails'){modal.classList.add('item-details-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();closeItemDetails()}if(e.key==='Tab'){const buttons=[...modal.querySelectorAll('button,a[href],select,input,summary')].filter(b=>!b.disabled&&b.getClientRects().length),first=buttons[0],last=buttons[buttons.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}})}modal.dataset.dialogKind=modalKind;
 const nodes=[...modal.children],body=document.createElement('div');body.className='screen-modal-body';
 // Keep title, description and the final action/footer reachable on every page.
 const start=nodes.findIndex(n=>n.tagName==='H1')+2;const rest=nodes.slice(start),last=rest[rest.length-1];
 let footer=last&&(last.matches('button,.shop-footer,.loot-footer,.loot-inspect-footer,.pagination,.catalogue-note')||last.querySelector('button')&&last.children.length<4&&!last.matches('.choices,.class-grid,.shop-offers,.loot-grid'))?last:null;
 // Keep direct dialog actions together, rather than paging a Leave/Keep button away.
 const actions=rest.filter(n=>n.tagName==='BUTTON'&&!(modalKind==='path'&&n.getAttribute('onclick')==='showRunMap()'));
 if(actions.length){const bar=document.createElement('div');bar.className='dialog-actions';for(const action of actions)bar.append(action);modal.append(bar);footer=bar}
 const description=nodes[start-1];if(description?.tagName==='P'&&description.getBoundingClientRect().height>52&&modalKind!=='event')body.append(description);
 for(const node of rest)if(node!==footer&&!actions.includes(node)&&!(modalKind==='event'&&node.matches('.event-scene,.event-wallet')))body.append(node);modal.insertBefore(body,footer);screenPager(body);screenRestoreFocus(focus);if(modalKind==='itemdetails')modal.querySelector('button.gold')?.focus({preventScroll:true});if(modalKind==='classconfirm')modal.querySelector('#cancelClassStart')?.focus({preventScroll:true});
}
// Measure all content before pagination so small dialogs never inherit an empty viewport.
function sizeAdaptiveModal(p,allowColumns=true){
 const modal=p.host.closest('.adaptive-modal');if(!modal)return;
 for(const node of p.nodes)node.removeAttribute('data-screen-hidden');
 p.content.replaceChildren(...p.nodes);p.nav.hidden=true;p.nav.classList.remove('single-page');
 p.host.style.height='auto';p.content.style.flex='none';modal.style.height='auto';modal.style.setProperty('max-height','none','important');
 const choices=modal.querySelector('.choices'),count=choices?.children.length||0;modal.classList.remove('dialog-choice-stack','dialog-inspect-stack');
 modal.style.width=Math.min(innerWidth-24,count>2?1040:modalKind==='itemdetails'?1200:modalKind==='trade'?840:760)+'px';
 modal.classList.toggle('item-details-columns',modalKind==='itemdetails'&&innerWidth>=900&&allowColumns);
 let natural=p.content.getBoundingClientRect().height;const overhead=modal.getBoundingClientRect().height-p.host.getBoundingClientRect().height,available=Math.max(40,innerHeight-24-overhead);
 if(choices&&[...choices.children].some(card=>card.getBoundingClientRect().height>available-(modalKind==='event'?0:45))){modal.classList.add('dialog-choice-stack');natural=p.content.getBoundingClientRect().height}
 const sections=modal.querySelector('.shop-inspect-sections');if(sections&&[...sections.children].some(node=>node.getBoundingClientRect().height>available-45)){modal.classList.add('dialog-inspect-stack');natural=p.content.getBoundingClientRect().height}
 // Keep every rule accessible on short screens; desktop uses both columns.
 if(modal.classList.contains('item-details-columns')&&(natural>available+1||p.content.scrollWidth>p.content.clientWidth+2)){modal.classList.remove('item-details-columns');natural=p.content.getBoundingClientRect().height}
 modal.style.removeProperty('max-height');const needsPages=natural>available+1;
 p.nav.hidden=!needsPages;
 // Reserve navigation only when needed, and preserve the current page on resize.
 const nav=needsPages?p.nav.getBoundingClientRect().height+8:0;
 p.adaptiveLimit=available;p.host.style.height=Math.min(natural+nav,available)+'px';p.content.style.flex='';
 modal.classList.toggle('dialog-paginated',needsPages);
}
function shrinkDialogPage(p){
 // Page capacity uses the viewport, while the visible window fits this page's content.
 p.host.style.height='auto';p.content.style.flex='none';
 const natural=p.content.getBoundingClientRect().height,nav=p.nav.getBoundingClientRect().height;
 p.host.style.height=Math.min(p.adaptiveLimit||innerHeight,natural+(nav?nav+8:0))+'px';p.content.style.flex='';
}
const offerLayouts=new WeakMap();
function fitOfferModal(modal){
 modal.classList.add('offer-modal');document.getElementById('toast').style.display='none';
 const grid=modal.querySelector('.loot-grid,.shop-offers'),nav=document.createElement('nav'),prev=document.createElement('button'),label=document.createElement('span'),next=document.createElement('button');
 nav.className='offer-pages';nav.setAttribute('aria-label','Offer pages');prev.textContent='← Previous';next.textContent='Next →';label.setAttribute('aria-live','polite');nav.append(prev,label,next);grid.after(nav);
 const state={grid,cards:[...grid.querySelectorAll('.loot-card')],nav,prev,label,next,page:0,size:1};offerLayouts.set(modal,state);
 const turn=delta=>{state.page=Math.max(0,Math.min(Math.ceil(state.cards.length/state.size)-1,state.page+delta));showOfferPage(state);const button=delta>0?next:prev;(button.disabled?(delta>0?prev:next):button).focus({preventScroll:true});if(typeof positionGameplayHintPointer==='function')requestAnimationFrame(positionGameplayHintPointer)};prev.onclick=()=>turn(-1);next.onclick=()=>turn(1);
 sizeOfferModal(modal)
}
function showOfferPage(state){
 const pages=Math.max(1,Math.ceil(state.cards.length/state.size));state.page=Math.min(state.page,pages-1);
 state.cards.forEach((card,n)=>{card.hidden=n<state.page*state.size||n>=(state.page+1)*state.size});state.nav.hidden=pages===1;state.prev.disabled=state.page===0;state.next.disabled=state.page===pages-1;state.label.textContent=(state.page+1)+' / '+pages;
}
function sizeOfferModal(modal){
 const state=offerLayouts.get(modal);if(!state)return;
 const count=state.cards.length,columns=innerHeight<500&&innerWidth>550?1:Math.max(1,Math.min(count||1,modal.classList.contains('shop-modal')?5:4,Math.floor((innerWidth-44)/260)));
 modal.style.setProperty('--offer-columns',columns);modal.style.width=Math.min(innerWidth-24,1340,Math.max(400,columns*290+(columns-1)*12+32))+'px';
 // Measure the natural card grid before choosing how many rows fit. This runs on
 // opening, resize or hint changes, not on pointer movement or combat ticks.
 state.cards.forEach(card=>{card.hidden=false});state.nav.hidden=true;modal.style.setProperty('max-height','none','important');
 const natural=modal.getBoundingClientRect().height,gridHeight=state.grid.getBoundingClientRect().height,limit=innerHeight-24,gap=12;
 if(natural<=limit+1){state.size=Math.max(1,count);state.page=0}else{
  state.nav.hidden=false;
  const overhead=modal.getBoundingClientRect().height-state.grid.getBoundingClientRect().height;
  const height=Math.max(1,...state.cards.map(card=>card.getBoundingClientRect().height));
  state.size=columns*Math.max(1,Math.floor((limit-overhead+gap)/(height+gap)));
 }
 modal.style.removeProperty('max-height');showOfferPage(state)
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
function screenMenu(){modal('Run menu','Reference, settings and run controls.',`<div class="screen-menu"><button onclick="showRunMap()">Run map</button><button onclick="showDevNotes()">Dev notes</button><button onclick="openCatalogue()">Item catalogue</button><button onclick="openBestiary()">Encounter bestiary</button><button onclick="showHelp()">Controls & synergies</button><button onclick="showKeyboardShortcuts()">Keyboard shortcuts</button><button onclick="showSoundSettings()">Sound effects</button><button onclick="toggleLargeText();screenReflow()">Toggle larger text</button><label class="effects-quality-control">Effects quality<select aria-label="Effects quality" onchange="setEffectsQuality(this.value)">${effectsQualityOptions()}</select></label><button data-hints-toggle onclick="toggleGameplayHints()">Gameplay tips</button><button onclick="confirmRestart()">Start a new run</button></div><button onclick="closeModal()">Return to run</button>`,'menu')}
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
 const watch=host=>{let observer;const refresh=()=>{observer.disconnect();delete host.dataset.screenPaged;screenPager(host);observer.observe(host,{childList:true});};observer=new MutationObserver(refresh);refresh()};detail.classList.add('inspection-overview');watch(log);
 document.addEventListener('pointerdown',e=>{const filters=document.getElementById('referenceFilters'),toggle=document.getElementById('referenceFilterToggle');if(referenceFiltersOpen&&innerWidth<=700&&filters&&!filters.contains(e.target)&&!toggle.contains(e.target))toggleReferenceFilters()});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(modalKind==='catalogueinspect'||modalKind==='bestiaryinspect')){e.preventDefault();e.stopImmediatePropagation();returnReference(modalKind==='catalogueinspect'?'catalogue':'bestiary');return}if(e.key==='Escape'&&referenceFiltersOpen&&innerWidth<=700&&document.querySelector('.reference-modal')){e.preventDefault();e.stopImmediatePropagation();toggleReferenceFilters();document.getElementById('referenceFilterToggle')?.focus()}},true);
 document.addEventListener('toggle',()=>screenReflow(),true);
 new MutationObserver(()=>{if(document.querySelector('#overlay .modal'))hideSpriteDetails();screenFitModal();screenReflow(false)}).observe(document.getElementById('overlay'),{childList:true});
 new ResizeObserver(screenReflow).observe(document.documentElement);window.addEventListener('resize',screenReflow);
 document.fonts?.ready.then(()=>screenReflow());
 document.documentElement.dataset.playView='pack';screenFitModal();screenReflow()
}
if(!window.__TEST__)initScreenLayout();

// Catalogue entries are one responsive panel, independent of the dialog paginator.
function fitCatalogueInspection(modal){
 modal.classList.add('catalogue-item-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.querySelector('h1').id='catalogueItemTitle';modal.setAttribute('aria-labelledby','catalogueItemTitle');
 const set=modal.querySelector('.catalogue-item-set .mechanic-note'),matching=set?.querySelector('details'),rules=set?.querySelector(':scope > small');if(matching&&rules){rules.classList.add('catalogue-set-counting');matching.append(rules)}
 modal.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const controls=[...modal.querySelectorAll('button,a[href],summary')].filter(el=>!el.disabled&&el.getClientRects().length),first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
 modal.querySelector('.catalogue-item-footer button')?.focus({preventScroll:true})
}

// Disclosures must keep their original DOM: the generic paginator splits oversized
// cards into clones, losing disclosure state and repeatedly splitting their text.
function fitOfferInspection(modal){
 modal.classList.add('offer-inspection-modal');modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');
 const heading=modal.querySelector('h1');heading.id='offerInspectionTitle';modal.setAttribute('aria-labelledby',heading.id);
 const footer=modal.querySelector(':scope > .loot-inspect-footer,:scope > .shop-footer'),body=document.createElement('div');body.className='offer-inspection-content';
 const nodes=[...modal.children];for(const node of nodes.slice(nodes.indexOf(modal.querySelector(':scope > p'))+1))if(node!==footer)body.append(node);
 modal.insertBefore(body,footer);
 modal.addEventListener('keydown',e=>{if(e.key!=='Tab')return;const controls=[...modal.querySelectorAll('button,a[href],summary')].filter(el=>!el.disabled&&el.getClientRects().length),first=controls[0],last=controls[controls.length-1];if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}});
 footer.querySelector('button')?.focus({preventScroll:true})
}
