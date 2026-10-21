# The Dagger Update — 0.22.2

**0.22.2 follow-up:** Chain Dagger now builds bleed to a maximum of 6 stacks (Shiny 8), retaining its 10 base damage and 2-stack application. Higher bleed from other sources is left untouched, including its expiry timer.

**0.22.1 follow-up:** Evergreen now has a 0.8s minimum cooldown (Shiny 0.72s), and Toxic Toad applies 6 poison every 2s with no direct damage. Existing ramp steps, starting cooldowns and poison limits are preserved.

Implemented all **55 requested entries** from the supplied “The Dagger Update.md”. Fifty named recipes are explicitly tuned, ten matching Shiny definitions inherit upgraded versions, four named items are temporarily unobtainable, and one duplicate Poison Fang definition is removed from new acquisition and catalogue results. Original IDs remain defined for save compatibility.

The authoritative override is `game/dagger-update.js`, loaded after the general family and researched UT/ST layers. Tiered gear outside the listed reference matches remains unchanged.

## Interpretations

- “100% slower” and “2× slower” mean double the base cooldown. Blade of Fates therefore uses 24 damage / 2.46s after rounding 13 × 1.85; Boomerang/Hatchling use 26 / 2.46s.
- Archangel's Judgement fires 3 × 4 damage; Bounty Hunter's Dagger fires 3 × 2. Fractal fires two full-damage 13-point shots, each with an independent 50% miss chance. Other crossing-cut descriptions retain their previous shared-total behavior: Corruption Cutter is six total damage split across two cuts, as are Dueling, Neo Dueling and Sweettreats.
- Low and medium bleed are 1 and 2 stacks per use. The existing 24-stack cap and one-stack-per-second decay remain. Very-low and medium companions have power 1 and 3 respectively, last six seconds, and use the existing eight-companion cap.
- Eternal Chaos gains its +2 once, beginning with activation six; it is not an indefinitely stacking bonus. Evergreen’s ramp resets per battle and has a final 0.8s floor after modifiers. Its Shiny floor is 0.72s.
- Chicken Leg grants +5 maximum health per defeated enemy wave while packed, without healing. Each copy contributes, once per wave. Maximum health persists for the run. Stashed copies do not count.
- Heartguard protects against all direct attacks during its one-second window, with ordinary damage-over-time still applying. Copies refresh expiration rather than adding duration. This is separate from the older one-attack protection on Seal of Blasphemous Prayer.
- Rosebite grants +2 gold and heals 2 on entering a rest, shop or event room while packed. The reward is saved once per room and does not stack across copies. Reopening or reloading an event does not repeat it.
- Amethyst Prism sells for 190 gold: ten times the unupgraded T12 dagger’s 19-gold offer. Its purchase price is likewise scaled to 480, preventing guaranteed shop-to-event resale profit. Its combat stats remain T12.
- Retrowinds and Seeker's Chisel have two/three unique random enchantments, giving at least Rare/Legendary **enchantment capacity**. Their original UT rarity and identity remain. Rolls happen once per item; existing saves retain their previous enchantments and fill only missing initial slots. Reloading does not reroll them.
- Packed partner rings give Pirate's Sidearms a single ×2 multiplier; additional partner copies do not multiply it. Reliable Pugio counts distinct adjacent ring items, while Right Hook counts packed items containing “Vitality” in their name. Stash never contributes. Sunshine/Void damage checks the current room’s dungeon ID, so waves and bosses qualify normally.
- Shiny versions have at least +1 primary amount and 5% shorter cooldown. Relevant integer proc amounts increase by 10%, rounded up; status/haste durations increase by 20%; ward bypass rises to 60%; Fractal miss chance falls to 45%. Descriptions show the actual upgraded values. Existing art, footprints, classes and saved upgrades are preserved.

The supplied spelling “Archangel's Judgememt” maps to **Archangel's Judgement**; “Pirate's Sidearm” maps to the imported **Pirate's Sidearms**. No unrelated item is substituted.

## Requested recipes

