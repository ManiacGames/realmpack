# RealmPack changelog

## 0.18.1 — 2026-10-20

- Replaced oversized shop item panels with compact offers and separate Inspect/Buy actions. Full item details appear only when requested.
- Widened the desktop shop, added responsive offer columns and compacted its header art and footer.
- Enlarged adjacency text to 16–18px, shortened bonus descriptions and moved common placement rules into an expandable section.
- Shortened active connection labels and tightened inspection spacing; collapsed stack rules and hid the split button for single copies.
- Validation: JavaScript syntax, shop inspection/purchase guards, stack/adjacency behavior, event artwork and changelog checks. Browser layout was not visually verified.

## 0.18.0 — 2026-10-20

- Added distinct pixel scenes for all 25 noncombat events, plus rest stops and shops. Scenes use themed native characters, props and scenery instead of emoji artwork.
- Replaced 78 mismatched combat encounter identities and sprites, including fishing rewards, internal anchors, dispensers and furniture. Kept encounter IDs, combat profiles, rewards and numerical tuning unchanged.
- Updated dungeon portal artwork and existing saved routes to use the corrected encounters.
- Added repository instructions requiring a changelog entry in every future game update, plus a read-only CI check to enforce it.
- Validation: JavaScript syntax, stack/adjacency behavior, event artwork coverage, encounter mechanics preservation and event regressions. Browser layout was not visually tested.

## 0.17.1 — 2026-10-20

- Removed nested and horizontal scrollbars from the sidebar map and spaced the legend in two columns.
- Migrated deployment from the ZIP to editable files in `game/`; retained the ZIP as a backup.

## 0.17.0 — 2026-10-20

- Added ten adjacency bonus rules with inspection descriptions and connection markers.
- Added stacks of up to five identical single-use items, automatic merging, splitting and remaining-use badges.
- Preserved saved runs and the existing refresh-between-battles consumable behavior.

## 0.16.0 — 2026-10-19

- Added a compact loot-choice grid and separate Inspect view.
