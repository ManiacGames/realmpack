# RealmPack changelog

## 0.54.3 — 2026-10-27

- Opening Full details with F or its button no longer pins the floating item card. Existing pinned cards remain pinned.
- Checked both pin states, returning from details, the 250 ms hover close delay and inventory controls.

## 0.54.2 — 2026-10-27

- Reduced the item-card close delay to 250 ms while retaining the hover bridge and focus protection.
- Restored the run map’s worn parchment background and plain paper heading, fixing general theme overrides that made its colours clash and labels hard to read.
- Checked pointer travel and delayed closing, map styling, responsive map layouts and route selection.

## 0.54.1 — 2026-10-27

- Added a saved 0–100% sound-volume slider in Menu; 0% mutes sound.
- Item cards are easier to enter: an 800 ms close delay, a hover bridge and an interactive card surface keep Full details reachable. Keyboard focus also keeps the card open.
- Added D to discard the selected item with confirmation, F for hovered/focused item details, I for the item catalogue, E for the bestiary, and Esc to open Menu after closing/cancelling the current layer. New shortcuts ignore typing, modified keys and held repeats.
- Keyboard shortcuts are listed in Menu. Tested real pointer travel, confirmation/cancel, typing and combat guards, volume persistence/mute, responsive menus and hover performance.

## 0.54.0 — 2026-10-27

- Rebuilt the game presentation around a compact resource HUD, dungeon stage, cloth-lined backpack and wooden stash. Map, menu and Dev notes stay within reach.
- Desktop item inspection now floats without resizing the backpack. Hover/focus previews, click to pin, and Close/Escape dismiss; dragging clears the card. Mobile retains its Details view.
- Shops, rewards and events use coordinated counter and encounter styling. Added a base-strike/timing preview and optional UI sounds in the menu; sounds start off.
- Existing inventory, combat, item balance and saves are preserved.
- Checked desktop/mobile resource HUDs, pinned inspection and chest dragging, crowded debuff layouts, offers/dialogs, hover stability and identical combat outcomes at 1×/2×/4×.

## 0.53.0 — 2026-10-27

- Multi-function item explanations now use short effect lines instead of dense paragraphs. Repeated trigger sentences appear once; distinct conditions, values and drawbacks remain.
- Shortened repeated wording in item summaries and resolved equipment IDs to item names where available. Long explanations retain the original wording under Full rules.
- Item recipes, combat effects and saved upgrades are unchanged.
- Audited descriptions and numeric conditions across all 2,318 items, with responsive catalogue, dialog and offer checks.

## 0.52.1 — 2026-10-27

- Fixed passive rings displaying only “support” in item inspection. Ring summaries now show their actual bonus and who receives it.
- Inspection, shop and loot cards share the same summary rules. Special effects, secondary effects and conditions remain readable; full rules stay in Full details.
- Added a regression audit for all 2,318 catalogue entries and verified passive-ring descriptions on desktop and mobile.

## 0.52.0 — 2026-10-26

- Shortened default item inspection and removed repeated class-compatibility and stack reminders from loot cards. Full item rules remain in Full details.
- Event choices lead with costs and outcomes; longer descriptions are under Details. Route cards show the service instead of repeating flavor text. Health, permanent costs and blocked-choice reasons remain visible.
- Desktop class selection now uses the existing Overview/Passive tabs, matching mobile. Combat and item balance are unchanged.
- Checked responsive offers, all class previews, event details/transactions and dialog layouts.

## 0.51.1 — 2026-10-26

- Current and maximum health now stay visible under event and rest headings, including trades and results, while browsing choice pages. Applies to desktop and mobile.

## 0.51.0 — 2026-10-25

- Mobile: larger play controls, a three-column stash with a Show/Hide button, and readable wrapped combat stats. Portrait combat also shows the equipped backpack and its cooldowns.
- Tapping a map room on mobile shows its full encounter name. Gameplay tips use touch instructions; the stash folds while a tip is visible and can be reopened with Show. Desktop layouts and gameplay rules are unchanged.
- Checked five touch sizes, inventory transfers/layout, map previews, offer/dialog layouts and desktop screenshot parity.

## 0.50.1 — 2026-10-25

- Replaced crossing dashed map lines with curved, outlined connectors and direction arrows. Next routes are stronger; distant or closed routes recede.
- Hover, keyboard focus or tap a preview room to isolate its incoming/outgoing connections and neighboring rooms. Existing saved maps gain the clearer presentation without rerolling routes.
- Checked map layouts at eight sizes, mouse/keyboard/touch previews, responsive dialogs and unchanged saved-route behavior.

## 0.50.0 — 2026-10-25

- Replaced mostly linear dungeon maps with generated networks of two or three lanes across five decision points. Connections now determine which rooms can be reached next.
- Added route choices between distinct enemies, dangerous combat, elites, themed events, specialist shops and rest stops. Maps offer accessible shopping/recovery and converge at an Enchanter and boss.
- Reduced repeated enemies/events and shop specialties within a dungeon. Extra elite encounters can promote other dungeon enemies. New maps persist across save/load; already-generated saved dungeons retain their routes.
- Verified 150 unique seeded graphs, connected-path selection and save stability, 190 five-dungeon routes, regression suites and responsive map/path layouts.

## 0.49.0 — 2026-10-25

- New runs visit five distinct dungeons, eight rooms each. Three room layouts retain a shop, rest, elite, two events and a final boss in every dungeon.
- Added five-stage portal progression, preference for unowned class-compatible dungeon drops, and short loot previews. Dungeons do not repeat within a circuit.
- Spread the existing boss difficulty curve across depths 8/16/24/32/40; adjusted loot progression and boss blessings for the longer run. Updated maps, progress labels and endings.
- Existing saves retain ten-room dungeons and their original victory point. Endless play extends using the saved run format.
- Verified 190 generated routes, all 19 classes, 39 regression suites, equivalent-depth combat benchmarks and responsive maps/dialogs.

## 0.48.0 — 2026-10-25

- Added 17 novelty quirks to Mangoes, Butter/Baked/Brilliance Bows, Useless Katana, Mirror Cloak, Luxurious Leather, Regal/Omni-Impotence Rings and the Testiken family.
- Added situational venom cleansing, low-mana snacks, ward breaking, finishing damage and defensive oddities. Successful activations trigger small, bounded bonuses; base item stats and availability are unchanged.
- Updated item summaries and inspection rules. Verified novelty combat at 1×/2×/4× and existing regression suites.

## 0.47.0 — 2026-10-25

- Shortened the guide, gameplay tips, reward prompts, event actions and inventory instructions. Removed repeated header copy.
- Put Runeforge reference rules behind an expandable section; kept the selected sacrifice and exact upgrade preview visible. Shortened merchant and supply rules.
- Corrected stale tips: base mana regeneration is 0.5/s, and used potion copies do not return next battle.

## 0.46.0 — 2026-10-25

- Added sourced UT/ST loot preferences across all 35 dungeons. Matching items gain 10× weight in combat rewards, retaining class preference.
- Normal fights have a 35% chance to feature one local UT/ST choice, elites 60%, bosses 90%. Other reward choices retain global variety; unavailable items stay excluded and Shiny upgrade rates are unchanged.
- Mapped 358 obtainable items using listed enemy drop sources. Unknown sources remain global; Ice Cave uses the modern Ice Citadel pool. Verified 3,500 boss reward sets across all dungeons.

## 0.45.0 — 2026-10-25

- Mana now resets for each battle: 10 base, plus 1 per 5 capacity above 50 (up to 10 extra). Magic rings keep their separate opening bonus. Waves within a battle share the same pool.
- Reduced universal regeneration from 1 to 0.5 mana per second. Robes and other item-based mana generation retain their values.
- Magic Potions now wait for ready equipment that cannot afford its mana cost, with at least 6/12 mana missing. Updated potion descriptions, opening-mana previews and mana-event rewards.
- Verified the mana rules and regression suites; compared all 19 classes, enchantments and starter mana demand. Seeded class/enchantment results match across 1×, 2× and 4× playback.

## 0.44.0 — 2026-10-25

- Reworked 23 non-combat encounters into distinct weapon, ability, armor, food, research and risk/reward services. Added revealed native gear choices that improve with the act and coin alternatives for several loot encounters.
- Fixed whole-stack sacrifices, useless paid healing/mana rewards, inactive-ring tempering and potion-based rare-equipment payouts. Added exact cost/benefit previews and a starter supply purchase when no consumables are owned.
- Added dungeon-weighted, usefulness-aware selection across all 35 dungeons. Cursed-armory bargains now track recoverable maximum health; the restless spirit can lift the curse. Goblin passage and its nonlethal detour have disclosed costs.
- Improved event layouts and kept exits reachable. Reward changes preserve their page; new choices and offers survive save/load without rerolling. Existing active visits and paid enchantment rolls remain compatible.
- Validation: 35 regression suites, 936 event/state checks, 560 responsive dialog views and 48 interactive event views. All 1,995 fixed combat results match 0.43.0; full-run event economy remains a playtesting focus.

