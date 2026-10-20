# Class and item balance — 0.21.0

This pass replaces incidental item-ID variation with explicit family recipes. `game/catalogue.js` remains the imported identity catalogue; `game/item-balance.js` is the canonical gameplay layer loaded immediately afterward. Tests, offline benchmarks and the browser load the same rules. Names, object IDs, sprites, shapes, class restrictions and save references remain stable.

For the later researched UT/ST identity layer and set mechanics, see [UT/ST identities — 0.21.5](ut-st-identities.md). The ordinary tiered rules below remain unchanged.

## Item progression

Numbered tiers keep their family's primary role and mana cost. Most primary amounts grow from a family baseline by 9% of that baseline per tier, rounded to an integer; cooldown decreases by 1% of the baseline per tier. Mana and dodge have discrete amounts and instead improve cooldown by 2.5% of baseline per tier. Haste and chill durations grow by 5.5% of baseline per tier. Consequently a higher numbered tier always improves primary output or efficiency, even at steps where integer amounts stay unchanged. The progression test checks all 310 tier transitions across 33 families, including separate ring roles.

Weapon budgets account for footprint as well as cadence. T0 dagger/sword/staff/wand/katana primary output is roughly 1.9–2.25 damage per second per cell. Bows use six cells, hit much harder, and get additional value from quivers. These are starting budgets, not an assertion that every interaction has identical value.

Tiered gear no longer receives unrelated procedural mechanics or activation conditions. Wakizashis deal damage and briefly expose the enemy; sigils heal and summon a small companion; robes generate mana and modest block. Leather grants occasional dodge rather than near-continuous avoidance from starter armor.

Special UT/ST gear uses the same family baseline at two ranks below its family's highest numbered tier, with either a themed specialization or a curated iconic signature. Generic special primaries gain a 10% premium, or a 6% cooldown improvement for duration/discrete effects. Elemental weapon affixes trade some primary damage for the named effect. Iconic timing trades include slow heavy Doom Bow/Demon Blade hits and faster smaller Cronus/Extreme Prejudice hits. This is a consistent initial budget; many imported cosmetics share gameplay rather than being forced into arbitrary uniqueness.

Shiny items inherit their base role/signature, have 5% shorter cooldowns and a 5% primary bonus before integer rounding. Their prices follow the revised base. Consumables retain their once-per-copy battle refresh, five-copy limit and healing health threshold. Poison and bleed cap at 24 and lose one stack per second; their expiry timers still refresh on application.

## Classes

- Warrior: every three weapon activations grants +8% weapon primary damage, five-stack cap, ten-second refreshed expiry. No accumulating flat power or global class haste.
- Wizard: every five mana spent readies one echo; the next offensive ability repeats 80% of primary damage. Echoes generate no mana/activation events and cannot chain.
- Samurai: every three weapon activations grants one Focus, capped at three; wakizashis consume it for +40% primary damage per stack. Exposure is supplied by the wakizashi itself.
- Bard: hasted activations generate Rhythm at most once per second. Every three Rhythm grants two mana and six block. Lutes supply adjacent haste; the class no longer duplicates it globally.
- Archer: every four bow activations fires a precision shot for 40% of that bow's primary damage, or 75% with an adjacent quiver.
- Druid: the starting sigil now provides actual healing and a small summon, supporting the existing healing passive without requiring a different ability.
- Knight: 25 blocked damage triggers an 18-damage counter and four block, reducing the defensive feedback loop.
- Kensei: dodges counter for 16 damage and six block; automatic dodge timing is unchanged.
- Sorcerer: every four mana spent deals 20 damage and grants four seconds of exposure.
- Summoner: its class summon also grants six block; mace output/cadence was tuned separately from sigils.
- Mystic: class and item delays share a two-second budget per five-second window, with the existing -1.5 enemy-charge floor.

Temporary class resources reset at battle setup. Existing item IDs, stacks, enchantments, infusions and tempering survive loading; definitions update without rebuilding a player's backpack or rerolling their route.

## Reproducible comparison

Run `node scripts/benchmark-balance.cjs --output /tmp/realmpack-balance.json`. The summary is printed to stdout; the optional output records every fight and packed item. This is an offline diagnostic, not a CI assertion that all classes must meet a particular win count.

The preceding build is GitHub commit `9191dd19565ff0e60f8fb2249a9d2abb07c87493`. Both builds were compared against the same first boss encounter in each of 35 dungeons at depth 20, Normal mode, using the actual 0.05-second game tick. Each class receives three numbered-tier loadouts: weapons/armor near 60%, 70% and 80% of their family's highest tier, and abilities near 67%, 83% and 100%. Every loadout packs two copies of its native weapon, its native ability and armor, Ring of Magic, Healing Tome and three Health Potions. Nonconsumable equipment receives 10% tempering, eligible 15% infusion, and a legal rank-II Quickening enchantment. No upgrades or enchantments are assigned to consumables. Both builds receive +60 maximum HP, +4 run power and +12% run recharge. All fixture items fit and activate; class restrictions and off-class Tome costs remain active.

The earlier audit filtered abilities by broad rarity and could fall back to starter gear. The table below replaces that comparison with family-tier selection and legal upgrades on both versions. It has 1,995 fights per version (19 classes × 35 dungeons × 3 builds), or 105 fights per class.

| Class | 0.20.4 clears /105 | 0.21.0 clears /105 |
| --- | ---: | ---: |
| Rogue | 49 | 79 |
| Archer | 72 | 90 |
| Wizard | 50 | 75 |
| Priest | 75 | 89 |
| Warrior | 77 | 81 |
| Knight | 84 | 93 |
| Paladin | 65 | 88 |
| Assassin | 87 | 79 |
| Necromancer | 75 | 80 |
| Huntress | 85 | 91 |
| Mystic | 77 | 79 |
| Trickster | 53 | 71 |
| Sorcerer | 53 | 66 |
| Ninja | 71 | 78 |
| Samurai | 36 | 79 |
| Bard | 25 | 76 |
| Summoner | 57 | 64 |
| Kensei | 56 | 93 |
| Druid | 92 | 93 |

The spread narrowed from 25–92 to 64–93 clears. Summoner and Sorcerer remain lower in this fixture; defensive builds remain strong. These counts reflect the selected loadouts, their automatic layout, encounter profiles and fixed resource budget. They do not measure optimal class strength, all build archetypes, all run modes, loot availability, full expeditions or player choices. No claim of complete class parity is made.

## Regression validation

`test-item-progression.cjs` checks recipes, tier inversions, same-tier consistency, family costs/roles, shiny inheritance, Druid starter support and saved item upgrades. `test-class-reworks.cjs` exercises real activation hooks, class scaling/caps, nonrecursive echo, Focus consumption, quiver checks, Rhythm throttling, shared delay budgets, DoT decay and battle resets. Existing inventory, healing, haste, stack, event, shop and dungeon checks also run.

The dungeon suite still checks all class openings and the existing difficulty hierarchy. Its endgame fixture now uses highest-numbered native gear, four weapons, legal four-slot rank-III enchantments and maximum permitted equipment upgrades; consumables are not enchanted. It demonstrates that a highly upgraded build can clear each representative dungeon, including both apex bosses. It does not imply every native loadout wins or that this upgrade budget is typical at depth 30. No dungeon stats were reduced to make the new builds pass.
