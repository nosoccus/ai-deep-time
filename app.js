/* ============================================================================
   AI Deep Time — app.js
   Part 1 (this half): UI strings (EN/UK), helpers, time scale, header,
           scrubber, hero stage, footer, public API (window.AIDT).
   Part 2 (a later chunk, appended after the EXTENSION POINT at the end):
           dashboard, charts, acceleration, state 2026, myths, sources.
   No fact lives in this file: every date, number and name comes from window.AIH.
   Plain ES5 on purpose (no modules), so it can be syntax-checked anywhere.
   ========================================================================== */
(function () {
'use strict';

var AIH = window.AIH = window.AIH || {};
var root = document.documentElement;

/* ============================================================================
   1. UI STRINGS  (AIH.ui[lang][key]; {name} placeholders are filled by t())
   Plural forms are "one|many" (en) and "one|few|many" (uk), split by t.plural().
   ========================================================================== */
var UI_STRINGS = {
  en: {
    'wordmark': 'AI Deep Time',
    'skip': 'Skip to content',
    'lang.label': 'Language',
    'lang.en': 'English',
    'lang.uk': 'Ukrainian',
    'help.btn': 'How to use',
    'help.title': 'How to use this page',
    'help.intro': 'Drag the playhead along the timeline, or use the keys below. Everything on the page follows the moment you choose.',
    'help.scale': 'The timeline uses a deep-time scale by default: the closer to now, the more room a year gets, like a geological chart. Switch to the calendar scale to see how little room the last decade really takes.',
    'help.drag': 'Drag anywhere on the track (mouse, touch or pen). The playhead snaps to the nearest milestone when you let go.',
    'keys.title': 'Keyboard',
    'keys.prevNext': 'Previous / next milestone',
    'keys.era': 'Previous / next era',
    'keys.homeEnd': 'First / last milestone',
    'keys.play': 'Play / pause',
    'keys.digits': 'Jump to eras 1 to 10',
    'keys.scale': 'Switch the time scale',
    'keys.help': 'Open this help',
    'keys.esc': 'Close a dialog',
    'keys.space': 'Space',
    'keys.or': 'or',
    'nav.timeline': 'Timeline',
    'nav.dash': 'Dashboard',
    'nav.accel': 'Acceleration',
    'nav.now': 'Now',
    'nav.myths': 'Myths',
    'nav.sources': 'Sources',
    'hero.eyebrow': '{span} · {title}',
    'hero.year': 'Year {y}',
    'hero.intro': 'Drag the timeline bar or press Play: everything on the page follows the moment you pick. A snapshot as of {date}.',
    'play': 'Play 80 years in 80 seconds',
    'play.short': 'Play',
    'play.suffix': '80 years in 80 seconds',
    'pause': 'Pause',
    'replay': 'Play again',
    'speed': 'Speed',
    'speed.1': '1×',
    'speed.2': '2×',
    'cta.now': 'Jump to today',
    'cta.accel': 'Feel the acceleration',
    'scale.label': 'Time scale',
    'scale.deep': 'Deep time',
    'scale.cal': 'Calendar',
    'scale.caption.cal': 'On a calendar, everything since {year} fits in this {pct}% sliver.',
    'scale.caption.deep': 'Deep time: the closer to now, the more room a year gets.',
    'scrub.label': 'Timeline from {from} to {to}',
    'scrub.valuetext': '{date}: {title}',
    'scrub.now': 'now',
    'hint.milestone': 'milestone',
    'hint.era': 'era',
    'hint.play': 'play',
    'hint.scale': 'scale',
    'hint.help': 'help',
    'era.label': 'Era {n} of {total}',
    'ms.what': 'What happened',
    'ms.why': 'Why it mattered',
    'ms.numbers': 'By the numbers',
    'ms.est': 'est.',
    'ms.confidence': 'Confidence: {level}',
    'ms.caveat': 'Caveat',
    'conf.high': 'high',
    'conf.medium': 'medium',
    'conf.low': 'low',
    'ms.sources': 'Sources ({n})',
    'ms.prev': 'Previous milestone',
    'ms.next': 'Next milestone',
    'ms.key': 'Key milestone',
    'ms.of': 'Milestone {i} of {n}',
    'ex.label': 'In the real world',
    'ex.memo': 'Did you know?',
    'kind.architecture': 'architecture',
    'kind.system': 'system',
    'kind.product': 'product',
    'kind.paper': 'paper',
    'kind.event': 'event',
    'kind.benchmark': 'benchmark',
    'kind.hardware': 'hardware',
    'kind.model': 'model',
    'kind.policy': 'policy',
    'kind.concept': 'concept',
    'kind.dataset': 'dataset',
    'kind.result': 'result',
    'kind.company': 'company',
    'kind.demo': 'demo',
    'kind.application': 'application',
    'kind.theory': 'theory',
    'kind.algorithm': 'algorithm',
    'kind.competition': 'competition',
    'kind.funding': 'funding',
    'kind.infrastructure': 'infrastructure',
    'kind.research': 'research',
    'kind.release': 'release',
    'kind.report': 'report',
    'kind.safety': 'safety',
    'kind.agent': 'agent',
    'kind.breakthrough': 'breakthrough',
    'kind.method': 'method',
    'kind.milestone': 'milestone',
    'src.title': 'Sources: {title}',
    'src.open': 'Open',
    'src.none': 'No sources are listed for this item.',
    'src.all': 'All sources',
    'src.count': 'source|sources',
    'src.group': 'Research pass {g}',
    'srcType.primary': 'primary',
    'srcType.secondary': 'secondary',
    'srcType.news': 'news',
    'srcType.report': 'report',
    'srcType.dataset': 'dataset',
    'srcType.paper': 'paper',
    'srcType.blog': 'blog',
    'srcType.docs': 'documentation',
    'srcType.book': 'book',
    'srcType.talk': 'talk',
    'srcType.other': 'other',
    'foot.verified': 'Snapshot as of {date}, not updated since',
    'foot.made': 'Made with AI: Anthropic’s Claude researched the sources, wrote the text and built the page from one research dataset and its dated updates, and AI fact-checked it against the cited sources: the original research on 9 October 2026, the latest update on {date}. No human expert has reviewed it, so it may contain errors. Every milestone, number and quote carries a source id; estimates are marked “est.” and anything still uncertain is labelled as such. Model line-ups, benchmarks and prices date quickly. Built with SVG, CSS and plain JavaScript, with no external libraries or images.',
    'foot.credits': 'Chart data from Epoch AI, METR, Artificial Analysis, the Stanford AI Index and Our World in Data, credited on each chart. Code under the MIT licence; original text and data under CC BY 4.0; quotations, names and trademarks belong to their owners. Not affiliated with any AI company.',
    'count.milestones': 'milestone|milestones',
    'count.models': 'model|models',
    'count.sources': 'source|sources',
    'count.years': 'year|years',
    'count.months': 'month|months',
    'count.weeks': 'week|weeks',
    'count.days': 'day|days',
    'loading.title': 'Loading the data',
    'loading.body': 'The timeline data has not loaded yet. Open the page from its own folder, with the data/ directory next to it, or reload.',
    'a11y.close': 'Close',
    'a11y.playhead': 'Playhead',
    'a11y.sections': 'Sections',
    /* ---- strings for part 2 (dashboard, charts, acceleration, now, myths, sources) ---- */
    'dash.eyebrow': 'Era dashboard',
    'dash.asof': 'models as of {date}, charts as of {charts}',
    'dash.title': '{title}: models, metrics and architecture',
    'models.title': 'Key models of this moment',
    'models.titleSys': 'Key systems of this era',
    'models.lineage': 'See full lineage',
    'models.filterAll': 'All providers',
    'models.empty': 'No frontier model had been released yet at this point of the era.',
    'models.emptySys': 'No key systems are listed for this era.',
    'models.model': 'Model',
    'models.provider': 'Provider',
    'models.released': 'Released',
    'models.type': 'Type',
    'models.params': 'Parameters',
    'models.context': 'Context',
    'models.modalities': 'Modalities',
    'models.price': 'Price per 1M tokens',
    'models.headline': 'Headline result',
    'models.frontier': 'frontier',
    'models.future': 'not yet released at this point',
    'models.undisclosed': 'undisclosed',
    'type.closed': 'closed',
    'type.open-weights': 'open weights',
    'type.open-source': 'open source',
    'chart.title': 'Metrics',
    'chart.tab.compute': 'Compute',
    'chart.tab.params': 'Parameters',
    'chart.tab.benchmarks': 'Benchmarks',
    'chart.tab.cost': 'Cost',
    'chart.tab.context': 'Context',
    'chart.tab.adoption': 'Adoption',
    'chart.series': 'Series',
    'chart.benchmark': 'Benchmark',
    'chart.log': 'log scale',
    'chart.table': 'Table view',
    'chart.sources': 'Sources',
    'chart.caveat': 'Caveat',
    'chart.value': 'Value',
    'chart.date': 'Date',
    'chart.source': 'Source',
    'chart.label': 'Label',
    'chart.now': 'now',
    'chart.future': 'still ahead of the playhead',
    'chart.ref': 'reference',
    'chart.emptyTitle': 'Nothing to show yet',
    'chart.emptyBody': 'The first point of “{title}” is {date}; the playhead is at {now}.',
    'chart.noSeries': 'No series in this group.',
    'chart.keys': 'Focus the chart and use ← → to walk the points.',
    'arch.title': 'Architecture of the era',
    'arch.period': 'Period',
    'arch.intuition': 'Intuition',
    'arch.steps': 'How it works',
    'arch.misconception': 'Common misconception',
    'arch.whyBetter': 'Why it beat what came before',
    'arch.keyNumbers': 'Key numbers',
    'arch.showSteps': 'Show the steps',
    'arch.hideSteps': 'Hide the steps',
    'arch.missing': 'Diagram not available yet.',
    'accel.eyebrow': 'Acceleration',
    'accel.title': 'The pace, made physical',
    'accel.lede': 'Eighty years on one axis: the first decades crawl, the last one blazes.',
    'star.k': '(a) Starfield',
    'star.title': 'Every milestone as a point of light',
    'star.cap': 'Calendar time. Milestones are halos sized by significance; small stars are model releases. The counts under the axis are milestones per decade.',
    'gap.k': '(b) The shrinking gap',
    'gap.title': 'Years between consecutive key milestones',
    'gap.cap': 'Read left to right: the gaps fall from decades to months. Log scale.',
    'compute.k': '(d) Compute',
    'compute.title': 'Training compute',
    'compute.cap': 'Log axis across the whole span; the two growth regimes are annotated.',
    'compute.doubling': 'doubling every {n}',
    'sat.k': '(c) Time to saturation',
    'sat.title': 'Years from a benchmark’s release until AI beat its human reference score',
    'sat.cap': 'Each bar is one benchmark; newer benchmarks fall faster.',
    'price.k': '(e) Price collapse',
    'price.title': 'The cost of a fixed capability level',
    'price.cap': 'Price per million tokens for the same quality level, over time.',
    'price.drop': '{x}× cheaper',
    'facts.k': '(f) By the numbers',
    'facts.title': 'Acceleration in six numbers',
    'now.eyebrow': 'State of AI',
    'now.title': 'October 2026',
    'now.frontier': 'Frontier models per lab',
    'now.bullets': 'Where things stand',
    'now.oq': 'Open questions',
    'oq.case': 'The case',
    'oq.counter': 'The counter-case',
    'myths.eyebrow': 'Myths and mix-ups',
    'myths.title': 'Often said, rarely true',
    'myths.lede': 'Claims that keep getting repeated, and what the record actually shows.',
    'myths.claim': 'Often said',
    'myths.reality': 'Actually',
    'sources.title': 'All sources'
  },
  uk: {
    'wordmark': 'Глибокий час ШІ',
    'skip': 'Перейти до вмісту',
    'lang.label': 'Мова',
    'lang.en': 'Англійська',
    'lang.uk': 'Українська',
    'help.btn': 'Як користуватися',
    'help.title': 'Як користуватися сторінкою',
    'help.intro': 'Тягніть повзунок уздовж шкали часу або користуйтеся клавішами нижче. Усе на сторінці підлаштовується під вибраний момент.',
    'help.scale': 'Типово шкала часу — це шкала «глибокого часу»: що ближче до сьогодні, то більше місця дістається кожному року, як на геологічній шкалі. Перемкніться на календарну шкалу, щоб побачити, як мало місця насправді займає останнє десятиліття.',
    'help.drag': 'Тягніть у будь-якому місці шкали (мишею, пальцем або стилусом). Коли відпустите, повзунок прилипне до найближчої віхи.',
    'keys.title': 'Клавіатура',
    'keys.prevNext': 'Попередня / наступна віха',
    'keys.era': 'Попередня / наступна епоха',
    'keys.homeEnd': 'Перша / остання віха',
    'keys.play': 'Відтворити / пауза',
    'keys.digits': 'Перейти до епох 1–10',
    'keys.scale': 'Перемкнути шкалу часу',
    'keys.help': 'Відкрити цю довідку',
    'keys.esc': 'Закрити вікно',
    'keys.space': 'Пробіл',
    'keys.or': 'або',
    'nav.timeline': 'Шкала часу',
    'nav.dash': 'Панель епохи',
    'nav.accel': 'Прискорення',
    'nav.now': 'Сьогодні',
    'nav.myths': 'Міфи',
    'nav.sources': 'Джерела',
    'hero.eyebrow': '{span} · {title}',
    'hero.year': 'Рік {y}',
    'hero.intro': 'Тягніть смугу шкали часу або натисніть «Відтворити»: усе на сторінці підлаштується під вибраний момент. Знімок станом на {date}',
    'play': 'Відтворити 80 років за 80 секунд',
    'play.short': 'Відтворити',
    'play.suffix': '80 років за 80 секунд',
    'pause': 'Пауза',
    'replay': 'Відтворити знову',
    'speed': 'Швидкість',
    'speed.1': '1×',
    'speed.2': '2×',
    'cta.now': 'Перейти до сьогодні',
    'cta.accel': 'Відчути прискорення',
    'scale.label': 'Шкала часу',
    'scale.deep': 'Глибокий час',
    'scale.cal': 'Календар',
    'scale.caption.cal': 'На календарній шкалі все, що сталося з {year} року, вміщується в цю смужку шириною {pct} %.',
    'scale.caption.deep': 'Глибокий час: що ближче до сьогодні, то більше місця дістається кожному року.',
    'scrub.label': 'Шкала часу від {from} до {to}',
    'scrub.valuetext': '{date}: {title}',
    'scrub.now': 'зараз',
    'hint.milestone': 'віха',
    'hint.era': 'епоха',
    'hint.play': 'відтворення',
    'hint.scale': 'шкала',
    'hint.help': 'довідка',
    'era.label': 'Епоха {n} з {total}',
    'ms.what': 'Що сталося',
    'ms.why': 'Чому це важливо',
    'ms.numbers': 'У цифрах',
    'ms.est': 'оц.',
    'ms.confidence': 'Упевненість: {level}',
    'ms.caveat': 'Застереження',
    'conf.high': 'висока',
    'conf.medium': 'середня',
    'conf.low': 'низька',
    'ms.sources': 'Джерела ({n})',
    'ms.prev': 'Попередня віха',
    'ms.next': 'Наступна віха',
    'ms.key': 'Ключова віха',
    'ms.of': 'Віха {i} з {n}',
    'ex.label': 'У реальному світі',
    'ex.memo': 'А ви знали?',
    'kind.architecture': 'архітектура',
    'kind.system': 'система',
    'kind.product': 'продукт',
    'kind.paper': 'стаття',
    'kind.event': 'подія',
    'kind.benchmark': 'бенчмарк',
    'kind.hardware': 'апаратне забезпечення',
    'kind.model': 'модель',
    'kind.policy': 'політика',
    'kind.concept': 'концепція',
    'kind.dataset': 'набір даних',
    'kind.result': 'результат',
    'kind.company': 'компанія',
    'kind.demo': 'демонстрація',
    'kind.application': 'застосунок',
    'kind.theory': 'теорія',
    'kind.algorithm': 'алгоритм',
    'kind.competition': 'змагання',
    'kind.funding': 'фінансування',
    'kind.infrastructure': 'інфраструктура',
    'kind.research': 'дослідження',
    'kind.release': 'реліз',
    'kind.report': 'звіт',
    'kind.safety': 'безпека',
    'kind.agent': 'агент',
    'kind.breakthrough': 'прорив',
    'kind.method': 'метод',
    'kind.milestone': 'віха',
    'src.title': 'Джерела: {title}',
    'src.open': 'Відкрити',
    'src.none': 'Для цього пункту джерела не зазначено.',
    'src.all': 'Усі джерела',
    'src.count': 'джерело|джерела|джерел',
    'src.group': 'Етап дослідження {g}',
    'srcType.primary': 'первинне',
    'srcType.secondary': 'вторинне',
    'srcType.news': 'новини',
    'srcType.report': 'звіт',
    'srcType.dataset': 'набір даних',
    'srcType.paper': 'стаття',
    'srcType.blog': 'блог',
    'srcType.docs': 'документація',
    'srcType.book': 'книга',
    'srcType.talk': 'виступ',
    'srcType.other': 'інше',
    'foot.verified': 'Знімок станом на {date}, відтоді не оновлювався',
    'foot.made': 'Створено за допомогою ШІ: Claude від Anthropic опрацював джерела, написав тексти й зібрав сторінку на основі одного дослідницького набору даних і його датованих оновлень, а ШІ звірив факти з наведеними джерелами (основне дослідження — 9 жовтня 2026 р., останнє оновлення — {date}). Жоден експерт-людина цього не перевіряв, тож можливі помилки. Кожна віха, число й цитата має ідентифікатор джерела; оцінки позначено «оц.», а все, що досі невизначене, позначено окремо. Лінійки моделей, бенчмарки й ціни швидко застарівають. Сторінку зроблено на SVG, CSS і звичайному JavaScript, без зовнішніх бібліотек і зображень.',
    'foot.credits': 'Дані графіків: Epoch AI, METR, Artificial Analysis, Stanford AI Index та Our World in Data, джерело вказано на кожному графіку. Код поширюється за ліцензією MIT, оригінальні тексти й дані — за CC BY 4.0; цитати, назви й торговельні марки належать їхнім власникам. Сайт не пов’язаний із жодною компанією ШІ.',
    'count.milestones': 'віха|віхи|віх',
    'count.models': 'модель|моделі|моделей',
    'count.sources': 'джерело|джерела|джерел',
    'count.years': 'рік|роки|років|року',
    'count.months': 'місяць|місяці|місяців|місяця',
    'count.weeks': 'тиждень|тижні|тижнів|тижня',
    'count.days': 'день|дні|днів|дня',
    'loading.title': 'Завантаження даних',
    'loading.body': 'Дані шкали часу ще не завантажилися. Відкрийте сторінку з її теки разом із каталогом data/ або перезавантажте її.',
    'a11y.close': 'Закрити',
    'a11y.playhead': 'Повзунок',
    'a11y.sections': 'Розділи',
    /* ---- рядки для частини 2 ---- */
    'dash.eyebrow': 'Панель епохи',
    'dash.asof': 'моделі станом на {date}, графіки — на {charts}',
    'dash.title': '{title}: моделі, метрики й архітектура',
    'models.title': 'Ключові моделі цього моменту',
    'models.titleSys': 'Ключові системи епохи',
    'models.lineage': 'Повний родовід моделей',
    'models.filterAll': 'Усі розробники',
    'models.empty': 'На цей момент епохи ще не вийшло жодної передової моделі.',
    'models.emptySys': 'Для цієї епохи ключових систем не зазначено.',
    'models.model': 'Модель',
    'models.provider': 'Розробник',
    'models.released': 'Реліз',
    'models.type': 'Тип',
    'models.params': 'Параметри',
    'models.context': 'Контекст',
    'models.modalities': 'Модальності',
    'models.price': 'Ціна за 1 млн токенів',
    'models.headline': 'Головний результат',
    'models.frontier': 'передова',
    'models.future': 'на цей момент ще не вийшла',
    'models.undisclosed': 'не розкрито',
    'type.closed': 'закрита',
    'type.open-weights': 'відкриті ваги',
    'type.open-source': 'відкритий код',
    'chart.title': 'Метрики',
    'chart.tab.compute': 'Обчислення',
    'chart.tab.params': 'Параметри',
    'chart.tab.benchmarks': 'Бенчмарки',
    'chart.tab.cost': 'Вартість',
    'chart.tab.context': 'Контекст',
    'chart.tab.adoption': 'Поширення',
    'chart.series': 'Серія',
    'chart.benchmark': 'Бенчмарк',
    'chart.log': 'лог. шкала',
    'chart.table': 'Таблиця',
    'chart.sources': 'Джерела',
    'chart.caveat': 'Застереження',
    'chart.value': 'Значення',
    'chart.date': 'Дата',
    'chart.source': 'Джерело',
    'chart.label': 'Позначка',
    'chart.now': 'зараз',
    'chart.future': 'ще попереду від повзунка',
    'chart.ref': 'орієнтир',
    'chart.emptyTitle': 'Поки що нічого показати',
    'chart.emptyBody': 'Перша точка серії «{title}» — {date}, а повзунок стоїть на {now}.',
    'chart.noSeries': 'У цій групі немає серій.',
    'chart.keys': 'Сфокусуйте графік і натискайте ← →, щоб переходити між точками.',
    'arch.title': 'Архітектура епохи',
    'arch.period': 'Період',
    'arch.intuition': 'Інтуїція',
    'arch.steps': 'Як це працює',
    'arch.misconception': 'Поширена хибна думка',
    'arch.whyBetter': 'Чому вона перемогла попередників',
    'arch.keyNumbers': 'Ключові числа',
    'arch.showSteps': 'Показати кроки',
    'arch.hideSteps': 'Сховати кроки',
    'arch.missing': 'Діаграма ще недоступна.',
    'accel.eyebrow': 'Прискорення',
    'accel.title': 'Темп, який можна відчути',
    'accel.lede': 'Вісімдесят років на одній осі: перші десятиліття повзуть, останнє — палає.',
    'star.k': '(а) Зоряне поле',
    'star.title': 'Кожна віха — точка світла',
    'star.cap': 'Календарний час. Віхи — ореоли, розмір яких відповідає значущості; маленькі зірки — релізи моделей. Числа під віссю — кількість віх за десятиліття.',
    'gap.k': '(б) Проміжок, що скорочується',
    'gap.title': 'Роки між сусідніми ключовими віхами',
    'gap.cap': 'Читайте зліва направо: проміжки падають від десятиліть до місяців. Логарифмічна шкала.',
    'compute.k': '(г) Обчислення',
    'compute.title': 'Обчислювальний бюджет навчання',
    'compute.cap': 'Логарифмічна вісь на всьому проміжку; позначено два режими зростання.',
    'compute.doubling': 'подвоєння кожні {n}',
    'sat.k': '(в) Час до насичення',
    'sat.title': 'Роки від появи бенчмарку до того, як ШІ перевищив людський орієнтир',
    'sat.cap': 'Кожен стовпчик — один бенчмарк; новіші падають швидше.',
    'price.k': '(ґ) Обвал цін',
    'price.title': 'Вартість фіксованого рівня можливостей',
    'price.cap': 'Ціна за мільйон токенів за той самий рівень якості, з часом.',
    'price.drop': 'у {x} разів дешевше',
    'facts.k': '(д) У цифрах',
    'facts.title': 'Прискорення в шести числах',
    'now.eyebrow': 'Стан ШІ',
    'now.title': 'Жовтень 2026',
    'now.frontier': 'Передові моделі за лабораторіями',
    'now.bullets': 'Де ми зараз',
    'now.oq': 'Відкриті питання',
    'oq.case': 'Аргументи за',
    'oq.counter': 'Аргументи проти',
    'myths.eyebrow': 'Міфи й плутанина',
    'myths.title': 'Часто кажуть, та рідко правда',
    'myths.lede': 'Твердження, які повторюють знову й знову, і що насправді показують джерела.',
    'myths.claim': 'Часто кажуть',
    'myths.reality': 'Насправді',
    'sources.title': 'Усі джерела'
  }
};
/* The data files leave AIH.ui = {}. If they ever ship strings, theirs win key by key. */
AIH.ui = {
  en: assign({}, UI_STRINGS.en, (AIH.ui && AIH.ui.en) || {}),
  uk: assign({}, UI_STRINGS.uk, (AIH.ui && AIH.ui.uk) || {})
};

/* ============================================================================
   2. STATE, EVENTS, ELEMENTS
   ========================================================================== */
var state = {
  lang: 'en',
  scale: 'deep',        // 'deep' | 'cal'
  idx: -1,              // index into M (sorted milestones)
  t: NaN,               // current decimal year (free while dragging, = milestone.t at rest)
  milestone: null,
  era: null,
  playing: false,
  speed: 1,
  dragging: false,
  ready: false,         // data loaded and the stage rendered
  light: false,         // current theme
  reduced: false        // prefers-reduced-motion
};
var listeners = {};
function on(ev, fn) { (listeners[ev] = listeners[ev] || []).push(fn); return function () { off(ev, fn); }; }
function off(ev, fn) { var a = listeners[ev]; if (!a) return; var i = a.indexOf(fn); if (i >= 0) a.splice(i, 1); }
function emit(ev, payload) {
  var a = (listeners[ev] || []).slice();
  for (var i = 0; i < a.length; i++) {
    try { a[i](payload); } catch (e) { console.error('[AIDT] listener for "' + ev + '" failed:', e); }
  }
}
var els = {};
function collectEls() {
  var all = document.querySelectorAll('[id]');
  for (var i = 0; i < all.length; i++) els[all[i].id] = all[i];
}

/* ============================================================================
   3. HELPERS: assign, L, t, plural, fmt, DOM
   ========================================================================== */
function assign(target) {
  for (var i = 1; i < arguments.length; i++) { var s = arguments[i]; if (!s) continue; for (var k in s) if (Object.prototype.hasOwnProperty.call(s, k)) target[k] = s[k]; }
  return target;
}
function L(obj) {
  if (obj == null) return '';
  if (typeof obj !== 'object' || Array.isArray(obj)) return obj;
  var v = obj[state.lang];
  if (v == null) v = obj.en;
  return v == null ? '' : v;
}
function sub(s, params) {
  return String(s).replace(/\{(\w+)\}/g, function (m, k) { return params[k] != null ? params[k] : m; });
}
function has(key) { return (AIH.ui[state.lang] || {})[key] != null || (AIH.ui.en || {})[key] != null; }
function t(key, params) {
  var s = (AIH.ui[state.lang] || {})[key];
  if (s == null) s = (AIH.ui.en || {})[key];
  if (s == null) s = key;
  return params ? sub(s, params) : s;
}
function pluralIndex(n) {
  var frac = Math.abs(n) % 1 !== 0;
  n = Math.abs(Math.round(n));
  if (state.lang === 'uk') {
    if (frac) return 3;                                   /* 2,5 року: genitive singular, 4th form when given */
    var m10 = n % 10, m100 = n % 100;
    if (m10 === 1 && m100 !== 11) return 0;
    if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return 1;
    return 2;
  }
  return n === 1 && !frac ? 0 : 1;                        /* "1.2 years", "1 year" */
}
/* plural(3, 'count.milestones') -> "milestones" / "віхи" */
function plural(n, key) {
  var forms = t(key).split('|'), i = pluralIndex(n);
  if (i === 3 && forms.length < 4) i = 1;                 /* no genitive form given: fall back to "few" */
  return forms[Math.min(i, forms.length - 1)];
}
t.plural = plural;
t.has = has;

var MONTHS = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  enShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  ukNom: ['січень', 'лютий', 'березень', 'квітень', 'травень', 'червень', 'липень', 'серпень', 'вересень', 'жовтень', 'листопад', 'грудень'],
  ukGen: ['січня', 'лютого', 'березня', 'квітня', 'травня', 'червня', 'липня', 'серпня', 'вересня', 'жовтня', 'листопада', 'грудня'],
  ukShort: ['січ', 'лют', 'бер', 'кві', 'тра', 'чер', 'лип', 'сер', 'вер', 'жов', 'лис', 'гру']
};
var SUP = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹', '-': '⁻' };
var NBSP = ' ';
function groupInt(s, sep) { return s.replace(/\B(?=(\d{3})+(?!\d))/g, sep); }
function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
}
function capFirst(s) { s = String(s || ''); return s.charAt(0).toUpperCase() + s.slice(1); }
function parseISO(iso) {
  var m = /^(\d{4})(?:-(\d{1,2}))?(?:-(\d{1,2}))?/.exec(String(iso || ''));
  if (!m) return null;
  return { y: +m[1], mo: m[2] ? +m[2] - 1 : null, d: m[3] ? +m[3] : null };
}
var fmt = {
  esc: esc,
  /* Localised number: 1,234.5 / 1 234,5 (NBSP thousands, comma decimal in Ukrainian). */
  num: function (n, maxFrac) {
    if (n == null || isNaN(n)) return '—';
    var uk = state.lang === 'uk', neg = n < 0;
    n = Math.abs(n);
    var d = maxFrac == null ? (n >= 100 ? 0 : n >= 10 ? 1 : 2) : maxFrac;
    var s = n.toFixed(d);
    if (d > 0) s = s.replace(/\.?0+$/, '');
    var parts = s.split('.');
    if (parts[0].length > 4 || (parts[0].length === 4 && !uk)) parts[0] = groupInt(parts[0], uk ? NBSP : ',');
    return (neg ? '−' : '') + parts[0] + (parts[1] ? (uk ? ',' : '.') + parts[1] : '');
  },
  int: function (n) { return fmt.num(n, 0); },
  /* 1.2M / 1,2 млн; short scale words follow the glossary. */
  compact: function (n, maxFrac) {
    if (n == null || isNaN(n)) return '—';
    var abs = Math.abs(n), i = 0;
    var units = state.lang === 'uk' ? ['', NBSP + 'тис.', NBSP + 'млн', NBSP + 'млрд', NBSP + 'трлн'] : ['', 'K', 'M', 'B', 'T'];
    while (abs >= 999.5 && i < units.length - 1) { abs /= 1000; i++; }
    return (n < 0 ? '−' : '') + fmt.num(abs, maxFrac == null ? (abs >= 100 ? 0 : 1) : maxFrac) + units[i];
  },
  /* 3.1×10²³ (mantissa dropped when 1). */
  sci: function (n, mantFrac) {
    if (n == null || isNaN(n)) return '—';
    if (n === 0) return '0';
    var e = Math.floor(Math.log(Math.abs(n)) / Math.LN10);
    var m = n / Math.pow(10, e);
    var ms = fmt.num(m, mantFrac == null ? 1 : mantFrac);
    if (ms === '10') { ms = '1'; e += 1; }
    var es = String(e).replace(/[\d-]/g, function (c) { return SUP[c]; });
    return (ms === '1' ? '' : ms + '×') + '10' + es;
  },
  pct: function (n, maxFrac) { return fmt.num(n, maxFrac == null ? 0 : maxFrac) + (state.lang === 'uk' ? NBSP + '%' : '%'); },
  /* "7 July 1958" / "7 липня 1958 р." · month: "July 1958" / "липень 1958" · year: "1958" */
  date: function (iso, precision, short) {
    var p = parseISO(iso);
    if (!p) return String(iso || '');
    precision = precision || (p.d != null ? 'day' : p.mo != null ? 'month' : 'year');
    if (precision === 'year' || p.mo == null) return String(p.y);
    var uk = state.lang === 'uk';
    if (precision === 'day' && p.d != null) {
      if (uk) return p.d + NBSP + (short ? MONTHS.ukShort[p.mo] : MONTHS.ukGen[p.mo]) + NBSP + p.y + (short ? '' : NBSP + 'р.');
      return p.d + NBSP + (short ? MONTHS.enShort[p.mo] : MONTHS.en[p.mo]) + NBSP + p.y;
    }
    if (uk) return (short ? MONTHS.ukShort[p.mo] : MONTHS.ukNom[p.mo]) + NBSP + p.y;
    return (short ? MONTHS.enShort[p.mo] : MONTHS.en[p.mo]) + NBSP + p.y;
  },
  /* decimal year -> "July 1958" (month precision) */
  dateT: function (tt, short) {
    var y = Math.floor(tt), mo = Math.min(11, Math.max(0, Math.floor((tt - y) * 12)));
    var uk = state.lang === 'uk';
    return (uk ? (short ? MONTHS.ukShort : MONTHS.ukNom) : (short ? MONTHS.enShort : MONTHS.en))[mo] + NBSP + y;
  },
  year: function (tt) { return String(Math.floor(tt)); },
  /* "3 months" / "2.5 years" from a span in years */
  duration: function (years) {
    var n, key;
    if (years < 1 / 12) { n = Math.max(1, Math.round(years * 365)); key = 'count.days'; }
    else if (years < 1) { var mo = years * 12; n = mo < 2 ? Math.max(1, Math.round(mo * 10) / 10) : Math.round(mo); key = 'count.months'; }   /* under 2 months keep one decimal: 44 days is "1.4 months", not "1 month" */
    else { n = years >= 10 ? Math.round(years) : Math.round(years * 10) / 10; key = 'count.years'; }
    return fmt.num(n, 1) + NBSP + plural(n, key);
  },
  count: function (n, key) { return fmt.int(n) + NBSP + plural(n, key); }
};
function el(html) { var d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstChild; }
function closest(node, sel) {
  while (node && node.nodeType === 1) { if (node.matches(sel)) return node; node = node.parentNode; }
  return null;
}
function clamp(v, a, b) { return v < a ? a : v > b ? b : v; }
function easeInOut(p) { return p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2; }
function setText(id, s) { if (els[id]) els[id].textContent = s; }

