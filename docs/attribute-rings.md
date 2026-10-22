# Attribute rings — 0.30.16

All 57 tiered attribute rings retain their IDs, art, names, prices and saved item instances. UT/ST and Shiny special rings retain their curated identities.

| Attribute | Effect | T1 | T7 | Stacking limit |
| --- | --- | --- | --- | --- |
| Attack | Adjacent weapon primary damage | +8% | +20% | Strongest two; shares +35% primary cap with other adjacency bonuses |
| Defense | Block gained from adjacent items, including their primary/secondary effects and enchantments | +13% | +31% | Strongest two; +50% |
| Dexterity | On activation: grant adjacent items +25% recharge haste | 2.11s / 5.94s cycle | 2.77s / 5.58s cycle | Refreshes duration; does not stack with other temporary/class haste |
| Speed | Continuous cooldown reduction for adjacent items | 4% | 10% | Strongest two; 20%; combines multiplicatively with haste/recharge and tempering |
| Wisdom | Adjacent ability primary output; dodge abilities get recharge rate instead | +8% | +20% | Strongest two; shared +35% primary cap; fractional Wisdom output carries between activations |
| Vitality | Restore health on activation | 9 / 4.46s | 13 / 4.18s | Existing healing fatigue and maximum health limits |
| Health | Maximum health while packed, plus once-per-battle starting restoration | +12 capacity / restore 12 | +36 capacity / restore 36 | Total +100 capacity and starting restoration; cannot exceed max HP |
| Magic (mana) | Maximum mana while packed, plus battle-start mana | +5 capacity / +1 start | +17 capacity / +3 start | Total +40 capacity above base 50; total +6 battle-start mana |

T0 Minor Defense gives +10% block gain. Intermediate tiers progress consistently. Runeforge primary infusions improve passive ring strength within the same caps. Class/global block gains are not amplified by Defense rings; item-generated block is rounded after amplification. Wisdom affects the primary ability effect, not every secondary proc or class passive; dodge charges remain integers with unchanged quantity.

Only shared edges count. Stashed rings and diagonal rings provide no benefit. Each neighbor counts once even along a long edge. Tiered attribute rings no longer also grant the old generic Runic edge or Charmed supplies bonus. Special rings still use those rules when eligible.

Attack, Defense, Speed, Wisdom, Health and Magic provide continuous passive bonuses. Their existing Barrier, Siphon and Tactics enchantments retain activation cycles, shown in Full details; Quickening and tempering affect that cycle. Their passive bonus does not require activation, trigger an attack or generate mana. Battle-start enchantments continue to work. Existing modifiers and item IDs remain saved.

Maximum-health bonuses are tracked separately from permanent run health gains. Moving a ring or reloading a save cannot repeatedly add its bonus. Equipping Health/Magic rings does not restore HP/mana; removal clamps current resources to the new limits. Every mana source uses the same capacity, including natural regeneration, class passives, blessings, enchantments and signatures. Magic rings grant 1 mana at battle start at T1–2, 2 at T3–5 and 3 at T6–7, with a total cap of 6 from packed rings. This is separate from natural regeneration and does not repeat on later waves. The tier-based start bonus is unaffected by infusion. Equipping a ring during preparation does not grant mana.

## Validation and balance limits

`game/tests/test-attribute-rings.cjs` tests all eight roles, all 57 definitions, actual damage/healing/block/cooldown results, strongest-neighbor selection, caps, links, stash/diagonal exclusion, infusion values, legacy enchantments and save/capacity transitions. The existing progression, local haste, consumable, class, event, stash and encounter tests remain applicable.

For the historical 0.30.13 → 0.30.14 comparison, the unchanged `scripts/benchmark-balance.cjs` fixture compared 1,995 legal fights across 19 classes, 35 dungeon bosses and three loadout variants at depth 20. It always equips Ring of Magic alongside its existing fixed gear; it does not replace rings or optimize placement for the rework. Clears changed from 1,635 to 1,600 in that earlier rework. Wizard and Sorcerer each lost five clears out of 105; individual class results are in `attribute-rings-benchmark.json`. This indicates the expected cost of losing mana generation and the generic ring bonus. This historical 0.30.13 → 0.30.14 comparison is not a player win-rate estimate or evidence that all ring choices are equally strong. Mana capacity helps conserve generated resources, but mana-starved builds still need robes, regeneration or other mana sources.

## Fractional Wisdom output

Only Wisdom's marginal primary-output contribution is accumulated. Other modifiers keep their existing rounding. Each ability stores its own fractional remainder; previews and failed activations do not change it. Whole extra points are awarded on successful activations, then pass through normal resource caps, healing fatigue and other combat rules. Bonuses consumed while at full HP/mana are not banked as healing or mana for later.

