# RealmPack · Phaser 0.5.4

The Phaser edition is the live game at https://maniacgames.github.io/realmpack/, using the same shared item and combat simulation as classic RealmPack 0.53.3. Production is built from `main`; `phaser` remains the development branch.

## Easiest way to play

Download **realmpack-phaser-preview** from the latest successful **Check Phaser prototype** run in GitHub Actions. Extract the entire ZIP, then on Windows double-click **START-REALMPACK.bat**. The launcher starts a local server in the correct directory and opens the game in your browser. Keep that window open while playing; Ctrl+C stops it.

The launcher needs **Python 3 or Node.js**. On other systems, run `python3 launch.py` or `node launch.cjs` from the extracted folder. Close an older preview server first if you want to keep using the same browser save origin. The launcher selects another free port if necessary.

Do not double-click `phaser/index.html`: the game loads textures over HTTP. Keep the extracted `game` and `phaser` directories together. The ZIP includes everything required by the game; it does not use a Phaser CDN.

## Develop from source

Install Node.js 24, download or clone the **phaser** branch, then run from the repository root:

```sh
cd phaser
npm ci
npm run dev
```

Open **http://127.0.0.1:4173/phaser/**. `npm run build` creates the portable preview in `phaser/dist`, including the launchers and engine license.

## Playable features

Backpack and stash grids grow with desktop space. The main progression button sits below the stash when desktop space permits, and stays in the bottom action bar on smaller screens.

Item tiles show numbered base-stat icons: crossed swords for damage, grey shields for block, hearts for healing and blue crystals for mana. Status icons use their own colours and shapes; percentages and seconds are marked explicitly. Hover for the base-value readout; F opens special effects and modifiers.

- All 19 classes, the existing difficulty settings, normal dungeon runs and Sandbox equipment/encounter tools.
- Five dungeons with eight rooms each, connected route choices, dungeon portals, bosses, permanent blessings, victory/defeat and endless continuation.
- The 6×5 backpack, nine-slot stash, consumable stacks, drag placement/stacking, rotation, inspection, upgrade targeting, confirmed discard and a drag-to-discard area in the stash.
- Automatic combat at 1×, 2× and 4× with the original UT/ST, enchantment, adjacency, consumable and class rules.
- Framed dungeon battlefields, larger health displays, separate mana/block meters, enemy/player effect indicators and restrained hit feedback.
- A desktop adventurer/run panel, artwork-led item inspection, rarity-tinted inventory tiles and matching shop/reward/event cards.
- Specialist shops with class-weighted stock, one free refresh, purchases and healing. Loot and post-battle supplies remain explicit choices.
- Noncombat encounters, item sales, sacrifices, supply restocking and enchanting, including locked modifiers and paid-roll Keep/Replace decisions.
- Searchable item catalogue and bestiary with availability filters and full item/encounter information; an ink-and-parchment route map with clear connections, a room-name readout, map key and landscape orientation.
- Themed event dioramas, compact offer/trade layouts and a fixed action footer. Continue stays prominent; Inventory is a secondary utility.
- Optional contextual hints with arrows/highlights, remembered dismissals and a Menu option to replay them.
- Adventure, Settings and Save & backup menu tabs, keyboard tab navigation and desktop Map/Items/Bestiary shortcuts.
- Sound effects with saved master/interface/combat volume and mute, effects-quality settings and larger text.
- Independent campaign autosaves plus JSON export/import backups. Combat lab remains available in Menu for isolated single-encounter tests.

**Inventory** closes a decision view without skipping it. You can arrange gear, then press the main Continue button to return to that reward, shop or event. Pending paid enchantment rolls must be kept or replaced before inventory editing is allowed.

## Saves and recovery

Dungeon runs use **`realmpack-phaser-v1`**, separate from the classic game's `realmpack-v4` slot. They autosave between actions, including route choices, shop stock, pending supplies and paid enchantment rolls. An interrupted battle restarts from the last saved preparation state; this is not an exact mid-frame combat resume.

Use **Menu → Save & backup → Export run** to keep a portable JSON backup. Import asks before replacing the current Phaser run. Existing version-4 RealmPack run JSON objects are also accepted when they pass the save validation; this is an explicit import, not an automatic read of the production slot.

Browser storage is specific to the browser and origin, including the local port. Export/import lets you move a run between browsers, machines or ports. Combat lab sessions do not overwrite a saved campaign. Choose **Menu → Resume saved dungeon run** to return to your campaign without reloading.

