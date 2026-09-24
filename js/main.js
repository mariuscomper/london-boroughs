/* London, in Thirty-Three Parts: scrollytelling engine. No dependencies. */
(() => {
'use strict';

const L = window.LONDON, C = window.CONTENT;
const NS = 'http://www.w3.org/2000/svg';
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s, r = document) => r.querySelector(s);
const svgEl = (tag, attrs = {}, parent) => {
  const e = document.createElementNS(NS, tag);
  for (const k in attrs) e.setAttribute(k, attrs[k]);
  if (parent) parent.appendChild(e);
  return e;
};
const fmt = n => Math.round(n).toLocaleString('en-GB');
const pad2 = n => String(n).padStart(2, '0');
const isMobile = () => innerWidth <= 900;

/* ---------------------------------------------------------------- data */
const geo = new Map(L.boroughs.map(b => [b.code, b]));
const tour = C.boroughs.map((c, i) => {
  const g = geo.get(c.code);
  const h = ((28 + i * 137.508) % 360).toFixed(1);
  return {
    ...g, ...c, i, h,
    vivid: `oklch(0.66 0.13 ${h})`, soft: `oklch(0.8 0.085 ${h})`,
    tint: `oklch(0.905 0.045 ${h})`, deep: `oklch(0.42 0.1 ${h})`,
    area: g.km2, density: c.pop / g.km2,
  };
});
const N = tour.length;
const bySlug = new Map(tour.map(t => [t.slug, t]));
const INNER = new Set(C.inner);
// hand-placed label nudges (map units) where the pole of inaccessibility reads oddly
const NUDGE = {city: [0, -2], 'hammersmith-fulham': [4, -26], 'kensington-chelsea': [-2, -6], westminster: [4, 4], richmond: [6, 8], islington: [0, 4], 'tower-hamlets': [6, 0]};
for (const t of tour) { const n = NUDGE[t.slug]; t.lp = n ? [t.l[0] + n[0], t.l[1] + n[1]] : t.l; }

const LAND = '#ede3cd', LAND_DIM = '#e6dcc4';
const countyColor = k => k === 'city' ? '#c23b22' : `oklch(0.8 0.075 ${C.countyInfo[k].hue})`;
const OVER = [16, 14, L.w - 16, L.h - 14];
const unionBox = list => list.reduce((a, t) => [Math.min(a[0], t.b[0]), Math.min(a[1], t.b[1]), Math.max(a[2], t.b[2]), Math.max(a[3], t.b[3])], [1e9, 1e9, -1e9, -1e9]);
const innerBox = unionBox(tour.filter(t => INNER.has(t.slug)));

/* ------------------------------------------------------- paper grain */
(() => {
  const c = document.createElement('canvas'); c.width = c.height = 180;
  const x = c.getContext('2d'), img = x.createImageData(180, 180);
  for (let i = 0; i < img.data.length; i += 4) {
    const v = Math.random();
    img.data[i] = img.data[i + 1] = img.data[i + 2] = v > .5 ? 255 : 60;
    img.data[i + 3] = Math.random() * 16;
  }
  x.putImageData(img, 0, 0);
  document.documentElement.style.setProperty('--grain', `url(${c.toDataURL()})`);
})();

/* ------------------------------------------------------- map builder */
function buildMap(svg, id) {
  svg.setAttribute('viewBox', `0 0 ${L.w} ${L.h}`);
  const defs = svgEl('defs', {}, svg);
  const cp = svgEl('clipPath', {id: id + '-rc'}, defs);
  svgEl('path', {d: L.river}, cp);
  // two-county stripes for boroughs that straddled old county lines
  for (const [slug, [a, b]] of Object.entries({barnet: ['middlesex', 'herts'], richmond: ['surrey', 'middlesex']})) {
    const p = svgEl('pattern', {id: `${id}-st-${slug}`, width: 9, height: 9, patternUnits: 'userSpaceOnUse', patternTransform: 'rotate(40)'}, defs);
    svgEl('rect', {width: 9, height: 9, fill: countyColor(a)}, p);
    svgEl('rect', {width: 4.5, height: 9, fill: countyColor(b)}, p);
  }
  const g = {svg};
  g.grat = svgEl('g', {class: 'grat'}, svg); svgEl('path', {d: L.graticule}, g.grat);
  g.water = svgEl('g', {class: 'water'}, svg);
  svgEl('path', {d: L.river, class: 'river'}, g.water);
  const rip = svgEl('g', {'clip-path': `url(#${id}-rc)`}, g.water);
  for (const w of [16, 14, 10, 8, 4, 2]) svgEl('path', {d: L.river, class: `rip w${w}`, 'stroke-width': w}, rip);
  g.land = svgEl('g', {class: 'land'}, svg);
  g.paths = tour.map(t => svgEl('path', {d: t.d, class: 'b', 'data-slug': t.slug}, g.land));
  g.meridian = svgEl('g', {class: 'meridian'}, svg);
  svgEl('path', {d: L.meridian}, g.meridian);
  return g;
}
function addLabels(g) {
  g.labelG = svgEl('g', {class: 'labels'}, g.svg);
  g.labels = tour.map(t => {
    const tx = svgEl('text', {class: 'lbl', x: t.lp[0], y: t.lp[1]}, g.labelG);
    const n = t.label.length;
    t.label.forEach((line, j) => {
      const ts = svgEl('tspan', {x: t.lp[0], dy: j === 0 ? `${(-(n - 1) * 0.58 + 0.35).toFixed(2)}em` : '1.16em'}, tx);
      ts.textContent = line;
    });
    tx._need = Math.max(...t.label.map(s => s.length)) * 0.86 + 1.2; // in em
    tx._lines = n;
    return tx;
  });
}
function updateLabels(g, k, px, curSlug, hideAll, dy = 0, hideSlug = null) {
  g.labelG.setAttribute('font-size', (px * k).toFixed(3));
  g.labelG.setAttribute('stroke-width', (px * k * 0.32).toFixed(3));
  tour.forEach((t, i) => {
    const el = g.labels[i];
    const w = (t.b[2] - t.b[0]) / k, h = (t.b[3] - t.b[1]) / k;
    const fits = w > el._need * px * 1.08 && h > el._lines * px * 1.7;
    const on = !hideAll && (fits || t.slug === curSlug) && t.slug !== hideSlug;
    if (el._on !== on) { el.classList.toggle('off', !on); el._on = on; }
    const cur = t.slug === curSlug;
    if (el._cur !== cur) { el.classList.toggle('cur', cur); el._cur = cur; }
    // below the station dot: push multi-line labels down so their first line clears it
    const off = dy ? (dy + (el._lines - 1) * 0.58 * px) * k : 0;
    if (el._off !== off) { el.setAttribute('transform', off ? `translate(0 ${off.toFixed(3)})` : ''); el._off = off; }
  });
}

/* ------------------------------------------------------------- hero */
const hero = buildMap($('#hero-map'), 'h');
addLabels(hero);
{
  const c = bySlug.get('city').lp;
  const maxD = Math.max(...tour.map(t => Math.hypot(t.lp[0] - c[0], t.lp[1] - c[1])));
  tour.forEach((t, i) => {
    const d = 0.25 + Math.hypot(t.lp[0] - c[0], t.lp[1] - c[1]) / maxD * 1.25;
    hero.paths[i].setAttribute('pathLength', '1');
    hero.paths[i].style.setProperty('--d', d.toFixed(2) + 's');
    hero.labels[i].style.setProperty('--d', d.toFixed(2) + 's');
  });
}
function sizeHero() {
  const r = hero.svg.getBoundingClientRect();
  if (!r.width) return;
  const k = Math.max(L.w / r.width, L.h / r.height);
  updateLabels(hero, k, isMobile() ? 8.5 : 10, null, false);
}

/* ------------------------------------------------------------- main map */
const frame = $('#map-frame');
const M = buildMap($('#map'), 'm');
M.focus = svgEl('g', {class: 'focus'}, M.svg);
M.focusHalo = svgEl('path', {class: 'focus-halo'}, M.focus);
M.focusLine = svgEl('path', {class: 'focus-line'}, M.focus);

// route: a Catmull-Rom curve through the stops, split into per-segment Béziers
M.route = svgEl('g', {class: 'route'}, M.svg);
const P = tour.map(t => t.lp);
const segD = [];
for (let i = 0; i < N - 1; i++) {
  const p0 = P[Math.max(0, i - 1)], p1 = P[i], p2 = P[i + 1], p3 = P[Math.min(N - 1, i + 2)];
  const s = 0.5 / 3;
  const c1 = [p1[0] + (p2[0] - p0[0]) * s, p1[1] + (p2[1] - p0[1]) * s];
  const c2 = [p2[0] - (p3[0] - p1[0]) * s, p2[1] - (p3[1] - p1[1]) * s];
  segD.push(`M${p1[0]},${p1[1]}C${c1[0].toFixed(2)},${c1[1].toFixed(2)} ${c2[0].toFixed(2)},${c2[1].toFixed(2)} ${p2[0]},${p2[1]}`);
}
M.ghost = svgEl('path', {class: 'ghost', d: segD.map((d, i) => i ? d.replace(/^M[^C]+/, '') : d).join('')}, M.route);
M.segs = segD.map(d => svgEl('path', {class: 'seg', d, pathLength: 1}, M.route));
M.stations = svgEl('g', {class: 'stations'}, M.svg);
const stOuter = svgEl('g', {class: 'outer', 'stroke-linecap': 'round'}, M.stations);
const stInner = svgEl('g', {class: 'inner', 'stroke-linecap': 'round'}, M.stations);
M.stO = P.map(p => svgEl('path', {d: `M${p[0]},${p[1]}h0.01`}, stOuter));
M.stI = P.map(p => svgEl('path', {d: `M${p[0]},${p[1]}h0.01`}, stInner));
M.ring = svgEl('circle', {class: 'cur-ring hidden', r: 1}, M.svg);

// markers
M.marker = svgEl('g', {class: 'marker hidden'}, M.svg);
const cityP = bySlug.get('city').lp;
M.markerDot = svgEl('circle', {cx: cityP[0], cy: cityP[1], r: 2}, M.marker);
M.markerTxt = svgEl('text', {x: cityP[0], y: cityP[1]}, M.marker);
M.markerTxt.textContent = 'Londinium';
M.merTxt = svgEl('text', {}, M.meridian);
M.merTxt.textContent = '0° PRIME MERIDIAN';
const merPts = (L.meridian.match(/-?\d+(\.\d+)?/g) || []).map(Number);
const merA = [merPts[0], merPts[1]], merB = [merPts[merPts.length - 2], merPts[merPts.length - 1]];

// Dorling circles
M.dor = svgEl('g', {class: 'dorling hidden'}, M.svg);
M.dc = tour.map(t => {
  const g = svgEl('g', {}, M.dor);
  const c = svgEl('circle', {r: 0, cx: t.lp[0], cy: t.lp[1], fill: t.soft, 'data-slug': t.slug}, g);
  const tx = svgEl('text', {x: t.lp[0], y: t.lp[1]}, g);
  tx.textContent = t.abbr;
  return {g, c, tx, x: t.lp[0], y: t.lp[1], r: 0};
});
addLabels(M);

/* ------------------------------------------------------------- camera */
const cam = {x: 0, y: 0, w: L.w, h: L.h};
let camAnim = 0, curState = null, fw = 1, fh = 1;
function measure() { const r = frame.getBoundingClientRect(); fw = r.width || 1; fh = r.height || 1; }
function fitBox(box, pad = 0.05, min = 0) {
  const [x0, y0, x1, y1] = box;
  let w = Math.max((x1 - x0) * (1 + 2 * pad), min), h = Math.max((y1 - y0) * (1 + 2 * pad), min * 0.75);
  let cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
  const A = fw / fh;
  if (w / h > A) h = w / A; else w = h * A;
  cy += h * 0.045; // leave room for the caption in the lower-left
  return {x: cx - w / 2, y: cy - h / 2, w, h};
}
const ease = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
function flyTo(target, dur = 1100) {
  cancelAnimationFrame(camAnim);
  const from = {...cam};
  if (reduce || dur <= 0) { Object.assign(cam, target); renderCam(); return; }
  const fcx = from.x + from.w / 2, fcy = from.y + from.h / 2, tcx = target.x + target.w / 2, tcy = target.y + target.h / 2;
  // slightly longer for bigger moves
  const dist = Math.hypot(tcx - fcx, tcy - fcy) / Math.max(from.w, target.w) + Math.abs(Math.log(target.w / from.w));
  dur = dur * Math.min(1.5, 0.7 + dist * 0.5);
  const t0 = performance.now();
  const step = now => {
    const p = Math.min(1, (now - t0) / dur), e = ease(p);
    const w = from.w * Math.pow(target.w / from.w, e), h = from.h * Math.pow(target.h / from.h, e);
    const cx = fcx + (tcx - fcx) * e, cy = fcy + (tcy - fcy) * e;
    cam.x = cx - w / 2; cam.y = cy - h / 2; cam.w = w; cam.h = h;
    renderCam();
    if (p < 1) camAnim = requestAnimationFrame(step);
  };
  camAnim = requestAnimationFrame(step);
}
const scaleBar = $('#scale-bar'), scaleLabel = $('#scale-label');
function renderCam() {
  M.svg.setAttribute('viewBox', `${cam.x.toFixed(2)} ${cam.y.toFixed(2)} ${cam.w.toFixed(2)} ${cam.h.toFixed(2)}`);
  const k = cam.w / fw; // map units per screen px
  const st = curState || {};
  const lpx = isMobile() ? 10 : 11.5;
  updateLabels(M, k, lpx, st.focus && st.focus.slug, !!st.dorling, st.route ? lpx * 1.25 : 0, st.marker ? 'city' : null);
  M.route.setAttribute('stroke-width', (3.6 * k).toFixed(3));
  M.ghost.setAttribute('stroke-width', (2.2 * k).toFixed(3));
  M.ghost.setAttribute('stroke-dasharray', `0 ${(6.5 * k).toFixed(3)}`);
  stOuter.setAttribute('stroke-width', (11 * k).toFixed(3));
  stInner.setAttribute('stroke-width', (5.6 * k).toFixed(3));
  M.ring.setAttribute('r', (9 * k).toFixed(3));
  M.ring.setAttribute('stroke-width', (2.4 * k).toFixed(3));
  M.markerDot.setAttribute('r', (5 * k).toFixed(3));
  M.markerTxt.setAttribute('font-size', (22 * k).toFixed(3));
  M.markerTxt.setAttribute('stroke-width', (5 * k).toFixed(3));
  M.markerTxt.setAttribute('y', (cityP[1] - 12 * k).toFixed(2));
  M.markerTxt.setAttribute('text-anchor', 'middle');
  // meridian label rides along the line near the top of the view
  const yT = cam.y + 30 * k, f = (yT - merA[1]) / (merB[1] - merA[1]);
  M.merTxt.setAttribute('x', (merA[0] + (merB[0] - merA[0]) * f + 6 * k).toFixed(2));
  M.merTxt.setAttribute('y', yT.toFixed(2));
  M.merTxt.setAttribute('font-size', (10.5 * k).toFixed(3));
  // scale bar
  const pxPerKm = L.kmPx / k;
  const nice = [0.25, 0.5, 1, 2, 5, 10, 20].find(v => v * pxPerKm >= 56) || 20;
  scaleBar.style.width = (nice * pxPerKm).toFixed(1) + 'px';
  scaleLabel.textContent = nice < 1 ? `${nice * 1000} m` : `${nice} km`;
}

/* ------------------------------------------------------------- states */
const DEF = {box: OVER, pad: 0.03, min: 0, fill: () => LAND, op: () => 1, route: 0, ghost: false, focus: null,
  meridian: false, marker: false, legend: '', caption: '', dorling: null, stagger: false};
let lastLegend = null, lastCaption = null;

function applyState(s) {
  s = {...DEF, ...s};
  const prev = curState;
  curState = s;
  measure();
  if (s.dorling) {
    const lay = dorling(s.dorling);
    const bb = lay.reduce((a, n) => [Math.min(a[0], n.x - n.r), Math.min(a[1], n.y - n.r), Math.max(a[2], n.x + n.r), Math.max(a[3], n.y + n.r)], [1e9, 1e9, -1e9, -1e9]);
    flyTo(fitBox(bb, 0.06));
    tweenDorling(lay);
  } else {
    flyTo(fitBox(s.box, s.pad, s.min));
    if (prev && prev.dorling) tweenDorling(null);
  }
  M.dor.classList.toggle('hidden', !s.dorling);
  tour.forEach((t, i) => {
    const p = M.paths[i];
    p.style.transitionDelay = s.stagger && !reduce ? `${i * 55}ms` : '0ms';
    p.style.fill = s.fill(t);
    p.style.opacity = s.op(t);
  });
  // route
  const n = s.route; // number of stations shown
  M.segs.forEach((seg, i) => {
    const on = i < n - 1;
    seg.style.transitionDelay = s.stagger && on && !reduce ? `${300 + i * 38}ms` : '0ms';
    seg.classList.toggle('on', on);
  });
  M.stO.forEach((st, i) => { const on = i < n; st.classList.toggle('on', on); M.stI[i].classList.toggle('on', on); });
  M.ghost.classList.toggle('hidden', !s.ghost);
  // focus
  if (s.focus) {
    M.focusHalo.setAttribute('d', s.focus.d); M.focusLine.setAttribute('d', s.focus.d);
    M.ring.setAttribute('cx', s.focus.lp[0]); M.ring.setAttribute('cy', s.focus.lp[1]);
  }
  M.focus.classList.toggle('hidden', !s.focus);
  M.ring.classList.toggle('hidden', !s.focus || n === 0);
  M.meridian.classList.toggle('hidden', !s.meridian);
  M.marker.classList.toggle('hidden', !s.marker);
  if (s.legend !== lastLegend) { $('#legend').innerHTML = s.legend; lastLegend = s.legend; }
  if (s.caption !== lastCaption) { $('#caption').innerHTML = s.caption; lastCaption = s.caption; }
  $('#scale').classList.toggle('hidden', !!s.dorling);
  renderCam();
}

/* Dorling cartogram: circles sized by a metric, relaxed around their true positions */
const dorCache = {};
function dorling(metric) {
  if (dorCache[metric]) return dorCache[metric];
  const sum = tour.reduce((a, t) => a + t[metric], 0);
  const s = Math.sqrt(0.24 * L.w * L.h / (Math.PI * sum));
  const nodes = tour.map(t => ({x: t.lp[0], y: t.lp[1], ox: t.lp[0], oy: t.lp[1], r: Math.max(2.5, s * Math.sqrt(t[metric]))}));
  for (let it = 0; it < 320; it++) {
    for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) {
      const a = nodes[i], b = nodes[j];
      let dx = b.x - a.x, dy = b.y - a.y, d = Math.hypot(dx, dy) || 0.01;
      const min = a.r + b.r + 2.5;
      if (d < min) {
        const m = (min - d) / d, wa = b.r / (a.r + b.r), wb = a.r / (a.r + b.r);
        a.x -= dx * m * wa; a.y -= dy * m * wa; b.x += dx * m * wb; b.y += dy * m * wb;
      }
    }
    const pull = it < 260 ? 0.035 : 0;
    for (const n of nodes) { n.x += (n.ox - n.x) * pull; n.y += (n.oy - n.y) * pull; }
  }
  return (dorCache[metric] = nodes);
}
let dorAnim = 0;
function tweenDorling(lay) {
  cancelAnimationFrame(dorAnim);
  const from = M.dc.map(d => ({x: d.x, y: d.y, r: d.r}));
  const to = lay ? lay.map(n => ({x: n.x, y: n.y, r: n.r})) : tour.map(t => ({x: t.lp[0], y: t.lp[1], r: 0}));
  const t0 = performance.now(), dur = reduce ? 1 : 1100;
  const step = now => {
    const p = Math.min(1, (now - t0) / dur);
    M.dc.forEach((d, i) => {
      const e = ease(Math.max(0, Math.min(1, p * 1.25 - (i / N) * 0.25)));
      d.x = from[i].x + (to[i].x - from[i].x) * e; d.y = from[i].y + (to[i].y - from[i].y) * e; d.r = from[i].r + (to[i].r - from[i].r) * e;
      d.c.setAttribute('cx', d.x.toFixed(2)); d.c.setAttribute('cy', d.y.toFixed(2)); d.c.setAttribute('r', Math.max(0, d.r).toFixed(2));
      d.tx.setAttribute('x', d.x.toFixed(2)); d.tx.setAttribute('y', d.y.toFixed(2));
      d.tx.setAttribute('font-size', Math.max(0.1, Math.min(d.r * 0.44, 15)).toFixed(2));
      d.tx.style.opacity = d.r > 11 ? 1 : 0;
    });
    if (p < 1) dorAnim = requestAnimationFrame(step);
  };
  dorAnim = requestAnimationFrame(step);
}

