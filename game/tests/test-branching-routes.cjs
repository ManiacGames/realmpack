'use strict';
const {ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
const check=(v,m)=>{if(!v)throw Error(m)},fingerprints=new Set();let maps=0,restricted=0,paths=0;
for(let seed=1;seed<=150;seed++){
 freshRun('wizard',true);s.seed=(seed*2654435761)>>>0;s.portalChoices=pickDungeonPortals();selectPortal(s.portalChoices[seed%3]);check(s.mapGraphs[0]?.version===1,'No graph');fingerprints.add(JSON.stringify({branches:s.mapBranches,links:s.mapLinks}));
 const widths=Array.from({length:8},(_,r)=>s.mapBranches[r].length);check(widths[0]===1&&widths[6]===1&&widths[7]===1&&widths.slice(1,6).every(n=>n===2||n===3),'Wrong widths');
 for(let row=0;row<7;row++){const links=s.mapLinks[row];check(links.length===widths[row],'Missing source');for(const targets of links){check(targets.length&&new Set(targets).size===targets.length&&targets.every(n=>n>=0&&n<widths[row+1]),'Broken edge');if(targets.length<widths[row+1])restricted++}for(let n=0;n<widths[row+1];n++)check(links.some(a=>a.includes(n)),'Unreachable node');if(row===1||row===3){const type=row===1?'shop':'rest',service=s.mapBranches[row+1].findIndex(r=>r.type===type);check(service>=0&&links.every(a=>a.includes(service)),'Service inaccessible')}}
 const count=(row,n)=>row===7?1:s.mapLinks[row][n].reduce((sum,j)=>sum+count(row+1,j),0);const routes=count(0,0);check(routes>3,'Trivial path count');paths+=routes;
 const frozen=JSON.stringify({s,route:ROOMS}),rng=s.seed;mapRows();runMapMarkup(true);check(s.seed===rng&&JSON.stringify({s,route:ROOMS})===frozen,'Map read mutated generation');
 for(let row=1;row<=7;row++){
  nextRoom();if(s.phase==='path'){const allowed=mapReachableIndices(s.room),blocked=s.pathChoices.map((_,n)=>n).filter(n=>!allowed.includes(n));check(allowed.length,'Softlock');if(blocked.length){const before=JSON.stringify(s);selectPath(blocked[0]);check(before===JSON.stringify(s),'Disconnected room selectable')}selectPath(allowed[seed%allowed.length]);check(s.phase==='prep','Choice failed')}
  const before=JSON.stringify({branches:s.mapBranches,links:s.mapLinks,taken:s.mapTaken,seed:s.seed});s=JSON.parse(JSON.stringify(s));ROOMS=s.route;rebalanceSavedRoute();check(before===JSON.stringify({branches:s.mapBranches,links:s.mapLinks,taken:s.mapTaken,seed:s.seed}),'Reload changed graph');
 }
 check(ROOMS[s.room].type==='boss'&&s.room===7,'Wrong destination');maps++;
}
check(fingerprints.size===150&&restricted>0,'Routes repeat or links cosmetic');
// Existing generated saves are left intact until they select a new dungeon.
freshRun('wizard',true);selectPortal(s.portalChoices[0]);delete s.mapGraphs;delete s.mapLinks;const seed=s.seed,before=JSON.stringify(ROOMS);ensureActMap();check(s.seed===seed&&JSON.stringify(ROOMS)===before,'Old route rewritten');
return {maps,uniqueMaps:fingerprints.size,totalPaths:paths,restrictedConnections:restricted,checks:'connected lanes, distinct topology, services, no orphan nodes, blocked clicks, map purity, save/load, boss reachability, old routes'};
})()`,ctx));
