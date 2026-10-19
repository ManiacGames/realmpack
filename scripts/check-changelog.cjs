'use strict';
// Read-only guard: release notes are committed by the author alongside the change.
const fs=require('node:fs'),cp=require('node:child_process');
function checkChangelog(changed,notes,html){
 if(!changed.some(p=>p.startsWith('game/')))return;
 if(!changed.includes('CHANGELOG.md'))throw Error('Game changes require a CHANGELOG.md entry in the same update.');
 const version=html.match(/EXPERIMENTAL BUILD (\d+\.\d+\.\d+)/)?.[1];
 if(!version||!notes.includes('## '+version+' — '))throw Error('CHANGELOG.md must include the current game version and release date.');
}
if(require.main===module){
 const before=process.env.GITHUB_EVENT_BEFORE;
 if(!before||/^0+$/.test(before)){console.log('No push comparison available; changelog check skipped.');process.exit(0)}
 if(!/^[0-9a-f]{40}$/.test(before))throw Error('Invalid base commit.');
 const changed=cp.execFileSync('git',['diff','--name-only',before,'HEAD'],{encoding:'utf8'}).trim().split('\n');
 checkChangelog(changed,fs.readFileSync('CHANGELOG.md','utf8'),fs.readFileSync('game/index.html','utf8'));
 console.log('PASS: game changes include release notes for the current version.');
}
module.exports={checkChangelog};
