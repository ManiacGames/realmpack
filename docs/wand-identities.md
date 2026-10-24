# UT/ST wand identities — 0.36.0

All **93 imported wand entries** are covered: **77 regular profiles** and **16 Shiny variants**, including morning stars. Source game-data was inspected on 2026-10-24. The [numerical source facts](wand-source-facts.json) retain projectile/subattack, equipment-stat, burst and proc data for every entry; repeated projectile patterns are preserved, including helper steps. Per-item source links appear below.

## Damage, timing and positioning

Normal primary damage is the average active source projectile budget divided by 8.5; base cadence is 1.76s divided by the fastest damaging subattack rate. Zero-damage helpers do not count as attacks or determine cadence. Mixed-speed channels keep fractional phases: all damaging channels fire at the opening, then retain their source rate ratios. Displayed damage is the average per activation, not a promise that every volley deals the same damage.

Projectiles divide a single budget. Flat power, class progress, weapon events and enchantment triggers apply once per volley. Only ArmorPiercing components bypass ward; MultiHit and PassesCover do not. Returning shots split their budget outward/return, 0.35s apart. Lumiaire retains a 0.6s slow-shot delay. Pending deliveries require a packed source, remain in the same enemy wave and share a 48-entry queue. Fields have their own eight-entry cap; souls share the game's eight-companion cap.

RealmPack has no manual aiming or moving enemies. Top-row placement stands in for proximity: Bulwark/Snowflake/Fortitude primary rings deal 100% there and 40% elsewhere; Earthen Ward/Sweet Desire connect three circling shots there and one elsewhere. Ravenous connects all five projectiles in the top row and only the three longer outer projectiles elsewhere. Lingering projectiles do not repeatedly damage one enemy. These are tactical translations, not a literal bullet or ground collision simulation.

Explicit full-hit budgets replace literal source scaling where that would overpower a single-target encounter: five-channel Hero/Void/North Star/Obsidian/Flip-Flops 26 (Sweet Miracles 24), acid/chocolate volley 28, Earthen/Sweet Desire 32, C.L.A.W./Tormented Shriek 26, Brass Chamberstick 15 and Razorthorn 24 as its two-shot average. Projectile counts still divide these totals.

## Signature mechanics

