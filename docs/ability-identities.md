# UT/ST abilities — 0.40.0

Source audit: 25 October 2026. **559 variants across all 19 ability kinds: 410 normal/historical actual items, 123 Shiny variants, and 26 internal effect helpers.** Every item is mapped below. The 176 tiered ability definitions and every weapon, armor, ring and consumable definition remain byte-for-byte equivalent in the definition regression test. IDs, names, sources, artwork, footprints, prices, class restrictions, base links and ST membership are preserved.

## Balance and translation

These are RealmPack adaptations, not a simulation of RotMG movement, targeting, aim, player statistics or multiple enemies. T7 is the family reference. Source damage/healing ratios are bounded before conversion; secondary effects and equipment stats reduce the primary budget or lengthen cooldowns. Mana rises for expensive source casts and utility-heavy kits. A UT/ST is a different build choice, not a guaranteed upgrade over the tiered ability.

Source facts are in `ability-source-facts.json`; the T0/T7 references are in `ability-balance-anchors.json`; summon and secondary projectile facts are in `ability-helper-source-facts.json`. Numerical recipes and the explicit translation notes are in `ability-profiles.json`. Game descriptions show the resulting amounts, conditions and limits. Source scaling uses base values: existing Wisdom adjacency supplies pack-side scaling. Relative equipment stats use fixed reference statistics before caps, avoiding recursive health bonuses.

- Cloaks and prisms retain dodge, with sourced bombs, healing, teleport support or protection. Teleport support recharges the least charged adjacent weapon by 10%; non-attacking decoys briefly delay the enemy rather than becoming damage summons.
- Quivers, spells, scepters, stars and wakizashis use a single-target damage budget. Projectile count does not multiply flat power, class triggers or landed-hit charge. Sourced piercing and projectile conditions are retained. Chains and novas share the one-enemy budget.
- Tomes distinguish healing, offense and support. Shields distinguish defense from offensive bashes. Seals, helms and lutes translate their protection, healing and support; haste remains local to adjacent items.
- Poison and trap payloads combine bounded impact damage, affliction and control. Stun, stasis, paralysis and range mechanics use pack-side chill, short delay or local recharge; their literal movement/control behavior is not reproduced.
- Modern skulls raise healing undead. A charged release spends actual healing charge on a burst; unrelated healing, overhealing and the release's own healing cannot refill its meter. Historical drains and the existing Torment/Memento Mori implementations retain their roles.
- Sigils combine modest healing and offense with automatic charged combat forms. Meter costs are paid once per form. Out-of-combat charge is represented by defeated-wave charge where needed. Form effects change combat bonuses; they do not replace player artwork.
- Maces use source companion traits. Crystal summons pierce; unstable M.E.R.V./spectres explode after five seconds; rabbits/minotaurs charge twice; golems only counterattack; recursive summons create one weaker child; sapling networks use two companions instead of the source's larger counts. Peacekeeper alternates its source companion roles between casts.

## Safeguards

Each cast pays mana and fires normal activation/class hooks once. Passive equipment stats follow the existing shared primary (+35%), cooldown reduction (20%), block gain (+50%) and gear capacity (+80 HP/+20 mana) limits; ability stat contributions are smaller than dedicated armor/rings. Equipping or reloading cannot refill health. Stat penalties are retained with bounded pack-side costs. Temporary support is local, expires, and shares the existing armor/ring caps. Armored refreshes rather than stacking; one-attack divine protection shares its eight-second lock. Sick prevents healing for its stated duration.

Proc chance accumulates deterministically on eligible events. Damage/stat proc channels use a shared cooldown, strongest eligible candidate, and per-identity chance progress; duplicate/reskinned/Shiny copies cannot independently multiply the same channel. Same-family healing fields replace rather than add. Ability companions are limited to two per identity, four in total, and the existing eight-summon ceiling. Non-attacking decoys have no passive damage. Companions disappear when their source leaves the pack or their wave ends. Landed-hit events are deduplicated per weapon activation, including delayed projectiles.

Twenty-one previously researched custom base abilities retain their working custom combat implementations and descriptions; source equipment stats are added. Shiny abilities retain the existing modest +5% amount / 5% shorter cooldown policy, without multiplying dodge charges. Shiny Midnight Star keeps its saved base link but resolves mechanics from the actual Midnight Star, not an internal helper.

Internal effect helpers are marked unobtainable and excluded from new acquisition. Existing saved copies use their parent ability where available. Historical/Legacy restrictions remain in force.

## Actual normal/historical items

The primary below is the actual game recipe, including retained custom recipes. Complete secondary amounts, proc gates, form thresholds, costs and translation notes are in the numerical profiles and in-game inspection.

