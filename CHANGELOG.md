# RealmPack changelog

## 0.21.5 — 2026-10-20

- Reworked 24 UT identities around researched RotMG behavior, covering 54 entries with imported duplicate versions and Shiny counterparts. Divinity now beams, EP specializes in point-blank barrages, Planewalker evades/repositions, Crystal Shield armors/retaliates, Conflict consumes Hex for soulshards, and Mushroom Tome heals over time.
- Added 24 individually adapted ST pieces across six sets: Skuld, Swoll Paladin, Priest of Geb, Pirate King Warrior, Oryx Awesome and Phylactery Mystic. Two/three distinct packed pieces improve the set; four unlock a themed effect. Duplicates, stash and Legacy pieces do not fill missing slots.
- Added visible set progress, piece lists and explicit signature tradeoffs. Close-range weapons favor the top backpack row. Volleys share one damage budget; temporary armor, regeneration, protection and set procs have stacking or repeat limits.
- Preserved item IDs, art, footprints, native classes, saved upgrades and tiered progression. Other imported UT/ST items retain their existing family rules. These mechanics use RealmPack values rather than exact RotMG numbers; references and scope are documented in docs/ut-st-identities.md.
- Validation: signature/defense/resource tests, all six legal set layouts, threshold/proc guards and 18 actual set-combat simulations, full regression suite and syntax checks. All 1,995 tiered-build class benchmark records matched the preceding release.

## 0.21.4 — 2026-10-20

- Added the Supply Caravan: choose an owned consumable stack and buy one or two exact matching copies, capped at five. One purchase per visit; each copy costs 60% of its item price, rounded up, with an eight-gold minimum.
- Guaranteed a Supply Caravan at depth 3 of newly generated first acts; it can also appear among random events. Existing generated routes remain intact.
- Restocking preserves upgrades, works on packed or stashed stacks even with all nine stash slots occupied, and previews counts and costs before purchase.
- Validation: restock accounting, exact variants, stack/stash limits, invalid/stale/repeated orders, event art, route generation and existing game regression checks.

## 0.21.3 — 2026-10-20

- Kept noncombat rooms accessible for saved stashes above the new nine-slot limit, allowing excess gear to be sold. Only starting combat requires the stash to be reduced to nine slots.
- Validation: over-cap shop entry, normal full-stash guards, preserved legacy items and legal battle entry.

## 0.21.2 — 2026-10-20

- Limited Travel stash to nine item slots in both normal runs and Sandbox. A consumable stack still holds up to five copies in one slot. Added nine visible slots and a used/9 counter.
- Applied the cap to purchases, rewards, event grants/clones/exchanges, Sandbox additions, splitting and backpack transfers. Compatible stacks can merge at capacity, with failed partial merges leaving both quantities unchanged.
- Blocked purchases and paid event choices before charging costs when their item cannot fit. Blocked loot choices remain available until another reward or the health alternative is chosen. Lottery capacity checks do not expose their predetermined result.
- Preserved existing saves above the cap without deleting items. Those stashes must be reduced to nine or fewer slots before battle; they cannot add new slots while over capacity.
- Corrected stack compatibility to distinguish primary infusions, and configured cloned upgrades before considering stack merges.
- Validation: nine-slot boundary, atomic merges, upgrade variants, transfers, split guards, purchase/reward accounting, event costs and freed slots, lottery guards, Sandbox, legacy over-cap handling and existing regression checks.

## 0.21.1 — 2026-10-20

- Moved Travel stash beside Your backpack inside one inventory workspace, with a clear vertical divider and aligned headings. Narrow layouts place the stash immediately below the backpack with a horizontal divider.
- Added a visible stash slot count and expanded the drag-to-stash target to the whole stash pane. Preserved drag/drop, hover inspection, selection and stack merging.
- Stash contents expand naturally without a new internal scrollbar. Existing capacity rules remain: normal runs have no enforced stash cap; Sandbox catalogue additions stop at 80 stash slots, while other transfers may exceed that. Stacks hold up to five copies per slot.
- Validation: unique DOM IDs and inventory placement, bidirectional drag/drop, slot counts, existing selection/hover/rotation interactions, stack/adjacency behavior, shop UI and JavaScript syntax.

## 0.21.0 — 2026-10-20

- Replaced item-ID-derived stat variation with consistent recipes for 33 equipment families. Every numbered tier improves output or efficiency; ordinary tiered gear keeps its family role instead of gaining unrelated random mechanics.
- Rebalanced weapon output around attack cadence and backpack footprint. Larger bows hit harder; small weapons retain speed and flexibility. Reduced excessive dodge frequency on starter leather armor.
- Special equipment uses a family baseline with themed bonuses or curated iconic signatures. Preserved names, IDs, sprites, shapes and shiny relationships; shiny upgrades inherit their base item's revised role. Tier labels are visible in inspection and offers.
- Reworked Bard into capped Rhythm rewards from hasted activations; Wizard now stores a scaling spell echo; Samurai builds Focus for wakizashi strikes; Warrior gains capped temporary percentage Fury; Archer gains bow/quiver precision shots. Druid sigils now heal and summon, supporting the class's healing passive from the starting kit.
- Reduced Knight's block-to-counterattack feedback and Kensei's counterattack payout, improved Sorcerer's proc cadence and added block to Summoner's class summon. Mystic and item attack delays now share one bounded delay budget.
- Poison and bleed now lose one stack per second and cap at 24 stacks, reducing sustained runaway stacking. Existing consumable health thresholds, stack limits and adjacent-haste rules remain.
- Added progression/class regression checks and a reproducible 19-class benchmark. Corrected the earlier audit's broad rarity-based ability selection to use each family's actual tier range and legal upgrades. Updated endgame reachability tests to use native, fully tiered builds with valid enchantments.
- Validation: tier progression, family roles, shiny inheritance, saved equipment/upgrades, class resource caps and activation hooks, healing/haste/stack/event regressions, 19 class openings, difficulty hierarchy and legal apex clears. Comparative benchmark details and limitations are in docs/class-item-balance.md. This is an initial balance pass; full-run playtesting should guide further tuning.

## 0.20.4 — 2026-10-20

- Item-granted haste now affects only packed items sharing an edge with the source. It excludes the source itself, diagonal neighbors and stashed gear; large items use their actual occupied edges.
- Kept the +25% recharge bonus. Repeated haste refreshes the recipient timer without adding duration; overlapping item/class haste does not multiply or add speed. The existing 15-second duration cap remains.
- Bard and Warrior class haste remains backpack-wide. Permanent recharge blessings, quivers, adjacency bonuses, enchantments and tempering keep their existing rules.
- Updated item descriptions, connection lines, recipient inspection notes, class descriptions and battle status to distinguish adjacent haste from class haste.
- Validation: automated ordinary/signature/affix activation checks, recipient geometry, no self/diagonal/stash benefits, overlapping sources/class haste, refresh/caps, expiration, legacy timer defaults, battle reset and existing game regression checks. Further balance tuning requires playtesting.

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
