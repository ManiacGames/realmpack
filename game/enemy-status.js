/* Presentation of existing enemy effects; no combat values are changed. */
'use strict';
const ENEMY_STATUS_ICONS={
 burn:{name:'Burning',color:'#e6a064',icon:'<path d="M8 1 5 6 3 8v5l3 2h5l2-3V8l-3-4v5L8 6z"/>',stacks:true,description:'Damage each second before modifiers. Loses one stack per second.'},
 poison:{name:'Poisoned',color:'#a8be74',icon:'<path d="M5 1h6v2h-1v3l4 6v3H2v-3l4-6V3H5zm0 9-2 3v1h10v-1l-2-3z" fill-rule="evenodd"/>',stacks:true,description:'Damage each second before modifiers. Loses one stack per second.'},
 bleed:{name:'Bleeding',color:'#d98487',icon:'<path d="m8 1-5 7v4l3 3h4l3-3V8z"/><path d="M5 9v3h2" fill="none" stroke="#311c23" stroke-width="1.5"/>',stacks:true,description:'Damage each second before modifiers. Loses one stack per second.'},
 chill:{name:'Chilled',color:'#9fc7df',icon:'<path d="M8 1v14M2 4l12 8M2 12l12-8M5 2l3 3 3-3M5 14l3-3 3 3M2 7l4-1-1-4M14 9l-4 1 1 4M2 9l4 1-1 4M14 7l-4-1 1-4" fill="none" stroke="currentColor" stroke-width="1.3"/>',description:'Enemy attack cooldowns are 35% longer while chilled.'},
 weaken:{name:'Weakened',color:'#c7b5d5',icon:'<path d="m11 1 4 4-5 5-2-2 1-2-2-1zM5 8l3 3-2 2 1 1-1 1-5-5 1-1 1 1z"/>',description:'Enemy attacks deal 25% less damage.'},
 vulnerable:{name:'Exposed',color:'#e5c37c',icon:'<path d="M2 2h4v2H4v2H2zm8 0h4v4h-2V4h-2zM2 10h2v2h2v2H2zm10 0h2v4h-4v-2h2zM7 5h2v2h2v2H9v2H7V9H5V7h2z"/>',description:'The enemy takes 25% more damage.'}
};
let enemyStatusPinned=false,enemyStatusActive=null;
function hideEnemyStatus(){const tip=document.getElementById('enemyStatusTooltip');if(tip)tip.hidden=true;document.querySelectorAll('#enemyDebuffs [aria-describedby]').forEach(b=>b.removeAttribute('aria-describedby'));enemyStatusPinned=false;enemyStatusActive=null}
function positionEnemyStatus(){const tip=document.getElementById('enemyStatusTooltip'),button=document.querySelector('#enemyDebuffs [data-status="'+enemyStatusActive+'"]');if(!tip||tip.hidden||!button)return;const r=button.getBoundingClientRect();if(!r.width||!r.height||r.bottom<0||r.top>innerHeight){hideEnemyStatus();return}const b=tip.getBoundingClientRect();tip.style.left=Math.max(8,Math.min(innerWidth-b.width-8,r.left+r.width/2-b.width/2))+'px';tip.style.top=Math.max(8,r.bottom+b.height+12<=innerHeight?r.bottom+8:r.top-b.height-8)+'px'}
function showEnemyStatus(key,pin=false){const button=document.querySelector('#enemyDebuffs [data-status="'+key+'"]'),tip=document.getElementById('enemyStatusTooltip');if(!button||button.hidden)return;if(typeof hideSpriteDetails==='function')hideSpriteDetails();if(pin&&enemyStatusActive===key&&enemyStatusPinned){hideEnemyStatus();return}enemyStatusActive=key;enemyStatusPinned=pin;tip.hidden=false;tip.querySelector('strong').textContent=ENEMY_STATUS_ICONS[key].name;tip.querySelector('p').textContent=button.dataset.description;document.querySelectorAll('#enemyDebuffs [aria-describedby]').forEach(b=>b.removeAttribute('aria-describedby'));button.setAttribute('aria-describedby','enemyStatusTooltip');positionEnemyStatus()}
function updateEnemyDebuffs(){
 const bar=document.getElementById('enemyDebuffs');if(!bar)return;const e=s?.enemy,alive=e?.hp>0&&e?.max>0;let active=0,tipChanged=false;
 for(const [key,def] of Object.entries(ENEMY_STATUS_ICONS)){const button=bar.querySelector('[data-status="'+key+'"]'),value=alive?Math.max(0,Math.ceil(e[key]||0)):0;button.hidden=!value;if(!value){if(enemyStatusActive===key)hideEnemyStatus();continue}active++;
  const count=def.stacks?String(value):value+'s',description=(def.stacks?value+' stacks. ':value+' seconds remaining. ')+def.description;
  if(button.lastElementChild.textContent!==count)button.lastElementChild.textContent=count;
  if(button.dataset.description!==description){button.dataset.description=description;button.setAttribute('aria-label',def.name+': '+count)}
  if(enemyStatusActive===key){const text=document.querySelector('#enemyStatusTooltip p');if(text.textContent!==description){text.textContent=description;tipChanged=true}}
 }
 bar.hidden=!active;if(enemyStatusActive&&tipChanged)positionEnemyStatus()
}
function initEnemyStatuses(){
 const bar=document.createElement('div');bar.id='enemyDebuffs';bar.className='enemy-debuffs';bar.hidden=true;bar.setAttribute('role','group');bar.setAttribute('aria-label','Enemy debuffs');
 for(const [key,def] of Object.entries(ENEMY_STATUS_ICONS)){const button=document.createElement('button');button.type='button';button.className='enemy-debuff';button.dataset.status=key;button.hidden=true;button.style.setProperty('--status-color',def.color);button.innerHTML='<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">'+def.icon+'</svg><span></span>';button.addEventListener('pointerenter',e=>{if(e.pointerType!=='touch')showEnemyStatus(key)});button.addEventListener('pointerleave',()=>{if(!enemyStatusPinned&&document.activeElement!==button)hideEnemyStatus()});button.addEventListener('focus',()=>showEnemyStatus(key));button.addEventListener('blur',()=>{if(!enemyStatusPinned)hideEnemyStatus()});button.addEventListener('click',()=>showEnemyStatus(key,true));bar.append(button)}
 document.getElementById('estats').after(bar);const tip=document.createElement('div');tip.id='enemyStatusTooltip';tip.className='enemy-status-tooltip';tip.hidden=true;tip.setAttribute('role','tooltip');tip.innerHTML='<strong></strong><p></p>';document.body.append(tip);
 document.addEventListener('pointerdown',e=>{if(!bar.contains(e.target)&&!tip.contains(e.target))hideEnemyStatus()});document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!tip.hidden){e.preventDefault();e.stopImmediatePropagation();hideEnemyStatus()}},true);
 new MutationObserver(()=>hideEnemyStatus()).observe(document.getElementById('overlay'),{childList:true});window.addEventListener('resize',positionEnemyStatus);updateEnemyDebuffs()
}
if(!window.__TEST__)initEnemyStatuses();
