# Progression balance — 0.53.7 / Phaser 0.5.10

Baseline: `b62f297d581d28597cac8dd70863df23da1580a0` (Phaser 0.5.9). Date: 3 November 2026. Run mode: **Adventurer**. Source tables and engine are shared by Phaser and classic.

## Reproducible fixtures

`scripts/benchmark-balance.cjs` retains its original `nativeRun` defaults: all 19 classes; three native tiered equipment ranks; two native weapons, native ability and armor, starter Magic ring, three Health Potions and an extra Healing Tome. Weapon/armor ranks are 60%/70%/80% of family maximum; abilities 67%/83%/100%. +60 base HP, +4 relic power, +12% relic recharge, +10% equipment recharge, eligible +15% infusions and 5% Quickening. Automatic placement must fit every item; no hidden stash overflow. Seed 123456, 0.05s ticks, 150s ceiling. These are generous, legal fixed loadouts, not average loot outcomes.

The script now exports its VM fixture without running the CLI benchmark when imported. Its default CLI cases and assumptions are unchanged. `benchmark-progression.cjs` reuses that same function for late bosses at tier × 8 depth, supports optional removal of the extra Healing Tome, and records comparison controls. Example commands:

```sh
node scripts/benchmark-balance.cjs --output /tmp/native.json
node scripts/benchmark-progression.cjs --output /tmp/late.json
node scripts/benchmark-progression.cjs --variants 2 --without-tome --output /tmp/no-tome.json
node scripts/benchmark-progression.cjs --variants 2 --depth 40 --output /tmp/matched.json
```

Use `--root` with a baseline checkout containing the exported fixture to compare engines while preserving loadouts. `--disable-class-guards` isolates the new wards. `--candidate hp,damage,cycle` and `--candidate-tiers 4,5` are optional calibration controls; candidate results are not release results.

## Results

| Late boss fixture | Before | After |
| --- | ---: | ---: |
| Exaltation, depth 32, all three ranks | 22/399 (5.5%) | 188/399 (47.1%) |
| Apex, depth 40, all three ranks | 0/114 | 28/114 (24.6%) |
| Exaltation, highest rank without extra Tome | 6/133 (4.5%) | 54/133 (40.6%) |
| Apex, highest rank without extra Tome | 0/38 | 9/38 (23.7%) |

At a matched depth of 40, the highest-rank fixture wins 42/133 Exaltation fights (31.6%) and 11/38 Apex fights (28.9%): Apex remains harder in this aggregate, not necessarily in every matchup. Across all 35 bosses at fixed depth 20, the original 1,995-case fixture changes from 1,690 wins to 1,906. That generous mid-depth fixture is not a late-run or player-completion estimate.

A supplemental fresh-fight check of the two highest raw-pressure ordinary encounters per late dungeon and its elite encounters, using highest-rank tiered builds without the extra Tome, gives: Exaltation ordinary 266/266, elite 119/133; Apex ordinary 41/76, elite 8/38. They occur at depths 31/39. This samples dangerous rooms; it does not simulate accumulated health loss or every route.

Sorcerer and Summoner retain their existing loops and gain late native wards with a shared 3s gate. An isolated ward-on/off comparison across those two classes improves Exaltation results from 4/42 to 6/42; Apex remains 0/12 in that particular two-class fixture. Class differences remain, and UT/ST-specific optimization is outside this test. The all-class before/after summaries are stored in `progression-balance-results.json`.

## Opening, progression and save safeguards

`test-progression-balance.cjs` fingerprints 1,200 Beginner/Standard room-stat combinations over depths 1–8 against the baseline. HP, damage, cadence, waves and gold are unchanged. It checks early curve equality, the gentler late segment, resumed endless growth, boss-only scaling, 456 stage/class upgrade samples, specialist identity, source spotlight, unchanged resources, no first-dungeon offer/RNG changes, failed-cast/stash rejection and shared ward gates. The existing dungeon tests cover all tiers/modes, difficulty ordering, route/branch migration and unchanged history/RNG.

Upgrade offers are tier improvements over owned ordinary items within the stage band, not a claim that a tiered item beats every UT/ST. They preserve the first dungeon-themed drop slot, four boss choices and one chosen loot item. Shops retain their specialty, stock count, prices and once-only refresh. Existing saved offers are not rerolled.

Before/after seeded enchantment comparisons each cover 2,280 battles across 1×/2×/4×. Both have zero speed-normalized mismatches. Total fixture wins change from 1,647 to 1,740 as encounter pressure and the two wards change; enchantment values, caps, categories, prices and proc rules are unchanged.

Source and packaged browser checks exercise later boss choices and specialist purchases at desktop, phone and short-landscape sizes, including actual item receipt, prices and preserved pending supplies. The Phaser model checks all 19 classes, shared collision/stack rules, campaign progression and speed parity.

## Limits

These results support a smoother curve and viable tiered alternatives. They are not actual player win rates, five-dungeon completion rates, or proof that all classes and rare builds are equally strong. Real runs include variable loot, routes, resources, infusions and synergies. The new offer opportunities are tested for validity and usability, not credited as hypothetical extra power in these fixed-loadout results.