/* ------------------------------------------------------------- steps */
const steps = [];
const add = (id, rail, html, state, cls = '') => steps.push({id, rail, html, state, cls});
const legendRows = (title, rows) => `<div class="lg-title">${title}</div>` + rows.map(([c, n]) => `<div><span class="sw" style="background:${c}"></span>${n}</div>`).join('');
const cap = (num, name) => `<span class="cap-num">${num}</span><span class="cap-name">${name}</span>`;
const city = bySlug.get('city'), wm = bySlug.get('westminster');

add('prologue', {title: 'Prologue'}, `
  <div class="era reveal"><p class="eyebrow">Prologue</p>
  <h2>How London came to be in thirty-three parts</h2>
  <p>Ask a Londoner where they live and they won’t say “London”. They’ll say Peckham, or Walthamstow, or Kingston. The city is a federation of places, most of them far older than the city that swallowed them.</p>
  <p>Before we visit them one at a time, here is how the map came to look like this.</p></div>`,
  () => ({fill: () => LAND}));

add('londinium', {title: 'Londinium'}, `
  <div class="era reveal"><span class="year">AD 47</span><h2>A bridge, and a town</h2>
  <p>Around AD 47 Roman engineers chose a spot where the Thames could be bridged: two low gravel hills on the north bank, firm ground above the marsh. They called it <em>Londinium</em>. It became the capital of Roman Britain, and in about AD 200 it got a wall.</p>
  <p>For the next thousand years “London” meant this one small walled town. The boundary of today’s City still roughly follows the line of that wall.</p></div>`,
  () => ({box: city.b, pad: 0.4, min: 190, fill: t => t === city ? '#c23b22' : LAND_DIM, marker: true, caption: cap('AD 47', '<i>Londinium</i>')}));

