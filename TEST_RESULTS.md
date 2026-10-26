# Test results — Color Vision BD (2026-10-26, 11:00 slot)

## Unit tests: 19/19 passed (`node tests/logic.test.js`)

Hand-verified values (all computed by hand first, then asserted):
- Protanopia red (255,0,0) -> [145,142,0]
- Deuteranopia green (0,255,0) -> [96,77,77]
- Tritanopia blue (0,0,255) -> [0,145,134]
- Achromatopsia red -> grey 76 on all channels
- Normal identity; unknown mode falls back to normal
- White stays white and black stays black under all 8 modes
- Hex round-trip #e11d48; simulateHex protanopia red = #918e00
- Contrast black/white = 21; same colour = 1
- Deuteranopia red/green: #ff0000 -> #9fb300, #00ff00 -> #604d4d;
  contrast 2.9139 -> 3.3466 (simulation can raise as well as lower contrast;
  an earlier test asserting it always drops was wrong and was corrected,
  not the app)
- simulateImageData transforms RGB and leaves alpha untouched

## Smoke tests: 12/12 passed (`node tests/smoke.mjs`, headless Chromium)

Title + 8 mode options render; default mode deuteranopia; simulated canvas
pixels differ from the original; achromatopsia renders grey pixels; pair
checker shows both contrast values; invalid hex shows an error and a valid
hex clears it and updates the swatch; slider view shows the compare range;
Bengali toggle changes the title; mode + language persist across reload;
390 px mobile has no horizontal overflow; zero console errors/page exceptions.

## Source hygiene

All source files are pure ASCII (Bengali strings are \u escapes in JS);
verified with `grep -P '[^\x00-\x7F]'` returning no matches, so the
ASCII-safe push path cannot corrupt text.

## Repairs

- 1 test correction (contrast-direction assumption above); 0 app bugs found.
- Em-dash characters replaced with hyphens to keep sources pure ASCII.
