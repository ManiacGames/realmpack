// DOM fixture checks node identity and recovery; this does not replace browser QA.
const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');const game=path.resolve(__dirname,'..');
function camel(s){return s.replace(/-([a-z])/g,(_,c)=>c.toUpperCase())}
class Element{
 constructor(tag='div'){this.tagName=tag;this.children=[];this.dataset={};this.style={setProperty(k,v){this[k]=v}};this.id='';this.className='';this._html='';this.writes=0;this.classList={add:(...names)=>{this.className=[...new Set([...this.className.split(/\s+/),...names])].join(' ')},remove:(...names)=>{this.className=this.className.split(/\s+/).filter(n=>!names.includes(n)).join(' ')},toggle:(name,on)=>{if(on)this.classList.add(name);else this.classList.remove(name)}}}
 set innerHTML(html){this._html=html;this.writes++;this.children=[];for(const m of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*)>/g)){const n=new Element(m[1]);for(const a of m[2].matchAll(/([\w-]+)="([^"]*)"/g))n.setAttribute(a[1],a[2]);this.appendChild(n)}}
 get innerHTML(){return this._html}
 setAttribute(k,v){if(k==='class')this.className=v;else if(k.startsWith('data-'))this.dataset[camel(k.slice(5))]=v;else this[k]=v}
 appendChild(n){if(n.parent)n.remove();this.children.push(n);n.parent=this;return n}
 remove(){if(this.parent)this.parent.children=this.parent.children.filter(n=>n!==this);this.parent=null}
 matches(selector){if(selector.startsWith('.'))return this.className.split(/\s+/).includes(selector.slice(1));if(selector.startsWith('#'))return this.id===selector.slice(1);const m=selector.match(/^\[data-([\w-]+)(?:="([^"]*)")?\]$/);if(m)return this.dataset[camel(m[1])]!==undefined&&(m[2]===undefined||this.dataset[camel(m[1])]===m[2]);return this.tagName===selector}
 querySelectorAll(selector){const a=[];for(const c of this.children){if(c.matches(selector))a.push(c);a.push(...c.querySelectorAll(selector))}return a}
 querySelector(s){return this.querySelectorAll(s)[0]||null}
}
const root=new Element('html');root.innerHTML=fs.readFileSync(path.join(game,'index.html'),'utf8');
const handlers={};Element.prototype.addEventListener=function(){};Element.prototype.getBoundingClientRect=function(){return this.id==='stash'?{left:600,top:0,right:800,bottom:200,width:200}:{left:0,top:0,right:409,bottom:340,width:409}};const doc={getElementById:id=>root.querySelector('#'+id),querySelector:s=>root.querySelector(s),createElement:tag=>new Element(tag),addEventListener(type,fn){handlers[type]=fn},querySelectorAll:s=>root.querySelectorAll(s),documentElement:root};
const ctx={window:{__TEST__:true,addEventListener(){}},document:doc,console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(){},getItem(){return null}}};vm.createContext(ctx);for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','game.js'])vm.runInContext(fs.readFileSync(path.join(game,f),'utf8'),ctx);
vm.runInContext(`freshRun('knight');selectPortal(s.portalChoices[0]);s.items=[];s.stash=[];const dragItem=makeItem(DATA.items.find(d=>d.w===2&&d.h===3&&!d.lootExcluded).id);Object.assign(dragItem,{x:0,y:0});s.items.push(dragItem);window.__TEST__=false;render();`,ctx);
const item=doc.getElementById('grid').querySelector('.item');const event=(x,y)=>({button:0,pointerId:1,pointerType:'mouse',clientX:x,clientY:y,preventDefault(){},stopPropagation(){},stopImmediatePropagation(){},target:{matches(){return false}}});

function evaluate(code){return vm.runInContext(code,ctx)}
function click(el,x=20,y=20,pointerType='mouse'){const e={...event(x,y),pointerType};el.onpointerdown(e);handlers.pointerup(e);el.onclick(e)}
click(item);assert(evaluate('selected===dragItem.id'),'first click selects');
click(item);assert(evaluate('selected===null&&inventoryIntent===null'),'repeat click deselects');
click(item,20,20,'touch');click(item,20,20,'touch');assert(evaluate('selected===null'),'touch taps toggle');
item.onkeydown({...event(20,20),key:'Enter'});item.onkeydown({...event(20,20),key:' '});assert(evaluate('selected===null'),'keyboard toggles');
evaluate(`const other=makeItem(DATA.items.find(d=>d.once).id);other.quantity=3;s.stash.push(other);render();`);
const stashButton=doc.getElementById('stash').querySelector('[data-item-id]');
item.onpointerenter();assert(evaluate('selected===null&&findInspected()===dragItem'),'hover inspects without selecting');
item.onpointerleave();assert(evaluate('findInspected()===dragItem'),'details remain available after hover');
click(item);stashButton.onpointerenter();assert(evaluate('selected===dragItem.id&&findInspected()===other'),'stash hover preserves selection');
assert(doc.getElementById('detail').innerHTML.includes('discardSelected('+evaluate('other.id')+')'),'discard targets displayed item');
assert(doc.getElementById('detail').innerHTML.includes('splitSelectedStack('+evaluate('other.id')+')'),'split targets displayed stack');
stashButton.onfocus();assert(evaluate('findInspected()===other'),'stash keyboard focus inspects');
click(stashButton,650,20);click(stashButton,650,20);assert(evaluate('selected===null&&inventoryIntent===null'),'stash clicks toggle');
evaluate(`s.phase='fight'`);item.onpointerenter();assert(evaluate('findInspected()===dragItem&&selected===null'),'combat hover inspects');evaluate(`s.phase='prep'`);
evaluate('modal=(...args)=>{globalThis.confirmation=args};discardSelected(other.id)');assert(evaluate('confirmation[2].includes("removeItem("+other.id+")")'),'discard confirmation uses hovered item');
evaluate('splitSelectedStack(other.id)');assert(evaluate('other.quantity===2&&s.stash.find(i=>i.id===selected).type===other.type'),'split uses hovered stack');
evaluate('selected=null;inventoryIntent=null');
const mergeSource=doc.getElementById('stash').querySelector('[data-item-id="'+evaluate('other.id')+'"]');
const mergeTarget=doc.getElementById('stash').querySelector('[data-item-id="'+evaluate('s.stash.find(i=>i.id!==other.id).id')+'"]');
click(mergeSource,650,20);click(mergeTarget,650,20);assert(evaluate('s.stash.length===1&&s.stash[0].quantity===3'),'click-to-merge stacks preserved');
evaluate('selected=null;inventoryIntent=null');
evaluate(`const blocker=makeItem(dragItem.type);Object.assign(blocker,{x:4,y:0});s.items.push(blocker);render();`);
const blockerTile=doc.getElementById('item'+evaluate('blocker.id'));
click(item);click(blockerTile,300,20);
assert(evaluate('selected===null&&inventoryIntent===null'),'occupied packed target must cancel instead of switching selection');
assert(evaluate('dragItem.x===0&&dragItem.y===0&&blocker.x===4&&blocker.y===0'),'blocked click must not move either item');
click(blockerTile,300,20);assert(evaluate('selected===blocker.id'),'unheld occupied item remains selectable');click(blockerTile,300,20);
const stashSource=doc.getElementById('stash').querySelector('[data-item-id]');
click(stashSource,650,20);click(item);
assert(evaluate('selected===null&&inventoryIntent===null&&s.stash.length===1'),'stashed source on occupied pack target cancels without moving');
evaluate('s.items=s.items.filter(i=>i!==blocker);render()');

item.onpointerdown(event(90,160));handlers.pointermove(event(230,160));assert(doc.getElementById('inventoryPreview'),'drag preview absent');handlers.keydown({...event(230,160),key:'r'});assert(vm.runInContext('!dragItem.rot&&inventoryIntent.rot',ctx),'rotation mutated packed item during drag');handlers.pointerup(event(230,160));assert(vm.runInContext('dragItem.rot&&fits(dragItem,dragItem.x,dragItem.y)',ctx),'pointer drop failed');assert(!doc.getElementById('inventoryPreview'),'preview remains after drop');assert(vm.runInContext('selected===null&&inventoryIntent===null',ctx),'drop leaves item held');item.onpointerdown(event(230,160));handlers.pointermove(event(300,250));handlers.keydown({...event(300,250),key:'Escape'});assert(vm.runInContext('inventoryDrag===null',ctx),'escape did not cancel');assert(!doc.getElementById('inventoryPreview'),'escape left preview');console.log('PASS: occupied-pack cancellation for packed/stashed sources, click/touch/keyboard toggle, packed/stash hover and focus, explicit inspection actions, pointer handlers, threshold preview, R while dragging, anchored release and Escape cleanup');
