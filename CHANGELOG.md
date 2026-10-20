# RealmPack changelog

## 0.20.3 — 2026-10-20

- Healing consumables now wait until health is at or below 50% before activating, including signature consumables and consumables with an active healing affix. Repeating healing equipment and non-healing consumables keep their existing behavior.
- Waiting preserves a ready cooldown, mana and stack uses. Every copy rechecks health, so a heal that raises health above the threshold pauses the next copy until needed.
- Added the activation rule to item descriptions, including catalogue and inspection text. Kept healing amounts, cooldowns, stack limits and per-battle refresh unchanged.
- Balance rationale: 50% is an initial safety threshold; a strict 25% trigger may be too late for small heals against burst damage. Further balance tuning requires playtesting.
- Validation: automated full-health and exact-boundary checks, ordinary/signature/affix paths, resource preservation, stacked copies, real battle ticks, battle refresh and existing regression checks.

## 0.20.2 — 2026-10-20

- Clicking another packed item while an item is selected now cancels the current selection instead of selecting the item underneath. Neither item moves; this also applies when placing from the stash.
- Compatible consumable stacks still merge. Clicking gear with nothing held still selects it; hover inspection remains available.
- Validation: automated pointer interaction checks for occupied targets, unchanged item positions, stash-to-pack cancellation and stack merging; JavaScript syntax and stack/adjacency and shop regression checks.

## 0.20.1 — 2026-10-20

- Fixed repeat clicks failing to deselect backpack and stash items. Click selection now runs once; dragging starts only after the pointer moves past the drag threshold.
- Hovering or focusing packed and stashed items now updates Item inspection without selecting or moving them. Details remain visible when moving into the inspection panel.
- Discard and split actions target the item displayed in inspection, even when a different item is selected for placement. Live stack and signature counters follow the inspected item.
- Preserved drag rotation, anchored placement, drop-to-release selection and stack merging. Added Space-key selection alongside Enter.
- Validation: automated DOM interaction checks for mouse/touch/keyboard toggles, hover/focus, inspection actions, drag/rotation/release and Escape; JavaScript syntax and existing game regression checks.

## 0.20.0 — 2026-10-20

- Added explicit difficulty scaling for all 35 dungeons: Beginner, Standard, Advanced, Exaltation and Apex Exalt. Previously dungeon identity did not affect base stats.
- Dungeon tier now scales enemy health, attack damage, attack rate and gold in addition to depth, run mode and encounter type. Cult/Nest/Fungal are lower-end exalt choices; Shatters/Oryx are apex choices.
- Removed unrelated secondary mechanics from Beginner bosses, gave key exalt bosses thematic second phases, and prevented rapid Hexer attacks from maintaining near-permanent silence.
- Added readable skull markers with text labels to portal choices, the current dungeon, the route map, path selection and the bestiary. This custom /5 scale is not DECA's official /10 rating.
- Portal offers now include clear risk choices: two Beginner and one Standard in Act 1, Standard/Advanced choices in Act 2, and Advanced/Exaltation/Apex choices in Act 3.
- Existing saves upgrade current/future rooms and all future branch previews to the new tuning without changing encounter IDs, selected paths or item progress.
- Made Pages artifact names unique per retry attempt so a failed publish can be retried without duplicate-artifact conflicts.
- Validation: full dungeon coverage, matched-depth comparisons, reward scaling, portal bands, all run modes, saved branches, playable openings and upgraded-build simulations, plus existing mechanics/event tests.

## 0.19.0 — 2026-10-20

- Added the Runeforge Altar: sacrifice one copy of an item to improve a different piece of equipment for the current run. Choose primary infusion or cooldown tempering, with an exact preview before committing.
- Donation rarity grants +8/10/12/15% primary effect (30% cap) or +4/5/6/8% cooldown reduction (shared 20% tempering cap). One sacrifice per visit.
- Added the Salvage Merchant: sell packed or stashed items, one copy or a full consumable stack, at visible prices. Multiple sales are allowed per visit.
- Both events protect the last damage source, preserve existing saves, and reject stale or repeated actions. Added themed pixel scenes and visible recipient infusion notes.
- Validation: trade accounting, caps, stack handling, preview/commit guards, save recovery, primary combat effects, existing events, artwork coverage and JavaScript syntax.

## 0.18.1 — 2026-10-20

- Replaced oversized shop item panels with compact offers and separate Inspect/Buy actions. Full item details appear only when requested.
- Widened the desktop shop, added responsive offer columns and compacted its header art and footer.
- Enlarged adjacency text to 16–18px, shortened bonus descriptions and moved common placement rules into an expandable section.
- Shortened active connection labels and tightened inspection spacing; collapsed stack rules and hid the split button for single copies.
- Validation: JavaScript syntax, shop inspection/purchase guards, stack/adjacency behavior, event artwork and changelog checks.

## 0.18.0 — 2026-10-20

- Added distinct pixel scenes for all 25 noncombat events, plus rest stops and shops. Scenes use themed native characters, props and scenery instead of emoji artwork.
- Replaced 78 mismatched combat encounter identities and sprites, including fishing rewards, internal anchors, dispensers and furniture. Kept encounter IDs, combat profiles, rewards and numerical tuning unchanged.
- Updated dungeon portal artwork and existing saved routes to use the corrected encounters.
- Added repository instructions requiring a changelog entry in every future game update, plus a read-only CI check to enforce it.
- Validation: JavaScript syntax, stack/adjacency behavior, event artwork coverage, encounter mechanics preservation and event regressions.

## 0.17.1 — 2026-10-20

- Removed nested and horizontal scrollbars from the sidebar map and spaced the legend in two columns.
- Migrated deployment from the ZIP to editable files in `game/`; retained the ZIP as a backup.

## 0.17.0 — 2026-10-20

- Added ten adjacency bonus rules with inspection descriptions and connection markers.
- Added stacks of up to five identical single-use items, automatic merging, splitting and remaining-use badges.
- Preserved saved runs and the existing refresh-between-battles consumable behavior.

## 0.16.0 — 2026-10-19

- Added a compact loot-choice grid and separate Inspect view.