/* ============================================================================
   4. THEME + MOTION DETECTION (era colours differ per theme)
   ========================================================================== */
var mqLight = window.matchMedia ? window.matchMedia('(prefers-color-scheme: light)') : null;
var mqReduced = window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
function isLight() {
  var th = root.getAttribute('data-theme');
  if (th === 'light') return true;
  if (th === 'dark') return false;
  return !!(mqLight && mqLight.matches);
}
function eraColor(era) { return state.light ? (era.accentInk || era.accent) : (era.accent || era.accentInk); }
function onThemeChange() {
  var l = isLight();
  if (l === state.light) return;
  state.light = l;
  if (state.ready) paintScrubber();
  emit('theme', { light: l });
}
var themeInit = false;
function initTheme() {
  state.light = isLight();
  state.reduced = !!(mqReduced && mqReduced.matches);
  if (themeInit) return;
  themeInit = true;
  if (mqLight) { if (mqLight.addEventListener) mqLight.addEventListener('change', onThemeChange); else if (mqLight.addListener) mqLight.addListener(onThemeChange); }
  if (mqReduced) { var fr = function () { state.reduced = !!mqReduced.matches; applyMotionPrefs(); }; if (mqReduced.addEventListener) mqReduced.addEventListener('change', fr); else if (mqReduced.addListener) mqReduced.addListener(fr); }
  if (window.MutationObserver) new MutationObserver(onThemeChange).observe(root, { attributes: true, attributeFilter: ['data-theme'] });
}

