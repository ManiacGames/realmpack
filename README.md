# RealmPack — The Shattered Vault

A Realm-inspired inventory auto-battler. Browser release 0.20.2: 19 classes, dungeon progression, branching maps, enchantments, ten additional adjacency rules, and single-use stacks of up to five.

## Play

https://maniacgames.github.io/realmpack/

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

Unofficial fan project. Names and sprites originate from realm.wiki / Realm of the Mad God. ChronoType was supplied by the project owner. Gameplay effects and balance are custom adaptations. This repository does not grant additional rights in third-party assets.
