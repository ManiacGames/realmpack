'use strict';
// Additional live-build checks using the original audit's intermediate/ceiling fixtures.
const fs=require('node:fs'),{ctx,vm}=require('./audit-encounters.cjs');
const output=process.argv[2]||'/tmp/realmpack-boss-validation.ndjson';fs.writeFileSync(output,'');
vm.runInContext(`
const leanTemplates=auditTemplates.filter(t=>t.build==='developing').map(t=>{s=JSON.parse(t.state);const healId=DATA.byName['Healing Tome'];s.items=s.items.filter(i=>i.type!==healId);for(const i of s.items){i.eventHaste=0;if(defs[i.type].once)i.quantity=1}s.max-=15;s.hp=s.max;s.relicPower=0;s.relicHaste=0;return {...t,build:'lean',state:JSON.stringify(s),gear:s.items.map(i=>({type:i.type,name:defs[i.type].name,x:i.x,y:i.y,rot:i.rot,quantity:i.quantity}))}});
const ceilingTemplates=[];
for(const classId of Object.keys(classes)){
 freshRun(classId,true);s.seed=123456;s.route=[];s.history=[];s.portalChoices=[];s.enemy=null;
 const native=classes[classId].startingIds.slice(0,3).map(id=>{const d=defs[id];return DATA.items.filter(x=>x.kind===d.kind&&x.group===d.group&&x.classes.includes(classId)&&/^T[0-9]+$/.test(x.tier)&&!x.isShiny&&!x.lootExcluded).sort((a,b)=>+b.tier.slice(1)-+a.tier.slice(1)||a.id.localeCompare(b.id))[0].id});
 let fit=false;
 for(let weapons=4;weapons>=2&&!fit;weapons--){s.items=[];s.stash=[];fit=true;for(const type of [...Array(weapons).fill(native[0]),native[1],native[2],DATA.byName['Tome of Holy Protection'],DATA.byName['Ring of Magic'],DATA.byName['Health Potion']]){const i=makeItem(type),d=defs[type];if(!autoPlace(i)){fit=false;break}if(d.once){i.quantity=5;continue}i.eventHaste=.2;if(['damage','drain','heal','block','mana','poison','burn','bleed','summon'].includes(d.effect)&&Math.round(d.amount*1.3)>d.amount)i.eventInfusion=.3;const fourth=['damage','drain'].includes(d.effect)?'might':d.effect==='block'?'bulwark':d.effect==='heal'?'restoration':'ward';i.enchantSlots=4;i.enchantments=['quickening','barrier','siphon',fourth].map(key=>{if(!ENCHANT_TYPES[key].eligible(d))throw Error('Illegal ceiling enchant');return {key,value:ENCHANT_TYPES[key].values[2],rank:3}})}}
 if(!fit)throw Error('Ceiling pack does not fit '+classId);s.max+=80;s.hp=s.max;s.relicPower=6;s.relicHaste=.24;
 ceilingTemplates.push({classId,build:'ceiling',state:JSON.stringify(s),uid,gear:s.items.map(i=>({type:i.type,name:defs[i.type].name,x:i.x,y:i.y,rot:i.rot,quantity:i.quantity,enchantSlots:i.enchantSlots,enchantments:itemEnchants(i),eventHaste:i.eventHaste||0,eventInfusion:i.eventInfusion||0}))})
}

function liveBossValidation(id){const e=encounterDefs[id],tier=dungeonRating(e.dungeon).level,rows=leanTemplates.map(t=>({...auditFight(t,e,10,123456),scenario:'lean-depth10'}));if(tier>=3)for(const t of auditTemplates.filter(t=>t.build!=='starter'))rows.push({...auditFight(t,e,tier===3?20:30,123456),scenario:'later-depth'});if(tier>=4)for(const t of ceilingTemplates)rows.push({...auditFight(t,e,30,123456),scenario:'ceiling-depth30'});return rows}
`,ctx);
let fights=0;
for(const id of vm.runInContext("ENCOUNTERS.encounters.filter(e=>e.role==='boss').map(e=>e.id)",ctx)){ctx.liveBossId=id;const rows=vm.runInContext('liveBossValidation(liveBossId)',ctx);for(const row of rows)fs.appendFileSync(output,JSON.stringify(row)+'\n');fights+=rows.length}
console.log(JSON.stringify({output,fights}));