/* ============================================================================
   5. DATA ACCESS (sorted milestones, eras, lookups)
   ========================================================================== */
var M = [], ERAS = [], eraById = {}, msById = {}, msIndexById = {};
function hasData() {
  return Array.isArray(AIH.milestones) && AIH.milestones.length > 0 && Array.isArray(AIH.eras) && AIH.eras.length > 0;
}
function prepareData() {
  /* stable sort: milestones with an equal t keep their data (file) order */
  for (var n = 0; n < AIH.milestones.length; n++) AIH.milestones[n]._ord = n;
  AIH.milestones.sort(function (a, b) { return (a.t - b.t) || (a._ord - b._ord); });
  M = AIH.milestones;
  ERAS = AIH.eras.slice().sort(function (a, b) { return a.start - b.start; });
  eraById = {}; msById = {}; msIndexById = {};
  for (var i = 0; i < ERAS.length; i++) eraById[ERAS[i].id] = ERAS[i];
  for (var j = 0; j < M.length; j++) { msById[M[j].id] = M[j]; msIndexById[M[j].id] = j; }
}
function eraAt(tt) {
  for (var i = 0; i < ERAS.length; i++) if (tt >= ERAS[i].start && tt < ERAS[i].end) return ERAS[i];
  return tt < ERAS[0].start ? ERAS[0] : ERAS[ERAS.length - 1];
}
function eraOf(ms) { return (ms && eraById[ms.era]) || eraAt(ms ? ms.t : NaN); }
function eraIndex(era) { return ERAS.indexOf(era); }
function firstIdxOfEra(era) {
  for (var i = 0; i < M.length; i++) if (eraOf(M[i]) === era) return i;
  for (var j = 0; j < M.length; j++) if (M[j].t >= era.start) return j;
  return -1;
}
function startIdx() {
  if (msIndexById['M-1958-perceptron'] != null) return msIndexById['M-1958-perceptron'];
  for (var i = 0; i < M.length; i++) if (M[i].t >= 1958 && M[i].t < 1959) return i;
  return 0;
}
function counts() {
  var c = (AIH.meta && AIH.meta.counts) || {};
  return {
    milestones: M.length || c.milestones || 0,
    models: (AIH.models && AIH.models.length) || c.models || 0,
    sources: (AIH.sources && Object.keys(AIH.sources).length) || c.sources || 0
  };
}
function sourceOf(id) { return (AIH.sources && AIH.sources[id]) || null; }

