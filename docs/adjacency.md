# Adjacency — 0.42.0

For the current class ability loops, see [Class identities — 0.43.0](class-identities.md). Earlier class descriptions and comparison tables below describe their named historical release.

Shared edges still define adjacency. Diagonals, empty gaps and the stash do not count. Each distinct neighbor counts once **per matching rule**, regardless of shared-edge length or stack size. A well-matched item can provide different bonuses through different rules. The strongest two eligible sources per rule count, with stable item-ID tie breaks; reordering the inventory array cannot change which equal-valued sources qualify.

All item definitions, IDs, art, footprints, class recipes, encounter tuning, saved enchantments and ST membership remain unchanged. This pass changes placement effects and feedback.

## Limits and recipient rules

- Primary output and companion direct damage share **+35% positive adjacency support**. Existing output penalties remain separate and visible.
- Continuous cooldown reduction keeps its **20%** cap; item-sourced block gain keeps its **+50%** cap. Local haste retains its own non-stacking behavior, duration cap and edge restrictions. These are separate effects: 20% is not a cap on every combined source of recharge.
- Temporary armor DEX increases adjacent **weapon** recharge only. Temporary Wisdom increases **ability** primary output/companion damage or dodge recharge; it cannot increase armor block or ordinary ring healing.
- Small primary adjacency bonuses accumulate into whole extra points. The existing `wisdomCarry` save field is retained as the primary-adjacency carry. Inspection and previews do not consume it. There is no per-projectile or per-enemy multiplication.
- Summon support is applied at owned-companion damage delivery rather than rounding/spending it at spawn. Wisdom and Conjurer's Circle share the 35% cap; Command then applies its separate enchantment multiplier. Ordinary attacks, charged companion bursts, explosions and counterattacks use the same source-owned budget. Summon counts, lifetimes and secondary status budgets do not increase.
- Restorative Bond increases actual source-owned companion healing, capped at +20%. Fractions carry at the owner. Overhealing and suppressed healing do not generate fake health or meter charge; existing healing fatigue and resource rules still apply.
- Passive rings without an activation-cycle enchantment do not show a Speed connection. Adding an eligible cycle enables that connection; geometry/link caches account for the change. Passive positive stats and innate fixed proc timers do not become active cooldown cycles.

## Rebalanced generic links

| Link | Current behavior |
|---|---|
| Guarded strike | Up to 2 block per adjacent armor, strongest two. One opening grant, then a fractional **2s recharge budget per weapon**; at most one grant per use. A fast weapon cannot multiply the full flat block on every attack. Unused time beyond one full per-use grant is not banked. |
| Battle casting | +10% primary damage per adjacent weapon to damage/drain abilities. |
| Arcane circuit | +8% ability recharge per adjacent mana generator. |
| Layered guard | +10% primary block per adjacent armor. |
| Sheltered recovery | +10% primary healing per adjacent armor. |
| Mana reservoir | +10% primary mana per adjacent ability, replacing whole extra mana. Two sources add 20%, not 100%, to a 2-mana generator. |
| Affliction pairing | +8% primary affliction per same-affliction neighbor, replacing whole extra stacks. |
| Protected supplies | 2 block per adjacent armor when using an eligible supply, strongest two. Consumable readiness and per-copy rules are preserved. |

Runic Edge and Charmed Supplies are retired: their old generic-ring source predicates no longer matched any obtainable ring after the ring identity pass. Saved items remain readable; obsolete blanket auras are not restored.

Attack, Defense, Wisdom and Speed ring support, offensive equipment, weapon tempo, battle-robe penalties, bow/quiver support and item-specific/set interactions retain their roles and existing limits. Generic link names refer to the supported role; UT/ST armor and ability equipment can also supply some of those stats.

## Twelve new thematic links

Every rule has an obtainable source/target pair covered by the tests. Primary bonuses in this table use the shared +35% budget and the strongest two sources per rule.

| Link | Source → recipient | Bonus per neighbor |
|---|---|---:|
| Conjurer's circle | Wand/staff → summon ability | +10% companion direct damage |
| Toxic craft | Dagger → poison | +8% primary poison effect |
| Prepared ambush | Bow → trap | +8% primary trap effect |
| Volatile mixture | Different burn/poison/bleed primary → affliction item | +6% primary affliction |
| Arcane conduction | Robe → spell/scepter | +5% primary output |
| Ambusher's poise | Cloak/prism → dagger/katana | +5% primary damage |
| Sacred bulwark | Healing tome/seal → block-generating armor | +6% primary block |
| Battle hymn | Lute → helm/shield/seal | +6% primary output |
| Restorative bond | Healing tome/seal or Vitality support → healing summon | +10% companion healing, separate +20% cap |
| Fencer's discipline | Katana → wakizashi/sheath/star | +5% primary output |
| Wild communion | Leather armor → sigil | +6% primary output |
| Hexed hunt | Orb → poison/trap/wakizashi | +6% primary output |

A rule affects the named primary or owned companion output, not every secondary signature, charge meter, passive stat, enchantment or class trigger. Restorative Bond is available only when the summon really heals. Focused hybrids are possible, but source equipment still consumes space, pays its own costs and takes any off-class penalty.

## Inspection and performance

The compact inspector shows **received** support, the applied cap, and the amount exceeding it. For example, 47.2% offered primary support displays +35%, with 12.2% capped. Offered values remain labeled as offers on individual links; the cap is shared across those offers. Stashed items explicitly show inactive adjacency.

A short thematic hint replaces the old full rule dump. Full details keeps possible combinations in a collapsed section; no extra rule pages or scrolling are added to the normal hover inspector. Open item details updates its own item's live summary even if a different item is selected. Existing layout, link, hover and batched-HUD caches are preserved; no graph rebuild is added per frame.

Guard fractions, companion fractions and primary carry reset at battle start, not between waves. Existing item, slot, enchantment, stash and run-state formats remain readable. No new random combat rolls are introduced.

## Validation

See [adjacency balance](adjacency-balance.md) and `adjacency-benchmark.json`. Tests protect the full item-definition hash and cover all twelve obtainable thematic pairs, geometry and stacks, fractional output, mana and guard budgets, owned companions and shared caps, DEX/Wisdom recipient restrictions, active passive-ring cycles, inspection, resets and saved state. Browser checks cover responsive details/catalogue layouts, live capped summaries, stationary hover and combat presentation parity.

### Enlightenment weapon haste (0.53.6)

Star of Enlightenment, its Shiny copy and Eternal Star grant the existing +25% item haste for 2s to edge-adjacent weapons only. No self, ability, diagonal or stash recipients. Effects refresh rather than adding speed or duration. Link arrows filter to the same recipients. Player trade-off penalties from Mirror/Grotesque/NSF affect the wearer as stated; they are not adjacency auras.

Validation: the preserved seeded adjacency fixture has 516 identical before/after rows across 1×/2×/4×. Focused tests verify Enlightenment's edge-only weapon recipients and matching link arrows, excluding abilities, diagonals and stash.
