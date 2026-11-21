'use strict';

const modes = { paisagem: 'Paisagem', atlas: 'Atlas', todos: 'Todos' };
const provenance = [
  ['H', 'Redação humana histórica'],
  ['H/?', 'Fragmento humano com edição pontual por IA. Acervo integral indeterminado.'],
  ['M', 'Proveniência mista identificada ou provável'],
  ['IA', 'Redação por IA documentada'],
  ['IA*', 'Redação integral assistida provável'],
  ['IA+', 'Redação predominantemente por IA'],
  ['?', 'Proveniência indeterminada'],
  ['○', 'Sem manuscrito canônico'],
];
const accents = ['#c598ff', '#63dff5', '#ff9b92', '#f3ce87', '#a0efb9', '#93cbff',
  '#ffc4d5', '#cce977', '#ecacf3', '#f4bc74', '#85ecc8', '#ff97a3'];
const main = document.querySelector('#main');
const header = document.querySelector('#top');
const footer = document.querySelector('#footer');
const modeNav = document.querySelector('#modes');
const legend = document.querySelector('#legend');
const legendOpen = document.querySelector('#legend-open');
let data;
let original;
let translations;
const languageToggle = document.querySelector('#language-toggle');
const term = value => english() ? (translations.terms[value] ?? value) : value;

