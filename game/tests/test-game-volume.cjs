'use strict';
const fs=require('node:fs'),path=require('node:path'),{ctx,vm}=require('./load-game.cjs');
ctx.document={hidden:false,getElementById(){return null}};
vm.runInContext(fs.readFileSync(path.join(__dirname,'../game-ui.js'),'utf8'),ctx);
console.log(vm.runInContext(`(()=>{
 const check=(v,m)=>{if(!v)throw Error(m)},gains=[],saved={};localStorage.setItem=(key,value)=>saved[key]=value;
 window.AudioContext=class{constructor(){this.currentTime=0;this.state='running';this.destination={}}createOscillator(){return{type:'',frequency:{setValueAtTime(){},exponentialRampToValueAtTime(){}},connect(){},start(){},stop(){}}}createGain(){return{gain:{setValueAtTime(n){gains.push(n)},exponentialRampToValueAtTime(){}},connect(){}}}};
 freshRun('knight',true);const before=JSON.stringify(s);gameUiSounds=true;setGameUiVolume(25);gameUiSound('place');check(gains.at(-1)===.0125,'25% sound gain');check(saved['realmpack-ui-volume']==='25','Volume not persisted');setGameUiVolume(0);const count=gains.length;gameUiSound('buy');check(gains.length===count,'Zero volume not muted');setGameUiVolume(100);gameUiSound('buy');check(gains.at(-1)===.05,'Full sound gain');setGameUiVolume(300);check(gameUiVolume===100,'Upper bound');setGameUiVolume(-3);check(gameUiVolume===0,'Lower bound');check(!setGameUiVolume('invalid')&&gameUiVolume===0,'Invalid volume accepted');gameUiSounds=false;setGameUiVolume(50);const muted=gains.length;gameUiSound();check(gains.length===muted,'Sound toggle bypassed');check(JSON.stringify(s)===before,'Audio settings changed run state');
 return 'PASS: real audio gain at 25%/100%, zero mute, disabled-sound guard, persistence, bounds/invalid values and unchanged run state';
})()`,ctx));
