// Color Vision BD - UI. Depends on js/color.js (window.ColorVision).
(function () {
  'use strict';
  var CV = window.ColorVision;
  // Bengali strings are written as \u escapes so every source file stays pure ASCII.
  var I18N = {
    en: {
      title: 'Color Vision BD', subtitle: 'See any image the way colour-blind eyes see it',
      upload: 'Upload image', sample: 'Use sample pattern', download: 'Download simulated PNG',
      mode: 'Vision type', view: 'View', viewSide: 'Side by side', viewSlider: 'Compare slider', viewSim: 'Simulated only',
      pairTitle: 'Colour-pair checker', pairNote: 'Pick two colours. The checker shows how the pair looks under the selected vision type, and its WCAG contrast ratio before and after simulation.',
      origLabel: 'Original', simLabel: 'Simulated', contrast: 'Contrast', pass: 'Passes AA (>= 4.5)', fail: 'Fails AA (< 4.5)',
      errImage: 'Please choose an image file (PNG, JPG, GIF or WebP).', errHex: 'Enter a valid 6-digit hex colour, e.g. #e11d48.',
      dropHint: 'Drop an image here, or use the upload button', loaded: 'Image loaded',
      footer: 'Educational simulation only, not a medical diagnosis. Matrices: Machado et al. (2009). No image ever leaves your browser.'
    },
    bn: {
      title: '\u09b0\u0999\u09c7\u09b0 \u09a6\u09c3\u09b7\u09cd\u099f\u09bf \u09ac\u09bf\u09a1\u09bf',
      subtitle: '\u09b0\u0999\u09be\u09a8\u09cd\u09a7 \u099a\u09cb\u0996\u09c7 \u09af\u09c7\u09ae\u09a8 \u09a6\u09c7\u0996\u09be\u09df \u09a4\u09c7\u09ae\u09a8 \u09a6\u09c7\u0996\u09c1\u09a8',
      upload: '\u099b\u09ac\u09bf \u0986\u09aa\u09b2\u09cb\u09a1 \u0995\u09b0\u09c1\u09a8', sample: '\u09a8\u09ae\u09c1\u09a8\u09be \u09a8\u0995\u09b6\u09be \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0995\u09b0\u09c1\u09a8', download: '\u09b8\u09bf\u09ae\u09c1\u09b2\u09c7\u099f\u09c7\u09a1 PNG \u09a1\u09be\u0989\u09a8\u09b2\u09cb\u09a1 \u0995\u09b0\u09c1\u09a8',
      mode: '\u09a6\u09c3\u09b7\u09cd\u099f\u09bf\u09b0 \u09a7\u09b0\u09a8', view: '\u09a6\u09c3\u09b6\u09cd\u09af', viewSide: '\u09aa\u09be\u09b6\u09be\u09aa\u09be\u09b6\u09bf', viewSlider: '\u09a4\u09c1\u09b2\u09a8\u09be \u09b8\u09cd\u09b2\u09be\u0987\u09a1\u09be\u09b0', viewSim: '\u0995\u09c7\u09ac\u09b2 \u09b8\u09bf\u09ae\u09c1\u09b2\u09c7\u099f\u09c7\u09a1',
      pairTitle: '\u09b0\u0999\u09c7\u09b0 \u099c\u09cb\u09a1\u09bc\u09be \u09aa\u09b0\u09c0\u0995\u09cd\u09b7\u0995', pairNote: '\u09a6\u09c1\u099f\u09bf \u09b0\u0999 \u09ac\u09be\u099b\u09c1\u09a8\u0964 \u09a8\u09bf\u09b0\u09cd\u09ac\u09be\u099a\u09bf\u09a4 \u09a6\u09c3\u09b7\u09cd\u09f9\u09bf\u09a4\u09c7 \u099c\u09cb\u09a1\u09bc\u09be\u099f\u09bf \u0995\u09c7\u09ae\u09a8 \u09a6\u09c7\u0996\u09be\u09df \u09a4\u09be \u098f\u09ac\u0982 \u0995\u09a8\u099f\u09cd\u09b0\u09be\u09b8\u09cd\u099f \u09a6\u09c7\u0996\u09be\u09a8\u09cb \u09b9\u09ac\u09c7\u0964',
      origLabel: '\u0986\u09b8\u09b2', simLabel: '\u09b8\u09bf\u09ae\u09c1\u09b2\u09c7\u099f\u09c7\u09a1', contrast: '\u0995\u09a8\u099f\u09cd\u09b0\u09be\u09b8\u09cd\u099f', pass: 'AA \u09aa\u09be\u09b8 (>= 4.5)', fail: 'AA \u09ab\u09c7\u09b2 (< 4.5)',
      errImage: '\u09a6\u09df\u09be \u0995\u09b0\u09c7 \u098f\u0995\u099f\u09bf \u099b\u09ac\u09bf \u09ab\u09be\u0987\u09b2 \u09ac\u09be\u099b\u09c1\u09a8 (PNG, JPG, GIF \u09ac\u09be WebP)\u0964', errHex: '\u09b8\u09a0\u09bf\u0995 6-\u09a1\u09bf\u099c\u09bf\u099f\u09c7\u09b0 hex \u09b0\u0999 \u09a6\u09bf\u09a8, \u09af\u09c7\u09ae\u09a8 #e11d48\u0964',
      dropHint: '\u098f\u0996\u09be\u09a8\u09c7 \u099b\u09ac\u09bf \u099b\u09be\u09a1\u09bc\u09c1\u09a8, \u09ac\u09be \u0986\u09aa\u09b2\u09cb\u09a1 \u09ac\u09cb\u099f\u09be\u09ae \u09ac\u09cd\u09af\u09ac\u09b9\u09be\u09b0 \u0995\u09b0\u09c1\u09a8', loaded: '\u099b\u09ac\u09bf \u09b2\u09cb\u09a1 \u09b9\u09df\u09c7\u099b\u09c7',
      footer: '\u09b6\u09bf\u0995\u09cd\u09b7\u09be\u09ae\u09c2\u09b2\u0995 \u09b8\u09bf\u09ae\u09c1\u09b2\u09c7\u09b6\u09a8 \u09ae\u09be\u09a4\u09cd\u09b0, \u099a\u09bf\u0995\u09bf\u09ce\u09b8\u09be \u09a8\u09bf\u09b0\u09cd\u09a3\u09df \u09a8\u09df\u0964 \u0995\u09cb\u09a8\u09cb \u099b\u09ac\u09bf \u0986\u09aa\u09a8\u09be\u09b0 \u09ac\u09cd\u09b0\u09be\u0989\u099c\u09be\u09b0 \u09b9\u09be\u09a1\u09bc\u09c7 \u09af\u09be\u09df \u09a8\u09be\u0964'
    }
  };
  var BN_DIGITS = ['\u09e6', '\u09e7', '\u09e8', '\u09e9', '\u09ea', '\u09eb', '\u09ec', '\u09ed', '\u09ee', '\u09ef'];
  function fmt(s) {
    s = String(s);
    if (state.lang !== 'bn') return s;
    return s.replace(/[0-9]/g, function (d) { return BN_DIGITS[+d]; });
  }
  var state = loadState();
  function loadState() {
    try {
      var s = JSON.parse(localStorage.getItem('color-vision-bd') || '{}');
      return {
        lang: s.lang === 'bn' ? 'bn' : 'en',
        mode: CV.MODES[s.mode] ? s.mode : 'deuteranopia',
        view: ['side', 'slider', 'sim'].indexOf(s.view) >= 0 ? s.view : 'side',
        pairA: CV.isValidHex(s.pairA) ? s.pairA : '#e11d48',
        pairB: CV.isValidHex(s.pairB) ? s.pairB : '#16a34a'
      };
    } catch (e) { return { lang: 'en', mode: 'deuteranopia', view: 'side', pairA: '#e11d48', pairB: '#16a34a' }; }
  }
  function saveState() {
    try { localStorage.setItem('color-vision-bd', JSON.stringify(state)); } catch (e) {}
  }
  var $ = function (id) { return document.getElementById(id); };
  var sourceImage = null; // HTMLImageElement or null (sample drawn instead)
  var sourceIsSample = true;

  function showMsg(text, isError) {
    var el = $('msg');
    el.textContent = text || '';
    el.style.display = text ? 'block' : 'none';
    el.className = isError ? 'msg error' : 'msg ok';
  }
  function applyLang() {
    var t = I18N[state.lang];
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      if (t[k]) el.textContent = t[k];
    });
    $('lang-btn').textContent = state.lang === 'en' ? '\u09ac\u09be\u0982\u09b2\u09be' : 'EN';
    document.querySelectorAll('#view-select option').forEach(function (o) {
      o.textContent = t[o.value === 'side' ? 'viewSide' : o.value === 'slider' ? 'viewSlider' : 'viewSim'];
    });
    renderPair();
  }
  function drawSample(ctx, w, h) {
    // Built-in test pattern: rainbow stripes + red/green/blue/yellow discs + greys.
    var cols = ['#e11d48', '#f97316', '#eab308', '#16a34a', '#0ea5e9', '#7c3aed'];
    cols.forEach(function (c, i) {
      ctx.fillStyle = c; ctx.fillRect(Math.floor(w * i / 6), 0, Math.ceil(w / 6), Math.floor(h * 0.35));
    });
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, Math.floor(h * 0.35), w, h - Math.floor(h * 0.35));
    var discs = [['#e11d48', 0.22, 0.62, 0.16], ['#16a34a', 0.42, 0.62, 0.16], ['#2563eb', 0.62, 0.62, 0.16], ['#eab308', 0.82, 0.62, 0.16]];
    discs.forEach(function (d) {
      ctx.fillStyle = d[0]; ctx.beginPath(); ctx.arc(w * d[1], h * d[2], w * d[3], 0, Math.PI * 2); ctx.fill();
    });
    ctx.fillStyle = '#111827'; ctx.font = 'bold ' + Math.floor(w / 16) + 'px sans-serif';
    ctx.fillText('Aa 123', w * 0.06, h * 0.95);
    ctx.fillStyle = '#6b7280';
    for (var i = 0; i < 5; i++) { ctx.fillRect(w * (0.55 + i * 0.08), h * 0.88, w * 0.05, h * 0.06); }
    ctx.fillStyle = '#111827'; ctx.fillRect(w * 0.55, h * 0.88, w * 0.05, h * 0.06);
  }
  function render() {
    var oc = $('canvas-original'), sc = $('canvas-sim');
    var W = 640, H = 360;
    oc.width = W; oc.height = H; sc.width = W; sc.height = H;
    var octx = oc.getContext('2d'), sctx = sc.getContext('2d');
    if (sourceImage && !sourceIsSample) {
      var scale = Math.min(W / sourceImage.width, H / sourceImage.height, 1);
      var dw = Math.max(1, Math.floor(sourceImage.width * scale)), dh = Math.max(1, Math.floor(sourceImage.height * scale));
      oc.width = dw; oc.height = dh; sc.width = dw; sc.height = dh;
      octx.drawImage(sourceImage, 0, 0, dw, dh);
    } else {
      drawSample(octx, W, H);
    }
    var img = octx.getImageData(0, 0, oc.width, oc.height);
    CV.simulateImageData(img.data, state.mode);
    sctx.putImageData(img, 0, 0);
    $('mode-name').textContent = CV.MODES[state.mode].label;
    // View handling: #stage is flex (side/sim) or stacked (slider); #sim-clip
    // is display:contents except in slider mode, where it clips the sim canvas.
    $('stage').className = 'stage ' + state.view;
    $('sim-clip').style.width = $('compare-range').value + '%';
    $('compare-range').style.display = state.view === 'slider' ? 'block' : 'none';
    $('canvas-original').style.display = state.view === 'sim' ? 'none' : 'block';
  }
  function renderPair() {
    var t = I18N[state.lang];
    var a = state.pairA, b = state.pairB;
    $('sw-a').style.background = a; $('sw-b').style.background = b;
    var sa = CV.simulateHex(a, state.mode), sb = CV.simulateHex(b, state.mode);
    $('sw-a-sim').style.background = sa; $('sw-b-sim').style.background = sb;
    $('sw-a').textContent = a; $('sw-b').textContent = b;
    $('sw-a-sim').textContent = sa; $('sw-b-sim').textContent = sb;
    var r0 = CV.contrastRatio(a, b), r1 = CV.contrastRatio(sa, sb);
    $('contrast-orig').textContent = fmt(r0.toFixed(2)) + ' - ' + (r0 >= 4.5 ? t.pass : t.fail);
    $('contrast-sim').textContent = fmt(r1.toFixed(2)) + ' - ' + (r1 >= 4.5 ? t.pass : t.fail);
    $('pair-mode-note').textContent = CV.MODES[state.mode].label;
  }
  function loadFile(file) {
    if (!file || !file.type || file.type.indexOf('image/') !== 0) { showMsg(I18N[state.lang].errImage, true); return; }
    var url = URL.createObjectURL(file);
    var img = new Image();
    img.onload = function () { sourceImage = img; sourceIsSample = false; showMsg(I18N[state.lang].loaded, false); render(); };
    img.onerror = function () { showMsg(I18N[state.lang].errImage, true); };
    img.src = url;
  }
  function init() {
    // Mode select options
    var sel = $('mode-select');
    CV.MODE_IDS.forEach(function (id) {
      var o = document.createElement('option'); o.value = id; o.textContent = CV.MODES[id].label; sel.appendChild(o);
    });
    sel.value = state.mode;
    $('view-select').value = state.view;
    $('pair-a').value = state.pairA; $('pair-b').value = state.pairB;
    $('pair-hex-a').value = state.pairA; $('pair-hex-b').value = state.pairB;
    sel.addEventListener('change', function () { state.mode = sel.value; saveState(); render(); renderPair(); });
    $('view-select').addEventListener('change', function () { state.view = $('view-select').value; saveState(); render(); });
    $('lang-btn').addEventListener('click', function () { state.lang = state.lang === 'en' ? 'bn' : 'en'; saveState(); applyLang(); });
    $('sample-btn').addEventListener('click', function () { sourceImage = null; sourceIsSample = true; showMsg('', false); render(); });
    $('upload-btn').addEventListener('click', function () { $('file-input').click(); });
    $('file-input').addEventListener('change', function () { loadFile($('file-input').files[0]); });
    var dz = $('dropzone');
    ['dragover', 'dragenter'].forEach(function (e) { dz.addEventListener(e, function (ev) { ev.preventDefault(); dz.classList.add('drag'); }); });
    ['dragleave', 'drop'].forEach(function (e) { dz.addEventListener(e, function (ev) { ev.preventDefault(); dz.classList.remove('drag'); }); });
    dz.addEventListener('drop', function (ev) { loadFile(ev.dataTransfer.files[0]); });
    $('download-btn').addEventListener('click', function () {
      var a = document.createElement('a');
      a.href = $('canvas-sim').toDataURL('image/png'); a.download = 'color-vision-' + state.mode + '.png'; a.click();
    });
    $('compare-range').addEventListener('input', function () { $('sim-clip').style.width = $('compare-range').value + '%'; });
    function pairChange(which) {
      var hex = $(which === 'a' ? 'pair-hex-a' : 'pair-hex-b').value.trim();
      if (!CV.isValidHex(hex)) { showMsg(I18N[state.lang].errHex, true); return; }
      showMsg('', false);
      if (which === 'a') { state.pairA = hex; $('pair-a').value = hex; } else { state.pairB = hex; $('pair-b').value = hex; }
      saveState(); renderPair();
    }
    $('pair-a').addEventListener('input', function () { $('pair-hex-a').value = $('pair-a').value; pairChange('a'); });
    $('pair-b').addEventListener('input', function () { $('pair-hex-b').value = $('pair-b').value; pairChange('b'); });
    $('pair-hex-a').addEventListener('change', function () { pairChange('a'); });
    $('pair-hex-b').addEventListener('change', function () { pairChange('b'); });
    applyLang();
    render();
  }
  document.addEventListener('DOMContentLoaded', init);
})();