## 0.43.0 — 2026-10-25

- Reworked Mystic, Ninja, Assassin, Huntress and Trickster around orb/staff, katana/star, poison/dagger, trap/bow and prism/decoy combinations.
- Connected Paladin, Sorcerer and Summoner to seals, scepters and maces; refined Rogue ambushes, Necromancer skulls, Kensei sheaths and Druid spirit nurturing.
- Added live class readiness feedback, shared recharge limits, bounded charges and source-owned companions. Preserved all item definitions, seven existing class identities, class health and encounter tuning.
- Validation: 34 regression suites; paired class, native-ability, adjacency and enchantment simulations; identical results at three playback speeds; responsive class/inspection and combat presentation checks. Native test clears rose from 94 to 95 of 152; the historical mixed-build fixture fell from 1,611 to 1,578 of 1,995 as unrelated gear no longer drives several passives. Class strength differences remain.

## 0.42.1 — 2026-10-25

- Fixed expanding adjacency bonuses in victory spoils breaking item cards into fragments and excessive pages.
- Loot and shop inspections now keep their content intact, with Back and Take/Buy actions always visible. Longer expanded details stay inside the inspection panel.
- Validation: repeated bonus expansion/collapse, return and take/buy interactions across desktop, phone and short landscape layouts in both text sizes; regression suites and dialog audit.

## 0.42.0 — 2026-10-25

- Added twelve thematic adjacency links for summons, poison/traps, mixed afflictions, magic, stealth, holy armor, battle hymns, companion healing, katana techniques, sigils and Hex-based hunting.
- Reworked guard into an opening grant plus a fractional recharge budget; reduced flat mana/affliction bonuses to bounded percentages. Small primary bonuses now accumulate instead of rounding away.
- Fixed temporary DEX affecting abilities and Wisdom affecting armor. Summon support applies to owned companion damage, including bursts/counters, within a shared 35% cap.
- Added live applied/capped summaries and compact hover hints. Retired obsolete generic-ring links; inactive passive rings no longer show unused Speed links.
- Preserved item definitions, class/encounter tuning, footprints, saves, local haste and existing ring identities. Validation: 33 regression suites, paired all-class/layout fixtures, identical results across three speeds, responsive inspection and hover/performance checks.

## 0.41.1 — 2026-10-25

- Kept batched combat HUD updates inside the shared placement cache, avoiding repeated backpack scans at accelerated speeds.
- Added a regression check for cached HUD updates. Enchantment rules and balance remain as documented for 0.41.0.

## 0.41.0 — 2026-10-25

- Reworked enchantments with affordable locking: each lock adds 4 dust instead of doubling the price. Previews show relevant base-value changes and clear proc limits.
- Fixed lost recharge fractions and inconsistent combat at 1×/2×/4×. Small percentage enchantments now accumulate useful output; accelerated combat updates the HUD once per frame.
- Added Command, Potency, Focus, Clarity and Resonance for companions, afflictions, support, mana generation and passive rings. Prevented new inactive Quickening rolls on passive rings.
- Improved Execution and added distinct 10/15/20% Insight refunds, sharing the existing gear-refund cap. Existing saved values and paid previews remain intact.
- Limited flat activation procs to once per 2 seconds per item; Shattering removes ward before the primary attack. Preserved consumable readiness, local haste, item identities and encounter tuning.
- Validation: 32 regression suites including ward and delayed-hit checks, syntax checks, 760 enchantment scenarios with identical outcomes at all three speeds, 1,995 paired class fixtures, responsive Enchanter checks and live 4× combat.

## 0.40.0 — 2026-10-25

- Reworked UT/ST abilities across all 19 types around RotMG identities, with 559 variants audited. All 176 tiered ability definitions and other item recipes remain unchanged.
- Added distinct companion behavior, charged skull releases and sigil forms, Hex detonations, offensive/support tomes, and clearer costs, conditions and local support effects. Preserved the existing custom signatures.
- Excluded 26 internal effect helpers from new loot and marked them unobtainable. Saved copies remain readable; fixed Shiny Midnight Star resolving to a helper.
- Validation: 31 regression suites, JavaScript syntax, 3,592 paired ability fixtures per build, 1,995 unchanged tiered-class fixtures, desktop/phone inspections and live 4× mixed-ability combat. Movement and multi-enemy mechanics use documented pack-side adaptations.

## 0.39.0 — 2026-10-25

- Reworked all 250 UT/ST armor variants around RotMG stats, trade-offs and signatures, using the existing armor roles as the baseline. All 45 tiered armor definitions remain unchanged.
- Added conditional defenses, retaliation, healing, spirits, mana efficiency and charged bursts with shared caps. Rare proc progress persists between fights; delayed weapon hits count once per activation.
- Preserved armor IDs, art, footprints, prices, ST memberships, Legacy restrictions and saved items. Updated descriptions and Shiny comparisons.
- Validation: 30 regression suites, JavaScript syntax, 5,208 paired armor fights, 1,995 unchanged tiered-class fixtures, desktop/phone inspections and 4× mixed-armor combat.

## 0.38.1 — 2026-10-24

- Clarified Amulet of Desecration: its curse affects the player, prevents healing for the rest of combat and provides no stat bonuses. Simplified its description and active status.
- Validation: JavaScript syntax, ring mechanics, stack/adjacency behavior and shop inspection checks.

## 0.38.0 — 2026-10-24

- Reworked all 314 UT/ST ring variants around their RotMG stats, conditional effects, companions and equipment synergies.
- Balanced hybrid bonuses against the current tiered rings, with shared adjacency caps, bounded procs and no recurring generic mana pulse. All 57 tiered rings remain unchanged.
- Preserved ST memberships, saved upgrades, artwork and unobtainable Legacy items; updated ring descriptions and Shiny comparisons.
- Validation: 29 regression suites, JavaScript syntax, 4,576 paired ring fixtures, 1,995 unchanged tiered class fixtures, desktop/phone inspections and 4× mixed-ring combat.

## 0.37.0 — 2026-10-24

- Reworked all 84 imported UT/ST katana entries (69 regular/historical profiles and 15 Shiny variants) using inspected RotMG game data. Distinct projectile rhythms, true piercing, returning blades, delayed accelerating strikes and Winter’s burst cycle replace generic recipes. Fiery Katana’s side arcs recover independently of its central shot.
- Added Ray’s block-scaled sunbeams, shared Doku/Fire grenade adaptations, Bloodbath’s low-HP damage/healing trade-off, Valor’s short weapon-fatigue penalty and Tools’ vitality-ring conversion. Preserved historical Doku’s lack of a grenade and kept novelty weapons’ source limitations.
- Updated compact item summaries and live state indicators. Saved upgrades, prices, acquisition rules, artwork, footprints and existing ST memberships remain intact. Full per-item profiles, source facts and translation limits: docs/katana-identities.md.
- Validation: JavaScript syntax and all 28 regression suites; 252 legal katana/class/version combat trials, 684 katana UI views, 7,176 catalogue views and a 4× mixed-katana/native-ability browser smoke check. All 1,995 tiered class fight records match the previous release. The 6,624-fight katana comparison stays close overall (1,882→1,864 wins per 3,312 fixtures). Void/Socket wind-up and novelty limitations remain playtesting watch points; Blade of Ages cannot fire within the existing 150s battle limit.

## 0.36.0 — 2026-10-24

- Reworked all 93 imported UT/ST wand entries (77 regular profiles and 16 Shiny variants) from inspected RotMG game data. Independent morning-star rhythms, mixed piercing, returning/slow shots, burst/recovery cycles, Razorthorn’s Nettle pattern and broad Lightning/Sprite damage rolls replace generic recipes.
- Added bounded Forgotten/Desperate Souls, acid pools, Dimensional Union’s pulsing squares, Fortitude’s ability-triggered rings, Hidden Knowledge’s self-curse bargain, Dusky Catalyst’s mana trade-off, Abomination mana procs and Ravenous bleed/Berserk. Close-range rings and circling volleys use explicit backpack-row positioning; full-hit budgets and chance effects are adapted to RealmPack.
- Updated compact item summaries and live state indicators. Preserved saved upgrades, acquisition rules, artwork, footprints and existing Geb membership/ability bonuses. Sources, all profiles and adaptation details: docs/wand-identities.md.
- Validation: JavaScript syntax and all 27 regression suites; 372 legal wand/class/version combat trials, 756 wand UI views, 7,176 catalogue views and a 4× mixed-wand/native-ability browser smoke check. All 1,995 tiered class fight records match the previous release. The 9,856-fight wand comparison stays close overall (2,334→2,325 wins per 4,928 fixtures); the 140-fight Geb comparison improves 38→42 wins per 70 fixtures. Novelty weapons remain weak; soul payoff and slow piercing trade-offs remain playtesting watch points.

