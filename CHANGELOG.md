# RealmPack changelog

## 0.26.0 — 2026-10-21

- Rewrote How to Play as four short steps and a few controls, all on one screen.
- Added optional, contextual gameplay tips for packing, combat, mana, healing, loot, merchants, events and more. One tip appears at a time in its own space; Got it dismisses it, with a pause before the next tip.
- Added Gameplay tips On/Off in the guide and run menu, Tips off on each hint, and Show tips again to restart them. Preferences and seen tips survive reloads without changing run saves.
- Validation: 14 guide/tip layouts across seven desktop/phone sizes and both text modes; context rules, dismiss/toggle/reset, reload persistence, unchanged run state, JavaScript syntax and game regression checks.

## 0.25.1 — 2026-10-21

- Replaced the oversized restart screen with a compact, centered confirmation. Keep playing and Choose character sit together, with no paging or scrolling.
- Clarified that the current run is only replaced when Start is pressed in character selection. Keyboard focus starts on Keep playing, stays inside the dialog, and Escape cancels.
- Isolated item identity checks from randomly selected enemy passives so vampire healing cannot cause intermittent deployment failures.
- Validation: 14 desktop/phone layouts across seven viewport sizes and both text modes; action visibility, keyboard focus, cancellation, safe character selection and combat guard; JavaScript syntax and game regression checks.

## 0.25.0 — 2026-10-21

- Rebuilt the item compendium and realm bestiary as dedicated result browsers, removing the extra screen pager. Each has one Previous/Next control, a direct page-number field and an exact visible-result range.
- Results use a dense grid sized to the viewport and text setting. Search and filters stay outside the grid; phone filters open in a compact panel with Done/Escape/outside dismissal.
- Added dungeon and role filters to the bestiary, clear empty states and filter resets. Item and encounter cards offer Inspect for full details; Back or Escape preserves the search, filters, result page and card focus.
- Kept Sandbox add/practice actions and acquisition guards; browser feedback appears inline instead of covering the pager.
- Validation: both browsers at seven viewport sizes/two text modes, single-pager and card bounds, Next/Previous/jump, search focus, filters/reset/empty states, Inspect return, full ordered item/encounter traversal, Sandbox feedback/capacity/combat guards, practice action, workspace browser checks, syntax and game regressions.

## 0.24.5 — 2026-10-21

- Made Run Map a single sheet: the act route, difficulty, legend and Return button are visible together without Previous/Next pages.
- Replaced the flat map background with weathered parchment, worn edges, a fold line, faded contours and dark ink routes/markers. Current, travelled, skipped and available routes retain distinct states.
- The sheet fits desktop and phone viewports without scrolling; compact maps use the legend and marker tooltips for labels. Existing route selection and saved routes are preserved.
- Validation: eight viewport sizes and both text modes, every depth/route node, no paging/clipping/scroll, route/RNG preservation, branch selection, Return and portal state, workspace browser checks, syntax and game regression checks.

## 0.24.4 — 2026-10-21

- Enlarged backpack cells to use available panel space instead of staying capped at 64 pixels. Roomy screens can reach 112-pixel cells; item sprites and labels scale with them.
- Widened the adjacent stash and enlarged its square slots and item sprites, while preserving the 30-cell backpack, nine stash slots and five-copy consumable limit. Small screens still fit without page scrolling.
- Replaced the header star and browser icon with the Vault Chest Unlocker sprite from realm.wiki.
- Validation: inventory geometry and full-stash clipping at 12 viewport sizes, logo loading, live S/drag transfers, workspace browser checks, syntax, inventory controls, stacking/stash and game regression checks.

## 0.24.3 — 2026-10-21

- Moved class description and passive information from the sidebar to the character sprite. Hover or keyboard-focus your character to inspect it; click/tap pins the panel.
- Removed the Class sidebar tab. Character and enemy panels share reading/paging, Escape, Close, outside-click and view/dialog dismissal; opening one closes the other. Combat continues while inspecting.
- Validation: all 19 live class previews at six viewport sizes, complete descriptions/passive rules and page bounds, hover/focus/tap, active-run preservation, dismissal/focus, panel switching, modal/view cleanup, uninterrupted combat, enemy/workspace browser regressions, syntax and game regression checks.

## 0.24.2 — 2026-10-21

- Moved encounter mechanics and dungeon difficulty out of the sidebar into an enemy-sprite details panel. Hover or keyboard-focus the enemy to inspect it; click/tap pins the panel.
- The panel stays open while reading or using its pages, fits around the enemy, and closes with Escape, its close button, an outside click, or a view/dialog change. Combat continues while inspecting.
- Removed the Encounter sidebar tab; Item, Class and Journal remain.
- Validation: enemy hover/focus/tap at six viewport sizes, live details, pointer access, bounds/paging, dismissal/focus, modal/view cleanup, uninterrupted combat, workspace browser regression, JavaScript syntax and game regression checks.

## 0.24.1 — 2026-10-21

- Put all 19 classes on one compact selection screen, showing their portraits and names without paging.
- Hovering, keyboard focus or tapping updates a shared panel with health, description, starting equipment and passive rules. Small screens split the preview into Overview/Passive tabs.
- Added an explicit Start button so previewing never starts or replaces a run. Dungeon run/Sandbox and starting difficulty remain selectable.
- Validation: every class preview across seven viewport sizes, hover/focus/tap, visible roster and detail bounds, mode/difficulty start behavior, combat guard, browser workspace regression, JavaScript syntax and game regression checks.

