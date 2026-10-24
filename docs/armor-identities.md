# UT/ST armor identities — 0.39.0

All **250 imported UT/ST armor variants** (208 normal/historical definitions and 42 Shiny variants) now translate their RotMG stats and signatures into RealmPack's existing armor roles. All **45 tiered armor definitions**, all other equipment definitions, armor IDs, pixel art, footprints, prices, native classes, acquisition exclusions and ST memberships remain unchanged. Existing saved item fields and upgrades are retained; their benefits follow the new primary effects and existing rounding rules.

## Sources and scope

[Source facts](armor-source-facts.json) preserve every imported armor's equip stats, triggers, exact partner IDs, conditions and meter data, inspected 2026-10-25 from the individual Realm.wiki pages. [Projectile facts](armor-proc-source-facts.json) preserve 33 subordinate projectile damage/status definitions. [Tiered anchors](armor-balance-anchors.json) record the source data for nine T0/T7/T14 examples. Parent item tooltips also informed the spirit, portal, barnacle and seasonal summon adaptations.

These are adaptations, not literal RotMG numbers. RealmPack has no movement, aim, distance or XP/candy system. SPD affects nearby cooldowns, DEX affects adjacent weapon recharge, and WIS affects adjacent ability output. Source costume transformations and decorative helper objects are not recreated; their combat stats, charged attacks and recovery effects are represented. No source helper becomes a separate obtainable item. Current and historical imports keep their own source IDs and profiles, even when they share a name. Legacy restrictions remain in force.

## Calibration against current armor

| Family | Existing T0 reference | Existing T14 reference | UT/ST approach |
| --- | --- | --- | --- |
| Heavy | 10 block / 3.2s; source DEF5 | 23 block / 2.75s; source DEF28 | Defense maps between these output anchors. Extra stats and procs reserve part of the guard budget. |
| Leather | 1 dodge / 10s; source DEF5 | 1 dodge / 6.5s; source DEF22 | Defense maps to evasion cadence; other bonuses trade some cadence for offense or utility. |
| Robe | 2 mana / 4.5s; source DEF2 | 2 mana +6 block / 2.93s; source DEF17, MP75, WIS8 | Mana/Wisdom determine resource cadence; Defense determines the block component. |

Secondary positive roles add 4% each to the primary budget divisor, and event signatures reserve a further 8%. Heavy guard uses the T0/T14 output curve with a bounded rate and a 3.2s cycle. Leather cadence ranges from 5.5–13s before modifiers; robe cadence is bounded at 6s. This lets tiered armor keep a reliable specialist role. Higher source Defense is not replaced with an arbitrary generic special-item premium.

HP converts at 0.225 per source HP (base +36 cap); mana at 0.1 (+12 cap); ATT at 0.9% adjacent weapon damage per source point (+12% cap); DEX at 0.65% adjacent weapon recharge (+8% cap); SPD at 0.45% shorter adjacent cooldowns (+6% cap); WIS at 0.55% adjacent ability output (+8% cap). VIT produces 0.4 healing per point every 5s, up to 12; the strongest two distinct armor families pulse. Negative attributes retain costs. Fungal Breastplate expresses its high Vitality through its 12-HP / 3.5s primary healing cycle, with no duplicate passive Vitality pulse or innate block.

## Examples

| Armor | RealmPack identity |
| --- | --- |
| Fungal Breastplate | 12 healing / 3.5s, +18 max HP and no block pulse. |
| Breastplate of New Life | +36 max HP, with lower block output than endgame tiered heavy armor. |
| Hirejou Tenne / Mercy's Bane | Adjacent weapon damage and recharge at the expense of defensive output. |
| Armor of Nil | Taking a direct hit grants 15% less direct incoming damage for 5s, with a shared 10s lock; its speed cost remains. |
| Royal Guard's Cuirass | Weapon use can grant 1.6s protection, with a shared 20s armor-protection lock. |
| Protective Matrices | Emergency protection below half HP after a qualifying direct hit, plus a temporary weapon-recharge penalty. Cannot revive a lethal hit. |
| Vesture of Duality | Ability use boosts adjacent weapon damage for 5s, while lowering block yield and increasing incoming damage. |
| Hallowed Hide | Leather evasion and offensive/health stats; Ruthven's Rosary enables its below-half-HP emergency heal. |
| Current dragon armor | Leaf grants temporary defensive support; Fire triggers a fiery burst; Water heals below its source health threshold. Historical versions retain their older stat-only profiles. |
| Mad Scientist robes | Mana efficiency through whole-mana refund credits, with capped stacking. |
| Ethereal Happi / Flowering Kimono / Sage's Wakibiki | Cursing, healing and slowing spirits; distinct friendly spirits improve armor-spirit output. Happi retains its temporary firing-related speed cost. |
| Barnacle Shell | A bounded piercing companion with bleed support. Movement/stationary scaling is compressed into the fixed summon budget. |
| Diplomatic Robe | A short damaging portal on ability use. |
| Shifting Shroud | Slimes from landed weapon activations, including delayed projectiles; one hit event per activation prevents pellet multiplication. Alternating slimes use normal/piercing damage and cost extra mana. |
| Seasonal and Easter armor | Persistent item meters gate charged attacks, recovery and barrage windows. A defeated wave grants 300 charge, a boss wave 1500, bounded by the source meter maximum. |
| Retainer's Battlesuit | Base attack/recharge boosts on ability use; its MP/WIS-debuff empowerment uses equipped gear penalties to maximum mana/Wisdom as the represented conditions. |
| Cackling Straitjacket | A charged frenzy with both benefits and confusion; rare proc progress persists across encounters. |
| Wretched Rags / other relative-stat armor | Uses bounded references to underlying health and mana, excluding equipment capacity bonuses. No recursive multiplication between special items. |

## Stacking, saves and limitations

Static and temporary primary boosts share the existing +35% adjacency cap; block boosts share +50%; continuous cooldown reductions share 20%. Strongest matching adjacency sources are used under the existing rules. Temporary effects sharing a channel use the strongest eligible candidate, independent of item order. Opposing stat costs use separate channels. Negative primary bonuses share a 25% ceiling with ring penalties. Other negative attributes have bounded costs; source immunity does not prevent poison ticks or rescue lethal damage.

Positive equipment capacity shares the existing +80HP / +20mana caps. Armor capacity penalties are bounded at 30 HP / 15 mana, with existing minimum resource capacities preserved. Equipping does not heal or refill mana; removing capacity clamps current resources. Relative capacity synchronizations are idempotent across saves and repeated UI refreshes.

Armor/ring ability refunds use the strongest equipped rate, capped at 20%, with fractional credits paid as whole mana. Casts must be affordable upfront; existing weapon-specific refund mechanics keep their own behavior. Armor companions share the ring-companion cap of 2 inside the existing global cap of 8. Fields share the existing 16-field bound and same-family replacement rules. Invalid sources and defeated waves remove pending effects. Friendly spirit output is bounded; projectile/poison/summon budgets do not multiply flat weapon power per pellet.

Chance effects accumulate deterministic charge on eligible events. Family charge survives between fights and in saves, so a rare proc remains reachable across a run; cooldowns and transient buffs reset. Meters remain on the saved item. A successful compound meter effect spends its cost once. Duplicate victory calls cannot award more charge.

Shiny armor has 5% stronger positive stats and a 5% faster primary cycle, with unchanged proc budgets, costs and conditions. Integer-limited primary effects retain their size. Existing enchants, tempering, potion upgrades, off-class rules and ST activation bonuses remain connected to the new primary effects. Costume appearance, precise projectile geometry, player movement and literal XP/candy mechanics are outside this adaptation.

## Validation

