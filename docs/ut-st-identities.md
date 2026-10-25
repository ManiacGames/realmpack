# Armor follow-up — 0.39.0

The [complete armor pass](armor-identities.md) takes precedence for all 250 UT/ST armor variants, including Fungal Breastplate, New Life, Hallowed Hide, Toga Picta and Vesture of Duality. It uses source stats/signatures and the unchanged tiered armor anchors. Existing ST memberships and all non-armor item definitions are preserved. Earlier armor values below describe their historical release.

# Ring follow-up — 0.38.0

The [complete ring pass](ring-identities.md) now takes precedence for all 314 UT/ST ring variants, including Crown, Gemstone, Rosary and Interregnum. It translates source stats and signatures against the unchanged tiered ring archetypes. Existing ST memberships and all non-ring definitions are preserved. Ring values in the historical sections below describe their earlier release.

# Dagger follow-up — 0.34.0

The [researched dagger pass](dagger-identities.md) now takes precedence for every UT/ST dagger profile, including Etherite and Soulcursed Scythe. The [sword pass](sword-identities.md) remains authoritative for swords. Existing ST memberships and all non-dagger definitions are preserved. Earlier snapshot statements below describe their release at the time.

# Sword follow-up — 0.33.0

The [complete sword pass](sword-identities.md) now takes precedence for all 99 imported regular/retro/Shiny UT/ST sword weapon definitions. It adds source-backed profiles for the remaining swords, preserves existing ST membership and separates eight internal enchantment objects from new acquisition. Non-sword definitions, including daggers, retain their prior recipes. The sections below document preceding passes.

# UT and ST identities — 0.32.0

This second pass implements the first ten audited non-dagger items and four supporting ST pieces. There are now 62 individually researched names across eight complete ST sets; other imported items still use family rules. These are RealmPack adaptations, not literal RotMG damage or stat values. Existing IDs, sprites, footprints and saves remain compatible.

## Second-pass identities

References are the Realm.wiki item data inspected for this pass (2026-10-24). Values below are base profiles before class, upgrades, adjacency, set and Shiny modifiers. Weapon timing is derived from its existing family rank; multi-shot attacks divide one total budget.

