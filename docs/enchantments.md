# Enchantments — 0.41.0

For the current class ability loops, see [Class identities — 0.43.0](class-identities.md). Earlier class descriptions and comparison tables below describe their named historical release.

Fixed slot capacity, dust, locking and paid keep/replace previews remain. The rework corrects timing, fractional effects, role coverage and prices. Item definitions, class recipes, encounter tuning, IDs, art and footprints are unchanged.

## Timing and fractional output

Combat runs simulation steps of at most 0.05s at every playback speed. Recharge overflow is retained after successful repeating-item activations. A ready item waiting for mana or its activation condition cannot bank missed casts; consumable copies restart their own cooldown. Haste stays local under the existing rules. The HUD updates once per timer callback, including accelerated playback, rather than rendering every simulation substep. The 0.41.1 follow-up also keeps HUD reads inside the validated placement cache.

Small percentage enchantments accumulate their marginal bonus into whole extra points instead of repeatedly rounding it away. For example, Restoration I on a 3-HP primary contributes three additional HP over twenty successful uses before other healing modifiers. Inspection does not spend fractional credit. Credits and proc intervals reset at battle start; they do not change item slots or saved enchantment values. Existing Wisdom carry and shared adjacency limits still apply.

## Slot capacity and economy

Normal capacity: Uncommon 1 (60%), Rare 2 (28%), Legendary 3 (10%), Divine 4 (2%). Shiny has at least two slots. Capacity is stable; no reload or combat RNG reroll. Gear starts unattuned. Saved capacity and modifiers remain intact.

Each Enchanter visit services one item. Every unlocked slot is rerolled together; locked modifiers stay. The fee is spent when generating a preview, whether accepted or rejected. All-locked and insufficient-dust actions spend nothing and consume no RNG. Paid old gold previews remain resolvable.

| Slots | No locks | 1 lock | 2 locks | 3 locks |
|---|---:|---:|---:|---:|
| 1 | 8 | — | — | — |
| 2 | 12 | 16 | — | — |
| 3 | 16 | 20 | 24 | — |
| 4 | 20 | 24 | 28 | 32 |

A lock adds **4 dust**, replacing exponential doubling. The three-act standard combat route supplies 150 green / 97 red / 75 purple including starting dust; alternative paths may reduce combat rewards. The final boss's reward is included in those totals and cannot be spent at an earlier Enchanter.

Runs start with 24 green / 16 red / 12 purple. A final room victory grants 6 green, 3+act red, 2+act purple. Elite bonus 2/1/1; boss bonus 4/2/2. Intermediate waves grant no dust. Colors stay unchanged: tiered weapon thresholds T8/T12, armor T9/T13, abilities/rings T4/T6; non-tiered equipment uses its existing quality-based red/purple assignment.

## Modifier values

Values below are for **new rolls**. Percentages modify the named primary or positive stats, not every secondary signature, projectile, charge meter or class proc. Existing caps continue to apply.

| Modifier | I / II / III | Effect |
|---|---|---|
| Might | 4 / 7 / 10% | Primary damage/drain |
| Restoration | 5 / 8 / 12% | Primary healing |
| Bulwark | 5 / 9 / 13% | Primary block |
| Quickening | 3 / 5 / 7% | Shorter active-item cooldown |
| Command | 4 / 7 / 10% | Source-owned companion direct damage, including charged bursts, explosions and counters; not extra companions, healing, status or meter gain |
| Potency | 5 / 8 / 12% | Primary poison, bleed or burn strength |
| Focus | 5 / 8 / 12% | Primary haste, chill, weaken or vulnerable duration; cannot add dodge charges |
| Clarity | 5 / 8 / 12% | Primary mana generation |
| Resonance | 4 / 7 / 10% | Positive passive ring stats; never strengthens penalties, innate procs or permanent upgrades |
| Insight | 10 / 15 / 20% | Base mana refund accumulated after successful casts; pay upfront first; off-class surcharge excluded; shares the existing 20% equipment-refund limit |
| Barrier | 1 / 2 / 3 | Block per activation, at most once per 2s per item |
| Siphon | 1 / 2 / 3 | Healing per activation, at most once per 2s per item; healing fatigue/suppression still apply |
| Spark | 1 / 2 / 3 | Extra damage per activation, at most once per 2s per item |
| Ash | 1 / 2 / 3 | Burn every third activation, at most once per 2s per item |
| Venom | 1 / 2 / 3 | Poison every third activation, at most once per 2s per item |
| Shattering | 2 / 4 / 6 | Remove ward **before** the primary attack, at most once per 2s per item |
| Execution | 30 / 45 / 60% | Additional primary damage when the enemy starts the activation below 25% HP |
| Thorns | 1 / 2 / 3 | Thorns at battle start, within the shared cap |
| Reservoir | 1 / 2 / 3 | Mana at battle start |
| Warding | 4 / 7 / 10 | Block at battle start |
| Tactics | 10 / 15 / 20% | Advance an adjacent ability on first activation |

