// Color Vision BD - pure colour-vision-deficiency simulation logic.
// Shared by the browser app and the node unit tests (no DOM, no network).
// Matrices: Machado et al. (2009) simulation matrices, as published for
// protan/deutan/tritan -opia and -omaly. Achromatopsia uses the standard
// Rec.601 luma weights. All outputs are clamped to 0..255 integers.
(function (root) {
  'use strict';
  var MODES = {
    normal:        { label: 'Normal vision',      matrix: [[1, 0, 0], [0, 1, 0], [0, 0, 1]] },
    protanopia:    { label: 'Protanopia',         matrix: [[0.567, 0.433, 0], [0.558, 0.442, 0], [0, 0.242, 0.758]] },
    protanomaly:   { label: 'Protanomaly',        matrix: [[0.817, 0.183, 0], [0.333, 0.667, 0], [0, 0.125, 0.875]] },
    deuteranopia:  { label: 'Deuteranopia',       matrix: [[0.625, 0.375, 0], [0.7, 0.3, 0], [0, 0.3, 0.7]] },
    deuteranomaly: { label: 'Deuteranomaly',      matrix: [[0.8, 0.2, 0], [0.258, 0.742, 0], [0, 0.142, 0.858]] },
    tritanopia:    { label: 'Tritanopia',         matrix: [[0.95, 0.05, 0], [0, 0.433, 0.567], [0, 0.475, 0.525]] },
    tritanomaly:   { label: 'Tritanomaly',        matrix: [[0.967, 0.033, 0], [0, 0.733, 0.267], [0, 0.183, 0.817]] },
    achromatopsia: { label: 'Achromatopsia',      matrix: [[0.299, 0.587, 0.114], [0.299, 0.587, 0.114], [0.299, 0.587, 0.114]] }
  };
  var MODE_IDS = Object.keys(MODES);

  function clamp255(v) { return Math.max(0, Math.min(255, Math.round(v))); }

  function simulatePixel(r, g, b, modeId) {
    var m = (MODES[modeId] || MODES.normal).matrix;
    return [
      clamp255(m[0][0] * r + m[0][1] * g + m[0][2] * b),
      clamp255(m[1][0] * r + m[1][1] * g + m[1][2] * b),
      clamp255(m[2][0] * r + m[2][1] * g + m[2][2] * b)
    ];
  }

  function simulateImageData(data, modeId) {
    // data: Uint8ClampedArray RGBA, mutated in place, returned for chaining.
    for (var i = 0; i + 3 < data.length; i += 4) {
      var p = simulatePixel(data[i], data[i + 1], data[i + 2], modeId);
      data[i] = p[0]; data[i + 1] = p[1]; data[i + 2] = p[2];
    }
    return data;
  }

  function hexToRgb(hex) {
    if (typeof hex !== 'string') return null;
    var h = hex.trim().replace(/^#/, '');
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null;
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  function rgbToHex(rgb) {
    function two(n) { var s = n.toString(16); return s.length === 1 ? '0' + s : s; }
    return '#' + two(rgb[0]) + two(rgb[1]) + two(rgb[2]);
  }

  function simulateHex(hex, modeId) {
    var rgb = hexToRgb(hex);
    if (!rgb) return null;
    return rgbToHex(simulatePixel(rgb[0], rgb[1], rgb[2], modeId));
  }

  function luminance(rgb) {
    function lin(c) {
      var s = c / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    }
    return 0.2126 * lin(rgb[0]) + 0.7152 * lin(rgb[1]) + 0.0722 * lin(rgb[2]);
  }

  function contrastRatio(hexA, hexB) {
    var a = hexToRgb(hexA), b = hexToRgb(hexB);
    if (!a || !b) return null;
    var l1 = luminance(a), l2 = luminance(b);
    var hi = Math.max(l1, l2), lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  }

  function isValidHex(hex) { return hexToRgb(hex) !== null; }

  var api = {
    MODES: MODES, MODE_IDS: MODE_IDS, simulatePixel: simulatePixel,
    simulateImageData: simulateImageData, hexToRgb: hexToRgb, rgbToHex: rgbToHex,
    simulateHex: simulateHex, contrastRatio: contrastRatio, isValidHex: isValidHex
  };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  root.ColorVision = api;
})(typeof window !== 'undefined' ? window : globalThis);
