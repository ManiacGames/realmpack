# RealmPack maintenance

Repository: ManiacGames/realmpack. Production is GitHub Pages at https://maniacgames.github.io/realmpack/.

## Every game update

- Before taking baselines in a resumed session, verify the local source matches the current GitHub main build. Sync stale restored checkouts first, preserving intentional local work; do not build a new release on an older snapshot.
- Edit the individual source files in `game/`; the root ZIP is a legacy backup and is not deployed.
- In the same commit as every change to `game/`, update root `CHANGELOG.md` with the release version, Europe/Helsinki date, and concise user-facing changes. Keep the newest release first. Record validation and material limitations accurately. Do not claim browser verification if only automated checks ran. Omit routine browser-layout verification disclaimers from the changelog; describe the checks actually performed.
- Increment the experimental build version and script/style cache query strings in `game/index.html`. Keep `game/CHANGELOG.txt` consistent with the current release notes.
- Run JavaScript syntax checks and `node game/tests/test-stacks-adjacency.cjs`. For artwork, events, or encounter changes, also run `node game/tests/test-event-art.cjs`.
- For item recipes, tier progression or class passives, also run `node game/tests/test-item-progression.cjs` and `node game/tests/test-class-reworks.cjs`. Use `node scripts/benchmark-balance.cjs` to compare all 19 classes with legal tiered builds before major tuning; preserve its build assumptions when comparing releases.
- For UT/ST signatures, set bonuses or their combat state, also run `node game/tests/test-ut-st-identities.cjs` and update `docs/ut-st-identities.md` when changing researched identities.
- For dagger recipes, acquisition rules or dagger combat/event effects, also run `node game/tests/test-dagger-update.cjs`. Keep `docs/dagger-update.md` and its seeded comparison assumptions accurate; preserve requested values unless a new instruction changes them.
- For adjacency changes, run `node game/tests/test-adjacency-rework.cjs`, the seeded `scripts/benchmark-adjacency.cjs` comparison at 1×/2×/4×, and hover/combat presentation checks. Keep `docs/adjacency.md` and its balance fixtures current; protect source ownership, shared caps, recipient roles and fractional budgets.
- For haste, cooldown or speed-effect changes, also run `node game/tests/test-local-haste.cjs`.
- For enchantment or combat timing changes, also run `node game/tests/test-enchantments.cjs`, `node game/tests/test-enchantment-rework.cjs` and the seeded `scripts/benchmark-enchantments.cjs` comparison at 1×/2×/4×. Keep `docs/enchantments.md` and its balance assumptions current; preserve saved modifier values and pending paid rolls.
- For healing or consumable activation changes, also run `node game/tests/test-healing-consumables.cjs`.
- For stash capacity or item acquisition changes, also run `node game/tests/test-stash-capacity.cjs` and `node game/tests/test-provisions.cjs`.
- For item selection, dragging, hovering or inspection controls, also run `node game/tests/test-inventory-interaction.cjs`.
- For shop, reward, or item inspection UI changes, run `node game/tests/test-shop-layout.cjs` and `node game/tests/test-shop-specialists.cjs`.
- For event costs, trading, sacrifices, item upgrades or selling, run `node game/tests/test-event-trades.cjs`.
- For dungeon tuning, portal selection, enemy profiles or saved-route migration, run `node game/tests/test-dungeon-difficulty.cjs` and review `docs/dungeon-balance.md`.
- For dialog layout changes, run `REALMPACK_CHROME=/path/to/chrome node scripts/check-dialog-audit.cjs` with Playwright available. Short dialogs and individual content pages must fit their content; avoid full-viewport height for messages, confirmations and sparse forms. Preserve visible actions and check all pages at phone and short landscape sizes.
- Preserve encounter IDs, combat tuning, save compatibility, existing pixel art, and the ChronoType font unless the task specifically changes them. Prefer actual matching sprites over controllers, helper objects, scenery, or an unrelated fallback.
- Push authorized updates through the connected GitHub app and verify the matching `Deploy RealmPack` run. Report deployment failures clearly.

The deployment workflow reads the repository. It must not generate commits, write a changelog itself, or push back to main. The assistant maintains the changelog alongside the requested code changes; CI only verifies that the entry is present.
