# Game presentation — 0.54.4

`game-ui.css` and `game-ui.js` load last and build the current presentation over the existing live inventory and combat DOM. Desktop uses a full-width dungeon stage and inventory workspace. The stash remains nine entries beside the cloth-lined pack. The compact HUD mirrors class, HP, opening/current mana, gold and progress. Map, Menu and Dev notes remain accessible; reference/settings actions are in Menu.

Desktop inspection floats without resizing the grid. Pointer/focus previews; click or Pin retains it. Close/Escape dismiss it. The card fits its content, with bounded scrolling for long overviews and Full details for complete rules. The entire card is interactive. A 12px hover bridge spans the positioning gap, a 250ms close grace permits pointer travel, and pointer/focus inside the card cancels closing. Pointer-down and active drags clear the card, and a brief post-drop suppression prevents a newly rendered tile from reopening it over the drop target. Mobile retains its Battle / Pack & stash / Details views and a three-column, collapsible stash.

The enemy readout presents HP/ward/waves and the next **base normal strike** before player mitigation. It accounts for current heavy-strike cadence, Berserker state, rage, double strikes, chill and freeze. Piercing labels describe normal boss/elite minimums. Pulses, future phase changes, dodges and player protection can change the actual outcome; the tooltip states this distinction. Prediction reads state only and never consumes RNG.

Optional synthesized placement/purchase sounds start off. Menu provides an independent 0–100% volume slider (default 50%, matching the previous loudness); 0% is silent. The toggle and volume persist separately from run saves. Decorative textures are CSS and existing sprites; reduced-motion settings suppress presentation animation. Existing item movement, stack merges, trades, acquisition, combat timing and saved data remain authoritative. No per-tick map rebuild or inspector repagination is introduced.

Validation: game-style HUD/inspection/sound/journal controls at six desktop/touch sizes; real chest drag and base-strike prediction against `enemyAttack`; inventory geometry/transfers at 12 sizes; 20 crowded combat/debuff layouts; class roster, offers, dialogs, hover behavior and simulation parity at 1×/2×/4×. Desktop combat is deliberately smaller than the backpack at large sizes (minimum tested ratio 0.4 rather than the former 0.6), while preserving icon and action bounds.

## Keyboard commands — 0.54.1

D uses the selected owned item and opens the existing discard confirmation; it cannot discard during combat. F uses an actually hovered/focused owned item, the card being read, or the selected item as fallback. Opening Full details with F or its button preserves the existing pin state; a temporary hover card remains unpinned and an already pinned card remains pinned. I and E open the existing catalogue and bestiary. New letter commands ignore typing fields/contenteditable, IME composition, Ctrl/Alt/Meta, held repeats and open dialogs; they do not run during pointer drags.

Escape cancels active placement first. Existing sprite/status panels and foreground dialogs retain their close/back behavior. It then closes the floating inspector, and opens Menu when clear. Escape closes Menu even with the volume slider focused; it returns from Keyboard shortcuts to Menu. The shortcut reference is a separate, paused dialog to avoid expanding/paginating nested controls in short menus.

The earlier implementation notes below describe the underlying workspace and historical layout.

---

# Viewport workspace — 0.29.0

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

The general game theme excludes the run-map sheet and its header so their original paper background and dark ink remain intact. The map uses CSS parchment tones, stained edges, a fold crease and faint contour lines with dark ink markers/routes. Current, visited, skipped and available nodes remain distinct by fill, border, opacity and state annotations. Available nodes retain keyboard focus and route selection.

`node scripts/check-run-map.cjs` uses the optional browser setup to check eight viewport sizes at both text settings, every depth/node, absence of pagination or clipping, unchanged route/RNG, selection from the map, return behavior and the unrevealed-portal hint.

## Dedicated compendium and bestiary

These browsers bypass the generic screen pager. Each has one result pager with Previous, Next and a direct page-number field, plus an exact record range. Page size adapts to available grid width/height and text mode; ordinary 1366×768 windows display 12 cards, while roomy 1080p windows can display 25. Resizing keeps the previous starting record within the nearest new page.

Search stays visible and preserves focus/caret while results rerender. Item type, class, version and signature filters remain available; the bestiary adds dungeon and role filters. On phones Filters opens a panel with Done, Escape and outside dismissal. Empty states offer reset. Compact cards show key summaries; Inspect retains the full item/encounter information, and Back or Escape restores the browser page, filters and card focus. Sandbox add/practice controls keep their existing guards; feedback is inline in the result summary.

`node scripts/check-reference-browser.cjs` uses the optional browser setup to check both browsers across seven viewports and both text settings, sole pagination, card bounds, page navigation/jumps, typing/focus, filtering/reset/empty states, Inspect return, mobile filters, complete ordered traversal of every matching item/encounter, Sandbox capacity/combat guards, feedback and practice encounter loading.

## Restart confirmation

Restart uses a content-height dialog capped at 480 pixels wide. Both actions remain adjacent on phones and desktops; the dialog bypasses generic modal paging. Keep playing receives initial focus, Tab stays within the two actions, and Escape restores the run or its pending room dialog. Character selection only replaces the run after Start.

