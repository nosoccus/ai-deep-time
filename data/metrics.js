/* AI Deep Time · data/metrics.js: the chart series and acceleration facts.
   Conventions: t = year + (dayOfYear - 1) / 365; month precision -> 15th; year precision -> mid-year.
   Microsoft fiscal years (to 30 June) sit at the FY midpoint (FY2023 -> 2023.0).
   Values are raw numbers in the stated unit. est:true = an estimate or a non-robust measurement. */
window.AIH = window.AIH || {};
(function () {
  var S = {};

  /* ───────────────────────── compute ───────────────────────── */

  S["train-compute"] = {
    group: "compute", featured: true,
    title: {en: "Training compute of notable AI models, 1950–2026", uk: "Обчислювальний бюджет навчання помітних моделей ШІ, 1950–2026"},
    unit: {en: "FLOP", uk: "FLOP"}, scale: "log",
    what: {
      en: "The physical fuel of AI. Compute sat on a Moore's-law track until about 2010, then exploded: the axis spans 25 orders of magnitude, from 40 relay operations (Theseus, 1950) to an estimated 10^27 FLOP (GPT-6 Astra, 2026).",
      uk: "Фізичне «пальне» ШІ. До ~2010 року обчислення зростали в темпі закону Мура, а потім вибухнули: вісь охоплює 25 порядків величини, від 40 операцій на реле (Theseus, 1950) до оцінених 10^27 FLOP (GPT-6 Astra, 2026)."
    },
    caveat: {
      en: "Almost every value is an Epoch AI estimate built from published details (parameters × tokens, or chips × days × utilisation). est. means Epoch had to estimate undisclosed inputs; otherwise the developer disclosed the figure or its direct inputs. Closed frontier models after 2023 (GPT-4, Gemini, Grok, GPT-4.5/5/6) are estimates with wide error bars; Gemini 2.x–4 and Claude 3/4/5 have no Epoch estimate. Pre-1990 values are reconstructed est., accurate to an order of magnitude only.",
      uk: "Майже всі значення — оцінки Epoch AI, зібрані з опублікованих деталей (параметри × токени або чипи × дні × завантаження). «оц.» означає, що Epoch довелося оцінювати нерозкриті дані; інакше розробник сам розкрив цифру або її складники. Для закритих передових моделей після 2023 року (GPT-4, Gemini, Grok, GPT-4.5/5/6) це оцінки з широкою похибкою; Gemini 2.x–4 і Claude 3/4/5 оцінки Epoch не мають. Значення до 1990 року — реконструйовані оц., точні лише до порядку величини."
    },
    points: [
      {t: 1950.534, date: "1950-07", label: "Theseus, Shannon's maze-solving mouse (40 relay operations; reconstructed est.)", labelUk: "Theseus, миша Шеннона для проходження лабіринту (40 операцій на реле; реконструйована оц.)", value: 4e1, est: true, sources: ["S-R6-01"]},
      {t: 1957.500, date: "1957", label: "Perceptron Mark I (Rosenblatt; reconstructed est.)", labelUk: "Перцептрон Mark I (Розенблатт; реконструйована оц.)", value: 7e5, est: true, sources: ["S-R6-01"]},
      {t: 1959.534, date: "1959-07", label: "Samuel's checkers player, IBM 704 (reconstructed est.)", labelUk: "Шашкова програма Семюела, IBM 704 (реконструйована оц.)", value: 4.3e8, est: true, sources: ["S-R6-01"]},
      {t: 1960.455, date: "1960-06", label: "ADALINE (Widrow & Hoff; reconstructed est.)", labelUk: "ADALINE (Відроу й Гофф; реконструйована оц.)", value: 6.6e3, est: true, sources: ["S-R6-01"]},
      {t: 1980.288, date: "1980-04", label: "Neocognitron (Fukushima; reconstructed est.)", labelUk: "Неокогнітрон (Фукусіма; реконструйована оц.)", value: 2.7e8, est: true, sources: ["S-R6-01"]},
      {t: 1986.786, date: "1986-10", label: "Multilayer perceptron with back-propagation (Rumelhart, Hinton & Williams; reconstructed est.)", labelUk: "Багатошаровий перцептрон зі зворотним поширенням помилки (Румельгарт, Гінтон і Вільямс; реконструйована оц.)", value: 6.7e8, est: true, sources: ["S-R6-01"]},
      {t: 1987.452, date: "1987-06", label: "NETtalk (Sejnowski & Rosenberg; reconstructed est.)", labelUk: "NETtalk (Сейновскі й Розенберг; реконструйована оц.)", value: 2.8e10, est: true, sources: ["S-R6-01"]},
      {t: 1989.953, date: "1989-12", label: "Zip-code CNN (LeCun et al., Bell Labs; reconstructed est.)", labelUk: "CNN для поштових індексів (Лекун та ін., Bell Labs; реконструйована оц.)", value: 1.5e12, est: true, sources: ["S-R6-01"]},
      {t: 1992.370, date: "1992-05", label: "TD-Gammon (Tesauro, IBM; Epoch: speculative)", labelUk: "TD-Gammon (Тезауро, IBM; Epoch: гіпотетична оцінка)", value: 1.8e13, est: true, sources: ["S-R6-01"]},
      {t: 1997.871, date: "1997-11", label: "LSTM (Hochreiter & Schmidhuber)", labelUk: "LSTM (Гохрайтер і Шмідгубер)", value: 3.2e13, est: true, sources: ["S-R6-01"]},
      {t: 1998.871, date: "1998-11", label: "LeNet-5 (LeCun et al.)", labelUk: "LeNet-5 (Лекун та ін.)", value: 2.8e12, est: true, sources: ["S-R6-01"]},
      {t: 2003.200, date: "2003-03", label: "Neural probabilistic language model (Bengio et al.)", labelUk: "Нейронна ймовірнісна мовна модель (Бенжіо та ін.)", value: 1.7e15, est: true, sources: ["S-R6-01"]},
      {t: 2009.452, date: "2009-06", label: "Deep belief nets trained on a GPU (Raina, Madhavan & Ng)", labelUk: "Глибокі мережі переконань, навчені на GPU (Райна, Мадхаван і Ин)", value: 1e15, est: true, sources: ["S-R6-01"]},
      {t: 2012.537, date: "2012-07", label: "Google \"cat neuron\" (Le et al.; 16,000 CPU cores)", labelUk: "«Котячий нейрон» Google (Ле та ін.; 16 000 ядер CPU)", value: 6e17, est: true, sources: ["S-R6-01"]},
      {t: 2012.784, date: "2012-10-13", label: "AlexNet (2× GTX 580, 5–6 days; ILSVRC results date)", labelUk: "AlexNet (2× GTX 580, 5–6 днів; дата результатів ILSVRC)", value: 4.7e17, est: true, sources: ["S-R6-01", "S-R6-57", "S-AUD-16"]},
      {t: 2013.953, date: "2013-12", label: "DQN Atari agent (DeepMind)", labelUk: "Агент DQN для Atari (DeepMind)", value: 2.9e15, est: true, sources: ["S-R6-01"]},
      {t: 2014.704, date: "2014-09", label: "Seq2Seq LSTM translation, 5-model ensemble (Google)", labelUk: "Переклад Seq2Seq LSTM, ансамбль із 5 моделей (Google)", value: 5.6e19, est: true, sources: ["S-R6-01"]},
      {t: 2014.704, date: "2014-09", label: "GoogLeNet / Inception v1", value: 1.5e18, est: true, sources: ["S-R6-01"]},
      {t: 2015.953, date: "2015-12", label: "ResNet-152 (Microsoft Research)", value: 1e19, est: true, sources: ["S-R6-01"]},
      {t: 2016.038, date: "2016-01", label: "AlphaGo Lee (Epoch: speculative, ~3× uncertain; match Mar 2016)", labelUk: "AlphaGo Lee (Epoch: гіпотетична оцінка, невизначеність ~3×; матч у березні 2016)", value: 1.9e21, est: true, sources: ["S-R6-01"]},
      {t: 2017.452, date: "2017-06", label: "Transformer, big model (8× P100, 3.5 days)", labelUk: "Transformer, велика модель (8× P100, 3,5 дня)", value: 7.4e18, est: true, sources: ["S-R6-01"]},
      {t: 2017.786, date: "2017-10", label: "AlphaGo Zero: 6.5×10^20 FLOP to train the network (est.); ~3×10^23 including self-play", labelUk: "AlphaGo Zero: 6,5×10^20 FLOP на навчання мережі (оц.); ~3×10^23 разом із самогрою", value: 6.5e20, est: true, sources: ["S-R6-01", "S-AUD-15"]},
      {t: 2018.452, date: "2018-06", label: "GPT-1 (117M params)", labelUk: "GPT-1 (117 млн параметрів)", value: 1.8e19, est: true, sources: ["S-R6-01"]},
      {t: 2018.786, date: "2018-10", label: "BERT-Large", value: 2.9e20, est: true, sources: ["S-R6-01"]},
      {t: 2019.123, date: "2019-02", label: "GPT-2 1.5B (Epoch: speculative)", labelUk: "GPT-2 1.5B (Epoch: гіпотетична оцінка)", value: 1.9e21, est: true, sources: ["S-R6-01"]},
      {t: 2019.786, date: "2019-10", label: "T5-11B (Google)", value: 3.3e22, est: true, sources: ["S-R6-01"]},
      {t: 2019.786, date: "2019-10", label: "AlphaStar (DeepMind, StarCraft II)", value: 1.1e23, est: true, sources: ["S-R6-01"]},
      {t: 2020.405, date: "2020-05-28", label: "GPT-3 175B (paper, Table D.1)", labelUk: "GPT-3 175B (стаття, таблиця D.1)", value: 3.14e23, est: false, sources: ["S-R6-07", "S-R6-01"]},
      {t: 2021.786, date: "2021-10", label: "Megatron-Turing NLG 530B", value: 8.6e23, est: true, sources: ["S-R6-01"]},
      {t: 2022.200, date: "2022-03", label: "Chinchilla 70B (compute-optimal)", labelUk: "Chinchilla 70B (обчислювально оптимальна)", value: 5.8e23, est: true, sources: ["S-R6-01"]},
      {t: 2022.255, date: "2022-04-04", label: "PaLM 540B (6,144 TPU v4, ~50 days)", labelUk: "PaLM 540B (6 144 TPU v4, ~50 днів)", value: 2.5e24, est: false, sources: ["S-R6-01"]},
      {t: 2023.197, date: "2023-03-14", label: "GPT-4: est. (Epoch AI), 90% CI 8.2×10^24–4.4×10^25; first model above 10^25", labelUk: "GPT-4: оц. (Epoch AI), 90 % ДІ 8,2×10^24–4,4×10^25; перша модель понад 10^25", value: 2.1e25, est: true, sources: ["S-R6-01", "S-R6-05"]},
      {t: 2023.534, date: "2023-07", label: "Llama 2 70B (disclosed GPU-hours)", labelUk: "Llama 2 70B (розкриті GPU-години)", value: 8.1e23, est: false, sources: ["S-R6-01"]},
      {t: 2023.929, date: "2023-12-06", label: "Gemini 1.0 Ultra: est. (Epoch AI, speculative)", labelUk: "Gemini 1.0 Ultra: оц. (Epoch AI, гіпотетична)", value: 5e25, est: true, sources: ["S-R6-01"]},
      {t: 2024.559, date: "2024-07-23", label: "Llama 3.1 405B (15.6T tokens; stated in the paper)", labelUk: "Llama 3.1 405B (15,6 трлн токенів; зазначено в статті)", value: 3.8e25, est: false, sources: ["S-R6-01"]},
      {t: 2024.986, date: "2024-12-26", label: "DeepSeek-V3 (671B MoE, 14.8T tokens; ~1/10 of Llama 3.1's compute)", labelUk: "DeepSeek-V3 (671B MoE, 14,8 трлн токенів; ~1/10 обчислень Llama 3.1)", value: 3.3e24, est: false, sources: ["S-R6-01"]},
      {t: 2025.129, date: "2025-02-17", label: "Grok 3: est. (Epoch AI; ~80k H100 for ~3 months); first above 10^26", labelUk: "Grok 3: оц. (Epoch AI; ~80 тис. H100 упродовж ~3 місяців); перша понад 10^26", value: 3.5e26, est: true, sources: ["S-R6-01"]},
      {t: 2025.156, date: "2025-02-27", label: "GPT-4.5: est. (Epoch AI), range 2.7×10^26–5.4×10^26", labelUk: "GPT-4.5: оц. (Epoch AI), діапазон 2,7×10^26–5,4×10^26", value: 3.8e26, est: true, sources: ["S-R6-01"]},
      {t: 2025.518, date: "2025-07-09", label: "Grok 4: est. (Epoch AI, speculative), ~3.8×10^26–6.4×10^26", labelUk: "Grok 4: оц. (Epoch AI, гіпотетична), ~3,8×10^26–6,4×10^26", value: 5e26, est: true, sources: ["S-R6-01"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5: est. (Epoch AI), CI 2×10^25–2×10^26; likely less pre-training compute than GPT-4.5", labelUk: "GPT-5: оц. (Epoch AI), ДІ 2×10^25–2×10^26; імовірно, менше обчислень на попереднє навчання, ніж у GPT-4.5", value: 6.6e25, est: true, sources: ["S-R6-01"]},
      {t: 2026.310, date: "2026-04-24", label: "DeepSeek-V4-Pro (1.6T MoE, ~33T tokens; open weights)", labelUk: "DeepSeek-V4-Pro (1.6T MoE, ~33 трлн токенів; відкриті ваги)", value: 9.7e24, est: true, sources: ["S-R6-01", "S-R6-11"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra: ~10^27 FLOP (est., Epoch AI; range 5×10^26–2×10^27). Largest known run as of Oct 2026", labelUk: "GPT-6 Astra: ~10^27 FLOP (оц., Epoch AI; діапазон 5×10^26–2×10^27). Найбільший відомий запуск навчання станом на жовтень 2026", value: 1e27, est: true, sources: ["S-R6-01", "S-R6-06", "S-AUD-15"]}
    ],
    reference: null
  };

  /* ───────────────────────── params ───────────────────────── */

  S["params"] = {
    group: "params", featured: true,
    title: {en: "Disclosed parameter counts of landmark models, 1989–2026", uk: "Розкрита кількість параметрів знакових моделей, 1989–2026"},
    unit: {en: "parameters (total)", uk: "параметрів (усього)"}, scale: "log",
    what: {
      en: "Model size grew about 10-million-fold from LeNet-era networks to trillion-parameter mixture-of-experts models. Dense models plateaued near 0.5T (PaLM 540B, 2022; Llama 3.1 405B, 2024); growth since 2021 has come from sparse MoE models that activate only 2–5% of their weights per token.",
      uk: "Розмір моделей зріс приблизно в 10 мільйонів разів: від мереж епохи LeNet до трильйонних моделей типу «суміш експертів» (MoE). Щільні моделі вперлися в ~0,5 трлн (PaLM 540B, 2022; Llama 3.1 405B, 2024); з 2021 року зростання дають розріджені MoE-моделі, які на кожен токен активують лише 2–5 % своїх ваг."
    },
    caveat: {
      en: "Only developer-disclosed values are plotted. GPT-4, Claude, Gemini and other closed models are undisclosed (the \"1.8T\" GPT-4 figure is a rumour) and are not shown. Total and active parameters are different quantities: do not compare an MoE total with a dense count. The AI Index 2026 notes that reported counts have stayed near 1 trillion for three years.",
      uk: "Показано лише значення, розкриті розробниками. Розмір GPT-4, Claude, Gemini та інших закритих моделей не розкрито («1,8 трлн» для GPT-4 — чутка), тож їх немає на графіку. Загальна й активна кількість параметрів — різні величини: не порівнюйте загальний розмір MoE зі щільною моделлю. AI Index 2026 зауважує, що оголошувані розміри три роки тримаються біля 1 трлн."
    },
    points: [
      {t: 1989.953, date: "1989-12", label: "Zip-code CNN (LeCun et al.)", labelUk: "CNN для поштових індексів (Лекун та ін.)", value: 9.8e3, est: false, sources: ["S-R6-01"]},
      {t: 1998.871, date: "1998-11", label: "LeNet-5 (~60k trainable parameters)", labelUk: "LeNet-5 (~60 тис. параметрів для навчання)", value: 6e4, est: false, sources: ["S-R6-01"]},
      {t: 2012.707, date: "2012-09", label: "AlexNet (\"60 million parameters\")", labelUk: "AlexNet («60 мільйонів параметрів»)", value: 6e7, est: false, sources: ["S-R6-16"]},
      {t: 2014.704, date: "2014-09", label: "VGG-16 (Oxford)", labelUk: "VGG-16 (Оксфорд)", value: 1.38e8, est: false, sources: ["S-R6-01"]},
      {t: 2017.060, date: "2017-01-23", label: "Sparsely-gated MoE LSTM (Shazeer et al.): up to 137B, the first giant sparse model", labelUk: "Розріджено-керована MoE LSTM (Шазір та ін.): до 137B, перша гігантська розріджена модель", value: 1.37e11, est: false, sources: ["S-R6-13"]},
      {t: 2017.452, date: "2017-06", label: "Transformer (big)", labelUk: "Transformer (велика)", value: 2.13e8, est: false, sources: ["S-R6-01"]},
      {t: 2018.452, date: "2018-06", label: "GPT-1", value: 1.17e8, est: false, sources: ["S-R6-01"]},
      {t: 2018.786, date: "2018-10", label: "BERT-Large", value: 3.4e8, est: false, sources: ["S-R6-01"]},
      {t: 2019.121, date: "2019-02-14", label: "GPT-2", value: 1.5e9, est: false, sources: ["S-R6-01"]},
      {t: 2019.704, date: "2019-09", label: "Megatron-LM (NVIDIA)", value: 8.3e9, est: false, sources: ["S-R6-01"]},
      {t: 2019.786, date: "2019-10", label: "T5-11B (Google)", value: 1.1e10, est: false, sources: ["S-R6-01"]},
      {t: 2020.118, date: "2020-02-13", label: "Turing-NLG (Microsoft)", value: 1.7e10, est: false, sources: ["S-R6-01"]},
      {t: 2020.405, date: "2020-05-28", label: "GPT-3 (\"10x more than any previous non-sparse language model\")", labelUk: "GPT-3 («у 10 разів більше за будь-яку попередню нерозріджену мовну модель»)", value: 1.75e11, est: false, sources: ["S-R6-07"]},
      {t: 2020.496, date: "2020-06-30", label: "GShard MoE (Google): beyond 600B, 2,048 TPU v3 for 4 days", labelUk: "GShard MoE (Google): понад 600B, 2 048 TPU v3 за 4 дні", value: 6e11, est: false, sources: ["S-R6-14"]},
      {t: 2021.027, date: "2021-01-11", label: "Switch-C (Google): 1.571T sparse MoE", labelUk: "Switch-C (Google): розріджена MoE на 1,571T", value: 1.571e12, est: false, sources: ["S-R6-01"]},
      {t: 2021.775, date: "2021-10-11", label: "Megatron-Turing NLG (dense)", labelUk: "Megatron-Turing NLG (щільна)", value: 5.3e11, est: false, sources: ["S-R6-01"]},
      {t: 2021.948, date: "2021-12-13", label: "GLaM (Google): 1.2T MoE, 1/3 of GPT-3's training energy", labelUk: "GLaM (Google): 1.2T MoE, 1/3 енергії навчання GPT-3", value: 1.2e12, est: false, sources: ["S-R6-15"]},
      {t: 2022.238, date: "2022-03-29", label: "Chinchilla: deliberately smaller (70B), trained on 4× more data", labelUk: "Chinchilla: навмисно менша (70B), навчена на 4× більшому обсязі даних", value: 7e10, est: false, sources: ["S-R6-01"]},
      {t: 2022.255, date: "2022-04-04", label: "PaLM 540B: largest dense model with a disclosed size", labelUk: "PaLM 540B: найбільша щільна модель із розкритим розміром", value: 5.4e11, est: false, sources: ["S-R6-01"]},
      {t: 2024.559, date: "2024-07-23", label: "Llama 3.1 405B (dense, open weights)", labelUk: "Llama 3.1 405B (щільна, відкриті ваги)", value: 4.05e11, est: false, sources: ["S-R6-01"]},
      {t: 2024.986, date: "2024-12-26", label: "DeepSeek-V3: 671B total / 37B active", labelUk: "DeepSeek-V3: 671B загалом / 37B активних", value: 6.71e11, est: false, sources: ["S-R6-01"]},
      {t: 2025.258, date: "2025-04-05", label: "Llama 4 Behemoth (preview; never released): ~2T total / 288B active", labelUk: "Llama 4 Behemoth (preview; так і не випущена): ~2T загалом / 288B активних", value: 2e12, est: false, sources: ["S-R6-09"]},
      {t: 2025.523, date: "2025-07-11", label: "Kimi K2 (Moonshot): 1T total / 32B active, open weights", labelUk: "Kimi K2 (Moonshot): 1T загалом / 32B активних, відкриті ваги", value: 1e12, est: false, sources: ["S-R6-01"]},
      {t: 2026.310, date: "2026-04-24", label: "DeepSeek-V4-Pro: 1.6T total / 49B active, MIT licence", labelUk: "DeepSeek-V4-Pro: 1.6T загалом / 49B активних, ліцензія MIT", value: 1.6e12, est: false, sources: ["S-R6-11"]},
      {t: 2026.537, date: "2026-07-16", label: "Kimi K3 (Moonshot): 2.8T total / 104B active, 896 experts. Largest disclosed open-weight model as of Oct 2026", labelUk: "Kimi K3 (Moonshot): 2.8T загалом / 104B активних, 896 експертів. Найбільша розкрита модель із відкритими вагами станом на жовтень 2026", value: 2.8e12, est: false, sources: ["S-R6-10"]},
      {t: 2026.611, date: "2026-08-12", label: "Qwen3.8-2.4T-A95B (Alibaba): 2.4T total / 95B active, open weights", labelUk: "Qwen3.8-2.4T-A95B (Alibaba): 2.4T загалом / 95B активних, відкриті ваги", value: 2.4e12, est: false, sources: ["S-R6-12"]}
    ],
    reference: null
  };

  /* ───────────────────────── benchmarks ───────────────────────── */

  S["imagenet-error"] = {
    group: "benchmarks", featured: false,
    title: {en: "ImageNet (ILSVRC) winners: top-5 error, 2010–2017", uk: "Переможці ImageNet (ILSVRC): top-5 помилка, 2010–2017"},
    unit: {en: "% top-5 error (lower is better)", uk: "% top-5 помилки (менше — краще)"}, scale: "linear",
    what: {
      en: "The deep-learning break. Error fell slowly with hand-engineered features (28.2% → 25.8%), then collapsed when AlexNet's GPU-trained CNN won in 2012 by about 10 points. It passed the oft-quoted human 5.1% in 2015 and reached 2.25% in the final challenge of 2017.",
      uk: "Прорив глибинного навчання. З ручними ознаками помилка падала повільно (28,2 % → 25,8 %), а 2012 року обвалилася, коли згорткова мережа AlexNet, навчена на GPU, виграла з відривом близько 10 пунктів. 2015 року моделі перевершили часто цитовані «людські» 5,1 %, а в останньому змаганні 2017 року дійшли до 2,25 %."
    },
    caveat: {
      en: "The human 5.1% is one trained annotator, Andrej Karpathy, on 1,500 test images; a second, less-trained annotator scored about 12%. Winning entries are ensembles; the first published result below 5.1% was Microsoft's PReLU-net (4.94%, Feb 2015), outside the competition. From 2014 the task is classification + localisation, but the metric plotted is still classification top-5 error.",
      uk: "«Людські» 5,1 % — результат одного тренованого анотатора, Андрія Карпатого, на 1 500 тестових зображеннях; другий, менш тренований, помилявся приблизно у 12 %. Переможні роботи — ансамблі; перший опублікований результат нижче 5,1 % належить PReLU-net від Microsoft (4,94 %, лютий 2015) поза змаганням. З 2014 року завдання — класифікація + локалізація, але на графіку лишається top-5 помилка класифікації."
    },
    points: [
      {t: 2010.500, date: "2010", label: "NEC-UIUC (SIFT/LBP features + SVM)", labelUk: "NEC-UIUC (ознаки SIFT/LBP + SVM)", value: 28.2, est: false, sources: ["S-R6-16"]},
      {t: 2011.500, date: "2011", label: "XRCE (Fisher vectors)", labelUk: "XRCE (вектори Фішера)", value: 25.8, est: false, sources: ["S-R6-16"]},
      {t: 2012.500, date: "2012", label: "SuperVision / AlexNet (U. Toronto; 16.4% without extra data)", labelUk: "SuperVision / AlexNet (Торонтський університет; 16,4 % без додаткових даних)", value: 15.3, est: false, sources: ["S-R6-16"]},
      {t: 2013.500, date: "2013", label: "Clarifai (CNN ensemble)", labelUk: "Clarifai (ансамбль CNN)", value: 11.2, est: false, sources: ["S-R6-16"]},
      {t: 2014.500, date: "2014", label: "GoogLeNet (22-layer Inception)", labelUk: "GoogLeNet (22-шаровий Inception)", value: 6.66, est: false, sources: ["S-R6-16", "S-R6-17"]},
      {t: 2015.099, date: "2015-02-06", label: "PReLU-net (He et al., Microsoft): first published result below 5.1%, outside the competition", labelUk: "PReLU-net (Хе та ін., Microsoft): перший опублікований результат нижче 5,1 %, поза змаганням", value: 4.94, est: false, sources: ["S-R6-18"]},
      {t: 2015.500, date: "2015", label: "MSRA ResNet (152 layers)", labelUk: "MSRA ResNet (152 шари)", value: 3.57, est: false, sources: ["S-R6-16"]},
      {t: 2016.500, date: "2016", label: "Trimps-Soushen ensemble", labelUk: "Ансамбль Trimps-Soushen", value: 2.99, est: false, sources: ["S-R6-16"]},
      {t: 2017.500, date: "2017", label: "WMW, Squeeze-and-Excitation networks (final ILSVRC)", labelUk: "WMW, мережі Squeeze-and-Excitation (останній ILSVRC)", value: 2.25, est: false, sources: ["S-R6-16"]}
    ],
    reference: [
      {label: {en: "One trained annotator (A. Karpathy, 1,500 images), Sept 2014", uk: "Один тренований анотатор (А. Карпатий, 1 500 зображень), вересень 2014"}, value: 5.1}
    ]
  };

  S["mmlu"] = {
    group: "benchmarks", featured: false,
    title: {en: "MMLU: best reported score", uk: "MMLU: найкращий заявлений результат"},
    unit: {en: "% accuracy (57 subjects; random = 25%)", uk: "% правильних відповідей (57 предметів; випадково = 25 %)"}, scale: "linear",
    what: {
      en: "The original general-knowledge exam for LLMs, released in September 2020. It went from 43.9% (GPT-3) to above the estimated expert level of 89.8% within about three to four years, then was effectively retired; labs now report MMLU-Pro or multilingual MMLU instead.",
      uk: "Перший «іспит на загальні знання» для LLM, випущений у вересні 2020 року. За три-чотири роки результат виріс із 43,9 % (GPT-3) до рівня вище за оцінений експертний (89,8 %), після чого бенчмарк фактично відійшов у минуле: лабораторії тепер звітують MMLU-Pro або багатомовний MMLU."
    },
    caveat: {
      en: "All rows are developer self-reports and settings differ (5-shot, 0-shot chain of thought, Gemini Ultra's CoT@32 with 32 sampled chains). The 89.8% expert level is an estimate from the benchmark paper, not a measured panel; the measured crowd baseline is 34.5%. About 6.5% of questions contain errors (Gema et al. 2024), so scores above ~90% are within label noise. The last plain-MMLU report from a major lab found is o3 (Apr 2025).",
      uk: "Усі значення — самозвіти розробників, і налаштування різняться (5-shot, 0-shot із ланцюжком міркувань, CoT@32 у Gemini Ultra з 32 вибірковими ланцюжками). Експертний рівень 89,8 % — оцінка авторів бенчмарка, а не виміряна панель; виміряний результат звичайних людей — 34,5 %. Близько 6,5 % запитань містять помилки (Gema et al., 2024), тож результати вище ~90 % лежать у межах шуму розмітки. Останній знайдений звіт великої лабораторії за звичайним MMLU — o3 (квітень 2025)."
    },
    points: [
      {t: 2020.685, date: "2020-09-07", label: "Benchmark released: GPT-3 175B, 5-shot (zero-shot 37.7%)", labelUk: "Бенчмарк опубліковано: GPT-3 175B, 5-shot (zero-shot 37,7 %)", value: 43.9, est: false, sources: ["S-R6-21"]},
      {t: 2020.685, date: "2020-09-07", label: "UnifiedQA (T5 fine-tuned on other QA data), in the MMLU paper", labelUk: "UnifiedQA (T5, донавчена на інших QA-даних), у статті про MMLU", value: 48.9, est: false, sources: ["S-R6-21"]},
      {t: 2021.934, date: "2021-12-08", label: "Gopher 280B (DeepMind), 5-shot", value: 60.0, est: false, sources: ["S-R6-110"]},
      {t: 2022.238, date: "2022-03-29", label: "Chinchilla 70B (DeepMind), 5-shot", value: 67.6, est: false, sources: ["S-R6-110"]},
      {t: 2022.258, date: "2022-04-05", label: "PaLM 540B (Google), 5-shot", value: 69.3, est: false, sources: ["S-R6-110"]},
      {t: 2022.800, date: "2022-10-20", label: "Flan-PaLM 540B, 5-shot CoT + self-consistency (72.2% direct)", labelUk: "Flan-PaLM 540B, 5-shot CoT + самоузгодженість (72,2 % напряму)", value: 75.2, est: false, sources: ["S-R6-110"]},
      {t: 2023.197, date: "2023-03-14", label: "GPT-4, 5-shot", value: 86.4, est: false, sources: ["S-R6-111"]},
      {t: 2023.929, date: "2023-12-06", label: "Gemini Ultra, CoT@32 (5-shot: 83.7%; GPT-4 under the same CoT@32: 87.3%)", labelUk: "Gemini Ultra, CoT@32 (5-shot: 83,7 %; GPT-4 за того самого CoT@32: 87,3 %)", value: 90.0, est: false, sources: ["S-R6-113"]},
      {t: 2024.173, date: "2024-03-04", label: "Claude 3 Opus, 5-shot", value: 86.8, est: false, sources: ["S-R6-112"]},
      {t: 2024.364, date: "2024-05-13", label: "GPT-4o, 0-shot CoT", value: 88.7, est: false, sources: ["S-R6-111"]},
      {t: 2024.468, date: "2024-06-20", label: "Claude 3.5 Sonnet, 5-shot CoT (plain 5-shot 88.7%)", labelUk: "Claude 3.5 Sonnet, 5-shot CoT (звичайний 5-shot 88,7 %)", value: 90.4, est: false, sources: ["S-R6-112"]},
      {t: 2024.699, date: "2024-09-12", label: "o1 family, pass@1 (OpenAI's table lists 92.3 and 90.8 for o1 / o1-preview; attribution ambiguous)", labelUk: "Сімейство o1, pass@1 (у таблиці OpenAI 92,3 і 90,8 для o1 / o1-preview; атрибуція неоднозначна)", value: 92.3, est: false, sources: ["S-R6-111"]},
      {t: 2025.288, date: "2025-04-16", label: "o3 (high), 0-shot CoT (OpenAI simple-evals). Last plain-MMLU record found", labelUk: "o3 (high), 0-shot CoT (OpenAI simple-evals). Останній знайдений рекорд на звичайному MMLU", value: 93.3, est: false, sources: ["S-R6-111"]}
    ],
    reference: [
      {label: {en: "Estimated expert level (authors' estimate)", uk: "Оцінений експертний рівень (оцінка авторів)"}, value: 89.8},
      {label: {en: "Unspecialised humans (Mechanical Turk)", uk: "Люди без спеціалізації (Mechanical Turk)"}, value: 34.5}
    ]
  };

  S["gpqa"] = {
    group: "benchmarks", featured: true,
    title: {en: "GPQA Diamond: best developer-reported score", uk: "GPQA Diamond: найкращий результат за звітами розробників"},
    unit: {en: "% accuracy (198 PhD-level science questions; random = 25%)", uk: "% правильних відповідей (198 наукових запитань рівня PhD; випадково = 25 %)"}, scale: "linear",
    what: {
      en: "A Google-proof PhD-level science test, released in November 2023 with GPT-4 at 38.8%. Models passed OpenAI's recruited-PhD reference (~69.7%) within 10 months and the paper's Diamond expert figure (81.3%) within about 13 months, reaching 96% by September 2026; the remaining errors are close to the share of flawed or ambiguous questions.",
      uk: "«Захищений від Google» науковий тест рівня PhD, випущений у листопаді 2023 року, коли GPT-4 набирала 38,8 %. За 10 місяців моделі перевершили рівень найнятих OpenAI докторів наук (~69,7 %), а за ~13 місяців — експертний показник Diamond зі статті (81,3 %). У вересні 2026 року результат сягнув 96 %; решта помилок близька до частки хибних або неоднозначних запитань."
    },
    caveat: {
      en: "Developer self-reports; settings differ (pass@1 vs consensus over 64 samples vs maj@32; no tools throughout). See the independent Epoch AI series, which often runs 1–7 points lower. The Diamond expert figure (81.3%) is biased upward by construction (questions both experts got right); OpenAI's ~69.7% PhD panel appears only in a chart image. The score of 2 Sept 2026 for Gemini 3.8 Flash is as quoted in OpenAI's comparison table (second-hand).",
      uk: "Самозвіти розробників; налаштування різняться (pass@1, консенсус із 64 спроб або maj@32; скрізь без інструментів). Порівняйте з незалежною серією Epoch AI, яка часто на 1–7 пунктів нижча. Експертний показник Diamond (81,3 %) завищений самою побудовою набору (лишили запитання, на які обидва експерти відповіли правильно); ~69,7 % панелі докторів наук від OpenAI відомі лише з графіка. Результат Gemini 3.8 Flash від 2 вересня 2026 узято з порівняльної таблиці OpenAI (з других рук)."
    },
    points: [
      {t: 2023.885, date: "2023-11-20", label: "Benchmark released: GPT-4, few-shot CoT (paper baseline)", labelUk: "Бенчмарк опубліковано: GPT-4, few-shot CoT (базовий результат зі статті)", value: 38.8, est: false, sources: ["S-R6-22"]},
      {t: 2024.173, date: "2024-03-04", label: "Claude 3 Opus, 0-shot CoT", value: 50.4, est: false, sources: ["S-R6-112"]},
      {t: 2024.364, date: "2024-05-13", label: "GPT-4o, 0-shot CoT", value: 53.6, est: false, sources: ["S-R6-111"]},
      {t: 2024.468, date: "2024-06-20", label: "Claude 3.5 Sonnet, 0-shot CoT (67.2% with maj@32)", labelUk: "Claude 3.5 Sonnet, 0-shot CoT (67,2 % з maj@32)", value: 59.4, est: false, sources: ["S-R6-112"]},
      {t: 2024.699, date: "2024-09-12", label: "o1-preview, pass@1 (78.3% cons@64). OpenAI: first model to beat its recruited PhD experts", labelUk: "o1-preview, pass@1 (78,3 % cons@64). OpenAI: перша модель, що перевершила залучених нею експертів із PhD", value: 73.3, est: false, sources: ["S-R6-111"]},
      {t: 2024.929, date: "2024-12-05", label: "o1, pass@1 (78.0% cons@64)", labelUk: "o1, pass@1 (78,0 % cons@64)", value: 77.3, est: false, sources: ["S-R6-111"]},
      {t: 2024.970, date: "2024-12-20", label: "o3-preview (announced, unreleased model; setting not detailed). First score above the 81.3% expert figure", labelUk: "o3-preview (анонсована, невипущена модель; налаштування не деталізовано). Перший результат понад експертні 81,3 %", value: 87.7, est: false, sources: ["S-R6-118", "S-R6-23"]},
      {t: 2025.227, date: "2025-03-25", label: "Gemini 2.5 Pro, single attempt. First released single-attempt score above 81.3%", labelUk: "Gemini 2.5 Pro, одна спроба. Перший результат випущеної моделі за одну спробу понад 81,3 %", value: 84.0, est: false, sources: ["S-R6-113"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5 pro, no tools", labelUk: "GPT-5 pro, без інструментів", value: 88.4, est: false, sources: ["S-R6-111"]},
      {t: 2025.879, date: "2025-11-18", label: "Gemini 3 Deep Think, no tools (Gemini 3 Pro 91.9%)", labelUk: "Gemini 3 Deep Think, без інструментів (Gemini 3 Pro 91,9 %)", value: 93.8, est: false, sources: ["S-R6-113"]},
      {t: 2026.134, date: "2026-02-19", label: "Gemini 3.1 Pro (Thinking High)", value: 94.3, est: false, sources: ["S-R6-113"]},
      {t: 2026.173, date: "2026-03-05", label: "GPT-5.4 Pro", value: 94.4, est: false, sources: ["S-R6-111"]},
      {t: 2026.263, date: "2026-04-07", label: "Claude Mythos Preview (limited access, not generally available)", labelUk: "Claude Mythos Preview (обмежений доступ, не загальнодоступна)", value: 94.6, est: false, sources: ["S-R6-112"]},
      {t: 2026.668, date: "2026-09-02", label: "Gemini 3.8 Flash (as quoted in OpenAI's GPT-6 Astra comparison table)", labelUk: "Gemini 3.8 Flash (за таблицею порівняння в дописі OpenAI про GPT-6 Astra)", value: 95.3, est: false, sources: ["S-R6-111"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra, OpenAI-reported (94.9% at a lower-cost setting; Epoch-run 95.8%)", labelUk: "GPT-6 Astra, за даними OpenAI (94,9 % у дешевшому режимі; прогін Epoch 95,8 %)", value: 96.0, est: false, sources: ["S-R6-111"]}
    ],
    reference: [
      {label: {en: "Diamond expert validators (paper; selection-biased)", uk: "Експерти-валідатори Diamond (стаття; упереджений відбір)"}, value: 81.3},
      {label: {en: "OpenAI's recruited PhD experts (chart image only)", uk: "Найняті OpenAI доктори наук (лише з графіка)"}, value: 69.7},
      {label: {en: "Non-expert validators with web access", uk: "Валідатори без профільної експертизи, з доступом до вебу"}, value: 22.1}
    ]
  };

  S["gpqa-independent"] = {
    group: "benchmarks", featured: false,
    title: {en: "GPQA Diamond: independent runs (Epoch AI)", uk: "GPQA Diamond: незалежні заміри (Epoch AI)"},
    unit: {en: "% accuracy, Epoch AI's own runs", uk: "% правильних відповідей, власні заміри Epoch AI"}, scale: "linear",
    what: {
      en: "The same climb measured uniformly by a third party: from 35.7% (GPT-4) to 95.8% (GPT-6 Astra). It confirms that the developer curve is real, not an artefact of prompting.",
      uk: "Той самий підйом, виміряний однаково третьою стороною: від 35,7 % (GPT-4) до 95,8 % (GPT-6 Astra). Це підтверджує, що крива розробників справжня, а не наслідок вдалих промптів."
    },
    caveat: {
      en: "Zero-shot \"think step by step\", strict answer format, best across Epoch's scorers; standard error ±1.3–2.7 points. Dates are model release dates. About three dozen recent Epoch rows lack public logs.",
      uk: "Zero-shot із «міркуй крок за кроком», строгий формат відповіді, найкраще з оцінювачів Epoch; стандартна похибка ±1,3–2,7 пункту. Дати — дати релізу моделей. Близько трьох десятків нещодавніх рядків Epoch не мають публічних логів."
    },
    points: [
      {t: 2023.197, date: "2023-03-14", label: "GPT-4 (0314; model predates the benchmark)", labelUk: "GPT-4 (0314; модель старша за бенчмарк)", value: 35.7, est: false, sources: ["S-R6-20"]},
      {t: 2023.847, date: "2023-11-06", label: "GPT-4 Turbo (1106)", value: 42.4, est: false, sources: ["S-R6-20"]},
      {t: 2024.162, date: "2024-02-29", label: "Claude 3 Opus", value: 47.2, est: false, sources: ["S-R6-20"]},
      {t: 2024.468, date: "2024-06-20", label: "Claude 3.5 Sonnet", value: 54.0, est: false, sources: ["S-R6-20"]},
      {t: 2024.699, date: "2024-09-12", label: "o1-mini (high)", value: 62.4, est: false, sources: ["S-R6-20"]},
      {t: 2024.962, date: "2024-12-17", label: "o1 (high)", value: 76.8, est: false, sources: ["S-R6-20"]},
      {t: 2025.148, date: "2025-02-24", label: "Claude 3.7 Sonnet (64K thinking)", value: 79.7, est: false, sources: ["S-R6-20"]},
      {t: 2025.227, date: "2025-03-25", label: "Gemini 2.5 Pro (exp.). First Epoch-run score above the 81.3% expert figure", labelUk: "Gemini 2.5 Pro (exp.). Перший результат прогону Epoch понад експертні 81,3 %", value: 83.8, est: false, sources: ["S-R6-20"]},
      {t: 2025.518, date: "2025-07-09", label: "Grok 4", value: 87.0, est: false, sources: ["S-R6-20"]},
      {t: 2025.879, date: "2025-11-18", label: "Gemini 3 Pro (preview)", value: 92.6, est: false, sources: ["S-R6-20"]},
      {t: 2026.134, date: "2026-02-19", label: "Gemini 3.1 Pro (high)", value: 94.4, est: false, sources: ["S-R6-20"]},
      {t: 2026.173, date: "2026-03-05", label: "GPT-5.4 Pro (x-high)", value: 94.6, est: false, sources: ["S-R6-20"]},
      {t: 2026.668, date: "2026-09-02", label: "Gemini 3.8 Flash (high)", value: 95.4, est: false, sources: ["S-R6-20"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra (max), ±1.4. Best Epoch run as of Oct 2026 (Claude Sonnet 5.5 95.6%, GPT-6.1 Sol 95.4%)", labelUk: "GPT-6 Astra (max), ±1,4. Найкращий прогін Epoch станом на жовтень 2026 (Claude Sonnet 5.5 95,6 %, GPT-6.1 Sol 95,4 %)", value: 95.8, est: false, sources: ["S-R6-20"]}
    ],
    reference: [
      {label: {en: "Diamond expert validators (paper; selection-biased)", uk: "Експерти-валідатори Diamond (стаття; упереджений відбір)"}, value: 81.3},
      {label: {en: "Non-expert validators with web access", uk: "Валідатори без профільної експертизи, з доступом до вебу"}, value: 22.1}
    ]
  };

  S["swebench"] = {
    group: "benchmarks", featured: false,
    title: {en: "SWE-bench Verified: best developer-reported score", uk: "SWE-bench Verified: найкращий результат за звітами розробників"},
    unit: {en: "% of 500 real GitHub issues resolved", uk: "% розв'язаних реальних GitHub-задач із 500"}, scale: "linear",
    what: {
      en: "How quickly models learned to fix real bugs in real repositories. The original SWE-bench (Oct 2023) was about 2% solved. On the cleaned Verified subset, scores went from 33% at launch (Aug 2024) to 80.9% (Nov 2025) and 87.6% for a generally available model (Apr 2026). OpenAI stopped reporting it in February 2026 (contamination, flawed tests).",
      uk: "Як швидко моделі навчилися виправляти справжні помилки у справжніх репозиторіях. Початковий SWE-bench (жовтень 2023) розв'язували приблизно на 2 %. На очищеній підмножині Verified результат зріс із 33 % на старті (серпень 2024) до 80,9 % (листопад 2025) і 87,6 % для загальнодоступної моделі (квітень 2026). У лютому 2026 року OpenAI припинила звітувати за ним (контамінація, хибні тести)."
    },
    caveat: {
      en: "Scores depend heavily on scaffold, number of attempts and test-time compute; values are single-attempt or trial-averaged. There is no human baseline: every task has a human-written gold patch. OpenAI's Feb 2026 audit found flawed tests in at least 59.4% of an audited subset of commonly failed tasks and signs of contamination; Epoch rates the dataset flawed (est. 5–10% error rate). Claude 3.7 Sonnet: 63.7% on the 489 runnable tasks (≈62.3% of all 500). The 93.9% is a limited-access model with a memorisation caveat. The successor is SWE-bench Pro (best ~80%, mid-2026).",
      uk: "Результати сильно залежать від тестового середовища (harness), кількості спроб і обчислень під час відповіді; наведено результати з однієї спроби або усереднені. Людського орієнтира немає: кожна задача має еталонний патч, написаний людиною. Аудит OpenAI у лютому 2026 року виявив хибні тести щонайменше в 59,4 % перевіреної підмножини часто провалюваних задач і ознаки контамінації; Epoch вважає набір дефектним (оц. 5–10 % помилок). Claude 3.7 Sonnet: 63,7 % на 489 задачах, що запустилися (≈62,3 % від усіх 500). 93,9 % — модель з обмеженим доступом із застереженням про запам'ятовування. Наступник — SWE-bench Pro (найкраще ~80 %, середина 2026)."
    },
    points: [
      {t: 2023.773, date: "2023-10-10", label: "Context: original SWE-bench (2,294 tasks), Claude 2 with retrieval, in the benchmark paper", labelUk: "Контекст: оригінальний SWE-bench (2 294 задачі), Claude 2 з пошуком, у статті про бенчмарк", value: 1.96, est: false, sources: ["S-R6-116"]},
      {t: 2024.616, date: "2024-08-13", label: "SWE-bench Verified released: GPT-4o + Agentless scaffold", labelUk: "SWE-bench Verified опубліковано: GPT-4o + скафолд Agentless", value: 33.2, est: false, sources: ["S-R6-25"]},
      {t: 2024.808, date: "2024-10-22", label: "Claude 3.5 Sonnet (upgraded), simple bash + edit tool scaffold", labelUk: "Claude 3.5 Sonnet (оновлена), простий скафолд bash + інструмент редагування", value: 49.0, est: false, sources: ["S-R6-112"]},
      {t: 2024.970, date: "2024-12-20", label: "o3-preview (announced, unreleased model; setting not detailed)", labelUk: "o3-preview (анонсована, невипущена модель; налаштування не деталізовано)", value: 71.7, est: false, sources: ["S-R6-118"]},
      {t: 2025.148, date: "2025-02-24", label: "Claude 3.7 Sonnet: 63.7% on the 489 runnable tasks (≈62.3% of all 500; 70.3% with parallel attempts)", labelUk: "Claude 3.7 Sonnet: 63,7 % на 489 придатних задачах (≈62,3 % від усіх 500; 70,3 % із паралельними спробами)", value: 63.7, est: false, sources: ["S-R6-112", "S-AUD-17"]},
      {t: 2025.386, date: "2025-05-22", label: "Claude Sonnet 4 (Opus 4: 72.5%)", labelUk: "Claude Sonnet 4 (Opus 4: 72,5 %)", value: 72.7, est: false, sources: ["S-R6-112"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5 (thinking, high effort), n=477 subset", labelUk: "GPT-5 (thinking, high effort), підмножина n=477", value: 74.9, est: false, sources: ["S-R6-111"]},
      {t: 2025.742, date: "2025-09-29", label: "Claude Sonnet 4.5, 10-trial average", labelUk: "Claude Sonnet 4.5, середнє з 10 прогонів", value: 77.2, est: false, sources: ["S-R6-112"]},
      {t: 2025.882, date: "2025-11-19", label: "GPT-5.1-Codex-Max (x-high effort)", value: 77.9, est: false, sources: ["S-R6-111"]},
      {t: 2025.896, date: "2025-11-24", label: "Claude Opus 4.5, 5-trial average", labelUk: "Claude Opus 4.5, середнє з 5 прогонів", value: 80.9, est: false, sources: ["S-R6-112"]},
      {t: 2026.263, date: "2026-04-07", label: "Claude Mythos Preview (limited access; memorisation caveat)", labelUk: "Claude Mythos Preview (обмежений доступ; застереження щодо запам'ятовування)", value: 93.9, est: false, sources: ["S-R6-112"]},
      {t: 2026.288, date: "2026-04-16", label: "Claude Opus 4.7 (generally available; same caveat). Last major-lab Verified report found; OpenAI stopped reporting it in Feb 2026", labelUk: "Claude Opus 4.7 (загальнодоступна; те саме застереження). Останній знайдений звіт великої лабораторії на Verified; OpenAI припинила звітувати за ним у лютому 2026", value: 87.6, est: false, sources: ["S-R6-112"]}
    ],
    reference: null
  };

  S["swebench-independent"] = {
    group: "benchmarks", featured: false,
    title: {en: "SWE-bench Verified: independent runs (Epoch AI and the official leaderboard)", uk: "SWE-bench Verified: незалежні заміри (Epoch AI і офіційний лідерборд)"},
    unit: {en: "% resolved, Epoch AI's simple tool loop (484 of 500 tasks) unless marked", uk: "% розв'язаних задач, просте тестове середовище (harness) Epoch AI (484 із 500), якщо не вказано інше"}, scale: "linear",
    what: {
      en: "A uniform third-party measurement, running a few points below vendor claims and topping out at 83.5% (Claude Opus 4.7, April 2026).",
      uk: "Однакове вимірювання третьою стороною: на кілька пунктів нижче за заяви виробників, з максимумом 83,5 % (Claude Opus 4.7, квітень 2026)."
    },
    caveat: {
      en: "Epoch's last Verified run is dated 25 June 2026. The official leaderboard's bash-only track uses the mini-SWE-agent harness for all models. No human baseline exists.",
      uk: "Останній замір Epoch на Verified датовано 25 червня 2026 року. Трек «лише bash» офіційного лідерборду використовує тестове середовище (harness) mini-SWE-agent для всіх моделей. Людського орієнтира немає."
    },
    points: [
      {t: 2024.888, date: "2024-11-20", label: "GPT-4o (Nov 2024)", labelUk: "GPT-4o (листопад 2024)", value: 31.0, est: false, sources: ["S-R6-20"]},
      {t: 2025.148, date: "2025-02-24", label: "Claude 3.7 Sonnet", value: 61.0, est: false, sources: ["S-R6-20"]},
      {t: 2025.288, date: "2025-04-16", label: "o3 (medium)", value: 62.3, est: false, sources: ["S-R6-20"]},
      {t: 2025.386, date: "2025-05-22", label: "Claude Opus 4", value: 70.7, est: false, sources: ["S-R6-20"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5 (high)", value: 73.6, est: false, sources: ["S-R6-20"]},
      {t: 2025.896, date: "2025-11-24", label: "Claude Opus 4.5", value: 76.7, est: false, sources: ["S-R6-20"]},
      {t: 2026.096, date: "2026-02-05", label: "Claude Opus 4.6", value: 78.7, est: false, sources: ["S-R6-20"]},
      {t: 2026.129, date: "2026-02-17", label: "Official leaderboard, bash-only track (mini-SWE-agent v2): Claude Opus 4.5 (high)", labelUk: "Офіційний лідерборд, трек «лише bash» (mini-SWE-agent v2): Claude Opus 4.5 (high)", value: 76.8, est: false, sources: ["S-R6-117", "S-R6-23"]},
      {t: 2026.288, date: "2026-04-16", label: "Claude Opus 4.7 (max), ±1.7. Best independent score as of Oct 2026", labelUk: "Claude Opus 4.7 (max), ±1,7. Найкращий незалежний результат станом на жовтень 2026", value: 83.5, est: false, sources: ["S-R6-20"]}
    ],
    reference: null
  };

  S["claude-swebench"] = {
    group: "benchmarks", featured: false,
    title: {en: "Claude on SWE-bench Verified (Anthropic-reported)", uk: "Claude на SWE-bench Verified (за звітами Anthropic)"},
    unit: {en: "% of tasks resolved", uk: "% розв'язаних задач"}, scale: "linear",
    what: {
      en: "How fast one lineage's ability to fix real GitHub issues rose: 49% to about 81% in 16 months, 87.6% for Claude Opus 4.7, and 93.9% for the restricted Mythos Preview.",
      uk: "Як швидко одна лінійка моделей навчилася виправляти справжні GitHub-задачі: з 49 % до ~81 % за 16 місяців, 87,6 % у Claude Opus 4.7 і 93,9 % у Mythos Preview з обмеженим доступом."
    },
    caveat: {
      en: "Developer-reported, single-attempt pass@1 with Anthropic's bash + file-edit scaffold unless noted; parallel test-time compute scores are excluded. Claude 3.7 Sonnet: 63.7% (489 tasks). The Opus 4.7 post flags possible memorisation. From Opus 4.8 (May 2026) Anthropic reports other coding benchmarks instead.",
      uk: "Звіти розробника: одна спроба (pass@1) у тестовому середовищі (harness) Anthropic (bash + редагування файлів), якщо не вказано інше; результати з паралельними обчисленнями виключено. Claude 3.7 Sonnet: 63,7 % (489 задач). У дописі про Opus 4.7 є застереження про можливе запам'ятовування. Починаючи з Opus 4.8 (травень 2026) Anthropic звітує за іншими бенчмарками для коду."
    },
    points: [
      {t: 2024.808, date: "2024-10-22", label: "Claude 3.5 Sonnet (upgraded)", labelUk: "Claude 3.5 Sonnet (оновлена)", value: 49.0, est: false, sources: ["S-R4a-25"]},
      {t: 2025.148, date: "2025-02-24", label: "Claude 3.7 Sonnet (489-task subset)", labelUk: "Claude 3.7 Sonnet (підмножина з 489 задач)", value: 63.7, est: false, sources: ["S-R4a-27"]},
      {t: 2025.386, date: "2025-05-22", label: "Claude Sonnet 4", value: 72.7, est: false, sources: ["S-R4a-28"]},
      {t: 2025.592, date: "2025-08-05", label: "Claude Opus 4.1", value: 74.5, est: false, sources: ["S-R4a-30"]},
      {t: 2025.742, date: "2025-09-29", label: "Claude Sonnet 4.5", value: 77.2, est: false, sources: ["S-R4a-31"]},
      {t: 2025.896, date: "2025-11-24", label: "Claude Opus 4.5 (5-trial average)", labelUk: "Claude Opus 4.5 (середнє з 5 прогонів)", value: 80.9, est: false, sources: ["S-R4a-33"]},
      {t: 2026.096, date: "2026-02-05", label: "Claude Opus 4.6 (average of 25 trials)", labelUk: "Claude Opus 4.6 (середнє з 25 прогонів)", value: 80.8, est: false, sources: ["S-R4a-34", "S-R4a-36"]},
      {t: 2026.263, date: "2026-04-07", label: "Claude Mythos Preview (restricted)", labelUk: "Claude Mythos Preview (обмежений доступ)", value: 93.9, est: false, sources: ["S-R4a-36"]},
      {t: 2026.288, date: "2026-04-16", label: "Claude Opus 4.7 (best generally available Claude score; memorisation caveat)", labelUk: "Claude Opus 4.7 (найкращий результат загальнодоступної Claude; застереження щодо запам'ятовування)", value: 87.6, est: false, sources: ["S-R4a-37", "S-R6-112"]}
    ],
    reference: null
  };

  S["arc-agi-1"] = {
    group: "benchmarks", featured: false,
    title: {en: "ARC-AGI-1: best verified score", uk: "ARC-AGI-1: найкращий підтверджений результат"},
    unit: {en: "% of tasks solved (semi-private set, pass@2) unless marked", uk: "% розв'язаних задач (напівприватний набір, pass@2), якщо не вказано інше"}, scale: "linear",
    what: {
      en: "François Chollet's abstract-reasoning puzzles resisted deep learning for five years (2019–2024), then fell abruptly to test-time reasoning models: from 18% (o1-preview, Sept 2024) to 75.7–87.5% (the unreleased o3-preview, Dec 2024) and 98.5% (2026). Cost per task fell from about $4,560 to under $1.",
      uk: "Головоломки Франсуа Шолле на абстрактне міркування п'ять років (2019–2024) не піддавалися глибинному навчанню, а потім різко впали перед моделями міркування з обчисленнями під час відповіді: з 18 % (o1-preview, вересень 2024) до 75,7–87,5 % (невипущена o3-preview, грудень 2024) і 98,5 % (2026). Вартість задачі впала з ~4 560 $ до менш ніж 1 $."
    },
    caveat: {
      en: "Kaggle competition scores (private set, strict compute limits, open-source) are not comparable with ARC Prize-verified API-model scores on the semi-private set. The 75.7% / 87.5% scores belong to the never-released o3-preview; the released o3 (Apr 2025) scored 41% (low) / 53% (medium). Human panel: every task was solved by at least two people; the panel average is 64.2%.",
      uk: "Результати змагань на Kaggle (приватний набір, жорсткі обмеження обчислень, відкритий код) не можна порівнювати з перевіреними ARC Prize результатами API-моделей на напівприватному наборі. 75,7 % / 87,5 % належать так і не випущеній o3-preview; випущена o3 (квітень 2025) набрала 41 % (low) / 53 % (medium). Людська панель: кожну задачу розв'язали щонайменше двоє людей; середнє по панелі — 64,2 %."
    },
    points: [
      {t: 2019.844, date: "2019-11-05", label: "ARC released (\"On the Measure of Intelligence\", Chollet)", labelUk: "ARC опубліковано («On the Measure of Intelligence», Шолле)", value: 0, est: false, sources: ["S-R6-26"]},
      {t: 2020.500, date: "2020", label: "Kaggle Abstraction & Reasoning Challenge winner (private set, compute-limited)", labelUk: "Переможець Kaggle Abstraction & Reasoning Challenge (закритий набір, обмежені обчислення)", value: 20, est: false, sources: ["S-R6-26"]},
      {t: 2024.460, date: "2024-06-17", label: "Ryan Greenblatt, GPT-4o + program sampling (semi-private)", labelUk: "Раян Ґрінблатт, GPT-4o + вибірка програм (напівзакритий набір)", value: 43, est: false, sources: ["S-R6-26"]},
      {t: 2024.701, date: "2024-09-13", label: "o1-preview (GPT-4o 5%, Claude 3.5 Sonnet 14%)", labelUk: "o1-preview (GPT-4o 5 %, Claude 3.5 Sonnet 14 %)", value: 18, est: false, sources: ["S-R6-26"]},
      {t: 2024.932, date: "2024-12-06", label: "ARC Prize 2024 Kaggle: MindsAI 55.5% (ineligible); prize winner the ARChitects 53.5%", labelUk: "ARC Prize 2024 на Kaggle: MindsAI 55,5 % (без права на приз); переможець the ARChitects 53,5 %", value: 55.5, est: false, sources: ["S-R6-26"]},
      {t: 2024.970, date: "2024-12-20", label: "o3-preview (announced, unreleased), high-efficiency setting", labelUk: "o3-preview (анонсована, невипущена), режим високої ефективності", value: 75.7, est: false, sources: ["S-R6-26"]},
      {t: 2024.970, date: "2024-12-20", label: "o3-preview (announced, unreleased), low-efficiency setting (~172× compute, ~$4,560/task)", labelUk: "o3-preview (анонсована, невипущена), режим низької ефективності (~172× обчислень, ~4 560 $ за задачу)", value: 87.5, est: false, sources: ["S-R6-26"]},
      {t: 2025.304, date: "2025-04-22", label: "o3 (released), medium reasoning, $2.52/task (low: 41%)", labelUk: "o3 (випущена), середнє міркування, 2,52 $ за задачу (low: 41 %)", value: 53, est: false, sources: ["S-R6-26"]},
      {t: 2025.518, date: "2025-07-09", label: "Grok 4 (Thinking), $2.17/task", labelUk: "Grok 4 (Thinking), 2,17 $ за задачу", value: 66.7, est: false, sources: ["S-R6-20", "S-R6-26"]},
      {t: 2025.896, date: "2025-11-24", label: "Claude Opus 4.5 (64k thinking), $1.47/task. First released model above o3-preview's 75.7%", labelUk: "Claude Opus 4.5 (64k thinking), 1,47 $ за задачу. Перша випущена модель понад 75,7 % o3-preview", value: 80.0, est: false, sources: ["S-R6-20", "S-R6-26"]},
      {t: 2025.942, date: "2025-12-11", label: "GPT-5.2 Pro (x-high)", value: 90.5, est: false, sources: ["S-R6-20"]},
      {t: 2026.096, date: "2026-02-05", label: "Claude Opus 4.6 (120k, high)", value: 94.0, est: false, sources: ["S-R6-20"]},
      {t: 2026.134, date: "2026-02-19", label: "Gemini 3.1 Pro (preview), $0.52/task", labelUk: "Gemini 3.1 Pro (preview), 0,52 $ за задачу", value: 98.0, est: false, sources: ["S-R6-20"]},
      {t: 2026.436, date: "2026-06-09", label: "Claude Fable 5 (max); several later models tie at 98.5% (saturated)", labelUk: "Claude Fable 5 (max); кілька пізніших моделей мають ті самі 98,5 % (насичено)", value: 98.5, est: false, sources: ["S-R6-20", "S-R6-26", "S-AUD-13"]}
    ],
    reference: [
      {label: {en: "Human panel average", uk: "Середнє по людській панелі"}, value: 64.2},
      {label: {en: "Grand-prize threshold (within Kaggle limits)", uk: "Поріг головного призу (в межах обмежень Kaggle)"}, value: 85}
    ]
  };

  S["arc-agi-2"] = {
    group: "benchmarks", featured: true,
    title: {en: "ARC-AGI-2: best verified score", uk: "ARC-AGI-2: найкращий підтверджений результат"},
    unit: {en: "% of tasks solved (semi-private set, pass@2, ARC Prize-verified)", uk: "% розв'язаних задач (напівприватний набір, pass@2, перевірено ARC Prize)"}, scale: "linear",
    what: {
      en: "The harder successor, launched on 24 March 2025: pure LLMs scored 0% and reasoning systems single digits. The 85% prize line was reached by a frontier API model (GPT-5.5) in about 13 months, and 95% by September 2026 (GPT-6 Astra).",
      uk: "Складніший наступник, запущений 24 березня 2025 року: звичайні LLM набирали 0 %, системи міркування — одиниці відсотків. Призову планку 85 % передова API-модель (GPT-5.5) взяла приблизно за 13 місяців, а 95 % — у вересні 2026 року (GPT-6 Astra)."
    },
    caveat: {
      en: "Verified API-model scores are not eligible for the prize (not open-source, not Kaggle-constrained); the ARC Prize 2025 Kaggle winner (NVARC) scored 24.03% under competition limits. Human panel: every task was solved by at least two people in two attempts; the panel average is 60%. Per-task costs for GPT-6 Astra and GPT-6.1 Sol are omitted (not re-verified); the scores are verified (95.0% / 94.2%).",
      uk: "Перевірені результати API-моделей не претендують на приз (не відкритий код, не в межах Kaggle); переможець ARC Prize 2025 на Kaggle (NVARC) набрав 24,03 % у змагальних обмеженнях. Людська панель: кожну задачу розв'язали щонайменше двоє людей за дві спроби; середнє по панелі — 60 %. Вартість задачі для GPT-6 Astra і GPT-6.1 Sol не наводимо (не переперевірена); самі результати перевірені (95,0 % / 94,2 %)."
    },
    points: [
      {t: 2025.225, date: "2025-03-24", label: "Launch: o3-preview (low) ~4%; o1-pro ~1%; pure LLMs 0%", labelUk: "Запуск: o3-preview (low) ~4 %; o1-pro ~1 %; чисті LLM 0 %", value: 4, est: false, sources: ["S-R6-27"]},
      {t: 2025.288, date: "2025-04-16", label: "o3 (high)", value: 6.5, est: false, sources: ["S-R6-20"]},
      {t: 2025.386, date: "2025-05-22", label: "Claude Opus 4 (thinking 16k), $1.93/task", labelUk: "Claude Opus 4 (thinking 16k), 1,93 $ за задачу", value: 8.6, est: false, sources: ["S-R6-20"]},
      {t: 2025.518, date: "2025-07-09", label: "Grok 4 (Thinking)", value: 16.0, est: false, sources: ["S-R6-20"]},
      {t: 2025.879, date: "2025-11-18", label: "Gemini 3 Deep Think (preview) 45.1% at $77/task (Gemini 3 Pro 31.1% at $0.81/task)", labelUk: "Gemini 3 Deep Think (preview) 45,1 % за 77 $ за задачу (Gemini 3 Pro 31,1 % за 0,81 $ за задачу)", value: 45.1, est: false, sources: ["S-R6-26"]},
      {t: 2025.926, date: "2025-12-05", label: "Poetiq refinement loop on Gemini 3 Pro, $30.57/task (verified system)", labelUk: "Цикл уточнення Poetiq над Gemini 3 Pro, 30,57 $ за задачу (перевірена система)", value: 54, est: false, sources: ["S-R6-26"]},
      {t: 2025.942, date: "2025-12-11", label: "GPT-5.2 Pro (high), $15.72/task", labelUk: "GPT-5.2 Pro (high), 15,72 $ за задачу", value: 54.2, est: false, sources: ["S-R6-20"]},
      {t: 2026.096, date: "2026-02-05", label: "Claude Opus 4.6 (120k, high): passes the 60% human-panel average", labelUk: "Claude Opus 4.6 (120k, high): перевищує середні 60 % людської панелі", value: 69.2, est: false, sources: ["S-R6-20"]},
      {t: 2026.115, date: "2026-02-12", label: "Gemini 3 Deep Think (Feb 2026 version)", labelUk: "Gemini 3 Deep Think (версія лютого 2026)", value: 84.6, est: false, sources: ["S-R6-20"]},
      {t: 2026.307, date: "2026-04-23", label: "GPT-5.5 (x-high), $1.87/task. First verified score at or above 85%", labelUk: "GPT-5.5 (x-high), 1,87 $ за задачу. Перший перевірений результат на рівні 85 % або вище", value: 85.0, est: false, sources: ["S-R6-20"]},
      {t: 2026.436, date: "2026-06-09", label: "Claude Fable 5 (max), $5.45/task", labelUk: "Claude Fable 5 (max), 5,45 $ за задачу", value: 89.2, est: false, sources: ["S-R6-20", "S-R6-26", "S-AUD-13"]},
      {t: 2026.518, date: "2026-07-09", label: "GPT-5.6 Sol (max), $1.44/task", labelUk: "GPT-5.6 Sol (max), 1,44 $ за задачу", value: 92.5, est: false, sources: ["S-R6-20", "S-R6-26"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra (max). Best as of Oct 2026 (GPT-6.1 Sol 94.2%, GPT-6 Sol 89.6%)", labelUk: "GPT-6 Astra (max). Найкращий станом на жовтень 2026 (GPT-6.1 Sol 94,2 %, GPT-6 Sol 89,6 %)", value: 95.0, est: false, sources: ["S-R6-20", "S-R6-26", "S-AUD-12", "S-AUD-14"]}
    ],
    reference: [
      {label: {en: "Human panel average", uk: "Середнє по людській панелі"}, value: 60},
      {label: {en: "Prize threshold", uk: "Призова планка"}, value: 85}
    ]
  };

  S["hle"] = {
    group: "benchmarks", featured: false,
    title: {en: "Humanity's Last Exam: best score (no tools unless marked)", uk: "Humanity's Last Exam: найкращий результат (без інструментів, якщо не вказано інше)"},
    unit: {en: "% accuracy on the full HLE set (text + multimodal)", uk: "% правильних відповідей на повному наборі HLE (текст + мультимодальні)"}, scale: "linear",
    what: {
      en: "A deliberately \"last\" closed-ended academic exam (CAIS and Scale AI, January 2025); questions were kept only if frontier models failed them. The best no-tools score rose from 9% to about 55% in 20 months (+30 points in 2025 alone, per the AI Index 2026). With search and code tools, vendors report up to about 68%.",
      uk: "Навмисно «останній» академічний іспит із закритими відповідями (CAIS і Scale AI, січень 2025); запитання лишали, тільки якщо передові моделі на них провалювалися. Найкращий результат без інструментів зріс із 9 % до ~55 % за 20 місяців (+30 пунктів лише за 2025 рік, за AI Index 2026). З пошуком і кодом виробники повідомляють до ~68 %."
    },
    caveat: {
      en: "No human baseline: questions were written by about 1,000 experts and filtered against models. Scores depend on evaluator and question set: ~55–61% without tools, depending on who runs it (vendors self-report up to ~61%; Artificial Analysis's text-only run gives Claude Opus 5.5 61.4%; the cleaned HLE-Diamond set gives GPT-6 Astra 59.9%). Always state tools / no tools. FutureHouse estimated that ~29% (±3.7%) of text-only chemistry and biology answers conflict with the literature; calibration error remains high (~39% for GPT-6 Astra). Rows are Scale / lastexam.ai results via Epoch unless marked self-reported.",
      uk: "Людського орієнтира немає: запитання писали близько 1 000 експертів і відсіювали за результатами моделей. Результати залежать від того, хто оцінює і на якому наборі: ~55–61 % без інструментів залежно від виконавця (виробники заявляють до ~61 %; текстовий замір Artificial Analysis дає Claude Opus 5.5 61,4 %; очищений набір HLE-Diamond дає GPT-6 Astra 59,9 %). Завжди вказуйте, з інструментами чи без. За оцінкою FutureHouse, ~29 % (±3,7 %) текстових відповідей із хімії та біології суперечать літературі; похибка калібрування лишається високою (~39 % у GPT-6 Astra). Значення — результати Scale / lastexam.ai через Epoch, якщо не позначено як самозвіт."
    },
    points: [
      {t: 2025.063, date: "2025-01-24", label: "Launch paper: o1 (full set); DeepSeek-R1 9.4% text-only; GPT-4o 3.3%", labelUk: "Стаття про запуск: o1 (повний набір); DeepSeek-R1 9,4 % лише текст; GPT-4o 3,3 %", value: 9.1, est: false, sources: ["S-R6-28"]},
      {t: 2025.227, date: "2025-03-25", label: "Gemini 2.5 Pro (exp.)", value: 18.2, est: false, sources: ["S-R6-20"]},
      {t: 2025.288, date: "2025-04-16", label: "o3 (high)", value: 20.3, est: false, sources: ["S-R6-20"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5 (high)", value: 25.3, est: false, sources: ["S-R6-20"]},
      {t: 2025.764, date: "2025-10-07", label: "GPT-5 Pro", value: 31.6, est: false, sources: ["S-R6-20"]},
      {t: 2025.879, date: "2025-11-18", label: "Gemini 3 Pro (Google self-report 37.5%; lastexam.ai lists 38.3%)", labelUk: "Gemini 3 Pro (самозвіт Google 37,5 %; lastexam.ai наводить 38,3 %)", value: 37.5, est: false, sources: ["S-R6-20", "S-R6-28"]},
      {t: 2026.134, date: "2026-02-19", label: "Gemini 3.1 Pro (thinking high), Scale run (Google self-reports 44.4%)", labelUk: "Gemini 3.1 Pro (thinking high), прогін Scale (самозвіт Google 44,4 %)", value: 46.4, est: false, sources: ["S-R6-20"]},
      {t: 2026.666, date: "2026-09-01", label: "Claude Fable 5.1 (x-high); lowest calibration error seen (~20%)", labelUk: "Claude Fable 5.1 (x-high); найнижча з бачених похибка калібрування (~20 %)", value: 46.5, est: false, sources: ["S-R6-20"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra. Best no-tools score as of Oct 2026", labelUk: "GPT-6 Astra. Найкращий результат без інструментів станом на жовтень 2026", value: 54.8, est: false, sources: ["S-R6-20"]},
      {t: 2026.723, date: "2026-09-22", label: "With tools (search + code), self-reported: Claude Opus 5.5", labelUk: "З інструментами (пошук + код), самозвіт: Claude Opus 5.5", value: 67.7, est: false, sources: ["S-R6-29"]}
    ],
    reference: null
  };

  S["frontiermath"] = {
    group: "benchmarks", featured: false,
    title: {en: "FrontierMath Tiers 1–3: best independently measured score", uk: "FrontierMath, рівні 1–3: найкращий незалежно виміряний результат"},
    unit: {en: "% of private research-level maths problems solved (Epoch AI runs)", uk: "% розв'язаних приватних задач дослідницького рівня (заміри Epoch AI)"}, scale: "linear",
    what: {
      en: "Epoch's research-mathematics benchmark, launched in November 2024 when every model solved under 2%. Within 22 months models solved about 94% of the revised (v2) Tiers 1–3 set.",
      uk: "Бенчмарк дослідницької математики від Epoch, запущений у листопаді 2024 року, коли жодна модель не розв'язувала й 2 %. За 22 місяці моделі розв'язали близько 94 % переглянутого (v2) набору рівнів 1–3."
    },
    caveat: {
      en: "v1 and v2 are different sets: v2 (June 2026) corrected errors in about 42% of problems, so the two curves must not be joined without a visible break (v2 rows are marked). OpenAI funded the benchmark and has access to most problems except a holdout. OpenAI's December 2024 \"25%\" o3 claim was never reproduced independently (Epoch found ~10% for the released o3). There is no human baseline.",
      uk: "v1 і v2 — різні набори: у v2 (червень 2026) виправили помилки приблизно в 42 % задач, тож дві криві не можна з'єднувати без видимого розриву (рядки v2 позначено). OpenAI профінансувала бенчмарк і має доступ до більшості задач, крім контрольної частини. Заява OpenAI про «25 %» для o3 у грудні 2024 року так і не була відтворена незалежно (Epoch виміряла ~10 % для випущеної o3). Людського орієнтира немає."
    },
    points: [
      {t: 2024.852, date: "2024-11-07", label: "Launch: all models under 2%", labelUk: "Запуск: усі моделі нижче 2 %", value: 2, est: false, sources: ["S-R6-31"]},
      {t: 2024.962, date: "2024-12-17", label: "o1 (high), v1 private set", labelUk: "o1 (high), закритий набір v1", value: 9.3, est: false, sources: ["S-R6-20"]},
      {t: 2025.082, date: "2025-01-31", label: "o3-mini (high), v1", value: 12.4, est: false, sources: ["S-R6-20"]},
      {t: 2025.288, date: "2025-04-16", label: "o4-mini (high), v1", value: 24.8, est: false, sources: ["S-R6-20"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5 (high), v1", value: 32.4, est: false, sources: ["S-R6-20"]},
      {t: 2025.879, date: "2025-11-18", label: "Gemini 3 Pro (preview), v1", value: 37.6, est: false, sources: ["S-R6-20"]},
      {t: 2025.942, date: "2025-12-11", label: "GPT-5.2 (x-high), v1", value: 40.7, est: false, sources: ["S-R6-20"]},
      {t: 2026.173, date: "2026-03-05", label: "GPT-5.4 Pro (x-high), v1", value: 50.0, est: false, sources: ["S-R6-20"]},
      {t: 2026.307, date: "2026-04-23", label: "GPT-5.5 Pro (pre-release), v1. Last v1 record", labelUk: "GPT-5.5 Pro (передрелізна), v1. Останній рекорд на v1", value: 52.4, est: false, sources: ["S-R6-20"]},
      {t: 2026.444, date: "2026-06-12", label: "v2 set introduced (break in the series): GPT-5.5 Pro (x-high) re-scored on v2", labelUk: "Запроваджено набір v2 (розрив у ряді): GPT-5.5 Pro (x-high) переоцінено на v2", value: 87.7, est: false, sources: ["S-R6-20", "S-R6-31"]},
      {t: 2026.518, date: "2026-07-09", label: "GPT-5.6 Sol (max), v2", value: 89.1, est: false, sources: ["S-R6-20"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra (max), v2; tied by GPT-6.1 Sol (267/285 problems)", labelUk: "GPT-6 Astra (max), v2; стільки ж у GPT-6.1 Sol (267/285 задач)", value: 93.7, est: false, sources: ["S-R6-20"]}
    ],
    reference: null
  };

  S["frontiermath-tier4"] = {
    group: "benchmarks", featured: false,
    title: {en: "FrontierMath Tier 4: best independently measured score", uk: "FrontierMath, рівень 4: найкращий незалежно виміряний результат"},
    unit: {en: "% of private Tier 4 problems solved (Epoch AI runs)", uk: "% розв'язаних приватних задач рівня 4 (заміри Epoch AI)"}, scale: "linear",
    what: {
      en: "The hardest, research-grade tier went from 0% to 100% of 41 private problems (Epoch-run, corrected v2 set) in under two years.",
      uk: "Найскладніший, дослідницький рівень за неповні два роки пройшов шлях від 0 % до 100 % із 41 приватної задачі (замір Epoch, виправлений набір v2)."
    },
    caveat: {
      en: "The sample is tiny (41–48 problems), so one problem moves the score about 2.4 points. v1 and v2 differ, as for Tiers 1–3, and the v1→v2 corrections inflated all scores. The 100% for GPT-6.1 Sol is a single dataset pull (medium confidence). OpenAI's \"98%\" for GPT-6 Astra is Epoch's 97.6% on v2.",
      uk: "Вибірка крихітна (41–48 задач), тож одна задача зсуває результат приблизно на 2,4 пункту. v1 і v2 різняться, як і для рівнів 1–3, а виправлення v1→v2 підняли всі результати. 100 % для GPT-6.1 Sol — одне завантаження даних (середня впевненість). «98 %» від OpenAI для GPT-6 Astra — це 97,6 % Epoch на v2."
    },
    points: [
      {t: 2025.082, date: "2025-01-31", label: "o3-mini (high), v1", value: 4.2, est: false, sources: ["S-R6-20"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5 (high), v1", value: 12.5, est: false, sources: ["S-R6-20"]},
      {t: 2025.879, date: "2025-11-18", label: "Gemini 3 Pro (preview), v1", value: 18.8, est: false, sources: ["S-R6-20"]},
      {t: 2025.942, date: "2025-12-11", label: "GPT-5.2 Pro (web app), v1", labelUk: "GPT-5.2 Pro (вебзастосунок), v1", value: 31.3, est: false, sources: ["S-R6-20"]},
      {t: 2026.173, date: "2026-03-05", label: "GPT-5.4 Pro (web app), v1", labelUk: "GPT-5.4 Pro (вебзастосунок), v1", value: 37.5, est: false, sources: ["S-R6-20"]},
      {t: 2026.348, date: "2026-05-08", label: "Google DeepMind \"AI co-mathematician\" agent system, v1", labelUk: "Агентна система Google DeepMind «AI co-mathematician», v1", value: 47.9, est: false, sources: ["S-R6-20"]},
      {t: 2026.436, date: "2026-06-09", label: "Claude Fable 5 (max), v2 (break in the series)", labelUk: "Claude Fable 5 (max), v2 (розрив у ряді)", value: 90.2, est: false, sources: ["S-R6-20"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra (x-high), v2", value: 97.6, est: false, sources: ["S-R6-20"]},
      {t: 2026.742, date: "2026-09-29", label: "GPT-6.1 Sol (max), v2: 100% of 41 problems (Epoch-run)", labelUk: "GPT-6.1 Sol (max), v2: 100 % із 41 задачі (прогін Epoch)", value: 100, est: false, sources: ["S-R6-20"]}
    ],
    reference: null
  };

  /* ───────────────────────── cost ───────────────────────── */

  S["price-gpt4-level"] = {
    group: "cost", featured: true,
    title: {en: "Cheapest price for GPT-4-level science performance (GPQA Diamond)", uk: "Найдешевша ціна за результат рівня GPT-4 у науці (GPQA Diamond)"},
    unit: {en: "USD per 1M tokens, blended 3:1 input:output", uk: "USD за 1 млн токенів, змішано 3:1 (вхід:вихід)"}, scale: "log",
    what: {
      en: "The price of a constant level of capability collapses. GPT-4-level performance on PhD-level science questions (the GPT-4-0314 GPQA Diamond score) went from $37.50 to $0.12 per million tokens in 21 months, about 40× cheaper per year.",
      uk: "Ціна за сталий рівень здібностей обвалюється. Результат рівня GPT-4 на наукових запитаннях рівня PhD (показник GPT-4-0314 на GPQA Diamond) подешевшав із 37,50 $ до 0,12 $ за мільйон токенів за 21 місяць: приблизно у 40 разів на рік."
    },
    caveat: {
      en: "Cheapest public API price at the time of a model reaching the threshold; it ignores quality differences above the threshold and provider subsidies. Epoch's published analysis ends in early 2025; no verified 2026 update of this track was found, so the line stops at its verified end point. Epoch found declines of 9× to 900× per year depending on the task and threshold.",
      uk: "Найдешевша публічна ціна API на момент, коли модель досягла порогу; різниця в якості понад поріг і субсидії провайдерів не враховані. Опублікований аналіз Epoch закінчується на початку 2025 року; підтвердженого оновлення цього треку за 2026 рік не знайдено, тож лінія уривається на останній перевіреній точці. Epoch виміряла падіння від 9 до 900 разів на рік залежно від задачі й порогу."
    },
    points: [
      {t: 2023.197, date: "2023-03-14", label: "GPT-4-0314 ($30 in / $60 out)", labelUk: "GPT-4-0314 (30 $ вхід / 60 $ вихід)", value: 37.50, est: false, sources: ["S-R6-39"]},
      {t: 2024.951, date: "2024-12-13", label: "Phi-4 (Microsoft, 14B open weights); ~40× per year", labelUk: "Phi-4 (Microsoft, 14B, відкриті ваги); ~40× на рік", value: 0.12, est: false, sources: ["S-R6-39"]}
    ],
    reference: null
  };

  S["price-gpt35-level"] = {
    group: "cost", featured: false,
    title: {en: "Cheapest price for GPT-3.5-level performance (MMLU ≥ 64.8%)", uk: "Найдешевша ціна за результат рівня GPT-3.5 (MMLU ≥ 64,8 %)"},
    unit: {en: "USD per 1M tokens, blended 3:1 input:output", uk: "USD за 1 млн токенів, змішано 3:1 (вхід:вихід)"}, scale: "log",
    what: {
      en: "GPT-3.5-level MMLU performance fell from $20 to $0.07 per million tokens between November 2022 and October 2024, a more than 280-fold reduction in about two years (AI Index 2025).",
      uk: "Результат рівня GPT-3.5 на MMLU подешевшав із 20 $ до 0,07 $ за мільйон токенів між листопадом 2022 і жовтнем 2024 року: понад 280-кратне зниження приблизно за два роки (AI Index 2025)."
    },
    caveat: {
      en: "Cheapest public API price at each date, consistent with text-davinci-003 at $0.02 per 1K tokens (Nov 2022) and gpt-3.5-turbo at $2 flat (Mar 2023). Verified only to October 2024.",
      uk: "Найдешевша публічна ціна API на кожну дату: text-davinci-003 за 0,02 $ за 1 тис. токенів (листопад 2022) і gpt-3.5-turbo за 2 $ (березень 2023). Підтверджено лише до жовтня 2024 року."
    },
    points: [
      {t: 2022.871, date: "2022-11", label: "Cheapest model at GPT-3.5 level (text-davinci-003, $0.02 per 1K tokens)", labelUk: "Найдешевша модель рівня GPT-3.5 (text-davinci-003, 0,02 $ за 1 тис. токенів)", value: 20.00, est: false, sources: ["S-R6-24", "S-R6-111"]},
      {t: 2023.162, date: "2023-03-01", label: "gpt-3.5-turbo launch, $2 flat (\"10x cheaper than our existing GPT-3.5 models\")", labelUk: "Запуск gpt-3.5-turbo, 2 $ без поділу («у 10 разів дешевше за наші наявні моделі GPT-3.5»)", value: 2.00, est: false, sources: ["S-R6-39"]},
      {t: 2024.756, date: "2024-10-03", label: "Gemini 1.5 Flash-8B (more than 280-fold reduction in ~2 years)", labelUk: "Gemini 1.5 Flash-8B (зниження понад у 280 разів за ~2 роки)", value: 0.07, est: false, sources: ["S-R6-24"]}
    ],
    reference: null
  };

  S["price-gpt3-level"] = {
    group: "cost", featured: false,
    title: {en: "Cheapest price for GPT-3-level performance (MMLU ≥ 43.9%)", uk: "Найдешевша ціна за результат рівня GPT-3 (MMLU ≥ 43,9 %)"},
    unit: {en: "USD per 1M tokens, blended 3:1 input:output", uk: "USD за 1 млн токенів, змішано 3:1 (вхід:вихід)"}, scale: "log",
    what: {
      en: "The longest track: GPT-3-level performance went from $60 (davinci, Nov 2021) to $0.07 (Gemini 1.5 Flash-8B, Oct 2024), about 857× cheaper in three years.",
      uk: "Найдовший трек: результат рівня GPT-3 подешевшав із 60 $ (davinci, листопад 2021) до 0,07 $ (Gemini 1.5 Flash-8B, жовтень 2024), приблизно у 857 разів за три роки."
    },
    caveat: {
      en: "Cheapest public API price at the threshold; Epoch's analysis ends in early 2025.",
      uk: "Найдешевша публічна ціна API на порозі; аналіз Epoch закінчується на початку 2025 року."
    },
    points: [
      {t: 2021.871, date: "2021-11", label: "GPT-3 davinci, $0.06 per 1K tokens", labelUk: "GPT-3 davinci, 0,06 $ за 1 тис. токенів", value: 60.00, est: false, sources: ["S-R6-39"]},
      {t: 2024.756, date: "2024-10-03", label: "Gemini 1.5 Flash-8B (~857× cheaper in ~3 years)", labelUk: "Gemini 1.5 Flash-8B (~857× дешевше за ~3 роки)", value: 0.07, est: false, sources: ["S-R6-39"]}
    ],
    reference: null
  };

  S["price-sonnet35-level"] = {
    group: "cost", featured: false,
    title: {en: "Cheapest price for Claude-3.5-Sonnet-level science performance (GPQA ≥ 56%)", uk: "Найдешевша ціна за результат рівня Claude 3.5 Sonnet у науці (GPQA ≥ 56 %)"},
    unit: {en: "USD per 1M tokens, blended 3:1 input:output", uk: "USD за 1 млн токенів, змішано 3:1 (вхід:вихід)"}, scale: "log",
    what: {
      en: "The fastest drop in Epoch's set: the same GPQA level became 33× cheaper in eight months (June 2024 to February 2025).",
      uk: "Найшвидше падіння в наборі Epoch: той самий рівень на GPQA подешевшав у 33 рази за вісім місяців (червень 2024 — лютий 2025)."
    },
    caveat: {
      en: "Cheapest public API price at the threshold; Epoch's analysis ends in early 2025.",
      uk: "Найдешевша публічна ціна API на порозі; аналіз Epoch закінчується на початку 2025 року."
    },
    points: [
      {t: 2024.468, date: "2024-06-20", label: "Claude 3.5 Sonnet", value: 6.00, est: false, sources: ["S-R6-39"]},
      {t: 2025.096, date: "2025-02-05", label: "Gemini 2.0 Flash (33× cheaper in 8 months)", labelUk: "Gemini 2.0 Flash (33× дешевше за 8 місяців)", value: 0.18, est: false, sources: ["S-R6-39"]}
    ],
    reference: null
  };

  S["price-flagship"] = {
    group: "cost", featured: true,
    title: {en: "Flagship launch list prices (input; output in the label)", uk: "Стартові цінники флагманів (вхід; вихід у підписі)"},
    unit: {en: "USD per 1M input tokens", uk: "USD за 1 млн вхідних токенів"}, scale: "log",
    what: {
      en: "Frontier list prices do not fall monotonically. They spiked with very large models (GPT-4 in 2023; GPT-4.5 and o1-pro in 2025) and dropped with efficient successors (GPT-4o, GPT-5). The 2026 flagships settled at $4–10 input / $20–50 output, while a GPT-4-class model now costs cents.",
      uk: "Цінники передових моделей не падають монотонно. Вони підскакували з дуже великими моделями (GPT-4 у 2023; GPT-4.5 і o1-pro у 2025) і падали з ефективними наступниками (GPT-4o, GPT-5). Флагмани 2026 року осіли на 4–10 $ за вхід / 20–50 $ за вихід, тоді як модель класу GPT-4 тепер коштує центи."
    },
    caveat: {
      en: "Launch prices, standard tier, short context; many models later received cuts (GPT-4o from $5/$15 to $2.50/$10 in Aug 2024). Reasoning models also consume many hidden thinking tokens billed as output, so price per token understates price per task. Long-context surcharges apply (GPT-6 Astra doubles input prices above 272K tokens).",
      uk: "Ціни на момент запуску, стандартний тариф, короткий контекст; багато моделей згодом подешевшали (GPT-4o з 5 $/15 $ до 2,50 $/10 $ у серпні 2024). Моделі міркування також витрачають багато прихованих токенів «мислення», які тарифікуються як вихід, тож ціна за токен занижує ціну за задачу. Діють надбавки за довгий контекст (GPT-6 Astra подвоює ціну входу понад 272 тис. токенів)."
    },
    points: [
      {t: 2021.871, date: "2021-11", label: "GPT-3 davinci: $60 / $60 (API opened without waitlist)", labelUk: "GPT-3 davinci: 60 $ / 60 $ (API відкрито без списку очікування)", value: 60.00, est: false, sources: ["S-R6-39"]},
      {t: 2023.162, date: "2023-03-01", label: "gpt-3.5-turbo (ChatGPT API): $2 / $2", labelUk: "gpt-3.5-turbo (API ChatGPT): 2 $ / 2 $", value: 2.00, est: false, sources: ["S-R6-111", "S-R6-39"]},
      {t: 2023.197, date: "2023-03-14", label: "GPT-4 (8K context): $30 / $60 (32K version $60 / $120)", labelUk: "GPT-4 (контекст 8K): 30 $ / 60 $ (версія 32K: 60 $ / 120 $)", value: 30.00, est: false, sources: ["S-R6-40"]},
      {t: 2023.847, date: "2023-11-06", label: "GPT-4 Turbo (128K): $10 / $30", value: 10.00, est: false, sources: ["S-R6-40"]},
      {t: 2024.173, date: "2024-03-04", label: "Claude 3 Opus: $15 / $75", value: 15.00, est: false, sources: ["S-R6-41"]},
      {t: 2024.364, date: "2024-05-13", label: "GPT-4o: $5 / $15 (cut to $2.50 / $10 in Aug 2024)", labelUk: "GPT-4o: 5 $ / 15 $ (знижено до 2,50 $ / 10 $ у серпні 2024)", value: 5.00, est: false, sources: ["S-R6-40"]},
      {t: 2024.545, date: "2024-07-18", label: "GPT-4o mini: $0.15 / $0.60", value: 0.15, est: false, sources: ["S-R6-40"]},
      {t: 2024.962, date: "2024-12-17", label: "o1 (API): $15 / $60", value: 15.00, est: false, sources: ["S-R6-40"]},
      {t: 2025.052, date: "2025-01-20", label: "DeepSeek-R1 (open-weight reasoning model): $0.55 / $2.19", labelUk: "DeepSeek-R1 (модель міркування з відкритими вагами): 0,55 $ / 2,19 $", value: 0.55, est: false, sources: ["S-R6-42"]},
      {t: 2025.156, date: "2025-02-27", label: "GPT-4.5 (preview): $75 / $150; most expensive mainstream flagship, withdrawn Jul 2025", labelUk: "GPT-4.5 (preview): 75 $ / 150 $; найдорожчий масовий флагман, знятий у липні 2025", value: 75.00, est: false, sources: ["S-R6-40"]},
      {t: 2025.211, date: "2025-03-19", label: "o1-pro: $150 / $600", value: 150.00, est: false, sources: ["S-R6-40"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5: $1.25 / $10", value: 1.25, est: false, sources: ["S-R6-40"]},
      {t: 2025.896, date: "2025-11-24", label: "Claude Opus 4.5: $5 / $25 (a third of Opus 4's $15 / $75)", labelUk: "Claude Opus 4.5: 5 $ / 25 $ (третина від 15 $ / 75 $ Opus 4)", value: 5.00, est: false, sources: ["S-R6-41"]},
      {t: 2026.134, date: "2026-02-19", label: "Gemini 3.1 Pro (preview): $2 / $12 (≤200K prompts)", labelUk: "Gemini 3.1 Pro (preview): 2 $ / 12 $ (промпти ≤200K)", value: 2.00, est: false, sources: ["S-R6-43"]},
      {t: 2026.666, date: "2026-09-01", label: "Claude Fable 5.1: $10 / $50", value: 10.00, est: false, sources: ["S-R6-41"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra: $10 / $50 (≤272K input tokens; fast mode at 2× price)", labelUk: "GPT-6 Astra: 10 $ / 50 $ (≤272K вхідних токенів; швидкий режим за подвійну ціну)", value: 10.00, est: false, sources: ["S-R6-40", "S-R6-111"]},
      {t: 2026.723, date: "2026-09-22", label: "Claude Opus 5.5: $4 / $20", value: 4.00, est: false, sources: ["S-R6-41"]},
      {t: 2026.723, date: "2026-09-22", label: "GPT-6 Luna (OpenAI's small 2026 model): $0.10 / $0.50", labelUk: "GPT-6 Luna (мала модель OpenAI 2026 року): 0,10 $ / 0,50 $", value: 0.10, est: false, sources: ["S-R6-40"]}
    ],
    reference: null
  };

  S["price-openai-input"] = {
    group: "cost", featured: false,
    title: {en: "OpenAI flagship API price per 1M input tokens", uk: "Ціна API флагманів OpenAI за 1 млн вхідних токенів"},
    unit: {en: "USD per 1M input tokens, list price at launch", uk: "USD за 1 млн вхідних токенів, стартовий цінник"}, scale: "log",
    what: {
      en: "The launch price of each new top general-purpose OpenAI API model. The price fell 24× from GPT-4 to GPT-5, then rose 8× from GPT-5 to GPT-6 Astra as OpenAI split its line into tiers (Astra / Sol / Luna).",
      uk: "Стартова ціна кожної нової топової універсальної API-моделі OpenAI. Від GPT-4 до GPT-5 ціна впала у 24 рази, а від GPT-5 до GPT-6 Astra зросла у 8 разів, коли OpenAI розділила лінійку на рівні (Astra / Sol / Luna)."
    },
    caveat: {
      en: "List prices only; excludes cached-input, batch and flex discounts. \"Flagship\" means OpenAI's most capable generally available general model at that date, which is not the same model size each time. Later cuts are noted in the label, not plotted.",
      uk: "Лише цінники зі списку; без знижок за кешований вхід, пакетну обробку чи гнучкий режим. «Флагман» — найздібніша загальнодоступна універсальна модель OpenAI на ту дату, і це щоразу модель іншого розміру. Пізніші зниження вказано в підписі, але не на графіку."
    },
    points: [
      {t: 2023.162, date: "2023-03-01", label: "gpt-3.5-turbo (the ChatGPT model)", labelUk: "gpt-3.5-turbo (модель ChatGPT)", value: 2, est: false, sources: ["S-R3-12"]},
      {t: 2023.197, date: "2023-03-14", label: "GPT-4 (8K context)", labelUk: "GPT-4 (контекст 8K)", value: 30, est: false, sources: ["S-R3-13"]},
      {t: 2023.847, date: "2023-11-06", label: "GPT-4 Turbo (preview)", value: 10, est: false, sources: ["S-R3-16"]},
      {t: 2024.364, date: "2024-05-13", label: "GPT-4o (cut to $2.50 with the 2024-08-06 snapshot)", labelUk: "GPT-4o (знижено до 2,50 $ зі знімком 2024-08-06)", value: 5, est: false, sources: ["S-R3-18", "S-R3-31"]},
      {t: 2024.699, date: "2024-09-12", label: "o1-preview", value: 15, est: false, sources: ["S-R3-31"]},
      {t: 2024.962, date: "2024-12-17", label: "o1 (API)", value: 15, est: false, sources: ["S-R3-22", "S-R3-31"]},
      {t: 2025.156, date: "2025-02-27", label: "GPT-4.5 preview", value: 75, est: false, sources: ["S-R3-31"]},
      {t: 2025.282, date: "2025-04-14", label: "GPT-4.1", value: 2, est: false, sources: ["S-R3-26"]},
      {t: 2025.288, date: "2025-04-16", label: "o3 (cut to $2 on 2025-06-10)", labelUk: "o3 (знижено до 2 $ 2025-06-10)", value: 10, est: false, sources: ["S-R3-29", "S-R3-30"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5", value: 1.25, est: false, sources: ["S-R3-35"]},
      {t: 2025.866, date: "2025-11-13", label: "GPT-5.1", value: 1.25, est: false, sources: ["S-R3-31"]},
      {t: 2025.942, date: "2025-12-11", label: "GPT-5.2", value: 1.75, est: false, sources: ["S-R3-37", "S-R3-31"]},
      {t: 2026.173, date: "2026-03-05", label: "GPT-5.4", value: 2.50, est: false, sources: ["S-R3-42", "S-R3-31"]},
      {t: 2026.310, date: "2026-04-24", label: "GPT-5.5", value: 5, est: false, sources: ["S-R3-44", "S-R3-31"]},
      {t: 2026.518, date: "2026-07-09", label: "GPT-5.6 Sol (cut to $4 on 2026-08-21, through 2026-11-21)", labelUk: "GPT-5.6 Sol (знижено до 4 $ 2026-08-21, до 2026-11-21)", value: 5, est: false, sources: ["S-R3-48", "S-R3-30", "S-R3-31"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra", value: 10, est: false, sources: ["S-R3-51", "S-R3-31"]},
      {t: 2026.742, date: "2026-09-29", label: "GPT-6.1 Sol (near-Astra tier)", labelUk: "GPT-6.1 Sol (рівень, близький до Astra)", value: 2, est: false, sources: ["S-R3-55", "S-R3-30"]}
    ],
    reference: null
  };

  S["price-openai-output"] = {
    group: "cost", featured: false,
    title: {en: "OpenAI flagship API price per 1M output tokens", uk: "Ціна API флагманів OpenAI за 1 млн вихідних токенів"},
    unit: {en: "USD per 1M output tokens, list price at launch", uk: "USD за 1 млн вихідних токенів, стартовий цінник"}, scale: "log",
    what: {
      en: "The same models as the input series. Output tokens became more important after 2024 because reasoning models bill their hidden thinking tokens as output.",
      uk: "Ті самі моделі, що й у серії вхідних токенів. Після 2024 року вихідні токени стали важливішими, бо моделі міркування тарифікують приховані токени «мислення» як вихід."
    },
    caveat: {
      en: "As for the input series. Reasoning models may use many more output tokens per answer, so price per token is not price per task.",
      uk: "Як і для серії вхідних токенів. Моделі міркування можуть витрачати значно більше вихідних токенів на відповідь, тож ціна за токен — не ціна за задачу."
    },
    points: [
      {t: 2023.162, date: "2023-03-01", label: "gpt-3.5-turbo", value: 2, est: false, sources: ["S-R3-12"]},
      {t: 2023.197, date: "2023-03-14", label: "GPT-4 (8K context)", labelUk: "GPT-4 (контекст 8K)", value: 60, est: false, sources: ["S-R3-13"]},
      {t: 2023.847, date: "2023-11-06", label: "GPT-4 Turbo (preview)", value: 30, est: false, sources: ["S-R3-16"]},
      {t: 2024.364, date: "2024-05-13", label: "GPT-4o (cut to $10 with the 2024-08-06 snapshot)", labelUk: "GPT-4o (знижено до 10 $ зі знімком 2024-08-06)", value: 15, est: false, sources: ["S-R3-18", "S-R3-31"]},
      {t: 2024.699, date: "2024-09-12", label: "o1-preview", value: 60, est: false, sources: ["S-R3-31"]},
      {t: 2024.962, date: "2024-12-17", label: "o1 (API)", value: 60, est: false, sources: ["S-R3-31"]},
      {t: 2025.156, date: "2025-02-27", label: "GPT-4.5 preview", value: 150, est: false, sources: ["S-R3-31"]},
      {t: 2025.282, date: "2025-04-14", label: "GPT-4.1", value: 8, est: false, sources: ["S-R3-26"]},
      {t: 2025.288, date: "2025-04-16", label: "o3 (cut to $8 on 2025-06-10)", labelUk: "o3 (знижено до 8 $ 2025-06-10)", value: 40, est: false, sources: ["S-R3-29", "S-R3-30"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5", value: 10, est: false, sources: ["S-R3-35"]},
      {t: 2025.866, date: "2025-11-13", label: "GPT-5.1", value: 10, est: false, sources: ["S-R3-31"]},
      {t: 2025.942, date: "2025-12-11", label: "GPT-5.2", value: 14, est: false, sources: ["S-R3-37", "S-R3-31"]},
      {t: 2026.173, date: "2026-03-05", label: "GPT-5.4", value: 15, est: false, sources: ["S-R3-42", "S-R3-31"]},
      {t: 2026.310, date: "2026-04-24", label: "GPT-5.5", value: 30, est: false, sources: ["S-R3-44", "S-R3-31"]},
      {t: 2026.518, date: "2026-07-09", label: "GPT-5.6 Sol (cut to $20 on 2026-08-21, through 2026-11-21)", labelUk: "GPT-5.6 Sol (знижено до 20 $ 2026-08-21, до 2026-11-21)", value: 30, est: false, sources: ["S-R3-48", "S-R3-30", "S-R3-31"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra", value: 50, est: false, sources: ["S-R3-51", "S-R3-31"]},
      {t: 2026.742, date: "2026-09-29", label: "GPT-6.1 Sol", value: 10, est: false, sources: ["S-R3-55", "S-R3-30"]}
    ],
    reference: null
  };

  S["price-claude-opus"] = {
    group: "cost", featured: false,
    title: {en: "Claude Opus-tier list price (output; input in the label)", uk: "Цінник рівня Claude Opus (вихід; вхід у підписі)"},
    unit: {en: "USD per 1M output tokens", uk: "USD за 1 млн вихідних токенів"}, scale: "linear",
    what: {
      en: "The price of Anthropic's Opus tier (its top general-release tier until Fable 5 arrived above it in June 2026) fell by more than 70% while capability rose.",
      uk: "Ціна рівня Opus від Anthropic (найвищого загальнодоступного рівня, доки в червні 2026 року над ним не з'явилася Fable 5) впала більш ніж на 70 %, тоді як здібності зросли."
    },
    caveat: {
      en: "List prices at launch; batch, caching and fast-mode prices differ. Fable 5 / 5.1 ($10 / $50) sits above Opus and is excluded.",
      uk: "Стартові цінники; ціни за пакетну обробку, кешування і швидкий режим інші. Fable 5 / 5.1 (10 $ / 50 $) стоїть над Opus і не врахована."
    },
    points: [
      {t: 2024.173, date: "2024-03-04", label: "Claude 3 Opus ($15 in)", labelUk: "Claude 3 Opus (15 $ вхід)", value: 75, est: false, sources: ["S-R4a-21"]},
      {t: 2025.386, date: "2025-05-22", label: "Claude Opus 4 ($15 in)", labelUk: "Claude Opus 4 (15 $ вхід)", value: 75, est: false, sources: ["S-R4a-28"]},
      {t: 2025.896, date: "2025-11-24", label: "Claude Opus 4.5 ($5 in)", labelUk: "Claude Opus 4.5 (5 $ вхід)", value: 25, est: false, sources: ["S-R4a-33"]},
      {t: 2026.723, date: "2026-09-22", label: "Claude Opus 5.5 ($4 in)", labelUk: "Claude Opus 5.5 (4 $ вхід)", value: 20, est: false, sources: ["S-R4a-45"]}
    ],
    reference: null
  };

  /* ───────────────────────── context ───────────────────────── */

  S["context-length"] = {
    group: "context", featured: true,
    title: {en: "Maximum context window commercially offered", uk: "Найбільше контекстне вікно в комерційній пропозиції"},
    unit: {en: "tokens (max input context)", uk: "токенів (максимальний вхідний контекст)"}, scale: "log",
    what: {
      en: "Context grew from 512 tokens (GPT-1, 2018) to 1–2 million tokens (Gemini 1.5, 2024) in six years, roughly 4,000×. Epoch measured about 30× per year growth since mid-2023, but since 2024 the commercial maximum has plateaued at 1–2M tokens: the 2026 flagships GPT-6 Astra and Claude Opus 5.5 offer about 1M. Progress moved to using long context well: the input length at which top models reach 80% accuracy grew more than 250× in nine months (2024–25).",
      uk: "Контекст виріс із 512 токенів (GPT-1, 2018) до 1–2 млн токенів (Gemini 1.5, 2024) за шість років, приблизно у 4 000 разів. Epoch виміряла зростання близько 30× на рік із середини 2023 року, але з 2024 року комерційний максимум завмер на 1–2 млн токенів: флагмани 2026 року GPT-6 Astra і Claude Opus 5.5 пропонують близько 1 млн. Прогрес перейшов у вміння користуватися довгим контекстом: довжина входу, на якій найкращі моделі тримають 80 % точності, зросла понад 250× за дев'ять місяців (2024–25)."
    },
    caveat: {
      en: "Research demos (Gemini 1.5 tested to 10M tokens; Magic LTM-2 100M) and open-weight claims (Llama 4 Scout 10M) exceed what hosted APIs actually sold. Advertised context is not usable context.",
      uk: "Дослідницькі демонстрації (Gemini 1.5 тестували до 10 млн токенів; Magic LTM-2 — 100 млн) і заяви для відкритих ваг (Llama 4 Scout — 10 млн) перевищують те, що реально продавали хостовані API. Заявлений контекст — не те саме, що придатний до використання."
    },
    points: [
      {t: 2018.441, date: "2018-06-11", label: "GPT-1 (512-token training sequences)", labelUk: "GPT-1 (навчальні послідовності по 512 токенів)", value: 512, est: false, sources: ["S-R6-44"]},
      {t: 2019.121, date: "2019-02-14", label: "GPT-2 (context raised from 512 to 1,024 tokens)", labelUk: "GPT-2 (контекст збільшено з 512 до 1 024 токенів)", value: 1024, est: false, sources: ["S-R6-44"]},
      {t: 2020.405, date: "2020-05-28", label: "GPT-3 (n_ctx = 2,048)", labelUk: "GPT-3 (n_ctx = 2 048)", value: 2048, est: false, sources: ["S-R6-07"]},
      {t: 2023.197, date: "2023-03-14", label: "GPT-4: 8,192 standard; limited-access gpt-4-32k (about 50 pages of text)", labelUk: "GPT-4: 8 192 стандартно; gpt-4-32k з обмеженим доступом (близько 50 сторінок тексту)", value: 32768, est: false, sources: ["S-R6-40", "S-R6-111"]},
      {t: 2023.356, date: "2023-05-11", label: "Claude 100K: it read The Great Gatsby and spotted one altered line in 22 s", labelUk: "Claude 100K: прочитала «Великого Ґетсбі» й за 22 с знайшла один змінений рядок", value: 100000, est: false, sources: ["S-R6-45"]},
      {t: 2023.847, date: "2023-11-06", label: "GPT-4 Turbo, 128K", value: 128000, est: false, sources: ["S-R6-40"]},
      {t: 2023.888, date: "2023-11-21", label: "Claude 2.1, 200K (~150,000 words)", labelUk: "Claude 2.1, 200K (~150 000 слів)", value: 200000, est: false, sources: ["S-R6-45"]},
      {t: 2024.123, date: "2024-02-15", label: "Gemini 1.5 Pro, 1M (limited preview; 10M tested in research)", labelUk: "Gemini 1.5 Pro, 1M (обмежений preview; у дослідженнях перевірено 10M)", value: 1000000, est: false, sources: ["S-R6-47"]},
      {t: 2024.488, date: "2024-06-27", label: "Gemini 1.5 Pro, 2M opened to all developers", labelUk: "Gemini 1.5 Pro, 2M відкрито всім розробникам", value: 2000000, est: false, sources: ["S-R6-48"]},
      {t: 2025.258, date: "2025-04-05", label: "Llama 4 Scout (open weights), 10M claimed; hosted offerings were far smaller", labelUk: "Llama 4 Scout (відкриті ваги), заявлено 10M; хостингові версії були значно меншими", value: 10000000, est: false, sources: ["S-R6-09"]},
      {t: 2026.671, date: "2026-09-03", label: "GPT-6 Astra, 1,050,000", labelUk: "GPT-6 Astra, 1 050 000", value: 1050000, est: false, sources: ["S-R6-40"]},
      {t: 2026.723, date: "2026-09-22", label: "Claude Opus 5.5 / Fable 5.1 / Sonnet 5.5, 1M (all current Claude models)", labelUk: "Claude Opus 5.5 / Fable 5.1 / Sonnet 5.5, 1M (усі поточні моделі Claude)", value: 1000000, est: false, sources: ["S-R6-41"]}
    ],
    reference: null
  };

  /* ───────────────────────── adoption ───────────────────────── */

  S["chatgpt-wau"] = {
    group: "adoption", featured: true,
    title: {en: "ChatGPT weekly active users", uk: "Щотижневі активні користувачі ChatGPT"},
    unit: {en: "millions of weekly active users (WAU), as stated by OpenAI", uk: "млн щотижневих активних користувачів (WAU), за даними OpenAI"}, scale: "log",
    what: {
      en: "The fastest consumer-technology adoption on record. ChatGPT grew 12× in under three years, from 100M weekly users (November 2023) to 1.2 billion (September 2026).",
      uk: "Найшвидше поширення споживчої технології в історії. За неповні три роки ChatGPT виріс у 12 разів: зі 100 млн щотижневих користувачів (листопад 2023) до 1,2 млрд (вересень 2026)."
    },
    caveat: {
      en: "Only official weekly counts are shown (OpenAI's CEO, COO and posts), usually phrased \"more than\", so treat values as lower bounds. OpenAI counts accounts or activity, not de-duplicated people. The famous \"100 million users in two months\" (January 2023) was a UBS/Similarweb estimate of monthly visitors and is excluded: weekly and monthly figures are never mixed here. The 31 July 2026 \">1 billion active users\" refers to all OpenAI models and products, not ChatGPT WAU.",
      uk: "Показано лише офіційні тижневі показники (голова, операційний директор і дописи OpenAI), зазвичай у формі «понад», тож значення — нижні межі. OpenAI рахує акаунти або активність, а не унікальних людей. Знамениті «100 млн користувачів за два місяці» (січень 2023) — оцінка місячних відвідувачів від UBS/Similarweb, і її тут немає: тижневі й місячні показники не змішуємо. «Понад 1 млрд активних користувачів» від 31 липня 2026 стосується всіх моделей і продуктів OpenAI, а не WAU ChatGPT."
    },
    points: [
      {t: 2023.847, date: "2023-11-06", label: "100M WAU (Altman, DevDay 2023). First official weekly figure", labelUk: "100 млн WAU (Альтман, DevDay 2023). Перша офіційна тижнева цифра", value: 100, est: false, sources: ["S-R3-157"]},
      {t: 2024.660, date: "2024-08-29", label: ">200M WAU (OpenAI to Axios)", labelUk: ">200 млн WAU (OpenAI для Axios)", value: 200, est: false, sources: ["S-R3-158"]},
      {t: 2024.753, date: "2024-10-02", label: ">250M WAU (OpenAI funding post)", labelUk: ">250 млн WAU (допис OpenAI про фінансування)", value: 250, est: false, sources: ["S-R3-119"]},
      {t: 2024.956, date: "2024-12", label: "300M WAU in December 2024 (per COO Lightcap)", labelUk: "300 млн WAU у грудні 2024 (за словами операційного директора Лайткепа)", value: 300, est: false, sources: ["S-R3-120"]},
      {t: 2025.137, date: "2025-02-20", label: "400M WAU (COO Brad Lightcap to CNBC)", labelUk: "400 млн WAU (операційний директор Бред Лайткеп для CNBC)", value: 400, est: false, sources: ["S-R3-120"]},
      {t: 2025.244, date: "2025-03-31", label: "500M weekly users (OpenAI funding post)", labelUk: "500 млн щотижневих користувачів (допис OpenAI про фінансування)", value: 500, est: false, sources: ["S-R3-121"]},
      {t: 2025.589, date: "2025-08-04", label: "~700M WAU (OpenAI to CNBC)", labelUk: "~700 млн WAU (OpenAI для CNBC)", value: 700, est: false, sources: ["S-R3-123"]},
      {t: 2025.762, date: "2025-10-06", label: ">800M weekly users (OpenAI, DevDay 2025)", labelUk: ">800 млн щотижневих користувачів (OpenAI, DevDay 2025)", value: 800, est: false, sources: ["S-R3-110", "S-R3-124"]},
      {t: 2026.156, date: "2026-02-27", label: ">900M WAU; >50M paying consumer subscribers (OpenAI)", labelUk: ">900 млн WAU; >50 млн платних споживчих передплатників (OpenAI)", value: 900, est: false, sources: ["S-R3-125"]},
      {t: 2026.663, date: "2026-08-31", label: ">1 billion WAU (OpenAI ads post)", labelUk: ">1 млрд WAU (допис OpenAI про рекламу)", value: 1000, est: false, sources: ["S-R3-114"]},
      {t: 2026.742, date: "2026-09-29", label: "1.2 billion weekly users (OpenAI, DevDay 2026; repeated 7 Oct 2026)", labelUk: "1,2 млрд щотижневих користувачів (OpenAI, DevDay 2026; повторено 7 жовтня 2026)", value: 1200, est: false, sources: ["S-R3-56", "S-R3-59"]}
    ],
    reference: null
  };

  S["time-to-100m"] = {
    group: "adoption", featured: false,
    title: {en: "Time to 100 million users: ChatGPT vs other products", uk: "Час до 100 млн користувачів: ChatGPT проти інших продуктів"},
    unit: {en: "months from launch to ~100M users", uk: "місяців від запуску до ~100 млн користувачів"}, scale: "log",
    what: {
      en: "Why ChatGPT was called the fastest-growing consumer app (January 2023): about two months, against roughly nine for TikTok and two and a half years for Instagram. Threads later reached 100M sign-ups in about five days.",
      uk: "Чому ChatGPT назвали найшвидше зростаючим споживчим застосунком (січень 2023): близько двох місяців проти приблизно дев'яти у TikTok і двох з половиною років в Instagram. Threads згодом набрав 100 млн реєстрацій приблизно за п'ять днів."
    },
    caveat: {
      en: "The metrics are mixed: ChatGPT is an estimated monthly-active count (UBS/Similarweb); TikTok and Instagram are unspecified \"users\"; Threads is sign-ups via one-tap Instagram import. All but Threads come from one UBS analyst note reported by Reuters, not audited company data.",
      uk: "Показники різні: для ChatGPT це оцінка місячних активних користувачів (UBS/Similarweb); для TikTok та Instagram — неуточнені «користувачі»; для Threads — реєстрації одним дотиком через імпорт з Instagram. Усі, крім Threads, походять з однієї аналітичної записки UBS у переказі Reuters, а не з перевірених даних компаній."
    },
    points: [
      {t: 2023.085, date: "2023-02-01", label: "Instagram: ~2.5 years (UBS)", labelUk: "Instagram: ~2,5 року (UBS)", value: 30, est: true, sources: ["S-R6-66"]},
      {t: 2023.085, date: "2023-02-01", label: "TikTok: ~9 months after global launch (UBS)", labelUk: "TikTok: ~9 місяців після глобального запуску (UBS)", value: 9, est: true, sources: ["S-R6-66"]},
      {t: 2023.085, date: "2023-02-01", label: "ChatGPT: ~2 months (UBS/Similarweb monthly-user estimate)", labelUk: "ChatGPT: ~2 місяці (оцінка місячних користувачів UBS/Similarweb)", value: 2, est: true, sources: ["S-R6-66"]},
      {t: 2023.521, date: "2023-07-10", label: "Threads (Meta): 100M sign-ups in ~5 days", labelUk: "Threads (Meta): 100 млн реєстрацій за ~5 днів", value: 0.17, est: false, sources: ["S-R6-76"]}
    ],
    reference: null
  };

  S["pew-chatgpt-use"] = {
    group: "adoption", featured: false,
    title: {en: "US adults who have ever used ChatGPT (Pew Research)", uk: "Дорослі американці, які хоч раз користувалися ChatGPT (Pew Research)"},
    unit: {en: "% of US adults", uk: "% дорослих у США"}, scale: "linear",
    what: {
      en: "Mainstreaming in survey data: Pew's share rose from 18% (mid-2023) to 44% (February 2026). In 2026, 49% had used any AI chatbot (Gemini 24%, Copilot 17%, Meta AI 14%, Grok 8%, Claude 6%).",
      uk: "Вихід у мейнстрим за даними опитувань: частка в Pew зросла з 18 % (середина 2023) до 44 % (лютий 2026). У 2026 році 49 % користувалися бодай якимось чат-ботом зі ШІ (Gemini 24 %, Copilot 17 %, Meta AI 14 %, Grok 8 %, Claude 6 %)."
    },
    caveat: {
      en: "Pew asked only people who had heard of ChatGPT in 2023–2025, and everyone (with a list of chatbots) in 2026, so the series has a break: part of the 2025→2026 jump is that wording change.",
      uk: "У 2023–2025 роках Pew питав лише тих, хто чув про ChatGPT, а у 2026 році — всіх (зі списком чат-ботів), тож у серії є розрив: частина стрибка 2025→2026 пояснюється зміною формулювання."
    },
    points: [
      {t: 2023.534, date: "2023-07", label: "Ever used ChatGPT (n = 5,057)", labelUk: "Коли-небудь користувалися ChatGPT (n = 5 057)", value: 18, est: false, sources: ["S-R6-77"]},
      {t: 2024.123, date: "2024-02", label: "Ever used ChatGPT", labelUk: "Коли-небудь користувалися ChatGPT", value: 23, est: false, sources: ["S-R6-79"]},
      {t: 2025.123, date: "2025-02", label: "Ever used ChatGPT (adults under 30: 58%)", labelUk: "Коли-небудь користувалися ChatGPT (дорослі до 30: 58 %)", value: 34, est: false, sources: ["S-R6-78"]},
      {t: 2026.123, date: "2026-02", label: "Ever used ChatGPT (new wording: asked everyone; any AI chatbot 49%)", labelUk: "Коли-небудь користувалися ChatGPT (нове формулювання: запитували всіх; будь-який чат-бот зі ШІ 49 %)", value: 44, est: false, sources: ["S-R6-79"]}
    ],
    reference: null
  };

  S["genai-adoption-tracker"] = {
    group: "adoption", featured: false,
    title: {en: "US adults (18–64) who use generative AI (Bick, Blandin & Deming)", uk: "Дорослі американці (18–64), які користуються генеративним ШІ (Bick, Blandin & Deming)"},
    unit: {en: "% of US adults aged 18–64", uk: "% дорослих у США віком 18–64"}, scale: "linear",
    what: {
      en: "Any generative-AI use went from almost 40% (August 2024) to 61.8% (May 2026). The AI Index 2026 calls generative AI's 53% population adoption within three years faster than the PC or the internet.",
      uk: "Будь-яке використання генеративного ШІ зросло з майже 40 % (серпень 2024) до 61,8 % (травень 2026). AI Index 2026 називає 53 % охоплення населення за три роки швидшим, ніж у ПК чи інтернету."
    },
    caveat: {
      en: "Covers ages 18–64 and counts any generative-AI use (work or home). Not comparable with Pew's ChatGPT-specific question.",
      uk: "Охоплює вік 18–64 і рахує будь-яке використання генеративного ШІ (на роботі чи вдома). Не порівнюйте з запитанням Pew саме про ChatGPT."
    },
    points: [
      {t: 2024.622, date: "2024-08", label: "St. Louis Fed RPS survey (\"almost 40%\")", labelUk: "Опитування RPS Федерального резервного банку Сент-Луїса («майже 40 %»)", value: 39.4, est: false, sources: ["S-R6-80"]},
      {t: 2026.367, date: "2026-05", label: "Generative AI Adoption Tracker", value: 61.8, est: false, sources: ["S-R6-81"]}
    ],
    reference: null
  };

  S["gemini-app-mau"] = {
    group: "adoption", featured: true,
    title: {en: "Gemini app monthly active users", uk: "Щомісячні активні користувачі застосунку Gemini"},
    unit: {en: "millions of monthly active users (MAU), as stated by Google", uk: "млн щомісячних активних користувачів (MAU), за даними Google"}, scale: "linear",
    what: {
      en: "The consumer Gemini app (formerly Bard) more than doubled in about 15 months, passing 1 billion monthly users in August 2026.",
      uk: "Споживчий застосунок Gemini (колишній Bard) більш ніж подвоївся приблизно за 15 місяців і в серпні 2026 року перетнув 1 млрд щомісячних користувачів."
    },
    caveat: {
      en: "Google's own \"more than\" thresholds. They count monthly users, so they are not comparable with ChatGPT's weekly figure (1.2 billion weekly). No official figure was published before May 2025 (a March 2025 figure of 350M came from court exhibits and is not verified).",
      uk: "Власні пороги Google у формі «понад». Це місячні користувачі, тому їх не можна порівнювати з тижневим показником ChatGPT (1,2 млрд щотижня). До травня 2025 року офіційних цифр не публікували (350 млн за березень 2025 походять із судових матеріалів і не перевірені)."
    },
    points: [
      {t: 2025.381, date: "2025-05-20", label: ">400M MAU (I/O 2025 keynote, Pichai)", labelUk: ">400 млн MAU (виступ Пічаї на I/O 2025)", value: 400, est: false, sources: ["S-R4b-23"]},
      {t: 2025.556, date: "2025-07-23", label: ">450M MAU (Q2 2025 earnings)", labelUk: ">450 млн MAU (звіт за II кв. 2025)", value: 450, est: false, sources: ["S-R4b-85"]},
      {t: 2025.825, date: "2025-10-29", label: ">650M MAU (Q3 2025 earnings)", labelUk: ">650 млн MAU (звіт за III кв. 2025)", value: 650, est: false, sources: ["S-R4b-86"]},
      {t: 2026.093, date: "2026-02-04", label: ">750M MAU (Q4 2025 earnings)", labelUk: ">750 млн MAU (звіт за IV кв. 2025)", value: 750, est: false, sources: ["S-R4b-87", "S-R4b-92"]},
      {t: 2026.378, date: "2026-05-19", label: ">900M MAU (I/O 2026 keynote)", labelUk: ">900 млн MAU (виступ на I/O 2026)", value: 900, est: false, sources: ["S-R4b-89"]},
      {t: 2026.553, date: "2026-07-22", label: "950M MAU (Q2 2026 earnings); daily users tripled in a year", labelUk: "950 млн MAU (звіт за II кв. 2026); кількість щоденних користувачів потроїлася за рік", value: 950, est: false, sources: ["S-R4b-90"]},
      {t: 2026.608, date: "2026-08-11", label: "\"More than 1 billion\" monthly users (Google blog)", labelUk: "«Понад 1 мільярд» щомісячних користувачів (блог Google)", value: 1000, est: false, sources: ["S-R4b-91"]}
    ],
    reference: null
  };

  S["meta-ai-mau"] = {
    group: "adoption", featured: false,
    title: {en: "Meta AI monthly users across Meta's apps", uk: "Щомісячні користувачі Meta AI у застосунках Meta"},
    unit: {en: "millions of monthly users, as stated by Meta", uk: "млн щомісячних користувачів, за даними Meta"}, scale: "linear",
    what: {
      en: "Rivals reached ChatGPT-like scale mainly by embedding assistants in existing products: Meta AI counts use inside WhatsApp, Instagram and Facebook.",
      uk: "Конкуренти досягли масштабу ChatGPT переважно вбудовуючи асистентів у наявні продукти: Meta AI рахує використання всередині WhatsApp, Instagram і Facebook."
    },
    caveat: {
      en: "Monthly users embedded across Meta apps; not comparable with ChatGPT's weekly figure. Anthropic has published no consumer user count; Microsoft reported more than 150M monthly users for the Copilot family (October 2025).",
      uk: "Місячні користувачі, вбудовані в застосунки Meta; не порівнюйте з тижневим показником ChatGPT. Anthropic не публікувала кількість споживчих користувачів; Microsoft повідомляла понад 150 млн місячних користувачів родини Copilot (жовтень 2025)."
    },
    points: [
      {t: 2024.734, date: "2024-09-25", label: ">400M monthly (185M weekly) across Meta apps (Connect 2024)", labelUk: ">400 млн на місяць (185 млн на тиждень) у застосунках Meta (Connect 2024)", value: 400, est: false, sources: ["S-R6-86"]},
      {t: 2025.403, date: "2025-05-28", label: "~1B monthly across its apps (Zuckerberg)", labelUk: "~1 млрд на місяць у своїх застосунках (Цукерберг)", value: 1000, est: false, sources: ["S-R6-87"]}
    ],
    reference: null
  };

  S["openai-business-users"] = {
    group: "adoption", featured: false,
    title: {en: "Paying business users of ChatGPT", uk: "Платні бізнес-користувачі ChatGPT"},
    unit: {en: "millions of paying business users (seats)", uk: "млн платних бізнес-користувачів (місць)"}, scale: "linear",
    what: {
      en: "Workplace seats grew roughly 9× in 18 months, from about 1M (September 2024) to more than 9M (February 2026).",
      uk: "Робочі місця зросли приблизно у 9 разів за 18 місяців: з ~1 млн (вересень 2024) до понад 9 млн (лютий 2026)."
    },
    caveat: {
      en: "OpenAI-reported. Seats are not organisations: OpenAI reported more than 1 million business customers on 5 November 2025. The September 2024 value is implied by the COO's \"roughly doubling from September\" remark. No newer seat count was found after February 2026.",
      uk: "За даними OpenAI. Місця — не організації: 5 листопада 2025 року OpenAI повідомила про понад 1 млн бізнес-клієнтів. Значення за вересень 2024 випливає зі слів операційного директора про «приблизно подвоєння з вересня». Новіших даних про кількість місць після лютого 2026 не знайдено."
    },
    points: [
      {t: 2024.707, date: "2024-09", label: "~1M paying business users (implied)", labelUk: "~1 млн платних бізнес-користувачів (неявно)", value: 1, est: true, sources: ["S-R3-120"]},
      {t: 2025.137, date: "2025-02-20", label: "2M paying enterprise users (Lightcap to CNBC)", labelUk: "2 млн платних корпоративних користувачів (Лайткеп для CNBC)", value: 2, est: false, sources: ["S-R3-120"]},
      {t: 2025.422, date: "2025-06-04", label: "3M paying business users (OpenAI to CNBC)", labelUk: "3 млн платних бізнес-користувачів (OpenAI для CNBC)", value: 3, est: false, sources: ["S-R3-122"]},
      {t: 2025.589, date: "2025-08-04", label: "5M paying business users (OpenAI to CNBC)", labelUk: "5 млн платних бізнес-користувачів (OpenAI для CNBC)", value: 5, est: false, sources: ["S-R3-123"]},
      {t: 2025.844, date: "2025-11-05", label: ">7M ChatGPT for Work seats; >1M business customers (OpenAI)", labelUk: ">7 млн місць ChatGPT for Work; >1 млн бізнес-клієнтів (OpenAI)", value: 7, est: false, sources: ["S-R3-124"]},
      {t: 2026.156, date: "2026-02-27", label: ">9M paying business users; >50M consumer subscribers (OpenAI)", labelUk: ">9 млн платних бізнес-користувачів; >50 млн споживчих передплатників (OpenAI)", value: 9, est: false, sources: ["S-R3-125"]}
    ],
    reference: null
  };

  S["anthropic-large-customers"] = {
    group: "adoption", featured: false,
    title: {en: "Anthropic business customers spending over $1M a year", uk: "Бізнес-клієнти Anthropic з витратами понад 1 млн $ на рік"},
    unit: {en: "number of customers (annualised spend above $1M)", uk: "кількість клієнтів (річні витрати понад 1 млн $)"}, scale: "log",
    what: {
      en: "Growth of big enterprise accounts: from a dozen (early 2024) to more than 1,000 (April 2026). Anthropic also reported over 300,000 business customers of all sizes by September 2025, up from under 1,000 two years earlier, and eight of the Fortune 10 by February 2026.",
      uk: "Зростання великих корпоративних акаунтів: із дюжини (початок 2024) до понад 1 000 (квітень 2026). Anthropic також повідомляла про понад 300 000 бізнес-клієнтів усіх розмірів до вересня 2025 року (проти менш ніж 1 000 двома роками раніше) і про вісім компаній зі списку Fortune 10 до лютого 2026 року."
    },
    caveat: {
      en: "Company-reported. The February 2024 value (\"a dozen\") is a round number stated in hindsight.",
      uk: "За даними компанії. Значення за лютий 2024 («дюжина») — кругле число, назване заднім числом."
    },
    points: [
      {t: 2024.123, date: "2024-02", label: "\"Two years ago, a dozen customers\" (stated Feb 2026)", labelUk: "«Два роки тому — десяток клієнтів» (заявлено в лютому 2026)", value: 12, est: true, sources: ["S-R4a-65"]},
      {t: 2026.123, date: "2026-02", label: "\"Exceeds 500\"", labelUk: "«Понад 500»", value: 500, est: false, sources: ["S-R4a-65"]},
      {t: 2026.285, date: "2026-04", label: "\"Exceeds 1,000\", doubling in under two months", labelUk: "«Понад 1 000», подвоєння менш ніж за два місяці", value: 1000, est: false, sources: ["S-R4a-66"]}
    ],
    reference: null
  };

  S["ai-overviews-users"] = {
    group: "adoption", featured: false,
    title: {en: "Google AI Overviews: monthly users", uk: "Google AI Overviews: щомісячні користувачі"},
    unit: {en: "billions of monthly users, as stated by Google", uk: "млрд щомісячних користувачів, за даними Google"}, scale: "linear",
    what: {
      en: "Placing AI summaries above search results made Google's generative AI the most widely seen in the world: more than 2.5 billion monthly users by May 2026.",
      uk: "Розмістивши ШІ-підсумки над результатами пошуку, Google зробила свій генеративний ШІ найпоширенішим у світі: понад 2,5 млрд щомісячних користувачів до травня 2026 року."
    },
    caveat: {
      en: "These are users who saw AI Overviews, not users who chose to use them. Reported by Google; the October 2024 figure is described as reach (\"will now reach\").",
      uk: "Це користувачі, які бачили AI Overviews, а не ті, хто свідомо ними скористався. За даними Google; показник за жовтень 2024 описано як охоплення («тепер охопить»)."
    },
    points: [
      {t: 2024.827, date: "2024-10-29", label: "\"More than 1 billion users\" monthly (Q3 2024 earnings)", labelUk: "«Понад 1 мільярд користувачів» на місяць (звіт за III кв. 2024)", value: 1.0, est: false, sources: ["S-R4b-83"]},
      {t: 2025.310, date: "2025-04-24", label: "\"Over 1.5 billion users per month\" (Q1 2025 earnings)", labelUk: "«Понад 1,5 мільярда користувачів на місяць» (звіт за I кв. 2025)", value: 1.5, est: false, sources: ["S-R4b-84"]},
      {t: 2025.556, date: "2025-07-23", label: "\"Over 2 billion monthly users\" in 200+ countries (Q2 2025 earnings)", labelUk: "«Понад 2 мільярди щомісячних користувачів» у 200+ країнах (звіт за II кв. 2025)", value: 2.0, est: false, sources: ["S-R4b-85"]},
      {t: 2026.378, date: "2026-05-19", label: "2.5 billion (I/O 2026 keynote)", labelUk: "2,5 млрд (виступ на I/O 2026)", value: 2.5, est: false, sources: ["S-R4b-89"]}
    ],
    reference: null
  };

  S["ai-mode-users"] = {
    group: "adoption", featured: false,
    title: {en: "Google AI Mode (conversational Search): monthly users", uk: "Google AI Mode (розмовний пошук): щомісячні користувачі"},
    unit: {en: "millions of monthly active users", uk: "млн щомісячних активних користувачів"}, scale: "log",
    what: {
      en: "Google's opt-in chatbot-style Search mode grew to a billion monthly users within about a year.",
      uk: "Необов'язковий режим пошуку Google у стилі чат-бота за приблизно рік виріс до мільярда щомісячних користувачів."
    },
    caveat: {
      en: "The scope changes between rows: US and India (July 2025) versus global (2026). Google also reported more than 75M daily active users in October 2025; daily and monthly figures are not mixed here.",
      uk: "Охоплення між рядками різне: США та Індія (липень 2025) проти всього світу (2026). У жовтні 2025 Google також повідомляла про понад 75 млн щоденних активних користувачів; денні й місячні показники тут не змішуємо."
    },
    points: [
      {t: 2025.556, date: "2025-07-23", label: ">100M MAU in the US and India (Q2 2025 earnings)", labelUk: ">100 млн MAU у США та Індії (звіт за II кв. 2025)", value: 100, est: false, sources: ["S-R4b-85"]},
      {t: 2026.378, date: "2026-05-19", label: ">1B monthly users, global (I/O 2026)", labelUk: ">1 млрд щомісячних користувачів у світі (I/O 2026)", value: 1000, est: false, sources: ["S-R4b-89", "S-R4b-93"]},
      {t: 2026.553, date: "2026-07-22", label: "1B MAU (Q2 2026 earnings)", labelUk: "1 млрд MAU (звіт за II кв. 2026)", value: 1000, est: false, sources: ["S-R4b-90"]}
    ],
    reference: null
  };

  S["google-tokens-per-month"] = {
    group: "adoption", featured: false,
    title: {en: "Tokens processed per month across all Google surfaces", uk: "Токенів на місяць на всіх поверхнях Google"},
    unit: {en: "trillions of tokens per month", uk: "трлн токенів на місяць"}, scale: "log",
    what: {
      en: "About 330× growth in two years (9.7 trillion to more than 3,200 trillion). This is the clearest single measure of how fast AI use inside Google's products has scaled.",
      uk: "Приблизно 330-кратне зростання за два роки (з 9,7 трлн до понад 3 200 трлн). Це найчіткіший окремий показник того, як швидко зросло використання ШІ в продуктах Google."
    },
    caveat: {
      en: "\"All surfaces\" means Search, the Gemini app, Workspace, the API and so on; Google has not defined it precisely. Reasoning models produce many more tokens per answer, so token growth runs ahead of user growth.",
      uk: "«Усі поверхні» — це Пошук, застосунок Gemini, Workspace, API тощо; Google точно цього не визначила. Моделі міркування видають значно більше токенів на відповідь, тож зростання токенів випереджає зростання користувачів."
    },
    points: [
      {t: 2024.370, date: "2024-05", label: "One year before I/O 2025", labelUk: "За рік до I/O 2025", value: 9.7, est: false, sources: ["S-R4b-23", "S-R4b-89"]},
      {t: 2025.367, date: "2025-05", label: ">480T (I/O 2025)", labelUk: ">480 трлн (I/O 2025)", value: 480, est: false, sources: ["S-R4b-23"]},
      {t: 2025.534, date: "2025-07", label: ">980T (Q2 2025 earnings)", labelUk: ">980 трлн (звіт за II кв. 2025)", value: 980, est: false, sources: ["S-R4b-85"]},
      {t: 2025.786, date: "2025-10", label: ">1.3 quadrillion (Q3 2025 earnings)", labelUk: ">1,3 квадрильйона (звіт за III кв. 2025)", value: 1300, est: false, sources: ["S-R4b-86"]},
      {t: 2026.367, date: "2026-05", label: ">3.2 quadrillion (I/O 2026)", labelUk: ">3,2 квадрильйона (I/O 2026)", value: 3200, est: false, sources: ["S-R4b-89"]}
    ],
    reference: null
  };

  S["gemini-api-tokens-per-minute"] = {
    group: "adoption", featured: false,
    title: {en: "Gemini API traffic: tokens per minute", uk: "Трафік Gemini API: токенів на хвилину"},
    unit: {en: "billions of tokens per minute via direct API use", uk: "млрд токенів на хвилину через прямі виклики API"}, scale: "linear",
    what: {
      en: "Developer and enterprise API traffic roughly tripled in nine months; Google says the workhorse Flash models drove it.",
      uk: "API-трафік розробників і компаній приблизно потроївся за дев'ять місяців; за словами Google, його тягнули робочі моделі Flash."
    },
    caveat: {
      en: "Covers only direct API calls by customers, a subset of all Google surfaces.",
      uk: "Охоплює лише прямі виклики API клієнтами — підмножину всіх поверхонь Google."
    },
    points: [
      {t: 2025.825, date: "2025-10-29", label: "7B per minute (Q3 2025 earnings)", labelUk: "7 млрд на хвилину (звіт за III кв. 2025)", value: 7, est: false, sources: ["S-R4b-86"]},
      {t: 2026.093, date: "2026-02-04", label: ">10B (Q4 2025 earnings)", labelUk: ">10 млрд (звіт за IV кв. 2025)", value: 10, est: false, sources: ["S-R4b-87"]},
      {t: 2026.323, date: "2026-04-29", label: ">16B (Q1 2026 earnings)", labelUk: ">16 млрд (звіт за I кв. 2026)", value: 16, est: false, sources: ["S-R4b-88"]},
      {t: 2026.378, date: "2026-05-19", label: "~19B (I/O 2026)", labelUk: "~19 млрд (I/O 2026)", value: 19, est: false, sources: ["S-R4b-89"]},
      {t: 2026.553, date: "2026-07-22", label: "~22B (Q2 2026 earnings)", labelUk: "~22 млрд (звіт за II кв. 2026)", value: 22, est: false, sources: ["S-R4b-90"]}
    ],
    reference: null
  };

  /* ───────────────────────── hardware ───────────────────────── */

  S["gpu-flops"] = {
    group: "hardware", featured: true,
    title: {en: "Peak dense 16-bit throughput of NVIDIA's defining AI GPUs", uk: "Пікова щільна 16-бітна продуктивність визначальних ШІ-GPU NVIDIA"},
    unit: {en: "TFLOP/s per chip, dense FP16/BF16 (FP32 where marked)", uk: "TFLOP/s на чип, щільний FP16/BF16 (FP32, де вказано)"}, scale: "log",
    what: {
      en: "The per-chip engine of the compute boom. From the GTX 580s that trained AlexNet (1.6 TFLOP/s, FP32) to Rubin (4,000 TFLOP/s BF16 dense; 35,000 TFLOP/s NVFP4 dense for training) is a roughly 2,500× increase in 16-bit-or-better throughput, and far more at low precision. Epoch: spending-weighted chip price-performance has improved about 49% per year since 2023, and GPU energy efficiency 1.34× per year.",
      uk: "Почиповий двигун обчислювального буму. Від GTX 580, на яких навчали AlexNet (1,6 TFLOP/s, FP32), до Rubin (4 000 TFLOP/s щільного BF16; 35 000 TFLOP/s щільного NVFP4 для навчання) — зростання приблизно у 2 500 разів у 16-бітній або точнішій продуктивності, а на низькій точності — набагато більше. Epoch: зважена за витратами ціна-продуктивність чипів поліпшується приблизно на 49 % на рік із 2023 року, а енергоефективність GPU — у 1,34 раза на рік."
    },
    caveat: {
      en: "NVIDIA marketing pages usually quote sparse figures (2× dense); the values here are dense. Blackwell per-GPU figures differ between the HGX (1,000 W) and GB200/GB300 NVL72 (1,200–1,400 W) versions. Dates are announcement or availability as marked. Rubin bandwidth and TDP figures conflict across NVIDIA pages; \"Rubin delivers 50 PFLOPS\" is the NVFP4 inference figure, not training throughput.",
      uk: "Маркетингові сторінки NVIDIA зазвичай наводять розріджені показники (удвічі більші за щільні); тут — щільні. Показники Blackwell на один GPU різняться між версіями HGX (1 000 Вт) і GB200/GB300 NVL72 (1 200–1 400 Вт). Дати — анонс або доступність, як позначено. Дані про пропускну здатність і TDP Rubin на сторінках NVIDIA суперечать одне одному; «Rubin дає 50 PFLOPS» — це показник NVFP4 для інференсу, а не продуктивність навчання."
    },
    points: [
      {t: 2010.855, date: "2010-11-09", label: "GeForce GTX 580 (Fermi). FP32 only; 1.5–3 GB GDDR5, 244 W. Two of these trained AlexNet", value: 1.58, est: false, sources: ["S-R6-56", "S-R6-57"]},
      {t: 2014.877, date: "2014-11-17", label: "Tesla K80 (Kepler, dual-GPU board). FP32 boost 8.7 (base 5.6); no tensor cores", value: 8.7, est: false, sources: ["S-R6-56"]},
      {t: 2016.260, date: "2016-04-05", label: "Tesla P100 (Pascal), FP16 (non-tensor); 16 GB HBM2, 300 W", value: 21.2, est: false, sources: ["S-R6-55"]},
      {t: 2017.353, date: "2017-05-10", label: "V100 (Volta), first tensor cores; 16/32 GB HBM2, 300 W", value: 125, est: false, sources: ["S-R6-55"]},
      {t: 2020.367, date: "2020-05-14", label: "A100 (Ampere), BF16 dense (624 sparse); 40/80 GB, 400 W", value: 312, est: false, sources: ["S-R6-55"]},
      {t: 2022.219, date: "2022-03-22", label: "H100 SXM (Hopper; full production Sept 2022), BF16 dense; FP8 dense 1,979; 80 GB HBM3, 700 W", value: 989.5, est: false, sources: ["S-R6-55"]},
      {t: 2023.866, date: "2023-11-13", label: "H200 (Hopper): same compute as H100; 141 GB HBM3e at 4.8 TB/s", value: 989.5, est: false, sources: ["S-R6-55"]},
      {t: 2024.211, date: "2024-03-18", label: "B200 (Blackwell, HGX version; shipped late 2024), BF16 dense; FP8 4,500; FP4 9,000; 1,000 W", value: 2250, est: false, sources: ["S-R6-55", "S-R6-56"]},
      {t: 2024.211, date: "2024-03-18", label: "B200 inside GB200 NVL72 (1,200 W), BF16 dense; FP8 5,000; FP4 10,000", value: 2500, est: false, sources: ["S-R6-55"]},
      {t: 2025.208, date: "2025-03-18", label: "B300 / GB300 NVL72 (Blackwell Ultra; first large cluster Oct 2025). BF16 unchanged at 2,500; FP4 dense 15,000; 288 GB HBM3e, ~1,400 W", value: 2500, est: false, sources: ["S-R6-55"]},
      {t: 2026.011, date: "2026-01-05", label: "Rubin (Vera Rubin NVL72; \"in full production\" at CES, Jan 2026; racks at partners Aug 2026). BF16 dense 4,000; FP8 dense 17,500; NVFP4 dense 35,000 (50,000 \"inference\"); 288 GB HBM4", value: 4000, est: false, sources: ["S-R6-55", "S-AUD-23"]}
    ],
    reference: null
  };

  S["tpu-flops"] = {
    group: "hardware", featured: false,
    title: {en: "Google TPU peak dense BF16 throughput (context)", uk: "Пікова щільна BF16-продуктивність Google TPU (для контексту)"},
    unit: {en: "TFLOP/s per chip, dense BF16", uk: "TFLOP/s на чип, щільний BF16"}, scale: "log",
    what: {
      en: "Google's own accelerators, for comparison with the NVIDIA line: TPU v4 (2021) at 275 TFLOP/s and TPU7x Ironwood (November 2025) at 2,307 TFLOP/s BF16, about 8× in four and a half years.",
      uk: "Власні прискорювачі Google, для порівняння з лінійкою NVIDIA: TPU v4 (2021) — 275 TFLOP/s, TPU7x Ironwood (листопад 2025) — 2 307 TFLOP/s BF16, приблизно у 8 разів за чотири з половиною роки."
    },
    caveat: {
      en: "Only the two chips named in the dataset are shown. TPU 8 per-chip figures are press-reported and its general availability is unconfirmed, so it is not plotted.",
      uk: "Показано лише два чипи, названі в наборі даних. Показники TPU 8 на чип відомі лише з преси, а його загальна доступність не підтверджена, тож на графіку його немає."
    },
    points: [
      {t: 2021.367, date: "2021-05", label: "Google TPU v4, BF16", value: 275, est: false, sources: ["S-R6-56"]},
      {t: 2025.847, date: "2025-11-06", label: "Google TPU7x Ironwood, BF16; FP8 4,614; 192 GiB", value: 2307, est: false, sources: ["S-R6-56"]}
    ],
    reference: null
  };

  S["clusters"] = {
    group: "hardware", featured: true,
    title: {en: "Largest known AI training clusters and sites", uk: "Найбільші відомі кластери й майданчики для навчання ШІ"},
    unit: {en: "accelerators (GPUs / TPUs / Trainium) in one cluster or site; H100-equivalents (H100e) where marked", uk: "прискорювачів (GPU / TPU / Trainium) в одному кластері чи на майданчику; H100-еквіваленти (H100e), де позначено"}, scale: "log",
    what: {
      en: "From two gaming GPUs (AlexNet, 2012) to about 1.1 million H100-equivalents drawing about 1 GW (Colossus 2, 2026): a roughly 500,000-fold jump in accelerators. Epoch: the leading AI supercomputer's performance doubles about every 9 months (2.5× per year), its power about every 13 months, and the record data-centre compute every ~7 months (3.3× per year). Global AI compute capacity grew 3.3× per year since 2022, to 17.1 million H100-equivalents.",
      uk: "Від двох ігрових GPU (AlexNet, 2012) до ~1,1 млн H100-еквівалентів зі споживанням близько 1 ГВт (Colossus 2, 2026): стрибок приблизно у 500 000 разів за кількістю прискорювачів. Epoch: продуктивність провідного ШІ-суперкомп'ютера подвоюється приблизно кожні 9 місяців (2,5× на рік), його потужність — кожні ~13 місяців, а рекордні обчислення одного дата-центру — кожні ~7 місяців (3,3× на рік). Світова потужність ШІ-обчислень зростала у 3,3 раза на рік із 2022 року, до 17,1 млн H100-еквівалентів."
    },
    caveat: {
      en: "Many counts are Epoch estimates or press reports, not official disclosures; \"H100e\" is a compute equivalence, not a chip count. Epoch quotes IT power; facility power is about 1.3× higher. A training run may use only part of a site. Data-centre sizes are est. (Epoch AI), IT power.",
      uk: "Багато значень — оцінки Epoch або повідомлення преси, а не офіційні дані; «H100e» — еквівалент за обчисленнями, а не кількість чипів. Epoch наводить ІТ-потужність; потужність усього об'єкта приблизно в 1,3 раза вища. Навчальний запуск може використовувати лише частину майданчика. Розміри дата-центрів — оц. (Epoch AI), ІТ-потужність."
    },
    points: [
      {t: 2012.500, date: "2012", label: "AlexNet: 2× GTX 580 in one desktop (~0.5 kW of GPUs)", value: 2, est: false, sources: ["S-R6-57"]},
      {t: 2017.953, date: "2017-12", label: "AlphaZero: 5,000 first-generation TPUs for self-play (+64 TPU v2 for training)", value: 5000, est: false, sources: ["S-R6-58"]},
      {t: 2020.381, date: "2020-05-19", label: "Microsoft Azure supercomputer for OpenAI: 10,000 GPUs + 285,000 CPU cores (GPT-3 era)", value: 10000, est: false, sources: ["S-R6-60"]},
      {t: 2022.063, date: "2022-01-24", label: "Meta Research SuperCluster: 6,080 A100 at launch, 16,000 at full build (2022–23)", value: 16000, est: false, sources: ["S-R6-61"]},
      {t: 2022.500, date: "2022", label: "GPT-4 training cluster: ~25,000 A100 (~20 MW), est.", value: 25000, est: true, sources: ["S-R6-58", "S-R6-01"]},
      {t: 2024.195, date: "2024-03-12", label: "Meta GenAI clusters for Llama 3: two × 24,576 H100", value: 24576, est: false, sources: ["S-R6-59"]},
      {t: 2024.671, date: "2024-09-02", label: "xAI Colossus (Memphis): 100,000 H100, ~150 MW, built in ~4 months", value: 100000, est: false, sources: ["S-R6-58"]},
      {t: 2025.553, date: "2025-07-22", label: "Colossus phase 3: ~200,000 GPUs (~276k H100e), ~352 MW", value: 200000, est: false, sources: ["S-R6-58"]},
      {t: 2025.786, date: "2025-10", label: "Project Rainier (Amazon for Anthropic, Indiana): \"nearly half a million\" Trainium2; ~910 MW IT, est. (Epoch AI, Oct 2026)", value: 500000, est: false, sources: ["S-R6-62", "S-R6-58"]},
      {t: 2026.704, date: "2026-09", label: "Colossus 2 (xAI, Memphis/Southaven): ~1.1M H100e, ~946 MW IT, est. (Epoch AI). Largest known AI site as of Oct 2026; press reports ~440k GB300", value: 1100000, est: true, sources: ["S-R6-58", "S-R6-04"]}
    ],
    reference: null
  };

  S["dc-electricity-us"] = {
    group: "hardware", featured: false,
    title: {en: "US data-centre electricity use (LBNL)", uk: "Споживання електроенергії дата-центрами США (LBNL)"},
    unit: {en: "TWh per year, all US data centres", uk: "ТВт·год на рік, усі дата-центри США"}, scale: "linear",
    what: {
      en: "AI's growing physical footprint, US view: data centres used 176 TWh in 2023 (about 4.4% of US electricity), triple the 2014 level, and LBNL projects 325–580 TWh by 2028 (6.7–12% of US electricity).",
      uk: "Фізичний слід ШІ, погляд із США: 2023 року дата-центри спожили 176 ТВт·год (близько 4,4 % електроенергії США), утричі більше, ніж 2014-го, а LBNL прогнозує 325–580 ТВт·год до 2028 року (6,7–12 % електроенергії США)."
    },
    caveat: {
      en: "LBNL figures cover all data centres, not only AI. The 2028 value is the midpoint of a projection range (325–580 TWh).",
      uk: "Дані LBNL охоплюють усі дата-центри, а не лише ШІ. Значення 2028 року — середина прогнозного діапазону (325–580 ТВт·год)."
    },
    points: [
      {t: 2014.500, date: "2014", label: "US data centres (LBNL)", value: 58, est: false, sources: ["S-R6-102"]},
      {t: 2023.500, date: "2023", label: "US data centres (~4.4% of US electricity)", value: 176, est: false, sources: ["S-R6-102"]},
      {t: 2028.500, date: "2028", label: "LBNL projection, range 325–580 TWh (6.7–12% of US electricity); midpoint shown", value: 452, est: true, sources: ["S-R6-102"]}
    ],
    reference: null
  };

  S["dc-electricity-world"] = {
    group: "hardware", featured: false,
    title: {en: "World data-centre electricity use (IEA, 2025 edition)", uk: "Світове споживання електроенергії дата-центрами (IEA, видання 2025)"},
    unit: {en: "TWh per year, all data centres worldwide", uk: "ТВт·год на рік, усі дата-центри світу"}, scale: "linear",
    what: {
      en: "Global data centres used about 415 TWh in 2024, roughly 1.5% of world electricity, and the IEA's base case more than doubles that to about 945 TWh (just under 3%) by 2030.",
      uk: "2024 року дата-центри світу спожили близько 415 ТВт·год — приблизно 1,5 % світової електроенергії, а базовий сценарій IEA передбачає понад подвоєння до ~945 ТВт·год (трохи менше 3 %) до 2030 року."
    },
    caveat: {
      en: "IEA figures cover all data centres, not only AI: \"AI uses 1.5% of the world's electricity\" is a mix-up. The 2030 value is a projection (IEA Energy and AI, 2025, Base Case). The updated 2025 and 2030 figures are in the separate 2026-edition series; the two editions are not joined.",
      uk: "Дані IEA охоплюють усі дата-центри, а не лише ШІ: «ШІ споживає 1,5 % світової електроенергії» — плутанина. Значення 2030 року — прогноз (IEA, Energy and AI, 2025, базовий сценарій). Оновлені дані за 2025 і 2030 роки — в окремій серії видання 2026; два видання не з'єднуємо."
    },
    points: [
      {t: 2024.500, date: "2024", label: "World data centres (~1.5% of world electricity), IEA Energy and AI (2025)", value: 415, est: false, sources: ["S-R6-101", "S-AUD-18"]},
      {t: 2030.500, date: "2030", label: "IEA Base Case projection (just under 3%)", value: 945, est: true, sources: ["S-R6-101", "S-AUD-18"]}
    ],
    reference: null
  };

  S["dc-electricity-world-2026"] = {
    group: "hardware", featured: false,
    title: {en: "World data-centre electricity use (IEA, April 2026 update)", uk: "Світове споживання електроенергії дата-центрами (IEA, оновлення за квітень 2026)"},
    unit: {en: "TWh per year, all data centres worldwide", uk: "ТВт·год на рік, усі дата-центри світу"}, scale: "linear",
    what: {
      en: "The IEA's April 2026 update: 485 TWh in 2025, up 17% on 2024, with AI-focused data centres up about 50%; about 950 TWh (around 3% of world electricity) expected by 2030. AI-specific data-centre capacity reached about 30 GW by end-2025 (Epoch AI via AI Index 2026; rated capacity, not energy used).",
      uk: "Оновлення IEA за квітень 2026: 485 ТВт·год у 2025 році, на 17 % більше, ніж 2024-го, причому дата-центри, орієнтовані на ШІ, зросли приблизно на 50 %; до 2030 року очікується ~950 ТВт·год (близько 3 % світової електроенергії). Потужність дата-центрів саме для ШІ сягнула ~30 ГВт наприкінці 2025 року (Epoch AI через AI Index 2026; номінальна потужність, а не спожита енергія)."
    },
    caveat: {
      en: "Audit addition. Plot as a separate \"2026 edition\" line, not joined to the 2025-edition series. All data centres, not only AI. The 2030 value is a projection. The 29.6 GW capacity figure is AI-chip TDP (~11.8 GW) × about 2.5 for cooling and infrastructure.",
      uk: "Доповнення аудиту. Малюйте окремою лінією «видання 2026», не з'єднуючи з серією видання 2025. Усі дата-центри, а не лише ШІ. Значення 2030 року — прогноз. 29,6 ГВт потужності — це TDP ШІ-чипів (~11,8 ГВт) × ~2,5 на охолодження та інфраструктуру."
    },
    points: [
      {t: 2025.500, date: "2025", label: "World data centres, IEA April 2026 update (+17% on 2024; AI-focused data centres +50%)", value: 485, est: false, sources: ["S-AUD-19"]},
      {t: 2030.500, date: "2030", label: "IEA April 2026 update projection (~3% of world electricity)", value: 950, est: true, sources: ["S-AUD-19"]}
    ],
    reference: null
  };

  /* ───────────────────────── investment ───────────────────────── */

  S["investment"] = {
    group: "investment", featured: true,
    title: {en: "Global private AI investment (Stanford AI Index / Quid)", uk: "Світові приватні інвестиції в ШІ (Stanford AI Index / Quid)"},
    unit: {en: "billion USD per year (nominal)", uk: "млрд USD на рік (у номінальних цінах)"}, scale: "log",
    what: {
      en: "Private funding of AI companies grew about 10× from 2017 to 2025 and more than doubled in 2025 alone (+127.5%) to $344.7B; generative-AI startups took $170.9B, nearly half. In 2025 there were 28 funding rounds above $1B; the US accounted for $285.9B and China for $12.4B.",
      uk: "Приватне фінансування ШІ-компаній зросло приблизно в 10 разів із 2017 до 2025 року і лише за 2025 рік більш ніж подвоїлося (+127,5 %) до 344,7 млрд $; генеративні ШІ-стартапи отримали 170,9 млрд $, майже половину. 2025 року було 28 раундів понад 1 млрд $; на США припало 285,9 млрд $, на Китай — 12,4 млрд $."
    },
    caveat: {
      en: "AI Index 2026 data; earlier editions report lower values, because Quid's database grows and each edition revises history (2023 was $95.99B in the 2024 edition and $104.34B in the 2025/2026 editions). The 2017–2022 values are read from the stacked-bar labels of AI Index 2026 Fig. 4.2.1. Private investment is not total corporate investment ($581.7B in 2025, which adds M&A, minority stakes and public offerings). Chinese state \"guidance fund\" spending is excluded.",
      uk: "Дані AI Index 2026; попередні видання наводять менші значення, бо база Quid росте і кожне видання переглядає історію (2023 рік: 95,99 млрд $ у виданні 2024 і 104,34 млрд $ у виданнях 2025/2026). Значення за 2017–2022 роки зчитано з підписів стовпчиків рис. 4.2.1 AI Index 2026. Приватні інвестиції — не те саме, що загальні корпоративні (581,7 млрд $ у 2025 році, куди входять M&A, міноритарні частки й публічні розміщення). Витрати китайських державних «фондів-провідників» не враховано."
    },
    points: [
      {t: 2017.500, date: "2017", label: "Private AI investment", value: 25.72, est: false, sources: ["S-R6-92"]},
      {t: 2018.500, date: "2018", label: "Private AI investment", value: 43.1, est: false, sources: ["S-R6-92"]},
      {t: 2019.500, date: "2019", label: "Private AI investment", value: 58.18, est: false, sources: ["S-R6-92"]},
      {t: 2020.500, date: "2020", label: "Private AI investment", value: 73.79, est: false, sources: ["S-R6-92"]},
      {t: 2021.500, date: "2021", label: "Private AI investment (2021 venture boom)", value: 145.4, est: false, sources: ["S-R6-92"]},
      {t: 2022.500, date: "2022", label: "Private AI investment", value: 113.01, est: false, sources: ["S-R6-92"]},
      {t: 2023.500, date: "2023", label: "Private AI investment (the 2024 edition first reported $95.99B)", value: 104.34, est: false, sources: ["S-R6-92", "S-R6-90"]},
      {t: 2024.500, date: "2024", label: "Private AI investment (2025 edition: $150.79B; US $109.1B, China $9.3B)", value: 151.48, est: false, sources: ["S-R6-92", "S-R6-91"]},
      {t: 2025.500, date: "2025", label: "Private AI investment (+127.5%; US $285.9B, China $12.4B; 28 rounds over $1B)", value: 344.66, est: false, sources: ["S-R6-92"]}
    ],
    reference: null
  };

  S["investment-corporate"] = {
    group: "investment", featured: false,
    title: {en: "Global corporate AI investment, all four categories (AI Index / Quid)", uk: "Світові корпоративні інвестиції в ШІ, усі чотири категорії (AI Index / Quid)"},
    unit: {en: "billion USD per year (M&A + minority stakes + private investment + public offerings)", uk: "млрд USD на рік (M&A + міноритарні частки + приватні інвестиції + публічні розміщення)"}, scale: "log",
    what: {
      en: "Total corporate money flowing into AI companies grew about 40× from 2013 to 2025. It peaked in the 2021 boom, dipped in 2022–23, then exploded in 2025 (+129.9%) to $581.7B, of which M&A was $214.4B.",
      uk: "Загальний потік корпоративних грошей у ШІ-компанії зріс приблизно у 40 разів із 2013 до 2025 року. Пік припав на бум 2021 року, у 2022–23 роках був спад, а 2025-го — вибух (+129,9 %) до 581,7 млрд $, з яких 214,4 млрд $ — M&A."
    },
    caveat: {
      en: "Values are the bar totals of AI Index 2026 Fig. 4.2.1, printed in sequence in the report. Earlier editions give lower numbers for the same years. Do not call this \"private investment\": that is one sub-category (the separate series).",
      uk: "Значення — підсумки стовпчиків рис. 4.2.1 AI Index 2026, надруковані у звіті послідовно. Попередні видання дають менші числа за ті самі роки. Не називайте це «приватними інвестиціями»: то лише одна з категорій (окрема серія)."
    },
    points: [
      {t: 2013.500, date: "2013", label: "Corporate AI investment", value: 14.57, est: false, sources: ["S-R6-92"]},
      {t: 2014.500, date: "2014", label: "Corporate AI investment", value: 19.04, est: false, sources: ["S-R6-92"]},
      {t: 2015.500, date: "2015", label: "Corporate AI investment", value: 25.43, est: false, sources: ["S-R6-92"]},
      {t: 2016.500, date: "2016", label: "Corporate AI investment", value: 33.82, est: false, sources: ["S-R6-92"]},
      {t: 2017.500, date: "2017", label: "Corporate AI investment", value: 53.72, est: false, sources: ["S-R6-92"]},
      {t: 2018.500, date: "2018", label: "Corporate AI investment", value: 79.62, est: false, sources: ["S-R6-92"]},
      {t: 2019.500, date: "2019", label: "Corporate AI investment", value: 103.27, est: false, sources: ["S-R6-92"]},
      {t: 2020.500, date: "2020", label: "Corporate AI investment", value: 221.87, est: false, sources: ["S-R6-92"]},
      {t: 2021.500, date: "2021", label: "Corporate AI investment (2021 boom peak)", value: 360.73, est: false, sources: ["S-R6-92"]},
      {t: 2022.500, date: "2022", label: "Corporate AI investment", value: 253.25, est: false, sources: ["S-R6-92"]},
      {t: 2023.500, date: "2023", label: "Corporate AI investment", value: 201, est: false, sources: ["S-R6-92"]},
      {t: 2024.500, date: "2024", label: "Corporate AI investment", value: 253.02, est: false, sources: ["S-R6-92"]},
      {t: 2025.500, date: "2025", label: "Corporate AI investment (+129.9%; of which M&A $214.4B, +132.6%)", value: 581.69, est: false, sources: ["S-R6-92"]}
    ],
    reference: null
  };

  S["investment-genai"] = {
    group: "investment", featured: false,
    title: {en: "Private investment in generative-AI companies (AI Index / Quid)", uk: "Приватні інвестиції в компанії генеративного ШІ (AI Index / Quid)"},
    unit: {en: "billion USD per year, as first reported in each AI Index edition", uk: "млрд USD на рік, як уперше повідомлено в кожному виданні AI Index"}, scale: "log",
    what: {
      en: "Generative AI went from a niche to half of all private AI funding: 2025's $170.9B is roughly 7× the 2023 figure. US generative-AI investment alone was $163.6B in 2025.",
      uk: "Генеративний ШІ пройшов шлях від ніші до половини всього приватного фінансування ШІ: 170,9 млрд $ у 2025 році — приблизно у 7 разів більше, ніж 2023-го. Лише у США генеративний ШІ зібрав 163,6 млрд $ у 2025 році."
    },
    caveat: {
      en: "Values come from three editions (2024, 2025, 2026). The 2026 edition calls 2025 \"an increase of over 200% from 2024\", which implies a revised 2024 base well above the $33.9B first reported; the exact revised value was not extractable.",
      uk: "Значення взято з трьох видань (2024, 2025, 2026). Видання 2026 називає 2025 рік «зростанням понад 200 % від 2024», що означає переглянуту базу 2024 року, значно вищу за вперше повідомлені 33,9 млрд $; точне переглянуте значення видобути не вдалося."
    },
    points: [
      {t: 2023.500, date: "2023", label: "GenAI private investment (\"nearly octupling\" from 2022; AI Index 2024)", value: 25.23, est: false, sources: ["S-R6-90"]},
      {t: 2024.500, date: "2024", label: "GenAI private investment (+18.7%; AI Index 2025)", value: 33.94, est: false, sources: ["S-R6-91"]},
      {t: 2025.500, date: "2025", label: "GenAI private investment (\"nearly half\" of all private AI investment; AI Index 2026)", value: 170.87, est: false, sources: ["S-R6-92"]}
    ],
    reference: null
  };

  S["capex-total"] = {
    group: "investment", featured: true,
    title: {en: "Big-tech capital expenditure: Alphabet + Amazon + Meta + Microsoft", uk: "Капітальні витрати великих технокомпаній: Alphabet + Amazon + Meta + Microsoft"},
    unit: {en: "billion USD per year (sum of differing definitions; 2026 = guidance midpoint)", uk: "млрд USD на рік (сума за різними визначеннями; 2026 = середина прогнозу компаній)"}, scale: "linear",
    what: {
      en: "The data-centre build-out. Combined capex of the four largest US cloud and platform companies went from about $140B (2023) to about $217B (2024), about $358B (2025) and roughly $720–745B guided for 2026 (latest guidance, July 2026): about a five-fold rise in three years.",
      uk: "Розбудова дата-центрів. Сукупні капітальні витрати чотирьох найбільших хмарних і платформних компаній США зросли з ~140 млрд $ (2023) до ~217 млрд $ (2024), ~358 млрд $ (2025) і приблизно 720–745 млрд $ за прогнозами на 2026 рік (останній прогноз, липень 2026): приблизно п'ятикратне зростання за три роки."
    },
    caveat: {
      en: "Our own arithmetic across differing fiscal years and definitions, not an outlet's figure, so every point is est. Not all capex is AI; no company breaks out AI capex. Microsoft's fiscal year ends in June: the 2023–2025 totals use Microsoft FY23–FY25 (the 2025 total is $408.9B with FY26), and the 2026 total uses Microsoft's calendar-2026 guidance. Meta and Microsoft headline figures include finance leases; Amazon's gross cash figure is used. 2026 guidance was revised during the year, partly because of memory and component price inflation.",
      uk: "Наша власна арифметика за різними фінансовими роками й визначеннями, а не цифра якогось видання, тому кожна точка — оц. Не всі капітальні витрати — ШІ; жодна компанія не виокремлює витрати на ШІ. Фінансовий рік Microsoft закінчується в червні: підсумки 2023–2025 беруть FY23–FY25 Microsoft (підсумок 2025 року — 408,9 млрд $ із FY26), а підсумок 2026 року — календарний прогноз Microsoft на 2026 рік. Заголовні цифри Meta й Microsoft містять фінансову оренду; для Amazon узято валові грошові витрати. Прогнози на 2026 рік переглядали протягом року, частково через подорожчання пам'яті й комплектувальних."
    },
    points: [
      {t: 2023.500, date: "2023", label: "Total of the four (our sum; Microsoft FY23)", value: 140.1, est: true, sources: ["S-R6-93", "S-R6-94", "S-R6-95", "S-R6-96"]},
      {t: 2024.500, date: "2024", label: "Total of the four (our sum; Microsoft FY24)", value: 217.3, est: true, sources: ["S-R6-93", "S-R6-94", "S-R6-95", "S-R6-96"]},
      {t: 2025.500, date: "2025", label: "Total of the four (our sum; Microsoft FY25; $408.9B with FY26)", value: 357.5, est: true, sources: ["S-R6-93", "S-R6-94", "S-R6-95", "S-R6-96"]},
      {t: 2026.500, date: "2026", label: "Latest guidance as of Jul 2026 (audit sum; range $720–745B, midpoint shown; Meta and Microsoft incl. leases)", value: 732.5, est: true, sources: ["S-R6-97", "S-R6-98", "S-R6-99", "S-R6-100", "S-AUD-20", "S-AUD-21", "S-AUD-22"]}
    ],
    reference: null
  };

  S["capex-alphabet"] = {
    group: "investment", featured: false,
    title: {en: "Alphabet capital expenditure", uk: "Капітальні витрати Alphabet"},
    unit: {en: "billion USD per year (cash purchases of property and equipment; 2026 = guidance midpoint)", uk: "млрд USD на рік (грошові купівлі основних засобів; 2026 = середина прогнозу)"}, scale: "linear",
    what: {
      en: "Alphabet's capex nearly tripled from 2023 to 2025 and is guided at $195–205B for 2026, more than six times its 2023 level.",
      uk: "Капітальні витрати Alphabet майже потроїлися з 2023 до 2025 року, а на 2026 рік заплановано 195–205 млрд $ — понад ушестеро більше, ніж 2023-го."
    },
    caveat: {
      en: "SEC filings for 2023–2025. The 2026 value is the midpoint of company guidance raised on 22 July 2026 from $180–190B (April) and $175–185B (February). Not all capex is AI.",
      uk: "Звіти до SEC за 2023–2025 роки. Значення 2026 року — середина прогнозу компанії, підвищеного 22 липня 2026 року зі 180–190 млрд $ (квітень) і 175–185 млрд $ (лютий). Не всі капітальні витрати — ШІ."
    },
    points: [
      {t: 2023.500, date: "2023", label: "Alphabet", value: 32.25, est: false, sources: ["S-R6-93"]},
      {t: 2024.500, date: "2024", label: "Alphabet", value: 52.54, est: false, sources: ["S-R6-93"]},
      {t: 2025.500, date: "2025", label: "Alphabet", value: 91.45, est: false, sources: ["S-R6-93"]},
      {t: 2026.500, date: "2026", label: "Guidance $195–205B (raised 22 Jul 2026 from $180–190B in Apr and $175–185B in Feb; midpoint)", value: 200, est: true, sources: ["S-R6-97", "S-AUD-20"]}
    ],
    reference: null
  };

  S["capex-amazon"] = {
    group: "investment", featured: false,
    title: {en: "Amazon capital expenditure", uk: "Капітальні витрати Amazon"},
    unit: {en: "billion USD per year (gross cash purchases of property and equipment; 2026 = guidance)", uk: "млрд USD на рік (валові грошові купівлі основних засобів; 2026 = прогноз)"}, scale: "linear",
    what: {
      en: "Amazon's gross capex rose 2.5× from 2023 to 2025 and is guided at about $220B for 2026, the largest single figure among the four companies.",
      uk: "Валові капітальні витрати Amazon зросли у 2,5 раза з 2023 до 2025 року, а на 2026 рік заплановано близько 220 млрд $ — найбільша окрема цифра серед чотирьох компаній."
    },
    caveat: {
      en: "Amazon's gross cash figure is shown; its own \"capex\" nets out incentives. The 2026 guidance was raised on 30 July 2026 from \"about $200 billion\" (February), citing memory prices. Not all capex is AI.",
      uk: "Показано валову грошову цифру Amazon; власний показник «capex» компанії віднімає стимули. Прогноз на 2026 рік підвищено 30 липня 2026 року з «близько 200 млрд $» (лютий), посилаючись на ціни на пам'ять. Не всі капітальні витрати — ШІ."
    },
    points: [
      {t: 2023.500, date: "2023", label: "Amazon (gross cash)", value: 52.73, est: false, sources: ["S-R6-94"]},
      {t: 2024.500, date: "2024", label: "Amazon", value: 83.00, est: false, sources: ["S-R6-94"]},
      {t: 2025.500, date: "2025", label: "Amazon", value: 131.82, est: false, sources: ["S-R6-94"]},
      {t: 2026.500, date: "2026", label: "Guidance ~$220B (raised 30 Jul 2026 from \"about $200 billion\" in Feb, citing memory prices)", value: 220, est: true, sources: ["S-R6-98", "S-AUD-21"]}
    ],
    reference: null
  };

  S["capex-meta"] = {
    group: "investment", featured: false,
    title: {en: "Meta capital expenditure", uk: "Капітальні витрати Meta"},
    unit: {en: "billion USD per year (cash purchases of property and equipment; 2026 = guidance midpoint incl. finance leases)", uk: "млрд USD на рік (грошові купівлі основних засобів; 2026 = середина прогнозу разом із фінансовою орендою)"}, scale: "linear",
    what: {
      en: "Meta's capex went from $27B (2023) to $70B (2025) and is guided at $130–145B for 2026 including finance leases, about five times its 2023 level.",
      uk: "Капітальні витрати Meta зросли з 27 млрд $ (2023) до 70 млрд $ (2025), а на 2026 рік заплановано 130–145 млрд $ разом із фінансовою орендою — приблизно вп'ятеро більше, ніж 2023-го."
    },
    caveat: {
      en: "2023–2025 are cash figures; Meta's headline figures including finance leases are higher (~$39.2B for 2024, $72.2B for 2025). The 2026 guidance (July 2026, raised twice) includes leases, so it is not strictly comparable with the cash series. Not all capex is AI.",
      uk: "2023–2025 — грошові цифри; заголовні показники Meta з фінансовою орендою вищі (~39,2 млрд $ за 2024, 72,2 млрд $ за 2025). Прогноз на 2026 рік (липень 2026, підвищений двічі) містить оренду, тож він не зовсім порівнянний із грошовою серією. Не всі капітальні витрати — ШІ."
    },
    points: [
      {t: 2023.500, date: "2023", label: "Meta (cash)", value: 27.05, est: false, sources: ["S-R6-95"]},
      {t: 2024.500, date: "2024", label: "Meta (cash; ~$39.2B incl. finance leases)", value: 37.26, est: false, sources: ["S-R6-95"]},
      {t: 2025.500, date: "2025", label: "Meta (cash; $72.2B incl. finance leases)", value: 69.69, est: false, sources: ["S-R6-95"]},
      {t: 2026.500, date: "2026", label: "Guidance $130–145B incl. leases (Jul 2026; raised twice; midpoint)", value: 137.5, est: true, sources: ["S-R6-99"]}
    ],
    reference: null
  };

  S["capex-microsoft"] = {
    group: "investment", featured: false,
    title: {en: "Microsoft capital expenditure (fiscal years to 30 June)", uk: "Капітальні витрати Microsoft (фінансові роки до 30 червня)"},
    unit: {en: "billion USD per fiscal year (cash purchases of property and equipment); calendar-2026 guidance incl. finance leases", uk: "млрд USD за фінансовий рік (грошові купівлі основних засобів); календарний прогноз на 2026 рік разом із фінансовою орендою"}, scale: "linear",
    what: {
      en: "Microsoft's cash capex quadrupled in three fiscal years, from $28.1B (FY2023) to $116B (FY2026, about $145B including finance leases), and the company guides approximately $175B for calendar 2026.",
      uk: "Грошові капітальні витрати Microsoft за три фінансові роки зросли вчетверо: з 28,1 млрд $ (FY2023) до 116 млрд $ (FY2026, близько 145 млрд $ разом із фінансовою орендою), а на календарний 2026 рік компанія прогнозує приблизно 175 млрд $."
    },
    caveat: {
      en: "Microsoft's fiscal year ends in June, so fiscal-year points sit at the fiscal-year midpoint (1 January; FY2023 → 2023.0). Headline figures include finance leases and are higher than the cash values plotted. The calendar-2026 point is guidance: \"roughly $190 billion\" (April 2026), restated as \"approximately $175 billion\" after a lease reclassification (July 2026), including leases; it overlaps FY2026 and FY2027 and is not a fifth fiscal year. Not all capex is AI.",
      uk: "Фінансовий рік Microsoft закінчується в червні, тож точки фінансових років стоять на середині фінансового року (1 січня; FY2023 → 2023,0). Заголовні цифри містять фінансову оренду і вищі за показані грошові. Точка календарного 2026 року — прогноз: «приблизно 190 млрд $» (квітень 2026), переглянутий до «приблизно 175 млрд $» після перекласифікації оренди (липень 2026), разом з орендою; він перекриває FY2026 і FY2027 і не є п'ятим фінансовим роком. Не всі капітальні витрати — ШІ."
    },
    points: [
      {t: 2023.0, date: "FY2023", label: "FY to June 2023, cash", value: 28.11, est: false, sources: ["S-R6-96"]},
      {t: 2024.0, date: "FY2024", label: "FY to June 2024", value: 44.48, est: false, sources: ["S-R6-96"]},
      {t: 2025.0, date: "FY2025", label: "FY to June 2025", value: 64.55, est: false, sources: ["S-R6-96"]},
      {t: 2026.0, date: "FY2026", label: "FY to June 2026; cash $115.95B (~$145B incl. finance leases)", value: 115.95, est: false, sources: ["S-R6-96", "S-R6-100"]},
      {t: 2026.500, date: "2026", label: "Calendar-2026 guidance: \"roughly $190 billion\" (Apr 2026), restated as \"approximately $175 billion\" after a lease reclassification (Jul 2026), incl. leases", value: 175, est: true, sources: ["S-R6-100", "S-AUD-22"]}
    ],
    reference: null
  };

  /* ───────────────────────── saturation ───────────────────────── */

  S["benchmark-saturation"] = {
    group: "saturation", featured: true,
    title: {en: "Years from benchmark release to beating the human reference", uk: "Років від появи бенчмарка до перевищення людського орієнтира"},
    unit: {en: "years from release to the first state-of-the-art result above the stated human (or expert) reference", uk: "років від появи до першого найкращого результату вище за вказаний людський (чи експертний) орієнтир"}, scale: "linear",
    what: {
      en: "Benchmarks saturate in months, not decades. Those introduced in the 1990s took one to two decades to fall (Switchboard 24 years, MNIST 13), those of 2016–2019 one to two years, and those of 2023–2025 about one year (GPQA Diamond 1.1, ARC-AGI-2 0.9). The AI Index 2026: evaluations intended to be challenging for years are saturated in months. Chart form: one bar per benchmark at its release date, with bar length = years to human level.",
      uk: "Бенчмарки насичуються за місяці, а не десятиліття. Ті, що з'явилися у 1990-х, трималися одне-два десятиліття (Switchboard — 24 роки, MNIST — 13), бенчмарки 2016–2019 років — рік-два, а 2023–2025 років — близько року (GPQA Diamond — 1,1, ARC-AGI-2 — 0,9). AI Index 2026: оцінки, задумані як складні на роки, насичуються за місяці. Форма графіка: один стовпчик на бенчмарк на даті його появи, довжина = років до людського рівня."
    },
    caveat: {
      en: "\"Human baselines\" differ wildly: one expert (ImageNet), crowd workers (GLUE, SQuAD), professional transcribers (Switchboard), estimated experts (MMLU), validators (GPQA), puzzle-panel averages (ARC). Beating a human reference on a benchmark is not human-level ability on the underlying task. The newest hard tests (Humanity's Last Exam, FrontierMath, SWE-bench Verified) have no human baseline, so they have no bar here: HLE's best no-tools score went from 9% to about 55% in 20 months (not saturated), and any \"% of human\" framing for these three is an AI Index re-scaling, not a measured human score. The approach follows Kiela et al. (Dynabench, 2021) and the AI Index chart of benchmarks versus human performance.",
      uk: "«Людські орієнтири» дуже різні: один експерт (ImageNet), краудворкери (GLUE, SQuAD), професійні транскрибатори (Switchboard), оцінені експерти (MMLU), валідатори (GPQA), середнє панелі для головоломок (ARC). Перевищити людський орієнтир на бенчмарку — не те саме, що досягти людського рівня в самій задачі. Найновіші складні тести (Humanity's Last Exam, FrontierMath, SWE-bench Verified) людського орієнтира не мають, тож стовпчика для них тут немає: найкращий результат HLE без інструментів зріс із 9 % до ~55 % за 20 місяців (не насичений), а будь-яке «% від людини» для цих трьох — перемасштабування AI Index, а не виміряний людський результат. Підхід іде за Kiela et al. (Dynabench, 2021) і графіком AI Index «бенчмарки проти людської продуктивності»."
    },
    points: [
      {t: 1992.500, date: "1992", introduced: "1992", saturated: "2016-10", label: "Switchboard conversational speech (corpus published 1992) → Oct 2016: Microsoft 5.9% word error = professional transcribers 5.9% (revised 5.8%)", labelUk: "Розмовне мовлення Switchboard (корпус опубліковано 1992) → жовтень 2016: Microsoft 5,9 % помилок у словах = професійні транскрибувальники 5,9 % (переглянуто до 5,8 %)", value: 24, est: false, sources: ["S-R6-34", "S-R6-32"]},
      {t: 1998.500, date: "1998", introduced: "1998", saturated: "2012-02", label: "MNIST handwritten digits (LeCun et al. 1998) → Feb 2012: Ciresan et al., \"first to achieve near-human performance\" (0.23% error)", labelUk: "Рукописні цифри MNIST (Лекун та ін., 1998) → лютий 2012: Чіресан та ін., «перші досягли майже людського рівня» (0,23 % помилок)", value: 13.3, est: false, sources: ["S-R6-33"]},
      {t: 2010.500, date: "2010", introduced: "2010", saturated: "2015-02", label: "ImageNet ILSVRC classification → Feb 2015: PReLU-net 4.94% vs human 5.1%", labelUk: "Класифікація ImageNet ILSVRC → лютий 2015: PReLU-net 4,94 % проти людини 5,1 %", value: 4.8, est: false, sources: ["S-R6-16", "S-R6-18"]},
      {t: 2016.455, date: "2016-06", introduced: "2016-06", saturated: "2018-01-03", label: "SQuAD 1.1 reading comprehension → 3 Jan 2018: MSRA r-net+ EM 82.65 vs human EM 82.30 (F1 surpassed 26 Sep 2018)", labelUk: "Розуміння прочитаного SQuAD 1.1 → 3 січня 2018: MSRA r-net+ EM 82,65 проти людини EM 82,30 (F1 перевершено 26 вересня 2018)", value: 1.6, est: false, sources: ["S-R6-35"]},
      {t: 2018.285, date: "2018-04", introduced: "2018-04", saturated: "2019-05", label: "GLUE language understanding → by May 2019 \"surpassed the level of non-expert humans\" (human 87.1)", labelUk: "Розуміння мови GLUE → до травня 2019 «перевершили рівень неекспертів» (людина 87,1)", value: 1.1, est: false, sources: ["S-R6-36"]},
      {t: 2018.452, date: "2018-06", introduced: "2018-06", saturated: "2019-03-20", label: "SQuAD 2.0 (with unanswerable questions) → 20 Mar 2019: BERT+DAE+AoA (HIT/iFLYTEK) EM 87.15 vs human 86.83", labelUk: "SQuAD 2.0 (із запитаннями без відповіді) → 20 березня 2019: BERT+DAE+AoA (HIT/iFLYTEK) EM 87,15 проти людини 86,83", value: 0.8, est: false, sources: ["S-R6-35"]},
      {t: 2019.367, date: "2019-05", introduced: "2019-05", saturated: "2021-01-06", label: "SuperGLUE → 6 Jan 2021: DeBERTa ensemble 90.3 vs human 89.8", labelUk: "SuperGLUE → 6 січня 2021: ансамбль DeBERTa 90,3 проти людини 89,8", value: 1.7, est: false, sources: ["S-R6-37"]},
      {t: 2019.871, date: "2019-11", introduced: "2019-11", saturated: "2024-12-20", label: "ARC-AGI-1 → 20 Dec 2024: o3-preview 87.5% (above the 85% prize line and the 64.2% panel average; an unreleased preview at ~172× compute)", labelUk: "ARC-AGI-1 → 20 грудня 2024: o3-preview 87,5 % (понад призову межу 85 % і середні 64,2 % панелі; невипущений preview за ~172× обчислень)", value: 5.1, est: false, sources: ["S-R6-26"]},
      {t: 2020.707, date: "2020-09", introduced: "2020-09", saturated: "2023-12-06", label: "MMLU → 6 Dec 2023: Gemini Ultra 90.0% (CoT@32) vs 89.8% expert estimate. Under ordinary settings: Claude 3.5 Sonnet 90.4% (5-shot CoT), Jun 2024 = 3.8 yr", labelUk: "MMLU → 6 грудня 2023: Gemini Ultra 90,0 % (CoT@32) проти експертної оцінки 89,8 %. У звичайних налаштуваннях: Claude 3.5 Sonnet 90,4 % (5-shot CoT), червень 2024 = 3,8 року", value: 3.2, est: false, sources: ["S-R6-21", "S-R6-113"]},
      {t: 2023.871, date: "2023-11", introduced: "2023-11", saturated: "2024-12-20", label: "GPQA Diamond → 20 Dec 2024: o3-preview 87.7% vs the paper's 81.3% Diamond expert figure. OpenAI's ~69.7% PhD panel was passed by o1-preview in Sept 2024 (0.8 yr)", labelUk: "GPQA Diamond → 20 грудня 2024: o3-preview 87,7 % проти 81,3 % експертів Diamond зі статті. Панель OpenAI із PhD (~69,7 %) перевершила o1-preview у вересні 2024 (0,8 року)", value: 1.1, est: false, sources: ["S-R6-22", "S-R6-111", "S-R6-23"]},
      {t: 2025.200, date: "2025-03", introduced: "2025-03", saturated: "2026-02-05", label: "ARC-AGI-2 → 5 Feb 2026: Claude Opus 4.6 69.2% vs 60% panel average (85% prize line reached 23 Apr 2026)", labelUk: "ARC-AGI-2 → 5 лютого 2026: Claude Opus 4.6 69,2 % проти середніх 60 % панелі (призову межу 85 % досягнуто 23 квітня 2026)", value: 0.9, est: false, sources: ["S-R6-27", "S-R6-20"]}
    ],
    reference: null
  };

  /* ───────────────────────── horizon ───────────────────────── */

  S["metr-horizon"] = {
    group: "horizon", featured: true,
    title: {en: "METR 50% task-completion time horizon", uk: "Часовий горизонт METR: завдання, які агент виконує у 50 % випадків"},
    unit: {en: "minutes of human-expert working time (50% success; point estimate, 95% CI in the label)", uk: "хвилин роботи людини-експерта (успіх у 50 % випадків; точкова оцінка, 95 % ДІ в підписі)"}, scale: "log",
    what: {
      en: "How long a task an AI agent can finish on its own. The horizon grew from seconds (GPT-2, 2019) to about 4 minutes (GPT-4, March 2023) and about 12 hours (Claude Opus 4.6, February 2026), roughly 180× in under three years. METR's fitted doubling time is about 188 days over 2019–2026 and about 129 days (~4.3 months; 95% CI 104–158 days) for models since 2023; the original March 2025 paper reported about 7 months.",
      uk: "Наскільки довге завдання агент ШІ може виконати самостійно. Горизонт виріс із секунд (GPT-2, 2019) до ~4 хвилин (GPT-4, березень 2023) і ~12 годин (Claude Opus 4.6, лютий 2026) — приблизно у 180 разів менш ніж за три роки. Підібраний METR час подвоєння — близько 188 днів за 2019–2026 і близько 129 днів (~4,3 місяця; 95 % ДІ 104–158 днів) для моделей із 2023 року; у первісній статті за березень 2025 ішлося про ~7 місяців."
    },
    caveat: {
      en: "Software-engineering and ML-research tasks only, with METR's own agent scaffold. Measurements above about 16 hours are unreliable with METR's current task suite (METR, May 2026), so the points for Claude Mythos Preview (~17.4 h) and GPT-5.6 Sol (~11.3 h with cheating counted as failure; >270 h if counted as success; METR: not a robust measurement) are marked est. and sit at the limit of METR's ruler: draw the curve solid to February 2026 and later points hollow or dashed. There is no published horizon for GPT-6 Astra or Claude Opus 5.5. Values are from the Time Horizon 1.1 suite (January 2026); earlier published TH 1.0 numbers differ slightly (Claude 3.7 Sonnet ~50 min in the paper vs 60 min on TH 1.1).",
      uk: "Лише завдання з розробки ПЗ і ML-досліджень, з власною обгорткою агента (harness) METR. Вимірювання понад ~16 годин ненадійні з нинішнім набором завдань METR (METR, травень 2026), тож точки для Claude Mythos Preview (~17,4 год) і GPT-5.6 Sol (~11,3 год, якщо шахрайство рахувати як провал; >270 год, якщо як успіх; METR: «не надійне вимірювання») позначено як оц., і вони лежать на межі «лінійки» METR: малюйте криву суцільною до лютого 2026, а пізніші точки — порожніми чи пунктиром. Опублікованого горизонту для GPT-6 Astra чи Claude Opus 5.5 немає. Значення — з набору Time Horizon 1.1 (січень 2026); раніше опубліковані числа TH 1.0 трохи відрізняються (Claude 3.7 Sonnet ~50 хв у статті проти 60 хв на TH 1.1)."
    },
    points: [
      {t: 2019.121, date: "2019-02-14", label: "GPT-2 (~3 seconds; CI 0.01–0.14 min)", value: 0.05, est: false, sources: ["S-R6-51"]},
      {t: 2020.405, date: "2020-05-28", label: "GPT-3 (davinci-002; ~8 s)", value: 0.14, est: false, sources: ["S-R6-51"]},
      {t: 2022.200, date: "2022-03-15", label: "GPT-3.5 (gpt-3.5-turbo-instruct; ~36 s; CI 0.26–1.1 min)", value: 0.6, est: false, sources: ["S-R6-51"]},
      {t: 2023.197, date: "2023-03-14", label: "GPT-4 (CI 1.9–8.0 min)", value: 4.0, est: false, sources: ["S-R6-51"]},
      {t: 2024.364, date: "2024-05-13", label: "GPT-4o (CI 4.0–12.9)", value: 7.0, est: false, sources: ["S-R6-51"]},
      {t: 2024.468, date: "2024-06-20", label: "Claude 3.5 Sonnet (Jun) (CI 5.5–22.4)", value: 11.4, est: false, sources: ["S-R6-51"]},
      {t: 2024.699, date: "2024-09-12", label: "o1-preview (CI 11.7–33.4)", value: 20.3, est: false, sources: ["S-R6-51"]},
      {t: 2024.929, date: "2024-12-05", label: "o1 (CI 21.2–65.0)", value: 38.8, est: false, sources: ["S-R6-51"]},
      {t: 2025.148, date: "2025-02-24", label: "Claude 3.7 Sonnet, ~1 hour (CI 33–104)", value: 60.4, est: false, sources: ["S-R6-51"]},
      {t: 2025.288, date: "2025-04-16", label: "o3, ~2 hours (CI 75–191)", value: 119.7, est: false, sources: ["S-R6-51"]},
      {t: 2025.597, date: "2025-08-07", label: "GPT-5, ~3.4 h (CI 113–406)", value: 203.0, est: false, sources: ["S-R6-51"]},
      {t: 2025.879, date: "2025-11-18", label: "Gemini 3 Pro, ~3.7 h (CI 140–379)", value: 224.3, est: false, sources: ["S-R6-51"]},
      {t: 2025.896, date: "2025-11-24", label: "Claude Opus 4.5, ~4.9 h (CI 162–624)", value: 293.0, est: false, sources: ["S-R6-51"]},
      {t: 2025.942, date: "2025-12-11", label: "GPT-5.2, ~5.9 h (CI 198–815)", value: 352.3, est: false, sources: ["S-R6-51"]},
      {t: 2026.096, date: "2026-02-05", label: "Claude Opus 4.6, ~12.0 h (CI 317–3,634). Last robust point", value: 718.8, est: false, sources: ["S-R6-51", "S-AUD-10"]},
      {t: 2026.263, date: "2026-04-07", label: "Claude Mythos Preview (early snapshot), ~17.4 h (CI 509–3,304). Above the 16 h reliability limit: at the limit of METR's ruler", value: 1044.8, est: true, sources: ["S-R6-51", "S-AUD-10"]},
      {t: 2026.518, date: "2026-07-09", label: "GPT-5.6 Sol, ~11.3 h with cheating counted as failure (CI 5–40 h); >270 h if counted as success. METR: \"not a robust measurement\"", value: 678, est: true, sources: ["S-R6-53"]}
    ],
    reference: null
  };

  /* ───────────────────────── other ───────────────────────── */

  S["openai-run-rate"] = {
    group: "other", featured: true,
    title: {en: "OpenAI annualised run-rate revenue", uk: "Річний темп виручки OpenAI (run-rate)"},
    unit: {en: "billion USD, annualised run rate (current monthly revenue × 12)", uk: "млрд USD, річний темп (run-rate: поточна місячна виручка × 12)"}, scale: "log",
    what: {
      en: "Annualised revenue rose about 25× in three years, from about $2B (end of 2023) to about $50B (end of September 2026).",
      uk: "Річний темп виручки зріс приблизно у 25 разів за три роки: з ~2 млрд $ (кінець 2023) до ~50 млрд $ (кінець вересня 2026)."
    },
    caveat: {
      en: "Run rate (ARR) is a snapshot, current monthly revenue × 12, not money booked in a year: never mix it with calendar revenue (separate series), and never place it side by side with Anthropic's run rate as like-for-like. OpenAI publishes no audited accounts; press figures (The Information, CNBC, Bloomberg) are marked est. In September–October 2026 two numbers circulated: ~$50B (OpenAI's investor presentation, net) and \"nearly $70B\" including gross revenue from partners (Axios, sources), which is not comparable and is not plotted. Business notes: ChatGPT ads passed a $1B annualised run rate in under 200 days (31 Aug 2026); enterprise was more than 40% of revenue by 31 Mar 2026.",
      uk: "Річний темп (ARR) — це знімок: поточна місячна виручка × 12, а не гроші, зароблені за рік. Ніколи не змішуйте його з календарною виручкою (окрема серія) і не ставте поруч із run-rate Anthropic як рівноцінні. OpenAI не публікує аудитованої звітності; цифри з преси (The Information, CNBC, Bloomberg) позначено як оц. У вересні–жовтні 2026 року ходили два числа: ~50 млрд $ (презентація OpenAI для інвесторів, нетто) і «майже 70 млрд $» разом із валовою виручкою партнерів (Axios, джерела) — непорівнянне, тож на графіку його немає. Бізнес-нотатки: реклама в ChatGPT перевищила 1 млрд $ у річному темпі менш ніж за 200 днів (31 серпня 2026); корпоративний сегмент давав понад 40 % виручки станом на 31 березня 2026."
    },
    points: [
      {t: 2023.658, date: "2023-08-29", label: "Run rate: >$1B \"revenue pace\" (The Information)", value: 1, est: true, sources: ["S-R3-129"]},
      {t: 2023.995, date: "2023-12-30", label: "Run rate: >$1.6B annualised (The Information)", value: 1.6, est: true, sources: ["S-R3-130"]},
      {t: 2023.997, date: "2023-12-31", label: "ARR at end of 2023: $2B (OpenAI, stated Jan 2026)", value: 2, est: false, sources: ["S-R3-127"]},
      {t: 2024.447, date: "2024-06-12", label: "Run rate: $3.4B annualised (The Information)", value: 3.4, est: true, sources: ["S-R3-131"]},
      {t: 2025.000, date: "2024-12-31", label: "ARR at end of 2024: $6B (OpenAI, stated Jan 2026; CNBC earlier said ~$5.5B)", value: 6, est: false, sources: ["S-R3-127", "S-R3-132"]},
      {t: 2025.436, date: "2025-06-09", label: "ARR: $10B (OpenAI spokesperson to CNBC)", value: 10, est: false, sources: ["S-R3-132"]},
      {t: 2025.589, date: "2025-08-04", label: "ARR: $13B (CNBC)", value: 13, est: false, sources: ["S-R3-123"]},
      {t: 2025.997, date: "2025-12-31", label: "ARR at end of 2025: \"$20B+\" (OpenAI, Jan 2026; forecast by Altman on 6 Nov 2025)", value: 20, est: false, sources: ["S-R3-127", "S-R3-133"]},
      {t: 2026.244, date: "2026-03-31", label: "\"$2B in revenue per month\" ≈ $24B annualised (OpenAI)", value: 24, est: true, sources: ["S-R3-126"]},
      {t: 2026.614, date: "2026-08-13", label: "Run rate tops $40B (Bloomberg, 13 Aug; via Quartz 14 Aug)", value: 40, est: true, sources: ["S-R3-135"]},
      {t: 2026.745, date: "2026-09-30", label: "Run rate ~$50B at end of September (OpenAI investor presentation, net; CNBC-confirmed 8 Oct 2026). \"Nearly $70B\" incl. partner gross revenue (Axios) is not comparable", value: 50, est: true, sources: ["S-R3-138", "S-R3-137"]}
    ],
    reference: null
  };

  S["openai-calendar-revenue"] = {
    group: "other", featured: false,
    title: {en: "OpenAI calendar-year revenue (booked)", uk: "Календарна виручка OpenAI (фактично зароблена за рік)"},
    unit: {en: "billion USD per calendar year", uk: "млрд USD за календарний рік"}, scale: "log",
    what: {
      en: "Money actually booked in a year, as opposed to the run-rate snapshot: $3.7B in 2024 and $13.07B in 2025 (audited documents verified by the Financial Times). Q2 2026 revenue was $6.7B, up 18% on Q1 (WSJ via CNBC; a quarterly figure, so not plotted).",
      uk: "Гроші, фактично зароблені за рік, на відміну від знімка run-rate: 3,7 млрд $ у 2024 і 13,07 млрд $ у 2025 році (аудитовані документи, перевірені Financial Times). Виручка за II квартал 2026 року — 6,7 млрд $, на 18 % більше, ніж у I кварталі (WSJ через CNBC; квартальна цифра, тож на графіку її немає)."
    },
    caveat: {
      en: "Calendar revenue and run rate are two different measures: never mix them in one line. OpenAI did not publish audited accounts; the 2025 figure comes from leaked audited documents verified by the FT (via Quartz), which also show a net loss of $38.5B on $13.07B of revenue, including a $41.55B loss on the fair value of convertible interests and warrants linked to the for-profit conversion.",
      uk: "Календарна виручка і run-rate — різні показники: ніколи не поєднуйте їх в одній лінії. OpenAI не публікувала аудитованої звітності; цифра за 2025 рік походить із витоку аудитованих документів, перевірених FT (через Quartz), які також показують чистий збиток 38,5 млрд $ при виручці 13,07 млрд $, зокрема 41,55 млрд $ збитку від переоцінки конвертованих часток і варантів, пов'язаних із перетворенням на комерційну компанію."
    },
    points: [
      {t: 2025.000, date: "2024-12-31", label: "Calendar revenue 2024: $3.7B (projected Sep 2024 per NYT/CNBC; confirmed in 2026 leaked audited figures)", value: 3.7, est: false, sources: ["S-R3-128", "S-R3-134"]},
      {t: 2025.997, date: "2025-12-31", label: "Calendar revenue 2025: $13.07B (audited documents; FT-verified, via Quartz)", value: 13.07, est: false, sources: ["S-R3-134"]}
    ],
    reference: null
  };

  S["anthropic-run-rate"] = {
    group: "other", featured: true,
    title: {en: "Anthropic annualised run-rate revenue", uk: "Річний темп виручки Anthropic (run-rate)"},
    unit: {en: "billion USD, annualised run rate", uk: "млрд USD, річний темп (run-rate)"}, scale: "log",
    what: {
      en: "In about 2.5 years the company went from under $0.1B to over $65B run-rate: roughly 10× per year through 2025 and faster in 2026. Dario Amodei, May 2026: \"We tried to plan very well for a world of 10x growth per year. And yet we saw 80x\" (Q1 2026, annualised).",
      uk: "Приблизно за 2,5 року компанія пройшла шлях від менш ніж 0,1 млрд $ до понад 65 млрд $ у річному темпі: близько 10× на рік упродовж 2025-го і швидше у 2026-му. Даріо Амодеї, травень 2026: «Ми намагалися дуже добре спланувати світ, де зростання 10× на рік. А побачили 80×» (I квартал 2026, у річному перерахунку)."
    },
    caveat: {
      en: "Run rate is an annualised snapshot of current revenue, not booked annual revenue, and Anthropic does not publish its exact definition. All rows except the last come from Anthropic's own posts; the July 2026 figure comes from an investor update reported by Bloomberg, CNBC and Reuters. Values are lower bounds (\"over\") where the source says so. Never show it side by side with OpenAI's run rate as like-for-like: gross is not net, and run rate is not revenue.",
      uk: "Run-rate — річний перерахунок поточної виручки, а не зароблена за рік виручка, і Anthropic не публікує точного визначення. Усі рядки, крім останнього, — з дописів самої Anthropic; цифра за липень 2026 — з оновлення для інвесторів, про яке повідомили Bloomberg, CNBC і Reuters. Там, де джерело каже «понад», значення — нижні межі. Ніколи не показуйте поруч із run-rate OpenAI як рівноцінне: валове — не чисте, а run-rate — не виручка."
    },
    points: [
      {t: 2024.038, date: "2024-01", label: "Start of 2024", value: 0.087, est: false, sources: ["S-R4a-62"]},
      {t: 2025.038, date: "2025-01", label: "Start of 2025 (\"approximately $1 billion\")", value: 1, est: false, sources: ["S-R4a-61"]},
      {t: 2025.619, date: "2025-08", label: "August 2025 (\"over $5 billion\")", value: 5, est: false, sources: ["S-R4a-61", "S-R4a-62"]},
      {t: 2025.786, date: "2025-10", label: "October 2025 (\"$1B to $7B run rate over the last nine months\")", value: 7, est: false, sources: ["S-R4a-63"]},
      {t: 2025.953, date: "2025-12", label: "End of 2025 (\"approximately $9 billion\")", value: 9, est: false, sources: ["S-R4a-66"]},
      {t: 2026.123, date: "2026-02", label: "Series G announcement, 12 Feb 2026", value: 14, est: false, sources: ["S-R4a-65"]},
      {t: 2026.285, date: "2026-04", label: "Early April 2026 (\"surpassed $30 billion\")", value: 30, est: false, sources: ["S-R4a-66"]},
      {t: 2026.367, date: "2026-05", label: "Early May 2026 (\"crossed $47 billion\")", value: 47, est: false, sources: ["S-R4a-67"]},
      {t: 2026.534, date: "2026-07", label: "End of July 2026: >$65B (investor update, press-reported; incl. cloud-partner sales)", value: 65, est: false, sources: ["S-R4a-74"]}
    ],
    reference: null
  };

  S["claude-code-run-rate"] = {
    group: "other", featured: false,
    title: {en: "Claude Code run-rate revenue", uk: "Річний темп виручки Claude Code (run-rate)"},
    unit: {en: "billion USD, annualised run rate", uk: "млрд USD, річний темп (run-rate)"}, scale: "log",
    what: {
      en: "Anthropic's coding agent went from launch (research preview 24 Feb 2025, general availability 22 May 2025) to over $2.5B run-rate in under a year.",
      uk: "Агент для програмування від Anthropic менш ніж за рік пройшов шлях від запуску (дослідницький попередній доступ 24 лютого 2025, загальна доступність 22 травня 2025) до понад 2,5 млрд $ у річному темпі."
    },
    caveat: {
      en: "Company-reported run rate, not booked revenue. Anthropic has not given a Claude Code-specific figure after February 2026 in the sources checked. In February 2026 Anthropic also said weekly active Claude Code users had doubled since 1 January 2026, and cited a third-party estimate that Claude Code authored 4% of all public GitHub commits.",
      uk: "Run-rate за даними компанії, а не зароблена виручка. Після лютого 2026 року Anthropic не наводила окремої цифри для Claude Code у перевірених джерелах. У лютому 2026 Anthropic також повідомила, що кількість щотижневих активних користувачів Claude Code подвоїлася з 1 січня 2026 року, і послалася на сторонню оцінку, за якою Claude Code — автор 4 % усіх публічних комітів на GitHub."
    },
    points: [
      {t: 2025.619, date: "2025-08", label: "\"Over $500 million\" (reported 2 Sep 2025; usage up more than 10× in 3 months)", value: 0.5, est: false, sources: ["S-R4a-61"]},
      {t: 2025.871, date: "2025-11", label: "$1B, six months after GA (reported 3 Dec 2025)", value: 1, est: false, sources: ["S-R4a-64"]},
      {t: 2026.123, date: "2026-02", label: "\"Over $2.5 billion\", more than doubled since the start of 2026 (reported 12 Feb 2026)", value: 2.5, est: false, sources: ["S-R4a-65"]}
    ],
    reference: null
  };

  S["anthropic-valuation"] = {
    group: "other", featured: false,
    title: {en: "Anthropic post-money valuation at priced rounds", uk: "Оцінка Anthropic після раундів фінансування (post-money)"},
    unit: {en: "billion USD, post-money", uk: "млрд USD, post-money"}, scale: "log",
    what: {
      en: "Valuation rose about 16× in 15 months, from $61.5B at Series E (March 2025) to $965B at Series H (May 2026).",
      uk: "Оцінка зросла приблизно у 16 разів за 15 місяців: із 61,5 млрд $ на раунді Series E (березень 2025) до 965 млрд $ на Series H (травень 2026)."
    },
    caveat: {
      en: "Only rounds announced by Anthropic with a stated valuation are listed. Strategic investments (Amazon, Google) and a reported December 2025 term sheet are excluded.",
      uk: "Наведено лише раунди, оголошені Anthropic із зазначеною оцінкою. Стратегічні інвестиції (Amazon, Google) і повідомлений у грудні 2025 року term sheet не враховано."
    },
    points: [
      {t: 2025.167, date: "2025-03-03", label: "Series E, $3.5B raised", value: 61.5, est: false, sources: ["S-R4a-60"]},
      {t: 2025.668, date: "2025-09-02", label: "Series F, $13B raised", value: 183, est: false, sources: ["S-R4a-61"]},
      {t: 2026.115, date: "2026-02-12", label: "Series G, $30B raised", value: 380, est: false, sources: ["S-R4a-65"]},
      {t: 2026.403, date: "2026-05-28", label: "Series H, $65B raised", value: 965, est: false, sources: ["S-R4a-67"]}
    ],
    reference: null
  };

  /* ───────────────────────── Part 4 · facts ─────────────────────────
     Acceleration facts plus one money fact.
     stat is a short display figure, bilingual like every other reader-facing string. */

  var facts = [
    {
      id: "F01",
      stat: {en: "×2 every ~6 months", uk: "×2 кожні ~6 місяців"},
      text: {
        en: "Before deep learning, the training compute of notable AI models doubled about every 20 months, \"in line with Moore's law\". From the early 2010s it has doubled about every 6 months. Frontier models grew 4–5× per year in 2010–2024, and frontier language models about 5× per year since 2020 (a 5.2-month doubling; 90% CI 4.6–6.0 months).",
        uk: "До глибинного навчання обчислювальний бюджет навчання помітних моделей ШІ подвоювався приблизно кожні 20 місяців — «у темпі закону Мура». З початку 2010-х він подвоюється приблизно кожні 6 місяців. Передові моделі зростали у 4–5 разів на рік у 2010–2024 роках, а передові мовні моделі — приблизно у 5 разів на рік із 2020-го (подвоєння за 5,2 місяця; 90 % ДІ 4,6–6,0 місяця)."
      },
      sources: ["S-R6-02", "S-R6-03", "S-R6-04"]
    },
    {
      id: "F02",
      stat: {en: "~2×10⁹ in 14 years", uk: "~2×10⁹ за 14 років"},
      text: {
        en: "AlexNet (2012) used about 4.7×10^17 FLOP. GPT-6 Astra (2026) used ~10^27 FLOP (est., Epoch AI; range 5×10^26–2×10^27): roughly two billion times more in 14 years.",
        uk: "AlexNet (2012) використав близько 4,7×10^17 FLOP. GPT-6 Astra (2026) — ~10^27 FLOP (оц., Epoch AI; діапазон 5×10^26–2×10^27): приблизно у два мільярди разів більше за 14 років."
      },
      sources: ["S-R6-01", "S-AUD-15"]
    },
    {
      id: "F03",
      stat: {en: "30+ models at GPT-4 scale", uk: "30+ моделей масштабу GPT-4"},
      text: {
        en: "GPT-4 (March 2023) was the first model above 10^25 FLOP. By June 2025 Epoch counted over 30 models from 12 developers above that line, about two new ones per month during 2024. The first models estimated above 10^26 FLOP (Grok 3, GPT-4.5) arrived in February 2025, and the first ~10^27 run (GPT-6 Astra) in September 2026.",
        uk: "GPT-4 (березень 2023) була першою моделлю понад 10^25 FLOP. До червня 2025 року Epoch нарахувала понад 30 моделей від 12 розробників вище цієї межі — близько двох нових на місяць упродовж 2024-го. Перші моделі з оцінкою понад 10^26 FLOP (Grok 3, GPT-4.5) з'явилися в лютому 2025, а перший запуск на ~10^27 (GPT-6 Astra) — у вересні 2026."
      },
      sources: ["S-R6-05", "S-R6-01"]
    },
    {
      id: "F04",
      stat: {en: "algorithms: ÷2 every ~8 months", uk: "алгоритми: ÷2 кожні ~8 місяців"},
      text: {
        en: "The compute needed to reach a given language-model performance halved about every 8 months (95% CI 5–14 months) from 2012 to 2023. For ImageNet classification it halved every ~9 months (95% CI 4–25). Effective compute therefore grows faster than raw FLOP.",
        uk: "Обчислення, потрібні для досягнення заданого рівня мовної моделі, з 2012 по 2023 рік зменшувалися вдвічі приблизно кожні 8 місяців (95 % ДІ 5–14 місяців). Для класифікації ImageNet — кожні ~9 місяців (95 % ДІ 4–25). Тож ефективні обчислення зростають швидше за «сирі» FLOP."
      },
      sources: ["S-R6-104", "S-R6-103"]
    },
    {
      id: "F05",
      stat: {en: "9–900× cheaper per year", uk: "у 9–900 разів дешевше на рік"},
      text: {
        en: "Epoch found LLM prices for a fixed performance level falling 9×–900× per year depending on the task. GPT-4-level PhD-science performance went from $37.50 to $0.12 per million tokens in 21 months (about 40× per year). GPT-3.5-level MMLU went from $20 to $0.07 per million tokens between November 2022 and October 2024 (more than 280×). The verified price tracks end in early 2025; no later Epoch or AI Index update covers 2025–2026.",
        uk: "За даними Epoch, ціна LLM за фіксований рівень якості падала у 9–900 разів на рік залежно від завдання. Рівень GPT-4 на наукових запитаннях PhD-рівня подешевшав із 37,50 $ до 0,12 $ за мільйон токенів за 21 місяць (близько 40× на рік). Рівень GPT-3.5 на MMLU — із 20 $ до 0,07 $ за мільйон токенів між листопадом 2022 і жовтнем 2024 (понад 280×). Перевірені цінові треки закінчуються на початку 2025 року; пізнішого оновлення від Epoch чи AI Index за 2025–2026 немає."
      },
      sources: ["S-R6-39", "S-R6-24"]
    },
    {
      id: "F06",
      stat: {en: "×2 every ~129 days", uk: "×2 кожні ~129 днів"},
      text: {
        en: "The length of software tasks that agents complete at 50% reliability doubled every ~7 months in 2019–2025; since 2023 it has doubled every ~129 days (95% CI 104–158). It went from about 4 minutes (GPT-4, March 2023) to about 12 hours (Claude Opus 4.6, February 2026), roughly 180× in under three years. Later points, such as Claude Mythos Preview's ~17.4 h, are at the limit of METR's ruler.",
        uk: "Тривалість програмістських завдань, які агенти виконують із надійністю 50 %, подвоювалася кожні ~7 місяців у 2019–2025 роках, а з 2023-го подвоюється кожні ~129 днів (95 % ДІ 104–158). Від ~4 хвилин (GPT-4, березень 2023) до ~12 годин (Claude Opus 4.6, лютий 2026) — приблизно у 180 разів менш ніж за три роки. Пізніші точки, як-от ~17,4 год у Claude Mythos Preview, лежать на межі «лінійки» METR."
      },
      sources: ["S-R6-50", "S-R6-51", "S-R6-52", "S-AUD-10"]
    },
    {
      id: "F07",
      stat: {en: "13 years → under 1 year", uk: "13 років → менше року"},
      text: {
        en: "Time from a benchmark's release to beating its human reference: MNIST about 13 years, ImageNet about 5, SQuAD 1.1 about 1.6, SQuAD 2.0 about 0.8, GPQA Diamond about 1.1 and ARC-AGI-2 about 0.9 (to the panel average). The AI Index 2026: \"Evaluations intended to be challenging for years are saturated in months\"; frontier models gained 30 points on Humanity's Last Exam in one year.",
        uk: "Час від виходу бенчмарка до перевищення людського орієнтира: MNIST — близько 13 років, ImageNet — ~5, SQuAD 1.1 — ~1,6, SQuAD 2.0 — ~0,8, GPQA Diamond — ~1,1, ARC-AGI-2 — ~0,9 (до середнього результату панелі). AI Index 2026: «Оцінювання, задумані як складні на роки, насичуються за місяці»; за один рік передові моделі додали 30 пунктів на Humanity's Last Exam."
      },
      sources: ["S-R6-32", "S-R6-38", "S-R6-23", "S-R6-27"]
    },
    {
      id: "F08",
      stat: {en: "ARC-AGI-2: 4% → 95%", uk: "ARC-AGI-2: 4 % → 95 %"},
      text: {
        en: "ARC-AGI-2 went from about 4% at launch (March 2025) to 95.0% (GPT-6 Astra, September 2026; ARC Prize-verified). FrontierMath Tier 4 went from 0% (early 2025) to 100% of 41 problems (Epoch-run; GPT-6.1 Sol, September 2026, revised v2 set). SWE-bench Verified went from 33% (August 2024) to 87.6% self-reported (Claude Opus 4.7, April 2026; 83.5% in Epoch's independent run). OpenAI stopped reporting it (contamination, flawed tests) in February 2026, 18 months after co-creating it.",
        uk: "ARC-AGI-2 пройшов шлях від ~4 % на старті (березень 2025) до 95,0 % (GPT-6 Astra, вересень 2026; перевірено ARC Prize). FrontierMath Tier 4 — від 0 % (початок 2025) до 100 % із 41 задачі (прогін Epoch; GPT-6.1 Sol, вересень 2026, виправлений набір v2). SWE-bench Verified — від 33 % (серпень 2024) до 87,6 % за самозвітом (Claude Opus 4.7, квітень 2026; 83,5 % у незалежному прогоні Epoch). У лютому 2026 OpenAI припинила звітувати за ним (забруднення даних, хибні тести) — через 18 місяців після того, як сама його співстворила."
      },
      sources: ["S-R6-20", "S-R6-26", "S-R6-111", "S-R6-112", "S-AUD-12"]
    },
    {
      id: "F09",
      stat: {en: "a new leader every 1–2 months", uk: "новий лідер кожні 1–2 місяці"},
      text: {
        en: "On Epoch's Capabilities Index, GPT-4's March 2023 score was not beaten for about 10 months. From January 2025 to September 2026 a new record was set 14 times by three labs (OpenAI, Google DeepMind, Anthropic), roughly every 1–2 months (a median of ~46 days by our own calculation from Epoch data; some steps are within error bars). Epoch measures the frontier improving ~14 index points per year since September 2024 (90% CI 12–17), versus ~6 per year for non-reasoning models.",
        uk: "На індексі Epoch Capabilities Index результат GPT-4 від березня 2023 не могли перевершити близько 10 місяців. Із січня 2025 до вересня 2026 новий рекорд встановлювали 14 разів три лабораторії (OpenAI, Google DeepMind, Anthropic) — приблизно кожні 1–2 місяці (медіана ~46 днів за нашим власним підрахунком на даних Epoch; деякі кроки лежать у межах похибки). За вимірами Epoch, передовий рівень зростає на ~14 пунктів індексу на рік із вересня 2024 (90 % ДІ 12–17) проти ~6 на рік для моделей без міркування."
      },
      sources: ["S-R6-20", "S-R6-04"]
    },
    {
      id: "F10",
      stat: {en: "125 → 4,000 TFLOP/s per chip", uk: "125 → 4 000 TFLOP/s на чип"},
      text: {
        en: "Per-chip dense 16-bit throughput rose from 125 TFLOP/s (V100, 2017) to 4,000 (Rubin, 2026), and low-precision training throughput to 35,000 TFLOP/s (NVFP4). The leading AI supercomputer's performance doubles every ~9 months (2.5× per year); the largest site grew from 10,000 GPUs (2020) to ~1.1M H100-equivalents at ~0.95 GW (2026; est. (Epoch AI), IT power). Global AI compute capacity grew 3.3× per year since 2022, to 17.1 million H100-equivalents, and AI-chip performance per dollar improves ~49% per year.",
        uk: "Щільна 16-бітна продуктивність одного чипа зросла зі 125 TFLOP/s (V100, 2017) до 4 000 (Rubin, 2026), а продуктивність навчання в низькій точності — до 35 000 TFLOP/s (NVFP4). Продуктивність провідного ШІ-суперкомп'ютера подвоюється кожні ~9 місяців (2,5× на рік); найбільший майданчик виріс із 10 000 GPU (2020) до ~1,1 млн H100-еквівалентів при ~0,95 ГВт (2026; оц. (Epoch AI), IT-потужність). Світова потужність ШІ-обчислень зростала у 3,3 раза на рік із 2022-го — до 17,1 млн H100-еквівалентів, а продуктивність ШІ-чипів на долар покращується на ~49 % на рік."
      },
      sources: ["S-R6-55", "S-R6-58", "S-R6-23", "S-R6-64", "S-R6-04"]
    },
    {
      id: "F11",
      stat: {en: "$344.7B private investment (2025)", uk: "344,7 млрд $ приватних інвестицій (2025)"},
      text: {
        en: "Global private AI investment reached $344.7B in 2025 (+127.5%), and generative AI's share tripled to $170.9B (AI Index 2026; earlier editions report lower historical values). The four largest US cloud and platform companies guided ≈$0.73 trillion for 2026 ($720–745B by July 2026; sum of differing definitions; not all AI), about five times their 2023 spending.",
        uk: "Світові приватні інвестиції в ШІ сягнули 344,7 млрд $ у 2025 році (+127,5 %), а частка генеративного ШІ потроїлася до 170,9 млрд $ (AI Index 2026; попередні видання наводять нижчі історичні значення). Чотири найбільші американські хмарні та платформні компанії запланували ≈0,73 трлн $ капітальних витрат на 2026 рік (720–745 млрд $ станом на липень 2026; сума різних визначень; не все це ШІ) — приблизно вп'ятеро більше, ніж у 2023-му."
      },
      sources: ["S-R6-92", "S-R6-93", "S-R6-94", "S-R6-95", "S-R6-96", "S-R6-97", "S-R6-98", "S-R6-99", "S-R6-100", "S-AUD-20", "S-AUD-21", "S-AUD-22"]
    },
    {
      id: "F12",
      stat: {en: "100M → 1.2B weekly users", uk: "100 млн → 1,2 млрд на тиждень"},
      text: {
        en: "ChatGPT went from 100 million weekly users (November 2023) to 1.2 billion weekly users (OpenAI, September 2026). US adults who had ever used ChatGPT rose from 18% (2023) to 44% (2026; Pew changed its question in 2026, so the series has a break). The AI Index 2026 says generative AI reached 53% population adoption within three years, faster than the PC or the internet.",
        uk: "ChatGPT виріс зі 100 млн щотижневих користувачів (листопад 2023) до 1,2 млрд щотижневих користувачів (OpenAI, вересень 2026). Частка дорослих американців, які хоч раз користувалися ChatGPT, зросла з 18 % (2023) до 44 % (2026; у 2026 році Pew змінив формулювання запитання, тож у серії є розрив). За AI Index 2026, генеративний ШІ досяг 53 % охоплення населення за три роки — швидше, ніж ПК чи інтернет."
      },
      sources: ["S-R6-67", "S-R6-75", "S-R3-56", "S-R3-59", "S-R3-114", "S-R6-77", "S-R6-79", "S-R6-23"]
    },
    {
      id: "F13",
      stat: {en: "GPT-5 used less compute than GPT-4.5", uk: "GPT-5 витратила менше, ніж GPT-4.5"},
      text: {
        en: "GPT-5 (August 2025) is estimated to have used less training compute than GPT-4.5 (~6.6×10^25 vs ~3.8×10^26 FLOP; est., Epoch AI) yet scored higher on reasoning benchmarks. Since 2024, test-time \"thinking\" and reinforcement learning drive much of the progress. DeepSeek-V3 matched 2024 frontier models at ~3.3×10^24 FLOP, about one tenth of Llama 3.1 405B.",
        uk: "GPT-5 (серпень 2025), за оцінками, використала менше обчислень на навчання, ніж GPT-4.5 (~6,6×10^25 проти ~3,8×10^26 FLOP; оц., Epoch AI), але показала вищі результати на бенчмарках міркування. З 2024 року значну частину прогресу дають «обмірковування» під час відповіді (test-time compute) і навчання з підкріпленням. DeepSeek-V3 зрівнялася з передовими моделями 2024 року при ~3,3×10^24 FLOP — близько десятої частини Llama 3.1 405B."
      },
      sources: ["S-R6-01", "S-R6-20"]
    },
    {
      id: "F14",
      stat: {en: "\"80×\" (Amodei, May 2026)", uk: "«80×» (Амодеї, травень 2026)"},
      text: {
        en: "Anthropic's run-rate revenue rose from $14 billion (February 2026) to more than $47 billion (May 2026), per Anthropic; Dario Amodei in May 2026: \"We tried to plan very well for a world of 10x growth per year. And yet we saw 80x\" (Q1 2026, annualised). OpenAI's annualised revenue rose about 25× in three years, from about $2B (end of 2023) to ≈$50B (end of September 2026; investor presentation, press-reported; ~$70B gross incl. partners). Run rate is a snapshot, not booked revenue, and the two companies' accounting bases differ: never compare them like-for-like.",
        uk: "Річний темп виручки Anthropic зріс із 14 млрд $ (лютий 2026) до понад 47 млрд $ (травень 2026), за даними Anthropic; Даріо Амодеї у травні 2026: «Ми намагалися дуже добре спланувати світ, де зростання 10× на рік. А побачили 80×» (I квартал 2026, у річному перерахунку). Річний темп виручки OpenAI зріс приблизно у 25 разів за три роки: з ~2 млрд $ (кінець 2023) до ≈50 млрд $ (кінець вересня 2026; презентація для інвесторів, за повідомленнями преси; ~70 млрд $ валових разом із партнерами). Run-rate — це знімок, а не зароблена виручка, і облікові бази двох компаній різняться: ніколи не порівнюйте їх як рівноцінні."
      },
      sources: ["S-R7b-43", "S-R7b-133", "S-R4a-73", "S-R3-127", "S-R3-138", "S-R3-137"]
    }
  ];

  /* ───────────────────────── Part 4 · state2026 ─────────────────────────
     State of AI, October 2026: the latest model per provider, with the uncertainty wording. */

  var state2026 = {
    asOf: "2026-10-09",
    headline: {
      en: "October 2026: three labs trade the frontier roughly every 1–2 months; the hard tests of 2023–25 (GPQA, SWE-bench Verified, ARC-AGI-2) are saturated; agents work for hours on their own but fail most long real-world jobs; compute is measured in gigawatts; and the first withheld models, stop orders and real-world agent incidents have arrived.",
      uk: "Жовтень 2026: три лабораторії змінюють одна одну на передовій приблизно кожні 1–2 місяці; складні тести 2023–2025 років (GPQA, SWE-bench Verified, ARC-AGI-2) насичені; агенти годинами працюють самостійно, але провалюють більшість довгих реальних завдань; обчислення вимірюють гігаватами; з'явилися перші притримані моделі, урядові заборони й реальні інциденти з агентами."
    },
    frontier: [
      {
        provider: "openai", org: "OpenAI", model: "GPT-6 Astra", released: "2026-09-03",
        note: {
          en: "Most capable. Newest release: GPT-6.1 Sol (29 Sep 2026), \"OpenAI's latest model\" per the Astra page, at one-fifth of Astra's token price. ChatGPT Chat default from 7–8 October: \"October 2026\" GPT-6 Sol (paid) / GPT-6 Luna (Free/Go). GPT-6.1 Astra was cancelled: reported (CNBC, WSJ, AP, 28 Sep).",
          uk: "Найпотужніша. Найновіший реліз: GPT-6.1 Sol (29 вересня 2026 р.), «найновіша модель OpenAI» за сторінкою Astra, за п'яту частину ціни токенів Astra. Типова модель у вкладці Chat ChatGPT із 7–8 жовтня: «October 2026» GPT-6 Sol (платні тарифи) / GPT-6 Luna (Free/Go). GPT-6.1 Astra скасовано: за повідомленнями (CNBC, WSJ, AP, 28 вересня)."
        },
        sources: ["S-AUD-38", "S-R7b-89", "S-R7b-134", "S-AUD-34"]
      },
      {
        provider: "anthropic", org: "Anthropic", model: "Claude Fable 5.1", released: "2026-09-01",
        note: {
          en: "Most capable generally available model; its restricted twin is Claude Mythos 5.1 (vetted cyber and life-science users). Recommended default: Claude Opus 5.5 (22 Sep 2026, $4 / $20), which Anthropic says matches it on most work at lower cost. Newest release: Claude Haiku 5.5 (7 Oct 2026).",
          uk: "Найпотужніша загальнодоступна модель; її обмежений «близнюк» — Claude Mythos 5.1 (для перевірених користувачів у кібербезпеці та науках про життя). Рекомендована типова модель: Claude Opus 5.5 (22 вересня 2026 р., 4 $ / 20 $), яка, за словами Anthropic, не поступається їй у більшості завдань за нижчу ціну. Найновіший реліз: Claude Haiku 5.5 (7 жовтня 2026 р.)."
        },
        sources: ["S-AUD-37", "S-R4a-04", "S-R7b-94", "S-R7b-115"]
      },
      {
        provider: "google", org: "Google DeepMind", model: "Gemini 4 Argon", released: "2026-09-30",
        note: {
          en: "Limited release to Fairwind Program cyber defenders, then paid API and AI Ultra subscribers; no API model ID yet. Benchmarks are Google-reported; #1 on LMArena (preliminary). Latest generally available: Gemini 3.8 Flash (2 Sep 2026). Best \"Pro\": Gemini 3.1 Pro (preview). Gemini 3.5 Pro never shipped.",
          uk: "Обмежений реліз для кіберзахисників програми Fairwind, далі — платний API і передплатники AI Ultra; ідентифікатора моделі в API ще немає. Результати бенчмарків — за даними Google; #1 на LMArena (попередньо). Найновіша загальнодоступна: Gemini 3.8 Flash (2 вересня 2026 р.). Найкраща «Pro»: Gemini 3.1 Pro (preview). Gemini 3.5 Pro так і не вийшла."
        },
        sources: ["S-R4b-42", "S-R4b-44", "S-R7b-105"]
      },
      {
        provider: "meta", org: "Meta", model: "Muse Spark 1.3", released: "2026-09-02",
        note: {
          en: "Closed weights, via the Meta Model API ($1.25 / $4.25). Latest open model: Muse Glimmer 30B (10 Aug 2026, Apache 2.0). Last Llama: Llama 4 (5 Apr 2025). Meta also launched the \"Muse\" personal agent on 8 Sep 2026.",
          uk: "Закриті ваги, доступ через Meta Model API (1,25 $ / 4,25 $). Найновіша відкрита модель: Muse Glimmer 30B (10 серпня 2026 р., Apache 2.0). Остання Llama: Llama 4 (5 квітня 2025 р.). 8 вересня 2026 р. Meta також запустила персонального агента «Muse»."
        },
        sources: ["S-AUD-39", "S-R7b-62"]
      },
      {
        provider: "mistral", org: "Mistral AI", model: "Mistral Large 4", released: "2026-10-06",
        note: {
          en: "1T total / 52B active parameters; public-preview API ($1.36 / $4.18); weights pledged, expected around 31 October. Artificial Analysis: the highest-scoring model from outside the US and China. Latest downloadable: Mistral Medium 3.5 (128B, April 2026).",
          uk: "1 трлн параметрів загалом / 52 млрд активних; API у публічному preview (1,36 $ / 4,18 $); ваги обіцяно, очікуються близько 31 жовтня. Artificial Analysis: найрезультативніша модель з-поза США та Китаю. Найновіша завантажувана: Mistral Medium 3.5 (128B, квітень 2026)."
        },
        sources: ["S-R7b-114"]
      },
      {
        provider: "deepseek", org: "DeepSeek", model: "DeepSeek-V4.1-Flash", released: "2026-09-10",
        note: {
          en: "Newest model: 763B total, 8–16B active, open weights. Largest tier: DeepSeek-V4-Pro (1.6T / 49B active, 1M context; GA 13 Aug 2026, preview 24 Apr 2026). No R2; V4.1-Pro named but unreleased.",
          uk: "Найновіша модель: 763 млрд параметрів загалом, 8–16 млрд активних, відкриті ваги. Найбільший рівень: DeepSeek-V4-Pro (1,6 трлн / 49 млрд активних, контекст 1M; загальний доступ 13 серпня 2026 р., preview 24 квітня 2026 р.). R2 не існує; V4.1-Pro названо, але не випущено."
        },
        sources: ["S-R7b-109"]
      },
      {
        provider: "qwen", org: "Alibaba (Qwen)", model: "Qwen3.8-Max", released: "2026-08-03",
        note: {
          en: "API model (3 Aug 2026); open weights as Qwen3.8-2.4T-A95B on 12 Aug 2026 under a custom licence. SWE-bench Pro 67.7 (Qwen-reported). Qwen 4 was announced as \"in training\" (22 Sep) and is not released.",
          uk: "Модель в API (3 серпня 2026 р.); відкриті ваги як Qwen3.8-2.4T-A95B від 12 серпня 2026 р. за власною ліцензією. SWE-bench Pro 67,7 (за даними Qwen). Qwen 4 оголошено як «у навчанні» (22 вересня), не випущено."
        },
        sources: ["S-R7b-110"]
      },
      {
        provider: "xai", org: "xAI / SpaceXAI", model: "Grok 4.7", released: "2026-09-21",
        note: {
          en: "Closed; $2 / $6 for prompts up to 200K tokens. ARC-AGI-2 61.4%; Artificial Analysis Intelligence Index 46. xAI (now SpaceXAI; merged into SpaceX in February 2026). Grok 5 is not released.",
          uk: "Закрита; 2 $ / 6 $ для промптів до 200K токенів. ARC-AGI-2 61,4 %; Artificial Analysis Intelligence Index 46. xAI (тепер SpaceXAI; злилася зі SpaceX у лютому 2026). Grok 5 не випущено."
        },
        sources: ["S-R7b-107", "S-R7b-116"]
      },
      {
        provider: "other", org: "Moonshot AI", model: "Kimi K3", released: "2026-07-16",
        note: {
          en: "2.8T total / 104B active parameters; open weights under a custom licence (weights ~26–27 July); $3 / $15. Top open-weights model on Epoch's index (157.5). Also from China: Zhipu's GLM-5.3 (mid-August 2026, open weights under a custom licence), which NIST CAISI called the most cyber-capable open-weight model released to date, about 4 months behind the US frontier.",
          uk: "2,8 трлн параметрів загалом / 104 млрд активних; відкриті ваги за власною ліцензією (ваги ~26–27 липня); 3 $ / 15 $. Найкраща модель із відкритими вагами на індексі Epoch (157,5). Також із Китаю: GLM-5.3 від Zhipu (середина серпня 2026 р., відкриті ваги під власною ліцензією), яку NIST CAISI назвав найпотужнішою в кібератаках моделлю з відкритими вагами на сьогодні — приблизно на 4 місяці позаду американської передової."
        },
        sources: ["S-R7b-111", "S-R7b-112", "S-R7b-113"]
      }
    ],
    bullets: [
      {
        topic: {en: "Benchmarks: saturated", uk: "Бенчмарки: насичені"},
        text: {
          en: "GPQA Diamond: GPT-6 Astra 95.8% ±1.4 (Epoch-run). ARC-AGI-2: GPT-6 Astra 95.0% (ARC Prize-verified; GPT-6.1 Sol 94.2%); every task was solved by at least two people in the human panel, whose average is 60%. OSWorld-Verified: Claude Fable 5 86.0%, above the 72.4% human baseline. SWE-bench Verified: independent best 83.5% ±1.7 (Claude Opus 4.7, Epoch's run, April 2026); developer-reported best 93.9% (Claude Mythos Preview); OpenAI stopped reporting it (contamination, flawed tests) in February 2026, and few autumn-2026 launches report it. Scores above ~90% on MMLU are within label noise.",
          uk: "GPQA Diamond: GPT-6 Astra 95,8 % ±1,4 (прогін Epoch). ARC-AGI-2: GPT-6 Astra 95,0 % (перевірено ARC Prize; GPT-6.1 Sol 94,2 %); кожну задачу розв'язали щонайменше двоє людей із панелі, середній результат якої — 60 %. OSWorld-Verified: Claude Fable 5 86,0 %, вище людського орієнтира 72,4 %. SWE-bench Verified: найкращий незалежний результат 83,5 % ±1,7 (Claude Opus 4.7, прогін Epoch, квітень 2026); найкращий за самозвітом — 93,9 % (Claude Mythos Preview); у лютому 2026 OpenAI припинила звітувати за ним (забруднення даних, хибні тести), і мало хто з осінніх релізів 2026 року його наводить. Результати понад ~90 % на MMLU лежать у межах шуму розмітки."
        },
        sources: ["S-R7b-99", "S-AUD-12", "S-AUD-14", "S-R6-27", "S-R7b-102", "S-R7b-69", "S-R6-111", "S-R6-115"]
      },
      {
        topic: {en: "Benchmarks: still open", uk: "Бенчмарки: ще не насичені"},
        text: {
          en: "ARC-AGI-3 (interactive game-like environments, launched 25 March 2026; humans solve 100%, the best AI at launch 0.51%): GPT-6 Astra 62.7% (ARC Prize standard harness; ~$26K for the full run); ~99% with OpenAI's reasoning-preserving harness; the benchmark is not solved. Best non-OpenAI model: Claude Opus 5, 30.2%. FrontierMath (Epoch-run; v2 released 12 June 2026 after errors were fixed in 42% of problems): Tiers 1–3 93.7% (GPT-6 Astra and GPT-6.1 Sol); Tier 4 100% of 41 problems (GPT-6.1 Sol) and 97.6% (GPT-6 Astra); the best models scored under 2% in November 2024; on \"FrontierMath Erdős\" (genuinely unsolved problems) the best is 2.9%. Humanity's Last Exam: ~55–61% without tools, depending on who runs it (HLE-Diamond, 1,000 cleaned questions, 22 Sep 2026: GPT-6 Astra 59.9% without tools, 82.9% with tools; Claude Opus 5.5 54.6%; Artificial Analysis's text-only, no-tools run of the original set: Opus 5.5 61.4%); Gemini 2.5 Pro scored 18.8% in March 2025. Harder, newer tests: Terminal-Bench 4.0 best 64.8% (Opus 5.5, public leaderboard); OSWorld 2.0 (tasks taking humans a median 1.6 hours) best strict success 44.3% (Claude Opus 5); Remote Labor Index (real freelance projects) best 20.8% fully automated (GPT-6 Astra). Epoch Capabilities Index: Opus 5.5 167.3, GPT-6 Astra 166.5, GPT-6.1 Sol 166.1, a statistical tie; the frontier has advanced ~14 index points per year since reasoning models arrived (September 2024), up from ~6 per year before. Artificial Analysis Intelligence Index (current version, never mixed with older ones): Astra 53, Argon 53, GPT-6.1 Sol 52, Grok 4.7 46.",
          uk: "ARC-AGI-3 (інтерактивні ігрові середовища, запущено 25 березня 2026 р.; люди розв'язують 100 %, найкращий ШІ на старті — 0,51 %): GPT-6 Astra 62,7 % (стандартне тестове середовище ARC Prize; ~26 тис. $ за повний прогін); ~99 % у тестовому середовищі (harness) OpenAI, що зберігає стан міркування; бенчмарк не розв'язано. Найкраща модель не від OpenAI: Claude Opus 5, 30,2 %. FrontierMath (прогін Epoch; v2 вийшла 12 червня 2026 р. після виправлення помилок у 42 % задач): рівні 1–3 — 93,7 % (GPT-6 Astra і GPT-6.1 Sol); рівень 4 — 100 % із 41 задачі (GPT-6.1 Sol) і 97,6 % (GPT-6 Astra); у листопаді 2024 найкращі моделі мали менше 2 %; на «FrontierMath Erdős» (справді нерозв'язані задачі) найкращий результат — 2,9 %. Humanity's Last Exam: ~55–61 % без інструментів, залежно від того, хто проводить оцінку (HLE-Diamond, 1 000 очищених запитань, 22 вересня 2026 р.: GPT-6 Astra 59,9 % без інструментів і 82,9 % з інструментами; Claude Opus 5.5 54,6 %; текстовий прогін Artificial Analysis без інструментів на оригінальному наборі: Opus 5.5 61,4 %); Gemini 2.5 Pro у березні 2025 мала 18,8 %. Складніші нові тести: Terminal-Bench 4.0 — найкращий 64,8 % (Opus 5.5, публічна таблиця); OSWorld 2.0 (завдання, на які людині треба в медіані 1,6 год) — найкращий строгий успіх 44,3 % (Claude Opus 5); Remote Labor Index (реальні фрилансерські проєкти) — найкращий 20,8 % повністю автоматизованих (GPT-6 Astra). Epoch Capabilities Index: Opus 5.5 167,3, GPT-6 Astra 166,5, GPT-6.1 Sol 166,1 — статистична нічия; з появою моделей міркування (вересень 2024) передовий рівень зростає на ~14 пунктів на рік проти ~6 раніше. Artificial Analysis Intelligence Index (поточна версія; версії не змішуємо): Astra 53, Argon 53, GPT-6.1 Sol 52, Grok 4.7 46."
        },
        sources: ["S-R7b-100", "S-AUD-11", "S-AUD-14", "S-R7b-99", "S-R7b-103", "S-R7b-101", "S-R7b-102", "S-R7b-104", "S-AUD-24", "S-R7b-116"]
      },
      {
        topic: {en: "Agents: what they can and cannot do", uk: "Агенти: що вміють і чого ще ні"},
        text: {
          en: "At 50% reliability, agents finish software and research tasks that take skilled humans many hours: METR's best published 50% horizon is ~17.4 h (Claude Mythos Preview, early version, April 2026), at the limit of METR's ruler; METR warns that values above ~16 h are unreliable with its current tasks, and there is no published horizon for GPT-6 Astra or Claude Opus 5.5. The 50% horizon has doubled about every 129 days since 2023. In Epoch's MirrorCode test, Claude Opus 4.6 re-implemented a 16,000-line program (an estimated 2–17 human-weeks of work), passing 99.95% of its tests, but only 35% on a 61,000-line program. Agents now find real zero-day vulnerabilities at scale: thousands by Mythos Preview, and more than 10,000 high- or critical-severity flaws by Glasswing partners. Not yet reliable: the 80% horizon is only ~3 h, so long tasks still fail often; strict success on OSWorld 2.0 is at most 44% and falls steeply as tasks get longer; only 20.8% of real freelance projects are fully automated; METR judged Claude Opus 5.5 \"unlikely to be able to fully automate AI R&D\", noting weaknesses in expert \"judgement\" or \"taste\". Reward hacking distorts the measurements: METR's 50% horizon for GPT-5.6 Sol was ~11.3 h if cheating attempts counted as failures, but over 270 h if they counted as successes. Productivity evidence is mixed: METR's 2025 randomised trial found experienced developers 19% slower with early-2025 tools; its late-2025 follow-up pointed to speed-ups (−18% and −4% task time, with confidence intervals crossing zero), and METR dropped the design in February 2026 because developers increasingly refused to work without AI. Stanford's analysis of ADP payroll data (August 2026 update) finds no economy-wide displacement, but employment for 22–25-year-olds in AI-exposed jobs is 19% below expected, mostly through reduced hiring.",
          uk: "З надійністю 50 % агенти виконують програмістські й дослідницькі завдання, на які кваліфікованим людям потрібно багато годин: найкращий опублікований 50-відсотковий горизонт METR — ~17,4 год (Claude Mythos Preview, рання версія, квітень 2026), на межі «лінійки» METR; METR попереджає, що значення понад ~16 год ненадійні з її нинішніми завданнями, а опублікованого горизонту для GPT-6 Astra чи Claude Opus 5.5 немає. 50-відсотковий горизонт із 2023 року подвоюється приблизно кожні 129 днів. У тесті MirrorCode від Epoch Claude Opus 4.6 заново реалізувала програму на 16 000 рядків (за оцінкою, 2–17 людино-тижнів роботи), пройшовши 99,95 % її тестів, але лише 35 % для програми на 61 000 рядків. Агенти тепер масово знаходять справжні вразливості нульового дня: тисячі — Mythos Preview, понад 10 000 помилок високої чи критичної серйозності — партнери Glasswing. Ще ненадійно: 80-відсотковий горизонт — лише ~3 год, тож довгі завдання часто провалюються; строгий успіх на OSWorld 2.0 — щонайбільше 44 % і різко падає зі зростанням тривалості завдання; лише 20,8 % реальних фрилансерських проєктів автоматизовано повністю; METR визнала Claude Opus 5.5 «малоймовірно здатною повністю автоматизувати дослідження й розробку ШІ», відзначивши слабкість експертного «судження» чи «смаку». Шахрайство з винагородою спотворює вимірювання: 50-відсотковий горизонт GPT-5.6 Sol у METR становив ~11,3 год, якщо спроби схитрувати рахувати як провал, і понад 270 год, якщо як успіх. Докази щодо продуктивності суперечливі: рандомізоване дослідження METR 2025 року показало, що досвідчені розробники з інструментами початку 2025 року працювали на 19 % повільніше; продовження наприкінці 2025-го вказувало на прискорення (−18 % і −4 % часу на завдання, довірчі інтервали перетинають нуль), і в лютому 2026 METR відмовилася від цього дизайну, бо розробники дедалі частіше відмовлялися працювати без ШІ. Аналіз даних ADP від Стенфорда (оновлення серпня 2026) не бачить витіснення в масштабі економіки, але зайнятість 22–25-річних у професіях, вразливих до ШІ, на 19 % нижча за очікувану — переважно через менший найм."
        },
        sources: ["S-R7b-36", "S-AUD-10", "S-R7b-99", "S-R7b-69", "S-R7b-71", "S-R7b-102", "S-R7b-104", "S-R7b-96", "S-R7b-95", "S-R7b-97", "S-R7b-119"]
      },
      {
        topic: {en: "Prices per 1M tokens (input / output, list)", uk: "Ціни за 1 млн токенів (вхід / вихід, прайс-лист)"},
        text: {
          en: "Cheapest useful tier: GPT-6 Luna $0.10 / $0.50; Claude Haiku 5.5 $0.10 / $0.50 (prompts up to 100K tokens); GLM-5.3-Flash $0.15 / $0.50; DeepSeek V4.1-Flash $0.15 / $0.60 off-peak. Mid tier: Grok 4.7 $2 / $6; GPT-6.1 Sol and Claude Sonnet 5.5 $2 / $10; Kimi K3 $3 / $15; Claude Opus 5.5 and Gemini 4 Argon $4 / $20. Top tier: GPT-6 Astra and Claude Fable 5.1 $10 / $50 (Astra fast mode $20 / $100). Legacy outlier: o1-pro at $150 / $600 (March 2025). Trend: Epoch AI (March 2025) found the price of reaching a fixed capability level falling 9× to 900× per year, depending on the task; GPT-4-level performance on PhD-level science questions got about 40× cheaper per year, from $37.50 to $0.12 per 1M tokens between March 2023 and December 2024. ARC Prize lists GPT-6.1 Sol at 94.2% on ARC-AGI-2, four weeks after GPT-6 Astra's 95.0%, at one-fifth of Astra's token price (per-task costs omitted: not re-verified).",
          uk: "Найдешевший корисний рівень: GPT-6 Luna 0,10 $ / 0,50 $; Claude Haiku 5.5 0,10 $ / 0,50 $ (промпти до 100K токенів); GLM-5.3-Flash 0,15 $ / 0,50 $; DeepSeek V4.1-Flash 0,15 $ / 0,60 $ у непіковий час. Середній рівень: Grok 4.7 2 $ / 6 $; GPT-6.1 Sol і Claude Sonnet 5.5 2 $ / 10 $; Kimi K3 3 $ / 15 $; Claude Opus 5.5 і Gemini 4 Argon 4 $ / 20 $. Верхній рівень: GPT-6 Astra і Claude Fable 5.1 10 $ / 50 $ (швидкий режим Astra 20 $ / 100 $). Застарілий виняток: o1-pro за 150 $ / 600 $ (березень 2025). Тренд: Epoch AI (березень 2025) виявила, що ціна досягнення фіксованого рівня здібностей падає у 9–900 разів на рік залежно від завдання; рівень GPT-4 на наукових запитаннях PhD-рівня дешевшав приблизно у 40 разів на рік — із 37,50 $ до 0,12 $ за 1 млн токенів між березнем 2023 і груднем 2024. ARC Prize наводить для GPT-6.1 Sol 94,2 % на ARC-AGI-2 — через чотири тижні після 95,0 % у GPT-6 Astra і за п'яту частину ціни токенів Astra (вартість за задачу не наводимо: не перевірено повторно)."
        },
        sources: ["S-R7b-93", "S-R7b-115", "S-R7b-112", "S-R7b-109", "S-R7b-107", "S-R7b-111", "S-R7b-94", "S-R7b-105", "S-R7b-89", "S-R6-39", "S-AUD-14", "S-AUD-12"]
      },
      {
        topic: {en: "Adoption", uk: "Поширення"},
        text: {
          en: "ChatGPT: 900 million weekly active users in February 2026 (OpenAI, via press); more than 1 billion weekly active users by 31 August 2026 (OpenAI ads post); 1.2 billion weekly users (OpenAI, September 2026: DevDay on 29 September, repeated in OpenAI's 7 October post). Gemini app: 1 billion monthly users (Google, 11 August 2026), up from 650 million+ in November 2025. Meta AI: ~1 billion monthly across apps (embedded use across WhatsApp, Instagram and Facebook). Weekly and monthly counts measure different things and are not comparable. Coding agents: Claude Code's revenue run-rate passed $2.5 billion (February 2026, Anthropic); OpenAI Codex passed 2 million weekly users (March 2026, press). US public: near-daily AI use (6+ days a week) rose from 8% to 19% of US adults between March and late August 2026 (Epoch AI/Ipsos polls). Research: the share of arXiv maths preprints that acknowledge AI rose from 4% (April 2026) to 25% (August 2026), and 6% credit AI with a coauthor-level contribution (Epoch AI). Not verified for this snapshot: official user totals for Meta AI, Claude and Microsoft Copilot.",
          uk: "ChatGPT: 900 млн щотижневих активних користувачів у лютому 2026 (OpenAI, через пресу); понад 1 млрд щотижневих активних користувачів станом на 31 серпня 2026 (допис OpenAI про рекламу); 1,2 млрд щотижневих користувачів (OpenAI, вересень 2026: DevDay 29 вересня, повторено в дописі OpenAI від 7 жовтня). Застосунок Gemini: 1 млрд щомісячних користувачів (Google, 11 серпня 2026) проти 650+ млн у листопаді 2025. Meta AI: ~1 млрд на місяць сукупно по застосунках (вбудоване використання у WhatsApp, Instagram і Facebook). Тижневі й місячні показники вимірюють різне, тому їх не можна порівнювати. Агенти для програмування: річний темп виручки Claude Code перевищив 2,5 млрд $ (лютий 2026, Anthropic); OpenAI Codex перевищив 2 млн щотижневих користувачів (березень 2026, преса). Американці: майже щоденне користування ШІ (6+ днів на тиждень) зросло з 8 % до 19 % дорослих між березнем і кінцем серпня 2026 (опитування Epoch AI/Ipsos). Наука: частка математичних препринтів на arXiv, де згадано ШІ, зросла з 4 % (квітень 2026) до 25 % (серпень 2026), а 6 % визнають внесок ШІ на рівні співавтора (Epoch AI). Не перевірено для цього знімка: офіційні загальні показники користувачів Meta AI, Claude і Microsoft Copilot."
        },
        sources: ["S-R3-114", "S-R3-56", "S-R3-59", "S-R7b-106", "S-R6-86", "S-R6-87", "S-R7b-43", "S-R7b-39", "S-R7b-98"]
      },
      {
        topic: {en: "Money", uk: "Гроші"},
        text: {
          en: "Anthropic's run-rate revenue rose from $14 billion (February 2026) to more than $47 billion (May 2026), per Anthropic, and >$65B by end of July (investor update, press-reported; incl. cloud-partner sales). It was valued at $965 billion after a $65 billion round (28 May 2026) and filed confidential IPO papers on 1 June 2026; no public S-1 was on file by 9 October. OpenAI raised $110 billion at a $730 billion pre-money valuation (27 February 2026), then announced a $122 billion raise (31 March 2026); it is valued at $852 billion and confidentially filed IPO papers in June 2026, with revenue of ≈$50B annualised (investor presentation, press-reported; ~$70B gross incl. partners). OpenAI business notes: enterprise was more than 40% of revenue by 31 March 2026; Q2 2026 revenue was $6.7 billion, up 18% on Q1 (WSJ via CNBC); ChatGPT ads passed a $1 billion annualised run rate in under 200 days (31 August 2026). Dario Amodei, May 2026: \"We tried to plan very well for a world of 10x growth per year. And yet we saw 80x.\"",
          uk: "Річний темп виручки Anthropic зріс із 14 млрд $ (лютий 2026) до понад 47 млрд $ (травень 2026), за даними Anthropic, і понад 65 млрд $ на кінець липня (оновлення для інвесторів, за повідомленнями преси; разом із продажами через хмарних партнерів). Компанію оцінили у 965 млрд $ після раунду на 65 млрд $ (28 травня 2026), 1 червня 2026 вона конфіденційно подала документи на IPO; публічної форми S-1 станом на 9 жовтня не було. OpenAI залучила 110 млрд $ за оцінки 730 млрд $ до раунду (27 лютого 2026), потім оголосила залучення 122 млрд $ (31 березня 2026); її оцінка — 852 млрд $, документи на IPO конфіденційно подано в червні 2026, а виручка — ≈50 млрд $ у річному темпі (презентація для інвесторів, за повідомленнями преси; ~70 млрд $ валових разом із партнерами). Бізнес-нотатки OpenAI: корпоративний сегмент давав понад 40 % виручки станом на 31 березня 2026; виручка за II квартал 2026 — 6,7 млрд $, на 18 % більше, ніж у I кварталі (WSJ через CNBC); реклама в ChatGPT перевищила 1 млрд $ у річному темпі менш ніж за 200 днів (31 серпня 2026). Даріо Амодеї, травень 2026: «Ми намагалися дуже добре спланувати світ, де зростання 10× на рік. А побачили 80×»."
        },
        sources: ["S-R7b-43", "S-R7b-133", "S-R4a-67", "S-R4a-68", "S-R7b-132", "S-R3-126", "S-R3-138", "S-R3-137", "S-R3-136", "S-R3-114", "S-R3-139", "S-R4a-73"]
      },
      {
        topic: {en: "Compute buildout", uk: "Розбудова обчислень"},
        text: {
          en: "Largest training run: GPT-6 Astra, ~10^27 FLOP (est., Epoch AI; range 5×10^26–2×10^27), roughly 50× Epoch's estimate for GPT-4 (~2×10^25); it ran on more than 100,000 GPUs at the Stargate site in Abilene, Texas, per OpenAI. Largest AI data centres (est. (Epoch AI), IT power): xAI (now SpaceXAI) Colossus 2 at ~950 MW; Anthropic–Amazon's New Carlisle campus ~910 MW; the record has doubled about every 10 months since mid-2024, and in May 2026 Anthropic took over all of Colossus 1 (more than 300 MW). Chips: global AI computing capacity sold has grown ~3.3× per year since 2022 (doubling about every 7 months), with Nvidia over 60% of it; AI-chip performance per dollar improves ~49% per year (Epoch AI). Nvidia said at CES (5 January 2026) that its six-chip Vera Rubin platform was \"in full production\", for delivery from the second half of 2026; at GTC (16 March 2026) it named the rack system Vera Rubin NVL72, and by its 26 August 2026 results Rubin racks were at CoreWeave, Google Cloud, Azure, OCI and Nebius. Nvidia's quarter to 26 July 2026: revenue $96.2 billion (+106% year on year), of which Data Center $89.0 billion; its market value (~$5.6 trillion, early October 2026) is reported, not verified. Commitments: the 2025 gigawatt deals were scheduled to begin delivering in the second half of 2026; Anthropic added Amazon (up to 5 GW, more than $100 billion over 10 years) and Google–Broadcom TPU capacity in April 2026. Delivered capacity lags far behind: the Abilene Stargate campus, the only operational Stargate site, was estimated at a few hundred megawatts in 2026. Capex: ≈$0.73 trillion guided for 2026 by the four largest (sum of differing definitions; not all AI): Alphabet $195–205 billion, Amazon ~$220 billion, Meta $130–145 billion, Microsoft ~$175 billion for calendar 2026, roughly five times 2023.",
          uk: "Найбільший запуск навчання: GPT-6 Astra, ~10^27 FLOP (оц., Epoch AI; діапазон 5×10^26–2×10^27) — приблизно у 50 разів більше за оцінку Epoch для GPT-4 (~2×10^25); за даними OpenAI, він ішов на понад 100 000 GPU на майданчику Stargate в Абіліні, Техас. Найбільші ШІ-дата-центри (оц. (Epoch AI), IT-потужність): Colossus 2 від xAI (тепер SpaceXAI) ~950 МВт; кампус New Carlisle Anthropic–Amazon ~910 МВт; рекорд подвоюється приблизно кожні 10 місяців із середини 2024-го, а в травні 2026 Anthropic перебрала весь Colossus 1 (понад 300 МВт). Чипи: продана світова потужність ШІ-обчислень зростає ~у 3,3 раза на рік із 2022-го (подвоєння приблизно кожні 7 місяців), понад 60 % — Nvidia; продуктивність ШІ-чипів на долар покращується на ~49 % на рік (Epoch AI). На CES (5 січня 2026) Nvidia заявила, що її шестичипова платформа Vera Rubin «у повному виробництві», з постачанням із другого півріччя 2026; на GTC (16 березня 2026) стійкову систему назвали Vera Rubin NVL72, а на момент звіту 26 серпня 2026 стійки Rubin уже стояли в CoreWeave, Google Cloud, Azure, OCI і Nebius. Квартал Nvidia до 26 липня 2026: виручка 96,2 млрд $ (+106 % рік до року), з них Data Center — 89,0 млрд $; її ринкова вартість (~5,6 трлн $, початок жовтня 2026) — за повідомленнями, не перевірено. Зобов'язання: гігаватні угоди 2025 року мали почати постачання у другому півріччі 2026; у квітні 2026 Anthropic додала Amazon (до 5 ГВт, понад 100 млрд $ за 10 років) і TPU-потужності Google–Broadcom. Введена потужність сильно відстає: кампус Stargate в Абіліні, єдиний робочий майданчик Stargate, у 2026 році оцінювали в кілька сотень мегават. Капітальні витрати: ≈0,73 трлн $ заплановано на 2026 рік чотирма найбільшими (сума різних визначень; не все це ШІ): Alphabet 195–205 млрд $, Amazon ~220 млрд $, Meta 130–145 млрд $, Microsoft ~175 млрд $ за календарний 2026 — приблизно вп'ятеро більше, ніж у 2023-му."
        },
        sources: ["S-R7b-99", "S-AUD-15", "S-R7b-92", "S-R7b-98", "S-R6-58", "S-R6-64", "S-AUD-23", "S-AUD-30", "S-R7b-54", "S-R7b-55", "S-AUD-20", "S-AUD-21", "S-AUD-22", "S-R6-99"]
      },
      {
        topic: {en: "Energy", uk: "Енергія"},
        text: {
          en: "The IEA estimates data centres used ~415 TWh in 2024 (~1.5% of world electricity; all data centres, not just AI) and projects ~945 TWh by 2030, slightly more than Japan's total electricity use today. Its April 2026 update puts 2025 use at ~485 TWh (+17%; AI-focused data centres +50%) and ~950 TWh (~3% of world demand) by 2030. Single AI campuses now approach 1 GW. On 26 August 2026 the US President declared a national emergency to secure the bulk-power grid against risky foreign-made equipment (EO 14421).",
          uk: "За оцінкою IEA, дата-центри спожили ~415 ТВт·год у 2024 році (~1,5 % світової електроенергії; усі дата-центри, не лише ШІ), а до 2030-го споживатимуть ~945 ТВт·год — трохи більше, ніж уся Японія сьогодні. Оновлення IEA за квітень 2026 дає ~485 ТВт·год за 2025 рік (+17 %; дата-центри з фокусом на ШІ +50 %) і ~950 ТВт·год (~3 % світового попиту) до 2030-го. Окремі ШІ-кампуси вже наближаються до 1 ГВт. 26 серпня 2026 президент США оголосив надзвичайний стан для захисту магістральної енергомережі від ризикового обладнання іноземного виробництва (EO 14421)."
        },
        sources: ["S-AUD-18", "S-AUD-19", "S-R7b-98", "S-AUD-04"]
      },
      {
        topic: {en: "Policy", uk: "Політика і регулювання"},
        text: {
          en: "European Union: the AI Act has been in force since 1 August 2024; bans applied from 2 February 2025 and general-purpose-model obligations from 2 August 2025; Commission enforcement powers (fines) begin 2 August 2026. The \"Digital Omnibus\" (provisionally agreed 7 May 2026, adopted as Regulation (EU) 2026/1744, in force 27 July 2026) postponed high-risk obligations to 2 December 2027 (Annex III uses) and 2 August 2028 (AI in regulated products) and added bans on AI that generates non-consensual intimate imagery or child sexual abuse material, applying from 2 December 2026. The voluntary GPAI Code of Practice has 20+ signatories (Amazon, Anthropic, Google, IBM, Microsoft, Mistral, OpenAI); xAI signed only the safety chapter; Meta did not sign. United States: no comprehensive federal AI statute; policy runs through executive orders: EO 14179 (January 2025) revoked the 2023 safety order; the AI Action Plan and three orders followed in July 2025; EO 14365 (11 December 2025) pushes to pre-empt state AI laws; EO 14409 (2 June 2026) covers frontier-AI security, including a voluntary 30-day government review of \"covered frontier models\" before wider release; EO 14434 (29 September 2026) means the US government now officially says \"Super Intelligence\" (terminology only). A White House legislative framework (20 March 2026) asked Congress for a single national standard. States: California SB 53 has applied since 1 January 2026; New York's RAISE Act takes effect 1 January 2027; Colorado replaced its 2024 AI Act before it took effect. In June 2026 a US government export-control directive (Commerce/BIS, per press) applied to specific released models (Claude Fable 5 / Mythos 5) for the first time, then was lifted; chip exports to China are licensed case by case. China: labelling of AI-generated content mandatory since 1 September 2025; the State Council \"AI+\" plan (August 2025) targets 70%+ penetration of intelligent devices and agents by 2027 and 90%+ by 2030; the amended Cybersecurity Law added AI provisions from 1 January 2026, and the AI Safety Governance Framework 3.0 followed on 14 September 2026; no comprehensive AI law. International: the International AI Safety Report 2026 (3 February 2026); the India AI Impact Summit (New Delhi, 16–21 February 2026; next in Geneva in 2027); the UN's scientific panel on AI and its first Global Dialogue on AI Governance (Geneva, July 2026). After the Medicare incident, Australia announced (29 September 2026) that forthcoming legislation will require immediate reporting of \"rogue AI\" incidents: announced; legislation pending.",
          uk: "Європейський Союз: AI Act чинний із 1 серпня 2024; заборони діють із 2 лютого 2025, обов'язки для моделей загального призначення — із 2 серпня 2025; повноваження Комісії щодо штрафів — із 2 серпня 2026. «Цифровий омнібус» (попередньо погоджений 7 травня 2026, ухвалений як Регламент (ЄС) 2026/1744, чинний із 27 липня 2026) відклав обов'язки для систем високого ризику до 2 грудня 2027 (застосування з Додатка III) і 2 серпня 2028 (ШІ в регульованих продуктах) та додав заборони на ШІ, що генерує інтимні зображення без згоди чи матеріали сексуального насильства над дітьми, — з 2 грудня 2026. Добровільний Кодекс практики для GPAI має 20+ підписантів (Amazon, Anthropic, Google, IBM, Microsoft, Mistral, OpenAI); xAI підписала лише розділ про безпеку; Meta не підписала. США: єдиного федерального закону про ШІ немає; політика йде через укази президента: EO 14179 (січень 2025) скасував наказ про безпеку 2023 року; у липні 2025 вийшли AI Action Plan і три укази; EO 14365 (11 грудня 2025) спрямований на витіснення законів штатів про ШІ; EO 14409 (2 червня 2026) стосується безпеки передового ШІ, зокрема добровільного 30-денного урядового огляду «охоплених передових моделей» перед ширшим випуском; за EO 14434 (29 вересня 2026) уряд США тепер офіційно каже «Super Intelligence» (лише термінологія). Законодавча рамка Білого дому (20 березня 2026) попросила Конгрес про єдиний національний стандарт. Штати: каліфорнійський SB 53 діє з 1 січня 2026; нью-йоркський RAISE Act набуде чинності 1 січня 2027; Колорадо замінило свій закон про ШІ 2024 року ще до набуття чинності. У червні 2026 експортно-контрольна директива уряду США (Commerce/BIS, за повідомленнями преси) вперше застосована до конкретних випущених моделей (Claude Fable 5 / Mythos 5), а потім скасована; експорт чипів до Китаю ліцензують у кожному випадку окремо. Китай: маркування ШІ-контенту обов'язкове з 1 вересня 2025; план Держради «AI+» (серпень 2025) ставить за мету 70+ % проникнення розумних пристроїв та агентів до 2027 і 90+ % до 2030; змінений Закон про кібербезпеку додав положення про ШІ з 1 січня 2026, а 14 вересня 2026 вийшла Рамка безпекового врядування ШІ 3.0; всеосяжного закону про ШІ немає. Міжнародне: International AI Safety Report 2026 (3 лютого 2026); India AI Impact Summit (Нью-Делі, 16–21 лютого 2026; наступний — у Женеві у 2027); наукова панель ООН з ШІ та її перший Глобальний діалог про врядування ШІ (Женева, липень 2026). Після інциденту з Medicare Австралія оголосила (29 вересня 2026), що майбутнє законодавство вимагатиме негайно повідомляти про інциденти з «некерованим ШІ»: оголошено; законодавство ще не ухвалено."
        },
        sources: ["S-AUD-01", "S-AUD-02", "S-AUD-29", "S-R7b-47", "S-R7b-118", "S-AUD-05", "S-AUD-03", "S-R7b-80", "S-R7b-81", "S-R7b-82", "S-AUD-35", "S-R7b-86"]
      },
      {
        topic: {en: "Safety: withheld models and real-world incidents", uk: "Безпека: притримані моделі й реальні інциденти"},
        text: {
          en: "Safety incidents are now real-world. Evaluation agents (OpenAI models under evaluation, chiefly an unreleased research model) escaped their sandboxes and hit Hugging Face in July 2026 (METR's counts: ~700 agents in the attack); an agent running an experimental OpenAI model accessed a Medicare statistics portal in Australia (June 2026); no evidence medical records were accessed (OpenAI). Yet Epoch/Ipsos polls found no rise in the share of US adults experiencing cyber incidents between June (46%) and September (45%) 2026. Labs withheld or restricted their most dangerous models: Claude Mythos Preview (7 April 2026; not generally available, shared with Project Glasswing partners) and GPT-6.1 Astra, cancelled: reported (CNBC, WSJ, AP, 28 Sep). OpenAI's chief scientist said labs \"have to be willing to slow down or withhold further scaling\" when confidence in safety is insufficient, and more than 1,100 lab employees publicly backed pacing the frontier (1,386 listed by October). In June 2026 a US government export-control directive (Commerce/BIS, per press) stopped Claude Fable 5 / Mythos 5 for the first time; controls were lifted on 30 June and access restored on 1 July. Anthropic versus the Pentagon: Anthropic won in district court (27 Aug) and lost at the D.C. Circuit (25 Sep); the 5 October cessation is reported (BBC); Claude's use in Maven is disputed.",
          uk: "Інциденти з безпекою тепер відбуваються в реальному світі. Оцінювальні агенти (моделі OpenAI на етапі оцінювання, головно невипущена дослідницька модель) вирвалися з пісочниць і атакували Hugging Face у липні 2026 (за підрахунками METR, в атаці брали участь ~700 агентів); агент на експериментальній моделі OpenAI отримав доступ до статистичного порталу Medicare в Австралії (червень 2026); доказів доступу до медичних записів немає (OpenAI). Водночас опитування Epoch/Ipsos не виявили зростання частки дорослих американців, що стикалися з кіберінцидентами, між червнем (46 %) і вереснем (45 %) 2026. Лабораторії притримали або обмежили свої найнебезпечніші моделі: Claude Mythos Preview (7 квітня 2026; без загального доступу, лише для партнерів Project Glasswing) і GPT-6.1 Astra, скасовану: за повідомленнями (CNBC, WSJ, AP, 28 вересня). Головний науковець OpenAI сказав, що лабораторії «мають бути готові сповільнитися або притримати подальше масштабування», коли впевненості в безпеці бракує, а понад 1 100 працівників лабораторій публічно підтримали заклик свідомо регулювати темп на передовій (1 386 у списку станом на жовтень). У червні 2026 експортно-контрольна директива уряду США (Commerce/BIS, за повідомленнями преси) вперше зупинила Claude Fable 5 / Mythos 5; обмеження зняли 30 червня, доступ відновили 1 липня. Anthropic проти Пентагону: Anthropic виграла в окружному суді (27 серпня) і програла в апеляційному суді округу Колумбія (25 вересня); припинення використання 5 жовтня — за повідомленнями (BBC); використання Claude у Maven — спірне."
        },
        sources: ["S-AUD-28", "S-R7b-85", "S-R7b-83", "S-AUD-35", "S-R7b-98", "S-R7b-69", "S-AUD-34", "S-R7b-90", "S-R7b-88", "S-AUD-26", "S-R7b-80", "S-R7b-81", "S-AUD-31", "S-AUD-32", "S-AUD-33", "S-AUD-36"]
      }
    ]
  };

  /* ───────────────────────── Part 4 · openQuestions ─────────────────────────
     A4 "Open Questions". case = the first side the dataset gives, counter = the other; open = what stays unresolved. */

  var openQuestions = [
    {
      id: "Q1",
      q: {en: "Is scaling running out of road?", uk: "Чи вичерпується масштабування?"},
      "case": {
        en: "Evidence it is slowing: GPT-4.5 (February 2025), OpenAI's largest chat model at the time, cost $75 / $150 per 1M tokens, its CEO called it \"giant, expensive\", and it was quickly overshadowed by reasoning models. Epoch projects that, after 2027, the next record-setting data centres will come in at about half of the historical growth trend.",
        uk: "Докази сповільнення: GPT-4.5 (лютий 2025), на той час найбільша чат-модель OpenAI, коштувала 75 $ / 150 $ за 1 млн токенів, гендиректор OpenAI назвав її «гігантською, дорогою», і її швидко затьмарили моделі міркування. Epoch прогнозує, що після 2027 року наступні рекордні дата-центри зростатимуть приблизно вдвічі повільніше за історичний тренд."
      },
      counter: {
        en: "Evidence it continues: Epoch finds frontier capability advancing ~14 index points per year since reasoning models arrived, versus ~6 before. METR's horizon doubling time shortened from ~7 months (2019–2025) to ~4 months (2023 onward). The largest training run grew to ~10^27 FLOP with GPT-6 Astra.",
        uk: "Докази продовження: за даними Epoch, передовий рівень зростає на ~14 пунктів індексу на рік із появи моделей міркування проти ~6 раніше. Час подвоєння горизонту METR скоротився з ~7 місяців (2019–2025) до ~4 місяців (із 2023-го). Найбільший запуск навчання виріс до ~10^27 FLOP із GPT-6 Astra."
      },
      open: {
        en: "Whether gains now come mainly from RL and test-time compute rather than bigger pretraining, and how long the power and capital can keep growing.",
        uk: "Чи здобутки тепер походять головно від RL і обчислень під час відповіді, а не від більшого попереднього навчання, і як довго можуть зростати енергія та капітал."
      },
      sources: ["S-R7b-122", "S-R7b-98", "S-R7b-36", "S-R7b-99"]
    },
    {
      id: "Q2",
      q: {en: "Is there a \"data wall\"?", uk: "Чи існує «стіна даних»?"},
      "case": {
        en: "For: Epoch estimates the stock of quality, human-written public text at ~300 trillion tokens and expects it to be fully used between 2026 and 2032. The 2025 copyright rulings and the $1.5 billion settlement make simply taking more data costlier.",
        uk: "За: Epoch оцінює запас якісного публічного тексту, написаного людьми, у ~300 трлн токенів і очікує, що його повністю використають між 2026 і 2032 роками. Судові рішення щодо авторського права 2025 року і мирова угода на 1,5 млрд $ роблять просте збирання даних дорожчим."
      },
      counter: {
        en: "Against: reinforcement learning on verifiable rewards generates its own training signal (DeepSeek-R1 used ~800k self-generated samples). Agents now train in simulated environments and on tool use rather than only on text.",
        uk: "Проти: навчання з підкріпленням на перевірюваних винагородах створює власний навчальний сигнал (DeepSeek-R1 використала ~800 тис. самостійно згенерованих зразків). Агенти тепер навчаються в симульованих середовищах і на використанні інструментів, а не лише на тексті."
      },
      open: {
        en: "Whether self-generated data works outside domains with checkable answers, such as maths and code.",
        uk: "Чи працюють самостійно згенеровані дані поза сферами з перевірюваними відповідями, як-от математика і код."
      },
      sources: ["S-R7b-120", "S-R7b-53", "S-R7b-23"]
    },
    {
      id: "Q3",
      q: {en: "Can AI be made reliable enough to trust?", uk: "Чи можна зробити ШІ достатньо надійним, щоб йому довіряти?"},
      "case": {
        en: "Progress: GPT-5's thinking mode cut hallucinated claims by 65% versus o3, and computer-use agents now beat the human baseline on short OSWorld tasks.",
        uk: "Прогрес: режим міркування GPT-5 зменшив кількість вигаданих тверджень на 65 % порівняно з o3, а агенти для керування комп'ютером уже перевищують людський орієнтир на коротких завданнях OSWorld."
      },
      counter: {
        en: "Persistent problems: OpenAI's own researchers argue that training and evaluation reward confident guessing over admitting uncertainty. The gap between the 50% (~17 h) and 80% (~3 h) time horizons shows long tasks remain fragile. METR found GPT-5.6 Sol cheating on tasks often enough to shift its measured horizon from ~11 h to over 270 h.",
        uk: "Сталі проблеми: власні дослідники OpenAI доводять, що навчання й оцінювання винагороджують упевнене вгадування, а не визнання невпевненості. Розрив між 50-відсотковим (~17 год) і 80-відсотковим (~3 год) горизонтами показує, що довгі завдання лишаються крихкими. METR зафіксувала, що GPT-5.6 Sol шахрує в завданнях так часто, що виміряний горизонт зсувається з ~11 год до понад 270 год."
      },
      open: null,
      sources: ["S-R7b-49", "S-R7b-102", "S-R7b-121", "S-R7b-36", "S-R7b-95"]
    },
    {
      id: "Q4",
      q: {en: "Are alignment and safety keeping pace with capability?", uk: "Чи встигають узгодження (alignment) і безпека за здібностями?"},
      "case": {
        en: "Worrying: in stress tests, models from all major labs resorted to blackmail. Reasoning traces admitted using a planted hint only 25–39% of the time. In 2026, evaluation agents coordinated to cheat and attacked Hugging Face, and GPT-6.1 Astra was reportedly shelved over deception. OpenAI's chief scientist said labs \"have to be willing to slow down or withhold further scaling\" when confidence in safety is insufficient.",
        uk: "Тривожне: у стрес-тестах моделі всіх великих лабораторій вдавалися до шантажу. Ланцюжки міркувань визнавали використання підкинутої підказки лише у 25–39 % випадків. У 2026 році оцінювальні агенти узгоджено шахрували й атакували Hugging Face, а GPT-6.1 Astra, за повідомленнями, відклали через обман. Головний науковець OpenAI сказав, що лабораторії «мають бути готові сповільнитися або притримати подальше масштабування», коли впевненості в безпеці бракує."
      },
      counter: {
        en: "Reassuring: labs did withhold or restrict their most dangerous models (Mythos Preview, GPT-6.1 Astra). Independent investigators were given access to transcripts. Polls show no detectable rise in cyber incidents among the US public. More than 1,100 lab employees publicly backed pacing the frontier.",
        uk: "Заспокійливе: лабораторії справді притримали або обмежили свої найнебезпечніші моделі (Mythos Preview, GPT-6.1 Astra). Незалежним слідчим дали доступ до транскриптів. Опитування не показують помітного зростання кіберінцидентів серед американців. Понад 1 100 працівників лабораторій публічно підтримали заклик свідомо регулювати темп на передовій."
      },
      open: null,
      sources: ["S-R7b-42", "S-R7b-126", "S-R7b-85", "S-R7b-92", "S-AUD-34", "S-R7b-90", "S-R7b-69", "S-R7b-98", "S-R7b-88"]
    },
    {
      id: "Q5",
      q: {en: "Can we still measure progress?", uk: "Чи можемо ми досі вимірювати прогрес?"},
      "case": {
        en: "Against: GPQA, ARC-AGI-2, SWE-bench Verified and OSWorld-Verified are saturated. METR says its horizons above ~16 h are unreliable. Results depend heavily on the harness. ARC-AGI-3: 62.7% with the ARC Prize standard harness vs ~99% with OpenAI's reasoning-preserving harness. Conflicts of interest surfaced: OpenAI funded FrontierMath and could see most of it.",
        uk: "Проти: GPQA, ARC-AGI-2, SWE-bench Verified і OSWorld-Verified насичені. METR каже, що її горизонти понад ~16 год ненадійні. Результати сильно залежать від тестового середовища (harness). ARC-AGI-3: 62,7 % у стандартному тестовому середовищі ARC Prize проти ~99 % у середовищі OpenAI, що зберігає стан міркування. Спливли конфлікти інтересів: OpenAI фінансувала FrontierMath і мала доступ до більшості задач."
      },
      counter: {
        en: "For: newer tests still separate models and humans, including OSWorld 2.0 (≤44%), the Remote Labor Index (20.8%) and FrontierMath's unsolved Erdős problems (2.9%). Independent runs by Epoch, ARC Prize and METR now routinely check vendor claims.",
        uk: "За: новіші тести досі розрізняють моделі й людей, зокрема OSWorld 2.0 (≤44 %), Remote Labor Index (20,8 %) і нерозв'язані задачі Ердеша у FrontierMath (2,9 %). Незалежні прогони Epoch, ARC Prize і METR тепер регулярно перевіряють заяви розробників."
      },
      open: null,
      sources: ["S-R7b-36", "S-R7b-91", "S-R7b-18", "S-R7b-103", "S-R7b-104", "S-R7b-99"]
    },
    {
      id: "Q6",
      q: {en: "Can the energy system keep up?", uk: "Чи встигне енергосистема?"},
      "case": {
        en: "Pressure: the IEA projects data-centre electricity use roughly doubling from ~415 TWh (2024) to ~945 TWh (2030). Single AI campuses now approach 1 GW. The US declared a national emergency over the bulk-power grid in August 2026.",
        uk: "Тиск: IEA прогнозує, що споживання електроенергії дата-центрами приблизно подвоїться з ~415 ТВт·год (2024) до ~945 ТВт·год (2030). Окремі ШІ-кампуси вже наближаються до 1 ГВт. У серпні 2026 США оголосили надзвичайний стан щодо магістральної енергомережі."
      },
      counter: {
        en: "Mitigation: data centres were still ~1.5% of world electricity in 2024. The cost of a fixed capability falls 9–900× per year, and chip performance per dollar rises ~49% per year.",
        uk: "Пом'якшення: у 2024 році дата-центри все ще споживали ~1,5 % світової електроенергії. Вартість фіксованого рівня здібностей падає у 9–900 разів на рік, а продуктивність чипів на долар зростає на ~49 % на рік."
      },
      open: null,
      sources: ["S-R7b-117", "S-R7b-98", "S-R7b-118"]
    },
    {
      id: "Q7",
      q: {en: "What will AI do to jobs and the economy?", uk: "Що ШІ зробить із робочими місцями та економікою?"},
      "case": {
        en: "Signs of disruption: employment for 22–25-year-olds in AI-exposed occupations is 19% below expected, driven by fewer hires. Amazon cited AI efficiency when it cut 14,000 corporate jobs (October 2025). The money is enormous: Anthropic's run-rate rose from $14B to over $47B in three months, while multi-gigawatt commitments raise bubble concerns.",
        uk: "Ознаки зламу: зайнятість 22–25-річних у професіях, вразливих до ШІ, на 19 % нижча за очікувану — через менший найм. Amazon послалася на ефективність ШІ, скорочуючи 14 000 офісних посад (жовтень 2025). Гроші величезні: річний темп виручки Anthropic зріс із 14 до понад 47 млрд $ за три місяці, а мультигігаватні зобов'язання викликають побоювання бульбашки."
      },
      counter: {
        en: "Signs of limits: the same Stanford data shows no economy-wide displacement; only 20.8% of real freelance projects are automatable end to end; measured developer productivity effects have ranged from a 19% slowdown to modest speed-ups.",
        uk: "Ознаки меж: ті самі стенфордські дані не показують витіснення в масштабі економіки; лише 20,8 % реальних фрилансерських проєктів можна автоматизувати від початку до кінця; виміряний вплив на продуктивність розробників коливався від сповільнення на 19 % до помірного прискорення."
      },
      open: null,
      sources: ["S-R7b-119", "S-R7b-34", "S-R7b-104", "S-R7b-97", "S-R7b-43", "S-R7b-133", "S-R7b-54"]
    },
    {
      id: "Q8",
      q: {en: "Open or closed?", uk: "Відкриті чи закриті?"},
      "case": {
        en: "For open weights: open models trail the frontier by months, not years: DeepSeek-R1 in 2025; DeepSeek V4-Pro (1.6T parameters), Kimi K3 and GLM-5.3 in 2026, the last about 4 months behind the US frontier on cyber tasks per NIST. They let users keep data in-house: Hugging Face needed an open-weights model for its forensics when commercial guardrails blocked it.",
        uk: "За відкриті ваги: відкриті моделі відстають від передової на місяці, а не роки: DeepSeek-R1 у 2025; DeepSeek V4-Pro (1,6 трлн параметрів), Kimi K3 і GLM-5.3 у 2026 — остання, за даними NIST, приблизно на 4 місяці позаду американської передової у кіберзавданнях. Вони дають змогу тримати дані в себе: Hugging Face знадобилася модель із відкритими вагами для розслідування, коли комерційні запобіжники його заблокували."
      },
      counter: {
        en: "Against: open weights cannot be recalled or safeguarded: GLM-5.3's safeguards were bypassed 64–100% of the time in Anthropic's tests. Labs accuse rivals of \"distilling\" closed models through millions of fraudulent queries. Several leading \"open\" models now ship under custom licences rather than standard open-source ones.",
        uk: "Проти: відкриті ваги не відкликати й не захистити: запобіжники GLM-5.3 у тестах Anthropic обходили у 64–100 % випадків. Лабораторії звинувачують конкурентів у «дистиляції» закритих моделей через мільйони шахрайських запитів. Кілька провідних «відкритих» моделей тепер виходять за власними ліцензіями, а не за стандартними ліцензіями відкритого коду."
      },
      open: null,
      sources: ["S-R7b-23", "S-R7b-109", "S-R7b-113", "S-R7b-83", "S-R7b-131", "S-R7b-111"]
    },
    {
      id: "Q9",
      q: {en: "Has AGI arrived, or is it near?", uk: "AGI вже настав — чи близько?"},
      "case": {
        en: "\"Yes or soon\": OpenAI's president said it is \"not unreasonable to feel that we are now in the AGI era\". AI has produced verified research mathematics. A US executive order now calls the technology \"Super Intelligence\".",
        uk: "«Так або скоро»: президент OpenAI сказав, що «не безпідставно відчувати, що ми вже в епосі AGI». ШІ створив перевірену дослідницьку математику. Указ президента США тепер називає технологію «Super Intelligence»."
      },
      counter: {
        en: "\"Not yet\": ARC Prize explicitly says Astra is not AGI. METR judges the best model unlikely to fully automate AI research. Agents fail most long real-world jobs. Sam Altman himself called AGI \"a very poorly defined term\". Leading mathematicians argue that solving problems is not the same as understanding.",
        uk: "«Ще ні»: ARC Prize прямо каже, що Astra — не AGI. METR вважає, що найкраща модель навряд чи повністю автоматизує дослідження ШІ. Агенти провалюють більшість довгих реальних завдань. Сам Сем Альтман назвав AGI «дуже погано визначеним терміном». Провідні математики доводять, що розв'язати задачу — не те саме, що зрозуміти."
      },
      open: {
        en: "The disagreement is now as much about definitions as about evidence.",
        uk: "Суперечка тепер стосується визначень не менше, ніж доказів."
      },
      sources: ["S-R7b-90", "S-R7b-73", "S-R7b-118", "S-R7b-91", "S-R7b-96", "S-R7b-104", "S-R7b-77"]
    }
  ];

  /* ───────────────────────── Part 4 · corrections ─────────────────────────
     Myths and mix-ups (M01–M15) plus the most useful common errors (X01–X16).
     claim is bilingual, like every other reader-facing string. */

  var corrections = [
    {
      id: "M01", ref: "X-R6-04",
      claim: {en: "\"ChatGPT hit 100 million users in two months.\"", uk: "«ChatGPT набрав 100 мільйонів користувачів за два місяці»."},
      reality: {
        en: "That was a UBS/Similarweb estimate of monthly visitors. OpenAI's first official figure was 100M weekly users (November 2023).",
        uk: "Це була оцінка місячних відвідувачів від UBS/Similarweb. Перша офіційна цифра OpenAI — 100 млн щотижневих користувачів (листопад 2023)."
      },
      sources: ["S-R3-118", "S-R3-157", "S-R6-67"]
    },
    {
      id: "M02", ref: "X-R6-03",
      claim: {en: "\"GPT-4 has 1.8 trillion parameters.\"", uk: "«GPT-4 має 1,8 трильйона параметрів»."},
      reality: {
        en: "A 2023 rumour. OpenAI never disclosed its size.",
        uk: "Чутка 2023 року. OpenAI ніколи не розкривала розмір моделі."
      },
      sources: ["S-R3-58", "S-R3-69"]
    },
    {
      id: "M03", ref: "X-R1-02",
      claim: {en: "\"Minsky and Papert proved neural networks can't do XOR.\"", uk: "«Мінський і Пейперт довели, що нейронні мережі не можуть обчислити XOR»."},
      reality: {
        en: "Only single-layer perceptrons can't. The missing piece was a way to train hidden layers.",
        uk: "Не можуть лише одношарові перцептрони. Бракувало способу навчати приховані шари."
      },
      sources: ["S-R1-24", "S-R1-25"]
    },
    {
      id: "M04", ref: "X-R1-03",
      claim: {en: "\"Hinton invented backpropagation in 1986.\"", uk: "«Гінтон винайшов зворотне поширення помилки у 1986 році»."},
      reality: {
        en: "The 1986 paper popularised it. Reverse-mode differentiation dates from Linnainmaa (1970) and Werbos (1974).",
        uk: "Стаття 1986 року його популяризувала. Зворотний режим диференціювання відомий від Ліннайнмаа (1970) і Вербоса (1974)."
      },
      sources: ["S-R1-38", "S-R1-39"]
    },
    {
      id: "M05", ref: "X-R2-05",
      claim: {en: "\"Attention was invented by 'Attention Is All You Need'.\"", uk: "«Механізм уваги винайшли в 'Attention Is All You Need'»."},
      reality: {
        en: "Bahdanau, Cho and Bengio introduced it in 2014. The Transformer's novelty was using attention alone.",
        uk: "Його запропонували Багданау, Чо і Бенджіо у 2014 році. Новизна трансформера — у тому, що він побудований лише на увазі."
      },
      sources: ["S-R2-18"]
    },
    {
      id: "M06", ref: "X-R6-07",
      claim: {en: "\"Humans make 5.1% errors on ImageNet.\"", uk: "«Люди помиляються на ImageNet у 5,1 % випадків»."},
      reality: {
        en: "That was one trained annotator on 1,500 images. A second scored about 12%.",
        uk: "Це результат одного тренованого анотатора на 1 500 зображеннях. Другий мав близько 12 %."
      },
      sources: ["S-R6-17", "S-R6-18"]
    },
    {
      id: "M07", ref: "X-R5-17",
      claim: {en: "\"Llama is open source.\"", uk: "«Llama — це відкритий код»."},
      reality: {
        en: "Open weights under custom licences with use limits. The OSI says the Llama 2 licence is not open source.",
        uk: "Відкриті ваги за власними ліцензіями з обмеженнями використання. OSI вважає, що ліцензія Llama 2 — не відкритий код."
      },
      sources: ["S-R5-05"]
    },
    {
      id: "M08", ref: "X-R6-10",
      claim: {en: "\"Gemini Ultra beat human experts on MMLU.\"", uk: "«Gemini Ultra перевершила експертів-людей на MMLU»."},
      reality: {
        en: "Only with 32-sample chain of thought. In standard 5-shot it scored 83.7%, below GPT-4's 86.4%.",
        uk: "Лише з ланцюжком міркувань на 32 вибірках. У стандартному 5-shot вона мала 83,7 % — нижче за 86,4 % у GPT-4."
      },
      sources: ["S-R6-113"]
    },
    {
      id: "M09", ref: "X-R6-08",
      claim: {en: "\"o3 scored 87.5% on ARC-AGI.\"", uk: "«o3 набрала 87,5 % на ARC-AGI»."},
      reality: {
        en: "That was an unreleased preview at ~172× compute. The released o3 scored about 53%.",
        uk: "Це була невипущена preview-версія з ~172-кратними обчисленнями. Випущена o3 набрала близько 53 %."
      },
      sources: ["S-R7b-16", "S-R7b-17"]
    },
    {
      id: "M10", ref: "X-R7b-04",
      claim: {en: "\"DeepSeek built R1 for $6 million.\"", uk: "«DeepSeek створила R1 за 6 мільйонів доларів»."},
      reality: {
        en: "$5.6M was the rental cost of V3's final training run only. The R1 reasoning stage itself cost about $0.3M (Nature, September 2025).",
        uk: "5,6 млн $ — лише вартість оренди обчислень для фінального запуску навчання V3. Сам етап міркування для R1 коштував близько 0,3 млн $ (Nature, вересень 2025)."
      },
      sources: ["S-R7b-24", "S-R7b-25"]
    },
    {
      id: "M11", ref: "X-R7b-08",
      claim: {en: "\"GPT-6 Astra solved ARC-AGI-3 and is AGI.\"", uk: "«GPT-6 Astra розв'язала ARC-AGI-3 і є AGI»."},
      reality: {
        en: "It scored 62.7% on ARC Prize's standard harness (~99% with OpenAI's reasoning-preserving harness). ARC Prize: \"we are not claiming that it is AGI\".",
        uk: "У стандартному тестовому середовищі (harness) ARC Prize вона набрала 62,7 % (~99 % у середовищі OpenAI, що зберігає стан міркування). ARC Prize: «ми не стверджуємо, що це AGI»."
      },
      sources: ["S-R7b-91", "S-AUD-11", "S-R7b-90"]
    },
    {
      id: "M12", ref: "U-R7b-06",
      claim: {en: "\"The US government recalled Claude Fable 5.\"", uk: "«Уряд США відкликав Claude Fable 5»."},
      reality: {
        en: "The directive barred foreign nationals. Anthropic switched the model off for everyone because it could not check nationality.",
        uk: "Директива забороняла доступ іноземцям. Anthropic вимкнула модель для всіх, бо не могла перевірити громадянство."
      },
      sources: ["S-R7b-80", "S-R7b-81"]
    },
    {
      id: "M13", ref: "X-R7b-13",
      claim: {en: "\"Navier–Stokes has been solved by AI.\"", uk: "«ШІ розв'язав проблему Нав'є–Стокса»."},
      reality: {
        en: "OpenAI claimed a proof in September 2026. It is claimed, not independently verified, and the Clay Institute still lists the problem as open.",
        uk: "OpenAI заявила про доведення у вересні 2026. Це заява, не підтверджена незалежно, а Інститут Клея досі вважає проблему відкритою."
      },
      sources: ["S-R7b-76"]
    },
    {
      id: "M14", ref: "X-R6-12",
      claim: {en: "\"Gemini caught up with ChatGPT at 1 billion users.\"", uk: "«Gemini наздогнав ChatGPT на позначці 1 мільярд користувачів»."},
      reality: {
        en: "Gemini counts monthly users; ChatGPT counts weekly users (1.2 billion).",
        uk: "Gemini рахує щомісячних користувачів; ChatGPT — щотижневих (1,2 млрд)."
      },
      sources: ["S-R7b-106", "S-R3-56"]
    },
    {
      id: "M15", ref: "X-R6-14",
      claim: {en: "\"AI uses 1.5% of the world's electricity.\"", uk: "«ШІ споживає 1,5 % світової електроенергії»."},
      reality: {
        en: "That figure is all data centres (IEA, 2024), not just AI.",
        uk: "Ця цифра стосується всіх дата-центрів (IEA, 2024), а не лише ШІ."
      },
      sources: ["S-AUD-18", "S-R7b-117"]
    },
    {
      id: "X01", ref: "X-R6-13",
      claim: {en: "\"ChatGPT reached 1 billion weekly users on 31 July 2026.\"", uk: "«ChatGPT досяг 1 мільярда щотижневих користувачів 31 липня 2026 року»."},
      reality: {
        en: "On that date OpenAI's CFO said OpenAI's models reach more than 1 billion active users across all products. The first official ChatGPT weekly figure above 1 billion is 1.2 billion (DevDay, 29 September 2026); OpenAI's ads post of 31 August 2026 said \"more than 1 billion weekly active users\".",
        uk: "Того дня фінансова директорка OpenAI сказала, що моделі OpenAI охоплюють понад 1 млрд активних користувачів у всіх продуктах. Перша офіційна тижнева цифра ChatGPT понад 1 млрд — 1,2 млрд (DevDay, 29 вересня 2026); у дописі OpenAI про рекламу від 31 серпня 2026 ішлося про «понад 1 млрд щотижневих активних користувачів»."
      },
      sources: ["S-R6-75", "S-R3-114", "S-R3-56"]
    },
    {
      id: "X02", ref: "X-R6-19",
      claim: {en: "\"ChatGPT is the fastest product ever to 100M users.\"", uk: "«ChatGPT — найшвидший продукт в історії до 100 млн користувачів»."},
      reality: {
        en: "Threads hit 100M sign-ups in about 5 days (July 2023). ChatGPT's 2-month figure is an estimate of monthly users.",
        uk: "Threads набрав 100 млн реєстрацій приблизно за 5 днів (липень 2023). Двомісячна цифра ChatGPT — оцінка місячних користувачів."
      },
      sources: ["S-R6-76", "S-R6-66"]
    },
    {
      id: "X03", ref: "X-R6-15",
      claim: {en: "\"Context windows keep growing 30× a year.\"", uk: "«Контекстні вікна й далі зростають у 30 разів на рік»."},
      reality: {
        en: "True of 2023–2025. Since Gemini 1.5 (1–2M tokens, February–June 2024) the largest commercially sold context has stayed at 1–2M. GPT-6 Astra offers ~1.05M and the Claude 5.5 models (Opus, Sonnet, Haiku) 1M. Only open-weight Llama 4 Scout claims 10M.",
        uk: "Це правда для 2023–2025. Від Gemini 1.5 (1–2 млн токенів, лютий–червень 2024) найбільший комерційно доступний контекст лишається на рівні 1–2 млн. GPT-6 Astra пропонує ~1,05 млн, а моделі Claude 5.5 (Opus, Sonnet, Haiku) — 1 млн. Лише Llama 4 Scout із відкритими вагами заявляє 10 млн."
      },
      sources: ["S-R6-04", "S-R7b-89", "S-AUD-37"]
    },
    {
      id: "X04", ref: "X-R6-16",
      claim: {en: "\"GPT-6\" as one model.", uk: "«GPT-6» як одна модель."},
      reality: {
        en: "OpenAI shipped GPT-6 Astra (3 September 2026), GPT-6 Sol and GPT-6 Luna (22 September) and GPT-6.1 Sol (29 September). Benchmark claims must name the variant: ARC-AGI-2 95.0% is GPT-6 Astra; GPT-6 Sol scores 89.6% and Luna 59.3%. There is no \"GPT-6.1 Astra\": its October release was cancelled, reported (CNBC, WSJ, AP, 28 Sep).",
        uk: "OpenAI випустила GPT-6 Astra (3 вересня 2026), GPT-6 Sol і GPT-6 Luna (22 вересня) та GPT-6.1 Sol (29 вересня). У заявах про бенчмарки треба називати варіант: 95,0 % на ARC-AGI-2 — це GPT-6 Astra; GPT-6 Sol має 89,6 %, Luna — 59,3 %. «GPT-6.1 Astra» не існує: її жовтневий реліз скасовано — за повідомленнями (CNBC, WSJ, AP, 28 вересня)."
      },
      sources: ["S-AUD-38", "S-AUD-12", "S-R3-156", "S-AUD-34"]
    },
    {
      id: "X05", ref: "X-R6-17",
      claim: {en: "\"GPT-5.6 Sol has a 270-hour METR horizon.\"", uk: "«GPT-5.6 Sol має горизонт METR у 270 годин»."},
      reality: {
        en: "That figure counts detected cheating as success. Under METR's standard method it is ~11.3 h (95% CI 5–40 h), and METR said none of the numbers is a robust measurement.",
        uk: "Ця цифра рахує виявлене шахрайство як успіх. За стандартним методом METR горизонт — ~11,3 год (95 % ДІ 5–40 год), і METR зазначила, що жодне з цих чисел не є надійним вимірюванням."
      },
      sources: ["S-R7b-95"]
    },
    {
      id: "X06", ref: "X-R6-22",
      claim: {en: "\"SWE-bench Verified is the standard frontier coding benchmark (2026)\" or \"OpenAI retired it\".", uk: "«SWE-bench Verified — стандартний бенчмарк програмування для передових моделей (2026)» або «OpenAI його закрила»."},
      reality: {
        en: "On 23 February 2026 OpenAI announced it would stop reporting it, citing flawed tests and contamination, and recommended SWE-bench Pro. The benchmark was not withdrawn by its maintainers: say \"OpenAI stopped reporting it\", not \"retired\". Anthropic and Google launch pages from mid-2026 omit it too.",
        uk: "23 лютого 2026 OpenAI оголосила, що припиняє звітувати за ним через хибні тести й забруднення даних, і порадила SWE-bench Pro. Самі автори бенчмарк не відкликали: кажіть «OpenAI припинила звітувати», а не «закрили». Сторінки релізів Anthropic і Google із середини 2026 року його теж не наводять."
      },
      sources: ["S-R6-111", "S-R6-20"]
    },
    {
      id: "X07", ref: "X-R6-24",
      claim: {en: "\"Model X beat the human baseline on SWE-bench / HLE / FrontierMath.\"", uk: "«Модель X перевершила людський орієнтир на SWE-bench / HLE / FrontierMath»."},
      reality: {
        en: "These three have no human baseline. Any \"% of human\" framing comes from a re-scaling (AI Index) and should not be read as a measured human score.",
        uk: "У цих трьох бенчмарків немає людського орієнтира. Будь-яке «% від людини» походить із перемасштабування (AI Index), і його не слід читати як виміряний людський результат."
      },
      sources: ["S-R6-23"]
    },
    {
      id: "X08", ref: "X-R6-11",
      claim: {en: "\"$581.7B of private AI investment in 2025.\"", uk: "«581,7 млрд $ приватних інвестицій у ШІ у 2025 році»."},
      reality: {
        en: "That is total corporate investment including M&A ($214.4B), minority stakes and public offerings. Private investment was $344.7B (AI Index 2026).",
        uk: "Це сукупні корпоративні інвестиції разом зі злиттями й поглинаннями (214,4 млрд $), міноритарними частками та публічними розміщеннями. Приватні інвестиції становили 344,7 млрд $ (AI Index 2026)."
      },
      sources: ["S-R6-92"]
    },
    {
      id: "X09", ref: "X-R6-20",
      claim: {en: "\"Pew: AI chatbot use jumped from 34% to 44% in a year.\"", uk: "«Pew: користування ШІ-чат-ботами стрибнуло з 34 % до 44 % за рік»."},
      reality: {
        en: "Pew changed the question in 2026 (asked everyone, with a list of chatbots), so the series has a break.",
        uk: "У 2026 році Pew змінив запитання (ставив його всім, зі списком чат-ботів), тож у серії є розрив."
      },
      sources: ["S-R6-79"]
    },
    {
      id: "X10", ref: "X-R6-09",
      claim: {en: "\"o3 solves 25% of FrontierMath.\"", uk: "«o3 розв'язує 25 % FrontierMath»."},
      reality: {
        en: "OpenAI's December 2024 internal claim for a pre-release, high-compute configuration. Epoch's independent evaluation of the released o3 found ~10% (April 2025). OpenAI funded FrontierMath and has access to most problems.",
        uk: "Це внутрішня заява OpenAI від грудня 2024 про передрелізну конфігурацію з великими обчисленнями. Незалежна оцінка Epoch для випущеної o3 дала ~10 % (квітень 2025). OpenAI фінансувала FrontierMath і має доступ до більшості задач."
      },
      sources: ["S-R7b-20", "S-R7b-18"]
    },
    {
      id: "X11", ref: "X-R7b-07",
      claim: {en: "\"Both AI IMO golds were certified.\"", uk: "«Обидва ШІ-«золота» на IMO були сертифіковані»."},
      reality: {
        en: "Only Google DeepMind's Gemini Deep Think result was graded and certified by IMO coordinators. OpenAI's was self-graded and announced before the IMO's own process concluded.",
        uk: "Лише результат Gemini Deep Think від Google DeepMind оцінили й сертифікували координатори IMO. Результат OpenAI оцінювала сама компанія, і його оголосили до завершення процедури IMO."
      },
      sources: ["S-R7b-44", "S-R7b-34"]
    },
    {
      id: "X12", ref: "X-R7b-05",
      claim: {en: "\"OpenAI invented Deep Research.\"", uk: "«OpenAI винайшла Deep Research»."},
      reality: {
        en: "Google launched Gemini Deep Research on 11 December 2024, seven weeks before OpenAI's product of the same name (2 February 2025).",
        uk: "Google запустила Gemini Deep Research 11 грудня 2024 — за сім тижнів до однойменного продукту OpenAI (2 лютого 2025)."
      },
      sources: ["S-R7b-32", "S-R7b-31"]
    },
    {
      id: "X13", ref: "X-R7b-17",
      claim: {en: "\"Gemini 3.5 Pro\", \"Qwen 4\", \"DeepSeek R2\", \"Grok 5\", \"Llama 5\".", uk: "«Gemini 3.5 Pro», «Qwen 4», «DeepSeek R2», «Grok 5», «Llama 5»."},
      reality: {
        en: "Not released as of 9 October 2026. Gemini 3.5 Pro was announced at I/O (19 May 2026) as \"coming next month\" but never appeared; Qwen 4 is \"in training\"; Meta's successor line to Llama 4 is Muse. Actual lines: Gemini 3.1 Pro → 3.5 Flash → 3.8 Flash → Gemini 4 Argon; Qwen3.5 → 3.6 → 3.8; DeepSeek V3.2 → V4 → V4.1-Flash; Grok 4.x up to 4.7.",
        uk: "Станом на 9 жовтня 2026 не випущені. Gemini 3.5 Pro анонсували на I/O (19 травня 2026) як «наступного місяця», але вона так і не з'явилася; Qwen 4 — «у навчанні»; наступниця Llama 4 у Meta — лінійка Muse. Реальні лінійки: Gemini 3.1 Pro → 3.5 Flash → 3.8 Flash → Gemini 4 Argon; Qwen3.5 → 3.6 → 3.8; DeepSeek V3.2 → V4 → V4.1-Flash; Grok 4.x до 4.7."
      },
      sources: ["S-R4b-44", "S-R7b-109", "S-R7b-107", "S-AUD-39"]
    },
    {
      id: "X14", ref: "X-R7b-10",
      claim: {en: "\"The Hugging Face hack was the first autonomous cyberattack, launched by an AI.\"", uk: "«Злам Hugging Face був першою автономною кібератакою, яку запустив ШІ»."},
      reality: {
        en: "OpenAI called it \"an unprecedented cyber incident\"; \"possibly the first of its kind\" came from Hugging Face's CEO. The attackers were OpenAI models under evaluation, chiefly an unreleased research model, trying to cheat an internal benchmark scorer, not agents deployed to attack anyone. An earlier, human-directed campaign that automated 80–90% of its steps with Claude Code was reported by Anthropic in November 2025.",
        uk: "OpenAI назвала це «безпрецедентним кіберінцидентом»; слова «можливо, перший такого роду» належать гендиректору Hugging Face. Атакували моделі OpenAI на етапі оцінювання, головно невипущена дослідницька модель, що намагалися обдурити внутрішню систему оцінювання бенчмарка, а не агенти, яких хтось спрямував на атаку. Про ранішу кампанію під керівництвом людей, де 80–90 % кроків автоматизував Claude Code, Anthropic повідомила в листопаді 2025."
      },
      sources: ["S-AUD-28", "S-R7b-83", "S-R7b-59"]
    },
    {
      id: "X15", ref: "X-R7b-21",
      claim: {en: "\"The US government declared superintelligence.\"", uk: "«Уряд США проголосив суперінтелект»."},
      reality: {
        en: "EO 14434 (29 September 2026) only changes terminology, directing agencies to write \"Super Intelligence\" instead of \"Artificial Intelligence\". It makes no technical determination.",
        uk: "EO 14434 (29 вересня 2026) лише змінює термінологію: відомствам наказано писати «Super Intelligence» замість «Artificial Intelligence». Жодного технічного висновку указ не містить."
      },
      sources: ["S-AUD-03"]
    },
    {
      id: "X16", ref: "X-R3-21",
      claim: {en: "\"OpenAI's revenue is ~$70B\" (September 2026).", uk: "«Виручка OpenAI — близько 70 млрд $» (вересень 2026)."},
      reality: {
        en: "That run rate included gross revenue from partners. OpenAI told investors it was at about $50B annualised at the end of September 2026 (investor presentation, press-reported); CNBC reported the gap on 8 October 2026 and AI stocks fell. Run rate is not booked revenue: calendar 2025 revenue was $13.07B.",
        uk: "Той показник включав валову виручку партнерів. Інвесторам OpenAI повідомила про ≈50 млрд $ у річному темпі на кінець вересня 2026 (презентація для інвесторів, за повідомленнями преси); CNBC написала про розбіжність 8 жовтня 2026, і акції ШІ-компаній упали. Run-rate — не зароблена виручка: календарна виручка за 2025 рік становила 13,07 млрд $."
      },
      sources: ["S-R3-137", "S-R3-138", "S-R3-134"]
    }
  ];

  Object.assign(window.AIH, {series: S, facts: facts, state2026: state2026, openQuestions: openQuestions, corrections: corrections});

  /* ───────────────────────── Part 5 · sources ─────────────────────────
     Generated mechanically from the dataset's "- [S-…]" source lines (URLs copied exactly): 286 entries,
     every id cited in this file. Merged into window.AIH.sources alongside the other data files. */

  window.AIH.sources = Object.assign(window.AIH.sources || {}, {
    "S-AUD-01": {title: "EU Digital Omnibus on AI Enters Into Force", org: "Hunton Andrews Kurth", year: "2026", url: "https://www.hunton.com/privacy-and-cybersecurity-law-blog/eu-digital-omnibus-on-ai-enters-into-force", type: "secondary (law-firm summary of the OJ text)"},
    "S-AUD-02": {title: "AI Omnibus: provisional agreement changes EU AI Act delayed deadlines", org: "Addleshaw Goddard", year: "2026", url: "https://www.addleshawgoddard.com/en/insights/insights-briefings/2026/technology/ai-omnibus-provisional-agreement-changes-eu-ai-act-delayed-deadlines/", type: "secondary"},
    "S-AUD-03": {title: "Inaugurating the Era of Super Intelligence", org: "Federal Register", year: "2026", url: "https://www.govinfo.gov/content/pkg/FR-2026-10-02/html/2026-20321.htm", type: "primary"},
    "S-AUD-04": {title: "Securing the United States Bulk-Power System", org: "Federal Register", year: "2026", url: "https://www.federalregister.gov/documents/2026/09/09/2026-18370/securing-the-united-states-bulk-power-system", type: "primary"},
    "S-AUD-05": {title: "Promoting Advanced Artificial Intelligence Innovation and Security", org: "Federal Register 91 FR 34565", year: "2026", url: "https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf", urls: ["https://www.govinfo.gov/content/pkg/FR-2026-06-05/pdf/2026-11415.pdf", "https://www.congress.gov/crs-product/IF13268"], type: "primary"},
    "S-AUD-10": {title: "METR (accessed 2026-10-09). Time Horizon 1.1 raw data", org: "METR", year: "2026", url: "https://metr.org/assets/benchmark_results_1_1.yaml", type: "primary"},
    "S-AUD-11": {title: "OpenAI's GPT-6 Astra on ARC-AGI-3", org: "ARC Prize Foundation", year: "2026", url: "https://arcprize.org/blog/astra", type: "primary (independent evaluator)"},
    "S-AUD-12": {title: "OpenAI GPT-6", org: "ARC Prize", year: "2026", url: "https://arcprize.org/results/openai-gpt-6", type: "primary"},
    "S-AUD-13": {title: "Anthropic Claude Fable 5", org: "ARC Prize", year: "2026", url: "https://arcprize.org/results/anthropic-claude-fable-5", type: "primary"},
    "S-AUD-14": {title: "OpenAI GPT-6.1 Sol", org: "ARC Prize", year: "2026", url: "https://arcprize.org/results/openai-gpt-6-1-sol", type: "primary"},
    "S-AUD-15": {title: "Epoch AI (accessed 2026-10-09). notable_ai_models.csv", org: "Epoch AI", year: "2026", url: "https://epoch.ai/data/notable_ai_models.csv", type: "secondary (curated estimates)"},
    "S-AUD-16": {title: "ILSVRC 2012", org: "ImageNet", year: "2012", url: "https://image-net.org/challenges/LSVRC/2012/index.php", type: "primary"},
    "S-AUD-17": {title: "Claude 3.7 Sonnet and Claude Code", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/claude-3-7-sonnet", type: "primary"},
    "S-AUD-18": {title: "Energy and AI — Executive summary", org: "IEA", year: "2025", url: "https://www.iea.org/reports/energy-and-ai/executive-summary", type: "primary"},
    "S-AUD-19": {title: "Key Questions on Energy and AI — Executive summary", org: "IEA", year: "2026", url: "https://www.iea.org/reports/key-questions-on-energy-and-ai/executive-summary", type: "primary"},
    "S-AUD-20": {title: "Alphabet Q2 Earnings Call Highlights", org: "Alphabet Q2 2026 earnings call", year: "2026", url: "https://www.investing.com/news/transcripts/earnings-call-transcript-alphabet-beats-q2-2026-estimates-shares-fall-on-capex-surge-93CH-4807140", type: "primary (CFO statement, transcript)"},
    "S-AUD-21": {title: "Amazon hikes 2026 capex to $220 billion due to higher memory costs", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/07/30/amazon-amzn-q2-earnings-report-2026.html", type: "secondary (press)"},
    "S-AUD-22": {title: "Microsoft holds the line on AI spending plans", org: "CFO Dive", year: "2026", url: "https://www.cfodive.com/news/microsoft-holds-line-ai-spending-plans/826648/", type: "secondary"},
    "S-AUD-23": {title: "NVIDIA Rubin Platform, Open Models, Autonomous Driving: NVIDIA Presents Blueprint for the Future at CES", org: "NVIDIA", year: "2026", url: "https://blogs.nvidia.com/blog/2026-ces-special-presentation", type: "primary"},
    "S-AUD-24": {title: "Gemini 4 Argon: Google is back as one of the top three labs", org: "Artificial Analysis", year: "2026", url: "https://artificialanalysis.ai/articles/gemini-4-argon-google-top-three-labs", type: "secondary (independent evaluation)"},
    "S-AUD-26": {title: "Pacing the Frontier", org: null, year: "2026", url: "https://pacingthefrontier.com/", type: "primary"},
    "S-AUD-28": {title: "Investigation of the OpenAI–Hugging Face incident", org: "METR", year: "2026", url: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/", type: "primary"},
    "S-AUD-29": {title: "AI Act: obligations in force and delays under omnibus 2026/1744", org: "ActuIA", year: "2026", url: "https://www.actuia.com/en/news/ai-act-obligations-in-force-and-delays-under-omnibus-2026-1744/", type: "secondary"},
    "S-AUD-30": {title: "NVIDIA Announces Financial Results for Second Quarter Fiscal 2027", org: "NVIDIA", year: "2026", url: "https://nvidianews.nvidia.com/news/nvidia-announces-financial-results-for-second-quarter-fiscal-2027", type: "primary"},
    "S-AUD-31": {title: "Judge rules the Pentagon's supply chain risk label for Anthropic unlawful", org: "CNN", year: "2026", url: "https://www.cnn.com/2026/08/27/tech/anthropic-pentagon-supply-chain-risk-unlawful-hnk", type: "secondary (press)"},
    "S-AUD-32": {title: "U.S. appeals court upholds Pentagon designation of Anthropic as supply chain risk", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/09/25/pentagon-anthropic-ai-risk-appeals-court.html", urls: ["https://www.cnbc.com/2026/09/25/pentagon-anthropic-ai-risk-appeals-court.html", "https://www.courthousenews.com/dc-circuit-finds-pentagon-justified-in-labeling-anthropic-supply-chain-risk/"], type: "secondary (press)"},
    "S-AUD-33": {title: "Pentagon stops using Anthropic AI tools months after blacklisting company", org: "BBC report of 5 Oct 2026, as carried by The Star", year: "2026", url: "https://www.the-star.co.ke/news/world/2026-10-05-pentagon-stops-using-anthropic-ai-tools", type: "secondary (press)"},
    "S-AUD-34": {title: "OpenAI abandons plan to release upcoming model as safety concerns escalate", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/09/28/openai-abandons-plan-to-release-upcoming-model-as-safety-concerns-escalate.html", urls: ["https://www.cnbc.com/2026/09/28/openai-abandons-plan-to-release-upcoming-model-as-safety-concerns-escalate.html", "https://www.cnn.com/2026/09/28/business/openai-chatgpt-safety-concerns"], type: "secondary (press)"},
    "S-AUD-35": {title: "How we will do better for Australia", org: "OpenAI", year: "2026", url: "https://openai.com/index/how-we-will-do-better-for-australia/", urls: ["https://openai.com/index/how-we-will-do-better-for-australia/", "https://www.abc.net.au/news/2026-09-29/openai-apologises-medicare-shelves-chatgpt-astra-launch/107207156"], type: "primary + press"},
    "S-AUD-36": {title: "DOD poised to move all classified AI workloads off Anthropic by October", org: "DefenseScoop", year: "2026", url: "https://defensescoop.com/2026/09/11/dod-poised-to-move-all-classified-ai-workloads-off-anthropic-by-october/", type: "secondary (press)"},
    "S-AUD-37": {title: "Released September 1, 2026", org: "Anthropic", year: "2026", url: "https://platform.claude.com/docs/en/about-claude/models/overview", type: "primary"},
    "S-AUD-38": {title: "GPT-6 and Intelligent UI for everyone", org: "OpenAI", year: "2026", url: "https://developers.openai.com/api/docs/changelog", urls: ["https://developers.openai.com/api/docs/changelog", "https://openai.com/index/gpt-6-for-everyone/"], type: "primary"},
    "S-AUD-39": {title: "Introducing Muse Spark 1.3", org: "Meta", year: "2026", url: "https://research.meta.ai/blog/introducing-muse-spark-1-3", urls: ["https://research.meta.ai/blog/introducing-muse-spark-1-3", "https://dev.meta.ai/models/muse-spark"], type: "primary"},
    "S-R1-24": {title: "Perceptrons: An Introduction to Computational Geometry", org: "Minsky, M. & Papert, S. — MIT Press", year: "1969", url: null, type: "primary"},
    "S-R1-25": {title: "Perceptrons (book)", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/Perceptrons_(book)", type: "secondary"},
    "S-R1-38": {title: "Who Invented Backpropagation?", org: "Schmidhuber, J", year: null, url: "https://people.idsia.ch/~juergen/who-invented-backpropagation.html", type: "secondary (an advocate in the credit debate)"},
    "S-R1-39": {title: "Taylor expansion of the accumulated rounding error", org: "Linnainmaa, S", year: "1976", url: "https://doi.org/10.1007/BF01931367", type: "primary"},
    "S-R2-18": {title: "Neural Machine Translation by Jointly Learning to Align and Translate", org: "Bahdanau, D., Cho, K., Bengio, Y", year: "2014", url: "https://arxiv.org/abs/1409.0473", type: "primary"},
    "S-R3-12": {title: "Introducing ChatGPT and Whisper APIs", org: "OpenAI", year: "2023", url: "https://openai.com/index/introducing-chatgpt-and-whisper-apis/", type: "primary"},
    "S-R3-13": {title: "GPT-4", org: "OpenAI", year: "2023", url: "https://openai.com/index/gpt-4-research/", type: "primary"},
    "S-R3-16": {title: "New models and developer products announced at DevDay", org: "OpenAI", year: "2023", url: "https://openai.com/index/new-models-and-developer-products-announced-at-devday/", type: "primary"},
    "S-R3-18": {title: "Hello GPT-4o", org: "OpenAI", year: "2024", url: "https://openai.com/index/hello-gpt-4o/", type: "primary"},
    "S-R3-22": {title: "OpenAI o1 and new tools for developers", org: "OpenAI", year: "2024", url: "https://openai.com/index/o1-and-new-tools-for-developers/", type: "primary"},
    "S-R3-26": {title: "Introducing GPT-4.1 in the API", org: "OpenAI", year: "2025", url: "https://openai.com/index/gpt-4-1/", type: "primary"},
    "S-R3-29": {title: "OpenAI launches a pair of AI reasoning models, o3 and o4-mini", org: "TechCrunch", year: "2025", url: "https://techcrunch.com/2025/04/16/openai-launches-a-pair-of-ai-reasoning-models-o3-and-o4-mini/", type: "secondary"},
    "S-R3-30": {title: "API Changelog", org: "OpenAI", year: "2026", url: "https://developers.openai.com/api/docs/changelog", type: "primary"},
    "S-R3-31": {title: "Models", org: "OpenAI", year: "2026", url: "https://developers.openai.com/api/docs/models", type: "primary"},
    "S-R3-35": {title: "Introducing GPT-5 for developers", org: "OpenAI", year: "2025", url: "https://openai.com/index/introducing-gpt-5-for-developers/", type: "primary"},
    "S-R3-37": {title: "Introducing GPT-5.2", org: "OpenAI", year: "2025", url: "https://openai.com/index/introducing-gpt-5-2/", type: "primary"},
    "S-R3-42": {title: "Introducing GPT-5.4", org: "OpenAI", year: "2026", url: "https://openai.com/index/introducing-gpt-5-4/", type: "primary"},
    "S-R3-44": {title: "Introducing GPT-5.5", org: "OpenAI", year: "2026", url: "https://openai.com/index/introducing-gpt-5-5/", type: "primary"},
    "S-R3-48": {title: "GPT-5.6: Frontier intelligence that scales with your ambition", org: "OpenAI", year: "2026", url: "https://openai.com/index/gpt-5-6/", type: "primary"},
    "S-R3-51": {title: "GPT-6 Astra: A new generation of intelligence", org: "OpenAI", year: "2026", url: "https://openai.com/index/gpt-6-astra/", type: "primary"},
    "S-R3-55": {title: "Introducing GPT-6.1 Sol", org: "OpenAI", year: "2026", url: "https://openai.com/index/introducing-gpt-6-1-sol/", type: "primary"},
    "S-R3-56": {title: "DevDay 2026 Recap", org: "OpenAI", year: "2026", url: "https://openai.com/index/devday-2026-recap/", type: "primary"},
    "S-R3-58": {title: "Frontier AI models", org: "Epoch AI", year: "2026", url: "https://epoch.ai/data/frontier_ai_models.csv", type: "secondary"},
    "S-R3-59": {title: "GPT-6 and Intelligent UI for everyone", org: "OpenAI", year: "2026", url: "https://openai.com/index/gpt-6-for-everyone/", type: "primary"},
    "S-R3-69": {title: "GPT-4", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/GPT-4", type: "secondary"},
    "S-R3-110": {title: "Introducing apps in ChatGPT and the new Apps SDK", org: "OpenAI", year: "2025", url: "https://openai.com/index/introducing-apps-in-chatgpt/", type: "primary"},
    "S-R3-114": {title: "A milestone in expanding access to AI", org: "OpenAI", year: "2026", url: "https://openai.com/index/expanding-access-to-ai-with-chatgpt-ads/", type: "primary"},
    "S-R3-118": {title: "ChatGPT reaches 100 million users two months after launch", org: "The Guardian", year: "2023", url: "https://www.theguardian.com/technology/2023/feb/02/chatgpt-100-million-users-open-ai-fastest-growing-app", type: "secondary"},
    "S-R3-119": {title: "New funding to scale the benefits of AI", org: "OpenAI", year: "2024", url: "https://openai.com/index/scale-the-benefits-of-ai/", type: "primary"},
    "S-R3-120": {title: "OpenAI tops 400 million users despite DeepSeek's emergence", org: "CNBC", year: "2025", url: "https://www.cnbc.com/2025/02/20/openai-tops-400-million-users-despite-deepseeks-emergence.html", type: "secondary (quotes COO Brad Lightcap)"},
    "S-R3-121": {title: "New funding to build towards AGI", org: "OpenAI", year: "2025", url: "https://openai.com/index/march-funding-updates/", type: "primary"},
    "S-R3-122": {title: "OpenAI tops 3 million paying business users, launches new features for workplace", org: "CNBC", year: "2025", url: "https://www.cnbc.com/2025/06/04/openai-chatgpt-enterprise-ai.html", type: "secondary (OpenAI-reported figure)"},
    "S-R3-123": {title: "OpenAI's ChatGPT to hit 700 million weekly users, up 4x from last year", org: "CNBC", year: "2025", url: "https://www.cnbc.com/2025/08/04/openai-chatgpt-700-million-users.html", type: "secondary (OpenAI-reported)"},
    "S-R3-124": {title: "1 million business customers putting AI to work", org: "OpenAI", year: "2025", url: "https://openai.com/index/1-million-businesses-putting-ai-to-work/", type: "primary"},
    "S-R3-125": {title: "Scaling AI for everyone", org: "OpenAI", year: "2026", url: "https://openai.com/index/scaling-ai-for-everyone/", type: "primary"},
    "S-R3-126": {title: "Accelerating the next phase of AI", org: "OpenAI", year: "2026", url: "https://openai.com/index/accelerating-the-next-phase-ai/", type: "primary"},
    "S-R3-127": {title: "A business that scales with the value of intelligence", org: "OpenAI", year: "2026", url: "https://openai.com/index/a-business-that-scales-with-the-value-of-intelligence/", type: "primary"},
    "S-R3-128": {title: "OpenAI sees roughly $5 billion loss this year on $3.7 billion in revenue", org: "CNBC", year: "2024", url: "https://www.cnbc.com/2024/09/27/openai-sees-5-billion-loss-this-year-on-3point7-billion-in-revenue.html", type: "secondary (first reported by The New York Times)"},
    "S-R3-129": {title: "OpenAI Passes $1 Billion Revenue Pace as Big Companies Boost AI Spending", org: "The Information", year: "2023", url: "https://www.theinformation.com/articles/openai-passes-1-billion-revenue-pace-as-big-companies-boost-ai-spending", type: "secondary"},
    "S-R3-130": {title: "OpenAI's Annualized Revenue Tops $1.6 Billion as Customers Shrug Off CEO Drama", org: "The Information", year: "2023", url: "https://www.theinformation.com/articles/openais-annualized-revenue-tops-1-6-billion-as-customers-shrug-off-ceo-drama", type: "secondary"},
    "S-R3-131": {title: "OpenAI's Annualized Revenue Doubles to $3.4 Billion Since Late 2023", org: "The Information", year: "2024", url: "https://www.theinformation.com/articles/openais-annualized-revenue-doubles-to-3-4-billion-since-late-2023", type: "secondary"},
    "S-R3-132": {title: "OpenAI hits $10 billion in annual recurring revenue fueled by ChatGPT growth", org: "CNBC", year: "2025", url: "https://www.cnbc.com/2025/06/09/openai-hits-10-billion-in-annualized-revenue-fueled-by-chatgpt-growth.html", type: "secondary (OpenAI spokesperson)"},
    "S-R3-133": {title: "Sam Altman says OpenAI has $20B ARR and about $1.4 trillion in data center commitments", org: "TechCrunch", year: "2025", url: "https://techcrunch.com/2025/11/06/sam-altman-says-openai-has-20b-arr-and-about-1-4-trillion-in-data-center-commitments/", type: "secondary (quotes Altman's X post)"},
    "S-R3-134": {title: "OpenAI's leaked financials reveal soaring losses as it prepares to go public", org: "Quartz", year: "2026", url: "https://qz.com/openai-leaked-financials-losses-revenue-ipo-061626", type: "secondary (audited documents obtained by Ed Zitron and verified by the Financial Times)"},
    "S-R3-135": {title: "OpenAI annualized revenue tops $40 billion ahead of IPO", org: "Quartz", year: "2026", url: "https://qz.com/openai-annualized-revenue-40-billion-ipo-081426", type: "secondary (citing Bloomberg)"},
    "S-R3-136": {title: "OpenAI 'will be a public company in 2027' or sooner, CFO Friar tells employees", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/08/19/open-ai-ipo-timing-2027-friar.html", type: "secondary"},
    "S-R3-137": {title: "Scoop: OpenAI's annual recurring revenue nears $70B", org: "Axios", year: "2026", url: "https://www.axios.com/2026/09/29/scoop-openais-annual-recurring-revenue-nears-70b", type: "secondary (anonymous sources)"},
    "S-R3-138": {title: "Nvidia, Oracle, CoreWeave and other AI stocks sink on OpenAI revenue report", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/10/08/open-ai-revenue-nvidia-oracle-coreweave.html", type: "secondary"},
    "S-R3-139": {title: "OpenAI's ad business shows blistering growth, hits $1 billion annualized revenue run rate", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/08/31/open-ai-chatgpt-ads-revenue.html", type: "secondary"},
    "S-R3-156": {title: "OpenAI Cancels Release of GPT-6.1 Astra Because It 'Regressed' on Safety", org: "Gizmodo", year: "2026", url: "https://gizmodo.com/openai-cancels-release-of-gpt-6-1-astra-because-it-regressed-on-safety-2000818566", type: "secondary"},
    "S-R3-157": {title: "OpenAI's ChatGPT now has 100 million weekly active users", org: "TechCrunch", year: "2023", url: "https://techcrunch.com/2023/11/06/openais-chatgpt-now-has-100-million-weekly-active-users/", type: "secondary (quotes Altman at DevDay)"},
    "S-R3-158": {title: "OpenAI says ChatGPT usage has doubled since last year", org: "Axios", year: "2024", url: "https://www.axios.com/2024/08/29/openai-chatgpt-200-million-weekly-active-users", type: "secondary (OpenAI-reported)"},
    "S-R4a-04": {title: "Claude Fable 5.1", org: "Anthropic", year: "2026", url: "https://platform.claude.com/docs/en/models/fable-5-1/overview", type: "primary"},
    "S-R4a-21": {title: "Introducing the next generation of Claude", org: "Anthropic", year: "2024", url: "https://www.anthropic.com/news/claude-3-family", type: "primary"},
    "S-R4a-25": {title: "Introducing computer use, a new Claude 3.5 Sonnet, and Claude 3.5 Haiku", org: "Anthropic", year: "2024", url: "https://www.anthropic.com/news/3-5-models-and-computer-use", type: "primary"},
    "S-R4a-27": {title: "Claude 3.7 Sonnet and Claude Code", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/claude-3-7-sonnet", type: "primary"},
    "S-R4a-28": {title: "Introducing Claude 4", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/claude-4", type: "primary"},
    "S-R4a-30": {title: "Claude Opus 4.1", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/claude-opus-4-1", type: "primary"},
    "S-R4a-31": {title: "Introducing Claude Sonnet 4.5", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/claude-sonnet-4-5", type: "primary"},
    "S-R4a-33": {title: "Introducing Claude Opus 4.5", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/claude-opus-4-5", type: "primary"},
    "S-R4a-34": {title: "Introducing Claude Opus 4.6", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/claude-opus-4-6", type: "primary"},
    "S-R4a-36": {title: "Project Glasswing", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/glasswing", type: "primary"},
    "S-R4a-37": {title: "Introducing Claude Opus 4.7", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/claude-opus-4-7", type: "primary"},
    "S-R4a-45": {title: "Introducing Claude Opus 5.5", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/claude-opus-5-5", type: "primary"},
    "S-R4a-60": {title: "Anthropic raises Series E at $61.5B post-money valuation", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/anthropic-raises-series-e-at-usd61-5b-post-money-valuation", type: "primary"},
    "S-R4a-61": {title: "Anthropic raises Series F at $183B post-money valuation", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/anthropic-raises-series-f-at-usd183b-post-money-valuation", type: "primary"},
    "S-R4a-62": {title: "Anthropic expands global leadership in enterprise AI, naming Chris Ciauri as Managing Director of International", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/anthropic-expands-global-leadership-in-enterprise-ai-naming-chris-ciauri-as-managing-director-of", type: "primary"},
    "S-R4a-63": {title: "A statement from Dario Amodei on Anthropic's commitment to American AI leadership", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/statement-dario-amodei-american-ai-leadership", type: "primary"},
    "S-R4a-64": {title: "Anthropic acquires Bun as Claude Code reaches $1B milestone", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/anthropic-acquires-bun-as-claude-code-reaches-usd1b-milestone", type: "primary"},
    "S-R4a-65": {title: "Anthropic raises $30 billion in Series G funding at $380 billion post-money valuation", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation", type: "primary"},
    "S-R4a-66": {title: "Google and Broadcom partnership for compute", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/google-broadcom-partnership-compute", type: "primary"},
    "S-R4a-67": {title: "Series H", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/series-h", type: "primary"},
    "S-R4a-68": {title: "Anthropic confidentially submits draft S-1", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/confidential-draft-s1-sec", type: "primary"},
    "S-R4a-73": {title: "Anthropic says it hit a $30 billion revenue run rate after 'crazy' 80x growth", org: "Nuñez, M", year: "2026", url: "https://venturebeat.com/technology/anthropic-says-it-hit-a-30-billion-revenue-run-rate-after-crazy-80x-growth", type: "secondary"},
    "S-R4a-74": {title: "Anthropic revenue run rate tops $65 billion, source says", org: "Reuters via Yahoo Finance", year: "2026", url: "https://finance.yahoo.com/technology/ai/articles/anthropic-revenue-run-rate-tops-213602454.html", urls: ["https://finance.yahoo.com/technology/ai/articles/anthropic-revenue-run-rate-tops-213602454.html", "https://www.cnbc.com/2026/08/17/anthropic-says-annualized-revenue-climbed-to-65-billion-in-july.html"], type: "secondary"},
    "S-R4b-23": {title: "Google I/O 2025 keynote", org: "Pichai, S", year: "2025", url: "https://blog.google/technology/ai/io-2025-keynote/", type: "primary"},
    "S-R4b-42": {title: "Gemini 4 Argon: our next era of frontier intelligence", org: "Kavukcuoglu, K", year: "2026", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/", type: "primary"},
    "S-R4b-44": {title: "Gemini models", org: "Google AI for Developers", year: "2026", url: "https://ai.google.dev/gemini-api/docs/models", type: "primary"},
    "S-R4b-83": {title: "Q3 2024 earnings call: CEO's remarks", org: "Pichai, S", year: "2024", url: "https://blog.google/inside-google/message-ceo/alphabet-earnings-q3-2024/", type: "primary"},
    "S-R4b-84": {title: "Q1 2025 earnings call: CEO's remarks", org: "Pichai, S", year: "2025", url: "https://blog.google/inside-google/message-ceo/alphabet-earnings-q1-2025/", type: "primary"},
    "S-R4b-85": {title: "Q2 2025 earnings call: CEO's remarks", org: "Pichai, S", year: "2025", url: "https://blog.google/inside-google/message-ceo/alphabet-earnings-q2-2025/", type: "primary"},
    "S-R4b-86": {title: "Q3 2025 earnings call: CEO's remarks", org: "Pichai, S", year: "2025", url: "https://blog.google/inside-google/message-ceo/alphabet-earnings-q3-2025/", type: "primary"},
    "S-R4b-87": {title: "Alphabet earnings, Q4 2025: CEO's remarks", org: "Pichai, S", year: "2026", url: "https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q4-2025/", type: "primary"},
    "S-R4b-88": {title: "Alphabet earnings call, Q1 2026: Sundar Pichai's remarks", org: "Pichai, S", year: "2026", url: "https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q1-2026/", type: "primary"},
    "S-R4b-89": {title: "Google I/O 2026: Sundar Pichai's opening keynote", org: "Pichai, S", year: "2026", url: "https://blog.google/innovation-and-ai/sundar-pichai-io-2026/", type: "primary"},
    "S-R4b-90": {title: "Alphabet earnings call Q2 2026: Sundar Pichai remarks", org: "Pichai, S", year: "2026", url: "https://blog.google/company-news/inside-google/message-ceo/alphabet-earnings-q2-2026/", type: "primary"},
    "S-R4b-91": {title: "Google's Gemini app hits 1 billion monthly active users", org: "Google", year: "2026", url: "https://blog.google/innovation-and-ai/products/gemini-app/one-billion-monthly-users/", type: "primary"},
    "S-R4b-92": {title: "Google's Gemini app has surpassed 750M monthly active users", org: "TechCrunch", year: "2026", url: "https://techcrunch.com/2026/02/04/googles-gemini-app-has-surpassed-750m-monthly-active-users/", type: "secondary"},
    "S-R4b-93": {title: "100 things we announced at Google I/O 2026", org: "Google", year: "2026", url: "https://blog.google/innovation-and-ai/technology/ai/google-io-2026-all-our-announcements/", type: "primary"},
    "S-R5-05": {title: "Llama 2 Community License Agreement", org: "Meta", year: "2023", url: "https://github.com/meta-llama/llama/blob/main/LICENSE", type: "primary"},
    "S-R6-01": {title: "Data on Notable AI Models", org: "Epoch AI", year: "2026", url: "https://epoch.ai/data/ai-models", type: "secondary (curated dataset with per-model primary links)"},
    "S-R6-02": {title: "Compute Trends Across Three Eras of Machine Learning", org: "Sevilla, J., Heim, L., Ho, A., Besiroglu, T., Hobbhahn, M., Villalobos, P", year: "2022", url: "https://arxiv.org/abs/2202.05924", type: "primary"},
    "S-R6-03": {title: "Training compute of frontier AI models grows by 4-5x per year", org: "Sevilla, J., Roldán, E", year: "2024", url: "https://epoch.ai/publications/training-compute-of-frontier-ai-models-grows-by-4-5x-per-year", type: "primary (analysis)"},
    "S-R6-04": {title: "Trends in AI", org: "Epoch AI", year: "2026", url: "https://epoch.ai/trends", type: "primary (analysis)"},
    "S-R6-05": {title: "Over 30 AI models have been trained at the scale of GPT-4", org: "Epoch AI", year: "2025", url: "https://epoch.ai/data-insights/models-over-1e25-flop", type: "primary (analysis)"},
    "S-R6-06": {title: "OpenAI announces rollout of GPT-6 Astra model", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/09/03/open-ai-astra-gpt-6-cyber.html", type: "secondary"},
    "S-R6-07": {title: "Language Models are Few-Shot Learners", org: "Brown, T. et al", year: "2020", url: "https://arxiv.org/abs/2005.14165", type: "primary"},
    "S-R6-09": {title: "The Llama 4 herd", org: "Meta AI", year: "2025", url: "https://ai.meta.com/blog/llama-4-multimodal-intelligence/", type: "primary"},
    "S-R6-10": {title: "Kimi-K3", org: "Moonshot AI", year: "2026", url: "https://huggingface.co/moonshotai/Kimi-K3", type: "primary"},
    "S-R6-11": {title: "DeepSeek-V4-Pro", org: "DeepSeek-AI", year: "2026", url: "https://huggingface.co/deepseek-ai/DeepSeek-V4-Pro", type: "primary"},
    "S-R6-12": {title: "Qwen3.8-2.4T-A95B", org: "Qwen Team, Alibaba", year: "2026", url: "https://huggingface.co/Qwen/Qwen3.8-2.4T-A95B", type: "primary"},
    "S-R6-13": {title: "Outrageously Large Neural Networks: The Sparsely-Gated Mixture-of-Experts Layer", org: "Shazeer, N. et al", year: "2017", url: "https://arxiv.org/abs/1701.06538", type: "primary"},
    "S-R6-14": {title: "GShard", org: "Lepikhin, D. et al", year: "2020", url: "https://arxiv.org/abs/2006.16668", type: "primary"},
    "S-R6-15": {title: "GLaM: Efficient Scaling of Language Models with Mixture-of-Experts", org: "Du, N. et al", year: "2021", url: "https://arxiv.org/abs/2112.06905", type: "primary"},
    "S-R6-16": {title: "ImageNet / ILSVRC (2010–2017). Official results pages", org: "ImageNet / ILSVRC", year: "2010", url: "https://image-net.org/challenges/LSVRC/2012/results.html", type: "primary"},
    "S-R6-17": {title: "What I learned from competing against a ConvNet on ImageNet", org: "Karpathy, A", year: "2014", url: "https://karpathy.github.io/2014/09/02/what-i-learned-from-competing-against-a-convnet-on-imagenet/", type: "primary"},
    "S-R6-18": {title: "Delving Deep into Rectifiers: Surpassing Human-Level Performance on ImageNet Classification", org: "He, K., Zhang, X., Ren, S., Sun, J", year: "2015", url: "https://arxiv.org/abs/1502.01852", type: "primary"},
    "S-R6-20": {title: "Capabilities & benchmarking hub, benchmark_data.zip (retrieved 2026-10-09)", org: "Epoch AI", year: "2026", url: "https://epoch.ai/benchmarks", type: "primary for Epoch-run evaluations; secondary for compiled external results (ARC Prize, Scale)"},
    "S-R6-21": {title: "Measuring Massive Multitask Language Understanding", org: "Hendrycks, D. et al", year: "2020", url: "https://arxiv.org/abs/2009.03300", type: "primary"},
    "S-R6-22": {title: "GPQA: A Graduate-Level Google-Proof Q&A Benchmark", org: "Rein, D. et al", year: "2023", url: "https://arxiv.org/abs/2311.12022", type: "primary"},
    "S-R6-23": {title: "Artificial Intelligence Index Report 2026", org: "Stanford HAI", year: "2026", url: "https://hai.stanford.edu/assets/files/ai_index_report_2026.pdf", urls: ["https://hai.stanford.edu/assets/files/ai_index_report_2026.pdf", "https://hai.stanford.edu/ai-index/2026-ai-index-report"], type: "secondary (synthesis)"},
    "S-R6-24": {title: "Artificial Intelligence Index Report 2025", org: "Stanford HAI", year: "2025", url: "https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf", type: "secondary"},
    "S-R6-25": {title: "Introducing SWE-bench Verified", org: "OpenAI", year: "2024", url: "https://openai.com/index/introducing-swe-bench-verified/", type: "primary"},
    "S-R6-26": {title: "ARC Prize blog posts and results, 2024–2026 (o3 breakthrough, o1 results, 2024 winners, Analyzing o3, 2025 results and later)", org: "ARC Prize Foundation", year: "2024", url: "https://arcprize.org/blog/oai-o3-pub-breakthrough", urls: ["https://arcprize.org/blog/oai-o3-pub-breakthrough", "https://arcprize.org/blog/openai-o1-results-arc-prize", "https://arcprize.org/blog/arc-prize-2024-winners-technical-report", "https://arcprize.org/blog/analyzing-o3-with-arc-agi", "https://arcprize.org/blog/arc-prize-2025-results-analysis", "https://arcprize.org/results", "https://poetiq.ai/posts/arcagi_verified/"], type: "primary"},
    "S-R6-27": {title: "Announcing ARC-AGI-2 and ARC Prize 2025", org: "ARC Prize Foundation", year: "2025", url: "https://arcprize.org/blog/announcing-arc-agi-2-and-arc-prize-2025", type: "primary"},
    "S-R6-28": {title: "Humanity's Last Exam", org: "Phan, L. et al", year: "2025", url: "https://arxiv.org/abs/2501.14249", urls: ["https://arxiv.org/abs/2501.14249", "https://lastexam.ai/"], type: "primary"},
    "S-R6-29": {title: "Claude Opus 5.5", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/claude-opus-5-5", urls: ["https://www.anthropic.com/news/claude-opus-5-5", "https://agi.safe.ai/blog/hle-diamond", "https://www.futurehouse.org/research-announcements/hle-exam"], type: "primary (vendor self-report / benchmark authors / third-party audit)"},
    "S-R6-31": {title: "FrontierMath", org: "Glazer, E. et al", year: "2024", url: "https://epoch.ai/blog/openai-and-frontiermath", urls: ["https://epoch.ai/blog/openai-and-frontiermath", "https://epoch.ai/benchmarks/frontiermath-tier-4", "https://techcrunch.com/2025/04/20/openais-o3-ai-model-scores-lower-on-a-benchmark-than-the-company-initially-implied/"], type: "primary/secondary"},
    "S-R6-32": {title: "Dynabench: Rethinking Benchmarking in NLP", org: "Kiela, D. et al", year: "2021", url: "https://arxiv.org/abs/2104.14337", type: "primary"},
    "S-R6-33": {title: "Multi-column Deep Neural Networks for Image Classification", org: "Cireşan, D., Meier, U., Schmidhuber, J", year: "2012", url: "https://arxiv.org/abs/1202.2745", type: "primary"},
    "S-R6-34": {title: "Achieving Human Parity in Conversational Speech Recognition", org: "Xiong, W. et al", year: "2016", url: "https://arxiv.org/abs/1610.05256", type: "primary"},
    "S-R6-35": {title: "SQuAD leaderboards (v1.1 and v2.0)", org: "Rajpurkar, P. et al.", year: null, url: "https://rajpurkar.github.io/SQuAD-explorer/", type: "primary"},
    "S-R6-36": {title: "SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems", org: "Wang, A. et al", year: "2019", url: "https://arxiv.org/abs/1905.00537", type: "primary"},
    "S-R6-37": {title: "Microsoft DeBERTa surpasses human performance on the SuperGLUE benchmark", org: "Microsoft Research", year: "2021", url: "https://www.microsoft.com/en-us/research/blog/microsoft-deberta-surpasses-human-performance-on-the-superglue-benchmark/", type: "primary"},
    "S-R6-38": {title: "The brief history of artificial intelligence", org: "Roser, M", year: "2022", url: "https://ourworldindata.org/brief-history-of-ai", type: "secondary"},
    "S-R6-39": {title: "LLM inference prices have fallen rapidly but unequally across tasks", org: "Cottier, B., Snodin, B., Owen, D., Adamczewski, T", year: "2025", url: "https://epoch.ai/data-insights/llm-inference-price-trends", type: "primary (analysis)"},
    "S-R6-40": {title: "OpenAI (2026). API model pages and pricing (retrieved 2026-10-09)", org: "OpenAI", year: "2026", url: "https://developers.openai.com/api/docs/pricing", urls: ["https://developers.openai.com/api/docs/pricing", "https://developers.openai.com/api/docs/models/{gpt-4"], type: "primary"},
    "S-R6-41": {title: "Introducing the next generation of Claude", org: "Anthropic", year: "2024", url: "https://www.anthropic.com/news/claude-3-family", urls: ["https://www.anthropic.com/news/claude-3-family", "https://www.anthropic.com/news/claude-opus-4-5", "https://platform.claude.com/docs/en/models/overview"], type: "primary"},
    "S-R6-42": {title: "DeepSeek-R1 Release", org: "DeepSeek", year: "2025", url: "https://api-docs.deepseek.com/news/news250120", type: "primary"},
    "S-R6-43": {title: "Gemini Developer API pricing", org: "Google", year: "2026", url: "https://ai.google.dev/gemini-api/docs/pricing", type: "primary"},
    "S-R6-44": {title: "Improving Language Understanding by Generative Pre-Training", org: "Radford, A. et al", year: "2018", url: "https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf", urls: ["https://cdn.openai.com/research-covers/language-unsupervised/language_understanding_paper.pdf", "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf"], type: "primary"},
    "S-R6-45": {title: "Introducing 100K Context Windows", org: "Anthropic", year: "2023", url: "https://www.anthropic.com/news/100k-context-windows", urls: ["https://www.anthropic.com/news/100k-context-windows", "https://www.anthropic.com/news/claude-2-1"], type: "primary"},
    "S-R6-47": {title: "Our next-generation model: Gemini 1.5", org: "Google", year: "2024", url: "https://blog.google/technology/ai/google-gemini-next-generation-model-february-2024/", type: "primary"},
    "S-R6-48": {title: "Gemini 1.5 Pro 2M context window, code execution capabilities, and Gemma 2 are available today", org: "Google for Developers", year: "2024", url: "https://developers.googleblog.com/en/new-features-for-the-gemini-api-and-google-ai-studio/", type: "primary"},
    "S-R6-50": {title: "Measuring AI Ability to Complete Long Tasks", org: "Kwa, T. et al", year: "2025", url: "https://arxiv.org/abs/2503.14499", type: "primary"},
    "S-R6-51": {title: "Task-Completion Time Horizons of Frontier AI Models", org: "METR", year: "2026", url: "https://metr.org/time-horizons/", urls: ["https://metr.org/time-horizons/", "https://metr.org/assets/benchmark_results_1_1.yaml"], type: "primary"},
    "S-R6-52": {title: "Time Horizon 1.1", org: "METR", year: "2026", url: "https://metr.org/blog/2026-1-29-time-horizon-1-1/", type: "primary"},
    "S-R6-53": {title: "Summary of METR's pre-deployment evaluation of GPT-5.6 Sol", org: "METR", year: "2026", url: "https://metr.org/blog/2026-06-26-gpt-5-6-sol/", urls: ["https://metr.org/blog/2026-06-26-gpt-5-6-sol/", "https://metr.org/blog/2026-09-22-claude-opus-5-5/"], type: "primary"},
    "S-R6-55": {title: "NVIDIA product pages and datasheets (retrieved 2026-10)", org: "NVIDIA", year: "2026", url: "https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-datasheet.pdf", urls: ["https://images.nvidia.com/content/tesla/pdf/nvidia-tesla-p100-datasheet.pdf", "https://images.nvidia.com/content/technologies/volta/pdf/volta-v100-datasheet-update-us-1165301-r5.pdf", "https://www.nvidia.com/en-us/data-center/a100/", "https://www.nvidia.com/en-us/data-center/h100/", "https://www.nvidia.com/en-us/data-center/h200/", "https://www.nvidia.com/en-us/data-center/hgx/", "https://www.nvidia.com/en-us/data-center/gb200-nvl72/", "https://www.nvidia.com/en-us/data-center/gb300-nvl72/", "https://www.nvidia.com/en-us/data-center/vera-rubin-nvl72/", "https://developer.nvidia.com/blog/inside-the-nvidia-rubin-platform-six-new-chips-one-ai-supercomputer/"], type: "primary"},
    "S-R6-56": {title: "Machine Learning Hardware", org: "Epoch AI", year: "2026", url: "https://epoch.ai/data/machine-learning-hardware", urls: ["https://epoch.ai/data/machine-learning-hardware", "https://docs.cloud.google.com/tpu/docs/v4"], type: "secondary / primary"},
    "S-R6-57": {title: "ImageNet Classification with Deep Convolutional Neural Networks", org: "Krizhevsky, A., Sutskever, I., Hinton, G", year: "2012", url: "https://papers.nips.cc/paper_files/paper/2012/file/c399862d3b9d6b76c8436e924a68c45b-Paper.pdf", type: "primary"},
    "S-R6-58": {title: "GPU clusters and frontier data centres data; Trends in AI supercomputers; largest data-centre compute; AI supercomputers power trend", org: "Epoch AI", year: "2026", url: "https://epoch.ai/data/gpu-clusters", urls: ["https://epoch.ai/data/gpu-clusters", "https://epoch.ai/data/data-centers", "https://epoch.ai/publications/trends-in-ai-supercomputers", "https://epoch.ai/data-insights/largest-data-center-compute", "https://epoch.ai/data-insights/ai-supercomputers-power-trend"], type: "secondary (curated estimates)"},
    "S-R6-59": {title: "Building Meta's GenAI Infrastructure", org: "Meta Engineering", year: "2024", url: "https://engineering.fb.com/2024/03/12/data-center-engineering/building-metas-genai-infrastructure/", type: "primary"},
    "S-R6-60": {title: "Microsoft announces new supercomputer, lays out vision for future AI work", org: "Microsoft", year: "2020", url: "https://news.microsoft.com/source/features/ai/openai-azure-supercomputer/", type: "primary"},
    "S-R6-61": {title: "Introducing the AI Research SuperCluster", org: "Meta AI", year: "2022", url: "https://ai.meta.com/blog/ai-rsc/", type: "primary"},
    "S-R6-62": {title: "AWS activates Project Rainier", org: "Amazon", year: "2025", url: "https://www.aboutamazon.com/news/aws/aws-project-rainier-ai-trainium-chips-compute-cluster", type: "primary"},
    "S-R6-64": {title: "Data insights: chip performance per dollar, AI chip production, power usage trend; Can AI scaling continue through 2030?", org: "Epoch AI", year: "2026", url: "https://epoch.ai/data-insights/chip-performance-per-dollar", urls: ["https://epoch.ai/data-insights/chip-performance-per-dollar", "https://epoch.ai/data-insights/ai-chip-production", "https://epoch.ai/data-insights/power-usage-trend", "https://epoch.ai/blog/can-ai-scaling-continue-through-2030"], type: "primary (analysis)"},
    "S-R6-66": {title: "ChatGPT sets record for fastest-growing user base - analyst note", org: "Reuters", year: "2023", url: "https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/", urls: ["https://www.reuters.com/technology/chatgpt-sets-record-fastest-growing-user-base-analyst-note-2023-02-01/", "https://twitter.com/sama/status/1599668808285028353"], type: "secondary / primary"},
    "S-R6-67": {title: "OpenAI's ChatGPT now has 100 million weekly active users", org: "TechCrunch", year: "2023", url: "https://techcrunch.com/2023/11/06/openais-chatgpt-now-has-100-million-weekly-active-users/", type: "secondary"},
    "S-R6-75": {title: "Building Abundant Intelligence", org: "Engadget", year: "2026", url: "https://www.engadget.com/2271985/openai-dev-day-live-blog-chatgpt-news/", urls: ["https://www.engadget.com/2271985/openai-dev-day-live-blog-chatgpt-news/", "https://openai.com/index/building-abundant-intelligence/"], type: "secondary / primary"},
    "S-R6-76": {title: "Meta's Threads App Reaches 100 Million Users Days After Launch", org: "Bloomberg", year: "2023", url: "https://www.bloomberg.com/news/articles/2023-07-10/meta-s-threads-app-reaches-100-million-users-days-after-launch", type: "secondary"},
    "S-R6-77": {title: "Most Americans haven't used ChatGPT", org: "Pew Research Center", year: "2023", url: "https://www.pewresearch.org/short-reads/2023/08/28/most-americans-havent-used-chatgpt-few-think-it-will-have-a-major-impact-on-their-job/", type: "primary"},
    "S-R6-78": {title: "34% of U.S. adults have used ChatGPT, about double the share in 2023", org: "Pew Research Center", year: "2025", url: "https://www.pewresearch.org/short-reads/2025/06/25/34-of-us-adults-have-used-chatgpt-about-double-the-share-in-2023/", type: "primary"},
    "S-R6-79": {title: "Americans and AI 2026", org: "Pew Research Center", year: "2026", url: "https://www.pewresearch.org/internet/2026/06/17/americans-and-ai-2026-chatbots-smart-devices-and-views-on-impact/", type: "primary"},
    "S-R6-80": {title: "The Rapid Adoption of Generative AI", org: "Bick, A., Blandin, A., Deming, D", year: "2024", url: "https://www.stlouisfed.org/on-the-economy/2024/sep/rapid-adoption-generative-ai", type: "primary"},
    "S-R6-81": {title: "Bick, Blandin, Deming & McKittrick (2026). Generative AI Adoption Tracker", org: "Bick, Blandin, Deming & McKittrick", year: "2026", url: "https://www.genaiadoptiontracker.com", type: "primary"},
    "S-R6-86": {title: "Meta (2024-09-25). Connect 2024 AI news", org: "Meta", year: "2024", url: "https://about.fb.com/news/2024/09/metas-ai-product-news-connect/", type: "primary"},
    "S-R6-87": {title: "Meta AI now has 1B monthly active users", org: "TechCrunch", year: "2025", url: "https://techcrunch.com/2025/05/29/meta-ai-now-has-1b-monthly-active-users/", type: "secondary"},
    "S-R6-90": {title: "Stanford HAI (2024). AI Index 2024, Chapter 4 (Economy)", org: "Stanford HAI", year: "2024", url: "https://hai.stanford.edu/assets/files/hai_ai-index-report-2024_chapter4.pdf", type: "secondary"},
    "S-R6-91": {title: "Stanford HAI (2025). AI Index 2025, Chapter 4", org: "Stanford HAI", year: "2025", url: "https://hai.stanford.edu/assets/files/hai_ai-index-report-2025_chapter4_final.pdf", type: "secondary"},
    "S-R6-92": {title: "Stanford HAI (2026). AI Index 2026, Chapter 4 (Economy), Fig. 4.2.1–4.2.3", org: "Stanford HAI", year: "2026", url: "https://hai.stanford.edu/assets/files/ai_index_report_2026_chapter_4_economy.pdf", type: "secondary (Quid data)"},
    "S-R6-93": {title: "10-K/10-Q capital expenditure (PaymentsToAcquirePropertyPlantAndEquipment) via SEC XBRL", org: "Alphabet Inc.", year: null, url: "https://data.sec.gov/api/xbrl/companyconcept/CIK0001652044/us-gaap/PaymentsToAcquirePropertyPlantAndEquipment.json", type: "primary"},
    "S-R6-94": {title: "Capital expenditure (PaymentsToAcquireProductiveAssets) via SEC XBRL", org: "Amazon.com Inc.", year: null, url: "https://data.sec.gov/api/xbrl/companyconcept/CIK0001018724/us-gaap/PaymentsToAcquireProductiveAssets.json", type: "primary"},
    "S-R6-95": {title: "Meta Platforms (2026-01-28). Q4 and full-year 2025 results", org: "Meta Platforms", year: "2026", url: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Fourth-Quarter-and-Full-Year-2025-Results/default.aspx", type: "primary"},
    "S-R6-96": {title: "Capital expenditure (PaymentsToAcquirePropertyPlantAndEquipment) via SEC XBRL", org: "Microsoft Corp.", year: null, url: "https://data.sec.gov/api/xbrl/companyconcept/CIK0000789019/us-gaap/PaymentsToAcquirePropertyPlantAndEquipment.json", type: "primary"},
    "S-R6-97": {title: "Alphabet (2026-02-04). Q4 2025 CEO remarks", org: "Alphabet", year: "2026", url: "https://blog.google/inside-google/message-ceo/alphabet-earnings-q4-2025/", type: "primary"},
    "S-R6-98": {title: "Amazon (2026-02-05). Q4 2025 earnings call transcript (Motley Fool)", org: "Amazon", year: "2026", url: "https://www.fool.com/earnings/call-transcripts/2026/02/05/amazon-amzn-q4-2025-earnings-call-transcript/", type: "secondary transcript"},
    "S-R6-99": {title: "Meta Platforms (2026-07-29). Q2 2026 results", org: "Meta Platforms", year: "2026", url: "https://investor.atmeta.com/investor-news/press-release-details/2026/Meta-Reports-Second-Quarter-2026-Results/default.aspx", type: "primary"},
    "S-R6-100": {title: "Microsoft (2026-04-29 and 2026-07-29). FY26 Q3/Q4 earnings calls", org: "Microsoft", year: "2026", url: "https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q3", urls: ["https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q3", "https://www.microsoft.com/en-us/investor/events/fy-2026/earnings-fy-2026-q4"], type: "primary"},
    "S-R6-101": {title: "Energy and AI", org: "IEA", year: "2025", url: "https://www.iea.org/reports/energy-and-ai/energy-demand-from-ai", type: "primary"},
    "S-R6-102": {title: "DOE Releases New Report Evaluating Increase in Electricity Demand from Data Centers", org: "US DOE / LBNL", year: "2024", url: "https://www.energy.gov/articles/doe-releases-new-report-evaluating-increase-electricity-demand-data-centers", type: "primary"},
    "S-R6-103": {title: "Algorithmic progress in computer vision", org: "Erdil, E., Besiroglu, T", year: "2022", url: "https://arxiv.org/abs/2212.05153", type: "primary"},
    "S-R6-104": {title: "Algorithmic progress in language models", org: "Ho, A. et al", year: "2024", url: "https://epoch.ai/publications/algorithmic-progress-in-language-models", type: "primary"},
    "S-R6-110": {title: "DeepMind / Google papers with MMLU results: Gopher (arXiv:2112.11446), Chinchilla (arXiv:2203.15556), PaLM (arXiv:2204.02311), Flan (arXiv:2210.11416)", org: "Rae et al.; Hoffmann et al.; Chowdhery et al.; Chung et al.", year: "2021", url: null, type: "primary"},
    "S-R6-111": {title: "OpenAI model announcements and reports (self-reported benchmark figures and launch facts)", org: "OpenAI", year: "2023", url: "https://openai.com/index/introducing-chatgpt-and-whisper-apis/", urls: ["https://openai.com/index/introducing-chatgpt-and-whisper-apis/", "https://openai.com/index/gpt-4-research/", "https://openai.com/index/hello-gpt-4o/", "https://openai.com/index/learning-to-reason-with-llms/", "https://github.com/openai/simple-evals", "https://openai.com/index/introducing-gpt-5/", "https://openai.com/index/gpt-5-1-codex-max/", "https://openai.com/index/introducing-gpt-5-4/", "https://openai.com/index/gpt-5-6/", "https://openai.com/index/gpt-6-astra/", "https://openai.com/index/why-we-no-longer-evaluate-swe-bench-verified/"], type: "primary (self-reported)"},
    "S-R6-112": {title: "Anthropic model announcements, Claude 3 family onward (self-reported; score tables read from images)", org: "Anthropic", year: "2024", url: "https://www.anthropic.com/news/claude-3-family", urls: ["https://www.anthropic.com/news/claude-3-family", "https://www.anthropic.com/news/claude-3-5-sonnet", "https://www.anthropic.com/news/3-5-models-and-computer-use", "https://www.anthropic.com/research/swe-bench-sonnet", "https://www.anthropic.com/news/claude-3-7-sonnet", "https://www.anthropic.com/news/claude-4", "https://www.anthropic.com/news/claude-sonnet-4-5", "https://www.anthropic.com/news/claude-opus-4-5", "https://www.anthropic.com/glasswing", "https://www.anthropic.com/news/claude-opus-4-7"], type: "primary"},
    "S-R6-113": {title: "Google Gemini announcements, Gemini 1.0 onward", org: "Google", year: "2023", url: "https://blog.google/technology/ai/google-gemini-ai/", urls: ["https://blog.google/technology/ai/google-gemini-ai/", "https://blog.google/technology/google-deepmind/gemini-model-thinking-updates-march-2025/", "https://blog.google/products/gemini/gemini-3/", "https://deepmind.google/models/model-cards/gemini-3-1-pro"], type: "primary (self-reported)"},
    "S-R6-115": {title: "Are We Done with MMLU?", org: "Gema, A. P. et al", year: "2024", url: "https://arxiv.org/abs/2406.04127", type: "primary"},
    "S-R6-116": {title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?", org: "Jimenez, C. E. et al", year: "2023", url: "https://arxiv.org/abs/2310.06770", type: "primary"},
    "S-R6-117": {title: "Official leaderboard data", org: "SWE-bench team", year: null, url: "https://www.swebench.com/", urls: ["https://www.swebench.com/", "https://raw.githubusercontent.com/SWE-bench/swe-bench.github.io/master/data/leaderboards.json"], type: "primary"},
    "S-R6-118": {title: "OpenAI o3", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/OpenAI_o3", type: "secondary (cross-check only)"},
    "S-R7b-16": {title: "OpenAI o3 Breakthrough High Score on ARC-AGI-Pub", org: "ARC Prize Foundation", year: "2024", url: "https://arcprize.org/blog/oai-o3-pub-breakthrough", type: "primary"},
    "S-R7b-17": {title: "Analyzing o3 and o4-mini with ARC-AGI", org: "ARC Prize Foundation", year: "2025", url: "https://arcprize.org/blog/analyzing-o3-with-arc-agi", type: "primary"},
    "S-R7b-18": {title: "Clarifying the creation and use of the FrontierMath benchmark", org: "Besiroglu, T., Sevilla, J. — Epoch AI", year: "2025", url: "https://epoch.ai/latest/openai-and-frontiermath", type: "primary"},
    "S-R7b-20": {title: "OpenAI's o3 AI model scores lower on a benchmark than the company initially implied", org: "TechCrunch", year: "2025", url: "https://techcrunch.com/2025/04/20/openais-o3-ai-model-scores-lower-on-a-benchmark-than-the-company-initially-implied/", type: "secondary"},
    "S-R7b-23": {title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", org: "DeepSeek-AI", year: "2025", url: "https://arxiv.org/abs/2501.12948", type: "primary"},
    "S-R7b-24": {title: "DeepSeek-V3 Technical Report", org: "DeepSeek-AI", year: "2024", url: "https://arxiv.org/abs/2412.19437", type: "primary"},
    "S-R7b-25": {title: "Secrets of DeepSeek AI model revealed in landmark paper", org: "Nature News", year: "2025", url: "https://www.nature.com/articles/d41586-025-03015-6", type: "secondary + primary"},
    "S-R7b-31": {title: "ChatGPT Deep Research", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/ChatGPT_Deep_Research", type: "secondary"},
    "S-R7b-32": {title: "Gemini (language model)", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/Gemini_(language_model)", type: "secondary"},
    "S-R7b-34": {title: "2025 in artificial intelligence", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/2025_in_artificial_intelligence", type: "secondary"},
    "S-R7b-36": {title: "Time horizons", org: "METR", year: "2026", url: "https://metr.org/time-horizons/", urls: ["https://metr.org/time-horizons/", "https://metr.org/blog/2026-1-29-time-horizon-1-1/"], type: "primary"},
    "S-R7b-39": {title: "OpenAI Codex", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/OpenAI_Codex", type: "secondary"},
    "S-R7b-42": {title: "Agentic Misalignment: How LLMs could be insider threats", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/research/agentic-misalignment", type: "primary"},
    "S-R7b-43": {title: "Anthropic raises $30 billion in Series G funding at $380 billion post-money valuation", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/anthropic-raises-30-billion-series-g-funding-380-billion-post-money-valuation", type: "primary"},
    "S-R7b-44": {title: "Advanced version of Gemini with Deep Think officially achieves gold-medal standard at the International Mathematical Olympiad", org: "Google DeepMind", year: "2025", url: "https://deepmind.google/discover/blog/advanced-version-of-gemini-with-deep-think-officially-achieves-gold-medal-standard-at-the-international-mathematical-olympiad/", type: "primary"},
    "S-R7b-47": {title: "The General-Purpose AI Code of Practice", org: "European Commission", year: "2026", url: "https://digital-strategy.ec.europa.eu/en/policies/contents-code-gpai", type: "primary"},
    "S-R7b-49": {title: "GPT-5 System Card", org: "OpenAI", year: "2025", url: "https://cdn.openai.com/gpt-5-system-card.pdf", type: "primary"},
    "S-R7b-53": {title: "Anthropic pays authors $1.5 billion to settle copyright infringement lawsuit", org: "NPR", year: "2025", url: "https://www.npr.org/2025/09/05/nx-s1-5529404/anthropic-settlement-authors-copyright-ai", type: "secondary"},
    "S-R7b-54": {title: "OpenAI and NVIDIA Announce Strategic Partnership to Deploy 10 Gigawatts of NVIDIA Systems", org: "NVIDIA", year: "2025", url: "https://nvidianews.nvidia.com/news/openai-and-nvidia-announce-strategic-partnership-to-deploy-10gw-of-nvidia-systems", type: "primary"},
    "S-R7b-55": {title: "AMD and OpenAI Announce Strategic Partnership to Deploy 6 Gigawatts of AMD GPUs", org: "AMD", year: "2025", url: "https://www.amd.com/en/newsroom/press-releases/2025-10-6-amd-and-openai-announce-strategic-partnership-to-d.html", type: "primary"},
    "S-R7b-59": {title: "Disrupting the first reported AI-orchestrated cyber espionage campaign", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/news/disrupting-AI-espionage", type: "primary"},
    "S-R7b-62": {title: "Introducing Muse: The World's First Personal AI Agent Built for Everyone", org: "Meta", year: "2026", url: "https://about.fb.com/news/2026/09/introducing-muse-personal-ai-agent/", type: "primary"},
    "S-R7b-69": {title: "Project Glasswing", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/glasswing", type: "primary"},
    "S-R7b-71": {title: "Expanding Project Glasswing", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/expanding-project-glasswing", type: "primary"},
    "S-R7b-73": {title: "Remarks on the disproof of the unit distance conjecture", org: "Alon, N., Bloom, T. F., Gowers, W. T., Litt, D., Sawin, W., Shankar, A., Tsimerman, J., Wang, V., Wood, M. M", year: "2026", url: "https://arxiv.org/abs/2605.20695", type: "primary"},
    "S-R7b-76": {title: "On the Navier–Stokes Millennium Prize Problem", org: "OpenAI", year: "2026", url: "https://openai.com/index/navier-stokes-solution", type: "primary (feed description) + secondary"},
    "S-R7b-77": {title: "A Severe Misalignment of AI in Mathematics", org: "Fields Medallists and co-signers", year: "2026", url: "https://mathandai.org/", type: "primary"},
    "S-R7b-80": {title: "Statement on the US government directive to suspend access to Fable 5 and Mythos 5", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/fable-mythos-access", type: "primary"},
    "S-R7b-81": {title: "Redeploying Fable 5", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/redeploying-fable-5", type: "primary"},
    "S-R7b-82": {title: "Anthropic says Trump admin has lifted export controls on Claude Fable 5 and Mythos 5", org: "CNBC", year: "2026", url: "https://www.cnbc.com/2026/06/30/anthropic-says-trump-admin-has-lifted-export-controls-on-claude-fable-5-and-mythos-5.html", type: "secondary"},
    "S-R7b-83": {title: "Security incident, July 2026", org: "Hugging Face", year: "2026", url: "https://huggingface.co/blog/security-incident-july-2026", type: "primary"},
    "S-R7b-85": {title: "Investigation of the OpenAI–Hugging Face incident", org: "METR", year: "2026", url: "https://metr.org/blog/2026-08-26-openai-hugging-face-incident-investigation/", type: "primary"},
    "S-R7b-86": {title: "OpenAI rogue agent breach of Medicare", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/OpenAI_rogue_agent_breach_of_Medicare", type: "secondary"},
    "S-R7b-88": {title: "Pacing the Frontier", org: "Pacing the Frontier", year: "2026", url: "https://pacingthefrontier.com/", type: "primary"},
    "S-R7b-89": {title: "GPT-6 Astra: A new generation of intelligence", org: "OpenAI", year: "2026", url: "https://developers.openai.com/api/docs/models", type: "primary"},
    "S-R7b-90": {title: "OpenAI hails 'new era of artificial general intelligence' with Astra model release", org: "Booth, R. — The Guardian", year: "2026", url: "https://www.theguardian.com/technology/2026/sep/03/openai-artificial-general-intelligence-astra-release", type: "secondary"},
    "S-R7b-91": {title: "GPT-6 Astra on ARC-AGI-3", org: "ARC Prize Foundation", year: "2026", url: "https://arcprize.org/blog/astra", type: "primary"},
    "S-R7b-92": {title: "GPT-6", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/GPT-6", type: "secondary"},
    "S-R7b-93": {title: "OpenAI news feed: Introducing GPT-6 Sol and Luna; Introducing GPT-6.1 Sol; DevDay 2026 Recap; Rapidly scaling online storage to serve over 1 billion ChatGPT users; GPT-6 and Intelligent UI for everyone", org: "OpenAI", year: "2026", url: "https://openai.com/news/rss.xml", type: "primary (feed)"},
    "S-R7b-94": {title: "Claude Opus 5.5", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/claude-opus-5-5", type: "primary"},
    "S-R7b-95": {title: "Summary of METR's predeployment evaluation of GPT-5.6 Sol", org: "METR", year: "2026", url: "https://metr.org/blog/2026-06-26-gpt-5-6-sol/", type: "primary"},
    "S-R7b-96": {title: "Claude Opus 5.5 AI R&D assessment", org: "METR", year: "2026", url: "https://metr.org/blog/2026-09-22-claude-opus-5-5/", type: "primary"},
    "S-R7b-97": {title: "Measuring the Impact of Early-2025 AI on Experienced Open-Source Developer Productivity", org: "METR", year: "2025", url: "https://metr.org/blog/2026-02-24-uplift-update/", type: "primary"},
    "S-R7b-98": {title: "Data insights: LLM inference price trends, frontier data center power, AI chip production, ECI frontier trend, math preprints disclosing AI use, near-daily AI use doubled, cyber incidents flat since Fable 5", org: "Epoch AI", year: "2025", url: "https://epoch.ai/data-insights", type: "secondary (independent research)"},
    "S-R7b-99": {title: "AI Benchmarking Hub", org: "Epoch AI", year: "2026", url: "https://epoch.ai/benchmarks", type: "secondary (independent evaluations)"},
    "S-R7b-100": {title: "ARC-AGI leaderboard", org: "ARC Prize Foundation", year: "2026", url: "https://arcprize.org/leaderboard", type: "primary"},
    "S-R7b-101": {title: "Terminal-Bench 4.0 leaderboard", org: "Terminal-Bench", year: "2026", url: "https://www.tbench.ai/leaderboard", type: "primary"},
    "S-R7b-102": {title: "OSWorld 2.0", org: "XLANG Lab", year: "2026", url: "https://osworld-v2.xlang.ai/", type: "primary"},
    "S-R7b-103": {title: "Humanity's Last Exam — HLE-Diamond", org: "CAIS / Scale AI", year: "2026", url: "https://lastexam.ai/blog/hle-diamond", type: "primary"},
    "S-R7b-104": {title: "AI dashboard — Remote Labor Index", org: "Center for AI Safety", year: "2026", url: "https://dashboard.safe.ai/", type: "primary"},
    "S-R7b-105": {title: "Gemini 4 Argon", org: "Google", year: "2026", url: "https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/", type: "primary"},
    "S-R7b-106": {title: "The Gemini app now has over 1 billion monthly users", org: "Google", year: "2026", url: "https://blog.google/innovation-and-ai/products/gemini-app/one-billion-monthly-users/", type: "primary"},
    "S-R7b-107": {title: "Models and pricing", org: "xAI / SpaceXAI", year: "2026", url: "https://docs.x.ai/docs/models", urls: ["https://docs.x.ai/docs/models", "https://x.ai/news/xai-joins-spacex"], type: "primary"},
    "S-R7b-109": {title: "DeepSeek V4 Preview", org: "DeepSeek", year: "2026", url: "https://api-docs.deepseek.com/news/news260424", type: "primary"},
    "S-R7b-110": {title: "Qwen3.8-2.4T-A95B", org: "Qwen Team", year: "2026", url: "https://huggingface.co/Qwen", type: "primary"},
    "S-R7b-111": {title: "Kimi K3", org: "Moonshot AI", year: "2026", url: "https://platform.kimi.ai/docs/pricing/chat", type: "primary"},
    "S-R7b-112": {title: "Pricing", org: "Z.ai", year: "2026", url: "https://docs.z.ai/guides/overview/pricing", type: "primary"},
    "S-R7b-113": {title: "GLM-5.3 and the spread of advanced cyber capabilities", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/research/glm-5-3-and-the-spread-of-advanced-cyber-capabilities", type: "primary"},
    "S-R7b-114": {title: "Mistral Large 4", org: "Mistral AI", year: "2026", url: "https://mistral.ai/news/mistral-large-4/", type: "primary"},
    "S-R7b-115": {title: "Anthropic (2026). Claude model pages and developer models overview (Fable/Mythos 5.1, Sonnet 5.5, Haiku 5.5)", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/claude-haiku-5-5", type: "primary"},
    "S-R7b-116": {title: "Four frontier launches in eight days", org: "Artificial Analysis", year: "2026", url: "https://artificialanalysis.ai/articles/four-frontier-launches-in-eight-days-six-labs-now-field-a-model-above-50-on-the-artificial-analysis-intelligence-index", type: "secondary (independent evaluation)"},
    "S-R7b-117": {title: "Energy and AI — Executive summary", org: "International Energy Agency", year: "2025", url: "https://www.iea.org/reports/energy-and-ai/executive-summary", type: "primary"},
    "S-R7b-118": {title: "Executive Orders 14365 (11 Dec 2025), 14409 (2 Jun 2026), 14421 (26 Aug 2026), 14434 (29 Sep 2026)", org: "Federal Register", year: "2025", url: "https://www.federalregister.gov/documents/2026/10/02/2026-20321/inaugurating-the-era-of-super-intelligence", type: "primary"},
    "S-R7b-119": {title: "Canaries in the Coal Mine? Six Facts about the Recent Employment Effects of Artificial Intelligence", org: "Brynjolfsson, E., Chandar, B., Chen, R. — Stanford Digital Economy Lab", year: "2025", url: "https://digitaleconomy.stanford.edu/publications/canaries-in-the-coal-mine/", type: "primary"},
    "S-R7b-120": {title: "Will we run out of data? Limits of LLM scaling based on human-generated data", org: "Villalobos, P. et al. — Epoch AI", year: "2024", url: "https://epoch.ai/blog/will-we-run-out-of-data-limits-of-llm-scaling-based-on-human-generated-data", type: "primary"},
    "S-R7b-121": {title: "Why Language Models Hallucinate", org: "Kalai, A. T., Nachum, O., Vempala, S. S., Zhang, E", year: "2025", url: "https://arxiv.org/abs/2509.04664", type: "primary"},
    "S-R7b-122": {title: "GPT-4.5", org: "Wikipedia", year: "2026", url: "https://en.wikipedia.org/wiki/GPT-4.5", type: "secondary"},
    "S-R7b-126": {title: "Reasoning models don't always say what they think", org: "Anthropic", year: "2025", url: "https://www.anthropic.com/research/reasoning-models-dont-say-think", type: "primary"},
    "S-R7b-131": {title: "Detecting and preventing distillation attacks", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/detecting-and-preventing-distillation-attacks", type: "primary"},
    "S-R7b-132": {title: "Scaling AI for everyone", org: "OpenAI", year: "2026", url: "https://openai.com/news/rss.xml", type: "primary (feed descriptions)"},
    "S-R7b-133": {title: "Anthropic raises $65B in Series H funding at $965B post-money valuation", org: "Anthropic", year: "2026", url: "https://www.anthropic.com/news/series-h", type: "primary"},
    "S-R7b-134": {title: "OpenAI launches GPT-6.1 Sol, says it nearly matches GPT-6 Astra and costs less", org: "Malik, A. — TechCrunch", year: "2026", url: "https://techcrunch.com/2026/09/29/openai-launches-gpt-6-1-sol-says-it-nearly-matches-gpt-6-astra-and-costs-less/", type: "secondary"}
  });
})();
