# RealmPack — The Shattered Vault

A Realm-inspired inventory auto-battler. Browser release 0.30.0: 19 classes, dungeon progression, branching maps, enchantments, ten additional adjacency rules, and single-use stacks of up to five.

## Play

https://maniacgames.github.io/realmpack/

The stash holds nine slots in all modes; consumable stacks hold up to five copies per slot. Existing saves above the limit retain their items but must reduce the stash before the next battle.

The Supply Caravan lets you buy one or two exact copies for an owned consumable stack, up to five. One purchase per visit; depth 3 of new runs guarantees a visit. Each copy costs 60% of its item price, rounded up, with an eight-gold minimum.

## Playfield and controls

All 19 classes appear together in a compact roster. Hover, focus or tap one to preview its health, description, equipment and passive, then press Start.

The playfield fits the viewport. Backpack cells and stash slots grow to use available space, with larger sprites, while keeping 30 backpack cells and nine stash slots. Desktop shows combat, backpack and stash together, with Item / Journal tabs on the right. Smaller screens use Battle / Pack & stash / Details tabs, and a Menu for reference/settings. Hover or focus your character sprite for class description and passive rules, or the enemy sprite for encounter mechanics and dungeon difficulty; click/tap pins either panel. The compendium and bestiary use dense result grids with one pager, direct page jumps, fixed search/filters and Inspect views that preserve your place. Other long content uses Previous/Next pages instead of scrolling. Run Map is a single weathered parchment sheet with its entire act route, legend, difficulty and Return control visible together. See [layout and browser validation](docs/screen-layout.md).

Hover a backpack item and press **S** to stash it; with nothing hovered, S uses the selected backpack item. This only works during preparation, respects the nine-slot stash and stack limit, and never equips an item from the stash. R rotates selected gear. Drag and drop still works in both directions.

## Specialist shops

Thirty named merchants cover every weapon, ability and armor family, plus rings and consumables. Shop selection favors native equipment (70%) and shared items (25%), with 5% off-class specialties. Each shop stocks only its specialty; Alchemists include health/mana potions and favor eligible owned consumables. Each visit includes one free stock refresh, keeping the same specialty; its used limit survives reloading. See [shop rules, save behavior and validation](docs/specialist-shops.md).

## The Dagger Update

All 55 supplied dagger requests are implemented, including upgraded Shiny versions, initial enchantments, temporary exclusions and save-safe duplicate removal. See [the complete recipes, interpretations and measured balance feedback](docs/dagger-update.md) and [before/after results](docs/dagger-balance-results.json). Approved follow-ups nerf Evergreen, Toxic Toad and Chain Dagger; the report distinguishes historical measurements from the current recipes.

## UT and ST identities

24 UT names now use researched RotMG-inspired signatures, and 24 ST pieces form six sets with visible 2/3/4-piece bonuses. Existing duplicate and Shiny counterparts inherit the same identities. See [profiles, source references and adaptation limits](docs/ut-st-identities.md). Other imported UT/ST items retain their existing family rules.

## Class and item balance

Tiered equipment now follows consistent family progression, and class passives have clearer roles and limits. See [balance rules and benchmark results](docs/class-item-balance.md). The canonical item rules are in `game/item-balance.js`; `game/catalogue.js` preserves imported identities. Run `node scripts/benchmark-balance.cjs` to compare all 19 classes with legal tiered builds.

## Dungeon difficulty

All 35 dungeons use a custom five-tier difficulty scale with skull markers. See [dungeon balance](docs/dungeon-balance.md) for the tiers, scaling, research references, saved-run migration and validation limits.

## Release notes

See [CHANGELOG.md](CHANGELOG.md) for each release. Every future game update must include its release notes in the same commit; repository instructions and a read-only GitHub Actions check enforce this.

## Source and deployment

The editable HTML, JavaScript, CSS, item catalogue, sprite sheets and font are in `game/`. Edit the relevant files there, commit and push to `main`. GitHub Actions checks JavaScript and the stack/adjacency behavior, then publishes `game/` directly to GitHub Pages.

No ZIP upload or package installation is required. Update the version query strings in `game/index.html` after changing browser scripts or styles to refresh cached files. Check **Actions → Deploy RealmPack** for the result.

The root `realmpack-web.zip` is a retained 0.17.1 backup and is no longer used for deployment. Its original individual sprite PNGs remain available there; the live game renders the three shared sheets in `game/assets/sheets/`. Paths stored in the sprite registry and catalogue identify sprites within those sheets.

## Local preview and checks

From the repository root, run:

```sh
python -m http.server 8000 --directory game
```

Open http://localhost:8000. With Node.js 24, run:

```sh
node --check game/game.js
node game/tests/test-stacks-adjacency.cjs
```

Progress is stored in the browser on the game's origin. This migration keeps the existing Pages URL and save key. Saves from other hosts do not automatically migrate; desktop saves are separate.

## Credits

Unofficial fan project. The header/browser icon uses the [Vault Chest Unlocker sprite](https://realm.wiki/item?id=811), saved as `game/assets/vault-chest-unlocker.png`. Names and sprites originate from realm.wiki / Realm of the Mad God. ChronoType was supplied by the project owner. Gameplay effects and balance are custom adaptations. This repository does not grant additional rights in third-party assets.

Enchanter rules, dust costs and save compatibility: [enchantment guide](docs/enchantments.md).
