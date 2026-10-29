'use strict';
// Presentation only: these are recipe values, never simulated damage predictions.
const RealmStatMarkers={
 icons:{
  damage:{name:'damage',color:'#b85243',path:'m2 1 4 1 13 14 3-2 1 2-3 3 2 2-2 2-2-2-3 2-2-1 2-3L2 6zm20 0-4 1L5 16l-3-2-1 2 3 3-2 2 2 2 2-2 3 2 2-1-2-3L22 6z'},
  block:{name:'block',color:'#78818a',path:'M3 3h18v8c0 5-5 9-9 11-4-2-9-6-9-11z'},
  heal:{name:'healing',color:'#b94768',path:'M12 22 3 13C-3 5 7-1 12 5c5-6 15 0 9 8z'},
  mana:{name:'mana',color:'#357dbe',path:'m12 1 11 11-11 11L1 12z'},
  burn:{name:'burn stacks',color:'#bf672b',path:'M12 1c2 7 9 8 9 14a9 9 0 0 1-18 0c0-5 5-8 5-8l1 6c5-4 3-12 3-12z'},
  poison:{name:'poison stacks',color:'#638934',path:'M12 1C8 7 3 11 3 16a9 7 0 0 0 18 0c0-5-5-9-9-15z'},
  bleed:{name:'bleed stacks',color:'#a3373a',path:'M12 1C8 7 3 11 3 16a9 7 0 0 0 18 0c0-5-5-9-9-15z'},
  chill:{name:'chill',color:'#498b9b',path:'m12 1 3 5 6-1-1 6 3 3-5 3-1 6-5-3-5 3-1-6-5-3 3-3-1-6 6 1z'},
  weaken:{name:'weaken',color:'#8e7860',path:'M3 2h18v8l-5 3 3 5-7 5-9-8z',detail:'m5 4 5 5-4 3 8 8'},
  vulnerable:{name:'expose',color:'#9f6555',path:'M12 1a11 11 0 1 0 0 22 11 11 0 0 0 0-22',detail:'M1 12h5m12 0h5M12 1v5m0 12v5'},
  haste:{name:'adjacent haste',color:'#9c7d38',path:'M4 2h16v5l-5 5 5 5v5H4v-5l5-5-5-5z'},
  summon:{name:'companion damage/s',color:'#8563a1',path:'m12 1 3 6 7 2-4 6 1 7-7-3-7 3 1-7-4-6 7-2z'},
  thorns:{name:'thorns',color:'#56835b',path:'m12 1 3 6 7-3-3 7 4 5-7 1-4 6-3-6-7-1 4-5-3-7 7 3z'},
  dodge:{name:'dodge charges',color:'#628c8b',path:'M2 3h20l-3 10-7 10-4-7 7-6-10 2z'},
  charge:{name:'power',color:'#aa7647',path:'m14 1-4 8H3l6 6-2 8 15-14h-9z'},
  health:{name:'max health',color:'#a95362',path:'M12 22 3 13C-3 5 7-1 12 5c5-6 15 0 9 8z',detail:'M12 3v5m-2-3h4'},
  magic:{name:'max mana',color:'#427fa7',path:'m12 1 11 11-11 11L1 12z',detail:'M12 3v5m-2-3h4'},
  wisdom:{name:'adjacent ability output',color:'#8c65a6',path:'m12 1 11 11-11 11L1 12z'},
  speed:{name:'adjacent cooldown reduction',color:'#aa8c40',path:'m14 1-4 8H3l6 6-2 8 15-14h-9z'}
 },
 values(d){
  const result=[],add=(kind,n,unit='',prefix='')=>{if(this.icons[kind]&&Number.isFinite(n)&&n>0)result.push({kind,value:n,text:prefix+String(Math.round(n*100)/100)+unit,label:prefix+n+unit+' '+this.icons[kind].name})};
  if(d.effect==='support'){
   const role=d.ringAttribute;if(role)add(role==='attack'?'damage':role==='defense'?'block':role,d.amount,['health','magic'].includes(role)?'':'%','+');
   return result;
  }
  if(d.consumableRework&&!['supply','legacy'].includes(d.consumable?.mode)){if(d.consumable?.mode==='freeze')add('chill',d.consumable.amount,'s');return result}
  const effect=d.effect==='drain'?'damage':d.effect;
  add(effect,d.amount,['haste','chill','weaken','vulnerable'].includes(effect)?'s':'');
  if(d.effect==='drain'&&result.length)result[0].label+=' · heals for 40% dealt';
  if(d.affix&&(!d.mechanic||d.mechanic.keepAffix))add(d.affix,d.affixAmount,['haste','chill','weaken','vulnerable'].includes(d.affix)?'s':'');
  return result;
 },
 svg(kind){const i=this.icons[kind];return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 26 26"><path d="${i.path}" fill="${i.color}" stroke="#181e21" stroke-width="1.5"/>${i.detail?`<path d="${i.detail}" fill="none" stroke="#ead9b0" stroke-width="1.4"/>`:''}</svg>`},
 summary(d){const values=this.values(d);return values.length?'Base: '+values.map(v=>v.label).join(' · ')+'. Bonuses and special effects: F.':''}
};
window.RealmStatMarkers=RealmStatMarkers;