/* ============================================================================
   6. TIME SCALE
   deep:  x = (L0 − ln(T1 − t + c)) / (L0 − ln c),  L0 = ln(T1 − T0 + c)
   cal:   x = (t − T0) / (T1 − T0)
   scale.mix blends the two while the toggle animates (1 = deep, 0 = calendar).
   ========================================================================== */
var scale = { mode: 'deep', mix: 1, c: 0.6, T0: 1943, T1: 2026.78, L0: 0, denom: 1 };
function initScale() {
  scale.T0 = ERAS[0].start;
  scale.T1 = ERAS[ERAS.length - 1].end;
  scale.L0 = Math.log(scale.T1 - scale.T0 + scale.c);
  scale.denom = scale.L0 - Math.log(scale.c);
}
function deepX(tt) { return (scale.L0 - Math.log(Math.max(scale.c * 0.5, scale.T1 - tt + scale.c))) / scale.denom; }
function deepT(x) { return scale.T1 + scale.c - Math.exp(scale.L0 - x * scale.denom); }
function calX(tt) { return (tt - scale.T0) / (scale.T1 - scale.T0); }
function calT(x) { return scale.T0 + x * (scale.T1 - scale.T0); }
function xOf(tt) {
  tt = clamp(tt, scale.T0, scale.T1);
  if (scale.mix >= 1) return clamp(deepX(tt), 0, 1);
  if (scale.mix <= 0) return clamp(calX(tt), 0, 1);
  var a = calX(tt), b = deepX(tt);
  return clamp(a + (b - a) * scale.mix, 0, 1);
}
function tOf(x) {
  x = clamp(x, 0, 1);
  if (scale.mix >= 1) return clamp(deepT(x), scale.T0, scale.T1);
  if (scale.mix <= 0) return calT(x);
  var lo = scale.T0, hi = scale.T1, mid;           /* xOf is monotonic: bisect */
  for (var i = 0; i < 40; i++) { mid = (lo + hi) / 2; if (xOf(mid) < x) lo = mid; else hi = mid; }
  return (lo + hi) / 2;
}
scale.xOf = xOf; scale.tOf = tOf; scale.deepX = deepX; scale.calX = calX;

/* ============================================================================
   7. LANGUAGE
   ========================================================================== */
function detectLang() {
  var l = null;
  try { l = localStorage.getItem('aih-lang'); } catch (e) {}
  if (l !== 'en' && l !== 'uk') l = ((navigator.language || '').toLowerCase().indexOf('uk') === 0) ? 'uk' : 'en';
  return l;
}
function setLang(l, silent) {
  if (l !== 'en' && l !== 'uk') return;
  state.lang = l;
  root.lang = l;
  try { localStorage.setItem('aih-lang', l); } catch (e) {}
  var btns = els.langSeg ? els.langSeg.querySelectorAll('button') : [];
  for (var i = 0; i < btns.length; i++) btns[i].setAttribute('aria-pressed', btns[i].getAttribute('data-lang') === l ? 'true' : 'false');
  renderStatic();
  if (state.ready) { paintScrubber(); layoutDecades(); render('lang'); }   /* layoutDecades: the "now" label is localised */
  if (!silent) emit('lang', l);
}

/* ============================================================================
   8. STATIC CHROME: header, nav, help dialog, footer, loading notice
   ========================================================================== */
var NAV = [
  { id: 'timeline', key: 'nav.timeline' }, { id: 'dash', key: 'nav.dash' }, { id: 'accel', key: 'nav.accel' },
  { id: 'now', key: 'nav.now' }, { id: 'myths', key: 'nav.myths' }, { id: 'sources', key: 'nav.sources' }
];
var LATER_SECTIONS = ['dash', 'accel', 'now', 'myths', 'sources'];   /* filled by part 2; hidden until a panel registers */

function renderStatic() {
  var nodes = document.querySelectorAll('[data-ui]');
  for (var i = 0; i < nodes.length; i++) nodes[i].textContent = t(nodes[i].getAttribute('data-ui'));
  if (AIH.meta && AIH.meta.title) { var ttl = L(AIH.meta.title); setText('pageTitle', ttl); document.title = ttl; var wm = document.querySelector('[data-ui="wordmark"]'); if (wm) wm.textContent = ttl; }
  if (els.langSeg) {
    els.langSeg.setAttribute('aria-label', t('lang.label'));
    var lb = els.langSeg.querySelectorAll('button');
    for (var k = 0; k < lb.length; k++) lb[k].setAttribute('aria-label', t('lang.' + lb[k].getAttribute('data-lang')));
  }
  if (els.helpBtn) { els.helpBtn.title = t('help.btn'); els.helpBtn.setAttribute('aria-label', t('help.btn')); }
  if (els.hdrNav) els.hdrNav.setAttribute('aria-label', t('a11y.sections'));
  if (els.srcDlgClose) els.srcDlgClose.setAttribute('aria-label', t('a11y.close'));
  if (els.helpDlgClose) els.helpDlgClose.setAttribute('aria-label', t('a11y.close'));
  renderNav();
  renderHelp();
  renderSectionHeads();
  if (AIH.meta) setText('heroIntro', (AIH.meta.tagline ? L(AIH.meta.tagline) + ' ' : '') + (AIH.meta.asOf ? t('hero.intro', { date: fmt.date(AIH.meta.asOf, 'day') }) : ''));
  renderFooter();
  renderLoading();
  if (ctaBuilt) labelControls();
}
function renderNav() {
  if (!els.hdrNav) return;
  var html = '';
  for (var i = 0; i < NAV.length; i++) {
    var sec = els[NAV[i].id];
    if (!sec || sec.hidden) continue;
    html += '<a href="#' + NAV[i].id + '">' + esc(t(NAV[i].key)) + '</a>';
  }
  els.hdrNav.innerHTML = html;
}
function kbd(s) { return '<kbd>' + esc(s) + '</kbd>'; }
function renderHelp() {
  if (!els.helpDlgBody) return;
  setText('helpDlgTitle', t('help.title'));
  var rows = [
    [kbd('←') + ' ' + kbd('→'), t('keys.prevNext')],
    [kbd('Shift') + '+' + kbd('←') + ' ' + kbd('→') + ' ' + esc(t('keys.or')) + ' ' + kbd('PgUp') + ' ' + kbd('PgDn'), t('keys.era')],
    [kbd('Home') + ' ' + kbd('End'), t('keys.homeEnd')],
    [kbd(t('keys.space')), t('keys.play')],
    [kbd('1') + '…' + kbd('9') + ' ' + kbd('0'), t('keys.digits')],
    [kbd('L'), t('keys.scale')],
    [kbd('?'), t('keys.help')],
    [kbd('Esc'), t('keys.esc')]
  ];
  var html = '<p>' + esc(t('help.intro')) + '</p><p class="small">' + esc(t('help.drag')) + '</p>' +
    '<h4 class="eyebrow mute" style="margin:16px 0 10px">' + esc(t('keys.title')) + '</h4><div class="keys">';
  for (var i = 0; i < rows.length; i++) html += '<div>' + rows[i][0] + '</div><div>' + esc(rows[i][1]) + '</div>';
  html += '</div><p class="small" style="margin-top:16px">' + esc(t('help.scale')) + '</p>';
  els.helpDlgBody.innerHTML = html;
}
function renderSectionHeads() {
  /* Pure UI strings; part 2 fills the bodies and may overwrite any of these. */
  setText('dashEyebrow', t('dash.eyebrow') + (AIH.meta && AIH.meta.asOf ? ' · ' + t('dash.asof', { date: fmt.date(AIH.meta.asOf, 'day'), charts: fmt.date(AIH.meta.chartsAsOf || AIH.meta.asOf, 'day') }) : ''));
  if (state.era) setText('dashTitle', t('dash.title', { title: L(state.era.title) }));
  setText('accelEyebrow', t('accel.eyebrow')); setText('accelTitle', t('accel.title')); setText('accelLede', t('accel.lede'));
  setText('nowEyebrow', t('now.eyebrow'));
  setText('nowTitle', AIH.meta && AIH.meta.asOf ? capFirst(fmt.date(AIH.meta.asOf, 'month')) : t('now.title'));
  setText('oqTitle', t('now.oq'));
  setText('mythsEyebrow', t('myths.eyebrow')); setText('mythsTitle', t('myths.title')); setText('mythsLede', t('myths.lede'));
  setText('srcTitle', t('sources.title'));
  var c = counts();
  setText('srcCount', c.sources ? fmt.count(c.sources, 'count.sources') : '');
}
function renderFooter() {
  if (!els.foot) return;
  var meta = AIH.meta || {}, c = counts(), parts = [];
  if (meta.asOf) parts.push(t('foot.verified', { date: fmt.date(meta.asOf, 'day') }));
  if (c.milestones) parts.push(fmt.count(c.milestones, 'count.milestones'));
  if (c.models) parts.push(fmt.count(c.models, 'count.models'));
  if (c.sources) parts.push(fmt.count(c.sources, 'count.sources'));
  var html = '<p>' + esc(parts.join(' · ')) + '</p>';
  if (meta.tagline) html += '<p>' + esc(L(meta.tagline)) + '</p>';
  /* foot.made carries the whole AI-made / fact-check disclosure (it absorbed meta.datasetNote, which is no longer shown). */
  html += '<p>' + esc(t('foot.made', { date: meta.asOf ? fmt.date(meta.asOf, 'day') : '' })) + '</p>';
  html += '<p>' + esc(t('foot.credits')) + '</p>';
  els.foot.innerHTML = html;
}
var loadingNote = null;
function renderLoading() {
  if (!loadingNote) return;
  loadingNote.innerHTML = '<b style="display:block;font:500 12px var(--mono);letter-spacing:.1em;text-transform:uppercase;margin-bottom:6px">' + esc(t('loading.title')) + '</b>' + esc(t('loading.body'));
}
function showLoading(show) {
  if (show && !loadingNote) {
    loadingNote = document.createElement('div');
    loadingNote.className = 'notice';
    loadingNote.setAttribute('role', 'status');
    els.main.insertBefore(loadingNote, els.main.firstChild);
    renderLoading();
  } else if (!show && loadingNote) { loadingNote.parentNode.removeChild(loadingNote); loadingNote = null; }
  if (els.timeline) els.timeline.hidden = !!show;
  if (els.scrub) els.scrub.hidden = !!show;
}

