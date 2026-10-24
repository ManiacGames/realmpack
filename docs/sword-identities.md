# Sword identities — 0.33.0

This pass covers every imported UT/ST entry in the sword family: **81 distinct weapon names, 83 non-Shiny definitions (including two retro duplicates), 16 Shiny definitions and eight internal enchantment objects**. Flails share this inventory family. All 99 usable weapon definitions receive explicit profiles; the eight internal objects become unobtainable in new gameplay and remain inspectable and usable in existing saves. No item IDs, sprites, footprints, tiered sword recipes or non-sword definitions change.

## Source and adaptation rules

The complete [source facts](sword-source-facts.json) record the inspected Realm.wiki game-data on 2026-10-24, including projectile damage, subattack cadence, piercing, equip stats and the exact MotMG amulet IDs. The profile table below links every non-Shiny definition, including helper objects. Shiny variants inherit their base mechanics with the existing RealmPack +5% rounded primary / 5% shorter cooldown rule. Retro Cutlass retains its negative DEF adaptation; retro Demon Blade shares its current weapon pattern.

This game has one stationary enemy, no cursor aiming, no movement, no multiple enemy targets and no character DEF/ATT/VIT stats. These are deliberate numerical adaptations, not copied DPS or promises of exact RotMG performance:

- Ordinary sword/volley budgets use average source projectile damage divided by eight. Base cooldown is 2.46s divided by the source firing rate. Multi-shot totals count the source's actual subattacks, without multiplying flat power, enchantments, ability counts or weapon events per pellet.
- Ancient Stone variants remain slow heavy hits; Apocalypse Feather and Rainbow's End stay weak novelty weapons. The four imported Long Sword rarity names retain their low Long Sword damage instead of receiving invented high-end UT powers. Cosmetic variants share the underlying weapon behavior. Fire, ice, acid, healing and poison are not inferred from flavor text.
- Short spread volleys (Demon Blade, Illumination, Pixie and its variants) use the existing top-row 125% / other-row 65% rule. Flails and Icebreaker instead keep their head damage in every row and add short segments only from the top row. Range and piercing multiple targets otherwise have no direct equivalent. Accelerating projectile range numbers from the tooltip are not treated as literal reach in RealmPack.
- Returning attacks divide their budget between the outgoing and returning portions; they do not double it. Returns arrive after 0.35s, preserve piercing, require the source still packed, and cannot spill into another enemy wave. At most 32 pending segments exist.
- Divinity, Eternal Echo and Excubicur use a tuned 68-damage / 4.10s budget with 65% assigned to a ward-piercing beam. All regular/Shiny/cosmetic versions share a one-second beam lock. A volley still spends its ordinary 35% portion if the beam channel is unavailable. This bounds beam stacking in a backpack with several swords.
- Arcane Rapier fires its returning main slash at its actual main-subattack cadence, rather than mistaking the tooltip's 20% lunge rate for the whole sword. Every fifth activation adds the piercing lunge. Heartsteel adds two side blades every third activation. General's Arsenal cycles one slash followed by three twin stabs. Their displayed damage is the cycle average; individual volleys vary.
- General's 8% arrow chance becomes +8 arrow charge per successful volley, firing a 19-damage arrow at 100 charge and retaining the remainder. It is counted once per volley, with a shared 0.4s base-identity lock. No new combat randomness is introduced.
- Seismic/Egg impact bursts deal 12 additional damage with a shared two-second identity lock; Umbrella's water burst deals eight with a three-second lock. Bursts do not create extra weapon activations. Extinguishing environmental fires is not modeled because RealmPack has no such environment.
- Fury Flail, Jagged Hatchet and Neo Gaseous Glaive apply the source-backed bleeding effect through RealmPack's existing stack/expiry limits. Ordinary Gaseous Glaive remains a Cutlass reskin without invented poison. Sword of Illumination does not gain burn, Enchanted Ice Blade does not gain chill, and Blood Axe does not gain invented lifesteal.
- Positive ATT becomes +2% own primary damage per source point. Positive DEF becomes one or two block on successful attack with a shared four-second identity lock. VIT becomes one healing on attack with a shared 3–6s identity lock, respecting existing healing fatigue. These effects represent equipped stats; they are not claims of source on-hit procs. SPD is not translated into global haste: there is no movement to accelerate.
- Keychain Cutlass grants +6 maximum mana without refilling it. Damnation lowers maximum HP by 12, deduplicated by base identity; total negative equipment capacity caps at 40. Existing positive capacity and no-refill/clamp rules remain. The applied penalty also respects the 20-HP floor without allowing equip/remove or save/reload loops to increase base HP. Removing penalty gear increases capacity without healing.
- Damnation's Heavy Conscience becomes 25% less received healing for three seconds after attacking above 99% HP. Attacking below 66% HP grants the existing Armored reduction and +10% weapon damage for six seconds. Timers refresh without stacking, require a packed Damnation for its offensive/healing effects, and reset at encounter setup. It also translates +10 DEF into two block per four seconds; negative movement speed is not modeled. Retro Cutlass translates its -2 DEF into +4% incoming damage while packed; duplicate copies do not stack and the shared penalty caps at 15%.
- Faithful Spatha gains +20% primary with a packed stat amulet listed by its source, including Shiny equivalents. Unrelated amulets and the stash do not count. Gilded Chain Scythe gains +10% / +15% / +20% primary with Sunken Fire Opal Ring / Faded Heart Scarab / Fractured Hannya; the strongest pair wins. These are bounded translations of extra source projectiles, not full copies of their aiming patterns or bullet rates.

