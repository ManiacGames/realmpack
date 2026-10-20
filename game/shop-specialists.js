/* Every item family has a specialist; select usefulness before catalogue size. */
'use strict';
const SHOP_BIAS={native:.70,shared:.25,offClass:.05};
const SHOP_SPECIALISTS=[
 ['dagger','Dagger','The Knifemaker','rogue'],['bow','Bow','The Fletcher','archer'],['staff','Staff','The Staffwright','wizard'],['wand','Wand','The Wandmaker','priest'],['sword','Sword','The Swordsmith','warrior'],['katana','Katana','The Bladesmith','samurai'],
 ['cloak','Cloak','The Shadow Tailor','rogue'],['quiver','Quiver','The Quiver Keeper','archer'],['spell','Spell','The Spell Archivist','wizard'],['tome','Tome','The Tome Keeper','priest'],['helm','Helm','The Helm Forger','warrior'],['shield','Shield','The Shieldsmith','knight'],['seal','Seal','The Seal Engraver','paladin'],['poison','Poison','The Venom Brewer','assassin'],['skull','Skull','The Bone Collector','necromancer'],['trap','Trap','The Trapper','huntress'],['orb','Orb','The Orb Diviner','mystic'],['prism','Prism','The Prism Illusionist','trickster'],['scepter','Scepter','The Scepter Crafter','sorcerer'],['shuriken','Shuriken','The Star Smith','ninja'],['wakizashi','Wakizashi','The Wakizashi Master','samurai'],['lute','Lute','The Instrument Maker','bard'],['mace','Mace','The Summoner’s Emporium','summoner'],['sheath','Sheath','The Sheath Artisan','kensei'],['sigil','Sigil','The Sigil Scribe','druid'],
 ['leather','Leather armor','The Leatherworker','archer'],['robe','Robe','The Robe Weaver','wizard'],['plate','Heavy armor','The Armorer','knight'],['ring','Ring','The Jeweler','rogue'],['consumable','Consumable','The Alchemist','priest']
].map(([kind,label,name,actor])=>({kind,label,name,actor}));
const specialistByKind=Object.fromEntries(SHOP_SPECIALISTS.map(m=>[m.kind,m]));
const specialistBasePools=Object.fromEntries(SHOP_SPECIALISTS.map(m=>[m.kind,window.REALM_DATA.items.filter(d=>d.kind===m.kind&&!d.isShiny)]));
function specialistItems(kind){return (specialistBasePools[kind]||[]).filter(d=>!d.lootExcluded&&!d.catalogueHidden&&daggerAvailable(d.id))}
function nativeShopKinds(classId=s.classId){return new Set(classes[classId].startingIds.slice(0,3).map(id=>defs[id].kind))}
function shopRelation(kind,classId=s.classId){return ['ring','consumable'].includes(kind)?'shared':nativeShopKinds(classId).has(kind)?'native':'offClass'}
const specialistGroupCache={};
function shopCandidateGroups(classId=s.classId){if(specialistGroupCache[classId])return specialistGroupCache[classId];const groups={native:[],shared:[],offClass:[]};for(const m of SHOP_SPECIALISTS)if(specialistItems(m.kind).length)groups[shopRelation(m.kind,classId)].push(m);specialistGroupCache[classId]=groups;return groups}
function chooseShopKind(){const groups=shopCandidateGroups(),entries=Object.entries(SHOP_BIAS).filter(([key])=>groups[key].length),total=entries.reduce((sum,[,weight])=>sum+weight,0);let roll=rng()*total,group=entries[entries.length-1][0];for(const [key,weight] of entries){roll-=weight;if(roll<0){group=key;break}}return pick(groups[group]).kind}
function decorateShopRoom(room){if(!specialistByKind[room.shopKind])room.shopKind=chooseShopKind();const m=specialistByKind[room.shopKind];room.name=m.name;room.enemy=m.label+' specialist';return room}
function rollSpecialistStock(n,kind){const eligible=specialistItems(kind),chosen=[],used=new Set(),weights=lootRarityWeights('shop',actIndex());
 const add=d=>{if(!d)return;const identity=d.name+'|'+d.tier;if(used.has(identity))return;chosen.push(d.id);used.add(identity)};
 // Reliable basic supplies plus opportunities to reinforce an owned consumable.
 if(kind==='consumable')for(const name of ['Health Potion','Magic Potion'])if(chosen.length<n)add(eligible.find(d=>d.name===name));
 const owned=new Set([...s.items,...s.stash].filter(i=>defs[i.type].once&&stackCount(i)<STACK_LIMIT).map(i=>i.type));
 while(chosen.length<n){const available=eligible.filter(d=>!used.has(d.name+'|'+d.tier));if(!available.length)break;let roll=rng(),quality=3;for(let q=0;q<weights.length;q++){roll-=weights[q];if(roll<0){quality=q;break}}
  const distance=Math.min(...available.map(d=>Math.abs(d.quality-quality))),pool=available.filter(d=>Math.abs(d.quality-quality)===distance),weight=d=>(kind==='consumable'&&owned.has(d.id)?5:1)*(d.classes.includes(s.classId)?3:1);let target=rng()*pool.reduce((sum,d)=>sum+weight(d),0),picked=pool[pool.length-1];for(const d of pool){target-=weight(d);if(target<0){picked=d;break}}add(picked);
 }return chosen}
function currentShopSpecialist(){return s.shopState?.depth===s.room?specialistByKind[s.shopState.kind]||null:null}
function shopSpecialistNote(m){if(!m)return 'Saved mixed stock · future shops use item specialists.';return m.label+' specialist · '+({native:'For your class',shared:'Shared equipment',offClass:'Off-class specialty; inspect item compatibility'})[shopRelation(m.kind)]}
function specialistShopScene(room=ROOMS[s.room],mode='card'){const m=specialistByKind[room?.shopKind];if(!m)return eventScene('shop',mode);const pool=specialistItems(m.kind),props=pool.slice(0,3).map(d=>d.id);return eventScene('shop',mode,{scene:'market',actor:m.actor,props,name:m.name,title:m.label+' specialist displaying only '+m.label.toLowerCase()+' stock'})}
function enterSpecialistShop(){if(s.phase==='shop'){showShop();return}if(s.phase!=='prep')return;daggerNoncombatBonus();const room=decorateShopRoom(ROOMS[s.room]);s.shopState={kind:room.shopKind,depth:s.room,refreshUsed:false};s.shopHeals=0;s.phase='shop';stock=rollSpecialistStock(5,room.shopKind);save();showShop()}

function shopRefreshUsed(){return s.shopState?.depth===s.room&&!!s.shopState.refreshUsed}
function refreshShop(){
 if(s.phase!=='shop'||shopRefreshUsed())return;
 // Old saves retain their mixed stock until the player explicitly refreshes.
 const current=currentShopSpecialist(),room=ROOMS[s.room];
 if(current)room.shopKind=current.kind;
 decorateShopRoom(room);const kind=room.shopKind;
 s.shopState={kind,depth:s.room,refreshUsed:true};
 stock=rollSpecialistStock(5,kind);save();showShop()
}
