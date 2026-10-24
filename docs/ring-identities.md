# UT/ST ring identities — 0.38.0

All **314 imported UT/ST ring variants** (277 normal/historical definitions and 37 Shiny variants) now have source-derived stats and signatures. The 57 tiered rings and every definition outside this category are byte-for-byte unchanged. Historical duplicate names use their own source IDs; unobtainable Legacy items stay unobtainable. IDs, sprites, footprints, ST memberships and saved upgrades are preserved.

## Sources and interpretation

The [raw source facts](ring-source-facts.json) preserve each ring's equip effects, event conditions and source URL, retrieved 2026-10-24 from Realm.wiki. [Projectile helper facts](ring-proc-source-facts.json) retain subordinate projectile damage/status data. These are RealmPack adaptations: shooting, aiming, distance, fishing, mining and large RotMG stat totals do not transfer literally to this game. Source changes after the research date are not automatically imported.

The current source and historical source can differ despite sharing a name: current Twilight Gemstone includes a 20% ability discount; its historical definition does not. Both are intentionally distinct. Source stat costs remain costs. Fishing rods and the Pickaxe keep their represented stats; bait/mining objects are not invented attacking companions.

## Tiered ring calibration

The existing specialized T7 rings are the anchors below. T1–T7 progression and existing tiered behavior are unchanged.

| Source stat | Existing RealmPack T7 reference | UT/ST interpretation |
| --- | --- | --- |
| 11 ATT | +20% adjacent weapon output | Same role and shared primary cap |
| 11 DEF | +31% adjacent item block | Same role and shared +50% block cap |
| 11 WIS | +20% adjacent ability output | Same role, fractional output carry and shared primary cap |
| 11 SPD | 10% shorter adjacent cooldowns | Same role and shared 20% reduction cap |
| 11 DEX | 2.77s adjacent +25% haste / 5.58s | Timed adjacent haste, not global recharge |
| 11 VIT | 13 healing / 4.18s | Fractional healing carries between pulses; fatigue applies |
| 160 HP | +36 max HP | Capacity plus once-per-battle start restoration |
| 160 MP | +17 max mana | Capacity plus 1–3 once-per-battle start mana |

Each positive raw stat is divided by its source T7 reference, with a per-role maximum of 1.1 T7 equivalents. Multiple positive roles apply a specialization factor of `1 / (1 + 0.2 × (roles − 1))`. Rings with event procs reserve 15% of the stat budget. Total positive static value is limited to 1.75 T7 role equivalents. This lets an unusual single-role UT modestly exceed a tiered ring, while hybrids trade individual strength for flexibility. These budgets do not assert that every role has equal combat value.

Attack, Wisdom, Defense and Speed share the existing strongest-two adjacency rules and caps with tiered rings. Primary bonuses share +35%, block bonuses +50%, continuous cooldown reductions 20%; temporary haste refreshes and never stacks. Temporary proc bonuses share those caps. Static Vitality and Dexterity pulses use the strongest two distinct UT/ST profile families. Identical copies, reskins and Shiny variants share proc locks; passive stat adjacency still follows the existing strongest-two rule.

Positive equipment capacity retains the existing +80 HP / +20 mana cap. HP restoration shares the tiered +100 battle-start cap, and starting mana shares the tiered +6 cap. Equipping never refills resources. Negative capacity costs are bounded at −40 HP / −20 mana, with at least 20 max HP and 10 max mana. Negative ATT/WIS lower adjacent primary output, negative DEF lowers adjacent item block, negative SPD/DEX lengthen relevant cooldowns, and negative VIT reduces healing. Cooldown/output penalties cap at 25%; block/healing penalties cap at 35%. Penalties are not strengthened by positive upgrades.

Power infusions and ring-strength upgrades increase positive passive stats. Relevant saved Might/Bulwark/Restoration enchantments also strengthen their matching stat role; Barrier/Siphon/Tactics keep their enchantment cycles. Existing two-piece ST bonuses increase positive ring stats by 8%, with the designated full-set behaviors preserved. Shiny rings have 5% stronger positive stats and a 5.7s enchantment cycle instead of 6s; penalties, procs and shared locks are unchanged.

## Signature examples

| Ring | Implemented identity |
| --- | --- |
| The Forgotten Crown | About +18 HP, +7.79% adjacent weapon damage and 1.08s adjacent haste per 5.58s; no generic mana pulse or permanent global haste. |
| The Twilight Gemstone | Wisdom/Speed/Defense/mana stats plus a 20% ability-mana refund. You must afford the cast first; fractional credit accumulates into whole mana. Strongest ring discount only. |
| Exalted God's Horn | Health and Defense, with an adjacent haste proc only while at least 90% healthy. |
| E.Y.E. | Mixed defensive stats and a small projectile retaliation on direct incoming hits, including fully blocked hits; a shared one-second lock prevents repeated triggers. |
| Interregnum / Grim Goblet | Conditional adjacent attack boosts from ability-use charge, with a shared eight-second lock. |
| Ring of Pure Wishes / Horned Ring | Conditional adjacent attack boost when weapon use follows actual recent healing. |
| Amulets of Dispersion / Restoration | Emergency healing; Restoration also grants brief protection. Neither can rescue a lethal hit. |
| Antinomy Artifact | A short-lived duality companion that deals damage and heals. |
| Kagenohikari / +Kagenohikari | Mana efficiency and source-inspired spirits; friendly spirits cycle healing, chill and exposure. Malevolent spirits combine effects at an extra mana cost. |
| Babel Blocks | Ability use summons the source's class-matched cuboid; one bounded companion per family. Cuboid attacks use the same tuned damage budget rather than recreating RotMG aiming/projectiles. |
| Alien cores and reactors | Count up to three distinct matching non-ring Alien/Neo Alien pieces for bounded catalyst stats. No self-counting or recursive stat multiplication. |
| Ornaments of Unity | Counts the three matching Oryxmas ornament rings; a small plant companion combines mana, exposure and weakening effects. |
| Yokai Amulet | A persistent 100-charge kill meter: +20 per defeated wave, +100 for a Yokai-named encounter. Ability use spends a full meter on an armored guardian and adjacent weapon support. Repeated victory calls do not award extra charge. |
| Conqueror's Crown / other relative-stat rings | Scale from bounded permanent/tiered references; UT/ST rings cannot recursively amplify one another. |

Chance procs accumulate deterministic charge only on eligible events and do not accumulate while locked. Source class, equipment inclusion/exclusion, health, mana and represented condition requirements are checked. High/low HP checks use current health percentage; source flat incoming-damage thresholds are scaled to RealmPack damage. Recently healed means actual healing within three seconds; Invisible uses a successful packed cloak window; Speedy/Berserk use haste; Bleeding eligibility uses the represented poison condition. Armor Broken/Exposed/Curse translate to the existing vulnerability system. Enemy Slowed/Paralyzed translate to chill with a bounded attack delay for paralysis. Defensive Armored gives 20% damage reduction, sharing the existing armor factor.

At most two ring companions share the existing global eight-companion limit, and at most 16 ring fields can be active. Source removal, wave changes and battle resets remove invalid effects. Fields of the same family/kind replace rather than add. Pet damage, projectile volleys and poison use bounded budgets; pellet count does not multiply flat weapon power. Kill-meter items retain their meter in saves; other transient proc state resets at battle setup.

## Validation

See [the paired benchmark](ring-balance-results.json), `scripts/benchmark-special-rings.cjs` and `game/tests/test-special-rings.cjs`. The benchmark uses identical fixed builds and legal placement; its clears are comparative fixtures, not player win probabilities. Source-specific pairing builds, every possible enchantment combination and full-run economy are outside that benchmark. Existing eight ST sets also retain their combat regression coverage.

The paired run completed **4,576 fights per version**: 2,009 clears before and 1,961 after. T7 reference rings cleared 6–8 of their 16 fixtures; the strongest special, +Kagenohikari, cleared 11. This is a balance watchpoint for companion-heavy caster builds, not a measured player win rate. Removing generic mana pulses reduced several old ring results; synergy-dependent cores are tested without their matching gear in this broad comparison. All 1,995 legal tiered class fixtures have identical full outcome rows before/after. All 29 regression suites and game syntax checks pass. Browser checks covered 2,524 ring inspection views and 7,176 catalogue views without clipping, runtime errors or default catalogue overflow; mixed-ring combat also ran at 4×.

## Complete normal/historical ring mapping