add('two-cities', {title: 'Two cities'}, `
  <div class="era reveal"><span class="year">1065</span><h2>Two cities, one road</h2>
  <p>About two miles upstream, Edward the Confessor built a great abbey and a palace on Thorney Island. From then on London had two centres: the City for trade, and Westminster for the Crown and, later, Parliament. The Strand, the old “shore” road along the river, linked them.</p>
  <p>Everything in between, and everything around, was countryside.</p></div>`,
  () => ({box: unionBox([city, wm]), pad: 0.35, min: 240, fill: t => t === city || t === wm ? '#c23b22' : LAND_DIM, caption: cap('1065', 'The City &amp; <i>Westminster</i>')}));

const cFill = t => {
  const cs = C.counties[t.slug];
  return cs.length > 1 ? `url(#m-st-${t.slug})` : countyColor(cs[0]);
};
add('shires', {title: 'The shires'}, `
  <div class="era reveal"><span class="year">Before</span><h2>The shires</h2>
  <p>For most of its history, the land that is now London belonged to the counties around it: <strong>Middlesex</strong> north of the river, <strong>Surrey</strong> to the south, <strong>Kent</strong> to the south-east, <strong>Essex</strong> across the River Lea, and a sliver of <strong>Hertfordshire</strong> at the top.</p>
  <p>The villages that became today’s boroughs were county villages, with parish churches, greens, manors and markets. Look closely and you can still see it: Barnet was part Hertfordshire, and Richmond sat astride Surrey and Middlesex. Their stripes on the map show it.</p></div>`,
  () => ({fill: cFill, legend: legendRows('The historic counties', ['middlesex', 'surrey', 'kent', 'essex', 'herts', 'city'].map(k => [countyColor(k), C.countyInfo[k].name])), caption: cap('Before 1889', 'The <i>shires</i>')}));