The [paired benchmark](armor-balance-results.json) and `scripts/benchmark-armors.cjs` compare every normal/historical armor with identical fixed builds, plus nine tiered references. Each profile is tested with three native classes, four bosses and two gear levels: **5,208 fights per version**. Partners, enchantments, optimized layouts and charged starting meters are outside this fixture. Clears are comparative test results, not player win probabilities. The new armor test also exercises every Shiny variant and checks saved capacity, costs, source gates, shared caps, companions, refunds, delayed hits and rare-charge persistence. Existing full ST-set regressions remain in place.

The paired run cleared **2,754 fights before and 2,699 after**, out of 5,208 per version. The lower aggregate reflects real defensive/offensive trade-offs, including older costume forms that previously inherited a generic high-tier guard pulse. Examples: Tenne cleared 16/24, New Life 16/24, Fungal 16/24, Mercy's Bane 13/24, Royal Guard 18/24; T14 heavy armor cleared 17/24. Robe and leather results use different class fixtures and should not be ranked directly against heavy armor. All 1,995 tiered-class outcome rows are identical before/after. All 30 suites and game syntax checks pass; browser coverage includes 2,012 armor inspection views, 7,176 catalogue views with no default item-detail overflow, and mixed armor combat at 4×.

## Complete normal/historical mapping

Base values below precede class, upgrades, enchantments, ST bonuses and live relative-stat references. Shiny variants inherit their corresponding base profile with the scaling described above.

