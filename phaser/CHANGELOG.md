# Phaser changelog

## 0.5.6 — 2026-10-30

- Increased the shiny upgrade chance to 1/10 (10%) for eligible normal, elite and boss rewards.
- Updated the shared item details to show the new odds.

## 0.5.5 — 2026-10-29

- Enlarged the combat panel and health numbers. Desktop now has a readable mana bar and separate block readout; gold and battle time sit in the encounter header.
- Added larger effect icons with readable counts, seconds, names on desktop and contrasting backgrounds. Active effects pack into rows without overlapping the health/resource displays.
- Improved compact health bars and status icons, including long-number fitting and larger-text layouts. The backpack continues to fit the available height without page scrolling.
- Scaled the rotation handle on small tiles so it cannot cover the central drag area; very small tiles retain toolbar and keyboard rotation.
- Restored inventory input immediately when native dialogs close, so quick follow-up drags are accepted.
- Checked crowded effect rows, resource accuracy, responsive and larger-text layouts, cached HUD updates and shared simulation behavior.

## 0.5.4 — 2026-10-29

- Moved Finish rewards to the encounter-supplies footer beside Inventory, with the progression action aligned to the bottom right.
- Placed the main progression button beneath the stash when there is enough desktop space. Smaller layouts retain the bottom action bar.
- Prevented clicks on native controls and open dialogs from activating the canvas behind them.
- Checked responsive placement, supplies with and without pending items, live reward completion and shop/combat actions.

## 0.5.3 — 2026-10-29

- Rebuilt the campaign death screen with a black field, red frame, large red title, centred portrait and orange depth record inspired by RotMG. Run statistics remain visible; an expandable final loadout adds item context.
- Added dungeon and final-battle duration details, with a centred new-adventurer action.
- Bundled the RotMG death cue with existing master/combat volume and mute controls; synthesized fallback remains available if decoding fails.
- Checked six desktop/phone/landscape layouts, expanded loadouts, restart flow, audio decoding, mute controls, shared combat parity and portable launchers.

## 0.5.2 — 2026-10-29

- Enlarged backpack and stash grids to use available desktop space. Item artwork, labels and numbered stat icons scale with the larger tiles; the stash still holds nine stacks.
- Moved Begin battle, Visit shop and other progression actions to a prominent fixed bottom bar beside the inventory controls. Phones use a full-width action below the item controls; tutorial hints account for the relocated button.
- Checked nine viewport sizes, inventory bounds, stash access, real shop progression, combat locking, rotation, dragging, adjacency links and portable builds.

## 0.5.1 — 2026-10-29

- Added numbered, colour-coded icons to backpack and stash items: crossed swords for damage, grey shields for block, hearts for healing, blue crystals for mana and distinct shapes for status effects.
- Markers show base recipe amounts. Support rings use percentages or maximum-resource bonuses, and timed effects show seconds. Suppressed affixes and noncombat consumables do not display misleading combat values.
- Markers move and rotate with items, retain stack counts and adjacency arrows, and reuse cached objects during combat. Added a short icon explanation to How to play and a base-value readout on hover.
- Checked stat semantics, desktop/phone layouts, rotation, stable HUD objects, shared combat parity and portable launchers.

## 0.5.0 — 2026-10-29

- Reworked the run map as aged parchment with ink trails, faint terrain, a compass, clearer markers and larger labels. Highlighted connections stay distinct without hiding the rest of the map.
- Added a full room-name readout and a compact map key. Short landscape layouts run eastward; other layouts ascend north. Route choices and reachability are unchanged.
- Made Continue and other progression actions prominent in a fixed footer. Inventory is a smaller secondary control; resolved encounters show one clear Continue action.
- Restored the existing themed event dioramas and improved offer cards, selectors, trade previews and paid-enchantment action placement.
- Checked map geometry, non-overlapping labels, live route choices, event actions, larger text and desktop/phone layouts alongside the campaign, inventory and save checks.

## 0.4.1 — 2026-10-28

