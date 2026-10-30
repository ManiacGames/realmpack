# RealmPack — The Shattered Vault

A Realm-inspired inventory auto-battler with 19 classes, five-dungeon runs, branching routes, shops, events, enchantments and spatial item synergies.

## Play

**[Play RealmPack](https://maniacgames.github.io/realmpack/)** — Phaser 0.5.9 is the default edition. The entry URL redirects to the packaged Phaser game.

The [classic 0.53.3 edition](https://maniacgames.github.io/realmpack/game/) remains available. Its exact pre-launch source is preserved on branch `classic-0.53.3-before-phaser`.

## Saves

Phaser and classic use separate save slots. To move a local Phaser run to the hosted game, export it from **Menu → Save & backup**, then import it on the hosted page. Each browser origin has its own storage.

## Development

See [Phaser instructions](phaser/README.md), [Phaser release notes](phaser/CHANGELOG.md) and the [historical changelog](CHANGELOG.md).

`main` is the production source. GitHub Pages builds `phaser/dist` and runs shared simulation checks, Phaser tests, browser regressions and a project-path smoke test before deploying. Keep this Pages workflow when promoting future work from the `phaser` development branch.

To run locally:

```sh
cd phaser
npm ci
npm run dev
```

Open http://127.0.0.1:4173/phaser/.
