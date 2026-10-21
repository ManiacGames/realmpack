'use strict';
// Replace this text with the developer's message. Separate paragraphs with a blank line.
const DEV_NOTES={text:'No developer notes yet.'};
function showDevNotes(){
 const paragraphs=String(DEV_NOTES.text||'No developer notes yet.').trim().split(/\n\s*\n/).filter(Boolean);
 modal('Dev notes','',paragraphs.map(text=>`<p class="dev-note-copy">${esc(text)}</p>`).join('')+'<button id="closeDevNotes" onclick="closeModal()">Close</button>','devnotes');
 requestAnimationFrame(()=>document.getElementById('closeDevNotes')?.focus({preventScroll:true}));
}
