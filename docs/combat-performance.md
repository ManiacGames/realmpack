# Combat rendering performance — 0.30.5

Measured 2026-10-22 against release 0.30.4 (commit 7383f66136d30eaba99b4a52cf32678822f7f9a4).

| Speed | Mean tick, before → after | 95th percentile tick | Browser layouts | Item activations |
|---|---:|---:|---:|---:|
| 1× | 4.65 → 2.36 ms | 8.80 → 4.20 ms | 195 → 131 | 53 |
| 2× | 4.64 → 2.34 ms | 13.30 → 4.00 ms | 300 → 135 | 113 |
| 4× | 6.12 → 2.45 ms | 18.50 → 4.30 ms | 479 → 156 | 226 |

The same Chromium headless runtime, viewport (1366×768), fixed seed, dungeon and full 30-item backpack were used sequentially. The workload includes haste, four modifiers per item and all six enemy debuffs. Each setting executes 120 simulation ticks of 0.05 × speed seconds, with 16 ms between callbacks to stress rendering. The production timer remains 50 ms. These are instrumented CPU/layout measurements, not FPS claims or guarantees on other machines. Activations and final combat state match the original build at each speed; different speeds retain the game's existing tick-size behavior.

## Changes

- Coalesce simultaneous visual triggers by item per animation frame. Reuse a border overlay and effect label, animate opacity/transform, cancel each tile's prior animation and avoid forced `offsetWidth` reads. Reduced-motion preferences receive a short static indicator.
- Cache item connection graphs during combat using the run, item IDs/types, geometry, rotation and Tactics modifier as the key. Recompute outside combat and whenever the key changes. Combat calculations still use the existing rules directly.
- Keep room/map art and descriptions stable between combat ticks. Dynamic enemy stats, afflictions, cooldowns and player effects continue updating.
- Keep recording the newest 70 journal messages immediately; batch visible journal painting to at most once per 100 ms. Defer hidden journal work until the player opens it.

## Reproduce

Set REALMPACK_CHROME to a Chromium executable with Playwright available, then run `node scripts/profile-combat.cjs`. Set REALMPACK_PROFILE_URL to the original release's local index.html for baseline measurements. Run each profile separately. The raw measurements are in combat-performance-results.json.

`node scripts/check-combat-performance.cjs` compares rendering against the same simulation with presentation disabled and checks cache invalidation, stable map rendering, journal behavior, visual coalescing, expiry and reduced motion. Optionally set REALMPACK_BASELINE_URL to an original build to compare the full original simulation and message history. The release was also checked against all 16 game regressions, combat/debuff layouts and inventory drag performance.
