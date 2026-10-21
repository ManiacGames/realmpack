# Viewport workspace — 0.24.0

The main playfield uses the viewport height, with a compact header/footer. Desktop keeps combat above the backpack, with the nine-slot stash adjacent and a tabbed information panel. Below 901px, Battle / Pack & stash / Details tabs share the available screen. On phones the stash is a single nine-slot row below the backpack. The mobile Menu retains catalogue, bestiary, guide, larger-text and restart access.

Item / Encounter / Class / Journal tabs expose secondary information. Long content and dialogs use Previous / Next pages, with main modal actions kept outside the paged area. Catalogue offers are compact; Inspect opens their full rules. The route map uses the available dialog height. Combat pauses while the menu is open, as it does for the guide and map.

The pager measures content at the current viewport and text size. It keeps original live DOM nodes mounted across pages so encounter updates, form values and handlers remain valid. It preserves focused search inputs/caret positions, reflows on resize and expanded details, and only repaginates changed panels during journal updates.

## S shortcut

During preparation, S stashes the currently hovered/focused backpack item, falling back to the selected backpack item when nothing is hovered. A hovered stash item blocks that fallback. It cannot equip from the stash, act behind a modal, run during a drag, repeat while held, or fire while typing or using Ctrl/Alt/Meta. It uses the existing stash acquisition/merge preflight, preserving the nine-slot and five-copy limits. A full stash leaves the source item in place; a successful move clears placement selection.

## Verification

The optional `scripts/check-viewport.cjs` requires Playwright and Chromium. Set `REALMPACK_CHROME` to an existing Chromium executable if needed; it opens the local game by default, or `REALMPACK_URL` if provided. Run it with `node scripts/check-viewport.cjs`.

It exercises 102 views across 1920×1080, 1366×768, 1280×720, 1024×768, 390×844 and 360×640, visits every generated content page, checks viewport bounds and clipping, preserves live information nodes, types into the catalogue search, tests the real S key and larger text, and checks menu pause/resume. It includes shops, rewards, item inspection, class selection, map, guide, catalogue, bestiary, supply events and item trading. The regular inventory regression separately tests full-capacity safety, one-way behavior and ignored key contexts.
