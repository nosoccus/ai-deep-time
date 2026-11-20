/* diagrams-b.js — renderers for: ARCH-pretrain-finetune, ARCH-diffusion, ARCH-rlhf, ARCH-moe, ARCH-multimodal, ARCH-reasoning, ARCH-agents
   Contract: window.AIH_DIAGRAMS[archId] = function (ctx) -> SVG string; ctx = { lang: 'en'|'uk', arch, accent }.
   Colour only through the .d-* classes and the root tokens of index.html (no literal colours). Marker ids are prefixed per diagram. ES5.
   Signal-flow animation: the .flow / .d-pulse classes are omitted when prefers-reduced-motion is set at render time. */
window.AIH_DIAGRAMS = window.AIH_DIAGRAMS || {};
(function () {
  'use strict';
  var D = window.AIH_DIAGRAMS;

  /* ---------- helpers ---------- */
  function reduced() {
    try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
  }
  function anim() {
    var r = reduced();
    return { flow: r ? '' : ' flow', slow: r ? '' : ' flow slow', rev: r ? '' : ' flow rev', pulse: r ? '' : ' d-pulse' };
  }
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function fs(cls) { cls = cls || ''; return /\bxs\b/.test(cls) ? 9.5 : /\bs\b/.test(cls) ? 10.5 : /\bh\b/.test(cls) ? 13 : 12; }
  function txt(x, y, s, cls, anchor, style) {
    return '<text x="' + x + '" y="' + y + '" class="d-t' + (cls ? ' ' + cls : '') + '"' +
      (anchor ? ' text-anchor="' + anchor + '"' : '') + (style ? ' style="' + style + '"' : '') + '>' + esc(s) + '</text>';
  }
  /* lines: y is the baseline of the first line; each item is a string or [string, cls] */
  function lines(x, y, arr, cls, anchor, lh) {
    if (!arr) return '';
    if (typeof arr === 'string') arr = [arr];
    lh = lh || fs(cls) * 1.3;
    var out = '';
    for (var i = 0; i < arr.length; i++) {
      var it = arr[i], s = it, c = cls;
      if (it && typeof it === 'object') { s = it[0]; c = it[1]; }
      out += txt(x, y + i * lh, s, c, anchor);
    }
    return out;
  }
  /* clines: block of lines vertically centred on cy */
  function clines(x, cy, arr, cls, anchor) {
    if (!arr) return '';
    if (typeof arr === 'string') arr = [arr];
    var size = fs(cls), lh = size * 1.3;
    return lines(x, cy - (arr.length - 1) * lh / 2 + size * 0.36, arr, cls, anchor || 'middle', lh);
  }
  function rect(x, y, w, h, cls, r, style) {
    return '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="' + (r == null ? 6 : r) +
      '" class="d-box' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '/>';
  }
  function box(x, y, w, h, label, cls, tcls, r) { return rect(x, y, w, h, cls, r) + clines(x + w / 2, y + h / 2, label, tcls); }
  function path(d, cls, mk, style) {
    return '<path d="' + d + '" class="d-ln' + (cls ? ' ' + cls : '') + '"' + (mk ? ' marker-end="url(#' + mk + ')"' : '') +
      (style ? ' style="' + style + '"' : '') + '/>';
  }
  function line(x1, y1, x2, y2, cls, mk, style) { return path('M' + x1 + ',' + y1 + ' L' + x2 + ',' + y2, cls, mk, style); }
  function circle(cx, cy, r, cls, style) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="d-box' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '/>';
  }
  function dot(cx, cy, r, cls, style) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" class="d-fill' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '/>';
  }
  function cyl(x, y, w, h, label, cls, tcls) {
    var ry = 9, rx = w / 2;
    return '<path d="M' + x + ',' + (y + ry) + ' a' + rx + ',' + ry + ' 0 0 1 ' + w + ',0 v' + (h - 2 * ry) + ' a' + rx + ',' + ry + ' 0 0 1 ' + (-w) + ',0 z" class="d-box' + (cls ? ' ' + cls : '') + '"/>' +
      '<path d="M' + x + ',' + (y + ry) + ' a' + rx + ',' + ry + ' 0 0 0 ' + w + ',0" class="d-ln thin m"/>' +
      clines(x + w / 2, y + h / 2 + ry / 2, label, tcls);
  }
  /* landscape glyph (sun + hills) inside an s×s square, at opacity op */
  function pic(x, y, s, op) {
    return '<g opacity="' + op + '">' + dot(x + s * 0.72, y + s * 0.3, s * 0.11, 'a') +
      '<path d="M' + (x + 3) + ',' + (y + s - 3) + ' L' + (x + s * 0.4) + ',' + (y + s * 0.42) + ' L' + (x + s * 0.6) + ',' + (y + s * 0.7) +
      ' L' + (x + s * 0.76) + ',' + (y + s * 0.56) + ' L' + (x + s - 3) + ',' + (y + s - 3) + ' Z" class="d-fill m2"/></g>';
  }
  function lock(cx, cy) {
    return '<path d="M' + (cx - 4) + ',' + (cy - 1) + ' v-3 a4,4 0 0 1 8,0 v3" class="d-ln thin m"/>' +
      '<rect x="' + (cx - 6) + '" y="' + (cy - 1) + '" width="12" height="9" rx="1.5" class="d-fill m"/>';
  }
  function marker(id, cls, style) {
    return '<marker id="' + id + '" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" markerUnits="userSpaceOnUse" orient="auto-start-reverse">' +
      '<path d="M0,0 L10,5 L0,10 Z" class="d-fill' + (cls ? ' ' + cls : '') + '"' + (style ? ' style="' + style + '"' : '') + '/></marker>';
  }
  function defs(p, extra) {
    return '<defs>' + marker(p + '-ar') + marker(p + '-ara', 'a') + marker(p + '-arm', 'm') + marker(p + '-arb', 'b') +
      marker(p + '-arok', 'ok') + marker(p + '-arw', '', 'fill:var(--c-warn)') + (extra || '') + '</defs>';
  }
  function svg(p, w, h, title, body, extraDefs) {
    /* --dmin = viewBox width; index.html applies it as min-width only at phone width (≤ 720 px) */
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + w + ' ' + h + '" width="' + w + '" height="' + h +
      '" role="img" aria-label="' + esc(title) + '" style="--dmin:' + w + 'px"><title>' + esc(title) + '</title>' + defs(p, extraDefs) + body + '</svg>';
  }
  function pickLang(ctx) { return ctx && ctx.lang === 'uk' ? 'uk' : 'en'; }

  /* ---------- ARCH-pretrain-finetune ---------- */
  D['ARCH-pretrain-finetune'] = function (ctx) {
    var L = {
      en: {
        title: 'Pre-training on unlabeled text, then three routes: fine-tuning, prompting or RLHF',
        gptT: 'GPT objective · next token, left context only',
        gptTok: ['The', 'cat', 'sat', 'on', 'the', '___'], gptPred: 'mat', gptCap: 'predicts the next token from the left only',
        bertT: 'BERT objective · masked token, both sides',
        bertTok: ['The', 'cat', '[MASK]', 'on', 'the', 'mat'], bertPred: 'sat', bertCap: '15 % of tokens masked · context from both sides',
        corpus: [['Unlabeled text', 's bold'], ['books · web · Wikipedia', 's'], ['up to 300B tokens (GPT-3)', 's m']],
        preA: ['pre-training'], preB: ['weeks on 1000s', 'of accelerators'],
        model: ['Pre-trained', 'model'],
        nums: ['GPT-1 (2018): 117M params', 'BERT-Large: 340M · GLUE 80.5', 'GPT-3 (2020): 175B · 300B tokens', 'GPT-3 pre-training: 3,640 PF-days', 'self-supervised: no labels needed'],
        hA: 'A · 2018–19 · fine-tune', hB: 'B · 2020 · prompt (in-context)', hC: 'C · 2022 · RLHF (InstructGPT)',
        a1: '+ small task head',
        a2: [['Fine-tune all weights on', 's'], ['a few thousand labels', 's'], ['minutes–hours (BERT: ≤1 h, 1 TPU)', 'xs m2']],
        a3: 'Sentiment · QA · entailment', aN: ['cost: hours vs weeks of pre-training', 'one model per task'],
        b1: 'weights frozen', b2h: 'prompt · K = 2 examples',
        b2: ['Translate English to French:', 'sea otter => loutre de mer', 'peppermint => menthe poivrée', 'cheese =>'],
        b3: 'fromage', bN: ['no weights change', 'the examples steer one reply only', 'TriviaQA 64.3 → 68.0 → 71.2 %', 'zero → one → few-shot'],
        c1: [['① Demonstrations → SFT', 's'], ['~13k prompts, written by people', 'xs m2']],
        c2: [['② Rankings → reward model', 's'], ['~33k prompts, A-vs-B preferences', 'xs m2']],
        c3: [['③ PPO reinforcement learning', 's'], ['~31k prompts · KL leash to SFT', 'xs m2']],
        c4: ['Instruction-following', 'assistant'], cN: ['RLHF ≈ 60 PF-days vs 3,640 PF-days', 'for GPT-3 pre-training (≈1.6 %)']
      },
      uk: {
        title: 'Попереднє навчання на нерозміченому тексті, далі три шляхи: донавчання, промпт або RLHF',
        gptT: 'Ціль GPT · наступний токен, лише лівий контекст',
        gptTok: ['The', 'cat', 'sat', 'on', 'the', '___'], gptPred: 'mat', gptCap: 'передбачає наступний токен лише зліва',
        bertT: 'Ціль BERT · замаскований токен, з обох боків',
        bertTok: ['The', 'cat', '[MASK]', 'on', 'the', 'mat'], bertPred: 'sat', bertCap: '15 % токенів замасковано · контекст з обох боків',
        corpus: [['Нерозмічений текст', 's bold'], ['книги · веб · Вікіпедія', 's'], ['до 300 млрд токенів (GPT-3)', 's m']],
        preA: ['попереднє', 'навчання'], preB: ['тижні на тисячах', 'прискорювачів'],
        model: ['Попередньо', 'навчена модель'],
        nums: ['GPT-1 (2018): 117 млн параметрів', 'BERT-Large: 340 млн · GLUE 80,5', 'GPT-3 (2020): 175 млрд · 300 млрд токенів', 'попереднє навчання GPT-3: 3 640 PF-днів', 'самонавчання: розмітка не потрібна'],
        hA: 'A · 2018–19 · донавчання', hB: 'B · 2020 · промпт (у контексті)', hC: 'C · 2022 · RLHF (InstructGPT)',
        a1: '+ невелика задачна «голова»',
        a2: [['Донавчити всі ваги на', 's'], ['кількох тисячах прикладів', 's'], ['хвилини–години (BERT: ≤1 год, 1 TPU)', 'xs m2']],
        a3: 'Тональність · QA · entailment', aN: ['вартість: години проти тижнів', 'окрема модель на кожну задачу'],
        b1: 'ваги заморожені', b2h: 'промпт · K = 2 приклади',
        b2: ['Translate English to French:', 'sea otter => loutre de mer', 'peppermint => menthe poivrée', 'cheese =>'],
        b3: 'fromage', bN: ['ваги не змінюються', 'приклади скеровують лише одну відповідь', 'TriviaQA 64,3 → 68,0 → 71,2 %', 'zero → one → few-shot'],
        c1: [['① Демонстрації → SFT', 's'], ['~13 тис. промптів від людей', 'xs m2']],
        c2: [['② Ранжування → модель винагороди', 's'], ['~33 тис. промптів, вибір A чи B', 'xs m2']],
        c3: [['③ Навчання з підкріпленням (PPO)', 's'], ['~31 тис. · KL-прив’язка до SFT', 'xs m2']],
        c4: ['Асистент, що виконує', 'інструкції'], cN: ['RLHF ≈ 60 PF-днів проти 3 640', 'на попереднє навчання GPT-3 (≈1,6 %)']
      }
    };
    var t = L[pickLang(ctx)], A = anim(), P = 'pf', o = '', i;

    function inset(x, tok, mask, title, pred, cap, leftOnly) {
      var w = 368, y = 14, h = 118, tw = leftOnly ? 42 : 46, gap = 8;
      var total = tok.length * tw + (tok.length - 1) * gap, sx = x + (w - total) / 2, ty = 62, th = 22, s = '';
      s += rect(x, y, w, h, 'inv', 10) + txt(x + 10, y + 16, title, 'xs m');
      var bx = sx + mask * (tw + gap) + tw / 2;
      for (var k = 0; k < tok.length; k++) {
        var cx = sx + k * (tw + gap) + tw / 2;
        s += box(sx + k * (tw + gap), ty, tw, th, tok[k], k === mask ? 'hl' : '', 's', 4);
        if (k === mask || (leftOnly && k > mask)) continue;
        var ex = bx + (k - mask) * 4;
        s += path('M' + cx + ',' + ty + ' C' + cx + ',' + (ty - 24) + ' ' + ex + ',' + (ty - 24) + ' ' + ex + ',' + ty, 'thin m' + A.slow, P + '-arm');
      }
      s += line(bx, ty + th, bx, ty + th + 12, 'a' + A.flow, P + '-ara');
      s += txt(bx, ty + th + 26, pred, 's bold a', 'middle');
      s += txt(x + 10, y + h - 8, cap, 'xs m2');
      return s;
    }
    o += inset(16, t.gptTok, 5, t.gptT, t.gptPred, t.gptCap, true);
    o += inset(396, t.bertTok, 2, t.bertT, t.bertPred, t.bertCap, false);

    /* stage 1: corpus -> pre-training -> model */
    o += cyl(60, 150, 190, 100, t.corpus, '', 's');
    o += line(250, 200, 350, 200, '' + A.flow, P + '-ar');
    o += lines(300, 190 - (t.preA.length - 1) * 13, t.preA, 's', 'middle', 13);
    o += lines(300, 216, t.preB, 'xs m2', 'middle', 12);
    o += box(350, 150, 170, 100, t.model, 'hl d-glow', 'bold');
    o += lines(532, 170, t.nums, 'xs m2', null, 16);

    /* bus to the three branches */
    o += path('M435,250 V272', '' + A.flow);
    o += path('M136,272 H644', 'm');
    var cols = [16, 270, 524], heads = [t.hA, t.hB, t.hC];
    for (i = 0; i < 3; i++) {
      o += line(cols[i] + 120, 272, cols[i] + 120, 300, '' + A.flow, P + '-ar');
      o += txt(cols[i] + 120, 318, heads[i], 's bold', 'middle');
    }
    /* A: fine-tuning */
    o += box(24, 330, 224, 34, t.a1, '', 's');
    o += line(136, 364, 136, 384, '' + A.flow, P + '-ar');
    o += box(24, 384, 224, 58, t.a2, '', 's');
    o += line(136, 442, 136, 462, '' + A.flow, P + '-ar');
    o += box(24, 462, 224, 34, t.a3, 'ok', 's');
    o += lines(136, 518, t.aN, 'xs m2', 'middle', 13);
    /* B: prompting */
    o += box(278, 330, 224, 34, t.b1, 'frozen', 's') + lock(300, 343);
    o += line(390, 364, 390, 384, '' + A.flow, P + '-ar');
    o += rect(278, 384, 224, 82, 'soft', 6);
    o += txt(290, 400, t.b2h, 'xs m');
    o += lines(290, 416, t.b2, 'xs', null, 13);
    o += line(390, 466, 390, 486, '' + A.flow, P + '-ar');
    o += box(278, 486, 224, 34, t.b3, 'hl', 's bold a');
    o += lines(390, 540, t.bN, 'xs m2', 'middle', 13);
    /* C: RLHF */
    o += box(532, 330, 224, 44, t.c1, '', 's');
    o += line(644, 374, 644, 392, '' + A.flow, P + '-ar');
    o += box(532, 392, 224, 44, t.c2, '', 's');
    o += line(644, 436, 644, 454, '' + A.flow, P + '-ar');
    o += box(532, 454, 224, 44, t.c3, '', 's');
    o += line(644, 498, 644, 516, '' + A.flow, P + '-ar');
    o += box(532, 516, 224, 44, t.c4, 'ok', 's');
    o += lines(644, 578, t.cN, 'xs m2', 'middle', 13);

    return svg(P, 780, 600, t.title, o);
  };

  /* ---------- ARCH-diffusion ---------- */
  D['ARCH-diffusion'] = function (ctx) {
    var L = {
      en: {
        title: 'Diffusion: learn to remove noise from latents, then generate from pure noise, steered by the text prompt',
        trainT: 'Training', genT: 'Generation',
        photoU: '512×512×3', enc: 'Encoder E', encU: '8× smaller', z0U: '64×64×4',
        noiseAbove: '+ noise ε at random step t', ztU: 'noisy',
        unet: ['U-Net', 'step t + text'], unetU: '860M params',
        ehatU: 'predicted noise', loss: 'loss = |ε − ε̂|²',
        clipTop: 'caption → CLIP text encoder', dim: '77×768', trueEps: 'true ε',
        trainNums: 'Stable Diffusion v1: 860M U-Net + 123M text encoder · 150,000 A100 GPU-hours · LAION-2B (en) subsets',
        promptL: 'prompt', prompt: ['an astronaut riding a horse,', 'oil painting'],
        clipBox: ['CLIP text encoder', 'frozen · 123M'], xattn: 'cross-attention into every U-Net level',
        noiseBox: ['Random noise z_T', '64×64×4 latent'], unet2: ['U-Net', 'denoise ×50'],
        steps: 'step 50 → 40 → 25 → 10 → 0', dec: ['Decoder', 'D'], out: '512×512',
        loop: 'repeat: each step removes part of the predicted noise',
        guide1: 'guidance: ε̂ = ε̂_uncond + s·(ε̂_text − ε̂_uncond)',
        guide2: 'caption dropped 10 % of the time in training; s > 1 pulls the result toward the prompt',
        nums1: '8× autoencoder: 512×512×3 = 786,432 numbers → 64×64×4 = 16,384 (≈48× fewer) · fits in <10 GB of GPU memory',
        nums2: 'DDPM (2020): CIFAR-10 FID 3.17 · DALL·E 2 (Apr 2022): ~3.5B params, caption → CLIP image embedding → diffusion decoder'
      },
      uk: {
        title: 'Дифузія: навчитися прибирати шум із латентів, а тоді генерувати з чистого шуму за текстовим промптом',
        trainT: 'Навчання', genT: 'Генерація',
        photoU: '512×512×3', enc: 'Енкодер E', encU: 'у 8× менше', z0U: '64×64×4',
        noiseAbove: '+ шум ε на випадковому кроці t', ztU: 'зашумлений',
        unet: ['U-Net', 'крок t + текст'], unetU: '860 млн параметрів',
        ehatU: 'передбачений шум', loss: 'втрата = |ε − ε̂|²',
        clipTop: 'підпис → текстовий енкодер CLIP', dim: '77×768', trueEps: 'справжній ε',
        trainNums: 'Stable Diffusion v1: U-Net 860 млн + текстовий енкодер 123 млн · 150 000 GPU-годин A100 · підмножини LAION-2B (англ.)',
        promptL: 'промпт', prompt: ['an astronaut riding a horse,', 'oil painting'],
        clipBox: ['текстовий енкодер', 'CLIP · заморожений'], xattn: 'крос-увага на кожному рівні U-Net',
        noiseBox: ['Випадковий шум z_T', 'латент 64×64×4'], unet2: ['U-Net', 'знешумлення ×50'],
        steps: 'крок 50 → 40 → 25 → 10 → 0', dec: ['Декодер', 'D'], out: '512×512',
        loop: 'повтор: кожен крок прибирає частину передбаченого шуму',
        guide1: 'керування: ε̂ = ε̂_uncond + s·(ε̂_text − ε̂_uncond)',
        guide2: 'у навчанні підпис прибирають у 10 % випадків; s > 1 тягне результат до промпту',
        nums1: 'автоенкодер 8×: 512×512×3 = 786 432 числа → 64×64×4 = 16 384 (≈48× менше) · вміщується в <10 ГБ пам’яті GPU',
        nums2: 'DDPM (2020): CIFAR-10 FID 3,17 · DALL·E 2 (2022): ~3,5 млрд параметрів, підпис → CLIP-ембедінг зображення → дифузійний декодер'
      }
    };
    var t = L[pickLang(ctx)], A = anim(), P = 'df', o = '', k;
    function thumb(x, y, s, clarity) {
      var r = rect(x, y, s, s, '', 4) + pic(x, y, s, clarity.toFixed(2));
      if (clarity < 1) r += '<rect x="' + x + '" y="' + y + '" width="' + s + '" height="' + s + '" rx="4" class="d-fill bg3" filter="url(#' + P + '-noise)" opacity="' + (1 - clarity).toFixed(2) + '"/>';
      return r;
    }
    var noise = '<filter id="' + P + '-noise" x="0" y="0" width="1" height="1"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" stitchTiles="stitch"/>' +
      '<feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope="1.8"/></feComponentTransfer></filter>';

    /* top row: training */
    o += txt(16, 32, t.trainT, 's bold');
    o += rect(16, 80, 40, 40, '', 4) + pic(16, 80, 40, 1) + txt(36, 146, t.photoU, 'xs m2', 'middle');
    o += line(56, 100, 76, 100, '' + A.flow, P + '-ar');
    o += box(76, 80, 70, 40, t.enc, '', 's') + txt(111, 146, t.encU, 'xs m2', 'middle');
    o += line(146, 100, 166, 100, '' + A.flow, P + '-ar');
    o += box(166, 83, 34, 34, 'z₀', '', 's bold', 4) + txt(183, 146, t.z0U, 'xs m2', 'middle');
    o += line(200, 100, 228, 100, '' + A.flow, P + '-ar');
    o += circle(246, 100, 18, 'soft') + txt(246, 104, '+ε', 's bold a', 'middle') + txt(246, 66, t.noiseAbove, 'xs m2', 'middle');
    o += line(264, 100, 286, 100, '' + A.flow, P + '-ar');
    o += box(286, 83, 34, 34, 'z_t', '', 's bold', 4) + txt(303, 146, t.ztU, 'xs m2', 'middle');
    o += line(320, 100, 350, 100, '' + A.flow, P + '-ar');
    o += box(350, 70, 120, 60, t.unet, 'hl', 's') + txt(410, 146, t.unetU, 'xs m2', 'middle');
    o += line(470, 100, 500, 100, '' + A.flow, P + '-ar');
    o += box(500, 83, 34, 34, 'ε̂', '', 's bold', 4) + txt(517, 146, t.ehatU, 'xs m2', 'middle');
    o += line(534, 100, 564, 100, '' + A.flow, P + '-ar');
    o += box(564, 80, 200, 40, t.loss, 'ok', 's');
    o += box(300, 20, 220, 28, t.clipTop, 'frozen', 's', 5);
    o += line(410, 48, 410, 70, 'a' + A.slow, P + '-ara') + txt(418, 63, t.dim, 'xs m2');
    o += path('M246,118 V160 H664 V120', 'm dash', P + '-arm') + txt(254, 173, t.trueEps, 'xs m2');
    o += txt(16, 190, t.trainNums, 'xs m2');
    o += line(16, 206, 764, 206, 'thin m dash');

    /* bottom row: generation */
    o += txt(16, 232, t.genT, 's bold');
    o += rect(16, 246, 200, 50, 'soft') + txt(26, 260, t.promptL, 'xs m') + lines(26, 274, t.prompt, 'xs', null, 13);
    o += line(216, 271, 236, 271, '' + A.flow, P + '-ar');
    o += box(236, 248, 130, 46, t.clipBox, 'frozen', 's');
    for (k = 0; k < 3; k++) o += line(266 + k * 35, 294, 266 + k * 35, 350, 'a' + A.slow, P + '-ara');
    o += txt(376, 324, t.xattn, 'xs m2');
    o += box(16, 360, 200, 50, t.noiseBox, '', 's');
    o += line(216, 385, 236, 385, '' + A.flow, P + '-ar');
    o += box(236, 350, 130, 70, t.unet2, 'hl', 's');
    o += line(366, 385, 386, 385, '' + A.flow, P + '-ar');
    var cl = [0, 0.25, 0.5, 0.78, 1];
    for (k = 0; k < 5; k++) o += thumb(386 + k * 48, 365, 40, cl[k]);
    o += txt(502, 422, t.steps, 'xs m2', 'middle');
    o += line(618, 385, 640, 385, '' + A.flow, P + '-ar');
    o += box(640, 360, 64, 50, t.dec, '', 's');
    o += line(704, 385, 724, 385, '' + A.flow, P + '-ar');
    o += rect(724, 365, 40, 40, '', 4) + pic(724, 365, 40, 1) + txt(744, 422, t.out, 'xs m2', 'middle');
    o += path('M598,405 V444 H301 V420', 'm' + A.slow, P + '-arm') + txt(310, 458, t.loop, 'xs m2');
    o += rect(16, 476, 524, 40, 'inv', 8) + txt(26, 492, t.guide1, 's') + txt(26, 508, t.guide2, 'xs m2');
    o += txt(16, 538, t.nums1, 'xs m2') + txt(16, 552, t.nums2, 'xs m2');
    return svg(P, 780, 564, t.title, o, noise);
  };

  /* ---------- ARCH-rlhf ---------- */
  D['ARCH-rlhf'] = function (ctx) {
    var L = {
      en: {
        title: 'RLHF: supervised fine-tuning, a reward model from human A-vs-B rankings, PPO with a KL leash; then Constitutional AI and DPO',
        lgHuman: 'human input', lgAI: 'AI-generated data', lgFrozen: 'frozen model', lgTrain: 'model being trained',
        l1: 'Classic RLHF · InstructGPT (Mar 2022) / ChatGPT',
        lm: ['Pre-trained LM', 'GPT-3 175B'], sftArrow: ['fine-tune on ~13k', 'human-written demos'], sft: 'SFT model',
        sampleArrow: ['sample K = 4–9', 'answers per prompt'], rankArrow: ['labellers rank:', 'D > C > A = B', '~33k prompts'],
        rm: [['Reward model · 6B', 's'], ['(prompt, answer) → r', 'xs m2']],
        policy: ['Policy', 'init from SFT'], answer: 'answer', rm2: [['Reward model', 's'], ['from ② · frozen', 'xs m2']], score: 'score r',
        kl: 'r − β·KL', beta: 'β ≈ 0.01–0.02', upd: 'PPO update', ref: 'Frozen SFT reference',
        loopT: 'PPO loop · ~31k prompts', ptx: 'PPO-ptx: + pre-training data mix (optional)',
        assistant: ['Assistant', 'model'],
        res: ['1.3B InstructGPT preferred', 'over 175B GPT-3', '175B: 85 ± 3 % vs GPT-3', '60 vs 3,640 PF-days (1.6 %)'],
        l2: 'Constitutional AI / RLAIF · Anthropic (Dec 2022)',
        c1: ['Helpful-only', 'model'], c2: ['Answer to', 'red-team prompt'], c3: ['Self-critique', '1 of 16 principles'], c4: ['Revised', 'answer'],
        c5: ['Fine-tune on', 'revisions → SL-CAI'], repeat: 'repeat', c6: ['Generate', '2 answers'], c7: ['AI judge picks', 'the better one', 'under a principle'],
        c8: ['Preference model', 'AI: harmlessness +', 'human: helpfulness'], c9: ['RL as in lane 1', '(PPO + KL)'], c10: 'RL-CAI model',
        n2: 'human input: the written constitution, few-shot examples and helpfulness labels only · 16 principles · 52B-parameter models',
        l3: 'DPO (May 2023): no reward model, no sampling loop',
        d1: ['SFT model · policy init', '+ frozen reference π_ref'], d2: ['Preference pairs (human)', 'prompt, y_w > y_l'],
        d3: ['DPO loss (classification-style)', 'raise p(y_w) relative to p(y_l),', 'measured against π_ref'], d4: 'Aligned model',
        x1: 'reward model', x2: 'PPO sampling loop', notNeeded: 'not needed',
        n3: 'Llama 2 (2023): PPO + rejection sampling · Llama 3.1 (2024): DPO over six rounds; at scale Meta found it cheaper than PPO, and better'
      },
      uk: {
        title: 'RLHF: донавчання з учителем, модель винагороди з людських порівнянь A чи B, PPO з KL-прив’язкою; далі Constitutional AI і DPO',
        lgHuman: 'людський внесок', lgAI: 'дані, згенеровані ШІ', lgFrozen: 'заморожена модель', lgTrain: 'модель, що навчається',
        l1: 'Класичний RLHF · InstructGPT (березень 2022) / ChatGPT',
        lm: ['Попередньо навчена', 'LM · GPT-3 175B'], sftArrow: ['донавчання на ~13 тис.', 'демонстрацій людей'], sft: 'Модель SFT',
        sampleArrow: ['вибірка K = 4–9', 'відповідей на промпт'], rankArrow: ['люди ранжують:', 'D > C > A = B', '~33 тис. промптів'],
        rm: [['Модель винагороди (6B)', 's'], ['(промпт, відповідь) → r', 'xs m2']],
        policy: ['Політика', 'старт із SFT'], answer: 'відповідь', rm2: [['Модель винагороди', 's'], ['з ② · заморожена', 'xs m2']], score: 'оцінка r',
        kl: 'r − β·KL', beta: 'β ≈ 0,01–0,02', upd: ['Оновлення', 'PPO'], ref: 'заморожена модель SFT',
        loopT: 'цикл PPO · ~31 тис. промптів', ptx: 'PPO-ptx: + суміш даних попереднього навчання',
        assistant: ['Модель-', 'асистент'],
        res: ['InstructGPT 1,3 млрд кращий', 'за GPT-3 175 млрд', '175 млрд: 85 ± 3 % vs GPT-3', '60 vs 3 640 PF-днів (1,6 %)'],
        l2: 'Constitutional AI / RLAIF · Anthropic (грудень 2022)',
        c1: ['Корисна модель', '(helpful-only)'], c2: ['Відповідь на', 'red-team промпт'], c3: ['Самокритика', '1 із 16 принципів'], c4: ['Виправлена', 'відповідь'],
        c5: ['Донавчити на', 'правках → SL-CAI'], repeat: 'повтор', c6: ['Згенерувати', '2 відповіді'], c7: ['ШІ-суддя обирає', 'кращу відповідь', 'за принципом'],
        c8: ['Модель переваг', 'ШІ: нешкідливість', 'люди: корисність'], c9: ['RL як у рядку 1', '(PPO + KL)'], c10: 'Модель RL-CAI',
        n2: 'людський внесок: написана конституція, кілька прикладів і лише мітки корисності · 16 принципів · моделі на 52 млрд параметрів',
        l3: 'DPO (травень 2023): без моделі винагороди і циклу вибірки',
        d1: ['Модель SFT · старт політики', '+ заморожений еталон π_ref'], d2: ['Пари переваг (люди)', 'промпт, y_w > y_l'],
        d3: ['Функція втрат DPO (як у класифікації)', 'підняти p(y_w) відносно p(y_l),', 'вимірюючи відносно π_ref'], d4: ['Узгоджена', 'модель'],
        x1: 'модель винагороди', x2: 'цикл вибірки PPO', notNeeded: 'не потрібні',
        n3: 'Llama 2 (2023): PPO + відбір зразків · Llama 3.1 (2024): DPO у шість раундів — менше обчислень, ніж PPO, і кращий результат (Meta)'
      }
    };
    var t = L[pickLang(ctx)], A = anim(), P = 'rl', o = '', k;
    var WS = 'stroke:var(--c-warn)', WB = 'stroke:var(--c-warn);fill:color-mix(in srgb, var(--c-warn) 10%, var(--bg-3))';
    function wbox(x, y, w, h, label, tcls) { return rect(x, y, w, h, '', 6, WB) + clines(x + w / 2, y + h / 2, label, tcls); }

    /* legend */
    var lg = [[16, 'hl', '', t.lgHuman], [170, '', WB, t.lgAI], [360, 'frozen', '', t.lgFrozen], [540, 'ok', '', t.lgTrain]];
    for (k = 0; k < lg.length; k++) o += rect(lg[k][0], 6, 12, 12, lg[k][1], 3, lg[k][2]) + txt(lg[k][0] + 18, 16, lg[k][3], 'xs m2');

    /* lane 1a: pre-trained LM -> SFT -> samples -> ranking -> reward model */
    o += txt(16, 36, t.l1, 's bold');
    o += box(16, 72, 130, 48, t.lm, '', 's');
    o += line(146, 96, 200, 96, 'a' + A.flow, P + '-ara') + lines(173, 56, t.sftArrow, 'xs m2', 'middle', 11);
    o += box(200, 72, 96, 48, t.sft, 'ok', 's');
    o += line(296, 96, 336, 96, '' + A.flow, P + '-arw', WS) + lines(316, 56, t.sampleArrow, 'xs m2', 'middle', 11);
    var abcd = ['A', 'B', 'C', 'D'];
    for (k = 0; k < 4; k++) o += wbox(336 + k * 28, 84, 24, 24, abcd[k], 's bold');
    o += line(444, 96, 500, 96, 'a' + A.flow, P + '-ara') + lines(472, 45, t.rankArrow, 'xs m2', 'middle', 11);
    o += box(500, 72, 144, 48, t.rm, 'ok', 's');

    /* lane 1b: PPO loop */
    o += rect(16, 132, 584, 142, 'inv', 10);
    o += box(28, 150, 120, 44, t.policy, 'ok', 's');
    o += line(148, 172, 220, 172, '' + A.flow, P + '-arw', WS) + txt(184, 164, t.answer, 'xs m2', 'middle');
    o += box(220, 150, 120, 44, t.rm2, 'frozen', 's');
    o += path('M572,120 V126 H280 V150', 'm' + A.slow, P + '-arm');
    o += line(340, 172, 400, 172, '' + A.flow, P + '-ar') + txt(370, 164, t.score, 'xs m2', 'middle');
    o += circle(426, 172, 26, 'soft') + txt(426, 176, t.kl, 's bold', 'middle');
    o += line(452, 172, 496, 172, '' + A.flow, P + '-ar');
    o += box(496, 150, 90, 44, t.upd, 'ok', 's');
    o += path('M541,194 V252 H88 V194', 'ok' + A.flow, P + '-arok');
    o += box(362, 214, 128, 26, t.ref, 'frozen', 'xs', 5) + line(426, 214, 426, 198, 'm dash', P + '-arm') + txt(436, 208, t.beta, 'xs m2');
    o += txt(26, 266, t.loopT, 'xs m') + txt(590, 266, t.ptx, 'xs m', 'end');
    o += line(600, 172, 620, 172, 'a' + A.flow, P + '-ara');
    o += box(620, 150, 120, 44, t.assistant, 'hl d-glow', 's bold');
    o += lines(620, 212, t.res, 'xs m2', null, 11);

    /* lane 2: Constitutional AI */
    o += txt(16, 306, t.l2, 's bold');
    var cx = [79, 235, 391, 547, 703], bx;
    var rowA = [[t.c1, ''], [t.c2, 'w'], [t.c3, 'w'], [t.c4, 'w'], [t.c5, 'ok']];
    var rowB = [[t.c6, 'w'], [t.c7, 'w'], [t.c8, 'ok'], [t.c9, 'ok'], [t.c10, 'hl']];
    function laneRow(row, y) {
      var s = '';
      for (var i = 0; i < 5; i++) {
        bx = cx[i] - 63;
        s += row[i][1] === 'w' ? wbox(bx, y, 126, 48, row[i][0], 's') : box(bx, y, 126, 48, row[i][0], row[i][1], 's');
        if (i < 4) s += row[i + 1][1] === 'w' ? line(bx + 126, y + 24, bx + 156, y + 24, '' + A.flow, P + '-arw', WS) : line(bx + 126, y + 24, bx + 156, y + 24, '' + A.flow, P + '-ar');
      }
      return s;
    }
    o += laneRow(rowA, 320);
    o += path('M547,320 C547,292 391,292 391,320', 'thin' + A.slow, P + '-arw', WS) + txt(469, 296, t.repeat, 'xs m2', 'middle');
    o += path('M703,368 V390 H79 V412', '' + A.flow, P + '-ar');
    o += laneRow(rowB, 412);
    o += txt(16, 480, t.n2, 'xs m2');

    /* lane 3: DPO */
    o += txt(16, 506, t.l3, 's bold');
    o += box(16, 520, 160, 34, t.d1, 'frozen', 'xs');
    o += box(16, 564, 160, 34, t.d2, 'hl', 'xs');
    o += path('M176,537 H200 V559', '' + A.flow) + path('M176,581 H200 V559', '' + A.flow) + line(200, 559, 230, 559, '' + A.flow, P + '-ar');
    o += box(230, 530, 230, 58, t.d3, 'ok', 'xs');
    o += line(460, 559, 490, 559, 'a' + A.flow, P + '-ara');
    o += box(490, 537, 120, 44, t.d4, 'hl', 's bold');
    o += box(630, 524, 134, 24, t.x1, 'dim', 'xs') + line(636, 536, 758, 536, 'b thin');
    o += box(630, 556, 134, 24, t.x2, 'dim', 'xs') + line(636, 568, 758, 568, 'b thin');
    o += txt(697, 596, t.notNeeded, 'xs b', 'middle');
    o += txt(16, 614, t.n3, 'xs m2');
    return svg(P, 780, 626, t.title, o);
  };

  /* ---------- ARCH-moe ---------- */
  D['ARCH-moe'] = function (ctx) {
    var L = {
      en: {
        title: 'Mixture of Experts: a router sends each token to 2 of 8 expert feed-forward networks; 46.7B parameters stored, 12.9B used per token',
        head: 'One MoE Transformer block (Mixtral 8x7B: 8 experts, top-2, ×32 layers)',
        attn: 'Self-attention (shared by all tokens)', resid: '+ residual',
        router: [['Router: linear → 8 scores → keep top-2 → softmax', 'xs'], ['Paris → E2 0.7, E5 0.3 · def → E3, E8', 'xs m2']],
        ffn: 'FFN', w2: '0.7', w5: '0.3', tok2: 'def',
        wsum: [['Weighted sum', 's bold'], ['Paris: 0.7·E2(x) + 0.3·E5(x) · def: E3 + E8', 'xs m2']],
        next: 'to the next layer: the router chooses again (32 layers)',
        misc: ['experts are not topic specialists: Mixtral’s routing', 'follows syntax and position, not the subject'],
        sideHead: 'Mixtral 8x7B: parameters', bar1: 'Stored in memory (total): 46.7B', seg1: '8 experts × 32 layers ≈ 45.1B',
        shared: 'shared (attention, embeddings) ≈ 1.6B', bar2: 'Used per token (active): 12.9B', seg2: ['2 experts × 32 layers', '≈ 11.3B'],
        cap: ['8x7B ≠ 56B: only the feed-forward', 'blocks are copied 8 times'],
        nums: ['each expert FFN ≈ 176M per layer', '(3 × 4096 × 14336)', 'memory ∝ total · speed ∝ active', '6× faster inference than Llama 2 70B',
          'DBRX (2024): 132B total / 36B active', 'DeepSeek-V2 (2024): 236B / 21B active', 'Switch Transformer (2021): 1 expert/token', 'Llama 3.1 405B: kept dense (stability)']
      },
      uk: {
        title: 'Суміш експертів: роутер надсилає кожен токен до 2 із 8 експертних FFN; 46,7 млрд параметрів зберігається, 12,9 млрд працює на токен',
        head: 'Один MoE-блок трансформера (Mixtral 8x7B: 8 експертів, top-2, ×32 шари)',
        attn: 'Самоувага (спільна для всіх токенів)', resid: '+ залишковий зв’язок',
        router: [['Роутер: лінійний шар → 8 оцінок → top-2 → softmax', 'xs'], ['Paris → E2 0,7, E5 0,3 · def → E3, E8', 'xs m2']],
        ffn: 'FFN', w2: '0,7', w5: '0,3', tok2: 'def',
        wsum: [['Зважена сума', 's bold'], ['Paris: 0,7·E2(x) + 0,3·E5(x) · def: E3 + E8', 'xs m2']],
        next: 'до наступного шару: роутер обирає знову (32 шари)',
        misc: ['експерти — не фахівці з тем: у Mixtral маршрутизація', 'залежить від синтаксису й позиції, а не від теми'],
        sideHead: 'Mixtral 8x7B: параметри', bar1: 'У пам’яті (всього): 46,7 млрд', seg1: '8 експертів × 32 шари ≈ 45,1 млрд',
        shared: 'спільні (увага, ембедінги) ≈ 1,6 млрд', bar2: 'На токен (активні): 12,9 млрд', seg2: ['2 експерти × 32 шари', '≈ 11,3 млрд'],
        cap: ['8x7B ≠ 56 млрд: копіюються лише', 'блоки feed-forward (8 разів)'],
        nums: ['кожен експерт-FFN ≈ 176 млн на шар', '(3 × 4096 × 14336)', 'пам’ять ∝ всього · швидкість ∝ активні', 'інференс у 6× швидший за Llama 2 70B',
          'DBRX (2024): 132 млрд / 36 млрд активних', 'DeepSeek-V2 (2024): 236 / 21 млрд активних', 'Switch Transformer (2021): 1 експерт/токен', 'Llama 3.1 405B лишилась щільною']
      }
    };
    var t = L[pickLang(ctx)], A = anim(), P = 'moe', o = '', k;
    var WS = 'stroke:var(--c-warn)', WB = 'stroke:var(--c-warn);fill:color-mix(in srgb, var(--c-warn) 12%, var(--bg-3))';

    o += txt(16, 16, t.head, 's bold');
    /* two tokens enter the same block */
    o += box(174, 26, 60, 24, 'Paris', 'hl', 's bold') + rect(270, 26, 60, 24, '', 6, WB) + clines(300, 38, t.tok2, 's bold');
    o += line(204, 50, 204, 66, 'a' + A.flow, P + '-ara') + line(300, 50, 300, 66, '' + A.flow, P + '-arw', WS);
    o += box(110, 66, 284, 34, t.attn, '', 's');
    o += line(252, 100, 252, 112, '' + A.flow, P + '-ar');
    o += circle(252, 122, 10, 'soft') + txt(252, 126, '+', 's bold', 'middle') + txt(268, 126, t.resid, 'xs m2');
    o += line(252, 132, 252, 146, '' + A.flow, P + '-ar');
    o += box(110, 146, 284, 44, t.router, 'soft', 'xs');
    /* fan-out to eight experts */
    var ex = [], lit = { 1: ['hl', t.w2, 'a'], 4: ['hl', t.w5, 'a'], 2: ['w', t.tok2, 'w'], 7: ['w', t.tok2, 'w'] };
    for (k = 0; k < 8; k++) {
      var x0 = 16 + k * 60, cxk = x0 + 26, sx = 110 + (k + 0.5) * 35.5, l = lit[k];
      ex.push(cxk);
      if (!l) {
        o += line(sx, 190, cxk, 226, 'm thin dash');
        o += box(x0, 226, 52, 60, [['E' + (k + 1), 's bold'], [t.ffn, 'xs m']], 'dim', 's');
      } else if (l[0] === 'hl') {
        o += line(sx, 190, cxk, 226, 'a' + A.flow, P + '-ara');
        o += box(x0, 226, 52, 60, [['E' + (k + 1), 's bold'], [t.ffn, 'xs m2'], [l[1], 's bold a']], 'hl' + A.pulse, 's');
      } else {
        o += line(sx, 190, cxk, 226, '' + A.flow, P + '-arw', WS);
        o += rect(x0, 226, 52, 60, '', 6, WB) + clines(cxk, 256, [['E' + (k + 1), 's bold'], [t.ffn, 'xs m2'], [l[1], 's bold']], 's');
      }
    }
    /* chosen experts -> weighted sum */
    o += line(ex[1], 286, 190, 322, 'a' + A.flow, P + '-ara') + line(ex[4], 286, 270, 322, 'a' + A.flow, P + '-ara');
    o += line(ex[2], 286, 230, 322, '' + A.flow, P + '-arw', WS) + line(ex[7], 286, 310, 322, '' + A.flow, P + '-arw', WS);
    o += box(110, 322, 284, 38, t.wsum, 'hl', 's');
    o += line(252, 360, 252, 372, '' + A.flow, P + '-ar');
    o += circle(252, 382, 10, 'soft') + txt(252, 386, '+', 's bold', 'middle') + txt(268, 386, t.resid, 'xs m2');
    o += line(252, 392, 252, 410, '' + A.flow, P + '-ar');
    o += txt(252, 424, t.next, 'xs m2', 'middle');
    o += lines(16, 446, t.misc, 'xs m2', null, 12);

    /* side panel: total vs active parameters, one scale (5.05 px per billion) */
    var S = 236 / 46.7, X = 520;
    o += txt(X, 16, t.sideHead, 's bold');
    o += txt(X, 46, t.bar1, 'xs m2');
    o += rect(X, 52, 1.6 * S, 24, '', 0) + rect(X + 1.6 * S, 52, 45.1 * S, 24, 'hl', 0) + txt(X + 1.6 * S + 8, 68, t.seg1, 'xs');
    o += txt(X, 92, t.shared, 'xs m2');
    o += txt(X, 114, t.bar2, 'xs m2');
    o += rect(X, 120, 1.6 * S, 24, '', 0) + rect(X + 1.6 * S, 120, 11.3 * S, 24, 'hl', 0) + lines(X + 12.9 * S + 8, 129, t.seg2, 'xs', null, 11);
    o += lines(X, 168, t.cap, 'xs m2', null, 12);
    o += lines(X, 206, t.nums, 'xs m2', null, 13);
    return svg(P, 780, 464, t.title, o);
  };

  /* ---------- ARCH-multimodal ---------- */
  D['ARCH-multimodal'] = function (ctx) {
    var L = {
      en: {
        title: 'Multimodal: a bolted-on vision encoder (LLaVA), a cascaded voice pipeline, and one native end-to-end model (GPT-4o)',
        aT: 'A · Bolt-on vision encoder (LLaVA, Apr 2023)',
        gridU: '336×336 px → 24×24 = 576 patches of 14 px',
        clip: ['Vision encoder · frozen', 'CLIP ViT-L/14'], vec: ['576 feature', 'vectors'],
        proj: ['Projector · trained', 'linear → 2-layer MLP (1.5)'], vtok: ['576 visual', 'tokens'],
        ttok: ['Text tokens', '"What is unusual about this image?"'], llm: ['LLM decoder', 'Vicuna / LLaMA'], ans: 'Text answer',
        st1: 'Stage 1: train the projector only · 595K image–caption pairs · CLIP (400M pairs) and LLM frozen',
        st2: 'Stage 2: train projector + LLM · 158K instruction examples · LLaVA-1.5: about one day on 8 A100s',
        st3: 'LLaVA: 85.1 % relative score vs text-only GPT-4 · 92.53 % on ScienceQA with GPT-4 · LLaVA-1.5: SOTA on 11 benchmarks',
        bT: 'B · Cascaded voice (ChatGPT Voice Mode, Sep 2023)',
        b1: 'User speech', b2: ['Whisper', 'speech → text'], b3: 'text', b4: 'GPT-3.5 / GPT-4', b5: 'text', b6: ['Text-to-speech', '5 voices'], b7: ['Spoken', 'reply'],
        lostPre: 'lost in text:', lostItems: 'tone · laughter · multiple speakers · background sound',
        lat: 'average reply latency 2.8 s (GPT-3.5) / 5.4 s (GPT-4): three separate models chained',
        cT: 'C · Native end to end (GPT-4o, May 2024)',
        cIn1: 'Audio', cIn2: 'Image / video frames', cIn3: 'Text', cEnc1: 'tokeniser', cEnc2: 'encoder', cEnc3: 'tokeniser',
        seq: ['One interleaved', 'token sequence'], tf: ['One Transformer trained', 'on all modalities'], cOut1: 'Text', cOut2: 'Audio', cOut3: 'Image',
        lat2: 'audio reply: average 320 ms, minimum 232 ms · hears tone and background noise, answers in speech',
        foot: 'internal details undisclosed by OpenAI / Google · Meta’s Chameleon (May 2024) publishes an early-fusion design: images become tokens'
      },
      uk: {
        title: 'Мультимодальність: прикручений енкодер зображень (LLaVA), каскадний голосовий конвеєр і одна наскрізна нативна модель (GPT-4o)',
        aT: 'A · Прикручений енкодер зображень (LLaVA, квітень 2023)',
        gridU: '336×336 px → 24×24 = 576 фрагментів по 14 px',
        clip: ['Енкодер зору CLIP', 'ViT-L/14 · заморожений'], vec: ['576 векторів', 'ознак'],
        proj: ['Проєктор · навчається', 'лінійний → MLP (LLaVA-1.5)'], vtok: ['576 візуальних', 'токенів'],
        ttok: ['Текстові токени', '"What is unusual about this image?"'], llm: ['LLM-декодер', 'Vicuna / LLaMA'], ans: 'Текстова відповідь',
        st1: 'Етап 1: навчається лише проєктор · 595 тис. пар зображення–підпис · CLIP (400 млн пар) і LLM заморожені',
        st2: 'Етап 2: проєктор + LLM · 158 тис. інструкцій · LLaVA-1.5: близько доби на 8 A100',
        st3: 'LLaVA: 85,1 % відносно текстового GPT-4 · 92,53 % на ScienceQA разом із GPT-4 · LLaVA-1.5: SOTA на 11 бенчмарках',
        bT: 'B · Каскадний голос (ChatGPT Voice Mode, вересень 2023)',
        b1: 'Мовлення', b2: ['Whisper', 'мова → текст'], b3: 'текст', b4: 'GPT-3.5 / GPT-4', b5: 'текст', b6: ['Синтез мовлення', '5 голосів'], b7: ['Голосова', 'відповідь'],
        lostPre: 'губиться в тексті:', lostItems: 'тон · сміх · кілька мовців · фонові звуки',
        lat: 'середня затримка відповіді 2,8 с (GPT-3.5) / 5,4 с (GPT-4): три окремі моделі в ланцюжку',
        cT: 'C · Наскрізна нативна модель (GPT-4o, травень 2024)',
        cIn1: 'Аудіо', cIn2: ['Зображення /', 'кадри відео'], cIn3: 'Текст', cEnc1: 'токенізатор', cEnc2: 'енкодер', cEnc3: 'токенізатор',
        seq: ['Одна перемішана', 'послідовність токенів'], tf: ['Один трансформер,', 'навчений на всьому'], cOut1: 'Текст', cOut2: 'Аудіо', cOut3: 'Зображення',
        lat2: 'голосова відповідь: у середньому 320 мс, мінімум 232 мс · чує тон і фонові звуки, відповідає голосом',
        foot: 'будову OpenAI / Google не розкрито · Chameleon від Meta (травень 2024): рання злита схема, зображення теж стають токенами'
      }
    };
    var t = L[pickLang(ctx)], A = anim(), P = 'mm', o = '', k;
    function grid(x, y, s) {
      var g = rect(x, y, s, s, '', 4);
      for (var i = 1; i < 5; i++) g += line(x + i * s / 5, y, x + i * s / 5, y + s, 'thin m') + line(x, y + i * s / 5, x + s, y + i * s / 5, 'thin m');
      return g;
    }
    /* A: bolt-on vision encoder */
    o += txt(16, 24, t.aT, 's bold');
    o += rect(16, 40, 40, 40, '', 4) + pic(16, 40, 40, 1);
    o += line(56, 60, 76, 60, '' + A.flow, P + '-ar');
    o += grid(76, 40, 40) + txt(16, 94, t.gridU, 'xs m2');
    o += line(116, 60, 136, 60, '' + A.flow, P + '-ar');
    o += box(136, 40, 140, 40, t.clip, 'frozen', 'xs');
    o += line(276, 60, 298, 60, '' + A.flow, P + '-ar');
    o += box(298, 40, 86, 40, t.vec, '', 'xs');
    o += line(384, 60, 406, 60, '' + A.flow, P + '-ar');
    o += box(406, 40, 160, 40, t.proj, 'ok', 'xs');
    o += line(566, 60, 588, 60, '' + A.flow, P + '-ar');
    o += box(588, 40, 110, 40, t.vtok, 'hl', 'xs');
    o += box(16, 112, 250, 40, t.ttok, 'hl', 'xs');
    o += line(266, 132, 300, 132, '' + A.flow, P + '-ar');
    o += path('M643,80 V96 H385 V112', '' + A.flow, P + '-ar');
    o += box(300, 112, 170, 40, t.llm, 'ok', 's');
    o += line(470, 132, 492, 132, '' + A.flow, P + '-ar');
    o += box(492, 112, 120, 40, t.ans, '', 'xs');
    o += lines(16, 168, [t.st1, t.st2, t.st3], 'xs m2', null, 12);
    o += line(16, 200, 764, 200, 'thin m dash');

    /* B: cascaded voice */
    o += txt(16, 220, t.bT, 's bold');
    var bxs = [[16, 90, t.b1, ''], [128, 120, t.b2, ''], [270, 50, t.b3, ''], [342, 110, t.b4, ''], [474, 50, t.b5, ''], [546, 120, t.b6, ''], [688, 76, t.b7, 'hl']];
    for (k = 0; k < bxs.length; k++) {
      o += box(bxs[k][0], 236, bxs[k][1], 40, bxs[k][2], bxs[k][3], 'xs');
      if (k < bxs.length - 1) o += line(bxs[k][0] + bxs[k][1], 256, bxs[k + 1][0], 256, '' + A.flow, P + '-ar');
    }
    o += line(295, 276, 295, 286, 'b thin') + line(499, 276, 499, 286, 'b thin');
    var W = (t.lostPre.length + 1 + t.lostItems.length) * 5.7, x0 = 397 - W / 2;
    o += txt(x0, 298, t.lostPre + ' ' + t.lostItems, 'xs b') + line(x0 + (t.lostPre.length + 1) * 5.7, 295, x0 + W, 295, 'b thin');
    o += txt(16, 318, t.lat, 'xs m2');
    o += line(16, 330, 764, 330, 'thin m dash');

    /* C: native end to end */
    o += txt(16, 350, t.cT, 's bold');
    var ins = [t.cIn1, t.cIn2, t.cIn3], encs = [t.cEnc1, t.cEnc2, t.cEnc3], outs = [t.cOut1, t.cOut2, t.cOut3], ys = [364, 402, 440];
    for (k = 0; k < 3; k++) {
      var cy = ys[k] + 14;
      o += box(16, ys[k], 120, 28, ins[k], '', 'xs') + line(136, cy, 158, cy, '' + A.flow, P + '-ar') + box(158, ys[k], 96, 28, encs[k], '', 'xs');
      o += box(646, ys[k], 118, 28, outs[k], 'hl', 'xs');
    }
    o += path('M254,378 H272 V406 H288', '' + A.flow, P + '-ar') + line(254, 416, 288, 416, '' + A.flow, P + '-ar') + path('M254,454 H272 V426 H288', '' + A.flow, P + '-ar');
    o += box(288, 396, 150, 40, t.seq, 'soft', 'xs');
    o += line(438, 416, 460, 416, 'a' + A.flow, P + '-ara');
    o += box(460, 396, 160, 40, t.tf, 'hl d-glow', 'xs');
    o += path('M620,416 H634 V378 H646', 'a' + A.flow, P + '-ara') + line(620, 416, 646, 416, 'a' + A.flow, P + '-ara') + path('M620,416 H634 V454 H646', 'a' + A.flow, P + '-ara');
    o += txt(16, 490, t.lat2, 'xs m2') + txt(16, 504, t.foot, 'xs m2');
    return svg(P, 780, 516, t.title, o);
  };

  /* ---------- ARCH-reasoning ---------- */
  D['ARCH-reasoning'] = function (ctx) {
    var L = {
      en: {
        title: 'Reasoning models: RL with verifiable rewards (GRPO), accuracy rising with thinking compute, and a hidden chain of thought before the answer',
        aT: 'A · Training loop: RL with verifiable rewards (GRPO)',
        cold: ['optional cold start: SFT on a few thousand readable solutions', '(skipped in DeepSeek-R1-Zero, which used RL alone)'],
        b1: ['Prompt with', 'checkable answer', 'maths · code+tests'], b2: ['Policy LLM', 'e.g. V3-Base', '671B / 37B active'],
        resp: 'G responses', think: 'thinking tokens', ans: 'final answer',
        b4: ['Verifier (rules)', 'answer checker /', 'test runner /', 'format check', 'r = 1 0 1 0 1 0'],
        b5: ['Advantage A_i =', '(r_i − mean) / std'], b6: ['Policy update', 'clipped objective', '+ KL penalty to', 'frozen reference'],
        note: ['no critic / value network: PPO needs one (as large as the policy);', 'GRPO uses the group average as its baseline'],
        bT: 'B · Test-time compute scaling (AIME 2024)', yl: 'accuracy %', xl: 'thinking compute per question (log scale)',
        p1: 'GPT-4o 12 % · no extended thinking', p2: 'o1 74 % (1 sample)', p3: '83 % · consensus@64', p4: '93 % · re-rank 1,000 samples',
        l1: 'single answer (pass@1)', l2: ['majority vote /', 'best-of-N over', 'many samples'],
        fn: ['each step right ≈ 10× more compute; 64× and 1,000×', 'are to scale, the GPT-4o → o1 gap is illustrative'],
        cT: 'C · What the user sees', cp: 'User prompt', bar: 'hidden reasoning tokens · billed as output', fa: 'final answer',
        barNote: 'hidden in o1 / GPT-5; summarised in ChatGPT; visible in DeepSeek-R1 and Claude’s extended thinking',
        n1: 'AIME 2024: GPT-4o 12 % → o1 74 % · R1-Zero 15.6 % → 71.0 % by pure RL · R1 79.8 % pass@1, up to 32,768 tokens per answer',
        n2: 'the thinking budget is a dial: effort levels (minimal → high) or a token budget (Claude 3.7 Sonnet: up to its 128K output limit)',
        n3: 'the visible reasoning is not a faithful transcript: Claude 3.7 Sonnet mentioned the hint it used 25 % of the time, R1 39 %'
      },
      uk: {
        title: 'Моделі міркування: RL із перевірюваними винагородами (GRPO), точність зростає з обчисленнями на міркування, прихований ланцюжок перед відповіддю',
        aT: 'A · Цикл навчання: RL із перевірюваними винагородами (GRPO)',
        cold: ['необов’язковий «холодний старт»: SFT на кількох тисячах читабельних', 'розв’язків (DeepSeek-R1-Zero його пропустив і вчився лише через RL)'],
        b1: ['Промпт із', 'перевірюваною', 'відповіддю', 'матем. · код+тести'], b2: ['LLM-політика', 'напр. V3-Base', '671B / 37B акт.'],
        resp: 'G відповідей', think: 'токени міркування', ans: 'відповідь',
        b4: ['Верифікатор', '(правила):', 'перевірка відповіді,', 'тести, формат', 'r = 1 0 1 0 1 0'],
        b5: ['Перевага A_i =', '(r_i − сер.) / σ'], b6: ['Оновлення політики', 'обрізана ціль +', 'KL-штраф до', 'заморож. еталона'],
        note: ['без критика: PPO потребує мережу цінності завбільшки з політику;', 'GRPO бере за базу середнє по групі'],
        bT: 'B · Обчислення під час відповіді (AIME 2024)', yl: 'точність, %', xl: 'обчислення на одне запитання (лог. шкала)',
        p1: 'GPT-4o 12 % · без розгорнутого міркування', p2: 'o1 74 % (1 зразок)', p3: '83 % · консенсус із 64', p4: '93 % · переранжування 1 000 зразків',
        l1: 'одна відповідь (pass@1)', l2: ['голосування /', 'best-of-N на', 'багатьох зразках'],
        fn: ['крок праворуч ≈ 10× більше обчислень; 64× і 1 000×', 'у масштабі, розрив GPT-4o → o1 — ілюстративний'],
        cT: 'C · Що бачить користувач', cp: 'Промпт', bar: 'приховані токени міркування · оплачуються як вивід', fa: 'фінальна відповідь',
        barNote: 'приховані в o1 / GPT-5; у ChatGPT — стислий переказ; видимі в DeepSeek-R1 і в розширеному міркуванні Claude',
        n1: 'AIME 2024: GPT-4o 12 % → o1 74 % · R1-Zero 15,6 % → 71,0 % лише через RL · R1 79,8 % pass@1, до 32 768 токенів на відповідь',
        n2: 'бюджет міркування — це регулятор: рівні зусиль (minimal → high) або ліміт токенів (Claude 3.7 Sonnet: до 128 тис. токенів виводу)',
        n3: 'видимий ланцюжок міркувань — не точний протокол: Claude 3.7 Sonnet згадував використану підказку лише у 25 % випадків, R1 — у 39 %'
      }
    };
    var t = L[pickLang(ctx)], A = anim(), P = 'rs', o = '', k;

    /* A: GRPO loop */
    o += txt(16, 18, t.aT, 's bold');
    o += rect(16, 30, 414, 32, 'inv', 8) + lines(26, 43, t.cold, 'xs m2', null, 11);
    o += line(215, 62, 215, 74, 'm dash', P + '-arm');
    o += box(16, 74, 120, 56, t.b1, 'hl', 'xs');
    o += line(136, 102, 160, 102, '' + A.flow, P + '-ar');
    o += box(160, 74, 110, 56, t.b2, 'hl d-glow', 'xs');
    o += line(270, 102, 300, 102, '' + A.flow, P + '-ar');
    o += txt(365, 70, t.resp, 'xs m2', 'middle');
    for (k = 0; k < 3; k++) {
      var cx0 = 300 + k * 10, cy0 = 76 + k * 12;
      o += rect(cx0, cy0, 110, 60, '', 5);
      if (k === 2) {
        o += '<rect x="' + (cx0 + 4) + '" y="' + (cy0 + 4) + '" width="102" height="36" rx="3" class="d-fill m" opacity=".18"/>';
        o += txt(cx0 + 55, cy0 + 18, t.think, 'xs m2', 'middle') + txt(cx0 + 55, cy0 + 32, '<think>…</think>', 'xs m', 'middle');
        o += '<rect x="' + (cx0 + 4) + '" y="' + (cy0 + 43) + '" width="102" height="13" rx="3" class="d-fill a" opacity=".22"/>';
        o += txt(cx0 + 55, cy0 + 53, t.ans, 'xs a', 'middle');
      }
    }
    o += line(375, 160, 375, 178, '' + A.flow, P + '-ar');
    o += box(300, 178, 130, 80, t.b4, 'ok', 'xs');
    o += line(300, 218, 270, 218, '' + A.flow, P + '-ar');
    o += rect(160, 178, 110, 80, '', 6) + lines(215, 192, t.b5, 'xs', 'middle', 11);
    o += line(170, 236, 260, 236, 'thin m');
    var rr = [1, 0, 1, 0, 1, 0];
    for (k = 0; k < 6; k++) {
      var bxk = 174 + k * 14;
      o += rr[k] ? '<rect x="' + bxk + '" y="222" width="9" height="14" rx="1.5" class="d-fill ok"/>' : '<rect x="' + bxk + '" y="236" width="9" height="14" rx="1.5" class="d-fill b"/>';
    }
    o += line(160, 218, 136, 218, '' + A.flow, P + '-ar');
    o += box(16, 178, 120, 80, t.b6, 'ok', 'xs');
    o += path('M76,178 V150 H215 V130', 'ok' + A.flow, P + '-arok');
    o += rect(16, 272, 414, 30, 'inv', 8) + lines(26, 285, t.note, 'xs m2', null, 11);

    /* B: accuracy vs thinking compute, drawn to scale (y: 2.06 px per %, x: log axis, 64x and 1,000x exact) */
    o += txt(470, 18, t.bT, 's bold');
    o += txt(470, 32, t.yl, 'xs m');
    function Y(v) { return 250 - v * 2.06; }
    o += line(520, 44, 520, 250, 'thin m') + line(520, 250, 750, 250, 'thin m') + line(520, Y(50), 750, Y(50), 'thin m dash');
    o += txt(514, 253, '0', 'xs m', 'end') + txt(514, Y(50) + 3, '50', 'xs m', 'end') + txt(514, Y(100) + 3, '100', 'xs m', 'end');
    var p = [[520, Y(12)], [597, Y(74)], [689, Y(83)], [750, Y(93)]];
    o += path('M' + p[0][0] + ',' + p[0][1] + ' L' + p[1][0] + ',' + p[1][1], '');
    o += path('M' + p[1][0] + ',' + p[1][1] + ' L' + p[2][0] + ',' + p[2][1] + ' L' + p[3][0] + ',' + p[3][1], 'a');
    for (k = 0; k < 4; k++) o += dot(p[k][0], p[k][1], 6, 'bg') + dot(p[k][0], p[k][1], 4, k < 2 ? '' : 'a');
    o += txt(528, 240, t.p1, 'xs m2') + txt(603, 112, t.p2, 'xs m2') + txt(750, 100, t.p3, 'xs m2', 'end') + txt(746, 44, t.p4, 'xs m2', 'end');
    o += txt(570, 200, t.l1, 'xs m2') + line(572, 192, 561, 164, 'thin m');
    o += lines(584, 56, t.l2, 'xs m2', null, 11);
    o += txt(635, 266, t.xl, 'xs m', 'middle');
    o += lines(470, 284, t.fn, 'xs m2', null, 11);

    /* C: what the user sees */
    o += line(16, 312, 764, 312, 'thin m dash');
    o += txt(16, 332, t.cT, 's bold');
    o += box(16, 346, 110, 30, t.cp, 'hl', 'xs');
    o += line(126, 361, 150, 361, '' + A.flow, P + '-ar');
    o += rect(150, 346, 440, 30, '', 6) + txt(370, 358, t.bar, 'xs m2', 'middle') + line(162, 369, 578, 369, 'm thin' + A.slow);
    o += line(590, 361, 614, 361, 'a' + A.flow, P + '-ara');
    o += box(614, 346, 150, 30, t.fa, 'hl', 'xs');
    o += txt(150, 392, t.barNote, 'xs m2');
    o += lines(16, 412, [t.n1, t.n2, t.n3], 'xs m2', null, 12);
    return svg(P, 780, 446, t.title, o);
  };

  /* ---------- ARCH-agents ---------- */
  D['ARCH-agents'] = function (ctx) {
    var L = {
      en: {
        title: 'Agents: the loop goal → LLM → tool call → harness → observation, context management with subagents, and the MCP client–server architecture',
        aT: 'A · The agent loop', goal: ['Goal (from user)', '+ permissions'], result: ['Result → user:', 'done, tests pass,', 'or budget reached'],
        llm: ['LLM: think +', 'choose next action'], tool: ['Tool call', '(structured JSON)'], gate: 'human approval',
        harness: ['Harness executes the call in a sandbox', '(Claude Code, Codex, …)'], obs: ['Observation', 'output, error, page', 'text, screenshot'],
        t1: ['Code /', 'terminal'], t2: ['Web', 'browser'], t3: ['Computer use', 'screenshot →', 'click / type'], t4: ['MCP', 'servers'],
        bT: 'B · Context management and subagents', ctxL: 'Context window (finite)',
        seg1: ['system', 'prompt +', 'tool defs'], seg2: 'task', seg3: ['turn 1 …', 'turn n', '(observations)'],
        limit: ['limit: quality degrades as it fills', '(“context rot”)'],
        s1: ['Compaction: summarise → new window', 'with summary + recent files'], s2: ['Notes file / to-do list', '(persists outside the window)'],
        s3: ['Just-in-time retrieval (grep/search)', 'instead of preloading everything'],
        orch: 'Orchestrator agent', sub: ['Subagent', 'A'], subB: ['Subagent', 'B'], subC: ['Subagent', 'C'], ret: 'condensed findings ↑',
        bn: ['agents use ≈ 4× the tokens of chat;', 'multi-agent systems ≈ 15× (Anthropic)'],
        key1: 'METR 50 % time horizon: ~4 min (GPT-4, 2023) → ~17 h (Claude Mythos Preview, Apr 2026), doubling about every 4 months',
        key2: 'OSWorld: 12.2 % (Apr 2024) → 61.4 % (Claude Sonnet 4.5, 2025) → 86.0 % OSWorld-Verified (Claude Fable 5, 2026) · humans 72.4 %',
        cT: 'C · MCP client–server architecture', host: 'Host app (Claude Desktop, ChatGPT, IDE)', clientL: 'MCP client ',
        servers: ['GitHub server', 'Database server', 'Slack server'], transports: ['Streamable HTTP + OAuth 2.1', 'stdio (local subprocess)', 'Streamable HTTP + OAuth 2.1'],
        chips: ['Tools', 'Resources', 'Prompts'], elic: 'Elicitation: a server asks the user for missing information',
        cap1: 'Messages: JSON-RPC 2.0 (stdio or Streamable HTTP) · 1 client per server · one standard connector per system, usable by any MCP app',
        cap2: '10,000+ active public servers, 97M+ monthly SDK downloads (Dec 2025) · open from the start (Nov 2024), now under the Linux Foundation'
      },
      uk: {
        title: 'Агенти: цикл мета → LLM → виклик інструмента → обгортка → спостереження, керування контекстом і субагенти, архітектура MCP клієнт–сервер',
        aT: 'A · Цикл агента', goal: ['Мета від користувача', '+ дозволи'], result: ['Результат → людині', 'готово / тести пройдено /', 'бюджет вичерпано'],
        llm: ['LLM: міркує й', 'обирає наступну дію'], tool: ['Виклик', 'інструмента', '(JSON)'], gate: 'схвалення людини',
        harness: ['обгортка агента (harness)', 'виконує виклик у пісочниці', '(Claude Code, Codex, …)'], obs: ['Спостереження', 'вивід, помилка,', 'текст, скриншот'],
        t1: ['Код /', 'термінал'], t2: ['Веб-', 'браузер'], t3: ['Керування', 'комп’ютером:', 'скриншот → клік'], t4: ['MCP-', 'сервери'],
        bT: 'B · Керування контекстом і субагенти', ctxL: 'Контекстне вікно (скінченне)',
        seg1: ['системний', 'промпт +', 'інструменти'], seg2: 'задача', seg3: ['хід 1 …', 'хід n', '(спостер.)'],
        limit: ['межа: якість падає, коли вікно', 'заповнюється («context rot»)'],
        s1: ['Ущільнення: стиснути → нове вікно', 'зі стислим переказом + свіжі файли'], s2: ['Файл нотаток / список справ', '(живе поза вікном)'],
        s3: ['Пошук за потреби (grep, search)', 'замість завантаження всього'],
        orch: 'Агент-оркестратор', sub: ['Субагент', 'A'], subB: ['Субагент', 'B'], subC: ['Субагент', 'C'], ret: 'стислі висновки ↑',
        bn: ['агенти витрачають ≈ 4× токенів чату;', 'багатоагентні системи ≈ 15× (Anthropic)'],
        key1: 'Горизонт METR (50 %): ~4 хв (GPT-4, 2023) → ~17 год (Claude Mythos Preview, квітень 2026), подвоєння ≈ кожні 4 місяці',
        key2: 'OSWorld: 12,2 % (2024) → 61,4 % (Claude Sonnet 4.5, 2025) → 86,0 % OSWorld-Verified (Claude Fable 5, 2026) · люди 72,4 %',
        cT: 'C · Архітектура MCP: клієнт–сервер', host: 'Хост (Claude Desktop, ChatGPT, IDE)', clientL: 'MCP-клієнт ',
        servers: ['Сервер GitHub', 'Сервер бази даних', 'Сервер Slack'], transports: ['Streamable HTTP + OAuth 2.1', 'stdio (локальний підпроцес)', 'Streamable HTTP + OAuth 2.1'],
        chips: ['Інструменти', 'Ресурси', 'Промпти'], elic: 'Elicitation: сервер запитує в користувача те, чого бракує',
        cap1: 'JSON-RPC 2.0 (stdio або Streamable HTTP) · 1 клієнт на сервер · один стандартний конектор на систему для будь-якого MCP-застосунку',
        cap2: '10 000+ активних публічних серверів і 97 млн+ завантажень SDK на місяць (грудень 2025) · відкритий код від початку (листопад 2024)'
      }
    };
    var t = L[pickLang(ctx)], A = anim(), P = 'ag', o = '', k;

    /* A: the loop */
    o += txt(16, 16, t.aT, 's bold');
    o += box(150, 24, 130, 36, t.goal, 'hl', 'xs');
    o += line(215, 60, 215, 76, 'a' + A.flow, P + '-ara');
    o += box(300, 24, 120, 36, t.result, 'ok', 'xs');
    o += path('M294,76 V42 H300', 'ok' + A.flow, P + '-arok');
    o += box(150, 76, 156, 48, t.llm, 'hl d-glow', 's');
    o += path('M306,100 H365 V170', '' + A.flow, P + '-ar');
    o += box(310, 170, 110, 48, t.tool, '', 'xs');
    o += line(365, 218, 365, 264, '' + A.flow, P + '-ar');
    o += rect(316, 230, 98, 20, 'inv', 5) + txt(365, 244, t.gate, 'xs m2', 'middle');
    o += box(150, 264, 270, 48, t.harness, '', 'xs');
    o += path('M150,288 H75 V218', '' + A.flow, P + '-ar');
    o += box(16, 170, 118, 48, t.obs, '', 'xs');
    o += path('M75,170 V100 H150', '' + A.flow, P + '-ar');
    o += path('M285,312 V320', 'm') + path('M63,320 H369', 'm');
    var tools = [t.t1, t.t2, t.t3, t.t4];
    for (k = 0; k < 4; k++) {
      var tx = 16 + k * 102;
      o += line(tx + 47, 320, tx + 47, 328, 'm', P + '-arm') + box(tx, 328, 94, 44, tools[k], 'soft', 'xs');
    }

    /* B: context window and subagents */
    o += txt(440, 16, t.bT, 's bold');
    o += txt(440, 34, t.ctxL, 'xs m2');
    o += rect(440, 40, 90, 260, '', 6);
    o += rect(444, 248, 82, 48, 'soft', 4) + clines(485, 272, t.seg1, 'xs');
    o += rect(444, 222, 82, 24, 'hl', 4) + clines(485, 234, t.seg2, 'xs');
    o += rect(444, 96, 82, 124, '', 4) + clines(485, 158, t.seg3, 'xs m2');
    o += line(440, 70, 530, 70, 'b') + lines(536, 73, t.limit, 'xs b', null, 11);
    var side = [t.s1, t.s2, t.s3], sy = [104, 148, 192];
    for (k = 0; k < 3; k++) o += line(530, sy[k] + 14, 548, sy[k] + 14, 'a' + A.flow, P + '-ara') + box(548, sy[k], 216, 28, side[k], 'soft', 'xs');
    o += box(548, 236, 208, 26, t.orch, 'hl', 'xs');
    var subs = [t.sub, t.subB, t.subC];
    for (k = 0; k < 3; k++) {
      var sx = 548 + k * 71, scx = sx + 27;
      o += line(scx - 6, 262, scx - 6, 290, '' + A.flow, P + '-ar') + line(scx + 6, 290, scx + 6, 262, 'a' + A.flow, P + '-ara');
      o += rect(sx, 290, 66, 30, '', 6) + clines(scx, 305, subs[k], 'xs');
      o += '<rect x="' + (sx + 54) + '" y="296" width="7" height="18" rx="1.5" class="d-box"/><rect x="' + (sx + 54) + '" y="308" width="7" height="6" rx="1" class="d-fill a"/>';
    }
    o += txt(652, 336, t.ret, 'xs m2', 'middle');
    o += lines(440, 352, t.bn, 'xs m2', null, 12);

    /* key numbers */
    o += lines(16, 390, [t.key1, t.key2], 'xs m2', null, 12);
    o += line(16, 412, 764, 412, 'thin m dash');

    /* C: MCP */
    o += txt(16, 432, t.cT, 's bold');
    o += rect(16, 446, 264, 186, 'inv', 10) + txt(26, 462, t.host, 'xs m2');
    o += box(26, 521, 84, 50, 'LLM', 'hl', 's bold');
    var cyS = [490, 546, 602];
    o += path('M110,546 H130 V490 H150', 'thin') + line(110, 546, 150, 546, 'thin') + path('M110,546 H130 V602 H150', 'thin');
    var cw = pickLang(ctx) === 'uk' ? [70, 48, 48] : [38, 62, 50];
    for (k = 0; k < 3; k++) {
      var cy = cyS[k];
      o += box(150, cy - 15, 100, 30, t.clientL + (k + 1), '', 'xs');
      o += line(250, cy, 470, cy, 'a' + A.flow) + txt(375, cy - 6, t.transports[k], 'xs m2', 'middle');
      o += rect(470, cy - 22, 190, 44, '', 6) + txt(480, cy - 6, t.servers[k], 'xs bold');
      var chx = 478;
      for (var c2 = 0; c2 < 3; c2++) { o += rect(chx, cy + 2, cw[c2], 16, 'soft', 8) + txt(chx + cw[c2] / 2, cy + 13, t.chips[c2], 'xs', 'middle'); chx += cw[c2] + 4; }
    }
    o += path('M560,624 V644 H208 V632', 'm dash', P + '-arm') + txt(216, 656, t.elic, 'xs m2');
    o += lines(16, 676, [t.cap1, t.cap2], 'xs m2', null, 12);
    return svg(P, 780, 696, t.title, o);
  };

})();
