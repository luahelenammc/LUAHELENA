'use strict';

const english = () => new URLSearchParams(location.search).get('lang') === 'en';
const t = (pt, en) => english() ? en : pt;
const atlasName = () => t('Mapa de Escritos', 'Writings Atlas');
const indicatorPrompt = () => t('O que significam os indicadores?', 'What do the indicators mean?');
const backToAtlas = () => t('Voltar ao atlas', 'Back to the atlas');
const artOnlyLabel = () => t('Ver só a arte', 'Show only the artwork');
const countWorks = count => count + ' ' + (count === 1 ? t('obra', 'work') : t('obras', 'works'));

const englishProvenance = [
  'Historical human drafting',
  'Human-written fragment with limited AI editing. Provenance of the full collection is undetermined.',
  'Mixed drafting provenance, identified or probable',
  'Documented AI drafting',
  'Likely assisted drafting throughout',
  'Predominantly AI-drafted',
  'Undetermined provenance',
  'No canonical manuscript',
];

function localizePage() {
  const lang = t('pt-BR', 'en');
  document.documentElement.lang = lang;
  const url = new URL(location.href);
  if (english()) url.searchParams.delete('lang');
  else url.searchParams.set('lang', 'en');
  languageToggle.href = url.pathname + url.search + url.hash;
  languageToggle.lang = t('en', 'pt-BR');
  languageToggle.textContent = t('EN', 'PT');
  languageToggle.setAttribute('aria-label', t('Read in English', 'Ler em português'));
  document.querySelector('.identity h1').textContent = atlasName();
  modeNav.setAttribute('aria-label', t('Modo de apresentação', 'Display mode'));
  legendOpen.textContent = indicatorPrompt();
  legend.querySelector('h2').textContent = t('Como ler o atlas', 'How to read the atlas');
  const close = legend.querySelector('button');
  close.textContent = t('Fechar', 'Close');
  close.setAttribute('aria-label', t('Fechar legenda', 'Close legend'));
  const [progress, origin] = legend.querySelectorAll('p');
  progress.textContent = t(
    'O avanço editorial é uma estimativa que combina planejamento, manuscrito, estrutura, pesquisa, humanização, validação autoral e preparação editorial. A escala vai de semente (0–19%) a inicial (20–39%), intermediária (40–59%), avançada (60–79%) e alta maturidade (80–100%).',
    'Editorial progress is an estimate that brings together planning, drafting, structure, research, refinement of the prose, author review and preparation for publication. The scale runs from seed (0–19%) through early (20–39%), intermediate (40–59%) and advanced (60–79%) to high maturity (80–100%).',
  );
  origin.textContent = t(
    'Os indicadores de proveniência descrevem a origem da redação. Lua Helena Moon Martins Cardoso governa as ideias, experiências, mundos e decisões autorais.',
    'The provenance markers describe how the prose was drafted. The ideas, lived experiences, worlds and authorial decisions belong to Lua Helena Moon Martins Cardoso.',
  );
  const date = new Intl.DateTimeFormat(lang, { dateStyle: 'long', timeZone: 'UTC' })
    .format(new Date(data.snapshot_at + 'T12:00:00Z'));
  document.querySelector('#snapshot').textContent = t('Dados de ', 'Data from ') + date + t(' · recorte de trabalho', ' · working snapshot');
  document.querySelector('#provenance-legend').innerHTML = provenance.map(([short, meaning], i) =>
    `<dt>${short}</dt><dd>${t(meaning, englishProvenance[i])}</dd>`).join('');
  document.querySelector('#source-note').textContent = t(
    'Referência editorial de ' + date + '. ' + data.source_label + '. Dados sujeitos a revisão antes da publicação.',
    'Editorial snapshot from ' + date + '. Authorial Ecology, Living Editorial Observatory and Drafting Provenance. Data subject to review before publication.',
  );
  const description = t('Explore os doze mundos da escrita de Lua Helena Moon Martins Cardoso.',
    'Explore the twelve worlds of Lua Helena Moon Martins Cardoso’s writing.');
  document.querySelector('meta[name="description"]').content = description;
  document.querySelector('meta[property="og:description"]').content = description;
  document.querySelector('meta[property="og:title"]').content = atlasName();
  document.querySelector('link[rel="canonical"]').href =
    'https://www.luahelena.com.br/escritos/' + (english() ? '?lang=en' : '');
}
