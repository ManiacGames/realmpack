# Dungeon balance

## Current progression — 0.53.7 / Phaser 0.5.10

First-dungeon Beginner/Standard encounter HP, attack damage, cadence, waves and gold are unchanged. The five tier assignments and table below remain the same. The late curve now grows health by 7% per effective depth through 18, then 2.5% through 30; optional endless progression resumes 7% growth afterward. Base attack damage gains 0.65 per effective depth through 18, 0.20 through 30, then 0.65 again. The existing five-dungeon effective-depth mapping, attack cooldowns, waves, mechanics and run-mode multipliers remain.

For bosses beyond depth 8, Exaltation applies ×0.88 HP / ×0.89 attack damage; Apex applies ×0.65 HP / ×0.57 attack damage. These are boss-specific pressure adjustments, not tier-label or ordinary-enemy reclassification. Existing encounter-specific adjustments still apply. `DUNGEON_BALANCE_VERSION=5` migrates current/future route and branch rooms without consuming RNG or changing completed rooms, route choices, encounter IDs or owned items.

From the second dungeon onward, one boss reward choice and a later native/ring specialist stock slot can offer a stage-appropriate tiered upgrade. Native weapon/ability/armor and Health/Vitality/Defense rings compete by role rather than catalogue size. Tier floors are 45%, 60%, 75%, 90% of the role's maximum over dungeons 2–5; candidate ceilings are 75%, 85%, 95%, 100%, rounded upward. Only improvements over the highest owned tier in that role qualify. If none fit the stage band, normal random loot/stock remains. These are offers, not free auto-equips; loot remains one item and shops charge normal prices. The original dungeon-specific spotlight keeps its first slot. Supplies, nine-slot stash and unavailable/Legacy filters remain.

Sorcerer and Summoner gain source-specific, shared-rate-capped block on successful native ability casts after their first dungeon. The new class descriptions show exact values; this does not add generic healing or a mandatory Healing Tome.

See [progression validation](progression-balance.md) for before/after fixtures and limits.


The skull marker is a **custom RealmPack /5 tier**, not a claim to reproduce DECA's official /10 ratings. These are standard dungeons; Advanced Nest, Advanced Steamworks and Hard Mode Shatters are not implemented.

Dungeon identity previously had no statistical effect: every dungeon used similar HP/damage factors, with depth and randomly selected profiles dominating. The new tier is an additional multiplier. Compare the same depth, room role, path risk and run mode; a late easy-dungeon boss can still be stronger than an early ordinary enemy.

| Tier | Base HP | Base damage | Attack rate | Gold | Dungeons |
| --- | ---: | ---: | ---: | ---: | --- |
| 1 — Beginner | ×0.72 | ×0.72 | ×0.95 | ×0.90 | Pirate Cave; Forest Maze; Spider Den; Forbidden Jungle; The Hive; Sprite World; Snake Pit; Magic Woods |
| 2 — Standard | ×0.95 | ×0.92 | ×1.00 | ×1.00 | Undead Lair; Candyland Hunting Grounds; Manor of the Immortals; Abyss of Demons; Mad Lab; Puppet Master’s Theatre; Toxic Sewers |
| 3 — Advanced | ×1.20 | ×1.12 | ×1.04 | ×1.10 | Haunted Cemetery; Davy Jones’s Locker; Ocean Trench; Crawling Depths; Woodland Labyrinth; Mountain Temple; Parasite Chambers; Deadwater Docks; Lair of Draconis; Tomb of the Ancients; Ice Cave |
| 4 — Exaltation | ×1.70 | ×1.40 | ×1.08 | ×1.20 | Cultist Hideout; The Nest; Fungal Cavern; Crystal Cavern; Lost Halls; Kogbold Steamworks; The Void |
| 5 — Apex Exalt | ×2.25 | ×1.70 | ×1.12 | ×1.30 | Oryx’s Sanctuary; The Shatters |

