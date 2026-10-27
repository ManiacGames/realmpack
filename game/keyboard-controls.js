'use strict';
function keyboardDetailItem(){
 const el=document.querySelector('.item:hover,#stash [data-item-id]:hover')||document.activeElement?.closest?.('.item,#stash [data-item-id]');
 if(el){const id=Number(el.dataset.itemId||el.id.replace(/^item/,''));return [...s.items,...s.stash].find(i=>i.id===id)}
 if(document.querySelector('#detail:hover'))return findInspected();
 return findSelected();
}
function showKeyboardShortcuts(){modal('Keyboard shortcuts','Available outside typing fields.',`<table class="keyboard-shortcuts"><thead><tr><th scope="col">Key</th><th scope="col">Action</th></tr></thead><tbody>${[['R','Rotate selected item'],['S','Backpack → stash'],['D','Discard selected (confirm)'],['F','Hovered/focused item details'],['I','Item catalogue'],['E','Encounter bestiary'],['Esc','Close/cancel; Menu when clear']].map(([key,action])=>`<tr><th scope="row"><kbd>${key}</kbd></th><td>${action}</td></tr>`).join('')}</tbody></table><button class="gold" onclick="screenMenu()">Back to menu</button>`,'help');document.querySelector('#overlay .modal')?.classList.add('keyboard-shortcuts-modal')}
function gameKeyboardControls(e){
 if(e.defaultPrevented||e.isComposing||e.ctrlKey||e.metaKey||e.altKey)return;
 const typing=!!e.target.closest?.('input,select,textarea,[contenteditable]:not([contenteditable="false"]),[role="textbox"]'),key=e.key.toLowerCase(),handled=()=>{e.preventDefault();e.stopImmediatePropagation()};
 if(e.key==='Escape'){
  if(e.repeat){handled();return}
  if(document.querySelector('#overlay .keyboard-shortcuts-modal')){handled();screenMenu();return}
  if(modalKind==='menu'){handled();closeModal();return}
  if(modalKind){if(typing){handled();if(modalKind==='itemdetails')closeItemDetails();else if(modalKind==='classconfirm')cancelClassStart();else if(bestiaryOpen)closeBestiary();else if(catalogueOpen)closeCatalogue();else closeModal()}return}
  if(typing)return;
  handled();if(inventoryDrag||inventoryIntent){inventoryCancel();selected=null;render()}else screenMenu();return;
 }
 if(typing||e.repeat||modalKind||inventoryDrag||!s)return;
 if(key==='d'){const item=findSelected();if(s.phase==='prep'&&item){handled();inventoryCancel();discardSelected(item.id,true)}}
 else if(key==='f'){const item=keyboardDetailItem();if(item){handled();showItemDetails(item.id)}}
 else if(key==='i'){handled();inventoryCancel();openCatalogue()}
 else if(key==='e'){handled();inventoryCancel();openBestiary()}
}
if(!window.__TEST__)document.addEventListener('keydown',gameKeyboardControls,true);