| Item / source | RealmPack behavior |
| --- | --- |
| [Vesture of Duality](https://realm.wiki/item?id=28837) | 2 mana / 3.5s; +6 max mana. Successful ability use grants +20% weapon damage and +15% incoming direct damage for 3s. No phoenix rescue. |
| [Mechanical Kogbold Limb](https://realm.wiki/item?id=49469) | Slow twin bolts; 75% of their combined damage bypasses ward. No bombs. |
| [Fungal Breastplate](https://realm.wiki/item?id=1205) | +24 max HP; heal 12 / 3.5s, replacing the generic block pulse. |
| [Breastplate of New Life](https://realm.wiki/item?id=597) | +45 max HP; 14 block / 3.6s. |
| [The Forgotten Crown](https://realm.wiki/item?id=2987) | +18 max HP; adjacent weapons +8% primary damage and +6% recharge rate. Replaces its generic ring aura; generates no mana. |
| [Skull of Endless Torment](https://realm.wiki/item?id=2321) | 4 mana / 6.5s; raise one 4-damage undead for 7s, healing 1 HP per second. Actual healing charges its own meter to 8; next cast spends 8 on a 20-damage drain and venom/silence/slow cleanse. Never sacrifices companions. |
| [Socket Blade](https://realm.wiki/item?id=49471) | Very slow heavy strike; top backpack row 125% damage, elsewhere 65%. No automatic ward removal. |
| [Vampiric Cape](https://realm.wiki/item?id=17881) | 2 mana / 8s; one dodge plus 12 healing over 4s. Scythe enables 2s adjacent haste; Rosary enables three 1-damage bats for 4s. |
| [Hallowed Hide](https://realm.wiki/item?id=17885) | +10 max HP, adjacent weapon damage +4%; 6 block / 5s. With Rosary, a health hit leaving the player below 50% HP heals 12, with a shared 15s lock. Cannot rescue a lethal hit. |
| [Edictum Praetoris](https://realm.wiki/item?id=2524) | Three slower spiral projectiles share one damage budget and activation. |
| [Ruthven's Rosary](https://realm.wiki/item?id=17886) | +12 max HP; heal 3 and restore 1 mana / 6s. Enables Cape bats and Hide emergency healing. |
| [Memento Mori](https://realm.wiki/item?id=2525) | 4 mana / 6s; one non-healing 6-damage undead for 8s and +10% weapon damage for 3s. Its current source raises undead and grants Damaging; this is deliberately not another healing skull. |
| [Toga Picta](https://realm.wiki/item?id=2526) | +6 max mana; 8 block / 4.8s. Adjacent weapons gain +8% damage with 5% longer cooldowns, translating offensive stats and negative DEX. |
| [Interregnum](https://realm.wiki/item?id=2527) | +12 max HP; heal 2 / 6s. Every third successful ability can grant +8% weapon damage for 4s, shared 8s lock. Deterministic translation of the source's chance proc. |

The [retro Torment skull](https://realm.wiki/item?id=53191), ID `wiki_53191`, deliberately retains a different older identity: 20 drain / 6s, 3 mana and represented-debuff cleanse. The current skull is `wiki_2321`; duplicate names must not select the retro entry accidentally during tests.

## New sets and limits

**Vampire Rogue:** Soulcursed Scythe, Vampiric Cape, Hallowed Hide and Ruthven's Rosary. Four distinct packed pieces add one 1-damage royal bat for 4s on Cape use. Scythe receives set membership only; its authored recipe is preserved.

**Hollow King Necromancer:** Edictum Praetoris, Memento Mori, Toga Picta and Interregnum. Four distinct packed pieces add one 2-damage spirit for 6s on Mori use. Toga Picta and Interregnum are the matching armor and ring.

Both use the existing two-piece +8% primary and three-piece +8% recharge thresholds; full-set triggers use the designated first ability and a shared 4s lock. Duplicate slots and stashed pieces do not count. Cape healing uses the strongest active field, with a shared three-bat limit. Only one Torment undead and one Mori undead can exist, and the global eight-companion cap remains. Buffs refresh rather than stack across duplicate copies. Combat resources reset at encounter setup.

Equipment capacities use the strongest copy per base identity, including Shiny variants, with total bonuses capped at +80 HP / +20 mana. Equipping does not refill resources; removing gear clamps current resources to the lower capacity. Offensive gear adjacency uses the strongest two matching auras and the existing shared +35% primary cap. Toga's cooldown penalty caps at 15%. Timed weapon buffs do not improve ability damage.

All dagger definitions match the pre-pass SHA-256 `3e2f0bc02599f9612bbbf53489fd034649907b62b85316ee52681c579788fa49` when set membership fields are excluded. The [Dagger Update](dagger-update.md) remains authoritative for dagger recipes.

## Second-pass validation and balance feedback

The regression suite covers actual versus overhealing Torment charge, purification, companion limits, pair/set rules, capacity save/removal behavior, nonstacking buffs, lethal-hit handling and the unchanged dagger recipes. The item UI audit covers 270 views across full inventory, reward and shop inspection, three viewport sizes and both text modes. Longer shop inspection sections fall back to one column when needed; overflowing full-detail columns fall back to fitted pagination.

The preserved 19-class tiered benchmark has identical fight records before/after across all 1,995 fights (1,600 clears). A separate [paired item report](ut-st-pass-two-benchmark.json), generated by `scripts/benchmark-ut-st-pass-two.cjs`, compares 0.31.4 commit `85eebbbe0a843ba3337bdbe47d0e3309d06c2ae7` against this release: 20 cases × 35 bosses × two gear levels × two versions = 2,800 fights. Each uses a legal native-class fixed build, seed 123456, Adventurer depth 20, 0.05s ticks, +50 base HP, full equipped HP, +8% recharge blessing and three Health Potions. Crown, Hide and Toga receive legal weapon-adjacent placement in both versions.

| Case | Clears before / 70 | Clears after / 70 |
| --- | ---: | ---: |
| Vesture of Duality | 28 | 21 |
| Mechanical Kogbold Limb | 24 | 24 |
| Fungal Breastplate | 51 | 39 |
| Breastplate of New Life | 51 | 43 |
| The Forgotten Crown | 31 | 34 |
| Skull of Endless Torment | 31 | 23 |
| Socket Blade | 29 | 28 |
| Vampiric Cape | 22 | 30 |
| Hallowed Hide | 22 | 31 |
| Edictum Praetoris | 33 | 30 |
| Ruthven's Rosary | 21 | 25 |
| Memento Mori | 31 | 22 |
| Toga Picta | 32 | 32 |
| Interregnum | 30 | 33 |
| Vampire Rogue set | 32 | 51 |
| Hollow King set | 34 | 34 |
| Skuld set control | 38 | 38 |
| Swoll set control | 54 | 54 |
| Phylactery set control | 25 | 25 |
| Tiered control | 48 | 48 |

The Vampire set gains a clear identity and improves substantially; the Hollow King set preserves its overall clear count while moving to summoned damage. Vesture and Mori lose generic healing/rescue protection and need supporting sustain. Fungal healing replaces block and performs worse in the Knight armor fixture, which also rewards block through its class passive. These are useful trade-offs to watch, not evidence that all items or classes are equally strong. The unchanged existing-set and tiered controls help isolate the changes. Different set cases use different native classes, so their clear counts do not establish direct set parity. This is not an optimized-build search, acquisition/economy test or full-run balance verdict.

---

# Previous identity pass — 0.21.5

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

## Complete staff pass — 0.35.0

All 98 UT/ST staff entries now use [source-backed staff profiles](staff-identities.md), including mixed projectile rates/piercing, slow-start delivery, burst recovery, Esben manifestation and Vigor Festival Spirit. These profiles supersede the staff recipes listed earlier in this document. Existing Hollow King and Phylactery memberships and designated full-set ability procs remain.

## Complete wand pass — 0.36.0

All 93 UT/ST wand entries now use [inspected wand profiles](wand-identities.md), including morning-star rhythms, mixed piercing, returning/slow shots, burst cycles, soul summons, fields, self-curse and ability-triggered effects. These recipes supersede earlier wand profiles above. Existing Geb memberships and designated full-set ability bonuses remain.

## Complete katana pass — 0.37.0

All 84 UT/ST katana entries now use [inspected katana profiles](katana-identities.md), including independent side bursts, returning/accelerating attacks, piercing sunbeams, poison/fire grenades, HP/healing trade-offs, weapon fatigue and vitality conversion. These profiles supersede earlier katana recipes, including Socket Blade. Existing item identities, upgrades and set membership remain.

## Ability identity pass — 0.40.0

All 559 UT/ST ability variants have a researched mapping, calibrated against unchanged tiered abilities. See [ability identities](ability-identities.md) for the full item mapping, translations, limits and preserved custom signatures, and [ability balance](ability-balance.md) for the seeded comparison. Internal effect helpers are unobtainable; old saves remain readable.

## Enchantment integration — 0.41.0

The [enchantment rework](enchantments.md) adds role-specific primary bonuses and source-owned companion damage. Summon bursts, explosions and counters can receive Command without extra summons, charge or activation hooks. Positive ring stats can receive Resonance within existing caps. No UT/ST item recipe, source identity, footprint or set membership changes.
