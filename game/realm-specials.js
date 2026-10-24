/* Researched RotMG identities adapted to one enemy and a 6×5 backpack.
   Numerical values are RealmPack budgets, not copied RotMG damage values.
   Sources and limitations: docs/ut-st-identities.md. */
'use strict';
(()=>{
 const data=window.REALM_DATA,round=n=>Math.round(n*100)/100;
 const weapons={dagger:[6,1.4],sword:[17,2.8],bow:[28,2.8],staff:[13,2],wand:[9,2],katana:[11,1.9]};
 const shot=(title,text,cadence=1,power=1,extra={})=>({key:'realmshot',title,text,cadence,power,...extra});
 const ability=(title,text,effect,amount,cd,mana,extra={})=>({key:'realmability',title,text,effect,amount,cd,mana,...extra});
 const profiles={
  'Doom Bow':shot('Doom arrow','A single heavy piercing arrow. Very slow, powerful shots; no three-shot charge cycle.',2.2,1.04),
  'Leaf Bow':shot('Lightweight leaves','Rapid, smaller leaf arrows. Every fourth activation grants one dodge charge, at most once every 8s.',.65,.94,{evadeEvery:4,evadeLock:8}),
  'Coral Bow':shot('Twin coral arrows','Two piercing arrows share the displayed damage. Faster shots; no poison consumption.',.8,1,{shots:2}),
  'Staff of Extreme Prejudice':shot('Point-blank barrage','Ten pellets share the displayed damage. In the top backpack row: 125% primary damage; elsewhere: 65%. Slow, close-range specialization.',1.8,1,{shots:10,close:true}),
  'Staff of the Crystal Serpent':shot('Intertwined serpent bolts','Two weaving bolts share the displayed damage. Steady long-range fire; no cycling elemental ailments.',.9,.98,{shots:2}),
  'Dirk of Cronus':shot('Rainbow dirk','A heavy single dagger strike. Every fourth activation restores one mana, reflecting its wisdom bonus.',1.05,1.04,{manaEvery:4}),
  'Demon Blade':shot('Twin demon blades','Two blades share the displayed damage. Top backpack row: 125% primary damage; elsewhere: 65%. No self-damage.',.9,1,{shots:2,close:true}),
  'Avarice':shot('Gilded reach','Reliable long-range dagger shots from any backpack row. No isolation requirement or mana drain.',.95,1.04),
  'Lumiaire':shot('Light and dark','Two bolts share the displayed damage, landing together after 0.6s. Rapid fire; no additional mana cost.',.67,1.05,{shots:2,travel:.6}),
  'Superior':shot('Fourfold grandeur','Four bolts share the displayed damage. Each volley counts as one weapon activation, with no ability-charge requirement.',1,1.08,{shots:4}),
  'Bow of the Void':shot('Void arrow','A single piercing arrow. Fast, consistent shots from any row; no wave-opening damage cycle.',.95,1.04),
  'Sword of the Colossus':shot('Colossus edge','Heavy, consistent sword strikes. Does not consume your block to deal damage.',1.1,1.06),
  'Corruption Cutter':shot('Crossing cuts','Two fast, weaving cuts share the displayed damage. No poison consumption.',.83,1.01,{shots:2}),
  'Divinity':shot('Exalted beam','Each attack splits its displayed damage into a 60% sword hit and a 40% instant beam. The beam bypasses ward. No bombs or mana cost.',1.4,1.08,{key:'realmbeam',beam:.4}),
  'Cloak of the Planewalker':ability('Plane shift','Gain one dodge charge, then advance one adjacent weapon by 20% of its cooldown. Teleport/invisibility become evasion and repositioning; no cleanse.', 'dodge',1,8,2,{key:'realmshift',relay:.2}),
  'Tome of Purification':ability('Purifying prayer','Healing plus a complete cleanse of venom, silence and slow. Can activate while silenced.','heal',24,5.5,3,{key:'realmcleanse',cleanse:true}),
  'Tome of Holy Protection':ability('Holy armor','Gain block and 3s of Armored (20% less incoming damage; refreshes, never stacks). No instant heal.','block',20,7,4,{key:'realmguard',armored:3}),
  'Crystal Shield':ability('Crystal mantle','Gain block and 3s of Armored (20% less damage). While active, taking health damage fires an 8-damage shard and heals 3; at most once per second.','block',16,8,4,{key:'realmcrystal',armored:3,retaliate:8,retaliateHeal:3}),
  'Quiver of Thunder':ability('Thunder daze','Deal damage and chill for 3s, translating Dazed into slower enemy attacks. Applies on every activation.','damage',20,5,2,{key:'realmthunder',status:'chill',duration:3}),
  'Orb of Conflict':ability('Hex and soulshard','Other weapon activations build Hex (max 6). Consume it: +3 damage per Hex and summon one 2-damage soulshard for 6s if any Hex was consumed. No stasis.','damage',14,7,4,{key:'realmhex'}),
  'Helm of the Juggernaut':ability('Juggernaut armor','Grant adjacent items haste and gain 2.5s of Armored (20% less damage). Haste excludes self and does not stack.','haste',2.5,7,3,{key:'realmguard',armored:2.5}),
  'Seal of Blasphemous Prayer':ability('Borrowed divinity','Heal and prevent the next direct enemy attack within 1.5s. A shared 8s lock prevents chained immunity from multiple copies.','heal',12,9,4,{key:'realmdivine',divine:1.5}),
  'Necronomicon':ability('Forbidden curse','An offensive tome: deal damage and expose for 3s. Trades ordinary tome healing for a curse; never consumes summons.','damage',25,6,3,{key:'realmcurse',status:'vulnerable',duration:3}),
  'Tome of the Mushroom Tribes':ability('Healing mushroom','Plant a healing mushroom: distribute the displayed healing evenly over 6s instead of healing instantly. Only the strongest mushroom heals; refreshes do not stack.','heal',36,7,4,{key:'realmmushroom',regen:6})
 };
 const sets={
  vampire:{name:'Vampire Rogue',pieces:['Soulcursed Scythe','Vampiric Cape','Hallowed Hide',"Ruthven's Rosary"],full:'The cape summons one additional 1-damage bat for 4s.'},
  hollow:{name:'Hollow King Necromancer',pieces:['Edictum Praetoris','Memento Mori','Toga Picta','Interregnum'],full:'Memento Mori summons an additional 2-damage spirit for 6s.'},
  skuld:{name:'Skuld 2 The ReGhostening',pieces:['Etherite Dagger','Ghastly Drape','Mantle of Skuld','Spectral Ring of Horrors'],full:'Ghastly Drape adds an 8-damage nova and delays the next enemy attack by 0.4s.'},
  swoll:{name:'Swoll Paladin',pieces:['Pixie-Enchanted Sword','Seal of the Enchanted Forest','Fairy Plate','Ring of Pure Wishes'],full:'The forest seal grants 8 additional block and heals 4 additional health.'},
  geb:{name:'Priest of Geb',pieces:['Wand of Geb','Book of Geb','Shendyt of Geb',"Geb's Ring of Wisdom"],full:'Book of Geb restores one additional mana and heals 4 additional health.'},
  pirate:{name:'Pirate King Warrior',pieces:["Swashbuckler's Sickle",'Tricorne of the High Seas','Naval Uniform',"First Mate's Hook"],full:'The Tricorne fires an additional 12-damage cannonball.'},
  oryx:{name:'Oryx Awesome',pieces:['Sword of the Mad God','Onyx Shield of the Mad God','Almandine Armor of Anger','Almandine Ring of Wrath'],full:'The Onyx Shield grants 10 additional block and delays the enemy attack by 0.4s.'},
  phylactery:{name:'Phylactery Mystic',pieces:['The Phylactery','Soul of the Bearer','Soulless Robe','Ring of the Covetous Heart'],full:'Soul of the Bearer summons one 3-damage spirit for 6s.'}
 };
 Object.assign(profiles,{
  'Etherite Dagger':shot('Etherite flurry','Fast spirit-metal slashes, trading hit size for cadence.',.8,1),
  'Ghastly Drape':ability('Ghastly nova','Gain one dodge charge and fire a 10-damage nova. Full Skuld set strengthens the nova and adds a brief attack delay.','dodge',1,8,3,{extraDamage:10}),
  'Mantle of Skuld':ability('Spirit-channel mantle','Generate mana and 3 block, adapting the mantle’s MP and wisdom focus.','mana',1,5,0,{extraBlock:3}),
  'Spectral Ring of Horrors':ability('Soul reservoir','Generate mana and heal 2 health. Set progress counts distinct packed pieces.','mana',1,6,0,{extraHeal:2}),
  'Pixie-Enchanted Sword':shot('Four fae blades','Four blades share the displayed damage. Top backpack row: 125% primary damage; elsewhere: 65%.',1,1,{shots:4,close:true}),
  'Seal of the Enchanted Forest':ability('Forest blessing','Heal, grant 8 block and haste adjacent items for 2s.','heal',12,6,3,{extraBlock:8,localHaste:2}),
  'Fairy Plate':ability('Enchanted plate','A defensive fae plate. Completing its distinct four-piece set strengthens the forest seal.','block',18,4.5,0),
  'Ring of Pure Wishes':ability('Fae vitality','Gain block. If healed in the last 3s, also deal 8 damage, adapting its Healing-to-Attack proc.','block',6,5,0,{healingStrike:8}),
  'Wand of Geb':shot('Geb’s judgement','Steady wand fire. Every 5s, a slowing nova deals 5 damage and chills for 2s: top row only, or any row with the full Geb set.',1.05,.95,{novaDamage:5,novaChill:2,novaLock:5}),
  'Book of Geb':ability('Desert pilgrimage','Heal, deal 8 nova damage and grant adjacent items 2s of haste, adapting Speedy into local tempo.','heal',18,6,3,{extraDamage:8,localHaste:2}),
  'Shendyt of Geb':ability('Priestly linen','Generate mana and 3 block.','mana',2,5,0,{extraBlock:3}),
  "Geb's Ring of Wisdom":ability('Wisdom of Geb','Generate mana and heal 3 health.','mana',1,6,0,{extraHeal:3}),
  "Swashbuckler's Sickle":shot('Boarding blade','Reliable pirate sword strikes. Pair with its own Tricorne, uniform and hook for cannon support.',1.25,1.02),
  'Tricorne of the High Seas':ability('Cannon cluster','Fire a cannonball and grant adjacent items 2s of haste. Taking health damage also fires an 8-damage cannonball, at most once every 3s.','damage',18,7,3,{key:'realmcannon',localHaste:2,retaliate:8,retaliateLock:3}),
  'Naval Uniform':ability('Boarding uniform','A balanced defensive uniform for the Pirate King set.','block',14,3.8,0),
  "First Mate's Hook":ability('Hook strike','A small offensive strike, completing the Pirate King’s four distinct pieces.','damage',8,5,0),
  'Sword of the Mad God':shot('Mad God’s blade','Heavy sword strikes supported by the Oryx Awesome set.',1.1,1.02),
  'Onyx Shield of the Mad God':ability('Onyx stun','Gain block, deal 10 damage and delay the enemy attack by 0.5s. Shared attack-delay limits apply.','block',15,6,3,{extraDamage:10,delay:.5}),
  'Almandine Armor of Anger':ability('Almandine bulwark','Heavy block for the Oryx Awesome set.','block',18,4.5,0),
  'Almandine Ring of Wrath':ability('Almandine resolve','A smaller defensive pulse for the Oryx Awesome set.','block',8,5,0),
  'The Phylactery':shot('Phylactery bolts','Rapid single soul-orb shots, matching its unusual one-shot staff pattern.',.8,1),
  'Soul of the Bearer':ability('Bearer’s stasis','Chill and delay the enemy attack by 0.5s; grant adjacent items 2s of haste. Full set calls a spirit.','chill',2.5,7,3,{delay:.5,localHaste:2}),
  'Soulless Robe':ability('Soulless channel','Generate mana and 3 block.','mana',2,5,0,{extraBlock:3}),
  'Ring of the Covetous Heart':ability('Covetous reservoir','Generate mana to sustain the Phylactery Mystic set.','mana',2,6,0)
 });
 Object.assign(profiles,{
  'Vesture of Duality':ability('Duality bargain','Generate {amount} mana. +{maxMP} maximum mana while packed. Successful ability uses grant +20% weapon damage and +15% incoming direct damage for 3s. Refreshes; duplicate robes do not stack.','mana',2,3.5,0,{v2:true,key:'realmduality',maxMana:6,summary:'Generate {amount} mana; +{maxMP} max mana. Ability use trades protection for weapon damage.'}),
  'Mechanical Kogbold Limb':shot('Piercing mechanical bolts','Two slow bolts share the displayed damage; 75% bypasses enemy ward. No delayed bombs.',3,1.02,{v2:true,shots:2,pierce:.75,summary:'Slow twin bolts; 75% of their combined damage bypasses ward.'}),
  'Fungal Breastplate':ability('Fungal restoration','+{maxHP} maximum HP while packed, without refilling health. Restore {amount} HP per activation; no innate block pulse. Duplicate capacity bonuses of the same identity do not stack.','heal',12,3.5,0,{v2:true,maxHealth:24,summary:'Heal {amount} HP per activation; +{maxHP} maximum HP while packed.'}),
  'Breastplate of New Life':ability('Marble vitality','+{maxHP} maximum HP while packed, without refilling health. Gain {amount} block per activation. Duplicate capacity bonuses of the same identity do not stack.','block',14,3.6,0,{v2:true,maxHealth:45,summary:'Gain {amount} block; +{maxHP} maximum HP while packed.'}),
  'The Forgotten Crown':ability('Forgotten royalty','+{maxHP} max HP while packed, without healing. Adjacent weapons gain +{weaponDamage}% primary damage and +{weaponRate}% recharge rate. Shared primary cap +35%; strongest two matching gear auras. No mana generation.','support',1,5,0,{v2:true,passivePrimary:true,replacesRingAura:true,maxHealth:18,weaponDamage:.08,weaponRate:.06,summary:'+{maxHP} max HP; adjacent weapons gain +{weaponDamage}% damage and +{weaponRate}% recharge.'}),
  'Skull of Endless Torment':ability('Raised torment','Raise a 7s undead that deals {amount} damage and heals 1 HP each second. Only one Torment undead at a time. Its actual healing charges this skull to 8; the next cast spends that meter on a 20-damage drain burst and cleanses venom, silence and slow. Never consumes companions.','summon',4,6.5,4,{v2:true,key:'realmundead',summary:'Raise a healing undead. Its healing charges a cleansing drain burst.'}),
  'Socket Blade':shot('Ratcheting gear strike','A very slow, heavy close-range gear strike. Top backpack row: 125% primary damage; elsewhere: 65%. No automatic ward removal.',3.3,1.02,{v2:true,close:true,summary:'Very slow, heavy strike: 125% damage in the top row, 65% elsewhere.'}),
  'Vampiric Cape':ability('Vampiric concealment','Gain one dodge and heal 12 HP over 4s. Strongest cape field only. With Soulcursed Scythe: 2s adjacent haste. With Ruthven’s Rosary: three 1-damage bats for 4s, shared three-bat limit.','dodge',1,8,2,{v2:true,key:'realmvampire',summary:'Gain one dodge and heal over 4s; matching set partners add haste and bats.'}),
  'Hallowed Hide':ability('Ruthven’s hide','+{maxHP} max HP; adjacent weapons gain +{weaponDamage}% primary damage. Gain {amount} block per activation. With a packed Ruthven’s Rosary, taking health damage below 50% HP restores 12 HP; shared 15s lock. Cannot rescue a lethal hit.','block',6,5,0,{v2:true,key:'realmhide',maxHealth:10,weaponDamage:.04,summary:'Gain {amount} block; +{maxHP} max HP. Rosary enables emergency healing.'}),
  "Ruthven's Rosary":ability('Ruthven’s vitality','+{maxHP} maximum HP while packed. Restore {amount} HP and 1 mana per activation; enables the cape’s bats and hide’s emergency heal.','heal',3,6,0,{v2:true,maxHealth:12,extraMana:1,summary:'Heal {amount} HP and restore 1 mana; +{maxHP} maximum HP.'}),
  'Edictum Praetoris':shot('Praetorian spiral','Three slower spiral projectiles share the displayed damage. Each volley is one activation; no multiplied flat-power or enchantment procs.',1.33,1,{v2:true,shots:3,summary:'A slower three-projectile volley; displayed damage is the total.'}),
  'Memento Mori':ability('Mori’s command','Raise one non-healing {amount}-damage undead for 8s (strongest Mori undead only). Grants +10% weapon damage for 3s, refreshing without stacking. Full Hollow King set adds a 2-damage spirit for 6s.','summon',6,6,4,{v2:true,key:'realmmori',summary:'Raise a non-healing undead; +10% weapon damage for 3s.'}),
  'Toga Picta':ability('Imperial battle robe','+{maxMP} max mana. Adjacent weapons gain +{weaponDamage}% primary damage but have 5% longer cooldowns. Gain {amount} block per activation. Does not refill mana.','block',8,4.8,0,{v2:true,maxMana:6,weaponDamage:.08,weaponSlow:.05,summary:'Gain {amount} block; +{maxMP} max mana. Adjacent weapons hit harder but recharge slower.'}),
  'Interregnum':ability('Interregnum resolve','+{maxHP} max HP. Heal {amount} HP per activation. Every third successful ability activation grants +8% weapon damage for 4s, with a shared 8s lock. Deterministic adaptation of its chance proc.','heal',2,6,0,{v2:true,key:'realminterregnum',maxHealth:12,summary:'Heal {amount} HP; +{maxHP} max HP. Every third ability can grant a short weapon buff.'})
 });
 const byName=Object.fromEntries(Object.entries(sets).flatMap(([key,set])=>set.pieces.map((name,slot)=>[name,{key,slot}])));
 function configure(d,p){
  const recipe=weapons[d.kind];
  if(recipe){const rank=d.progressionRank;d.effect='damage';d.amount=Math.max(1,Math.round(recipe[0]*(1+.09*rank)*(p.cadence||1)*(p.power||1)));d.cd=round(recipe[1]*(1-.01*rank)*(p.cadence||1));d.mana=0}
  else {d.effect=p.effect;d.amount=p.amount;d.cd=p.cd;d.mana=p.mana}
  d.affix=null;d.affixAmount=0;d.condition='none';d.bonus=0;
  const member=byName[d.name];if(member){d.realmSet=member.key;d.realmSlot=member.slot}
  d.mechanic={...p,n:0,keepAffix:false,keepCondition:false};
  d.balanceNote='RotMG-inspired '+d.tier+' identity; RealmPack values and timing.';
  d.realmIdentity=true;
 }
 for(const d of data.items)if(!d.isShiny&&profiles[d.name]){
  const p=d.name==='Skull of Endless Torment'&&d.id==='wiki_53191'?ability('Retro purifying drain','Deal {amount} drain damage and cleanse venom, silence and slow. The retro skull retains its older drain identity; no companion sacrifice.','drain',20,6,3,{v2:true,key:'realmcleanse',cleanse:true,summary:'Drain {amount} damage and cleanse venom, silence and slow.'}):profiles[d.name];configure(d,p)
 }
 // Set membership alone preserves the user-authored dagger stats and mechanics.
 for(const d of data.items)if(!d.isShiny&&byName[d.name]){d.realmSet=byName[d.name].key;d.realmSlot=byName[d.name].slot}
 const byId=Object.fromEntries(data.items.map(d=>[d.id,d]));
 for(const d of data.items.filter(d=>d.isShiny)){
  const base=byId[d.baseId];if(!base?.realmIdentity)continue;
  for(const key of ['effect','mana','affix','affixAmount','condition','bonus','balanceNote','realmIdentity','realmSet','realmSlot'])if(base[key]!==undefined)d[key]=base[key];
  d.mechanic={...base.mechanic};if(d.mechanic.v2)for(const k of ['maxHealth','maxMana','weaponDamage','weaponRate'])if(d.mechanic[k])d.mechanic[k]=['maxHealth','maxMana'].includes(k)?Math.round(d.mechanic[k]*1.05):round(d.mechanic[k]*1.05);d.amount=['haste','chill'].includes(base.effect)?round(base.amount*1.05):Math.max(base.amount,Math.round(base.amount*1.05));d.cd=round(base.cd*.95);
 }
 window.REALM_SPECIALS={profiles,sets};
 data.stats.realmIdentities=data.items.filter(d=>d.realmIdentity).length;
 data.stats.signatureItems=data.items.filter(d=>d.mechanic).length;
 data.stats.mechanicTypes=new Set(data.items.filter(d=>d.mechanic).map(d=>d.mechanic.key)).size;
 data.stats.uniqueSignatures=new Set(data.items.map(d=>JSON.stringify([d.kind,d.tier,d.effect,d.amount,d.cd,d.mana,d.affix,d.affixAmount,d.mechanic,d.realmSet]))).size;
})();