/* ============================================================================
   9. DIALOGS
   ========================================================================== */
function openDialog(dlg) {
  if (!dlg) return;
  if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); }
  else dlg.setAttribute('open', '');
}
function closeDialog(dlg) { if (!dlg) return; if (typeof dlg.close === 'function') { if (dlg.open) dlg.close(); } else dlg.removeAttribute('open'); }
function bindDialogs() {
  if (els.helpBtn) els.helpBtn.addEventListener('click', function () { pause(); openDialog(els.helpDlg); });
  if (els.helpDlgClose) els.helpDlgClose.addEventListener('click', function () { closeDialog(els.helpDlg); });
  if (els.srcDlgClose) els.srcDlgClose.addEventListener('click', function () { closeDialog(els.srcDlg); });
  var dlgs = [els.helpDlg, els.srcDlg];
  for (var i = 0; i < dlgs.length; i++) (function (d) {
    if (!d) return;
    d.addEventListener('click', function (e) { if (e.target === d) closeDialog(d); });   /* backdrop click */
  })(dlgs[i]);
}
/* ============================================================================
   10. INJECTED STYLE (small additions that belong to this script's widgets)
   ========================================================================== */
function injectStyle() {
  if (document.getElementById('aidt-style')) return;
  var css = [
    '#head .spark{position:absolute;inset:-9px;border-radius:50%;background:radial-gradient(circle,var(--glow-c),transparent 68%);animation:aidt-flicker 1.5s ease-in-out infinite;pointer-events:none}',
    '@keyframes aidt-flicker{0%,100%{transform:scale(1);opacity:.75}45%{transform:scale(1.5);opacity:1}60%{transform:scale(1.2);opacity:.9}}',
    '@media (prefers-reduced-motion:reduce){#head .spark{animation:none}}',
    '.track .decade.first{transform:none}.track .decade.last{transform:translateX(-100%)}.track .decade.yr{opacity:.7}',
    '.track .float{max-width:min(78vw,440px);overflow:hidden;text-overflow:ellipsis}',
    '.scrub-row .btn .lg{display:inline}@media (max-width:560px){.scrub-row .btn .lg{display:none}.scrub-row .seg button{padding:7px 9px}#speedScrub{display:none}}',
    '.scrub-row .cal-caption{order:9}@media (max-width:720px){.scrub-row .cal-caption.deep{display:none}}',
    '.era-tag{font:500 11px/1 var(--mono);letter-spacing:.1em;text-transform:uppercase;color:var(--fg-3);margin-left:10px}',
    '.ms-nav .icon-btn{width:32px;height:32px;font-size:16px;line-height:1}',
    '.cta-row .seg button{padding:9px 12px}',
    '.ms-sig{display:inline-flex;gap:2px;margin-left:8px;vertical-align:middle}.ms-sig i{width:5px;height:5px;border-radius:50%;background:var(--fg-3);display:inline-block}.ms-sig i.on{background:var(--accent)}',
    '.foot p+p{margin-top:6px}'
  ].join('');
  var st = document.createElement('style'); st.id = 'aidt-style'; st.textContent = css;
  document.head ? document.head.appendChild(st) : document.body.appendChild(st);
}

/* ============================================================================
   11. HERO STAGE: year reels, eyebrow, era text, CTA row, milestone + example cards
   ========================================================================== */
var yearReels = [], yearDigits = [], digitAdv = null, ctaBuilt = false, controls = {};
/* Advance width of each digit in Unbounded 200, in em: each reel cell is as wide as the digit it shows, so the
   narrow "1" leaves no gap ("1 958" read as a thousands separator in Ukrainian). Null when canvas is unavailable;
   the cells then keep their natural (widest-digit) width. */
function measureDigits() {
  try {
    var c = document.createElement('canvas').getContext('2d');
    if (!c) return null;
    c.font = '200 200px Unbounded, "Arial Black", Arial, sans-serif';
    var adv = [];
    for (var k = 0; k < 10; k++) adv.push(Math.round(c.measureText(String(k)).width / 200 * 1000) / 1000);
    return adv;
  } catch (e) { return null; }
}
function sizeDigits(instant) {
  if (!digitAdv || lastYear === null) return;
  var s = String(lastYear); while (s.length < 4) s = '0' + s;
  for (var i = 0; i < yearDigits.length; i++) {
    if (instant) yearDigits[i].style.transition = 'none';
    yearDigits[i].style.width = digitAdv[+s.charAt(i)] + 'em';
  }
  if (instant) { void els.year.offsetWidth; applyMotionPrefs(); }
}
function remeasureDigits() { digitAdv = measureDigits(); sizeDigits(true); }
function buildYear() {
  if (!els.year) return;
  els.year.innerHTML = '';
  yearReels = []; yearDigits = [];
  for (var i = 0; i < 4; i++) {
    var d = document.createElement('span'); d.className = 'digit';
    var r = document.createElement('span'); r.className = 'reel';
    for (var k = 0; k < 10; k++) { var s = document.createElement('span'); s.textContent = String(k); r.appendChild(s); }
    d.appendChild(r); els.year.appendChild(d); yearReels.push(r); yearDigits.push(d);
  }
  digitAdv = measureDigits();
  applyMotionPrefs();
  /* the first measurement may see the fallback face; measure again once the display face has loaded */
  if (document.fonts) {
    try {
      if (document.fonts.load) document.fonts.load('200 200px Unbounded').then(remeasureDigits, function () {});
      if (document.fonts.addEventListener) document.fonts.addEventListener('loadingdone', remeasureDigits);
    } catch (e) {}
  }
}
function applyMotionPrefs() {
  for (var i = 0; i < yearReels.length; i++) yearReels[i].style.transition = state.reduced ? 'none' : '';
  for (var j = 0; j < yearDigits.length; j++) yearDigits[j].style.transition = state.reduced ? 'none' : '';
}
var lastYear = null;
function setYear(y) {
  y = Math.round(clamp(y, 0, 9999));
  if (y === lastYear) return;
  var first = lastYear === null;
  lastYear = y;
  var s = String(y); while (s.length < 4) s = '0' + s;
  for (var i = 0; i < yearReels.length; i++) {
    if (first) { yearReels[i].style.transition = 'none'; yearDigits[i].style.transition = 'none'; }   /* first paint lands on the year, no roll-in */
    yearReels[i].style.setProperty('--d', s.charAt(i));
    if (digitAdv) yearDigits[i].style.width = digitAdv[+s.charAt(i)] + 'em';
  }
  if (first) { void els.year.offsetWidth; applyMotionPrefs(); }
  if (els.year) els.year.setAttribute('aria-label', t('hero.year', { y: y }));
}
function buildCta() {
  if (!els.ctaRow || ctaBuilt) return;
  els.ctaRow.innerHTML = '';
  controls.playHero = el('<button type="button" class="btn primary" id="playHero"><span class="ic" aria-hidden="true">▶</span> <span class="lbl"></span></button>');
  controls.speedHero = el('<div class="seg" role="group" id="speedHero"><button type="button" data-speed="1" aria-pressed="true"></button><button type="button" data-speed="2" aria-pressed="false"></button></div>');
  controls.nowBtn = el('<button type="button" class="btn ghost" id="jumpNow"></button>');
  els.ctaRow.appendChild(controls.playHero);
  els.ctaRow.appendChild(controls.speedHero);
  els.ctaRow.appendChild(controls.nowBtn);
  controls.playHero.addEventListener('click', function (e) { togglePlay(); focusTrack(e); });
  controls.nowBtn.addEventListener('click', function (e) { pause(); go(M.length - 1, 'nav'); focusTrack(e); });
  bindSpeed(controls.speedHero);
  ctaBuilt = true;
}
function bindSpeed(seg) {
  seg.addEventListener('click', function (e) {
    var b = closest(e.target, 'button[data-speed]'); if (!b) return;
    setSpeed(+b.getAttribute('data-speed'));
    focusTrack(e);
  });
}
/* After a pointer click on a toggle, move focus to the slider so Space/arrows keep working
   (keyboard-initiated clicks have e.detail === 0 and keep their focus). */
