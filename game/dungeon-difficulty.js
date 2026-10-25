/* RealmPack's five tiers adapt RotMG dungeon progression, not DECA's /10 rating. */
'use strict';
const DUNGEON_BALANCE_VERSION=4;
function describeHexerTiming(){ENCOUNTERS.profiles.hexer.description='Every third attack, at most once per 7 seconds: remove 3 mana and apply 3 seconds of silence.'}
// Encounter-specific pressure adjustments, kept separate from dungeon tiers.
const ENCOUNTER_TUNING={
 enc_9_9:{damage:.90,warning:'Burst damage · Berserker and arcane pulses'},
 enc_20_9:{silenceSeconds:2,warning:'Control combo · Frost and silence'},
 enc_22_9:{damage:.85,heavyStrike:1.30,warning:'Burst damage · Berserker and heavy strikes'},
 enc_14_9:{wardRecharge:.08},
 enc_34_9:{artilleryAmount:.65,warning:'Burst damage · Artillery and double strikes'},
 enc_27_9:{damage:1.10},
 enc_5_9:{damage:.90},
 enc_16_3:{warning:'Dangerous encounter · Two waves and hexes'},
 enc_17_5:{warning:'Dangerous encounter · Heavy strikes'},
 enc_17_6:{warning:'Dangerous encounter · Two waves and heavy strikes'},
 enc_22_2:{warning:'Dangerous encounter · Berserker'},
 enc_22_6:{warning:'Dangerous encounter · Two waves and Berserker'}
};
function encounterTuning(room){return ENCOUNTER_TUNING[typeof room==='string'?room:room?.encounterId||room?.id]||{}}
function encounterDangerText(room){const text=encounterTuning(room).warning||'';return room?.waves===1?text.replace('Two waves and ',''):text}
function encounterDangerBadge(room){const text=encounterDangerText(room);return text?`<span class="encounter-danger">⚠ ${esc(text)}</span>`:''}
function encounterProfileDescription(room,key=room.profile){
 const t=encounterTuning(room);
 if(key==='suppressor'&&t.silenceSeconds)return `Every 7 seconds: apply ${t.silenceSeconds} seconds of silence, stopping mana regeneration and item activations.`;
 if(key==='raider'&&t.heavyStrike)return `Every third attack is a heavy strike that deals ${Math.round((t.heavyStrike-1)*100)}% more damage.`;
 if(key==='bulwark'&&t.wardRecharge)return `Starts with a ward worth 15% maximum health. Gains another ${Math.round(t.wardRecharge*100)}% ward every 10 seconds.`;
 if(key==='artillerist'&&t.artilleryAmount)return `Every 6 seconds: fire a blockable artillery shell for ${Math.round(t.artilleryAmount*100)}% of attack damage.`;
 return ENCOUNTERS.profiles[key]?.description||''
}
const DUNGEON_TIERS={
 1:{name:'Beginner',color:'#a5bf98',hp:.72,damage:.72,rate:.95,gold:.90},
 2:{name:'Standard',color:'#a6bcc7',hp:.95,damage:.92,rate:1,gold:1},
 3:{name:'Advanced',color:'#d0be8b',hp:1.20,damage:1.12,rate:1.04,gold:1.10},
 4:{name:'Exaltation',color:'#cc9b83',hp:1.70,damage:1.40,rate:1.08,gold:1.20},
 5:{name:'Apex Exalt',color:'#bd9ac9',hp:2.25,damage:1.70,rate:1.12,gold:1.30}
};
const DUNGEON_RATINGS={
 'Pirate Cave':[1,0], 'Forest Maze':[1,.10], 'Spider Den':[1,.20], 'Forbidden Jungle':[1,.30], 'The Hive':[1,.40], 'Sprite World':[1,.60], 'Snake Pit':[1,.70], 'Magic Woods':[1,.80],
 'Undead Lair':[2,0], 'Candyland Hunting Grounds':[2,.15], 'Manor of the Immortals':[2,.25], 'Abyss of Demons':[2,.40], 'Mad Lab':[2,.50], 'Puppet Master’s Theatre':[2,.60], 'Toxic Sewers':[2,.80],
 'Haunted Cemetery':[3,0], 'Davy Jones’s Locker':[3,.10], 'Ocean Trench':[3,.20], 'Crawling Depths':[3,.30], 'Woodland Labyrinth':[3,.40], 'Mountain Temple':[3,.50], 'Parasite Chambers':[3,.60], 'Deadwater Docks':[3,.65], 'Lair of Draconis':[3,.75], 'Tomb of the Ancients':[3,.85], 'Ice Cave':[3,.90],
 'Cultist Hideout':[4,0], 'The Nest':[4,.15], 'Fungal Cavern':[4,.30], 'Crystal Cavern':[4,.50], 'Lost Halls':[4,.65], 'Kogbold Steamworks':[4,.75], 'The Void':[4,.90],
 'Oryx’s Sanctuary':[5,.80], 'The Shatters':[5,1]
};
function dungeonRating(id){const d=dungeonDefs[id];if(!d) return null;const entry=DUNGEON_RATINGS[d.name];if(!entry)throw Error('Missing dungeon difficulty: '+d.name);const [level,step]=entry,t=DUNGEON_TIERS[level],fine=1+step*.08;return {level,step,name:t.name,color:t.color,hp:t.hp*fine,damage:t.damage*fine,rate:t.rate*(1+step*.03),gold:t.gold}}
function dungeonDifficultyBadge(id){const t=dungeonRating(id);if(!t)return '';const label=`Dungeon tier ${t.level}/5 · ${t.name}`,title=`${label}. RealmPack tier adapted from RotMG progression. At equal depth: ×${t.hp.toFixed(2)} HP, ×${t.damage.toFixed(2)} damage, ×${t.rate.toFixed(2)} attack rate; ×${t.gold.toFixed(2)} gold. Room type, combat mechanics, run mode and your build also affect danger.`;const skull='<svg viewBox="0 0 12 12" aria-hidden="true"><path fill="currentColor" fill-rule="evenodd" d="M2 1h8v1h1v7H9v3H3V9H1V2h1z M3 4v2h2V4z M7 4v2h2V4z"/></svg>';return `<span class="dungeon-difficulty" style="--difficulty-color:${t.color}" title="${esc(title)}" aria-label="${esc(label)}"><span class="difficulty-skulls" aria-hidden="true">${Array.from({length:5},(_,n)=>`<i class="${n<t.level?'filled':'empty'}">${skull}</i>`).join('')}</span><span>${t.level}/5 · ${t.name}</span></span>`}
const DUNGEON_BOSS_SECONDARIES={'The Nest':'venom','Fungal Cavern':'venom','Crystal Cavern':'arcanist','Lost Halls':'berserker','Cultist Hideout':'vampire','The Void':'bulwark','Kogbold Steamworks':'duelist','Oryx’s Sanctuary':'arcanist','The Shatters':'suppressor'};
function dungeonBossSecondary(encounter){const t=dungeonRating(encounter.dungeon);if(t.level===1)return null;return DUNGEON_BOSS_SECONDARIES[dungeonDefs[encounter.dungeon].name]||encounter.secondary}
function dungeonSecondaryText(room){const key=room.role?dungeonBossSecondary(room):room.secondary;return key?encounterProfileDescription(room,key):'Damage increases in phase II; no additional status mechanic.'}
function dungeonIdForRoom(room){return room?.encounterId?encounterDefs[room.encounterId]?.dungeon:room?.dungeonId||s.dungeons[actIndex()]}
function portalLootItems(id){const owned=new Set([...s.items,...s.stash].map(i=>defs[i.type].baseId||i.type));return DATA.items.filter(d=>!d.isShiny&&!d.lootExcluded&&d.classes.includes(s.classId)&&(window.DUNGEON_LOOT_SOURCES?.[d.id]||[]).includes(id)&&!owned.has(d.id))}
function portalLootPreview(id){const items=portalLootItems(id);return items.length?'Drops: '+items[0].name+(items.length>1?' · +'+(items.length-1)+' more':''):'Explore for loot and supplies.'}
function pickDungeonPortals(){const modern=s.runFormat===2,stage=actIndex()%(modern?5:3),bands=modern?[[[1],[1],[2]],[[1,2],[2],[3]],[[2,3],[3],[4]],[[3],[4],[4,5]],[[4],[4,5],[5]]][stage]:stage===0?[[1],[1],[2]]:stage===1?[[2],[3],[3]]:[[3],[4],[5]],visited=new Set(modern?s.dungeons.slice(Math.floor(actIndex()/5)*5):[]),chosen=[];for(const band of bands){let pool=ENCOUNTERS.dungeons.filter(d=>band.includes(dungeonRating(d.id).level)&&!chosen.includes(d.id)&&!visited.has(d.id));if(!pool.length){const remaining=ENCOUNTERS.dungeons.filter(d=>!chosen.includes(d.id)&&!visited.has(d.id)),distance=d=>Math.min(...band.map(n=>Math.abs(n-dungeonRating(d.id).level))),best=Math.min(...remaining.map(distance));pool=remaining.filter(d=>distance(d)===best)}if(pool.length){if(!modern){chosen.push(pick(pool).id);continue}const weight=d=>portalLootItems(d.id).length?2:1;let roll=rng()*pool.reduce((n,d)=>n+weight(d),0),picked=pool[pool.length-1];for(const d of pool){roll-=weight(d);if(roll<0){picked=d;break}}chosen.push(picked.id)}}return chosen}
function migrateDungeonBalance(){const update=room=>{if(room?.encounterId&&room.balanceVersion!==DUNGEON_BALANCE_VERSION)Object.assign(room,scaledRoom(room.encounterId,room.depth||s.room+1,room.risk,room.type));return room};for(let i=s.room;i<ROOMS.length;i++)update(ROOMS[i]);s.pathChoices=(s.pathChoices||[]).map(update);for(const [depth,options] of Object.entries(s.mapBranches||{}))if(Number(depth)>=s.room)options.forEach(update);s.route=ROOMS}