## 0.35.0 — 2026-10-24

- Reworked all 98 imported UT/ST staff entries (81 regular/historical definitions and 17 Shiny variants) from inspected RotMG game data. Distinct firing rhythms, mixed piercing spellblades, delayed accelerating shots, radial volleys and short scythe chains replace generic recipes. Reskins share their underlying weapon behavior; historical versions remain distinct.
- Added Esben’s charged, block-scaled manifestation; Vigor’s bounded Festival Spirit; burst/recovery cycles for S.T.A.F.F., Spring Rose, Sleigh Bell and Frostfall. Recovery minimums apply only between bursts. Broad volleys use reduced total damage budgets, and extra projectiles never multiply flat power or activation procs.
- Updated item explanations and live charge/burst indicators. Preserved existing ST memberships, saved upgrades, artwork, footprints and acquisition exclusions, including unobtainable Legacy staves. Full per-item profiles, source facts and translation limits: docs/staff-identities.md.
- Validation: JavaScript syntax and all 26 regression suites; 294 legal staff/class/version combat trials, 796 staff UI views, 7,176 catalogue views and a 4× mixed-staff browser combat smoke check. All 1,995 tiered class fight records match the previous release. The 7,776-fight staff comparison records gains and losses (1,697→1,568 wins per 3,888 fixtures); the 280-fight ST set comparison preserves both sets’ win counts. Novelty staves remain weak; Esben’s long charge and slow piercing staves remain playtesting watch points.

## 0.34.0 — 2026-10-24

- Reworked every imported UT/ST dagger around inspected RotMG game-data: 66 names across 81 regular, retro and Shiny definitions. Source-backed damage/cadence, piercing, independent blade rhythms, returning blades, four-feather Judgement, Phantom Sickle fans and Fractal’s short-range inner bolts replace generic or conflicting custom recipes.
- Chain Dagger now revs while firing while retaining its 6-stack bleed ceiling (Shiny 8). Evergreen fires a three-volley cycle with recovery and keeps its 0.8s final cooldown floor (Shiny 0.72s). Toxic Toad combines piercing darts with a shared, bounded 6-poison proc.
- Added source-backed exposing shots, Spoon food cycles, MotMG/Syndicate pairings and Soulcursed Scythe’s cloak-triggered Lethal Strike adaptation. Removed mismatched summons, heartguard invulnerability, dungeon multipliers, room gold, wave HP farming, novelty resource bundles and guaranteed initial enchants. Existing saved enchantments/upgrades remain; all acquisition exclusions and existing ST memberships remain. Full profiles, comparisons and translation limits are in docs/dagger-identities.md.
- Validation: JavaScript syntax and all 25 regression suites; 243 legal dagger/class/version combat trials, 660 dagger UI views and 7,166 catalogue views. All 1,995 tiered class fight records match the previous release. A 6,432-fight dagger comparison and 280-fight ST set comparison record gains, losses and limitations; slow Soulcursed/Chain trade-offs and weak novelty profiles remain playtesting watch points.

## 0.33.2 — 2026-10-24

- Temporarily made all 13 explicitly labelled Legacy item versions unobtainable from loot, shops, events, transformations and Sandbox. Legacy Etherite Dagger was already unavailable; 12 additional versions join it. Legacy’s Pendant remains available because its name is not a Legacy version label.
- Legacy items appear under the compendium’s Unobtainable / All items filters with the existing availability notice. Owned copies retain their stats, effects, upgrades and inventory placement, and can still be used, sold or sacrificed. Pending saved offers are filtered on load.
- Validation: JavaScript syntax and all 25 regression suites. Targeted checks cover all 13 Legacy versions, the Pendant exception, acquisition guards, saved offer cleanup with preserved rarity, owned-copy activation/trading and unchanged recipes. All 78 Legacy inspection viewport/text combinations and the compendium filter passed browser checks.

## 0.33.1 — 2026-10-24

- Catalogue item inspection now uses one responsive panel with stats and class information beside the item’s effects. Removed Previous/Next pages, oversized spacing and the repeated boilerplate heading.
- Kept placement rules and Shiny comparisons in inline expandable sections, with Wiki and Back to catalogue always reachable. Small screens keep the same panel and can scroll longer expanded content without scrolling the game.
- Validation: relevant inventory, compendium, shop, adjacency and UT/ST regression suites; JavaScript syntax; 7,166 browser inspection views plus 60 related dialog views. All 2,318 catalogue entries fit without local scrolling at 1366×768 and 790×635 with default text; longer expanded content remains reachable on small screens. Back, Escape and keyboard focus navigation passed.

## 0.33.0 — 2026-10-24

- Reworked every imported UT/ST sword weapon: 81 names across 99 regular, retro and Shiny entries. Heavy, rapid, spread, piercing, novelty and reskin weapons now use inspected source-backed damage and cadence instead of the shared placeholder profile.
- Added returning flails, short chain/shockwave placement, shared beam cooldowns, Rapier lunges, Heartsteel side blades, Arsenal volleys/arrows, source-backed bleeding and impact bursts. Faithful Spatha and Gilded Chain Scythe recognize their matching packed gear. Damnation now carries its low-health offensive/Armored window, full-health healing penalty and reduced max HP.
- Removed eight imported internal enchantment objects from new loot; existing saved copies remain usable and inspectable under Unobtainable. Preserved non-sword definitions, dagger recipes, tiered sword progression, existing ST membership, sprites and IDs. Full source references, numerical adaptations and limits are in docs/sword-identities.md.
- Validation: JavaScript syntax, all 25 regression suites, 297 legal sword/class/version combat trials and 868 browser views across item inspection and compact offers. All 1,995 ordinary class fight records matched the previous build; a 7,968-fight paired sword benchmark records gains, losses and limitations, including the intentionally weaker novelty weapons and less-forgiving Icebreaker.

## 0.32.0 — 2026-10-24

- Reworked the first ten audited UT/ST items around their RotMG identities: Vesture of Duality, Mechanical Kogbold Limb, Fungal Breastplate, Breastplate of New Life, The Forgotten Crown, Skull of Endless Torment, Socket Blade, Vampiric Cape, Hallowed Hide and Edictum Praetoris.
- Added the complete Vampire Rogue and Hollow King Necromancer sets, including Ruthven’s Rosary, Memento Mori, Toga Picta and Interregnum. Soulcursed Scythe gains set membership while retaining its existing stats and mechanics. Other daggers retain their current recipes.
- Added capped equipment capacity bonuses, offensive adjacency auras, bounded raised undead/bats, healing-driven Torment purification, paired emergency healing and nonstacking timed offensive buffs. Equipping capacity gear does not refill resources; removed gear clamps them.
- Improved long item inspection layouts so shop sections and full-detail columns fall back safely when they would clip actions.
- Validation: JavaScript syntax and all 24 regression suites; 270 targeted item views, 510 general dialog views and 98 hover views passed. Dagger recipes are unchanged. All 1,995 tiered class fights matched the prior build; a separate 2,800-fight paired item benchmark and its limitations are recorded in docs/ut-st-identities.md. This completes the first audited batch, not the entire UT/ST catalogue.

## 0.31.4 — 2026-10-24

- Post-combat Health and Magic Potions, including Greater versions, now wait for an explicit loot choice instead of automatically filling inventory stacks or stash slots.
- Each encounter supply has Take and Leave actions. Taking merges only the chosen item into compatible stacks; opening rewards, reloading or freeing inventory space leaves the remaining supplies untouched. You can still leave all unclaimed supplies together.
- Validation: JavaScript syntax and all 23 game regression suites; targeted checks cover unchanged existing stacks, Greater supplies, full stash, manual claims, individual Leave actions, replay guards and reward continuation. Browser clicks cover a real victory, Take/Leave, inventory discards and save/reload; all 10 supply-dialog viewport/text combinations fit without clipping or page scrolling.

## 0.31.3 — 2026-10-24