function realmSetCount(key){const cache=prepareCombatGeometry();if(cache)return cache.sets.get(key)?.size||0;return new Set((s?.items||[]).filter(i=>defs[i.type].realmSet===key).map(i=>defs[i.type].realmSlot)).size}
function realmSetRate(i){const key=defs[i.type].realmSet;return key&&realmSetCount(key)>=3?.08:0}
function realmSetMarkup(d){const set=window.REALM_SPECIALS.sets[d.realmSet];if(!set)return '';const count=realmSetCount(d.realmSet);return `<div class="mechanic-note"><b>ST · ${esc(set.name)} · ${count}/4 packed</b><p>${count>=2?'●':'○'} 2 pieces: +8% primary effect for this set.<br>${count>=3?'●':'○'} 3 pieces: +8% recharge for this set.<br>${count>=4?'●':'○'} 4 pieces: ${esc(set.full)}</p><details><summary>Matching set pieces</summary><small>${set.pieces.map((name,slot)=>`${(s?.items||[]).some(i=>defs[i.type].realmSet===d.realmSet&&defs[i.type].realmSlot===slot)?'✓':'○'} ${esc(name)}`).join('<br>')}</small></details><small>Distinct packed pieces only; duplicates, legacy versions and stash do not count. Full-set proc: one designated ability, at most once every 4s.</small></div>`}
function realmPrimaryAmount(i,amount){const d=defs[i.type],m=d.mechanic;if(d.daggerUpdate)amount=daggerPrimary(i,amount);if(d.swordIdentity)amount=swordPrimaryAmount(i,amount);if(d.staffIdentity)amount=staffPrimaryAmount(i,amount);if(d.wandIdentity)amount=wandPrimaryAmount(i,amount);if(d.katanaIdentity)amount=katanaPrimaryAmount(i,amount);if(m.close)amount*=i.y===0?1.25:.65;if(d.realmSet&&realmSetCount(d.realmSet)>=2)amount*=1.08;if(m.key==='realmhex'){const state=specialState(i);if(state.hexWave!==s.enemy.wave){state.counter=0;state.hexWave=s.enemy.wave}amount+=state.counter*3}return amount}
// Split the total budget rather than multiplying flat power or activation procs per pellet.
function realmDamageParts(i,total){if(defs[i.type].katanaIdentity)return katanaDamage(i,total);if(defs[i.type].wandIdentity)return wandDamage(i,total);if(defs[i.type].staffIdentity)return staffDamage(i,total);if(defs[i.type].swordIdentity)return swordDamage(i,total);if(defs[i.type].daggerUpdate)return daggerDamage(i,total);const d=defs[i.type],m=d.mechanic,e=s.enemy,damage=Math.max(0,Math.round(total+s.power)),pierce=m.beam||m.pierce||0,bypass=Math.round(damage*pierce),ordinary=damage-bypass;let dealt=0;const count=m.beam?1:(m.shots||1);for(let n=0;n<count;n++){const part=Math.floor(ordinary*(n+1)/count)-Math.floor(ordinary*n/count);if(part)dealt+=hit(part)}if(bypass){const ward=e.ward;e.ward=0;dealt+=hit(bypass);e.ward=ward}if(m.beam){itemFxPulse(i,'damage','✦');log('✦ '+d.name+' · Exalted beam')}return dealt}
function realmApplyPrimary(i,amount){const d=defs[i.type],m=d.mechanic;if(m.passivePrimary)return;if(m.key==='realmundead'){const state=specialState(i);if((state.tormentMeter||0)>=8){state.tormentMeter-=8;apply('drain',20,i);s.venom=0;s.venomTime=0;s.silence=0;s.slow=0}realmSpawn('torment',amount,7,1,i,1);return}if(m.key==='realmmori'){realmSpawn('mori',amount,8,1,i);s.realmMoriUntil=s.time+3;return}if(d.effect==='damage'){if(m.travel){const queue=s.realmProjectiles||(s.realmProjectiles=[]);if(queue.length<24)queue.push({time:m.travel,damage:amount+s.power,wave:s.enemy.wave,name:d.name,source:i.id,armorActivation:i.activations});return}return realmDamageParts(i,amount)}if(m.regen){const current=s.realmMushroom,rate=amount/m.regen;if(!current||rate>=current.total/current.duration)s.realmMushroom={sourceId:i.id,total:amount,duration:m.regen,elapsed:0,pulses:0};return}apply(d.effect,amount,i)}
function realmAfterActivation(i){const d=defs[i.type],m=d.mechanic,state=specialState(i),ordinal=i.activations;
 if(m.healingStrike&&s.time-(s.realmLastHeal??-1000)<=3)hit(m.healingStrike);if(m.novaDamage&&(i.y===0||d.realmSet&&realmSetCount(d.realmSet)===4)&&s.time>=(state.nextNova||0)){hit(m.novaDamage);apply('chill',m.novaChill,i);state.nextNova=s.time+m.novaLock}if(m.v2&&m.extraMana)gainMana(m.extraMana,i);if(m.extraDamage)hit(m.extraDamage);if(m.extraBlock)gainBlock(m.extraBlock,i);if(m.extraHeal)restore(m.extraHeal,true,i);if(m.localHaste)grantItemHaste(i,m.localHaste);
 if(m.cleanse){s.venom=0;s.venomTime=0;s.silence=0;s.slow=0}
 if(m.status)apply(m.status,m.duration,i);if(m.delay)delayEnemyAttack(m.delay);
 if(m.armored){s.realmArmoredUntil=Math.max(s.realmArmoredUntil||0,s.time+m.armored);if(m.key==='realmcrystal')state.armoredUntil=s.time+m.armored}
 if(m.relay){const target=nearbyItems(i).filter(j=>defs[j.type].group==='weapon').sort((a,b)=>a.charge/cooldown(a)-b.charge/cooldown(b))[0];if(target)rechargeItem(target,m.relay,i)}
 if(m.manaEvery&&ordinal%m.manaEvery===0)gainMana(1,i);
 if(m.evadeEvery&&ordinal%m.evadeEvery===0&&s.time>=(state.nextEvade||0)){s.dodge=Math.min(3,s.dodge+1);state.nextEvade=s.time+m.evadeLock}
 if(m.divine&&s.time>=(s.realmDivineReady||0)){s.realmDivineUntil=s.time+m.divine;s.realmDivineReady=s.time+8}
 if(m.key==='realmhex'){if(state.counter>0)summon(2,6);state.counter=0}
 if(m.key==='realmvampire'){
  const current=s.realmCapeHealing;if(!current||current.until<=s.time)s.realmCapeHealing={sourceId:i.id,remaining:12,until:s.time+4,next:s.time+1};
  if(realmPackedSlot('vampire',0))grantItemHaste(i,2);
  if(realmPackedSlot('vampire',3))for(let n=0;n<3;n++)realmSpawn('bat',1,4,3,i);
 }
 if(d.katanaIdentity)katanaAfterActivation(i);if(d.wandIdentity)wandAfterActivation(i);if(d.staffIdentity)staffAfterActivation(i);if(d.swordIdentity)swordAfterActivation(i);if(d.daggerUpdate)daggerAfterActivation(i);realmFullSetProc(i);
}
function realmFullSetProc(i){const d=defs[i.type],key=d.realmSet;if(!key||d.realmSlot!==1||realmSetCount(key)<4||s.items.find(j=>defs[j.type].realmSet===key&&defs[j.type].realmSlot===1)?.id!==i.id)return;const ready=s.realmSetReady||(s.realmSetReady={});if(s.time<(ready[key]||0))return;ready[key]=s.time+4;switch(key){case'vampire':realmSpawn('royalbat',1,4,1,i);break;case'hollow':summon(2,6);break;case'skuld':hit(8);delayEnemyAttack(.4);break;case'swoll':gainBlock(8,i);restore(4,true,i);break;case'geb':restore(4,true,i);gainMana(1,i);break;case'pirate':hit(12);break;case'oryx':gainBlock(10,i);delayEnemyAttack(.4);break;case'phylactery':summon(3,6);break}itemFxPulse(i,'utility','ST');log('✦ '+window.REALM_SPECIALS.sets[key].name+' full-set effect')}
function realmOnHurt(amount){if(amount<=0||s.hp<=0)return;for(const i of s.items){const m=defs[i.type].mechanic;if(m?.key==='realmhide'&&s.hp<s.max*.5&&realmPackedSlot('vampire',3)&&s.time>=(s.realmHideReady||0)){s.realmHideReady=s.time+15;restore(12,true,i)}if(!m?.retaliate)continue;const state=specialState(i);if(m.key==='realmcrystal'&&s.time>=(state.armoredUntil||0)||s.time<(state.nextRetaliation||0))continue;state.nextRetaliation=s.time+(m.retaliateLock||1);hit(m.retaliate);if(m.retaliateHeal)restore(m.retaliateHeal,true,i);itemFxPulse(i,'damage','↗')}}
function resetRealmSpecials(){resetArmorMechanics();resetSpecialRings();resetKatanaMechanics();resetWandMechanics();resetStaffMechanics();resetSwordMechanics();resetDaggerMechanics();s.realmDualityUntil=0;s.realmMoriUntil=0;s.realmInterregnumUntil=0;s.realmInterregnumReady=0;s.realmHideReady=0;s.realmCapeHealing=null;s.daggerInvulnerableUntil=0;s.daggerRewardedWaves=[];s.realmLastHeal=-1000;s.realmArmoredUntil=0;s.realmDivineUntil=0;s.realmDivineReady=0;s.realmMushroom=null;s.realmProjectiles=[];s.realmSetReady={}}
function tickRealmSpecials(dt){tickArmorMechanics(dt);tickSpecialRings(dt);tickKatanaMechanics(dt);tickWandMechanics(dt);tickStaffMechanics(dt);tickSwordMechanics(dt);tickDaggerMechanics(dt);const cape=s.realmCapeHealing;if(cape){while(cape.remaining>0&&s.time+1e-8>=cape.next&&cape.next<=cape.until){const source=s.items.find(i=>i.id===cape.sourceId);if(source)restore(3,true,source);cape.remaining-=3;cape.next++}if(cape.remaining<=0||s.time>cape.until)s.realmCapeHealing=null}const queue=s.realmProjectiles||[];for(const p of queue){p.time-=dt;if(p.time<=0&&p.wave===s.enemy.wave){armorProjectileImpact(p);log('✦ '+p.name+' bolts arrive.')}}s.realmProjectiles=queue.filter(p=>p.time>0&&p.wave===s.enemy.wave);const shroom=s.realmMushroom;if(shroom){shroom.elapsed=Math.min(shroom.duration,shroom.elapsed+dt);while(shroom.pulses+1<=shroom.elapsed+1e-8&&shroom.pulses<shroom.duration){const before=Math.floor(shroom.total*shroom.pulses/shroom.duration);shroom.pulses++;restore(Math.floor(shroom.total*shroom.pulses/shroom.duration)-before,true,s.items.find(i=>i.id===shroom.sourceId))}if(shroom.elapsed>=shroom.duration)s.realmMushroom=null}}

