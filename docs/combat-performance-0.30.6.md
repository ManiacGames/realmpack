# Combat performance — 0.30.6

Measured 2026-10-22 against release 0.30.5, commit fcc7e40eb6c6df1f56fc4c129bb5125837691402. Profiles ran sequentially on the same Chromium headless runtime at 1366×768, with the Full effects setting.

| Speed | Mean tick, 0.30.5 → 0.30.6 | 95th percentile tick | Activations in both builds |
|---|---:|---:|---:|
| 1× | 2.11 → 0.66 ms | 3.30 → 1.10 ms | 53 |
| 2× | 2.16 → 0.68 ms | 3.70 → 1.10 ms | 113 |
| 4× | 2.24 → 0.91 ms | 4.10 → 2.40 ms | 226 |

The fixed-seed 30-item workload includes haste, four enchantments per item and all six enemy debuffs. Each speed uses 120 simulation ticks of 0.05 × speed seconds with 16 ms between callbacks to stress rendering; production still uses its existing 50 ms timer. Initialization is outside the measured loop. These figures measure time inside ticks, not total browser CPU or FPS, and vary by machine.

## Implementation

- Rectangle-edge checks replace repeated occupied-cell array allocations. Non-integer/unplaced coordinates and overlapping rectangles retain the old cell-based behavior.
- Combat geometry validates item identity/order, type, position, rotation, definition shape/group/effect, consumable flag, set/slot metadata and adjacency-rule values once per tick. Neighbours, rule connections, summed bonuses and distinct set slots are cached. Calls outside the simulation tick revalidate direct changes. A finally block clears the tick context after all returns and exceptions. The cache is outside run saves.
- Dynamic health, mana, charges, healing thresholds, haste durations and status conditions remain live. HUD text and inline styles write only when their displayed values change.
- Hidden backpacks skip cooldown/badge/connection work and pulses; returning to the pack refreshes them. Hidden documents skip HUD rendering and cancel pulses; visibility restoration refreshes the display. Combat simulation keeps its existing timing.
- Run menu → Effects quality saves Full / Reduced / Off independently of the run. Full retains animated overlays. Reduced uses short border indicators and static connection lines. Off skips decorative pulses/flashes while keeping status icons, cooldowns and static connection information.

## Validation

- All 1,995 benchmark rows matched the prior build exactly across 19 classes, 35 dungeon bosses and three legal build variants, including win/loss, time, health and enemy health.
- Original-build state and log parity passed at 1×, 2× and 4× in the full-backpack workload. Full, Reduced and Off also produced identical state/logs.
- 20,000 geometry comparisons covered rectangle shapes, rotations, overlap and legacy coordinates. Cache tests cover move/rotation/reorder/add/remove/replacement, definition/rule changes, save isolation, load, reset and exception cleanup.
- Repeated unchanged HUD updates produced zero observed mutations. Tests cover hidden-pack resync, pulse behavior, mobile/landscape settings access, preference persistence and cancellation.
- All 17 game regression scripts passed, plus combat/debuff layouts, inventory drag checks and the dialog audit.

## Reproduce

Use `scripts/profile-combat.cjs` with REALMPACK_CHROME set to Chromium. For the previous build, set REALMPACK_PROFILE_URL to a local 0.30.5 index.html and run separately from other CPU-heavy checks. Raw measurements are in combat-performance-0.30.6-results.json.

Use `node game/tests/test-combat-geometry.cjs`, `node scripts/check-effects-quality.cjs` and `node scripts/check-combat-performance.cjs`. The last script accepts REALMPACK_BASELINE_URL to compare against an original build. Existing `scripts/benchmark-balance.cjs` produced the 1,995-row before/after comparison with identical build assumptions.