| Family | RealmPack behavior |
| --- | --- |
| Soul’s Guidance / Scarlet Etched Branch | Each volley adds 15 soul charge; at 100, release a Forgotten Soul. It hits for 4 after 0.4s and exposes for 4s after 5s; expires after 8s. At most two Forgotten Souls across regular/Shiny/reskin copies, with a shared 0.4s release lock. |
| Deliverance | The same charge system releases one Desperate Soul: 13 damage after 0.4s, exposes for 2s after 6s, expires after 10s; shared 0.6s release lock. Both soul families hold a full charge if their family/global companion cap blocks a release. Source 15% chance is translated deterministically; souls create no additional weapon/enchantment activation chain. Souls disappear with their source or wave. Exposure refreshes to the strongest remaining duration, rather than stacking copies. |
| Acidic Aspergillum / Chocolate Ovipositor | Independent morning-star volley creates a pool after 0.4s, dealing 3 damage per second for 3s. One active pool and a shared 2s lock across both reskins. A replacement discards the old pool's unspent damage. This is ordinary field damage, not invented poison stacks. Environmental acid/chocolate collision is not simulated. |
| Dimensional Union | Creates one homing square field, shared 1s lock. Eight pulses over 1.6s divide a 16-damage budget, multiplied by its ATT adaptation (+10%), plus up to 8 from flat power divided by five. At 40 flat power this totals 26, not 26 per pulse. Enemy vulnerability/veil/ward apply per pulse. New fields replace old ones; no recursive item activations. |
| Hidden Knowledge / Ceremonial Wand | Five-shot burst cadence and the Forbidden Secrets bargain. Successful packed ability uses add 40 shared curse charge; at 100, self-curse for 4s, with a shared 5s lock. While an enabling wand remains packed, incoming direct damage +15%, and its attacks add 20 piercing damage. Deterministic 40% source chance; blocked charge waits. No extra mana cost or damage-over-time penalty. |
| Dusky Catalyst | Offensive cadence, +1 mana per volley from equipped WIS, and a 1s pause to natural mana regeneration after firing to represent the combat WIS penalty. Successful ability uses accumulate a 5% mana-spend credit; each whole credit refunds 1 mana. The upfront cost must still be affordable, failed casts earn nothing, and duplicates do not multiply the discount. This is an integer-resource adaptation of the source discount, not an exact 0.95 cost multiplier. |
| Fortitude | Slow close-range primary ring. Successful ability use releases three ordinary 8-damage rings, 0.4s apart, with a shared 15s lock. No automatic block or protection inferred from its name. |
| Brass Chamberstick | Two twin volleys, 0.55s apart, then 1.6s base recovery with a final 0.8s recovery minimum. Source recovery 0.8/0.4s is doubled to preserve an actual gap at RealmPack's firing timescale. |
| C.L.A.W. / Tormented Shriek | Five triple volleys, then 2s base recovery; final recovery minimum 1s. |
| Razorthorn Branch | One/two thorns three times, then a five-thorn fan. The eighth zero-damage source step becomes recovery rather than a fake activation. After the fan, base recovery doubles the firing interval; final recovery minimum is one normal interval. Bleed is applied once per volley. |
| Pulsating Wand | Ten-step growing/shrinking shot-size cycle retained in live inspection, without multiplying single-target damage. Source DEX improves own cadence; source bleed becomes bounded bleed. |
| Ravenous Wand | +11 maximum HP while packed, bounded bleed and short/long projectile positioning. Each connected projectile adds 3 Berserk charge; at 100, +25% own recharge for 2s. Deterministic translation of 3% per hit; refreshes without stacking. It accelerates recharge progress during the window, so the short buff also benefits slow attacks. It does not globally haste the inventory. |
| Abomination’s Wrath | Every 20 volleys restores 3 mana. While slowed, volleys can restore 3 mana instead, with a shared 0.2s lock. Slow is the explicit proxy for the source Dazed condition; RealmPack has no separate Dazed stat. |
| Lightning / Sprite Wand | Eight-step broad damage-roll cycle spans the source minimum/maximum and preserves the average. This expresses their unstable damage without consuming dungeon/combat RNG or imposing random misses. It is deterministic, rather than a literal independent random roll. |
| Crystal / Frozen / Warlord / Venerable Crystal | Full ward bypass and distinct source cadence. Neo Warlord additionally applies source-backed bleed. Snowblind/Fallen remain heavier ordinary shots; Neo Snowblind has a stronger budget. Names alone do not add chill or freezing. |
| Beekeeper / Laser Pointer / Solar Flare / Morning Square / Cane of Caduceus/Void | Preserve actual multi-channel rates and mixed/full piercing. No burning inferred from fire-themed names. Zero-damage helper objects are ignored. |
| Temporal / Obsidian Macuahuitl | Only the source-listed packed MotMG amulets enable Temporal’s +20% own primary damage. Obsidian’s listed Syndicate rings grant +10/15/20%; strongest partner only. Stash and unrelated amulets do not count. |
| Wand of Geb | Primary cadence/damage from source data; a 5-damage slowing nova chills for 3s, shared 5s lock. Top row only, or any row with four distinct packed Geb pieces. Existing Geb memberships, 2/3-piece thresholds and Book of Geb full-set bonuses remain. Other ST families’ armor/ability set bonuses are outside this weapon pass. |

Only source-backed bleed applies: 2 per volley for Ravenous/Razorthorn/Pulsating, 3 for Neo Warlord, building only to 6. Higher bleed from other sources is neither reduced nor refreshed. Source equipment-stat translations follow existing conventions: WIS grants 1 mana per volley, positive DEX/SPD reduces own base cadence, ATT buffs own primary, VIT heals 1 with a shared per-identity lock, and Ravenous's HP capacity never refills health or stacks with duplicate copies. Healing fatigue still applies.

Shiny copies retain the same identity with the established rounded +5% primary budget and 5% faster base cadence. Signature budgets, shared locks and recovery minimums remain bounded. IDs, artwork, footprints, prices, class compatibility, saved upgrades/enchantments, acquisition exclusions and ST memberships are preserved. Novelty weapons remain deliberately weak. No new free enchantments or saved-item replacements are introduced.

## Every regular profile

Damage is the unmodified average/full-position primary budget. Class, set, partner, enchantment, event, field/proc and position effects are separate. The catalogue has compact numeric summaries and full rules; live inspection shows charges, recovery, shot-size/pattern state and position.