function realmStateText(i){const d=defs[i.type],m=d.mechanic,state=specialState(i),parts=['Activations: '+i.activations];if(d.armorIdentity)parts.push(armorStateText(i));if(d.specialRingIdentity)parts.push(specialRingStateText(i));if(d.katanaIdentity){const text=katanaStateText(i);if(text)parts.push(text)}if(d.wandIdentity){const text=wandStateText(i);if(text)parts.push(text)}if(d.staffIdentity){const text=staffStateText(i);if(text)parts.push(text)}if(d.daggerUpdate){if(m.components?.some(c=>c.frontOnly))parts.push(i.y===0?'Full crystal barrage':'Outer bolts only');if(m.revRate)parts.push('Rev: '+(s.time<(state.revUntil||0)?state.revStacks||0:0)+'/10');if(m.burstCount)parts.push('Burst: '+(i.activations%m.burstCount)+'/3');if(m.foodEvery)parts.push('Food: '+(i.activations%m.foodEvery)+'/10');if(m.lethal)parts.push(s.time<(s.daggerLethalUntil||0)?'Lethal Strike':'Cloak ready')}if(m.arrow)parts.push('Arrow charge: '+(state.arrowCharge||0)+'/100');if(m.rapier)parts.push('Lunge: '+(i.activations%5)+'/5');if(m.wingEvery)parts.push('Wings: '+(i.activations%3)+'/3');if(m.innerFraction)parts.push(i.y===0?'Head + short segments':'Head only');if(m.sword&&(m.amulets||m.syndicate))parts.push('Partner bonus: +'+Math.round(swordPartner(i)*100)+'%');if(m.key==='realmundead')parts.push('Torment healing: '+(state.tormentMeter||0)+'/8');if(m.key==='realmhex')parts.push('Hex: '+(state.hexWave===s.enemy.wave?state.counter:0)+'/6');if(m.close)parts.push(i.y===0?'Point-blank: 125%':'Out of close range: 65%');if(d.realmSet)parts.push('ST: '+realmSetCount(d.realmSet)+'/4 packed');if(m.regen)parts.push(s.realmMushroom?'Mushroom: '+Math.ceil(s.realmMushroom.duration-s.realmMushroom.elapsed)+'s':'Mushroom ready');return parts.join(' · ')}

