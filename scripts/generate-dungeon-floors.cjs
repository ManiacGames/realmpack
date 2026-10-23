/* Rebuild the original SVG tiles; integer coordinates preserve the pixel style. */
'use strict';
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const root=path.resolve(__dirname,'..'),ctx=vm.createContext({});
vm.runInContext(fs.readFileSync(path.join(root,'game/battle-floors.js'),'utf8'),ctx);
const floors=vm.runInContext('BATTLE_FLOORS',ctx);
function draw(f){const [dark,base,light,accent]=f.colors;let out='';
 const rect=(x,y,w,h,c)=>out+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
 const p=(d,c=light,stroke=false)=>out+=`<path d="${d}" ${stroke?`fill="none" stroke="${c}" stroke-width="1"`:`fill="${c}"`}/>`;
 const stone=()=>{for(let y=0;y<64;y+=16)for(let x=-12*(y/16%2);x<96;x+=24){rect(x+1,y+1,22,14,base);rect(x+2,y+2,20,1,light);rect(x+2,y+13,20,1,dark)}p('M15 7h4v3h3M61 39h5v4h3M38 53h3v5',dark,true)};
 const plate=()=>{for(let y=0;y<64;y+=32)for(let x=0;x<96;x+=32){rect(x+1,y+1,30,30,base);rect(x+2,y+2,28,1,light);rect(x+2,y+29,28,1,dark);for(const [a,b]of[[4,4],[26,4],[4,26],[26,26]])rect(x+a,y+b,2,2,accent)}};
 rect(0,0,96,64,dark);
 switch(f.pattern){
 case'sand':rect(0,0,96,64,base);p('M0 14h18v2h16v-2h20v2h22v-2h20M0 45h12v-2h21v2h22v-2h24v2h17',light,true);for(const [x,y]of[[7,8],[22,35],[41,19],[67,6],[78,54],[49,56],[91,25]]){rect(x,y,2,1,accent);rect((x+9)%94,(y+13)%62,1,1,dark)}p('M8 53v-6h5v-3h8v3h4v6ZM68 29v-4h5v-3h7v3h5v5Z',light);p('M10 47h9M70 25h8',accent,true);break;
 case'forest':case'roots':rect(0,0,96,64,base);p('M0 20h11v-9h9v-8h9v8h-5v15H9v9H0ZM96 32H85v11H73v10H62v11h34Z',light);p('M2 55h16v-5h8v-9h12v-8h8M59 0v14h10v12h12v8h15',dark,true);for(const [x,y]of[[9,6],[43,11],[64,42],[28,58],[84,10]]){p(`M${x} ${y}h5v-2h4v5h-5v2h-4Z`,accent);rect(x+5,y+1,1,5,dark)}if(f.pattern==='roots')p('M0 37h12v-3h9v-9h11v-9h7M52 64V52h-6V41H33M80 0v9h-7v13h-9v9',accent,true);else{rect(29,29,10,7,dark);rect(30,29,8,5,light);rect(73,53,12,6,dark);rect(74,53,10,4,light)}break;
 case'web':stone();p('M0 0L31 24M0 0L36 8M0 0L9 32M0 8l8-1 3-7M0 17l16-3 5-9 2-5M0 28l24-5 8-12 3-11M96 64L64 40M96 64L60 57M96 64L87 31M96 55l-8 2-3 7M96 45l-16 4-5 15',accent,true);break;
 case'scales':for(let y=-8;y<64;y+=16)for(let x=-12*(y/16%2);x<96;x+=24){p(`M${x+12} ${y+1}l11 7-11 7-11-7Z`,base);p(`M${x+3} ${y+8}l9-5 9 5`,light,true)}p('M8 44h8v-6h7v8h8M64 14h8v7h7v-7h8',accent,true);break;
 case'honey':for(let y=-12;y<76;y+=18)for(let x=-12*(Math.floor(y/18)%2);x<108;x+=24){p(`M${x+6} ${y+1}h11l6 8-6 8H${x+6}l-6-8Z`,base);p(`M${x+6} ${y+2}h10l4 6H${x+3}Z`,light);p(`M${x+4} ${y+12}l3 3h9l3-3`,dark,true)}rect(33,26,3,2,accent);rect(69,8,3,2,accent);break;
 case'crypt':case'glyphs':case'temple':case'fractured':stone();if(f.pattern==='crypt'){p('M12 21h6v-4h3v4h6v3h-6v6h-3v-6h-6ZM65 45h5v-4h3v4h5v3h-5v7h-3v-7h-5Z',light)}if(f.pattern==='glyphs'){p('M8 6h7v5H8ZM35 20v8h6v-5h-9M61 5h7v7h-4V8h-3M10 52h7v8M58 37h6v8h-6',accent,true)}if(f.pattern==='temple'){p('M0 29h96v5H0Z',light);p('M0 31h96',accent,true);for(let x=4;x<96;x+=16)p(`M${x} 32l4-4 4 4-4 4Z`,base)}if(f.pattern==='fractured')p('M7 0l6 8-4 10 13 4 3 14-8 9 5 19M68 0l-4 13 9 7-5 12 9 14-3 18M25 36l15-5 8 8 20-7',accent,true);break;
 case'runes':stone();p('M13 13h12l8 8v12l-8 8H13l-8-8V21ZM14 20h10v14H14ZM71 46h12l7 7v11H64V53Z',accent,true);p('M19 9v8M1 27h8M29 27h8M19 37v8M69 53l7 7 7-7',light,true);break;
 case'lava':p('M1 2h25l8 9-8 12H4ZM38 1h24l8 16-15 11H36l-5-13ZM75 2h20v25H74l-7-11ZM2 29h22l11 12-8 20H1ZM36 34l19-3 14 12-8 19H34ZM76 34h19v28H67l6-17Z',base);p('M0 25h26l10 5h21l14-9 25 9M30 0l5 13-5 12 8 9-8 29M68 0l-2 19 7 12-5 11 2 22',light,true);p('M27 24l7 6 2 9M62 23l9 7 13-1M25 53l5-9',accent,true);break;
 case'parquet':case'planks':for(let y=0;y<64;y+=8)for(let x=-24*(y/8%2);x<96;x+=48){rect(x+1,y+1,46,6,base);p(`M${x+3} ${y+2}h29M${x+11} ${y+5}h27`,light,true);rect(x+3,y+3,1,1,accent);rect(x+43,y+4,1,1,dark)}if(f.pattern==='parquet'){p('M35 0h26v64H35Z',dark);p('M37 0v64M59 0v64',accent,true);for(let y=8;y<64;y+=16)p(`M48 ${y}l5 5-5 5-5-5Z`,base)}else p('M5 0v64M89 0v64',accent,true);break;
 case'grate':stone();for(const [x,y]of[[8,7],[56,40]]){rect(x,y,30,18,dark);for(let a=3;a<29;a+=5)rect(x+a,y+2,2,14,light)}p('M0 36h18v-3h21v4h15M80 0v9h-5v11h10v8h11',accent,true);break;
 case'candy':for(let y=0;y<64;y+=16)for(let x=0;x<96;x+=16){rect(x+1,y+1,14,14,(x/16+y/16)%2?base:light);rect(x+2,y+2,12,1,accent)}for(const [x,y]of[[5,6],[53,23],[23,54],[82,45]]){p(`M${x} ${y}l3-3 6 3 3-3v8l-3-3-6 3-3-3Z`,'#657b72');rect(x+4,y,3,2,accent)}break;
 case'coral':stone();p('M15 59V43h-6v-7M15 49h7v-8M72 25V9h-5V3M72 17h8v-7',accent,true);rect(13,59,5,2,light);rect(69,25,6,2,light);p('M35 14h14M28 54h18M80 47h10',light,true);break;
 case'ice':case'crystal':p('M1 1h29l-8 22L2 31ZM33 1h29L51 24H25ZM65 1h30v26L53 25ZM2 34l20-8 19 18-9 19H1ZM25 28h28l17 16-26 19H35ZM57 28h38v35H47l26-19Z',base);p('M3 2h25l-9 18ZM36 2h23L48 18ZM60 29h31L76 40ZM4 38l16-8 10 11-21 5Z',light);p('M31 0L22 25l20 19-10 20M64 0L52 26l20 18-28 20',accent,true);if(f.pattern==='crystal'){p('M15 31l5-16 7 7-3 18ZM64 48l8-20 8 6-4 20Z',accent);p('M20 16l2 16-6 7M73 29l-1 18 4 6',light,true)}break;
 case'dragon':stone();for(const [x,y,c]of[[15,16,'#775547'],[62,16,'#55747a'],[15,48,'#63734b'],[62,48,'#786388']])p(`M${x} ${y-6}l6 6-6 6-6-6Z`,c);break;
 case'veins':rect(0,0,96,64,base);p('M0 13h12l9 9 12-7h15l8 12h16l11-8h13M18 64V48l13-9V15M69 0v14l-9 13 6 14v23M0 49l18-4 13-6 14 9h22l16-10h13',light,true);for(const [x,y]of[[10,33],[43,7],[79,53],[43,58]]){rect(x,y,8,4,dark);rect(x+2,y+1,4,1,accent)}break;
 case'circuit':case'metal':plate();if(f.pattern==='circuit')p('M0 17h13v8h8v14h21v11h12M47 0v17h22v20h12v27M96 49H82',accent,true);else{for(let y=12;y<64;y+=32)for(let x=12;x<96;x+=32){rect(x,y,8,8,dark);p(`M${x+2} ${y-2}h4v4h4v4h-4v4h-4V${y+6}h-4v-4h4Z`,light);rect(x+2,y+2,4,4,dark)}}break;
 case'fungal':rect(0,0,96,64,base);p('M0 17h21v9h17v9h19M96 49H74V37H63V18',dark,true);for(const [x,y]of[[6,8],[49,37],[77,9],[23,50]]){rect(x+5,y+7,2,7,light);p(`M${x} ${y+8}v-4h3V${y}h8v4h3v4Z`,light);rect(x+3,y+2,3,2,accent);rect(x+10,y+5,2,1,accent)}break;
 case'void':for(const [x,y]of[[3,6],[38,2],[72,12],[20,34],[59,44],[88,52]]){p(`M${x} ${y}l15-2 9 8-12 11-16-5Z`,base);p(`M${x} ${y}l15-2 5 4-15 4Z`,light)}for(const [x,y]of[[8,49],[52,24],[91,4],[44,59]]){rect(x,y,1,4,accent);rect(x-1,y+1,3,1,accent)}break;
 default:throw Error('Unknown floor pattern '+f.pattern)
 }
 return `<svg xmlns="http://www.w3.org/2000/svg" width="192" height="128" viewBox="0 0 96 64" shape-rendering="crispEdges">${out}</svg>\n`
}
for(const f of Object.values(floors))fs.writeFileSync(path.join(root,'game',f.image),draw(f));
console.log(`Generated ${Object.keys(floors).length} original dungeon floor tiles.`);
