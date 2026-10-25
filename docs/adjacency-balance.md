# Adjacency balance — 0.42.0

## Paired layout fixtures

19 native tiered ability packs plus twelve themed pairs, each linked and separated. Four dungeon boss indices0/9/19/34, depth20 Normal. Highest available tiered main targets, native weapon/armor at80% family max; other source equipment at80% family max; Crossbones Skull for healing summons, T7Vitality for its partner. Matching native gear is included once by kind; T3Magic ring, threeHealthPotions,+50baseHP,+8%relicrecharge,seed123456. No enchants, infusions or special set completion. Main item fixed at(0,0); partner is the first legal linked/separated placement allowing remaining gear. All layouts are checked and matched between builds. Layout moves may change other edges too. Comparative fixtures, not player win probabilities.

The earlier build ran **172 fights at 1×**. The new build ran the same **172 scenarios at 1×, 2× and 4× (516 fights)**. Layouts match exactly between versions, and every new scenario has identical health, enemy health, duration and main-item activation count across all three speeds.

At 1× the result is 52 wins before and 51 after. Linked versus separated placement can change several edges, so this is a whole-layout comparison, not a measurement of only one rule. Fights are selected boss fixtures, not estimates of player win rates.

| Thematic case | Before linked / 4 | After linked / 4 | Before separated / 4 | After separated / 4 |
|---|---:|---:|---:|---:|
| Conjurer circle | 1 | 1 | 1 | 1 |
| Toxic craft | 1 | 1 | 1 | 1 |
| Prepared ambush | 1 | 1 | 1 | 1 |
| Volatile mixture | 1 | 1 | 1 | 1 |
| Arcane conduction | 1 | 1 | 1 | 1 |
| Ambusher poise | 0 | 1 | 0 | 0 |
| Sacred bulwark | 3 | 3 | 3 | 3 |
| Battle hymn | 1 | 1 | 1 | 1 |
| Restorative bond | 2 | 2 | 2 | 2 |
| Fencer discipline | 1 | 1 | 1 | 1 |
| Hexed hunt | 1 | 1 | 1 | 1 |
| Wild communion | 3 | 3 | 3 | 3 |

## Existing all-class comparison

The unchanged `benchmark-balance.cjs` fixture uses all nineteen classes, all 35 bosses and three support levels: 1,995 fights per version. Its historical upgrade/enchantment assumptions are preserved for comparison. It does not optimize layouts for the new rules.

| Class | Before wins / 105 | After wins / 105 |
|---|---:|---:|
| rogue | 82 | 80 |
| archer | 95 | 96 |
| wizard | 77 | 77 |
| priest | 92 | 91 |
| warrior | 86 | 86 |
| knight | 96 | 94 |
| paladin | 91 | 91 |
| assassin | 84 | 81 |
| necromancer | 85 | 84 |
| huntress | 93 | 93 |
| mystic | 83 | 82 |
| trickster | 80 | 78 |
| sorcerer | 68 | 68 |
| ninja | 80 | 80 |
| samurai | 85 | 85 |
| bard | 80 | 80 |
| summoner | 73 | 73 |
| kensei | 96 | 96 |
| druid | 96 | 96 |

Total: **1,622 → 1,611 wins**. The small overall reduction is consistent with reducing free block/mana while offering more specific placement benefits. No class or encounter tuning was changed.

## Direct mechanics checks

- A 0.5s weapon beside one armor generated 80 raw adjacency block over twenty seconds before this pass; it now generates 21, including its opening grant. A 5s source generates 8. Block decay, caps, Defense support and enemy damage are separate from these raw totals.
- Guard uses elapsed-time fractions rather than a hard minimum-interval gate: crossing just below a 2s weapon cooldown does not halve its guard frequency. Rapid manual calls at the same simulation time cannot create additional guard budget.
- A 3-HP heal with one +10% armor link generates 66 HP across twenty manual uses, before fatigue/other modifiers, rather than 60.
- Two abilities beside a 2-mana generator now produce 48 mana across twenty uses, before capacity losses, rather than doubling every cast to four mana.
- Wisdom/Conjurer support and Command share owner-based damage delivery correctly: the regression fixture's +35% support and +10% Command produce 297 damage across twenty 10-damage companion pulses, with no extra spawn power.
- The test reproduces Hollyhock Hide's temporary DEX and Harlequin Armor's temporary Wisdom, confirming the former no longer speeds abilities and the latter no longer increases armor block.
- The full catalogue's item-definition hash is unchanged. Existing signatures, footprints, acquisition and saved modifiers remain intact.

Responsive browser checks cover 240 catalogue/details views across desktop, short landscape and phone sizes with both text settings, plus a legal real-item cap example and live summary ownership. Existing hover checks cover 98 views; combat presentation checks preserve exact state/log parity and caching at 1×/2×/4×.

These checks do not establish equal value for every item or optimal pack. Cross-class costs, sustained healing, phase timing and hard caps can make a nominal bonus less useful in a particular run. Further player feedback should guide tuning rather than inflating the shared caps.

Reproduce with `node scripts/benchmark-adjacency.cjs --speeds 1,2,4 --output /path/to/results.json`; use `--root` for the previous checkout. The existing class comparison remains `node scripts/benchmark-balance.cjs`.