Within a tier, dungeon-specific tuning adds up to 8% HP/damage and 3% attack rate. Exact values live in `game/dungeon-difficulty.js`. Loot-rarity tables remain unchanged. More gold compensates some of the extra risk without flooding item rarity.

Beginner bosses retain their base mechanic and phase-II damage increase but gain no unrelated second profile. Exalt secondaries are curated: Nest/Fungal venom, Crystal arcanist, Cult vampire, Halls berserker, Void bulwark, Steamworks duelist, Shatters suppressor and Sanctuary arcanist. Hexer's mana-drain/silence proc is limited to one proc per seven seconds so high attack speed cannot maintain a continuous silence chain.

Current five-dungeon portal bands: 1: Beginner / Beginner / Standard; 2: Beginner–Standard / Standard / Advanced; 3: Standard–Advanced / Advanced / Exaltation; 4: Advanced / Exaltation / Exaltation–Apex; 5: Exaltation / Exaltation–Apex / Apex. The cycle repeats in endless mode without revisiting a dungeon within the same cycle. Legacy three-dungeon saves retain their original bands.

Saved routes migrate only current/future encounter stats and future branch previews. Encounter IDs, room types, selected branches, item upgrades and player resources remain. Completed encounters are not rebalanced. No RNG is consumed by migration or difficulty markers.

## Evidence and design judgement

DECA's reference posts guide broad progression; exact /5 assignments, within-tier ordering and numerical multipliers are RealmPack design decisions rather than official RotMG ratings. References were checked on 2026-10-20. Older category lists are not treated as a complete current rating table.

