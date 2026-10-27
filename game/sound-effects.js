'use strict';
// Short synthesized cues: no downloads, timers, or audio work in render/hover paths.
const soundSettings=(()=>{const defaults={master:65,interface:80,combat:55,muted:false};try{const saved=JSON.parse(localStorage.getItem('realmpack-sound')||'{}');for(const key of ['master','interface','combat'])if(Number.isFinite(saved[key]))defaults[key]=Math.max(0,Math.min(100,saved[key]));if(typeof saved.muted==='boolean')defaults.muted=saved.muted}catch{}return defaults})();
const soundCues={
 enchant:{channel:'interface',notes:[[659,0,.09],[988,.07,.12],[1319,.14,.17]],level:.12},
 click:{channel:'interface',notes:[[520,0,.035],[720,.025,.045]],level:.09},
 move:{channel:'interface',notes:[[180,0,.045],[320,.035,.055]],level:.15},
 stack:{channel:'interface',notes:[[330,0,.06],[440,.045,.06],[660,.09,.08]],level:.13},
 loot:{channel:'interface',notes:[[523,0,.09],[659,.065,.09],[784,.13,.15]],level:.13},
 coin:{channel:'interface',notes:[[1046,0,.06],[1397,.055,.12]],level:.12},
 discard:{channel:'interface',notes:[[240,0,.06],[120,.05,.09]],level:.12},
 travel:{channel:'interface',notes:[[262,0,.08],[392,.06,.08],[523,.12,.12]],level:.12},
 start:{channel:'combat',notes:[[196,0,.08],[294,.065,.08],[392,.13,.12]],level:.15},
 hit:{channel:'combat',notes:[[150,0,.025],[75,.02,.045]],level:.12,wave:'triangle',gap:.16},
 hurt:{channel:'combat',notes:[[110,0,.06],[65,.04,.09]],level:.19,wave:'triangle',gap:.25},
 block:{channel:'combat',notes:[[850,0,.035],[420,.02,.06]],level:.11,gap:.25},
 heal:{channel:'combat',notes:[[523,0,.09],[784,.07,.12]],level:.10,gap:.6},
 mana:{channel:'combat',notes:[[740,0,.055],[988,.05,.08]],level:.08,gap:.8},
 victory:{channel:'combat',notes:[[392,0,.12],[523,.1,.12],[659,.2,.12],[784,.3,.28]],level:.15,result:true},
 defeat:{channel:'combat',notes:[[294,0,.18],[247,.16,.18],[196,.32,.3]],level:.15,result:true}
};
let soundContext=null,soundMaster=null,soundChannels=null,soundVoices=0,soundLastCombat=-Infinity;
const soundLast=new Map();
function soundUnlock(){
 if(document.hidden)return;
 try{if(!soundContext){const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return;soundContext=new Audio();soundMaster=soundContext.createGain();soundMaster.connect(soundContext.destination);soundChannels={};for(const key of ['interface','combat']){const gain=soundContext.createGain();gain.connect(soundMaster);soundChannels[key]=gain}soundApplyVolumes()}if(soundContext.state==='suspended')soundContext.resume()?.catch(()=>{})}catch{}
}
function soundApplyVolumes(){if(!soundContext)return;const t=soundContext.currentTime;soundMaster.gain.setTargetAtTime(soundSettings.muted?0:soundSettings.master/100,t,.015);for(const key of ['interface','combat'])soundChannels[key].gain.setTargetAtTime(soundSettings[key]/100,t,.015)}
function setSoundSetting(key,value){if(key==='muted')soundSettings.muted=!!value;else if(['master','interface','combat'].includes(key)&&Number.isFinite(Number(value)))soundSettings[key]=Math.max(0,Math.min(100,Number(value)));else return;try{localStorage.setItem('realmpack-sound',JSON.stringify(soundSettings))}catch{}soundApplyVolumes();for(const name of ['master','interface','combat']){const output=document.getElementById('sound-'+name+'-value');if(output)output.textContent=soundSettings[name]+'%'}const mute=document.getElementById('soundMute');if(mute){mute.textContent=soundSettings.muted?'Unmute sounds':'Mute sounds';mute.setAttribute('aria-pressed',String(soundSettings.muted))}}
function playSound(name){
 const cue=soundCues[name];if(!cue||!soundContext||soundContext.state!=='running'||document.hidden||soundSettings.muted||!soundSettings.master||!soundSettings[cue.channel])return false;
 const t=soundContext.currentTime;
 if(t-(soundLast.get(name)??-Infinity)<(cue.gap||.075)||cue.channel==='combat'&&!cue.result&&t-soundLastCombat<.11||soundVoices+cue.notes.length>(cue.result?12:8))return false;
 soundLast.set(name,t);if(cue.channel==='combat'&&!cue.result)soundLastCombat=t;
 try{for(const [frequency,delay,duration] of cue.notes){const osc=soundContext.createOscillator(),gain=soundContext.createGain(),start=t+delay;osc.type=cue.wave||'sine';osc.frequency.setValueAtTime(frequency,start);gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(cue.level,start+.006);gain.gain.exponentialRampToValueAtTime(.0001,start+duration);osc.connect(gain);gain.connect(soundChannels[cue.channel]);soundVoices++;osc.onended=()=>{osc.disconnect();gain.disconnect();soundVoices--};osc.start(start);osc.stop(start+duration+.01)}return true}catch{return false}
}
function showSoundSettings(){
 const sliders=[['master','Master volume'],['interface','Interface & inventory'],['combat','Combat effects']].map(([key,label])=>`<label class="sound-slider" for="sound-${key}"><span>${label}</span><output id="sound-${key}-value">${soundSettings[key]}%</output><input id="sound-${key}" type="range" min="0" max="100" value="${soundSettings[key]}" oninput="setSoundSetting('${key}',this.value)" onchange="playSound('${key==='combat'?'heal':'loot'}')"></label>`).join('');
 modal('Sound effects','Adjust each volume. Settings save automatically.',`<div class="sound-settings">${sliders}<div class="sound-actions"><button id="soundMute" aria-pressed="${soundSettings.muted}" onclick="setSoundSetting('muted',!soundSettings.muted)">${soundSettings.muted?'Unmute sounds':'Mute sounds'}</button><button onclick="soundUnlock();playSound('loot')">Test sound</button></div></div><button onclick="screenMenu()">Back to menu</button>`,'help');
 document.querySelector('#overlay .modal')?.classList.add('sound-settings-modal');
}
// Observe successful actions, keeping their original return values and gameplay state.
function installSoundHooks(){
 const original={inventoryCommit,mergeStacks,stashSelected,removeItem,receiveItem,buy,selectPortal,selectPath,startFight,hit,restore,gainMana,playerDamage,finishBattle,sellEventItem,enchantService,commitRuneforge};
 sellEventItem=function(...args){const result=original.sellEventItem.apply(this,args);if(result)playSound('coin');return result};
 enchantService=function(...args){const result=original.enchantService.apply(this,args);if(result)playSound('enchant');return result};
 commitRuneforge=function(...args){const result=original.commitRuneforge.apply(this,args);if(result)playSound('enchant');return result};
 inventoryCommit=function(...args){const result=original.inventoryCommit.apply(this,args);if(result)playSound('move');return result};
 mergeStacks=function(...args){const result=original.mergeStacks.apply(this,args);if(result)playSound('stack');return result};
 stashSelected=function(...args){const count=s?.items.length,result=original.stashSelected.apply(this,args);if(s?.items.length<count)playSound('move');return result};
 removeItem=function(id,...args){const owned=()=>s&&[...s.items,...s.stash].some(i=>i.id===id),before=owned(),result=original.removeItem.call(this,id,...args);if(before&&!owned())playSound('discard');return result};
 receiveItem=function(...args){const result=original.receiveItem.apply(this,args);if(result)playSound('loot');return result};
 buy=function(...args){const gold=s?.gold,result=original.buy.apply(this,args);if(s?.gold<gold)playSound('coin');return result};
 selectPortal=function(...args){const phase=s?.phase,result=original.selectPortal.apply(this,args);if(phase==='portal'&&s?.phase==='prep')playSound('travel');return result};
 selectPath=function(...args){const phase=s?.phase,result=original.selectPath.apply(this,args);if(phase==='path'&&s?.phase==='prep')playSound('travel');return result};
 startFight=function(...args){const phase=s?.phase,result=original.startFight.apply(this,args);if(phase!=='fight'&&s?.phase==='fight')playSound('start');return result};
 hit=function(...args){const result=original.hit.apply(this,args);if(result>0&&s.phase==='fight')playSound('hit');return result};
 restore=function(...args){const result=original.restore.apply(this,args);if(result>0)playSound('heal');return result};
 gainMana=function(...args){const before=s.mana,result=original.gainMana.apply(this,args);if(s.phase==='fight'&&s.mana>before)playSound('mana');return result};
 playerDamage=function(...args){const hp=s.hp,block=s.block,result=original.playerDamage.apply(this,args);if(s.hp<hp)playSound('hurt');else if(s.block<block)playSound('block');return result};
 finishBattle=function(...args){const phase=s.phase,result=original.finishBattle.apply(this,args);if(phase==='fight'&&s.phase!==phase)playSound(s.phase==='lost'?'defeat':'victory');return result};
}
if(!window.__TEST__){
 installSoundHooks();
 for(const event of ['pointerdown','keydown'])document.addEventListener(event,e=>{if(e.isTrusted)soundUnlock()},true);
 document.addEventListener('click',e=>{const button=e.target.closest?.('button');if(button&&!button.disabled&&!button.closest('.item,#stash,.map-node')&&e.isTrusted)playSound('click')},true);
 document.addEventListener('visibilitychange',()=>{if(document.hidden&&soundContext)soundContext.suspend()?.catch(()=>{})});
}
