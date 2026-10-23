# Dungeon battle floors — 0.31.3

Every one of the 35 dungeon IDs has an original SVG pixel floor in `game/assets/floors/`. Themes include sand, forest ground, webs, scales, honeycomb, crypt stone, runes, lava, wood, drains, candy tiles, coral, ice, crystals, organic veins and metal plates. Related dungeons may share a material pattern with distinct palettes.

`game/battle-floors.js` owns the dungeon-to-floor mapping, palette and material definitions. A room's actual encounter dungeon takes priority over the current act, which keeps sandbox encounters accurate. Noncombat rooms use their explicit dungeon or the current act. Unknown dungeon identities fall back to the existing vault floor. Loading a saved run derives the floor again rather than storing presentation state in the save.

The arena sets a background URL and edge color only when its floor changes. Rendering does not generate art, consume random numbers, recreate fighter nodes or add animation/timers. The floor is a cached, repeating 192×128 image. Neutral shading and text shadows keep combat information readable; inventory backgrounds and combat mechanics are unchanged.

To rebuild the assets from the palette/material definitions:

```sh
node scripts/generate-dungeon-floors.cjs
```

Validation: all 23 game regression suites; all 350 encounter-to-floor mappings; XML parsing of all 35 SVGs; and 210 browser battle views across 35 dungeons, three viewport sizes and two text modes. Browser checks also cover image loading, practice encounters, selected portals, save/reload and stable repeated application. Run the visual checks with Playwright and a Chromium executable:

```sh
REALMPACK_CHROME=/path/to/chromium node scripts/check-battle-floors.cjs
```
