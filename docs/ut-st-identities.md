# UT and ST identities — 0.21.5

The later [Dagger Update — 0.22.0](dagger-update.md) takes precedence for its named dagger recipes, including Corruption Cutter and Cronus. The source references below document the preceding identity pass.

This release adds researched profiles for **24 UT names and 24 pieces across six ST sets**. Including imported duplicate versions and Shiny counterparts, 78 catalogue entries use these profiles. The remaining imported UT/ST entries retain the existing family rules; this is not a claim that the entire catalogue has been individually recreated.

`game/realm-specials.js` is the canonical identity layer, loaded after `item-balance.js`. Names, IDs, sprites, footprints, native classes and saved item upgrades remain intact. Base and Shiny variants share mechanics. Existing Shiny bonuses remain a RealmPack rule.

## Translation rules

RealmPack fights one enemy at a time and has no aiming, movement or character DEF/WIS stats. These are adaptations with their own numerical budgets, not exact copies of RotMG combat. Close-range weapons use the **top backpack row**: 125% primary damage there, 65% elsewhere. Long-range weapons work in any row. The signature card explains this tradeoff before equipping.

Multi-shot damage is divided from one total primary budget. It does not multiply flat battle power, class activation counts or enchantment triggers per projectile. Divinity divides that budget between its strike and beam; only the beam bypasses enemy ward. Lumiaire’s projectiles have a short travel time and cannot spill into a new wave. No new random procs are used.

Armored reduces incoming damage by 20%, refreshes rather than stacks, and expires. Crystal retaliation requires actual health damage during that item's own armor window, with a one-second lock. Borrowed divinity prevents one direct attack in a short window; it does not prevent damage-over-time, and all copies share an eight-second lock. Mushrooms deliver six healing pulses, respect fatigue, and use only the strongest active field. All temporary resources reset at battle setup. Existing global attack-delay, summon, dodge and recharge limits still apply.

## UT profiles and research

Item links point to the inspected Realm.wiki game-data pages. Read on 2026-10-20. The behavior column describes **RealmPack**, not literal RotMG values.

