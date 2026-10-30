const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');
const base=path.resolve(__dirname,'..');let saves={};
const ctx={window:{__TEST__:true},console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(k,v){saves[k]=v},getItem(k){return saves[k]||null}}};vm.createContext(ctx);
for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','item-balance.js','realm-specials.js','dagger-update.js','sword-update.js','staff-update.js','wand-update.js','katana-update.js','ring-update.js','armor-update.js','ability-update.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','consumables-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','battle-floors.js','class-runtime.js','shop-specialists.js','game.js'])vm.runInContext(fs.readFileSync(path.join(base,f),'utf8'),ctx);
console.log(vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)};
 const base=Object.keys(DATA.shinyByBase).find(id=>defs[id]&&!defs[id].isShiny), variants=DATA.shinyByBase[base];
 for(const role of ['combat','elite','boss']){
  check(SHINY_RATES[role]===.1,'Exact 10% rate '+role);
  for(const roll of [0,.099999])check(variants.includes(shinyUpgrade(base,role,()=>roll)),'Upgrade below threshold '+role);
  for(const roll of [.1,.999999])check(shinyUpgrade(base,role,()=>roll)===base,'No upgrade at/above threshold '+role);
  let wins=0;for(let n=0;n<1000;n++){let call=0;const id=shinyUpgrade(base,role,()=>call++?0:n/1000);if(id!==base)wins++}
  check(wins===100,'100 upgrades per 1000 evenly spaced rolls '+role);
 }
 const multiple=Object.keys(DATA.shinyByBase).find(id=>DATA.shinyByBase[id].length>1), choices=DATA.shinyByBase[multiple];
 for(let n=0;n<choices.length;n++){let call=0;check(shinyUpgrade(multiple,'boss',()=>call++?(n+.5)/choices.length:0)===choices[n],'Every variant remains selectable')}
 const plain=Object.keys(defs).find(id=>!defs[id].isShiny&&!DATA.shinyByBase[id]);
 for(const id of [plain,variants[0],'missing-item'])check(shinyUpgrade(id,'boss',()=>{throw Error('Ineligible roll')})===id,'Ineligible unchanged');
 check(shinyUpgrade(base,'shop',()=>{throw Error('Shop roll')})===base,'Shinies remain drop-only');
 return 'PASS: exact 1/10 shiny rewards, threshold boundaries, all variants, ineligible items and shops';
})()`,ctx));
