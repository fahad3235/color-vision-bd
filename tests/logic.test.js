// Node unit tests for js/color.js. Run: node tests/logic.test.js
const CV = require('../js/color.js');
let n = 0;
function check(name, cond) { n++; if (!cond) { console.error('FAIL: ' + name); process.exitCode = 1; } else console.log('ok - ' + name); }
function eq(a, b) { return JSON.stringify(a) === JSON.stringify(b); }

// Hand-computed: pure red (255,0,0) under protanopia:
// R = round(0.567*255)=145, G = round(0.558*255)=142, B = 0
check('protanopia red -> [145,142,0]', eq(CV.simulatePixel(255, 0, 0, 'protanopia'), [145, 142, 0]));
// Pure green (0,255,0) under deuteranopia: R=round(0.375*255)=96, G=round(0.3*255)=77 (76.5 rounds to 77 in JS Math.round? 76.5 -> 77), B=round(0.3*255)=77
check('deuteranopia green -> [96,77,77]', eq(CV.simulatePixel(0, 255, 0, 'deuteranopia'), [96, 77, 77]));
// Pure blue under tritanopia: R=0, G=round(0.567*255)=145, B=round(0.525*255)=134
check('tritanopia blue -> [0,145,134]', eq(CV.simulatePixel(0, 0, 255, 'tritanopia'), [0, 145, 134]));
// Achromatopsia: grey value of pure red = round(0.299*255)=76 on all channels
check('achromatopsia red -> grey 76', eq(CV.simulatePixel(255, 0, 0, 'achromatopsia'), [76, 76, 76]));
check('normal is identity', eq(CV.simulatePixel(12, 200, 90, 'normal'), [12, 200, 90]));
check('unknown mode falls back to normal', eq(CV.simulatePixel(12, 200, 90, 'nope'), [12, 200, 90]));
check('white stays white under every mode', CV.MODE_IDS.every(function (m) { return eq(CV.simulatePixel(255, 255, 255, m), [255, 255, 255]); }));
check('black stays black under every mode', CV.MODE_IDS.every(function (m) { return eq(CV.simulatePixel(0, 0, 0, m), [0, 0, 0]); }));
check('8 modes defined', CV.MODE_IDS.length === 8);
// Hex round-trips
check('hexToRgb #e11d48', eq(CV.hexToRgb('#e11d48'), [225, 29, 72]));
check('rgbToHex', CV.rgbToHex([225, 29, 72]) === '#e11d48');
check('simulateHex red protanopia', CV.simulateHex('#ff0000', 'protanopia') === '#918e00');
check('simulateHex invalid -> null', CV.simulateHex('red', 'protanopia') === null && CV.simulateHex('#12345', 'normal') === null);
check('isValidHex rejects bad, accepts good', !CV.isValidHex('#zzzzzz') && CV.isValidHex('#abcdef'));
// Contrast: black vs white = 21 exactly
check('contrast black/white = 21', Math.abs(CV.contrastRatio('#000000', '#ffffff') - 21) < 1e-9);
check('contrast same colour = 1', Math.abs(CV.contrastRatio('#e11d48', '#e11d48') - 1) < 1e-9);
check('deuteranopia simulated red/green hexes exact',
  CV.simulateHex('#ff0000', 'deuteranopia') === '#9fb300' && CV.simulateHex('#00ff00', 'deuteranopia') === '#604d4d');
check('simulation changes red/green contrast (2.91 -> 3.35, verified by node)',
  Math.abs(CV.contrastRatio('#ff0000', '#00ff00') - 2.9139) < 0.001 &&
  Math.abs(CV.contrastRatio('#9fb300', '#604d4d') - 3.3466) < 0.001);
// ImageData: 2 pixels RGBA, alpha untouched
var data = new Uint8ClampedArray([255, 0, 0, 128, 0, 255, 0, 255]);
CV.simulateImageData(data, 'protanopia');
check('simulateImageData transforms RGB, keeps alpha', data[0] === 145 && data[1] === 142 && data[2] === 0 && data[3] === 128 && data[7] === 255);
console.log(n + ' unit checks done');