| Item | Implemented behavior |
| --- | --- |
| An Icicle | Add 0.5s chill per use |
| Ashen Talon; Queen's Stinger | 50% of damage bypasses enemy ward/block |
| Archangel's Judgement | 3 × 4 damage per activation |
| Blade of Fates | Double cooldown, +85% hit damage (rounded) |
| Bone Dagger | 10 damage + 1 bleed |
| Boomerang Blades; Hatchling Blades | 26 damage / 2.46s |
| Bounty Hunter's Dagger | 3 × 2 damage per activation |
| Chain Dagger | 10 damage + 2 bleed, building up to 6 total stacks (Shiny 8) |
| Chicken Leg of Doom | 1 damage; +5 max HP per defeated wave |
| Corruption Cutter | 6 total damage, existing fast twin-cut cadence |
| Crescent Dagger | T13 dagger combat stats |
| Dagger of Eternal Chaos | T12 stats; +2 after five uses, per battle |
| Dagger of the Amethyst Prism | T12 combat stats; tenfold T12 sale value |
| Dagger of the Hasteful Rabbit | T12 stats; adjacent 0.5s haste per use |
| Dagger of the Terrible Talon | T11 stats; extra 5 damage every fifth use |
| Dirk of Cronus | Existing combat stats; +1 mana every use |
| Dual Pops | T13 Moonstone Blades stats |
| Dueling Daggers | Updated Cutter stats; power-1 summon every fifth use |
| Evergreen Dagger | 3s initial cooldown, −0.5s per use, 0.8s floor |
| Fractal Blades | Two full-damage shots; independent 50% misses |
| Groovy Mango; Mister Mango | 9/10 damage; haste gives +50% recharge |
| Heart Jewel Blades; Heartfind Dagger | T11 reference stats; 1s direct immunity every tenth use |
| Hero's Blades; Hero's Dagger; Legacy Etherite; Venerable Spirit Dagger | Temporarily unobtainable; existing saved copies remain usable |
| Legion Elite Dagger | T13 stats; 5% double-damage chance per shot |
| Marionette Ravager | Add 0.5s exposure per use |
| Mischief | 15 damage |
| Needlessly Large Spoon | Add 1 heal and 1 mana per use |
| Neo Corrosion Cutter | 13 damage; retain 1 poison |
| Neo Dueling Daggers | Updated Cutter stats; power-3 summon every fifth use |
| Phantasm Dirk | Cronus damage/cooldown; 1 heal replaces mana |
| Phantom Sickle | 30 damage / 2.5s |
| Pirate's Sidearms | 12 damage, doubled with any listed packed partner ring |
| Poison Fang Dagger | Retain base with Shiny; hide duplicate and migrate old saved copies |
| Prismatic Slasher | 2 damage / 0.5s |
| Reliable Pugio | T13 stats; +1 per adjacent ring |
| Retrowinds Dagger | T13 stats; starts with two random enchantments |
| Rosebite Dagger | T13 stats; once-per-room noncombat bonus |
| Seeker's Chisel | T13 stats; starts with three random enchantments |
| Spatula Dagger | T11 stats |
| Sunshine Shiv | Double damage in The Shatters |
| Sweettreats Dagger | Updated Cutter plus 1 healing per use |
| Symbiotic Ripper | T11 stats + 1 bleed |
| The Right Hook | 12 damage +1 per packed Vitality-named item |
| Throwing Knives | 10 damage / 1s |
| Toxic Toad | 6 poison / 2s, no direct damage |
| Toxin Tooth | 10 damage + 1 poison |
| Toy Knife | 1 damage, block, healing, mana, dodge and bleed per use |
| Void Blades | Double damage in The Void |

## Testing and balance feedback

The requested numbers are preserved. Automated results and recommendations are recorded below after comparing the same seeded fixtures against 0.21.5. These fixtures diagnose tradeoffs rather than prove balance in every class, run mode or backpack layout.

Run `node game/tests/test-dagger-update.cjs` for the 55-entry mechanics, chance branches/distributions, progression references, Shiny upgrades, cooldown floors/resets, immunity, summons, prices, acquisition/save guards and reward-limit checks. Existing regression tests run too.

Run `node scripts/benchmark-daggers.cjs --output /tmp/dagger-results.json` to reproduce the dagger comparison. It tests a Rogue with standardized 270 maximum HP and 5 starting mana, using one target dagger, T12 leather, T6 cloak, Healing Tome, Ring of Magic and three Health Potions. There are no other upgrades. Fifteen boss trials per dagger cover the first dungeon in each of tiers 1/4/5 at depth 20, with five seeds each. Twenty additional trials per dagger measure 60 seconds of single-item actual-tick damage (starting at 500/1000 health and zero mana) against a stationary target with no enemy attacks. **Rogue class procs are included**, so those output figures are not bare weapon DPS. Partner/Vitality-ring and specialized dungeon bonuses are tested separately in the mechanics suite, rather than included in the standard benchmark.

The unchanged 19-class tiered benchmark also runs before/after: `node scripts/benchmark-balance.cjs`. Results for that fixture must remain separate from the dagger-specific balance findings.

### Historical measured findings — 0.22.0

The before/after run includes **825 boss fights and 1,100 output trials per version** (1,650 boss fights and 2,200 output trials combined). All 1,995 ordinary tiered-build records matched exactly between versions. Machine-readable summaries for all 55 entries are in [dagger-balance-results.json](dagger-balance-results.json). Disabled items are simulated for historical comparison but remain unavailable to players.

These are average 60-second damage-per-second figures **including the Rogue passive**, from the single-item fixture described above. They exclude partner rings, adjacent rings, Vitality items and dungeon-specific damage bonuses.

