/* ============================================================================
   AI Deep Time — app-charts.js (part 2a)
   The reusable SVG figure core, the metrics dashboard chart (#chartPanel) and
   the acceleration view: (a) starfield #starPanel, (b) shrinking gap #gapPanel,
   (c) compute with growth regimes #computePanel, (d) time to saturation
   #satPanel, (e) price collapse #pricePanel, (f) fact tiles #factStrip.
   Extends window.AIDT from app.js (part 1). Plain ES5 inside one IIFE so it can
   be compiled anywhere. No fact lives here: every number, label and date comes
   from window.AIH (series, facts, milestones, models, eras).
   ========================================================================== */
(function () {
'use strict';
var A = window.AIDT;
if (!A || !A.registerPanel) { if (window.console) console.error('[AIDT charts] app.js (part 1) must load first'); return; }
var AIH = window.AIH = window.AIH || {};
var state = A.state, fmt = A.fmt, esc = A.esc, L = A.L, t = A.t, clamp = A.clamp, closest = A.closest;
var NBSP = ' ';
var CH = 6.7;                 /* px per character of 11 px JetBrains Mono */
var LN10 = Math.LN10;

/* ============================================================================
   1. STRINGS (added to AIH.ui; every other key already exists in part 1)
   ========================================================================== */
A.addStrings({
  en: {
    'chart.keyLit': 'lit: up to the playhead',
    'chart.keyEst': 'hollow: estimate',
    'chart.keyGhost': 'faint: still ahead',
    'chart.pin': 'Tap a point to pin its details; Enter opens its sources.',
    'chart.jump': 'Click again to move the timeline here.',
    'chart.est': 'est.',
    'chart.skipped': '{n} non-positive values cannot be drawn on a log axis.',
    'count.points': 'point|points',
    'count.gaps': 'gap|gaps',
    'count.releases': 'release|releases',
    'gap.empty': 'Only one key milestone so far; the gaps appear from the second one on.',
    'gap.current': 'the gap the playhead is in',
    'compute.pre': 'until {y}',
    'compute.post': 'since {y}',
    'compute.guide': 'Guide lines: the dataset’s doubling times, drawn through each regime’s points',
    'compute.fit': 'Guide lines: least-squares fit to the points shown',
    'sat.introduced': 'Introduced',
    'sat.beaten': 'Human reference beaten',
    'sat.open': 'not yet beaten at this point of the timeline',
    'sat.years': 'years to beat the human reference',
    'price.levels': 'Same capability, cheapest public price',
    'price.span': '{from} → {to} in {d}',
    'price.notYet': 'not yet priced at this point',
    'facts.more': 'Show all {n}',
    'facts.less': 'Show fewer',
    'facts.src': 'Source',
    'star.milestone': 'Milestone',
    'star.model': 'Model release',
    'star.sig': 'significance {n}',
    'star.perDecade': 'per decade'
  },
  uk: {
    'chart.keyLit': 'засвічено: до повзунка',
    'chart.keyEst': 'порожній маркер: оцінка',
    'chart.keyGhost': 'пригашено: ще попереду',
    'chart.pin': 'Торкніться точки, щоб закріпити підказку; Enter відкриває її джерела.',
    'chart.jump': 'Клацніть ще раз, щоб перейти сюди на шкалі часу.',
    'chart.est': 'оц.',
    'chart.skipped': '{n} недодатних значень не можна показати на логарифмічній осі.',
    'count.points': 'точка|точки|точок',
    'count.gaps': 'проміжок|проміжки|проміжків',
    'count.releases': 'реліз|релізи|релізів',
    'gap.empty': 'Поки що лише одна ключова віха; проміжки з’являться з другої.',
    'gap.current': 'проміжок, у якому стоїть повзунок',
    'compute.pre': 'до {y}',
    'compute.post': 'від {y}',
    'compute.guide': 'Орієнтири: час подвоєння з дослідницького файлу, проведений через точки кожного режиму',
    'compute.fit': 'Орієнтири: підгонка методом найменших квадратів до показаних точок',
    'sat.introduced': 'З’явився',
    'sat.beaten': 'Людський орієнтир перевищено',
    'sat.open': 'на цій позначці шкали ще не подолано',
    'sat.years': 'років до перевищення людського орієнтира',
    'price.levels': 'Та сама якість, найдешевша публічна ціна',
    'price.span': '{from} → {to} за {d}',
    'price.notYet': 'на цій позначці ще без ціни',
    'facts.more': 'Показати всі ({n})',
    'facts.less': 'Показати менше',
    'facts.src': 'Джерело',
    'star.milestone': 'Віха',
    'star.model': 'Реліз моделі',
    'star.sig': 'значущість {n}',
    'star.perDecade': 'за десятиліття'
  }
});

/* ============================================================================
   2. INJECTED STYLE (chart widgets only; index.html holds the base chart CSS)
   ========================================================================== */
(function injectStyle() {
  if (document.getElementById('aidt-charts-style')) return;
  var css = [
    '.chart-empty{pointer-events:none}.chart-empty div{pointer-events:auto}',
    '.chart .pt.est{stroke-dasharray:2 2;stroke-width:1.5}.chart .pt.est.ghost{fill:none;stroke:var(--fg-3)}',
    '.chart .pt.hot{stroke:var(--fg);stroke-width:2.5}',
    '.chart .ser.lit{stroke-width:2}.chart .ser.ghost{stroke-width:1.5}',
    '.chart text.lbl,.chart text.annot,.chart text.val,.chart text.cursor-lbl,.chart text.ref-lbl,.chart text.cnt{paint-order:stroke;stroke:var(--bg-2);stroke-width:3px;stroke-linejoin:round}',
    '.chart .era-band{opacity:.08}',
    '.chart .halo{opacity:.22}.chart .core{stroke:none}.chart .star{opacity:.85}.chart .fut{opacity:.38}',
    '.chart .pulse{animation:aidt-pulse 2.4s ease-in-out infinite}@keyframes aidt-pulse{0%,100%{opacity:.25}50%{opacity:.95}}',
    '@media (prefers-reduced-motion:reduce){.chart .pulse{animation:none;opacity:.6}}',
    '.chart .bar{fill:var(--fg-2)}.chart .bar.ghost{fill:var(--fg-3);fill-opacity:.3}.chart .bar.cur{stroke:var(--fg);stroke-width:1.5}',
    '.chart .bar.hot{fill-opacity:1;stroke:var(--fg);stroke-width:1.5}',
    '.chart .bar-out{fill:none;stroke:var(--fg-3);stroke-dasharray:3 3;stroke-width:1}',
    '.chart .row-lbl{fill:var(--fg-2);font-size:11px}.chart .row-lbl.ghost{fill:var(--fg-3)}',
    '.chart text.val{fill:var(--fg);font-size:11px;font-weight:500}.chart text.val.ghost{fill:var(--fg-3);font-weight:400}',
    '.chart text.cnt{fill:var(--fg-2);font-size:11px;font-weight:500}.chart text.dec{fill:var(--fg-3);font-size:10.5px}',
    '.chart text.annot.strong{fill:var(--fg);font-weight:500}',
    '.chart-tip.pinned{pointer-events:auto}.chart-tip .d{color:var(--fg-3);font-size:11px;margin-top:2px;line-height:1.35}.chart-tip .u{color:var(--fg-3);font-size:11px}',
    '.chart-tip .src-btn{margin-top:5px}.chart-tip .nt{font-size:11px;color:var(--fg-2);margin-top:3px}',
    '.chart-key{display:flex;flex-wrap:wrap;gap:4px 12px;font:11px/1.4 var(--mono);color:var(--fg-3);margin-left:auto}',
    '.chart-key i{display:inline-block;width:9px;height:9px;border-radius:50%;vertical-align:-1px;margin-right:5px;box-sizing:border-box}',
    '.chart-key .ki-lit{background:var(--accent)}.chart-key .ki-est{border:1.5px dashed var(--fg-2)}.chart-key .ki-ghost{background:var(--fg-3);opacity:.45}',
    '.chart-what{font-size:13px;color:var(--fg-2);margin:0 0 10px;max-width:72ch}',
    '.chart-tools select{font:12px var(--mono);padding:6px 8px;max-width:100%}',
    '.chart-tools label{font:500 11px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--fg-3)}',
    '.chart-hint{font:11px/1.4 var(--mono);color:var(--fg-3);margin-top:6px}',
    '.tbl-view{margin-top:8px}.tbl-view td.est-c{font-size:10px}',
    '.price-legend{list-style:none;margin:0 0 10px;padding:0;display:grid;gap:6px;font:12px/1.4 var(--mono);color:var(--fg-2)}',
    '.price-legend li{display:grid;grid-template-columns:16px minmax(0,1fr);gap:1px 8px;align-items:baseline}',
    '.price-legend i{display:inline-block;width:16px;height:2px;background:var(--kc);vertical-align:middle}',
    '.price-legend .nm{color:var(--fg);font-family:var(--serif);font-size:13.5px}.price-legend .drop{grid-column:2;font-size:11px;color:var(--fg-3)}',
    '.price-legend .drop b{font-weight:600;color:var(--fg)}.price-legend li.fut{opacity:.5}',
    '.fig-head .meta{text-align:right}',
    '.fact .stat-v{overflow-wrap:anywhere}.fact .stat-v.long{font-size:20px;line-height:1.15}.fact .stat-v.xl{font-size:17px;line-height:1.2}',
    '.fact .t.clamp{display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}.fact .t{cursor:pointer}',
    '.fact .src-row{display:flex;justify-content:space-between;gap:8px;align-items:baseline}',
    '.facts-more{margin-top:12px}',
    '.empty.small{font-size:13px}'
  ].join('');
  var st = document.createElement('style'); st.id = 'aidt-charts-style'; st.textContent = css;
  (document.head || document.body).appendChild(st);
})();

/* ============================================================================
   3. HELPERS: numbers, dates, ticks, labels, colours
   ========================================================================== */
function log10(v) { return Math.log(v) / LN10; }
function textW(s, size) { return String(s == null ? '' : s).length * CH * ((size || 11) / 11); }
/* A point's descriptive label: `labelUk` in Ukrainian when the data carries one, else `label` (an English string). */
function pLabel(p) { return p ? (state.lang === 'uk' && p.labelUk ? p.labelUk : (L(p.label) || '')) : ''; }
function toT(iso) {                                   /* 'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD' -> decimal year (schema convention) */
  var m = /^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?/.exec(String(iso || ''));
  if (!m) return NaN;
  var y = +m[1], mo = m[2] ? +m[2] : null, d = m[3] ? +m[3] : null;
  if (mo == null) return y + 0.5;
  var cum = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  var doy = cum[mo - 1] + (d == null ? 15 : d);
  return y + (doy - 1) / 365;
}
function eraColorAt(tt) { var e = A.eraAt(tt); return e ? A.eraColor(e) : 'var(--fg-2)'; }
function eraMidStops(xPx, pw) {                        /* gradient stops through the era midpoints: the fuse, on a chart */
  var eras = A.data().eras, stops = [];
  for (var i = 0; i < eras.length; i++) {
    var e = eras[i], mid = (e.start + e.end) / 2, off = clamp(xPx(mid) / pw, 0, 1);
    stops.push('<stop offset="' + (off * 100).toFixed(2) + '%" stop-color="' + esc(A.eraColor(e)) + '"/>');
  }
  return stops.join('');
}
var uidN = 0;
function uid() { return 'aidt-c' + (++uidN); }
function money(v) {
  var s = fmt.num(v, v < 1 ? 2 : v < 100 ? 1 : 0);
  return state.lang === 'uk' ? s + NBSP + '$' : '$' + s;
}
/* Tick + value formatters for a unit string. */
function makeFmt(unit) {
  var u = String(unit || '');
  var isMoney = /^(USD|\$)/i.test(u), isPct = /^%/.test(u), isFlop = /FLOP\b/.test(u);
  function tick(v) {
    if (isMoney) return money(v);
    if (isPct) return fmt.num(v, 0) + (state.lang === 'uk' ? NBSP + '%' : '%');
    if (isFlop || v >= 1e6 || (v > 0 && v < 1e-3)) return fmt.sci(v, 1);
    if (v >= 1000) return fmt.compact(v, 0);
    return fmt.num(v, v < 1 ? 2 : 0);
  }
  function val(v) {
    if (isMoney) return money(v);
    if (isPct) return fmt.pct(v, 1);
    if (isFlop || v >= 1e9) return fmt.sci(v, 1);
    if (v >= 1e5) return fmt.compact(v, 1);
    return fmt.num(v);
  }
  return { tick: tick, val: val };
}
function niceStep(range, n) {
  var raw = range / (n || 5), p = Math.pow(10, Math.floor(log10(raw))), m = raw / p;
  return (m <= 1 ? 1 : m <= 2 ? 2 : m <= 5 ? 5 : 10) * p;
}
function linTicks(lo, hi, n) {
  var s = niceStep(hi - lo, n), out = [], v;
  for (v = Math.ceil(lo / s - 1e-9) * s; v <= hi + s * 1e-9; v += s) out.push(+v.toFixed(10));
  return out;
}
function logTicks(eLo, eHi) {                         /* powers of ten; step 1,2,3,5,10 decades so there are <= 7 labels */
  var n = eHi - eLo, steps = [1, 2, 3, 5, 10], step = 10;
  for (var i = 0; i < steps.length; i++) if (n / steps[i] <= 7) { step = steps[i]; break; }
  var out = [];
  for (var e = Math.ceil(eLo / step) * step; e <= eHi; e += step) out.push(Math.pow(10, e));
  return out;
}
/* Year ticks placed greedily by priority (decades, fives, evens, odds) with a minimum pixel gap. */
function yearTicks(t0, t1, xPx, minGap) {
  var cands = [], y;
  for (y = Math.ceil(t0); y <= Math.floor(t1); y++) cands.push(y);
  var pri = function (yy) { return yy % 10 === 0 ? 3 : yy % 5 === 0 ? 2 : yy % 2 === 0 ? 1 : 0; };
  cands.sort(function (a, b) { return pri(b) - pri(a) || a - b; });
  var placed = [];
  for (var i = 0; i < cands.length; i++) {
    var x = xPx(cands[i]), ok = true;
    for (var j = 0; j < placed.length; j++) if (Math.abs(placed[j].x - x) < minGap) { ok = false; break; }
    if (ok) placed.push({ t: cands[i], x: x });
  }
  placed.sort(function (a, b) { return a.x - b.x; });
  return placed;
}
/* Tiny label placer: rejects or nudges labels that would collide. boxes = [{x,y,w,h}] are hard (text, walls);
   pts = [{x,y}] are soft (data points, ±5 px): a label avoids them when any candidate spot is free of them. */
function Placer() { this.boxes = []; this.pts = []; }
Placer.prototype.fits = function (b, withPts) {
  for (var i = 0; i < this.boxes.length; i++) {
    var o = this.boxes[i];
    if (b.x < o.x + o.w && b.x + b.w > o.x && b.y < o.y + o.h && b.y + b.h > o.y) return false;
  }
  if (withPts) for (var j = 0; j < this.pts.length; j++) { var p = this.pts[j]; if (p.x + 6 > b.x && p.x - 6 < b.x + b.w && p.y + 6 > b.y && p.y - 6 < b.y + b.h) return false; }
  return true;
};
/* collision cost of a box: 10 per hard box, 1 per point (points are r 4.5 plus a 2 px ring, so ±6) */
Placer.prototype.overlaps = function (b) {
  var n = 0, i, o, p;
  for (i = 0; i < this.boxes.length; i++) { o = this.boxes[i]; if (b.x < o.x + o.w && b.x + b.w > o.x && b.y < o.y + o.h && b.y + b.h > o.y) n += 10; }
  for (i = 0; i < this.pts.length; i++) { p = this.pts[i]; if (p.x + 6 > b.x && p.x - 6 < b.x + b.w && p.y + 6 > b.y && p.y - 6 < b.y + b.h) n++; }
  return n;
};
Placer.prototype.add = function (b) { this.boxes.push(b); };
Placer.prototype.addPoint = function (x, y) { this.pts.push({ x: x, y: y }); };
/* try offsets in order, first clear of points too, then clear of boxes only; returns the chosen {x,y} or null */
Placer.prototype.place = function (x, y, w, h, offsets) {
  offsets = offsets || [[0, 0]];
  for (var pass = 0; pass < 2; pass++) for (var i = 0; i < offsets.length; i++) {
    var b = { x: x + offsets[i][0], y: y + offsets[i][1], w: w, h: h };
    /* the stored box is 1.5 px larger on each side than the estimate, so rendered glyph boxes never touch */
    if (this.fits(b, pass === 0)) { this.add({ x: b.x - 1.5, y: b.y - 1.5, w: b.w + 3, h: b.h + 3 }); return b; }
  }
  return null;
};
function svgText(x, y, s, cls, anchor, extra) {
  return '<text class="' + cls + '" x="' + x.toFixed(1) + '" y="' + y.toFixed(1) + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + (extra || '') + '>' + esc(s) + '</text>';
}
function anchorFor(x, pw) { return x < 18 ? 'start' : x > pw - 18 ? 'end' : 'middle'; }
/* The playhead's year label on the x-axis row (so the top row stays free for the unit caption).
   covers(xRel, label) says whether a tick label at that position would collide with it. */
function cursorLabel(now, tLo, tHi, px, X0, pw, Y1) {
  var o = { x: null, text: '', covers: function () { return false; } };
  if (typeof now !== 'number' || now < tLo - 1e-9 || now > tHi + 1e-9) return o;
  var cx = px(now), rel = cx - X0, lbl = fmt.year(now), lw = textW(lbl), anc = anchorFor(rel, pw);
  var bx = anc === 'start' ? rel : anc === 'end' ? rel - lw : rel - lw / 2;
  o.x = cx;
  o.text = svgText(cx, Y1 + 17, lbl, 'cursor-lbl', anc);
  o.covers = function (xRel, s) {
    var w2 = textW(s), a2 = anchorFor(xRel, pw), x2 = a2 === 'start' ? xRel : a2 === 'end' ? xRel - w2 : xRel - w2 / 2;
    return x2 < bx + lw + 6 && x2 + w2 > bx - 6;
  };
  return o;
}
function uniqSources(list) {
  var seen = {}, out = [];
  for (var i = 0; i < list.length; i++) { var ids = list[i] || []; for (var j = 0; j < ids.length; j++) if (!seen[ids[j]]) { seen[ids[j]] = 1; out.push(ids[j]); } }
  return out;
}
function tipHtml(o) {
  var s = '';
  if (o.key) s += '<div class="k"><i style="--kc:' + esc(o.color || 'var(--fg-3)') + '"></i>' + esc(o.key) + '</div>';
  if (o.value != null) s += '<div class="v">' + esc(o.value) + (o.est ? ' <span class="est">' + esc(t('chart.est')) + '</span>' : '') + '</div>';
  if (o.unit) s += '<div class="u">' + esc(o.unit) + '</div>';
  if (o.date || o.label) s += '<div class="d">' + esc(o.date || '') + (o.date && o.label ? ' · ' : '') + esc(o.label || '') + '</div>';
  if (o.note) s += '<div class="nt">' + esc(o.note) + '</div>';
  if (o.sources && o.sources.length) s += '<div><button type="button" class="src-btn" data-src="' + esc(JSON.stringify(o.sources)) + '" data-title="' + esc(o.title || o.label || '') + '">' + esc(o.sources.join(', ')) + '</button></div>';
  if (o.hint) s += '<div class="d">' + esc(o.hint) + '</div>';
  return s;
}
function plural(n, key) { return fmt.int(n) + NBSP + t.plural(n, key); }
function monthsLabel(months) { var n = Math.round(months * 10) / 10; return fmt.num(n, 1) + NBSP + t.plural(n, 'count.months'); }

/* ============================================================================
   4. FIG: the reusable figure core (sizing, tooltip, keyboard, empty state)
   opts = { height: fn(w)->h, draw: fn(fig, w, h) -> {svg, items, empty, aria},
            nearest: 'x' | 'xy', maxDist }
   items = [{ key, x, y, tip (html), sources, title, onClick }]
   ========================================================================== */
function Fig(host, opts) {
  this.opts = opts;
  this.el = document.createElement('div');
  this.el.className = 'chart';
  this.el.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" tabindex="0" data-keys="own" role="img"></svg><div class="chart-empty" hidden><div></div></div><div class="chart-tip" hidden></div>';
  this.svg = this.el.firstChild; this.emptyEl = this.svg.nextSibling; this.tip = this.emptyEl.nextSibling;
  host.appendChild(this.el);
  this.items = []; this.order = []; this.active = null; this.pinned = false; this.kbd = false; this.width = 0; this.h = 0;
  this.pending = false;
  bindFig(this);
  observeFig(this);
}
Fig.prototype.schedule = function () {
  var self = this; if (self.pending) return; self.pending = true;
  requestAnimationFrame(function () { self.pending = false; self.render(); });
};
Fig.prototype.render = function () {
  var w = this.el.clientWidth;
  if (!w) { this.width = 0; return; }
  this.width = w;
  var h = this.opts.height(w), out;
  try { out = this.opts.draw(this, w, h) || {}; }
  catch (e) { if (window.console) console.error('[AIDT charts] draw failed:', e); out = { svg: '', items: [] }; }
  this.h = h;
  this.svg.setAttribute('viewBox', '0 0 ' + w + ' ' + h);
  this.svg.setAttribute('width', w); this.svg.setAttribute('height', h);
  this.svg.setAttribute('aria-label', out.aria || '');
  this.svg.innerHTML = out.svg || '';
  this.items = out.items || [];
  this.order = this.items.slice().sort(function (a, b) { return a.x - b.x || a.y - b.y; });
  if (out.empty) { this.emptyEl.firstChild.innerHTML = '<b>' + esc(out.empty.title) + '</b>' + esc(out.empty.body); this.emptyEl.hidden = false; }
  else this.emptyEl.hidden = true;
  if (this.active) {
    var it = this.find(this.active.key);
    if (it && (this.pinned || this.kbd)) this.showTip(it, this.pinned); else this.hideTip();
  }
};
Fig.prototype.find = function (key) { for (var i = 0; i < this.items.length; i++) if (this.items[i].key === key) return this.items[i]; return null; };
Fig.prototype.svgPoint = function (e) {
  var r = this.svg.getBoundingClientRect(), k = r.width ? this.width / r.width : 1;
  return { x: (e.clientX - r.left) * k, y: (e.clientY - r.top) * k };
};
Fig.prototype.nearest = function (e) {
  var p = this.svgPoint(e), best = null, bd = Infinity, xy = this.opts.nearest === 'xy', max = this.opts.maxDist || (xy ? 26 : 40);
  for (var i = 0; i < this.items.length; i++) {
    var it = this.items[i], d = xy ? Math.sqrt((it.x - p.x) * (it.x - p.x) + (it.y - p.y) * (it.y - p.y)) : Math.abs(it.x - p.x);
    if (xy && it.r) d = Math.max(0, d - it.r);
    if (d < bd) { bd = d; best = it; }
  }
  return bd <= max ? best : null;
};
Fig.prototype.mark = function (it, on) {
  var node = it ? this.svg.querySelector('[data-k="' + it.key + '"]') : null;
  if (!node) return;
  if (on) {
    node.classList.add('hot');
    if (node.tagName === 'circle' && !node.getAttribute('data-r')) { node.setAttribute('data-r', node.getAttribute('r')); node.setAttribute('r', +node.getAttribute('r') + 2); }
  } else {
    node.classList.remove('hot');
    if (node.getAttribute('data-r')) { node.setAttribute('r', node.getAttribute('data-r')); node.removeAttribute('data-r'); }
  }
};
Fig.prototype.showTip = function (it, pin) {
  if (this.active && this.active !== it) this.mark(this.active, false);
  this.active = it;
  if (pin) this.pinned = true;
  this.mark(it, true);
  this.tip.innerHTML = it.tip + (it.onClick && this.pinned ? '<div class="d">' + esc(t('chart.jump')) + '</div>' : '');
  this.tip.hidden = false;
  this.tip.classList.toggle('pinned', !!this.pinned);
  var r = this.el.getBoundingClientRect(), sr = this.svg.getBoundingClientRect(), k = this.width ? sr.width / this.width : 1;
  var px = (sr.left - r.left) + it.x * k, py = (sr.top - r.top) + it.y * k;
  var tw = this.tip.offsetWidth, th = this.tip.offsetHeight;
  var left = px + 14; if (left + tw > r.width - 2) left = px - 14 - tw; if (left < 2) left = 2;
  var top = py - th - 12; if (top < 0) top = py + 14;
  this.tip.style.left = left + 'px'; this.tip.style.top = top + 'px';
};
Fig.prototype.hideTip = function () {
  if (this.active) this.mark(this.active, false);
  this.active = null; this.pinned = false; this.tip.hidden = true; this.tip.classList.remove('pinned');
};
Fig.prototype.unpin = function () { this.pinned = false; this.tip.classList.remove('pinned'); if (!this.kbd) this.hideTip(); };
function bindFig(fig) {
  var svg = fig.svg;
  svg.addEventListener('pointermove', function (e) {
    if (fig.pinned || e.pointerType === 'touch') return;
    var it = fig.nearest(e);
    if (it) { if (fig.active !== it) fig.showTip(it, false); } else if (!fig.kbd) fig.hideTip();
  });
  svg.addEventListener('pointerleave', function () { if (!fig.pinned && !fig.kbd) fig.hideTip(); });
  svg.addEventListener('click', function (e) {
    var it = fig.nearest(e);
    if (!it) { if (fig.pinned) fig.unpin(); return; }
    if (fig.pinned && fig.active === it) { if (it.onClick) it.onClick(); return; }
    fig.kbd = false;
    fig.showTip(it, true);
  });
  svg.addEventListener('keydown', function (e) {
    var k = e.key, o = fig.order, i = fig.active ? o.indexOf(fig.active) : -1, nx = null;
    if (!o.length) return;
    if (k === 'ArrowRight' || k === 'ArrowDown') nx = o[Math.min(o.length - 1, i + 1)];
    else if (k === 'ArrowLeft' || k === 'ArrowUp') nx = o[Math.max(0, i < 0 ? o.length - 1 : i - 1)];
    else if (k === 'Home') nx = o[0];
    else if (k === 'End') nx = o[o.length - 1];
    else if (k === 'Escape') { fig.kbd = false; fig.hideTip(); e.preventDefault(); return; }
    else if (k === 'Enter' || k === ' ') {
      if (fig.active) { if (fig.active.sources && fig.active.sources.length) A.openSources(fig.active.sources, fig.active.title || ''); else if (fig.active.onClick) fig.active.onClick(); e.preventDefault(); }
      return;
    } else return;
    e.preventDefault();
    fig.kbd = true; fig.pinned = false;
    fig.showTip(nx, false);
  });
  svg.addEventListener('blur', function () { fig.kbd = false; if (!fig.pinned) fig.hideTip(); });
  fig.tip.addEventListener('click', function (e) {
    var b = closest(e.target, '.src-btn'); if (!b) return;
    var ids = []; try { ids = JSON.parse(b.getAttribute('data-src') || '[]'); } catch (err) {}
    A.openSources(ids, b.getAttribute('data-title') || '');
  });
  document.addEventListener('click', function (e) { if (fig.pinned && !fig.el.contains(e.target)) fig.unpin(); });
}
function observeFig(fig) {
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function () { if (fig.el.clientWidth !== fig.width) fig.schedule(); });
    ro.observe(fig.el);
  } else window.addEventListener('resize', function () { fig.schedule(); });
}

