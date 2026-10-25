# Class identities — 0.43.0

Twelve classes now connect their passive to their signature ability. Archer, Wizard, Priest, Warrior, Knight, Samurai and Bard retain their mechanics. All item definitions (including UT/ST signatures and tiered costs), class HP, encounter stats, geometry, equipment upgrades and save version remain unchanged.

## Ability loops and limits

| Class | Loop | Limits |
|---|---|---|
| Rogue | Cloak readies the next dagger ambush: 80% of dagger primary +8 extra damage. Every four weapon activations still grant one dodge. | One stored ambush; six-second shared cloak recharge. Replaces the old flat 12-damage weapon proc. |
| Mystic | Orb readies a temporal charge; the next staff activation releases 10 + twice orb primary damage (the variable part caps at 20) and up to 0.75s enemy delay. | One charge, eight-second lifetime, four-second shared orb recharge. All item/class delay still shares two seconds per five-second window. |
| Ninja | Four katana activations ready an empowered shuriken: 60% primary +8 bonus damage and 10% recharge to adjacent katanas. | One stored Flow. The existing shared 35%-per-second relay budget also limits the recharge. No obsolete mana reward. |
| Assassin | Poison ability primes dagger activations for six seconds. Every three primed dagger activations add four poison, deal half resulting poison as damage (max12), and expose for two seconds. | Two-second shared payoff recharge. Expired priming cannot bank partial progress into another window. No poison ability means no class poison proc. |
| Huntress | Trap marks prey; next bow consumes it for 25% primary bonus damage, four bleed and three seconds of weakness. | One mark, six-second lifetime, three-second shared trap recharge. |
| Trickster | Prism grants one extra dodge and readies a decoy. The next consumed dodge raises an eight-second illusion dealing 4 + floor(10% prism primary) damage/s, capped at8. | One decoy, ten-second lifetime, six-second shared prism recharge. Existing protection/dodge caps apply; an attack prevented without spending a dodge cannot consume the decoy. |
| Paladin | Seal grants four block and a four-second oath: adjacent weapons gain 10% primary damage. Reliable baseline remains three healing/four block every four seconds. | One oath source, three-second shared seal recharge. Oath does not stack across seals and never buffs distant weapons. |
| Necromancer | Every two skull activations deal14 damage, restore7 health and raise a three-damage/s skeleton for ten seconds. | Three-second shared harvest recharge. Skeleton ownership follows the skull, enabling its existing companion support. Unrelated mana spending no longer raises skeletons. |
| Sorcerer | Every two scepter activations strike twice for 50% of latest scepter primary +5 per strike, then expose for four seconds. | Two-second shared surge recharge. Extra strikes are direct hits, not ability activations, and cannot repeat themselves. |
| Summoner | Mace casts build Pact: +8% owned mace companion damage per stack, max3, lasting ten seconds. Every two accepted casts raise a five-damage/s companion for ten seconds and grant six block. | One stack per two seconds, refreshed expiry. Fractional Pact damage carries at the source; base pet power is never mutated. Non-mace companions receive no Pact bonus. |
| Kensei | Sheath activation prepares a dodge. Each dodge still counters for16 damage and six block. | One preparation per eight seconds, first eligible at battle second8. No automatic timer dodge without a sheath. |
| Druid | Every18 actual healing from packed sigils or their owned healing companions grants six block and nurtures one spirit for ten seconds. | Spirit starts at4 damage/s; nurturing adds2, max8, and refreshes duration. One nurtured spirit; unrelated healing and overhealing do not advance Growth. |

Ability loops use successful activations, including existing UT/ST signature paths. Unaffordable/failed uses do not consume prepared class bonuses. Extra class hits do not generate item activation, mana-spend or weapon events. The existing eight-companion limit remains. All class resources reset at battle setup, so old expeditions continue without rerolling items or paid enchantment previews. Existing fight saves resume in preparation under the existing load behavior.

Pact, Oath and class ambush/echo effects are class bonuses, separate from adjacency's +35% positive support cap. Pact is applied once at owned-companion delivery before adjacency/Command, using a separate fractional carry. Class pets use real owner IDs; existing Wisdom/Conjurer/Command delivery limits remain unchanged. Neither a hover nor an inspection spends class resources.

