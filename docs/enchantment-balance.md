# Enchantment balance — 0.41.0

Two complementary comparisons were run against 0.40.0. These are fixed seeded fixtures, not estimates of player win rates or proof of optimal builds.

## Enchantment choices and playback speed

19 native classes; ten enchantment choices; four dungeon boss indices 0/9/19/34 at depth20 Normal. T7 native ability, native tiered weapon/armor at80% family max, extra native weapon, T3Magic ring, T6Attack ring placed for weapon adjacency, three Health Potions,+50baseHP,+8%relicrecharge,seed123456,.05s simulation steps at requested speeds. One rankIII modifier on the relevant item; no other enchants, infusions, partners or optimized layouts. Missing/ineligible modifiers in older builds remain unenchanted (applied=false). Fixed comparisons, not player win probabilities.

The previous build ran 760 fixtures at 1×. The new build ran the same 760 scenarios at each of 1×, 2× and 4× (2,280 fights). **All 760 scenarios had identical outcomes across the three new speeds**, including health, remaining enemy HP, duration and the tested item's activation count.

| Single rank-III modifier | Before wins / 76 | After wins / 76 |
|---|---:|---:|
| none | 45 | 46 |
| quickening | 46 | 45 |
| might | 47 | 49 |
| execution | 45 | 49 |
| siphon | 54 | 51 |
| spark | 47 | 48 |
| abilityPower | 44 | 47 |
| insight | 46 | 46 |
| armorPower | 45 | 46 |
| resonance | 45 | 46 |

`abilityPower` selects the native primary's matching modifier (Might, Restoration, Bulwark, Potency, Command, Focus or Quickening); `armorPower` similarly selects Bulwark, Quickening or Clarity. An older build without a modifier, or where it is ineligible, leaves that item unenchanted. These rows therefore also test newly available choices and are not comparisons of an identical modifier across versions. Resonance uses the Attack ring. The `none` difference isolates the timing changes in this fixture.

Might and Execution now reach the same win total here, while Siphon remains useful after its fast-item limit. Quickening does not win every timing-sensitive fight: earlier boss phase transitions and exact defensive/ability timing can change an individual outcome. This is not a universal ranking. Insight's benefits are tested directly through mana transactions; this small fixture's win count is insensitive to many resource changes.

## Existing class fixture

`benchmark-balance.cjs` retains its existing 19-class, 35-boss, three-support-level assumptions: 1,995 fights per build. Some assigned Quickening modifiers on passive rings are legacy-compatible saved rolls, not a claim about the new generation pool. No item, class or encounter definition changes were made. Fixed timing and effective enchantment fractions affect combat results.

| Class | Before wins / 105 | After wins / 105 |
|---|---:|---:|
| rogue | 81 | 82 |
| archer | 94 | 95 |
| wizard | 73 | 77 |
| priest | 90 | 92 |
| warrior | 85 | 86 |
| knight | 94 | 96 |
| paladin | 89 | 91 |
| assassin | 83 | 84 |
| necromancer | 84 | 85 |
| huntress | 94 | 93 |
| mystic | 82 | 83 |
| trickster | 79 | 80 |
| sorcerer | 66 | 68 |
| ninja | 80 | 80 |
| samurai | 85 | 85 |
| bard | 79 | 80 |
| summoner | 71 | 73 |
| kensei | 95 | 96 |
| druid | 96 | 96 |

Total: **1,600 → 1,622 wins**. The small overall gain is consistent with recovering lost recharge/output. A one-fixture loss is not by itself evidence that a class should be retuned.

## Direct checks and limits

- A 0.5s weapon attacks 40 / 41 / 42 / 43 times over twenty seconds with no Quickening / I / II / III, identically at 1×, 2× and 4×. Previously all four cases attacked 40 times at 1× and 33 times at 4×.
- Restoration I adds three HP over twenty 3-HP primary uses before other modifiers. Previewing does not spend credit.
- Siphon III yields 30 HP on the 0.5s source versus 12 HP on the 5s source over twenty seconds, without class effects or fatigue. Previously 120 versus 12.
- Ten successful two-mana casts refund 2 / 3 / 4 mana with new Insight I / II / III. Existing gear refunds share a 20% ceiling. Legacy flat Insight values retain their saved behavior.
- The tests generate four eligible, category-distinct slots for all 2,053 obtainable equipment definitions (8,212 slots), and verify locked passive-ring Quickening receives an activation source.
- Source-owned companion damage, charged bursts/counters, positive ring stats, shared caps, ward ordering, consumable readiness, blocked mana, save round-trips and per-frame HUD batching have targeted regression tests.

The maximum-upgrade dungeon fixture now uses category-distinct modifier sets rather than combining mutually exclusive Might/Quickening or duplicate guard categories. At least one tested legal build still clears each of its five representative dungeons, including the Shatters and Sanctuary. This ceiling fixture is not a typical acquisition budget.

Enchanter browser checks cover 24 layouts (six viewports, two text settings, current/pending) plus paid preview reload, accept, lock and keep interactions. Live mixed-ability 4× combat stays within summon/field limits and has no page scroll or JavaScript errors. The HUD is batched once per timer callback even though accelerated combat uses several simulation steps.

The fixtures do not simulate full-run item replacement, lucky perfect rolls, every UT/ST partner combination or optimal layouts. Rare modifier availability and the revised dust prices still warrant player feedback. Existing saves are preserved rather than force-rerolled.

Reproduce with `node scripts/benchmark-enchantments.cjs --speeds 1,2,4 --output /path/to/results.json`; use `--root` for a previous checkout. Per-case and class totals are in `enchantment-benchmark.json`.