Browser check: `REALMPACK_CHROME=/path/to/chrome node scripts/check-restart-dialog.cjs` covers seven sizes and both text modes.

## Quick guide and gameplay tips — 0.29.0

How to Play is a single compact sheet with four steps and the main controls. Gameplay tips are enabled by default; turn them off in the guide, run menu, or any tip. Show tips again clears their history and enables tips. Preferences and seen topics use `realmpack-gameplay-tips-v1`, separately from run saves, with in-memory fallback when storage is unavailable.

One short tip appears for its current context. The tip uses its own row beneath the playfield or inside the portal, loot, shop or event dialog; it never captures focus or pauses combat. Got it waits 15 seconds before another tip. Tips leave when their context changes and each topic is shown once until reset. Topics cover packing, stash, adjacency, class inspection, consumable stacks, automatic combat, mana, healing consumables, long fights, dungeon markers, loot, merchants and event costs.

Run `REALMPACK_CHROME=/path/to/chrome node scripts/check-gameplay-hints.cjs` for desktop/phone layouts, both text modes, contextual rules, controls, saved preferences and run preservation.

## Tip pointers — 0.29.0

A non-interactive SVG draws a static gold outline and an arrow from the current tip to its live target. Targets are resolved from the current DOM, including item instances and current room offers. Neighboring items are outlined together for adjacency tips. Hidden targets on narrow screens fall back to the Pack & stash or Battle tab with a short instruction; opening the tab retargets the pointer. Hidden, clipped, removed and paged-out elements are excluded. Dragging temporarily hides pointers. No focus, scroll, selection, or run state is changed by pointers.

Run `REALMPACK_CHROME=/path/to/chrome node scripts/check-hint-pointers.cjs` to check all tip targets, geometry, pointer transparency, tab transitions and cleanup across seven sizes and both text modes.

## Defeat screen — 0.29.0

The defeat summary bypasses generic modal paging and the general game modal/header colours, preserving its original red/black styling. A red/black frame surrounds the enemy attribution, class sprite, depth banner and six run stats. Character selection preserves the completed run until Start. New losses record `endedAt`; older saves omit the date. A surviving character at the 150-second limit receives a timeout message. The victory and endless-run flow is unchanged.

Run `REALMPACK_CHROME=/path/to/chrome node scripts/check-defeat-screen.cjs` for viewport/text-mode checks, all class portraits, statistics, loss persistence and navigation.

## Inventory drag performance — 0.29.0

Holding the pointer down over gear locks hover inspection until release. Once dragging begins, the held item's inspection and links remain stable. The preview uses one animation-frame callback for the latest pointer position, preserves its sprite DOM, and updates only when placement, rotation, validity or grid geometry changes. Drops always use the actual release coordinates, including releases before a queued preview frame runs. Cancellation removes pending callbacks.

`screenReflow` leaves dirty pagers queued while dragging and resumes after release or cancellation. Inspection layout is contained so measuring pages need not lay out the backpack. Hint pointers already suspend while an item is held.

Browser checks: `scripts/check-inventory-drag-performance.cjs` tests input bursts, DOM reuse, drag pagination, placement, rotation and cancellation. `scripts/profile-inventory-drag.cjs` reports counters and CPU time for a fixed 120-move path through a full backpack; compare timings only on the same browser and machine.

## Offer windows — 0.29.0

Loot and shops use a dedicated content-height layout, bypassing generic full-screen modal paging. Width and columns follow stock count and viewport width. Natural grid and header/footer/hint heights determine how many card rows fit; a single offer pager appears only when needed. Hidden cards stay in the DOM with their existing actions. Short landscape viewports use horizontal cards. Resizing and hint changes recalculate capacity, without changing stock, rewards or game state.

Browser check: `scripts/check-offer-layout.cjs` covers stock counts, long names, both text modes, hints on/off, viewport geometry, page traversal, inspection return and actual purchases. Run with `REALMPACK_CHROME=/path/to/chrome`.

## Combat proportions and enemy effects — 0.29.0

Shared desktop views allocate about 42% of the main column to combat and the rest to inventory, with compact minimum sizes for short windows. The arena flexes with its panel; fighters scale up in the extra room. The inventory cell size still follows its available panel space. Mobile play tabs retain their separate full-height views.

`enemy-status.js` renders the six existing enemy debuffs below the enemy health/stats. Burn, poison and bleed show stacks; chill, weakened and exposed show rounded-up seconds. Icons use stable DOM and update only their counts and descriptions. Hover/focus shows an explanation; tapping pins it, tapping again or pressing Escape closes it. No simulation state or effect values are changed.

Browser QA: `scripts/check-combat-status.cjs` verifies viewport proportions, backpack/stash geometry, status values, tooltips and reset/expiry behavior in both text modes. `scripts/check-inventory-sizing.cjs` checks responsive cell sizing and transfers; roomy desktop cells now exceed 70px within the balanced layout.