function focusTrack(e) {
  if (e && e.detail && els.track && !els.track.hidden) { try { els.track.focus({ preventScroll: true }); } catch (err) { els.track.focus(); } }
}
function setSpeed(s) {
  state.speed = s === 2 ? 2 : 1;
  var segs = [controls.speedHero, controls.speedScrub];
  for (var i = 0; i < segs.length; i++) {
    if (!segs[i]) continue;
    var b = segs[i].querySelectorAll('button');
    for (var k = 0; k < b.length; k++) b[k].setAttribute('aria-pressed', +b[k].getAttribute('data-speed') === state.speed ? 'true' : 'false');
  }
  emit('speed', state.speed);
}
/* Labels of every control, in the current language and play state. */
function labelControls() {
  var atEnd = state.idx >= M.length - 1;
  var playLbl = state.playing ? t('pause') : (atEnd ? t('replay') : t('play'));
  var playShort = state.playing ? t('pause') : (atEnd ? t('replay') : t('play.short'));
  if (controls.playHero) {
    controls.playHero.querySelector('.lbl').textContent = playLbl;
    controls.playHero.querySelector('.ic').textContent = state.playing ? '❚❚' : '▶';
    controls.playHero.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
  }
  if (controls.playScrub) {
    var suffix = (!state.playing && !atEnd) ? ' ' + t('play.suffix') : '';
    controls.playScrub.innerHTML = '<span aria-hidden="true">' + (state.playing ? '❚❚' : '▶') + '</span> <span class="sm-lbl">' + esc(playShort) + '</span><span class="lg">' + esc(suffix) + '</span>';
    controls.playScrub.setAttribute('aria-label', playLbl);
    controls.playScrub.setAttribute('aria-pressed', state.playing ? 'true' : 'false');
  }
  var segs = [controls.speedHero, controls.speedScrub];
  for (var i = 0; i < segs.length; i++) {
    if (!segs[i]) continue;
    segs[i].setAttribute('aria-label', t('speed'));
    var b = segs[i].querySelectorAll('button');
    for (var k = 0; k < b.length; k++) b[k].textContent = t('speed.' + b[k].getAttribute('data-speed'));
  }
  if (controls.nowBtn) controls.nowBtn.textContent = t('cta.now') + ' ⇥';
  if (controls.scaleSeg) {
    controls.scaleSeg.setAttribute('aria-label', t('scale.label'));
    controls.scaleSeg.querySelector('[data-scale="deep"]').textContent = t('scale.deep');
    controls.scaleSeg.querySelector('[data-scale="cal"]').textContent = t('scale.cal');
  }
  renderCaption();
  renderHints();
  if (els.track) {
    els.track.setAttribute('aria-label', t('scrub.label', { from: fmt.year(scale.T0), to: AIH.meta && AIH.meta.asOf ? fmt.date(AIH.meta.asOf, 'month') : fmt.year(scale.T1) }));
  }
}
function renderCaption() {
  if (!controls.caption) return;
  controls.caption.className = 'cal-caption ' + (state.scale === 'cal' ? 'cal' : 'deep');
  if (state.scale === 'cal') {
    var e8 = eraById.E08 || ERAS[Math.min(7, ERAS.length - 1)];
    var pct = Math.round(100 * (1 - calX(e8.start)));
    controls.caption.textContent = t('scale.caption.cal', { year: fmt.year(e8.start), pct: fmt.int(pct) });
  } else controls.caption.textContent = t('scale.caption.deep');
}
function renderHints() {
  if (!els.keyHints) return;
  els.keyHints.innerHTML = kbd('←') + kbd('→') + ' ' + esc(t('hint.milestone')) + ' · ' + kbd('Shift') + '+' + kbd('←→') + ' ' + esc(t('hint.era')) +
    ' · ' + kbd(t('keys.space')) + ' ' + esc(t('hint.play')) + ' · ' + kbd('L') + ' ' + esc(t('hint.scale')) + ' · ' + kbd('?') + ' ' + esc(t('hint.help'));
}
function msDate(ms) { return fmt.date(ms.date, ms.precision); }
function kindLabel(kind) { if (!kind) return ''; return has('kind.' + kind) ? t('kind.' + kind) : String(kind).replace(/[-_]/g, ' '); }
function renderHero() {
  var era = state.era, ms = state.milestone;
  if (!era || !ms) return;
  setText('eyebrow', t('hero.eyebrow', { span: L(era.span), title: L(era.title) }));
  var p = parseISO(ms.date);
  /* the playhead's year while dragging or parked inside an empty era (E03 via keyboard); the milestone's year at rest */
  setYear(state.dragging || Math.abs(state.t - ms.t) > 1e-6 ? Math.floor(state.t) : (p ? p.y : Math.floor(ms.t)));
  setText('stageTitle', t('scrub.valuetext', { date: msDate(ms), title: L(ms.title) }));
  setText('eraSub', L(era.subtitle));
  if (els.eraSummary) {
    var paras = String(L(era.summary) || '').split(/\n\s*\n/);
    var html = '';
    for (var i = 0; i < paras.length; i++) if (paras[i].trim()) html += '<p>' + esc(paras[i].trim()) + '</p>';
    els.eraSummary.innerHTML = html;
  }
  setText('dashTitle', t('dash.title', { title: L(era.title) }));
  labelControls();
}
function renderMilestoneCard() {
  var ms = state.milestone; if (!ms || !els.msCard) return;
  var sig = '';
  if (ms.significance) {
    sig = '<span class="ms-sig" aria-hidden="true">';
    for (var s = 1; s <= 5; s++) sig += '<i class="' + (s <= ms.significance ? 'on' : '') + '"></i>';
    sig += '</span>';
  }
  var html = '<div class="ms-head"><span class="ms-date">' + esc(msDate(ms)) + '</span>' +
    '<span class="ms-kind">' + esc(kindLabel(ms.kind)) + (ms.significance >= 5 ? ' · ' + esc(t('ms.key')) : '') + sig + '</span></div>' +
    '<h3 class="ms-title" id="msTitle">' + esc(L(ms.title)) + '</h3>';
  if (L(ms.who)) html += '<div class="ms-who">' + esc(L(ms.who)) + '</div>';
  html += '<div class="ms-body"><dl>';
  if (L(ms.what)) html += '<div><dt>' + esc(t('ms.what')) + '</dt><dd>' + esc(L(ms.what)) + '</dd></div>';
  if (L(ms.why)) html += '<div><dt>' + esc(t('ms.why')) + '</dt><dd>' + esc(L(ms.why)) + '</dd></div>';
  html += '</dl></div>';
  if (Array.isArray(ms.numbers) && ms.numbers.length) {
    html += '<div class="nums" aria-label="' + esc(t('ms.numbers')) + '">';
    for (var i = 0; i < Math.min(4, ms.numbers.length); i++) {
      var n = ms.numbers[i];
      var val = (typeof n.value === 'string' && /^undisclosed$/i.test(n.value.trim())) ? t('models.undisclosed') : L(n.value);
      /* Ukrainian number formatting for English-formatted display strings: "1,000" → "1 000" (NBSP), "74.9" → "74,9".
         A digit run after a word character, a dot or a hyphen is a name ("GPT-5.2", "v1.1") and is left alone. */
      if (state.lang === 'uk' && typeof val === 'string') val = val.replace(/(\d),(\d{3})(?!\d)/g, '$1' + NBSP + '$2').replace(/(^|[^\w.\-])(\d+)\.(\d+)/g, '$1$2,$3');
      html += '<div class="stat"><div class="v">' + esc(val) + (n.est ? ' <span class="est">' + esc(t('ms.est')) + '</span>' : '') + '</div>' +
        '<div class="l">' + esc(L(n.label)) + '</div>' + (L(n.note) ? '<div class="n">' + esc(L(n.note)) + '</div>' : '') + '</div>';
    }
    html += '</div>';
  }
  /* A caveat is shown whenever the data carries one. Below high confidence it is boxed and headed by the
     confidence level; at high confidence it stays quiet: a plain "Caveat" label and a hairline. */
  var conf = ms.confidence || 'high';
  if (conf !== 'high') {
    html += '<div class="caveat"><b>' + esc(t('ms.confidence', { level: has('conf.' + conf) ? t('conf.' + conf) : conf })) + '</b>' + (L(ms.caveat) ? esc(L(ms.caveat)) : '') + '</div>';
  } else if (L(ms.caveat)) {
    html += '<div class="caveat quiet"><b>' + esc(t('ms.caveat')) + '</b>' + esc(L(ms.caveat)) + '</div>';
  }
  var srcN = Array.isArray(ms.sources) ? ms.sources.length : 0;
  html += '<div class="ms-foot"><div class="ms-nav">' +
    '<button type="button" class="icon-btn" data-act="prev" aria-label="' + esc(t('ms.prev')) + '" title="' + esc(t('ms.prev')) + '"' + (state.idx <= 0 ? ' disabled' : '') + '>‹</button>' +
    '<button type="button" class="icon-btn" data-act="next" aria-label="' + esc(t('ms.next')) + '" title="' + esc(t('ms.next')) + '"' + (state.idx >= M.length - 1 ? ' disabled' : '') + '>›</button>' +
    '<span class="meta" style="align-self:center;margin-left:8px">' + esc(t('ms.of', { i: state.idx + 1, n: M.length })) + '</span></div>' +
    (srcN ? '<button type="button" class="btn sm" data-act="sources">' + esc(t('ms.sources', { n: srcN })) + '</button>' : '') + '</div>';
  els.msCard.innerHTML = html;
}
function renderExampleCard() {
  var ms = state.milestone; if (!ms || !els.exCard) return;
  var html = '';
  if (L(ms.example)) html += '<div class="ex-label">' + esc(t('ex.label')) + '</div><div class="ex-body">' + esc(L(ms.example)) + '</div>';
  if (L(ms.memorable)) html += '<div class="memo"><div class="ex-label">' + esc(t('ex.memo')) + '</div><p>' + esc(L(ms.memorable)) + '</p></div>';
  els.exCard.innerHTML = html;
  els.exCard.hidden = !html;
}
function bindCards() {
  if (!els.msCard) return;
  els.msCard.addEventListener('click', function (e) {
    var b = closest(e.target, '[data-act]'); if (!b) return;
    var act = b.getAttribute('data-act');
    if (act === 'prev') { pause(); step(-1); }
    else if (act === 'next') { pause(); step(1); }
    else if (act === 'sources') AIDT.openSources(state.milestone.sources || [], L(state.milestone.title));
  });
}

/* ============================================================================
   12. SCRUBBER: bands, ticks, decades, fuse, head, float, drag, ARIA
   ========================================================================== */