add('county', {title: 'County of London'}, `
  <div class="era reveal"><span class="year">1889</span><h2>The County of London</h2>
  <p>By the 1880s the villages had merged into the biggest city on Earth, run by a patchwork of parish vestries and boards. In 1889 Parliament drew a new <strong>County of London</strong> around the built-up core, governed by the London County Council.</p>
  <p>In 1900 the county was divided into 28 metropolitan boroughs. Most of them were later merged into the twelve boroughs of today’s Inner London.</p></div>`,
  () => ({fill: t => INNER.has(t.slug) ? (t === city ? '#c23b22' : 'oklch(0.8 0.08 40)') : LAND_DIM, op: t => INNER.has(t.slug) ? 1 : 0.75,
    legend: legendRows('1889', [['oklch(0.8 0.08 40)', 'County of London'], [LAND_DIM, 'Still in the shires']]), caption: cap('1889', 'The County of <i>London</i>')}));

add('greater', {title: 'Greater London'}, `
  <div class="era reveal"><span class="year">1965</span><h2>Greater London</h2>
  <p>London kept spreading along railways and new arterial roads, into Middlesex, Essex, Kent and Surrey. On 1 April 1965 the London Government Act took effect. It abolished Middlesex as a county, merged dozens of old boroughs and urban districts, and drew a new map with <strong>thirty-two London boroughs</strong>. The ancient City was, as always, left to run itself.</p>
  <p>The Greater London Council that was set up over them was abolished in 1986. Since 2000 a Mayor and an Assembly have handled London-wide matters, while the boroughs look after bins, schools, libraries and planning.</p></div>`,
  () => ({fill: t => t.tint, stagger: true, caption: cap('1 April 1965', '<i>Greater</i> London')}));

