'use strict';
const {ctx,vm}=require('./load-game.cjs');
console.log(vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)},numbers=t=>t.replace(/0x[0-9a-f]+/gi,'').match(/[-+]?\\d+(?:\\.\\d+)?%?/g)||[];
 freshRun('knight',true);selectPortal(s.portalChoices[0]);const before=JSON.stringify(DATA.items);let rules=0;
 for(const d of DATA.items){const source=d.mechanic?realmText(d,d.mechanic.text):describe(d),short=shortItemCopy(source);
  // References may resolve to names containing numbers; ordinary text must preserve every numeric token exactly.
  if(!/0x[0-9a-f]+/i.test(source))check(JSON.stringify(numbers(source))===JSON.stringify(numbers(short)),'Changed numeric condition: '+d.name);
  if(d.mechanic){const markup=itemRuleMarkup(source);check(markup.includes('item-rule-list'),'No readable rules: '+d.name);if(source.length>180)check(markup.includes('<summary>Full rules</summary><p>'+esc(source)+'</p>'),'Original rules lost: '+d.name);rules++}
 }
 const find=name=>DATA.items.find(d=>d.name===name&&!d.isShiny),sheath=find('S.H.E.A.T.H.'),raw=realmText(sheath,sheath.mechanic.text),markup=itemRuleMarkup(raw),visible=markup.split('<details')[0];
 check(raw.split('Ability use: 4 damage').length>5,'Fixture no longer repeated');check(visible.split('Ability use: 4 damage').length===2,'Repeated trigger not combined');
 const cursed=find('Amulet of Desecration'),curse=itemRuleMarkup(realmText(cursed,cursed.mechanic.text));check(curse.includes('cannot receive any healing')&&curse.includes('666'),'Curse hidden or changed');
 const decimal='Gain 1.25 healing per activation. Cannot heal for 0.4s.';check(shortItemCopy(decimal)==='Gain 1.25 healing per use. Cannot heal for 0.4s.','Decimal/penalty corrupted');
 check(JSON.stringify(DATA.items)===before,'Copy changed recipes');return 'PASS: numeric conditions across all '+DATA.items.length+' items, '+rules+' formatted signatures, repeated-trigger regression, curses/decimals and exact original-rule fallback';
})()`,ctx));