function escapeText(value) {
  return String(value ?? '').replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function route() {
  const mode = new URLSearchParams(location.search).get('view');
  const slug = /^#nucleo\/([a-z0-9-]+)$/.exec(location.hash)?.[1];
  return { view: Object.hasOwn(modes, mode) ? mode : 'atlas',
    nucleus: data?.nuclei.find(item => item.slug === slug) };
}

function link(view, slug) {
  return (english() ? '?lang=en&view=' : '?view=') + view + (slug ? '#nucleo/' + slug : '');
}

function navigate(href) {
  if (location.search + location.hash !== href) {
    history.pushState(null, '', href);
    render(true);
  }
}

function appearance(index) {
  return 'style="--accent:' + accents[index] + '"';
}

function map(view) {
  const landscape = view === 'paisagem';
  const zones = data.nuclei.map((item, i) => {
    const x = item.map_hotspot?.x_pct ?? (i % 4 + .5) * 25;
    const y = item.map_hotspot?.y_pct ?? 20 + Math.floor(i / 4) * 30;
    return `<a class="hotspot" data-route data-island="${item.slug}" href="${link(view, item.slug)}"
      aria-label="${t('Explorar ', 'Explore ')}${escapeText(item.title)}" style="--x:${Number(x)}%;--y:${Number(y)}%;--accent:${accents[i]}">${landscape ? '' : `<span class="pin-label">${escapeText(item.title)}</span>`}</a>`;
  }).join('');
  return `<div class="scene ${landscape ? 'landscape' : ''}">
      <img src="assets/map.webp" alt="${t('Arquipélago fantástico com doze ilhas ligadas por pontes', 'A fantastical archipelago of twelve islands joined by bridges')}" width="1672" height="941" fetchpriority="high">
      ${zones}
    </div>`;
}

function atlas() {
  return `<div class="wrap atlas-view"><div class="atlas-heading"><div><p class="eyebrow">${t('Um universo em movimento', 'A universe in motion')}</p><h2>${t('Explore os mundos', 'Explore the worlds')}</h2></div><p>${t('Escolha uma ilha e atravesse suas histórias.', 'Pick an island and find your way through its stories.')}</p></div>${map('atlas')}<div class="island-heading"><h2>${t('Os mundos', 'The worlds')}</h2><span>${data.nuclei.length} ${t('territórios para explorar', 'territories to explore')}</span></div><ul class="atlas-list" aria-label="${t('Núcleos do atlas', 'Atlas worlds')}">
    ${data.nuclei.map((item, i) => `<li ${appearance(i)}><a data-route href="${link('atlas', item.slug)}">
      <img class="island-thumb" src="${item.art.hero}" alt="" loading="lazy" decoding="async"><span class="island-name">${escapeText(item.title)}</span><small>${countWorks(item.works.length)}</small><span class="island-open" aria-hidden="true">✦</span></a></li>`).join('')}
    </ul></div>`;
}

function readableStatus(status) {
  return escapeText(String(status ?? t('indeterminado','undetermined')).replaceAll('_', ' '));
}

function workCard(work) {
  const progress = work.progress_editorial_pct;
  const measured = typeof progress === 'number' && progress >= 0 && progress <= 100;
  const preserved = work.preservation;
  return `<article class="work">
    <div class="work-heading"><strong>${escapeText(work.title)}</strong><span class="metrics">
      ${measured ? `<span aria-label="${progress}% ${t('de avanço editorial estimado', 'estimated editorial progress')}">${progress}%</span>` : ''}
      <span class="chip" aria-label="${escapeText(term(work.provenance_label))}" title="${escapeText(term(work.provenance_label))}">${escapeText(work.provenance_short ?? '?')}</span></span></div>
    ${measured ? `<span class="bar" role="progressbar" aria-label="${t('Avanço editorial estimado', 'Estimated editorial progress')}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${progress}" style="--progress:${progress}%"></span>` : ''}
    ${preserved ? `<p><strong>${Number(preserved.preserved)}/${Number(preserved.total)}</strong> ${t('textos preservados', 'texts preserved')}</p>` : ''}
    <details>
      <summary aria-label="${t('Dados editoriais de ', 'Editorial details for ')}${escapeText(work.title)}">${t('Dados editoriais', 'Editorial details')}</summary>
      <p>${escapeText(term(work.provenance_label) ?? t('Proveniência indeterminada','Undetermined provenance'))} · ${readableStatus(term(work.manuscript_status))}</p>
      ${measured ? `<p>${t('Confiança no avanço editorial: ', 'Confidence in editorial progress: ')}${readableStatus(term(work.progress_confidence))}.</p>` : ''}
      ${work.provenance_confidence ? `<p>${t('Confiança na proveniência: ', 'Confidence in drafting provenance: ')}${readableStatus(term(work.provenance_confidence))}.</p>` : ''}
      ${work.publication_status ? `<p>${readableStatus(term(work.publication_status))}</p>` : ''}
      ${work.footnote ? `<p>${escapeText(term(work.footnote))}</p>` : ''}
    </details>
  </article>`;
}

function catalog() {
  const total = data.nuclei.reduce((count, item) => count + item.works.length, 0);
  return `<div class="wrap"><p class="eyebrow">${data.nuclei.length} ${t('núcleos · ', 'worlds · ')}${total}${t(' entradas', ' entries')}</p><h2>${t('Todas as obras', 'All works')}</h2>
    <p class="intro">${t('Os percentuais indicam maturidade editorial estimada. Abra cada ficha para consultar o estado da redação e as notas editoriais.', 'Percentages estimate editorial maturity. Open a card to see the state of the draft and its editorial notes.')}</p>
    <button class="pill" data-legend type="button" aria-haspopup="dialog">${indicatorPrompt()}</button>
    <div class="catalog">${data.nuclei.map((item, i) => `<section class="collection" ${appearance(i)}>
      <h3><a data-route href="${link('todos', item.slug)}">${escapeText(item.title)}</a></h3>
      ${item.works.map(workCard).join('')}</section>`).join('')}</div></div>`;
}

function detail(view, item) {
  const index = data.nuclei.indexOf(item);
  const previous = data.nuclei.at(index - 1);
  const next = data.nuclei[(index + 1) % data.nuclei.length];
  const hero = 'assets/' + String(index + 1).padStart(2, '0') + '.webp';
  return `<div class="wrap" ${appearance(index)}>
    <nav class="crumb" aria-label="${t('Localização', 'Breadcrumb')}"><a data-route href="${link('atlas')}">${atlasName()}</a>
      <span aria-hidden="true">›</span><span aria-current="page">${escapeText(item.title)}</span></nav>
    <div class="detail-actions">
      <a class="pill" data-route href="${link(view)}">${view === 'todos' ? t('Voltar a Todos','Back to all works') : view === 'paisagem' ? t('Voltar à paisagem','Back to the landscape') : backToAtlas()}</a>
      ${view === 'atlas' ? '' : `<a class="pill" data-route href="${link('atlas')}">${backToAtlas()}</a>`}
      <button class="pill" id="art-toggle" type="button" aria-pressed="false">${artOnlyLabel()}</button>
    </div>
    <figure class="hero"><div class="hero-image"><img src="${hero}" alt="${t('Ilustração de ', 'Illustration of ')}${escapeText(item.title)}" loading="lazy" decoding="async" width="1672" height="941"></div>
      <figcaption><p class="eyebrow">${t('Um mundo da ecologia autoral', 'A world in the writing ecology')}</p><h2>${escapeText(item.title)}</h2><p class="intro">${escapeText(item.short_intro)}</p></figcaption>
    </figure>
    <div class="works-heading"><h2>${t('Obras deste mundo', 'Works in this world')}</h2><span>${countWorks(item.works.length)}</span></div><section class="detail-works" aria-label="${t('Obras de ', 'Works in ')}${escapeText(item.title)}">${item.works.map(workCard).join('')}</section>
    <nav class="pager" aria-label="${t('Navegação entre núcleos', 'Navigate between worlds')}">
      <a class="pill prev" data-route href="${link(view, previous.slug)}" aria-label="${t('Anterior: ', 'Previous: ')}${escapeText(previous.title)}"><span>${t('Anterior', 'Previous')}</span><strong>${escapeText(previous.title)}</strong></a>
      <a class="pill next" data-route href="${link(view, next.slug)}" aria-label="${t('Próximo núcleo: ', 'Next world: ')}${escapeText(next.title)}"><span>${t('Próximo mundo', 'Next world')}</span><strong>${escapeText(next.title)}</strong></a>
    </nav></div>`;
}

function render(moveFocus = false) {
  data = english() ? {
    ...original,
    nuclei: original.nuclei.map(world => ({ ...world, ...translations.nuclei[world.slug] })),
  } : original;
  localizePage();
  const { view, nucleus } = route();
  const clean = view === 'paisagem' && !nucleus;
  header.hidden = footer.hidden = clean;
  modeNav.innerHTML = Object.entries(modes).map(([key, title]) => `<a data-route
    href="${link(key)}" ${key === view ? 'aria-current="true"' : ''}>${t(title, ({paisagem:'Landscape',atlas:'Atlas',todos:'All works'})[key])}</a>`).join('');
  main.classList.remove('arrive');
  main.innerHTML = nucleus ? detail(view, nucleus) : view === 'todos' ? catalog() : clean
    ? `${map('paisagem')}<a class="pill exit" data-route href="${link('atlas')}">${backToAtlas()}</a>`
    : atlas();
  requestAnimationFrame(() => main.classList.add('arrive'));
  document.title = (nucleus ? nucleus.title + ' · ' : '') + atlasName() + ' · Lua Helena Moon Martins Cardoso';
  if (moveFocus) {
    main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: 'instant' });
  }
}

