# Consumable rework — 0.31.0

Consumables are finite resources. A stack holds five copies; each activated copy is permanently removed after the encounter ends. Unused copies remain. Multiple waves count as one encounter. Ordinary supplies may spend several copies during combat; other new effects spend at most one copy from each stack per encounter, with additional duplicate-effect limits below.

## Supplies and rewards

| Supply | Effect | Trigger |
| --- | --- | --- |
| Health Potion | Heal 25 | At 50% HP or lower |
| Greater Health Potion | Heal 50 | At 50% HP or lower |
| Magic Potion | Restore 6 mana | At least 6 mana missing |
| Greater Magic Potion | Restore 12 mana | At least 12 mana missing |

Every combat victory grants one Health and one Magic Potion separately from the normal loot choice. Difficulty levels 4–5 (Exaltation and Apex Exalt) grant Greater supplies. These merge into compatible stacks where possible. Overflow stays in a saved reward queue. The reward screen lets you discard an item with confirmation, claim supplies, return to normal loot, or explicitly leave supplies behind. Stash capacity remains nine items. A normal loot choice cannot be collected twice.

## Permanent stat potions

These improve gear for the remainder of the current run. Pack a potion beside its target on a shared edge, then choose the target in inspection. The first eligible neighbor is the default. An explicitly chosen target must remain adjacent. A potion is kept if no improvement is possible. Only one upgrade to the same target and upgrade field applies per encounter; Greater potions take priority.

| Stat | Ordinary / Greater | Target and cap |
| --- | --- | --- |
| Attack | +1 / +2 damage | Weapon; total bonus at most 25% of base output, rounded down, with a minimum cap of +2 |
| Defense | +1 / +2 block | Armor; total bonus at most 25% of base block, rounded down, with a minimum cap of +2; armor without native block gains secondary block |
| Dexterity | −0.10 / −0.20 seconds | Weapon cooldown; potion reductions cap at 25% of base cooldown |
| Speed | −0.10 / −0.20 seconds | Armor cooldown; same cap |
| Wisdom | −0.10 / −0.20 seconds | Ability cooldown; same cap |
| Vitality | +5% / +10% passive strength, or −0.10 / −0.20 seconds | Passive rings cap at +25% potion strength; active rings use the cooldown cap |
| Mana | Family-scaled primary potency | Abilities: mana, summons, haste and status effects +1 / +2; other primary effects +2 / +4; cap 25% of base output with at least one potion step allowed. Dodge recharge +5% / +10%, capped at +25% |
| Life | +5 / +10 maximum HP | Player; +60 run-wide potion cap, one per encounter, no free healing |

Cooldown reductions precede existing multipliers and retain existing minimum cooldowns. Upgrades are stored on the item, survive inventory transfers and saves, and are shown in inspection. Replacing or discarding that item loses its upgrades.

## Tinctures and effusions

One strongest effect per stat activates at battle start. Weaker duplicate tinctures/effusions are preserved. Effects last through all waves and are cleared at the end of the encounter. Dexterity grants its haste duration at the opening rather than permanent haste.

| Stat | Tincture / Effusion |
| --- | --- |
| Attack | +2 / +5 primary item damage |
| Defense | +2 / +5 to item-sourced block gains |
| Dexterity | 2 / 4 seconds of haste for all packed items |
| Speed | −0.10 / −0.20 seconds to item cooldowns, capped at 20% of each base cooldown |
| Vitality | +5 / +10 to item-sourced healing |
| Wisdom | +1 / +2 to positive item-sourced mana gains |
| Life | +25 / +50 maximum HP |
| Mana | +10 / +25 maximum mana |

Temporary capacity does not refill resources. Expiration clamps current HP/mana to the lower capacity. Opening stat upgrades and capacity effects precede ring/enchantment opening effects; Ambrosia healing occurs afterward. Healing retains the existing fatigue rules.

## Special consumables

| Item | Behavior |
| --- | --- |
| Ambrosia | At battle start, heal all missing HP; kept when already full |
| Chalice of Ambrosia | At battle start, heal 50% of maximum HP; kept when already full |
| Chaos Cake | One encounter-wide random result: +3 damage, +3 block, −0.10s cooldown, −2 damage, −2 block, or 20% longer cooldowns. One roll per encounter |
| Frost Cake | Freeze near an incoming attack for up to 2s, sharing the existing 2s-per-5s enemy-control budget |
| Enchantment Slot Drop Chance Potion (25%) | Guaranteed +1 slot on a chosen adjacent enchantable item, up to Divine / four slots; the imported item name is retained |
| Loot Drop Potion | Each normal reward slot has a 25% chance to favor UT/ST loot; no extra Shiny chance |
| Loot Tier Potion | Each tiered normal reward has a 50% chance to become a higher available tier in its own family |
| Stat Potion Drop Potion (33%) | Guarantees one additional ordinary stat potion after victory; imported name retained |
| Transformation Potion | After victory, replace the item occupying the bottom-right backpack cell with an available item of the same occupied dimensions; no valid replacement preserves the potion |
| Stat Potion Choice Chest | Open between battles for one random ordinary stat potion. Full stash keeps the chest and its fixed roll until space is available. Discarding it routes to Open |

Loot modifiers and transformation reserve one copy at encounter start and resolve once on the final victory. They do not grant rewards on defeat. Transformation does not remove the last damage source. Old upgrades are not transferred to the replacement.

## Acquisition and existing saves

The obtainable pool contains 46 consumables: four supplies, sixteen stat potions, sixteen tinctures/effusions and ten special items. The remaining 168 are excluded from new loot, shops, events, sandbox acquisition and the compendium. Existing retired copies retain their legacy effects and become finite resources too.

Removed Potion of Health1–6 variants migrate to Health Potions. The Steampunk Epic Quest, Steamworks Compensation and Steamworks Engraving chests migrate to Stat Potion Choice Chests. Stack counts are retained. Old saved shop/reward offers are filtered; pending supplies and item upgrades persist.

## Validation and balance limits

All 21 game regression suites pass, including targeted tests for all stat roles, stack settlement, save migration, wave lifetime, caps, supply overflow/replay protection, chest opening, transformation and retired-item acquisition. JavaScript syntax checks pass. Browser audits exercise 276 consumable inspection views, 98 existing hover views and 50 reward/inspection dialog views at desktop, phone and short landscape sizes, including large text. Actual clicks check target selection, chest opening, confirmed supply discards and save/reload persistence.

The preserved class benchmark completed 1,995 individual fights across 19 classes, 35 bosses and three gear variants, clearing 1,600. This matches the earlier 0.30.14 fixed-build total. See `consumable-rework-benchmark.json` for per-class counts and fixture assumptions. These builds include three Health Potions and an explicit Healing Tome; they do not optimize new stat-potion targets or simulate resource scarcity across a whole run. The result checks broad combat regression, not equality between the 46 consumables or the long-run economy. Full-run supply accumulation, upgrade value and Chaos Cake risk remain playtest questions.
