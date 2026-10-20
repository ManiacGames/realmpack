# Dungeon balance — 0.20.0

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

Portal bands: Act 1 offers two Beginner choices and one Standard; Act 2 offers one Standard and two Advanced; Act 3 offers Advanced, Exaltation and Apex. The same sequence repeats in endless acts. Lower-risk routes remain available.

Saved routes migrate only current/future encounter stats and future branch previews. Encounter IDs, room types, selected branches, item upgrades and player resources remain. Completed encounters are not rebalanced. No RNG is consumed by migration or difficulty markers.

## Evidence and design judgement

DECA's reference posts guide broad progression; exact /5 assignments, within-tier ordering and numerical multipliers are RealmPack design decisions rather than official RotMG ratings. References were checked on 2026-10-20. Older category lists are not treated as a complete current rating table.

- [DECA: broad dungeon categories](https://remaster.realmofthemadgod.com/?p=2747).
- [DECA: standard Steamworks versus its harder variant](https://remaster.realmofthemadgod.com/?p=3880).
- [DECA, May 2026: epic dungeons, Halls/Steamworks and Shatters appear in progressively higher Rift groups](https://remaster.realmofthemadgod.com/?p=6139).

## Validation and limits

`node game/tests/test-dungeon-difficulty.cjs` checks all 35 dungeons and all encounter variants at matched depths/roles across four run modes, ensuring exaltation baseline HP and HP×attack-DPS exceed Beginner/Standard maxima. This metric does not model every build counter or status mechanic. It also checks portal reachability, marker content, saved branch migration, Hexer cadence and 19 class openings.

Combat reachability benchmarks were revised for the 0.21.0 item/class rules: highest-numbered native gear, four weapons, valid four-slot enchantments and permitted equipment upgrades, with no enchanted consumables. Each representative boss still requires at least one successful build; this does not guarantee every class/build wins or that the ceiling upgrade budget is typical. See [class and item balance](class-item-balance.md) for the exact assumptions and comparative results. Dungeon scaling is unchanged by that pass.
