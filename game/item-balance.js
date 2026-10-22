/* Canonical RealmPack equipment rules. Loaded after the imported identity catalogue.
   IDs, sprites, names and save references stay stable; gameplay is family/tier driven. */
'use strict';
(()=>{
 const data=window.REALM_DATA;
 // [effect, amount, seconds, mana]. Tiered items retain their family's role and timing.
 const families={
  dagger:['damage',6,1.4,0],sword:['damage',17,2.8,0],bow:['damage',28,2.8,0],staff:['damage',13,2,0],wand:['damage',9,2,0],katana:['damage',11,1.9,0],
  quiver:['damage',12,4,0],spell:['damage',22,4,2],scepter:['damage',20,4.5,2],skull:['drain',16,4.5,3],
  tome:['heal',18,5,2],seal:['heal',9,3.5,1],shield:['block',15,4,0],sheath:['block',12,4,0],
  plate:['block',10,3.2,0],leather:['dodge',1,10,0],robe:['mana',2,4.5,0],
  cloak:['dodge',1,8,1],prism:['dodge',1,8,1],orb:['chill',2.5,6,1],helm:['haste',3,6,1],lute:['haste',3,5,1],
  poison:['poison',3,4,2],trap:['bleed',3,4,1],shuriken:['damage',14,3.5,0],wakizashi:['damage',14,5,1],
  mace:['summon',5,6,3],sigil:['heal',12,4,2]
 };
 const iconic={
  'Doom Bow':'charge','Leaf Bow':'relay','Coral Bow':'poisonburst','Staff of Extreme Prejudice':'row','Staff of the Crystal Serpent':'prism',
  'Dirk of Cronus':'double','Demon Blade':'blood','Crystal Shield':'barrier','Tome of Holy Protection':'laststand','Quiver of Thunder':'stasis',
  'Cloak of the Planewalker':'purify','Necronomicon':'sacrifice','Divinity':'fuse','Avarice':'isolation','Lumiaire':'overdrive','Superior':'spellchain',
  'Vesture of Duality':'phoenix','Crown':'capacitor','Bow of the Void':'wave','Sword of the Colossus':'shieldbash','Tome of Purification':'purify',
  'Corruption Cutter':'poisonburst',"Pirate King's Cutlass":'combination','S.T.A.F.F.':'mirror','Clockwork Repeater':'double','Mechanical Kogbold Limb':'fuse',
  'Socket Blade':'wardbreak','Tome of the Mushroom Tribes':'companion','Skull of Endless Torment':'sacrifice','Orb of Conflict':'stasis'
 };
 const mechanics=Object.fromEntries(data.items.filter(d=>d.mechanic).map(d=>[d.mechanic.key,d.mechanic]));
 const maxTier={};
 for(const d of data.items){const m=/^T(\d+)$/.exec(d.tier);if(m&&!d.isShiny)maxTier[d.kind]=Math.max(maxTier[d.kind]||0,+m[1])}
 const round=n=>Math.round(n*100)/100;
 function tune(d){
  const tier=/^T(\d+)$/.exec(d.tier),special=!tier&&d.group!=='consumable',top=maxTier[d.kind]||6;
  // Special equipment has a stated family baseline, not an ID-derived power roll.
  const rank=tier?+tier[1]:special?Math.max(1,top-2):0,scale=1+.09*rank;
  const oldMechanic=d.mechanic;delete d.mechanic;
  d.affix=null;d.affixAmount=0;d.condition='none';d.bonus=0;
  d.balanceVersion=1;d.balanceFamily=d.kind;d.progressionRank=rank;
  let recipe=families[d.kind];
  if(d.group==='ring'){
   d.balanceFamily='ring:'+d.effect;
   recipe=({damage:['damage',8,4.5,0],block:['block',7,4.5,0],heal:['heal',8,4.5,0],mana:['mana',2,4.5,0],haste:['haste',2,6,0]})[d.effect]||['mana',2,4.5,0];
  }
  if(d.group==='consumable')recipe=({heal:['heal',25,3,0],mana:['mana',6,3,0],block:['block',18,3,0],haste:['haste',4,3,0],charge:['charge',3,3,0]})[d.effect]||['heal',25,3,0];
  if(!recipe)throw Error('Missing equipment recipe: '+d.kind);
  const [effect,amount,seconds,mana]=recipe;d.effect=effect;d.mana=mana;
  // Integer-limited effects progress via cooldown/duration. Other families gain per-tier output.
  const fixed=effect==='dodge'||effect==='mana';
  d.amount=fixed?amount:['haste','chill'].includes(effect)?round(amount*(1+.055*rank)):Math.max(1,Math.round(amount*scale));
  d.cd=round(seconds*(fixed?1-.025*rank:1-.01*rank));
  d.price=Math.round(12+rank*3+(special?12:0));
  if(d.kind==='wakizashi'){d.affix='vulnerable';d.affixAmount=round(2+.15*rank)}
  if(d.kind==='sigil'){d.affix='summon';d.affixAmount=1}
  if(d.kind==='robe'){d.affix='block';d.affixAmount=2+Math.floor(rank/3)}
  if(special){
   // A special item has a 10% primary premium or a curated signature, not both.
   const key=iconic[d.name];
   if(key){
    const m=oldMechanic?.key===key?oldMechanic:mechanics[key];
    d.mechanic={...m,keepAffix:!!d.affix,keepCondition:false};
    d.mechanic.text=d.mechanic.text.replace(/ Core synergy:.*$/,'');
    // Preserve the signature's own magnitude so its description stays accurate.
    d.mechanic.n=m.n;
    // Curated cadence trades hit size for timing while keeping the family output budget.
    const cadence={'Doom Bow':1.6,'Dirk of Cronus':.7,'Staff of Extreme Prejudice':.75,'Demon Blade':1.5}[d.name]||1;
    d.cd=round(d.cd*cadence);d.amount=Math.max(1,Math.round(d.amount*cadence));
   }else{
    if(!fixed&&!['haste','chill'].includes(effect))d.amount=Math.round(d.amount*1.1);
    else d.cd=round(d.cd*.94);
    const name=d.name.toLowerCase();
    const flavor=/fire|flame|ember|inferno|cinder/.test(name)?'burn':/ice|frost|frozen|snow/.test(name)?'chill':/poison|toxic|venom|corrosion/.test(name)?'poison':/blood|vamp|soul|leech/.test(name)?'drain':/thorn|briar|fang|razor/.test(name)?'bleed':null;
    if(flavor&&d.group==='weapon'){d.affix=flavor;d.affixAmount=['burn','poison','bleed'].includes(flavor)?1:flavor==='chill'?1:2;d.amount=Math.max(1,Math.round(d.amount*.94))}
   }
  }
  d.balanceNote=tier?'Tiered '+d.kind+': reliable family progression.':special?'Special '+d.kind+': '+(d.mechanic?'curated signature.':'family baseline with a themed specialization.'):'One use per copy per battle.';
 }
 for(const d of data.items)if(!d.isShiny)tune(d);
 const byId=Object.fromEntries(data.items.map(d=>[d.id,d]));
 for(const d of data.items.filter(d=>d.isShiny)){
  const base=byId[d.baseId];if(!base)continue;
  for(const key of ['effect','amount','cd','mana','affix','affixAmount','condition','bonus','balanceVersion','balanceFamily','progressionRank','balanceNote'])d[key]=base[key];
  if(base.mechanic)d.mechanic={...base.mechanic};else delete d.mechanic;
  d.price=base.price*3;d.cd=round(base.cd*.95);d.amount=['haste','chill'].includes(base.effect)?round(base.amount*1.05):Math.max(base.amount,Math.round(base.amount*1.05));
 }
 // Tiered attribute rings have distinct jobs; curated UT/ST identities remain intact.
 for(const d of data.items){
  const tier=/^T(\d+)$/.exec(d.tier),attribute=/^Ring of (?:Minor |Greater |Superior |Paramount |Exalted |Unbound |Transcendent )?(Attack|Defense|Dexterity|Speed|Wisdom|Vitality|Health|Magic)$/.exec(d.name);
  if(d.group!=='ring'||!tier||!attribute)continue;
  const rank=+tier[1],key=attribute[1].toLowerCase();d.ringAttribute=key;d.balanceFamily='ring:'+key;
  if(['dexterity','vitality'].includes(key))continue;
  d.effect='support';d.amount=({attack:6+2*rank,defense:10+3*rank,speed:3+rank,wisdom:6+2*rank,health:8+4*rank,magic:3+2*rank})[key];
  d.balanceNote='Attribute ring: passive while packed; higher tiers improve its bonus.';
 }
 data.stats.signatureItems=data.items.filter(d=>d.mechanic).length;
 data.stats.mechanicTypes=new Set(data.items.filter(d=>d.mechanic).map(d=>d.mechanic.key)).size;
 data.stats.uniqueSignatures=new Set(data.items.map(d=>JSON.stringify([d.kind,d.tier,d.effect,d.amount,d.cd,d.mana,d.affix,d.affixAmount,d.mechanic?.key]))).size;
 data.stats.balanceVersion=1;
})();