legendOpen.addEventListener('click', () => legend.showModal());
document.addEventListener('click', event => {
  if (event.target.closest('#language-toggle') && !event.ctrlKey && !event.metaKey &&
      !event.shiftKey && !event.altKey) {
    event.preventDefault();
    const expandedCards = [...main.querySelectorAll('.work details')].map(card => card.open);
    const artOnly = main.querySelector('#art-toggle')?.getAttribute('aria-pressed') === 'true';
    history.pushState(null, '', languageToggle.href);
    render();
    main.querySelectorAll('.work details').forEach((card, index) => { card.open = expandedCards[index]; });
    if (artOnly) main.querySelector('#art-toggle')?.click();
    return;
  }
  const anchor = event.target.closest('a[data-route]');
  if (anchor && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
    event.preventDefault();
    navigate(anchor.getAttribute('href'));
    return;
  }
  if (event.target.closest('[data-legend]')) legend.showModal();
  const toggle = event.target.closest('#art-toggle');
  if (toggle) {
    const active = toggle.getAttribute('aria-pressed') !== 'true';
    toggle.setAttribute('aria-pressed', String(active));
    toggle.textContent = active ? t('Mostrar fichas','Show work cards') : artOnlyLabel();
    main.querySelector('figcaption').hidden = active;
    main.querySelector('.detail-works').hidden = active;
    main.querySelector('.works-heading').hidden = active;
    main.querySelector('.hero').classList.toggle('art-only', active);
  }
});

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape' || legend.open || !data) return;
  const { view, nucleus } = route();
  if (nucleus || view === 'paisagem') navigate(link(nucleus ? view : 'atlas'));
});

window.addEventListener('popstate', () => data && render(true));
window.addEventListener('hashchange', () => data && render(true));

async function init() {
  try {
    const responses = await Promise.all(['atlas-data.json', 'atlas-en.json'].map(file => fetch(file)));
    if (responses.some(response => !response.ok)) throw new Error('Atlas data unavailable');
    [original, translations] = await Promise.all(responses.map(response => response.json()));
    render();
  } catch (error) {
    main.textContent = t('Não foi possível carregar o atlas.', 'The atlas could not be loaded.');
    console.error(error);
  }
}
init();
