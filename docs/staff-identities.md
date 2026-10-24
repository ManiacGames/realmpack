# UT/ST staff identities — 0.35.0

All **98 imported staff entries** are covered: **81 regular/historical definitions (79 names)** and **17 Shiny variants**. This replaces their generic or conflicting recipes with identities adapted from the item’s rendered game data, inspected 2026-10-24. The [source-facts file](staff-source-facts.json) retains numerical projectile/subattack, equipment-stat, burst and proc facts for every entry. Per-item source links are below.

## Translation into RealmPack

- Damage normally uses the average active source projectile budget divided by 7. Base cadence is 1.76 seconds divided by the fastest actual subattack rate. Source subattacks override misleading top-level/tooltip defaults. Mixed-speed channels keep fractional phases: all fire in the opening volley, then follow their original relative rates. The displayed damage is the sustained average activation budget, not guaranteed damage on every volley.
- Projectiles divide one primary budget. Flat power, item events, class progress and enchantment triggers apply once per volley. Piercing components bypass enemy ward; ordinary components still consume ward. Accelerating projectiles with near-zero initial speed receive a short delivery delay, rather than being treated as having no range. Queued deliveries require a packed source, stay within their wave and share a 48-entry limit.
- The pack has no aiming or movable enemy. Top-row placement stands in for close positioning: Ferryman/Jailer heads work from any row, while shorter chains require the top row. Extreme Prejudice/Iceblast land all ten radial bolts from the top row and two elsewhere (20% budget). These are explicit tactical adaptations, not literal RotMG projectile simulation. MultiHit/PassesCover alone do not bypass ward or create repeated damage against one enemy.
- Source equipment stats use existing RealmPack conventions: positive WIS grants 1 mana per volley; VIT grants a small shared-lock heal; ATT buffs the item’s own primary; Esben’s DEF grants a bounded block pulse; legacy SPD changes its own base cadence. Capacity bonuses never refill resources and duplicate base identities do not stack.
- Shiny copies retain the same identity, with the existing 5% faster base cadence and rounded 5% stronger primary budget. Burst recovery and proc locks remain shared/bounded. No new free enchantments, upgrade resets or saved-item replacements are introduced. IDs, art, footprints, prices, ST membership and acquisition rules remain unchanged. Legacy Sentient Staff and Staff of Esben Legacy remain unobtainable; saved copies work.

## Signature mechanics and deliberate limits

| Family | RealmPack behavior |
| --- | --- |
| Staff of Esben / Sweettreats Staff | Fifteen volleys fill the meter; the next volley releases a 24-damage manifestation and starts charging again. Adds 1 damage per 10 current block, capped at +12; block is a DEF proxy and is not spent. All variants share a 0.6s proc lock and a separate 4s, 1-block guard lock. A locked manifestation holds its full meter. |
| Vigor | Every 20 volleys can release one Festival Spirit: five 4-damage pulses, 1.6s apart, plus a 6-damage explosion after 8s. Deterministic translation of the 5% source proc. Shares the eight-companion cap and one active Festival Spirit across variants; charge waits if blocked. Ends with its source or wave. No secondary weapon/enchantment activation chain. |
| S.T.A.F.F. / Spring Rose | Five twin volleys with a 0.53s delivery delay, then 1.8s base recovery (1s final recovery minimum). Does not mirror adjacent items. |
| Sleigh Bell Staff | Four piercing volleys, then 1.8s base recovery (0.8s final recovery minimum). |
| Frostfall Rod | Five piercing five-bolt volleys, then 1.8s recovery with the same 1.8s minimum. WIS grants mana; its name does not add chill. |
| Spellblades / Steam Pipe / Bogwood Crook / Rocket Launcher | Preserve ordinary versus piercing projectile proportions. Hovering/Caramel, Worm and Squaroid/Fork preserve short acceleration delays. Steam Pipe also grants +3 max mana without a refill. |
| Spirit / Foramite / Neo Foramite, Shaman / Gloves, Nebular / Monochrome, Eruption | Preserve the actual independent channel counts and relative rates, including Eruption’s slow heavy core and faster piercing pellets. No poison, burning or life stealing inferred from flavor. |
| Mechanical Kogbold Limb, Tezcacoatl / Comet | Slow, heavy twin volleys with full ward bypass. Kogbold’s previous partial bypass is corrected. Neo Comet retains its faster source cadence. |
| Royal Sekhem | Its listed Syndicate ring partners grant +10/15/20% own primary damage; strongest packed partner only. |
| Beach Shovel | Mixed piercing volley and an 8-damage water burst, at most once per 3s across copies. Environmental fire extinguishing is not represented. |
| Edictum / Gravekeeper and Phylactery / Stygian Torch | Matching source volleys/cadence; existing Hollow King and Phylactery set memberships/thresholds remain. This pass does not invent the remaining ST families’ armor/ability bonuses. |