function realmPackedSlot(key,slot){return (s?.items||[]).some(i=>defs[i.type].realmSet===key&&defs[i.type].realmSlot===slot)}
function realmModifier(i,key){if(defs[i.type].armorIdentity){if(['maxHealth','maxMana'].includes(key))return Math.max(0,armorStats(i)[key==='maxHealth'?'health':'magic']);return (defs[i.type].mechanic[key]||0)*(defs[i.type].mechanic.armorShiny||1)}if(defs[i.type].specialRingIdentity&&['maxHealth','maxMana'].includes(key))return Math.max(0,specialRingStats(i)[key==='maxHealth'?'health':'magic']||0);return (defs[i.type].mechanic?.[key]||0)*(defs[i.type].group==='ring'?1+(i.potionUpgrades?.ringStrength||0):1)}
function realmEquipmentStats(){
 if(!s)return {health:0,mana:0};const cache=prepareCombatGeometry();if(cache?.realmStats)return cache.realmStats;
 const identities=new Map();for(const i of s.items){const d=defs[i.type],name=defs[d.baseId]?.name||d.name,old=identities.get(name)||{health:0,mana:0};old.health=Math.max(old.health,realmModifier(i,'maxHealth'));old.mana=Math.max(old.mana,realmModifier(i,'maxMana'));identities.set(name,old)}
 const result={health:Math.min(80,Math.round([...identities.values()].reduce((n,v)=>n+v.health,0)))-swordEquipmentPenalty()-specialRingPenalty('health')-armorEquipmentPenalty('health'),mana:Math.min(20,Math.round([...identities.values()].reduce((n,v)=>n+v.mana,0)))-specialRingPenalty('magic')-armorEquipmentPenalty('magic')};if(cache)cache.realmStats=result;return result
}
function realmSummary(d){return realmText(d,d.mechanic?.summary||'')}
function realmText(d,text){return text.replace(/\{(amount|maxHP|maxMP|weaponDamage|weaponRate)\}/g,(_,key)=>key==='amount'?d.amount:key==='maxHP'?d.mechanic.maxHealth||0:key==='maxMP'?d.mechanic.maxMana||0:Math.round((d.mechanic[key]||0)*10000)/100)}
function realmWeaponMultiplier(i){if(s.phase!=='fight'||defs[i.type].group!=='weapon')return 1;return katanaWeaponMultiplier(i)*(1+swordWeaponBuff()+daggerWeaponBuff()+(s.time<(s.realmDualityUntil||0)&&s.items.some(j=>defs[j.type].mechanic?.key==='realmduality')?.2:0)+(s.time<(s.realmMoriUntil||0)&&s.items.some(j=>defs[j.type].mechanic?.key==='realmmori')?.1:0)+(s.time<(s.realmInterregnumUntil||0)&&s.items.some(j=>defs[j.type].mechanic?.key==='realminterregnum')?.08:0))}
function realmAbilityEvent(){
 for(const i of s.items){const m=defs[i.type].mechanic;if(m?.key==='realmduality')s.realmDualityUntil=s.time+3;
  if(m?.key==='realminterregnum'){const state=specialState(i);state.abilityCount=(state.abilityCount||0)+1;if(state.abilityCount>=3&&s.time>=(s.realmInterregnumReady||0)){state.abilityCount=0;s.realmInterregnumUntil=s.time+4;s.realmInterregnumReady=s.time+8}}
 }
}
function realmSpawn(kind,power,duration,limit,source,heal=0){
 const matching=s.summons.filter(p=>p.realmKind===kind),existing=matching.sort((a,b)=>a.duration-b.duration)[0];
 if(matching.length>=limit){if(power>=existing.power)Object.assign(existing,{power,duration:Math.max(existing.duration,duration),ownerId:source.id,realmHeal:heal,wave:s.enemy.wave});return}
 if(s.summons.length<8)s.summons.push({power,duration,realmKind:kind,ownerId:source.id,realmHeal:heal,wave:s.enemy.wave})
}
function realmCompanionHealing(){
 for(const p of s.summons){if(!p.realmHeal)continue;const owner=s.items.find(i=>i.id===p.ownerId);if(!owner)continue;const actual=restore(p.realmHeal,true,owner);if(actual>0&&p.realmKind==='torment'){const state=specialState(owner);state.tormentMeter=Math.min(8,(state.tormentMeter||0)+actual)}}
}
function realmCanCleanse(i){const m=defs[i.type].mechanic;return m?.key==='purify'||!!m?.cleanse||m?.key==='realmundead'&&(specialState(i).tormentMeter||0)>=8}