- Battle floors now match all 35 dungeons, with original pixel tiles for sandy caves, forests, webs, honeycomb, crypts, lava, ice, wood, coral, runes, crystals and machinery. Material patterns and palettes distinguish each dungeon.
- Floors follow the actual encounter’s dungeon, including sandbox encounters, portal transitions and resumed runs. Static cached textures update only when the dungeon changes; neutral shading and text shadows preserve combat readability.
- Validation: JavaScript syntax and all 23 game regression suites, all 350 encounter mappings and all 35 SVG assets. Browser checks cover 210 battle views across desktop, phone and short landscape sizes with both text modes, plus portal changes, sandbox encounters, save/reload and stable repeated application. See docs/battle-floors.md.

## 0.31.2 — 2026-10-23

- Victory spoils and shop consumable cards now explain their actual effects, amounts, targets and duration instead of displaying the generic word “consumable.” Speed potions describe adjacent armor cooldown upgrades; Dexterity effusions show their opening haste duration and recharge bonus.
- Consumable cards show “Consumed on use · stacks to 5” in place of the unhelpful class-compatibility line. Full inspection retains the complete caps and targeting rules.
- Small-phone loot cards use tighter spacing and omit the redundant footer reminder so the fuller descriptions, gameplay tips and action buttons fit together.
- Validation: all 22 game regression suites and JavaScript syntax checks; descriptions asserted for all 46 obtainable consumables in both reward and shop cards. Browser checks cover 224 offer/layout/text/hint combinations, all 46 consumables in phone reward/shop views with larger text and tips, and 20 reward/shop inspection dialog views.

## 0.31.1 — 2026-10-23

- Added an Availability filter to the item compendium: Obtainable (default), Unobtainable and All items. Retired consumables, disabled daggers and removed legacy definitions can now be searched and inspected together with the existing type, class, version and signature filters.
- Unobtainable cards display an explicit badge; their inspection screens say they cannot be obtained during gameplay. Existing saved copies show the same status in inventory inspection. Sandbox acquisition stays disabled for these entries.
- Validation: JavaScript syntax and all 22 game regression suites, including availability partitions, combined filters, reset/page behavior, legacy inspection and sandbox guards. Browser checks cover 64 compendium/bestiary views across eight viewport sizes and both text modes, plus 40 inspection dialog views; mobile filters, warnings, pagination and return focus were exercised.

## 0.31.0 — 2026-10-23

- Reworked consumables into resources that are permanently spent after use. Stacks still hold five; unused copies survive, and used copies are removed after the whole encounter, including all waves.
- Added capped permanent stat upgrades to one chosen adjacent item, with target selection in inspection. Attack/Defense retain +1 / +2 upgrades; weapon/armor/ability cooldown potions give 0.10s / 0.20s reductions up to 25% of base cooldown. Vitality improves passive ring strength or active-ring cadence; Mana uses ability-family potency. Life adds +5 / +10 maximum HP, capped at +60 from potions.
- Added encounter-wide tinctures/effusions, opening Ambrosia heals, Chaos Cake, budgeted Frost Cake freezing, extra enchantment slots, loot modifiers, guaranteed stat drops, a chest Open action and bottom-right same-size transformation. Weaker duplicate temporary effects are kept rather than wasted.
- Every combat victory also gives Health and Magic supplies, upgraded to Greater versions in Exaltation/Apex Exalt dungeons. These are separate from normal loot; overflow and reward-time inventory management preserve the nine-slot stash limit and require an explicit choice before leaving supplies.
- Reduced the obtainable consumable pool to the 46 defined items. The other 168 are hidden from new acquisition and the catalogue; existing copies remain usable. Removed Health1–6 variants migrate to Health Potions and the three removed Steamworks-related chests migrate to stat-potion chests without losing stack counts.
- Validation: JavaScript syntax and all 21 game regression suites; 276 consumable inspection views with complete-text and short-screen action checks, 98 existing hover views and 50 reward/inspection dialog views. Browser clicks cover target selection, chest opening, confirmed reward-time discards and save/reload persistence. The preserved 1,995-fight benchmark cleared 1,600, matching the earlier fixed-build total; it does not establish full-run consumable economy balance. See docs/consumable-rework.md for values and limits.

## 0.30.16 — 2026-10-22

- Health rings retain their maximum-HP bonus and now restore that amount once at battle start: 12 HP at T1 through 36 HP at T7, capped at maximum HP. Combined ring restoration caps at 100 HP, matching the capacity cap; primary infusions improve both within that cap.
- Equipping, moving, inspecting or reloading a saved grant cannot repeat the heal. Later waves do not grant it again. This preparation-time restoration does not charge healing class passives. Vitality's periodic healing remains unchanged.
- Validation: JavaScript syntax, all 20 game regressions, targeted battle-start/movement/save/wave/cap tests, 130 browser inspection views and 5,985 new Health / Vitality / no-ring fights across 19 classes, 35 bosses and three tiers. Health cleared 1,630/1,995 versus 1,592 previously; Vitality stayed at 1,678 and the no-ring control stayed at 1,591. This narrows the gap without establishing equal strength. See docs/attribute-rings.md for results and limits.

## 0.30.15 — 2026-10-22

- Magic rings retain their maximum-mana bonus and now grant 1 / 2 / 3 mana at battle start at T1–2 / T3–5 / T6–7. Packed rings grant at most 6 total; equipping, reopening details and later waves cannot repeat the grant.
- Wisdom now carries its fractional primary-output bonus between successful activations of each adjacent ability. Small bonuses accumulate into whole extra points instead of disappearing into rounding. Carry resets at the next battle; previews and failed activations do not consume it. Dodge abilities retain their recharge bonus.
- Added a controlled ring comparison across all 19 classes and 35 dungeon bosses, with T1 / T4 / T7 rings and a no-ring baseline. Each archetype uses the same gear positions and a legal ring placement chosen for its relevant neighbors. See docs/attribute-rings.md for results and limitations.
- Validation: JavaScript syntax, all 20 game regressions, targeted resource/carry tests, 130 browser inspection views and 35,910 paired archetype fights. Magic reduced measured ability-mana starvation by 65.61% without changing clears; Wisdom's total clears were unchanged. The fixed-build comparison flags Health for further testing and Vitality as its strongest archetype; their values are unchanged.

## 0.30.14 — 2026-10-22

- Reworked all 57 tiered attribute rings: Attack boosts adjacent weapon damage, Defense boosts adjacent item block gain, Wisdom boosts adjacent ability output, and Speed continuously reduces adjacent cooldowns. Dexterity grants temporary adjacent haste; Vitality heals. Wisdom improves dodge-ability recharge instead of adding dodge charges.
- Health rings add maximum health while packed; Magic rings add maximum mana instead of generating it. The HUD now shows current / maximum mana. Equipping capacity rings does not refill resources; removing them clamps resources to the lower cap. Existing saves retain their gear and upgrades without repeatedly granting maximum health.
- Higher tiers improve each role. Adjacency auras use the strongest two matching neighbors: shared primary bonus cap +35%, Defense +50%, Speed 20% cooldown reduction. Health-ring capacity caps at +100 HP and Magic-ring capacity at +40 mana. UT/ST ring identities are retained. Passive auras retain separate activation cycles for existing enchantments.
- Validation: all 20 game regressions, including eight ring identities, caps, adjacency, save migration and infusion/enchantment compatibility; JavaScript syntax and browser inspection/dialog checks. A fixed 1,995-fight class benchmark cleared 1,600 encounters versus 1,635 previously; its unchanged builds always carry Magic rings, so this mainly measures losing their old mana generation, not optimized ring balance. See docs/attribute-rings.md for values and limitations.

## 0.30.13 — 2026-10-22

- Removed the extra Healing Tome granted to every class at the start of a run. Class starting equipment, Ring of Magic and Health Potion are retained; Priest still starts with its own tome. Existing runs keep their items.
- Validation: checked starting inventories for all 19 classes in normal and Sandbox modes; JavaScript syntax and all 19 game regressions. Updated the enchantment test to supply its own spare gear.

## 0.30.12 — 2026-10-22

- Widened Full details to use two readable columns on desktop, bringing item stats, adjacency bonuses and enchantments together on one page. Reduced excess card spacing and enlarged enchantment text.
- Kept every description, connection rule and action available; phones and unusually long details retain pagination when necessary.
- Validation: browser checks across seven viewport sizes and both text settings, including a one-page check for Robe of the Neophyte at desktop sizes; dialog layout checks, JavaScript syntax and inspection/inventory/shop regressions.

## 0.30.11 — 2026-10-22

