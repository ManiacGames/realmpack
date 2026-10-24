# Dagger identities — 0.34.0

This pass covers **all 66 imported UT/ST dagger names: 67 regular/retro definitions and 14 Shiny variants**. It supersedes the older custom Dagger Update wherever that recipe conflicted with the new request for RotMG identities. Tiered daggers, all non-dagger definitions, footprints, sprites, IDs, class compatibility and existing ST membership remain unchanged. Legacy items, the four previously disabled dagger names and the retired duplicate Poison Fang remain unobtainable. Saved possessions and their enchantments, potion upgrades and event upgrades remain usable.

## Sources and translation limits

The [inspected source facts](dagger-source-facts.json) record all 81 game-data pages read on 2026-10-24. The complete profile table links each regular/retro source. Values here describe RealmPack adaptations, not literal RotMG DPS. This game has no cursor aiming, movement, character ATT/DEX/VIT/WIS stats or multiple simultaneous targets.

- A normal primary budget is average active projectile damage divided by 12. Base cooldown is 1.29 seconds divided by the fastest listed subattack rate. Independent attacks retain their relative source rates with fractional firing phases; zero-damage helper projectiles are ignored. Opening volleys can include all channels; the displayed value is the long-run average per activation. Repeated top-level/subattack tooltip rates are not multiplied together.
- Each successful volley spends flat power, class activation and enchantment triggers once. Split projectiles and returns share that volley budget. Returns arrive after 0.35 seconds, require their source still packed, and cannot cross waves. At most 32 return segments can be pending.
- Full Armor Piercing becomes full enemy-ward bypass for Ashen Talon, Queen's Stinger, both Corrosion Cutters, Prismatic Slasher, exposing dirks and Toxic Toad's dart. Mischief's occasional secondary petals pierce; its main shot does not. Names and flavor do not create poison, bleeding, chill or burn.
- Archangel's Judgement uses four feathers. Blade of Fates combines a rapid spinner with a heavy attack at one-sixth that rate. Boomerang/Hatchling combine a forward blade and a slower returning blade. Dual-type reskins retain the two subattack rates instead of forcing their combined output through an arbitrary single attack pattern.
- Fractal has two outer bolts and four very short inner bolts. Inner bolts hit only from the top backpack row. Its full barrage is tuned to 30 base damage rather than 37 from unadjusted source scaling, to account for perfect aim against one stationary target. The previous independent 50% misses are removed.
- Phantom Sickle cycles one, three and five blades using a tuned 32-damage cycle-average budget. Its raw projectile patterns genuinely differ; unused projectile definitions are not simply added together every shot.
- Evergreen uses three twin volleys and then a 1.6s base recovery. Each volley has a tuned 19-damage budget instead of literal 31-point scaling. Its final 0.8s cooldown floor remains after all modifiers; Shiny uses 0.72s and 1.52s recovery. This replaces the former permanent firing ramp with a bounded burst cadence.
- Chain retains the explicitly requested 10 base damage, two bleed per use and six-stack bleed ceiling (Shiny eight). Its source-backed Rev Up now adds +2% own recharge per attack, up to ten stacks, expiring after 4.4s without firing. It neither reduces nor refreshes higher bleed from other sources. This is an own-weapon translation of the source DEX stack, rather than global haste for the entire pack.
- Toxic Toad now has piercing primary darts and a six-poison proc with a shared two-second copy lock. Six retains the user's earlier poison nerf. This is a bounded adaptation of its grenade; literal grenade impact damage, ATT/radius scaling and poison amplification are not copied. Toxin Tooth is a slow heavy dagger and does not invent poison from its name.
- Marionette Ravager and Blood Coated Dirk add an eight-damage exposing shot at most once every two seconds across their regular/Shiny/cosmetic versions. The follow-up exposes for one second; its damage does not bypass ward and it creates no second activation. Dual Pops adds an eight-damage water burst with a shared three-second identity lock; environmental fire extinguishing is not simulated.
- Spoon's source 10% food chance becomes a deterministic food effect every tenth successful volley. It cycles Milk (heal six), Sugar (heal three / restore two mana), Well Fed (heal three / +10% weapon damage for three seconds). A shared three-second food lock prevents duplicate bursts; buffs refresh without stacking. This directly adapts the food's benefits rather than granting health and mana on every attack.
- Cronus and its Phantasm reskin restore one mana per successful use as the WIS adaptation. Positive VIT becomes one healing on attack with a shared 3–6s base-identity lock. Symbiotic Ripper's negative VIT becomes 10% less received healing in combat while packed, without duplicate stacking. These are equipped-stat adaptations, not claims of literal source on-hit procs. Existing healing fatigue still applies.
- Positive ATT becomes +2% own primary per point; Throwing Knives' three DEX points become +6% own recharge included in its base cooldown. SPD and negative movement speed have no direct movement effect here.
- Reliable Pugio recognizes the source's listed packed MotMG stat amulets, including corresponding Shiny versions, for a bounded +20% primary bonus. Arbitrary rings and stash do not count. Sidearms recognizes packed Sunken Fire Opal Ring / Faded Heart Scarab / Fractured Hannya for +10% / +15% / +20%, with only the strongest partner counting. These represent extra projectiles without duplicating flat power or triggers.
- Soulcursed Scythe becomes a slow heavy weapon with a cloak interaction. Any successful packed cloak activation opens a 2.4s Lethal Strike window: +50% own primary damage, with 40% of that budget bypassing ward. In RotMG the cloak ends before Lethal Strike begins; RealmPack abstracts that trigger to cloak use because it models evasion instead of the full Sneak/Invisible state. No claim of literal invisibility timing is made. The existing Cape/Hide/Rosary set relationships remain.
- Shiny daggers retain the RealmPack rule of at least +1 / approximately +5% primary and 5% shorter base cooldown. The Chain ceiling and Evergreen recovery/floor exceptions above remain. Source identities and partner conditions are otherwise shared.

