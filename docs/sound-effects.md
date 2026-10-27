# Sound effects

Open **Menu → Sound effects** for master, interface/inventory and combat volume, mute, and a test sound. Settings persist on this browser independently of run saves. Sliders support keyboard arrows. Audio unlocks after a click, tap or key press; browsers without Web Audio can still play the game silently.

Cues use short synthesized tones with an attack/release envelope. No external audio downloads or per-frame audio processing are needed. Inventory and transaction hooks play after successful changes; hovering and rejected actions remain silent apart from a button click. Combat includes damage dealt/taken, blocked hits, actual healing and mana gains, battle starts and results. Enchanting and runeforge upgrades have a rising sparkle.

The mixer smooths volume changes, disconnects finished nodes, allows at most eight ordinary oscillator voices, and reserves four more for result fanfares. Combat cues share a 110ms wall-clock interval, plus cue-specific limits, independent of simulation speed. Repeated cues do not queue. Hidden tabs suspend audio; another player interaction resumes it. Sound functions do not consume game RNG or modify run state.

Run `REALMPACK_CHROME=/path/to/chrome node scripts/check-sound-effects.cjs` for gesture unlock, offline audio samples, persistence, mute, rate/voice limits, action hooks, 1×/2×/4× combat parity and responsive volume controls. The dialog audit includes the sound panel.
