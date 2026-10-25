'use strict';
const {ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)};freshRun('knight',true);selectPortal(s.portalChoices[0]);
 const room=id=>{ROOMS[0]=scaledRoom(id,8);s.room=0;s.phase='prep';setEnemy();s.phase='fight';s.hp=s.max=10000;s.time=0;return ROOMS[0]};
 check(DUNGEON_BALANCE_VERSION===4,'Migration version');
 room('enc_9_9');const base=s.enemy.damage;check(base===22,'Rounded 10% Malphas reduction');s.enemy.hp=s.enemy.max/2;tick(.05);const enraged=s.enemy.damage;s.enemy.hp=0;finishBattle(true);check(s.enemy.wave===2&&s.enemy.damage===base&&!s.enemy.phaseTwo,'Wave damage did not reset');s.enemy.hp=s.enemy.max/2;tick(.05);check(s.enemy.damage===enraged,'Phase bonus compounded');
 room('enc_20_9');s.enemy.phaseTwo=true;s.enemy.mechanicTime=6;encounterSecond();check(s.silence===2,'Esben silence');room('enc_32_9');s.enemy.phaseTwo=true;s.enemy.mechanicTime=6;encounterSecond();check(s.silence===3,'Apex suppression changed');
 const damage=playerDamage;let lastDamage;playerDamage=n=>{lastDamage=n;return true};
 room('enc_22_9');check(ROOMS[0].damage===23,'Wyvern base damage reduction');s.enemy.damage=100;s.enemy.phaseTwo=true;s.enemy.hp=s.enemy.max*.4;s.enemy.attacks=2;enemyAttack();check(lastDamage===162.5,'Wyvern heavy strike should be 130% with Berserker retained');
 room('enc_0_9');s.enemy.damage=100;s.enemy.attacks=2;enemyAttack();check(lastDamage===150,'Other Raider heavy strike changed');
 room('enc_34_9');s.enemy.damage=100;s.enemy.mechanicTime=5;encounterSecond();check(lastDamage===65,'Kogbold artillery');
 playerDamage=damage;
 room('enc_14_9');s.enemy.max=1000;s.enemy.ward=0;s.enemy.mechanicTime=9;encounterSecond();check(s.enemy.ward===80,'Mummy ward refill');
 room('enc_27_9');check(ROOMS[0].damage===31,'Fungal damage adjustment');room('enc_5_9');check(ROOMS[0].damage===13,'Queen Bee damage reduction');
 const danger=scaledRoom('enc_22_6',10);check(danger.type==='combat'&&!danger.risk&&encounterDangerText(danger),'Danger label changed role/risk');check(mapMarker(danger)===MAP_MARKERS.danger,'Map warning');check(encounterDangerBadge(danger).includes('Two waves'),'Missing warning text');check(!encounterDangerText({...danger,waves:1}).includes('Two waves'),'Early single wave warning is inaccurate');
 check(dungeonSecondaryText(encounterDefs.enc_20_9).includes('2 seconds'),'Esben description stale');check(dungeonSecondaryText(encounterDefs.enc_22_9).includes('30% more'),'Wyvern description stale');check(encounterProfileDescription(encounterDefs.enc_14_9).includes('8% ward'),'Ward description stale');check(encounterProfileDescription(encounterDefs.enc_34_9).includes('65%'),'Artillery description stale');check(ENCOUNTERS.profiles.suppressor.description.includes('3 seconds'),'Generic description changed');
 // Future/current saved rooms migrate without changing choices, completed rooms or RNG.
 freshRun('knight',true);selectPortal(s.portalChoices[0]);ROOMS[0]=scaledRoom('enc_0_9',10);ROOMS[1]={...scaledRoom('enc_9_9',8),balanceVersion:3,damage:24};s.room=1;s.pathChoices=[{...scaledRoom('enc_20_9',11),balanceVersion:3}];s.mapBranches={1:s.pathChoices};const before=JSON.stringify(ROOMS[0]),seed=s.seed;migrateDungeonBalance();check(ROOMS[1].damage===22&&ROOMS[1].balanceVersion===4&&s.pathChoices[0].balanceVersion===4,'Saved encounter stats not migrated');check(JSON.stringify(ROOMS[0])===before&&s.seed===seed,'Migration changed history or RNG');
 return 'PASS: independent wave phase damage, targeted burst/silence/ward/artillery changes, unchanged generic mechanics, danger-only markers, accurate descriptions and saved-route migration';
})()`,ctx));
