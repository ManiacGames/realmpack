/* Class bonuses operate on real item output and have explicit feedback limits. */
'use strict';
function resetClassEffects(){s.fury=0;s.furyTime=0;s.focus=0;s.arcaneEchoReady=false;s.precisionReady=false;s.rhythmAt=-1e9;s.classKit=null}
function tickClassEffects(dt){s.furyTime=Math.max(0,(s.furyTime||0)-dt);if(!s.furyTime)s.fury=0}
function classPrimaryAmount(i,amount){const d=defs[i.type];amount*=realmWeaponMultiplier(i);if(d.realmSet&&!d.realmIdentity&&realmSetCount(d.realmSet)>=2)amount*=1.08;if(s.classId==='warrior'&&d.group==='weapon')amount*=1+.08*(s.fury||0);if(s.classId==='paladin'&&d.group==='weapon'){const oath=classKit().oath,seal=oath&&s.items.find(j=>j.id===oath.sourceId);if(seal&&s.time<oath.until&&nearbyItems(seal).includes(i))amount*=1.1}if(s.classId==='samurai'&&d.kind==='wakizashi'){amount*=1+.4*(s.focus||0);s.focus=0}return Math.max(1,Math.round(amount))}
function classActivation(i,primary){const d=defs[i.type];
 if(s.classId==='archer'&&d.kind==='bow'){
  passive('bow',1);if(s.precisionReady){s.precisionReady=false;const quiver=nearbyItems(i).some(j=>defs[j.type].kind==='quiver');hit(Math.round(primary*(quiver?.75:.4)));log('✦ Precision shot'+(quiver?' · quiver empowered':'')+'.')}
 }
 if(s.classId==='wizard'&&s.arcaneEchoReady&&d.group==='ability'&&['damage','drain'].includes(d.effect)){
  s.arcaneEchoReady=false;hit(Math.round(primary*.8));log('✦ Arcane Echo repeats 80% of the spell’s primary damage.')
 }
 classIdentityActivation(i,primary);
 if(s.classId==='bard'&&itemHasHaste(i)&&s.time-(s.rhythmAt??-1e9)>=1){s.rhythmAt=s.time;passive('rhythm',1)}
}
function classStateText(){const identity=classIdentityState();if(identity)return identity;return s.classId==='warrior'?`Fury ${s.fury||0}/5 · +${(s.fury||0)*8}% weapon damage`:s.classId==='samurai'?`Focus ${s.focus||0}/3`:s.classId==='wizard'&&s.arcaneEchoReady?'Arcane Echo ready':''}
function delayEnemyAttack(seconds){const e=s.enemy,window=Math.floor(s.time/5);if(e.delayWindow!==window){e.delayWindow=window;e.delaySpent=0}const delay=Math.min(Math.max(0,seconds),Math.max(0,2-(e.delaySpent||0)));e.delaySpent=(e.delaySpent||0)+delay;e.charge=Math.max(-1.5,e.charge-delay);return delay}

