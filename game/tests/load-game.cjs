'use strict';
const fs=require('node:fs'),vm=require('node:vm'),path=require('node:path');const root=path.resolve(__dirname,'..');const ctx={window:{__TEST__:true},console,Date,setInterval(){return 1},clearInterval(){},setTimeout(){},clearTimeout(){},localStorage:{setItem(){},getItem(){return null}}};vm.createContext(ctx);
for(const f of ['sprites.js','sprites-runtime.js','catalogue.js','item-balance.js','encounters.js','mechanics-runtime.js','enchantments-runtime.js','events-runtime.js','map-runtime.js','inventory-controls.js','item-effects.js','adjacency-runtime.js','stacks-runtime.js','event-art.js','event-trades.js','dungeon-difficulty.js','class-runtime.js','game.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),ctx);

module.exports={ctx,vm};
