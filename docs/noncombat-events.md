# Non-combat encounters — 0.44.0

All 28 encounter IDs and their existing native sprite scenes remain. Twenty-three standard encounters now have distinct services and bargains; their 52 choices use the existing item, potion-upgrade, dust and next-battle systems. The five retained foundations are the Enchanter, Runeforge, Salvage Merchant, Supply Caravan and Mirror Pool. Their guardrails and fallback behavior are improved where needed.

## Encounter roles

| Encounter | Current role |
|---|---|
| Supply Caravan | Restock one exact owned consumable stack. With no obtainable consumables, a six-gold Health Potion starts a stack. Unavailable legacy supplies cannot be duplicated. One purchase per visit. |
| Runeforge Altar | Sacrifice one copy to infuse or temper another item. Inactive passive rings cannot receive useless cooldown improvements. |
| Salvage Merchant | Sell one copy or an explicitly selected whole stack, at the existing source-aware salvage quote. |
| Enchanter | Existing dust, slot, lock and paid keep/replace rules. Pending paid rolls are preserved. |
| Blood altar | Trade current health for weapon infusion, or buy lasting vitality. |
| Wandering healer | Emergency healing now, or a free portable Health Potion for later. Full-health visitors cannot pay for zero healing. |
| Blacksmith | Percentage weapon-primary infusion, or quoted weapon salvage. |
| Runesmith | A bounded Greater Potion of Mana upgrade to a selected ability, or a bottled Magic Potion. |
| Salvage broker | Equipment-only appraisal at a modest 15% salvage premium, capped at 75% of shop price. Potion rarity labels cannot earn equipment payouts. |
| Trapped cache | Pay gold or health for a revealed native gear choice; take coins instead if no item is wanted or no stash slot is available. |
| Wishing well | A shown native relic on success, a Magic Potion on failure. Neither outcome is an empty heal at full HP. |
| Camp cook | Buy a portable Chalice of Ambrosia meal, or take a spare Health Potion. |
| Surgeon | Trade five maximum health for emergency recovery, or buy a Greater Health Potion. Surgery that would heal nothing is blocked. |
| Mana spring | Bottle a Magic Potion for later, or trade health for an opening mana reserve with a cap-aware preview. |
| Sentinel shrine | Consecrate armor-to-weapon shared edges: 12 opening block +4 per pair, at most three pairs. Alternatively take five free opening block. |
| War monument | A bounded flat weapon-damage upgrade, or a health-paid one-battle power oath. |
| Mirror Pool | Copy an unenchanted Common/Uncommon item, preserving its run upgrades; alternatively recover health. |
| Wandering adept | A bounded weapon cooldown technique, or one-battle evasion. |
| Bone-dice gambler | Two disclosed stakes: 20 for a possible 50 payout, or eight for a possible 16. Both use 50% odds; payouts include the stake. |
| Goblin tollbooth | Buy safe passage, barter exactly one consumable, or take the disclosed thorny detour. The detour removes at most eight HP and cannot kill. |
| Cursed armory | Native Legendary gear in exchange for ten cursed maximum health, an unbound relic for gold, or harmless coin salvage. |
| Restless adventurer | Donate equipment for recovery/endurance, or pay to recover tracked cursed-armory health. A spirit may return after a later curse even if seen before. |
| Nexus pilgrim | Revealed native gear that improves by act, an equipment exchange, or travelling money. |
| Curio exchange | Revealed native trade-up or a single-copy exchange for chosen supplies and coins. |
| Sealed library | Research purple enchantment dust, or donate a spare ability manuscript for green/red dust. |
| Abandoned workbench | Block-primary armor receives a Greater Defense upgrade; other armor receives a Greater Speed upgrade. Alternatively consume one field dressing for healing and coins. |
| Moonlit pond | Fish for portable supplies with a useful consolation catch, or share exactly one ration for maximum health. |
| Stranded caravan | Recover native cargo, hire a scout, or accept coin payment without filling the stash. |

## Costs, limits and previews

Generic item costs consume **one copy**, using the same ownership and last-damage-source checks as the merchant. Stacks retain their other copies and upgrades. Preflight accounts for partial stack space as well as genuinely freed stash slots. Capacity failure spends nothing; compatible partial consume-and-refill exchanges work at the nine-slot stash limit.