| Armor / source | Family | Base adaptation |
| --- | --- | --- |
| [Acidic Armor](https://realm.wiki/item?id=19258) | leather | Gain 1 dodge. +11 max HP. +5 max mana. 2.25% longer adjacent cooldowns; 2 healing / 5s |
| [Alchemist's Disheveled Garbs](https://realm.wiki/item?id=8790) | leather | Gain 1 dodge. +5.4% adjacent weapon damage. 2.25% shorter adjacent cooldowns |
| [Apiary Armor](https://realm.wiki/item?id=2297) | leather | Gain 1 dodge. +2.7% adjacent weapon damage. 1.35% shorter adjacent cooldowns |
| [Armor of Nil](https://realm.wiki/item?id=590) | leather | Gain 1 dodge. Taking a hit can reduce later damage. 2.25% longer adjacent cooldowns. Direct incoming hit: 15% less direct attack damage for 5s. 10s shared cooldown |
| [Aspirant's Hide](https://realm.wiki/item?id=17634) | leather | Gain 1 dodge. +6 max HP. 3.25% adjacent weapon recharge |
| [Bachelor's Tuxedo](https://realm.wiki/item?id=3824) | leather | Gain 1 dodge. Conditional companion. 5.2% adjacent weapon recharge; 4.4% adjacent ability output. Ability use: coin burst for 6s: 3 damage/sec. 180s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost.. The source costume transformation is cosmetic and is not simulated. |
| [Beehemoth Armor](https://realm.wiki/item?id=4308) | leather | Gain 1 dodge. 1.95% adjacent weapon recharge; 2.25% shorter adjacent cooldowns |
| [Beehemoth Armor](https://realm.wiki/item?id=4309) | leather | Gain 1 dodge. 2.25% shorter adjacent cooldowns; 3.2 healing / 5s |
| [Beehemoth Armor](https://realm.wiki/item?id=4310) | leather | Gain 1 dodge. 2.25% shorter adjacent cooldowns; 2.75% adjacent ability output |
| [Beehemoth Armor](https://realm.wiki/item?id=17565) | leather | Gain 1 dodge. +14 max HP. 2.25% shorter adjacent cooldowns; 2% less healing |
| [Blizzard Jacket](https://realm.wiki/item?id=42502) | leather | Gain 1 dodge. +8 max mana. 1.8% shorter adjacent cooldowns |
| [Cackling Straitjacket](https://realm.wiki/item?id=23919) | leather | Gain 1 dodge. +12% adjacent weapon damage. Conditional stat boost. -3.25% adjacent weapon recharge; 2.25% longer adjacent cooldowns. After 100 weapon uses across battles, trigger a 3s frenzy: gain 6 block and 3 mana; adjacent weapons gain +2.4% damage and +1.8% recharge, nearby item block gains +2.1%, and adjacent abilities gain +1.8% output. Heal 7 HP over 3s. Confusion also reduces adjacent weapon output by 10% for 3s. |
| [Centaur's Shielding](https://realm.wiki/item?id=28848) | leather | Gain 1 dodge. +4.5% adjacent weapon damage. Conditional stat boost. 4.55% adjacent weapon recharge. Weapon use: adjacent weapons deal 9.6% more damage for 4.5s. 6s shared cooldown · healed within 3s, without Seal of the Battle God |
| [Chefs Atire](https://realm.wiki/item?id=18355) | leather | Gain 1 dodge. 5.5% adjacent ability output |
| [Chocolate Armor](https://realm.wiki/item?id=34337) | leather | Gain 1 dodge. +12% adjacent weapon damage. Conditional Hallucinating. -4.55% adjacent weapon recharge; 3.2 healing / 5s. Direct incoming hit: brief Hallucinating marker. 5% charge per eligible event; 20s shared cooldown. Hallucinating uses a brief confusion marker; Hexed reduces adjacent weapon output by 10%, without changing the player sprite. |
| [Coral Silk Armor](https://realm.wiki/item?id=3096) | leather | Gain 1 dodge. 5.2% adjacent weapon recharge; 4.4% adjacent ability output |
| [Cupid's Garments](https://realm.wiki/item?id=25604) | leather | Gain 1 dodge. 5.2% adjacent weapon recharge; 4.4% adjacent ability output |
| [Daopao](https://realm.wiki/item?id=52041) | leather | Gain 1 dodge. +7.2% adjacent weapon damage. Conditional stat boost. 5.2% adjacent weapon recharge. Ability use: this armor and adjacent items gain 3.5% more block for 6s. 10s shared cooldown · requires Thunder Mallet |
| [Divination Cloak](https://realm.wiki/item?id=26731) | leather | Gain 1 dodge. +5 max mana. 3.25% adjacent weapon recharge |
| [Divination Cloak](https://realm.wiki/item?id=26760) | leather | Gain 1 dodge. +5 max mana. 3.25% adjacent weapon recharge |
| [Eggshell Carapace](https://realm.wiki/item?id=37691) | leather | Gain 1 dodge. +7 max HP. Conditional counterattack. 3.9% adjacent weapon recharge. Weapon use: deal up to 6 piercing damage. 2s shared cooldown · charged barrage active. Ability use: enable this armor's charged barrage for 3s. 30s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost. |
| [Eggshell Carapace](https://realm.wiki/item?id=7428) | leather | Gain 1 dodge. +7 max HP. Conditional counterattack. 3.9% adjacent weapon recharge. Weapon use: deal up to 6 piercing damage. 2s shared cooldown · charged barrage active. Ability use: enable this armor's charged barrage for 3s. 30s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost. |
| [Ethereal Happi](https://realm.wiki/item?id=20604) | leather | Gain 1 dodge. Conditional stat boost. 3.25% adjacent weapon recharge; 6% shorter adjacent cooldowns. Weapon use: your item cooldowns are 10% longer for 0.7s. 1s shared cooldown. Ability use: cursing spirit for 6s: 1 damage/sec, exposes the enemy; a different friendly spirit improves its output. 6s shared cooldown |
| [Fitted Construction Vest](https://realm.wiki/item?id=12074) | leather | Gain 1 dodge. 3.25% adjacent weapon recharge; 1.6 healing / 5s |
| [Fitted Protective Matrix](https://realm.wiki/item?id=1157) | leather | Gain 1 dodge. Brief protection on an eligible trigger. Direct incoming hit: 1.4s protection against direct attacks; cannot revive lethal damage. 180s shared cooldown · HP ≤50%, incoming damage ≥1. Direct incoming hit: your weapons recharge 15% slower for 3s. 180s shared cooldown · HP ≤50%, incoming damage ≥1 |
| [Frost Drake Hide Armor](https://realm.wiki/item?id=5850) | leather | Gain 1 dodge. 3.25% adjacent weapon recharge |
| [Golem Garments](https://realm.wiki/item?id=602) | leather | Gain 1 dodge. +7.2% adjacent weapon damage. 2.8 healing / 5s |
| [Gravetender's Vest](https://realm.wiki/item?id=22508) | leather | Gain 1 dodge. Conditional stat boost. 2.25% longer adjacent cooldowns. Ability use: this armor and adjacent items gain 14% more block for 5s. 1s shared cooldown · matching pieces: Blade of Fates, Accursed Memory, Jewel of Vengeance |
| [Greaterhosen](https://realm.wiki/item?id=15717) | leather | Gain 1 dodge. +12% adjacent weapon damage. Conditional Hallucinating. -4.55% adjacent weapon recharge; 3.2 healing / 5s. Direct incoming hit: brief Hallucinating marker. 5% charge per eligible event; 20s shared cooldown. Hallucinating uses a brief confusion marker; Hexed reduces adjacent weapon output by 10%, without changing the player sprite. |
| [Hallowed Hide](https://realm.wiki/item?id=17885) | leather | Gain 1 dodge. +7 max HP. +4.5% adjacent weapon damage. Conditional healing. Direct incoming hit: heal 12 HP. 15s shared cooldown · HP ≤50%, requires Ruthven's Rosary |
| [Haori of the Wind](https://realm.wiki/item?id=3825) | leather | Gain 1 dodge. +8.1% adjacent weapon damage. Conditional companion. 4.5% shorter adjacent cooldowns. Ability use: piercing blossom for 6s: 2 damage/sec. 180s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost.. The source costume transformation is cosmetic and is not simulated. |
| [Harlequin Armor](https://realm.wiki/item?id=29768) | leather | Gain 1 dodge. +8 max mana. Conditional stat boost. 1.35% shorter adjacent cooldowns; 2.75% adjacent ability output. Weapon use: adjacent abilities gain 6% output for 1s. 1s shared cooldown · HP ≥85% |
| [Helm of minstack](https://realm.wiki/item?id=17569) | leather | Gain 1 dodge. Conditional counterattack. 1.95% adjacent weapon recharge; 1.2 healing / 5s. Direct incoming hit: deal up to 16 damage. 5s shared cooldown · incoming damage ≥4 |
| [Hirejou Tenne](https://realm.wiki/item?id=7759) | leather | Gain 1 dodge. +7.2% adjacent weapon damage. Conditional stat boost. 5.2% adjacent weapon recharge. Ability use: this armor and adjacent items gain 3.5% more block for 6s. 10s shared cooldown · requires Reikoku |
| [Hollyhock Hide](https://realm.wiki/item?id=6214) | leather | Gain 1 dodge. Conditional stat boost. 5.2% adjacent weapon recharge; 1.35% shorter adjacent cooldowns; 2 healing / 5s. Direct incoming hit: adjacent weapons recharge 6% faster for 5s. 10% charge per eligible event; 5s shared cooldown · incoming damage ≥1 |
| [Jacket Of Blossoms](https://realm.wiki/item?id=57127) | leather | Gain 1 dodge. 3.9% adjacent weapon recharge |
| [Leaf Dragon Hide Armor](https://realm.wiki/item?id=30050) | leather | Gain 1 dodge. +11 max HP. Conditional stat boost. 2.7% shorter adjacent cooldowns; 2 healing / 5s. Ability use: this armor and adjacent items gain 10.5% more block for 5s. 15s shared cooldown |
| [Leaf Draon Hide Armor](https://realm.wiki/item?id=53192) | leather | Gain 1 dodge. +11 max HP. 2.7% shorter adjacent cooldowns; 1.65% adjacent ability output; 1.2 healing / 5s |
| [Legacy Mantle of Skuld](https://realm.wiki/item?id=8609) | leather | Gain 1 dodge. +6 max HP. +1 max mana.  |
| [Legion Elite Leather Armor](https://realm.wiki/item?id=41809) | leather | Gain 1 dodge. 3.9% adjacent weapon recharge |
| [Life Jacket](https://realm.wiki/item?id=28464) | leather | Gain 1 dodge. 3.9% adjacent weapon recharge |
| [Light Syndicate Attire](https://realm.wiki/item?id=14426) | leather | Gain 1 dodge. Conditional counterattack. 3.9% adjacent weapon recharge; 3.3% adjacent ability output. Weapon use: deal up to 12 piercing damage. 1s shared cooldown · requires a Syndicate weapon and Sunken Fire Opal Ring, Faded Heart Scarab or Fractured Hannya. 10% ability mana refund; strongest gear discount only, shared 20% limit. Afford the cast first. |
| [Luminous Armor](https://realm.wiki/item?id=19265) | leather | Gain 1 dodge. +36 max HP. 2.25% shorter adjacent cooldowns; 2 healing / 5s |
| [Luxurious Leather](https://realm.wiki/item?id=1402) | leather | Gain 1 dodge.  |
| [Mantle of Skuld](https://realm.wiki/item?id=10066) | leather | Gain 1 dodge. +12 max mana. 4.4% adjacent ability output |
| [Mechpilot's Jerkin](https://realm.wiki/item?id=29898) | leather | Gain 1 dodge. +18 max HP. 2.6% adjacent weapon recharge; 2.25% shorter adjacent cooldowns |
| [Metal-plated Corset](https://realm.wiki/item?id=14791) | leather | Gain 1 dodge. Conditional stat boost. 5.2% adjacent weapon recharge; 1.35% shorter adjacent cooldowns; 2 healing / 5s. Direct incoming hit: adjacent weapons recharge 6% faster for 5s. 10% charge per eligible event; 5s shared cooldown · incoming damage ≥1 |
| [Mossy Guard](https://realm.wiki/item?id=48828) | leather | Gain 1 dodge. Conditional healing. 2.6% adjacent weapon recharge; 1.6 healing / 5s. Direct incoming hit: heal 18 HP. 20s shared cooldown · HP ≥85%, incoming damage ≥1 |
| [Neo Fitted Protective Matrix](https://realm.wiki/item?id=56464) | leather | Gain 1 dodge. Brief protection on an eligible trigger. Direct incoming hit: 1.4s protection against direct attacks; cannot revive lethal damage. 180s shared cooldown · HP ≤50%, incoming damage ≥1. Direct incoming hit: your weapons recharge 15% slower for 3s. 180s shared cooldown · HP ≤50%, incoming damage ≥1 |
| [Ornate Armor](https://realm.wiki/item?id=21191) | leather | Gain 1 dodge. Conditional Healing. 4 healing / 5s. Direct incoming hit: 7 healing over 5s. 20s shared cooldown · incoming damage ≥4 |
| [Painted Eggshell Armor](https://realm.wiki/item?id=41602) | leather | Gain 1 dodge. Conditional Healing. 4 healing / 5s. Direct incoming hit: 7 healing over 5s. 20s shared cooldown · incoming damage ≥4 |
| [Pirate Queen's Brigandine](https://realm.wiki/item?id=37468) | leather | Gain 1 dodge. 3.25% adjacent weapon recharge |
| [Primal Padding](https://realm.wiki/item?id=63886) | leather | Gain 1 dodge. +18 max HP. 2.6% adjacent weapon recharge; 2.25% shorter adjacent cooldowns |
| [Rags of the Host](https://realm.wiki/item?id=3034) | leather | Gain 1 dodge. +5.4% adjacent weapon damage. 1.1% adjacent ability output; 1.6% less healing |
| [Reaper's Shroud](https://realm.wiki/item?id=5360) | leather | Gain 1 dodge. +4 max mana. +4.5% adjacent weapon damage. Conditional healing. Direct incoming hit: heal 12 HP. 15s shared cooldown · HP ≤50%, requires Ruthven's Rosary |
| [Retrowinds Leather Armor](https://realm.wiki/item?id=63881) | leather | Gain 1 dodge. 3.9% adjacent weapon recharge |
| [Seraphim's Guard](https://realm.wiki/item?id=17139) | leather | Gain 1 dodge. +5 max mana. 3.85% adjacent ability output; 2.8 healing / 5s |
| [Shadowbeast Hide](https://realm.wiki/item?id=14498) | leather | Gain 1 dodge. +5 max HP. 3.25% adjacent weapon recharge |
| [Snakeskin Armor](https://realm.wiki/item?id=2622) | leather | Gain 1 dodge. 2.6% adjacent weapon recharge; 1.8% shorter adjacent cooldowns |
| [Spectral Cloth Armor](https://realm.wiki/item?id=3112) | leather | Gain 1 dodge. +4.5% adjacent weapon damage. 3.25% adjacent weapon recharge |
| [Splatter-proof Apron](https://realm.wiki/item?id=52022) | leather | Gain 1 dodge. +1.8% adjacent weapon damage. 3.25% adjacent weapon recharge |
| [Sprite's Dream](https://realm.wiki/item?id=48832) | leather | Gain 1 dodge. +10 max mana. Conditional mana recovery. 2.7% shorter adjacent cooldowns. Ability use: recover 1 mana. 5s shared cooldown |
| [Squadron Sheathing](https://realm.wiki/item?id=1771) | leather | Gain 1 dodge. Conditional stat boost. 4.55% adjacent weapon recharge. Direct incoming hit: adjacent weapons deal 4% more damage for 3s. 1s shared cooldown · HP ≤80%, without Seal of the Battle God. Direct incoming hit: adjacent weapons recharge 3% faster for 3s. 1s shared cooldown · HP ≤80% |
| [Temperate Curiass](https://realm.wiki/item?id=3788) | leather | Gain 1 dodge. Conditional Healing. 3.9% adjacent weapon recharge. Direct incoming hit: 7 healing over 8s. 20s shared cooldown · incoming damage ≥4, requires a Superior–Transcendent Attack/Defense/Speed amulet. Direct incoming hit: 4 mana over 8s. 20s shared cooldown · incoming damage ≥4, requires a Superior–Transcendent Vitality/Wisdom/Dexterity amulet |
| [Tinkerers Apron](https://realm.wiki/item?id=50815) | leather | Gain 1 dodge. +8 max mana. 1.8% shorter adjacent cooldowns |
| [Torso Tunic](https://realm.wiki/item?id=25740) | leather | Gain 1 dodge. +18 max HP.  |
| [Turncoat Cape](https://realm.wiki/item?id=28832) | leather | Gain 1 dodge. Conditional Invisible. 4.5% shorter adjacent cooldowns. Direct incoming hit: one dodge; cloak eligibility for up to 3s. 5s shared cooldown · incoming damage ≥6 |
| [Venerable Coral Silk Armor](https://realm.wiki/item?id=38590) | leather | Gain 1 dodge. 6.5% adjacent weapon recharge; 5.5% adjacent ability output |
| [Vest of Abandoned Shadows](https://realm.wiki/item?id=14471) | leather | Gain 1 dodge. +11 max HP. Conditional Armored. 6 healing / 5s. Weapon use: 20% less damage for 4s. 10s shared cooldown |
| [Wedding Dress](https://realm.wiki/item?id=32439) | leather | Gain 1 dodge. Conditional counterattack. 1.95% adjacent weapon recharge; 1.2 healing / 5s. Direct incoming hit: deal up to 9 damage. 5s shared cooldown · incoming damage ≥4 |
| [Withered Poncho](https://realm.wiki/item?id=25733) | leather | Gain 1 dodge. +7.2% adjacent weapon damage. 2.8 healing / 5s |
| [Wraith's Brigandine](https://realm.wiki/item?id=7750) | leather | Gain 1 dodge. +18 max HP.  |
| [1-Bit Robe](https://realm.wiki/item?id=43383) | robe | Generate 2 mana and 5 block. +6.3% adjacent weapon damage. Conditional Energized. Ability use: 4 mana over 3.6s. 5s shared cooldown · without Strange Ring |
| [A.R.M.O.R.](https://realm.wiki/item?id=14228) | robe | Generate 2 mana and 4 block. +4.5% adjacent weapon damage. 2.25% shorter adjacent cooldowns; 4 healing / 5s |
| [Anointed Robe](https://realm.wiki/item?id=8206) | robe | Generate 2 mana and 5 block. +3.6% adjacent weapon damage. 1.95% adjacent weapon recharge; 2% less healing |
| [Apron of Conjuring](https://realm.wiki/item?id=52024) | robe | Generate 2 mana and 5 block. +6 max mana. +3.6% adjacent weapon damage. 6.05% adjacent ability output |
| [Aspirant's Robes](https://realm.wiki/item?id=17633) | robe | Generate 2 mana and 4 block. +5 max HP. +6 max mana. +3.6% adjacent weapon damage. 3.3% adjacent ability output |
| [Astronomer's Gown](https://realm.wiki/item?id=22524) | robe | Generate 2 mana and 5 block. +6.3% adjacent weapon damage. Conditional Energized. Ability use: 4 mana over 3.6s. 5s shared cooldown · without Eye of Divination |
| [Blast Proof Robes](https://realm.wiki/item?id=50819) | robe | Generate 2 mana and 4 block. +16 max HP. 1.3% adjacent weapon recharge |
| [Boudoir Robe](https://realm.wiki/item?id=7331) | robe | Generate 2 mana and 4 block. +2.7% adjacent weapon damage. 3.25% adjacent weapon recharge |
| [Carrotroot Vestments](https://realm.wiki/item?id=37692) | robe | Generate 2 mana and 5 block. +7 max HP. +7 max mana. +4.5% adjacent weapon damage. 3.85% adjacent ability output. Weapon use: deal up to 6 piercing damage. 2s shared cooldown · charged barrage active. Ability use: enable this armor's charged barrage for 3s. 30s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost. |
| [Chasuble of Holy Light](https://realm.wiki/item?id=3103) | robe | Generate 2 mana and 4 block. +7 max HP. +3 max mana. 3.3% adjacent ability output; 2.4 healing / 5s |
| [Chocolate Glazed Robe](https://realm.wiki/item?id=41765) | robe | Generate 2 mana and 7 block. -3.25% adjacent weapon recharge; 1.6 healing / 5s |
| [Curse Binding Robes](https://realm.wiki/item?id=42304) | robe | Generate 2 mana and 4 block. +7 max HP. Conditional counterattack. 3.25% adjacent weapon recharge. Direct incoming hit: deal up to 16 piercing damage. 2s shared cooldown · matching pieces: Bloody Pitch Fork Staff, Blood Essence, Spike Headband |
| [Darkness Overcoat](https://realm.wiki/item?id=54799) | robe | Generate 2 mana and 5 block. 4.55% adjacent weapon recharge; 1.2 healing / 5s |
| [Devilish Robes](https://realm.wiki/item?id=1222) | robe | Generate 2 mana and 4 block. +7 max HP. -5 max mana. 3.9% adjacent weapon recharge; 3.3% adjacent ability output |
| [Diplomatic Robe](https://realm.wiki/item?id=28843) | robe | Generate 2 mana and 4 block. +11 max HP. +9% adjacent weapon damage. Conditional companion. Ability use: arcane portal for 4s: 2 damage/sec. 8s shared cooldown |
| [Doctor's Overcoat](https://realm.wiki/item?id=26735) | robe | Generate 2 mana and 5 block. 3.25% adjacent weapon recharge; 3.85% adjacent ability output |
| [Doctor's Overcoat](https://realm.wiki/item?id=26762) | robe | Generate 2 mana and 5 block. 4.55% adjacent weapon recharge; 1.2 healing / 5s |
| [Esben's Shaman Attire](https://realm.wiki/item?id=46071) | robe | Generate 2 mana and 5 block. +14 max HP. +5.4% adjacent weapon damage. Conditional enemy debuff. Direct incoming hit: Slowed translated into 3s chill. 40% charge per eligible event; 5s shared cooldown · incoming damage ≥1 |
| [Executioner's Garb](https://realm.wiki/item?id=32486) | robe | Generate 2 mana and 5 block. +4 max mana. +9% adjacent weapon damage. -2.6% adjacent weapon recharge; 1.6 healing / 5s |
| [Floral Corset](https://realm.wiki/item?id=7356) | robe | Generate 2 mana and 5 block. +5.4% adjacent weapon damage. Conditional Healing. 2.7% shorter adjacent cooldowns; 2 healing / 5s. Ability use: 4 healing over 3s. 15s shared cooldown · HP ≤80%. Ability use: heal 11 HP. 15s shared cooldown · HP ≤80% |
| [Flowering Kimono](https://realm.wiki/item?id=20706) | robe | Generate 2 mana and 4 block. +12 max mana. +2.7% adjacent weapon damage. Conditional companion. 3.15% shorter adjacent cooldowns; 6.6% adjacent ability output. Ability use: healing spirit for 6s: 1 damage/sec, 1 healing/sec; a different friendly spirit improves its output. 6s shared cooldown |
| [Frost Elementalist Robe](https://realm.wiki/item?id=5851) | robe | Generate 2 mana and 5 block. +6 max mana. +3.6% adjacent weapon damage. 3.3% adjacent ability output |
| [Garb of the Ordained](https://realm.wiki/item?id=14786) | robe | Generate 2 mana and 5 block. +3.6% adjacent weapon damage. 1.95% adjacent weapon recharge; 2% less healing |
| [Garment of the Beast](https://realm.wiki/item?id=3006) | robe | Generate 2 mana and 4 block. +11 max HP. +3.6% adjacent weapon damage. 2.25% shorter adjacent cooldowns; 2.75% adjacent ability output |
| [Holy Order's Habit](https://realm.wiki/item?id=3823) | robe | Generate 2 mana and 4 block. +8 max mana. Conditional healing field. 5.5% adjacent ability output; 2 healing / 5s. Ability use: heal 18 HP over 6s. 180s shared cooldown · meter ≥1500, spend 0. Ability use: recover 6 mana. 180s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost.. The source costume transformation is cosmetic and is not simulated. |
| [Immortal Mantle](https://realm.wiki/item?id=25761) | robe | Generate 2 mana and 4 block. +14 max HP. +5 max mana. Conditional mana recovery. 2.25% shorter adjacent cooldowns. Weapon use: recover 3 mana. 5s shared cooldown · mana ≤50% |
| [Insightful Mourning Robe](https://realm.wiki/item?id=3790) | robe | Generate 2 mana and 5 block. +7 max mana. +4.5% adjacent weapon damage. Conditional Healing. 3.85% adjacent ability output. Direct incoming hit: 7 healing over 8s. 20s shared cooldown · incoming damage ≥4, requires a Superior–Transcendent Attack/Defense/Speed amulet. Direct incoming hit: 4 mana over 8s. 20s shared cooldown · incoming damage ≥4, requires a Superior–Transcendent Vitality/Wisdom/Dexterity amulet |
| [Judge's Robe](https://realm.wiki/item?id=1772) | robe | Generate 2 mana and 4 block. +6 max mana. +3.6% adjacent weapon damage. Conditional stat boost. 4.95% adjacent ability output. Direct incoming hit: adjacent weapons deal 4% more damage for 3s. 1s shared cooldown · HP ≤80%, without Seal of the Battle God. Direct incoming hit: adjacent weapons recharge 3% faster for 3s. 1s shared cooldown · HP ≤80% |
| [Lacerated Gown](https://realm.wiki/item?id=14781) | robe | Generate 2 mana and 4 block. +4.5% adjacent weapon damage. 2.25% shorter adjacent cooldowns; 4 healing / 5s |
| [Leaf Woven Robe](https://realm.wiki/item?id=57126) | robe | Generate 2 mana and 5 block. +7 max mana. +4.5% adjacent weapon damage. 3.85% adjacent ability output |
| [Leafweave Raiment](https://realm.wiki/item?id=42015) | robe | Generate 2 mana and 4 block. +10 max mana. Conditional stat boost. 3.9% adjacent weapon recharge; 5.5% adjacent ability output. Ability use: gain 12 temporary block. 15s shared cooldown. Ability use: heal 10 HP. 15s shared cooldown |
| [Legacy Robe of Twilight](https://realm.wiki/item?id=8616) | robe | Generate 2 mana and 4 block. +2 max HP. +1 max mana. 1.95% adjacent weapon recharge; 1.35% shorter adjacent cooldowns |
| [Legion Elite Robe](https://realm.wiki/item?id=41808) | robe | Generate 2 mana and 5 block. +7 max mana. +4.5% adjacent weapon damage. 3.85% adjacent ability output |
| [Magic Construction Vest](https://realm.wiki/item?id=12073) | robe | Generate 2 mana and 5 block. +6 max mana. +3.6% adjacent weapon damage. 3.3% adjacent ability output; 1.6 healing / 5s |
| [Magic Protective Matrix](https://realm.wiki/item?id=1156) | robe | Generate 2 mana and 4 block. Brief protection on an eligible trigger. Direct incoming hit: 1.4s protection against direct attacks; cannot revive lethal damage. 180s shared cooldown · HP ≤50%, incoming damage ≥1. Direct incoming hit: your weapons recharge 15% slower for 3s. 180s shared cooldown · HP ≤50%, incoming damage ≥1 |
| [Magician's Robe](https://realm.wiki/item?id=19362) | robe | Generate 2 mana and 4 block. +7 max HP. -5 max mana. 3.9% adjacent weapon recharge; 3.3% adjacent ability output |
| [Mantle of the Monarchy](https://realm.wiki/item?id=14470) | robe | Generate 2 mana and 4 block. +14 max HP. +6 max mana. Conditional Healing. 8 healing / 5s. Direct incoming hit: 5 healing over 3s. 15s shared cooldown · HP ≤80%. Direct incoming hit: heal 14 HP. 15s shared cooldown · HP ≤80% |
| [Molten Mantle](https://realm.wiki/item?id=19269) | robe | Generate 2 mana and 4 block. +8 max mana. +5.4% adjacent weapon damage. 1.8% shorter adjacent cooldowns |
| [Mystic Syndicate Attire](https://realm.wiki/item?id=14427) | robe | Generate 2 mana and 4 block. +5.4% adjacent weapon damage. Conditional counterattack. 3.3% adjacent ability output. Weapon use: deal up to 12 piercing damage. 1s shared cooldown · requires a Syndicate weapon and Sunken Fire Opal Ring, Faded Heart Scarab or Fractured Hannya. 10% ability mana refund; strongest gear discount only, shared 20% limit. Afford the cast first. |
| [Neo Magic Protective Matrix](https://realm.wiki/item?id=56465) | robe | Generate 2 mana and 5 block. Brief protection on an eligible trigger. Direct incoming hit: 1.4s protection against direct attacks; cannot revive lethal damage. 180s shared cooldown · HP ≤50%, incoming damage ≥1. Direct incoming hit: your weapons recharge 15% slower for 3s. 180s shared cooldown · HP ≤50%, incoming damage ≥1 |
| [Oceanic Apparel](https://realm.wiki/item?id=20304) | robe | Generate 2 mana and 3 block. +12 max HP. 3.6% shorter adjacent cooldowns |
| [Phosphorescent Rags](https://realm.wiki/item?id=1910) | robe | Generate 2 mana and 3 block. +12 max HP. 3.6% shorter adjacent cooldowns |
| [Polygonal Garbs](https://realm.wiki/item?id=16979) | robe | Generate 2 mana and 4 block. +7 max HP. Conditional counterattack. 3.25% adjacent weapon recharge. Direct incoming hit: deal up to 16 piercing damage. 2s shared cooldown · matching pieces: Squaroid Staff, Cubic Frame, Cuband |
| [Ragged Robes](https://realm.wiki/item?id=8786) | robe | Generate 2 mana and 4 block. +2.7% adjacent weapon damage. 3.25% adjacent weapon recharge |
| [Red Riding Dress](https://realm.wiki/item?id=3822) | robe | Generate 2 mana and 3 block. +6 max mana. Conditional counterattack. 5.85% adjacent weapon recharge; 3.2 healing / 5s. Ability use: deal up to 20 piercing damage. 180s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost.. The source costume transformation is cosmetic and is not simulated. |
| [Retrowinds Robe](https://realm.wiki/item?id=63880) | robe | Generate 2 mana and 5 block. +7 max mana. +4.5% adjacent weapon damage. 3.85% adjacent ability output |
| [Ritual Robe](https://realm.wiki/item?id=594) | robe | Generate 2 mana and 4 block. +5 max mana. +4.5% adjacent weapon damage. 8% adjacent ability output |
| [Ritualistic Pa'u](https://realm.wiki/item?id=47106) | robe | Generate 2 mana and 2 block. 3.25% adjacent weapon recharge; 4 healing / 5s |
| [Robe of Dark Summoning](https://realm.wiki/item?id=14499) | robe | Generate 2 mana and 5 block. +5 max HP. +6 max mana. +3.6% adjacent weapon damage. 3.3% adjacent ability output |
| [Robe of the Enchantress](https://realm.wiki/item?id=25753) | robe | Generate 2 mana and 5 block. +14 max HP.  |
| [Robe of the Mad Scientist](https://realm.wiki/item?id=3122) | robe | Generate 2 mana and 4 block. 2.75% adjacent ability output; 2 healing / 5s. 15% ability mana refund; strongest gear discount only, shared 20% limit. Afford the cast first. |
| [Robe of the Summer Solstice](https://realm.wiki/item?id=8863) | robe | Generate 2 mana and 5 block. +6 max mana. +3.6% adjacent weapon damage. 3.3% adjacent ability output |
| [Robe of the Tlatoani](https://realm.wiki/item?id=3092) | robe | Generate 2 mana. +9 max mana. 4.4% adjacent ability output |
| [Rocky Robe](https://realm.wiki/item?id=14220) | robe | Generate 2 mana and 7 block. -3.25% adjacent weapon recharge; 1.6 healing / 5s |
| [Shendyt of Geb](https://realm.wiki/item?id=9052) | robe | Generate 2 mana and 5 block. +6 max HP. +3 max mana. 3.85% adjacent ability output; 2.8 healing / 5s |
| [Shifting Shroud](https://realm.wiki/item?id=47999) | robe | Generate 2 mana and 4 block. +8 max mana. Conditional companion. 2.6% adjacent weapon recharge; 2.2% adjacent ability output. Weapon hit: alternating normal / piercing slime for 4s: 2 damage/sec; costs 1 extra mana. 4% charge per eligible event; 6s shared cooldown |
| [Soulless Robe](https://realm.wiki/item?id=9056) | robe | Generate 2 mana and 5 block. +14 max HP.  |
| [Summer Dress](https://realm.wiki/item?id=28465) | robe | Generate 2 mana and 5 block. +7 max mana. +4.5% adjacent weapon damage. 3.85% adjacent ability output |
| [Thunderstorm Tunic](https://realm.wiki/item?id=65289) | robe | Generate 2 mana and 5 block. +3 max mana. +4.5% adjacent weapon damage. 2.25% shorter adjacent cooldowns |
| [Tlatoani's Shroud](https://realm.wiki/item?id=14074) | robe | Generate 2 mana. +12 max mana. 8% adjacent ability output |
| [Toga Picta](https://realm.wiki/item?id=2526) | robe | Generate 2 mana and 5 block. +4 max mana. +9% adjacent weapon damage. -2.6% adjacent weapon recharge; 1.6 healing / 5s |
| [Traditional Blouse](https://realm.wiki/item?id=65058) | robe | Generate 2 mana and 4 block. 2.75% adjacent ability output; 2 healing / 5s. 15% ability mana refund; strongest gear discount only, shared 20% limit. Afford the cast first. |
| [Twilight Shroud](https://realm.wiki/item?id=8693) | robe | Generate 2 mana and 4 block. +14 max HP. +5 max mana. Conditional mana recovery. 2.25% shorter adjacent cooldowns. Weapon use: recover 3 mana. 5s shared cooldown · mana ≤50% |
| [Venerable Robe of the Mad Scientist](https://realm.wiki/item?id=38589) | robe | Generate 2 mana and 5 block. 3.85% adjacent ability output; 2.8 healing / 5s. 15% ability mana refund; strongest gear discount only, shared 20% limit. Afford the cast first. |
| [Vesture of Duality](https://realm.wiki/item?id=28837) | robe | Generate 2 mana and 4 block. +4 max mana. +4.5% adjacent weapon damage. Conditional stat boost. 2.25% shorter adjacent cooldowns. Ability use: incoming damage rises 4.2% and this armor/adjacent block falls 4.2% for 5s. 1s shared cooldown. Ability use: adjacent weapons deal 12% more damage for 5s. 1s shared cooldown · without Seal of the Battle God |
| [Wanderer's Cape](https://realm.wiki/item?id=37466) | robe | Generate 2 mana and 5 block. +6 max mana. +3.6% adjacent weapon damage. 3.3% adjacent ability output |
| [Water Dragon Silk Robe](https://realm.wiki/item?id=30051) | robe | Generate 2 mana and 5 block. +5.4% adjacent weapon damage. Conditional Healing. 2.7% shorter adjacent cooldowns; 2 healing / 5s. Ability use: 4 healing over 3s. 15s shared cooldown · HP ≤80%. Ability use: heal 11 HP. 15s shared cooldown · HP ≤80% |
| [Water Dragon Silk Robe](https://realm.wiki/item?id=53193) | robe | Generate 2 mana and 4 block. +5.4% adjacent weapon damage. 2.7% shorter adjacent cooldowns; 1.65% adjacent ability output |
| [Wind Dancer Robe](https://realm.wiki/item?id=14355) | robe | Generate 2 mana and 5 block. -4.5% adjacent weapon damage. 7.8% adjacent weapon recharge; 3.15% shorter adjacent cooldowns |
| [Wings of Sanctity](https://realm.wiki/item?id=19963) | robe | Generate 2 mana and 4 block. +5 max mana. 3.25% adjacent weapon recharge; 2.75% adjacent ability output; 2 healing / 5s |
| [Wings of the Fallen](https://realm.wiki/item?id=52034) | robe | Generate 2 mana and 4 block. +5 max mana. 3.25% adjacent weapon recharge; 2.75% adjacent ability output; 2 healing / 5s |
| [Woodland Robe](https://realm.wiki/item?id=2110) | robe | Generate 2 mana and 4 block. Conditional companion. 3.25% adjacent weapon recharge; 2.25% shorter adjacent cooldowns; 2.75% adjacent ability output. Weapon use: healing spirit for 5s: , 1 healing/sec. 3% charge per eligible event; 6.4s shared cooldown |
| [Wretched Rags](https://realm.wiki/item?id=24414) | robe | Generate 2 mana and 4 block. 3.25% adjacent weapon recharge; 5.5% adjacent ability output |
| [Aegis Armor](https://realm.wiki/item?id=1770) | plate | Gain 19 block. +3.6% adjacent weapon damage. Conditional stat boost. Direct incoming hit: adjacent weapons deal 4% more damage for 3s. 1s shared cooldown · HP ≤80%, without Seal of the Battle God. Direct incoming hit: adjacent weapons recharge 3% faster for 3s. 1s shared cooldown · HP ≤80% |
| [Almandine Armor of Anger](https://realm.wiki/item?id=9015) | plate | Gain 24 block.  |
| [Armor of Heavenly Light](https://realm.wiki/item?id=14500) | plate | Gain 23 block. +5 max HP.  |
| [Aspirant's Plate](https://realm.wiki/item?id=17632) | plate | Gain 20 block. +7 max HP.  |
| [Barnacle Shell](https://realm.wiki/item?id=48143) | plate | Gain 23 block. Conditional companion. Ability use: piercing barnacle for 8s: 1 damage/sec, up to 1 bleed per second. 8s shared cooldown |
| [Barrier Reef](https://realm.wiki/item?id=14868) | plate | Gain 19 block. Conditional healing. 2.6% adjacent weapon recharge. Weapon use: heal 24 HP. 25s shared cooldown · HP ≤50%, requires Alexander's Band |
| [Berserker's Breastplate](https://realm.wiki/item?id=14876) | plate | Gain 19 block. +3.6% adjacent weapon damage. Conditional stat boost. Weapon use: adjacent weapons deal 7.2% more damage for 5s. 4s shared cooldown · HP ≤90%: 2.4% / HP ≤70%: 4.8% / HP ≤50%: 7.2% |
| [Big Bad Fursuit](https://realm.wiki/item?id=3844) | plate | Gain 6 block.  |
| [Big Bad Fursuit](https://realm.wiki/item?id=3845) | plate | Gain 6 block.  |
| [Big Bad Fursuit](https://realm.wiki/item?id=3846) | plate | Gain 6 block.  |
| [Big Bad Fursuit](https://realm.wiki/item?id=3827) | plate | Gain 15 block. +5 max HP. +7.2% adjacent weapon damage. Conditional stat boost. 1.8% shorter adjacent cooldowns. Ability use: adjacent weapons deal 6.4% more damage for 12s. 180s shared cooldown · meter ≥1500, spend 1500. Ability use: deal up to 16 damage. 180s shared cooldown · meter ≥1500, spend 0. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost.. The source costume transformation is cosmetic and is not simulated. |
| [Boundless Vessel](https://realm.wiki/item?id=23625) | plate | Gain 18 block. +12 max mana. Conditional Energized. 8% adjacent ability output. Direct incoming hit: 3 mana over 3s. 5s shared cooldown · incoming damage ≥8 |
| [Breastplate of New Life](https://realm.wiki/item?id=597) | plate | Gain 16 block. +36 max HP.  |
| [Candy-Coated Armor](https://realm.wiki/item?id=3169) | plate | Gain 28 block. -3.25% adjacent weapon recharge |
| [Cask Corslet](https://realm.wiki/item?id=17850) | plate | Gain 17 block. +11 max HP. Conditional stat boost. 4 healing / 5s. Direct incoming hit: this armor and adjacent items gain 7% more block for 3s. 1s shared cooldown · incoming damage ≥8 |
| [Chainmail Body Armor](https://realm.wiki/item?id=22481) | plate | Gain 19 block. 2.7% shorter adjacent cooldowns; 2.4 healing / 5s |
| [Cuirass of the Black Blade](https://realm.wiki/item?id=37467) | plate | Gain 24 block.  |
| [Cyclone Chestplate](https://realm.wiki/item?id=65284) | plate | Gain 17 block. +11 max HP. 2.6% adjacent weapon recharge; 1.6 healing / 5s |
| [Eggre Battle Armor](https://realm.wiki/item?id=5036) | plate | Gain 16 block. +5.4% adjacent weapon damage. Conditional poison burst. 2.7% shorter adjacent cooldowns; 2 healing / 5s. Ability use: 5 impact damage and 5 poison. 10s shared cooldown |
| [Fairy Plate](https://realm.wiki/item?id=1191) | plate | Gain 17 block. +18 max HP. +4 max mana.  |
| [Fire Dragon Battle Armor](https://realm.wiki/item?id=30052) | plate | Gain 16 block. +5.4% adjacent weapon damage. Conditional fire burst. 2.7% shorter adjacent cooldowns; 2 healing / 5s. Ability use: 5 impact damage and 5 burn. 10s shared cooldown |
| [Fire Dragon Battle Armor](https://realm.wiki/item?id=53194) | plate | Gain 17 block. +3.6% adjacent weapon damage. 1.35% shorter adjacent cooldowns; 1.2 healing / 5s |
| [Flame Guard](https://realm.wiki/item?id=14381) | plate | Gain 15 block. +11 max HP. Conditional counterattack. Direct incoming hit: deal up to 8 damage. 5s shared cooldown |
| [Floral Guard Armor](https://realm.wiki/item?id=57128) | plate | Gain 25 block.  |
| [Frost Citadel Armor](https://realm.wiki/item?id=5853) | plate | Gain 24 block.  |
| [Fudgeclad Armor](https://realm.wiki/item?id=37693) | plate | Gain 23 block. +7 max HP. Conditional counterattack. Weapon use: deal up to 6 piercing damage. 2s shared cooldown · charged barrage active. Ability use: enable this armor's charged barrage for 3s. 30s shared cooldown · meter ≥1500, spend 1500. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost. |
| [Fungal Breastplate](https://realm.wiki/item?id=1205) | plate | Heal 12 HP. +18 max HP.  |
| [Fur Coat](https://realm.wiki/item?id=42318) | plate | Gain 19 block. 2.7% shorter adjacent cooldowns; 2.4 healing / 5s |
| [Gladiator Guard](https://realm.wiki/item?id=28855) | plate | Gain 19 block. +4.5% adjacent weapon damage. 3.25% adjacent weapon recharge; 3.15% shorter adjacent cooldowns |
| [Glorious Banded Plate](https://realm.wiki/item?id=3789) | plate | Gain 23 block. Conditional Healing. Direct incoming hit: 7 healing over 8s. 20s shared cooldown · incoming damage ≥4, requires a Superior–Transcendent Attack/Defense/Speed amulet. Direct incoming hit: 4 mana over 8s. 20s shared cooldown · incoming damage ≥4, requires a Superior–Transcendent Vitality/Wisdom/Dexterity amulet |
| [Hardened Carrot Armor](https://realm.wiki/item?id=41669) | plate | Gain 16 block. +9 max HP. Conditional counterattack. 2 healing / 5s. Ability use: deal up to 16 damage. 4.8s shared cooldown |
| [Heavy Construction Vest](https://realm.wiki/item?id=12075) | plate | Gain 23 block. 1.6 healing / 5s |
| [Heavy Protective Matrix](https://realm.wiki/item?id=1155) | plate | Gain 20 block. Brief protection on an eligible trigger. Direct incoming hit: 1.4s protection against direct attacks; cannot revive lethal damage. 180s shared cooldown · HP ≤50%, incoming damage ≥1. Direct incoming hit: your weapons recharge 15% slower for 3s. 180s shared cooldown · HP ≤50%, incoming damage ≥1 |
| [Heavy Syndicate Attire](https://realm.wiki/item?id=14428) | plate | Gain 20 block. Conditional counterattack. 2.7% shorter adjacent cooldowns; 2.4 healing / 5s. Weapon use: deal up to 12 damage. 1s shared cooldown · requires a Syndicate weapon and Sunken Fire Opal Ring, Faded Heart Scarab or Fractured Hannya. 10% ability mana refund; strongest gear discount only, shared 20% limit. Afford the cast first. |
| [Hull of the Tundra](https://realm.wiki/item?id=26566) | plate | Gain 17 block. +10 max HP. +5 max mana. Conditional counterattack. Direct incoming hit: deal up to 4 damage, plus chill. 3s shared cooldown · incoming damage ≥5 |
| [Kamishimo](https://realm.wiki/item?id=8256) | plate | Gain 17 block. +14 max HP. 3.25% adjacent weapon recharge |
| [Legacy Fairy Plate](https://realm.wiki/item?id=9060) | plate | Gain 19 block. +9 max HP. +4 max mana.  |
| [Legion Elite Plate Armor](https://realm.wiki/item?id=41810) | plate | Gain 25 block.  |
| [Lovebite Armor](https://realm.wiki/item?id=34340) | plate | Gain 17 block. +11 max HP. Conditional stat boost. 4 healing / 5s. Direct incoming hit: this armor and adjacent items gain 7% more block for 3s. 1s shared cooldown · incoming damage ≥8 |
| [Mercy's Bane](https://realm.wiki/item?id=23518) | plate | Gain 13 block. +6.3% adjacent weapon damage. 4.55% adjacent weapon recharge |
| [Naval Uniform](https://realm.wiki/item?id=8667) | plate | Gain 18 block. +7.2% adjacent weapon damage. -1.3% adjacent weapon recharge; 1.35% shorter adjacent cooldowns; 2.4 healing / 5s |
| [Neo Heavy Protective Matrix](https://realm.wiki/item?id=56466) | plate | Gain 23 block. Brief protection on an eligible trigger. Direct incoming hit: 1.4s protection against direct attacks; cannot revive lethal damage. 180s shared cooldown · HP ≤50%, incoming damage ≥1. Direct incoming hit: your weapons recharge 15% slower for 3s. 180s shared cooldown · HP ≤50%, incoming damage ≥1 |
| [Overalls of Endurance](https://realm.wiki/item?id=32444) | plate | Gain 14 block. +9 max HP. Conditional stat boost. 3.25% adjacent weapon recharge. Direct incoming hit: adjacent weapons recharge 3% faster for 4s. 4.2s shared cooldown · incoming damage ≥4 |
| [pD Armor](https://realm.wiki/item?id=1978) | plate | Gain 23 block. +11 max HP. 2.25% shorter adjacent cooldowns; 2% less healing |
| [Platinum Segmentata](https://realm.wiki/item?id=3841) | plate | Gain 6 block.  |
| [Platinum Segmentata](https://realm.wiki/item?id=3842) | plate | Gain 6 block.  |
| [Platinum Segmentata](https://realm.wiki/item?id=3843) | plate | Gain 6 block.  |
| [Platinum Segmentata](https://realm.wiki/item?id=3826) | plate | Gain 17 block. +11 max HP. Conditional stat boost. 1.2 healing / 5s. Ability use: this armor and adjacent items gain 8.4% more block for 12s. 180s shared cooldown · meter ≥1500, spend 1500. Ability use: deal up to 16 damage. 180s shared cooldown · meter ≥1500, spend 0. Defeated waves charge this item by 300 (boss: 1500), up to 6000. Charged effects spend their listed meter cost.. The source costume transformation is cosmetic and is not simulated. |
| [Ragetorn Armor](https://realm.wiki/item?id=14775) | plate | Gain 18 block. +7.2% adjacent weapon damage. -1.3% adjacent weapon recharge; 1.35% shorter adjacent cooldowns; 2.4 healing / 5s |
| [Reinforced Apron](https://realm.wiki/item?id=52023) | plate | Gain 24 block. +5 max HP.  |
| [Reinforced Root Armor](https://realm.wiki/item?id=21223) | plate | Gain 19 block. +6 max mana. Conditional stat boost. Direct incoming hit: heal 10 HP over 4s. 6s shared cooldown · incoming damage ≥8, requires Traveler's Trinket |
| [Resurrected Warrior's Armor](https://realm.wiki/item?id=3182) | plate | Gain 16 block. +12 max mana. Conditional Energized. 5.5% adjacent ability output. Direct incoming hit: 3 mana over 3s. 6s shared cooldown · incoming damage ≥8 |
| [Retainer's Battlesuit](https://realm.wiki/item?id=26575) | plate | Gain 16 block. Conditional stat boost. 4.55% adjacent weapon recharge; 2.4% less healing. Ability use: adjacent weapons recharge 3.6% faster for 5s. 1s shared cooldown · gear reduces Wisdom. Ability use: adjacent weapons deal 4.8% more damage for 5s. 1s shared cooldown · gear reduces maximum mana |
| [Retrowinds Heavy Armor](https://realm.wiki/item?id=63882) | plate | Gain 25 block.  |
| [Royal Guard's Cuirass](https://realm.wiki/item?id=14472) | plate | Gain 18 block. +14 max HP. Brief protection on an eligible trigger. 4 healing / 5s. Weapon use: 1.6s protection against direct attacks; cannot revive lethal damage. 20s shared cooldown |
| [Sage's Wakibiki](https://realm.wiki/item?id=20468) | plate | Gain 17 block. +9 max HP. Conditional companion. 8% adjacent ability output; 6 healing / 5s. Ability use: slowing spirit for 6s: 1 damage/sec, chills the enemy; a different friendly spirit improves its output. 6s shared cooldown |
| [Stoneborn Husk](https://realm.wiki/item?id=48120) | plate | Gain 13 block. +12% adjacent weapon damage. Conditional poison burst. -8% adjacent weapon recharge. Direct incoming hit: 0 impact damage and 2 poison. 5s shared cooldown · incoming damage ≥10 |
| [Swim Tube](https://realm.wiki/item?id=28466) | plate | Gain 25 block.  |
| [Tormentor's Chainmail](https://realm.wiki/item?id=25747) | plate | Gain 17 block. +18 max HP. +4 max mana.  |
| [Venerable Resurrected Warrior's Armor](https://realm.wiki/item?id=38588) | plate | Gain 18 block. +12 max mana. Conditional Energized. 6.6% adjacent ability output. Direct incoming hit: 3 mana over 3s. 6s shared cooldown · incoming damage ≥8 |
| [Vortex Plating](https://realm.wiki/item?id=17389) | plate | Gain 16 block. +9 max HP. Conditional counterattack. 2 healing / 5s. Ability use: deal up to 16 damage. 4.8s shared cooldown |
| [Warped Mantle](https://realm.wiki/item?id=26026) | plate | Gain 17 block. Conditional Healing. 2.4 healing / 5s. Weapon use: 7 healing over 4s. 10s shared cooldown |
| [Zaarvox's Heart](https://realm.wiki/item?id=32697) | plate | Gain 18 block. 3.6% shorter adjacent cooldowns |