/* ============================================================================
   5. SERIES DRAWER (lines + points): metrics chart, compute, price overlay
   spec = { series: [{ id, title, unit, scale, points, color|null, short }],
            xMode: 'follow' | { t0, t1 }, yKind: 'log'|'linear', now,
            refs: [{label, value}], unit, guides: [{t0, t1, lv0, lv1, label1, label2, place}],
            labelLast: bool, labelStart: bool, labelEnd: bool, pctHint }
   ========================================================================== */
function drawSeries(fig, w, h, spec) {
  var series = spec.series || [], now = spec.now, i, j, s, p;
  var f = makeFmt(spec.unit);
  var all = [], skipped = 0, firstT = Infinity, firstP = null;
  for (i = 0; i < series.length; i++) {
    s = series[i];
    var pts = (s.points || []).slice().sort(function (a, b) { return a.t - b.t; });
    s._pts = [];
    for (j = 0; j < pts.length; j++) {
      p = pts[j];
      if (p == null || typeof p.value !== 'number' || isNaN(p.value) || typeof p.t !== 'number') continue;
      if (spec.yKind === 'log' && p.value <= 0) { skipped++; continue; }
      s._pts.push(p); all.push(p);
      if (p.t < firstT) { firstT = p.t; firstP = p; }
    }
  }
  var refs = spec.refs || [];
  /* ---- y domain ---- */
  var vmin = Infinity, vmax = -Infinity;
  for (i = 0; i < all.length; i++) { if (all[i].value < vmin) vmin = all[i].value; if (all[i].value > vmax) vmax = all[i].value; }
  for (i = 0; i < refs.length; i++) if (typeof refs[i].value === 'number') { if (refs[i].value < vmin) vmin = refs[i].value; if (refs[i].value > vmax) vmax = refs[i].value; }
  if (!all.length) { vmin = 0; vmax = 1; }
  var yTicks, yLo, yHi, yOf;
  if (spec.yKind === 'log') {
    var eLo = Math.floor(log10(Math.max(vmin, 1e-300))), eHi = Math.ceil(log10(Math.max(vmax, 1e-300)));
    if (eHi <= eLo) eHi = eLo + 1;
    yLo = eLo; yHi = eHi;
    yTicks = logTicks(eLo, eHi);
    yOf = function (v) { return (yHi - log10(v)) / (yHi - yLo); };
  } else {
    var lo = vmin < 0 ? vmin : 0, hi = vmax <= lo ? lo + 1 : vmax;
    var step = niceStep(hi - lo, 5);
    yLo = Math.floor(lo / step) * step; yHi = Math.ceil(hi / step) * step;
    if (spec.pctHint && yHi <= 100 && yLo >= 0) { yHi = 100; }
    yTicks = linTicks(yLo, yHi, 5);
    yOf = function (v) { return (yHi - v) / (yHi - yLo); };
  }
  var tickLabels = [], maxLen = 0;
  for (i = 0; i < yTicks.length; i++) { var tl = f.tick(yTicks[i]); tickLabels.push(tl); if (tl.length > maxLen) maxLen = tl.length; }
  /* ---- geometry ---- */
  var padL = Math.max(30, Math.round(maxLen * CH) + 12), padR = 14, padT = 30, padB = 26;
  var pw = Math.max(40, w - padL - padR), ph = Math.max(40, h - padT - padB);
  var X0 = padL, Y0 = padT, X1 = padL + pw, Y1 = padT + ph;
  var xPx, tLo, tHi;
  if (spec.xMode === 'follow') { tLo = A.scale.T0; tHi = A.scale.T1; xPx = function (tt) { return A.scale.xOf(tt) * pw; }; }
  else { tLo = spec.xMode.t0; tHi = spec.xMode.t1; xPx = function (tt) { return clamp((tt - tLo) / (tHi - tLo), 0, 1) * pw; }; }
  var px = function (tt) { return X0 + xPx(tt); };
  var py = function (v) { return Y0 + clamp(yOf(v), 0, 1) * ph; };
  var out = [], items = [], placer = new Placer();
  /* walls: no direct label may sit in the y-axis gutter or past the right edge of the figure */
  placer.add({ x: -1e5, y: -1e5, w: 1e5 + X0, h: 2e5 });
  placer.add({ x: w - 2, y: -1e5, w: 1e5, h: 2e5 });
  placer.add({ x: -1e5, y: Y1 + 4, w: 2e5, h: 20 });   /* the x-axis row: tick labels and the playhead's year */
  /* ---- defs: era gradient ---- */
  var gid = uid();
  out.push('<defs><linearGradient id="' + gid + '" gradientUnits="userSpaceOnUse" x1="' + X0 + '" x2="' + X1 + '" y1="0" y2="0">' + eraMidStops(xPx, pw) + '</linearGradient></defs>');
  /* ---- grid + y axis ---- */
  out.push('<g class="grid">');
  for (i = 0; i < yTicks.length; i++) { var gy = py(yTicks[i]); out.push('<line x1="' + X0 + '" x2="' + X1 + '" y1="' + gy.toFixed(1) + '" y2="' + gy.toFixed(1) + '"/>'); }
  out.push('</g><g class="axis">');
  for (i = 0; i < yTicks.length; i++) out.push(svgText(X0 - 8, py(yTicks[i]) + 4, tickLabels[i], '', 'end'));
  /* ---- x axis (the playhead's year sits on the axis row and silences the ticks it would cover) ---- */
  var xt = yearTicks(tLo, tHi, xPx, 46);
  var cur = cursorLabel(now, tLo, tHi, px, X0, pw, Y1);
  out.push('<line x1="' + X0 + '" x2="' + X1 + '" y1="' + Y1 + '" y2="' + Y1 + '"/>');
  for (i = 0; i < xt.length; i++) {
    var lx = X0 + xt[i].x;
    out.push('<line x1="' + lx.toFixed(1) + '" x2="' + lx.toFixed(1) + '" y1="' + Y1 + '" y2="' + (Y1 + 4) + '"/>');
    if (!cur.covers(xt[i].x, String(xt[i].t))) out.push(svgText(lx, Y1 + 17, String(xt[i].t), '', anchorFor(xt[i].x, pw)));
  }
  out.push('</g>');
  /* ---- unit caption (top-left) ---- */
  var unitTxt = String(spec.unit || ''), capMax = Math.floor((pw - 70) / CH);
  if (unitTxt.length > capMax && capMax > 8) unitTxt = unitTxt.slice(0, capMax - 1) + '…';
  if (unitTxt) { out.push(svgText(X0, Y0 - 12, unitTxt + (spec.yKind === 'log' ? ' · ' + t('chart.log') : ''), 'lbl', 'start')); placer.add({ x: X0, y: Y0 - 22, w: textW(unitTxt) + 60, h: 14 }); }
  /* ---- reference lines ---- */
  /* From here on every data point is a soft obstacle for direct labels: text never covers a point when a free
     spot exists (and never covers text). */
  for (i = 0; i < all.length; i++) placer.addPoint(px(all[i].t), py(all[i].value));
  /* A reference label tries, in order: one line at the left (where the recent benchmark, cost and adoption
     series have no data), one line at the right, both stacked 12 and 24 px higher, two lines, one line below
     the rule, two lines below, then three lines. The first layout that covers nothing wins, else the one that
     covers least (ImageNet's long annotator note wraps to clear its 2014–17 points). */
  var wrapTo = function (s, per) {
    var words = s.split(/\s+/), lines = [], cur = '', q;
    for (q = 0; q < words.length; q++) {
      if (cur && (cur + ' ' + words[q]).length > per) { lines.push(cur); cur = words[q]; }
      else cur = cur ? cur + ' ' + words[q] : words[q];
    }
    if (cur) lines.push(cur);
    return lines;
  };
  /* balanced: the narrowest per-line width that fits in nLines lines */
  var wrapLabel = function (s, nLines) {
    if (nLines <= 1) return [s];
    for (var per = Math.ceil(s.length / nLines); per < s.length; per++) { var ls = wrapTo(s, per); if (ls.length <= nLines) return ls; }
    return [s];
  };
  var LAYOUTS = [[1, 'l', 0], [1, 'r', 0], [1, 'l', 12], [1, 'r', 12], [1, 'l', 24], [1, 'r', 24], [2, 'l', 0], [2, 'r', 0], [1, 'l', -1], [1, 'r', -1], [2, 'l', -1], [2, 'r', -1], [3, 'l', 0], [3, 'r', 0], [3, 'l', -1], [3, 'r', -1]];
  for (i = 0; i < refs.length; i++) {
    if (typeof refs[i].value !== 'number') continue;
    var ry = py(refs[i].value), rl = L(refs[i].label), rMax = Math.floor((pw - 10) / CH);
    if (rl.length > rMax && rMax > 10) rl = rl.slice(0, rMax - 1) + '…';
    out.push('<line class="ref" x1="' + X0 + '" x2="' + X1 + '" y1="' + ry.toFixed(1) + '" y2="' + ry.toFixed(1) + '"/>');
    var best = null, q;
    for (j = 0; j < LAYOUTS.length; j++) {
      var side = LAYOUTS[j][1], shift = LAYOUTS[j][2], lines = wrapLabel(rl, LAYOUTS[j][0]), nL = lines.length, lw0 = 0;
      for (q = 0; q < nL; q++) if (textW(lines[q]) > lw0) lw0 = textW(lines[q]);
      /* baselines 15 px apart: above the rule the last line sits at ry − 5 − shift; below it the first line sits at ry + 14 */
      var top = shift < 0 ? ry + 14 : ry - 5 - shift - 15 * (nL - 1);
      var box = { x: side === 'l' ? X0 + 4 : X1 - 2 - lw0, y: top - 11, w: lw0, h: 15 * nL }, cost = placer.overlaps(box);
      if (!best || cost < best.cost) best = { cost: cost, lines: lines, box: box, side: side, top: top };
      if (cost === 0) break;
    }
    placer.add(best.box);
    for (q = 0; q < best.lines.length; q++) out.push(svgText(best.side === 'l' ? X0 + 4 : X1 - 2, best.top + 15 * q, best.lines[q], 'ref-lbl', best.side === 'l' ? 'start' : 'end'));
  }
  /* ---- guide lines (growth regimes) ---- */
  var guides = spec.guides || [];
  for (i = 0; i < guides.length; i++) {
    var g = guides[i], gx0 = px(g.t0), gx1 = px(g.t1), gy0 = py(Math.pow(10, g.lv0)), gy1 = py(Math.pow(10, g.lv1));
    out.push('<line class="fit" x1="' + gx0.toFixed(1) + '" y1="' + gy0.toFixed(1) + '" x2="' + gx1.toFixed(1) + '" y2="' + gy1.toFixed(1) + '"/>');
    var frac = g.place === 'left' ? 0.72 : 0.5, mx = gx0 + (gx1 - gx0) * frac, my = gy0 + (gy1 - gy0) * frac;
    var lw = Math.max(textW(g.label1), textW(g.label2)) , lh = 26, lx2, ly2, anc, bx0;
    if (g.place === 'left') { anc = 'end'; lx2 = mx - 10; ly2 = my - 4; bx0 = lx2 - lw; }
    else { anc = 'middle'; lx2 = mx; ly2 = my - 24; bx0 = lx2 - lw / 2; }
    /* slide the two-line note up or down the regime line until it clears the data points */
    var gb = placer.place(bx0, ly2 - 12, lw, lh, [[0, 0], [0, -16], [0, 16], [0, -30], [0, 30], [0, -44], [0, 44]]);
    if (gb) ly2 = gb.y + 12; else placer.add({ x: bx0, y: ly2 - 12, w: lw, h: lh });
    out.push('<text class="annot" x="' + lx2.toFixed(1) + '" y="' + ly2.toFixed(1) + '" text-anchor="' + anc + '"><tspan class="strong">' + esc(g.label1) + '</tspan><tspan x="' + lx2.toFixed(1) + '" dy="13">' + esc(g.label2) + '</tspan></text>');
  }
  /* ---- cursor ---- */
  var litAny = false;
  if (cur.x != null) out.push('<line class="cursor" x1="' + cur.x.toFixed(1) + '" x2="' + cur.x.toFixed(1) + '" y1="' + (Y0 - 4) + '" y2="' + Y1 + '"/>' + cur.text);
  /* ---- series ---- */
  for (i = 0; i < series.length; i++) {
    s = series[i];
    var pts2 = s._pts, lit = [], ghost = [], color = s.color || null;
    for (j = 0; j < pts2.length; j++) (pts2[j].t <= now ? lit : ghost).push(pts2[j]);
    if (lit.length) litAny = true;
    var d = '', k;
    if (lit.length > 1) {
      for (k = 0; k < lit.length; k++) d += (k ? 'L' : 'M') + px(lit[k].t).toFixed(1) + ' ' + py(lit[k].value).toFixed(1);
      out.push('<path class="ser lit" d="' + d + '" style="stroke:' + (color ? esc(color) : 'url(#' + gid + ')') + '"/>');
    }
    if (ghost.length && (lit.length + ghost.length) > 1) {
      var gp = lit.length ? [lit[lit.length - 1]].concat(ghost) : ghost; d = '';
      for (k = 0; k < gp.length; k++) d += (k ? 'L' : 'M') + px(gp[k].t).toFixed(1) + ' ' + py(gp[k].value).toFixed(1);
      out.push('<path class="ser ghost" d="' + d + '"/>');
    }
    for (j = 0; j < pts2.length; j++) {
      p = pts2[j];
      var isLit = p.t <= now, c = color || eraColorAt(p.t), key = (s.id || i) + ':' + j;
      var ptx = px(p.t), pty = py(p.value), cls = 'pt' + (isLit ? '' : ' ghost') + (p.est ? ' est' : '');
      var style = isLit ? (p.est ? 'fill:var(--bg-2);stroke:' + esc(c) : 'fill:' + esc(c)) : '';
      out.push('<circle class="' + cls + '" data-k="' + esc(key) + '" cx="' + ptx.toFixed(1) + '" cy="' + pty.toFixed(1) + '" r="4.5"' + (style ? ' style="' + style + '"' : '') + '/>');
      items.push({
        key: key, x: ptx, y: pty, sources: p.sources || [], title: L(s.title),
        tip: tipHtml({ key: L(s.title), color: c, value: f.val(p.value), est: !!p.est, unit: L(s.unit),
          date: p.date ? fmt.date(p.date) : fmt.dateT(p.t), label: pLabel(p), sources: p.sources || [], title: pLabel(p) || L(s.title),
          note: isLit ? '' : t('chart.future') })
      });
    }
    /* direct labels: start name (overlay), last lit value */
    if (spec.labelStart && pts2.length && s.nick) {
      var sp = pts2[0], sx = px(sp.t), sy = py(sp.value), sw = textW(s.nick), b1 = placer.place(sx - sw / 2, sy - 22, sw, 12, [[0, 0], [0, -12], [0, 24], [sw / 2 + 8, 8]]);
      if (b1) out.push(svgText(b1.x + sw / 2, b1.y + 10, s.nick, 'lbl strong' + (sp.t <= now ? '' : ' ghost'), 'middle'));
    }
    if (spec.labelLast && lit.length) {
      var lp = lit[lit.length - 1], lx1 = px(lp.t), ly1 = py(lp.value), lv = f.val(lp.value), lw1 = textW(lv) + 4;
      var b2 = placer.place(lx1 - lw1 - 8, ly1 - 6, lw1, 12, [[0, 0], [0, -14], [0, 14], [lw1 + 16, 0], [lw1 + 16, -14], [lw1 + 16, 14], [0, -28], [0, 28], [lw1 + 16, -28], [lw1 + 16, 28]]);
      if (b2) out.push(svgText(b2.x + lw1 - 2, b2.y + 10, lv, 'lbl strong', 'end'));
    }
    if (spec.labelEnd && pts2.length) {
      var ep = pts2[pts2.length - 1], ex = px(ep.t), ey = py(ep.value), ev = f.val(ep.value), ew = textW(ev) + 4;
      var b3 = placer.place(ex + 8, ey - 6, ew, 12, [[0, 0], [0, -13], [0, 13], [-ew - 16, 0], [-ew - 16, -13], [-ew - 16, 13], [0, -26], [0, 26], [-ew - 16, -26], [-ew - 16, 26]]);
      if (b3) out.push(svgText(b3.x + 2, b3.y + 10, ev, 'lbl' + (ep.t <= now ? ' strong' : ''), 'start'));
    }
  }
  var empty = null;
  if (!litAny && firstP) {
    empty = { title: t('chart.emptyTitle'), body: t('chart.emptyBody', { title: L(series[0] && series[0].title), date: firstP.date ? fmt.date(firstP.date) : fmt.dateT(firstP.t), now: typeof now === 'number' ? fmt.dateT(now) : '' }) };
  } else if (!all.length) {
    empty = { title: t('chart.emptyTitle'), body: t('chart.noSeries') };
  }
  var aria = (series.length ? L(series[0].title) : '') + (spec.unit ? ' · ' + spec.unit : '') + ' · ' + plural(all.length, 'count.points');
  return { svg: out.join(''), items: items, empty: empty, aria: aria, skipped: skipped, geom: { X0: X0, X1: X1, Y0: Y0, Y1: Y1, px: px, py: py } };
}

