# Color Vision BD

An offline, bilingual (English / Bangla) colour-vision-deficiency simulator for Bangladesh.

Upload any image (or use the built-in sample pattern) and see it exactly as people
with protanopia, deuteranopia, tritanopia, the corresponding -omaly types, or
achromatopsia would see it. A colour-pair checker shows how two colours look
under the selected vision type and whether their WCAG contrast ratio still
passes AA after simulation - useful for designers, teachers, and anyone checking
whether a poster, slide, or UI stays readable for colour-blind readers.

Live demo: https://fahad3235.github.io/color-vision-bd/

## Features

1. **8 vision types** - Normal, Protanopia, Protanomaly, Deuteranopia,
   Deuteranomaly, Tritanopia, Tritanomaly, Achromatopsia, using the published
   Machado et al. (2009) simulation matrices.
2. **Image simulation** - upload (or drag-and-drop) any PNG/JPG/GIF/WebP image;
   a built-in sample pattern (rainbow stripes + red/green/blue/yellow discs)
   works with no upload at all.
3. **3 comparison views** - side by side, a compare slider, or simulated only.
4. **Download simulated PNG** - save the simulated image with one click.
5. **Colour-pair checker** - two colour pickers + hex inputs, original vs
   simulated swatches, and WCAG contrast ratios before and after simulation
   with an AA (>= 4.5) pass/fail verdict.
6. **Bilingual + Bengali digits** - EN/Bangla toggle persisted in localStorage;
   numbers render in Bengali digits in Bangla mode. Fully responsive to 390 px.
7. **Private by design** - pure static site, zero network requests; no image
   ever leaves the browser (images are not persisted at all).

## Stack

- Pure HTML + CSS + vanilla JavaScript (no frameworks, no build step)
- Pure logic in `js/color.js` shared by the app and the tests
- Tests: node unit tests + headless-Chromium smoke test via raw CDP

## Run locally

Just open `index.html` in a browser, or serve the folder:

```sh
python3 -m http.server 8000
# open http://localhost:8000/
```

## Testing

```sh
node tests/logic.test.js   # 19 unit checks
node tests/smoke.mjs       # 12 headless-Chrome checks (needs /opt/meta-chromium/chrome)
```

## Project structure

```
index.html        page structure
styles.css        layout + responsive rules
js/color.js       simulation matrices, hex/contrast math (no DOM)
js/app.js         UI: upload, sample, views, download, pair checker, i18n
tests/logic.test.js   node unit tests for js/color.js
tests/smoke.mjs       headless-Chrome smoke tests via raw CDP
```

## Limitations

- This is an **educational simulation, not a medical diagnosis**. Real colour
  vision varies person to person; the matrices approximate the average case
  for each deficiency type.
- Simulation runs on sRGB pixel values with no display calibration; results
  may differ slightly across screens.
- The sample pattern and the default colour pair are illustrative only.
- No image is stored: reloading the page returns to the sample pattern.
  Re-upload to simulate again.

## Status

Complete MVP. See `TEST_RESULTS.md` for the verified test numbers.