Values below use the default 100-HP reference before enhancements and equipment catalysts. Full source conditions remain in the game inspection and raw facts. The 37 Shiny variants inherit their base profile with the bonus described above.

| Ring / source | Tier | Base adaptation and conditions |
| --- | --- | --- |
| [+Kagenohikari](https://realm.wiki/item?id=19323) | UT | +13 max HP; +6 max mana; 3.77 healing / 4.18s; 5.8% adjacent ability output. Ability use: malevolent companion for 6s, costs 4 extra mana. 4s shared lock. Strongest ring discount only, max 20%; you must afford the upfront cast.  |
| [Abyssal Trophy](https://realm.wiki/item?id=25991) | UT | 6.49% adjacent weapon damage; 0.9s adjacent haste / 5.58s; 6.49% shorter adjacent cooldowns.   |
| [Adventurer's Scarf](https://realm.wiki/item?id=20905) | UT | +9 max HP; 10.48% adjacent block gain; 2.41% shorter adjacent cooldowns; 3.14 healing / 4.18s. Ability use: 9 healing. 15s shared lock.  |
| [Akuma's Tear](https://realm.wiki/item?id=8257) | ST | +8 max HP; +4 max mana; 0.63s adjacent haste / 5.58s; 2.27% shorter adjacent cooldowns.   |
| [Alexander's Band](https://realm.wiki/item?id=14869) | ST | +15 max HP; 1.26s adjacent haste / 5.58s.   |
| [Alien Core Corrosion](https://realm.wiki/item?id=25702) | ST | No unconditional stat bonus. Direct hit: 4 poison. 10% charge per eligible event; 10s shared lock. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Alien Core Dark Matter](https://realm.wiki/item?id=25703) | ST | No unconditional stat bonus. Direct hit: Armor Broken. 10% charge per eligible event; 10s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Alien Core Power](https://realm.wiki/item?id=25686) | ST | No unconditional stat bonus. Direct hit: Paralyzed. 10% charge per eligible event; 10s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Alien Core Warp](https://realm.wiki/item?id=25701) | ST | No unconditional stat bonus. Direct hit: +1 dodge. 10% charge per eligible event; 10s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Almandine Ring of Wrath](https://realm.wiki/item?id=9016) | ST | +26 max HP; +4 max mana.   |
| [America Ring](https://realm.wiki/item?id=3117) | UT | 1.17% adjacent block gain; 0.76% adjacent weapon damage; 0.49 healing / 4.18s; 0.38% shorter adjacent cooldowns; 0.76% adjacent ability output; 0.1s adjacent haste / 5.58s; +2 max HP; +1 max mana.   |
| [Amulet of Desecration](https://realm.wiki/item?id=23631) | UT | No unconditional stat bonus. Weapon use: Sick for 666s. 1s shared lock. Ability use: Sick for 666s. 1s shared lock. Direct hit: Sick for 666s. 1s shared lock.  |
| [Amulet of Dispersion](https://realm.wiki/item?id=2878) | UT | 1.29% adjacent weapon damage; 2% adjacent block gain; 0.64% shorter adjacent cooldowns; 0.84 healing / 4.18s; 1.29% adjacent ability output; 0.18s adjacent haste / 5.58s; +3 max HP; +2 max mana. Direct hit: 14 healing. 1800s shared lock · HP ≤20%, incoming hit ≥1.  |
| [Amulet of Drakefyre](https://realm.wiki/item?id=32698) | ST | +22 max HP; 3.79% shorter adjacent cooldowns.   |
| [Amulet of Elemental Air](https://realm.wiki/item?id=14399) | UT | +6 max HP; +3 max mana; 1.8s adjacent haste / 5.58s.   |
| [Amulet of Elemental Earth](https://realm.wiki/item?id=14401) | UT | +6 max HP; +3 max mana; 20.13% adjacent block gain.   |
| [Amulet of Elemental Fire](https://realm.wiki/item?id=14398) | UT | +6 max HP; +3 max mana; 12.99% adjacent weapon damage.   |
| [Amulet of Elemental Water](https://realm.wiki/item?id=14400) | UT | +6 max HP; +3 max mana; 8.44 healing / 4.18s.   |
| [Amulet of Exalted Attack](https://realm.wiki/item?id=3762) | UT | +5 max HP; +2 max mana; 11.69% adjacent weapon damage.   |
| [Amulet of Exalted Defense](https://realm.wiki/item?id=3763) | UT | +5 max HP; +2 max mana; 18.12% adjacent block gain.   |
| [Amulet of Exalted Dexterity](https://realm.wiki/item?id=3767) | UT | +5 max HP; +2 max mana; 1.62s adjacent haste / 5.58s.   |
| [Amulet of Exalted Speed](https://realm.wiki/item?id=3764) | UT | +5 max HP; +2 max mana; 5.84% shorter adjacent cooldowns.   |
| [Amulet of Exalted Vitality](https://realm.wiki/item?id=3765) | UT | +5 max HP; +2 max mana; 7.6 healing / 4.18s.   |
| [Amulet of Exalted Wisdom](https://realm.wiki/item?id=3766) | UT | +5 max HP; +2 max mana; 11.69% adjacent ability output.   |
| [Amulet of Lightning](https://realm.wiki/item?id=17691) | UT | +10 max HP; +5 max mana; 2.76% shorter adjacent cooldowns. Ability use: adjacent haste for 3s. 6s shared lock.  |
| [Amulet of Paramount Attack](https://realm.wiki/item?id=3756) | UT | +3 max HP; +2 max mana; 10.39% adjacent weapon damage.   |
| [Amulet of Paramount Defense](https://realm.wiki/item?id=3757) | UT | +3 max HP; +2 max mana; 16.1% adjacent block gain.   |
| [Amulet of Paramount Dexterity](https://realm.wiki/item?id=3761) | UT | +3 max HP; +2 max mana; 1.44s adjacent haste / 5.58s.   |
| [Amulet of Paramount Speed](https://realm.wiki/item?id=3758) | UT | +3 max HP; +2 max mana; 5.19% shorter adjacent cooldowns.   |
| [Amulet of Paramount Vitality](https://realm.wiki/item?id=3759) | UT | +3 max HP; +2 max mana; 6.75 healing / 4.18s.   |
| [Amulet of Paramount Wisdom](https://realm.wiki/item?id=3760) | UT | +3 max HP; +2 max mana; 10.39% adjacent ability output.   |
| [Amulet of Restoration](https://realm.wiki/item?id=23624) | UT | 1.93% adjacent weapon damage; 2.99% adjacent block gain; 0.97% shorter adjacent cooldowns; 1.26 healing / 4.18s; 1.93% adjacent ability output; 0.27s adjacent haste / 5.58s; +5 max HP; +2 max mana. Weapon use: 2 healing over 4s. 30s shared lock · HP ≤20%. Weapon use: adjacent haste for 3s. 30s shared lock · HP ≤20%. Weapon use: 20% damage reduction for 4s. 30s shared lock · HP ≤20%. Direct hit: Invulnerable for 2s. 1800s shared lock · HP ≤20%, incoming hit ≥1. Direct hit: 14 healing. 1800s shared lock · HP ≤20%, incoming hit ≥1.  |
| [Amulet of Superior Attack](https://realm.wiki/item?id=3804) | UT | +2 max HP; +1 max mana; 9.09% adjacent weapon damage.   |
| [Amulet of Superior Defense](https://realm.wiki/item?id=3805) | UT | +2 max HP; +1 max mana; 14.09% adjacent block gain.   |
| [Amulet of Superior Dexterity](https://realm.wiki/item?id=3809) | UT | +2 max HP; +1 max mana; 1.26s adjacent haste / 5.58s.   |
| [Amulet of Superior Speed](https://realm.wiki/item?id=3806) | UT | +2 max HP; +1 max mana; 4.55% shorter adjacent cooldowns.   |
| [Amulet of Superior Vitality](https://realm.wiki/item?id=3807) | UT | +2 max HP; +1 max mana; 5.91 healing / 4.18s.   |
| [Amulet of Superior Wisdom](https://realm.wiki/item?id=3808) | UT | +2 max HP; +1 max mana; 9.09% adjacent ability output.   |
| [Amulet of the Great Shaman](https://realm.wiki/item?id=37470) | UT | +8 max HP; +12 max mana.   |
| [Amulet of Transcendent Attack](https://realm.wiki/item?id=3774) | UT | +8 max HP; +4 max mana; 14.29% adjacent weapon damage.   |
| [Amulet of Transcendent Defense](https://realm.wiki/item?id=3775) | UT | +8 max HP; +4 max mana; 22.14% adjacent block gain.   |
| [Amulet of Transcendent Dexterity](https://realm.wiki/item?id=3779) | UT | +8 max HP; +4 max mana; 1.98s adjacent haste / 5.58s.   |
| [Amulet of Transcendent Speed](https://realm.wiki/item?id=3776) | UT | +8 max HP; +4 max mana; 7.14% shorter adjacent cooldowns.   |
| [Amulet of Transcendent Vitality](https://realm.wiki/item?id=3777) | UT | +8 max HP; +4 max mana; 9.29 healing / 4.18s.   |
| [Amulet of Transcendent Wisdom](https://realm.wiki/item?id=3778) | UT | +8 max HP; +4 max mana; 14.29% adjacent ability output.   |
| [Amulet of Unbound Attack](https://realm.wiki/item?id=3768) | UT | +6 max HP; +3 max mana; 12.99% adjacent weapon damage.   |
| [Amulet of Unbound Defense](https://realm.wiki/item?id=3769) | UT | +6 max HP; +3 max mana; 20.13% adjacent block gain.   |
| [Amulet of Unbound Dexterity](https://realm.wiki/item?id=3773) | UT | +6 max HP; +3 max mana; 1.8s adjacent haste / 5.58s.   |
| [Amulet of Unbound Speed](https://realm.wiki/item?id=3770) | UT | +6 max HP; +3 max mana; 6.49% shorter adjacent cooldowns.   |
| [Amulet of Unbound Vitality](https://realm.wiki/item?id=3771) | UT | +6 max HP; +3 max mana; 8.44 healing / 4.18s.   |
| [Amulet of Unbound Wisdom](https://realm.wiki/item?id=3772) | UT | +6 max HP; +3 max mana; 12.99% adjacent ability output.   |
| [Antinomy Artifact](https://realm.wiki/item?id=14756) | ST | +6 max HP; +3 max mana; 2.9% adjacent weapon damage; 4.49% adjacent block gain. Ability use: duality companion for 6s. 25s shared lock.  |
| [Aquamarine Amulet](https://realm.wiki/item?id=21116) | ST | 10.06% adjacent block gain; 4.22 healing / 4.18s; +8 max HP.   |
| [Augur of the Tempest](https://realm.wiki/item?id=14356) | ST | +12 max HP; 3.25% shorter adjacent cooldowns; 0.9s adjacent haste / 5.58s.   |
| [Autarch Amulet](https://realm.wiki/item?id=32418) | ST | +10 max HP; +8 max mana; 9.09% adjacent ability output.   |
| [Babel Blocks](https://realm.wiki/item?id=48003) | UT | +21 max HP; 6.7 healing / 4.18s. Ability use: cuboid companion for 8s. 8s shared lock · matching class cuboid.  |
| [Basic Fishing Rod](https://realm.wiki/item?id=20703) | UT | No unconditional stat bonus.  Fishing interactions are not simulated; no combat bait or extra loot is invented. |
| [Battalion Banner](https://realm.wiki/item?id=28849) | UT | +12 max HP; 2.21% shorter adjacent cooldowns; 0.61s adjacent haste / 5.58s. Ability use: banner companion for 4s. 10s shared lock.  |
| [Bloodshed Ring](https://realm.wiki/item?id=595) | UT | +18 max HP; 12.08% adjacent block gain; 10.39% adjacent ability output.   |
| [Bloodstone Ring](https://realm.wiki/item?id=23519) | ST | +23 max HP; 9.39% adjacent block gain.   |
| [Bolt in a Bottle](https://realm.wiki/item?id=65290) | ST | +2 max mana; 12.08% adjacent block gain; 2.6% shorter adjacent cooldowns.   |
| [Bracer of the Guardian](https://realm.wiki/item?id=2989) | UT | 15.85% adjacent block gain; 4.55% adjacent weapon damage; +13 max HP; +5 max mana.   |
| [Bracer of the Guardian](https://realm.wiki/item?id=53198) | UT | 10.57% adjacent block gain; 6.82% adjacent weapon damage; +8 max HP; +4 max mana.   |
| [Brass Knuckles](https://realm.wiki/item?id=65285) | ST | +5 max HP; 14.09% adjacent block gain; 1.08s adjacent haste / 5.58s.   |
| [Brewer's Bangle](https://realm.wiki/item?id=17857) | UT | 7.79% adjacent weapon damage; 4.55% longer adjacent cooldowns; +16 max HP; 6.33 healing / 4.18s.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Bronze Medal](https://realm.wiki/item?id=3136) | UT | 0.18s adjacent haste / 5.58s; 0.84 healing / 4.18s; 0.65% shorter adjacent cooldowns.   |
| [Bronze Pocketwatch](https://realm.wiki/item?id=65059) | ST | 3.06% adjacent ability output; +7 max HP; +4 max mana; 7.12% adjacent block gain; 2.3% shorter adjacent cooldowns; 4.6% adjacent weapon damage; 0.64s adjacent haste / 5.58s; 2.99 healing / 4.18s.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Bud of Beginning](https://realm.wiki/item?id=42016) | ST | +10 max HP; +7 max mana; 0.54s adjacent haste / 5.58s; 5.8% adjacent ability output. Ability use: +1% ability output, up to 5%, refreshing for 20s. 1s shared lock.  |
| [Burlap Hat](https://realm.wiki/item?id=25734) | ST | +11 max HP; 10.06% adjacent block gain; 3.25% shorter adjacent cooldowns.   |
| [C.O.N.T.R.O.L.L.E.R.](https://realm.wiki/item?id=14229) | ST | +8 max HP; 16.1% adjacent block gain; 3.25% shorter adjacent cooldowns.   |
| [Candy Ring](https://realm.wiki/item?id=3167) | UT | 7.58% shorter adjacent cooldowns; 9.85 healing / 4.18s; -11 max mana; -18.18% adjacent ability output.   |
| [Captain's Ring](https://realm.wiki/item?id=3111) | UT | +6 max HP; 4.04% adjacent weapon damage; 0.56s adjacent haste / 5.58s; 5.05% adjacent ability output; 3.28 healing / 4.18s.   |
| [Chancellor's Cranium](https://realm.wiki/item?id=28844) | UT | 0.46s adjacent haste / 5.58s; 10.27% adjacent block gain; +16 max HP. Direct hit: cranium companion for 5s. 5s shared lock · incoming hit ≥10.  |
| [Chef's Hat](https://realm.wiki/item?id=18360) | UT | +7 max HP; +3 max mana; 8.81% adjacent block gain; 5.68% adjacent ability output.   |
| [Chocolate Bunny Ears](https://realm.wiki/item?id=41766) | ST | +13 max HP; +3 max mana; 8.05% adjacent block gain.   |
| [Chrysalis of Eternity](https://realm.wiki/item?id=14214) | UT | 1.26s adjacent haste / 5.58s; 9.09% adjacent weapon damage; +19 max HP.   |
| [Chrysanthemum Corsage](https://realm.wiki/item?id=6215) | ST | +5 max mana; 3.25% shorter adjacent cooldowns; 1.26s adjacent haste / 5.58s.   |
| [Collarbone Collar](https://realm.wiki/item?id=25741) | ST | 4.42% adjacent weapon damage; 2.76% shorter adjacent cooldowns; +8 max HP. Weapon use: 9.09% adjacent cooldown reduction for 1s. 0.8s shared lock · while hasted.  |
| [Collector's Monocle](https://realm.wiki/item?id=28833) | UT | +22 max HP; 1.43s adjacent haste / 5.58s. Weapon use: adjacent haste for 2.77s. 1s shared lock · cloak active, without Seal of the Battle God.  |
| [Colossal Ring of the Crucible](https://realm.wiki/item?id=786) | UT | +19 max HP; 9.09% adjacent weapon damage; 5.06 healing / 4.18s.   |
| [Conqueror's Crown](https://realm.wiki/item?id=6703) | UT | +2 max HP; 8.45% adjacent weapon damage; 1.17s adjacent haste / 5.58s; 5.49 healing / 4.18s; 8.45% adjacent ability output. Direct hit: Invulnerable for 2s. 999999s shared lock · HP ≤15%, incoming hit ≥1. Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Coral Ring](https://realm.wiki/item?id=3091) | UT | 2.84% shorter adjacent cooldowns; 0.79s adjacent haste / 5.58s; 5.68% adjacent ability output; +6 max mana.  Strongest ring discount only, max 20%; you must afford the upfront cast.  |
| [Corrupted Ring of the Crucible](https://realm.wiki/item?id=789) | UT | +19 max HP; 10.06% adjacent block gain; 4.22 healing / 4.18s.   |
| [Corsair Ring](https://realm.wiki/item?id=8841) | UT | +4 max HP; 4.7% adjacent block gain.   |
| [Creator's Ring](https://realm.wiki/item?id=585) | UT | +21 max HP; 7.58 healing / 4.18s; 11.67% adjacent weapon damage.   |
| [Crown](https://realm.wiki/item?id=2323) | UT | 5.69 healing / 4.18s; 8.75% adjacent ability output; 8.75% adjacent weapon damage; 4.38% shorter adjacent cooldowns.   |
| [Crystal Bone Ring](https://realm.wiki/item?id=3095) | UT | 0.71s adjacent haste / 5.58s; 5.15% adjacent ability output. Weapon use: 1 mana. 10% charge per eligible event; 2s shared lock.  |
| [Crystal Key](https://realm.wiki/item?id=19250) | UT | +7 max HP; 6.84% adjacent block gain; 0.46s adjacent haste / 5.58s. Direct hit: 12 damage, slow, expose. 10% charge per eligible event; 5s shared lock · incoming hit ≥1.  |
| [Crystallised Mist](https://realm.wiki/item?id=1201) | UT | +8 max HP; 10.27% adjacent block gain; 4.42% shorter adjacent cooldowns. Direct hit: +1 dodge and cloak eligibility for 4s. 40s shared lock · incoming hit ≥10.  |
| [Cuband](https://realm.wiki/item?id=16980) | ST | +13 max HP; 0.89s adjacent haste / 5.58s. Weapon use: 12 healing. 20s shared lock.  |
| [Decades Chronicle](https://realm.wiki/item?id=38594) | ST | +32 max HP; +15 max mana.   |
| [Defiled Equilibrium](https://realm.wiki/item?id=8694) | ST | +8 max HP; +1 max mana; 8.81% adjacent block gain; 2.84% shorter adjacent cooldowns.   |
| [Devil Horn Headband](https://realm.wiki/item?id=1223) | ST | +11 max HP; 4.42% adjacent ability output; 0.61s adjacent haste / 5.58s. Direct hit: +1 dodge. 20% charge per eligible event; 15s shared lock · incoming hit ≥1. Direct hit: imp companion for 5s. 20% charge per eligible event; 15s shared lock · incoming hit ≥1.  |
| [Diamond Pickaxe](https://realm.wiki/item?id=42089) | UT | +19 max HP; 6.06% adjacent weapon damage.  Mining interactions are not simulated; the mining helper is not an attacking companion. |
| [Divine Coronation](https://realm.wiki/item?id=28838) | UT | +15 max HP; +4 max mana; 1.26s adjacent haste / 5.58s; 8.81% adjacent block gain.   |
| [Diving Weights](https://realm.wiki/item?id=1911) | ST | +10 max HP; 6.06% shorter adjacent cooldowns.   |
| [E.Y.E.](https://realm.wiki/item?id=15759) | UT | +9 max HP; +4 max mana; 3.77 healing / 4.18s; 8.98% adjacent block gain. Direct hit: 5 damage. 1s shared lock · incoming hit ≥1.  |
| [Eden's Embrace](https://realm.wiki/item?id=59893) | UT | +12 max HP; +6 max mana; 14.97% adjacent block gain; 4.83% shorter adjacent cooldowns. Weapon use: adjacent haste for 3s. 6% charge per eligible event; 8s shared lock. Ability use: 2 mana. 60% charge per eligible event; 8s shared lock. Ability use: 12 damage. 60% charge per eligible event; 8s shared lock. Direct hit: 7 healing. 80% charge per eligible event; 8s shared lock.  |
| [Elderfrost Heirloom](https://realm.wiki/item?id=42352) | UT | +15 max HP; +3 max mana; 0.84s adjacent haste / 5.58s; 6.06% adjacent ability output; 9.39% adjacent block gain.   |
| [Elemental Equilibrium](https://realm.wiki/item?id=14402) | UT | +13 max HP; +6 max mana. Weapon use: adjacent haste for 1.4s. 0.8s shared lock · HP ≥90%. Weapon use: 9.09% adjacent weapon damage for 1.4s. 0.8s shared lock · HP ≥90%. Direct hit: 9.09% adjacent block gain for 10s. 15s shared lock · HP ≤60%. Direct hit: 15 healing over 10s. 15s shared lock · HP ≤60%.  |
| [Ember of the Daeva](https://realm.wiki/item?id=14326) | ST | +6 max HP; 4.19 healing / 4.18s. Direct hit: light companion for 5s. 25s shared lock · HP ≤50%. Direct hit: 15% adjacent block gain for 10s. 20s shared lock · HP ≤75%.  |
| [Ember of the Void](https://realm.wiki/item?id=14501) | ST | 5.15% adjacent weapon damage; 0.54s adjacent haste / 5.58s. Direct hit: dark companion for 5s. 25s shared lock · HP ≤75%. Direct hit: 15% adjacent weapon damage for 10s. 20s shared lock · HP ≤50%.  |
| [Emblem of the Empire](https://realm.wiki/item?id=37469) | UT | +26 max HP; +4 max mana.   |
| [Emerald Pickaxe](https://realm.wiki/item?id=42088) | UT | +15 max HP; 4.55% adjacent weapon damage.  Mining interactions are not simulated; the mining helper is not an attacking companion. |
| [Enchanted Ice Shard](https://realm.wiki/item?id=32722) | UT | 5.19% adjacent weapon damage; 0.72s adjacent haste / 5.58s; +8 max mana.  Strongest ring discount only, max 20%; you must afford the upfront cast.  |
| [Entropy Reactor](https://realm.wiki/item?id=1178) | ST | No unconditional stat bonus. Direct hit: 18 healing over 5s. 60s shared lock · HP ≤30%. Direct hit: Paralyzed. 5% charge per eligible event; 15s shared lock · incoming hit ≥1. Direct hit: +1 dodge. 5% charge per eligible event; 15s shared lock · incoming hit ≥1. Direct hit: 4 poison. 5% charge per eligible event; 15s shared lock. Direct hit: Armor Broken. 5% charge per eligible event; 15s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Esben's Wedding Ring](https://realm.wiki/item?id=46072) | UT | +11 max HP; +5 max mana; 11.04% adjacent weapon damage; -14.09% adjacent block gain. Weapon use: +8% adjacent weapon damage for 1s. 3s shared lock · while hasted.  |
| [Essence of Enlightened Love](https://realm.wiki/item?id=7333) | ST | 0.72s adjacent haste / 5.58s; 5.19% adjacent weapon damage; 4.22 healing / 4.18s.   |
| [Essence of Love](https://realm.wiki/item?id=7332) | ST | 0.72s adjacent haste / 5.58s; 5.19% adjacent weapon damage; 4.22 healing / 4.18s.   |
| [Exalted God's Horn](https://realm.wiki/item?id=28856) | UT | +22 max HP; 9.98% adjacent block gain. Weapon use: adjacent haste for 1.4s. 0.8s shared lock · HP ≥90%.  |
| [Experimental Ring](https://realm.wiki/item?id=3121) | UT | +8 max HP; +4 max mana; 3.69 healing / 4.18s; 8.81% adjacent block gain.   |
| [Expert Fishing Rod](https://realm.wiki/item?id=20810) | UT | No unconditional stat bonus.  Fishing interactions are not simulated; no combat bait or extra loot is invented. |
| [Eye of Divination](https://realm.wiki/item?id=22525) | ST | +11 max HP; +5 max mana.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Eye of the Void](https://realm.wiki/item?id=17390) | ST | +15 max HP; 18.79% adjacent block gain.   |
| [Faded Heart Scarab](https://realm.wiki/item?id=14457) | UT | +11 max HP; 2.54s adjacent haste / 5.58s; -13.64% adjacent weapon damage.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Fairy Ring](https://realm.wiki/item?id=2109) | UT | +7 max HP; 2.41% shorter adjacent cooldowns; 0.67s adjacent haste / 5.58s; 3.14 healing / 4.18s. Weapon use: fairy companion for 8s. 3% charge per eligible event; 10s shared lock · HP ≤80%.  |
| [Fang Necklace](https://realm.wiki/item?id=8787) | ST | 0.72s adjacent haste / 5.58s; 5.19% adjacent weapon damage; 4.22 healing / 4.18s.   |
| [Fast Ring](https://realm.wiki/item?id=52937) | UT | 13.56% adjacent block gain; 4.38% shorter adjacent cooldowns; 1.21s adjacent haste / 5.58s; 8.75% adjacent ability output.   |
| [Firelight Necklace](https://realm.wiki/item?id=14382) | ST | +8 max HP; +3 max mana; 7.79% adjacent weapon damage.   |
| [First Mate's Hook](https://realm.wiki/item?id=8668) | ST | 18.18% adjacent weapon damage; 5.04% longer adjacent weapon cooldowns; +15 max HP.   |
| [Flames of Genesis](https://realm.wiki/item?id=17140) | ST | +13 max HP; 6.7 healing / 4.18s. Weapon use: 10 piercing damage, slow. 3s shared lock · top row.  |
| [Foreman's Hard Hat](https://realm.wiki/item?id=12078) | ST | +6 max HP; 7.73% adjacent weapon damage. Weapon use: 6 mana. 30s shared lock · mana ≤50%. Direct hit: 15% adjacent block gain for 5s. 10s shared lock.  |
| [Fractured Hannya](https://realm.wiki/item?id=14458) | UT | +11 max HP; 18.33% adjacent weapon damage; 7.56% longer adjacent weapon cooldowns.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Frimarra](https://realm.wiki/item?id=32724) | UT | 5.19% adjacent weapon damage; 8.05% adjacent block gain; +16 max HP.   |
| [Frozen Heart](https://realm.wiki/item?id=26567) | ST | 4.55% longer adjacent cooldowns; +3 max HP; +1 max mana. Ability use: 15% adjacent block gain for 9s. 0.8s shared lock · requires Heartsteel Claymore. Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Geb's Lost Hedjet](https://realm.wiki/item?id=1383) | UT | +9 max HP; +4 max mana; 3.77 healing / 4.18s; 8.98% adjacent block gain. Direct hit: 5 damage. 1s shared lock · incoming hit ≥1.  |
| [Geb's Ring of Wisdom](https://realm.wiki/item?id=9053) | ST | +4 max HP; +2 max mana; 3.69 healing / 4.18s; 11.36% adjacent ability output.   |
| [Gem of Adoration](https://realm.wiki/item?id=4054) | UT | +23 max HP; 5.91 healing / 4.18s.   |
| [Gem of Tenderness](https://realm.wiki/item?id=4053) | UT | 9.09% adjacent ability output; +11 max mana.   |
| [Gjallarhorn](https://realm.wiki/item?id=22482) | ST | +13 max HP; 5.15% adjacent weapon damage. Weapon use: 20% damage reduction for 5s. 15s shared lock · HP ≤50%. Ability use: adjacent haste for 3s. 7s shared lock · requires Dalvar's Battle Axe.  |
| [Gold Medal](https://realm.wiki/item?id=3134) | UT | 0.54s adjacent haste / 5.58s; 2.53 healing / 4.18s; 1.95% shorter adjacent cooldowns.   |
| [Gothic Bouffant](https://realm.wiki/item?id=32441) | ST | +8 max HP; 2.22 healing / 4.18s; 4.55% adjacent weapon damage; 0.63s adjacent haste / 5.58s.   |
| [Grim Goblet](https://realm.wiki/item?id=32487) | ST | +10 max HP; 5.52% adjacent weapon damage; 3.59 healing / 4.18s. Ability use: 9.09% adjacent weapon damage for 4s. 35% charge per eligible event; 8s shared lock.  |
| [Headless Ted](https://realm.wiki/item?id=32445) | ST | +12 max HP; 0.92s adjacent haste / 5.58s; 2.21% shorter adjacent cooldowns. Weapon use: 2 healing over 1s. 3s shared lock · while poisoned.  |
| [Heart of the Eternal Pyre](https://realm.wiki/item?id=7365) | UT | 2.9% adjacent weapon damage; 4.49% adjacent block gain; 1.88 healing / 4.18s; +7 max HP. Direct hit: 18 healing over 8s. 600s shared lock · HP ≤30%. Direct hit: adjacent haste for 3s. 600s shared lock · HP ≤30%.  |
| [Heavenly Halo](https://realm.wiki/item?id=19964) | ST | +11 max HP; +4 max mana; 7.79% adjacent ability output.   |
| [Heavenly Magatama](https://realm.wiki/item?id=7760) | ST | +13 max HP; 4.22 healing / 4.18s; 12.08% adjacent block gain.   |
| [His Majesty's Eminence](https://realm.wiki/item?id=14294) | UT | 0.9s adjacent haste / 5.58s; 6.49% adjacent weapon damage; +16 max HP.   |
| [Hivemind Circlet](https://realm.wiki/item?id=3035) | ST | +11 max HP; 6.49% adjacent weapon damage; 2.36% less healing; 6.49% adjacent ability output.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Honey Circlet](https://realm.wiki/item?id=2298) | ST | +13 max HP; 2.6% shorter adjacent cooldowns; 5.19% adjacent weapon damage.   |
| [Horned Ring](https://realm.wiki/item?id=25748) | ST | +12 max HP; +3 max mana; 6.84% adjacent block gain. Weapon use: 7.27% adjacent weapon damage for 3s. 6s shared lock · healed within 3s.  |
| [Horrific Claws](https://realm.wiki/item?id=3007) | ST | +8 max HP; 3.03% adjacent weapon damage; +4 max mana; 2.53% shorter adjacent cooldowns; 4.04% adjacent ability output.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Ice Crown](https://realm.wiki/item?id=5852) | UT | 1.08s adjacent haste / 5.58s; 7.79% adjacent weapon damage; +18 max HP.   |
| [Imperial Keepsake](https://realm.wiki/item?id=20305) | ST | +10 max HP; 6.06% shorter adjacent cooldowns.   |
| [Infinite Bands](https://realm.wiki/item?id=48833) | ST | 6.04% adjacent block gain; 3.25% adjacent weapon damage; +2 max HP.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Intermediate Fishing Rod](https://realm.wiki/item?id=20722) | UT | No unconditional stat bonus.  Fishing interactions are not simulated; no combat bait or extra loot is invented. |
| [Interregnum](https://realm.wiki/item?id=2527) | ST | +10 max HP; 5.52% adjacent weapon damage; 3.59 healing / 4.18s. Ability use: 9.09% adjacent weapon damage for 4s. 35% charge per eligible event; 8s shared lock.  |
| [Iron Pickaxe](https://realm.wiki/item?id=42087) | UT | +8 max HP; 3.03% adjacent weapon damage.  Mining interactions are not simulated; the mining helper is not an attacking companion. |
| [Jade Beetle](https://realm.wiki/item?id=7758) | UT | +10 max HP; +5 max mana; 5.68% shorter adjacent cooldowns; 0.79s adjacent haste / 5.58s.   |
| [Jewel of Vengeance](https://realm.wiki/item?id=22509) | ST | +13 max HP; 1.25s adjacent haste / 5.58s. Direct hit: 9 piercing damage. 1s shared lock · incoming hit ≥1. Direct hit: 12 piercing damage. 1s shared lock · incoming hit ≥1, requires Blade of Fates. Direct hit: 12 piercing damage. 1s shared lock · incoming hit ≥1, while armored, without Blade of Fates. Direct hit: 12 piercing damage. 1s shared lock · incoming hit ≥1, while armored, requires Blade of Fates.  |
| [Kagenohikari](https://realm.wiki/item?id=20795) | UT | +12 max HP; +6 max mana; 3.14 healing / 4.18s; 4.83% adjacent ability output. Ability use: friendly companion for 6s. 4s shared lock. Strongest ring discount only, max 20%; you must afford the upfront cast.  |
| [Laborer's Hard Hat](https://realm.wiki/item?id=12076) | ST | +6 max HP; 2.58% adjacent weapon damage. Weapon use: 3 mana. 30s shared lock · mana ≤50%. Direct hit: 9.09% adjacent block gain for 5s. 10s shared lock.  |
| [Legacy Forgotten Ring](https://realm.wiki/item?id=8618) | ST | +3 max HP; +1 max mana; 3.41% adjacent weapon damage; 3.52% adjacent block gain.   |
| [Legacy Ring of Pure Wishes](https://realm.wiki/item?id=9061) | ST | +1 max HP; +1 max mana; 8.81% adjacent block gain; 1.14% adjacent weapon damage.   |
| [Legacy Spectral Ring of Horrors](https://realm.wiki/item?id=8611) | ST | +4 max HP; 4.55% adjacent ability output; 2.95 healing / 4.18s; 0.63s adjacent haste / 5.58s; 1.82% longer adjacent cooldowns.   |
| [Legacy's Pendant](https://realm.wiki/item?id=26576) | ST | 7.09% less healing; +10 max HP; 0.11s adjacent haste / 5.58s. Direct hit: adjacent haste for 3s. 3s shared lock · incoming hit ≥8, requires Iceborn Arsenal. Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Legendary Fishing Rod](https://realm.wiki/item?id=20726) | UT | No unconditional stat bonus.  Fishing interactions are not simulated; no combat bait or extra loot is invented. |
| [Loaded Core](https://realm.wiki/item?id=1176) | ST | No unconditional stat bonus.  Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Locked Reactor](https://realm.wiki/item?id=1159) | UT | No unconditional stat bonus. Direct hit: 18 healing over 5s. 60s shared lock · HP ≤30%.  |
| [Lucky Grenade](https://realm.wiki/item?id=50820) | ST | 0.89s adjacent haste / 5.58s; +12 max HP. Ability use: 12 piercing damage. 1s shared lock · requires Unstable Firework.  |
| [Magical Lodestone](https://realm.wiki/item?id=598) | UT | +4 max HP; 9.39% adjacent block gain; 0.84s adjacent haste / 5.58s; 6.06% adjacent weapon damage; 3.03% shorter adjacent cooldowns.   |
| [Magical Winter Scarf](https://realm.wiki/item?id=42503) | ST | +9 max HP; 18.79% adjacent block gain.   |
| [Mala Beads](https://realm.wiki/item?id=52042) | ST | +13 max HP; 4.22 healing / 4.18s; 12.08% adjacent block gain.   |
| [Mask of Anubis](https://realm.wiki/item?id=4058) | UT | +26 max HP; +4 max mana.   |
| [Mask of Cnidaria](https://realm.wiki/item?id=4060) | UT | +8 max HP; +12 max mana.   |
| [Mask of Lightning](https://realm.wiki/item?id=4059) | UT | +8 max HP; +12 max mana.   |
| [Mask of Mucus](https://realm.wiki/item?id=4061) | UT | +26 max HP; +4 max mana.   |
| [Master Fishing Rod](https://realm.wiki/item?id=20723) | UT | No unconditional stat bonus.  Fishing interactions are not simulated; no combat bait or extra loot is invented. |
| [Mayhem Medallion](https://realm.wiki/item?id=32416) | ST | +10 max HP; 1.08s adjacent haste / 5.58s; 3.9% shorter adjacent cooldowns.   |
| [Moonstone Ring](https://realm.wiki/item?id=14776) | ST | 18.18% adjacent weapon damage; 4.04% longer adjacent weapon cooldowns; +15 max HP.   |
| [Neo Alien Core Corrosion](https://realm.wiki/item?id=56469) | ST | No unconditional stat bonus. Direct hit: 5 poison + 8 impact damage. 10% charge per eligible event; 10s shared lock. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Neo Alien Core Dark Matter](https://realm.wiki/item?id=56470) | ST | No unconditional stat bonus. Direct hit: Armor Broken/Exposed. 10% charge per eligible event; 10s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Neo Alien Core Power](https://realm.wiki/item?id=56467) | ST | No unconditional stat bonus. Direct hit: Paralyzed/Curse. 10% charge per eligible event; 10s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Neo Alien Core Warp](https://realm.wiki/item?id=56468) | ST | No unconditional stat bonus. Direct hit: +1 dodge. 10% charge per eligible event; 10s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Neo Entropy Reactor](https://realm.wiki/item?id=56462) | ST | No unconditional stat bonus. Direct hit: 21 healing over 5s. 60s shared lock · HP ≤30%. Direct hit: Paralyzed/Curse. 5% charge per eligible event; 15s shared lock · incoming hit ≥1. Direct hit: +1 dodge. 5% charge per eligible event; 15s shared lock · incoming hit ≥1. Direct hit: 5 poison + 8 impact damage. 5% charge per eligible event; 15s shared lock. Direct hit: Armor Broken/Exposed. 5% charge per eligible event; 15s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Neo Loaded Core](https://realm.wiki/item?id=56461) | ST | No unconditional stat bonus.  Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Neo Reality Reactor](https://realm.wiki/item?id=56463) | ST | No unconditional stat bonus. Direct hit: 24 healing over 5s. 60s shared lock · HP ≤30%. Direct hit: 3 mana. 60s shared lock · HP ≤30%. Direct hit: Paralyzed/Curse. 5% charge per eligible event; 10s shared lock · incoming hit ≥1. Direct hit: +1 dodge. 5% charge per eligible event; 10s shared lock · incoming hit ≥1. Direct hit: 5 poison + 8 impact damage. 5% charge per eligible event; 10s shared lock. Direct hit: Armor Broken/Exposed. 5% charge per eligible event; 10s shared lock · incoming hit ≥1. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Nightmatter Circlet](https://realm.wiki/item?id=14895) | ST | +10 max HP; +5 max mana; 0.43s adjacent haste / 5.58s; 3.09% adjacent weapon damage; 3.09% adjacent ability output; 2.01 healing / 4.18s. Ability use: 4 mana over 10s. 50% charge per eligible event; 20s shared lock. Ability use: 2 poison. 15s shared lock. Direct hit: 24 healing over 5s. 280s shared lock · HP ≤50%.  |
| [Omamori](https://realm.wiki/item?id=26732) | ST | +8 max HP; +4 max mana; 0.9s adjacent haste / 5.58s.   |
| [Omamori](https://realm.wiki/item?id=26761) | ST | +8 max HP; +4 max mana; 0.9s adjacent haste / 5.58s.   |
| [Omni-Impotence Ring](https://realm.wiki/item?id=23359) | ST | -18 max HP; -8 max mana; -7.27% adjacent weapon damage; -11.27% adjacent block gain; 3.64% longer adjacent cooldowns; 4.04% longer adjacent weapon cooldowns; 4.73% less healing; -7.27% adjacent ability output.   |
| [Omnipotence Ring](https://realm.wiki/item?id=593) | UT | +8 max HP; +4 max mana; 5.87% adjacent block gain; 1.89% shorter adjacent cooldowns; 3.03% adjacent weapon damage; 0.42s adjacent haste / 5.58s; 2.95 healing / 4.18s; 4.55% adjacent ability output.   |
| [Operator's Hard Hat](https://realm.wiki/item?id=12077) | ST | +6 max HP; 5.15% adjacent weapon damage. Weapon use: 5 mana. 30s shared lock · mana ≤50%. Direct hit: 15% adjacent block gain for 5s. 10s shared lock.  |
| [Ornaments of Unity](https://realm.wiki/item?id=25791) | ST | No unconditional stat bonus. Direct hit: unity companion for 4s. 10% charge per eligible event; 10s shared lock. Catalyst bonuses count distinct matching packed non-ring Alien items (maximum three), or matching Oryxmas ornaments; no self-scaling. |
| [Oryx Dominus Crest](https://realm.wiki/item?id=7393) | UT | +12 max HP; 2.21% shorter adjacent cooldowns; 0.61s adjacent haste / 5.58s. Ability use: banner companion for 4s. 10s shared lock.  |
| [Oryxmas Ornament Energized](https://realm.wiki/item?id=25788) | UT | +6 max mana; 2.21% shorter adjacent cooldowns; 0.61s adjacent haste / 5.58s. Direct hit: energized companion for 4s. 10% charge per eligible event; 10s shared lock.  |
| [Oryxmas Ornament Exposed](https://realm.wiki/item?id=25790) | UT | +12 max HP; 2.21% shorter adjacent cooldowns; 0.61s adjacent haste / 5.58s. Direct hit: exposed companion for 4s. 10% charge per eligible event; 10s shared lock.  |
| [Oryxmas Ornament Weak](https://realm.wiki/item?id=25789) | UT | +3 max mana; +6 max HP; 5.99% adjacent block gain; 2.51 healing / 4.18s. Direct hit: weak companion for 4s. 10% charge per eligible event; 10s shared lock.  |
| [Overclocking Amulet](https://realm.wiki/item?id=17499) | UT | 1.68s adjacent haste / 5.58s; 12.12% adjacent weapon damage; -22.55% adjacent block gain.   |
| [Painted Egg Amulet](https://realm.wiki/item?id=41603) | ST | 10.06% adjacent block gain; 4.22 healing / 4.18s; +8 max HP.   |
| [Performer's Hat](https://realm.wiki/item?id=19361) | ST | +11 max HP; 4.42% adjacent ability output; 0.61s adjacent haste / 5.58s. Direct hit: +1 dodge. 20% charge per eligible event; 15s shared lock · incoming hit ≥1. Direct hit: dove companion for 5s. 20% charge per eligible event; 15s shared lock · incoming hit ≥1.  |
| [Pernicious Peridot](https://realm.wiki/item?id=19259) | ST | +34 max HP; 4.55% longer adjacent cooldowns.   |
| [Phantom Pendant](https://realm.wiki/item?id=25762) | ST | +8 max HP; +1 max mana; 8.81% adjacent block gain; 2.84% shorter adjacent cooldowns.   |
| [Plague Mask](https://realm.wiki/item?id=26736) | ST | +10 max HP; 1.08s adjacent haste / 5.58s; 7.79% adjacent ability output.   |
| [Plague Mask](https://realm.wiki/item?id=26763) | ST | +16 max HP; 1.26s adjacent haste / 5.58s; 2.53 healing / 4.18s.   |
| [Pointy Tail](https://realm.wiki/item?id=52035) | ST | +11 max HP; +4 max mana; 7.79% adjacent ability output.   |
| [Pontifex Ring](https://realm.wiki/item?id=14787) | ST | +13 max HP; 12.08% adjacent block gain; 5.19% adjacent ability output; 5.91% less healing.   |
| [Pressure Gauge Band](https://realm.wiki/item?id=29899) | ST | +16 max HP; 12.99% adjacent ability output; 10.06% adjacent block gain.   |
| [Protective Gloves](https://realm.wiki/item?id=8791) | ST | 6.82% adjacent weapon damage; 7.05% adjacent block gain; 2.27% shorter adjacent cooldowns; +8 max HP.   |
| [Radiant Heart](https://realm.wiki/item?id=19264) | ST | +19 max HP; 7.58% adjacent weapon damage.   |
| [Regal Ring](https://realm.wiki/item?id=1403) | ST | 0.25s adjacent haste / 5.58s.   |
| [Revenant Ring](https://realm.wiki/item?id=7751) | ST | 4.42% adjacent weapon damage; 2.76% shorter adjacent cooldowns; +8 max HP. Weapon use: 9.09% adjacent cooldown reduction for 1s. 0.8s shared lock · while hasted.  |
| [Ring of Cubed Wisdom](https://realm.wiki/item?id=44831) | UT | 3.06% adjacent ability output; +7 max HP; +4 max mana; 7.12% adjacent block gain; 2.3% shorter adjacent cooldowns; 4.6% adjacent weapon damage; 0.64s adjacent haste / 5.58s; 2.99 healing / 4.18s.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Ring of Decades](https://realm.wiki/item?id=2990) | UT | +36 max HP.   |
| [Ring of Divine Faith](https://realm.wiki/item?id=3104) | UT | +8 max HP; +4 max mana; 4.43 healing / 4.18s; 6.82% adjacent ability output.   |
| [Ring of Pagan Favor](https://realm.wiki/item?id=8207) | ST | +13 max HP; 12.08% adjacent block gain; 5.19% adjacent ability output; 5.91% less healing.   |
| [Ring of Pure Wishes](https://realm.wiki/item?id=1192) | ST | +12 max HP; +3 max mana; 6.84% adjacent block gain. Weapon use: 7.27% adjacent weapon damage for 3s. 6s shared lock · healed within 3s.  |
| [Ring Of Radiant Petals](https://realm.wiki/item?id=57129) | UT | +26 max HP; +4 max mana.   |
| [Ring of Skeletal Specters](https://realm.wiki/item?id=27627) | UT | +11 max HP; 3.31% adjacent weapon damage; 7.73% adjacent ability output. Direct hit: hands companion for 3s. 8s shared lock · incoming hit ≥4.  |
| [Ring of the Burning Sun](https://realm.wiki/item?id=8960) | UT | +6 max HP; +3 max mana; 20.13% adjacent block gain.   |
| [Ring of the Covetous Heart](https://realm.wiki/item?id=9057) | ST | +6 max mana; 10.39% adjacent weapon damage; 10.39% adjacent ability output.   |
| [Ring of the Inferno](https://realm.wiki/item?id=19270) | ST | +3 max HP; +4 max mana; 6.26% adjacent block gain; 2.02% shorter adjacent cooldowns; 6.06% adjacent weapon damage.   |
| [Ring of the Magus](https://realm.wiki/item?id=17636) | ST | +10 max HP; +9 max mana; 7.79% adjacent ability output.   |
| [Ring of the Nile](https://realm.wiki/item?id=2977) | UT | 4.55% adjacent ability output; 0.63s adjacent haste / 5.58s; +11 max HP; +5 max mana.   |
| [Ring of the Northern Light](https://realm.wiki/item?id=32723) | UT | 4.55% adjacent ability output; 0.63s adjacent haste / 5.58s; +11 max HP; +5 max mana.   |
| [Ring of the Pyramid](https://realm.wiki/item?id=2978) | UT | 5.19% adjacent weapon damage; 8.05% adjacent block gain; +16 max HP.   |
| [Ring of the Sniper](https://realm.wiki/item?id=17601) | ST | +11 max HP; 12.12% adjacent weapon damage.   |
| [Ring of the Sphinx](https://realm.wiki/item?id=2976) | UT | 5.19% adjacent weapon damage; 0.72s adjacent haste / 5.58s; +8 max mana.  Strongest ring discount only, max 20%; you must afford the upfront cast.  |
| [Ring of the Stalwart](https://realm.wiki/item?id=17635) | ST | +23 max HP; 14.09% adjacent block gain.   |
| [Ring of the Swiftblade](https://realm.wiki/item?id=17602) | ST | +13 max HP; 1.08s adjacent haste / 5.58s; 3.9% shorter adjacent cooldowns.   |
| [Ring of Unbound Love](https://realm.wiki/item?id=25605) | ST | +26 max HP; +4 max mana.   |
| [Ring of Wrath](https://realm.wiki/item?id=32417) | ST | +13 max HP; 12.08% adjacent block gain; 4.22 healing / 4.18s.   |
| [Robotic Ring of the Crucible](https://realm.wiki/item?id=788) | UT | +16 max HP; 1.62s adjacent haste / 5.58s; 3.9% adjacent ability output.   |
| [Rose Brooch](https://realm.wiki/item?id=7357) | ST | +9 max HP; +4 max mana; 3.77 healing / 4.18s; 8.98% adjacent block gain. Direct hit: 5 damage. 1s shared lock · incoming hit ≥1.  |
| [Rusted Mechanism](https://realm.wiki/item?id=1781) | UT | 1.68s adjacent haste / 5.58s; 12.12% adjacent weapon damage; -22.55% adjacent block gain.   |
| [Rusty Cuffs](https://realm.wiki/item?id=603) | ST | +11 max HP; 10.06% adjacent block gain; 3.25% shorter adjacent cooldowns.   |
| [Ruthven's Rosary](https://realm.wiki/item?id=17886) | ST | +13 max HP; 6.49% adjacent ability output; 4.22 healing / 4.18s.   |
| [Shattered Ring of the Crucible](https://realm.wiki/item?id=787) | UT | +16 max HP; +7 max mana; 10.39% adjacent ability output.   |
| [Silver Medal](https://realm.wiki/item?id=3135) | UT | 0.36s adjacent haste / 5.58s; 1.69 healing / 4.18s; 1.3% shorter adjacent cooldowns.   |
| [Snake Eye Ring](https://realm.wiki/item?id=2625) | UT | +6 max HP; 4.83% adjacent weapon damage; 7.49% adjacent block gain; 2.41% shorter adjacent cooldowns. Ability use: adjacent haste for 2s. 5s shared lock.  |
| [Snake Eye Ring](https://realm.wiki/item?id=53182) | UT | 4.55% adjacent weapon damage; 2.27% shorter adjacent cooldowns.   |
| [Soul Gem Amulet](https://realm.wiki/item?id=8792) | ST | 0.72s adjacent haste / 5.58s; 5.19% adjacent weapon damage; 4.22 healing / 4.18s.   |
| [Soul Necklace](https://realm.wiki/item?id=5361) | ST | +13 max HP; 6.49% adjacent ability output; 10.06% adjacent block gain.   |
| [Soulful Affection](https://realm.wiki/item?id=4055) | UT | 5.06 healing / 4.18s; 7.79% adjacent ability output; +23 max HP.   |
| [Sourcestone](https://realm.wiki/item?id=591) | UT | +15 max HP; +7 max mana; 3.31% shorter adjacent cooldowns. Ability use: 7 healing. 8s shared lock. Direct hit: 2 mana. 8s shared lock.  |
| [Spectral Ring of Horrors](https://realm.wiki/item?id=10067) | ST | +7 max HP; +3 max mana; 9.09% adjacent ability output; 0.47s adjacent haste / 5.58s.   |
| [Spider's Eye Ring](https://realm.wiki/item?id=1800) | UT | 4.19 healing / 4.18s; 9.98% adjacent block gain. Direct hit: Slowed. 10s shared lock · incoming hit ≥1.  |
| [Spider's Eye Ring](https://realm.wiki/item?id=53183) | UT | 2.95 healing / 4.18s; 4.55% adjacent ability output.   |
| [Spike Headband](https://realm.wiki/item?id=42305) | ST | +13 max HP; 0.89s adjacent haste / 5.58s. Weapon use: 12 healing. 20s shared lock.  |
| [Steadfast Glyph](https://realm.wiki/item?id=14221) | ST | +13 max HP; +3 max mana; 8.05% adjacent block gain.   |
| [Stone Pickaxe](https://realm.wiki/item?id=42085) | UT | +4 max HP; 1.52% adjacent weapon damage.  Mining interactions are not simulated; the mining helper is not an attacking companion. |
| [Storied Fossil](https://realm.wiki/item?id=63887) | ST | +16 max HP; 12.99% adjacent ability output; 10.06% adjacent block gain.   |
| [Strange Ring](https://realm.wiki/item?id=43384) | ST | +11 max HP; +5 max mana.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Sun Bathed Straw Hat](https://realm.wiki/item?id=41671) | ST | +15 max HP; 18.79% adjacent block gain.   |
| [Sun Hat](https://realm.wiki/item?id=28467) | UT | +26 max HP; +4 max mana.   |
| [Sunken Fire Opal Ring](https://realm.wiki/item?id=14456) | UT | +10 max HP; 10.06% adjacent block gain; 3.25% shorter adjacent cooldowns.   |
| [Sunken Ring](https://realm.wiki/item?id=1387) | UT | +4 max HP; 4.7% adjacent block gain.   |
| [Superior Mask of Anubis](https://realm.wiki/item?id=55420) | ST | +28 max HP; +4 max mana.   |
| [Superior Mask of Cnidaria](https://realm.wiki/item?id=55422) | ST | +9 max HP; +12 max mana.   |
| [Superior Mask of Lightning](https://realm.wiki/item?id=55421) | ST | +9 max HP; +12 max mana.   |
| [Superior Mask of Mucus](https://realm.wiki/item?id=55423) | ST | +28 max HP; +4 max mana.   |
| [Sweetener Ring](https://realm.wiki/item?id=34338) | UT | +26 max HP; +4 max mana.   |
| [Sweettreats Ring](https://realm.wiki/item?id=63790) | ST | +11 max HP; 4.04% adjacent weapon damage; 0.56s adjacent haste / 5.58s; 1.31 healing / 4.18s; 2.02% adjacent ability output.   |
| [Targeting Monocular](https://realm.wiki/item?id=50816) | ST | +9 max HP; 18.79% adjacent block gain.   |
| [The Forgotten Crown](https://realm.wiki/item?id=2987) | UT | 1.08s adjacent haste / 5.58s; 7.79% adjacent weapon damage; +18 max HP.   |
| [The Forgotten Crown](https://realm.wiki/item?id=53196) | UT | 1.08s adjacent haste / 5.58s; 7.79% adjacent weapon damage; +18 max HP.   |
| [The Forgotten Ring](https://realm.wiki/item?id=9669) | UT | +36 max HP.   |
| [The Golden Forgotten Crown](https://realm.wiki/item?id=1021) | UT | 1.08s adjacent haste / 5.58s; 7.79% adjacent weapon damage; +18 max HP.   |
| [The Hemomancer's Ring](https://realm.wiki/item?id=42301) | UT | +19 max HP; +2 max mana; 2.95 healing / 4.18s; 3.41% adjacent ability output.   |
| [The Twilight Gemstone](https://realm.wiki/item?id=2988) | UT | 5.68% adjacent ability output; 2.84% shorter adjacent cooldowns; 14.09% adjacent block gain; +7 max mana.  Strongest ring discount only, max 20%; you must afford the upfront cast.  |
| [The Twilight Gemstone](https://realm.wiki/item?id=53197) | UT | 3.9% shorter adjacent cooldowns; 12.08% adjacent block gain; +8 max mana.   |
| [Thistleleaf Necklace](https://realm.wiki/item?id=26036) | UT | +14 max HP; 9.98% adjacent block gain. Weapon use: 8 piercing damage, bounded bleed. 1.6s shared lock · incoming hit ≥1, top row. Direct hit: 2 piercing damage. 1s shared lock · incoming hit ≥1.  |
| [Tiara of Eggscellent Sturdiness](https://realm.wiki/item?id=5037) | ST | +5 max HP; +3 max mana; 17.11% adjacent block gain. Direct hit: bunny companion for 6s. 10% charge per eligible event; 45s shared lock.  |
| [Tiki Pendant](https://realm.wiki/item?id=47107) | ST | +6 max HP; 6.49% adjacent weapon damage; 4.22 healing / 4.18s.   |
| [Token of Happiness](https://realm.wiki/item?id=20764) | UT | +14 max HP; +6 max mana; 11.04% adjacent ability output. Weapon use: 1 mana over 1s. 3s shared lock. Weapon use: Slowed for 0.6s. 1s shared lock.  |
| [Token of Warmth](https://realm.wiki/item?id=20765) | UT | +14 max HP; +6 max mana; 7.18 healing / 4.18s. Weapon use: 2 healing over 1s. 3s shared lock. Weapon use: Slowed for 0.6s. 1s shared lock.  |
| [Traveler's Trinket](https://realm.wiki/item?id=21224) | ST | +11 max HP; 3.9% shorter adjacent cooldowns; 3.9% adjacent weapon damage.   |
| [Unresolved Grudge](https://realm.wiki/item?id=14782) | ST | +8 max HP; 16.1% adjacent block gain; 3.25% shorter adjacent cooldowns.   |
| [Venerable Ring of the Nile](https://realm.wiki/item?id=38592) | ST | 5.68% adjacent ability output; 0.79s adjacent haste / 5.58s; +13 max HP; +6 max mana.   |
| [Venerable Ring of the Pyramid](https://realm.wiki/item?id=38593) | ST | 6.49% adjacent weapon damage; 10.06% adjacent block gain; +18 max HP.   |
| [Venerable Ring of the Sphinx](https://realm.wiki/item?id=38591) | ST | 6.49% adjacent weapon damage; 0.9s adjacent haste / 5.58s; +8 max mana.  Strongest ring discount only, max 20%; you must afford the upfront cast.  |
| [Vial of Sustenance](https://realm.wiki/item?id=14792) | ST | +5 max mana; 3.25% shorter adjacent cooldowns; 1.26s adjacent haste / 5.58s.   |
| [Void Mask](https://realm.wiki/item?id=54800) | ST | +16 max HP; 1.26s adjacent haste / 5.58s; 2.53 healing / 4.18s.   |
| [Willow Sprout](https://realm.wiki/item?id=48829) | ST | 5.06 healing / 4.18s; 3.9% shorter adjacent cooldowns; +21 max HP.  Relative stats use bounded references from permanent HP/base mana and tiered rings; UT/ST rings cannot recursively amplify one another. |
| [Winter Boots](https://realm.wiki/item?id=42319) | ST | +13 max HP; 5.15% adjacent weapon damage. Weapon use: 20% damage reduction for 5s. 15s shared lock · HP ≤50%. Ability use: adjacent haste for 3s. 7s shared lock · requires Blood Axe.  |
| [Witch's Brooch](https://realm.wiki/item?id=25754) | ST | +6 max mana; 10.39% adjacent weapon damage; 10.39% adjacent ability output.   |
| [Yokai Amulet](https://realm.wiki/item?id=7200) | UT | +12 max HP; +6 max mana; 5.52% adjacent weapon damage. Ability use: guardian companion for 8s. 4s shared lock · full 100-charge kill meter.  |