/* Series table view (the WCAG twin of the chart). */
function seriesTable(series, now) {
  var f = makeFmt(L(series.unit)), rows = (series.points || []).slice().sort(function (a, b) { return a.t - b.t; });
  var h = '<div class="table-wrap" tabindex="0" role="region" aria-label="' + esc(L(series.title)) + '"><table class="data"><caption class="vh">' + esc(L(series.title)) + '</caption><thead><tr><th>' + esc(t('chart.date')) + '</th><th>' + esc(t('chart.label')) + '</th><th>' + esc(t('chart.value')) + '</th><th>' + esc(t('chart.source')) + '</th></tr></thead><tbody>';
  for (var i = 0; i < rows.length; i++) {
    var p = rows[i];
    h += '<tr' + (p.t > now ? ' class="fut"' : '') + '><td>' + esc(p.date ? fmt.date(p.date) : fmt.dateT(p.t)) + '</td><td class="wrap">' + esc(pLabel(p)) + '</td><td>' + esc(typeof p.value === 'number' ? f.val(p.value) : String(p.value)) + (p.est ? ' <span class="est">' + esc(t('chart.est')) + '</span>' : '') + '</td><td>' + esc((p.sources || []).join(', ')) + '</td></tr>';
  }
  return h + '</tbody></table></div>';
}

