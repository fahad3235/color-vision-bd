// Color Vision BD — headless-Chrome smoke test via raw CDP. Run: node tests/smoke.mjs
import { spawn } from 'node:child_process';
import { setTimeout as sleep } from 'node:timers/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const DIR = path.dirname(fileURLToPath(import.meta.url));
const INDEX = 'file://' + path.resolve(DIR, '..', 'index.html');
const PORT = 9338;
const chrome = spawn('/opt/meta-chromium/chrome', ['--headless=new', '--no-sandbox', '--disable-gpu', '--user-data-dir=/tmp/colorvision-smoke-' + process.pid, '--remote-debugging-port=' + PORT, 'about:blank'], { stdio: 'ignore' });
let ws, msgId = 0; const pending = new Map(); const consoleErrors = [];
function send(method, params = {}) { const id = ++msgId; return new Promise((resolve) => { pending.set(id, resolve); ws.send(JSON.stringify({ id, method, params })); }); }
async function ev(expr) { const r = await send('Runtime.evaluate', { expression: expr, returnByValue: true }); if (r.result?.subtype === 'error' || r.exceptionDetails) throw new Error('evaluate failed: ' + expr); return r.result.value; }
let checks = 0; function check(name, cond) { checks++; if (!cond) throw new Error('CHECK FAILED: ' + name); console.log('ok - ' + name); }
process.on('exit', () => { try { chrome.kill(); } catch {} });
try {
  let targets;
  for (let i = 0; i < 50; i++) { try { targets = await (await fetch('http://127.0.0.1:' + PORT + '/json')).json(); break; } catch { await sleep(200); } }
  if (!targets) throw new Error('chrome debugging endpoint never came up');
  ws = new WebSocket(targets[0].webSocketDebuggerUrl);
  await new Promise((res) => { ws.onopen = res; });
  ws.onmessage = (m) => { const d = JSON.parse(m.data); if (d.id && pending.has(d.id)) { pending.get(d.id)(d.result ?? d); pending.delete(d.id); } if (d.method === 'Runtime.consoleAPICalled' && d.params.type === 'error') consoleErrors.push('console'); if (d.method === 'Runtime.exceptionThrown') consoleErrors.push('exception'); };
  await send('Page.enable'); await send('Runtime.enable'); await send('Page.navigate', { url: INDEX });
  for (let i = 0; i < 50; i++) { if (await ev(`document.querySelector('#mode-name')?.textContent ? 'yes' : 'no'`) === 'yes') break; await sleep(200); }
  check('page renders title + 8 vision modes', await ev(`document.querySelector('h1').textContent === 'Color Vision BD' && document.querySelectorAll('#mode-select option').length === 8`));
  check('default mode is deuteranopia', await ev(`document.querySelector('#mode-select').value === 'deuteranopia' && document.querySelector('#mode-name').textContent === 'Deuteranopia'`));
  // Simulated canvas differs from original (sample pattern has colour)
  check('simulated canvas pixels differ from original', await ev(`(() => { const a = document.querySelector('#canvas-original').getContext('2d').getImageData(10,10,1,1).data; const b = document.querySelector('#canvas-sim').getContext('2d').getImageData(10,10,1,1).data; return a[0] !== b[0] || a[1] !== b[1]; })()`));
  // Switch to achromatopsia: simulated pixel must be grey (r==g==b)
  await ev(`document.querySelector('#mode-select').value = 'achromatopsia'; document.querySelector('#mode-select').dispatchEvent(new Event('change'));`);
  check('achromatopsia renders grey pixels', await ev(`(() => { const b = document.querySelector('#canvas-sim').getContext('2d').getImageData(10,10,1,1).data; return b[0] === b[1] && b[1] === b[2]; })()`));
  // Pair checker: default red/green pair shows simulated swatches + contrast text
  check('pair checker shows contrast values', await ev(`document.querySelector('#contrast-orig').textContent.length > 0 && document.querySelector('#contrast-sim').textContent.length > 0`));
  // Invalid hex rejected with visible error
  await ev(`document.querySelector('#pair-hex-a').value = 'nothex'; document.querySelector('#pair-hex-a').dispatchEvent(new Event('change'));`);
  check('invalid hex shows error message', await ev(`document.querySelector('#msg').style.display === 'block'`));
  // Valid hex restores
  await ev(`document.querySelector('#pair-hex-a').value = '#2563eb'; document.querySelector('#pair-hex-a').dispatchEvent(new Event('change'));`);
  check('valid hex clears error and updates swatch', await ev(`document.querySelector('#msg').style.display === 'none' && document.querySelector('#sw-a').textContent === '#2563eb'`));
  // Slider view shows range input
  await ev(`document.querySelector('#view-select').value = 'slider'; document.querySelector('#view-select').dispatchEvent(new Event('change'));`);
  check('slider view shows compare range', await ev(`document.querySelector('#compare-range').style.display === 'block'`));
  // Language toggle to Bengali
  await ev(`document.querySelector('#lang-btn').click();`);
  check('Bengali toggle changes title', await ev(`document.querySelector('h1').textContent !== 'Color Vision BD' && document.querySelector('h1').textContent.length > 0`));
  // Persistence across reload: mode achromatopsia + BN lang persist
  await send('Page.reload');
  for (let i = 0; i < 50; i++) { if (await ev(`document.querySelector('#mode-name')?.textContent ? 'yes' : 'no'`) === 'yes') break; await sleep(200); }
  check('mode + language persist after reload', await ev(`document.querySelector('#mode-select').value === 'achromatopsia' && document.querySelector('h1').textContent !== 'Color Vision BD'`));
  // 390px mobile: no horizontal overflow
  await send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
  await sleep(300);
  check('390px mobile: no horizontal overflow', await ev(`document.documentElement.scrollWidth <= 390`));
  await send('Emulation.clearDeviceMetricsOverride');
  check('zero console errors / page exceptions', consoleErrors.length === 0);
  console.log(checks + '/' + checks + ' smoke checks passed');
  process.exit(0);
} catch (e) { console.error(e.message); try { chrome.kill(); } catch {} process.exit(1); }