add('line', {title: 'The Borough Line'}, `
  <div class="era reveal"><p class="eyebrow">The route</p><h2>The Borough Line</h2>
  <p>This atlas visits all of them in the order a traveller might: a loop through the old core, then the long circuit of the outer ring. <strong>Thirty-three stops.</strong></p>
  <p>At each one you’ll find where the name comes from, a little history, and a few things worth knowing. Tap any borough on the map to jump straight to it.</p></div>`,
  () => ({fill: t => t.tint, route: N, stagger: true, caption: cap('33 stops', 'The Borough <i>Line</i>')}));

add('part-1', {title: 'Part One', idx: 0}, `
  <div class="part reveal"><span class="part-num">Part one</span><h2>The Old <em>Core</em></h2><div class="rule"></div>
  <p>The City, and the twelve boroughs carved from the old County of London. Thirteen stops, starting where London started, and ending where the world’s time begins.</p></div>`,
  () => ({box: innerBox, pad: 0.06, fill: t => INNER.has(t.slug) ? LAND : LAND_DIM, op: t => INNER.has(t.slug) ? 1 : 0.8, route: 1, ghost: true, caption: cap('Part one', 'The Old <i>Core</i>')}));

function chapterHTML(t) {
  const e = t.etym;
  const motto = t.motto ? `<p class="motto"><span class="lab">Motto</span><em>${t.motto.text}</em>${t.motto.tr ? `<span>“${t.motto.tr}”</span>` : ''}</p>` : '';
  const area = t.area < 10 ? t.area.toFixed(1) : fmt(t.area);
  return `
  <article class="card reveal" style="--c:${t.vivid};--t:${t.tint};--deep:${t.deep}">
    <div class="stop"><span class="roundel">${pad2(t.i + 1)}</span><span>Stop ${t.i + 1} of ${N} · ${t.ring}</span></div>
    <h2>${t.name.replace(' and ', ' &amp; ')}</h2>
    <p class="tagline">${t.tagline}</p>
    <div class="etym"><span class="lab">The name</span><span class="oe">${e.word}</span><span class="gloss">“${e.gloss}”</span><p>${e.note}</p></div>
    <dl class="stats">
      <div><dt>People</dt><dd data-n="${t.pop}">${fmt(t.pop)}</dd></div>
      <div><dt>Area</dt><dd>${area}<small> km²</small></dd></div>
      <div><dt>Per km²</dt><dd data-n="${Math.round(t.density / 10) * 10}">${fmt(Math.round(t.density / 10) * 10)}</dd></div>
    </dl>
    <p class="formed">${t.formed}</p>
    <div class="story">${t.story.map(p => `<p>${p}</p>`).join('')}</div>
    <aside class="curios"><h3>Curiosities</h3><ol>${t.facts.map(f => `<li>${f}</li>`).join('')}</ol></aside>
    ${motto}
  </article>`;
}
const chapterState = t => () => {
  const big = isMobile() ? 170 : 150;
  return {box: t.b, pad: t.slug === 'city' ? 0.5 : 0.3, min: big,
    fill: u => u.i < t.i ? u.tint : u.i === t.i ? t.vivid : LAND,
    route: t.i + 1, ghost: true, focus: t, meridian: t.slug === 'greenwich',
    caption: cap(`Stop ${pad2(t.i + 1)} of ${N}`, t.name.replace(' and ', ' &amp; '))};
};