- Fixed item links being hidden behind tiles and absent on compact layouts. Active connections now use coloured directional arrows above the items; hover or selection highlights connected gear. Inspection distinguishes active links from possible bonuses.
- Added hover-and-R, right-click and an on-tile touch rotation control. Rotating keeps the item selected and tries nearby free space.
- Added rotation while dragging, with an accurate footprint and visible blocked-space preview. Changes commit only on a valid drop; Escape and invalid drops restore the original item. Stash drags show the full item size.
- Checked mouse/touch rotation, repeated rotations, rotated drags, cancellation, blocked drops, stash transfers, combat/typing guards and directional links across desktop and phone layouts. Existing combat and adjacency rules are retained.

## 0.4.0 — 2026-10-28

- Rebuilt the presentation around slate panels, brass frames, clear primary actions and matching inventory, shop, reward and event cards. Kept the existing pixel art and font.
- Enlarged combat health displays and added separate blue mana and gold block meters. Event screens now show health and mana meters beside gold.
- Added an adventurer/run panel in available desktop space, with class identity, room progress, gold and victories.
- Upgraded item inspection with large artwork, rarity/type information, possible edge links and attunement notes. Short mobile inspection cards use less space.
- Organized Menu into Adventure, Settings and Save & backup tabs, with arrow-key navigation. Added desktop Map, Items and Bestiary shortcuts.
- Adjusted specialist shop stock to fit five offers on one row on larger screens. Preserved mobile inventory tabs, drag controls, hints and campaign saves.
- Checked mouse/touch inventory controls, full campaign and event flows, guided hints, resource displays, inspection artwork, responsive menus and keyboard tabs in source and packaged builds.

## 0.3.0 — 2026-10-28

- Added short gameplay hints with arrows and highlights for inventory, combat, routes, shops, rewards and events. Hints remember dismissals and can be hidden or replayed from Menu.
- Added Resume saved dungeon run in Combat Lab, preserving the separate campaign checkpoint.
- Made S stash the hovered backpack item first. Stashed gear, typing and active drags are ignored; a full stash keeps the current selection.
- Fixed missing Backpack/Stash tabs at tablet widths. Hint placement follows resizing and scrolling, including larger text and short landscape screens.
- Checked 140 hint contexts and viewport combinations, persistent settings, uninterrupted combat, lab recovery and keyboard guards alongside campaign and inventory checks.

## 0.2.0 — 2026-10-28

- Added full five-dungeon campaign progression, connected routes and portal choices, bosses, blessings, endings and endless continuation. The original combat balance and item data are retained.
- Connected specialist shops, free refresh, rewards and explicit supplies, rest stops, noncombat encounters, merchant sales, sacrifices, restocking and enchanting to the Phaser interface.
- Added independent campaign autosaves, paid-roll/shop/route recovery and JSON export/import. Kept combat lab separate from campaign saves and the live game.
- Added catalogue/bestiary searches and filters, a parchment run map, class/encounter information, combat journal and full item controls.
- Restored sound settings and effects, themed floors, status indicators, visual-quality/text controls and a confirmed drag-to-discard area. Inventory can be managed during decisions without advancing or saving the wrong phase.
- Added a Windows launcher that finds the correct folder and opens the preview automatically, plus Python/Node alternatives in the downloadable build.
- Checked shared simulation parity, complete scripted campaign progression, actual mouse/touch interactions, transactions, save/reload, reference views and responsive decision screens. Branch-only CI also checks the portable build.
- Guided arrow tutorials are not migrated. Long decision/inspection views scroll within their dialog on small screens; gameplay stays within the viewport.

## 0.1.0 — 2026-10-28

- Added the first Phaser arena, backpack and stash with the existing RealmPack artwork and combat rules.
- Added class/dungeon selection, mouse/touch item dragging, rotation, stacking, inspection, confirmed discard and responsive inventory tabs.
- Added 1×/2×/4× battles, cooldown/health/resource displays, results, one reward choice and repeatable encounter tests.
- Added a pinned engine dependency, static build, local server and branch-only CI preview artifact. Production deployment and run saves stay separate.
- Verified all 19 class loadouts and 35 dungeon choices, exact seeded combat parity at all three speeds, inventory rules, production save isolation, real Phaser pointer interactions and six viewport sizes in development and built output.
- This is a single-encounter prototype. Campaign progression, shops/events, campaign save migration, reference screens and sound are still pending.