/* ============================================================================
   6. METRICS DASHBOARD CHART (#chartPanel)
   ========================================================================== */
var GROUPS = ['compute', 'params', 'benchmarks', 'cost', 'context', 'adoption'];
var chartUI = { built: false, lang: null, group: null, pick: {}, fig: null, host: null, els: {} };
try { var saved = JSON.parse(localStorage.getItem('aih-chart') || 'null'); if (saved && saved.pick) { chartUI.pick = saved.pick; chartUI.group = saved.group || null; } } catch (e) {}
function saveChartUI() { try { localStorage.setItem('aih-chart', JSON.stringify({ group: chartUI.group, pick: chartUI.pick })); } catch (e) {} }
function seriesOf(group) {
  var S = AIH.series || {}, out = [], k;
  for (k in S) if (Object.prototype.hasOwnProperty.call(S, k) && S[k] && S[k].group === group) out.push({ id: k, s: S[k] });
  var t0 = function (x) { return x.s.points && x.s.points[0] ? x.s.points[0].t : 0; };
  out.sort(function (a, b) { return (b.s.featured ? 1 : 0) - (a.s.featured ? 1 : 0) || t0(a) - t0(b); });
  return out;
}
function buildChartPanel(host) {
  var groups = [], i;
  for (i = 0; i < GROUPS.length; i++) if (seriesOf(GROUPS[i]).length) groups.push(GROUPS[i]);
  if (!chartUI.group || groups.indexOf(chartUI.group) < 0) chartUI.group = groups[0] || null;
  var h = '<div class="panel-head"><h3>' + esc(t('chart.title')) + '</h3><span class="meta" data-r="meta"></span></div>';
  h += '<div class="tabs" role="tablist" data-keys="own" data-r="tabs">';
  for (i = 0; i < groups.length; i++) h += '<button type="button" role="tab" data-g="' + groups[i] + '" aria-selected="' + (groups[i] === chartUI.group ? 'true' : 'false') + '" tabindex="' + (groups[i] === chartUI.group ? '0' : '-1') + '">' + esc(t('chart.tab.' + groups[i])) + '</button>';
  h += '</div>';
  h += '<div class="chart-tools" data-keys="own"><label for="aidtSeriesSel" data-r="selLbl"></label><select id="aidtSeriesSel" data-r="sel"></select>';
  h += '<span class="chart-key"><span><i class="ki-lit"></i>' + esc(t('chart.keyLit')) + '</span><span><i class="ki-est"></i>' + esc(t('chart.keyEst')) + '</span><span><i class="ki-ghost"></i>' + esc(t('chart.keyGhost')) + '</span></span></div>';
  h += '<p class="chart-what" data-r="what"></p><div data-r="fig"></div>';
  h += '<div class="chart-foot"><div class="cav" data-r="cav"></div><button type="button" class="link" data-r="src"></button></div>';
  h += '<details class="tbl-view"><summary>' + esc(t('chart.table')) + '</summary><div data-r="tbl"></div></details>';
  h += '<p class="chart-hint">' + esc(t('chart.keys')) + ' ' + esc(t('chart.pin')) + '</p>';
  if (!groups.length) h = '<div class="panel-head"><h3>' + esc(t('chart.title')) + '</h3></div><div class="empty">' + esc(t('chart.noSeries')) + '</div>';
  host.innerHTML = h;
  var R = {}, nodes = host.querySelectorAll('[data-r]');
  for (i = 0; i < nodes.length; i++) R[nodes[i].getAttribute('data-r')] = nodes[i];
  chartUI.els = R; chartUI.host = host; chartUI.built = true; chartUI.lang = state.lang; chartUI.groups = groups;
  if (!groups.length) { chartUI.fig = null; return; }
  chartUI.fig = new Fig(R.fig, {
    height: function (w) { return w < 480 ? 230 : 270; },
    nearest: 'x',
    draw: function (fig, w, h) {
      var cur = currentSeries(); if (!cur) return { svg: '', items: [] };
      var s = cur.s;
      var r = drawSeries(fig, w, h, {
        series: [{ id: cur.id, title: s.title, unit: s.unit, points: s.points }],
        xMode: 'follow', yKind: s.scale === 'log' ? 'log' : 'linear', now: state.t,
        refs: s.reference || [], unit: L(s.unit), labelLast: true, pctHint: /^%/.test(L(s.unit))
      });
      return r;
    }
  });
  R.tabs.addEventListener('click', function (e) { var b = closest(e.target, 'button[data-g]'); if (b) setGroup(b.getAttribute('data-g')); });
  R.tabs.addEventListener('keydown', function (e) {
    var bs = R.tabs.querySelectorAll('button'), idx = -1, k;
    for (k = 0; k < bs.length; k++) if (bs[k] === document.activeElement) idx = k;
    if (idx < 0) return;
    if (e.key === 'ArrowRight') idx = (idx + 1) % bs.length; else if (e.key === 'ArrowLeft') idx = (idx + bs.length - 1) % bs.length; else if (e.key === 'Home') idx = 0; else if (e.key === 'End') idx = bs.length - 1; else return;
    e.preventDefault(); setGroup(bs[idx].getAttribute('data-g')); bs[idx].focus();
  });
  R.sel.addEventListener('change', function () { chartUI.pick[chartUI.group] = R.sel.value; saveChartUI(); fillChartChrome(); chartUI.fig.render(); });
  R.src.addEventListener('click', function () { var cur = currentSeries(); if (!cur) return; var ids = []; for (var k = 0; k < cur.s.points.length; k++) ids.push(cur.s.points[k].sources); A.openSources(uniqSources(ids), L(cur.s.title)); });
  fillChartChrome();
}
function currentSeries() {
  var list = seriesOf(chartUI.group); if (!list.length) return null;
  var want = chartUI.pick[chartUI.group];
  for (var i = 0; i < list.length; i++) if (list[i].id === want) return list[i];
  return list[0];
}
function setGroup(g) {
  if (!g || g === chartUI.group) return;
  chartUI.group = g; saveChartUI();
  var bs = chartUI.els.tabs.querySelectorAll('button');
  for (var i = 0; i < bs.length; i++) { var on = bs[i].getAttribute('data-g') === g; bs[i].setAttribute('aria-selected', on ? 'true' : 'false'); bs[i].setAttribute('tabindex', on ? '0' : '-1'); }
  fillChartChrome(); chartUI.fig.hideTip(); chartUI.fig.render();
}
function fillChartChrome() {
  var R = chartUI.els, list = seriesOf(chartUI.group), cur = currentSeries(), i;
  R.selLbl.textContent = chartUI.group === 'benchmarks' ? t('chart.benchmark') : t('chart.series');
  var opts = '';
  for (i = 0; i < list.length; i++) opts += '<option value="' + esc(list[i].id) + '"' + (cur && list[i].id === cur.id ? ' selected' : '') + '>' + esc(L(list[i].s.title)) + '</option>';
  R.sel.innerHTML = opts;
  R.sel.hidden = list.length < 2; R.selLbl.hidden = list.length < 2;
  if (!cur) { R.what.textContent = t('chart.noSeries'); R.cav.textContent = ''; R.src.hidden = true; R.tbl.innerHTML = ''; return; }
  var s = cur.s;
  R.what.textContent = L(s.what) || '';
  R.cav.innerHTML = s.caveat ? '<b>' + esc(t('chart.caveat')) + ':</b> ' + esc(L(s.caveat)) : '';
  var ids = []; for (i = 0; i < s.points.length; i++) ids.push(s.points[i].sources);
  var n = uniqSources(ids).length;
  R.src.hidden = !n; R.src.textContent = t('chart.sources') + ' (' + fmt.int(n) + ')';
  R.tbl.innerHTML = seriesTable(s, state.t);
  R.meta.textContent = plural(s.points.length, 'count.points') + (s.scale === 'log' ? ' · ' + t('chart.log') : '');
}
function chartPanel(ctx) {
  var host = A.els.chartPanel; if (!host) return;
  if (!chartUI.built || chartUI.lang !== state.lang) buildChartPanel(host);
  else if (ctx.reason !== 'drag' && ctx.reason !== 'play') fillChartChrome();   /* table rows flip lit/future on rest */
  if (chartUI.fig) chartUI.fig.render();
}