| Dagger | Previous output | Requested output | Change | Boss wins, before → after /15 |
| --- | ---: | ---: | ---: | ---: |
| Evergreen Dagger | 12.80 | 27.95 | +118% | 5 → 5 |
| Chain Dagger | 12.80 | 26.67 | +108% | 5 → 5 |
| Toxic Toad | 12.78 | 23.32 | +82% | 5 → 5 |
| Bounty Hunter's Dagger | 12.80 | 7.20 | -44% | 5 → 0 |
| Corruption Cutter | 12.30 | 8.50 | -31% | 5 → 0 |
| Toy Knife | 12.80 | 3.98 | -69% | 5 → 0 |
| Chicken Leg of Doom | 12.80 | 3.20 | -75% | 5 → 0 |
| Prismatic Slasher | 12.80 | 10.00 | -22% | 5 → 5 |

The 15 boss trials are five seeds against each of three deliberately different dungeon tiers, not a general win-rate estimate. Several profiles still win the easy group and lose the two harder groups; equal clear counts can hide substantial time/health differences.

**Recommendations, not additional changes:**

- **Evergreen is a strong long-fight weapon.** Its output rose about 118%; in the benchmark it averaged 105 uses instead of 48. A future floor of 0.8–1.0 seconds would soften the late-fight advantage while preserving the ramp. This describes 0.22.0; the 0.22.1 follow-up adopts the requested 0.8-second floor.
- **Chain Dagger’s “medium” bleed is more than a small damage rider.** Applying two stacks per use outpaces the one-stack-per-second decay, building toward the 24-stack cap. Its 60-second output rose about 108%. Applying two bleed every other use is a possible conservative follow-up, rather than treating two bleed as two immediate damage.
- **Toxic Toad is now a powerful sustained poison source**, about 82% more output in this fixture despite removing direct damage. It reaches the existing poison cap rapidly. Its actual damage remains subject to status decay and boss/elite resistance.
- **Bounty Hunter and Corruption Cutter are substantially weaker as primary weapons**: roughly −44% and −31% output, both going from five clears to zero in this fixed loadout. If those are meant to remain main weapons, consider Bounty at 3 per projectile and Cutter at 8 total damage. Dueling/Neo/Sweettreats partially compensate for their shared low primary damage with summons/healing.
- **Mangos remain a damage tradeoff even under haste.** At the same base cooldown, a normal 13-damage dagger gives 13 × 1.25 = 16.25 normalized hasted damage, versus Groovy’s 9 × 1.5 = 13.5 and Mister’s 10 × 1.5 = 15. Their stronger haste response does not by itself make them beat the ordinary dagger; 11 base damage would cross that simple primary-output threshold. Class/passive, adjacency and rounding effects can change exact combat totals.
- **Toy Knife is utility equipment rather than a replacement main weapon.** Its damage dropped about 69%; it lost all boss trials as the only weapon. Its healing, mana, block and dodge are useful alongside a separate damage source. Chicken Leg has an even larger damage tradeoff and likewise needs another weapon.
- **Chicken Leg’s run-wide growth deserves monitoring.** Each packed copy grants five maximum HP per defeated wave. Ten won waves therefore add 50 maximum HP per copy, without healing; copies stack. A one-copy rule, room-based award or per-run cap would be sensible if players start carrying several copies only for permanent growth.
- **Amethyst is intentionally an economy pickup.** It sells for 190 gold, but costs 480 to purchase; no guaranteed buy/resell profit is introduced.

Requested values were kept rather than silently tuning them to equal clear counts. All mechanical assertions, independent miss/crit probability checks and existing regression tests passed. This fixture does not establish complete class/build parity, full-run economy balance or optimal use of the new synergies.

A separate three-room actual-tick support check packed a T13 dagger, Chicken Leg, Toy Knife, Ring of Magic and Healing Tome. It won all three Pirate Cave fights, gained 15 maximum HP without the Chicken reward healing, and retained the growth between rooms. This confirms the utility role works alongside a main weapon; it is not a general full-expedition balance result.

### 0.22.1 follow-up checks

Using the same 20 seeded 60-second output trials and 15 boss trials per item:

| Item | 0.22.0 output | 0.22.1 output | Boss wins /15 |
| --- | ---: | ---: | ---: |
| Evergreen Dagger | 27.95 | 17.72 | 5 → 5 |
| Toxic Toad | 23.32 | 22.37 | 5 → 5 |

These include the Rogue passive, as in the original fixture. Evergreen's raised floor reduced sustained output by about 37%. Toxic Toad's lower application slows its build-up, but still reaches the existing 24-stack poison cap; the long-fight output change is consequently much smaller than the 40% reduction in poison per use. No additional poison-rule changes were applied.

The **Chain Dagger ceiling adopted in 0.22.2** retained 10 damage and 2 bleed per hit but allowed it to add bleed only while total enemy bleed was below 6, stopping at 6. It never removed or reduced higher bleed from other sources. Twenty seeded output trials averaged 15.82 rather than 26.67 (about 41% less), retaining a bleed specialization without independently filling the global 24-stack cap. The Shiny counterpart adopts an 8-stack ceiling and is covered by ceiling/preservation tests.

The implemented 0.22.2 ceiling was rechecked with 20 seeded output trials per variant: regular Chain averaged 15.82 damage/second and Shiny averaged 19.00, including the Rogue passive. Full regression tests passed, including partial stack additions and preserving both higher bleed and its expiry from other sources.