## Controls

| Action | Control |
| --- | --- |
| Select / deselect | Click an item again |
| Inspect / full details | Hover or select, then **F** / Full details |
| Move / stack | Drag to a free backpack space, matching stack or stash |
| Rotate gear | **R** on hovered/selected gear or while dragging; right-click, tile ↻ or Rotate button |
| Stash backpack gear | **S** uses hovered gear first, then the selection; Stash uses the selection |
| Discard selected gear | **D** / Discard; confirmation required |
| Item catalogue / bestiary | **I** / **E** |
| Cancel selection / menu / close view | **Esc** |
| Pause battle | Open Menu, inspection or a reference view |

On narrow screens, use Backpack/Stash tabs and the action buttons. Full decision/inspection views can scroll internally on small displays; the combat/inventory playfield stays within the viewport. Gameplay hints point to the relevant control with an arrow and highlight. They do not pause battles. Use **Menu → Settings → Gameplay hints** to hide them or **Settings → Show hints again** to replay them. Hint preferences are saved separately from your run.

S only moves gear from backpack to stash. Hovering stash gear will not move another selected item, and a full stash preserves your selection. Shortcuts stay inactive while typing; S also ignores an active drag.

R uses the item under your pointer first, then the selection. Rotation keeps the item selected and nudges it into nearby free cells when needed. You can also right-click or tap the selected tile’s ↻ control. During a drag, R rotates the preview; releasing over a valid space commits it, and Escape or an invalid drop restores the original placement. Dragging from stash shows the full equipment footprint.

Active connections have coloured arrows above the tiles on desktop and mobile. Arrows point from the source to the item receiving the effect. Hover/select an item to highlight its connections; Full details explains each effect. Stash gear has no active connections.

## Architecture

`core-files.json` lists the original simulation modules in dependency order. Their existing headless mode suppresses the old DOM renderer, boot and timer-driven presentation. `src/model.js` provides an adapter, captures decision views and owns the independent save slot. Phaser advances the original `tick` implementation in fixed 50ms steps; no second damage/cooldown/balance system is maintained.

- `src/scene.js`: Phaser arena, sprite frames, themed floors, effects, inventory input, cooldown bars and item inspection.
- `src/model.js`: campaign/lab lifecycle, inventory commands, save validation and simulation/view adapter.
- `src/campaign-ui.js`: accessible native dialogs for the existing campaign choices and reference templates.
- `src/app.js`: launch, settings, shortcuts, pause behavior, audio and import/export.
- `src/guides.js`: contextual arrows/highlights and independent hint preferences.
- `scripts/`: local server and portable build; `launch/`: preview launchers.

The arena and inventories are Phaser game objects. Decision screens deliberately reuse the original templates inside accessible HTML dialogs. Further migration can replace those templates or extract the headless simulation boundary without changing balance. This release does not claim that every interface has been rewritten as a canvas scene or that busy late-run performance is already benchmarked.

## Verification

```sh
npm run check
npm test
npx playwright install chromium
npm run test:browser
npm run build
```

`REALMPACK_CHROME=/path/to/chrome` selects an existing Chromium executable. `REALMPACK_BUILT=1` runs browser tests against the packaged output. Tests start and stop their own local servers.

Model tests cover all class loadouts and dungeon choices, inventory rules, exact seeded combat parity at 1×/2×/4×, scripted progression through all five dungeons, supplies/blessings, paid-roll recovery, merchant transactions and production-save isolation. Scripted victories exercise progression; they are not a new balance benchmark.

Browser tests exercise actual mouse/touch dragging, discard cancellation, save/reload, purchases and refresh, route choices/maps, event offers, special services, paid enchanting, searchable references, sound controls and responsive views. Additional hint checks cover 140 context/viewport combinations, larger text, uninterrupted combat, remembered preferences, keyboard guards and returning from lab to campaign. Rotation/link checks cover real rotated drags, atomic commit/cancel, blocked drops, hover/right-click/touch controls, stash footprints and directional markers across six sizes. Development-branch CI checks source and built output in parallel and publishes a preview artifact. The production Pages workflow builds from main, checks the packaged browser suite and project-relative paths, then deploys phaser/dist.

Realm of the Mad God artwork attribution remains in the shared catalogue. Private fan game.