## Fixed comparisons

Baseline: commit `b1318188f314672516788ba3464e24a13b4d5289` (0.42.1). Reports below are seeded loadout comparisons, not player win probabilities or an exhaustive optimization of builds.

- Historical fixture: unchanged `benchmark-balance.cjs`, 19 classes ×35 bosses ×3 developed builds (1,995 fights per version). This fixture includes an extra off-class Healing Tome; removing generic mana/healing triggers intentionally reduces its ability to drive unrelated class passives.
- Native identity fixture: `benchmark-class-identities.cjs`, starter/developed native packs ×4 boss indices ×19 classes; ability activations enabled/disabled. Developed packs use a T1 Magic ring, a second native weapon, three Health Potions, +50 base HP and +8% run recharge. No extra Tome, enchantments or infusions. Disabled abilities remain physically packed and retain their passive item/adjacency effects: this measures activation dependence, not the entire value of an item. 304 baseline fights; the new build repeats at1×/2×/4× (912 fights).
- Adjacency layouts: unchanged paired legal packs (172 baseline,516 new fights). Enchantment choices: unchanged legal packs (760 baseline,2,280 new fights). These comparisons exercise interactions rather than retune the item systems.
- All1,236 scenarios across the three speed-controlled fixtures have identical new-build results at1×/2×/4×, including HP, enemy HP, duration and measured activations. The seven retained classes exactly match all735 rows of the historical fixture.

| Class | Historical before /105 | Historical after /105 | Native before /8 | Native after /8 |
|---|---:|---:|---:|---:|
| rogue | 80 | 77 | 4 | 4 |
| archer | 96 | 96 | 6 | 6 |
| wizard | 77 | 77 | 4 | 4 |
| priest | 91 | 91 | 6 | 6 |
| warrior | 86 | 86 | 4 | 4 |
| knight | 94 | 94 | 7 | 7 |
| paladin | 91 | 91 | 6 | 6 |
| assassin | 81 | 78 | 4 | 4 |
| necromancer | 84 | 82 | 6 | 6 |
| huntress | 93 | 86 | 6 | 6 |
| mystic | 82 | 78 | 3 | 4 |
| trickster | 78 | 75 | 4 | 4 |
| sorcerer | 68 | 64 | 4 | 4 |
| ninja | 80 | 81 | 4 | 4 |
| samurai | 85 | 85 | 5 | 5 |
| bard | 80 | 80 | 5 | 5 |
| summoner | 73 | 72 | 4 | 4 |
| kensei | 96 | 95 | 6 | 6 |
| druid | 96 | 90 | 6 | 6 |

Historical clears: **1611 → 1578 /1,995**. Native enabled clears: **94 → 95 /152**. Mystic now operates through its native orb/staff loop rather than waiting for unrelated mana spending. Other native class clear counts remain unchanged in this small sample. The historical reductions, especially Huntress/Druid, remain material observations; this release establishes distinct ability loops and does not establish equal class strength. Sorcerer/Summoner remain candidates for later strength tuning with broader native builds.

## Reproduce and validate

- `node scripts/benchmark-balance.cjs --output /path/to/historical.json`
- `node scripts/benchmark-class-identities.cjs --speeds 1,2,4 --output /path/to/native.json`
- `node scripts/benchmark-adjacency.cjs --speeds 1,2,4 --output /path/to/layouts.json`
- `node scripts/benchmark-enchantments.cjs --speeds 1,2,4 --output /path/to/enchantments.json`
- The last three scripts accept `--root /path/to/baseline`; keep gear/layout assumptions unchanged.

`test-class-identities.cjs` protects item definitions, all twelve loops, unrelated-item rejection, source ownership, shared rate caps, one-charge limits, expiry, local geometry, actual healing, fractional Pact budgets and battle resets. The full34 regression suites cover existing item signatures, save/upgrades, paid enchantments, progression, local haste, healing, inventory and encounters. Browser checks cover class selection, all class tooltips, item hovering, combat presentation and responsive dialogs. Aggregated evidence is in `class-identity-balance.json`; raw results can be regenerated with the commands above.
