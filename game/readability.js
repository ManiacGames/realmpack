'use strict';
function setLargeText(enabled){document.documentElement.dataset.largeText=String(enabled);const button=document.getElementById('readability');if(button){button.setAttribute('aria-pressed',String(enabled));button.textContent=enabled?'Aa · Large':'Aa · Text';button.title=enabled?'Use standard text size':'Use larger text'}try{localStorage.setItem('realmpack-large-text',String(enabled))}catch{}}
function toggleLargeText(){setLargeText(document.documentElement.dataset.largeText!=='true');if(typeof screenReflow==='function')screenReflow()}
try{setLargeText(localStorage.getItem('realmpack-large-text')==='true')}catch{setLargeText(false)}
