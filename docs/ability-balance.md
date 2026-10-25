# Ability balance fixtures — 0.40.0

410 non-Shiny actual UT/ST abilities plus T0/T7 references; one native class per kind. Four bosses at dungeon indices 0/9/19/34; depth20 Normal, native tiered weapon/armor at60%/90% family max, extra native weapon, T3/T6 Magic ring,3Health Potions,+50baseHP,full equippedHP,+8%relicrecharge,seed123456,.05s ticks. No enchants/infusions/special partners or optimized layouts; charge starts empty. Comparative fixtures, not player win probabilities.

**3,592 fights per build (7,184 paired simulations): 1,870 wins before, 1,858 after.** These are fixed comparisons, not estimates of player win rates. There are 410 actual non-Shiny UT/ST abilities and 39 T0/T7 references (including the existing extra trap reference). Each gets eight fights. Internal helpers are excluded, and Shiny variants inherit the verified base recipe with their small existing upgrade policy.

All **1,995 tiered-class fixture rows across 19 classes are exactly identical** before and after this pass, as are all 312 T0/T7 ability-reference fights. No class, encounter or tiered definition tuning was needed.

| Kind | Special items | Before wins | After wins | Fights per build |
|---|---:|---:|---:|---:|
| cloak | 18 | 88 | 78 | 144 |
| helm | 22 | 89 | 98 | 176 |
| lute | 20 | 80 | 80 | 160 |
| mace | 21 | 42 | 37 | 168 |
| orb | 24 | 48 | 56 | 192 |
| poison | 22 | 110 | 112 | 176 |
| prism | 21 | 42 | 43 | 168 |
| quiver | 27 | 162 | 162 | 216 |
| scepter | 21 | 42 | 42 | 168 |
| seal | 18 | 108 | 108 | 144 |
| sheath | 17 | 102 | 102 | 136 |
| shield | 23 | 137 | 137 | 184 |
| shuriken | 29 | 87 | 100 | 232 |
| sigil | 15 | 90 | 90 | 120 |
| skull | 24 | 115 | 110 | 192 |
| spell | 25 | 75 | 60 | 200 |
| tome | 24 | 91 | 81 | 192 |
| trap | 21 | 126 | 125 | 168 |
| wakizashi | 18 | 72 | 73 | 144 |

The overall result stays close to the previous build. Damage-centric spells, cloaks and tomes give up some fixture strength when their source identity trades raw output for utility or slower bursts. Helms, stars and orbs gain from more specific support and control. No special item changes by four or more wins in its eight paired fights. This supports the absence of a large blanket power jump; it does not prove every item or optimized combination has equal value.

Do not rank kinds against each other from this table: they use different native classes and legal gear. It is only a before/after comparison within the same fixture. Many spatial or multi-enemy benefits cannot be measured in a single-enemy pack game. Positional synergy, rare partner conditions, long-lived charge across a run, Shiny stacking and optimal layouts need player testing beyond these fixtures.

Validation also includes all 559 variants in combat/inspection tests; 31 regression suites; syntax checks; 2,248 desktop/phone views covering all ability details/catalogue entries and offer layouts; and live 4× mixed ability combat with charge, counters, healing, companion limits and no page scroll. Small follow-up penalty fixes were re-run on the affected six item profiles (48 fights) and merged into the final comparison.

Full per-item totals: `ability-benchmark-results.json`. Reproduce with `node scripts/benchmark-abilities.cjs --output /path/to/results.json`; use `--root` for the previous checkout and `--ids` for a comma-separated list of changed item IDs. The class fixture remains `node scripts/benchmark-balance.cjs`.
