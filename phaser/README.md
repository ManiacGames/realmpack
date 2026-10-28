# RealmPack · Phaser prototype 0.1.0

This is the first playable migration slice on the **phaser** branch, based on RealmPack 0.53.3. The original `game/` release and production GitHub Pages deployment remain separate.

## Run it

Install Node.js 24, download or clone the **phaser** branch, then run these commands from the repository root:

```sh
cd phaser
npm ci
npm run dev
```

Open **http://127.0.0.1:4173/phaser/**. Keep the terminal running. Opening the HTML file directly is unsupported because Phaser loads textures over HTTP.

For a portable static build, run `npm run build`. Serve the resulting `phaser/dist` folder using any static HTTP server. It contains the engine, shared simulation files, sprites and font; no CDN is required. Keep the `game` and `phaser` folders together inside that output.

Every push to this branch runs **Check Phaser prototype** in GitHub Actions. A successful run includes a downloadable **realmpack-phaser-preview** artifact containing that static build. It does not publish over the live game.

## What is playable

- Original pixel artwork, font and green/gold visual palette, rendered using Phaser 3.90.0.
- All 19 class loadouts and 35 dungeon choices, using a real generated opening combat encounter.
- The 6×5 backpack, nine-slot stash, shared placement rules, rotation, matching consumable stacks, selection and confirmed discard.
- Mouse/touch dragging, a placement preview, return on an invalid drop, item inspection and full details. Narrow screens use Backpack/Stash tabs and action buttons.
- Automatic battles at 1×, 2× and 4×, health/mana/block information, item cooldown bars, hit flashes and victory/defeat screens.
- One real item reward after victory, followed by another bout against the same encounter. Retry restores health and resets combat effects so this can serve as an inventory/combat test lab.

**This is a combat lab, not the full campaign.** Routes, portals between dungeons, shops, events, catalogue/bestiary screens, sound controls and campaign save migration are not implemented in the Phaser interface yet. Generated combat supply rewards and normal room advancement are not offered by this first prototype. The original simulation still applies item effects and class passives; some effects do not yet have dedicated visual indicators.

This version deliberately does not load or save runs. It never reads or writes the production `realmpack-v4` slot. Shared visual-quality preferences may be read by the legacy modules.

## Controls

| Action | Control |
| --- | --- |
| Select / deselect | Click an item again |
| Inspect | Hover or select; Full details button / **F** |
| Move / stack | Drag to the backpack or stash |
| Rotate selected item | **R** / Rotate button |
| Move selected backpack item to stash | **S** / Stash button |
| Discard selected item | **D**, then confirm |
| Cancel selection / open menu | **Esc** |
| Pause battle | Open Menu or item details |

Menu lets you choose a class and dungeon for a fresh test. Starting a new test is disabled during combat. After winning or losing, prepare another bout first. Letter shortcuts ignore typing fields and modifier keys.

## Structure and migration boundary

`core-files.json` lists the existing simulation modules. The prototype loads them in their established dependency order with `window.__TEST__ = true`. That existing headless mode suppresses the legacy DOM renderer, boot and modal system. `src/model.js` disables the old save function, exposes a small adapter and immediately clears the original combat interval after a fight starts. Phaser then advances combat in fixed 50ms steps using the original `tick` implementation. No second copy of damage, cooldown, item, class or adjacency formulas is maintained.

- `src/model.js`: simulation adapter and inventory commands.
- `src/scene.js`: sprite atlas frames, canvas inventory, pointer handling, stable HUD nodes and restrained visual feedback.
- `src/app.js`: launch, accessible HTML toolbar/dialogs, shortcuts, results and pause behavior.
- `scripts/serve.cjs`: local development/static-build server.
- `scripts/build.cjs`: reproducible self-contained static output, including Phaser's license.

The headless flag is a temporary migration bridge. A later step should extract a proper renderer-independent simulation module and replace this flag with an explicit presentation interface. Native HTML controls/dialogs are intentionally retained for accessible keyboard controls; the arena and inventory are actual Phaser game objects.

## Checks

```sh
npm run check
npm test
npx playwright install chromium
npm run test:browser
npm run build
```

Use `REALMPACK_CHROME=/path/to/chrome` to select an existing Chromium executable. `REALMPACK_BUILT=1` makes the browser check serve the built output instead of development files. Browser tests start and stop their own local server.

Model checks cover every class and dungeon, collision/stack rules, stash capacity, battle locks, rewards and retries, exact seeded state parity with the original simulation at all three speeds, and production save isolation. Browser checks exercise real Phaser pointer drags in both directions, stable hover nodes, inspection and cancellation, combat pause/results, desktop/phone/landscape bounds and class/dungeon selection. Passing these checks does not establish that Phaser is faster; profiling busy late-run loadouts is a later milestone.

## Next migration steps

1. Add saved-state fixtures with busy UT/ST loadouts and compare frame times with the original renderer.
2. Extract the simulation boundary, preserving seeded parity and original save compatibility.
3. Port route choice, rewards/supplies, shops, events and the item/bestiary reference views.
4. Add independent prototype saves, save migration, sound and the remaining combat indicators.

Realm of the Mad God artwork attribution remains in the shared catalogue. This is a private fan prototype.