| Kind | Item / ID | Primary | Cooldown | Mana | Signature |
|---|---|---|---:|---:|---|
| cloak | [Cloak of Bloody Surprises / wiki_599](https://realm.wiki/item?id=599) | 1 dodge | 6.6s | 1 |  |
| cloak | [Cloak of Cubic Enigma / wiki_19307](https://realm.wiki/item?id=19307) | 1 dodge | 6.6s | 1 | pet ; conditional weapon |
| cloak | [Cloak of Eerie Trepidation / wiki_14815](https://realm.wiki/item?id=14815) | 1 dodge | 6.6s | 1 |  |
| cloak | [Cloak of Refraction / wiki_1417](https://realm.wiki/item?id=1417) | 1 dodge | 6.83s | 1 | pet ; delay ; conditional weapon |
| cloak | [Cloak of the Darkened Sun / wiki_21228](https://realm.wiki/item?id=21228) | 1 dodge | 6.6s | 1 | ; conditional weapon, ability, hurt |
| cloak | [Cloak of the Deep / wiki_20883](https://realm.wiki/item?id=20883) | 1 dodge | 6.83s | 1 | damage ; conditional weapon |
| cloak | [Cloak of the Mad God / wiki_23327](https://realm.wiki/item?id=23327) | 1 dodge | 5.28s | 1 | ; conditional weapon |
| cloak | [Cloak of the Planewalker / wiki_2650](https://realm.wiki/item?id=2650) | 1 dodge | 8s | 2 | Existing custom signature retained |
| cloak | [Cloak of the Planewalker / wiki_53187](https://realm.wiki/item?id=53187) | 1 dodge | 8s | 2 | Existing custom signature retained |
| cloak | [Cloak of Winter / wiki_8333](https://realm.wiki/item?id=8333) | 1 dodge | 6.6s | 1 | ; conditional weapon |
| cloak | [Eggshell Cowl / wiki_18358](https://realm.wiki/item?id=18358) | 1 dodge | 7.2s | 1 | status vulnerable; conditional ability |
| cloak | [Ghastly Drape / wiki_10065](https://realm.wiki/item?id=10065) | 1 dodge | 8s | 3 | Existing custom signature retained |
| cloak | [Hydroflow Cloak / wiki_54896](https://realm.wiki/item?id=54896) | 1 dodge | 6.6s | 1 | ; conditional weapon |
| cloak | [Legacy Ghastly Drape / wiki_8610](https://realm.wiki/item?id=8610) | 1 dodge | 8.07s | 1 | buff speed |
| cloak | [Legion Elite Cloak / wiki_41824](https://realm.wiki/item?id=41824) | 1 dodge | 6.6s | 1 | ; conditional weapon |
| cloak | [Mirror Cloak / wiki_23335](https://realm.wiki/item?id=23335) | 1 dodge | 8.07s | 1 | status weaken; pet ; conditional weapon |
| cloak | [Spectre Cloak / wiki_5359](https://realm.wiki/item?id=5359) | 1 dodge | 6.6s | 1 | ; conditional hit |
| cloak | [Vampiric Cape / wiki_17881](https://realm.wiki/item?id=17881) | 1 dodge | 8s | 2 | Existing custom signature retained |
| quiver | [Archerang / wiki_23337](https://realm.wiki/item?id=23337) | 11 damage | 3.72s | 0 | status chill |
| quiver | [Beehemoth Quiver / wiki_4333](https://realm.wiki/item?id=4333) | 14 damage | 3.72s | 0 | status chill |
| quiver | [Beehemoth Quiver / wiki_4339](https://realm.wiki/item?id=4339) | 14 damage | 3.72s | 0 | status chill |
| quiver | [Beehemoth Quiver / wiki_4338](https://realm.wiki/item?id=4338) | 14 damage | 3.72s | 0 | status chill |
| quiver | [Beehemoth Quiver / wiki_17564](https://realm.wiki/item?id=17564) | 14 damage | 3.72s | 0 | status chill |
| quiver | [Brine Quiver / wiki_3299](https://realm.wiki/item?id=3299) | 10 damage | 3.72s | 0 | status chill |
| quiver | [Coalbearing Quiver / wiki_8336](https://realm.wiki/item?id=8336) | 10 damage | 3.72s | 0 | status chill |
| quiver | [Cocoon Quiver / wiki_9089](https://realm.wiki/item?id=9089) | 11 damage | 3.72s | 0 | status chill |
| quiver | [Double Vision Darts / wiki_17849](https://realm.wiki/item?id=17849) | 15 damage | 3.72s | 0 |  |
| quiver | [Embellished Quiver / wiki_21187](https://realm.wiki/item?id=21187) | 20 damage | 3.72s | 1 | status chill; conditional ability |
| quiver | [Freezing Quiver / wiki_5139](https://realm.wiki/item?id=5139) | 14 damage | 3.72s | 0 | status chill |
| quiver | [Fresh Breeze Quiver / wiki_41601](https://realm.wiki/item?id=41601) | 20 damage | 3.72s | 1 | status chill; conditional ability |
| quiver | [Huntsman's Volley / wiki_25457](https://realm.wiki/item?id=25457) | 11 damage | 3.72s | 1 | ; conditional ability |
| quiver | [Hydroflow Quiver / wiki_54899](https://realm.wiki/item?id=54899) | 16 damage | 3.72s | 0 | status chill |
| quiver | [Legion Elite Quiver / wiki_41827](https://realm.wiki/item?id=41827) | 16 damage | 3.72s | 0 | status chill |
| quiver | [Mad Javelin / wiki_20276](https://realm.wiki/item?id=20276) | 18 damage | 5.78s | 1 | buff attack; conditional ability |
| quiver | [Q.U.I.V.E.R. / wiki_15761](https://realm.wiki/item?id=15761) | 20 damage | 3.72s | 1 | status chill; conditional ability |
| quiver | [Quintessential Quiver / wiki_1401](https://realm.wiki/item?id=1401) | 11 damage | 3.72s | 0 | status chill |
| quiver | [Quiver of Dazing Love / wiki_25607](https://realm.wiki/item?id=25607) | 14 damage | 3.72s | 1 | status chill |
| quiver | [Quiver of Shadows / wiki_589](https://realm.wiki/item?id=589) | 24 damage | 3.72s | 0 |  |
| quiver | [Quiver of Shrieking Specters / wiki_7749](https://realm.wiki/item?id=7749) | 23 damage | 3.85s | 0 | buff speed; status chill |
| quiver | [Quiver of Thunder / wiki_3079](https://realm.wiki/item?id=3079) | 20 damage | 5s | 2 | Existing custom signature retained |
| quiver | [Quiver of Thunder - Overcharged / wiki_30041](https://realm.wiki/item?id=30041) | 14 damage | 3.72s | 1 | status chill |
| quiver | [Sentry Turret / wiki_50814](https://realm.wiki/item?id=50814) | 20 damage | 3.72s | 0 | pet  |
| quiver | [Sinister Syringes / wiki_23745](https://realm.wiki/item?id=23745) | 10 damage | 3.72s | 0 | poison ; conditional weapon |
| quiver | [Snow Critters / wiki_42501](https://realm.wiki/item?id=42501) | 20 damage | 3.72s | 0 | pet  |
| quiver | [Spinal Quiver / wiki_25739](https://realm.wiki/item?id=25739) | 23 damage | 3.85s | 0 | buff speed; status chill |
| spell | [Ancient Eminence / wiki_8692](https://realm.wiki/item?id=8692) | 24 damage | 3.72s | 2 | ; conditional ability |
| spell | [Cobra Serpentis Scroll / wiki_1382](https://realm.wiki/item?id=1382) | 33 damage | 3.72s | 2 |  |
| spell | [Cursed Spire Spell / wiki_19282](https://realm.wiki/item?id=19282) | 33 damage | 3.85s | 2 | delay ; conditional ability |
| spell | [Depth Charge / wiki_1909](https://realm.wiki/item?id=1909) | 19 damage | 3.85s | 3 | buff speed |
| spell | [Esben's Vows / wiki_17041](https://realm.wiki/item?id=17041) | 34 damage | 3.72s | 3 | pet  |
| spell | [Genesis Spell / wiki_28840](https://realm.wiki/item?id=28840) | 36 damage | 5.58s | 3 |  |
| spell | [Hydroflow Spell / wiki_54901](https://realm.wiki/item?id=54901) | 30 damage | 3.72s | 2 |  |
| spell | [Jade Storm / wiki_23326](https://realm.wiki/item?id=23326) | 45 damage | 2.98s | 3 |  |
| spell | [Legacy Ancient Spell: Pierce / wiki_8617](https://realm.wiki/item?id=8617) | 20 damage | 3.72s | 2 |  |
| spell | [Legion Elite Spell / wiki_41829](https://realm.wiki/item?id=41829) | 30 damage | 3.72s | 2 |  |
| spell | [Penetrating Blast Spell / wiki_13988](https://realm.wiki/item?id=13988) | 36 damage | 3.72s | 2 |  |
| spell | [Random Spell Extraction Device / wiki_23330](https://realm.wiki/item?id=23330) | 20 damage | 3.72s | 2 |  |
| spell | [Recurring Terror Spell / wiki_1953](https://realm.wiki/item?id=1953) | 33 damage | 3.72s | 2 |  |
| spell | [Runes of Knowledge / wiki_20901](https://realm.wiki/item?id=20901) | 20 damage | 3.72s | 2 | status weaken |
| spell | [Slurpian Sea Scroll / wiki_20303](https://realm.wiki/item?id=20303) | 19 damage | 3.85s | 3 | buff speed |
| spell | [Spectral Spell / wiki_25760](https://realm.wiki/item?id=25760) | 24 damage | 3.72s | 2 | ; conditional ability |
| spell | [Spelling Spell / wiki_23339](https://realm.wiki/item?id=23339) | 20 damage | 3.72s | 2 |  |
| spell | [Sporous Spray Spell / wiki_1203](https://realm.wiki/item?id=1203) | 20 damage | 3.72s | 3 |  |
| spell | [Tablet of the King's Avatar / wiki_2881](https://realm.wiki/item?id=2881) | 43 damage | 3.72s | 3 |  |
| spell | [Thousand Suns Spell / wiki_8862](https://realm.wiki/item?id=8862) | 24 damage | 3.72s | 2 |  |
| spell | [Unstable Firework / wiki_50818](https://realm.wiki/item?id=50818) | 35 damage | 3.72s | 3 | pet  |
| spell | [Vigil Spell / wiki_8338](https://realm.wiki/item?id=8338) | 24 damage | 3.72s | 2 |  |
| spell | [Vitamine Buster / wiki_2217](https://realm.wiki/item?id=2217) | 22 damage | 3.72s | 2 |  |
| spell | [Wandering Souls Spell / wiki_28241](https://realm.wiki/item?id=28241) | 34 damage | 3.72s | 2 | ; conditional ability |
| spell | [X-Marks-the-Spot Spell / wiki_3297](https://realm.wiki/item?id=3297) | 24 damage | 3.72s | 2 |  |
| tome | [Bloodletting Leeches / wiki_26734](https://realm.wiki/item?id=26734) | 2.5 haste | 4.65s | 2 | ; conditional ability |
| tome | [Book of Geb / wiki_9054](https://realm.wiki/item?id=9054) | 18 heal | 6s | 3 | Existing custom signature retained |
| tome | [Botany Book / wiki_25113](https://realm.wiki/item?id=25113) | 24 heal | 5.14s | 3 | field heal; cleanse Speedy; cleanse all |
| tome | [Ceremonial Merlot / wiki_8205](https://realm.wiki/item?id=8205) | 20 heal | 4.98s | 2 | field heal; buff attack |
| tome | [Chaotic Scripture / wiki_28835](https://realm.wiki/item?id=28835) | 15 heal | 4.81s | 2 | damage  |
| tome | [Evolutionary Records / wiki_20900](https://realm.wiki/item?id=20900) | 13 heal | 5.46s | 3 | field heal; buff wisdom; buff speed; buff dexterity; conditional weapon |
| tome | [Hydroflow Tome / wiki_54903](https://realm.wiki/item?id=54903) | 23 heal | 4.98s | 2 | field heal; damage  |
| tome | [Legion Elite Tome / wiki_41831](https://realm.wiki/item?id=41831) | 23 heal | 4.98s | 2 | field heal; damage  |
| tome | [Nativity Tome / wiki_8342](https://realm.wiki/item?id=8342) | 23 heal | 4.98s | 2 | field heal; damage  |
| tome | [Necronomicon / wiki_1405](https://realm.wiki/item?id=1405) | 25 damage | 6s | 3 | Existing custom signature retained |
| tome | [Scary Stories / wiki_48142](https://realm.wiki/item?id=48142) | 2.5 haste | 4.65s | 2 | ; conditional ability, hit |
| tome | [Strike Amulet / wiki_2514](https://realm.wiki/item?id=2514) | 2.5 haste | 4.98s | 2 | status chill; relay  |
| tome | [Tome of Exorcism / wiki_14785](https://realm.wiki/item?id=14785) | 20 heal | 4.98s | 2 | field heal; buff attack |
| tome | [Tome of Frigid Protection / wiki_5854](https://realm.wiki/item?id=5854) | 12 heal | 5.14s | 3 | field heal; buff defense; armored  |
| tome | [Tome of Holy Furor / wiki_608](https://realm.wiki/item?id=608) | 2.5 haste | 4.81s | 2 | buff dexterity; conditional weapon |
| tome | [Tome of Holy Protection / wiki_3102](https://realm.wiki/item?id=3102) | 20 block | 7s | 4 | Existing custom signature retained |
| tome | [Tome of Moral Support / wiki_23341](https://realm.wiki/item?id=23341) | 2.5 haste | 6.98s | 2 | pet  |
| tome | [Tome of Pain / wiki_1976](https://realm.wiki/item?id=1976) | 21 heal | 4.81s | 2 | field heal; conditional ability |
| tome | [Tome of Piracy / wiki_3298](https://realm.wiki/item?id=3298) | 23 heal | 4.98s | 2 | field heal; damage  |
| tome | [Tome of Purification / wiki_3081](https://realm.wiki/item?id=3081) | 24 heal | 5.5s | 3 | Existing custom signature retained |
| tome | [Tome of the Dragon / wiki_26262](https://realm.wiki/item?id=26262) | 2.5 haste | 4.81s | 2 | buff dexterity; conditional weapon |
| tome | [Tome of the Mushroom Tribes / wiki_1151](https://realm.wiki/item?id=1151) | 36 heal | 7s | 4 | Existing custom signature retained |
| tome | [Tome of the Tarnished Gods / wiki_21227](https://realm.wiki/item?id=21227) | 2.5 haste | 4.65s | 2 | pet  |
| tome | [Void Leeches / wiki_54798](https://realm.wiki/item?id=54798) | 2.5 haste | 4.65s | 2 | ; conditional ability |
| helm | [Adamantine Helm / wiki_14875](https://realm.wiki/item?id=14875) | 3.7 haste | 5.78s | 1 | field heal |
| helm | [Amber Encrusted Helmet / wiki_9661](https://realm.wiki/item?id=9661) | 3.96 haste | 5.58s | 1 |  |
| helm | [Beastly Mane / wiki_14774](https://realm.wiki/item?id=14774) | 3.87 haste | 5.78s | 1 | damage ; conditional hurt |
| helm | [Bubblegum Bucket / wiki_5187](https://realm.wiki/item?id=5187) | 3.54 haste | 5.97s | 1 | buff speed; field heal |
| helm | [Burlap Cowl / wiki_32443](https://realm.wiki/item?id=32443) | 3.62 haste | 5.97s | 1 | buff dexterity; buff speed |
| helm | [Challenger Helm / wiki_23343](https://realm.wiki/item?id=23343) | 3.96 haste | 5.78s | 1 | status chill |
| helm | [Helm of Draconic Dominance / wiki_32699](https://realm.wiki/item?id=32699) | 3.62 haste | 5.97s | 1 | block heal; damage  |
| helm | [Helm of Exalted Might / wiki_6938](https://realm.wiki/item?id=6938) | 3.7 haste | 8.96s | 1 | buff dexterity; buff attack |
| helm | [Helm of the Immortal / wiki_610](https://realm.wiki/item?id=610) | 3.62 haste | 8.96s | 1 | block heal; buff defense |
| helm | [Helm of the Jack-o'-naut / wiki_6036](https://realm.wiki/item?id=6036) | 3.78 haste | 5.78s | 1 | armored  |
| helm | [Helm of the Juggernaut / wiki_3080](https://realm.wiki/item?id=3080) | 2.5 haste | 7s | 3 | Existing custom signature retained |
| helm | [Helm of the Juggernaut - Chaos / wiki_30039](https://realm.wiki/item?id=30039) | 3.78 haste | 5.78s | 1 | armored  |
| helm | [Helm of the Juggernaut - Jade / wiki_30038](https://realm.wiki/item?id=30038) | 3.78 haste | 5.78s | 1 | armored  |
| helm | [Helm of the Juggernaut - Midas / wiki_30037](https://realm.wiki/item?id=30037) | 3.78 haste | 5.78s | 1 | armored  |
| helm | [Helm of the Swift Bunny / wiki_2216](https://realm.wiki/item?id=2216) | 3.54 haste | 5.97s | 1 | buff speed; field heal |
| helm | [Hivemaster Helm / wiki_2225](https://realm.wiki/item?id=2225) | 3.96 haste | 5.58s | 1 | pet  |
| helm | [Hydroflow Helm / wiki_54904](https://realm.wiki/item?id=54904) | 3.7 haste | 5.78s | 1 | buff speed |
| helm | [Legion Elite Helm / wiki_41832](https://realm.wiki/item?id=41832) | 3.7 haste | 5.78s | 1 | buff speed |
| helm | [Pathfinder's Helm / wiki_8335](https://realm.wiki/item?id=8335) | 3.7 haste | 5.78s | 1 | buff speed |
| helm | [Tipsy Topper / wiki_17848](https://realm.wiki/item?id=17848) | 3.47 haste | 6.17s | 2 | buff attack; field heal; buff defense |
| helm | [Tricorne of the High Seas / wiki_8666](https://realm.wiki/item?id=8666) | 18 damage | 7s | 3 | Existing custom signature retained |
| helm | [Vanguard's Visage / wiki_14980](https://realm.wiki/item?id=14980) | 3.87 haste | 5.58s | 1 | ; conditional ability |
| shield | [Brutal Buckler / wiki_20275](https://realm.wiki/item?id=20275) | 18 block | 3.85s | 0 | damage ; conditional ability |
| shield | [Cavalry Lance / wiki_20904](https://realm.wiki/item?id=20904) | 18 block | 3.85s | 0 | damage ; status chill |
| shield | [Champion's Bastion / wiki_23520](https://realm.wiki/item?id=23520) | 27 damage | 3.85s | 0 | buff defense; status chill |
| shield | [Crystal Shield / wiki_1177](https://realm.wiki/item?id=1177) | 16 block | 8s | 4 | Existing custom signature retained |
| shield | [Dragon Slayer / wiki_26263](https://realm.wiki/item?id=26263) | 26 block | 3.08s | 0 | damage ; status chill |
| shield | [Esoteric Buckler / wiki_42290](https://realm.wiki/item?id=42290) | 18 block | 5.78s | 0 | damage ; status chill |
| shield | [Hydroflow Shield / wiki_54905](https://realm.wiki/item?id=54905) | 20 block | 3.98s | 0 | armored ; damage ; status chill |
| shield | [Kogbold Cower Shield / wiki_49690](https://realm.wiki/item?id=49690) | 21 damage | 3.98s | 1 | armored ; buff defense; conditional ability |
| shield | [Legion Elite Shield / wiki_41833](https://realm.wiki/item?id=41833) | 20 block | 3.98s | 0 | armored ; damage ; status chill |
| shield | [Onyx Shield of the Mad God / wiki_9017](https://realm.wiki/item?id=9017) | 15 block | 6s | 3 | Existing custom signature retained |
| shield | [Oryx's Escutcheon / wiki_28853](https://realm.wiki/item?id=28853) | 19 block | 3.72s | 0 |  |
| shield | [Resounding Shield / wiki_8340](https://realm.wiki/item?id=8340) | 20 block | 3.98s | 0 | armored ; damage ; status chill |
| shield | [Shield of Flowing Clarity / wiki_23328](https://realm.wiki/item?id=23328) | 26 block | 3.08s | 0 | damage ; status chill |
| shield | [Shield of Jawgmur / wiki_3820](https://realm.wiki/item?id=3820) | 25 block | 3.85s | 0 | damage ; status vulnerable |
| shield | [Shield of Ogmur / wiki_3087](https://realm.wiki/item?id=3087) | 25 block | 3.85s | 0 | damage ; status vulnerable |
| shield | [Shield of Pogmur / wiki_23344](https://realm.wiki/item?id=23344) | 14 damage | 3.72s | 0 | status vulnerable |
| shield | [Ship's Wheel Shield / wiki_3296](https://realm.wiki/item?id=3296) | 21 block | 3.85s | 0 | damage ; status chill |
| shield | [Shockwave Shield / wiki_65283](https://realm.wiki/item?id=65283) | 19 block | 3.85s | 0 | status chill; conditional ability |
| shield | [Snakeskin Shield / wiki_2624](https://realm.wiki/item?id=2624) | 13 block | 3.85s | 0 | damage ; status chill |
| shield | [Spiteful Scutum / wiki_3395](https://realm.wiki/item?id=3395) | 18 block | 5.78s | 0 | damage ; status chill |
| shield | [Spriteful Shield / wiki_5035](https://realm.wiki/item?id=5035) | 18 block | 5.78s | 0 | damage ; status chill |
| shield | [Sun Star Buckler / wiki_42317](https://realm.wiki/item?id=42317) | 18 block | 3.85s | 0 | damage ; status chill |
| shield | [Sunken Buckler / wiki_22458](https://realm.wiki/item?id=22458) | 18 block | 3.85s | 0 | damage ; status chill |
| seal | [Abyssal Insignia / wiki_17388](https://realm.wiki/item?id=17388) | 14 heal | 4.89s | 2 | pet  |
| seal | [Advent Seal / wiki_8344](https://realm.wiki/item?id=8344) | 12 heal | 3.6s | 2 | block heal; field heal; buff attack |
| seal | [Carrot Cake Crest / wiki_41668](https://realm.wiki/item?id=41668) | 14 heal | 4.89s | 2 | pet  |
| seal | [Doom's Emblem / wiki_20889](https://realm.wiki/item?id=20889) | 13 heal | 5.06s | 1 | buff attack; conditional ability |
| seal | [Hydroflow Seal / wiki_54907](https://realm.wiki/item?id=54907) | 12 heal | 3.6s | 2 | block heal; field heal; buff attack |
| seal | [Legacy Seal of the Enchanted Forest / wiki_9062](https://realm.wiki/item?id=9062) | 13 heal | 3.49s | 1 | block heal; status chill |
| seal | [Legion Elite Seal / wiki_41835](https://realm.wiki/item?id=41835) | 12 heal | 3.6s | 2 | block heal; field heal; buff attack |
| seal | [Marble Seal / wiki_579](https://realm.wiki/item?id=579) | 15 heal | 4.89s | 2 | pet  |
| seal | [Sacrilege Seal / wiki_25746](https://realm.wiki/item?id=25746) | 12 heal | 3.6s | 2 | buff attack; block heal; field heal |
| seal | [Sandstone Seal / wiki_9660](https://realm.wiki/item?id=9660) | 13 heal | 3.49s | 1 | field heal; buff attack |
| seal | [Scholar's Seal / wiki_1406](https://realm.wiki/item?id=1406) | 12 heal | 5.4s | 2 | mana heal; buff wisdom; field heal |
| seal | [Seal of Blasphemous Prayer / wiki_3078](https://realm.wiki/item?id=3078) | 12 heal | 9s | 4 | Existing custom signature retained |
| seal | [Seal of Cubic Conundra / wiki_19304](https://realm.wiki/item?id=19304) | 12 heal | 3.6s | 2 | field heal; buff attack; status chill |
| seal | [Seal of Divine Focus / wiki_612](https://realm.wiki/item?id=612) | 12 heal | 5.4s | 2 | mana heal; buff wisdom; field heal |
| seal | [Seal of Eternal Life / wiki_23346](https://realm.wiki/item?id=23346) | 14 heal | 5.06s | 1 | field mana |
| seal | [Seal of the Battle God / wiki_19973](https://realm.wiki/item?id=19973) | 14 heal | 5.06s | 2 | buff attack; conditional ability |
| seal | [Seal of the Enchanted Forest / wiki_1190](https://realm.wiki/item?id=1190) | 12 heal | 6s | 3 | Existing custom signature retained |
| seal | [Symbol of the Lost / wiki_26565](https://realm.wiki/item?id=26565) | 15 heal | 4.89s | 2 | pet ; conditional ability |
| poison | [Bottled Lemonade / wiki_28480](https://realm.wiki/item?id=28480) | 5 poison | 3.72s | 2 |  |
| poison | [Bottled Medusozoan / wiki_2557](https://realm.wiki/item?id=2557) | 5 poison | 3.72s | 2 |  |
| poison | [Crystallised Fang's Venom / wiki_1200](https://realm.wiki/item?id=1200) | 3 poison | 3.72s | 2 |  |
| poison | [Cursed Canopic Jar / wiki_1380](https://realm.wiki/item?id=1380) | 4 poison | 3.98s | 2 | damage  |
| poison | [Holly Poison / wiki_8343](https://realm.wiki/item?id=8343) | 4 poison | 3.85s | 2 | damage  |
| poison | [Hydroflow Poison / wiki_54908](https://realm.wiki/item?id=54908) | 4 poison | 3.85s | 2 | damage  |
| poison | [Legion Elite Poison / wiki_41836](https://realm.wiki/item?id=41836) | 4 poison | 3.85s | 2 | damage  |
| poison | [Lightning in a Bottle / wiki_23347](https://realm.wiki/item?id=23347) | 5 poison | 5.58s | 3 |  |
| poison | [Makeshift Blowpipe / wiki_8789](https://realm.wiki/item?id=8789) | 4 poison | 3.72s | 2 |  |
| poison | [Mighty Stein / wiki_15718](https://realm.wiki/item?id=15718) | 3 poison | 3.98s | 2 | damage ; field heal |
| poison | [Murky Toxin / wiki_29040](https://realm.wiki/item?id=29040) | 4 poison | 3.98s | 2 | damage  |
| poison | [Pandemic Poison / wiki_23623](https://realm.wiki/item?id=23623) | 4 poison | 3.72s | 2 |  |
| poison | [Parasitic Concoction / wiki_3033](https://realm.wiki/item?id=3033) | 3 poison | 3.85s | 2 | damage  |
| poison | [Plague Poison / wiki_3181](https://realm.wiki/item?id=3181) | 3 poison | 3.72s | 2 |  |
| poison | [Polarity Poison / wiki_18347](https://realm.wiki/item?id=18347) | 5 poison | 3.98s | 2 | poison ; damage  |
| poison | [Pollen Incendiary / wiki_20917](https://realm.wiki/item?id=20917) | 4 poison | 5.78s | 2 | damage ; conditional ability |
| poison | [Rusted Barrel / wiki_14283](https://realm.wiki/item?id=14283) | 3 poison | 3.72s | 2 |  |
| poison | [Sewer Cocktail / wiki_29036](https://realm.wiki/item?id=29036) | 4 poison | 3.85s | 2 | status chill |
| poison | [Spirit's Bane / wiki_14698](https://realm.wiki/item?id=14698) | 3 poison | 3.98s | 2 | damage ; buff wisdom |
| poison | [Trick Poison / wiki_65341](https://realm.wiki/item?id=65341) | 3 poison | 3.85s | 2 | damage  |
| poison | [Tyrant's Toxin / wiki_6937](https://realm.wiki/item?id=6937) | 3 poison | 3.98s | 3 | poison ; damage ; conditional ability |
| poison | [Virulent Venom / wiki_19257](https://realm.wiki/item?id=19257) | 5 poison | 3.85s | 2 | damage ; conditional hurt |
| skull | [Blood Essence / wiki_42303](https://realm.wiki/item?id=42303) | 5 summon | 6.27s | 3 | pet  |
| skull | [Brain Cube / wiki_49694](https://realm.wiki/item?id=49694) | 5 summon | 4.18s | 4 | pet  |
| skull | [Cracked Crystal Skull / wiki_3094](https://realm.wiki/item?id=3094) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| skull | [Crossbones Skull / wiki_3300](https://realm.wiki/item?id=3300) | 5 summon | 4.18s | 3 | pet ; charged release at 1500; conditional heal |
| skull | [Cubic Frame / wiki_16978](https://realm.wiki/item?id=16978) | 5 summon | 6.27s | 3 | pet  |
| skull | [Demon Lord's Skull / wiki_21010](https://realm.wiki/item?id=21010) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| skull | [Epiphany Skull / wiki_23349](https://realm.wiki/item?id=23349) | 26 drain | 4.18s | 3 | pet  |
| skull | [Ever Green Skull / wiki_7355](https://realm.wiki/item?id=7355) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| skull | [Fossilized Skull / wiki_48129](https://realm.wiki/item?id=48129) | 5 summon | 4.18s | 3 | pet ; conditional ability, hit |
| skull | [Hooded Skull / wiki_32485](https://realm.wiki/item?id=32485) | 5 summon | 4.33s | 3 | pet ; buff attack |
| skull | [Hydroflow Skull / wiki_54909](https://realm.wiki/item?id=54909) | 5 summon | 4.33s | 3 | heal ; pet ; charged release at 1500; conditional heal |
| skull | [Legion Elite Skull / wiki_41837](https://realm.wiki/item?id=41837) | 5 summon | 4.33s | 3 | heal ; pet ; charged release at 1500; conditional heal |
| skull | [Mask of Passion / wiki_7330](https://realm.wiki/item?id=7330) | 5 summon | 6.27s | 4 | pet ; conditional ability |
| skull | [Maw of Malignance / wiki_5184](https://realm.wiki/item?id=5184) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| skull | [Memento Mori / wiki_2525](https://realm.wiki/item?id=2525) | 6 summon | 6s | 4 | Existing custom signature retained |
| skull | [Perennial Cranium / wiki_19350](https://realm.wiki/item?id=19350) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| skull | [Ritual Skull / wiki_8785](https://realm.wiki/item?id=8785) | 5 summon | 6.27s | 4 | pet ; conditional ability |
| skull | [Sealed Crystal Skull / wiki_13987](https://realm.wiki/item?id=13987) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| skull | [Skull of Corrupted Souls / wiki_592](https://realm.wiki/item?id=592) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| skull | [Skull of Endless Torment / wiki_2321](https://realm.wiki/item?id=2321) | 4 summon | 6.5s | 4 | Existing custom signature retained; charged release at 4500 |
| skull | [Skull of Endless Torment / wiki_53191](https://realm.wiki/item?id=53191) | 20 drain | 6s | 3 | Existing custom signature retained |
| skull | [Skull of Krampus / wiki_8337](https://realm.wiki/item?id=8337) | 5 summon | 4.18s | 3 | pet ; charged release at 1500; conditional heal |
| skull | [Skull of Restless Souls / wiki_20893](https://realm.wiki/item?id=20893) | 5 summon | 4.18s | 3 | pet  |
| skull | [Skullish Remains of Esben / wiki_1895](https://realm.wiki/item?id=1895) | 5 summon | 4.18s | 3 | pet ; conditional heal |
| trap | [Blacklight Artifice / wiki_20962](https://realm.wiki/item?id=20962) | 3 bleed | 3.72s | 1 | ; conditional ability |
| trap | [Cave Dweller Trap / wiki_1202](https://realm.wiki/item?id=1202) | 5 bleed | 3.72s | 1 |  |
| trap | [Consecrated Trap / wiki_14790](https://realm.wiki/item?id=14790) | 3 bleed | 3.85s | 1 | damage  |
| trap | [Coral Venom Trap / wiki_3100](https://realm.wiki/item?id=3100) | 4 bleed | 3.85s | 1 | damage  |
| trap | [Deadly Keg / wiki_17847](https://realm.wiki/item?id=17847) | 5 bleed | 3.85s | 1 | damage  |
| trap | [Greedsnatcher Trap / wiki_8339](https://realm.wiki/item?id=8339) | 4 bleed | 3.85s | 1 | damage  |
| trap | [Helium Trap / wiki_23351](https://realm.wiki/item?id=23351) | 6 bleed | 3.72s | 1 |  |
| trap | [Honeytomb Snare / wiki_2296](https://realm.wiki/item?id=2296) | 3 bleed | 5.78s | 1 | damage  |
| trap | [Hydroflow Trap / wiki_54917](https://realm.wiki/item?id=54917) | 4 bleed | 3.85s | 1 | damage  |
| trap | [Legion Elite Trap / wiki_41845](https://realm.wiki/item?id=41845) | 4 bleed | 3.85s | 1 | damage  |
| trap | [Lifebringing Lotus / wiki_6213](https://realm.wiki/item?id=6213) | 3 bleed | 3.85s | 1 | damage  |
| trap | [Lightning Rod / wiki_32438](https://realm.wiki/item?id=32438) | 4 bleed | 3.72s | 1 |  |
| trap | [Mimicry Trap / wiki_19252](https://realm.wiki/item?id=19252) | 4 bleed | 5.78s | 1 | damage  |
| trap | [Mouse Trap / wiki_18079](https://realm.wiki/item?id=18079) | 5 bleed | 3.72s | 1 |  |
| trap | [Ocular Entrapment / wiki_23512](https://realm.wiki/item?id=23512) | 3 bleed | 3.72s | 1 |  |
| trap | [Painbow / wiki_25109](https://realm.wiki/item?id=25109) | 5 bleed | 5.58s | 1 |  |
| trap | [Rain Maker / wiki_20480](https://realm.wiki/item?id=20480) | 5 bleed | 5.58s | 1 |  |
| trap | [Sulfuric Stone / wiki_26129](https://realm.wiki/item?id=26129) | 4 bleed | 3.98s | 1 | damage  |
| trap | [Trap of the Blood Spirit / wiki_29646](https://realm.wiki/item?id=29646) | 5 bleed | 3.85s | 1 | damage  |
| trap | [Trap of the Vile Spirit / wiki_2880](https://realm.wiki/item?id=2880) | 5 bleed | 3.85s | 1 | damage  |
| trap | [Trap of the Vile Spirit / wiki_37518](https://realm.wiki/item?id=37518) | 5 bleed | 3.85s | 1 | damage  |
| orb | [Command Cornea / wiki_23742](https://realm.wiki/item?id=23742) | 3 chill | 6.36s | 2 | hexBurst ; damage ; status vulnerable; conditional hit |
| orb | [Cosmic Astrolabe / wiki_22522](https://realm.wiki/item?id=22522) | 3 chill | 6.36s | 2 | relay ; hexBurst ; mana heal; damage ; conditional weapon, ability, hit |
| orb | [Enchantment Orb / wiki_2111](https://realm.wiki/item?id=2111) | 3 chill | 6.17s | 2 | hexBurst ; haste speed; damage ; conditional hit |
| orb | [Entrancing Hourglass / wiki_65057](https://realm.wiki/item?id=65057) | 3 chill | 5.97s | 1 | hexBurst ; damage ; conditional hit |
| orb | [Forbidden Artifact / wiki_26276](https://realm.wiki/item?id=26276) | 3 chill | 5.58s | 2 | pet  |
| orb | [Hydroflow Orb / wiki_54919](https://realm.wiki/item?id=54919) | 3 chill | 6.17s | 2 | hexBurst ; status vulnerable; damage ; conditional hit |
| orb | [Karma Orb / wiki_23352](https://realm.wiki/item?id=23352) | 3 chill | 5.78s | 1 | status chill |
| orb | [Legion Elite Orb / wiki_41847](https://realm.wiki/item?id=41847) | 3 chill | 6.17s | 2 | hexBurst ; status vulnerable; damage ; conditional hit |
| orb | [Orb of Aether / wiki_8386](https://realm.wiki/item?id=8386) | 3 chill | 5.97s | 1 | hexBurst ; damage ; conditional hit |
| orb | [Orb of Conflict / wiki_3083](https://realm.wiki/item?id=3083) | 14 damage | 7s | 4 | Existing custom signature retained |
| orb | [Orb of Conflict - Chaos / wiki_30042](https://realm.wiki/item?id=30042) | 3 chill | 6.17s | 2 | hexBurst ; buff attack; damage ; conditional hit |
| orb | [Orb of Conquest / wiki_19969](https://realm.wiki/item?id=19969) | 3 chill | 5.97s | 1 | hexBurst ; damage ; status vulnerable; conditional ability, hit |
| orb | [Orb of Sweet Demise / wiki_306](https://realm.wiki/item?id=306) | 3 chill | 6.17s | 2 | hexBurst ; status chill; damage ; conditional hit |
| orb | [Orb of Terror / wiki_29647](https://realm.wiki/item?id=29647) | 3 chill | 6.17s | 2 | hexBurst ; buff attack; damage ; conditional hit |
| orb | [Orb of the Sabbath / wiki_25752](https://realm.wiki/item?id=25752) | 3 chill | 6.17s | 2 | status chill; buff speed; haste speed |
| orb | [Primal Arcana / wiki_14992](https://realm.wiki/item?id=14992) | 3 chill | 5.58s | 1 | status vulnerable; conditional weapon, hit |
| orb | [Scorchium Stone / wiki_19268](https://realm.wiki/item?id=19268) | 3 chill | 5.97s | 1 | hexBurst ; damage ; status vulnerable; conditional hit |
| orb | [Snowbound Orb / wiki_8334](https://realm.wiki/item?id=8334) | 3 chill | 6.17s | 2 | hexBurst ; status vulnerable; damage ; conditional hit |
| orb | [Soul of the Bearer / wiki_9058](https://realm.wiki/item?id=9058) | 2.5 chill | 7s | 3 | Existing custom signature retained |
| orb | [Sphere of Ice / wiki_4302](https://realm.wiki/item?id=4302) | 3 chill | 5.58s | 1 | status vulnerable |
| orb | [Teratoma / wiki_48890](https://realm.wiki/item?id=48890) | 3 chill | 5.97s | 1 | hexBurst ; damage ; conditional hit |
| orb | [Titan's Heart / wiki_57471](https://realm.wiki/item?id=57471) | 3 chill | 6.17s | 2 | status chill; status vulnerable; buff defense |
| orb | [Treasure Orb / wiki_43382](https://realm.wiki/item?id=43382) | 3 chill | 6.36s | 2 | relay ; hexBurst ; mana heal; damage ; conditional weapon, ability, hit |
| orb | [Vision of Draconis / wiki_5194](https://realm.wiki/item?id=5194) | 3 chill | 5.58s | 2 | pet  |
| prism | [Accursed Memory / wiki_22507](https://realm.wiki/item?id=22507) | 1 dodge | 7.29s | 2 | relay ; heal ; damage  |
| prism | [Ase's Echo / wiki_5266](https://realm.wiki/item?id=5266) | 1 dodge | 6.83s | 1 | relay ; conditional ability |
| prism | [Brain of the Golem / wiki_601](https://realm.wiki/item?id=601) | 1 dodge | 6.83s | 1 | delay  |
| prism | [Corsair's Crown Jewel / wiki_26274](https://realm.wiki/item?id=26274) | 1 dodge | 6.6s | 2 | pet  |
| prism | [Daevite Progenitor / wiki_17135](https://realm.wiki/item?id=17135) | 1 dodge | 6.6s | 2 | ; conditional ability |
| prism | [Echoes Prism / wiki_1206](https://realm.wiki/item?id=1206) | 1 dodge | 6.6s | 2 | pet  |
| prism | [Fool's Prism / wiki_23353](https://realm.wiki/item?id=23353) | 1 dodge | 9.9s | 1 |  |
| prism | [Fool's Prism / wiki_37689](https://realm.wiki/item?id=37689) | 1 dodge | 9.9s | 1 |  |
| prism | [Gambler's Fate / wiki_28830](https://realm.wiki/item?id=28830) | 1 dodge | 9.9s | 1 |  |
| prism | [Ghostly Prism / wiki_3114](https://realm.wiki/item?id=3114) | 1 dodge | 6.83s | 1 | pet ; relay  |
| prism | [Heart of Gold Prism / wiki_1904](https://realm.wiki/item?id=1904) | 1 dodge | 7.06s | 1 | delay ; relay  |
| prism | [Hydroflow Prism / wiki_54920](https://realm.wiki/item?id=54920) | 1 dodge | 7.06s | 1 | delay ; relay  |
| prism | [Legion Elite Prism / wiki_41848](https://realm.wiki/item?id=41848) | 1 dodge | 7.06s | 1 | delay ; relay  |
| prism | [Ornamental Prism / wiki_8341](https://realm.wiki/item?id=8341) | 1 dodge | 7.06s | 1 | delay ; relay  |
| prism | [Prism of Dancing Swords / wiki_2322](https://realm.wiki/item?id=2322) | 1 dodge | 6.83s | 1 | delay  |
| prism | [Prism of Dire Instability / wiki_3394](https://realm.wiki/item?id=3394) | 1 dodge | 6.83s | 1 | delay  |
| prism | [Prism of Shattered Light / wiki_21210](https://realm.wiki/item?id=21210) | 1 dodge | 6.83s | 1 | delay ; conditional ability |
| prism | [Prismimic / wiki_19254](https://realm.wiki/item?id=19254) | 1 dodge | 6.83s | 1 | pet ; relay  |
| prism | [Pumpkin Prism / wiki_25732](https://realm.wiki/item?id=25732) | 1 dodge | 6.83s | 1 | delay  |
| prism | [Rectangular Prism / wiki_47947](https://realm.wiki/item?id=47947) | 1 dodge | 6.6s | 1 | pet ; status chill |
| prism | [The Heart of the Dragon / wiki_26264](https://realm.wiki/item?id=26264) | 1 dodge | 6.83s | 1 | delay  |
| scepter | [+Tezutsu Hanabi / wiki_19322](https://realm.wiki/item?id=19322) | 17 damage | 4.18s | 2 | ; conditional ability |
| scepter | [Cnidaria Rod / wiki_2556](https://realm.wiki/item?id=2556) | 17 damage | 4.18s | 2 |  |
| scepter | [Eggsponential Scepter / wiki_41739](https://realm.wiki/item?id=41739) | 17 damage | 4.18s | 2 |  |
| scepter | [Grotesque Scepter / wiki_3005](https://realm.wiki/item?id=3005) | 36 damage | 3.58s | 2 | hex ; status chill |
| scepter | [Honey Scepter / wiki_310](https://realm.wiki/item?id=310) | 18 damage | 4.18s | 2 |  |
| scepter | [Honey Scepter Supreme / wiki_23354](https://realm.wiki/item?id=23354) | 18 damage | 4.18s | 2 |  |
| scepter | [Hydroflow Scepter / wiki_54910](https://realm.wiki/item?id=54910) | 29 damage | 4.18s | 2 |  |
| scepter | [Legion Elite Scepter / wiki_41838](https://realm.wiki/item?id=41838) | 29 damage | 4.18s | 2 |  |
| scepter | [Lightshow Scepter / wiki_19363](https://realm.wiki/item?id=19363) | 20 damage | 4.33s | 2 | buff wisdom; conditional ability |
| scepter | [Lovesick Scepter / wiki_1221](https://realm.wiki/item?id=1221) | 20 damage | 4.33s | 2 | buff wisdom; conditional ability |
| scepter | [Parrot Skeleton Scepter / wiki_3301](https://realm.wiki/item?id=3301) | 29 damage | 4.18s | 2 |  |
| scepter | [Scepter of Devastation / wiki_1977](https://realm.wiki/item?id=1977) | 20 damage | 4.18s | 2 |  |
| scepter | [Scepter of Fulmination / wiki_3120](https://realm.wiki/item?id=3120) | 17 damage | 4.18s | 2 |  |
| scepter | [Scepter of Rust / wiki_49693](https://realm.wiki/item?id=49693) | 30 damage | 4.18s | 2 |  |
| scepter | [Scepter of Sainthood / wiki_8346](https://realm.wiki/item?id=8346) | 29 damage | 4.18s | 2 |  |
| scepter | [Scepter of the Transgressor / wiki_42289](https://realm.wiki/item?id=42289) | 20 damage | 4.18s | 2 |  |
| scepter | [Siege Scepter / wiki_19298](https://realm.wiki/item?id=19298) | 40 damage | 4.18s | 2 | ; conditional ability |
| scepter | [Storm Caller / wiki_14265](https://realm.wiki/item?id=14265) | 17 damage | 4.18s | 2 |  |
| scepter | [Tezutsu Hanabi / wiki_20466](https://realm.wiki/item?id=20466) | 17 damage | 4.18s | 2 | ; conditional ability |
| scepter | [Totem Scepter / wiki_65288](https://realm.wiki/item?id=65288) | 33 damage | 4.18s | 3 |  |
| scepter | [Wrathful Conduit / wiki_48139](https://realm.wiki/item?id=48139) | 40 damage | 4.18s | 2 |  |
| shuriken | [Ballistic Star / wiki_28847](https://realm.wiki/item?id=28847) | 22 damage | 3.37s | 1 | field heal |
| shuriken | [Clover Star / wiki_29718](https://realm.wiki/item?id=29718) | 13 damage | 3.26s | 0 |  |
| shuriken | [Combcutter Kunai / wiki_55414](https://realm.wiki/item?id=55414) | 13 damage | 3.26s | 0 | ; conditional weapon |
| shuriken | [Crystalline Kunai / wiki_19262](https://realm.wiki/item?id=19262) | 19 damage | 3.26s | 0 | ; conditional hurt |
| shuriken | [Daybreak Chakram / wiki_7768](https://realm.wiki/item?id=7768) | 22 damage | 3.26s | 0 |  |
| shuriken | [Enchanted Chisel / wiki_52040](https://realm.wiki/item?id=52040) | 22 damage | 3.26s | 0 |  |
| shuriken | [Eternal Star / wiki_34336](https://realm.wiki/item?id=34336) | 24 damage | 3.26s | 0 |  |
| shuriken | [Hanagasaku / wiki_19354](https://realm.wiki/item?id=19354) | 22 damage | 3.26s | 1 |  |
| shuriken | [Hydroflow Star / wiki_54911](https://realm.wiki/item?id=54911) | 19 damage | 3.26s | 0 |  |
| shuriken | [Igneous Starblossom / wiki_55409](https://realm.wiki/item?id=55409) | 22 damage | 3.26s | 1 |  |
| shuriken | [Ilex Star / wiki_8345](https://realm.wiki/item?id=8345) | 19 damage | 3.26s | 0 |  |
| shuriken | [Invocation Scroll / wiki_26730](https://realm.wiki/item?id=26730) | 23 damage | 3.26s | 0 | ; conditional weapon |
| shuriken | [Kagebooshi / wiki_3821](https://realm.wiki/item?id=3821) | 22 damage | 3.26s | 1 |  |
| shuriken | [Kageboshi / wiki_6205](https://realm.wiki/item?id=6205) | 22 damage | 3.26s | 1 |  |
| shuriken | [Legion Elite Star / wiki_41839](https://realm.wiki/item?id=41839) | 19 damage | 3.26s | 0 |  |
| shuriken | [Midnight Star / wiki_2326](https://realm.wiki/item?id=2326) | 19 damage | 3.26s | 1 |  |
| shuriken | [Overwhelming Axehead / wiki_23915](https://realm.wiki/item?id=23915) | 26 damage | 3.37s | 1 | mana heal; conditional weapon |
| shuriken | [Rage Claws / wiki_19291](https://realm.wiki/item?id=19291) | 23 damage | 3.26s | 1 | ; conditional ability |
| shuriken | [Spider Shuriken / wiki_14149](https://realm.wiki/item?id=14149) | 13 damage | 3.26s | 0 | status chill |
| shuriken | [Star of Enlightenment / wiki_1421](https://realm.wiki/item?id=1421) | 24 damage | 3.26s | 0 |  |
| shuriken | [Storied Blades / wiki_26277](https://realm.wiki/item?id=26277) | 13 damage | 3.26s | 0 | ; conditional weapon |
| shuriken | [Testiken / wiki_39338](https://realm.wiki/item?id=39338) | 25 damage | 3.26s | 0 |  |
| shuriken | [Testiken ATT / wiki_39339](https://realm.wiki/item?id=39339) | 29 damage | 3.26s | 0 |  |
| shuriken | [Testiken DEF / wiki_39340](https://realm.wiki/item?id=39340) | 29 damage | 3.26s | 0 |  |
| shuriken | [Testiken DEX / wiki_39341](https://realm.wiki/item?id=39341) | 29 damage | 3.26s | 0 |  |
| shuriken | [Testiken SPD / wiki_39342](https://realm.wiki/item?id=39342) | 29 damage | 3.26s | 0 |  |
| shuriken | [Testiken VIT / wiki_39343](https://realm.wiki/item?id=39343) | 29 damage | 3.26s | 0 |  |
| shuriken | [Testiken WIS / wiki_39344](https://realm.wiki/item?id=39344) | 29 damage | 3.26s | 0 |  |
| shuriken | [Unshuriken / wiki_23355](https://realm.wiki/item?id=23355) | 14 damage | 3.26s | 0 |  |
| wakizashi | [Amaterasu / wiki_21002](https://realm.wiki/item?id=21002) | 22 damage | 4.65s | 2 | status vulnerable; conditional ability |
| wakizashi | [Esben's Twisted Heart / wiki_5164](https://realm.wiki/item?id=5164) | 29 damage | 4.65s | 2 |  |
| wakizashi | [Fractured Gemstone Wakizashi / wiki_1418](https://realm.wiki/item?id=1418) | 22 damage | 4.65s | 2 | pet  |
| wakizashi | [Hydroflow Wakizashi / wiki_54913](https://realm.wiki/item?id=54913) | 21 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [Kogbold Multitool / wiki_50307](https://realm.wiki/item?id=50307) | 28 damage | 4.81s | 1 | buff dexterity; status vulnerable |
| wakizashi | [Legion Elite Wakizashi / wiki_41841](https://realm.wiki/item?id=41841) | 21 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [NSFWakizashi / wiki_23357](https://realm.wiki/item?id=23357) | 22 damage | 4.81s | 1 | status vulnerable |
| wakizashi | [Peppermint Wakizashi / wiki_613](https://realm.wiki/item?id=613) | 21 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [Ronin's Wakizashi / wiki_1407](https://realm.wiki/item?id=1407) | 22 damage | 4.65s | 1 | status chill |
| wakizashi | [Ryu's Blade / wiki_3900](https://realm.wiki/item?id=3900) | 22 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [Sakura Wakizashi / wiki_6206](https://realm.wiki/item?id=6206) | 22 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [Sentinel's Sidearm / wiki_17187](https://realm.wiki/item?id=17187) | 22 damage | 3.72s | 2 | pet ; status vulnerable |
| wakizashi | [Shadow Serpent Sidearm / wiki_21120](https://realm.wiki/item?id=21120) | 28 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [Sublimation Sidearm / wiki_26574](https://realm.wiki/item?id=26574) | 22 damage | 4.65s | 1 | status vulnerable; conditional ability |
| wakizashi | [Sweetcut Wakizashi / wiki_34339](https://realm.wiki/item?id=34339) | 22 damage | 4.65s | 2 | pet  |
| wakizashi | [Wakizashi of Crossing Fires / wiki_9152](https://realm.wiki/item?id=9152) | 22 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [Wakizashi of Eastern Winds / wiki_8994](https://realm.wiki/item?id=8994) | 22 damage | 4.65s | 1 | status vulnerable |
| wakizashi | [Watarimono / wiki_21221](https://realm.wiki/item?id=21221) | 23 damage | 4.65s | 1 |  |
| lute | [Angel's Fanfare / wiki_19962](https://realm.wiki/item?id=19962) | 3.78 haste | 4.98s | 1 | buff dexterity; block heal; conditional ability |
| lute | [Chief's War Horn / wiki_19971](https://realm.wiki/item?id=19971) | 3.78 haste | 7.22s | 1 | pet ; buff dexterity; conditional ability |
| lute | [Ghost Ship's Bell / wiki_1780](https://realm.wiki/item?id=1780) | 3.78 haste | 4.81s | 1 | buff dexterity; conditional weapon |
| lute | [Hydroflow Singing Glass / wiki_54918](https://realm.wiki/item?id=54918) | 3.54 haste | 4.98s | 1 | buff dexterity; buff defense |
| lute | [Inferno Pick / wiki_52033](https://realm.wiki/item?id=52033) | 3.78 haste | 4.98s | 1 | buff dexterity; block heal; conditional ability |
| lute | [Joker Timbrel / wiki_26258](https://realm.wiki/item?id=26258) | 3.78 haste | 4.81s | 1 | buff dexterity; conditional weapon |
| lute | [Legion Elite Drums / wiki_41846](https://realm.wiki/item?id=41846) | 3.54 haste | 4.98s | 1 | buff dexterity; buff defense |
| lute | [Lullaby / wiki_14207](https://realm.wiki/item?id=14207) | 3.78 haste | 4.98s | 1 | pet ; buff dexterity; buff defense |
| lute | [Motivational Megaphone / wiki_23916](https://realm.wiki/item?id=23916) | 3.78 haste | 4.81s | 1 | damage  |
| lute | [Noble Mandolin / wiki_14981](https://realm.wiki/item?id=14981) | 3.33 haste | 5.3s | 2 | buff attack; buff dexterity; damage  |
| lute | [Obsidian Lyre / wiki_47998](https://realm.wiki/item?id=47998) | 3.47 haste | 5.14s | 2 | armored ; buff defense; damage  |
| lute | [Oryxmas Carol / wiki_12167](https://realm.wiki/item?id=12167) | 3.54 haste | 4.98s | 1 | buff dexterity; buff defense |
| lute | [Pharaoh's Requiem / wiki_19951](https://realm.wiki/item?id=19951) | 3.78 haste | 4.81s | 1 | buff dexterity; conditional hurt |
| lute | [Piper's Pan Flute / wiki_18074](https://realm.wiki/item?id=18074) | 3.62 haste | 4.98s | 1 | buff dexterity; field heal; conditional ability |
| lute | [Sacred Lute / wiki_47105](https://realm.wiki/item?id=47105) | 3.7 haste | 7.46s | 1 | buff dexterity; field heal |
| lute | [Snake Charmer Pungi / wiki_19950](https://realm.wiki/item?id=19950) | 3.7 haste | 4.98s | 1 | buff speed; buff defense |
| lute | [Taiko Drums / wiki_20605](https://realm.wiki/item?id=20605) | 3.78 haste | 4.81s | 1 | buff dexterity |
| lute | [The Triangle / wiki_44916](https://realm.wiki/item?id=44916) | 3.47 haste | 5.14s | 2 | buff dexterity; buff attack; damage  |
| lute | [Thundering Chorus / wiki_14354](https://realm.wiki/item?id=14354) | 3.87 haste | 4.81s | 1 | buff dexterity |
| lute | [Wavecrest Concertina / wiki_19948](https://realm.wiki/item?id=19948) | 3.78 haste | 4.81s | 1 | buff dexterity; conditional weapon |
| mace | [B.O.O.M. / wiki_14227](https://realm.wiki/item?id=14227) | 3 summon | 5.58s | 4 | pet  |
| mace | [Big Berdtha / wiki_48140](https://realm.wiki/item?id=48140) | 4 summon | 5.58s | 3 | pet  |
| mace | [Chocolate Egg Mace / wiki_41764](https://realm.wiki/item?id=41764) | 1 summon | 5.58s | 3 | pet ; conditional ability |
| mace | [Crystal Mace / wiki_14336](https://realm.wiki/item?id=14336) | 3 summon | 5.58s | 3 | pet  |
| mace | [Dragon Mace / wiki_26259](https://realm.wiki/item?id=26259) | 3 summon | 5.58s | 3 | pet  |
| mace | [Ghastly Mace / wiki_14780](https://realm.wiki/item?id=14780) | 3 summon | 5.58s | 4 | pet  |
| mace | [Hivemind Mace / wiki_10303](https://realm.wiki/item?id=10303) | 6 summon | 5.58s | 4 | pet  |
| mace | [Hydroflow Mace / wiki_54921](https://realm.wiki/item?id=54921) | 7 summon | 5.58s | 3 | pet  |
| mace | [Incubation Mace / wiki_10304](https://realm.wiki/item?id=10304) | 1 summon | 5.58s | 4 | pet  |
| mace | [Legion Elite Mace / wiki_41849](https://realm.wiki/item?id=41849) | 7 summon | 5.58s | 3 | pet  |
| mace | [Mace of the Celestial Forest / wiki_10291](https://realm.wiki/item?id=10291) | 7 summon | 5.58s | 3 | pet  |
| mace | [Mace of the Depths / wiki_14212](https://realm.wiki/item?id=14212) | 8 summon | 5.58s | 3 | pet  |
| mace | [Mace of the North Pole / wiki_14341](https://realm.wiki/item?id=14341) | 7 summon | 5.58s | 3 | pet  |
| mace | [Mace of the Pumpkin Effigy / wiki_20906](https://realm.wiki/item?id=20906) | 6 summon | 5.58s | 3 | pet  |
| mace | [Mace of the Woods / wiki_42014](https://realm.wiki/item?id=42014) | 4 summon | 5.58s | 3 | pet  |
| mace | [Mechanical Mace / wiki_14245](https://realm.wiki/item?id=14245) | 5 summon | 5.58s | 3 | pet ; conditional ability |
| mace | [Minotaur Mace / wiki_7433](https://realm.wiki/item?id=7433) | 1 summon | 5.58s | 4 | pet  |
| mace | [Peacekeeper / wiki_14976](https://realm.wiki/item?id=14976) | 5 summon | 5.58s | 4 | pet  |
| mace | [Recursion Mace / wiki_18499](https://realm.wiki/item?id=18499) | 4 summon | 8.37s | 3 | pet  |
| mace | [Stonemould Mace / wiki_14219](https://realm.wiki/item?id=14219) | 1 summon | 5.58s | 3 | pet ; conditional ability |
| mace | [Trick Mace / wiki_65339](https://realm.wiki/item?id=65339) | 5 summon | 5.58s | 3 | pet ; conditional ability |
| sheath | [An Ancient's Embrace / wiki_1381](https://realm.wiki/item?id=1381) | 20 block | 2.98s | 0 |  |
| sheath | [Blitz Sheath / wiki_14660](https://realm.wiki/item?id=14660) | 19 block | 5.13s | 0 | damage ; conditional hurt |
| sheath | [Cavalry Lance / wiki_3851](https://realm.wiki/item?id=3851) | 18 block | 3.85s | 0 | damage ; status chill |
| sheath | [Elegant Parasol / wiki_20606](https://realm.wiki/item?id=20606) | 18 block | 5.13s | 0 | damage ; status chill |
| sheath | [Hydroflow Sheath / wiki_54915](https://realm.wiki/item?id=54915) | 18 block | 3.85s | 0 | damage  |
| sheath | [Irradiance Sheath / wiki_14816](https://realm.wiki/item?id=14816) | 18 block | 3.85s | 0 | damage  |
| sheath | [Kaiken / wiki_14817](https://realm.wiki/item?id=14817) | 18 block | 5.13s | 0 | damage ; status chill |
| sheath | [Labyrinth Dweller's Sheath / wiki_14819](https://realm.wiki/item?id=14819) | 19 block | 3.85s | 0 | damage  |
| sheath | [Legion Elite Sheath / wiki_41843](https://realm.wiki/item?id=41843) | 18 block | 3.85s | 0 | damage  |
| sheath | [Loch Sheath / wiki_14867](https://realm.wiki/item?id=14867) | 19 block | 5.13s | 0 | damage  |
| sheath | [Paper Machete / wiki_14661](https://realm.wiki/item?id=14661) | 20 block | 5.58s | 0 |  |
| sheath | [Pyro Sheath / wiki_14380](https://realm.wiki/item?id=14380) | 19 block | 5.13s | 0 | damage  |
| sheath | [Quartermaster Scabbard / wiki_14820](https://realm.wiki/item?id=14820) | 19 block | 3.85s | 0 | damage ; conditional ability |
| sheath | [S.H.E.A.T.H. / wiki_5189](https://realm.wiki/item?id=5189) | 19 block | 3.72s | 0 | ; conditional ability |
| sheath | [Sheath of Thunderous Rites / wiki_26275](https://realm.wiki/item?id=26275) | 19 block | 3.72s | 0 | ; conditional ability |
| sheath | [Snowman's Sheath / wiki_14662](https://realm.wiki/item?id=14662) | 18 block | 3.85s | 0 | damage  |
| sheath | [Volcanic Sheath / wiki_14818](https://realm.wiki/item?id=14818) | 20 block | 2.98s | 0 |  |
| sigil | [Crystalline Sigil / wiki_31648](https://realm.wiki/item?id=31648) | 9 heal | 3.98s | 2 | field heal; damage ; charged release at 550; conditional ability, hit, hurt |
| sigil | [Draconic Insignia / wiki_31611](https://realm.wiki/item?id=31611) | 9 heal | 3.85s | 2 | damage ; charged release at 1000; conditional ability, hit |
| sigil | [Hawkmaster Sigil / wiki_31650](https://realm.wiki/item?id=31650) | 9 heal | 3.85s | 2 | damage ; charged release at 600; conditional weapon, ability, hit |
| sigil | [Hydroflow Sigil / wiki_54923](https://realm.wiki/item?id=54923) | 9 heal | 3.85s | 2 | damage ; charged release at 500; conditional ability, hit |
| sigil | [Hyper Sigil / wiki_48831](https://realm.wiki/item?id=48831) | 9 heal | 3.85s | 2 | damage ; charged release at 900; conditional ability, hit |
| sigil | [Jurassic Sigil / wiki_63885](https://realm.wiki/item?id=63885) | 9 heal | 3.85s | 2 | pet ; damage ; charged release at 500; conditional ability, hit |
| sigil | [Legion Elite Sigil / wiki_31652](https://realm.wiki/item?id=31652) | 9 heal | 3.85s | 2 | damage ; charged release at 500; conditional ability, hit |
| sigil | [Mechraptor Sigil / wiki_31649](https://realm.wiki/item?id=31649) | 9 heal | 3.85s | 2 | pet ; damage ; charged release at 500; conditional ability, hit |
| sigil | [Sharktooth Sigil / wiki_31603](https://realm.wiki/item?id=31603) | 9 heal | 3.85s | 2 | damage ; charged release at 425; conditional ability, hit |
| sigil | [Sigil of the Reindeer / wiki_31653](https://realm.wiki/item?id=31653) | 9 heal | 3.85s | 2 | damage ; charged release at 500; conditional ability, hit |
| sigil | [Sigil of the Rubber Duck / wiki_31651](https://realm.wiki/item?id=31651) | 10 heal | 3.85s | 2 | damage ; charged release at 500; conditional ability, hit |
| sigil | [Silken Sigil / wiki_31607](https://realm.wiki/item?id=31607) | 9 heal | 3.85s | 2 | damage ; status chill; charged release at 750; conditional ability, hit |
| sigil | [Skeletal Sigilpede / wiki_48144](https://realm.wiki/item?id=48144) | 9 heal | 3.85s | 3 | damage ; charged release at 500; conditional kill |
| sigil | [Swampy Sigil / wiki_48199](https://realm.wiki/item?id=48199) | 9 heal | 3.98s | 2 | heal ; damage ; charged release at 1000; conditional ability, hit |
| sigil | [Swarmlord's Sigil / wiki_31612](https://realm.wiki/item?id=31612) | 9 heal | 3.85s | 2 | damage ; charged release at 650; conditional ability, hit |

## Shiny variants

| Variant / ID | Resolved ability |
|---|---|
| Shiny Cloak of Bloody Surprises / wiki_7296 | Cloak of Bloody Surprises |
| Shiny Cloak of Cubic Enigma / wiki_5580 | Cloak of Cubic Enigma |
| Shiny Cloak of Refraction / wiki_38525 | Cloak of Refraction |
| Shiny Cloak of the Deep / wiki_53220 | Cloak of the Deep |
| Shiny Cloak of the Mad God / wiki_17934 | Cloak of the Mad God |
| Shiny Cloak of the Planewalker / wiki_65515 | Cloak of the Planewalker |
| Shiny Beehemoth Quiver / wiki_5343 | Beehemoth Quiver |
| Shiny Beehemoth Quiver / wiki_5344 | Beehemoth Quiver |
| Shiny Beehemoth Quiver / wiki_5345 | Beehemoth Quiver |
| Shiny Beehemoth Quiver / wiki_5346 | Beehemoth Quiver |
| Shiny Cocoon Quiver / wiki_5274 | Cocoon Quiver |
| Shiny Double Vision Darts / wiki_1213 | Double Vision Darts |
| Shiny Q.U.I.V.E.R. / wiki_37516 | Q.U.I.V.E.R. |
| Shiny Quiver of Shadows / wiki_51679 | Quiver of Shadows |
| Shiny Quiver of Thunder / wiki_7309 | Quiver of Thunder |
| Shiny Esben's Vows / wiki_7506 | Esben's Vows |
| Shiny Genesis Spell / wiki_38500 | Genesis Spell |
| Shiny Jade Storm / wiki_38545 | Jade Storm |
| Shiny Penetrating Blast Spell / wiki_17720 | Penetrating Blast Spell |
| Shiny Recurring Terror Spell / wiki_2038 | Recurring Terror Spell |
| Shiny Runes of Knowledge / wiki_53224 | Runes of Knowledge |
| Shiny Sporous Spray Spell / wiki_3047 | Sporous Spray Spell |
| Shiny Vitamine Buster / wiki_7410 | Vitamine Buster |
| Shiny Wandering Souls Spell / wiki_5356 | Wandering Souls Spell |
| Shiny Chaotic Scripture / wiki_38298 | Chaotic Scripture |
| Shiny Evolutionary Records / wiki_53221 | Evolutionary Records |
| Shiny Necronomicon / wiki_7375 | Necronomicon |
| Shiny Tome of Holy Protection / wiki_17718 | Tome of Holy Protection |
| Shiny Tome of Pain / wiki_5322 | Tome of Pain |
| Shiny Tome of Purification / wiki_65518 | Tome of Purification |
| Shiny Tome of the Mushroom Tribes / wiki_1278 | Tome of the Mushroom Tribes |
| Shiny Adamantine Helm / wiki_7397 | Adamantine Helm |
| Shiny Amber Encrusted Helmet / wiki_51680 | Amber Encrusted Helmet |
| Shiny Helm of the Juggernaut / wiki_51675 | Helm of the Juggernaut |
| Shiny Helm of the Juggernaut - Midas / wiki_51746 | Helm of the Juggernaut - Midas |
| Shiny Hivemaster Helm / wiki_65510 | Hivemaster Helm |
| Shiny Tipsy Topper / wiki_5796 | Tipsy Topper |
| Shiny Vanguard's Visage / wiki_3916 | Vanguard's Visage |
| Shiny Cavalry Lance / wiki_53219 | Cavalry Lance |
| Shiny Crystal Shield / wiki_1277 | Crystal Shield |
| Shiny Oryx's Escutcheon / wiki_38297 | Oryx's Escutcheon |
| Shiny Shield of Flowing Clarity / wiki_2034 | Shield of Flowing Clarity |
| Shiny Shield of Ogmur / wiki_7461 | Shield of Ogmur |
| Shiny Snakeskin Shield / wiki_37519 | Snakeskin Shield |
| Shiny Spiteful Scutum / wiki_5140 | Spiteful Scutum |
| Shiny Doom's Emblem / wiki_53218 | Doom's Emblem |
| Shiny Marble Seal / wiki_5297 | Marble Seal |
| Shiny Sandstone Seal / wiki_5795 | Sandstone Seal |
| Shiny Scholar's Seal / wiki_38294 | Scholar's Seal |
| Shiny Seal of Blasphemous Prayer / wiki_3048 | Seal of Blasphemous Prayer |
| Shiny Seal of Cubic Conundra / wiki_1214 | Seal of Cubic Conundra |
| Shiny Bottled Medusozoan / wiki_5312 | Bottled Medusozoan |
| Shiny Mighty Stein / wiki_38529 | Mighty Stein |
| Shiny Murky Toxin / wiki_5141 | Murky Toxin |
| Shiny Pandemic Poison / wiki_5335 | Pandemic Poison |
| Shiny Plague Poison / wiki_17845 | Plague Poison |
| Shiny Polarity Poison / wiki_17936 | Polarity Poison |
| Shiny Pollen Incendiary / wiki_53222 | Pollen Incendiary |
| Shiny Brain Cube / wiki_38547 | Brain Cube |
| Shiny Cracked Crystal Skull / wiki_5296 | Cracked Crystal Skull |
| Shiny Maw of Malignance / wiki_7474 | Maw of Malignance |
| Shiny Perennial Cranium / wiki_41488 | Perennial Cranium |
| Shiny Sealed Crystal Skull / wiki_7378 | Sealed Crystal Skull |
| Shiny Skull of Corrupted Souls / wiki_1211 | Skull of Corrupted Souls |
| Shiny Skull of Endless Torment / wiki_51676 | Skull of Endless Torment |
| Shiny Skull of Restless Souls / wiki_53217 | Skull of Restless Souls |
| Shiny Cave Dweller Trap / wiki_5348 | Cave Dweller Trap |
| Shiny Coral Venom Trap / wiki_38553 | Coral Venom Trap |
| Shiny Deadly Keg / wiki_1531 | Deadly Keg |
| Shiny Ocular Entrapment / wiki_3989 | Ocular Entrapment |
| Shiny Sulfuric Stone / wiki_7411 | Sulfuric Stone |
| Shiny Trap of the Vile Spirit / wiki_37675 | Trap of the Vile Spirit |
| Shiny Enchantment Orb / wiki_1532 | Enchantment Orb |
| Shiny Orb of Aether / wiki_5577 | Orb of Aether |
| Shiny Orb of Conflict / wiki_7380 | Orb of Conflict |
| Shiny Orb of Sweet Demise / wiki_38502 | Orb of Sweet Demise |
| Shiny Primal Arcana / wiki_2041 | Primal Arcana |
| Shiny Vision of Draconis / wiki_5277 | Vision of Draconis |
| Shiny Ase's Echo / wiki_5325 | Ase's Echo |
| Shiny Gambler's Fate / wiki_38299 | Gambler's Fate |
| Shiny Ghostly Prism / wiki_41485 | Ghostly Prism |
| Shiny Prism of Dancing Swords / wiki_3925 | Prism of Dancing Swords |
| Shiny Prism of Dire Instability / wiki_1530 | Prism of Dire Instability |
| Shiny Cnidaria Rod / wiki_17935 | Cnidaria Rod |
| Shiny Honey Scepter / wiki_5295 | Honey Scepter |
| Shiny Scepter of Devastation / wiki_17719 | Scepter of Devastation |
| Shiny Scepter of Fulmination / wiki_38520 | Scepter of Fulmination |
| Shiny Scepter of Rust / wiki_3045 | Scepter of Rust |
| Shiny Ballistic Star / wiki_38501 | Ballistic Star |
| Shiny Igneous Starblossom / wiki_5798 | Igneous Starblossom |
| Shiny Midnight Star / wiki_1328 | Midnight Star |
| Shiny Overwhelming Axehead / wiki_5748 | Overwhelming Axehead |
| Shiny Spider Shuriken / wiki_17933 | Spider Shuriken |
| Shiny Star of Enlightenment / wiki_65513 | Star of Enlightenment |
| Shiny Esben's Twisted Heart / wiki_5276 | Esben's Twisted Heart |
| Shiny Fractured Gemstone Wakizashi / wiki_38292 | Fractured Gemstone Wakizashi |
| Shiny Kogbold Multitool / wiki_3985 | Kogbold Multitool |
| Shiny Ronin's Wakizashi / wiki_7305 | Ronin's Wakizashi |
| Shiny Sentinel's Sidearm / wiki_1528 | Sentinel's Sidearm |
| Shiny Shadow Serpent Sidearm / wiki_7405 | Shadow Serpent Sidearm |
| Shiny Wakizashi of Crossing Fires / wiki_7477 | Wakizashi of Crossing Fires |
| Shiny Wakizashi of Eastern Winds / wiki_2036 | Wakizashi of Eastern Winds |
| Shiny Motivational Megaphone / wiki_41482 | Motivational Megaphone |
| Shiny Noble Mandolin / wiki_5278 | Noble Mandolin |
| Shiny Pharaoh's Requiem / wiki_38556 | Pharaoh's Requiem |
| Shiny Snake Charmer Pungi / wiki_3913 | Snake Charmer Pungi |
| Shiny Wavecrest Concertina / wiki_1329 | Wavecrest Concertina |
| Shiny Crystal Mace / wiki_2018 | Crystal Mace |
| Shiny Incubation Mace / wiki_38515 | Incubation Mace |
| Shiny Mace of the Celestial Forest / wiki_7285 | Mace of the Celestial Forest |
| Shiny Mace of the Depths / wiki_5575 | Mace of the Depths |
| Shiny Mace of the Pumpkin Effigy / wiki_53215 | Mace of the Pumpkin Effigy |
| Shiny Peacekeeper / wiki_3929 | Peacekeeper |
| Shiny Irradiance Sheath / wiki_5750 | Irradiance Sheath |
| Shiny Kaiken / wiki_37517 | Kaiken |
| Shiny Labyrinth Dweller's Sheath / wiki_5275 | Labyrinth Dweller's Sheath |
| Shiny Quartermaster Scabbard / wiki_2015 | Quartermaster Scabbard |
| Shiny S.H.E.A.T.H. / wiki_5321 | S.H.E.A.T.H. |
| Shiny Volcanic Sheath / wiki_3049 | Volcanic Sheath |
| Shiny Crystalline Sigil / wiki_7503 | Crystalline Sigil |
| Shiny Draconic Insignia / wiki_5749 | Draconic Insignia |
| Shiny Sharktooth Sigil / wiki_7473 | Sharktooth Sigil |
| Shiny Swarmlord's Sigil / wiki_7463 | Swarmlord's Sigil |

## Internal effect helpers

| Name / ID | Saved-copy parent |
|---|---|
| Breathing Cloak / wiki_20909 | Conservative retained helper recipe |
| Breathing Cloak / wiki_20910 | Conservative retained helper recipe |
| Breathing Cloak / wiki_5746 | Conservative retained helper recipe |
| Breathing Cloak / wiki_5747 | Conservative retained helper recipe |
| Darwin's Tome / wiki_20913 | Conservative retained helper recipe |
| Darwin's Tome / wiki_5745 | Conservative retained helper recipe |
| Sublimation Sidearm / wiki_26598 | Conservative retained helper recipe |
| Sublimation Sidearm / wiki_26599 | Conservative retained helper recipe |
| Sublimation Sidearm / wiki_26600 | Conservative retained helper recipe |
| Symbol of the Lost / wiki_26585 | wiki_26565 |
| Symbol of the Lost / wiki_26586 | wiki_26565 |
| Symbol of the Lost / wiki_26587 | wiki_26565 |
| Symbol of the Lost / wiki_26588 | wiki_26565 |
| Symbol of the Lost / wiki_26589 | wiki_26565 |
| Symbol of the Lost / wiki_26590 | wiki_26565 |
| Scorchium Stone / wiki_57472 | wiki_19268 |
| Scorchium Stone / wiki_57473 | wiki_19268 |
| Scorchium Stone / wiki_57474 | wiki_19268 |
| Scorchium Stone / wiki_57475 | wiki_19268 |
| Eye of the Spider / wiki_12146 | Conservative retained helper recipe |
| Midnight Star / wiki_55398 | wiki_2326 |
| Midnight Star / wiki_55399 | wiki_2326 |
| Midnight Star / wiki_55400 | wiki_2326 |
| Midnight Star / wiki_55401 | wiki_2326 |
| Midnight Star / wiki_55402 | wiki_2326 |
| Midnight Star / wiki_55403 | wiki_2326 |

## Validation

See `ability-balance.md` for the paired combat fixtures. Tests cover all 559 definitions, metadata preservation, all 176 tiered abilities and the entire non-ability definition complement, every profile in combat, charge ownership/overheal/release costs, forms, Hex, timed summons, golem counters, recursion, capacities, healing suppression, projectile hit deduplication and wave resets.