var tickEls = [], bandEls = [], msX = [], decadeEls = [], trackW = 0, floatTimer = null;
function buildScrubber() {
  if (!els.track) return;
  /* controls row */
  els.scrubRow.innerHTML = '';
  controls.playScrub = el('<button type="button" class="btn" id="playScrub"></button>');
  controls.speedScrub = el('<div class="seg" role="group" id="speedScrub"><button type="button" data-speed="1" aria-pressed="true"></button><button type="button" data-speed="2" aria-pressed="false"></button></div>');
  controls.scaleSeg = el('<div class="seg" role="group" id="scaleSeg"><button type="button" data-scale="deep" aria-pressed="true"></button><button type="button" data-scale="cal" aria-pressed="false"></button></div>');
  controls.caption = el('<div class="cal-caption" id="calCaption" aria-live="polite"></div>');
  var grow = el('<div class="grow"></div>');
  els.scrubRow.appendChild(controls.playScrub);
  els.scrubRow.appendChild(controls.speedScrub);
  els.scrubRow.appendChild(grow);
  els.scrubRow.appendChild(controls.scaleSeg);
  els.scrubRow.appendChild(controls.caption);
  controls.playScrub.addEventListener('click', function (e) { togglePlay(); focusTrack(e); });
  bindSpeed(controls.speedScrub);
  controls.scaleSeg.addEventListener('click', function (e) {
    var b = closest(e.target, 'button[data-scale]'); if (!b) return;
    setScale(b.getAttribute('data-scale'), true);
    focusTrack(e);
  });
  /* bands */
  els.bands.innerHTML = ''; bandEls = [];
  for (var i = 0; i < ERAS.length; i++) {
    var b = document.createElement('div'); b.className = 'band'; b.setAttribute('data-era', ERAS[i].id);
    els.bands.appendChild(b); bandEls.push(b);
  }
  /* ticks */
  els.ticks.innerHTML = ''; tickEls = [];
  for (var j = 0; j < M.length; j++) {
    var tk = document.createElement('div');
    tk.className = 'tick' + (M[j].significance >= 5 ? ' s5' : '');
    tk.setAttribute('data-i', String(j));
    els.ticks.appendChild(tk); tickEls.push(tk);
  }
  /* head spark */
  if (!els.head.querySelector('.spark')) { var sp = document.createElement('span'); sp.className = 'spark'; els.head.appendChild(sp); }
  els.head.setAttribute('aria-hidden', 'true');
  /* ARIA */
  els.track.setAttribute('aria-valuemin', '0');
  els.track.setAttribute('aria-valuemax', String(M.length - 1));
  bindTrack();
  paintScrubber();
  layoutScrubber();
}
/* Theme-dependent colours: band tints, tick colours, fuse gradient. */
function paintScrubber() {
  for (var i = 0; i < bandEls.length; i++) bandEls[i].style.setProperty('--bc', eraColor(ERAS[i]));
  for (var j = 0; j < tickEls.length; j++) tickEls[j].style.setProperty('--tc', eraColor(eraOf(M[j])));
  paintFuse();
}
function paintFuse() {
  if (!els.fuse || !ERAS.length) return;
  var stops = [], first = eraColor(ERAS[0]), last = eraColor(ERAS[ERAS.length - 1]);
  stops.push(first + ' 0%');
  for (var i = 0; i < ERAS.length; i++) {
    var mid = (xOf(ERAS[i].start) + xOf(ERAS[i].end)) / 2;
    stops.push(eraColor(ERAS[i]) + ' ' + (mid * 100).toFixed(2) + '%');
  }
  stops.push(last + ' 100%');
  els.fuse.style.background = 'linear-gradient(90deg,' + stops.join(',') + ')';
}
/* Geometry for the current scale mix: everything positioned in % of the track. */
function layoutScrubber() {
  if (!els.track || !ERAS.length) return;
  for (var i = 0; i < bandEls.length; i++) {
    var x0 = xOf(ERAS[i].start), x1 = xOf(ERAS[i].end);
    bandEls[i].style.left = (x0 * 100) + '%';
    bandEls[i].style.width = (Math.max(0, x1 - x0) * 100) + '%';
  }
  msX = [];
  for (var j = 0; j < tickEls.length; j++) { var x = xOf(M[j].t); msX.push(x); tickEls[j].style.left = (x * 100) + '%'; }
  paintFuse();
  layoutDecades();
  placeHead();
}
function layoutDecades() {
  if (!els.decades) return;
  trackW = els.track.clientWidth || 0;
  var cands = [], y0 = Math.floor(scale.T0), y1 = Math.floor(scale.T1);
  cands.push({ y: y0, label: String(y0), pri: 0, first: true });
  cands.push({ y: scale.T1, label: t('scrub.now'), pri: 0, last: true });
  for (var d = Math.ceil(y0 / 10) * 10; d <= y1; d += 10) if (d > y0) cands.push({ y: d, label: String(d), pri: 1 });
  for (var y = Math.ceil(y0 / 5) * 5; y <= y1; y += 5) if (y % 10 !== 0) cands.push({ y: y, label: String(y), pri: 2, yr: true });
  for (var yy = y0 + 1; yy <= y1; yy++) if (yy % 5 !== 0) cands.push({ y: yy, label: String(yy), pri: 3, yr: true });
  cands.sort(function (a, b) { return a.pri - b.pri || a.y - b.y; });
  var accepted = [], pad = 12;                              /* min clear space between label boxes, px */
  for (var i = 0; i < cands.length; i++) {
    var c = cands[i], px = xOf(c.y) * trackW, ok = true;
    var w = c.label.length * 6.8 + 4, left = c.first ? px : c.last ? px - w : px - w / 2, right = left + w;
    for (var k = 0; k < accepted.length; k++) {
      var a = accepted[k];
      if (left < a.right + pad && right > a.left - pad) { ok = false; break; }
    }
    if (ok) { c.left = left; c.right = right; accepted.push(c); }
  }
  accepted.sort(function (a, b) { return a.y - b.y; });
  var html = '';
  for (var m = 0; m < accepted.length; m++) {
    var ac = accepted[m];
    html += '<div class="decade' + (ac.first ? ' first' : '') + (ac.last ? ' last' : '') + (ac.yr ? ' yr' : '') + '" style="left:' + (xOf(ac.y) * 100).toFixed(3) + '%" aria-hidden="true">' + esc(ac.label) + '</div>';
  }
  els.decades.innerHTML = html;
}
function placeHead() {
  var x = xOf(state.t);
  els.head.style.left = (x * 100) + '%';
  els.track.style.setProperty('--x', (x * 100).toFixed(3) + '%');
}
function updateTicks() {
  var cur = state.idx, tt = state.t;
  for (var j = 0; j < tickEls.length; j++) {
    var cls = 'tick' + (M[j].significance >= 5 ? ' s5' : '');
    if (j === cur) cls += ' on'; else if (M[j].t <= tt) cls += ' past';
    tickEls[j].className = cls;
  }
  for (var i = 0; i < bandEls.length; i++) bandEls[i].className = 'band' + (ERAS[i] === state.era ? ' on' : '');
  els.track.setAttribute('aria-valuenow', String(cur));
  if (state.milestone) els.track.setAttribute('aria-valuetext', t('scrub.valuetext', { date: msDate(state.milestone), title: L(state.milestone.title) }));
}
function nearestIdx(x) {
  var best = 0, bd = Infinity;
  for (var j = 0; j < msX.length; j++) { var d = Math.abs(msX[j] - x); if (d < bd) { bd = d; best = j; } }
  return best;
}
function showFloat(x, idx, sticky) {
  if (!els.float) return;
  var ms = M[idx];
  els.float.innerHTML = '<b>' + esc(msDate(ms)) + '</b> ' + esc(L(ms.title));
  els.float.hidden = false;
  var w = els.float.offsetWidth, tw = els.track.clientWidth || trackW || 1;
  var px = clamp(x * tw, w / 2, Math.max(w / 2, tw - w / 2));
  els.float.style.left = px + 'px';
  if (floatTimer) { clearTimeout(floatTimer); floatTimer = null; }
  if (!sticky) floatTimer = setTimeout(hideFloat, 1400);
}
function hideFloat() { if (els.float) els.float.hidden = true; if (floatTimer) { clearTimeout(floatTimer); floatTimer = null; } }

var rafPending = false, heavyTimer = null, heavyDue = -1;
function trackX(clientX) {
  var r = els.track.getBoundingClientRect();
  return clamp((clientX - r.left) / Math.max(1, r.width), 0, 1);
}
/* Every frame: head, fuse, year numeral, float label. Heavy panels: at most every ~60 ms. */
function dragTo(clientX) {
  var x = trackX(clientX);
  state.t = tOf(x);
  var near = nearestIdx(x);
  if (!rafPending) {
    rafPending = true;
    requestAnimationFrame(function () {
      rafPending = false;
      placeHead();
      setYear(Math.floor(state.t));
      showFloat(xOf(state.t), nearestIdx(xOf(state.t)), true);
      els.track.setAttribute('aria-valuetext', fmt.year(state.t));
    });
  }
  /* re-render when the nearest milestone changes, or when the playhead crosses into an era that
     has no milestone of its own (the winters), so that era still shows while scrubbing through it */
  if (near !== state.idx || eraAt(state.t) !== state.era) scheduleHeavy(near);
}
function scheduleHeavy(near) {
  heavyDue = near;
  if (heavyTimer) return;                                   /* the trailing call picks heavyDue up */
  flushHeavy();
  heavyTimer = setTimeout(function () { heavyTimer = null; if (heavyDue >= 0) scheduleHeavy(heavyDue); }, 60);
}
function flushHeavy() {
  var n = heavyDue; heavyDue = -1;
  if (n >= 0 && state.dragging && (n !== state.idx || eraAt(state.t) !== state.era)) go(n, 'drag', { keepT: true });
}
var trackBound = false, pend = null;
function startDrag(e) {
  pause();
  state.dragging = true;
  rafPending = false;                                       /* a frame request lost while the tab was hidden must not block the drag */
  els.track.classList.add('drag');
  dragTo(e.clientX);
}
function endDrag() {
  pend = null;
  if (!state.dragging) return;
  state.dragging = false;
  els.track.classList.remove('drag');
  if (heavyTimer) { clearTimeout(heavyTimer); heavyTimer = null; }
  heavyDue = -1;
  go(nearestIdx(xOf(state.t)), 'drag');                    /* snap */
  hideFloat();
  focusTrack({ detail: 1 });
}
function bindTrack() {
  if (trackBound) return;
  trackBound = true;
  var tr = els.track;
  tr.addEventListener('pointerdown', function (e) {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    try { tr.setPointerCapture(e.pointerId); } catch (err) {}
    if (e.pointerType === 'touch') { pend = { x: e.clientX, y: e.clientY }; pause(); return; }   /* wait: tap or horizontal drag vs. vertical page scroll */
    startDrag(e);
    e.preventDefault();
  });
  tr.addEventListener('pointermove', function (e) {
    if (pend) { if (Math.abs(e.clientX - pend.x) > 6) { pend = null; startDrag(e); } return; }
    if (state.dragging) { dragTo(e.clientX); return; }
    if (e.pointerType === 'mouse') { var x = trackX(e.clientX); showFloat(x, nearestIdx(x), true); }
  });
  tr.addEventListener('pointerup', function (e) {
    if (pend) { pend = null; startDrag(e); }               /* a tap */
    endDrag();
  });
  tr.addEventListener('pointercancel', function () { if (pend) { pend = null; return; } endDrag(); });
  tr.addEventListener('pointerleave', function () { if (!state.dragging) hideFloat(); });
  tr.addEventListener('blur', hideFloat);
  if (window.ResizeObserver) {
    var ro = new ResizeObserver(function () { layoutDecades(); measureScrub(); });
    ro.observe(tr);
    if (els.scrub) ro.observe(els.scrub);
  } else window.addEventListener('resize', function () { layoutDecades(); measureScrub(); });
}
/* The fixed bottom bar on phones: keep body padding equal to its real height. */
function measureScrub() {
  if (!els.scrub) return;
  var pos = getComputedStyle(els.scrub).position;
  if (pos === 'fixed') root.style.setProperty('--scrub-h', els.scrub.offsetHeight + 'px');
  else root.style.removeProperty('--scrub-h');
}

/* ============================================================================
   13. SCALE TOGGLE
   ========================================================================== */
var scaleAnim = null;
function setScale(mode, animate) {
  if (mode !== 'deep' && mode !== 'cal') return;
  if (state.scale === mode) return;
  state.scale = mode; scale.mode = mode;
  if (controls.scaleSeg) {
    var b = controls.scaleSeg.querySelectorAll('button');
    for (var i = 0; i < b.length; i++) b[i].setAttribute('aria-pressed', b[i].getAttribute('data-scale') === mode ? 'true' : 'false');
  }
  renderCaption();
  var to = mode === 'deep' ? 1 : 0, from = scale.mix;
  if (scaleAnim) { cancelAnimationFrame(scaleAnim); scaleAnim = null; }
  emit('scale', { mode: mode, animated: !!animate && !state.reduced });
  if (!animate || state.reduced) {
    scale.mix = to; layoutScrubber(); els.track.classList.remove('anim');
    emit('scaleend', { mode: mode });
    return;
  }
  els.track.classList.add('anim');
  var t0 = performance.now(), dur = 600;
  var frame = function (now) {
    var p = clamp((now - t0) / dur, 0, 1);
    scale.mix = from + (to - from) * easeInOut(p);
    layoutScrubber();
    emit('scaleframe', { mix: scale.mix });
    if (p < 1) scaleAnim = requestAnimationFrame(frame);
    else { scaleAnim = null; scale.mix = to; layoutScrubber(); els.track.classList.remove('anim'); emit('scaleend', { mode: mode }); }
  };
  scaleAnim = requestAnimationFrame(frame);
}
function toggleScale() { setScale(state.scale === 'deep' ? 'cal' : 'deep', true); }