- Fixed multi-wave bosses carrying their phase-II damage bonus into the next wave. Each wave now starts at base damage and applies its own phase bonus once.
- Reduced Malphas's base damage by 10%. Esben's suppression now lasts two seconds. Ivory Wyvern deals 15% less base damage and its heavy strike adds 30% instead of 50%.
- Reduced the Mummy King's ward refill to 8% of maximum HP and Kogbold's artillery shell to 65% of attack damage. Queen Bee deals 10% less base damage; Crystal Worm Mother deals 10% more, retaining her existing regeneration.
- Added individual danger warnings to the flagged ordinary encounters and dangerous boss combinations in route previews, map labels and encounter details. Saved current/future encounter stats migrate without changing completed rooms or route choices.
- Validation: 21,546 paired combat simulations across all 350 encounters and 19 classes, including later-depth and ceiling builds; targeted tuning/migration tests; 40 dialog views, 102 viewport views, JavaScript syntax and all 19 game regressions. The intermediate depth-10 fixture improved from 9/19 to 14/19 clears for Malphas, 2/19 to 5/19 for Esben and 3/19 to 7/19 for Ivory Wyvern; these are tested loadouts, not player win probabilities.

## 0.30.10 — 2026-10-22

- Numbered consumable bundles now grant their stated number of copies: for example, Vamp Steak Flambe’ x4 arrives with four uses per battle. All 26 explicit x1–x6 variants are supported; percentages and unrelated name digits remain unchanged.
- Bundles larger than five split into separate stacks. Capacity checks reserve space for the whole bundle before spending gold or resolving an event, and matching stacks merge without losing copies.
- Kept package purchase prices and valued merchant sales per copy using the package size. Clone events still copy one item; existing saved or split stacks retain their actual quantities.
- Validation: all 18 game regression scripts, JavaScript syntax, bundle acquisition/capacity/overflow/clone/sale tests, per-copy healing, and a browser check of the x4 inspection and stash count.

## 0.30.9 — 2026-10-22

- Moved the trashcan inside the travel stash, below its nine item slots, and added a visible Discard label. Stash sizing reserves room for the control on shorter screens.
- Validation: packed/stashed discard, whole-stack confirmation/cancellation and combat guards; nine-slot layout checks at five sizes; 102 general viewport checks; inventory/stack regressions and JavaScript syntax.

## 0.30.8 — 2026-10-22

- Replaced the item inspector's page navigation with a compact, single-page overview. Full details opens complete effect descriptions, enchantments, placement rules and connections; smaller screens keep the overview focused on essential item stats.
- Added a small trashcan beside the backpack controls. Drag packed or stashed items onto it to open the discard confirmation; canceling keeps the item or whole consumable stack intact. Discarding is blocked during combat.
- Validation: 72 inspection views across six sizes and larger text, complete expanded inspection text and page fit, 102 general viewport checks, discard/dialog checks, drag performance checks, JavaScript syntax and all 17 game regressions.

## 0.30.7 — 2026-10-22

- Fixed combat stutters when hovering over items. Inspection pagination now measures blocks together instead of repeatedly changing and measuring the layout for every block.
- Kept all inspection text, connection highlights, live counters and page controls, with word-level pagination retained for very short screens.
- Validation: 60 inspection views and 290 pages across desktop, phone, short landscape and larger text; 102 general viewport checks; drag regression checks; exact combat state/log parity at 1×/2×/4×; JavaScript syntax and 17 game regressions. The 30-item combat hover test reduced inspector pagination time by about 97% versus 0.30.6.

## 0.30.6 — 2026-10-22

- Replaced repeated cell-array adjacency checks with rectangle-edge checks, preserving legacy behavior for unplaced or overlapping items.
- Cached combat neighbours, adjacency bonuses and set-piece counts. Layout and definition changes invalidate the cache; live combat effects retain their existing rules.
- Updated labels, bars and badges only when their displayed values change. Hidden backpack work is deferred and refreshed when the player returns.
- Added saved Full, Reduced and Off effects settings in the run menu. Reduced uses short border indicators and static connection lines; Off disables decorative pulses while retaining gameplay indicators.
- Validation: 20,000 geometry comparisons, 1,995 identical benchmark fights across all 19 classes, original-build state/log parity at every speed, visibility/quality persistence, dialog checks and 17 game regressions. The matched stress test reduced mean 4× tick time by about 59% versus 0.30.5.

## 0.30.5 — 2026-10-22

- Reduced combat rendering work in crowded backpacks, especially at 2× and 4× speed. Simultaneous effects on each item now share one visual update, with reusable animated overlays replacing forced layout reads.
- Cached stable combat connections and room/map presentation. Batched journal updates and deferred hidden journal rendering until it is opened; gameplay still records the latest 70 messages.
- Kept the existing simulation tick, speed multipliers, item activations, damage and effect rules. Combat timing is independent of visual batching. The matched 30-item stress test measured about 60% less CPU time inside 4× ticks; hardware and browser results vary.
- Validation: matched crowded-pack profiles at 1×/2×/4×, original-versus-optimized simulation comparisons, effect/cache/journal browser checks, JavaScript syntax and game regressions.

## 0.30.4 — 2026-10-22

- Updated Dev notes: "-Items and consumables still need major overhaul".
- Validation: JavaScript syntax and stack/adjacency regression checks.

## 0.30.3 — 2026-10-22

- Added a Dev notes button to the top bar and run menu. Notes open in a readable, content-sized window; long messages use the shared pager.
- Kept the button visible on phones, with Run map also available in the menu. Opening notes pauses combat like the other reference windows.
- Added a separate editable notes text in game/dev-notes.js, currently showing a placeholder until the developer supplies the message.
- Validation: header and notes layouts at desktop/phone sizes, long-message paging, text escaping, combat pause/resume, dialog audit, JavaScript syntax and game regressions.

## 0.30.2 — 2026-10-21

- Clicking, tapping or keyboard-activating a class now opens a compact confirmation for that class. Confirm to begin; Back or Escape returns to the roster without changing your current run.
- Removed the corner Start button. Hover and focus still preview class information; the confirmation keeps the clicked class, mode and difficulty fixed.
- Validation: all 19 class previews and confirmations, desktop/phone layouts, keyboard focus and cancellation, mode/difficulty selection, duplicate-click guards, dialog audit, JavaScript syntax and game regressions.

## 0.30.1 — 2026-10-21

- Fixed oversized event-result dialogs, including leaving without a trade: the message and Continue action now share a compact window.
- Replaced the shared full-height dialog rule with content-based sizing for events, rest stops, blessings, route choices, the run menu, confirmations, endings and item/enemy inspection. Containers and individual pages shrink around their content, with paging controls shown only when needed.
- Tightened choice-card spacing and empty fields. Keep, Leave and Continue actions stay outside paged content; short landscape screens stack inspection sections without clipping. Dialogs remeasure on resize, text-size changes and gameplay hints.
- Validation: 410 dialog layouts and 1,342 content pages across five viewports and both text modes, button hit testing, 16 game regressions, existing browser layout and hint-pointer checks.

## 0.30.0 — 2026-10-21

- Rebuilt the Enchanter around fixed gear rarity: Uncommon has one slot, Rare two, Legendary three and Divine four. Shiny gear has at least two. Existing modifiers remain intact.
- Added green, red and purple dust from combat victories, plus a starter supply. Attune empty slots or reroll every unlocked modifier; locking each modifier doubles the dust cost. Preview and keep either roll after paying once.
- Weighted modifiers respect equipment type and avoid competing categories. Existing modifier strengths and rank chances remain unchanged. New gear is attuned at an Enchanter, a RealmPack adaptation of RotMG’s rarity/dust system.
- Removed class compatibility from the Enchanter, enlarged enchantment text, and replaced the oversized event window with compact modifier cards and a comparison view.
- Validation: enchantment economy, locks, save migration and stale-click guards; responsive Enchanter layouts; JavaScript syntax and game regression checks.

## 0.29.0 — 2026-10-21

- Balanced the shared desktop layout so combat takes roughly 40% of the main area and the backpack remains slightly larger. Character/enemy sprites scale with the arena; shorter windows use a compact arrangement without page scrolling.
- Added pixel icons beneath the enemy for burning, poison, bleeding, chill, weakened and exposed. Damage effects show stack counts; timed effects show seconds remaining.
- Hover, keyboard-focus or tap an icon for its explanation. Icons update as effects change and disappear when they expire or the enemy dies; player effects remain in their own summary row.
- Validation: combat/backpack geometry, full stash, all six debuffs and tooltips, effect expiry/reset, unchanged run state, browser layout and drag checks, JavaScript syntax and game regression checks.

## 0.28.0 — 2026-10-21