## 0.24.0 — 2026-10-21

- Rebuilt the playfield around the viewport. Desktop keeps compact combat above the backpack and adjacent stash; smaller screens use Battle, Pack & stash, and Details tabs.
- Moved item inspection, encounter details, class information and the battle journal into a tabbed side panel. Secondary descriptions and dialogs use Previous/Next pages; a small-screen Menu keeps reference and settings buttons available.
- Added S to stash a hovered backpack item, falling back to the selected item. It only works from backpack to stash during preparation; respects capacity/stacking and ignores combat, dialogs, typing, held-key repeats and modified shortcuts.
- Validation: headless Chromium viewport, dialog paging and keyboard interaction checks, JavaScript syntax, inventory controls, shop/reward behavior and the full game regression suite.

## 0.23.1 — 2026-10-20

- Added one free stock refresh per shop visit, including sold-out shops. Refresh keeps the merchant's specialty and rolls five offers; some items may appear again.
- The used refresh persists through reopening and reloading. A later shop gets a new refresh; purchases, healing limits and visit bonuses stay intact.
- Existing mixed-stock saves keep their offers until explicitly refreshed, then switch to a specialist.
- Validation: refresh availability/disabled UI, specialty and resource preservation, repeat-click and wrong-phase guards, save/load limits, later visits, sold-out shops, legacy saves, JavaScript syntax and the game regression suite.

## 0.23.0 — 2026-10-20

- Replaced mixed random shop stock with 30 specialist merchants: every weapon, ability and armor family, plus separate ring and consumable shops. Each stocks only its own type with distinct offers and matching native sprites.
- Weighted new shops toward native weapon/ability/armor families (70%) and shared ring/consumable shops (25%), with a 5% chance of an off-class specialist. Shop chances are independent of catalogue size; stock retains class compatibility and act-based rarity weighting.
- Added reliable health/mana potion offers at The Alchemist and extra weight for eligible consumables already owned in partial stacks. Existing purchase, merge and stash caps remain enforced.
- Showed merchant identity in newly generated routes and the shop header. Preserved remaining stock and healing limits through reopening/reloading; old mixed-stock shops remain intact until the next shop.
- Validation: all 30 families across all 19 classes/three acts, 1,710 stock rolls, 190,000 seeded selection trials, consumable weighting, native art, purchases, legacy saves, repeat-entry guards, syntax and the existing regression suite. Details: docs/specialist-shops.md.

## 0.22.2 — 2026-10-20

- Chain Dagger retains 10 base damage and 2 bleed per use, but can only build enemy bleed up to six stacks. Its upgraded Shiny counterpart has an eight-stack ceiling.
- Higher bleed from other sources is preserved; Chain does not refresh that higher bleed when it cannot add stacks. Other bleed weapons and the global 24-stack cap remain unchanged.
- Validation: regular/Shiny ceilings, partial applications, preservation/expiry of other sources, seeded output checks, syntax and the full game regression suite.

## 0.22.1 — 2026-10-20

- Raised Evergreen Dagger’s final cooldown floor from 0.5s to 0.8s; the Shiny floor rises proportionally from 0.45s to 0.72s. Haste and upgrades cannot bypass these floors.
- Reduced Toxic Toad from 10 to 6 poison per activation, keeping its two-second cooldown, no direct damage, and existing poison cap/decay.
- Validation: cooldown ramp/reset/floor and Shiny checks, exact poison output, targeted seeded comparisons, JavaScript syntax and the game regression suite.

## 0.22.0 — 2026-10-20

- Implemented all 55 entries from The Dagger Update: 50 explicit dagger recipes, ten upgraded Shiny counterparts, four temporarily unobtainable items and removal of the redundant Poison Fang catalogue entry. Existing disabled-item saves remain usable; duplicate Fang saves migrate without losing upgrades.
- Added per-projectile miss/critical rolls, ward bypass, status riders, use counters, cooldown ramps, stronger haste response, direct-attack immunity windows, summons and packed-item/dungeon synergies. Multi-shot attacks share one flat-power and activation budget.
- Added Chicken Leg maximum-health rewards per defeated wave, once-per-room Rosebite noncombat rewards, and one-time initial enchantments for Retrowinds/Seeker's Chisel. Preserved saves, tiered progression, classes, footprints and art.
- Set Amethyst Prism's sale value to ten times the ordinary T12 offer, with a correspondingly higher purchase price. Updated inspection links/text, Shiny effect values and unavailable-item notices.
- Kept the requested values; documented interpretations and balance feedback in docs/dagger-update.md. Evergreen/Chain roughly doubled sustained output; Bounty/Cutter/Toy lost substantial primary-weapon output in the fixed Rogue fixture. These are diagnosed tradeoffs, not a claim of complete balance.
- Validation: full regression/syntax checks; all 55 requested entries and 10,000-trial miss/crit checks; 1,650 before/after boss simulations plus 2,200 output trials. All 1,995 ordinary tiered-build records matched before/after. Saved rolls, exclusions, duplicate migration, reward replay limits, cooldown floors and actual multi-room utility were checked.

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
