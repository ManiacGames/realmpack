'use strict';
const fs=require('node:fs'),path=require('node:path');
const project=path.resolve(__dirname,'..'),output=path.join(project,'dist');
fs.rmSync(output,{recursive:true,force:true});fs.mkdirSync(output,{recursive:true});fs.cpSync(path.join(project,'../game'),path.join(output,'game'),{recursive:true});
for(const file of ['index.html','style.css','src'])fs.cpSync(path.join(project,file),path.join(output,'phaser',file),{recursive:true});
fs.mkdirSync(path.join(output,'phaser/vendor'),{recursive:true});fs.copyFileSync(path.join(project,'node_modules/phaser/dist/phaser.min.js'),path.join(output,'phaser/vendor/phaser.min.js'));
fs.copyFileSync(path.join(project,'node_modules/phaser/LICENSE.md'),path.join(output,'phaser/vendor/LICENSE.md'));
fs.writeFileSync(path.join(output,'index.html'),'<!doctype html><meta http-equiv="refresh" content="0;url=phaser/"><a href="phaser/">Play the RealmPack Phaser prototype</a>');
console.log('Built phaser/dist · serve this directory over HTTP');