Fast items retain more frequent opportunities, but a 0.5s item no longer gets ten times the Siphon output of a 5s item: the controlled twenty-second example is now 30 versus 12 HP, before other modifiers. Intervals belong to the item and modifier, never individual projectiles. Companion damage shares fractional credit at its source; companion and wave limits are unchanged.

## Eligible rolls and previews

New passive-ring rolls exclude Quickening. They can receive Resonance if they have positive passive stats. New role modifiers appear only on their matching primary effects. A locked legacy Quickening roll on a passive ring requires the next unlocked roll to supply Barrier, Siphon or Tactics if the existing retained modifiers do not provide a cycle. An already fully locked legacy item is not silently rewritten. Item inspection explains a dormant legacy Quickening roll.

Ranks remain 70% / 25% / 5%. Weights remain 10 normally, 7 for Spark/Ash/Venom, 4 for Execution/Tactics/Shattering. One type and one category per new slot set: tempo includes primary power/Quickening/Execution/Command/Potency/Focus/Resonance; mana includes Insight/Reservoir/Clarity; sustain includes Restoration/Siphon; guard includes Bulwark/Barrier/Warding; proc includes Spark/Ash/Venom/Shattering; retaliation Thorns; tactics Tactics. Legacy locked conflicts remain readable.

The Enchanter shows exact rolled amounts, interval/condition labels, upfront cost, and relevant before/after base cycle, primary percentage, refund, companion or passive-stat changes. These base comparisons exclude placement, temporary effects and other item signatures; shared caps and minimum recovery may constrain the final combat result. No compatibility panel, pager or extra scrolling is added.

## Save compatibility

Existing enchantment objects, capacity, locks, dust, pending previews and individual values remain unchanged. Legacy Insight with a stored value of 1 or 2 retains its old flat reduction, minimum one base mana; new fractional values use refunds. Legacy Execution keeps its stored percentage. New timing, fractional-output handling and per-item proc intervals apply to existing gear too. Clones preserve enchantments/capacity but do not copy active combat credit.

## Validation

See [enchantment balance](enchantment-balance.md). Tests cover transactions and migration; successful-cast fractional credit, all speeds, blocked readiness, consumable copies, all-role eligibility/category exclusions, 8,212 generated slots across obtainable equipment, companion ownership, per-item intervals, Insight ranks/shared refunds, Shattering order, Execution gates, additive prices, passive ring scaling, save round-trips and HUD batching. Browser checks cover Enchanter previews/locks/reloads across six viewport sizes and both text modes, plus live 4× combat. Fixed fixtures are balance checks, not player win-rate estimates.

## Mana economy — 0.45.0

Each battle now resets mana to 10 plus 1 per 5 capacity above 50, capped at 10 additional reserve. Opening Magic-ring, Reservoir and event grants then apply with the normal capacity limit. Mana-capacity consumables apply before the reserve is calculated. Existing enchantments and paid previews remain unchanged. Passive regeneration is 0.5 mana/second; item generation is unchanged. Insight still uses actual modified costs and its existing shared refund cap. See `mana-economy.md` for controlled resource and encounter comparisons.
