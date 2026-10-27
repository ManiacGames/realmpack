'use strict';
const {ctx,vm}=require('./load-game.cjs');
ctx.testDescriptionNodes={};ctx.document={getElementById:id=>ctx.testDescriptionNodes[id]??={innerHTML:''}};
console.log(vm.runInContext(`(()=>{
 freshRun('knight',true);selectPortal(s.portalChoices[0]);
 const check=(v,m)=>{if(!v)throw Error(m)},before=JSON.stringify(DATA.items),nodes=testDescriptionNodes;
 let passive=0,checked=0;
 for(const d of DATA.items){
  const text=itemPrimarySummary(d);check(typeof text==='string'&&text.trim()&&text!==d.effect&&!/undefined|NaN|Special effect —/.test(text),'Missing description: '+d.name);
  const item=makeItem(d.id);s.items=[];s.stash=[item];selected=inspected=item.id;renderDetail();
  check(nodes.detail.innerHTML.includes('<p class="inspection-description">'+esc(text)+'</p>'),'Inspection: '+d.name);
  for(const context of ['shop','reward'])check(rewardCard(d.id,context).includes('<p class="loot-primary">'+esc(text)+'</p>'),context+': '+d.name);
  if(passiveRing(d)&&d.ringAttribute){passive++;check(text.includes(String(d.amount)),'Missing ring value: '+d.name);check(describe(d).includes(String(d.amount)),'Full ring description: '+d.name)}
  if(d.consumableRework)check(text===consumableOfferSummary(d),'Consumable condition lost: '+d.name);
  if(d.mechanic&&!d.ringAttribute||d.affix&&!d.ringAttribute)check(text===describe(d),'Signature/secondary effect lost: '+d.name);
  checked++;
 }
 const ring=defs[DATA.byName['Ring of Exalted Attack']],summary=itemPrimarySummary(ring);
 check(summary.includes('Adjacent weapons')&&summary.includes('+'+ring.amount+'%'),'Exalted Attack regression');
 check(itemPrimarySummary(defs[DATA.byName['Ring of Magic']]).includes('opening mana'),'Opening mana missing');
 check(itemPrimarySummary(defs[DATA.byName['Ring of Health']]).includes('Equipping does not heal'),'Health-ring condition missing');
 check(JSON.stringify(DATA.items)===before,'Description mutated item definitions');
 return 'PASS: '+checked+' catalogue entries across inspection/shop/reward, '+passive+' passive attribute rings, numeric bonuses, signatures/secondary effects, consumable triggers and unchanged definitions';
})()`,ctx));