The existing Swoll Paladin, Pirate King Warrior and Oryx Awesome set membership and set thresholds remain. Legacy Pixie does not count as a current Swoll piece. This pass reworks **swords**; it does not invent new full-set bonuses for the other ST armors, abilities or rings, or recreate Aspirant artifact inscription. Existing upgrades and enchantments continue to apply.

## Complete profile table

Damage is the displayed base budget before class, placement, upgrades and temporary effects. Returning pieces share that budget. Beam budgets and bursts are explicitly bounded as described above.

| Definition / source | Base damage | Cooldown | Behavior |
| --- | ---: | ---: | --- |
| [Acidic Guardian Enchantment](https://realm.wiki/item?id=56474) · wiki_56474 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Acidic Slasher](https://realm.wiki/item?id=25692) · wiki_25692 | 47 | 4.10s | A single sword strike. |
| [Ancient Stone Sword](https://realm.wiki/item?id=3077) · wiki_3077 | 47 | 4.10s | A single sword strike. |
| [Apocalypse Feather](https://realm.wiki/item?id=1705) · wiki_1705 | 4 | 1.23s | A single sword strike. |
| [Arcane Rapier](https://realm.wiki/item?id=9659) · wiki_9659 | 25 | 2.46s | A returning slash; every fifth attack adds a piercing lunge. Half the slash budget returns after 0.35s; returns cannot cross waves. |
| [Artificial Core Enchantment](https://realm.wiki/item?id=13867) · wiki_13867 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Aspirant's Sword](https://realm.wiki/item?id=17706) · wiki_17706 | 29 | 2.24s | A single sword strike. |
| [Atavistic Soul Sabre](https://realm.wiki/item?id=49470) · wiki_49470 | 56 | 4.10s | A single sword strike. |
| [Barnacle Basher](https://realm.wiki/item?id=17561) · wiki_17561 | 87 | 6.15s | The head hits from any row; shorter chain segments hit only from the top row. Damage shown is the full top-row budget before modifiers. |
| [Beach Umbrella](https://realm.wiki/item?id=28461) · wiki_28461 | 66 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. An impact burst deals 8 extra damage, at most once every 3s per base identity. Damage shown is the full top-row budget before modifiers. |
| [Blacksmith Hammer](https://realm.wiki/item?id=42097) · wiki_42097 | 33 | 2.46s | A single sword strike. |
| [Blade of Eternal Rebirth](https://realm.wiki/item?id=7325) · wiki_7325 | 36 | 2.46s | A single sword strike. |
| [Blood Axe](https://realm.wiki/item?id=42316) · wiki_42316 | 27 | 2.05s | A single sword strike. |
| [Bone Claws Enchantment](https://realm.wiki/item?id=13877) · wiki_13877 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Cheerful Chipper](https://realm.wiki/item?id=12163) · wiki_12163 | 51 | 3.07s | 3 projectiles share one damage budget. |
| [Chocsicle](https://realm.wiki/item?id=28479) · wiki_28479 | 26 | 1.89s | A single sword strike. |
| [Crystal Sword](https://realm.wiki/item?id=2563) · wiki_2563 | 26 | 2.46s | A single sword strike. |
| [Dalvar's Battle Axe](https://realm.wiki/item?id=22443) · wiki_22443 | 27 | 2.05s | A single sword strike. |
| [Damnation](https://realm.wiki/item?id=23732) · wiki_23732 | 193 | 12.30s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. Gain 2 block when attacking, at most once every 4s per base identity (DEF adaptation). -12 maximum HP while packed. Attacking above 99% HP reduces received healing by 25% for 3s. Attacking below 66% HP grants Armored and +10% weapon damage for 6s; buffs refresh without stacking. Damage shown is the full top-row budget before modifiers. |
| [Demon Blade](https://realm.wiki/item?id=3073) · wiki_3073 | 41 | 2.46s | 2 projectiles share one damage budget. Top row: 125% damage; elsewhere: 65%. |
| [Demon Blade](https://realm.wiki/item?id=53199) · wiki_53199 | 41 | 2.46s | 2 projectiles share one damage budget. Top row: 125% damage; elsewhere: 65%. |
| [Divinity](https://realm.wiki/item?id=28851) · wiki_28851 | 68 | 4.10s | 65% of the displayed damage is an instant ward-piercing beam. All three beam identities share a 1s beam lock. |
| [Doctor Swordsworth](https://realm.wiki/item?id=3295) · wiki_3295 | 21 | 7.45s | 3 projectiles share one damage budget. |
| [Egg Basher](https://realm.wiki/item?id=1460) · wiki_1460 | 63 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. An impact burst deals 12 extra damage, at most once every 2s per base identity. Damage shown is the full top-row budget before modifiers. |
| [Enchanted Ice Blade](https://realm.wiki/item?id=5846) · wiki_5846 | 26 | 2.46s | A single sword strike. |
| [Eternal Echo](https://realm.wiki/item?id=13265) · wiki_13265 | 68 | 4.10s | 65% of the displayed damage is an instant ward-piercing beam. All three beam identities share a 1s beam lock. |
| [Eternal Graved Great Sword](https://realm.wiki/item?id=5034) · wiki_5034 | 47 | 4.10s | A single sword strike. |
| [Excubicur](https://realm.wiki/item?id=55416) · wiki_55416 | 68 | 4.10s | 65% of the displayed damage is an instant ward-piercing beam. All three beam identities share a 1s beam lock. |
| [Faithful Spatha](https://realm.wiki/item?id=3782) · wiki_3782 | 33 | 2.46s | A single sword strike. With a packed MotMG stat amulet: +20% primary damage, translating two additional shots. Other amulets do not trigger it. |
| [Fallen One's Blade](https://realm.wiki/item?id=17387) · wiki_17387 | 34 | 2.46s | 2 projectiles share one damage budget. |
| [FFabulous FFlail](https://realm.wiki/item?id=37678) · wiki_37678 | 83 | 6.15s | 2 projectiles share one damage budget. |
| [Fractured Blade Enchantment](https://realm.wiki/item?id=13879) · wiki_13879 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Frostbite](https://realm.wiki/item?id=9612) · wiki_9612 | 30 | 2.46s | A single sword strike. |
| [Fury Flail](https://realm.wiki/item?id=65282) · wiki_65282 | 54 | 4.10s | The head hits from any row; shorter chain segments hit only from the top row. Applies 3 bleed per attack, respecting the shared bleed cap. Damage shown is the full top-row budget before modifiers. |
| [Gaseous Glaive](https://realm.wiki/item?id=25691) · wiki_25691 | 26 | 1.89s | A single sword strike. |
| [General's Arsenal](https://realm.wiki/item?id=48081) · wiki_48081 | 21 | 1.23s | Cycles one slash and three twin stabs. Every 100 arrow charge fires an arrow; +8 per successful volley. Gain 2 block when attacking, at most once every 4s per base identity (DEF adaptation). |
| [Gilded Chain Scythe](https://realm.wiki/item?id=14451) · wiki_14451 | 64 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. Packed Opal Ring / Heart Scarab / Hannya adds +10% / +15% / +20% primary damage. Strongest matching partner only. Damage shown is the full top-row budget before modifiers. |
| [Hammer Sword](https://realm.wiki/item?id=12071) · wiki_12071 | 31 | 2.46s | A single sword strike. Heal 1 HP when attacking, at most once every 6s per base identity (VIT adaptation). |
| [Heartsteel Claymore](https://realm.wiki/item?id=26564) · wiki_26564 | 58 | 4.10s | A heavy strike; every third attack adds two side blades. |
| [Hellfire Broadsword](https://realm.wiki/item?id=25745) · wiki_25745 | 41 | 2.46s | 4 projectiles share one damage budget. Top row: 125% damage; elsewhere: 65%. |
| [Henchman's Claymore](https://realm.wiki/item?id=26095) · wiki_26095 | 28 | 2.24s | All primary damage bypasses enemy ward. 3 projectiles share one damage budget. |
| [Hero's Flail](https://realm.wiki/item?id=24975) · wiki_24975 | 66 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. Damage shown is the full top-row budget before modifiers. |
| [Hero's Sword](https://realm.wiki/item?id=24969) · wiki_24969 | 33 | 2.46s | A single sword strike. |
| [Icebreaker Maul](https://realm.wiki/item?id=42355) · wiki_42355 | 59 | 6.15s | All primary damage bypasses enemy ward. 3 projectiles share one damage budget. Its primary damage gains +10% (ATT adaptation). |
| [Indomptable](https://realm.wiki/item?id=32700) · wiki_32700 | 72 | 7.45s | A single sword strike. |
| [Jagged Hatchet](https://realm.wiki/item?id=32442) · wiki_32442 | 23 | 2.46s | A single sword strike. Applies 2 bleed per attack, respecting the shared bleed cap. |
| [Keychain Cutlass](https://realm.wiki/item?id=19212) · wiki_19212 | 31 | 2.46s | A single sword strike. Heal 1 HP when attacking, at most once every 3s per base identity (VIT adaptation). Gain 1 block when attacking, at most once every 4s per base identity (DEF adaptation). +6 maximum mana while packed; equipping does not refill mana. |
| [Khopesh](https://realm.wiki/item?id=2010) · wiki_2010 | 33 | 2.46s | A single sword strike. |
| [Lament of the Frozen Prisoner](https://realm.wiki/item?id=26229) · wiki_26229 | 62 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. Damage shown is the full top-row budget before modifiers. |
| [Legacy Pixie-Enchanted Sword](https://realm.wiki/item?id=9063) · wiki_9063 | 41 | 2.46s | 4 projectiles share one damage budget. Top row: 125% damage; elsewhere: 65%. |
| [Legion Elite Sword](https://realm.wiki/item?id=41820) · wiki_41820 | 33 | 2.46s | A single sword strike. |
| [Lion Tamer](https://realm.wiki/item?id=52255) · wiki_52255 | 60 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. Gain 1 block when attacking, at most once every 4s per base identity (DEF adaptation). Damage shown is the full top-row budget before modifiers. |
| [Long Sword 1Rarity](https://realm.wiki/item?id=39345) · wiki_39345 | 12 | 2.46s | A single sword strike. |
| [Long Sword 2Rarity](https://realm.wiki/item?id=39346) · wiki_39346 | 12 | 2.46s | A single sword strike. |
| [Long Sword 3Rarity](https://realm.wiki/item?id=39347) · wiki_39347 | 12 | 2.46s | A single sword strike. |
| [Long Sword 4Rarity](https://realm.wiki/item?id=39348) · wiki_39348 | 12 | 2.46s | A single sword strike. |
| [Lovestruck Yoyo](https://realm.wiki/item?id=26749) · wiki_26749 | 60 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. Damage shown is the full top-row budget before modifiers. |
| [MMace MMurderer](https://realm.wiki/item?id=1395) · wiki_1395 | 69 | 6.15s | 2 projectiles share one damage budget. |
| [Molecular Blade Enchantment](https://realm.wiki/item?id=13869) · wiki_13869 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Neo Acidic Guardian Enchantment](https://realm.wiki/item?id=56475) · wiki_56475 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Neo Acidic Slasher](https://realm.wiki/item?id=56454) · wiki_56454 | 84 | 6.15s | A single sword strike. |
| [Neo Gaseous Glaive](https://realm.wiki/item?id=56453) · wiki_56453 | 26 | 1.89s | A single sword strike. Applies 3 bleed per attack, respecting the shared bleed cap. |
| [Nutrient Rich Carrot Blade](https://realm.wiki/item?id=41667) · wiki_41667 | 34 | 2.46s | 2 projectiles share one damage budget. |
| [Oryx's Greatsword](https://realm.wiki/item?id=23521) · wiki_23521 | 25 | 2.05s | All primary damage bypasses enemy ward. |
| [Petal Strike Sword](https://realm.wiki/item?id=57116) · wiki_57116 | 33 | 2.46s | A single sword strike. |
| [Pirate King's Cutlass](https://realm.wiki/item?id=3291) · wiki_3291 | 26 | 1.89s | A single sword strike. |
| [Pirate King's Cutlass](https://realm.wiki/item?id=53188) · wiki_53188 | 26 | 1.89s | A single sword strike. While packed, incoming direct damage +4% (negative DEF adaptation). Duplicate copies do not stack. |
| [Pirate's Artillery](https://realm.wiki/item?id=49640) · wiki_49640 | 147 | 9.84s | A very slow cannonball with eight fragments. Top row: 125% damage; elsewhere: 65%. |
| [Pixie-Enchanted Sword](https://realm.wiki/item?id=1189) · wiki_1189 | 41 | 2.46s | 4 projectiles share one damage budget. Top row: 125% damage; elsewhere: 65%. |
| [Razor Shards Enchantment](https://realm.wiki/item?id=14922) · wiki_14922 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Retrowinds Sword](https://realm.wiki/item?id=63871) · wiki_63871 | 33 | 2.46s | A single sword strike. |
| [Saint Nicolas' Blade](https://realm.wiki/item?id=6862) · wiki_6862 | 31 | 2.46s | A single sword strike. |
| [Savage Claws](https://realm.wiki/item?id=14773) · wiki_14773 | 35 | 3.07s | A single sword strike. |
| [Seismic Flail](https://realm.wiki/item?id=53819) · wiki_53819 | 63 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. An impact burst deals 12 extra damage, at most once every 2s per base identity. Damage shown is the full top-row budget before modifiers. |
| [Silex's Hammer](https://realm.wiki/item?id=23334) · wiki_23334 | 14 | 7.45s | All primary damage bypasses enemy ward. 3 projectiles share one damage budget. |
| [Skull-splitter Sword](https://realm.wiki/item?id=8732) · wiki_8732 | 30 | 2.46s | A single sword strike. |
| [Spectral Sword](https://realm.wiki/item?id=41744) · wiki_41744 | 28 | 2.46s | 2 projectiles share one damage budget. Heal 1 HP when attacking, at most once every 4s per base identity (VIT adaptation). |
| [Spooky Smasher](https://realm.wiki/item?id=1023) · wiki_1023 | 87 | 6.15s | The head hits from any row; shorter chain segments hit only from the top row. Damage shown is the full top-row budget before modifiers. |
| [Stone Guardian Enchantment](https://realm.wiki/item?id=56473) · wiki_56473 | — | — | Internal subattack/enchantment object; no new acquisition. Existing saved copies keep their old behavior. |
| [Swashbuckler's Sickle](https://realm.wiki/item?id=8665) · wiki_8665 | 35 | 3.07s | A single sword strike. |
| [Sweettreats Sword](https://realm.wiki/item?id=63900) · wiki_63900 | 26 | 1.89s | A single sword strike. |
| [Sword of Illumination](https://realm.wiki/item?id=8963) · wiki_8963 | 41 | 2.46s | 2 projectiles share one damage budget. Top row: 125% damage; elsewhere: 65%. |
| [Sword of the Colossus](https://realm.wiki/item?id=596) · wiki_596 | 36 | 2.46s | A single sword strike. |
| [Sword of the Mad God](https://realm.wiki/item?id=8962) · wiki_8962 | 31 | 2.46s | A single sword strike. |
| [Sword of the Rainbow's End](https://realm.wiki/item?id=5707) · wiki_5707 | 4 | 1.64s | A single sword strike. |
| [Sword of the Unending Chaos](https://realm.wiki/item?id=14495) · wiki_14495 | 31 | 2.46s | A single sword strike. Its primary damage gains +4% (ATT adaptation). |
| [The Crimson Blade](https://realm.wiki/item?id=42278) · wiki_42278 | 28 | 2.46s | 2 projectiles share one damage budget. Heal 1 HP when attacking, at most once every 4s per base identity (VIT adaptation). |
| [Unstable Anomaly](https://realm.wiki/item?id=8996) · wiki_8996 | 16 | 9.84s | 10 projectiles share one damage budget. |
| [Venerable Ancient Stone Sword](https://realm.wiki/item?id=38583) · wiki_38583 | 53 | 4.10s | A single sword strike. |
| [Vinesword](https://realm.wiki/item?id=8846) · wiki_8846 | 30 | 2.46s | A single sword strike. |
| [Void Flail](https://realm.wiki/item?id=41775) · wiki_41775 | 66 | 4.92s | The head hits from any row; shorter chain segments hit only from the top row. Half of the budget arrives on the return after 0.35s; returns cannot cross waves. Heal 1 HP when attacking, at most once every 3s per base identity (VIT adaptation). Damage shown is the full top-row budget before modifiers. |

## Validation and balance feedback

`game/tests/test-sword-identities.cjs` verifies coverage, real primary/return/beam damage, one flat-power budget, source-backed effects, proc/partner locks, fractional arrow charge, capacity and threshold behavior, encounter reset and 297 legal class/version combat trials. It also checks that the entire non-sword catalogue matches its pre-pass SHA-256 `ac2b01eb01700aee4be3207a61555d85a004229019ac2476d759c3fdd76f1b0b`. The existing dagger recipe hash remains independently checked.

`REALMPACK_CHROME=/path/to/chrome node scripts/check-swords.cjs` checks all 107 entries in inventory, reward, shop and catalogue inspection at desktop/default and phone/larger-text sizes, follows every generated page, and checks compact sword offers at desktop, phone and short landscape sizes. It rejects clipping, horizontal or vertical overflow, inaccessible actions, raw text tokens and page scrolling. All **868 views / 7,585 inspection pages passed**, including 12 compact offer views. Representative desktop offer and Damnation/Divinity/Rapier detail screens were also visually reviewed. JavaScript syntax and all 25 regression suites passed. A mixed Divinity/flail/Arsenal browser fight ran at 4× speed with live item inspection, bounded returns and no runtime errors or page scrolling.


The preserved ordinary class benchmark matched all **1,995 fight records exactly** (1,600 clears before and after). `scripts/benchmark-swords.cjs` then compared 0.32.0 commit `01edd7ed9b2fb581c6ae2b41b2d38ccb911b869b` with this release across **7,968 fights**: all 83 non-Shiny definitions × three native sword classes × eight representative bosses × two support levels × two versions. The [full report](sword-benchmark.json) includes each item and class result and all build assumptions.

| Example | Before clears / 48 | After clears / 48 |
| --- | ---: | ---: |
| Ancient Stone Sword | 30 | 29 |
| Arcane Rapier | 30 | 28 |
| Damnation | 30 | 30 |
| Divinity | 32 | 31 |
| Fury Flail | 30 | 30 |
| General's Arsenal | 30 | 34 |
| Heartsteel Claymore | 30 | 30 |
| Henchman's Claymore | 30 | 31 |
| Icebreaker Maul | 33 | 26 |
| Oryx's Greatsword | 30 | 30 |
| Sword of the Colossus | 30 | 30 |
| Apocalypse Feather | 30 | 21 |
| Sword of the Rainbow's End | 30 | 20 |
| Silex's Hammer | 30 | 17 |
| Unstable Anomaly | 30 | 17 |

Overall clear count is 2,522 → 2,400 out of 3,984 per version. The intent is distinct source-backed roles, not a blanket buff: many weak novelty and low-tier imported variants lose the old generic UT damage, while real offensive options such as Arsenal and Neo Glaive improve. Divinity, Damnation, Heartsteel and the established set swords remain close in these fixtures. Icebreaker loses seven clears and deserves playtesting: its large slow piercing volley is much less forgiving than the old generic attack, especially for Warrior. This is a known heavy-weapon trade-off, not a claim of equal effectiveness.

The test equips each sword first in the top row, adds one native tiered sword, native tiered ability/armor, a mana ring and three Health Potions, uses two support levels, full equipped health, +50 base HP, +8% recharge, depth 20 and seed 123456 with 0.05s ticks. It covers all three native classes but only eight of the 35 bosses, and does not search optimal builds, test full-run acquisition prices, use upgraded or enchanted gear, complete new ST sets, or include the special Spatha/Syndicate partner rings. Those pairing rules and duplicate/cooldown limits have targeted behavioral tests. These results identify trade-offs; they do not establish a final tier list or equal sword power.
