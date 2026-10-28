'use strict';
class RealmScene extends Phaser.Scene{
 constructor(){super('RealmPack');this.itemNodes=new Map();this.view='pack';this.inspected=null;this.dragging=null;this.lastRevision=-1;this.lastPhase='';this.lastPaint=0}
 preload(){for(const sheet of window.SPRITE_DATA.sheets)this.load.image(sheet.group,'../game/'+sheet.src)}
 create(){
  for(const [source,frame] of Object.entries(window.SPRITE_DATA.sprites)){const texture=this.textures.get(frame.group),image=texture.getSourceImage(),cw=image.width/frame.cols,ch=image.height/frame.rows;texture.add(source,0,frame.x*cw,frame.y*ch,cw,ch)}
  this.staticLayer=this.add.container(0,0);this.linkLines=this.add.graphics();this.inventoryLayer=this.add.container(0,0);this.hudLayer=this.add.container(0,0);
  this.input.dragDistanceThreshold=5;
  this.input.on('dragstart',(pointer,node)=>this.beginDrag(pointer,node));
  this.input.on('drag',(pointer,node,x,y)=>this.drag(pointer,node,x,y));
  this.input.on('dragend',(pointer,node)=>this.endDrag(pointer,node));
  this.input.on('gameout',()=>{if(this.dragging&&!this.input.activePointer.isDown)this.cancelDrag()});
  this.scale.on('resize',()=>{this.cancelDrag();this.rebuild()});
  window.addEventListener('blur',()=>this.cancelDrag());
  document.addEventListener('pointercancel',()=>this.cancelDrag());
  document.addEventListener('visibilitychange',()=>{if(document.hidden){this.cancelDrag();RealmModel.accumulator=0}});
  this.rebuild();window.realmScene=this;window.dispatchEvent(new Event('realm-ready'));
 }
 text(x,y,value,size=18,color='#e7e8d9',width=0,layer=this.staticLayer){const node=this.add.text(x,y,value,{fontFamily:'ChronoType',fontSize:size,color,wordWrap:width?{width,useAdvancedWrap:true}:undefined});layer.add(node);return node}
 rect(x,y,w,h,color,stroke=0x59624b,layer=this.staticLayer){const node=this.add.rectangle(x,y,w,h,color).setOrigin(0);if(stroke)node.setStrokeStyle(1,stroke);layer.add(node);return node}
 sprite(x,y,source,size,layer=this.staticLayer){const frame=window.SPRITE_DATA.sprites[source]||window.SPRITE_DATA.sprites[window.SPRITE_DATA.fallback],node=this.add.image(x,y,frame.group,source in window.SPRITE_DATA.sprites?source:window.SPRITE_DATA.fallback).setDisplaySize(size,size);layer.add(node);return node}
 rebuild(){
  if(!RealmModel.state)return;this.detailName=null;this.detailFacts=null;this.detailBody=null;this.tweens.killAll();this.staticLayer.removeAll(true);this.hudLayer.removeAll(true);this.inventoryLayer.removeAll(true);this.itemNodes.clear();this.linkLines.clear();
  const {width:w,height:h}=this.scale;this.compact=w<900||h<420;this.landscape=this.compact&&w/h>1.7;
  const side=this.compact?0:Math.min(290,w*.24),main=w-side;
  this.layout={w,h,main,side};
  if(this.landscape){this.arena={x:10,y:8,w:Math.min(260,w*.32),h:h-16};const x=this.arena.w+30,y=44,cell=Math.min((w-x-18)/6,(h-y-12)/5);this.pack={x,y,cell,cols:6,rows:5};this.stash={x:x+cell*1.5,y,cell:Math.min(cell*1.3,(h-y-12)/3),cols:3,rows:3}}
  else{this.arena={x:16,y:8,w:main-32,h:this.compact?126:158};const y=this.compact?174:214,cell=Math.max(16,Math.min(88,(main-(this.compact?32:100))/(this.compact?6:8.7),(h-y-30)/5)),stashCell=cell*.82,total=6*cell+3*stashCell+32,x=this.compact?(w-6*cell)/2:(main-total)/2;this.pack={x,y,cell,cols:6,rows:5};this.stash={x:this.compact?(w-3*Math.min(90,(h-y-16)/3))/2:x+6*cell+32,y,cell:this.compact?Math.min(90,(h-y-16)/3):stashCell,cols:3,rows:3}}
  this.drawArena();
  if(!this.compact||this.view==='pack')this.drawBoard(this.pack,'Your backpack',6,5);
  if(!this.compact||this.view==='stash')this.drawBoard(this.stash,'Travel stash · 9 slots',3,3);
  if(!this.compact){const x=this.stash.x-17;this.rect(x,this.pack.y-30,1,this.pack.cell*5+30,0x6c755a,0);this.drawSidebar()}
  else if(!this.landscape)this.drawCompactInspection();
  this.buildItems();this.preview=this.rect(0,0,1,1,0xb7ce86,0xb7ce86,this.hudLayer).setAlpha(0).setDepth(10);
  this.lastRevision=RealmModel.revision;this.lastPhase=RealmModel.state.phase;this.paintHud();this.paintSelection();this.paintInspection();
 }
 drawBoard(board,title,cols,rows){const {x,y,cell}=board;this.text(x,y-27,title,this.compact?18:21,'#edc77b');this.rect(x-5,y-5,cols*cell+10,rows*cell+10,0x202b22,0x8d8057);for(let row=0;row<rows;row++)for(let col=0;col<cols;col++)this.rect(x+col*cell+2,y+row*cell+2,cell-4,cell-4,0x152019,0x394b38)}
 drawArena(){
  const a=this.arena,c=classes[RealmModel.state.classId],room=RealmModel.room;this.rect(a.x,a.y,a.w,a.h,0x202b24,0x7c7957);
  for(let x=a.x+8;x<a.x+a.w;x+=40)for(let y=a.y+38;y<a.y+a.h-10;y+=30)this.rect(x,y,32,22,(Math.floor(x/40)+Math.floor(y/30))%2?0x243227:0x29362a,0);
  this.text(a.x+12,a.y+8,room.name,this.landscape?18:21,'#edc77b',a.w-20);
  const portrait=this.landscape?48:this.compact?44:64,cy=this.landscape?a.y+58:a.y+76;
  this.playerSprite=this.sprite(a.x+portrait/2+16,cy,c.sprite,portrait);
  const ex=this.landscape?a.x+portrait/2+16:a.x+a.w*.57;this.enemySprite=this.sprite(ex,this.landscape?cy+80:cy,room.sprite,portrait);
  const bx=a.x+portrait+26,bw=this.landscape?a.w-portrait-40:a.w*(this.compact?.29:.33);
  this.text(bx,cy-28,c.name,18);this.phpBack=this.rect(bx,cy-6,bw,9,0x0d140f,0x899576);this.php=this.rect(bx,cy-6,bw,9,0x86b94a,0);this.phpLabel=this.text(bx,cy+8,'',16);
  const ebx=this.landscape?bx:ex+portrait/2+12,eby=this.landscape?cy+80:cy,ebw=this.landscape?bw:a.x+a.w-ebx-16;
  this.enemyLabel=this.text(ebx,eby-28,room.enemy,16,'#e7e8d9',ebw);this.ehpBack=this.rect(ebx,eby-6,ebw,9,0x0d140f,0x899576);this.ehp=this.rect(ebx,eby-6,ebw,9,0xb2604e,0);this.ehpLabel=this.text(ebx,eby+8,'',16);
  this.resources=this.text(a.x+12,this.landscape?a.y+a.h-46:a.y+a.h-26,'',16,'#b5cbcc',a.w-24);
 }
 drawCompactInspection(){const board=this.view==='stash'?this.stash:this.pack,y=board.y+board.cell*board.rows+20,remaining=this.layout.h-y-10;if(remaining<110)return;this.rect(12,y,this.layout.w-24,remaining,0x1d271f,0x59624b);this.detailName=this.text(24,y+9,'Select an item',19,'#edc77b',this.layout.w-48);this.detailFacts=this.text(24,y+36,'',15,'#b7ce86',this.layout.w-48);this.detailBody=this.text(24,y+62,'',16,'#c2cbb6',this.layout.w-48);this.compactLimit=Math.max(50,Math.floor((remaining-70)/18)*32)}
 drawSidebar(){const {main,w,h}=this.layout;this.rect(main+4,8,w-main-20,h-16,0x1d271f,0x59624b);this.text(main+18,20,'Item inspection',22,'#edc77b');this.detailName=this.text(main+18,62,'Hover or select an item',22,'#e7e8d9',w-main-48);this.detailFacts=this.text(main+18,130,'',17,'#b7ce86',w-main-48);this.detailBody=this.text(main+18,184,'',18,'#c2cbb6',w-main-48);this.detailHint=this.text(main+18,h-58,'F · Full details',17,'#edc77b')}
 buildItems(){
  const state=RealmModel.state;for(const item of [...state.items,...state.stash]){
   const stashed=state.stash.includes(item);if(this.compact&&(stashed!==(this.view==='stash')))continue;
   const board=stashed?this.stash:this.pack,index=state.stash.indexOf(item),[iw,ih]=RealmModel.size(item),width=(stashed?1:iw)*board.cell-5,height=(stashed?1:ih)*board.cell-5;
   const x=board.x+(stashed?index%3:item.x)*board.cell+2,y=board.y+(stashed?Math.floor(index/3):item.y)*board.cell+2,d=RealmModel.definitions[item.type];
   const node=this.add.container(x,y);this.inventoryLayer.add(node);node.itemId=item.id;node.home={x,y};node.w=width;node.h=height;
   node.border=this.add.rectangle(0,0,width,height,0x2a352b).setOrigin(0).setStrokeStyle(1,Phaser.Display.Color.HexStringToColor(d.color).color);node.add(node.border);
   const image=this.add.image(width/2,Math.max(12,(height-12)/2),window.SPRITE_DATA.sprites[d.sprite]?.group||'items',d.sprite).setDisplaySize(Math.max(16,Math.min(width*.65,height*.55,56)),Math.max(16,Math.min(width*.65,height*.55,56)));node.add(image);
   const label=this.add.text(width/2,height-7,d.name,{fontFamily:'ChronoType',fontSize:Math.min(14,Math.max(10,board.cell*.21)),color:d.color,wordWrap:{width:width-4},align:'center'}).setOrigin(.5,1);let caption=d.name;while(label.height>Math.min(28,height*.42)&&caption.length>7){caption=caption.slice(0,-2);label.setText(caption+'…')}node.add(label);const imageSize=Math.max(12,Math.min(width*.65,(height-label.height-12)*.8,56));image.setPosition(width/2,Math.max(imageSize/2+3,(height-label.height-9)/2)).setDisplaySize(imageSize,imageSize);
   if(d.once){const count=this.add.text(width-3,2,'×'+RealmModel.count(item),{fontFamily:'ChronoType',fontSize:16,color:'#edc77b'}).setOrigin(1,0);node.add(count)}
   node.cooldown=this.add.rectangle(1,height-4,width-2,3,0xedc77b).setOrigin(0).setVisible(!stashed);node.add(node.cooldown);
   node.setSize(width,height).setInteractive(new Phaser.Geom.Rectangle(width/2,height/2,width,height),Phaser.Geom.Rectangle.Contains);this.input.setDraggable(node,state.phase==='prep');
   node.on('pointerover',()=>{if(this.dragging)return;this.inspect(item.id)});
   node.on('pointerup',()=>{if(this.ignoreClick||this.dragging)return;RealmModel.select(item.id);this.inspect(item.id);this.paintSelection();window.updateRealmControls()});
   this.itemNodes.set(item.id,node);
  }
 }
 inspect(id){if(this.inspected===id)return;this.inspected=id;this.paintInspection();this.paintSelection();window.updateRealmControls?.()}
 paintInspection(){if(!this.detailName)return;const info=RealmModel.inspect(this.inspected||RealmModel.selected);if(!info){this.detailName.setText(this.compact?'Select an item':'Hover or select an item');this.detailFacts.setText('');this.detailBody.setText(this.compact?'Select gear to inspect it. Touching edges can grant bonuses; stash items stay inactive.':'Equipped items activate automatically.\n\nTouching edges can grant adjacency bonuses.\n\nStashed items stay inactive.');return}const d=info.definition;this.detailName.setText(d.name);this.detailFacts.setText(this.compact?`${d.tier} · ${d.kind} · ${info.timing}`:`${d.tier} · ${d.kind}\n${RealmModel.size(info.item).join('×')} cells · ${info.timing}\n${d.mana?d.mana+' mana':'No mana cost'}`);const plain=window.realmPlainText(info.summary);const limit=this.compact?this.compactLimit:210;this.detailBody.setText(plain.length>limit?plain.slice(0,limit-3)+'…':plain)}
 paintSelection(){for(const [id,node] of this.itemNodes){const d=RealmModel.definitions[RealmModel.item(id).type];node.border.setStrokeStyle(id===RealmModel.selected?2:1,id===RealmModel.selected?0xedc77b:Phaser.Display.Color.HexStringToColor(d.color).color)}this.linkLines.clear();const id=this.inspected||RealmModel.selected;if(!id||this.compact)return;this.linkLines.lineStyle(2,0xc6bc79,.5);for(const link of RealmModel.links()){if(link.source!==id&&link.target!==id)continue;const a=this.itemNodes.get(link.source),b=this.itemNodes.get(link.target);if(a&&b)this.linkLines.lineBetween(a.x+a.w/2,a.y+a.h/2,b.x+b.w/2,b.y+b.h/2)}}
 beginDrag(pointer,node){if(RealmModel.state.phase!=='prep')return;this.ignoreClick=true;this.dragging={id:node.itemId,grabX:pointer.downX-node.home.x,grabY:pointer.downY-node.home.y};selected=node.itemId;this.inventoryLayer.bringToTop(node);node.setAlpha(.8);this.inspect(node.itemId);this.paintSelection();window.updateRealmControls()}
 drag(pointer,node,x,y){if(!this.dragging)return;node.setPosition(pointer.x-this.dragging.grabX,pointer.y-this.dragging.grabY);const target=this.dropTarget(pointer,node);this.preview.setAlpha(target?.valid ? .28 : 0);if(target)this.preview.setPosition(target.x,target.y).setSize(target.w,target.h).setFillStyle(target.valid?0xb7ce86:0xbf5f4b)}
 dropTarget(pointer,node){const board=this.pack,item=RealmModel.item(node.itemId);if(!item||this.compact&&this.view!=='pack')return null;const inside=pointer.x>=board.x&&pointer.x<board.x+6*board.cell&&pointer.y>=board.y&&pointer.y<board.y+5*board.cell;if(!inside)return null;const [w,h]=RealmModel.size(item),cx=Math.max(0,Math.min(6-w,Math.round((node.x-board.x)/board.cell))),cy=Math.max(0,Math.min(5-h,Math.round((node.y-board.y)/board.cell)));return {cx,cy,x:board.x+cx*board.cell,y:board.y+cy*board.cell,w:w*board.cell,h:h*board.cell,valid:RealmModel.canPlace(item.id,cx,cy)}}
 endDrag(pointer,node){if(!this.dragging)return;const target=this.dropTarget(pointer,node),stash=this.stash;let moved=false;if(target?.valid)moved=RealmModel.move(node.itemId,target.cx,target.cy);else if(!this.compact&&pointer.x>=stash.x&&pointer.x<stash.x+stash.cell*3&&pointer.y>=stash.y&&pointer.y<stash.y+stash.cell*3)moved=RealmModel.stash(node.itemId);this.dragging=null;this.preview.setAlpha(0);node.setAlpha(1);if(moved)this.rebuild();else{this.tweens.add({targets:node,x:node.home.x,y:node.home.y,duration:110,ease:'Quad.Out'});window.realmNotice('Item returned · choose a clear space or a matching stack.')}setTimeout(()=>{this.ignoreClick=false},0);window.updateRealmControls()}
 cancelDrag(){if(this.dragging){const node=this.itemNodes.get(this.dragging.id);if(node)node.setPosition(node.home.x,node.home.y).setAlpha(1);this.dragging=null;this.preview?.setAlpha(0);this.ignoreClick=false}this.input?.activePointer?.reset()}
 setView(view){this.cancelDrag();this.view=view;this.rebuild()}
 paintHud(){const state=RealmModel.state,e=state.enemy;this.php.width=this.phpBack.width*Math.max(0,state.hp/state.max);this.ehp.width=this.ehpBack.width*Math.max(0,e.hp/(e.max||1));this.phpLabel.setText(`${Math.ceil(state.hp)} / ${state.max} HP`);this.ehpLabel.setText(`${Math.ceil(e.hp)} / ${e.max} HP`);this.resources.setText(`MP ${Math.floor(state.mana)}/${RealmModel.manaMax()}   Block ${Math.floor(state.block)}   Gold ${state.gold}   ${state.time.toFixed(1)}s`);for(const [id,node] of this.itemNodes){const i=RealmModel.item(id);if(i)node.cooldown.width=(node.w-2)*Math.max(0,Math.min(1,(i.charge||0)/RealmModel.cooldown(i)))}
  if(this.previousEnemyHp>e.hp&&state.phase==='fight'&&!this.tweens.isTweening(this.enemySprite))this.tweens.add({targets:this.enemySprite,alpha:.35,duration:65,yoyo:true});
  if(this.previousHp>state.hp&&state.phase==='fight'&&!this.tweens.isTweening(this.playerSprite))this.tweens.add({targets:this.playerSprite,alpha:.35,duration:65,yoyo:true});this.previousEnemyHp=e.hp;this.previousHp=state.hp;
 }
 update(time,delta){if(!RealmModel.state)return;RealmModel.step(delta/1000);const state=RealmModel.state;if(this.lastRevision!==RealmModel.revision||this.lastPhase!==state.phase){this.cancelDrag();this.rebuild();window.updateRealmControls();if(['lost','reward'].includes(state.phase))window.showRealmResult()}if(time-this.lastPaint>=50){this.lastPaint=time;this.paintHud()}}
}
