/* Viewport workspace. Secondary information is paged, never clipped out of reach. */
'use strict';
const screenPagers=new Set();
let screenPagerFrame=0;
function screenView(view){document.documentElement.dataset.playView=view;document.querySelectorAll('[data-play-view]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.playView===view)));screenReflow()}
function screenTab(tab){document.querySelectorAll('[data-info-tab]').forEach(b=>b.setAttribute('aria-selected',String(b.dataset.infoTab===tab)));document.querySelectorAll('[data-info-pane]').forEach(p=>{p.hidden=p.dataset.infoPane!==tab});screenReflow()}
function screenFocus(){const el=document.activeElement;return el&&el!==document.body?{el,start:el.selectionStart,end:el.selectionEnd}:null}
function screenRestoreFocus(f){if(!f?.el.isConnected||!f.el.getClientRects().length)return;f.el.focus({preventScroll:true});if(typeof f.start==='number'&&f.el.setSelectionRange)f.el.setSelectionRange(f.start,f.end)}
function screenReflow(all=true){if(all)for(const pager of screenPagers)pager.dirty=true;cancelAnimationFrame(screenPagerFrame);screenPagerFrame=requestAnimationFrame(()=>{const focus=screenFocus();for(const pager of screenPagers){if(!pager.host.isConnected){screenPagers.delete(pager);continue}if(pager.dirty&&pager.host.getBoundingClientRect().height){screenPaginate(pager);pager.dirty=false}}screenRestoreFocus(focus)})}
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
function screenMenu(){modal('Run menu','Reference, settings and run controls.',`<div class="screen-menu"><button onclick="openCatalogue()">Item catalogue</button><button onclick="openBestiary()">Encounter bestiary</button><button onclick="showHelp()">Controls & synergies</button><button onclick="toggleLargeText();screenReflow()">Toggle larger text</button><button onclick="confirmRestart()">Start a new run</button></div><button onclick="closeModal()">Return to run</button>`,'menu')}
function initScreenLayout(){
 const layout=document.querySelector('.layout'),right=document.querySelector('.right');if(!layout||!right)return;
 const menu=document.createElement('button');menu.className='screen-menu-button';menu.textContent='Menu';menu.onclick=screenMenu;document.querySelector('.topright').append(menu);
 const nav=document.createElement('nav');nav.className='play-tabs';nav.setAttribute('role','tablist');nav.setAttribute('aria-label','Play view');nav.innerHTML=['battle','pack','details'].map((v,n)=>`<button role="tab" data-play-view="${v}" aria-selected="${n===1}" onclick="screenView('${v}')">${['Battle','Pack & stash','Details'][n]}</button>`).join('');layout.before(nav);
 const inspector=right.children[0],journal=right.children[1];inspector.dataset.infoPane='item';journal.dataset.infoPane='journal';journal.hidden=true;
 const tabbar=document.createElement('nav');tabbar.className='info-tabs';tabbar.setAttribute('role','tablist');tabbar.setAttribute('aria-label','Run information');tabbar.innerHTML=[['item','Item'],['encounter','Encounter'],['class','Class'],['journal','Journal']].map(([id,name])=>`<button role="tab" data-info-tab="${id}" aria-selected="${id==='item'}" onclick="screenTab('${id}')">${name}</button>`).join('');right.prepend(tabbar);
 for(const [id,title,selectors] of [['encounter','Encounter details',['#encounterInfo','#dungeonDifficulty']],['class','Your class',['.classbox']]]){
  const pane=document.createElement('section');pane.className='panel screen-info-panel';pane.dataset.infoPane=id;pane.hidden=true;pane.innerHTML=`<div class="panelhead"><h2>${title}</h2></div><div class="screen-info-body"></div>`;
  for(const selector of selectors){const el=document.querySelector(selector);if(el)pane.lastChild.append(el)}right.append(pane);screenPager(pane.lastChild)
 }
 // Long explanations remain available in the guide, instead of occupying the playfield.
 const hints=document.createElement('button');hints.textContent='Controls & synergies';hints.onclick=showHelp;document.querySelector('.pack-pane .invfoot>div').append(hints);
 const detail=document.getElementById('detail'),log=document.getElementById('log');
 const watch=host=>{let observer;const refresh=()=>{observer.disconnect();delete host.dataset.screenPaged;screenPager(host);observer.observe(host,{childList:true});};observer=new MutationObserver(refresh);refresh()};watch(detail);watch(log);
 document.addEventListener('toggle',()=>screenReflow(),true);
 new MutationObserver(()=>{screenFitModal();screenReflow(false)}).observe(document.getElementById('overlay'),{childList:true});
 new ResizeObserver(screenReflow).observe(document.documentElement);window.addEventListener('resize',screenReflow);
 document.fonts?.ready.then(()=>screenReflow());
 document.documentElement.dataset.playView='pack';screenFitModal();screenReflow()
}
if(!window.__TEST__)initScreenLayout();
