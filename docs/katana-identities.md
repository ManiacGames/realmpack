# UT/ST katana identities — 0.37.0

All **84 imported katana entries** are covered: **69 regular/historical profiles (68 names)** and **15 Shiny variants**. Source game-data was inspected on 2026-10-24. The [source-facts file](katana-source-facts.json) retains projectile/subattack, equipment-stat, burst and proc data for every entry. Per-item source links appear below. These profiles supersede the older generic katana recipes and Socket Blade profile.

## Damage and cadence

Normal primary damage uses the average active source projectile budget divided by 7.5. Base cadence is 1.67s divided by the fastest damaging subattack rate. Zero-damage helpers do not count as attacks or determine cadence. Independent channels retain their source rate ratios through fractional firing phases; all open together, so opening volleys can exceed the displayed average. Source subattacks override misleading top-level or tooltip values (notably Rift Rippers has four actual projectiles, not two).

Projectiles divide one primary budget. Flat power, class progress, weapon events and enchantment triggers apply once per volley. Only ArmorPiercing components bypass ward; MultiHit and PassesCover alone do not. Returning projectiles split their budget outward/return, 0.35s apart. Delayed deliveries require a packed source, remain within the same enemy wave and share a 48-entry queue. Neither returns nor delayed hits create another item activation.

RealmPack has no manual aiming or movable enemies. Top-row placement stands in for proximity: Fiery side arcs and Bloodbath’s slow piercing splatters connect only there. Void/Socket have 125% primary damage in the top row and 65% elsewhere, retaining Socket’s existing proximity convention. This is an explicit tactical translation, not literal RotMG collision/range simulation. Source zero initial speed is not zero effective range: these blades accelerate later.

Fiery’s average full-position budget is deliberately reduced to 30; Winter’s Dire Kiss is tuned to 24 per slash to keep their multi-channel/burst attacks bounded at RealmPack's timescale. Other weapon budgets follow the source formula, including intentionally weak novelty profiles.

## Signature mechanics and trade-offs

