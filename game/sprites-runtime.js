'use strict';
// Shared sprite sheets keep the network and DOM stable during combat and selection.
const spriteRegistry=window.SPRITE_DATA||{sprites:{},sheets:[]};
const spriteEscape=value=>String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function spriteMarkup(source,label,classes='itempixel'){
 const info=spriteRegistry.sprites[source]||spriteRegistry.sprites[spriteRegistry.fallback];
 if(!info)return `<span class="sprite-placeholder ${classes}" role="img" aria-label="${spriteEscape(label)}">✦</span>`;
 return `<span class="pixel sprite-art ${classes}" role="img" aria-label="${spriteEscape(label)}" data-sprite-source="${spriteEscape(source)}" data-sprite-group="${info.group}" style="--sprite-image:url('${info.sheet}');--sprite-x:${info.x};--sprite-y:${info.y};--sprite-cols:${info.cols};--sprite-rows:${info.rows}"></span>`;
}
function setBattleSprite(id,source,label,classes='battlepixel'){
 const host=document.getElementById(id),existing=host.querySelector('.sprite-art');
 // Inspect the actual node, rather than trusting a stale cached data attribute.
 if(existing&&existing.dataset.spriteSource===source)return existing;
 host.innerHTML=spriteMarkup(source,label,classes);return host.querySelector('.sprite-art');
}
function updateClassPanel(c){
 const panel=document.querySelector('.classbox');
 if(panel.dataset.classId===c.id&&panel.querySelector('.sprite-art'))return;
 panel.dataset.classId=c.id;
 panel.innerHTML=`${spriteMarkup(c.sprite,c.name,'classpixel')}<h3>${spriteEscape(c.name)}</h3><p>${spriteEscape(c.desc)}</p><strong style="color:var(--gold)">${spriteEscape(c.title)}</strong><p>${spriteEscape(c.rule)}</p><button onclick="confirmRestart()">Change character</button>`;
}
if(!window.__TEST__){
 // Three eager requests replace thousands of independent sprite requests.
 const failed=new Set();
 for(const sheet of spriteRegistry.sheets){
  const image=new Image();let attempts=0;
  image.onload=()=>{document.documentElement.style.setProperty('--sheet-'+sheet.group,`url("${image.src}")`);failed.delete(sheet.group);document.documentElement.classList.remove('sprite-failed-'+sheet.group)};
  image.onerror=()=>{if(attempts++<2){setTimeout(()=>{image.src=sheet.src+'?retry='+attempts},250*attempts)}else{failed.add(sheet.group);document.documentElement.classList.add('sprite-failed-'+sheet.group)}};
  image.src=sheet.src;
 }
}
function setStableHTML(id,html){const el=document.getElementById(id);if(el.innerHTML!==html)el.innerHTML=html}
function renderBackpack(){
 const grid=document.getElementById('grid');if(inventoryIntent&&(s.phase!=='prep'||selected!==inventoryIntent.id))inventoryCancel();bindInventoryControls();
 if(grid.querySelectorAll('.cell').length!==30){
  grid.innerHTML=Array.from({length:30},(_,n)=>`<div class="cell" tabindex="0" role="button" aria-label="Place selected item at column ${n%6+1}, row ${Math.floor(n/6)+1}" data-x="${n%6}" data-y="${Math.floor(n/6)}"></div>`).join('');
  for(const cell of grid.querySelectorAll('.cell')){
   cell.onclick=()=>{if(!inventorySuppressClick)inventoryPlaceCell(+cell.dataset.x,+cell.dataset.y)};
   cell.onkeydown=e=>{if(e.key==='Enter')cell.click()};
   cell.ondragover=e=>e.preventDefault();
   cell.ondrop=e=>{e.preventDefault();selected=dragId;place(+cell.dataset.x,+cell.dataset.y)};
  }
 }
 const ids=new Set(s.items.map(i=>String(i.id)));
 for(const el of grid.querySelectorAll('.item'))if(!ids.has(el.dataset.itemId))el.remove();
 for(const i of s.items){
  const d=defs[i.type],[w,h]=dims(i);let el=document.getElementById('item'+i.id);
  if(!el){el=document.createElement('div');el.id='item'+i.id;el.className='item';el.dataset.itemId=String(i.id);el.tabIndex=0;el.setAttribute('role','button');grid.appendChild(el)}
  if(el.dataset.type!==i.type){el.innerHTML=`<span class="icon">${art(i.type)}</span><span class="iname">${esc(d.name)}</span><div class="cd" id="cd${i.id}"></div>`;el.dataset.type=i.type}
  updateStackBadge(el,i);el.classList.toggle('selected',selected===i.id);el.classList.toggle('shiny',!!d.isShiny);el.classList.toggle('offclass-item',isOffClass(d));el.dataset.enchanted=String(itemEnchants(i).length);
  el.style.cssText=`left:calc(${i.x} * (var(--cell) + 5px));top:calc(${i.y} * (var(--cell) + 5px));width:calc(${w} * var(--cell) + ${(w-1)*5}px);height:calc(${h} * var(--cell) + ${(h-1)*5}px);--ic:${d.color}`;
  el.title=(itemEnchants(i).length?enchantGrade(i)+' enchanted · ':'')+(isOffClass(d)?'OFF-CLASS: +50% cooldown'+(d.group==='ability'?', +1 mana':'')+' · ':'')+d.name+(d.once?' · '+stackCount(i)+'/5 copies':'')+' — '+describe(d)+(d.mechanic?' · '+d.mechanic.title+': '+d.mechanic.text:'');el.draggable=false;
  el.onclick=e=>{e.stopPropagation();inventoryClick(i)};
  el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();if(!e.repeat)inventoryClick(i)}};
  el.onpointerenter=()=>{inspectItem(i.id)};el.onpointerleave=()=>{effectHover=null;updateItemEffects()};el.onfocus=()=>{inspectItem(i.id)};el.onblur=()=>{effectHover=null;updateItemEffects()};el.onpointerdown=e=>inventoryPointerDown(e,i);el.ondragstart=e=>e.preventDefault();
 }
 const count=document.getElementById('stashCount');if(count){count.textContent=s.stash.length+' slot'+(s.stash.length===1?'':'s');count.title=s.practice?'Sandbox catalogue additions stop at 80 stash slots. Other transfers can exceed this.':'No stash capacity limit in normal runs.'}
 const stash=document.getElementById('stash'),stashIds=new Set(s.stash.map(i=>String(i.id)));
 for(const el of stash.querySelectorAll('[data-item-id]'))if(!stashIds.has(el.dataset.itemId))el.remove();
 const empty=stash.querySelector('small');if(empty)empty.remove();
 for(const i of s.stash){
  let button=stash.querySelector(`[data-item-id="${i.id}"]`);
  if(!button){button=document.createElement('button');button.dataset.itemId=String(i.id);stash.appendChild(button)}
  if(button.dataset.type!==i.type){button.innerHTML=art(i.type);button.dataset.type=i.type}
  updateStackBadge(button,i);button.classList.toggle('shiny',!!defs[i.type].isShiny);button.classList.toggle('offclass-item',isOffClass(defs[i.type]));button.title=defs[i.type].name+(defs[i.type].once?' · '+stackCount(i)+'/5 copies':'')+(itemEnchants(i).length?' · '+enchantGrade(i)+' enchantment':'');button.draggable=false;button.style.borderColor=selected===i.id?'#edc77b':defs[i.type].color;
  button.onclick=()=>{inventoryClick(i)};button.onpointerenter=()=>inspectItem(i.id);button.onfocus=()=>inspectItem(i.id);button.onpointerleave=()=>{effectHover=null;updateItemEffects()};button.onblur=()=>{effectHover=null;updateItemEffects()};button.onpointerdown=e=>inventoryPointerDown(e,i,true);button.ondragstart=e=>e.preventDefault();
 }
 if(!s.stash.length)stash.innerHTML='<small>Your stash is empty.</small>';
}
