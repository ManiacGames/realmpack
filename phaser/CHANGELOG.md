# Phaser changelog

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