/* ============================================================================
   7. ACCELERATION VIEW: shared head/caption, then figures (a)–(f)
   ========================================================================== */
function figHead(k, title, meta) {
  return '<div class="fig-head"><div><div class="k">' + esc(t(k + '.k')) + '</div><h3>' + esc(title || t(k + '.title')) + '</h3></div>' + (meta ? '<span class="meta" data-r="meta">' + meta + '</span>' : '<span class="meta" data-r="meta"></span>') + '</div>';
}
function figCap(k, extra) { return '<p class="fig-cap" data-r="cap">' + esc(t(k + '.cap')) + (extra ? ' ' + extra : '') + '</p>'; }
function srcBtn(ids, title, label) {
  if (!ids || !ids.length) return '';
  return '<button type="button" class="src-btn" data-src="' + esc(JSON.stringify(ids)) + '" data-title="' + esc(title || '') + '">' + esc(label || t('chart.sources')) + '</button>';
}
function bindSrcButtons(host) {
  host.addEventListener('click', function (e) {
    var b = closest(e.target, '.src-btn'); if (!b || closest(b, '.chart-tip')) return;
    var ids = []; try { ids = JSON.parse(b.getAttribute('data-src') || '[]'); } catch (err) {}
    A.openSources(ids, b.getAttribute('data-title') || '');
  });
}
/* Generic panel scaffold: rebuilds its chrome on language change, keeps one Fig. */
function makePanel(name, k, build, figOpts) {
  var P = { lang: null, fig: null, host: null, R: {} };
  return function (ctx) {
    var host = A.els[name]; if (!host) return;
    if (P.lang !== state.lang || !P.fig) {
      P.lang = state.lang;
      host.innerHTML = build(P);
      var R = {}, nodes = host.querySelectorAll('[data-r]');
      for (var i = 0; i < nodes.length; i++) R[nodes[i].getAttribute('data-r')] = nodes[i];
      P.R = R; P.host = host;
      if (!P.bound) { bindSrcButtons(host); P.bound = true; }
      P.fig = R.fig && figOpts ? new Fig(R.fig, figOpts(P)) : null;
      if (P.after) P.after(ctx);
    }
    if (P.update) P.update(ctx);
    if (P.fig) P.fig.render();
  };
}