## Earlier custom effects replaced

The previous [Dagger Update history](dagger-update.md) records the earlier user-authored recipes. This new request changes their authority: source-backed identities now replace summons on Dueling variants, Bone bleed, Icicle chill, Neo Cutter poison, heartguard invulnerability, Rabbit haste, universal per-hit resource bundles, dungeon-specific damage multipliers, Chicken wave-health farming, Rosebite room gold/healing, arbitrary critical hits, guaranteed initial enchantments and Amethyst's inflated sale/purchase value. Existing saved enchantments and upgrades are retained; new items use the ordinary enchantment system. New full ST armor/ability/ring sets and Aspirant artifact inscription are outside this weapon pass.

Novelty weapons remain deliberately weak where the source is weak. The inspected damage/cadence does not support giving Toy Knife every defensive/resource effect, making Sunshine a Shatters specialist, or using Chicken Leg to accumulate permanent maximum HP.

## Complete regular / retro profiles

Displayed damage is a shared volley budget, or the cycle average for independent subattacks/fans. Class, adjacency, upgrades, temporary buffs and placement apply in combat. Shiny counterparts inherit these identities with the modifiers above.

| Item / source | Previous damage / cooldown | New damage / cooldown | New behavior |
| --- | ---: | ---: | --- |
| [An Icicle](https://realm.wiki/item?id=9085) · wiki_9085 | 13 damage / 1.23s | 12 / 1.23s | A single dagger strike. |
| [Archangel's Judgement](https://realm.wiki/item?id=17124) · wiki_17124 | 4 damage / 1.23s | 23 / 1.52s | 4 projectiles share the displayed total damage. |
| [Ashen Talon](https://realm.wiki/item?id=7321) · wiki_7321 | 13 damage / 1.23s | 13 / 1.23s | A single dagger strike. All primary damage bypasses enemy ward. |
| [Aspirant's Dagger](https://realm.wiki/item?id=17709) · wiki_17709 | 13 damage / 1.23s | 15 / 1.36s | A single dagger strike. |
| [Avarice](https://realm.wiki/item?id=28829) · wiki_28829 | 12 damage / 1.17s | 17 / 1.23s | A single dagger strike. |
| [Blade of Fates](https://realm.wiki/item?id=22506) · wiki_22506 | 24 damage / 2.46s | 24 / 1.79s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. |
| [Blood Coated Dirk](https://realm.wiki/item?id=42280) · wiki_42280 | 12 damage / 1.23s | 8 / 0.86s | A single dagger strike. All primary damage bypasses enemy ward. While attacking, fire an additional 8-damage exposing shot, at most once every 2s across both matching identities and their Shiny variants. The follow-up exposes for 1s and creates no additional weapon activation. |
| [Bone Dagger](https://realm.wiki/item?id=3106) · wiki_3106 | 10 damage / 1.23s | 11 / 1.17s | A single dagger strike. |
| [Boomerang Blades](https://realm.wiki/item?id=53801) · wiki_53801 | 26 damage / 2.46s | 16 / 1.43s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. The returning blade splits its own budget between outgoing and return hits, 0.35s apart. No extra flat power or activation procs; returns cannot cross waves. |
| [Bounty Hunter's Dagger](https://realm.wiki/item?id=26098) · wiki_26098 | 2 damage / 1.23s | 26 / 1.98s | 3 projectiles share the displayed total damage. |
| [Carved Golem Remains](https://realm.wiki/item?id=600) · wiki_600 | 13 damage / 1.23s | 14 / 1.23s | A single dagger strike. |
| [Chain Dagger](https://realm.wiki/item?id=49695) · wiki_49695 | 10 damage / 1.23s | 10 / 1.61s | A single dagger strike. Each attack grants +2% own recharge, up to 10 stacks, expiring after 4.4s without firing. Applies 2 bleed per use, building only to 6 stacks. Never reduces or refreshes higher bleed from other sources. |
| [Chicken Leg of Doom](https://realm.wiki/item?id=2849) · wiki_2849 | 1 damage / 1.23s | 7 / 1.36s | A single dagger strike. A deliberately weak novelty weapon; no invented resource, protection or dungeon reward effects. |
| [Corrosion Cutter](https://realm.wiki/item?id=25697) · wiki_25697 | 12 damage / 1.23s | 13 / 1.23s | A single dagger strike. All primary damage bypasses enemy ward. |
| [Corruption Cutter](https://realm.wiki/item?id=1408) · wiki_1408 | 6 damage / 1.02s | 15 / 1.08s | 2 projectiles share the displayed total damage. |
| [Crescent Dagger](https://realm.wiki/item?id=2006) · wiki_2006 | 13 damage / 1.22s | 14 / 1.23s | A single dagger strike. |
| [Dagger of Eternal Chaos](https://realm.wiki/item?id=14491) · wiki_14491 | 12 damage / 1.23s | 13 / 1.23s | A single dagger strike. Own primary damage +4% (equipped ATT adaptation). |
| [Dagger of the Amethyst Prism](https://realm.wiki/item?id=9002) · wiki_9002 | 12 damage / 1.23s | 13 / 1.23s | A single dagger strike. |
| [Dagger of the Hasteful Rabbit](https://realm.wiki/item?id=2201) · wiki_2201 | 12 damage / 1.23s | 13 / 1.23s | A single dagger strike. |
| [Dagger of the Terrible Talon](https://realm.wiki/item?id=3857) · wiki_3857 | 12 damage / 1.25s | 12 / 1.23s | A single dagger strike. |
| [Dirk of Cronus](https://realm.wiki/item?id=3082) · wiki_3082 | 14 damage / 1.29s | 18 / 1.36s | A single dagger strike. Gain 1 mana per successful use (equipped WIS adaptation). |
| [Dual Pops](https://realm.wiki/item?id=28459) · wiki_28459 | 13 damage / 1.22s | 15 / 1.17s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. An 8-damage water burst fires at most once every 3s across copies. Environmental fire extinguishing is not represented. |
| [Dueling Daggers](https://realm.wiki/item?id=25698) · wiki_25698 | 6 damage / 1.02s | 15 / 1.08s | 2 projectiles share the displayed total damage. |
| [Etherite Dagger](https://realm.wiki/item?id=10064) · wiki_10064 | 10 damage / 0.99s | 12 / 1.03s | A single dagger strike. |
| [Evergreen Dagger](https://realm.wiki/item?id=12160) · wiki_12160 | 13 damage / 3.00s | 19 / 0.99s | 2 projectiles share the displayed total damage. Three twin volleys per burst. After every third activation: 1.6s base recovery. Final cooldown never falls below 0.8s, including haste and upgrades. No permanent firing ramp. |
| [Fractal Blades](https://realm.wiki/item?id=17560) · wiki_17560 | 13 damage / 1.23s | 30 / 1.43s | 6 projectiles share the displayed total damage. The two outer bolts hit from any row. Four short inner bolts hit only from the top backpack row. The 30-damage full barrage is deliberately budgeted below literal source scaling; no arbitrary miss rolls. |
| [Frost Lich's Finger](https://realm.wiki/item?id=6859) · wiki_6859 | 12 damage / 1.23s | 13 / 1.23s | A single dagger strike. |
| [Frostbite Blades](https://realm.wiki/item?id=26193) · wiki_26193 | 12 damage / 1.23s | 14 / 1.17s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. |
| [Groovy Mango](https://realm.wiki/item?id=37679) · wiki_37679 | 9 damage / 1.23s | 23 / 1.72s | A single dagger strike. |
| [Hatchling Blades](https://realm.wiki/item?id=1458) · wiki_1458 | 26 damage / 2.46s | 16 / 1.43s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. The returning blade splits its own budget between outgoing and return hits, 0.35s apart. No extra flat power or activation procs; returns cannot cross waves. |
| [Heart Jewel Blades](https://realm.wiki/item?id=26745) · wiki_26745 | 12 damage / 1.25s | 13 / 1.17s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. |
| [Heartfind Dagger](https://realm.wiki/item?id=8845) · wiki_8845 | 12 damage / 1.25s | 12 / 1.23s | A single dagger strike. |
| [Hero's Blades](https://realm.wiki/item?id=24971) · wiki_24971 · Unobtainable | 13 damage / 1.23s | 15 / 1.17s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. |
| [Hero's Dagger](https://realm.wiki/item?id=24965) · wiki_24965 · Unobtainable | 13 damage / 1.23s | 14 / 1.23s | A single dagger strike. |
| [Legacy Etherite Dagger](https://realm.wiki/item?id=8608) · wiki_8608 · Unobtainable | 13 damage / 1.23s | 14 / 1.17s | A single dagger strike. |
| [Legion Elite Dagger](https://realm.wiki/item?id=41811) · wiki_41811 | 13 damage / 1.22s | 14 / 1.23s | A single dagger strike. |
| [Maize Machete](https://realm.wiki/item?id=25731) · wiki_25731 | 13 damage / 1.23s | 14 / 1.23s | A single dagger strike. |
| [Marionette Ravager](https://realm.wiki/item?id=41740) · wiki_41740 | 13 damage / 1.23s | 8 / 0.86s | A single dagger strike. All primary damage bypasses enemy ward. While attacking, fire an additional 8-damage exposing shot, at most once every 2s across both matching identities and their Shiny variants. The follow-up exposes for 1s and creates no additional weapon activation. |
| [Mischief](https://realm.wiki/item?id=20766) · wiki_20766 | 15 damage / 1.23s | 17 / 1.23s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. Only the piercing secondary petals bypass enemy ward. |
| [Mister Mango](https://realm.wiki/item?id=1396) · wiki_1396 | 10 damage / 1.23s | 23 / 2.58s | A single dagger strike. |
| [Needlessly Large Spoon](https://realm.wiki/item?id=18345) · wiki_18345 | 13 damage / 1.23s | 12 / 1.23s | A single dagger strike. Every tenth attack produces a food effect, cycling Milk (heal 6), Sugar (heal 3 and gain 2 mana), Well Fed (heal 3 and +10% weapon damage for 3s). Shared 3s food lock; buffs refresh without stacking. A deterministic adaptation of the source’s 10% food-drop chance. |
| [Neo Corrosion Cutter](https://realm.wiki/item?id=56457) · wiki_56457 | 13 damage / 1.23s | 22 / 1.84s | A single dagger strike. All primary damage bypasses enemy ward. |
| [Neo Dueling Daggers](https://realm.wiki/item?id=56458) · wiki_56458 | 6 damage / 1.02s | 16 / 1.08s | 2 projectiles share the displayed total damage. |
| [Phantasm Dirk](https://realm.wiki/item?id=25786) · wiki_25786 | 14 damage / 1.29s | 18 / 1.36s | A single dagger strike. Gain 1 mana per successful use (equipped WIS adaptation). |
| [Phantom Sickle](https://realm.wiki/item?id=5357) · wiki_5357 | 30 damage / 2.50s | 32 / 2.87s | Cycles one, three and five spectral blades. The displayed 32 damage is the cycle-average budget, split across the current fan; flat power applies once. |
| [Pirate's Sidearms](https://realm.wiki/item?id=14453) · wiki_14453 | 12 damage / 1.23s | 14 / 1.17s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. Packed Sunken Fire Opal Ring / Faded Heart Scarab / Fractured Hannya grants +10% / +15% / +20% own primary damage. Strongest listed partner only; duplicates and stash do not count. |
| [Poison Fang Dagger](https://realm.wiki/item?id=1801) · wiki_1801 | 12 damage / 1.23s | 8 / 0.92s | A single dagger strike. |
| [Poison Fang Dagger](https://realm.wiki/item?id=53184) · wiki_53184 · Unobtainable | 12 damage / 1.23s | 7 / 1.29s | A single dagger strike. |
| [Prismatic Slasher](https://realm.wiki/item?id=20983) · wiki_20983 | 2 damage / 0.50s | 2 / 0.81s | 2 projectiles share the displayed total damage. All primary damage bypasses enemy ward. A deliberately weak novelty weapon; no invented resource, protection or dungeon reward effects. |
| [Queen's Stinger](https://realm.wiki/item?id=4255) · wiki_4255 | 13 damage / 1.23s | 13 / 1.23s | A single dagger strike. All primary damage bypasses enemy ward. |
| [Reliable Pugio](https://realm.wiki/item?id=3784) · wiki_3784 | 13 damage / 1.22s | 14 / 1.23s | A single dagger strike. A packed MotMG stat amulet listed by its source grants +20% own primary damage, translating the extra projectiles. Other rings and stashed partners do not count. |
| [Retrowinds Dagger](https://realm.wiki/item?id=63867) · wiki_63867 | 13 damage / 1.22s | 14 / 1.23s | A single dagger strike. |
| [Rosebite Dagger](https://realm.wiki/item?id=57117) · wiki_57117 | 13 damage / 1.22s | 14 / 1.23s | A single dagger strike. |
| [Seeker's Chisel](https://realm.wiki/item?id=42095) · wiki_42095 | 13 damage / 1.22s | 14 / 1.23s | A single dagger strike. |
| [Soulcursed Scythe](https://realm.wiki/item?id=17868) · wiki_17868 | 12 damage / 1.23s | 34 / 3.23s | A single dagger strike. After a successful packed cloak use, enter a 2.4s Lethal Strike window: +50% own primary damage and 40% of that budget bypasses ward. A translation of its cloak-ending scythe/chain mode; no cloak or no active window means the ordinary heavy dagger. |
| [Spatula Dagger](https://realm.wiki/item?id=12068) · wiki_12068 | 12 damage / 1.25s | 13 / 1.23s | A single dagger strike. Heal 1 HP when attacking, at most once every 6s per base identity (equipped VIT adaptation). |
| [Spirit Dagger](https://realm.wiki/item?id=3113) · wiki_3113 | 13 damage / 1.23s | 14 / 1.23s | A single dagger strike. |
| [Sunshine Shiv](https://realm.wiki/item?id=3309) · wiki_3309 | 13 damage / 1.23s | 2 / 2.35s | A single dagger strike. A deliberately weak novelty weapon; no invented resource, protection or dungeon reward effects. |
| [Sweettreats Dagger](https://realm.wiki/item?id=63902) · wiki_63902 | 6 damage / 1.02s | 15 / 1.08s | 2 projectiles share the displayed total damage. |
| [Symbiotic Ripper](https://realm.wiki/item?id=3032) · wiki_3032 | 12 damage / 1.25s | 12 / 1.03s | A single dagger strike. In combat while packed, received healing is 10% lower (negative VIT adaptation). Duplicate copies do not stack; healing fatigue still applies. |
| [The Right Hook](https://realm.wiki/item?id=17856) · wiki_17856 | 12 damage / 1.23s | 22 / 1.98s | A single dagger strike. Heal 1 HP when attacking, at most once every 3s per base identity (equipped VIT adaptation). |
| [Throwing Knives](https://realm.wiki/item?id=52253) · wiki_52253 | 10 damage / 1.00s | 15 / 1.16s | A single dagger strike. Base cooldown includes +6% own recharge (equipped DEX adaptation). |
| [Toxic Toad](https://realm.wiki/item?id=8788) · wiki_8788 | 6 poison / 2.00s | 7 / 2.15s | A single dagger strike. All primary damage bypasses enemy ward. Primary darts pierce ward. Apply 6 poison while attacking, at most once every 2s across copies. Retains the requested 6-poison limit as a bounded adaptation of the grenade; existing poison caps and decay apply. |
| [Toxin Tooth](https://realm.wiki/item?id=49160) · wiki_49160 | 10 damage / 1.23s | 24 / 1.84s | A single dagger strike. |
| [Toy Knife](https://realm.wiki/item?id=9000) · wiki_9000 | 1 damage / 1.23s | 4 / 1.61s | A single dagger strike. A deliberately weak novelty weapon; no invented resource, protection or dungeon reward effects. |
| [Venerable Spirit Dagger](https://realm.wiki/item?id=38585) · wiki_38585 · Unobtainable | 13 damage / 1.23s | 15 / 1.23s | A single dagger strike. |
| [Void Blades](https://realm.wiki/item?id=41778) · wiki_41778 | 13 damage / 1.23s | 15 / 1.17s | Independent subattacks keep their source rate ratios. The displayed damage is the average per activation; opening volleys can be larger. |

## Validation

The current regression test checks all 81 definitions, real damage and ward bypass, subattack ratios, return/flat-power budgets, burst/rev limits, proc locks, food cycles, cloak/partner behavior, removed invented effects, saved upgrades, existing acquisition exclusions and 243 legal combat trials across Rogue, Assassin and Trickster. The entire non-dagger catalogue matches its 0.33.2 SHA-256 `9a93bf388061fbc5d47a4707045e23f67264129f0ea55fb3fc34b5042541ce15`; tiered daggers separately match `11eb19e749d35d6d131bf3cbe3f7c958fc883801fc9c1fa79688be1905e883e2`. The old dagger snapshot lock is intentionally superseded by this authorized identity pass. Sword tests now allow that change and retain their own weapon checks and unrelated-definition guard.

The preserved 19-class tiered benchmark matched all 1,995 fight records exactly before/after. JavaScript syntax and all 25 regression suites passed. Browser inspection checks cover all 81 dagger definitions in full inventory, reward, shop and catalogue contexts at desktop/default and phone/larger-text sizes: 660 views and 5,163 traversed pages passed. The full catalogue audit also passed 7,166 views, including all 2,318 entries at 1366×768 and 790×635 with default text and no local scrolling. Detailed pages, offers and representative dagger panels were visually reviewed. A mixed Scythe/returning-blade/Spoon/Fractal/Cape build also ran at 4× speed with active Well Fed and Lethal Strike indicators and no browser errors.


## Balance comparison

The [individual dagger report](dagger-identity-benchmark.json), generated by `scripts/benchmark-dagger-identities.cjs`, compares fixed 0.33.2 commit `3e30d5af6c26e953848b44e2dc0003dd77012f69` with this pass: 67 base/retro definitions × three native dagger classes × eight representative bosses × two support levels × two versions = **6,432 fights**. Retired definitions are included as direct fixtures, not restored to acquisition.

Each fixture uses a legal pack with the tested dagger first in the top row, a native tiered ability and armor, a mana ring and one extra native tiered dagger, plus three Health Potions. Support gear is 60%/90% of family maximum, with +50 base HP, full equipped HP, +8% recharge, seed 123456, Adventurer depth 20 and 0.05s ticks. No upgrades/enchantments are manually added; guaranteed starting enchantments remain part of the **old** Retrowinds/Chisel fixtures when comparing their old recipes. Special MotMG/Syndicate partner rings are not included. Native Rogue cloaks can activate Scythe mode; Assassin/Trickster fixtures retain their own native abilities.

| Example | Before clears / 48 | After clears / 48 |
| --- | ---: | ---: |
| Avarice | 21 | 25 |
| Archangel's Judgement | 20 | 24 |
| Chain Dagger | 23 | 20 |
| Corruption Cutter | 16 | 23 |
| Dueling Daggers | 16 | 23 |
| Evergreen Dagger | 22 | 26 |
| Fractal Blades | 19 | 28 |
| Groovy Mango | 16 | 24 |
| Marionette Ravager | 23 | 25 |
| Needlessly Large Spoon | 24 | 21 |
| Phantom Sickle | 19 | 21 |
| Soulcursed Scythe | 24 | 19 |
| Toxic Toad | 17 | 19 |
| Toxin Tooth | 20 | 22 |
| Chicken Leg of Doom | 8 | 15 |
| Sunshine Shiv | 22 | 7 |
| Toy Knife | 19 | 11 |

Overall clears rise from **1,396 to 1,423 out of 3,216 per version**. Several previously weak twin/volley daggers improve. Fractal leads this top-row fixture (28/48), followed by Evergreen (26/48); this does not prove universal superiority because the test always gives Fractal access to its inner bolts. Source-backed weak novelty weapons lose old custom advantages: Sunshine loses its dungeon multiplier and Toy loses its resource/protection loop. Chicken loses permanent HP farming but gains its actual attack profile, improving short fights instead.

Soulcursed Scythe loses standalone clears (24 → 19), reflecting a much slower heavy weapon that now benefits from cloak synergy. Its final 2.4s cloak window was strengthened from the first trial's +20% to +50% primary to better express its source scythe mode. The full Vampire set remains viable but slightly below the prior custom recipe in the seeded set fixture. Chain also falls 23 → 20 while keeping the requested bleed ceiling and gaining bounded Rev Up. Those are trade-offs to watch in playtesting; this pass does not claim equal power or final item/class balance.

The [two existing ST set comparison](dagger-set-benchmark.json), generated by `scripts/benchmark-dagger-sets.cjs`, adds **280 fights** across all 35 bosses, two support levels and both versions. Vampire Rogue clears 51 → 48 out of 70; Skuld clears 38 → 40. Non-dagger set pieces retain their existing recipes and thresholds.

The individual benchmark samples eight of 35 bosses; the set benchmark covers all 35 for two sets. Neither searches optimal builds, simulates full-run acquisition/economy, tests every possible ring/upgrade combination or supplies the missing armor/ability/ring members of other ST sets. Slower weapons can interact less favorably with class activation counters; preserving the ordinary tiered controls does not eliminate that design constraint. Partner, duplicate, timing and saving behavior have separate targeted tests.