- Loot and shop windows now fit their offers instead of filling the screen. Smaller shops narrow as items sell out, with the actions directly below the cards.
- Added one offer pager only when all cards cannot fit. Desktop layouts use available columns; phone layouts show readable cards with Inspect, Take/Buy and room actions kept visible.
- Kept gameplay hints and their pointers within the compact layout. Short landscape screens use horizontal cards.
- Validation: stock counts, long item names, desktop/phone layouts, both text modes, hints on/off, every offer reachable, inspection return, purchases, JavaScript syntax, shop and game regression checks.

## 0.27.1 — 2026-10-21

- Smoothed inventory dragging by keeping inspection on the held item instead of rebuilding the panel and its pages as the cursor crosses other gear.
- Placement previews now reuse their sprite, skip unchanged destinations and combine rapid pointer events into one update per animation frame. Preview movement uses an isolated transform layer.
- Deferred inspection pagination until the drag ends. Rotation, stack merging, stash transfers, blocked drops and click-to-place controls retain their existing rules; cancellation clears pending preview updates.
- Validation: crowded-backpack profiling, high-rate pointer input, stable preview/inspection nodes, no pagination during drag, rotation/drop/cancellation, browser layout and inventory checks, JavaScript syntax and game regression checks.

## 0.27.0 — 2026-10-21

- Rebuilt the defeat screen around the reference: a black backdrop, red pixel frame, Dead! heading, enemy attribution, centered class sprite and red character-selection button.
- Replaced the name/fame area with depth reached, act and room, plus class, mode, victories, bosses, blessings and remaining gold. The summary fits a single screen without paging.
- New defeats save their date so it stays accurate after reloading; existing saves remain compatible. Timeouts have their own message. Opening character selection preserves the finished run until Start.
- Validation: desktop/phone defeat layouts in both text sizes, all 19 class portraits, run statistics, loss/save/reload, legacy saves, timeout, character selection, victory flow, JavaScript syntax and game regression checks.

## 0.26.1 — 2026-10-21

- Gameplay tips now point to the relevant item, stat or control with a gold arrow and outline. Adjacency tips highlight a pair of neighboring items.
- On small screens, tips point to the tab that reveals a hidden target and briefly tell you which tab to open. The pointer follows the target as the view changes.
- Arrows never block clicks, hovering or dragging, and disappear when a tip is dismissed, disabled or no longer relevant.
- Validation: hint target geometry, visible highlights, click-through, tab switching and cleanup across seven viewport sizes and both text modes; guide/tip layout checks, JavaScript syntax and game regression checks.

## 0.26.0 — 2026-10-21

- Rewrote How to Play as four short steps and a few controls, all on one screen.
- Added optional, contextual gameplay tips for packing, combat, mana, healing, loot, merchants, events and more. One tip appears at a time in its own space; Got it dismisses it, with a pause before the next tip.
- Added Gameplay tips On/Off in the guide and run menu, Tips off on each hint, and Show tips again to restart them. Preferences and seen tips survive reloads without changing run saves.
- Validation: 14 guide/tip layouts across seven desktop/phone sizes and both text modes; context rules, dismiss/toggle/reset, reload persistence, unchanged run state, JavaScript syntax and game regression checks.

## 0.25.1 — 2026-10-21

- Replaced the oversized restart screen with a compact, centered confirmation. Keep playing and Choose character sit together, with no paging or scrolling.
- Clarified that the current run is only replaced when Start is pressed in character selection. Keyboard focus starts on Keep playing, stays inside the dialog, and Escape cancels.
- Isolated item identity checks from randomly selected enemy passives so vampire healing cannot cause intermittent deployment failures.
- Validation: 14 desktop/phone layouts across seven viewport sizes and both text modes; action visibility, keyboard focus, cancellation, safe character selection and combat guard; JavaScript syntax and game regression checks.

## 0.25.0 — 2026-10-21

- Rebuilt the item compendium and realm bestiary as dedicated result browsers, removing the extra screen pager. Each has one Previous/Next control, a direct page-number field and an exact visible-result range.
- Results use a dense grid sized to the viewport and text setting. Search and filters stay outside the grid; phone filters open in a compact panel with Done/Escape/outside dismissal.
- Added dungeon and role filters to the bestiary, clear empty states and filter resets. Item and encounter cards offer Inspect for full details; Back or Escape preserves the search, filters, result page and card focus.
- Kept Sandbox add/practice actions and acquisition guards; browser feedback appears inline instead of covering the pager.
- Validation: both browsers at seven viewport sizes/two text modes, single-pager and card bounds, Next/Previous/jump, search focus, filters/reset/empty states, Inspect return, full ordered item/encounter traversal, Sandbox feedback/capacity/combat guards, practice action, workspace browser checks, syntax and game regressions.

## 0.24.5 — 2026-10-21

- Made Run Map a single sheet: the act route, difficulty, legend and Return button are visible together without Previous/Next pages.
- Replaced the flat map background with weathered parchment, worn edges, a fold line, faded contours and dark ink routes/markers. Current, travelled, skipped and available routes retain distinct states.
- The sheet fits desktop and phone viewports without scrolling; compact maps use the legend and marker tooltips for labels. Existing route selection and saved routes are preserved.
- Validation: eight viewport sizes and both text modes, every depth/route node, no paging/clipping/scroll, route/RNG preservation, branch selection, Return and portal state, workspace browser checks, syntax and game regression checks.

## 0.24.4 — 2026-10-21

- Enlarged backpack cells to use available panel space instead of staying capped at 64 pixels. Roomy screens can reach 112-pixel cells; item sprites and labels scale with them.
- Widened the adjacent stash and enlarged its square slots and item sprites, while preserving the 30-cell backpack, nine stash slots and five-copy consumable limit. Small screens still fit without page scrolling.
- Replaced the header star and browser icon with the Vault Chest Unlocker sprite from realm.wiki.
- Validation: inventory geometry and full-stash clipping at 12 viewport sizes, logo loading, live S/drag transfers, workspace browser checks, syntax, inventory controls, stacking/stash and game regression checks.

## 0.24.3 — 2026-10-21

- Moved class description and passive information from the sidebar to the character sprite. Hover or keyboard-focus your character to inspect it; click/tap pins the panel.
- Removed the Class sidebar tab. Character and enemy panels share reading/paging, Escape, Close, outside-click and view/dialog dismissal; opening one closes the other. Combat continues while inspecting.
- Validation: all 19 live class previews at six viewport sizes, complete descriptions/passive rules and page bounds, hover/focus/tap, active-run preservation, dismissal/focus, panel switching, modal/view cleanup, uninterrupted combat, enemy/workspace browser regressions, syntax and game regression checks.

## 0.24.2 — 2026-10-21

- Moved encounter mechanics and dungeon difficulty out of the sidebar into an enemy-sprite details panel. Hover or keyboard-focus the enemy to inspect it; click/tap pins the panel.
- The panel stays open while reading or using its pages, fits around the enemy, and closes with Escape, its close button, an outside click, or a view/dialog change. Combat continues while inspecting.
- Removed the Encounter sidebar tab; Item, Class and Journal remain.
- Validation: enemy hover/focus/tap at six viewport sizes, live details, pointer access, bounds/paging, dismissal/focus, modal/view cleanup, uninterrupted combat, workspace browser regression, JavaScript syntax and game regression checks.

## 0.24.1 — 2026-10-21

- Put all 19 classes on one compact selection screen, showing their portraits and names without paging.
- Hovering, keyboard focus or tapping updates a shared panel with health, description, starting equipment and passive rules. Small screens split the preview into Overview/Passive tabs.
- Added an explicit Start button so previewing never starts or replaces a run. Dungeon run/Sandbox and starting difficulty remain selectable.
- Validation: every class preview across seven viewport sizes, hover/focus/tap, visible roster and detail bounds, mode/difficulty start behavior, combat guard, browser workspace regression, JavaScript syntax and game regression checks.

## 0.24.0 — 2026-10-21

- Rebuilt the playfield around the viewport. Desktop keeps compact combat above the backpack and adjacent stash; smaller screens use Battle, Pack & stash, and Details tabs.
- Moved item inspection, encounter details, class information and the battle journal into a tabbed side panel. Secondary descriptions and dialogs use Previous/Next pages; a small-screen Menu keeps reference and settings buttons available.
- Added S to stash a hovered backpack item, falling back to the selected item. It only works from backpack to stash during preparation; respects capacity/stacking and ignores combat, dialogs, typing, held-key repeats and modified shortcuts.
- Validation: headless Chromium viewport, dialog paging and keyboard interaction checks, JavaScript syntax, inventory controls, shop/reward behavior and the full game regression suite.