// names interlude state
let nameIdx = 0, nameAuto = 0, nameUser = false;
const namesState = () => {
  const n = C.names[nameIdx];
  const hit = new Set(n.hits.map(h => h[0]));
  return {fill: t => hit.has(t.slug) ? t.vivid : LAND, route: 0, caption: cap('What’s in a name?', `<i>${n.el}</i>`),
    legend: legendRows(`${n.el} · ${n.oe}`, [['#c23b22', `${hit.size} borough${hit.size > 1 ? 's' : ''}`]]).replace('#c23b22', 'linear-gradient(90deg,' + [...hit].slice(0, 4).map(s => bySlug.get(s).vivid).join(',') + ')')};
};

tour.forEach(t => {
  if (t.i === 13) {
    add('names', {title: 'What’s in a name?', idx: 12}, `
      <div class="names reveal"><p class="eyebrow">Interlude</p><h2>What’s in a name?</h2>
      <p>Almost every borough has an Old English name, from the language of the Saxon farmers who settled the Thames valley after the Romans left. Read the names properly and the map turns into a description of the land fifteen hundred years ago: who owned it, what grew there, where the boats came in.</p>
      <p>Pick an ending to see where it turns up.</p>
      <div class="chips" role="tablist">${C.names.map((n, i) => `<button class="chip" role="tab" data-i="${i}">${n.el}</button>`).join('')}</div>
      <div class="chip-detail" id="chip-detail" aria-live="polite"></div></div>`,
      namesState);
    add('part-2', {title: 'Part Two', idx: 12}, `
      <div class="part reveal"><span class="part-num">Part two</span><h2>The Outer <em>Ring</em></h2><div class="rule"></div>
      <p>Twenty boroughs that were Kent, Surrey, Middlesex, Essex and Hertfordshire until 1965: market towns, royal forests, airfields, factories and miles of suburbs. We go clockwise, starting on the eastern marshes.</p></div>`,
      () => ({fill: u => INNER.has(u.slug) ? u.tint : LAND, route: 13, ghost: true, caption: cap('Part two', 'The Outer <i>Ring</i>')}));
  }
  add(t.slug, {title: t.name.replace(' and ', ' & '), idx: t.i, num: pad2(t.i + 1)}, chapterHTML(t), chapterState(t), 'chapter');
});

// by the numbers
const rankList = (metric, f, n = 5, asc = false) => {
  const s = [...tour].sort((a, b) => asc ? a[metric] - b[metric] : b[metric] - a[metric]).slice(0, n);
  return `<ol class="rank">${s.map((t, i) => `<li><span>${i + 1}</span><span>${t.name.replace(' and ', ' &amp; ')}</span><span>${f(t[metric])}</span></li>`).join('')}</ol>`;
};
const numState = (metric, label) => () => ({dorling: metric, fill: () => LAND, op: () => 0.22, caption: cap('By the numbers', label)});
const totalPop = tour.reduce((a, t) => a + t.pop, 0);
add('people', {title: 'By the numbers', idx: 32}, `
  <div class="era reveal"><p class="eyebrow">By the numbers · i</p><h2>People</h2>
  <span class="num-big">${(totalPop / 1e6).toFixed(1)} million</span>
  <p>Here each borough is redrawn as a circle sized by its population, as near as possible to where it really sits. Size by people and the map turns inside out. The outer suburbs are the giants: Croydon and Barnet each have more residents than Cardiff.</p>
  <p>The City, where London began, shrinks to a dot. About 8,600 people sleep there.</p>
  ${rankList('pop', v => fmt(Math.round(v / 100) * 100))}</div>`, numState('pop', '<i>People</i>'));