Perfect-hit scaling makes several wide or burst attacks excessive in this single-target game. Explicit regular budgets replace the literal /7 formula for Extreme Prejudice/Iceblast (86, historical EP 73), Ferryman (80 for the eight-channel version; 64 for the four-channel version), Torrential/Bloom-Fire (62), Unholy Sacrifice (60), S.T.A.F.F./Spring Rose (36), and Frostfall (40). Their relative channels still divide that total. Source accuracy does not mean every weapon must be equally strong: novelty staves remain intentionally weak, and legacy versions are not promoted into new loot.

## Complete regular/historical profiles

Damage below is the unmodified average/full-position budget. Set, class, partner, enchantment and placement effects may change actual output. The catalogue includes compact numeric summaries and full rules; live inspection shows charge, burst recovery and position state.

| Item | ID | Damage | Base cooldown | Identity | Source |
| --- | --- | ---: | ---: | --- | --- |
| Anatis Staff | wiki_3108 | 13 | 7.04s | Staff volley | [data](https://realm.wiki/item?id=3108) |
| Aspirant's Staff | wiki_17710 | 28 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=17710) |
| Barely Attuned Magic Thingy | wiki_8998 | 15 | 5.87s | Staff volley | [data](https://realm.wiki/item?id=8998) |
| Beach Shovel | wiki_28458 | 29 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=28458) |
| Bloody Pitch Fork Staff | wiki_42302 | 19 | 1.17s | Piercing staff | [data](https://realm.wiki/item?id=42302) |
| Bloom-Fire Scepter | wiki_7319 | 62 | 2.93s | Staff volley | [data](https://realm.wiki/item?id=7319) |
| Blooming Bouquet Staff | wiki_57113 | 29 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=57113) |
| Bogwood Crook | wiki_16929 | 32 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=16929) |
| Caramel Spellblade | wiki_1459 | 28 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=1459) |
| Comet of Calamity | wiki_25690 | 62 | 5.33s | Piercing staff | [data](https://realm.wiki/item?id=25690) |
| Corruption Tether | wiki_8691 | 28 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=8691) |
| Crystallized Worm Spellblade | wiki_55383 | 36 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=55383) |
| Cursed Harpoon | wiki_1907 | 45 | 2.51s | Staff volley | [data](https://realm.wiki/item?id=1907) |
| Deathmask Staff | wiki_3786 | 29 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=3786) |
| Dreamcaster | wiki_52256 | 34 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=52256) |
| Edictum Praetoris | wiki_2524 | 39 | 2.35s | Staff volley | [data](https://realm.wiki/item?id=2524) |
| Elder Heartwood Staff | wiki_41749 | 25 | 1.1s | Staff volley | [data](https://realm.wiki/item?id=41749) |
| Explorer's Shovel | wiki_42093 | 29 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=42093) |
| Ferryman's Scythe | wiki_38943 | 80 | 2.67s | Sweeping chain scythe | [data](https://realm.wiki/item?id=38943) |
| Ferryman's Scythe | wiki_38944 | 64 | 2.67s | Sweeping chain scythe | [data](https://realm.wiki/item?id=38944) |
| Foramite Staff | wiki_25688 | 25 | 1.68s | Independent staff rhythms | [data](https://realm.wiki/item?id=25688) |
| Frostfall Rod | wiki_42356 | 40 | 1.6s | Burst staff | [data](https://realm.wiki/item?id=42356) |
| Frosty's Walking Stick | wiki_6860 | 27 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=6860) |
| Gloves of Love | wiki_7329 | 37 | 2.2s | Independent staff rhythms | [data](https://realm.wiki/item?id=7329) |
| Gravekeeper's Scythe | wiki_32484 | 39 | 2.35s | Staff volley | [data](https://realm.wiki/item?id=32484) |
| Hero's Spellblade | wiki_24973 | 27 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=24973) |
| Hero's Staff | wiki_24967 | 29 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=24967) |
| Hovering Spellblade | wiki_53818 | 26 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=53818) |
| Jailer's Scythe | wiki_23794 | 55 | 2.93s | Sweeping chain scythe | [data](https://realm.wiki/item?id=23794) |
| K.I.D.D. Force | wiki_1394 | 30 | 2.2s | Staff volley | [data](https://realm.wiki/item?id=1394) |
| K.I.D.D. Force 2.0 | wiki_37677 | 39 | 2.93s | Staff volley | [data](https://realm.wiki/item?id=37677) |
| KoalaPOW | wiki_3306 | 34 | 4.4s | Staff volley | [data](https://realm.wiki/item?id=3306) |
| Legacy Sentient Staff | wiki_8615 | 27 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=8615) |
| Legion Elite Staff | wiki_41816 | 29 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=41816) |
| Love Heart Spellblade | wiki_26747 | 25 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=26747) |
| Mechanical Kogbold Limb | wiki_49469 | 79 | 5.33s | Piercing staff | [data](https://realm.wiki/item?id=49469) |
| Monochrome Staff | wiki_43381 | 37 | 2.35s | Independent staff rhythms | [data](https://realm.wiki/item?id=43381) |
| Nebular Rod | wiki_22521 | 37 | 2.35s | Independent staff rhythms | [data](https://realm.wiki/item?id=22521) |
| Neo Comet of Calamity | wiki_56452 | 62 | 4.4s | Piercing staff | [data](https://realm.wiki/item?id=56452) |
| Neo Foramite Staff | wiki_56451 | 40 | 2.51s | Independent staff rhythms | [data](https://realm.wiki/item?id=56451) |
| Oppressor's Staff | wiki_26099 | 38 | 2.35s | Staff volley | [data](https://realm.wiki/item?id=26099) |
| Retrowinds Staff | wiki_63869 | 29 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=63869) |
| Rocket Launcher | wiki_50817 | 28 | 2.07s | Mixed piercing volley | [data](https://realm.wiki/item?id=50817) |
| Royal Sekhem | wiki_14449 | 26 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=14449) |
| S.T.A.F.F. | wiki_15758 | 36 | 1.3s | Burst staff | [data](https://realm.wiki/item?id=15758) |
| Screwdriver Staff | wiki_12069 | 27 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=12069) |
| Shaman's Staff | wiki_8784 | 37 | 2.2s | Independent staff rhythms | [data](https://realm.wiki/item?id=8784) |
| Sleigh Bell Staff | wiki_12161 | 35 | 1.17s | Burst staff | [data](https://realm.wiki/item?id=12161) |
| Snow Branch | wiki_41654 | 25 | 1.1s | Staff volley | [data](https://realm.wiki/item?id=41654) |
| Snowblind Spellblade | wiki_26224 | 27 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=26224) |
| Spellblade of the Void | wiki_41781 | 29 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=41781) |
| Spirit Staff | wiki_2112 | 25 | 1.68s | Independent staff rhythms | [data](https://realm.wiki/item?id=2112) |
| Spring Rose | wiki_7354 | 36 | 1.3s | Burst staff | [data](https://realm.wiki/item?id=7354) |
| Squaroid Staff | wiki_16963 | 19 | 1.17s | Piercing staff | [data](https://realm.wiki/item?id=16963) |
| Staff of Adoration | wiki_8843 | 25 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=8843) |
| Staff of Eruption | wiki_19266 | 62 | 3.52s | Mixed piercing volley | [data](https://realm.wiki/item?id=19266) |
| Staff of Esben | wiki_5271 | 25 | 1.76s | Esben manifestation | [data](https://realm.wiki/item?id=5271) |
| Staff of Esben Legacy | wiki_1894 | 25 | 1.66s | Staff volley | [data](https://realm.wiki/item?id=1894) |
| Staff of Extreme Prejudice | wiki_3075 | 86 | 4.4s | Radial ten-bolt volley | [data](https://realm.wiki/item?id=3075) |
| Staff of Extreme Prejudice | wiki_53186 | 73 | 4.4s | Radial ten-bolt volley | [data](https://realm.wiki/item?id=53186) |
| Staff of Horrific Knowledge | wiki_3859 | 26 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=3859) |
| Staff of Iceblast | wiki_5847 | 86 | 4.4s | Radial ten-bolt volley | [data](https://realm.wiki/item?id=5847) |
| Staff of Rich History | wiki_65056 | 25 | 1.1s | Staff volley | [data](https://realm.wiki/item?id=65056) |
| Staff of Silver Wings | wiki_14493 | 27 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=14493) |
| Staff of the Crystal Serpent | wiki_3093 | 22 | 1.6s | Staff volley | [data](https://realm.wiki/item?id=3093) |
| Staff of the Eclipse | wiki_2008 | 29 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=2008) |
| Staff of the Rising Sun | wiki_8857 | 27 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=8857) |
| Staff of the Saint | wiki_20977 | 1 | 1.17s | Staff volley | [data](https://realm.wiki/item?id=20977) |
| Staff of Unholy Sacrifice | wiki_580 | 60 | 3.2s | Staff volley | [data](https://realm.wiki/item?id=580) |
| Staff of Yuletide Carols | wiki_9086 | 26 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=9086) |
| Steam Pipe | wiki_17501 | 43 | 1.76s | Mixed piercing volley | [data](https://realm.wiki/item?id=17501) |
| Stygian Torch | wiki_25751 | 22 | 1.41s | Staff volley | [data](https://realm.wiki/item?id=25751) |
| Superior | wiki_28839 | 41 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=28839) |
| Supernatural Staff | wiki_25759 | 28 | 1.76s | Staff volley | [data](https://realm.wiki/item?id=25759) |
| Sweettreats Staff | wiki_63772 | 25 | 1.76s | Esben manifestation | [data](https://realm.wiki/item?id=63772) |
| Tezcacoatl's Tail | wiki_13986 | 62 | 5.33s | Piercing staff | [data](https://realm.wiki/item?id=13986) |
| The Phylactery | wiki_9059 | 22 | 1.41s | Staff volley | [data](https://realm.wiki/item?id=9059) |
| Tideturner Trident | wiki_20302 | 45 | 2.51s | Staff volley | [data](https://realm.wiki/item?id=20302) |
| Torrential Staff | wiki_20903 | 62 | 2.93s | Staff volley | [data](https://realm.wiki/item?id=20903) |
| Venerable Staff of the Crystal Serpent | wiki_38584 | 22 | 1.32s | Staff volley | [data](https://realm.wiki/item?id=38584) |
| Vigor | wiki_20746 | 32 | 1.68s | Festival spirit | [data](https://realm.wiki/item?id=20746) |

## Validation and comparative balance

The regression suite protects every non-staff recipe with a pre-pass SHA-256 snapshot. Tiered class fixtures compare identical builds across all 19 classes and 35 bosses; all 1,995 fight records are unchanged ([results](staff-class-regression.json)). The staff suite checks every regular/historical/Shiny profile, reskin pairs, historical partitions, damage/event budgets, mixed piercing/rates, delayed shots, placement, burst-only recovery floors, meters/locks, spirit pulses/caps, capacities, partners, saved upgrades and Legacy exclusions, plus 294 legal staff/class combat trials.

The [staff comparison](staff-benchmark.json) uses all 81 non-Shiny definitions, including unavailable Legacy versions, across Wizard/Necromancer/Mystic, eight boss difficulty bands and two native support levels: 3,888 fights per version (7,776 total). Fixed builds pack the tested staff in the top row, with a second tiered staff, native ability/armor, magic ring, three Health Potions, +50 base HP and +8% relic recharge. They have no enchantments or special partner rings. This measures replacement performance, not optimized builds, a full-run economy, manual aiming or every haste/upgrade combination. Do not compare these raw win counts with a different benchmark’s fixtures.

The [set comparison](staff-sets-benchmark.json) checks the two existing staff sets against all 35 bosses at both support levels: 280 fights across releases. Hollow King remains 34/70 wins; Phylactery remains 25/70. These results do not establish balance for the other ST set families.

The paired staff fixtures record **1,697/3,888 wins before and 1,568/3,888 after**; the goal is differentiated source identities rather than a blanket buff. Largest intended reductions are novelty Staff of the Saint (21→10), Anatis (21→11), and Barely Attuned (21→11). Among stronger profiles: eight-channel Ferryman 21→26, Superior 19→24, Torrential 21→24, Bloom-Fire 19→24, S.T.A.F.F. 19→23. Vigor stays 21→21, Frostfall 23→23 and current Extreme Prejudice 20→20. Esben 21→19 and Mechanical Kogbold Limb 19→18 remain short-fight/burst-damage watch points; a source-based cadence or a long meter may pay off too late in some packs. These are 48 fixed fights per definition, not evidence of universal rankings. Player feedback should guide further tuning of those trade-offs.

All 26 regression suites and JavaScript syntax checks passed. Browser checks cover 796 staff inspection/offer views (desktop plus large-text phone inspection, and desktop/phone/short-landscape offers) and 7,176 catalogue views, with no reported layout or script errors. Catalogue inspection remains one panel; standard desktop catalogue cases have no local overflow. A real-timer mixed-staff combat smoke check at 4× activated all five equipped staves and kept queues/companions bounded with no page scrolling or runtime errors; it is not an FPS benchmark.

Reproduce with `node game/tests/test-staff-identities.cjs`, `node scripts/benchmark-staves.cjs --baseline-root <0.34.0-checkout> --output docs/staff-benchmark.json`, `node scripts/benchmark-staff-sets.cjs --baseline-root <0.34.0-checkout> --output docs/staff-sets-benchmark.json` and the `scripts/check-staff-*.cjs` Playwright checks using `REALMPACK_CHROME`.
