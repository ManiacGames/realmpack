# Novelty quirks — 0.48.0

17 item names gain small utilities after successful activations, including existing Shiny versions with the same name. The code table VANITY_QUIRKS in mechanics-runtime.js is the exact player-facing rule list. These are RealmPack inventions, not claims about RotMG abilities. Base definitions, stats, dimensions, drop exclusions and recipes remain unchanged.

Utilities require the item to be packed and combat active. They use the item’s existing activation counter, reset each battle and retained across waves; failed mana attempts do not advance it. There are no extra item activations or recursive procs. Block and mana use the existing source-aware resource functions. Brilliance’s ward damage cannot spill into HP and honors the reflector ward-break exposure. Bonus hits use ordinary damage modifiers. Novelty passive rings retain their 6-second base cycle even without enchantments. Preparation, stashed items and inspection grant nothing.

Test: test-vanity-quirks.cjs covers 17 × 3 = 51 deterministic combat scenarios and condition boundaries. Existing native tiered/enchantment benchmarks contain no novelty items and therefore assess regression, not novelty build competitiveness. Effects are modest but builds using many duplicates or UT companions are not exhaustively optimized.