// Class resources belong to the current battle, never to a saved item definition.
function classKit(){if(!s.classKit||s.classKit.classId!==s.classId)s.classKit={classId:s.classId,gates:{},flow:0,pact:0};return s.classKit}
function classGate(key,seconds,initial=0){const k=classKit();if(s.time+1e-8<(k.gates[key]??initial))return false;k.gates[key]=s.time+seconds;return true}
function classNotice(text){log('✦ '+text);flash('playerSprite')}
function classIdentityActivation(i,primary){
 if(s.phase!=='fight'||!s.items.includes(i))return;
 const d=defs[i.type],k=classKit();k.sourceId=i.id;k.primary=primary;
 switch(s.classId){
 case 'rogue':
  if(d.kind==='cloak'&&classGate('ambush',6)){k.ambush=true;classNotice('Shadowstep: ambush ready.')}
  if(d.kind==='dagger'&&k.ambush){k.ambush=false;hit(Math.round(8+primary*.8));classNotice('Shadowstep: dagger ambush.')}
  break;
 case 'mystic':
  if(d.kind==='orb'&&classGate('temporal',4)){k.temporal={damage:10+Math.min(20,Math.round(primary*2)),until:s.time+8};classNotice('Time Fracture: staff discharge ready.')}
  if(d.kind==='staff'&&k.temporal){const charge=k.temporal;k.temporal=null;if(s.time<=charge.until){hit(charge.damage);delayEnemyAttack(.75);classNotice('Time Fracture: temporal discharge.')}}
  break;
 case 'ninja':
  if(d.kind==='katana')passive('katana',1);
  if(d.kind==='shuriken'&&k.flow){k.flow=0;hit(Math.round(8+primary*.6));for(const j of nearbyItems(i))if(defs[j.type].kind==='katana')rechargeItem(j,.1,i);classNotice('Flowing Steel: empowered star; adjacent katanas recharge 10%.')}
  break;
 case 'assassin':
  if(d.kind==='poison'){k.venomUntil=s.time+6;classNotice('Toxic Edge: daggers primed for 6s.')}
  if(d.kind==='dagger'&&s.time<(k.venomUntil||0)){if(s.time>=(k.venomProgressUntil||0))s.progress=0;k.venomProgressUntil=k.venomUntil;passive('venomStrike',1)}
  break;
 case 'huntress':
  if(d.kind==='trap'&&classGate('mark',3)){k.markUntil=s.time+6;classNotice('Predator’s Mark: next bow empowered.')}
  if(d.kind==='bow'&&k.markUntil){const until=k.markUntil;k.markUntil=0;if(s.time<until){hit(Math.round(primary*.25));apply('bleed',4);apply('weaken',3);classNotice('Predator’s Mark: bow exploits the trap.')}}
  break;
 case 'trickster':
  if(d.kind==='prism'&&classGate('decoy',6)){const before=s.dodge;s.dodge=Math.min(3,s.dodge+1);if(s.dodge>before)k.decoy={ownerId:i.id,power:Math.min(8,4+Math.floor(primary*.1)),until:s.time+10};classNotice('Mirror Dance: decoy protection ready.')}
  break;
 case 'paladin':
  if(d.kind==='seal'&&classGate('oath',3)){k.oath={sourceId:i.id,until:s.time+4};gainBlock(4);classNotice('Sacred Oath: nearby weapons gain 10% primary damage for 4s.')}
  break;
 case 'necromancer':if(d.kind==='skull')passive('skull',1);break;
 case 'sorcerer':if(d.kind==='scepter')passive('scepter',1);break;
 case 'summoner':
  if(d.kind==='mace'){if(s.time>=(k.pactUntil||0))k.pact=0;if(classGate('pact',2)){k.pact=Math.min(3,k.pact+1);k.pactUntil=s.time+10;passive('mace',1)}}
  break;
 case 'kensei':
  if(d.kind==='sheath'&&classGate('dash',8,8)){s.dodge=Math.min(3,s.dodge+1);classNotice('Resolute Dash: sheath prepares a dodge.')}
  break;
 }
}
function classIdentityProc(proc){
 const k=classKit(),source=s.items.find(i=>i.id===k.sourceId);
 switch(proc){
 case 'ninja':k.flow=1;break;
 case 'assassin':if(classGate('toxic',2)){apply('poison',4);hit(Math.min(12,Math.round(s.enemy.poison*.5)));apply('vulnerable',2)}break;
 case 'necromancer':if(classGate('soul',3)){hit(14);restore(7,false);classSummon(3,10,source,'skeleton')}break;
 case 'sorcerer':if(classGate('surge',2)){const n=Math.round(5+k.primary*.5);hit(n);hit(n);apply('vulnerable',4)}break;
 case 'summoner':classSummon(5,10,source,'pact');gainBlock(6);break;
 case 'druid':{
  let spirit=s.summons.find(p=>p.classPet==='spirit'&&p.duration>0);
  if(spirit){spirit.power=Math.min(8,spirit.power+2);spirit.duration=Math.max(10,spirit.duration);spirit.ownerId=source?.id}
  else classSummon(4,10,source,'spirit');gainBlock(6);break;
 }
 }
}
function classSummon(power,duration,source,kind){const before=s.summons.length;summon(power,duration,source);if(s.summons.length>before)s.summons.at(-1).classPet=kind}
function classIdentityHeal(actual,source){if(s.classId!=='druid'||actual<=0||!source||!s.items.includes(source)||defs[source.type].kind!=='sigil')return;classKit().sourceId=source.id;passive('growth',actual)}
function classIdentityDodge(){if(s.classId!=='trickster')return;const k=classKit(),decoy=k.decoy;k.decoy=null;if(!decoy||s.time>decoy.until)return;const source=s.items.find(i=>i.id===decoy.ownerId);if(source){classSummon(decoy.power,8,source,'illusion');classNotice('Mirror Dance: decoy consumed; illusion counterattacks.')}}
function classCompanionAmount(p,amount){if(s.classId!=='summoner')return amount;const k=classKit(),owner=s.items.find(i=>i.id===p.ownerId);return owner&&defs[owner.type].kind==='mace'&&s.time<(k.pactUntil||0)?amount+adjacencyWhole(owner,'classPact',amount*.08*k.pact):amount}
function classIdentityState(){
 const k=classKit();switch(s.classId){
 case 'rogue':return k.ambush?'Dagger ambush ready':'';
 case 'mystic':return k.temporal&&s.time<k.temporal.until?'Staff discharge ready':'Orb → staff';
 case 'ninja':return k.flow?'Empowered star ready':'Katana → star';
 case 'assassin':return s.time<(k.venomUntil||0)?'Daggers primed':'Poison → daggers';
 case 'huntress':return s.time<(k.markUntil||0)?'Bow mark ready':'Trap → bow';
 case 'trickster':return k.decoy&&s.time<k.decoy.until?'Decoy ready':'Prism → decoy';
 case 'paladin':return k.oath&&s.time<k.oath.until?'Oath active · adjacent weapons +10%':'';
 case 'summoner':return 'Pact '+(s.time<(k.pactUntil||0)?k.pact:0)+'/3';
 case 'kensei':return 'Sheath prepares dodge every 8s';
 case 'druid':{const p=s.summons.find(p=>p.classPet==='spirit'&&p.duration>0);return p?'Nurtured spirit · '+p.power+' damage/s':'Sigil healing → spirit'}
 default:return '';
 }
}

function classProgressText(c,stateText=classStateText()){const counter=['mystic','huntress','trickster','kensei'].includes(s.classId)?'':' · '+Math.floor(s.progress)+' / '+c.threshold;return c.title+counter+(stateText?' · '+stateText:'')}