| Family | RealmPack behavior |
| --- | --- |
| Ray Katana | Its primary remains an ordinary fixed-damage shot. On hit, four 2-damage beams bypass ward, with a shared 1s lock across copies/Shiny. Each 25 current block above 25 adds one beam, capped at four extra beams (16 total beam damage). Block is the explicit DEF proxy and is not spent; extra beams do not create class/enchantment activations. |
| Doku No Ken | Current Doku applies 4 poison on a shared 3s family lock; Venerable applies 6, translating the source 1,000/1,500 grenade budgets. Existing poison cap and decay apply. The historical `wiki_53189` version retains its lower primary and has no grenade; same-name versions are not collapsed. A capped poison pool is not reduced or refreshed by a failed addition. |
| Fire / Neo Fire Blade | A 4-burn burst on a shared 3s family lock. The source uses the same poison-grenade activation with fire coloring; burn is the explicit thematic adaptation. This family has a 24-stack ceiling and leaves higher existing burn untouched. Neo Fire retains its faster source cadence. |
| Bloodbath Blade | Returning main blade plus a slower three-projectile piercing splatter, connecting in the top row. Own primary gains 4% at each HP threshold from 95% down through 5%, up to +40%. While packed in combat, healing is 10% lower (negative VIT adaptation). Firing further halves received healing for 1.5s, refreshing without stacking; combined multiplier 45%. The reduction includes additive consumable healing. This deliberately softens the source Sick effect rather than permanently forbidding all healing. It does not drain health or grant life steal, and the low-HP damage boost applies to this weapon, not every packed item. |
| Blood Siphoning / Kyuuketsuki Hitogoroshi | Slow returning heavy slash and source-backed bleed: 2 per volley, building only to 6. Higher existing bleed is neither lowered nor refreshed. No life stealing inferred from the name. |
| Tools of the Tarnished / Blood Ritual Tools | Rapid ordinary sickle plus slower piercing hammer (1.5 versus 0.33 source rates). Own base cooldown is multiplied by 1.25; the strongest packed tiered vitality ring grants up to +40% own recharge at T6. Duplicates/stash do not count. This bounded ring proxy translates the relative DEX penalty/VIT conversion; RealmPack has no literal character VIT/DEX stat conversion. The weapon does not consume HP. |
| Fiery Katana | The central shot keeps its independent 1.0/1.4 firing ratio. Twin side arcs fire three times, then recover: 1.2s base, 1s final minimum. Side arcs require the top row; their shared counter continues even if they miss due to position. Only side arcs pause; the central channel and whole-weapon cooldown continue. The displayed average assumes three side volleys per four firing beats. Recharge modifiers affect recovery with a 1s side floor, so extreme haste can make side volleys proportionally less frequent. No burning inferred from flavor. |
| Iceborn Arsenal | Two ordinary slashes at 0.8 source rate and three piercing spinners at 0.2, retaining their independent channel ratios. No invented freezing or extra defensive stat. |
| Void / Socket Blade | Heavy delayed strikes: 1.25s / 1.181s delivery delay, respectively, plus slow source cadence and a negative-DEX recharge adaptation. Their damage is ordinary and does not strip ward. Delays cannot cross waves and disappear with a stashed source. The displayed primary is modified by top-row proximity before delivery. |
| Valor / Sovereign Cinder-Blade | Slow heavy strike, positive SPD cadence adaptation, and combat ATT cost. Own primary is 10% lower. Firing reduces other packed weapons’ primary damage by 10% for 1s; refreshes without stacking. Own attacks are penalized once, not twice. No HP, armor or incoming-damage penalty is invented. |
| Winter’s Dire Kiss | Four piercing slashes per burst, then 1.4s base recovery; final recovery minimum 0.6s. The recovery floor does not constrain within-burst attacks. SPD increases own base cadence. No chill inferred from the name. |
| Brambletooth / Rift Rippers | Returning multi-blade patterns. Rift Rippers preserves its four actual shots across two paired channels and gains 1 mana per volley from WIS; the return splits its existing damage budget. |
| Burial / Reikoku / Thunder Mallet | Source-backed full ward bypass. Burial preserves two crossing blades; Reikoku and Thunder Mallet share their matching twin profile. |
| Pool Noodle | Twin blades plus an 8-damage water burst, at most once per 3s across copies. Environmental fire extinguishing is not represented. |
| Legions Odachi / Ritual Khopesh | Only listed packed MotMG stat amulets enable Odachi’s +20% own primary. Khopesh’s listed Syndicate rings give +10/15/20%; strongest partner only. Stash and unrelated amulets do not count. |
| Novelty weapons | Useless/Arbiter/Krathana/Good Fortune retain weak source budgets. Blade of Ages has a 167s cooldown and cannot fire within the 150s battle limit; Blade of Blooming has a very large strike with a 16.7s delay. Their names do not grant protection, rewards or guaranteed special attacks. |

Simple/reskin profiles preserve their actual damage/cadence: Celestial, Arashi, Snowflake and Sweettreats share one profile; Hero’s Katana, Dynamite, Floral Edge, Legion Elite, Retrowinds and Shining share another. Historical Sullen remains distinct. Bunny/Hookblade/Tachi curve geometry is not turned into an extra return unless their raw projectile actually has Boomerang. Source names/flavor alone never create burning, blindness, a phoenix rescue, life steal or status consumption.

Positive DEX/SPD changes own base recharge, ATT changes own primary, WIS grants 1 mana per volley, and positive VIT heals 1 with a shared per-identity lock. These are existing RealmPack stat conventions, not literal RotMG stat values. Shiny copies retain the same identity, with the established rounded +5% primary budget and 5% faster base cadence; shared locks and recovery minimums stay bounded. Saved enchantments/upgrades, all non-recipe item fields, acquisition rules, prices, IDs, artwork, footprints, compatibility and existing set memberships remain unchanged. This weapon pass does not introduce the remaining ST families’ armor/ability set bonuses.