- [DECA: broad dungeon categories](https://remaster.realmofthemadgod.com/?p=2747).
- [DECA: standard Steamworks versus its harder variant](https://remaster.realmofthemadgod.com/?p=3880).
- [DECA, May 2026: epic dungeons, Halls/Steamworks and Shatters appear in progressively higher Rift groups](https://remaster.realmofthemadgod.com/?p=6139).

## Validation and limits

`node game/tests/test-dungeon-difficulty.cjs` checks all 35 dungeons and all encounter variants at matched depths/roles across four run modes, ensuring exaltation baseline HP and HP×attack-DPS exceed Beginner/Standard maxima. This metric does not model every build counter or status mechanic. It also checks portal reachability, marker content, saved branch migration, Hexer cadence and 19 class openings.

Combat reachability benchmarks were revised for the 0.21.0 item/class rules: highest-numbered native gear, four weapons, valid four-slot enchantments and permitted equipment upgrades, with no enchanted consumables. Each representative boss still requires at least one successful build; this does not guarantee every class/build wins or that the ceiling upgrade budget is typical. See [class and item balance](class-item-balance.md) for the exact assumptions and comparative results. Dungeon scaling is unchanged by that pass.


## 0.30.11 — encounter pressure adjustments

The audit of build 0.30.10 identified strong profile-combination outliers at a matched depth. Dungeon /5 ratings, encounter IDs, native roles, wave counts, loot and gold remain unchanged. Individual tuning lives in `ENCOUNTER_TUNING` in `game/dungeon-difficulty.js`; all other profile instances retain their original parameters.

- Multi-wave bosses reset attack damage to the scaled room base at the start of each wave. A wave's phase-II bonus applies once to that base, so it cannot compound across waves.
- Archdemon Malphas: ×0.90 base damage, applied after the existing integer rounding. Both Berserker and Arcanist remain.
- Esben the Neurotic: suppression duration 3 → 2 seconds. Frostbinder and the seven-second suppression cadence remain.
- Ivory Wyvern: ×0.85 base damage and Raider heavy-strike multiplier 1.50 → 1.30, retaining Berserker.
- Heroic Lair Mummy King: periodic ward refill 10% → 8% maximum HP; initial 15% ward, cap and ten-second cadence remain.
- Kogbold Drone: artillery shell 75% → 65% attack damage; cadence and phase-II double strikes remain.
- Queen Bee: ×0.90 base damage, alongside the wave reset. Dreadstump receives the wave reset without another individual damage nerf.
- Crystal Worm Mother: ×1.10 base damage; no added regeneration or HP.

Five flagged ordinary encounter configurations now use the map's danger marker and describe their burst/wave/control pressure in route and encounter previews. This is a presentation change; it does not set the risky-path flag, promote them to elite, alter rewards or apply a stat multiplier. Boss burst/control warnings supplement the existing dungeon tier. Descriptions use encounter-specific values so the bestiary and live tooltip report the two-second silence, 30% heavy-strike bonus, 8% ward refill and 65% artillery accurately.

Balance schema version 4 migrates current/future rooms and unchosen branches. Completed room stats, IDs, route choices, upgrades and RNG state are preserved.

### Matched validation

`audit-encounters.cjs` runs the main roster matrix. `validate-encounter-balance.cjs` adds the same intermediate and ceiling fixtures as the preceding audit. `compare-encounter-audits.py` checks paired class/build/seed/depth results. Full results and validation counts are in `encounter-balance-0.30.11-results.json`.

The main comparison uses Normal mode, depth 10, all 350 encounters, all 19 classes and the unchanged starter/developing/established build assumptions: 19,950 fights at seed 123456. The prior three-seed run produced identical outcomes for these primary fixtures, so repeating the same seeds would not add independent evidence. Another 1,596 fights cover all bosses with the intermediate build, later depths for stronger tiers, and highly invested legal ceiling builds at depth 30. Mean HP includes zero on a loss. These fixtures do not model random full-run loot or real player win rates.

Regression checks cover independent phase bonuses per wave, each targeted profile adjustment, unchanged generic profile values, accurate descriptions, danger-only markers, and migration without RNG/history changes. Browser checks cover warning-bearing path cards and the updated Esben tooltip at desktop/phone/short landscape sizes.

At the intermediate depth-10 checkpoint, clears rose from 9/19 to 14/19 for Malphas, 2/19 to 5/19 for Esben, 3/19 to 7/19 for Ivory Wyvern, and 6/19 to 7/19 for the Mummy King. At depth 20 with the established fixture, Esben and Ivory each rose to 19/19 clears (from 14/19 and 10/19 respectively). The 17,955 ordinary/elite primary fixtures retained identical outcomes, HP, timings and tracked combat metrics; their danger warnings add no combat multiplier.

## Five-dungeon routes — 0.49.0

New runs have `runFormat:2`: five unique dungeons, eight rooms each, 40 rooms total. Saves without that flag keep the historical three-dungeon/ten-room format, original portal bands, rewards, blessings and victory boundary. No old route, selected branch, active event or paid enchantment preview is rebuilt. Endless adds a full circuit in the saved format. Repeats are excluded within each new five-dungeon circuit, with nearest-tier fallback if a requested portal band is exhausted.

Three saved room layouts each have two combats, one elite, one rest, one shop, two events and one boss. All begin with combat and end with an Enchanter event followed by the boss; the first event in the first dungeon is a Provisioner. Random optional event branches remain available. This yields 20 mandatory combat/elite/boss rooms versus 18 in the historical run.

Portal bands progress across five stages: beginner, standard, advanced, exaltation and apex choices, while retaining easier alternatives. Unowned, class-compatible UT/ST drops give a candidate dungeon weight 2 instead of 1 within its band. Each card previews one such item, with the full list in its tooltip. Missing source mappings grant no extra weight. Item rewards still use the 0.46.0 dungeon loot rules.

The effective balance depths at boss rooms 8/16/24/32/40 are 10/15/20/25/30. Rooms 1–8 interpolate effective depth 1–10; rooms 9–40 interpolate 10–30. HP, damage, attack rate, waves and gold use this effective depth, preserving the old endgame endpoint. Endless cycles advance the effective depth by 30 per 40 rooms. Loot, shops, event rewards and dust use reward stages 0/0/1/1/2. Boss blessings give +1 power, +4% global recharge or +8 max HP in new runs (legacy: +2/+6%/+12); the usual 15% recovery remains.

Validation: 190 deterministic routes across 19 classes, three layouts, all 35 dungeons reachable, unique portals, guaranteed services, save round trips and both victory/endless formats. All 1,995 fixed tiered fights match the previous build’s class clear totals when comparing equal effective depth (old room20 versus new room24): 1,570 clears. This checks the preserved encounter curve, not full-run win probability or the strength of five accumulated blessings. Use `node scripts/benchmark-balance.cjs --depth 24` for the equivalent fixture.

Regression checks: 39 Node suites passed, including all 19 starter openings and legacy dungeon-tuning migration. The 2,280 enchantment fights at raw depth20 (effective17.5 in new runs) produce 549/760 clears at each speed, with zero state-summary mismatches across 1×/2×/4×. These clear counts are not directly comparable to old raw depth20, which is harder. Map checks cover 16 views across eight sizes with no paging or scroll. Dialog auditing covers standard scenes plus later portal stages and legacy portals.

## Connected route networks — 0.50.0

Newly selected eight-room dungeons generate saved graphs instead of a three-template itinerary with one combat fork. Five interior layers have two or three shuffled nodes; the opening, Enchanter and boss are shared anchors. Each node has one or two nearest-lane connections, orphan targets get an incoming edge, and shop/rest targets at layers three/five are reachable from every preceding node. These are opportunities, not mandatory visits: taking a battle can mean forgoing a service. A mandatory combat/elite choice remains in the middle. The first dungeon offers its Provisioner on the second layer.

Three generation themes vary the mix of combat, peril and trading. Dungeon enemies are sampled without repetition until the relevant pool is exhausted. After the native elite has appeared, other dungeon mobs can be promoted using the existing elite scaling, rewards and source profile. Event IDs are unique within the graph when useful options remain, with preference for events not yet visited this run. Shop specialties avoid duplication when possible. Enemy IDs, pixel art, combat engine and dungeon loot weights are unchanged.

`s.mapGraphs`, `s.mapLinks`, `s.mapBranches` and `s.mapTaken` hold graph metadata, edges, options and visited nodes. Selection validates actual connections; the map and path cards expose only currently reachable actions. Rendering does not consume RNG. Opening a save never generates a replacement graph. Already-generated old maps remain unchanged; their next selected modern dungeon uses the new generator. Ten-room legacy runs retain their existing map logic. Five dungeons and 40 selected rooms remain the victory target.

Validation: 150 seeded graphs with unique fingerprints, thousands of complete boss paths, edge/orphan checks, service access, blocked-click protection and per-layer save round trips. Updated five-dungeon tests cover 190 routes across 19 classes. Browser checks cover the full map at eight sizes/two text modes and mixed shop/rest/event/combat path screens. The new choices deliberately change how much combat and how many services a player takes; full-run economy across optimized route strategies is not exhaustively balanced.

### Map connection clarity — 0.50.1

Saved edges now render as curved SVG paths with parchment outlines and arrowheads. The next outgoing routes are green and stronger than distant routes; walked edges are brown and blocked edges recede. Hover, keyboard focus or tapping a preview room isolates only its direct incoming/outgoing edges and neighbors. Future nodes can be focused or previewed without selecting them; available route nodes keep their selection behavior. Compact map previews avoid extra keyboard stops. No generator, edge, encounter, RNG or save data changes are involved.

Validated 16 map layouts across eight sizes/two text modes, five pointer/keyboard/touch preview fixtures, dialog auditing, and the 150-map saved-graph regression suite. The preview fixtures check exact edge membership and confirm the entire saved state is unchanged.