/* ---------- (a) Starfield / time ribbon ---------- */
function decadeCounts(M, T0, T1) {
  var d0 = Math.floor(T0 / 10) * 10, d1 = Math.floor(T1 / 10) * 10, out = [];
  for (var d = d0; d <= d1; d += 10) {
    var n = 0; for (var i = 0; i < M.length; i++) if (M[i].t >= d && M[i].t < d + 10) n++;
    out.push({ d: d, n: n });
  }
  return out;
}
function jitter(i) { var x = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return x - Math.floor(x); }
var starPanel = makePanel('starPanel', 'star', function (P) {
  P.update = function () {
    var D = A.data(), nM = D.milestones.length, nR = (AIH.models || []).length;
    if (P.R.meta) P.R.meta.textContent = plural(nM, 'count.milestones') + (nR ? ' · ' + plural(nR, 'count.releases') : '');
  };
  return figHead('star') + '<div class="starfield" data-r="fig"></div>' + figCap('star');
}, function () {
  return {
    height: function (w) { return w < 480 ? 200 : 232; },
    nearest: 'xy', maxDist: 22,
    draw: function (fig, w, h) {
      var D = A.data(), M = D.milestones, eras = D.eras, now = state.t;
      var T0 = A.scale.T0, T1 = A.scale.T1, i, phone = w < 480;
      var padL = 10, padR = 10, padT = 22, padB = 56;
      var pw = w - padL - padR, ph = h - padT - padB, X0 = padL, Y0 = padT, X1 = X0 + pw, Y1 = Y0 + ph;
      var px = function (tt) { return X0 + clamp((tt - T0) / (T1 - T0), 0, 1) * pw; };
      var out = [], items = [];
      /* era bands */
      for (i = 0; i < eras.length; i++) out.push('<rect class="era-band" x="' + px(eras[i].start).toFixed(1) + '" y="' + Y0 + '" width="' + Math.max(0, px(eras[i].end) - px(eras[i].start)).toFixed(1) + '" height="' + ph + '" fill="' + esc(A.eraColor(eras[i])) + '"/>');
      /* model releases: small stars in provider colour */
      var models = AIH.models || [], provs = {}, P = AIH.providers || [];
      for (i = 0; i < P.length; i++) provs[P[i].id] = P[i];
      var bandM0 = Y0 + ph * 0.56, bandM1 = Y1 - 4;
      out.push('<g class="stars">');
      for (i = 0; i < models.length; i++) {
        var m = models[i]; if (typeof m.t !== 'number') continue;
        var mx = px(m.t), my = bandM0 + jitter(i + 1000) * (bandM1 - bandM0), pc = (provs[m.provider] && provs[m.provider].color) || 'var(--fg-3)';
        var mk = 'm:' + (m.id || i), fut = m.t > now;
        out.push('<circle class="star' + (fut ? ' fut' : '') + '" data-k="' + esc(mk) + '" cx="' + mx.toFixed(1) + '" cy="' + my.toFixed(1) + '" r="' + (phone ? 1.3 : 1.8) + '" fill="' + esc(pc) + '"/>');
        items.push({ key: mk, x: mx, y: my, r: 2, title: m.name, sources: m.sources || [],
          tip: tipHtml({ key: t('star.model') + (provs[m.provider] ? ' · ' + provs[m.provider].name : ''), color: pc, value: m.name, date: m.released ? fmt.date(m.released, m.precision) : fmt.dateT(m.t), label: L(m.headline), sources: m.sources || [], title: m.name, note: fut ? t('chart.future') : '' }) });
      }
      out.push('</g>');
      /* milestones: halo + core, sized by significance */
      var band0 = Y0 + 8, band1 = Y0 + ph * 0.6;
      out.push('<g class="halos">');
      var cores = [];
      for (i = 0; i < M.length; i++) {
        var ms = M[i], sig = +ms.significance || 3, R = (sig >= 5 ? 7 : sig === 4 ? 5 : 3.6) * (phone ? 0.75 : 1);
        var x = px(ms.t), y = band0 + jitter(i) * (band1 - band0), c = A.eraColor(A.eraOf(ms)), key = 's:' + ms.id, isFut = ms.t > now, isCur = ms === state.milestone;
        out.push('<circle class="halo' + (isFut ? ' fut' : '') + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (R * (phone ? 1.9 : 2.6)).toFixed(1) + '" fill="' + esc(c) + '"/>');
        cores.push('<circle class="core' + (isFut ? ' fut' : '') + '" data-k="' + esc(key) + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + R + '" fill="' + esc(c) + '"/>' + (sig >= 5 ? '<circle class="core' + (isFut ? ' fut' : '') + '" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (R * 0.4).toFixed(1) + '" fill="var(--fg)"/>' : ''));
        if (isCur) cores.push('<circle class="pulse" cx="' + x.toFixed(1) + '" cy="' + y.toFixed(1) + '" r="' + (R + 7) + '" fill="none" stroke="' + esc(c) + '" stroke-width="1.5"/>');
        items.push({ key: key, x: x, y: y, r: R + 2, title: L(ms.title), sources: ms.sources || [], onClick: (function (id) { return function () { A.goMilestone(id, 'nav'); }; })(ms.id),
          tip: tipHtml({ key: t('star.milestone') + ' · ' + t('star.sig', { n: sig }), color: c, value: L(ms.title), date: fmt.date(ms.date, ms.precision), label: L(ms.who), sources: ms.sources || [], title: L(ms.title), note: isFut ? t('chart.future') : '' }) });
      }
      out.push('</g><g class="cores">' + cores.join('') + '</g>');
      /* cursor */
      var cx = px(now);
      out.push('<line class="cursor" x1="' + cx.toFixed(1) + '" x2="' + cx.toFixed(1) + '" y1="' + (Y0 - 4) + '" y2="' + Y1 + '"/>');
      var cl = fmt.year(now), ca = cx + textW(cl) + 8 > X1 ? 'end' : 'start';
      out.push(svgText(ca === 'end' ? cx - 5 : cx + 5, Y0 - 9, cl, 'cursor-lbl', ca));
      /* axis: decades with counts */
      out.push('<g class="axis"><line x1="' + X0 + '" x2="' + X1 + '" y1="' + Y1 + '" y2="' + Y1 + '"/>');
      var dc = decadeCounts(M, T0, T1), dw = pw / ((T1 - T0) / 10);
      for (i = 0; i < dc.length; i++) {
        var dx = px(Math.max(dc[i].d, T0)), dx2 = px(Math.min(dc[i].d + 10, T1)), mid = (dx + dx2) / 2;
        out.push('<line x1="' + dx.toFixed(1) + '" x2="' + dx.toFixed(1) + '" y1="' + Y1 + '" y2="' + (Y1 + 4) + '"/>');
        var showLbl = dw >= 30 || dc[i].d % 20 === 0;
        if (showLbl) out.push(svgText(mid, Y1 + 16, String(dc[i].d), 'dec', 'middle'));
        out.push(svgText(mid, Y1 + 31, fmt.int(dc[i].n), 'cnt', 'middle'));
      }
      out.push(svgText(X1, Y1 + 48, t('count.milestones').split('|').pop() + ' ' + t('star.perDecade'), 'dec', 'end'));
      out.push('</g>');
      return { svg: out.join(''), items: items, aria: t('star.title') + ' · ' + plural(M.length, 'count.milestones') };
    }
  };
});

/* ---------- (b) The shrinking gap ---------- */
var gapPanel = makePanel('gapPanel', 'gap', function (P) {
  P.update = function () {
    var M5 = sig5(); if (P.R.meta) P.R.meta.textContent = M5.length > 1 ? plural(M5.length, 'count.milestones') + ' · ' + plural(M5.length - 1, 'count.gaps') : '';
  };
  return figHead('gap') + '<div data-r="fig"></div>' + figCap('gap');
}, function () {
  return {
    height: function (w) { return w < 480 ? 220 : 250; },
    nearest: 'x', maxDist: 30,
    draw: function (fig, w, h) {
      var M5 = sig5(), now = state.t, i;
      if (M5.length < 2) return { svg: '', items: [], empty: { title: t('chart.emptyTitle'), body: t('gap.empty') } };
      var gaps = [], gmin = Infinity, gmax = 0;
      for (i = 1; i < M5.length; i++) { var yrs = Math.max(M5[i].t - M5[i - 1].t, 1 / 365); gaps.push({ a: M5[i - 1], b: M5[i], y: yrs }); if (yrs < gmin) gmin = yrs; if (yrs > gmax) gmax = yrs; }
      var cands = [1 / 365, 7 / 365, 1 / 12, 1, 10, 100], lo = cands[0], ticks = [];
      for (i = 0; i < cands.length; i++) if (cands[i] <= gmin) lo = cands[i];
      var hi = gmax * 1.6;
      for (i = 0; i < cands.length; i++) if (cands[i] >= lo && cands[i] <= hi) ticks.push(cands[i]);
      var labels = [], maxLen = 0;
      for (i = 0; i < ticks.length; i++) { var s = fmt.duration(ticks[i]); labels.push(s); if (s.length > maxLen) maxLen = s.length; }
      var padL = Math.round(maxLen * CH) + 12, padR = 10, padT = 28, padB = 24;
      var pw = w - padL - padR, ph = h - padT - padB, X0 = padL, Y0 = padT, X1 = X0 + pw, Y1 = Y0 + ph;
      var lLo = log10(lo), lHi = log10(hi);
      var py = function (v) { return Y0 + (1 - (log10(Math.max(v, lo)) - lLo) / (lHi - lLo)) * ph; };
      var out = [], items = [], n = gaps.length, slot = pw / n, bw = Math.min(24, Math.max(3, slot * 0.66));
      out.push('<g class="grid">');
      for (i = 0; i < ticks.length; i++) out.push('<line x1="' + X0 + '" x2="' + X1 + '" y1="' + py(ticks[i]).toFixed(1) + '" y2="' + py(ticks[i]).toFixed(1) + '"/>');
      out.push('</g><g class="axis">');
      for (i = 0; i < ticks.length; i++) out.push(svgText(X0 - 8, py(ticks[i]) + 4, labels[i], '', 'end'));
      out.push('<line x1="' + X0 + '" x2="' + X1 + '" y1="' + Y1 + '" y2="' + Y1 + '"/>');
      out.push(svgText(X0 + slot / 2, Y1 + 16, fmt.year(gaps[0].a.t), '', anchorFor(slot / 2, pw)));
      out.push(svgText(X0 + pw - slot / 2, Y1 + 16, fmt.year(gaps[n - 1].b.t), '', anchorFor(pw - slot / 2, pw)));
      out.push('</g>');
      var placer = new Placer(), valLabels = [];                    /* value labels are drawn after every bar, so no bar covers them */
      placer.add({ x: -1e5, y: -1e5, w: 1e5 + X0, h: 2e5 });          /* the y-axis gutter and the right edge are off limits */
      placer.add({ x: w - 2, y: -1e5, w: 1e5, h: 2e5 });
      for (i = 0; i < n; i++) {
        var g = gaps[i], x = X0 + slot * (i + 0.5), top = py(g.y), bh = Math.max(1.5, Y1 - top), lit = g.b.t <= now, cur = g.a.t <= now && now < g.b.t;
        var c = A.eraColor(A.eraOf(g.b)), key = 'g:' + i, r = Math.min(4, bw / 2);
        var d = 'M' + (x - bw / 2).toFixed(1) + ' ' + Y1 + 'V' + (top + r).toFixed(1) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' -' + r + 'h' + (bw - 2 * r).toFixed(1) + 'a' + r + ' ' + r + ' 0 0 1 ' + r + ' ' + r + 'V' + Y1 + 'Z';
        out.push('<path class="bar' + (lit ? '' : ' ghost') + (cur ? ' cur' : '') + '" data-k="' + key + '" d="' + d + '"' + (lit ? ' style="fill:' + esc(c) + '"' : '') + '/>');
        var dur = fmt.duration(g.y);
        if (i === 0 || i === n - 1 || cur) {
          /* the first bar's label hangs to the right, the last bar's to the left, so neither leaves the plot */
          var lw = textW(dur), anc = i === 0 ? 'start' : i === n - 1 ? 'end' : 'middle';
          var bx = anc === 'start' ? x - bw / 2 : anc === 'end' ? x + bw / 2 - lw : x - lw / 2;
          var b = placer.place(bx, top - 18, lw, 12, [[0, 0], [0, -13], [0, -26]]);
          if (b) valLabels.push(svgText(anc === 'start' ? b.x : anc === 'end' ? b.x + lw : b.x + lw / 2, b.y + 10, dur, 'val' + (lit ? '' : ' ghost'), anc));
        }
        items.push({ key: key, x: x, y: top, sources: [], title: L(g.b.title), onClick: (function (id) { return function () { A.goMilestone(id, 'nav'); }; })(g.b.id),
          tip: tipHtml({ key: L(g.a.title) + ' → ' + L(g.b.title), color: c, value: dur, date: fmt.date(g.a.date, g.a.precision) + ' → ' + fmt.date(g.b.date, g.b.precision), note: cur ? t('gap.current') : (lit ? '' : t('chart.future')) }) });
      }
      /* cursor sits between bars: mark the current gap instead (class cur) */
      /* no overlay while gaps are still ahead: the ghost bars and the `cur` bar tell the story */
      return { svg: out.join('') + valLabels.join(''), items: items, empty: null, aria: t('gap.title') + ' · ' + plural(n, 'count.gaps') };
    }
  };
});
function sig5() {
  var M = A.data().milestones, out = [];
  for (var i = 0; i < M.length; i++) if (+M[i].significance >= 5) out.push(M[i]);
  return out;
}

/* ---------- (c) Compute with growth regimes ---------- */
function computeSeries() { var S = AIH.series || {}; if (S['train-compute']) return { id: 'train-compute', s: S['train-compute'] }; var l = seriesOf('compute'); return l.length ? l[0] : null; }
/* Doubling times stated in the dataset's acceleration facts ("every N months" twice in one fact: before and after the regime change). */
function doublingFromFacts() {
  var F = AIH.facts || [];
  for (var i = 0; i < F.length; i++) {
    var txt = (F[i].text && F[i].text.en) || '', re = /every\s*~?\s*(\d+(?:\.\d+)?)\s*months/gi, m, found = [];
    while ((m = re.exec(txt))) found.push(+m[1]);
    if (found.length >= 2) return { pre: found[0], post: found[1], fact: F[i] };
  }
  return null;
}
function regimeSplit(s) { var m = /until (?:about |around |roughly )?(\d{4})/i.exec((s.what && s.what.en) || ''); return m ? +m[1] : 2010; }
function fitLog(pts) {
  var n = pts.length, sx = 0, sy = 0, sxx = 0, sxy = 0, i;
  for (i = 0; i < n; i++) { var x = pts[i].t, y = log10(pts[i].value); sx += x; sy += y; sxx += x * x; sxy += x * y; }
  var mx = sx / n, my = sy / n, den = sxx - n * mx * mx;
  return { mx: mx, my: my, slope: den ? (sxy - n * mx * my) / den : 0 };
}
var computePanel = makePanel('computePanel', 'compute', function (P) {
  var cs = computeSeries(), df = doublingFromFacts();
  P.update = function () {
    if (!P.R.meta) return;
    P.R.meta.innerHTML = df && df.fact ? '<span class="num">' + esc(L(df.fact.stat)) + '</span> ' + srcBtn(df.fact.sources, L(df.fact.stat), t('facts.src')) : '';
  };
  var foot = cs ? '<div class="chart-foot"><div class="cav" data-r="cav">' + (cs.s.caveat ? '<b>' + esc(t('chart.caveat')) + ':</b> ' + esc(L(cs.s.caveat)) : '') + '</div>' + srcBtn(uniqSources(cs.s.points.map(function (p) { return p.sources; })), L(cs.s.title), t('chart.sources')) + '</div>' : '';
  return figHead('compute') + (cs ? '<div data-r="fig"></div>' + figCap('compute', esc(df ? t('compute.guide') : t('compute.fit')) + '.') + foot : '<div class="empty">' + esc(t('chart.noSeries')) + '</div>');
}, function () {
  return {
    height: function (w) { return w < 480 ? 250 : 290; },
    nearest: 'x',
    draw: function (fig, w, h) {
      var cs = computeSeries(); if (!cs) return { svg: '', items: [] };
      var s = cs.s, pts = s.points.filter(function (p) { return typeof p.t === 'number' && p.value > 0; }).sort(function (a, b) { return a.t - b.t; });
      var T1 = A.scale.T1, t0 = pts.length ? Math.floor(pts[0].t / 10) * 10 : A.scale.T0, split = regimeSplit(s), df = doublingFromFacts();
      var pre = pts.filter(function (p) { return p.t < split; }), post = pts.filter(function (p) { return p.t >= split; }), guides = [];
      var mk = function (arr, months, label1, place) {
        if (arr.length < 2) return;
        var f = fitLog(arr), slope = months ? log10(2) * 12 / months : f.slope;
        var ta = arr[0].t, tb = arr[arr.length - 1].t;
        guides.push({ t0: ta, t1: tb, lv0: f.my + slope * (ta - f.mx), lv1: f.my + slope * (tb - f.mx), label1: label1,
          label2: t('compute.doubling', { n: monthsLabel(months || (log10(2) / slope) * 12) }), place: place });
      };
      mk(pre, df ? df.pre : 0, t('compute.pre', { y: split }), 'above');
      mk(post, df ? df.post : 0, t('compute.post', { y: split }), 'left');
      return drawSeries(fig, w, h, { series: [{ id: cs.id, title: s.title, unit: s.unit, points: pts }], xMode: { t0: t0, t1: T1 }, yKind: 'log', now: state.t, unit: L(s.unit), guides: guides, labelLast: true });
    }
  };
});

/* ---------- (d) Time to saturation ---------- */
function satSeries() { var S = AIH.series || {}; if (S['benchmark-saturation']) return { id: 'benchmark-saturation', s: S['benchmark-saturation'] }; var l = seriesOf('saturation'); return l.length ? l[0] : null; }
function shortBench(label) {
  var head = String(label || '').split(/\s[→(]|\s→/)[0].trim(), ws = head.split(/\s+/), s = ws[0] || '';
  if (ws[1] && (/^\d/.test(ws[1]) || (ws[1].length <= 7 && /^[A-Z]/.test(ws[1])))) s += ' ' + ws[1];
  return s;
}
var satPanel = makePanel('satPanel', 'sat', function (P) {
  var ss = satSeries();
  P.update = function () { if (P.R.meta && ss) P.R.meta.textContent = plural(ss.s.points.length, 'count.points'); };
  var foot = ss ? '<div class="chart-foot"><div class="cav">' + (ss.s.caveat ? '<b>' + esc(t('chart.caveat')) + ':</b> ' + esc(L(ss.s.caveat)) : '') + '</div>' + srcBtn(uniqSources(ss.s.points.map(function (p) { return p.sources; })), L(ss.s.title), t('chart.sources')) + '</div>' : '';
  return figHead('sat') + (ss ? '<div data-r="fig"></div>' + figCap('sat') + foot : '<div class="empty">' + esc(t('chart.noSeries')) + '</div>');
}, function () {
  return {
    height: function (w) { var ss = satSeries(); var n = ss ? ss.s.points.length : 0; return 46 + n * (w < 480 ? 21 : 23) + 10; },
    nearest: 'xy', maxDist: 14,
    draw: function (fig, w, h) {
      var ss = satSeries(); if (!ss) return { svg: '', items: [] };
      var now = state.t, rows = [], i, s = ss.s, f = makeFmt(L(s.unit));
      for (i = 0; i < s.points.length; i++) {
        var p = s.points[i], ti = typeof p.t === 'number' ? p.t : toT(p.introduced), ts = p.saturated ? toT(p.saturated) : (ti + p.value);
        if (isNaN(ti)) continue;
        rows.push({ p: p, ti: ti, ts: isNaN(ts) ? ti + p.value : ts, name: shortBench(p.label) });   /* the short row name comes from the English label */
      }
      rows.sort(function (a, b) { return a.ti - b.ti; });
      var maxName = 0; for (i = 0; i < rows.length; i++) if (rows[i].name.length > maxName) maxName = rows[i].name.length;
      var padL = Math.min(w < 480 ? 104 : 130, Math.round(maxName * CH) + 14), padR = 72, padT = 22, padB = 24;
      var maxChars = Math.floor((padL - 14) / CH);
      for (i = 0; i < rows.length; i++) if (rows[i].name.length > maxChars && maxChars > 4) rows[i].name = rows[i].name.slice(0, maxChars - 1) + '…';
      var pw = w - padL - padR, X0 = padL, Y0 = padT, X1 = X0 + pw;
      var tLo = rows.length ? Math.floor(rows[0].ti / 10) * 10 : A.scale.T0, tHi = A.scale.T1;
      var px = function (tt) { return X0 + clamp((tt - tLo) / (tHi - tLo), 0, 1) * pw; };
      var rh = (h - padT - padB) / Math.max(1, rows.length), bh = Math.min(12, rh * 0.6);
      var out = [], items = [];
      var xt = yearTicks(tLo, tHi, function (tt) { return px(tt) - X0; }, 44), Y1 = Y0 + rh * rows.length;
      var cur = cursorLabel(now, tLo, tHi, px, X0, pw, Y1 - 1);
      out.push('<g class="grid">');
      for (i = 0; i < xt.length; i++) out.push('<line x1="' + (X0 + xt[i].x).toFixed(1) + '" x2="' + (X0 + xt[i].x).toFixed(1) + '" y1="' + Y0 + '" y2="' + Y1.toFixed(1) + '"/>');
      out.push('</g><g class="axis"><line x1="' + X0 + '" x2="' + X1 + '" y1="' + Y1.toFixed(1) + '" y2="' + Y1.toFixed(1) + '"/>');
      for (i = 0; i < xt.length; i++) if (!cur.covers(xt[i].x, String(xt[i].t))) out.push(svgText(X0 + xt[i].x, Y1 + 16, String(xt[i].t), '', anchorFor(xt[i].x, pw)));
      out.push('</g>');
      out.push(svgText(X1 + padR - 2, Y0 - 8, t('sat.years'), 'lbl', 'end'));
      /* the cursor goes under the rows, so the row labels' halos stay readable where they cross it */
      if (cur.x != null) out.push('<line class="cursor" x1="' + cur.x.toFixed(1) + '" x2="' + cur.x.toFixed(1) + '" y1="' + (Y0 - 4) + '" y2="' + Y1.toFixed(1) + '"/>' + cur.text);
      var litAny = false;
      for (i = 0; i < rows.length; i++) {
        var r = rows[i], y = Y0 + rh * (i + 0.5), x0 = px(r.ti), x1 = Math.max(x0 + 3, px(r.ts)), c = eraColorAt(r.ti), key = 'b:' + i;
        var started = r.ti <= now, done = r.ts <= now, xs = started ? Math.max(x0 + 3, px(Math.min(r.ts, now))) : x0;
        if (started) litAny = true;
        out.push(svgText(X0 - 8, y + 4, r.name, 'row-lbl' + (started ? '' : ' ghost'), 'end'));
        var rr = Math.min(4, bh / 2);
        if (started) out.push('<rect class="bar" data-k="' + key + '" x="' + x0.toFixed(1) + '" y="' + (y - bh / 2).toFixed(1) + '" width="' + (xs - x0).toFixed(1) + '" height="' + bh + '" rx="' + rr + '" style="fill:' + esc(c) + '"/>');
        if (!done) out.push('<rect class="bar-out"' + (started ? '' : ' data-k="' + key + '"') + ' x="' + (started ? xs : x0).toFixed(1) + '" y="' + (y - bh / 2).toFixed(1) + '" width="' + Math.max(0, x1 - (started ? xs : x0)).toFixed(1) + '" height="' + bh + '" rx="' + rr + '"/>');
        var vtxt = fmt.duration(r.p.value);
        out.push(svgText(x1 + 6, y + 4, vtxt, 'val' + (done ? '' : ' ghost'), 'start'));
        items.push({ key: key, x: (x0 + x1) / 2, y: y, r: Math.max(bh, (x1 - x0) / 2), sources: r.p.sources || [], title: pLabel(r.p),
          tip: tipHtml({ key: r.name, color: c, value: vtxt, unit: t('sat.years'), label: pLabel(r.p), note: t('sat.introduced') + ': ' + fmt.date(r.p.introduced || r.p.date) + (r.p.saturated ? ' · ' + t('sat.beaten') + ': ' + fmt.date(r.p.saturated) : '') + (!done ? ' · ' + t('sat.open') : ''), sources: r.p.sources || [], title: pLabel(r.p) }) });
      }
      var empty = litAny || !rows.length ? null : { title: t('chart.emptyTitle'), body: t('chart.emptyBody', { title: L(s.title), date: fmt.date(rows[0].p.introduced || rows[0].p.date), now: fmt.dateT(now) }) };
      return { svg: out.join(''), items: items, empty: empty, aria: L(s.title) + ' · ' + plural(rows.length, 'count.points') };
    }
  };
});

/* ---------- (e) Price collapse: overlay of the price-*-level series ---------- */
/* Four categorical hues, taken from the era ramp at wide spacing so they read apart in both themes
   (E06 green, E08 azure, E11 magenta, E13 gold; the light-theme inks for light mode). */
var PRICE_HUES = { dark: ['#6EE08F', '#5C9DFF', '#FF6FB5', '#FFE3A3'], light: ['#1D7F42', '#1D58B8', '#B51F66', '#8F5D00'] };
function priceSeries() {
  var S = AIH.series || {}, out = [], k;
  for (k in S) if (Object.prototype.hasOwnProperty.call(S, k) && /^price-.*-level$/.test(k) && S[k] && S[k].points && S[k].points.length > 1) out.push({ id: k, s: S[k] });
  out.sort(function (a, b) { return a.s.points[0].t - b.s.points[0].t; });
  return out;
}
function priceShort(ps) {
  var m = /for (.+?)-level/i.exec((ps.s.title && ps.s.title.en) || '');
  if (m) return m[1];
  var m2 = /^price-(.+)-level$/.exec(ps.id); return m2 ? m2[1].toUpperCase() : ps.id;
}
function priceLegend(P) {
  var list = priceSeries(), hues = PRICE_HUES[A.isLight() ? 'light' : 'dark'], h = '<ul class="price-legend" aria-label="' + esc(t('price.levels')) + '">', i;
  for (i = 0; i < list.length; i++) {
    var s = list[i].s, pts = s.points.slice().sort(function (a, b) { return a.t - b.t; }), a = pts[0], b = pts[pts.length - 1], factor = a.value / b.value;
    var fut = a.t > state.t;
    h += '<li' + (fut ? ' class="fut"' : '') + '><i style="--kc:' + esc(hues[i % hues.length]) + '"></i><span class="nm">' + esc(L(s.title)) + '</span>';
    h += '<span class="drop"><b>' + esc(t('price.drop', { x: fmt.num(factor, 0) })) + '</b> · ' + esc(t('price.span', { from: money(a.value), to: money(b.value), d: fmt.duration(b.t - a.t) })) + (fut ? ' · ' + esc(t('price.notYet')) : '') + ' ' + srcBtn(uniqSources(pts.map(function (p) { return p.sources; })), L(s.title), t('facts.src')) + '</span></li>';
  }
  return h + '</ul>';
}
var pricePanel = makePanel('pricePanel', 'price', function (P) {
  var list = priceSeries();
  P.update = function () {
    if (P.R.legend) P.R.legend.innerHTML = priceLegend(P);
    if (P.R.meta) P.R.meta.textContent = list.length ? t('price.levels') : '';
  };
  var cav = '';
  if (list.length) {
    var ids = [], i; for (i = 0; i < list.length; i++) for (var j = 0; j < list[i].s.points.length; j++) ids.push(list[i].s.points[j].sources);
    cav = '<div class="chart-foot"><div class="cav">' + (list[0].s.caveat ? '<b>' + esc(t('chart.caveat')) + ':</b> ' + esc(L(list[0].s.caveat)) : '') + '</div>' + srcBtn(uniqSources(ids), t('price.title'), t('chart.sources')) + '</div>';
  }
  return figHead('price') + (list.length ? '<div data-r="legend"></div><div data-r="fig"></div>' + figCap('price') + cav : '<div class="empty">' + esc(t('chart.noSeries')) + '</div>');
}, function () {
  return {
    height: function (w) { return w < 480 ? 230 : 260; },
    nearest: 'xy', maxDist: 30,
    draw: function (fig, w, h) {
      var list = priceSeries(); if (!list.length) return { svg: '', items: [] };
      var hues = PRICE_HUES[A.isLight() ? 'light' : 'dark'], ser = [], i, tmin = Infinity;
      for (i = 0; i < list.length; i++) { var s = list[i].s; ser.push({ id: list[i].id, title: s.title, unit: s.unit, points: s.points, color: hues[i % hues.length], nick: priceShort(list[i]) }); if (s.points[0].t < tmin) tmin = s.points[0].t; }
      var t0 = Math.floor(tmin * 2) / 2 - 0.25;
      /* under 480 px the start names pile up; the legend above names every track, so only the end values stay */
      return drawSeries(fig, w, h, { series: ser, xMode: { t0: t0, t1: A.scale.T1 }, yKind: 'log', now: state.t, unit: L(list[0].s.unit), labelStart: w >= 480, labelEnd: true });
    }
  };
});

/* ---------- (f) Fact strip ---------- */
var factsUI = { all: false, open: {} };
function factTiles(all) {
  var F = AIH.facts || [], n = all ? F.length : Math.min(6, F.length), h = '<div class="facts">', i;
  for (i = 0; i < n; i++) {
    var f = F[i], st = L(f.stat), cls = st.length > 22 ? ' xl' : st.length > 12 ? ' long' : '';
    h += '<div class="fact"><div class="stat-v' + cls + '">' + esc(st) + '</div><div class="t' + (factsUI.open[f.id] ? '' : ' clamp') + '" data-f="' + esc(f.id || i) + '" title="' + esc(L(f.text)) + '">' + esc(L(f.text)) + '</div>';
    h += '<div class="src-row"><span class="src">' + esc(f.id || '') + '</span>' + srcBtn(f.sources, st, t('facts.src')) + '</div></div>';
  }
  h += '</div>';
  if (F.length > 6) h += '<div class="facts-more"><button type="button" class="chip" data-r="more" aria-pressed="' + (all ? 'true' : 'false') + '">' + esc(all ? t('facts.less') : t('facts.more', { n: F.length })) + '</button></div>';
  return h;
}
var factStrip = (function () {
  var lang = null;
  return function () {
    var host = A.els.factStrip; if (!host) return;
    var F = AIH.facts || [];
    if (!F.length) { if (lang !== state.lang) { host.innerHTML = figHead('facts') + '<div class="empty">' + esc(t('chart.noSeries')) + '</div>'; lang = state.lang; } return; }
    if (lang === state.lang && host.getAttribute('data-all') === String(factsUI.all)) return;
    lang = state.lang; host.setAttribute('data-all', String(factsUI.all));
    host.innerHTML = figHead('facts', null, '') + factTiles(factsUI.all);
    if (!host.getAttribute('data-bound')) {
      host.setAttribute('data-bound', '1');
      bindSrcButtons(host);
      host.addEventListener('click', function (e) {
        var more = closest(e.target, '[data-r="more"]');
        if (more) { factsUI.all = !factsUI.all; host.setAttribute('data-all', ''); factStrip(); return; }
        var tx = closest(e.target, '.fact .t');
        if (tx) { var id = tx.getAttribute('data-f'); factsUI.open[id] = !factsUI.open[id]; tx.classList.toggle('clamp', !factsUI.open[id]); }
      });
    }
  };
})();

/* ============================================================================
   8. REGISTRATION + EVENTS
   ========================================================================== */
var registered = false;
function registerAll() {
  if (registered) return; registered = true;
  A.registerPanel('chartPanel', chartPanel);
  A.registerPanel('starPanel', starPanel);
  A.registerPanel('gapPanel', gapPanel);
  A.registerPanel('computePanel', computePanel);
  A.registerPanel('satPanel', satPanel);
  A.registerPanel('pricePanel', pricePanel);
  A.registerPanel('factStrip', factStrip);
}
if (state.ready) registerAll(); else A.on('ready', registerAll);
/* The metrics chart follows the scrubber's scale (animated); the acceleration charts are always calendar. */
function rerenderMetrics() { if (chartUI.fig) chartUI.fig.schedule(); }
A.on('scale', rerenderMetrics); A.on('scaleframe', rerenderMetrics); A.on('scaleend', rerenderMetrics);
A.on('theme', function () {                               /* era colours differ per theme: redraw everything */
  if (!state.ready || !registered) return;
  if (chartUI.fig) chartUI.fig.schedule();
  var fns = [starPanel, gapPanel, computePanel, satPanel, pricePanel];
  for (var i = 0; i < fns.length; i++) { try { fns[i]({ reason: 'theme' }); } catch (e) { if (window.console) console.error('[AIDT charts] theme redraw failed:', e); } }
});

A.charts = { Fig: Fig, drawSeries: drawSeries, makeFmt: makeFmt, yearTicks: yearTicks, version: '1.0' };
A.version = (A.version || '') + ' + charts';
})();
