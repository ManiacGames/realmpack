/* Native sprite compositions for noncombat encounters; no random fallback art. */
'use strict';
const EVENT_ART={
 provisioner:{scene:'market',actor:'priest',props:['Health Potion','Magic Potion'],title:'A provisioner stocks matching potions for adventurers'},
 runeforge:{scene:'forge',actor:'mystic',props:['Blacksmith Hammer','Necrotic Skull','Ring of Magic'],title:'A mystic consumes an offering to empower another relic'},
 merchant:{scene:'market',actor:'rogue',props:['Iron Shield','Ring of Attack','Magic Potion'],title:'A salvage merchant buys unwanted equipment'},
 enchanter:{scene:'arcane',actor:'mystic',props:['Stasis Orb','Ring of Magic'],title:'A mystic enchants a glowing relic'},
 blood:{scene:'altar',props:['Necrotic Skull','Health Potion'],title:'A blood-red altar and a skull offering'},
 healer:{scene:'forest',actor:'priest',props:['Healing Tome','Health Potion'],title:'A travelling priest with a healing tome'},
 smith:{scene:'forge',actor:'warrior',props:['Blacksmith Hammer','Short Sword'],title:'A blacksmith works at a glowing forge'},
 runes:{scene:'arcane',actor:'wizard',props:['Stasis Orb','Magic Potion'],title:'A wizard inscribes a magical rune'},
 broker:{scene:'market',actor:'rogue',props:['Ring of Attack','Iron Shield'],title:'A salvage trader displays recovered equipment'},
 cache:{scene:'cache',props:['Chocolate Mystery Chest','Hunting Trap'],title:'A supply chest beside a concealed trap'},
 well:{scene:'well',props:['Ring of Magic'],title:'A stone wishing well glimmers with magic'},
 cook:{scene:'camp',actor:'bard',props:['Health Potion'],title:'A camp cook tends a warm fire'},
 surgeon:{scene:'clinic',actor:'priest',props:['Remedy Tome','Greater Health Potion'],title:'A field surgeon prepares medical supplies'},
 mana:{scene:'water',props:['Magic Potion','Stasis Orb'],title:'A blue mana spring bubbles beside a filled flask'},
 ward:{scene:'shrine',props:['Golden Shield','Seal of the Initiate'],title:'An ancient sentinel shrine bears a golden shield'},
 war:{scene:'monument',props:['Golden Sword','Iron Shield'],title:'Crossed arms stand before a war monument'},
 mirror:{scene:'mirror',props:['Suspension Orb','Ring of Magic'],title:'A still mirror pool holds the reflection of a relic'},
 adept:{scene:'forest',actor:'ninja',props:['Short Sword'],title:'A retired adventurer offers training'},
 gambler:{scene:'dice',actor:'trickster',props:['Necrotic Skull','Ring of Attack'],title:'A trickster plays bone dice at a low table'},
 goblins:{scene:'bridge',enemy:'Retro Forest Goblin',props:['Wooden Shield'],title:'A goblin guards a wooden toll bridge'},
 armory:{scene:'crypt',props:['Soul Siphon Skull','Golden Sword','Iron Shield'],title:'A cursed armory holds weapons beneath a dark sigil'},
 spirit:{scene:'crypt',enemy:'Lair Ghost Paladin',props:['Cloak of Shadows'],title:'A restless ghost awaits an offering'},
 pilgrim:{scene:'camp',actor:'paladin',props:['Seal of the Pilgrim','Health Potion'],title:'A Nexus pilgrim shares spare supplies'},
 curios:{scene:'market',actor:'sorcerer',props:['Suspension Orb','Ring of Dexterity','Cloak of Shadows'],title:'A curio merchant displays strange relics'},
 library:{scene:'library',actor:'wizard',props:['Healing Tome','Tome of Rejuvenation','Magic Potion'],title:'A sealed library of magical tomes'},
 workbench:{scene:'workbench',props:['Blacksmith Hammer','Iron Shield'],title:'An abandoned workbench with tools and armor'},
 pond:{scene:'pond',actor:'huntress',props:['Basic Fishing Rod','Necrofish Poison'],title:'A fishing rod rests beside a moonlit pond'},
 caravan:{scene:'caravan',actor:'archer',props:['Magic Quiver','Health Potion'],title:'A stranded caravan offers travelling supplies'},
 rest:{scene:'camp',props:['Health Potion','Healing Tome'],title:'A sheltered campfire offers a quiet refuge'},
 shop:{scene:'market',actor:'rogue',props:['Short Sword','Health Potion','Magic Potion'],title:'A travelling trader displays provisions'}
};
function eventArtAsset(config){if(config.actor)return classes[config.actor]?.sprite;if(config.enemy)return ENCOUNTERS.encounters.find(e=>e.enemy===config.enemy)?.sprite;return null}
function eventScene(id,mode='card'){const c=EVENT_ART[id];if(!c)return '';const actor=eventArtAsset(c),name=noncombatById[id]?.name||(id==='rest'?'A quiet refuge':'The wandering trader');return `<div class="event-scene scene-${c.scene} scene-${mode}" role="img" aria-label="${esc(name+': '+c.title)}"><div class="scene-moon" aria-hidden="true"></div><div class="scene-scenery" aria-hidden="true"></div><div class="scene-table" aria-hidden="true"></div>${actor?`<div class="scene-actor" aria-hidden="true">${spriteMarkup(actor,name,'event-npc')}</div>`:''}<div class="scene-props ${actor?'with-actor':''}" aria-hidden="true">${c.props.map(n=>{const item=DATA.items.find(d=>d.id===DATA.byName[n]);return item?spriteMarkup(item.sprite,n,'event-prop'):''}).join('')}</div>${c.scene==='dice'?'<span class="scene-dice" aria-hidden="true"><i></i><i></i></span>':''}</div>`}
function renderRoomArtwork(room){if(room.type==='event'){setStableHTML('enemySprite',eventScene(room.eventId||s.activeEvent?.id,'arena'));return}if(['rest','shop'].includes(room.type)){setStableHTML('enemySprite',eventScene(room.type,'arena'));return}if(room.sprite)setBattleSprite('enemySprite',room.sprite,room.enemy)}
function refreshEncounterArtwork(){const refresh=r=>{if(!r)return;if(r.encounterId){const d=encounterDefs[r.encounterId];if(d)Object.assign(r,{enemy:d.enemy,sprite:d.sprite})}else if(r.type==='event'&&r.eventId)decorateEventRoom(r)};ROOMS.forEach(refresh);(s.pathChoices||[]).forEach(refresh);for(const branches of Object.values(s.mapBranches||{}))branches.forEach(refresh);s.route=ROOMS}