For a 2-mana primary effect and +20% Wisdom, five successful activations generate 2, 2, 3, 2, 3 mana before resource caps, totaling 12 rather than 10. This removes both upward and downward rounding bias from Wisdom itself; high-output abilities that previously rounded up on every use can lose that rounding advantage. Carry survives waves within a battle and resets at the next battle. Dodge abilities continue to receive recharge rate instead of fractional dodge charges.

## Controlled archetype comparison

`scripts/benchmark-attribute-rings.cjs` uses identical gear for every ring choice within a class/tier/dungeon combination. It tests all eight archetypes and an empty-slot baseline across 19 classes, 35 bosses and three tiers: 17,955 fights per revision. Rings are unenchanted and uninfused; other gear retains the documented fixed upgrades. Placement maximizes eligible neighbors and then native targets without consulting combat outcomes. Gear is never rearranged between ring choices. This is a reproducible heuristic placement, not an exhaustive optimization of the full inventory.

The builds begin with full base HP and five mana before ring effects. Health rings add maximum HP without free healing. The secondary off-class Healing Tome is retained consistently for comparison; this is a benchmark fixture, not current starter equipment. Mana pressure, mana saturation and whether HP ever exceeds the unboosted maximum are recorded. No stacking combinations, other depths or different starting resources are tested. See `attribute-rings-comparison.json` for complete aggregate results.

### Results: 0.30.14 → 0.30.15

Each cell below counts clears out of 1,995 fights.

| Ring | Before clears | After clears |
| --- | ---: | ---: |
| None | 1591 | 1591 |
| Attack | 1604 | 1604 |
| Defense | 1611 | 1611 |
| Dexterity | 1625 | 1625 |
| Speed | 1627 | 1627 |
| Wisdom | 1607 | 1607 |
| Vitality | 1678 | 1678 |
| Health | 1592 | 1592 |
| Magic | 1591 | 1591 |

Magic reduced total time below the native ability’s mana cost from 316.05 to 108.70 seconds across its 1,995 fights (65.61% less), while its mean peak mana rose from 16.52 to 18.52. Its clear count did not change. Wisdom stayed at 1,607 total clears; Samurai gained one and Sorcerer lost one, consistent with removing both positive and negative rounding bias. The no-ring control and the six unmodified archetypes have identical before/after aggregates by class and tier.

Vitality gives the largest clear-count improvement in this fixture (+87 over no ring). Health improves only one clear despite reaching HP above the unboosted maximum in 638 fights. These results suggest testing a separate once-per-battle starting-health benefit for Health rings next, while preserving the no-free-healing-on-equip rule. They do not justify an immediate universal Vitality nerf: every fixture starts with full base HP, uses an off-class healing tome and omits other builds and stacking combinations.

## Health and Vitality follow-up — 0.30.16

Health rings now restore their capped maximum-HP bonus once at battle start, before combat begins. The restoration is up to maximum HP, cannot charge healing class passives, and does not repeat on later waves. Moving or equipping rings does not heal. T1 gives 12 HP upfront and T7 gives 36; infusion affects both the maximum-HP bonus and the starting restoration, with a combined cap of 100 from rings. The grant may also restore existing wounds; it is not limited to the added capacity. Removal still lowers maximum HP and clamps current HP.

Vitality's values, cadence and fatigue behavior are unchanged. With no other bonuses, Vitality's second T1 activation exceeds Health's 12 upfront HP at 8.92 seconds, and its third T7 activation exceeds 36 HP at 12.54 seconds. These are nominal comparisons before fatigue, adjacency, enchantments and overhealing.

The follow-up uses the same fixture with `node scripts/benchmark-attribute-rings.cjs --attributes none,health,vitality --output /tmp/health-comparison.json`: 1,995 fights for each of the three choices, or 5,985 total. The prior 0.30.15 data supplies the before baseline; all gear, upgrades, positions, placement scoring, enemies and starting resources are kept identical. This tests only these fixed builds at depth 20, not every loadout or ring combination. Results are in `health-vitality-comparison.json`.

### Health follow-up results

| Choice | 0.30.15 clears | 0.30.16 clears | Change |
| --- | ---: | ---: | ---: |
| No ring | 1,591 | 1,591 | 0 |
| Health | 1,592 | 1,630 | +38 |
| Vitality | 1,678 | 1,678 | 0 |

Each count is out of 1,995 fights. The Health/Vitality gap narrowed from 86 to 48 clears. Health reached HP above the unboosted maximum in all 1,995 fights because its added capacity starts filled. No-ring and Vitality aggregates are identical before and after by class and tier. Vitality still clears more with 15 classes, ties with three and clears fewer with Druid. Across T1/T4/T7, Health clears 512/552/566 and Vitality clears 535/566/577, each out of 665 fights.

Health is substantially more useful in this fixture, but these results do not establish equal strength or prove the same ordering in other builds. Vitality remains unchanged in this release. A future Vitality tuning test should include short and long fights, different starting wounds and stacking loadouts before reducing its healing globally.