## Every regular/historical profile

Damage below is the unmodified average/full-position primary budget. Class, partner, enchantment, fatigue, low-HP, event, proximity and secondary-proc effects are separate. Compact numeric summaries and full rules appear in the catalogue; live inspection shows charges, fatigue, side recovery, vitality conversion and beam count.

| Item | ID | Damage | Base cooldown | Identity | Source |
| --- | --- | ---: | ---: | --- | --- |
| Acrobat's Edge | wiki_52254 | 26 | 1.52s | Steady katana | [data](https://realm.wiki/item?id=52254) |
| Arashi | wiki_14414 | 29 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=14414) |
| Arbiter's Wrath | wiki_3310 | 3 | 3.34s | Steady katana | [data](https://realm.wiki/item?id=3310) |
| Aspirant's Blade | wiki_17711 | 19 | 1.39s | Steady katana | [data](https://realm.wiki/item?id=17711) |
| Aurora Tachi | wiki_26232 | 29 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=26232) |
| Blade of Ages | wiki_1399 | 133 | 167s | Steady katana | [data](https://realm.wiki/item?id=1399) |
| Blade of Blooming | wiki_37682 | 267 | 16.7s | Steady katana | [data](https://realm.wiki/item?id=37682) |
| Blade of the Assailant | wiki_26100 | 21 | 1.34s | Steady katana | [data](https://realm.wiki/item?id=26100) |
| Blood Ritual Tools | wiki_42294 | 19 | 1.11s | Vitality-for-dexterity tools | [data](https://realm.wiki/item?id=42294) |
| Blood Siphoning Katana | wiki_42284 | 64 | 4.17s | Returning blades | [data](https://realm.wiki/item?id=42284) |
| Bloodbath Blade | wiki_20882 | 27 | 1.19s | Bloodbath bargain | [data](https://realm.wiki/item?id=20882) |
| Brambletooth Tachi | wiki_25590 | 24 | 1.19s | Returning blades | [data](https://realm.wiki/item?id=25590) |
| Bunny Ear Tachi | wiki_1461 | 27 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=1461) |
| Burial Blades | wiki_17563 | 27 | 1.67s | Piercing blades | [data](https://realm.wiki/item?id=17563) |
| Candy Katana | wiki_12164 | 20 | 1.34s | Steady katana | [data](https://realm.wiki/item?id=12164) |
| Celestial Blade | wiki_30053 | 29 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=30053) |
| Corrupted Cleaver | wiki_3860 | 22 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=3860) |
| Diamond-Bladed Katana | wiki_8842 | 22 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=8842) |
| Doku No Ken | wiki_3292 | 19 | 1.39s | Venom burst | [data](https://realm.wiki/item?id=3292) |
| Doku No Ken | wiki_53189 | 18 | 1.39s | Steady katana | [data](https://realm.wiki/item?id=53189) |
| Dynamite | wiki_42101 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=42101) |
| Enforcer | wiki_28846 | 33 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=28846) |
| Fiery Katana | wiki_14379 | 30 | 1.19s | Three-beat fiery arcs | [data](https://realm.wiki/item?id=14379) |
| Fire Blade | wiki_25693 | 19 | 1.39s | Ember burst | [data](https://realm.wiki/item?id=25693) |
| Floral Edge Katana | wiki_57118 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=57118) |
| Heartseeker Katana | wiki_34335 | 21 | 1.5s | Steady katana | [data](https://realm.wiki/item?id=34335) |
| Hero's Katana | wiki_24970 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=24970) |
| Hero's Tachi | wiki_24976 | 31 | 1.76s | Steady katana | [data](https://realm.wiki/item?id=24976) |
| Hookblade Tachi | wiki_53820 | 28 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=53820) |
| Iceborn Arsenal | wiki_26573 | 38 | 2.09s | Independent blade rhythms | [data](https://realm.wiki/item?id=26573) |
| Katana of Good Fortune | wiki_29720 | 8 | 1.19s | Steady katana | [data](https://realm.wiki/item?id=29720) |
| Kazekiri | wiki_8254 | 31 | 1.96s | Steady katana | [data](https://realm.wiki/item?id=8254) |
| Kiritsukeru | wiki_21218 | 35 | 2.39s | Steady katana | [data](https://realm.wiki/item?id=21218) |
| Krathana | wiki_23332 | 5 | 1.39s | Steady katana | [data](https://realm.wiki/item?id=23332) |
| Kyuuketsuki Hitogoroshi | wiki_41742 | 64 | 4.17s | Returning blades | [data](https://realm.wiki/item?id=41742) |
| Legion Elite Katana | wiki_41822 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=41822) |
| Legions Odachi | wiki_3787 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=3787) |
| Moonbeam Blade | wiki_25694 | 21 | 1.5s | Steady katana | [data](https://realm.wiki/item?id=25694) |
| Neo Fire Blade | wiki_56455 | 19 | 1.26s | Ember burst | [data](https://realm.wiki/item?id=56455) |
| Neo Moonbeam Blade | wiki_56456 | 24 | 1.5s | Steady katana | [data](https://realm.wiki/item?id=56456) |
| Pool Noodle | wiki_28463 | 31 | 1.76s | Steady katana | [data](https://realm.wiki/item?id=28463) |
| Quartz Cutter | wiki_19260 | 35 | 2.09s | Steady katana | [data](https://realm.wiki/item?id=19260) |
| Ray Katana | wiki_2325 | 21 | 1.5s | Defense-scaled sunbeam | [data](https://realm.wiki/item?id=2325) |
| Reikoku | wiki_7757 | 23 | 1.67s | Piercing blades | [data](https://realm.wiki/item?id=7757) |
| Retrowinds Katana | wiki_63872 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=63872) |
| Rift Rippers | wiki_47977 | 44 | 2.09s | Returning blades | [data](https://realm.wiki/item?id=47977) |
| Ritual Khopesh | wiki_14452 | 28 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=14452) |
| Saif of the Deep | wiki_14866 | 41 | 2.39s | Steady katana | [data](https://realm.wiki/item?id=14866) |
| Salju | wiki_9087 | 22 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=9087) |
| Sawblade Katana | wiki_12072 | 23 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=12072) |
| Shakujo | wiki_26729 | 24 | 1.11s | Winter burst | [data](https://realm.wiki/item?id=26729) |
| Shining Blade | wiki_2011 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=2011) |
| Skybound Blade | wiki_14497 | 23 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=14497) |
| Snowflake Blade | wiki_41656 | 29 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=41656) |
| Socket Blade | wiki_49471 | 106 | 6.19s | Delayed heavy slash | [data](https://realm.wiki/item?id=49471) |
| Sovereign Cinder-Blade | wiki_7323 | 69 | 3.37s | Heavy taxing blade | [data](https://realm.wiki/item?id=7323) |
| Sullen Blade | wiki_53195 | 28 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=53195) |
| Sweetheart Taichi | wiki_26750 | 27 | 1.76s | Steady katana | [data](https://realm.wiki/item?id=26750) |
| Sweettreats Katana | wiki_63775 | 29 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=63775) |
| Thunder Mallet | wiki_52039 | 23 | 1.67s | Piercing blades | [data](https://realm.wiki/item?id=52039) |
| Tools of the Tarnished | wiki_23898 | 19 | 1.11s | Vitality-for-dexterity tools | [data](https://realm.wiki/item?id=23898) |
| Tsunami | wiki_14413 | 25 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=14413) |
| Useless Katana | wiki_2324 | 3 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=2324) |
| Valor | wiki_14464 | 69 | 3.37s | Heavy taxing blade | [data](https://realm.wiki/item?id=14464) |
| Venerable Doku No Ken | wiki_38587 | 21 | 1.39s | Venom burst | [data](https://realm.wiki/item?id=38587) |
| Void Blade | wiki_29037 | 91 | 6.19s | Delayed heavy slash | [data](https://realm.wiki/item?id=29037) |
| Void Tachi | wiki_41788 | 31 | 1.6s | Steady katana | [data](https://realm.wiki/item?id=41788) |
| Winter's Dire Kiss | wiki_42353 | 24 | 1.14s | Winter burst | [data](https://realm.wiki/item?id=42353) |
| Yuki | wiki_6863 | 23 | 1.67s | Steady katana | [data](https://realm.wiki/item?id=6863) |

## Validation and comparative balance

The katana regression suite protects **every non-katana definition** with a pre-pass SHA-256 snapshot. It checks all 84 regular/historical/Shiny entries, actual source projectile counts, reskin equality, single-budget piercing/returns, wind-up delivery, source removal/wave boundaries, independent hammer/spinner/side channels, recovery-only floors, grenade/beam locks and caps, Bloodbath thresholds/healing trade-offs, Valor fatigue and expiry, vitality conversion, listed partners, saved upgrades and battle reset. It also runs 252 legal katana/class/version combat trials. A separate audit verifies every non-recipe field of all 84 entries against the pre-pass snapshot.

The [tiered class comparison](katana-class-regression.json) uses identical legal fixtures across 19 classes and all 35 bosses, three support variants: all 1,995 fight records are unchanged. The [katana comparison](katana-benchmark.json) covers all 69 regular/historical profiles across Ninja/Samurai/Kensei, eight boss difficulty bands and two native support levels: 3,312 fights per version, 6,624 total. Fixed builds pack the tested katana first in the top row, with a second native tiered katana, native ability/armor, magic ring, three Health Potions, +50 base HP and +8% relic recharge; seed 123456, Adventurer depth 20, 0.05s tick. No enchantments, infused gear, special partner rings or optimized builds. This does not test full-run economy, manual aiming, every upgrade stack or the vitality-ring alternative to the benchmark’s magic ring.

The fixed katana fixtures record **1,882/3,312 wins before and 1,864/3,312 after**. Each regular profile has 48 fights. Fiery improves 27→32, Ray and Rift Rippers 27→30, Bloodbath 29→31, Winter 27→31, Brambletooth and Venerable Doku 27→32. Tools, Valor and historical Doku remain 27→27; current Doku improves 27→28. Expected novelty reductions include Ages 27→14, Useless 27→16, Arbiter 27→17, Good Fortune/Krathana 27→19 and Blooming 27→21. Void 27→24 and Socket 28→26 remain playtesting watch points: their heavy first impact arrives late in short fights. Snowflake 33→28 now matches its actual Celestial reskin rather than retaining a stronger mismatched placeholder effect. These samples are not universal weapon rankings.

Browser checks cover all 84 entries in item/reward/shop/catalogue inspection at desktop and large-text phone sizes, plus real offer cards at desktop/phone/short-landscape sizes: 684 views without reported layout or script errors. Catalogue checks cover 7,176 views; standard desktop inspection remains one panel with no local overflow. A real-timer mixed-katana/native-ability smoke check at 4× exercises side bursts, beams, wind-ups, low-HP damage and healing penalties with bounded queues, no page scrolling and no runtime errors. This is not an FPS benchmark.

Reproduce with `node game/tests/test-katana-identities.cjs`, `node scripts/benchmark-katanas.cjs --baseline-root <0.36.0-checkout> --output docs/katana-benchmark.json` and `scripts/check-katana-*.cjs` using Playwright and `REALMPACK_CHROME`.

Final validation passed all 28 regression suites and syntax checks across 64 source/test/audit files. The final tiered run reproduces all 1,995 pre-pass records.
