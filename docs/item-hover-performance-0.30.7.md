# Item hover performance — 0.30.7

Hovering rebuilt the inspection panel, then its generic paginator inserted individual blocks, forced layout, hid earlier blocks and forced layout again. Oversized explanations repeated this for nested blocks and sometimes individual words. Combat animations and a crowded backpack made these synchronous measurements especially expensive.

The item inspector now lays out all blocks together and reads their heights without interleaved DOM writes. Oversized containers are split in batches, preserving their contents and styles. Page assignment uses the measured sizes. The inspector uses a non-shrinking flex column so vertical margins have predictable measurements. Other paginated panels retain their existing algorithm. Very short inspector pages retain the original word-splitting fallback.

## Matched crowded-pack test

`profile-item-hover.cjs` loads the same seeded 30-item build as the combat profiler at 1366×768, dispatches 30 item hover events and advances combat by 0.2 simulated seconds per event (a 4× tick). A 35 ms wait after each event gives inspection pagination a chance to run; faster synthetic input would cancel pending pagination and conceal its cost. This is a stress fixture, not a frame-rate or production-timer benchmark. Measurements are from headless Chromium on this machine; browser and hardware results vary.

| Metric | 0.30.6 | 0.30.7 |
| --- | ---: | ---: |
| Total inspector pagination | 18,350 ms | 631 ms |
| Average pagination per hover | 612 ms | 21 ms |
| Browser layout recalculations | 1,093 | 101 |
| Total browser task time | 19.66 s | 2.06 s |

Pagination cost fell about 96.6%. Full raw measurements are in `item-hover-performance-0.30.7-results.json`. Cycle timings include the intentional wait and must not be interpreted as frame times.

## Validation

- `check-item-hover.cjs`: 60 inspection views / 290 pages, five viewport sizes including 700×400, ordinary/signature items, normal/larger text, text preservation, page fit, no document scrolling, three layouts for a fresh crowded-pack hover, and unchanged inspection DOM/state on repeated stationary hovers.
- `check-viewport.cjs`: 102 views / 272 pages across six sizes, larger text and keyboard stash.
- `check-inventory-drag-performance.cjs`: input coalescing, reused preview, rotation/drop/cancel, and zero inspection/pagination rebuilds while dragging.
- `check-combat-performance.cjs` against 0.30.6: exact state/log parity at 1×/2×/4× plus effects, cache and journal checks.
- JavaScript syntax and all 17 game regression scripts passed.
- Inspected a desktop combat screenshot with the crowded backpack and paginated inspector.

Reproduce with Playwright available and `REALMPACK_CHROME` pointing to Chromium. `REALMPACK_PROFILE_URL` can point the hover profiler at a previous build. `REALMPACK_BASELINE_URL` selects a comparison build for the combat parity check.
