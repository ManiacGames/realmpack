# Specialist shops — 0.23.0

RealmPack has 30 merchants, covering every imported item family: six weapon, 19 ability, three armor, one ring and one consumable specialist. A merchant stocks **only its own type**, with five distinct name/tier offers. Regular stock excludes Shiny, disabled and hidden entries. Cosmetics with the same displayed name/tier cannot crowd out all five offers.

## Selecting a shop

Shop selection first chooses a usefulness bucket, independently of how many items or off-class families exist:

| Bucket | Chance | Families |
| --- | ---: | --- |
| Native equipment | 70% | The class's starting weapon, ability and armor families, equally weighted |
| Shared items | 25% | Jeweler and Alchemist, equally weighted |
| Off-class specialty | 5% | Other weapon, ability and armor families, equally weighted |

Every specialist remains reachable for every class. Shared weapon/armor families are native to each class that starts with them. Shop-family selection uses normal class equipment; existing off-class penalties still follow each offered item's actual class list and remain visible on its card. Within a specialty, compatible definitions retain a 3× selection weight. A large catalogue of foreign abilities cannot overwhelm the 70% native bucket.

Rarity still follows the existing act-based shop weights. If a specialist has no remaining item at a rolled rarity, it uses the closest available rarity within the **same** family. It never fills spare slots with unrelated item types. Item recipes, prices, combat and ordinary battle reward generation are unchanged.

The Alchemist always includes one Health Potion and one Magic Potion offer. For the remaining slots, eligible consumable types owned in a stack below five copies receive 5× item weight. That preference applies within the chosen rarity pool; it is not a guarantee of a specific rare consumable. Normal purchase/merge guards preserve the nine-slot stash cap and five-copy stack cap.

## Merchants

| Category | Types |
| --- | --- |
| Weapons | Dagger, bow, staff, wand, sword, katana |
| Abilities | Cloak, quiver, spell, tome, helm, shield, seal, poison, skull, trap, orb, prism, scepter, shuriken, wakizashi, lute, mace, sheath, sigil |
| Armor | Leather, robe, heavy armor |
| Shared | Rings at The Jeweler; consumables at The Alchemist |

Merchants have individual names and matching class/item sprite compositions. Newly generated route shop rooms reveal the merchant name and specialty before entry. Each offer keeps its compact card and separate full inspection.

## Saves and repeated visits

The route stores a shop's family. On first entry, the save records that visit's specialty alongside its existing stock and healing-purchase state. Reopening the modal, returning from inspection or reloading preserves the merchant, remaining offers and healing limit. Re-entering an active shop cannot restock it or claim Rosebite again.

Old saves already inside a mixed-stock shop keep their offers and purchases. They are labelled “Saved mixed stock”; their next new shop uses the specialist system. Future untyped shop rooms in old saves receive a specialty when first entered, without changing completed routes or rerolling an active shop.

## Validation

`node game/tests/test-shop-specialists.cjs` checks all 30 families for every class across all three acts: 1,710 five-offer stock rolls, family purity, unique offers, exclusions, matching artwork, purchases, save/load/reopen stability and legacy stock. It also performs 190,000 seeded shop selections (10,000 per class), verifying native/shared/off-class bucket reachability and distribution. The fixed seeded trials yielded 69.69% native, 24.95% shared and 5.36% off-class selections for each class. Those observed figures are sampling results; the configured chances remain exactly 70/25/5.

A 2,000-roll consumable comparison found the selected existing consumable 21 times without an owned stack and 116 times with one, consistent with the intended weighting. Basic potions, full-stash purchase safety and ordinary shop/reward inspection are also covered by the regression suite. Existing encounter/art, inventory, event, class, item progression, stacking and dagger checks remain required.