## 0.23.1 — 2026-10-20

- Added one free stock refresh per shop visit, including sold-out shops. Refresh keeps the merchant's specialty and rolls five offers; some items may appear again.
- The used refresh persists through reopening and reloading. A later shop gets a new refresh; purchases, healing limits and visit bonuses stay intact.
- Existing mixed-stock saves keep their offers until explicitly refreshed, then switch to a specialist.
- Validation: refresh availability/disabled UI, specialty and resource preservation, repeat-click and wrong-phase guards, save/load limits, later visits, sold-out shops, legacy saves, JavaScript syntax and the game regression suite.

## 0.23.0 — 2026-10-20

- Replaced mixed random shop stock with 30 specialist merchants: every weapon, ability and armor family, plus separate ring and consumable shops. Each stocks only its own type with distinct offers and matching native sprites.
- Weighted new shops toward native weapon/ability/armor families (70%) and shared ring/consumable shops (25%), with a 5% chance of an off-class specialist. Shop chances are independent of catalogue size; stock retains class compatibility and act-based rarity weighting.
- Added reliable health/mana potion offers at The Alchemist and extra weight for eligible consumables already owned in partial stacks. Existing purchase, merge and stash caps remain enforced.
- Showed merchant identity in newly generated routes and the shop header. Preserved remaining stock and healing limits through reopening/reloading; old mixed-stock shops remain intact until the next shop.
- Validation: all 30 families across all 19 classes/three acts, 1,710 stock rolls, 190,000 seeded selection trials, consumable weighting, native art, purchases, legacy saves, repeat-entry guards, syntax and the existing regression suite. Details: docs/specialist-shops.md.

## 0.22.2 — 2026-10-20

- Chain Dagger retains 10 base damage and 2 bleed per use, but can only build enemy bleed up to six stacks. Its upgraded Shiny counterpart has an eight-stack ceiling.
- Higher bleed from other sources is preserved; Chain does not refresh that higher bleed when it cannot add stacks. Other bleed weapons and the global 24-stack cap remain unchanged.
- Validation: regular/Shiny ceilings, partial applications, preservation/expiry of other sources, seeded output checks, syntax and the full game regression suite.

## 0.22.1 — 2026-10-20

- Raised Evergreen Dagger’s final cooldown floor from 0.5s to 0.8s; the Shiny floor rises proportionally from 0.45s to 0.72s. Haste and upgrades cannot bypass these floors.
- Reduced Toxic Toad from 10 to 6 poison per activation, keeping its two-second cooldown, no direct damage, and existing poison cap/decay.
- Validation: cooldown ramp/reset/floor and Shiny checks, exact poison output, targeted seeded comparisons, JavaScript syntax and the game regression suite.

## 0.22.0 — 2026-10-20

- Implemented all 55 entries from The Dagger Update: 50 explicit dagger recipes, ten upgraded Shiny counterparts, four temporarily unobtainable items and removal of the redundant Poison Fang catalogue entry. Existing disabled-item saves remain usable; duplicate Fang saves migrate without losing upgrades.
- Added per-projectile miss/critical rolls, ward bypass, status riders, use counters, cooldown ramps, stronger haste response, direct-attack immunity windows, summons and packed-item/dungeon synergies. Multi-shot attacks share one flat-power and activation budget.
- Added Chicken Leg maximum-health rewards per defeated wave, once-per-room Rosebite noncombat rewards, and one-time initial enchantments for Retrowinds/Seeker's Chisel. Preserved saves, tiered progression, classes, footprints and art.
- Set Amethyst Prism's sale value to ten times the ordinary T12 offer, with a correspondingly higher purchase price. Updated inspection links/text, Shiny effect values and unavailable-item notices.
- Kept the requested values; documented interpretations and balance feedback in docs/dagger-update.md. Evergreen/Chain roughly doubled sustained output; Bounty/Cutter/Toy lost substantial primary-weapon output in the fixed Rogue fixture. These are diagnosed tradeoffs, not a claim of complete balance.
- Validation: full regression/syntax checks; all 55 requested entries and 10,000-trial miss/crit checks; 1,650 before/after boss simulations plus 2,200 output trials. All 1,995 ordinary tiered-build records matched before/after. Saved rolls, exclusions, duplicate migration, reward replay limits, cooldown floors and actual multi-room utility were checked.

## 0.21.5 — 2026-10-20

- Reworked 24 UT identities around researched RotMG behavior, covering 54 entries with imported duplicate versions and Shiny counterparts. Divinity now beams, EP specializes in point-blank barrages, Planewalker evades/repositions, Crystal Shield armors/retaliates, Conflict consumes Hex for soulshards, and Mushroom Tome heals over time.
- Added 24 individually adapted ST pieces across six sets: Skuld, Swoll Paladin, Priest of Geb, Pirate King Warrior, Oryx Awesome and Phylactery Mystic. Two/three distinct packed pieces improve the set; four unlock a themed effect. Duplicates, stash and Legacy pieces do not fill missing slots.
- Added visible set progress, piece lists and explicit signature tradeoffs. Close-range weapons favor the top backpack row. Volleys share one damage budget; temporary armor, regeneration, protection and set procs have stacking or repeat limits.
- Preserved item IDs, art, footprints, native classes, saved upgrades and tiered progression. Other imported UT/ST items retain their existing family rules. These mechanics use RealmPack values rather than exact RotMG numbers; references and scope are documented in docs/ut-st-identities.md.
- Validation: signature/defense/resource tests, all six legal set layouts, threshold/proc guards and 18 actual set-combat simulations, full regression suite and syntax checks. All 1,995 tiered-build class benchmark records matched the preceding release.

## 0.21.4 — 2026-10-20

- Added the Supply Caravan: choose an owned consumable stack and buy one or two exact matching copies, capped at five. One purchase per visit; each copy costs 60% of its item price, rounded up, with an eight-gold minimum.
- Guaranteed a Supply Caravan at depth 3 of newly generated first acts; it can also appear among random events. Existing generated routes remain intact.
- Restocking preserves upgrades, works on packed or stashed stacks even with all nine stash slots occupied, and previews counts and costs before purchase.
- Validation: restock accounting, exact variants, stack/stash limits, invalid/stale/repeated orders, event art, route generation and existing game regression checks.

## 0.21.3 — 2026-10-20

- Kept noncombat rooms accessible for saved stashes above the new nine-slot limit, allowing excess gear to be sold. Only starting combat requires the stash to be reduced to nine slots.
- Validation: over-cap shop entry, normal full-stash guards, preserved legacy items and legal battle entry.

## 0.21.2 — 2026-10-20

- Limited Travel stash to nine item slots in both normal runs and Sandbox. A consumable stack still holds up to five copies in one slot. Added nine visible slots and a used/9 counter.
- Applied the cap to purchases, rewards, event grants/clones/exchanges, Sandbox additions, splitting and backpack transfers. Compatible stacks can merge at capacity, with failed partial merges leaving both quantities unchanged.
- Blocked purchases and paid event choices before charging costs when their item cannot fit. Blocked loot choices remain available until another reward or the health alternative is chosen. Lottery capacity checks do not expose their predetermined result.
- Preserved existing saves above the cap without deleting items. Those stashes must be reduced to nine or fewer slots before battle; they cannot add new slots while over capacity.
- Corrected stack compatibility to distinguish primary infusions, and configured cloned upgrades before considering stack merges.
- Validation: nine-slot boundary, atomic merges, upgrade variants, transfers, split guards, purchase/reward accounting, event costs and freed slots, lottery guards, Sandbox, legacy over-cap handling and existing regression checks.

## 0.21.1 — 2026-10-20

- Moved Travel stash beside Your backpack inside one inventory workspace, with a clear vertical divider and aligned headings. Narrow layouts place the stash immediately below the backpack with a horizontal divider.
- Added a visible stash slot count and expanded the drag-to-stash target to the whole stash pane. Preserved drag/drop, hover inspection, selection and stack merging.
- Stash contents expand naturally without a new internal scrollbar. Existing capacity rules remain: normal runs have no enforced stash cap; Sandbox catalogue additions stop at 80 stash slots, while other transfers may exceed that. Stacks hold up to five copies per slot.
- Validation: unique DOM IDs and inventory placement, bidirectional drag/drop, slot counts, existing selection/hover/rotation interactions, stack/adjacency behavior, shop UI and JavaScript syntax.

## 0.21.0 — 2026-10-20

