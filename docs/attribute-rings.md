# Attribute rings — 0.30.14

All 57 tiered attribute rings retain their IDs, art, names, prices and saved item instances. UT/ST and Shiny special rings retain their curated identities.

| Attribute | Effect | T1 | T7 | Stacking limit |
| --- | --- | --- | --- | --- |
| Attack | Adjacent weapon primary damage | +8% | +20% | Strongest two; shares +35% primary cap with other adjacency bonuses |
| Defense | Block gained from adjacent items, including their primary/secondary effects and enchantments | +13% | +31% | Strongest two; +50% |
| Dexterity | On activation: grant adjacent items +25% recharge haste | 2.11s / 5.94s cycle | 2.77s / 5.58s cycle | Refreshes duration; does not stack with other temporary/class haste |
| Speed | Continuous cooldown reduction for adjacent items | 4% | 10% | Strongest two; 20%; combines multiplicatively with haste/recharge and tempering |
| Wisdom | Adjacent ability primary output; dodge abilities get recharge rate instead | +8% | +20% | Strongest two; shared +35% primary cap; rounded output |
| Vitality | Restore health on activation | 9 / 4.46s | 13 / 4.18s | Existing healing fatigue and maximum health limits |
| Health | Maximum health while packed | +12 | +36 | Total +100 from rings |
| Magic (mana) | Maximum mana while packed | +5 | +17 | Total +40 from rings, above base 50 |

T0 Minor Defense gives +10% block gain. Intermediate tiers progress consistently. Runeforge primary infusions improve passive ring strength within the same caps. Class/global block gains are not amplified by Defense rings; item-generated block is rounded after amplification. Wisdom affects the primary ability effect, not every secondary proc or class passive; dodge charges remain integers with unchanged quantity.

Only shared edges count. Stashed rings and diagonal rings provide no benefit. Each neighbor counts once even along a long edge. Tiered attribute rings no longer also grant the old generic Runic edge or Charmed supplies bonus. Special rings still use those rules when eligible.

Attack, Defense, Speed, Wisdom, Health and Magic provide continuous passive bonuses. Their existing Barrier, Siphon and Tactics enchantments retain activation cycles, shown in Full details; Quickening and tempering affect that cycle. Their passive bonus does not require activation, trigger an attack or generate mana. Battle-start enchantments continue to work. Existing modifiers and item IDs remain saved.

Maximum-health bonuses are tracked separately from permanent run health gains. Moving a ring or reloading a save cannot repeatedly add its bonus. Equipping Health/Magic rings does not restore HP/mana; removal clamps current resources to the new limits. Every mana source uses the same capacity, including natural regeneration, class passives, blessings, enchantments and signatures. This intentionally removes Magic rings' previous mana generation.

## Validation and balance limits

`game/tests/test-attribute-rings.cjs` tests all eight roles, all 57 definitions, actual damage/healing/block/cooldown results, strongest-neighbor selection, caps, links, stash/diagonal exclusion, infusion values, legacy enchantments and save/capacity transitions. The existing progression, local haste, consumable, class, event, stash and encounter tests remain applicable.

The unchanged `scripts/benchmark-balance.cjs` fixture compares 1,995 legal fights across 19 classes, 35 dungeon bosses and three loadout variants at depth 20. It always equips Ring of Magic alongside its existing fixed gear; it does not replace rings or optimize placement for the rework. Clears changed from 1,635 to 1,600. Wizard and Sorcerer each lost five clears out of 105; individual class results are in `attribute-rings-benchmark.json`. This indicates the expected cost of losing mana generation and the generic ring bonus. It is not a player win-rate estimate or evidence that all ring choices are equally strong. Mana capacity helps conserve generated resources, but mana-starved builds still need robes, regeneration or other mana sources.