add('land', {title: 'By the numbers', idx: 32}, `
  <div class="era reveal"><p class="eyebrow">By the numbers · ii</p><h2>Land</h2>
  <span class="num-big">${fmt(tour.reduce((a, t) => a + t.area, 0))} km²</span>
  <p>Size by area and the outer ring takes over completely. Bromley alone could hold the City of London about fifty times over. Kensington &amp; Chelsea, the smallest of the 32 boroughs, covers just 12 square kilometres.</p>
  ${rankList('area', v => fmt(v) + ' km²')}</div>`, numState('area', '<i>Land</i>'));
add('crowding', {title: 'By the numbers', idx: 32}, `
  <div class="era reveal"><p class="eyebrow">By the numbers · iii</p><h2>Crowding</h2>
  <span class="num-big">×7</span>
  <p>Divide people by land and the old core wins again. Tower Hamlets packs nearly 16,000 people into each square kilometre, about seven times as many as leafy Bromley. Islington and Hackney are close behind.</p>
  ${rankList('density', v => fmt(Math.round(v / 10) * 10) + ' /km²')}</div>`, numState('density', '<i>Crowding</i>'));

add('finale', {title: 'Journey’s end', idx: 32}, `
  <div class="finale reveal"><p class="eyebrow">Journey’s end</p><h2>Thirty-three places. One city.</h2>
  <p>London was never designed. It is a Roman bridgehead and a royal abbey, a scatter of Saxon farms, fords and clearings, a ring of Victorian railway suburbs and post-war estates. River, road and rail pulled it together, and in 1965 so did an Act of Parliament.</p>
  <p>Under the traffic, every borough is still more or less the place it started as: Haca’s island, the lamb wharf, the clearing where the broom grew.</p>
  <blockquote>“When a man is tired of London, he is tired of life; for there is in London all that life can afford.”<cite>Samuel Johnson, 1777</cite></blockquote>
  <a class="again" href="#top">Back to the start <span aria-hidden="true">↑</span></a>
  <nav class="index" aria-label="All stops">${tour.map(t => `<a href="#${t.slug}" style="--t:${t.tint}">${pad2(t.i + 1)} ${t.name.replace(' and ', ' & ').replace(' upon Thames', '')}</a>`).join('')}</nav></div>`,
  () => ({fill: t => t.soft, route: N, stagger: true, caption: cap('The end of the line', 'All <i>thirty-three</i>')}));

/* render steps */
const stepsEl = $('#steps');
stepsEl.innerHTML = steps.map((s, i) => `<section class="step ${s.cls}" id="${s.id}" data-i="${i}">${s.html}</section>`).join('');
const stepEls = [...stepsEl.children];

/* ------------------------------------------------------------- rail */
const rail = $('#rail'), railTrack = $('#rail-track'), railFill = $('#rail-fill');
const stnEls = tour.map(t => {
  const b = document.createElement('button');
  b.className = 'stn';
  b.style.left = (t.i / (N - 1) * 100) + '%';
  b.setAttribute('aria-label', `Stop ${t.i + 1}: ${t.name}`);
  b.innerHTML = `<span class="stn-tip">${pad2(t.i + 1)} · ${t.name.replace(' and ', ' & ')}</span>`;
  b.addEventListener('click', () => goTo(t.slug));
  railTrack.appendChild(b);
  return b;
});
function setRail(s) {
  const idx = s.rail.idx ?? -1;
  $('#rail-num').textContent = s.rail.num ? `${s.rail.num}/${N}` : '·';
  $('#rail-title').textContent = s.rail.title;
  const isCh = s.cls === 'chapter';
  railFill.style.width = idx < 0 ? '0' : (idx / (N - 1) * 100) + '%';
  stnEls.forEach((b, i) => { b.classList.toggle('done', idx >= 0 && i <= idx); b.classList.toggle('cur', isCh && i === idx); });
}