- Replaced item-ID-derived stat variation with consistent recipes for 33 equipment families. Every numbered tier improves output or efficiency; ordinary tiered gear keeps its family role instead of gaining unrelated random mechanics.
- Rebalanced weapon output around attack cadence and backpack footprint. Larger bows hit harder; small weapons retain speed and flexibility. Reduced excessive dodge frequency on starter leather armor.
- Special equipment uses a family baseline with themed bonuses or curated iconic signatures. Preserved names, IDs, sprites, shapes and shiny relationships; shiny upgrades inherit their base item's revised role. Tier labels are visible in inspection and offers.
- Reworked Bard into capped Rhythm rewards from hasted activations; Wizard now stores a scaling spell echo; Samurai builds Focus for wakizashi strikes; Warrior gains capped temporary percentage Fury; Archer gains bow/quiver precision shots. Druid sigils now heal and summon, supporting the class's healing passive from the starting kit.
- Reduced Knight's block-to-counterattack feedback and Kensei's counterattack payout, improved Sorcerer's proc cadence and added block to Summoner's class summon. Mystic and item attack delays now share one bounded delay budget.
- Poison and bleed now lose one stack per second and cap at 24 stacks, reducing sustained runaway stacking. Existing consumable health thresholds, stack limits and adjacent-haste rules remain.
- Added progression/class regression checks and a reproducible 19-class benchmark. Corrected the earlier audit's broad rarity-based ability selection to use each family's actual tier range and legal upgrades. Updated endgame reachability tests to use native, fully tiered builds with valid enchantments.
- Validation: tier progression, family roles, shiny inheritance, saved equipment/upgrades, class resource caps and activation hooks, healing/haste/stack/event regressions, 19 class openings, difficulty hierarchy and legal apex clears. Comparative benchmark details and limitations are in docs/class-item-balance.md. This is an initial balance pass; full-run playtesting should guide further tuning.

## 0.20.4 — 2026-10-20

- Item-granted haste now affects only packed items sharing an edge with the source. It excludes the source itself, diagonal neighbors and stashed gear; large items use their actual occupied edges.
- Kept the +25% recharge bonus. Repeated haste refreshes the recipient timer without adding duration; overlapping item/class haste does not multiply or add speed. The existing 15-second duration cap remains.
- Bard and Warrior class haste remains backpack-wide. Permanent recharge blessings, quivers, adjacency bonuses, enchantments and tempering keep their existing rules.
- Updated item descriptions, connection lines, recipient inspection notes, class descriptions and battle status to distinguish adjacent haste from class haste.
- Validation: automated ordinary/signature/affix activation checks, recipient geometry, no self/diagonal/stash benefits, overlapping sources/class haste, refresh/caps, expiration, legacy timer defaults, battle reset and existing game regression checks. Further balance tuning requires playtesting.

## 0.20.3 — 2026-10-20

- Healing consumables now wait until health is at or below 50% before activating, including signature consumables and consumables with an active healing affix. Repeating healing equipment and non-healing consumables keep their existing behavior.
- Waiting preserves a ready cooldown, mana and stack uses. Every copy rechecks health, so a heal that raises health above the threshold pauses the next copy until needed.
- Added the activation rule to item descriptions, including catalogue and inspection text. Kept healing amounts, cooldowns, stack limits and per-battle refresh unchanged.
- Balance rationale: 50% is an initial safety threshold; a strict 25% trigger may be too late for small heals against burst damage. Further balance tuning requires playtesting.
- Validation: automated full-health and exact-boundary checks, ordinary/signature/affix paths, resource preservation, stacked copies, real battle ticks, battle refresh and existing regression checks.

## 0.20.2 — 2026-10-20

- Clicking another packed item while an item is selected now cancels the current selection instead of selecting the item underneath. Neither item moves; this also applies when placing from the stash.
- Compatible consumable stacks still merge. Clicking gear with nothing held still selects it; hover inspection remains available.
- Validation: automated pointer interaction checks for occupied targets, unchanged item positions, stash-to-pack cancellation and stack merging; JavaScript syntax and stack/adjacency and shop regression checks.

## 0.20.1 — 2026-10-20

- Fixed repeat clicks failing to deselect backpack and stash items. Click selection now runs once; dragging starts only after the pointer moves past the drag threshold.
- Hovering or focusing packed and stashed items now updates Item inspection without selecting or moving them. Details remain visible when moving into the inspection panel.
- Discard and split actions target the item displayed in inspection, even when a different item is selected for placement. Live stack and signature counters follow the inspected item.
- Preserved drag rotation, anchored placement, drop-to-release selection and stack merging. Added Space-key selection alongside Enter.
- Validation: automated DOM interaction checks for mouse/touch/keyboard toggles, hover/focus, inspection actions, drag/rotation/release and Escape; JavaScript syntax and existing game regression checks.

## 0.20.0 — 2026-10-20

- Added explicit difficulty scaling for all 35 dungeons: Beginner, Standard, Advanced, Exaltation and Apex Exalt. Previously dungeon identity did not affect base stats.
- Dungeon tier now scales enemy health, attack damage, attack rate and gold in addition to depth, run mode and encounter type. Cult/Nest/Fungal are lower-end exalt choices; Shatters/Oryx are apex choices.
- Removed unrelated secondary mechanics from Beginner bosses, gave key exalt bosses thematic second phases, and prevented rapid Hexer attacks from maintaining near-permanent silence.
- Added readable skull markers with text labels to portal choices, the current dungeon, the route map, path selection and the bestiary. This custom /5 scale is not DECA's official /10 rating.
- Portal offers now include clear risk choices: two Beginner and one Standard in Act 1, Standard/Advanced choices in Act 2, and Advanced/Exaltation/Apex choices in Act 3.
- Existing saves upgrade current/future rooms and all future branch previews to the new tuning without changing encounter IDs, selected paths or item progress.
- Made Pages artifact names unique per retry attempt so a failed publish can be retried without duplicate-artifact conflicts.
- Validation: full dungeon coverage, matched-depth comparisons, reward scaling, portal bands, all run modes, saved branches, playable openings and upgraded-build simulations, plus existing mechanics/event tests.

## 0.19.0 — 2026-10-20

- Added the Runeforge Altar: sacrifice one copy of an item to improve a different piece of equipment for the current run. Choose primary infusion or cooldown tempering, with an exact preview before committing.
- Donation rarity grants +8/10/12/15% primary effect (30% cap) or +4/5/6/8% cooldown reduction (shared 20% tempering cap). One sacrifice per visit.
- Added the Salvage Merchant: sell packed or stashed items, one copy or a full consumable stack, at visible prices. Multiple sales are allowed per visit.
- Both events protect the last damage source, preserve existing saves, and reject stale or repeated actions. Added themed pixel scenes and visible recipient infusion notes.
- Validation: trade accounting, caps, stack handling, preview/commit guards, save recovery, primary combat effects, existing events, artwork coverage and JavaScript syntax.

## 0.18.1 — 2026-10-20

- Replaced oversized shop item panels with compact offers and separate Inspect/Buy actions. Full item details appear only when requested.
- Widened the desktop shop, added responsive offer columns and compacted its header art and footer.
- Enlarged adjacency text to 16–18px, shortened bonus descriptions and moved common placement rules into an expandable section.
- Shortened active connection labels and tightened inspection spacing; collapsed stack rules and hid the split button for single copies.
- Validation: JavaScript syntax, shop inspection/purchase guards, stack/adjacency behavior, event artwork and changelog checks.

## 0.18.0 — 2026-10-20

- Added distinct pixel scenes for all 25 noncombat events, plus rest stops and shops. Scenes use themed native characters, props and scenery instead of emoji artwork.
- Replaced 78 mismatched combat encounter identities and sprites, including fishing rewards, internal anchors, dispensers and furniture. Kept encounter IDs, combat profiles, rewards and numerical tuning unchanged.
- Updated dungeon portal artwork and existing saved routes to use the corrected encounters.
- Added repository instructions requiring a changelog entry in every future game update, plus a read-only CI check to enforce it.
- Validation: JavaScript syntax, stack/adjacency behavior, event artwork coverage, encounter mechanics preservation and event regressions.

## 0.17.1 — 2026-10-20

- Removed nested and horizontal scrollbars from the sidebar map and spaced the legend in two columns.
- Migrated deployment from the ZIP to editable files in `game/`; retained the ZIP as a backup.

## 0.17.0 — 2026-10-20

- Added ten adjacency bonus rules with inspection descriptions and connection markers.
- Added stacks of up to five identical single-use items, automatic merging, splitting and remaining-use badges.
- Preserved saved runs and the existing refresh-between-battles consumable behavior.

## 0.16.0 — 2026-10-19

- Added a compact loot-choice grid and separate Inspect view.
