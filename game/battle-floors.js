/* Original, static pixel floors. Room/encounter identity controls presentation only. */
'use strict';
const BATTLE_FLOORS=Object.freeze(Object.fromEntries([
 ['pirate-cave','sand',['#302c22','#49422e','#625737','#777053']],
 ['forest-maze','forest',['#202b21','#33402a','#45553a','#63734b']],
 ['spider-den','web',['#292621','#41392e','#554b3d','#7a786b']],
 ['snake-pit','scales',['#242d20','#3b4b2d','#52633b','#77824b']],
 ['forbidden-jungle','roots',['#232b20','#36452c','#4a5c35','#6d7945']],
 ['hive','honey',['#302b1d','#4b4025','#6a5831','#8c7340']],
 ['undead-lair','crypt',['#252a2c','#3c4244','#50595a','#747f7d']],
 ['sprite-world','runes',['#242b30','#344648','#4f6262','#917b9c']],
 ['magic-woods','forest',['#1f2b2c','#2d4141','#405854','#6b7c83']],
 ['abyss-of-demons','lava',['#272224','#3c3030','#5d3b32','#a05e3e']],
 ['manor','parquet',['#2d2225','#493338','#61434a','#8c6560']],
 ['toxic-sewers','grate',['#262c22','#39452c','#536239','#7f8b4b']],
 ['candyland','candy',['#342b31','#51414b','#6e5964','#968879']],
 ['haunted-cemetery','crypt',['#252b29','#3b4741','#505e52','#7c8470']],
 ['tomb','glyphs',['#332e24','#514735','#6c5b40','#93835b']],
 ['ocean-trench','coral',['#202e32','#2c454b','#3e5e65','#6d8788']],
 ['davy-jones','planks',['#222c2c','#35433e','#4a5850','#778078']],
 ['deadwater-docks','planks',['#292b29','#45453b','#5e5b49','#85816a']],
 ['woodland-labyrinth','roots',['#20291f','#33442b','#4c5d37','#778354']],
 ['crawling-depths','web',['#29252e','#3e3546','#57465f','#87738a']],
 ['ice-cave','ice',['#24323c','#3a505e','#547080','#8da3ab']],
 ['mountain-temple','temple',['#2a2d2d','#424744','#5e6252','#99916a']],
 ['lair-of-draconis','dragon',['#292831','#423e4b','#5e5362','#8b7b80']],
 ['parasite-chambers','veins',['#2e2529','#4b353c','#65454c','#8b6468']],
 ['mad-lab','circuit',['#222d30','#35464a','#4b6266','#779393']],
 ['puppet-theatre','parquet',['#2d252f','#49394a','#655163','#95818a']],
 ['nest','honey',['#31291d','#514226','#705a30','#998044']],
 ['fungal-cavern','fungal',['#232a2b','#354345','#4a5c57','#7f9a86']],
 ['crystal-cavern','crystal',['#292733','#423d54','#5c536f','#9b8eaf']],
 ['lost-halls','temple',['#303333','#4b5351','#68716a','#929789']],
 ['cultist-hideout','runes',['#2c2428','#45353c','#62484c','#94716d']],
 ['void','void',['#20202d','#302f47','#47415f','#756b94']],
 ['shatters','fractured',['#252b34','#3a4452','#526074','#8591a2']],
 ['oryx-sanctuary','temple',['#33322c','#535346','#72705a','#a39a71']],
 ['kogbold-steamworks','metal',['#2b2b28','#454641','#60604f','#958564']]
].map(([slug,pattern,colors],n)=>['dungeon_'+n,Object.freeze({slug,pattern,colors:Object.freeze(colors),image:'assets/floors/'+slug+'.svg'})])));
function battleFloorForRoom(room){return BATTLE_FLOORS[dungeonIdForRoom(room)]||null}
function updateBattleFloor(room){
 if(window.__TEST__)return;
 const arena=document.querySelector('.arena');if(!arena)return;
 const floor=battleFloorForRoom(room),key=floor?.slug||'vault';
 if(arena.dataset.dungeonFloor===key)return;
 arena.dataset.dungeonFloor=key;
 arena.style.setProperty('--battle-floor-image',`url("${floor?.image||'assets/vault-floor.svg'}")`);
 arena.style.setProperty('--battle-floor-edge',floor?.colors[2]||'#55563c');
}