| Item | ID | Damage | Base cooldown | Identity | Source |
| --- | --- | ---: | ---: | --- | --- |
| Abomination's Wrath | wiki_3004 | 37 | 2.96s | Steady wand | [data](https://realm.wiki/item?id=3004) |
| Acidic Aspergillum | wiki_53821 | 28 | 2.93s | Acid pool volley | [data](https://realm.wiki/item?id=53821) |
| Aeonic Talon | wiki_63884 | 26 | 1.48s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=63884) |
| Aspirant's Wand | wiki_17708 | 23 | 2.2s | Steady wand | [data](https://realm.wiki/item?id=17708) |
| Beekeeper's Flamethrower | wiki_55381 | 32 | 2.35s | Piercing wand | [data](https://realm.wiki/item?id=55381) |
| Brass Chamberstick | wiki_12162 | 15 | 0.55s | Burst wand | [data](https://realm.wiki/item?id=12162) |
| C.L.A.W. | wiki_14226 | 26 | 1.76s | Burst wand | [data](https://realm.wiki/item?id=14226) |
| Caduceus of Current Craziness | wiki_1398 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=1398) |
| Caduceus Of Enlightened Chaos | wiki_37681 | 26 | 2.2s | Steady wand | [data](https://realm.wiki/item?id=37681) |
| Cane of Caduceus | wiki_26733 | 22 | 1.76s | Mixed piercing channels | [data](https://realm.wiki/item?id=26733) |
| Cane of the Void | wiki_54797 | 22 | 1.76s | Mixed piercing channels | [data](https://realm.wiki/item?id=54797) |
| Carnival's Conjurer | wiki_52258 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=52258) |
| Ceremonial Wand | wiki_42282 | 26 | 1.66s | Forbidden secrets | [data](https://realm.wiki/item?id=42282) |
| Chocolate Ovipositor | wiki_1462 | 28 | 2.93s | Acid pool volley | [data](https://realm.wiki/item?id=1462) |
| Conducting Wand | wiki_3123 | 16 | 1.31s | Steady wand | [data](https://realm.wiki/item?id=3123) |
| Crystal Wand | wiki_2879 | 15 | 1.6s | Piercing wand | [data](https://realm.wiki/item?id=2879) |
| Deliverance | wiki_23627 | 16 | 1.76s | Desperate soul | [data](https://realm.wiki/item?id=23627) |
| Dimensional Union | wiki_48830 | 9 | 1.76s | Homing squares | [data](https://realm.wiki/item?id=48830) |
| Dusky Catalyst | wiki_14465 | 17 | 1.17s | Dusky bargain | [data](https://realm.wiki/item?id=14465) |
| Earthen Ward | wiki_14218 | 32 | 1.76s | Three-way turning volley | [data](https://realm.wiki/item?id=14218) |
| Eggstatic Conductor | wiki_65441 | 16 | 1.31s | Steady wand | [data](https://realm.wiki/item?id=65441) |
| Eternal Bloom Wand | wiki_57114 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=57114) |
| Eternal Snowflake Wand | wiki_5848 | 65 | 5.33s | Lingering close-range ring | [data](https://realm.wiki/item?id=5848) |
| Flip-Flops | wiki_28462 | 26 | 1.96s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=28462) |
| Fortitude | wiki_20745 | 76 | 5.33s | Lingering close-range ring | [data](https://realm.wiki/item?id=20745) |
| Frozen Wand | wiki_5138 | 15 | 1.6s | Piercing wand | [data](https://realm.wiki/item?id=5138) |
| Gearhawk Morning Star | wiki_29897 | 26 | 1.48s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=29897) |
| Glowing Torch | wiki_42103 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=42103) |
| Heartbreaker Wand | wiki_1220 | 14 | 1.17s | Returning wand | [data](https://realm.wiki/item?id=1220) |
| Hero's Wand | wiki_24968 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=24968) |
| Holy Artifact | wiki_14784 | 31 | 2.35s | Steady wand | [data](https://realm.wiki/item?id=14784) |
| Laser Pointer | wiki_49696 | 16 | 1.17s | Mixed piercing channels | [data](https://realm.wiki/item?id=49696) |
| Legion Elite Wand | wiki_41818 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=41818) |
| Lethargic Sentience | wiki_8999 | 14 | 7.04s | Steady wand | [data](https://realm.wiki/item?id=8999) |
| Lightning Wand | wiki_65287 | 29 | 2.93s | Unstable damage rolls | [data](https://realm.wiki/item?id=65287) |
| Lumiaire | wiki_28834 | 21 | 1.17s | Light and dark | [data](https://realm.wiki/item?id=28834) |
| Magic Wand | wiki_19366 | 14 | 1.17s | Returning wand | [data](https://realm.wiki/item?id=19366) |
| Measuring Wand | wiki_12070 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=12070) |
| Morning Square | wiki_44913 | 20 | 1.76s | Mixed piercing channels | [data](https://realm.wiki/item?id=44913) |
| Morning Star Of Sweet Miracles | wiki_26748 | 24 | 1.96s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=26748) |
| Morning Star of the Hero | wiki_24974 | 26 | 1.96s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=24974) |
| Morning Star of the Void | wiki_41784 | 26 | 1.96s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=41784) |
| Neo Snowblind Wand | wiki_56460 | 29 | 2.07s | Steady wand | [data](https://realm.wiki/item?id=56460) |
| Neo Warlord Wand | wiki_56459 | 15 | 1.6s | Piercing wand | [data](https://realm.wiki/item?id=56459) |
| Obsidian Macuahuitl | wiki_14450 | 26 | 1.96s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=14450) |
| Present Dispensing Wand | wiki_9084 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=9084) |
| Pulsating Wand | wiki_48198 | 9 | 1.04s | Pulsating thorns | [data](https://realm.wiki/item?id=48198) |
| Rainbow Rod | wiki_19324 | 3 | 1.17s | Steady wand | [data](https://realm.wiki/item?id=19324) |
| Ravenous Wand | wiki_47907 | 76 | 5.03s | Ravenous lingering volley | [data](https://realm.wiki/item?id=47907) |
| Razorthorn Branch | wiki_42013 | 24 | 2.2s | Nettle burst | [data](https://realm.wiki/item?id=42013) |
| Retrowinds Wand | wiki_63870 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=63870) |
| Rod of Radiance | wiki_2009 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=2009) |
| Scarlet Etched Branch | wiki_42292 | 16 | 1.76s | Forgotten soul | [data](https://realm.wiki/item?id=42292) |
| Snowblind Wand | wiki_25700 | 26 | 2.07s | Steady wand | [data](https://realm.wiki/item?id=25700) |
| Solar Flare Igniter | wiki_7315 | 16 | 1.17s | Mixed piercing channels | [data](https://realm.wiki/item?id=7315) |
| Soul's Guidance | wiki_24834 | 16 | 1.76s | Forgotten soul | [data](https://realm.wiki/item?id=24834) |
| Spicy Wand of Spice | wiki_3307 | 5 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=3307) |
| Sprite Wand | wiki_2635 | 18 | 1.76s | Unstable damage rolls | [data](https://realm.wiki/item?id=2635) |
| St. Abraham's Wand | wiki_3101 | 20 | 1.96s | Steady wand | [data](https://realm.wiki/item?id=3101) |
| Sweet Desire Wand | wiki_41763 | 32 | 1.76s | Three-way turning volley | [data](https://realm.wiki/item?id=41763) |
| Sweettreats Wand | wiki_63774 | 26 | 2.07s | Steady wand | [data](https://realm.wiki/item?id=63774) |
| Temporal Wand | wiki_3783 | 20 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=3783) |
| The North Star | wiki_26227 | 26 | 1.96s | Independent morning-star rhythms | [data](https://realm.wiki/item?id=26227) |
| Theurgy Wand | wiki_8204 | 31 | 2.35s | Steady wand | [data](https://realm.wiki/item?id=8204) |
| Tormented Shriek | wiki_14779 | 26 | 1.76s | Burst wand | [data](https://realm.wiki/item?id=14779) |
| Tyrant's Wand | wiki_26096 | 30 | 2.51s | Steady wand | [data](https://realm.wiki/item?id=26096) |
| Venerable Crystal Wand | wiki_38586 | 15 | 1.26s | Piercing wand | [data](https://realm.wiki/item?id=38586) |
| Wand of Ancient Terror | wiki_3856 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=3856) |
| Wand of Budding Romance | wiki_8844 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=8844) |
| Wand of Egg-cellence | wiki_8854 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=8854) |
| Wand of Geb | wiki_9055 | 19 | 1.76s | Geb’s judgement | [data](https://realm.wiki/item?id=9055) |
| Wand of Hidden Knowledge | wiki_41751 | 26 | 1.66s | Forbidden secrets | [data](https://realm.wiki/item?id=41751) |
| Wand of the Bulwark | wiki_3076 | 65 | 5.33s | Lingering close-range ring | [data](https://realm.wiki/item?id=3076) |
| Wand of the Fallen | wiki_6203 | 26 | 2.07s | Steady wand | [data](https://realm.wiki/item?id=6203) |
| Wand of the Summoned One | wiki_14494 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=14494) |
| Warlord Wand | wiki_25699 | 15 | 1.6s | Piercing wand | [data](https://realm.wiki/item?id=25699) |
| Winter's Breath Wand | wiki_6861 | 18 | 1.76s | Steady wand | [data](https://realm.wiki/item?id=6861) |

## Validation and balance comparison

The regression suite protects **every non-wand definition** with a pre-pass SHA-256 snapshot. The wand tests cover all 93 regular/Shiny entries and source pattern preservation, reskins, projectile budgets, rates/piercing, delay/returns/wave boundaries, placement, recovery-only floors, Nettle patterns, shot-size cycles, damage-roll averages/RNG isolation, fields/souls/global caps, self-curse thresholds/risk/expiry, actual mana refunds and natural mana suppression, Fortitude/Abomination/Ravenous/Geb behavior, listed partners, saved upgrades and battle reset. They also run 372 legal wand/class/version combat trials.

The [tiered class comparison](wand-class-regression.json) uses identical legal fixtures across all 19 classes and all 35 bosses, three support levels: all 1,995 fight records are unchanged. The [wand comparison](wand-benchmark.json) uses all 77 regular profiles across Priest/Sorcerer/Summoner/Druid, eight boss difficulty bands and two native support levels: 4,928 fights per version, 9,856 total. Each tested wand is packed first in the top row, with a second native tiered wand, native ability/armor, a magic ring, three Health Potions, +50 base HP and +8% relic recharge; seed 123456, Adventurer depth 20, 0.05s tick. No special partner rings, enchantments or optimized builds. This comparison does not test full-run economy, every upgrade stack or manual aiming.

The [Geb set comparison](wand-sets-benchmark.json) runs all 35 bosses at two support levels in both versions: 140 fights. It improves from 38/70 to 42/70 wins. This does not establish the balance of other ST set families.

All 27 regression suites passed. Browser checks cover 756 wand inspection/offer views and 7,176 catalogue views without reported layout/runtime errors; standard desktop catalogue inspection has no local overflow and remains one panel. A real-timer mixed-wand/native-ability combat smoke check at 4× exercised slow deliveries, souls, fields and ability-triggered effects with bounded state, no page scrolling and no runtime errors. It is not an FPS benchmark.

Reproduce with `node game/tests/test-wand-identities.cjs`, `node scripts/benchmark-wands.cjs --baseline-root <0.35.0-checkout> --output docs/wand-benchmark.json`, `node scripts/benchmark-wand-sets.cjs --baseline-root <0.35.0-checkout> --output docs/wand-sets-benchmark.json` and the `scripts/check-wand-*.cjs` Playwright checks using `REALMPACK_CHROME`.

The fixed wand fixtures record **2,334/4,928 wins before and 2,325/4,928 after**, close overall strength with more distinct roles. Each regular profile has 64 fights. Ravenous improves 30→34; Lumiaire 29→32; Dimensional Union and Hidden Knowledge 30→32; Earthen/Sweet Desire and Gearhawk/Aeonic 30→33. Dusky, Fortitude and Razorthorn remain 30→30. Expected novelty reductions include Spicy 34→25, Lethargic Sentience 30→22 and Rainbow Rod 30→24. Soul’s Guidance 33→30, Deliverance 30→29 and slow/piercing variants such as Frozen 34→29 remain playtesting watch points: short fights can end before soul/curse payoff, and piercing trades raw damage for ward bypass. These samples are not universal weapon rankings; future tuning should preserve those identities while addressing observed weak packs.

A final-source check reproduced the paired summaries for nine delayed/soul profiles (576 fights). Ravenous was rerun against baseline after making its short Berserk window speed up recharge progress; its 30→34 win result remains unchanged. The aggregate report includes the final Ravenous records.
