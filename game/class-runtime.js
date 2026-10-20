/* Class bonuses operate on real item output and have explicit feedback limits. */
'use strict';
function resetClassEffects(){s.fury=0;s.furyTime=0;s.focus=0;s.arcaneEchoReady=false;s.precisionReady=false;s.rhythmAt=-1e9}
function tickClassEffects(dt){s.furyTime=Math.max(0,(s.furyTime||0)-dt);if(!s.furyTime)s.fury=0}
function classPrimaryAmount(i,amount){const d=defs[i.type];if(s.classId==='warrior'&&d.group==='weapon')amount*=1+.08*(s.fury||0);if(s.classId==='samurai'&&d.kind==='wakizashi'){amount*=1+.4*(s.focus||0);s.focus=0}return Math.max(1,Math.round(amount))}
function classActivation(i,primary){const d=defs[i.type];
 if(s.classId==='archer'&&d.kind==='bow'){
  passive('bow',1);if(s.precisionReady){s.precisionReady=false;const quiver=nearbyItems(i).some(j=>defs[j.type].kind==='quiver');hit(Math.round(primary*(quiver?.75:.4)));log('✦ Precision shot'+(quiver?' · quiver empowered':'')+'.')}
 }
 if(s.classId==='wizard'&&s.arcaneEchoReady&&d.group==='ability'&&['damage','drain'].includes(d.effect)){
  s.arcaneEchoReady=false;hit(Math.round(primary*.8));log('✦ Arcane Echo repeats 80% of the spell’s primary damage.')
 }
 if(s.classId==='bard'&&itemHasHaste(i)&&s.time-(s.rhythmAt??-1e9)>=1){s.rhythmAt=s.time;passive('rhythm',1)}
}
function classStateText(){return s.classId==='warrior'?`Fury ${s.fury||0}/5 · +${(s.fury||0)*8}% weapon damage`:s.classId==='samurai'?`Focus ${s.focus||0}/3`:s.classId==='wizard'&&s.arcaneEchoReady?'Arcane Echo ready':''}
function delayEnemyAttack(seconds){const e=s.enemy,window=Math.floor(s.time/5);if(e.delayWindow!==window){e.delayWindow=window;e.delaySpent=0}const delay=Math.min(Math.max(0,seconds),Math.max(0,2-(e.delaySpent||0)));e.delaySpent=(e.delaySpent||0)+delay;e.charge=Math.max(-1.5,e.charge-delay);return delay}