Infusions share the existing 30% cap. New techniques use existing potion-upgrade fields and caps: weapon primary, ability primary/evasion, armor block, and flat base-cooldown reduction. They do not introduce a new stat system or bypass potion limits. Runeforge tempo and existing saved tempering share the existing 20% cap. Old active trades can still apply their original tempering effect.

Pure healing is unavailable when its actual post-cost recovery is zero. As of 0.45.0, opening mana previews use the fresh battle reserve (10 plus bounded capacity scaling), opening consumable capacity/Wisdom buffs, Reservoir enchantments, existing event mana and the opening ring bonus, then respect capacity. Stored mana from the previous fight does not reduce the usefulness of a spring reward. Opening block, power and dodge quotes also respect their existing limits. A safe-passage purchase can still be made when its extra dodge is capped because avoiding the detour is itself a benefit.

Sales show the exact one-copy quote before committing. Rare broker trades accept equipment rather than consumables, and never exceed the resale ceiling. Runeforge rejects tempo upgrades to passive rings with no active enchantment cycle. Clone rewards preserve potion upgrades as well as infusion, tempering and enchantment capacity.

## Rewards and dungeon context

New gear rewards offer up to two revealed non-Shiny, obtainable items compatible with the current class. Many gear choices improve one quality band per act, capped at Legendary. Fixed-grade armory bargains remain explicit. Selectors update previews without spending resources or rerolling rewards, and preserve the current dialog page. Consumable choices use named supplies rather than an unrestricted catalogue roll.

All 35 dungeon floors map to environment patterns with weighted event themes. A fitting encounter receives four times its base weight; core services retain a modest base weighting. Healing services receive additional weight while badly injured. This is weighting, not a prohibition on travelling vendors in other environments.

The picker checks service usefulness and potential reward capacity, including the matching dust color and minimum fee for an Enchanter. It respects act restrictions, and prefers unseen useful encounters. If all useful events have been seen it can repeat them; the pilgrim remains a final safe fallback. A tracked armory curse permits another spirit visit. Existing committed route nodes and saved lotteries are never rerolled to force a preferable event. A service selected earlier can therefore become less useful after intervening inventory or resource changes.

## Curses and saves

New cursed-armory bargains record the ten maximum health they remove. The restless spirit restores at most ten tracked cursed health per cleansing; unrelated surgery, blood-oath and other maximum-health costs cannot be refunded. The curse appears in encounter wallets and the battle effect summary. An uncured curse lasts for the run.

New visits save a rules version, their actual choices, reward options, selected reward, target selections, consolation rewards and the fixed lottery roll. Reopening or loading does not create a new quote or lottery. Old active visits without a choice snapshot resolve against the retained 0.43 definitions: old costs, offered items and gambling payouts remain. Universal single-copy and no-op protections still apply. Paid Enchanter rolls and existing special trade revisions are untouched.

## Validation

- `node game/tests/test-event-rework.cjs`: 936 choice/act/resource combinations plus targeted checks for stack costs, partial-capacity transactions, no-op payments, upgrade caps, native rewards, deterministic selection, curse recovery, nonlethal detours, actual save/load, stale/replayed actions and legacy visits. Protects the complete imported item-definition hash.
- All 35 `game/tests/test-*.cjs` suites, including event artwork/trades, supply restocking, stash capacity, progression, classes, healing, local haste, enchantments and UT/ST identities.
- `scripts/check-dialog-audit.cjs`: 560 views across five viewport sizes and both text modes, including all events, an empty provisioner, curse cleansing, full-health/full-mana and full-stash cases. Actions and pages remain inside the viewport.
- `scripts/check-event-rework.cjs`: 48 interactive views across desktop, short landscape and phone sizes in both text modes; reward changes, target changes, transactions and leaving. Reward changes preserve RNG, currency and the current page.
- The unchanged seeded `scripts/benchmark-balance.cjs` fixture reproduces **all 1,995 combat result rows exactly** from 0.43.0 (1,578 clears). This verifies that existing combat builds are unchanged when no new event upgrades are acquired; it does not estimate the strength of a complete run with the new event economy.

Prices, upgrade access and event usefulness should still be assessed through full-run play. The fixed combat comparison does not establish equal economic value for every event or optimal build.
