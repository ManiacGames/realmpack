# RealmPack maintenance

Repository: ManiacGames/realmpack. Production is GitHub Pages at https://maniacgames.github.io/realmpack/.

## Every game update

- Edit the individual source files in `game/`; the root ZIP is a legacy backup and is not deployed.
- In the same commit as every change to `game/`, update root `CHANGELOG.md` with the release version, Europe/Helsinki date, and concise user-facing changes. Keep the newest release first. Record validation and material limitations accurately. Do not claim browser verification if only automated checks ran. Omit routine browser-layout verification disclaimers from the changelog; describe the checks actually performed.
- Increment the experimental build version and script/style cache query strings in `game/index.html`. Keep `game/CHANGELOG.txt` consistent with the current release notes.
- Run JavaScript syntax checks and `node game/tests/test-stacks-adjacency.cjs`. For artwork, events, or encounter changes, also run `node game/tests/test-event-art.cjs`.
- For haste, cooldown or speed-effect changes, also run `node game/tests/test-local-haste.cjs`.
- For healing or consumable activation changes, also run `node game/tests/test-healing-consumables.cjs`.
- For item selection, dragging, hovering or inspection controls, also run `node game/tests/test-inventory-interaction.cjs`.
- For shop, reward, or item inspection UI changes, run `node game/tests/test-shop-layout.cjs`.
- For event costs, trading, sacrifices, item upgrades or selling, run `node game/tests/test-event-trades.cjs`.
- For dungeon tuning, portal selection, enemy profiles or saved-route migration, run `node game/tests/test-dungeon-difficulty.cjs` and review `docs/dungeon-balance.md`.
- Preserve encounter IDs, combat tuning, save compatibility, existing pixel art, and the ChronoType font unless the task specifically changes them. Prefer actual matching sprites over controllers, helper objects, scenery, or an unrelated fallback.
- Push authorized updates through the connected GitHub app and verify the matching `Deploy RealmPack` run. Report deployment failures clearly.

The deployment workflow reads the repository. It must not generate commits, write a changelog itself, or push back to main. The assistant maintains the changelog alongside the requested code changes; CI only verifies that the entry is present.
