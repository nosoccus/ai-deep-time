/* diagrams-a.js — renderers for: ARCH-symbolic, ARCH-perceptron, ARCH-mlp-backprop, ARCH-cnn,
   ARCH-rnn-lstm, ARCH-seq2seq-attention, ARCH-transformer.
   Contract: window.AIH_DIAGRAMS[archId] = function (ctx) { return '<svg …>…</svg>'; }
   ctx = { lang: 'en'|'uk', arch, accent }. Themed only through the .d-* classes of index.html
   (currentColor, var(--fg), var(--accent)). Signal-flow animation uses .flow/.d-pulse; under
   prefers-reduced-motion the renderers emit the static .dash class instead. ES5 only. */
window.AIH_DIAGRAMS = window.AIH_DIAGRAMS || {};
(function (D) {
  'use strict';

  /* ---------- shared helpers ---------- */
  function reducedMotion() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); }
    catch (e) { return false; }
  }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function pick(L, lang) { return L[lang] || L.en; }

  /* G(id): a small drawing kit bound to one diagram id (marker ids are prefixed with it). */
  function G(id) {
    var rm = reducedMotion();
    var o = { id: id, flow: rm ? 'dash' : 'flow', pulse: rm ? '' : ' d-pulse' };
    function marker(suffix, cls) {
      return '<marker id="' + id + '-' + suffix + '" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="8" markerHeight="8" ' +
        'markerUnits="userSpaceOnUse" orient="auto-start-reverse"><path d="M0 1 L10 5 L0 9 Z" class="d-fill' + (cls ? ' ' + cls : '') + '"/></marker>';
    }
    o.defs = function (extra) {
      return '<defs>' + marker('ar') + marker('ar-a', 'a') + marker('ar-b', 'b') + marker('ar-m', 'm') + marker('ar-ok', 'ok') + (extra || '') + '</defs>';
    };
    o.svg = function (W, H, title, body, cls) {
      /* --dmin = viewBox width: index.html applies it as min-width only at phone width (≤ 720 px), where .diag scrolls;
         wider screens scale the diagram to the column so nothing is clipped */
      return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" role="img" aria-label="' + esc(title) + '"' +
        ' class="dg' + (cls ? ' ' + cls : '') + '" style="--dmin:' + W + 'px">' + '<title>' + esc(title) + '</title>' + body + '</svg>';
    };
    o.mk = function (s) { return s ? ' marker-end="url(#' + id + '-' + s + ')"' : ''; };
    o.mks = function (s) { return s ? ' marker-start="url(#' + id + '-' + s + ')"' : ''; };
    o.path = function (d, cls, mkEnd, mkStart) {
      return '<path d="' + d + '" class="d-ln ' + (cls || '') + '"' + o.mk(mkEnd) + o.mks(mkStart) + '/>';
    };
    o.line = function (x1, y1, x2, y2, cls, mkEnd, mkStart) {
      return o.path('M' + x1 + ' ' + y1 + 'L' + x2 + ' ' + y2, cls, mkEnd, mkStart);
    };
    o.box = function (x, y, w, h, cls, r) {
      return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 6 : r) + '" class="d-box ' + (cls || '') + '"/>';
    };
    o.circle = function (cx, cy, r, cls) {
      return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="d-box ' + (cls || '') + '"/>';
    };
    o.dot = function (cx, cy, r, cls) {
      return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="d-fill ' + (cls || '') + '"/>';
    };
    o.t = function (x, y, s, cls, anchor) {
      return '<text x="' + x + '" y="' + y + '" class="d-t ' + (cls || '') + '"' + (anchor ? ' text-anchor="' + anchor + '"' : '') + '>' + esc(s) + '</text>';
    };
    /* multi-line text centred vertically on cy (lh = line height) */
    o.tl = function (x, cy, lines, cls, anchor, lh) {
      lh = lh || 12;
      var n = lines.length, y0 = cy - (n - 1) * lh / 2 + 4, out = '';
      for (var i = 0; i < n; i++) out += o.t(x, y0 + i * lh, lines[i], cls, anchor || 'middle');
      return out;
    };
    /* box with centred text; lines: string or array */
    o.bt = function (x, y, w, h, lines, boxCls, txtCls, lh) {
      if (typeof lines === 'string') lines = [lines];
      return o.box(x, y, w, h, boxCls) + o.tl(x + w / 2, y + h / 2, lines, txtCls, 'middle', lh);
    };
    /* panel title (accent eyebrow) */
    o.title = function (x, y, s) { return o.t(x, y, s, 'h a'); };
    return o;
  }

  /* ========================================================================
     ARCH-symbolic · search tree + expert system
     ======================================================================== */
  var L_SYM = {
    en: {
      title: 'Symbolic AI: heuristic search (A*, alpha-beta) and an expert system with a knowledge base, inference engine and working memory',
      pA: 'Search', start: 'start state', goal: 'goal', pruned: '✂ pruned',
      legend: ['g: cost so far', 'h: estimated cost to goal', 'f = g + h'],
      capA: 'A*: expand lowest g+h; alpha-beta: skip branches that cannot change the result',
      pB: 'Expert system',
      expert: ['Domain', 'expert'], ke: ['Knowledge', 'engineer'], interviews: 'interviews', writes: 'writes rules',
      kb: ['Knowledge base', 'IF–THEN rules', 'MYCIN ≈600 · R1 772 (1980)'],
      ie: ['Inference engine', 'match → select → fire'],
      wm: ['Working memory', 'facts about this case'],
      ui: ['User interface', '+ explanation (WHY? HOW?)'], user: 'user', query: 'query', answer: 'answer',
      rule: ['IF culture site = blood', 'AND gram stain = negative', 'AND morphology = rod', 'THEN organism = E. coli', '(CF 0.6)'],
      ruleNote: 'illustrative, MYCIN-style',
      chain: ['forward chaining (R1/XCON):', 'data → conclusion', 'backward chaining (MYCIN):', 'goal → missing facts']
    },
    uk: {
      title: 'Символьний ШІ: евристичний пошук (A*, альфа-бета) і експертна система з базою знань, механізмом логічного виведення та робочою пам\'яттю',
      pA: 'Пошук', start: 'початковий стан', goal: 'ціль', pruned: '✂ відсічено',
      legend: ['g: вартість шляху досі', 'h: оцінка решти шляху', 'f = g + h'],
      capA: 'A*: розкривати вузол із найменшим g+h; альфа-бета: пропускати гілки, що не змінять результат',
      pB: 'Експертна система',
      expert: ['Експерт', 'у галузі'], ke: ['Інженер', 'знань'], interviews: 'опитує', writes: 'пише правила',
      kb: ['База знань', 'правила IF–THEN', 'MYCIN ≈600 · R1 772 (1980)'],
      ie: ['Механізм логічного', 'виведення', 'зіставити → обрати', '→ спрацювати'],
      wm: ['Робоча пам\'ять', 'факти про цей випадок'],
      ui: ['Інтерфейс користувача', '+ пояснення (ЧОМУ? ЯК?)'], user: 'користувач', query: 'запит', answer: 'відповідь',
      rule: ['ЯКЩО місце посіву = кров', 'І грам-фарбування = негативне', 'І морфологія = паличка', 'ТО організм = E. coli', '(CF 0,6)'],
      ruleNote: 'ілюстративне правило в стилі MYCIN',
      chain: ['пряме виведення (R1/XCON):', 'дані → висновок', 'зворотне виведення (MYCIN):', 'ціль → потрібні факти']
    }
  };

  D['ARCH-symbolic'] = function (ctx) {
    var L = pick(L_SYM, ctx && ctx.lang), g = G('ARCH-symbolic'), s = '';
    var W = 720, H = 548;

    /* ---- Panel A: search tree ---- */
    s += g.title(14, 22, L.pA);
    for (var k = 0; k < L.legend.length; k++) s += g.t(14, 66 + k * 14, L.legend[k], 's m2', 'start');
    var cx = 390, root = { x: cx, y: 36 };
    var lv = [
      [{ x: cx - 110, g: 2, h: 7 }, { x: cx, g: 3, h: 4, on: true }, { x: cx + 110, g: 4, h: 6, cut: true }],
      [{ x: cx - 80, g: 5, h: 5, cut: true }, { x: cx, g: 6, h: 1, on: true }, { x: cx + 80, g: 5, h: 3 }],
      [{ x: cx - 80, g: 8, h: 1 }, { x: cx, g: 7, h: 0, on: true, goal: true }, { x: cx + 80, g: 8, h: 2 }]
    ];
    var ys = [100, 160, 220], bw = 60, bh = 22;
    var chosen = '';
    for (var i = 0; i < 3; i++) {
      var py = i === 0 ? root.y + 24 : ys[i - 1] + bh / 2, px = i === 0 ? root.x : lv[i - 1][1].x;
      for (var j = 0; j < 3; j++) {
        var n = lv[i][j], d = 'M' + px + ' ' + py + 'L' + n.x + ' ' + (ys[i] - bh / 2);
        if (n.on) chosen += g.path(d, 'a thick ' + g.flow, 'ar-a');
        else s += g.path(d, n.cut ? 'm thin' : 'thin');
      }
    }
    s += chosen;
    s += g.bt(root.x - 54, root.y, 108, 24, L.start, 'soft', 's');
    for (i = 0; i < 3; i++) for (j = 0; j < 3; j++) {
      n = lv[i][j];
      var w = n.goal ? 96 : bw;
      s += g.box(n.x - w / 2, ys[i] - bh / 2, w, bh, n.on ? 'hl' : (n.cut ? 'dim' : ''));
      s += g.t(n.x, ys[i] + 4, (n.goal ? L.goal + ' · ' : '') + 'g' + n.g + ' h' + n.h, 's' + (n.cut ? ' m' : ''), 'middle');
      if (n.cut) s += g.t(n.x, ys[i] + bh / 2 + 13, L.pruned, 's m', 'middle');
    }
    s += g.t(W / 2, 262, L.capA, 's m2', 'middle');

    /* divider */
    s += g.line(14, 280, W - 14, 280, 'm thin');

    /* ---- Panel B: expert system ---- */
    var y0 = 296;
    s += g.title(14, y0 + 6, L.pB);
    var r1 = y0 + 24;
    s += g.bt(20, r1 + 6, 90, 40, L.expert, '', 's');
    s += g.bt(150, r1 + 6, 100, 40, L.ke, '', 's');
    s += g.bt(290, r1, 210, 52, L.kb, 'soft', 's');
    s += g.line(110, r1 + 26, 150, r1 + 26, g.flow + ' slow', 'ar');
    s += g.t(130, r1 - 2, L.interviews, 's m', 'middle');
    s += g.line(250, r1 + 26, 290, r1 + 26, g.flow + ' slow', 'ar');
    s += g.t(270, r1 - 2, L.writes, 's m', 'middle');
    // illustrative rule under the knowledge base
    var ry = r1 + 70;
    for (i = 0; i < L.rule.length; i++) s += g.t(324, ry + i * 12, L.rule[i], 's', 'start');
    s += g.t(324, ry + L.rule.length * 12 + 4, L.ruleNote, 's m i', 'start');
    // chaining note at the right
    for (i = 0; i < L.chain.length; i++) s += g.t(536, ry + 12 + i * 13 + (i > 1 ? 8 : 0), L.chain[i], 's ' + (i % 2 ? 'm2' : 'm'), 'start');
    // row 2: working memory <-> inference engine; inference engine <-> knowledge base
    var r2 = r1 + 80;
    s += g.bt(14, r2 + 8, 140, 40, L.wm, '', 's');
    s += g.bt(176, r2, 140, 56, L.ie, 'hl', 's');          // right edge 316: clear of the rule text at x = 324
    s += g.line(154, r2 + 28, 176, r2 + 28, g.flow, 'ar', 'ar');
    s += g.line(304, r2, 304, r1 + 52, g.flow, 'ar', 'ar');
    // row 3: user interface + user
    var r3 = r2 + 86;
    s += g.bt(176, r3, 180, 40, L.ui, '', 's');          // 180 wide: "+ explanation (WHY? HOW?)" needs ≈160 px
    s += g.line(246, r2 + 56, 246, r3, g.flow, 'ar', 'ar');
    s += '<circle cx="80" cy="' + (r3 + 11) + '" r="6" class="d-fill m"/>';
    s += '<path d="M68 ' + (r3 + 33) + 'a12 12 0 0 1 24 0z" class="d-fill m"/>';
    s += g.t(80, r3 + 50, L.user, 's m', 'middle');
    s += g.line(98, r3 + 13, 176, r3 + 13, g.flow, 'ar');
    s += g.line(176, r3 + 29, 98, r3 + 29, g.flow, 'ar');
    s += g.t(137, r3 + 7, L.query, 'xs m', 'middle');
    s += g.t(137, r3 + 41, L.answer, 'xs m', 'middle');

    return g.svg(W, H, L.title, g.defs() + s);
  };

  /* ========================================================================
     ARCH-perceptron · one neuron, AND/OR/XOR plots, Mark I
     ======================================================================== */
  var L_PER = {
    en: {
      title: 'The perceptron: a weighted sum with a step threshold and an error-correction learning rule; AND and OR are linearly separable, XOR is not; the Mark I hardware',
      pA: 'One neuron', sum: 'Σ + b', eq: 's = Σ wᵢxᵢ + b', step: ['0 below threshold,', '1 above'],
      cmp: ['compare with', 'target t'], rule: 'Δw = η (t − y) x',
      pB: 'What one line can and can\'t separate', legend: '● output 1   ○ output 0',
      capAnd: 'one line cuts (1,1) off', capOr: 'one line separates (0,0)',
      capXor1: '✗ no single line works', capXor2: 'two hidden units = two lines',
      pC: 'Mark I Perceptron (1958–60)', s: '400 photocells (S-units)', wiring: 'fixed random wiring',
      a: '512 association units (A)', w: ['learned weights =', 'motor-driven potentiometers'], r: '8 response units (R)',
      kn: ['≈1,000 parameters', '≈7×10⁵ FLOP of training', '(Epoch est.)']
    },
    uk: {
      title: 'Перцептрон: зважена сума з пороговою функцією і правило навчання з виправленням помилок; AND і OR лінійно роздільні, XOR — ні; апаратний Mark I',
      pA: 'Один нейрон', sum: 'Σ + b', eq: 's = Σ wᵢxᵢ + b', step: ['0 нижче порога,', '1 вище'],
      cmp: ['порівняти', 'з ціллю t'], rule: 'Δw = η (t − y) x',
      pB: 'Що одна пряма може й не може розділити', legend: '● вихід 1   ○ вихід 0',
      capAnd: 'одна пряма відтинає (1,1)', capOr: 'одна пряма відділяє (0,0)',
      capXor1: '✗ жодна одна пряма не підходить', capXor2: 'два приховані нейрони = дві прямі',
      pC: 'Перцептрон Mark I (1958–60)', s: '400 фотоелементів (S-блоки)', wiring: 'фіксовані випадкові з\'єднання',
      a: '512 асоціативних блоків (A)', w: ['навчені ваги =', 'потенціометри з моторчиками'], r: '8 блоків відповіді (R)',
      kn: ['≈1 000 параметрів', '≈7×10⁵ FLOP навчання', '(оцінка Epoch)']
    }
  };

  D['ARCH-perceptron'] = function (ctx) {
    var L = pick(L_PER, ctx && ctx.lang), g = G('ARCH-perceptron'), s = '';
    var W = 720, H = 634, i;
    var SUB = ['₁', '₂', '₃', '₄'];

    /* ---- Panel A: one neuron ---- */
    s += g.title(14, 22, L.pA);
    var sx = 230, sy = 106, sr = 22, ys = [52, 88, 124, 160];
    for (i = 0; i < 4; i++) {
      var ix = 50, iy = ys[i], dx = ix - sx, dy = iy - sy, len = Math.sqrt(dx * dx + dy * dy);
      var ex = sx + dx / len * (sr + 2), ey = sy + dy / len * (sr + 2);
      s += g.line(ix + 12, iy, ex, ey, g.flow + ' slow', 'ar');
      s += g.circle(ix, iy, 11, '') + g.t(ix, iy + 4, 'x' + SUB[i], 's', 'middle');
      // weight label 8 px off the line along its upward normal (a fixed y-offset is not enough on the steep lines)
      var ddx = ex - ix - 12, ddy = ey - iy, l2 = Math.sqrt(ddx * ddx + ddy * ddy), lx = ix + 12 + ddx * 0.42, ly = iy + ddy * 0.42;
      s += g.t((lx + ddy / l2 * 8).toFixed(1), (ly - ddx / l2 * 8 + 3.5).toFixed(1), 'w' + SUB[i], 's m2', 'middle');
    }
    s += g.circle(sx, sy, sr, 'hl') + g.t(sx, sy + 4, L.sum, 'bold', 'middle');
    s += g.t(sx, sy + 48, L.eq, 's m2', 'middle');
    s += g.line(sx + sr, sy, 320, sy, g.flow, 'ar');
    s += g.box(322, sy - 18, 70, 36, '');
    s += g.path('M330 ' + (sy + 10) + 'L357 ' + (sy + 10) + 'L357 ' + (sy - 10) + 'L384 ' + (sy - 10), 'a');
    s += g.tl(357, sy + 44, L.step, 's m2', 'middle');
    s += g.line(392, sy, 428, sy, g.flow, 'ar');
    s += g.circle(446, sy, 14, '') + g.t(446, sy + 4, 'y', 'bold', 'middle');
    s += g.line(460, sy, 506, sy, g.flow, 'ar');
    s += '<polygon points="508,' + sy + ' 580,' + (sy - 26) + ' 652,' + sy + ' 580,' + (sy + 26) + '" class="d-box"/>';
    s += g.tl(580, sy, L.cmp, 's', 'middle');
    s += g.path('M580 ' + (sy + 26) + 'L580 196 L112 196 L112 178', 'b dash', 'ar-b');
    s += g.t(346, 190, L.rule, 's b', 'middle');

    s += g.line(14, 218, W - 14, 218, 'm thin');

    /* ---- Panel B: AND / OR / XOR plots ---- */
    s += g.title(14, 244, L.pB);
    s += g.t(W - 14, 244, L.legend, 's m2', 'end');
    var plots = [
      { x: 70, name: 'AND', on: [[1, 1]], lines: [[0.45, 1.05, 1.05, 0.45]], cap: [[L.capAnd, 'm2']] },
      { x: 300, name: 'OR', on: [[0, 1], [1, 0], [1, 1]], lines: [[-0.05, 0.55, 0.55, -0.05]], cap: [[L.capOr, 'm2']] },
      { x: 530, name: 'XOR', on: [[0, 1], [1, 0]], xor: true, cap: [[L.capXor1, 'b'], [L.capXor2, 'a']] }
    ];
    var P = 120, top = 272, bot = top + P;
    function mx(p, v) { return p.x + 20 + v * 80; }
    function my(v) { return bot - 20 - v * 80; }
    for (i = 0; i < plots.length; i++) {
      var p = plots[i], j;
      s += g.t(p.x + P / 2, 266, p.name, 'bold', 'middle');
      s += g.path('M' + p.x + ' ' + top + 'L' + p.x + ' ' + bot + 'L' + (p.x + P) + ' ' + bot, 'm thin');
      s += g.t(p.x + P / 2, bot + 14, 'x₁', 's m', 'middle');
      s += g.t(p.x - 8, top + P / 2 + 4, 'x₂', 's m', 'end');
      s += g.t(mx(p, 0), bot + 14, '0', 'xs m', 'middle') + g.t(mx(p, 1), bot + 14, '1', 'xs m', 'middle');
      s += g.t(p.x - 8, my(0) + 3, '0', 'xs m', 'end') + g.t(p.x - 8, my(1) + 3, '1', 'xs m', 'end');
      if (p.xor) {
        // the band between two lines (OR: x1+x2 = 0.5, NAND: x1+x2 = 1.5)
        s += '<polygon points="' + mx(p, -0.1) + ',' + my(0.6) + ' ' + mx(p, 0.6) + ',' + my(-0.1) + ' ' + mx(p, 1.1) + ',' + my(0.4) + ' ' + mx(p, 0.4) + ',' + my(1.1) + '" class="d-fill a" fill-opacity="0.12"/>';
        s += g.line(mx(p, -0.1), my(0.6), mx(p, 0.6), my(-0.1), 'a');
        s += g.line(mx(p, 0.4), my(1.1), mx(p, 1.1), my(0.4), 'a');
        // one failing line (x2 = 0.5), dashed, with a red cross
        s += g.line(mx(p, -0.1), my(0.5), mx(p, 1.1), my(0.5), 'm dash');
        s += '<circle cx="' + mx(p, 1.05) + '" cy="' + my(0.5) + '" r="7" class="d-fill bg3"/>';
        s += g.t(mx(p, 1.05), my(0.5) + 4, '✗', 'b bold', 'middle');
      } else {
        for (j = 0; j < p.lines.length; j++) { var l = p.lines[j]; s += g.line(mx(p, l[0]), my(l[1]), mx(p, l[2]), my(l[3]), 'a'); }
      }
      var pts = [[0, 0], [1, 0], [0, 1], [1, 1]];
      for (j = 0; j < 4; j++) {
        var on = false, k;
        for (k = 0; k < p.on.length; k++) if (p.on[k][0] === pts[j][0] && p.on[k][1] === pts[j][1]) on = true;
        s += on ? g.dot(mx(p, pts[j][0]), my(pts[j][1]), 5, 'a') : '<circle cx="' + mx(p, pts[j][0]) + '" cy="' + my(pts[j][1]) + '" r="4.5" class="d-box" stroke-width="1.5"/>';
      }
      for (j = 0; j < p.cap.length; j++) s += g.t(p.x + P / 2, bot + 30 + j * 13, p.cap[j][0], 's ' + p.cap[j][1], 'middle');
    }

    s += g.line(14, 446, W - 14, 446, 'm thin');

    /* ---- Panel C: Mark I ---- */
    s += g.title(14, 470, L.pC);
    var gy = 508;
    var extra = '<pattern id="ARCH-perceptron-grid" width="4" height="4" patternUnits="userSpaceOnUse"><rect width="2.6" height="2.6" class="d-fill m"/></pattern>';
    s += '<rect x="52" y="' + gy + '" width="80" height="80" fill="url(#ARCH-perceptron-grid)"/>';
    s += g.t(92, gy + 98, L.s, 's m2', 'middle');
    // fixed random wiring (deterministic pseudo-random tangle)
    var seed = 11;
    function rnd() { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; }
    var wires = '';
    for (i = 0; i < 26; i++) wires += 'M132 ' + (gy + 2 + rnd() * 76).toFixed(1) + 'L250 ' + (gy - 8 + rnd() * 100).toFixed(1);
    s += '<path d="' + wires + '" class="d-ln m thin" stroke-opacity="0.55"/>';
    s += g.t(166, gy - 12, L.wiring, 's m', 'middle');
    // A column
    s += g.box(250, gy - 10, 26, 104, '');
    for (i = 0; i < 13; i++) s += g.dot(263, gy - 2 + i * 8, 2.4, 'm2');
    s += g.t(263, gy + 108, L.a, 's m2', 'middle');
    // learned weights: thick arrows into the R units
    var ry0 = gy + 4, rstep = 10.5;
    for (i = 0; i < 5; i++) s += g.line(276, gy + 8 + i * 18, 426, ry0 + [0, 2, 4, 5, 7][i] * rstep, 'a thick ' + g.flow, 'ar-a');
    s += g.tl(362, gy - 16, L.w, 's m', 'middle');
    for (i = 0; i < 8; i++) s += '<circle cx="434" cy="' + (ry0 + i * rstep) + '" r="4" class="d-box"/>';
    s += g.t(434, gy + 108, L.r, 's m2', 'middle');
    for (i = 0; i < L.kn.length; i++) s += g.t(530, gy + 14 + i * 14, L.kn[i], 's ' + (i === 2 ? 'm' : 'm2'), 'start');

    return g.svg(W, H, L.title, g.defs(extra) + s);
  };

  /* ========================================================================
     ARCH-mlp-backprop · 2-2-1 XOR network, forward / loss / backward / update
     ======================================================================== */
  var L_MLP = {
    en: {
      title: 'A 2-2-1 network trained by backpropagation: forward pass, loss, backward error signals along every weight, and the gradient-descent update',
      fwd: '① forward pass: activations', loss: '② loss L = ½(y − t)²', bwd: '③ backward pass: error signals δ',
      upd: '④ update: w ← w − η ∂L/∂w', sig: '(sigmoid)', params: '6 weights + 3 biases = 9 parameters',
      xor: 'a 2-2-1 network that computes XOR', dw1: '∂L/∂w = δ_y · h₁',
      chain: '∂L/∂w = (∂L/∂y)(∂y/∂h₁)(∂h₁/∂z₁)(∂z₁/∂w)', target: 'target t'
    },
    uk: {
      title: 'Мережа 2-2-1, навчена зворотним поширенням помилки: прямий прохід, функція втрат, зворотні сигнали помилки вздовж кожної ваги й оновлення градієнтним спуском',
      fwd: '① прямий прохід: активації', loss: '② функція втрат L = ½(y − t)²', bwd: '③ зворотний прохід: сигнали помилки δ',
      upd: '④ оновлення: w ← w − η ∂L/∂w', sig: '(сигмоїда)', params: '6 ваг + 3 зсуви = 9 параметрів',
      xor: 'мережа 2-2-1, що обчислює XOR', dw1: '∂L/∂w = δ_y · h₁',
      chain: '∂L/∂w = (∂L/∂y)(∂y/∂h₁)(∂h₁/∂z₁)(∂z₁/∂w)', target: 'ціль t'
    }
  };

  D['ARCH-mlp-backprop'] = function (ctx) {
    var L = pick(L_MLP, ctx && ctx.lang), g = G('ARCH-mlp-backprop'), s = '';
    var W = 720, H = 336, R = 18, i;
    var N = { x1: [80, 112], x2: [80, 192], h1: [260, 112], h2: [260, 192], y: [440, 152] };
    var E = [['x1', 'h1'], ['x1', 'h2'], ['x2', 'h1'], ['x2', 'h2'], ['h1', 'y'], ['h2', 'y']];
    function edge(a, b, off, back) {
      var A = N[a], B = N[b], dx = B[0] - A[0], dy = B[1] - A[1], len = Math.sqrt(dx * dx + dy * dy);
      var ux = dx / len, uy = dy / len, nx = -uy, ny = ux;
      var ax = A[0] + ux * (R + 2) + nx * off, ay = A[1] + uy * (R + 2) + ny * off;
      var bx = B[0] - ux * (R + 2) + nx * off, by = B[1] - uy * (R + 2) + ny * off;
      return back ? g.line(bx, by, ax, ay, 'b dash thin ' + g.flow, 'ar-b') : g.line(ax, ay, bx, by, g.flow + ' slow', 'ar');
    }
    // ① forward arrow across the top
    s += g.t(300, 24, L.fwd, 's bold', 'middle');
    s += g.line(60, 34, 540, 34, 'a ' + g.flow, 'ar-a');
    // edges: forward (above) and backward (below)
    for (i = 0; i < E.length; i++) s += edge(E[i][0], E[i][1], -3, false);
    for (i = 0; i < E.length; i++) s += edge(E[i][0], E[i][1], 4, true);
    // nodes
    var names = { x1: 'x₁', x2: 'x₂', h1: 'h₁', h2: 'h₂', y: 'y' };
    for (var k in N) if (N.hasOwnProperty(k)) {
      s += g.circle(N[k][0], N[k][1], R, k === 'y' ? 'hl' : (k.charAt(0) === 'h' ? 'soft' : ''));
      s += g.t(N[k][0], N[k][1] + 4, names[k], 'bold', 'middle');
      if (k.charAt(0) !== 'x') s += g.t(N[k][0] + 26, N[k][1] - 14, '+b', 'xs m2', 'start');
    }
    s += g.t(260, 226, L.sig, 'xs m', 'middle');
    // annotations on two weights
    s += g.t(170, 82, L.chain, 's m2', 'middle');
    s += g.t(362, 110, L.dw1, 's m2', 'middle');   // above the h₁→y edge, clear of it at both ends
    // ② loss box, with target t
    s += g.line(458, 152, 520, 152, g.flow + ' slow', 'ar');
    s += g.bt(522, 134, 170, 36, L.loss, 'soft', 's');
    s += g.t(607, 122, L.target, 'xs m', 'middle');
    s += g.line(520, 160, 458, 160, 'b dash thin ' + g.flow, 'ar-b');
    // ③ backward label, params note
    s += g.t(300, 262, L.bwd, 's b bold', 'middle');
    s += g.t(300, 280, L.xor + ' · ' + L.params, 's m', 'middle');
    // ④ update inset: 1-D loss curve with a ball rolling downhill
    s += g.path('M540 192L540 292L706 292', 'm thin');
    s += g.t(533, 202, 'L', 's m', 'end') + g.t(706, 305, 'w', 's m', 'middle');
    s += g.path('M546 202C580 302,640 302,696 207', 'm2');
    s += g.dot(575.5, 251, 6, 'a');
    s += g.line(590, 262, 622, 277, 'a', 'ar-a');
    s += g.t(623, 322, L.upd, 's bold', 'middle');

    return g.svg(W, H, L.title, g.defs() + s);
  };

  /* ========================================================================
     ARCH-cnn · LeNet-5 pipeline with real layer sizes, weight sharing, pooling,
     "what the layers learn", LeNet/AlexNet/ResNet comparison and the skip connection
     ======================================================================== */
  var L_CNN = {
    en: {
      title: 'LeNet-5 (1998): a 32×32 digit passes through convolution and pooling layers (C1 6@28×28, S2 6@14×14, C3 16@10×10, S4 16@5×5), then C5 120, F6 84 and 10 output units; weight sharing and pooling shown; LeNet-5, AlexNet and ResNet compared',
      head: 'LeNet-5 (1998), layer by layer',
      layers: [
        ['INPUT', '32×32', '1 map'],
        ['C1', 'conv 5×5', '6 @ 28×28', '156 params', '122,304 conn.'],
        ['S2', 'pool 2×2', '6 @ 14×14', '12 params'],
        ['C3', 'conv 5×5', '16 @ 10×10', '1,516 params'],
        ['S4', 'pool 2×2', '16 @ 5×5', '32 params'],
        ['C5', 'conv 5×5', '120 units', '48,120 params'],
        ['F6', 'fully conn.', '84 units', '10,164 params'],
        ['OUTPUT', '10 digits', 'RBF units']
      ],
      ws: 'same 25 weights everywhere = weight sharing', pool: 'pool',
      learn: 'what the layers learn', stages: ['edges', 'strokes / corners', 'digit parts', 'digit'],
      cmpNote: 'bar = training compute, log scale (Epoch est.)',
      rows: ['LeNet-5 (1998): 7 layers, 60K params, ~2.8×10¹² FLOP',
        'AlexNet (2012): 8 learned layers (5 conv + 3 fully connected), 60M params, ~4.7×10¹⁷ FLOP',
        'ResNet-152 (2015): 152 layers with skip connections, ~60M params, ~1×10¹⁹ FLOP'],
      skip: 'skip connection (ResNet)', layer: 'layer', skipEq: 'output = F(x) + x',
      c3: 'C3: each of the 16 maps connects to a chosen subset of S2\'s 6 maps',
      kn: 'LeNet-5: 340,908 connections · 0.95% MNIST error · 2–3 CPU-days'
    },
    uk: {
      title: 'LeNet-5 (1998): цифра 32×32 проходить шари згортки й пулінгу (C1 6@28×28, S2 6@14×14, C3 16@10×10, S4 16@5×5), далі C5 120, F6 84 і 10 вихідних нейронів; показано спільні ваги й пулінг; порівняння LeNet-5, AlexNet і ResNet',
      head: 'LeNet-5 (1998), шар за шаром',
      layers: [
        ['ВХІД', '32×32', '1 карта'],
        ['C1', 'згортка 5×5', '6 @ 28×28', '156 парам.', '122 304 з\'єдн.'],
        ['S2', 'пулінг 2×2', '6 @ 14×14', '12 парам.'],
        ['C3', 'згортка 5×5', '16 @ 10×10', '1 516 парам.'],
        ['S4', 'пулінг 2×2', '16 @ 5×5', '32 парам.'],
        ['C5', 'згортка 5×5', '120 нейронів', '48 120 парам.'],
        ['F6', 'повнозв\'язний', '84 нейрони', '10 164 парам.'],
        ['ВИХІД', '10 цифр', 'RBF-нейрони']
      ],
      ws: 'ті самі 25 ваг усюди = спільні ваги', pool: 'пулінг',
      learn: 'що вивчають шари', stages: ['краї', 'штрихи / кути', 'частини цифр', 'цифра'],
      cmpNote: 'смужка = обчислення навчання, лог. шкала (оцінка Epoch)',
      rows: ['LeNet-5 (1998): 7 шарів, 60 тис. параметрів, ~2,8×10¹² FLOP',
        'AlexNet (2012): 8 навчених шарів (5 згорткових + 3 повнозв\'язні), 60 млн параметрів, ~4,7×10¹⁷ FLOP',
        'ResNet-152 (2015): 152 шари з обхідними з\'єднаннями, ~60 млн параметрів, ~1×10¹⁹ FLOP'],
      skip: 'обхідне з\'єднання (ResNet)', layer: 'шар', skipEq: 'вихід = F(x) + x',
      c3: 'C3: кожна з 16 карт з\'єднана з вибраною підмножиною 6 карт S2',
      kn: 'LeNet-5: 340 908 з\'єднань · 0,95 % помилок на MNIST · 2–3 CPU-дні'
    }
  };

  D['ARCH-cnn'] = function (ctx) {
    var L = pick(L_CNN, ctx && ctx.lang), g = G('ARCH-cnn'), s = '';
    var W = 720, H = 450, cy = 104, i, j;
    s += g.title(14, 22, L.head);
    // layer geometry: centre x, map size (px), maps drawn, kind: 'maps' | 'bar' | 'units'
    var LY = [
      { x: 54, sz: 56, n: 1, kind: 'maps' },
      { x: 142, sz: 49, n: 6, kind: 'maps' },
      { x: 230, sz: 25, n: 6, kind: 'maps' },
      { x: 316, sz: 18, n: 6, kind: 'maps' },
      { x: 396, sz: 9, n: 6, kind: 'maps' },
      { x: 470, sz: 60, n: 1, kind: 'bar' },
      { x: 556, sz: 42, n: 1, kind: 'bar' },
      { x: 640, sz: 10, n: 1, kind: 'units' }
    ];
    var OFF = 3;
    function extents(l) {
      if (l.kind === 'maps') { var k = l.n, d = OFF * (k - 1) / 2; return [l.x - l.sz / 2 - d, l.x + l.sz / 2 + d]; }
      if (l.kind === 'bar') return [l.x - 6, l.x + 6];
      return [l.x - 4, l.x + 4];
    }
    // arrows between layers
    for (i = 0; i < LY.length - 1; i++) {
      var a = extents(LY[i]), b = extents(LY[i + 1]);
      s += g.line(a[1] + 3, cy, b[0] - 3, cy, g.flow + ' slow', 'ar');
    }
    // layers
    for (i = 0; i < LY.length; i++) {
      var l = LY[i];
      if (l.kind === 'maps') {
        var k = l.n, d = OFF * (k - 1) / 2;
        for (j = k - 1; j >= 0; j--) {
          s += g.box(l.x - l.sz / 2 - d + OFF * j, cy - l.sz / 2 + d - OFF * j, l.sz, l.sz, j === 0 ? 'soft' : '', 1);
        }
      } else if (l.kind === 'bar') {
        s += g.box(l.x - 6, cy - l.sz / 2, 12, l.sz, 'soft', 2);
        for (j = 1; j < 6; j++) s += g.line(l.x - 6, cy - l.sz / 2 + l.sz * j / 6, l.x + 6, cy - l.sz / 2 + l.sz * j / 6, 'm thin');
      } else {
        for (j = 0; j < 10; j++) s += '<circle cx="' + l.x + '" cy="' + (cy - 31.5 + j * 7) + '" r="2.6" class="d-box soft"/>';
      }
      var lines = L.layers[i];
      // params / connections lines in xs: at 's' the C5 and F6 labels ran into each other (4 px apart)
      for (j = 0; j < lines.length; j++) s += g.t(l.x, 172 + j * 12, lines[j], (j === 0 ? 's bold' : (j === 1 ? 's m2' : (j === 2 ? 's m' : 'xs m'))), 'middle');
    }
    // 5×5 kernel sliding on the input → one pixel of C1 (weight sharing)
    var inL = 54 - 28, inT = cy - 28;
    s += g.box(inL + 7, inT + 7, 9, 9, 'hl', 0);
    var c1 = LY[1], c1L = c1.x - c1.sz / 2 - OFF * 2.5, c1T = cy - c1.sz / 2 + OFF * 2.5;
    s += g.path('M' + (inL + 16) + ' ' + (inT + 7) + 'L' + (c1L + 3) + ' ' + (c1T + 3) + 'M' + (inL + 16) + ' ' + (inT + 16) + 'L' + (c1L + 3) + ' ' + (c1T + 5), 'a thin dash');
    s += g.box(c1L + 2, c1T + 2, 3, 3, 'hl', 0);
    s += g.t(14, 52, L.ws, 's a', 'start');
    s += g.line(inL + 11, 56, inL + 11, inT + 5, 'a thin');
    // 2×2 pool on C1 → one pixel of S2
    s += g.box(c1L + 40, c1T + 40, 4, 4, 'hl', 0);
    var s2 = LY[2], s2L = s2.x - s2.sz / 2 - OFF * 2.5, s2T = cy - s2.sz / 2 + OFF * 2.5;
    s += g.path('M' + (c1L + 44) + ' ' + (c1T + 40) + 'L' + (s2L + 20) + ' ' + (s2T + 20) + 'M' + (c1L + 44) + ' ' + (c1T + 44) + 'L' + (s2L + 20) + ' ' + (s2T + 22), 'a thin dash');
    s += g.box(s2L + 19, s2T + 19, 2.5, 2.5, 'hl', 0);
    s += g.t(s2.x, 152, L.pool, 's a', 'middle');
    // what the layers learn
    s += g.t(14, 236, L.learn + ':', 's m', 'start');
    var sx = [142, 316, 500, 640];
    for (i = 0; i < 4; i++) {
      s += g.t(sx[i], 252, L.stages[i], 's m2', 'middle');
      if (i < 3) {
        var wA = L.stages[i].length * 3.3, wB = L.stages[i + 1].length * 3.3;
        s += g.line(sx[i] + wA + 8, 248, sx[i + 1] - wB - 8, 248, 'm thin', 'ar-m');
      }
    }
    s += g.line(14, 268, W - 14, 268, 'm thin');
    // comparison bars (log-scale training compute)
    s += g.t(W - 14, 284, L.cmpNote, 'xs m', 'end');
    var flop = [12.45, 17.67, 19.0];
    for (i = 0; i < 3; i++) {
      var yy = 300 + i * 26, len = Math.round((flop[i] - 10) / 10 * 300);
      s += g.t(14, yy, L.rows[i], 's', 'start');
      s += '<rect x="14" y="' + (yy + 5) + '" width="' + len + '" height="5" rx="2" class="d-fill a"' + (i === 2 ? '' : ' fill-opacity="0.75"') + '/>';
    }
    // skip connection sketch (ResNet)
    var ky = 414;
    s += g.t(14, ky - 40, L.skip, 's m', 'start');
    s += g.t(20, ky + 4, 'x', 's bold', 'start');
    s += g.line(32, ky, 60, ky, g.flow + ' slow', 'ar');
    s += g.bt(62, ky - 12, 48, 24, L.layer, '', 's');
    s += g.line(110, ky, 136, ky, g.flow + ' slow', 'ar');
    s += g.bt(138, ky - 12, 48, 24, L.layer, '', 's');
    s += g.line(186, ky, 212, ky, g.flow + ' slow', 'ar');
    s += g.circle(222, ky, 9, '') + g.t(222, ky + 4, '+', 'bold', 'middle');
    s += g.path('M46 ' + ky + 'C46 ' + (ky - 34) + ',222 ' + (ky - 34) + ',222 ' + (ky - 10), 'a ' + g.flow, 'ar-a');
    s += g.line(231, ky, 258, ky, g.flow + ' slow', 'ar');
    s += g.t(266, ky + 4, L.skipEq, 's a', 'start');
    s += g.t(W - 14, ky - 14, L.c3, 'xs m2', 'end');
    s += g.t(W - 14, ky + 26, L.kn, 'xs m2', 'end');

    return g.svg(W, H, L.title, g.defs() + s);
  };

  /* ========================================================================
     ARCH-rnn-lstm · unrolled RNN with the fading backward pass; the LSTM cell
     ======================================================================== */
  var L_RNN = {
    en: {
      title: 'A recurrent network unrolled over three time steps, with the backward gradient fading at each step; and the LSTM cell with its cell-state highway, forget, input and output gates and the tanh candidate',
      pA: 'RNN unrolled', cell: 'RNN cell', eq: 'h_t = tanh(W_x·x_t + W_h·h_{t−1} + b)',
      back: 'backward pass', vanish: 'gradient × ~0.9 per step → fades (vanishing gradient)',
      pB: 'LSTM cell', state: 'cell state c', callout: ['not in the 1997 original;', 'added 1999–2000'],
      f: ['σ', 'f · forget'], i: ['σ', 'i · input'], gg: ['tanh', 'g · candidate'], o: ['σ', 'o · output'],
      eqs: ['c_t = f ⊙ c_{t−1} + i ⊙ g', 'h_t = o ⊙ tanh(c_t)'], kn: '1997: learned lags of 1,000+ steps',
      out: 'y_t = h_t', hprev: 'h_{t−1}', xt: 'x_t'
    },
    uk: {
      title: 'Рекурентна мережа, розгорнута на три кроки часу, зі зворотним градієнтом, що згасає на кожному кроці; і LSTM-комірка з «магістраллю» стану комірки, гейтами забування, входу й виходу та tanh-кандидатом',
      pA: 'RNN у розгортці', cell: 'RNN-комірка', eq: 'h_t = tanh(W_x·x_t + W_h·h_{t−1} + b)',
      back: 'зворотний прохід', vanish: 'градієнт × ~0,9 на крок → згасає (зникомий градієнт)',
      pB: 'LSTM-комірка', state: 'стан комірки c', callout: ['немає в оригіналі', '1997 р.; додано', '1999–2000'],
      f: ['σ', 'f · забути'], i: ['σ', 'i · вхід'], gg: ['tanh', 'g · кандидат'], o: ['σ', 'o · вихід'],
      eqs: ['c_t = f ⊙ c_{t−1} + i ⊙ g', 'h_t = o ⊙ tanh(c_t)'], kn: '1997: вивчено лаги понад 1 000 кроків',
      out: 'y_t = h_t', hprev: 'h_{t−1}', xt: 'x_t'
    }
  };

  D['ARCH-rnn-lstm'] = function (ctx) {
    var L = pick(L_RNN, ctx && ctx.lang), g = G('ARCH-rnn-lstm'), s = '';
    var W = 720, H = 560, i;

    /* ---- Panel A: RNN unrolled ---- */
    s += g.title(14, 22, L.pA);
    s += g.t(W - 14, 22, L.eq, 's m2', 'end');
    var cx = [180, 360, 540], idx = ['t−1', 't', 't+1'], bw = 110, bh = 44, by = 72, my = by + bh / 2;
    for (i = 0; i < 3; i++) {
      s += g.bt(cx[i] - bw / 2, by, bw, bh, [L.cell, idx[i]], i === 1 ? 'hl' : 'soft', 's');
      s += g.line(cx[i], by + bh + 26, cx[i], by + bh + 2, g.flow, 'ar');
      s += g.t(cx[i], by + bh + 40, 'x_' + idx[i], 's', 'middle');
      s += g.line(cx[i], by - 2, cx[i], by - 30, g.flow, 'ar');
      s += g.t(cx[i], by - 36, 'y_' + idx[i], 's', 'middle');
    }
    var hl = ['h_{t−2}', 'h_{t−1}', 'h_t', 'h_{t+1}'];
    for (i = 0; i <= 3; i++) {
      var x1 = i === 0 ? 60 : cx[i - 1] + bw / 2 + 2, x2 = i === 3 ? 660 : cx[i] - bw / 2 - 2;
      s += g.line(x1, my, x2, my, 'a ' + g.flow, 'ar-a');
      s += g.t((x1 + x2) / 2, my - 7, hl[i], 'xs m2', 'middle');
    }
    // backward pass: thinner at each step
    var yb = 178, widths = [3, 1.8, 0.9];
    for (i = 0; i < 3; i++) {
      var xa = 660 - i * 180, xb = xa - 150;
      s += '<path d="M' + xa + ' ' + yb + 'L' + xb + ' ' + yb + '" class="d-ln b ' + g.flow + '" style="stroke-width:' + widths[i] + 'px"' + g.mk('ar-b') + '/>';
    }
    s += g.t(585, yb - 6, L.back, 'xs b', 'middle');
    s += g.t(360, yb + 20, L.vanish, 's b', 'middle');

    s += g.line(14, 214, W - 14, 214, 'm thin');

    /* ---- Panel B: LSTM cell (shifted down by 12) ---- */
    s += '<g transform="translate(0,12)">';
    s += g.title(14, 230, L.pB);
    var R = { x: 60, y: 250, w: 620, h: 230 }, cs = 290;   // x ≥ 60 keeps the end-anchored c_{t−1} / h_{t−1} labels inside the viewBox
    s += g.box(R.x, R.y, R.w, R.h, 'inv', 14);
    // cell-state highway
    s += g.line(R.x, cs, R.x + R.w + 2, cs, 'a thick ' + g.flow, 'ar-a');
    s += g.t(R.x - 6, cs + 4, 'c_{t−1}', 's', 'end');
    s += g.t(R.x + R.w + 10, cs + 4, 'c_t', 's', 'start');
    s += g.t(R.x + 40, cs - 8, L.state, 's a', 'start');
    // nodes on the highway
    function node(x, y, sym) { return g.circle(x, y, 12, '') + g.t(x, y + 4, sym, 'bold', 'middle'); }
    // gates row
    var gy = 345, gh = 32;
    var fx = 230, ix = 330, gx = 430, ox = 610;
    s += g.box(fx - 35, gy, 70, gh, 'hl') + '<rect x="' + (fx - 35) + '" y="' + gy + '" width="70" height="' + gh + '" rx="6" fill="none" class="d-ln a thin" stroke-dasharray="4 3"/>' + g.tl(fx, gy + gh / 2, L.f, 's', 'middle', 11);
    s += g.bt(ix - 35, gy, 70, gh, L.i, '', 's', 11);
    s += g.bt(gx - 42, gy, 84, gh, L.gg, '', 's', 11);
    // f → ×1 on the highway
    s += g.line(fx, gy, fx, cs + 14, g.flow, 'ar');
    s += node(fx, cs, '×');
    // i, g → ×2 → +
    s += g.line(ix, gy, 370, 338, g.flow, 'ar');
    s += g.line(gx, gy, 390, 338, g.flow, 'ar');
    s += node(380, 326, '×');
    s += g.line(380, 314, 380, cs + 14, g.flow, 'ar');
    s += node(380, cs, '+');
    // output branch: tanh → ×3 with o
    s += g.dot(520, cs, 3.5, 'a');
    s += g.line(520, cs, 520, 324, g.flow, 'ar');
    s += g.bt(492, 326, 56, 26, 'tanh', '', 's');
    s += g.line(520, 352, 520, 386, g.flow, 'ar');
    s += node(520, 400, '×');
    s += g.bt(ox - 35, 384, 70, gh, L.o, '', 's', 11);
    s += g.line(ox - 35, 400, 534, 400, g.flow, 'ar');
    // inputs bus [h_{t-1}, x_t] feeding all four blocks
    var bus = 432;
    s += g.t(R.x - 6, bus + 4, L.hprev, 's', 'end');
    s += g.line(R.x - 2, bus, ox, bus, 'm');
    s += g.line(110, R.y + R.h + 22, 110, bus, 'm', '');
    s += g.t(122, R.y + R.h + 16, L.xt, 's', 'start');
    s += g.dot(110, bus, 3, 'm');
    var stubs = [fx, ix, gx];
    for (i = 0; i < 3; i++) { s += g.line(stubs[i], bus, stubs[i], gy + gh + 2, 'm ' + g.flow, 'ar-m'); s += g.dot(stubs[i], bus, 3, 'm'); }
    s += g.line(ox, bus, ox, 384 + gh + 2, 'm ' + g.flow, 'ar-m');
    // h_t out: right edge, and up as the step's output
    s += g.line(520, 412, 520, 456, g.flow, '');
    s += g.line(520, 456, R.x + R.w + 2, 456, 'a ' + g.flow, 'ar-a');
    s += g.t(R.x + R.w + 10, 460, 'h_t', 's', 'start');
    s += g.dot(660, 456, 3.5, 'a');
    s += g.line(660, 456, 660, cs + 7, 'a ' + g.flow, '');
    s += g.line(660, cs - 7, 660, R.y - 16, 'a ' + g.flow, 'ar-a');
    s += g.t(660, R.y - 22, L.out, 's', 'middle');
    // forget-gate callout
    s += g.tl(206, 322, L.callout, 'xs a', 'end', 11);   // 2–3 lines fit between the highway (290) and the gate row (345)
    // equations and key number
    s += g.t(W - 14, 500, L.eqs[0], 's m2', 'end');
    s += g.t(W - 14, 514, L.eqs[1], 's m2', 'end');
    s += g.t(W - 14, 532, L.kn, 'xs m', 'end');
    s += '</g>';

    return g.svg(W, H, L.title, g.defs() + s);
  };

  /* ========================================================================
     ARCH-seq2seq-attention · bidirectional encoder, decoder chain, attention for
     one step (score → softmax → weighted sum), alignment heat-map inset
     ======================================================================== */
  var L_S2S = {
    en: {
      title: 'Encoder–decoder RNN with attention: a bidirectional encoder gives one annotation per source word; for each output word the decoder scores every annotation, softmaxes the scores into weights and feeds the weighted sum as context; the inset shows the learned alignment between an English and a French sentence',
      dec: 'Decoder', enc: 'Encoder: bidirectional RNN over the source sentence',
      score: 'score e_ij = a(s_{i−1}, h_j)', soft: ['softmax over j', 'α_i1 … α_iT (sum = 1)'], sum: ['Σ α_ij h_j', '= c_i'],
      back: 'backward RNN', fwd: 'forward RNN', hj: ['h_j =', '[→h_j ; ←h_j]'],
      insetT: 'alignment (attention weights α)', insetC: ['attention learns word alignment', 'without being told'],
      thin: 'thin: every h_j is scored', thick: 'thick ∝ α_ij ("zone" ← "Area")',
      kn: 'RNNsearch-50 (2014): 26.75 BLEU vs 17.82 without attention (En→Fr)'
    },
    uk: {
      title: 'Енкодер–декодер на RNN з увагою: двонапрямний енкодер дає одну анотацію на кожне вхідне слово; для кожного вихідного слова декодер оцінює всі анотації, softmax перетворює оцінки на ваги, а зважена сума стає контекстом; вставка показує вивчене вирівнювання між англійським і французьким реченнями',
      dec: 'Декодер', enc: 'Енкодер: двонапрямна RNN над вхідним реченням',
      score: 'оцінка e_ij = a(s_{i−1}, h_j)', soft: ['softmax за j', 'α_i1 … α_iT (сума = 1)'], sum: ['Σ α_ij h_j', '= c_i'],
      back: 'RNN назад', fwd: 'RNN вперед', hj: ['h_j =', '[→h_j ; ←h_j]'],
      insetT: 'вирівнювання (ваги уваги α)', insetC: ['увага вивчає вирівнювання слів', 'без підказок'],
      thin: 'тонкі: оцінюється кожне h_j', thick: 'товщина ∝ α_ij («zone» ← «Area»)',
      kn: 'RNNsearch-50 (2014): 26,75 BLEU проти 17,82 без уваги (En→Fr)'
    }
  };

  D['ARCH-seq2seq-attention'] = function (ctx) {
    var L = pick(L_S2S, ctx && ctx.lang), g = G('ARCH-seq2seq-attention'), s = '';
    var W = 720, H = 516, i, j;
    var src = ['The', 'agreement', 'on', 'the', 'European', 'Economic', 'Area', '…'];
    var tgt = ['L\'', 'accord', 'sur', 'la', 'zone', 'économique', 'européenne'];
    var alpha = [0.02, 0.03, 0.02, 0.03, 0.08, 0.14, 0.62, 0.06];
    var colX = [], barTop = 380;
    for (j = 0; j < 8; j++) colX.push(126 + j * 72);

    /* ---- decoder (top-left) ---- */
    s += g.t(14, 40, L.dec, 'xs m', 'start');   // above the chain, clear of the s_{i−1} box (x ≥ 55)
    var dx = [90, 210, 330], dn = ['s_{i−1}', 's_i', 's_{i+1}'], words = ['la', 'zone', 'économique'];
    for (i = 0; i < 3; i++) {
      s += g.bt(dx[i] - 35, 46, 70, 28, dn[i], i === 1 ? 'hl' : 'soft', 's');
      s += g.line(dx[i], 44, dx[i], 34, 'm thin', 'ar-m');
      s += g.t(dx[i], 28, words[i], i === 1 ? 's bold' : 's m2', 'middle');
      if (i < 2) s += g.line(dx[i] + 37, 60, dx[i + 1] - 37, 60, 'a ' + g.flow, 'ar-a');
    }
    s += g.line(dx[2] + 37, 60, dx[2] + 60, 60, 'a ' + g.flow, 'ar-a');

    /* ---- attention for step i (middle) ---- */
    var cyA = 218;
    // thin score lines (drawn first)
    for (j = 0; j < 8; j++) s += g.line(colX[j], barTop, 125, cyA + 15, 'm thin', '');
    // alpha-weighted lines into the sum
    for (j = 0; j < 8; j++) {
      s += '<path d="M' + colX[j] + ' ' + barTop + 'L470 ' + (cyA + 30) + '" class="d-ln a' + (alpha[j] > 0.3 ? ' ' + g.flow : '') + '" style="stroke-width:' + (0.6 + alpha[j] * 6).toFixed(1) + 'px" stroke-opacity="' + (0.35 + alpha[j]).toFixed(2) + '"/>';
    }
    s += g.line(90, 74, 90, cyA - 15, g.flow, 'ar');
    s += g.t(96, 150, 's_{i−1}', 'xs m2', 'start');
    s += g.bt(36, cyA - 15, 190, 30, L.score, '', 's');   // 190 wide: the score formula needs ≈180 px
    s += g.line(226, cyA, 246, cyA, g.flow, 'ar');
    s += g.bt(246, cyA - 17, 150, 34, L.soft, '', 's', 11);
    s += g.line(396, cyA, 436, cyA, g.flow, 'ar');
    s += g.t(416, cyA - 6, 'α_ij', 'xs a', 'middle');
    s += g.circle(470, cyA, 32, 'hl') + g.tl(470, cyA, L.sum, 'xs', 'middle', 11);
    s += g.path('M470 ' + (cyA - 32) + 'L470 100 L210 100 L210 76', 'a ' + g.flow, 'ar-a');
    s += g.t(478, 120, 'c_i', 'xs a', 'start');
    s += g.t(W - 14, 270, L.thin, 'xs m', 'end');
    s += g.t(W - 14, 282, L.thick, 'xs a', 'end');

    /* ---- encoder (bottom) ---- */
    s += g.tl(14, 392, L.hj, 'xs m', 'start', 11);
    s += g.t(14, 430, L.back, 'xs m', 'start');
    s += g.t(14, 454, L.fwd, 'xs m', 'start');
    for (j = 0; j < 8; j++) {
      var x = colX[j];
      // annotation bar (two colours: backward on top, forward below)
      s += '<rect x="' + (x - 8) + '" y="' + barTop + '" width="16" height="11" class="d-fill m2"/>';
      s += '<rect x="' + (x - 8) + '" y="' + (barTop + 11) + '" width="16" height="11" class="d-fill a"/>';
      s += g.line(x, 418, x, barTop + 24, 'm thin', 'ar-m');
      s += g.box(x - 10, 418, 20, 16, '', 3);
      s += g.box(x - 10, 442, 20, 16, 'soft', 3);
      if (j < 7) {
        s += g.line(colX[j + 1] - 12, 426, x + 12, 426, 'm thin ' + g.flow, 'ar-m');
        s += g.line(x + 12, 450, colX[j + 1] - 12, 450, 'a thin ' + g.flow, 'ar-a');
      }
      s += g.line(x, 470, x, 460, 'm thin', 'ar-m');
      s += g.t(x, 482, src[j], j === 6 ? 's bold' : 's', 'middle');
    }
    s += g.t(14, 502, L.enc, 'xs m2', 'start');
    s += g.t(W - 14, 502, L.kn, 'xs m', 'end');

    /* ---- inset: alignment heat-map (top-right) ---- */
    var gx0 = 552, gy0 = 96, cell = 12;   // 12 px pitch so the rotated column labels do not touch
    s += g.t(W - 14, 30, L.insetT, 'xs m', 'end');
    for (i = 0; i < tgt.length; i++) {
      s += g.t(gx0 - 6, gy0 + i * cell + 8, tgt[i], 'xs m2', 'end');
      for (j = 0; j < 8; j++) {
        var v = 0.06, hot = (i < 4 && j === i) || (i === 4 && j === 6) || (i === 5 && j === 5) || (i === 6 && j === 4);
        if (hot) v = 0.92;
        else if (i >= 4 && j >= 4 && j <= 6) v = 0.22;
        else if (j === i + 1 || j === i - 1) v = 0.14;
        s += '<rect x="' + (gx0 + j * cell) + '" y="' + (gy0 + i * cell) + '" width="' + (cell - 1) + '" height="' + (cell - 1) + '" class="d-fill a" fill-opacity="' + v + '"/>';
      }
    }
    for (j = 0; j < 8; j++) s += '<text transform="translate(' + (gx0 + j * cell + 8) + ',' + (gy0 - 5) + ') rotate(-65)" class="d-t xs m2">' + esc(src[j]) + '</text>';
    s += g.t(W - 14, 192, L.insetC[0], 'xs a', 'end');
    s += g.t(W - 14, 203, L.insetC[1], 'xs a', 'end');

    return g.svg(W, H, L.title, g.defs() + s);
  };

  /* ========================================================================
     ARCH-transformer (hero) · 2017 encoder–decoder, GPT-3 decoder-only stack,
     attention zoom-in with causal mask and a per-row softmax heat-map
     ======================================================================== */
  var L_TRF = {
    en: {
      title: 'The Transformer: the 2017 encoder–decoder (6 blocks each of multi-head self-attention, add & layer norm and feed-forward, with cross-attention from encoder to decoder); the decoder-only GPT-3 175B stack (96 layers, 12,288-d, 96 heads × 128-d, 50,257-token vocabulary, 2,048 positions) with its next-token loop; and one attention head zoomed in, with the causal mask and a per-row softmax heat-map over "The cat sat down"',
      pA: 'Original Transformer (2017), encoder–decoder', pB: 'Decoder-only LLM: GPT-3 175B', pC: 'Attention zoom-in (one head)',
      enc: 'Encoder', dec: 'Decoder', n6: '× N = 6', n96: '× 96 layers',
      encItems: [['Source tokens'], ['Input embedding (512-d)'], ['⊕ sinusoidal', 'positional encoding'],
        ['Multi-head', 'self-attention (8 heads)'], ['Add & LayerNorm'], ['Feed-forward', '512→2048→512 (ReLU)'], ['Add & LayerNorm']],
      decItems: [['Target tokens', '(shifted right by one)'], ['Output embedding'], ['⊕ positional encoding'],
        ['Masked multi-head', 'self-attention'], ['Add & LayerNorm'], ['Multi-head cross-attention'], ['Add & LayerNorm'], ['Feed-forward'], ['Add & LayerNorm'],
        ['Linear'], ['Softmax'], ['Output probabilities']],
      gptItems: [['Text'], ['Tokenizer', '(byte-level BPE,', '50,257 tokens)'], ['Token embedding (12,288-d)', '⊕ learned position', 'embedding (2,048 positions)'],
        ['LayerNorm'], ['Masked multi-head', 'self-attention', '(96 heads × 128-d)'], ['⊕ residual'], ['LayerNorm'], ['Feed-forward', '12,288→49,152→12,288 (GELU)'], ['⊕ residual'],
        ['Final LayerNorm'], ['Linear → 50,257 logits'], ['Softmax'], ['Next-token probabilities']],
      kv: 'K, V (all 6 blocks)', loop: 'append chosen token, repeat',
      foot: ['GPT-3 alternates dense and locally banded', 'sparse attention patterns across layers'],
      tokLbl: 'token vectors x₁…xₙ', scores: 'Q·Kᵀ / √d_k', mask: ['causal mask:', 'upper triangle = −∞'],
      soft: ['softmax per row', '(each row sums to 1)'], xv: '× V', out: ['output', 'per token'],
      heads: 'repeat in h heads in parallel → concatenate → W_O'
    },
    uk: {
      title: 'Трансформер: енкодер–декодер 2017 року (по 6 блоків багатоголової самоуваги, додавання з нормалізацією шару та повнозв\'язного блоку, з крос-увагою від енкодера до декодера); стек GPT-3 175B лише з декодера (96 шарів, 12 288 вимірів, 96 голів × 128, словник 50 257 токенів, 2 048 позицій) із циклом наступного токена; і одна голова уваги зблизька з каузальною маскою та softmax по рядках для речення «The cat sat down»',
      pA: 'Оригінальний трансформер (2017), енкодер–декодер', pB: 'LLM лише з декодера: GPT-3 175B', pC: 'Увага зблизька (одна голова)',
      enc: 'Енкодер', dec: 'Декодер', n6: '× N = 6', n96: '× 96 шарів',
      encItems: [['Вхідні токени'], ['Вхідний ембедінг (512-d)'], ['⊕ синусоїдне', 'кодування позиції'],
        ['Багатоголова', 'самоувага (8 голів)'], ['Додавання й LayerNorm'], ['Повнозв\'язний блок', '512→2048→512 (ReLU)'], ['Додавання й LayerNorm']],
      decItems: [['Цільові токени', '(зсунуті на один вправо)'], ['Вихідний ембедінг'], ['⊕ кодування позиції'],
        ['Маскована багатоголова', 'самоувага'], ['Додавання й LayerNorm'], ['Багатоголова крос-увага'], ['Додавання й LayerNorm'], ['Повнозв\'язний блок'], ['Додавання й LayerNorm'],
        ['Лінійний шар'], ['Softmax'], ['Ймовірності виходу']],
      gptItems: [['Текст'], ['Токенізатор', '(байтовий BPE,', '50 257 токенів)'], ['Ембедінг токена (12 288-d)', '⊕ навчений ембедінг', 'позиції (2 048 позицій)'],
        ['LayerNorm'], ['Маскована багатоголова', 'самоувага', '(96 голів × 128-d)'], ['⊕ залишковий зв\'язок'], ['LayerNorm'], ['Повнозв\'язний блок', '12 288→49 152→12 288 (GELU)'], ['⊕ залишковий зв\'язок'],
        ['Фінальний LayerNorm'], ['Лінійний → 50 257 логітів'], ['Softmax'], ['Ймовірності', 'наступного токена']],
      kv: 'K, V (усі 6 блоків)', loop: 'додати обраний токен, повторити',
      foot: ['GPT-3 чергує щільні та локально смугасті', 'розріджені патерни уваги між шарами'],
      tokLbl: 'вектори токенів x₁…xₙ', scores: 'Q·Kᵀ / √d_k', mask: ['каузальна маска:', 'верхній трикутник = −∞'],
      soft: ['softmax по рядках', '(сума рядка = 1)'], xv: '× V', out: ['вихід', 'на токен'],
      heads: 'повторити в h головах паралельно → з\'єднати → W_O'
    }
  };

  D['ARCH-transformer'] = function (ctx) {
    var L = pick(L_TRF, ctx && ctx.lang), g = G('ARCH-transformer'), s = '';
    var W = 720, H = 712, i, j;
    var BASE = 470, GAP = 9, BW = 184, COLW = 206;

    /* stack(x0, items, kinds, blockRange, blockLabel) → draws bottom-to-top; returns item boxes */
    function stack(x0, items, kinds, blk, blkLabel) {
      var out = '', boxes = [], y = BASE, bx = x0 + 10, k;
      for (i = 0; i < items.length; i++) {
        var lines = items[i], h = 18 + 10 * (lines.length - 1);
        if (blk && i === blk[0]) y -= 6;                    // block bottom padding
        boxes.push({ y: y - h, h: h, cy: y - h / 2, top: y - h, bottom: y, cx: x0 + 10 + BW / 2, right: bx + BW });
        y -= h;
        if (blk && i === blk[1]) y -= 18;                   // block top padding + label
        y -= GAP;
      }
      var top = y + GAP;
      // block background
      if (blk) {
        var b0 = boxes[blk[0]], b1 = boxes[blk[1]];
        out += g.box(x0 + 4, b1.top - 18, COLW - 8, b0.bottom + 6 - (b1.top - 18), 'soft', 8);
        out += g.t(x0 + 12, b1.top - 6, blkLabel, 'xs a', 'start');
      }
      // arrows between items (bottom → top)
      for (i = 0; i < boxes.length - 1; i++) out += g.line(boxes[i].cx, boxes[i].top - 1, boxes[i].cx, boxes[i + 1].bottom + 1, g.flow + ' slow', 'ar');
      // residual arrows: for each kind 'add', wrap from below the previous item into this item's right edge
      for (i = 1; i < boxes.length; i++) if (kinds[i] === 'add') {
        var S = boxes[i - 1], A = boxes[i], xr = bx + BW + 8, sy = S.bottom + 5;
        out += g.path('M' + S.cx + ' ' + sy + 'L' + (xr - 6) + ' ' + sy + 'Q' + xr + ' ' + sy + ' ' + xr + ' ' + (sy - 6) + 'L' + xr + ' ' + (A.cy + 6) + 'Q' + xr + ' ' + A.cy + ' ' + (xr - 6) + ' ' + A.cy + 'L' + (A.right + 1) + ' ' + A.cy, 'a thin', 'ar-a');
        out += g.dot(S.cx, sy, 2.2, 'a');
      }
      // boxes
      for (i = 0; i < boxes.length; i++) {
        k = kinds[i];
        out += g.bt(bx, boxes[i].y, BW, boxes[i].h, items[i], k === 'sub' ? 'hl' : (k === 'out' ? 'hl' : (k === 'add' ? '' : '')), 'xs', 10);
      }
      return { svg: out, boxes: boxes, top: top };
    }

    /* ---- Panel A: encoder + decoder ---- */
    s += g.title(14, 22, L.pA);
    var encK = ['in', 'in', 'in', 'sub', 'add', 'sub', 'add'];
    var decK = ['in', 'in', 'in', 'sub', 'add', 'sub', 'add', 'sub', 'add', 'in', 'in', 'out'];
    var gptK = ['in', 'in', 'in', 'in', 'sub', 'add', 'in', 'sub', 'add', 'in', 'in', 'in', 'out'];
    var xe = 14, xd = 250, xg = 486;
    var E = stack(xe, L.encItems, encK, [3, 6], L.n6);
    var Dd = stack(xd, L.decItems, decK, [3, 8], L.n6);
    var Gp = stack(xg, L.gptItems, gptK, [3, 8], L.n96);
    s += E.svg + Dd.svg + Gp.svg;
    s += g.t(xe + 10 + BW / 2, E.top - 8, L.enc, 's bold', 'middle');
    s += g.t(xd + 10 + BW / 2, Dd.top - 8, L.dec, 's bold', 'middle');
    s += g.t(xg + 10 + BW / 2, Gp.top - 8, L.pB, 's bold', 'middle');
    // encoder output → K, V of the decoder's cross-attention (3rd item of the block = index 5)
    // leaves the encoder's top box near its right edge and runs high (yh), so the rotated K,V label fits on the vertical leg
    var cross = Dd.boxes[5], ecx = E.boxes[6].right - 20, ety = E.boxes[6].top, yh = ety - 70;
    s += g.path('M' + ecx + ' ' + (ety - 1) + 'L' + ecx + ' ' + yh + 'L' + (xd - 6) + ' ' + yh + 'L' + (xd - 6) + ' ' + cross.cy + 'L' + (xd + 9) + ' ' + cross.cy, 'a ' + g.flow, 'ar-a');
    s += '<text transform="translate(' + (xd - 10) + ',' + (cross.cy - 4) + ') rotate(-90)" class="d-t xs a" text-anchor="start">' + esc(L.kv) + '</text>';
    // GPT-3 next-token loop (left side)
    var gOut = Gp.boxes[Gp.boxes.length - 1], gIn = Gp.boxes[0];
    s += g.path('M' + (xg + 9) + ' ' + gOut.cy + 'L' + (xg + 2) + ' ' + gOut.cy + 'L' + (xg + 2) + ' ' + gIn.cy + 'L' + (xg + 9) + ' ' + gIn.cy, 'a ' + g.flow, 'ar-a');
    s += g.t(xg + 10, BASE + 14, L.loop, 'xs a', 'start');
    s += g.t(W - 14, BASE + 30, L.foot[0], 'xs m', 'end');
    s += g.t(W - 14, BASE + 41, L.foot[1], 'xs m', 'end');

    /* ---- Panel C: attention zoom-in ---- */
    var y0 = 540;   // divider at y0 − 24 = 516 sits below the GPT-3 footnote (BASE + 41 = 511)
    s += g.line(14, y0 - 24, W - 14, y0 - 24, 'm thin');
    s += g.title(14, y0 - 4, L.pC);
    var toks = ['The', 'cat', 'sat', 'down'], C = 14;
    var sm = [[1, 0, 0, 0], [0.3, 0.7, 0, 0], [0.1, 0.6, 0.3, 0], [0.05, 0.25, 0.5, 0.2]];
    for (i = 0; i < 4; i++) {
      s += g.t(14, y0 + 36 + i * 16, toks[i], 'xs', 'start');
      s += '<rect x="46" y="' + (y0 + 28 + i * 16) + '" width="26" height="9" rx="2" class="d-fill m2"/>';
    }
    s += g.t(14, y0 + 104, L.tokLbl, 'xs m', 'start');
    var qkv = ['Q', 'K', 'V'], wl = ['W_Q', 'W_K', 'W_V'];
    for (i = 0; i < 3; i++) {
      // three near-parallel projections out of the token block (not a fan from one point), each W label above its own arrow
      var qy = y0 + 32 + i * 24;
      s += g.line(74, qy + (1 - i) * 4, 104, qy, g.flow + ' slow', 'ar');
      s += g.bt(106, qy - 9, 34, 18, qkv[i], i === 2 ? 'soft' : 'hl', 'xs bold');
      s += g.t(89, qy - 4, wl[i], 'xs m2', 'middle');
    }
    // scores grid Q·Kᵀ/√d_k
    var gx1 = 190;
    s += g.line(140, y0 + 32, gx1 - 4, y0 + 50, g.flow + ' slow', 'ar');
    s += g.line(140, y0 + 56, gx1 - 4, y0 + 62, g.flow + ' slow', 'ar');
    s += g.t(gx1 + 28, y0 + 20, L.scores, 'xs', 'middle');
    for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) s += g.box(gx1 + j * C, y0 + 28 + i * C, C - 1, C - 1, '', 1);
    // causal mask
    var gx2 = 294;
    s += g.line(gx1 + 58, y0 + 56, gx2 - 4, y0 + 56, g.flow + ' slow', 'ar');
    s += g.tl(gx2 + 28, y0 + 14, L.mask, 'xs', 'middle', 11);
    for (i = 0; i < 4; i++) for (j = 0; j < 4; j++) {
      s += g.box(gx2 + j * C, y0 + 28 + i * C, C - 1, C - 1, '', 1);
      if (j > i) s += '<rect x="' + (gx2 + j * C) + '" y="' + (y0 + 28 + i * C) + '" width="' + (C - 1) + '" height="' + (C - 1) + '" rx="1" class="d-fill m" fill-opacity="0.45"/>';
    }
    s += g.t(gx2 + 3.5 * C, y0 + 28 + 0.5 * C + 3, '−∞', 'xs', 'middle');
    // softmax heat-map over the sentence
    var gx3 = 398;
    s += g.line(gx2 + 58, y0 + 56, gx3 - 4, y0 + 56, g.flow + ' slow', 'ar');
    s += g.tl(gx3 + 28, y0 + 104, L.soft, 'xs', 'middle', 11);
    for (i = 0; i < 4; i++) {
      s += g.t(gx3 - 5, y0 + 28 + i * C + 10, toks[i], 'xs m2', 'end');
      for (j = 0; j < 4; j++) {
        s += g.box(gx3 + j * C, y0 + 28 + i * C, C - 1, C - 1, '', 1);
        if (j <= i) s += '<rect x="' + (gx3 + j * C) + '" y="' + (y0 + 28 + i * C) + '" width="' + (C - 1) + '" height="' + (C - 1) + '" rx="1" class="d-fill a" fill-opacity="' + (0.12 + sm[i][j] * 0.85).toFixed(2) + '"/>';
      }
    }
    for (j = 0; j < 4; j++) s += '<text transform="translate(' + (gx3 + j * C + 9) + ',' + (y0 + 24) + ') rotate(-62)" class="d-t xs m2">' + esc(toks[j]) + '</text>';
    // × V node, then output vectors
    var nx = 490, ny = y0 + 56;
    s += g.line(gx3 + 58, ny, nx - 12, ny, g.flow + ' slow', 'ar');
    s += g.path('M140 ' + (y0 + 80) + 'L160 ' + (y0 + 80) + 'L160 ' + (y0 + 128) + 'L' + nx + ' ' + (y0 + 128) + 'L' + nx + ' ' + (ny + 12), 'm ' + g.flow + ' slow', 'ar-m');
    s += g.circle(nx, ny, 10, '') + g.t(nx, ny + 4, '×', 'bold', 'middle');
    s += g.t(nx + 14, ny - 10, L.xv, 'xs', 'start');
    s += g.line(nx + 10, ny, 528, ny, 'a ' + g.flow, 'ar-a');
    for (i = 0; i < 4; i++) s += '<rect x="532" y="' + (y0 + 28 + i * 16) + '" width="26" height="9" rx="2" class="d-fill a"/>';
    s += g.tl(545, y0 + 110, L.out, 'xs m', 'middle', 11);
    s += g.t(W - 14, y0 + 152, L.heads, 'xs m2', 'end');

    return g.svg(W, H, L.title, g.defs() + s);
  };

})(window.AIH_DIAGRAMS);
