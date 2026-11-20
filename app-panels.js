/* ============================================================================
   AI Deep Time — app-panels.js (part 2b)
   Models shelf + full lineage table, architecture panel, State of AI 2026,
   open questions, myths and mix-ups, all sources + the sources dialog.
   Plugs into window.AIDT (app.js part 1). Plain ES5 in two IIFEs, so a
   failure in one never blocks the other. No fact lives in this file: every
   name, date and number comes from window.AIH.
   ========================================================================== */
(function () {
'use strict';
var AIDT = window.AIDT;
if (!AIDT || typeof AIDT.registerPanel !== 'function') return;
/* app.js fills its element map (AIDT.els) in boot() on DOMContentLoaded, and its listener was
   registered first; this file is parsed earlier, so everything that reads AIDT.els waits for that. */
function onReady(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
onReady(function initPartA() {
var AIH = window.AIH || {};
var els = AIDT.els, t = AIDT.t, L = AIDT.L, fmt = AIDT.fmt, esc = AIDT.esc, closest = AIDT.closest;

/* ============================================================================
   A1. EXTRA STRINGS (everything else already lives in app.js UI_STRINGS)
   ========================================================================== */
AIDT.addStrings({
  en: {
    'models.asOf': 'at the playhead: {date}',
    'models.later': 'Still to come in this era: {list}',
    'models.earlier': '＋{n} earlier this era',
    'models.lineageCount': '{n} of {total} released by this moment',
    'models.status.restricted': 'restricted',
    'models.status.unreleased': 'unreleased',
    'models.jump': 'Jump to this milestone',
    'models.filter': 'Filter by provider',
    'arch.chips': 'Architectures of this era',
    'now.more': 'Read more',
    'now.less': 'Show less',
    'oq.open': 'What stays open',
    'src.filter': 'Filter by title, organisation or id…',
    'src.noMatch': 'No source matches that filter.',
    'src.groupAudit': 'Audit',
    'src.link': 'link {n}',
    'src.intro': 'Grouped by the research pass that collected them. The id before each title is the one cited elsewhere on the page.'
  },
  uk: {
    'models.asOf': 'на повзунку: {date}',
    'models.later': 'Ще попереду в цій епосі: {list}',
    'models.earlier': '＋{n} раніших у цій епосі',
    'models.lineageCount': '{n} з {total} уже вийшли на цей момент',
    'models.status.restricted': 'обмежений доступ',
    'models.status.unreleased': 'не випущено',
    'models.jump': 'Перейти до цієї віхи',
    'models.filter': 'Фільтр за розробником',
    'arch.chips': 'Архітектури цієї епохи',
    'now.more': 'Читати далі',
    'now.less': 'Згорнути',
    'oq.open': 'Що лишається відкритим',
    'src.filter': 'Фільтр за назвою, організацією чи ідентифікатором…',
    'src.noMatch': 'За цим фільтром нічого не знайдено.',
    'src.groupAudit': 'Аудит',
    'src.link': 'посилання {n}',
    'src.intro': 'Згруповано за етапом дослідження, на якому їх зібрано. Ідентифікатор перед назвою — той самий, що й у посиланнях на джерела в інших частинах сторінки.'
  }
});

/* ============================================================================
   A2. STYLE for the widgets of this file
   ========================================================================== */
(function injectStyle() {
  if (document.getElementById('aidt-panels-style')) return;
  var css = [
    '.panel-head .meta{white-space:nowrap}#archEra{white-space:normal;text-align:right;max-width:100%}',
    '.prov:last-child{margin-bottom:0}',
    '.model .nm .est,.data td .est{margin-left:6px}',
    '.model .hl .src-btn,.sys .wh .src-btn,.data td.wrap .src-btn{margin-left:6px}',
    '.sys.static{cursor:default}.sys.static:hover .nm{color:inherit}',
    '.sys.on .nm{color:var(--accent)}.sys.on .nm::before{content:"▸ ";font-size:.8em}',
    '.sys[role="button"]:focus-visible{outline:2px solid var(--accent);outline-offset:4px;border-radius:6px}',
    '.models-later{margin-top:12px;font:12px/1.5 var(--mono);color:var(--fg-3)}',
    '.prov-more>summary{font:500 12px var(--mono);color:var(--fg-2);padding:6px 0;display:inline-flex;align-items:center;gap:6px;border-top:1px solid var(--line);width:100%}',
    '.prov-more>summary:hover{color:var(--accent)}.prov-more[open]>summary{color:var(--fg-3)}',
    '.prov-more .model:first-of-type{border-top:0}',
    '.lineage .chips{margin:10px 0 4px}',
    '.lineage summary .cnt{color:var(--fg-3);font-weight:400}',
    '.data .sw{display:inline-block;width:8px;height:8px;border-radius:50%;background:var(--sw,var(--fg-3));margin-right:6px;vertical-align:1px}',
    '.data td.sm{white-space:normal;min-width:120px;max-width:240px}',
    '.arch-chips{margin-bottom:14px}',
    '.arch-name{font:500 clamp(18px,2vw,22px)/1.3 var(--display);margin:0 0 4px;text-wrap:balance}',
    '.arch-period{font:12px/1.5 var(--mono);color:var(--fg-3);margin-bottom:14px}',
    '.arch-src{margin-top:16px}',
    '.diag.missing svg{min-width:0}',
    '.steps-toggle{margin-bottom:6px}',
    '.bullets{grid-template-columns:repeat(auto-fit,minmax(min(100%,340px),1fr))}',
    '.bullet p.clamp{display:-webkit-box;-webkit-line-clamp:6;-webkit-box-orient:vertical;overflow:hidden}',
    '.bullet .more{margin-top:6px;margin-right:12px}',
    '.bullet .src-btn,.q-src .src-btn,.front .src-btn,.myth .src-btn{margin-top:4px}',
    '.myth .srcs{grid-column:1/-1;margin-top:-4px}',
    '.q-body .oq-open{grid-column:1/-1}',
    'input.src-filter{display:block;width:100%;max-width:440px;font:14px var(--serif);background:var(--bg-3);color:var(--fg);border:1px solid var(--line);border-radius:8px;padding:8px 10px;margin-bottom:18px}',
    '.src-group h4 .n{color:var(--fg-3);font-weight:400;margin-left:6px;letter-spacing:0;text-transform:none}',
    '.src-list .ti .more-url{margin-left:6px;font:500 11px var(--mono);color:var(--fg-3)}',
    '.src-dlg-intro{margin-bottom:12px;color:var(--fg-2);font-size:14px}',
    '.src-dlg-count{margin-bottom:10px}'
  ].join('\n');
  var st = document.createElement('style');
  st.id = 'aidt-panels-style';
  st.textContent = css;
  document.head.appendChild(st);
})();

/* ============================================================================
   A3. SHARED HELPERS
   ========================================================================== */
var PROV = AIH.providers || [], provById = {};
for (var pi = 0; pi < PROV.length; pi++) provById[PROV[pi].id] = PROV[pi];
function provName(id) { var p = provById[id]; return p ? (L(p.name) || id) : String(id || ''); }
function provColor(id) { var p = provById[id]; return p && p.color ? p.color : 'var(--fg-3)'; }
function uniq(ids) {
  var out = [], seen = {};
  for (var i = 0; i < (ids || []).length; i++) { var id = ids[i]; if (id && !seen[id]) { seen[id] = 1; out.push(id); } }
  return out;
}
function msDate(ms) { return ms && ms.date ? fmt.date(ms.date, ms.precision) : (ms && ms.t ? fmt.year(ms.t) : ''); }
function kindLabel(kind) { if (!kind) return ''; return t.has('kind.' + kind) ? t('kind.' + kind) : String(kind).replace(/[-_]/g, ' '); }
/* A "Sources (n)" button; one document-level listener below opens the dialog. */
function srcButton(ids, title, intro, cls) {
  ids = uniq(ids);
  if (!ids.length) return '';
  return '<button type="button" class="' + (cls || 'src-btn') + '" data-srcs="' + esc(ids.join(',')) + '" data-title="' + esc(title || '') + '"' +
    (intro ? ' data-intro="' + esc(intro) + '"' : '') + '>' + esc(t('ms.sources', { n: ids.length })) + '</button>';
}
document.addEventListener('click', function (e) {
  var b = closest(e.target, '[data-srcs]');
  if (!b) return;
  e.preventDefault();
  var ids = (b.getAttribute('data-srcs') || '').split(',');
  AIDT.openSources(ids, b.getAttribute('data-title') || '', { intro: b.getAttribute('data-intro') || '' });
});
AIDT.panelsUtil = { srcButton: srcButton, uniq: uniq, provName: provName, provColor: provColor };

/* ============================================================================
   A4. MODELS SHELF (#modelsPanel): frontier models of the era up to the
   playhead (eras from 2017), key systems before that, plus the full lineage.
   ========================================================================== */
var MODELS = (AIH.models || []).slice().sort(function (a, b) { return (a.t || 0) - (b.t || 0); });
var T_EPS = 0.01;                                           /* ≈4 days: a model released on its own milestone's day counts */
var mp = {};                                                 /* element refs inside the panel */
var mpSig = { lang: null, shelf: null };
var lineage = { built: false, open: false, filter: 'all', rows: [], lastN: -1, builtLang: null };

function modelsSkeleton(ctx) {
  var host = els.modelsPanel;
  var wasOpen = lineage.open;
  host.innerHTML =
    '<div class="panel-head"><h3 id="modelsTitle"></h3><span class="meta" id="modelsMeta"></span></div>' +
    '<div id="modelsShelf"></div>' +
    '<details class="lineage" id="lineage"><summary>' + esc(t('models.lineage')) + ' <span class="cnt" id="lineageCnt"></span></summary>' +
    '<div class="chips" id="lineageChips" role="group" aria-label="' + esc(t('models.filter')) + '"></div>' +
    '<div class="table-wrap" id="lineageTable" tabindex="0" role="region" aria-label="' + esc(t('models.lineage')) + '"></div></details>';
  mp.title = host.querySelector('#modelsTitle');
  mp.meta = host.querySelector('#modelsMeta');
  mp.shelf = host.querySelector('#modelsShelf');
  mp.details = host.querySelector('#lineage');
  mp.cnt = host.querySelector('#lineageCnt');
  mp.chips = host.querySelector('#lineageChips');
  mp.table = host.querySelector('#lineageTable');
  mpSig.shelf = null;
  lineage.built = false;
  lineage.rows = [];
  lineage.lastN = -1;
  renderLineageChips();
  mp.details.addEventListener('toggle', function () {
    lineage.open = mp.details.open;
    if (lineage.open && !lineage.built) buildLineageTable(AIDT.state.t);
  });
  if (wasOpen) { mp.details.open = true; lineage.open = true; buildLineageTable(ctx.t); }
}

function statusBadge(m) {
  if (!m.status) return '';
  var key = 'models.status.' + m.status;
  return ' <span class="est">' + esc(t.has(key) ? t(key) : m.status) + '</span>';
}
function modelDate(m) { return m.released ? fmt.date(m.released, m.precision || null) : ''; }
function modelSpec(m) {
  var spec = [];
  if (m.params) spec.push(m.params === 'undisclosed' ? t('models.undisclosed') : m.params);
  if (m.context) spec.push(m.context);
  if (m.type) spec.push(t.has('type.' + m.type) ? t('type.' + m.type) : m.type);
  return spec.join(' · ');
}
function modelRow(m) {
  var spec = modelSpec(m);
  return '<div class="model"><span class="nm">' + esc(m.name) + statusBadge(m) + '</span><span class="dt">' + esc(modelDate(m)) + '</span>' +
    (spec ? '<span class="sp">' + esc(spec) + '</span>' : '') +
    '<span class="hl">' + esc(L(m.headline)) + srcButton(m.sources, m.name, L(m.notable)) + '</span></div>';
}

function renderModernShelf(ctx, era) {
  var inEra = [], later = [], i, m;
  for (i = 0; i < MODELS.length; i++) {
    m = MODELS[i];
    if (!m.frontier || typeof m.t !== 'number') continue;
    if (m.t < era.start || m.t >= era.end) continue;
    if (m.t <= ctx.t + T_EPS) inEra.push(m); else later.push(m);
  }
  var sig = ctx.lang + '|' + era.id + '|' + inEra.length + '|' + (inEra.length ? inEra[inEra.length - 1].id : '');
  if (sig === mpSig.shelf) return;
  mpSig.shelf = sig;
  var html = '';
  if (!inEra.length) html += '<div class="empty">' + esc(t('models.empty')) + '</div>';
  else {
    var groups = {}, order = [];
    for (i = 0; i < inEra.length; i++) {
      m = inEra[i];
      if (!groups[m.provider]) { groups[m.provider] = []; order.push(m.provider); }
      groups[m.provider].push(m);
    }
    /* provider order follows AIH.providers; unknown providers go last */
    order.sort(function (a, b) {
      var ia = PROV.indexOf(provById[a]), ib = PROV.indexOf(provById[b]);
      return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
    });
    /* newest 2 per provider, newest first; the rest of the era's releases sit behind a per-provider toggle */
    for (i = 0; i < order.length; i++) {
      var pid = order[i], rows = groups[pid].slice().reverse(), k;
      html += '<div class="prov"><h4 class="prov-name"><span class="sw" style="--sw:' + esc(provColor(pid)) + '" aria-hidden="true"></span>' + esc(provName(pid)) + '</h4>';
      for (k = 0; k < rows.length && k < 2; k++) html += modelRow(rows[k]);
      if (rows.length > 2) {
        html += '<details class="prov-more"><summary>' + esc(t('models.earlier', { n: fmt.int(rows.length - 2) })) + '</summary>';
        for (k = 2; k < rows.length; k++) html += modelRow(rows[k]);
        html += '</details>';
      }
      html += '</div>';
    }
  }
  if (later.length) {
    var names = [];
    for (i = 0; i < later.length && i < 5; i++) names.push(later[i].name);
    if (later.length > 5) names.push('+' + (later.length - 5));
    html += '<p class="models-later">' + esc(t('models.later', { list: names.join(', ') })) + '</p>';
  }
  mp.shelf.innerHTML = html;
}

function renderSystemsShelf(ctx, era) {
  var data = AIDT.data(), msById = data.msById, extra = AIH.keySystemsExtra || {};
  var ids = era.keySystems || [], items = [], i, id;
  for (i = 0; i < ids.length; i++) {
    id = ids[i];
    if (msById[id]) items.push({ ms: msById[id], timeline: true });
    else if (extra[id]) items.push({ ms: extra[id], timeline: false });
  }
  if (!items.length) {
    for (i = 0; i < data.milestones.length; i++) if (AIDT.eraOf(data.milestones[i]) === era) items.push({ ms: data.milestones[i], timeline: true });
  }
  items.sort(function (a, b) { return (a.ms.t || 0) - (b.ms.t || 0); });
  var curId = ctx.milestone ? ctx.milestone.id : '';
  var sig = ctx.lang + '|' + era.id + '|' + curId + '|' + items.length;
  if (sig === mpSig.shelf) return;
  mpSig.shelf = sig;
  var html = '';
  if (!items.length) html = '<div class="empty">' + esc(t('models.emptySys')) + '</div>';
  for (i = 0; i < items.length; i++) {
    var ms = items[i].ms, tl = items[i].timeline, on = tl && ms.id === curId;
    var kind = tl && ms.kind ? ' · ' + kindLabel(ms.kind) : '';
    html += '<div class="sys' + (on ? ' on' : '') + (tl ? '' : ' static') + '"' +
      (tl ? ' role="button" tabindex="0" data-ms="' + esc(ms.id) + '" title="' + esc(t('models.jump')) + '"' + (on ? ' aria-current="true"' : '') : '') + '>' +
      '<span class="nm">' + esc(L(ms.title)) + '</span>' +
      '<span class="dt">' + esc(msDate(ms) + kind) + '</span>' +
      '<span class="wh">' + esc(L(ms.what || ms.blurb)) + (tl ? '' : srcButton(ms.sources, L(ms.title))) + '</span></div>';
  }
  mp.shelf.innerHTML = html;
}

function renderLineageChips() {
  var html = '<button type="button" class="chip" data-prov="all" aria-pressed="' + (lineage.filter === 'all') + '">' + esc(t('models.filterAll')) + '</button>';
  var has = {};
  for (var i = 0; i < MODELS.length; i++) has[MODELS[i].provider] = 1;
  for (var k = 0; k < PROV.length; k++) {
    var p = PROV[k];
    if (!has[p.id]) continue;
    html += '<button type="button" class="chip" data-prov="' + esc(p.id) + '" aria-pressed="' + (lineage.filter === p.id) + '"><span class="sw" style="--sw:' + esc(provColor(p.id)) + '" aria-hidden="true"></span>' + esc(provName(p.id)) + '</button>';
  }
  mp.chips.innerHTML = html;
}

function buildLineageTable(tt) {
  var cols = ['models.model', 'models.provider', 'models.released', 'models.type', 'models.params', 'models.context', 'models.headline'];
  var html = '<table class="data"><thead><tr>';
  for (var c = 0; c < cols.length; c++) html += '<th scope="col">' + esc(t(cols[c])) + '</th>';
  html += '</tr></thead><tbody>';
  for (var i = 0; i < MODELS.length; i++) {
    var m = MODELS[i];
    if (lineage.filter !== 'all' && m.provider !== lineage.filter) continue;
    html += '<tr data-t="' + (typeof m.t === 'number' ? m.t : '') + '">' +
      '<td>' + esc(m.name) + statusBadge(m) + '</td>' +
      '<td><span class="sw" style="--sw:' + esc(provColor(m.provider)) + '" aria-hidden="true"></span>' + esc(provName(m.provider)) + '</td>' +
      '<td>' + esc(modelDate(m)) + '</td>' +
      '<td>' + esc(m.type ? (t.has('type.' + m.type) ? t('type.' + m.type) : m.type) : '') + '</td>' +
      '<td class="sm">' + esc(m.params === 'undisclosed' ? t('models.undisclosed') : (m.params || '')) + '</td>' +
      '<td class="sm">' + esc(m.context || '') + '</td>' +
      '<td class="wrap">' + esc(L(m.headline)) + srcButton(m.sources, m.name, L(m.notable)) + '</td></tr>';
  }
  html += '</tbody></table>';
  mp.table.innerHTML = html;
  lineage.rows = mp.table.querySelectorAll('tr[data-t]');
  lineage.built = true;
  lineage.builtLang = AIDT.state.lang;
  lineage.lastN = -1;
  updateLineage(tt);
}

function updateLineage(tt) {
  var n = 0;
  for (var i = 0; i < MODELS.length; i++) if (typeof MODELS[i].t === 'number' && MODELS[i].t <= tt + T_EPS) n++;
  if (n === lineage.lastN) return;
  lineage.lastN = n;
  mp.cnt.textContent = '(' + t('models.lineageCount', { n: fmt.int(n), total: fmt.int(MODELS.length) }) + ')';
  for (var r = 0; r < lineage.rows.length; r++) {
    var row = lineage.rows[r], rt = parseFloat(row.getAttribute('data-t'));
    var fut = !isNaN(rt) && rt > tt + T_EPS;
    if (fut) { row.className = 'fut'; row.title = t('models.future'); }
    else if (row.className) { row.className = ''; row.removeAttribute('title'); }
  }
}

function modelsPanel(ctx) {
  if (!els.modelsPanel || !ctx.era) return;
  if (mpSig.lang !== ctx.lang) { modelsSkeleton(ctx); mpSig.lang = ctx.lang; }
  var era = ctx.era, modern = era.start >= 2017;
  mp.title.textContent = t(modern ? 'models.title' : 'models.titleSys');
  var ms = ctx.milestone;
  var dateStr = (ms && Math.abs(ctx.t - ms.t) < 1e-9) ? msDate(ms) : fmt.dateT(ctx.t);
  mp.meta.textContent = t('models.asOf', { date: dateStr });
  if (modern) renderModernShelf(ctx, era); else renderSystemsShelf(ctx, era);
  updateLineage(ctx.t);
}

if (els.modelsPanel) {
  els.modelsPanel.addEventListener('click', function (e) {
    var chip = closest(e.target, '[data-prov]');
    if (chip) {
      lineage.filter = chip.getAttribute('data-prov');
      var all = mp.chips.querySelectorAll('[data-prov]');
      for (var i = 0; i < all.length; i++) all[i].setAttribute('aria-pressed', all[i] === chip ? 'true' : 'false');
      if (lineage.open) buildLineageTable(AIDT.state.t); else lineage.built = false;
      return;
    }
    if (closest(e.target, '[data-srcs]')) return;
    var sys = closest(e.target, '.sys[data-ms]');
    if (sys) { AIDT.pause(); AIDT.goMilestone(sys.getAttribute('data-ms'), 'nav'); }
  });
  els.modelsPanel.addEventListener('keydown', function (e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var sys = closest(e.target, '.sys[data-ms]');
    if (!sys || sys !== e.target) return;
    e.preventDefault();
    AIDT.pause();
    AIDT.goMilestone(sys.getAttribute('data-ms'), 'nav');
  });
  AIDT.registerPanel('modelsPanel', modelsPanel);
}

/* ============================================================================
   A5. ARCHITECTURE PANEL (#archPanel): the era's primary diagram, chips for
   the others, intuition / steps / key numbers / misconception / why it won.
   The diagram follows the milestone's own `arch` when it is one of the era's;
   a chip choice sticks until the milestone changes.
   ========================================================================== */
var ARCHS = AIH.architectures || [], archById = {};
for (var ai = 0; ai < ARCHS.length; ai++) archById[ARCHS[ai].id] = ARCHS[ai];
var ap = {};
var apSig = { lang: null, eraId: null, textKey: null, diagKey: null, chipsKey: null };
var archSel = { id: null, user: false, msId: null };
var lastArchCtx = null;

function archSkeleton() {
  var host = els.archPanel;
  host.innerHTML =
    '<div class="panel-head"><h3>' + esc(t('arch.title')) + '</h3><span class="meta" id="archEra"></span></div>' +
    '<div class="chips arch-chips" id="archChips" role="group" aria-label="' + esc(t('arch.chips')) + '"></div>' +
    '<div class="arch-grid"><div class="diag" id="archDiag" tabindex="0" role="region" aria-label="' + esc(t('arch.title')) + '"></div><div class="arch-text" id="archText"></div></div>';
  ap.era = host.querySelector('#archEra');
  ap.chips = host.querySelector('#archChips');
  ap.diag = host.querySelector('#archDiag');
  ap.text = host.querySelector('#archText');
  apSig.textKey = apSig.diagKey = apSig.chipsKey = null;
}

function chipName(arch) {
  var n = L(arch.name) || arch.id;
  var i = n.indexOf(':');
  return i > 0 ? n.slice(0, i) : n;
}

function pickArch(ctx) {
  var list = ctx.era.arch || [];
  var msId = ctx.milestone ? ctx.milestone.id : null;
  if (apSig.eraId !== ctx.era.id) { apSig.eraId = ctx.era.id; archSel.user = false; }
  if (!archSel.user || archSel.msId !== msId) {
    archSel.user = false;
    var msArch = ctx.milestone && ctx.milestone.arch;
    archSel.id = (msArch && list.indexOf(msArch) >= 0) ? msArch : (list[0] || null);
  }
  archSel.msId = msId;
  if (archSel.id && list.indexOf(archSel.id) < 0) archSel.id = list[0] || null;
  return archSel.id;
}

function wrapWords(s, max) {
  var words = String(s || '').split(/\s+/), lines = [], cur = '';
  for (var i = 0; i < words.length; i++) {
    if (cur && (cur + ' ' + words[i]).length > max) { lines.push(cur); cur = words[i]; }
    else cur = cur ? cur + ' ' + words[i] : words[i];
  }
  if (cur) lines.push(cur);
  return lines;
}
/* A quiet placeholder when a renderer is absent or throws. */
function placeholderSvg(arch) {
  var name = arch ? (L(arch.name) || arch.id) : '', lines = wrapWords(name, 56), W = 640, H = 200, y = 86, out = '';
  var title = (name ? name + ' — ' : '') + t('arch.missing');
  out += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(title) + '"><title>' + esc(title) + '</title>';
  out += '<rect x="1" y="1" width="' + (W - 2) + '" height="' + (H - 2) + '" rx="12" class="d-box inv"/>';
  /* three faint boxes joined by dashed lines: the ghost of a diagram */
  var bx = [60, 265, 470], by = 30;
  for (var i = 0; i < bx.length; i++) {
    out += '<rect x="' + bx[i] + '" y="' + by + '" width="110" height="30" rx="6" class="d-box dim"/>';
    if (i < bx.length - 1) out += '<path d="M' + (bx[i] + 110) + ' ' + (by + 15) + 'L' + bx[i + 1] + ' ' + (by + 15) + '" class="d-ln m dash thin"/>';
  }
  for (var k = 0; k < lines.length; k++) out += '<text x="' + (W / 2) + '" y="' + (y + k * 18) + '" text-anchor="middle" class="d-t h">' + esc(lines[k]) + '</text>';
  out += '<text x="' + (W / 2) + '" y="' + (y + lines.length * 18 + 14) + '" text-anchor="middle" class="d-t m">' + esc(t('arch.missing')) + '</text>';
  return out + '</svg>';
}

function renderDiagram(ctx, archId) {
  var key = archId + '|' + ctx.lang + '|' + (AIDT.isLight() ? 'l' : 'd') + '|' + (ctx.state.reduced ? 'r' : 'm');
  if (key === apSig.diagKey) return;
  apSig.diagKey = key;
  var arch = archById[archId] || null, html = '', fn = window.AIH_DIAGRAMS && archId ? window.AIH_DIAGRAMS[archId] : null;
  if (typeof fn === 'function') {
    try { html = fn({ lang: ctx.lang, arch: arch, accent: AIDT.eraColor(ctx.era) }); }
    catch (e) { console.error('[AIDT] diagram "' + archId + '" failed:', e); html = ''; }
  }
  if (typeof html !== 'string' || html.indexOf('<svg') < 0) { html = placeholderSvg(arch); ap.diag.className = 'diag missing'; }
  else ap.diag.className = 'diag';
  ap.diag.setAttribute('aria-label', (arch && L(arch.name)) ? L(arch.name) : t('arch.title'));   /* the focusable scroll region is named after its diagram */
  ap.diag.innerHTML = html;
}

function renderArchText(ctx, archId) {
  var key = archId + '|' + ctx.lang;
  if (key === apSig.textKey) return;
  apSig.textKey = key;
  var arch = archById[archId];
  if (!arch) { ap.text.innerHTML = '<div class="empty">' + esc(t('arch.missing')) + '</div>'; return; }
  var html = '<div class="arch-name">' + esc(L(arch.name)) + '</div>';
  if (arch.period) html += '<div class="arch-period">' + esc(t('arch.period') + ': ' + L(arch.period)) + '</div>';
  if (arch.intuition) html += '<h4>' + esc(t('arch.intuition')) + '</h4><p class="intuition">' + esc(L(arch.intuition)) + '</p>';
  var steps = arch.steps ? (arch.steps[ctx.lang] || arch.steps.en) : null;
  if (steps && steps.length) {
    html += '<h4>' + esc(t('arch.steps')) + '</h4>' +
      '<button type="button" class="btn sm ghost steps-toggle" id="stepsToggle" aria-expanded="false" aria-controls="archSteps">' + esc(t('arch.showSteps')) + '</button>' +
      '<ol id="archSteps" data-collapsed="true">';
    for (var i = 0; i < steps.length; i++) html += '<li>' + esc(steps[i]) + '</li>';
    html += '</ol>';
  }
  if (arch.keyNumbers) html += '<h4>' + esc(t('arch.keyNumbers')) + '</h4><p class="small">' + esc(L(arch.keyNumbers)) + '</p>';
  if (arch.misconception) html += '<h4>' + esc(t('arch.misconception')) + '</h4><p>' + esc(L(arch.misconception)) + '</p>';
  if (arch.whyBetter) html += '<h4>' + esc(t('arch.whyBetter')) + '</h4><p>' + esc(L(arch.whyBetter)) + '</p>';
  var sb = srcButton(arch.sources, L(arch.name));
  if (sb) html += '<p class="arch-src">' + sb + '</p>';
  ap.text.innerHTML = html;
}

function renderArchChips(ctx, archId) {
  var list = ctx.era.arch || [];
  var key = ctx.era.id + '|' + ctx.lang + '|' + archId;
  if (key === apSig.chipsKey) return;
  apSig.chipsKey = key;
  if (list.length < 2) { ap.chips.innerHTML = ''; ap.chips.hidden = true; return; }
  ap.chips.hidden = false;
  var html = '';
  for (var i = 0; i < list.length; i++) {
    var a = archById[list[i]];
    if (!a) continue;
    html += '<button type="button" class="chip" data-arch="' + esc(a.id) + '" aria-pressed="' + (a.id === archId ? 'true' : 'false') + '">' + esc(chipName(a)) + '</button>';
  }
  ap.chips.innerHTML = html;
}

function archPanel(ctx) {
  if (!els.archPanel || !ctx.era) return;
  lastArchCtx = ctx;
  if (apSig.lang !== ctx.lang) { archSkeleton(); apSig.lang = ctx.lang; }
  var archId = pickArch(ctx);
  ap.era.textContent = L(ctx.era.span) + ' · ' + L(ctx.era.title);
  renderArchChips(ctx, archId);
  renderArchText(ctx, archId);
  renderDiagram(ctx, archId);
}

if (els.archPanel) {
  els.archPanel.addEventListener('click', function (e) {
    var chip = closest(e.target, '[data-arch]');
    if (chip && lastArchCtx) {
      archSel.id = chip.getAttribute('data-arch');
      archSel.user = true;
      archSel.msId = lastArchCtx.milestone ? lastArchCtx.milestone.id : null;
      renderArchChips(lastArchCtx, archSel.id);
      renderArchText(lastArchCtx, archSel.id);
      renderDiagram(lastArchCtx, archSel.id);
      return;
    }
    var tg = closest(e.target, '#stepsToggle');
    if (tg) {
      var ol = els.archPanel.querySelector('#archSteps');
      var open = ol.getAttribute('data-collapsed') === 'true';
      ol.setAttribute('data-collapsed', open ? 'false' : 'true');
      tg.setAttribute('aria-expanded', open ? 'true' : 'false');
      tg.textContent = t(open ? 'arch.hideSteps' : 'arch.showSteps');
    }
  });
  AIDT.on('theme', function () { apSig.diagKey = null; if (lastArchCtx && archSel.id) renderDiagram(lastArchCtx, archSel.id); });
  AIDT.registerPanel('archPanel', archPanel);
}

/* The dashboard section needs a milestone to render; keep it hidden until the data is ready. */
if (els.dash && !AIDT.state.ready) {
  els.dash.hidden = true;
  AIDT.on('ready', function () { AIDT.showSection('dash', true); });
}
});
})();

/* ============================================================================
   PART B: State of AI 2026, open questions, myths, all sources + the sources
   dialog. These panels depend only on the language (and on the
   data), so they render once per language and ignore playhead changes.
   ========================================================================== */
(function () {
'use strict';
var AIDT = window.AIDT;
if (!AIDT || typeof AIDT.registerPanel !== 'function') return;
function onReady(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); }
onReady(function initPartB() {
var AIH = window.AIH || {};
var els = AIDT.els, t = AIDT.t, L = AIDT.L, fmt = AIDT.fmt, esc = AIDT.esc, closest = AIDT.closest;
var U = AIDT.panelsUtil || {};
var srcButton = U.srcButton || function () { return ''; };
var uniq = U.uniq || function (a) { return a || []; };
var provName = U.provName || function (id) { return String(id || ''); };
var provColor = U.provColor || function () { return 'var(--fg-3)'; };

/* A static panel: renders when the language (or the data, after reload) changes. */
function staticPanel(id, renderFn) {
  if (!els[id]) return;
  var done = null;
  var run = function (lang) {
    var key = lang + '|' + (AIDT.state.ready ? 1 : 0);
    if (key === done) return;
    done = key;
    try { renderFn(lang); } catch (e) { console.error('[AIDT] panel "' + id + '" failed:', e); done = null; }
  };
  AIDT.registerPanel(id, function (ctx) { run(ctx.lang); });
  if (!AIDT.state.ready) run(AIDT.state.lang);        /* show the static content while the timeline data is still loading */
  AIDT.on('lang', function (l) { run(l); });
  AIDT.on('ready', function () { done = null; run(AIDT.state.lang); });
}

/* ============================================================================
   B1. SOURCES: list html (handles `urls` arrays, `url: null`, `url2`),
   the richer dialog, and the "All sources" list grouped by research part.
   ========================================================================== */
function sourceUrls(s) {
  var urls = [];
  if (s.urls && s.urls.length) { for (var i = 0; i < s.urls.length; i++) if (typeof s.urls[i] === 'string' && s.urls[i]) urls.push(s.urls[i]); }
  if (typeof s.url === 'string' && s.url) urls.push(s.url);
  if (typeof s.url2 === 'string' && s.url2) urls.push(s.url2);
  return uniq(urls);
}
function sourceItem(id) {
  var s = AIH.sources && AIH.sources[id];
  var html = '<li><span class="id">' + esc(id) + '</span>';
  if (!s) return html + '<span class="ti">' + esc(id) + '</span></li>';
  var title = esc(L(s.title) || id), urls = sourceUrls(s), ti;
  if (urls.length) {
    ti = '<a href="' + esc(urls[0]) + '" target="_blank" rel="noopener">' + title + '</a>';
    for (var u = 1; u < urls.length; u++) ti += '<a class="more-url" href="' + esc(urls[u]) + '" target="_blank" rel="noopener" aria-label="' + esc(t('src.link', { n: u + 1 })) + '">[' + (u + 1) + ']</a>';
  } else ti = title;
  html += '<span class="ti">' + ti + '</span>';
  var og = [];
  if (s.org) og.push(L(s.org));
  if (s.year) og.push(String(s.year));
  if (s.type) og.push(t.has('srcType.' + s.type) ? t('srcType.' + s.type) : String(s.type));
  if (og.length) html += '<span class="og">' + esc(og.join(' · ')) + '</span>';
  return html + '</li>';
}
function sourceListHtml(ids) {
  var html = '<ul class="src-list">';
  for (var i = 0; i < ids.length; i++) html += sourceItem(ids[i]);
  return html + '</ul>';
}
AIDT.sourceListHtml = sourceListHtml;

/* openSources(ids, title, {intro}) — the milestone card, model rows, bullets and questions all use it. */
AIDT.openSources = function (ids, title, opts) {
  if (!els.srcDlg || !els.srcDlgBody) return;
  ids = uniq(ids);
  var intro = opts && opts.intro ? String(opts.intro) : '';
  if (els.srcDlgTitle) els.srcDlgTitle.textContent = t('src.title', { title: title || '' });
  var html = intro ? '<p class="src-dlg-intro">' + esc(intro) + '</p>' : '';
  if (ids.length) html += '<p class="meta src-dlg-count">' + esc(fmt.count(ids.length, 'count.sources')) + '</p>' + sourceListHtml(ids);
  else html += '<p class="small">' + esc(t('src.none')) + '</p>';
  els.srcDlgBody.innerHTML = html;
  els.srcDlgBody.scrollTop = 0;
  AIDT.openDialog(els.srcDlg);
};

/* Group key from the id: S-R4a-07 → R4a, S-AUD-12 → AUD. Audit sorts last. */
function srcGroup(id) { var m = /^S-([A-Za-z0-9]+)-/.exec(id); return m ? m[1] : 'other'; }
function groupRank(g) {
  if (g === 'AUD') return 1e6;
  var m = /^R(\d+)([a-z]?)$/.exec(g);
  if (!m) return 1e6 + 1;
  return (+m[1]) * 10 + (m[2] ? m[2].charCodeAt(0) - 96 : 0);
}
function idNum(id) { var m = /-(\d+)$/.exec(id); return m ? +m[1] : 0; }
function groupLabel(g) { return g === 'AUD' ? t('src.groupAudit') : t('src.group', { g: g }); }

var srcList = { built: false, lang: null, q: '' };
function buildAllSources(lang) {
  var host = els.allSourcesBody, src = AIH.sources || {}, groups = {}, keys = [], id;
  for (id in src) if (Object.prototype.hasOwnProperty.call(src, id)) {
    var g = srcGroup(id);
    if (!groups[g]) { groups[g] = []; keys.push(g); }
    groups[g].push(id);
  }
  keys.sort(function (a, b) { return groupRank(a) - groupRank(b); });
  var html = '<input type="search" class="src-filter" id="srcFilter" placeholder="' + esc(t('src.filter')) + '" aria-label="' + esc(t('src.filter')) + '" autocomplete="off">' +
    '<p class="small" style="margin-bottom:14px">' + esc(t('src.intro')) + '</p>' +
    '<p class="small" id="srcNoMatch" hidden>' + esc(t('src.noMatch')) + '</p>';
  for (var k = 0; k < keys.length; k++) {
    var ids = groups[keys[k]];
    ids.sort(function (a, b) { return idNum(a) - idNum(b) || (a < b ? -1 : 1); });
    html += '<section class="src-group" data-group="' + esc(keys[k]) + '"><h4>' + esc(groupLabel(keys[k])) + '<span class="n">· ' + esc(fmt.count(ids.length, 'count.sources')) + '</span></h4>' + sourceListHtml(ids) + '</section>';
  }
  host.innerHTML = html;
  srcList.built = true;
  srcList.lang = lang;
  var input = host.querySelector('#srcFilter');
  if (srcList.q) { input.value = srcList.q; applySrcFilter(srcList.q); }
  var timer = null;
  input.addEventListener('input', function () {
    if (timer) clearTimeout(timer);
    timer = setTimeout(function () { srcList.q = input.value; applySrcFilter(srcList.q); }, 120);
  });
}
function applySrcFilter(q) {
  var host = els.allSourcesBody, groups = host.querySelectorAll('.src-group'), any = false;
  q = String(q || '').trim().toLowerCase();
  for (var g = 0; g < groups.length; g++) {
    var items = groups[g].querySelectorAll('li'), shown = 0;
    for (var i = 0; i < items.length; i++) {
      var hit = !q || items[i].textContent.toLowerCase().indexOf(q) >= 0;
      items[i].hidden = !hit;
      if (hit) shown++;
    }
    groups[g].hidden = shown === 0;
    if (shown) any = true;
  }
  var nm = host.querySelector('#srcNoMatch');
  if (nm) nm.hidden = any;
}
if (els.allSources && els.allSourcesBody) {
  var allSrcLang = null;
  /* Build lazily on first open (the list is long); rebuild on language change while open. */
  els.allSources.addEventListener('toggle', function () {
    if (els.allSources.open && (!srcList.built || srcList.lang !== AIDT.state.lang)) buildAllSources(AIDT.state.lang);
  });
  AIDT.registerPanel('allSourcesBody', function (ctx) {
    if (ctx.lang === allSrcLang) return;
    allSrcLang = ctx.lang;
    if (els.allSources.open) buildAllSources(ctx.lang); else srcList.built = false;
  });
  AIDT.on('lang', function (l) { allSrcLang = l; if (els.allSources.open) buildAllSources(l); else srcList.built = false; });
}

/* ============================================================================
   B2. STATE OF AI (October 2026): frontier per lab, topic bullets, open questions
   ========================================================================== */
var S26 = AIH.state2026 || null;

staticPanel('frontier', function () {
  var host = els.frontier, html = '';
  if (!S26) { host.innerHTML = ''; return; }
  if (els.nowLede) els.nowLede.textContent = L(S26.headline);
  var list = S26.frontier || [];
  html += '<h3 style="margin-bottom:12px">' + esc(t('now.frontier')) + '</h3><div class="front-grid">';
  for (var i = 0; i < list.length; i++) {
    var f = list[i], org = f.org ? L(f.org) : provName(f.provider);
    html += '<div class="front"><div class="pv"><span class="sw" style="--sw:' + esc(provColor(f.provider)) + '" aria-hidden="true"></span>' + esc(org) + '</div>' +
      '<div class="nm">' + esc(f.model) + '</div>' +
      (f.released ? '<div class="dt">' + esc(fmt.date(f.released, 'day')) + '</div>' : '') +
      (f.note ? '<div class="nt">' + esc(L(f.note)) + '</div>' : '') +
      srcButton(f.sources, f.model) + '</div>';
  }
  html += '</div>';
  host.innerHTML = html;
});

staticPanel('bullets', function () {
  var host = els.bullets, list = S26 && S26.bullets ? S26.bullets : [], html = '';
  if (!list.length) { host.innerHTML = ''; return; }
  html += '<h3 style="margin-bottom:12px">' + esc(t('now.bullets')) + '</h3><div class="bullets">';
  for (var i = 0; i < list.length; i++) {
    var b = list[i];
    html += '<div class="bullet"><div class="tp">' + esc(L(b.topic)) + '</div><p class="clamp" id="bullet' + i + '">' + esc(L(b.text)) + '</p>' +
      '<button type="button" class="link more" data-more="bullet' + i + '" aria-expanded="false" aria-controls="bullet' + i + '">' + esc(t('now.more')) + '</button>' +
      srcButton(b.sources, L(b.topic)) + '</div>';
  }
  html += '</div>';
  host.innerHTML = html;
  /* hide the toggle where nothing is clipped */
  var ps = host.querySelectorAll('p.clamp');
  for (var k = 0; k < ps.length; k++) {
    var btn = host.querySelector('[data-more="' + ps[k].id + '"]');
    if (btn && ps[k].scrollHeight <= ps[k].clientHeight + 2) btn.hidden = true;
  }
});
if (els.bullets) els.bullets.addEventListener('click', function (e) {
  var b = closest(e.target, '[data-more]');
  if (!b) return;
  var p = document.getElementById(b.getAttribute('data-more'));
  if (!p) return;
  var open = p.className.indexOf('clamp') >= 0;
  p.className = open ? '' : 'clamp';
  b.setAttribute('aria-expanded', open ? 'true' : 'false');
  b.textContent = t(open ? 'now.less' : 'now.more');
});

staticPanel('openQ', function () {
  var host = els.openQ, list = AIH.openQuestions || [], html = '';
  if (els.oqTitle) els.oqTitle.hidden = !list.length;
  for (var i = 0; i < list.length; i++) {
    var q = list[i];
    html += '<details class="q"><summary>' + esc(L(q.q)) + '</summary><div class="q-body">' +
      '<div><h4>' + esc(t('oq.case')) + '</h4><p>' + esc(L(q['case'])) + '</p></div>' +
      '<div><h4>' + esc(t('oq.counter')) + '</h4><p>' + esc(L(q.counter)) + '</p></div>' +
      (q.open ? '<div class="oq-open"><h4>' + esc(t('oq.open')) + '</h4><p>' + esc(L(q.open)) + '</p></div>' : '') +
      '</div>';
    var sb = srcButton(q.sources, L(q.q));
    if (sb) html += '<div class="q-src">' + sb + '</div>';
    html += '</details>';
  }
  host.innerHTML = html;
});

/* ============================================================================
   B3. MYTHS AND MIX-UPS (#mythsList) from AIH.corrections
   ========================================================================== */
staticPanel('mythsList', function () {
  var host = els.mythsList, list = AIH.corrections || [], html = '';
  for (var i = 0; i < list.length; i++) {
    var c = list[i];
    html += '<div class="myth"><div class="cl" data-l="' + esc(t('myths.claim')) + '">' + esc(L(c.claim)) + '</div>' +
      '<div class="re" data-l="' + esc(t('myths.reality')) + '">' + esc(L(c.reality)) + '</div>';
    var sb = srcButton(c.sources, L(c.claim));
    if (sb) html += '<div class="srcs">' + sb + '</div>';
    html += '</div>';
  }
  host.innerHTML = html || '<div class="empty">' + esc(t('src.none')) + '</div>';
});

});
})();