| Item / reference | RealmPack identity |
| --- | --- |
| [Divinity](https://realm.wiki/item?id=28851) | Heavy strike plus instant Exalted beam; no bombs |
| [Doom Bow](https://realm.wiki/item?id=3074) | Very slow single heavy arrow; no three-shot charging cycle |
| [Leaf Bow](https://realm.wiki/item?id=3294) | Fast light arrows; occasional evasion translates movement bonus |
| [Coral Bow](https://realm.wiki/item?id=3088) | Fast twin arrows; no poison consumption |
| [Staff of Extreme Prejudice](https://realm.wiki/item?id=3075) | Ten-pellet point-blank barrage with row tradeoff |
| [Staff of the Crystal Serpent](https://realm.wiki/item?id=3093) | Twin weaving bolts; no elemental cycling |
| [Dirk of Cronus](https://realm.wiki/item?id=3082) | Heavy rainbow dagger; occasional mana translates WIS |
| [Demon Blade](https://realm.wiki/item?id=3073) | Twin close-range blades; no self-harm |
| [Avarice](https://realm.wiki/item?id=28829) | Reliable extended-reach dagger; no isolation gate |
| [Lumiaire](https://realm.wiki/item?id=28834) | Rapid twin light/dark bolts with travel time; no mana drain |
| [Superior](https://realm.wiki/item?id=28839) | Four-shot volleys; no ability-counter gate |
| [Bow of the Void](https://realm.wiki/item?id=588) | Consistent single arrows; no wave-opening proc |
| [Sword of the Colossus](https://realm.wiki/item?id=596) | Consistent heavy sword damage; no block consumption |
| [Corruption Cutter](https://realm.wiki/item?id=1408) | Two fast weaving cuts; no poison consumption |
| [Cloak of the Planewalker](https://realm.wiki/item?id=2650) | Evasion plus adjacent weapon repositioning/recharge; no cleanse |
| [Tome of Purification](https://realm.wiki/item?id=3081) | Healing and complete represented-debuff cleanse; usable through silence |
| [Tome of Holy Protection](https://realm.wiki/item?id=3102) | Block and temporary Armored; no instant heal |
| [Crystal Shield](https://realm.wiki/item?id=1177) | Crystal armor with on-hurt shard and small healing retaliation |
| [Quiver of Thunder](https://realm.wiki/item?id=3079) | Damage and chill translating Dazed |
| [Orb of Conflict](https://realm.wiki/item?id=3083) | Weapon activations build Hex; consuming Hex creates a soulshard |
| [Helm of the Juggernaut](https://realm.wiki/item?id=3080) | Armor plus adjacent haste |
| [Seal of Blasphemous Prayer](https://realm.wiki/item?id=3078) | Healing and a brief protected attack window |
| [Necronomicon](https://realm.wiki/item?id=1405) | Offensive tome with damage and curse; no summon consumption |
| [Tome of the Mushroom Tribes](https://realm.wiki/item?id=1151) | Healing mushroom field instead of pet-extension behavior |

Current game-data includes Conflict’s Hex/soulshards and Crystal Shield’s armor/retaliation; neither uses the older stasis/invulnerability interpretation. DECA's [Priest rework](https://remaster.realmofthemadgod.com/?p=4703) explicitly removes Holy Protection's instant heal and describes Necronomicon as trading group healing for curse/damage. Its discussion of rate-limited healing also informs the nonstacking mushroom adaptation. The wiki's raw XML and rendered tooltips can differ, so these choices are recorded explicitly rather than claiming perfect equivalence.

## ST sets

Two distinct packed pieces give this set +8% primary effect; three add +8% recharge. Four unlock the effect below. Those are **RealmPack thresholds and bonuses**, inspired by RotMG set completion, not copied set-stat tables. A designated first packed copy of the set ability triggers the four-piece bonus, at most once every four seconds. Duplicate copies, unrelated sets, stashed items and Legacy items do not fill missing slots. Individual pieces still work without completing a set. The inspection and catalogue cards show current packed progress, exact bonuses and the matching piece list.

| Set / reference | Four distinct pieces | Four-piece effect |
| --- | --- | --- |
| [Skuld 2 The ReGhostening](https://realm.wiki/item?id=10065) | Etherite Dagger; Ghastly Drape; Mantle of Skuld; Spectral Ring of Horrors | Stronger Ghastly nova plus brief attack delay |
| [Swoll Paladin](https://realm.wiki/item?id=1190) | Pixie-Enchanted Sword; Seal of the Enchanted Forest; Fairy Plate; Ring of Pure Wishes | Forest seal adds block and healing |
| [Priest of Geb](https://realm.wiki/item?id=9054) | Wand of Geb; Book of Geb; Shendyt of Geb; Geb's Ring of Wisdom | Book adds healing/mana; Wand's slowing nova works beyond the top row |
| [Pirate King Warrior](https://realm.wiki/item?id=8666) | Swashbuckler's Sickle; Tricorne of the High Seas; Naval Uniform; First Mate's Hook | Additional cannonball |
| [Oryx Awesome](https://realm.wiki/item?id=8962) | Sword of the Mad God; Onyx Shield of the Mad God; Almandine Armor of Anger; Almandine Ring of Wrath | Onyx Shield adds block and attack delay |
| [Phylactery Mystic](https://realm.wiki/item?id=9058) | The Phylactery; Soul of the Bearer; Soulless Robe; Ring of the Covetous Heart | Bearer's spirit summon |

Individual ST adaptations include Etherite's rapid cadence, Ghastly Drape's nova, Pixie's four blades, Geb's slowing nova, the wishing ring's healing-dependent attack proc, the Tricorne's cannon retaliation and the Bearer's stasis/tempo. Equip-stat-heavy armor/rings become resource or defensive pulses suited to this game's existing systems. Set completion has a payoff without disabling incomplete sets or requiring adjacent placement.

## Validation

`node game/tests/test-ut-st-identities.cjs` checks profile coverage, Shiny inheritance, shot budgets, positioning, beams, travel/waves, silence/cleanse, plane shift, armor expiry/retaliation, shared immunity lock, Hex, regeneration/fatigue, all six legal four-piece layouts, threshold/duplicate/stash/Legacy rules, set inspection and proc limits. Eighteen additional simulations run all six complete sets through actual boss combat across three dungeon tiers, with native class procs enabled. The existing regression suite remains required.

The unchanged class benchmark (`node scripts/benchmark-balance.cjs`) was run before and after the identity layer, using the same legal tiered builds and actual game tick. All 1,995 fight records were identical. This verifies that ordinary tier/class outcomes were preserved in that fixture; it does not establish parity across UT/ST combinations. Signature budgets deliberately redistribute damage, timing, resources and utility rather than stacking unrestricted benefits on the old generic premium.