/* ============================================================================
   14. NAVIGATION + RENDER PIPELINE
   ========================================================================== */
var panels = {}, panelOrder = [];
function applyEra() {
  var era = state.era; if (!era) return;
  root.style.setProperty('--era', era.accent || era.accentInk);
  root.style.setProperty('--era-ink', era.accentInk || era.accent);
  root.setAttribute('data-winter', era.winter ? 'true' : 'false');
  root.setAttribute('data-era', era.id);
}
function renderPanels(reason) {
  var ctx = { state: state, milestone: state.milestone, era: state.era, t: state.t, idx: state.idx, lang: state.lang, reason: reason };
  for (var i = 0; i < panelOrder.length; i++) {
    var name = panelOrder[i];
    try { panels[name](ctx); } catch (e) { console.error('[AIDT] panel "' + name + '" failed:', e); }
  }
}
function render(reason) {
  applyEra();
  renderHero();
  renderMilestoneCard();
  renderExampleCard();
  updateTicks();
  if (!state.dragging) placeHead();
  renderPanels(reason);
  emit('change', { idx: state.idx, milestone: state.milestone, era: state.era, t: state.t, lang: state.lang, reason: reason, prevIdx: prevIdx });
}
var prevIdx = -1;
/* go(idx, reason, {keepT}) — the single entry point for moving the playhead. */
function go(idx, reason, opts) {
  if (!M.length) return;
  idx = clamp(Math.round(idx), 0, M.length - 1);
  prevIdx = state.idx;
  state.idx = idx;
  state.milestone = M[idx];
  if (!(opts && opts.keepT)) state.t = M[idx].t;
  /* at rest the era is the milestone's; mid-drag it is the era under the playhead (so E03/E05 show) */
  state.era = (opts && opts.keepT) ? eraAt(state.t) : eraOf(state.milestone);
  render(reason || 'nav');
  if (reason === 'key' || reason === 'era') showFloat(xOf(M[idx].t), idx, false);
}
function goTo(tt, reason) {
  var x = xOf(clamp(tt, scale.T0, scale.T1));
  go(nearestIdx(x), reason || 'nav');
}
function goMilestone(id, reason) { if (msIndexById[id] != null) go(msIndexById[id], reason || 'nav'); }
function step(dir, reason) { go(state.idx + dir, reason || 'key'); }
/* An era with no milestone of its own (E03, the first winter): park the playhead at its midpoint and show the last
   milestone before it under the era's chrome, exactly as dragging through the era already does. */
function enterEmptyEra(era) {
  var i = firstIdxOfEra(era);
  state.t = (era.start + era.end) / 2;
  go(Math.max(0, i - 1), 'era', { keepT: true });
}
function stepEra(dir) {
  var ei = clamp(eraIndex(state.era) + dir, 0, ERAS.length - 1);
  var era = ERAS[ei];
  if (era === state.era && dir < 0) { var f = firstIdxOfEra(era); if (f >= 0 && f !== state.idx) { go(f, 'era'); return; } }
  if (era === state.era) { if (dir > 0) go(M.length - 1, 'era'); else go(0, 'era'); return; }
  var i = firstIdxOfEra(era);
  if (i >= 0 && eraOf(M[i]) !== era) enterEmptyEra(era);
  else if (i >= 0) go(i, 'era');
}
function jumpEra(ei) {
  if (ei < 0 || ei >= ERAS.length) return;
  var era = ERAS[ei], i = firstIdxOfEra(era);
  if (i >= 0 && eraOf(M[i]) !== era) enterEmptyEra(era);
  else if (i >= 0) go(i, 'era');
}

/* ============================================================================
   15. PLAY: a constant pace per milestone, so calendar time visibly accelerates
   ========================================================================== */
var playTimer = null;
function play() {
  if (!M.length) return;
  if (state.idx >= M.length - 1) go(0, 'play');
  state.playing = true;
  labelControls();
  emit('play', true);
  var tick = function () {
    playTimer = null;
    if (!state.playing) return;
    if (state.idx >= M.length - 1) { pause(); return; }
    go(state.idx + 1, 'play');
    playTimer = setTimeout(tick, 80000 / M.length / state.speed);
  };
  playTimer = setTimeout(tick, 80000 / M.length / state.speed);
}
function pause() {
  if (playTimer) { clearTimeout(playTimer); playTimer = null; }
  if (!state.playing) return;
  state.playing = false;
  labelControls();
  emit('play', false);
}
function togglePlay() { if (state.playing) pause(); else play(); }

/* ============================================================================
   16. KEYBOARD (global; skips text inputs and elements marked data-keys="own")
   ========================================================================== */
function isTyping(node) {
  if (!node || node.nodeType !== 1) return false;
  var tag = node.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || node.isContentEditable;
}
function bindKeys() {
  document.addEventListener('keydown', function (e) {
    if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.altKey) return;
    var tg = e.target;
    if (isTyping(tg) || closest(tg, '[data-keys="own"]')) return;
    if (document.querySelector('dialog[open]')) return;
    if (!state.ready) return;
    var k = e.key, code = e.code, handled = true, isBtn = !!closest(tg, 'button, a, summary, [role="button"]');
    if (k === 'ArrowRight' || k === 'ArrowLeft') { var dir = k === 'ArrowRight' ? 1 : -1; if (e.shiftKey) stepEra(dir); else step(dir); }
    else if (k === 'PageDown') stepEra(1);
    else if (k === 'PageUp') stepEra(-1);
    else if (k === 'Home') go(0, 'key');
    else if (k === 'End') go(M.length - 1, 'key');
    else if (k === ' ' || code === 'Space') { if (isBtn) handled = false; else { togglePlay(); e.preventDefault(); return; } }
    else if (code === 'KeyL' || k === 'l' || k === 'L') toggleScale();
    else if (k === '?' || (e.shiftKey && (k === '/' || code === 'Slash'))) openDialog(els.helpDlg);
    else if (/^Digit\d$/.test(code || '') || /^\d$/.test(k)) { var n = +(code ? code.slice(5) : k); jumpEra(n === 0 ? 9 : n - 1); }
    else handled = false;
    if (handled) { e.preventDefault(); pause(); }
  });
  /* Any pointer press outside the play controls stops playback. */
  document.addEventListener('pointerdown', function (e) {
    if (!state.playing) return;
    if (closest(e.target, '#playHero, #playScrub, #speedHero, #speedScrub')) return;
    pause();
  }, true);
  document.addEventListener('visibilitychange', function () { if (document.hidden) pause(); });
  if (els.langSeg) els.langSeg.addEventListener('click', function (e) {
    var b = closest(e.target, 'button[data-lang]'); if (!b) return;
    setLang(b.getAttribute('data-lang'));
    focusTrack(e);
  });
}

/* ============================================================================
   17. PANEL REGISTRY (part 2 plugs in here) + PUBLIC API
   ========================================================================== */
function registerPanel(name, fn) {
  if (typeof fn !== 'function') return;
  if (!panels[name]) panelOrder.push(name);
  panels[name] = fn;
  var host = els[name];
  if (host) {
    host.hidden = false;
    var sec = closest(host, 'section');
    if (sec && sec.hidden) { sec.hidden = false; renderNav(); }
  }
  if (state.ready) {
    try { fn({ state: state, milestone: state.milestone, era: state.era, t: state.t, idx: state.idx, lang: state.lang, reason: 'register' }); }
    catch (e) { console.error('[AIDT] panel "' + name + '" failed:', e); }
  }
}
function showSection(id, show) { if (els[id]) { els[id].hidden = !show; renderNav(); } }
function addStrings(obj) {
  if (!obj) return;
  if (obj.en) assign(AIH.ui.en, obj.en);
  if (obj.uk) assign(AIH.ui.uk, obj.uk);
}

var AIDT = window.AIDT = {
  version: '1.0 (part 1)',
  state: state, scale: scale, els: els,
  on: on, off: off, emit: emit,
  L: L, t: t, plural: plural, fmt: fmt, esc: esc, el: el, closest: closest, clamp: clamp,
  registerPanel: registerPanel, showSection: showSection, addStrings: addStrings,
  go: go, goTo: goTo, goMilestone: goMilestone, step: step, stepEra: stepEra, jumpEra: jumpEra,
  play: play, pause: pause, togglePlay: togglePlay, setSpeed: setSpeed,
  setScale: setScale, toggleScale: toggleScale, setLang: setLang,
  eraAt: eraAt, eraOf: eraOf, eraColor: eraColor, isLight: isLight,
  sourceOf: sourceOf, openDialog: openDialog, closeDialog: closeDialog,
  counts: counts, reload: reload,
  data: function () { return { milestones: M, eras: ERAS, eraById: eraById, msById: msById }; }
};

/* ============================================================================
   18. BOOT
   ========================================================================== */
var chromeBuilt = false;
function boot() {
  collectEls();
  injectStyle();
  initTheme();
  state.lang = detectLang();
  root.lang = state.lang;
  if (!chromeBuilt) { bindDialogs(); bindKeys(); bindCards(); chromeBuilt = true; }
  for (var i = 0; i < LATER_SECTIONS.length; i++) {
    var sec = els[LATER_SECTIONS[i]];
    if (sec && !panels[LATER_SECTIONS[i]] && !sectionHasPanel(sec)) sec.hidden = true;
  }
  setLang(state.lang, true);
  if (!hasData()) { showLoading(true); renderStatic(); return; }
  showLoading(false);
  prepareData();
  initScale();
  buildYear();
  buildCta();
  buildScrubber();
  state.ready = true;
  go(startIdx(), 'init');
  renderStatic();
  measureScrub();
  emit('ready', { milestones: M.length, eras: ERAS.length });
}
function sectionHasPanel(sec) {
  for (var i = 0; i < panelOrder.length; i++) { var h = els[panelOrder[i]]; if (h && sec.contains(h)) return true; }
  return false;
}
/* Re-reads window.AIH (used when data arrives late or is injected for testing). */
function reload() { state.ready = false; lastYear = null; ctaBuilt = false; boot(); }

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();

/* ============================================================================
   EXTENSION POINT — part 2 (dashboard, charts, acceleration, state 2026, myths,
   sources) is appended below this line, inside its own IIFE. It uses:
     AIDT.registerPanel('modelsPanel' | 'chartPanel' | 'archPanel' | 'starPanel' |
       'gapPanel' | 'satPanel' | 'computePanel' | 'pricePanel' | 'factStrip' |
       'frontier' | 'bullets' | 'openQ' | 'mythsList' | 'allSourcesBody', fn(ctx))
       — registering unhides the container's section; fn runs on every change
       (ctx.reason: init|nav|key|era|drag|play|lang|register).
     AIDT.on('change' | 'lang' | 'scale' | 'scaleframe' | 'scaleend' | 'theme' | 'play' | 'speed' | 'ready', fn)
     AIDT.scale.xOf(t) / tOf(x) / mix / mode — charts that follow the scrubber's scale.
     AIDT.openSources(ids, title, opts) and AIDT.sourceListHtml(ids) come from app-panels.js.
     AIDT.addStrings({en:{}, uk:{}}) for any extra strings.
   ========================================================================== */
})();
