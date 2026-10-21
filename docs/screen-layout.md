# Viewport workspace — 0.25.0

The main playfield uses the viewport height, with a compact header/footer. Desktop keeps combat above the backpack, with the nine-slot stash adjacent and a tabbed information panel. Below 901px, Battle / Pack & stash / Details tabs share the available screen. On phones the stash is a single nine-slot row below the backpack. The mobile Menu retains catalogue, bestiary, guide, larger-text and restart access.

Item / Journal tabs expose secondary information. Hovering or keyboard-focusing your character sprite opens its class description and passive rules nearby; click/tap pins that panel. Character and enemy panels close each other and share paging/dismissal behavior. Hovering or keyboard-focusing the enemy sprite opens encounter mechanics and dungeon difficulty in a nearby panel; click/tap pins it. Moving into the panel keeps it available for reading and paging. Escape, Close, an outside click, switching play views or opening a dialog dismisses it. Combat continues while inspecting. Long content and dialogs use Previous / Next pages, with main modal actions kept outside the paged area. Catalogue offers are compact; Inspect opens their full rules. The route map uses the available dialog height. Combat pauses while the menu is open, as it does for the guide and map.

The pager measures content at the current viewport and text size. It keeps original live DOM nodes mounted across pages so encounter updates, form values and handlers remain valid. It preserves focused search inputs/caret positions, reflows on resize and expanded details, and only repaginates changed panels during journal updates.

## S shortcut

During preparation, S stashes the currently hovered/focused backpack item, falling back to the selected backpack item when nothing is hovered. A hovered stash item blocks that fallback. It cannot equip from the stash, act behind a modal, run during a drag, repeat while held, or fire while typing or using Ctrl/Alt/Meta. It uses the existing stash acquisition/merge preflight, preserving the nine-slot and five-copy limits. A full stash leaves the source item in place; a successful move clears placement selection.

## Verification

The optional `scripts/check-viewport.cjs` requires Playwright and Chromium. Set `REALMPACK_CHROME` to an existing Chromium executable if needed; it opens the local game by default, or `REALMPACK_URL` if provided. Run it with `node scripts/check-viewport.cjs`.

It exercises 102 views across 1920×1080, 1366×768, 1280×720, 1024×768, 390×844 and 360×640, visits every generated content page, checks viewport bounds and clipping, preserves live information nodes, types into the catalogue search, tests the real S key and larger text, and checks menu pause/resume. It includes shops, rewards, item inspection, class selection, map, guide, catalogue, bestiary, supply events and item trading. The regular inventory regression separately tests full-capacity safety, one-way behavior and ignored key contexts.

## Class selection

All 19 class portrait/name buttons remain visible together, without roster pagination. Hover, keyboard focus or tap updates one shared details panel. Desktop displays health, description, starting equipment and passive together; narrow layouts use Overview/Passive tabs within that panel. The Start button confirms the current preview using the chosen Dungeon run/Sandbox mode and difficulty. Previewing leaves the active run untouched.

`node scripts/check-class-roster.cjs` uses the same optional Playwright/Chromium setup. It checks every class across seven sizes (the six above plus 700×600), both detail sections, hover/focus/tap, active-run preservation, starting mode/difficulty, and the combat guard.

## Enemy details verification

`node scripts/check-enemy-details.cjs` uses the same optional browser setup to test hover, keyboard focus, click/tap pinning, pointer transfer into the panel, page bounds, Escape/focus return, outside dismissal, live information, view/modal cleanup and uninterrupted combat at six viewport sizes. The live encounter/difficulty nodes remain mounted when hidden so encounter updates stay intact.

## Character details verification

`node scripts/check-class-details.cjs` checks all 19 live class panels across the six viewport sizes, including description/passive fidelity and every content page. It also checks hover/focus/tap, pointer transfer, run preservation, Escape/focus return, outside dismissal, mutual exclusion with enemy details, view/modal cleanup and uninterrupted combat. The class box stays mounted and retains its live class-update behavior while hidden.

## Inventory sizing and logo

The backpack measures its available grid area in both dimensions, keeping square cells and the existing five-pixel gaps. Cells grow up to 112px; item sprites and names scale with them. On adjacent layouts the stash column grows between 208px and 330px, with square slots constrained by both column width and available height. Phone layouts retain their nine-slot row. These changes do not add cells, stash slots or stack capacity.

`node scripts/check-inventory-sizing.cjs` uses the optional browser setup to verify 12 viewport sizes, every backpack cell and all nine filled stash slots, square cells and clipping bounds, unchanged capacity, logo load, and actual S/drag transfers at two desktop sizes. The header and favicon use the original 40×40 [Vault Chest Unlocker sprite](https://realm.wiki/item?id=811).

## Single-sheet Run Map

Run Map bypasses the content pager. Its title, difficulty, legend, complete act route and Return action share one viewport-sized sheet. The route area takes the remaining height and its existing node/edge coordinates scale proportionally; map choices, IDs, routes and RNG behavior are unchanged. Compact maps use the legend and accessible marker labels instead of repeating text under every marker.

The map uses CSS parchment tones, stained edges, a fold crease and faint contour lines with dark ink markers/routes. Current, visited, skipped and available nodes remain distinct by fill, border, opacity and state annotations. Available nodes retain keyboard focus and route selection.

`node scripts/check-run-map.cjs` uses the optional browser setup to check eight viewport sizes at both text settings, every depth/node, absence of pagination or clipping, unchanged route/RNG, selection from the map, return behavior and the unrevealed-portal hint.

## Dedicated compendium and bestiary

These browsers bypass the generic screen pager. Each has one result pager with Previous, Next and a direct page-number field, plus an exact record range. Page size adapts to available grid width/height and text mode; ordinary 1366×768 windows display 12 cards, while roomy 1080p windows can display 25. Resizing keeps the previous starting record within the nearest new page.

Search stays visible and preserves focus/caret while results rerender. Item type, class, version and signature filters remain available; the bestiary adds dungeon and role filters. On phones Filters opens a panel with Done, Escape and outside dismissal. Empty states offer reset. Compact cards show key summaries; Inspect retains the full item/encounter information, and Back or Escape restores the browser page, filters and card focus. Sandbox add/practice controls keep their existing guards; feedback is inline in the result summary.

`node scripts/check-reference-browser.cjs` uses the optional browser setup to check both browsers across seven viewports and both text settings, sole pagination, card bounds, page navigation/jumps, typing/focus, filtering/reset/empty states, Inspect return, mobile filters, complete ordered traversal of every matching item/encounter, Sandbox capacity/combat guards, feedback and practice encounter loading.
