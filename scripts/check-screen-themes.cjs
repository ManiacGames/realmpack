'use strict';
const assert=require('node:assert/strict'),path=require('node:path'),{pathToFileURL}=require('node:url'),{chromium}=require('playwright');
(async()=>{
 const browser=await chromium.launch({executablePath:process.env.REALMPACK_CHROME,args:['--no-sandbox','--no-zygote','--single-process','--allow-file-access-from-files']}),page=await browser.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto(pathToFileURL(path.resolve(__dirname,'../game/index.html')).href);let views=0;
 const scenes=['map','defeat','shop','reward','event','rest','trade','classes','classConfirm','catalogue','bestiary','itemDetails','rewardInspect','shopInspect','enchanter','menu','help','shortcuts','victory','discard'];
 for(const [width,height]of [[1366,768],[1024,600],[700,400],[360,640]])for(const large of [false,true])for(const scene of scenes){
  await page.setViewportSize({width,height});await page.evaluate(({scene,large})=>{
   freshRun('knight',true);selectPortal(s.portalChoices[0]);closeModal(true);setLargeText(large);gameplayHintsEnabled=false;updateGameplayHints();s.gold=999;const id=s.items[0].type;
   switch(scene){
    case'map':showRunMap();break;
    case'defeat':s.hp=0;s.phase='lost';showEnding();break;
    case'shop':s.phase='shop';stock=classes.knight.startingIds;showShop();break;
    case'reward':s.phase='reward';reward=classes.knight.startingIds;showRewards();break;
    case'event':ROOMS[s.room].type='event';ROOMS[s.room].eventId='war';enterEvent();break;
    case'rest':s.phase='rest';showRest();break;
    case'trade':modal('Sell an item','Choose an item.','<button onclick="closeModal()">Leave</button>','trade');break;
    case'classes':chooseClass();break;
    case'classConfirm':chooseClass();requestClassStart('knight');break;
    case'catalogue':openCatalogue();break;
    case'bestiary':openBestiary();break;
    case'itemDetails':showItemDetails(s.items[0].id);break;
    case'rewardInspect':s.phase='reward';reward=[id];inspectReward(id);break;
    case'shopInspect':s.phase='shop';stock=[id];inspectShop(id);break;
    case'enchanter':s.phase='event';s.activeEvent={id:'enchanter',enchantRevision:0};showEnchanter();break;
    case'menu':screenMenu();break;
    
    case'help':showHelp();break;
    case'shortcuts':showGameUiHotkeys();break;
    case'victory':s.phase='won';showEnding();break;
    case'discard':s.phase='prep';discardSelected(s.items[0].id);break;
   }
   clearTimeout(toastTimer);$('toast').style.display='none';
  },{scene,large});await page.waitForTimeout(50);
  const styles=await page.evaluate(()=>{const m=document.querySelector('#overlay .modal'),s=getComputedStyle(m),heading=m.querySelector('h1'),ink=getComputedStyle(heading).color;return {background:s.backgroundColor,image:s.backgroundImage,border:s.borderTopColor,ink,mapHeader:m.querySelector('.run-map-heading')?getComputedStyle(m.querySelector('.run-map-heading')).backgroundColor:null,mainHeader:getComputedStyle(document.querySelector('.wrap>header')).backgroundImage}});
  const label=JSON.stringify({scene,width,height,large,styles});
  assert(styles.mainHeader.includes('linear-gradient'),label);
  if(scene==='map'){assert.equal(styles.background,'rgb(216, 193, 142)',label);assert.equal(styles.mapHeader,'rgba(0, 0, 0, 0)',label);assert.equal(styles.ink,'rgb(56, 40, 25)',label)}
  else if(scene==='defeat'){assert.equal(styles.background,'rgb(8, 8, 8)',label);assert.equal(styles.border,'rgb(117, 32, 25)',label);assert.equal(styles.ink,'rgb(227, 49, 34)',label)}
  else if(scene==='shop'||scene==='reward'){assert(styles.image.startsWith('repeating-linear-gradient('),label);assert(styles.image.includes('rgb(48, 42, 34)'),label);assert.equal(styles.border,'rgb(177, 151, 102)',label)}
  else if(['event','rest','trade'].includes(scene))assert.equal(styles.background,'rgb(38, 53, 43)',label);
  else assert.equal(styles.background,'rgb(32, 46, 40)',label);
  views++;
 }
 assert.deepEqual(errors,[]);await browser.close();console.log(`PASS: ${views} themed screens across desktop, phone and short landscape in both text modes; parchment/ink, death red/black, wooden offers, event themes and main-header isolation`);
})().catch(e=>{console.error(e);process.exit(1)});