/* ------------------------------------------------------------- activation */
let active = -1;
const counted = new WeakSet();
function activate(i) {
  if (i === active) return;
  active = i;
  const s = steps[i];
  applyState(s.state());
  setRail(s);
  stepEls.forEach((el, j) => el.classList.toggle('is-active', j === i));
  if (s.cls === 'chapter') {
    countUp(stepEls[i]);
    if (history.replaceState) history.replaceState(null, '', '#' + s.id);
  }
  if (s.id === 'names') startNames(); else stopNames();
}
function countUp(root) {
  if (counted.has(root)) return;
  counted.add(root);
  if (reduce) return;
  root.querySelectorAll('dd[data-n]').forEach(dd => {
    const target = +dd.dataset.n, t0 = performance.now(), dur = 1100;
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      dd.textContent = fmt(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

let io;
function observe() {
  if (io) io.disconnect();
  const band = isMobile() ? '-70% 0px -28% 0px' : '-48% 0px -50% 0px';
  io = new IntersectionObserver(es => {
    for (const e of es) if (e.isIntersecting) activate(+e.target.dataset.i);
  }, {rootMargin: band});
  stepEls.forEach(el => io.observe(el));
}
const revIO = new IntersectionObserver(es => {
  for (const e of es) if (e.isIntersecting) { e.target.classList.add('in'); revIO.unobserve(e.target); }
}, {threshold: 0, rootMargin: '0px 0px -12% 0px'});
document.querySelectorAll('.reveal').forEach(el => revIO.observe(el));

/* ------------------------------------------------------------- names interlude */
const chips = [...document.querySelectorAll('.chip')];
function showName(i) {
  nameIdx = i;
  const n = C.names[i];
  chips.forEach((c, j) => { c.classList.toggle('on', j === i); c.setAttribute('aria-selected', j === i); });
  $('#chip-detail').innerHTML = `<div class="cd-in"><div class="cd-head"><span class="cd-el">${n.el}</span><span class="cd-oe">Old English <i>${n.oe}</i></span></div>
    <p class="cd-meaning">${n.meaning}</p>
    <ul>${n.hits.map(([slug, place, m]) => `<li><b>${place}</b>${place.startsWith(bySlug.get(slug).name.split(' ')[0]) ? '' : ` <small>(${bySlug.get(slug).name.replace(' and ', ' & ')})</small>`}<br><span>${m}</span></li>`).join('')}</ul></div>`;
  if (steps[active] && steps[active].id === 'names') applyState(namesState());
}
chips.forEach((c, i) => {
  const pick = () => { nameUser = true; stopNames(); showName(i); };
  c.addEventListener('click', pick);
  c.addEventListener('mouseenter', () => { if (!isMobile()) pick(); });
});
function startNames() {
  if (nameUser || reduce) return;
  stopNames();
  nameAuto = setInterval(() => showName((nameIdx + 1) % C.names.length), 3400);
}
function stopNames() { clearInterval(nameAuto); nameAuto = 0; }
showName(0);

/* ------------------------------------------------------------- interaction */
const tip = $('#tip');
function showTip(e, html) {
  tip.innerHTML = html;
  tip.classList.add('on');
  const x = Math.min(e.clientX + 16, innerWidth - tip.offsetWidth - 10), y = e.clientY + 18 + tip.offsetHeight > innerHeight ? e.clientY - tip.offsetHeight - 12 : e.clientY + 18;
  tip.style.transform = `translate(${x}px, ${y}px)`;
}
const hideTip = () => tip.classList.remove('on');
function tipFor(t) {
  const s = curState && curState.dorling;
  const v = s === 'pop' ? `${fmt(Math.round(t.pop / 100) * 100)} people` : s === 'area' ? `${t.area.toFixed(1)} km²` : s === 'density' ? `${fmt(Math.round(t.density / 10) * 10)} people per km²` : t.tagline;
  return `<small>Stop ${t.i + 1} · ${t.ring}</small><b>${t.name.replace(' and ', ' &amp; ')}</b>${v}`;
}
for (const svg of [M.svg, hero.svg]) {
  svg.addEventListener('pointermove', e => {
    const slug = e.target.dataset && e.target.dataset.slug;
    if (slug && e.pointerType !== 'touch') showTip(e, tipFor(bySlug.get(slug))); else hideTip();
  });
  svg.addEventListener('pointerleave', hideTip);
  svg.addEventListener('click', e => {
    const slug = e.target.dataset && e.target.dataset.slug;
    if (slug) { hideTip(); goTo(slug); }
  });
}
function goTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const target = el.querySelector('.card, .era, .part, .names, .finale') || el;
  const offset = isMobile() ? $('#figure').offsetHeight + 12 : $('#rail').offsetHeight + 28;
  window.scrollTo({top: target.getBoundingClientRect().top + scrollY - offset, behavior: reduce ? 'auto' : 'smooth'});
}
document.addEventListener('click', e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href').slice(1);
  if (id === 'top') return;
  if (document.getElementById(id) && document.getElementById(id).classList.contains('step')) { e.preventDefault(); goTo(id); }
});

/* ------------------------------------------------------------- scroll FX */
const heroMap = $('.hero-map'), heroText = $('.hero-text');
let ticking = false;
function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    ticking = false;
    const y = scrollY, h = innerHeight;
    rail.classList.toggle('show', y > h * 0.7);
    if (y < h * 1.2 && !reduce) {
      heroMap.style.transform = `translate3d(0, ${(y * 0.22).toFixed(1)}px, 0)`;
      heroText.style.transform = `translate3d(0, ${(y * 0.08).toFixed(1)}px, 0)`;
      heroText.style.opacity = Math.max(0, 1 - y / (h * 0.75)).toFixed(3);
    }
    if (y < h * 0.5 && active > 0) { /* scrolled back to the top */ }
  });
}
addEventListener('scroll', onScroll, {passive: true});

let lastW = innerWidth, lastMobile = isMobile();
addEventListener('resize', () => {
  sizeHero();
  measure();
  if (curState) {
    const s = curState;
    Object.assign(cam, s.dorling ? cam : fitBox(s.box, s.pad, s.min));
    renderCam();
  }
  if (isMobile() !== lastMobile) { lastMobile = isMobile(); observe(); }
  lastW = innerWidth;
});

/* ------------------------------------------------------------- go */
measure();
Object.assign(cam, fitBox(OVER, 0.03));
activate(0);
sizeHero();
observe();
onScroll();
// deep link
const hash = decodeURIComponent(location.hash.slice(1));
if (hash && document.getElementById(hash) && hash !== 'top') {
  requestAnimationFrame(() => setTimeout(() => {
    const el = document.getElementById(hash);
    const target = el.querySelector('.card, .era, .part, .names, .finale') || el;
    const offset = isMobile() ? $('#figure').offsetHeight + 12 : 74;
    window.scrollTo({top: target.getBoundingClientRect().top + scrollY - offset, behavior: 'auto'});
  }, 60));
}
})();
