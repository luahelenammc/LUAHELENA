import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(new URL('..', import.meta.url).pathname);
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');
const read = (p) => fs.readFileSync(path.join(siteRoot, p), 'utf8');
const checks = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks.push(message);
}

const home = read('index.html');
const wiki = read('wiki/index.html');
const atlas = read('atlas/index.html');
const css = read('assets/site.css');
const siteJs = read('assets/site.js');
const searchIndex = JSON.parse(read('assets/search-index.json'));
const entryRoutes = [
  ['o-cheiro-de-maresia', 'O cheiro de maresia'],
  ['moon-source', 'Moon Source'],
  ['the-sims-1-como-casa-mental', 'The Sims 1 como casa mental'],
  ['orkut-msn-e-o-quarto-paralelo', 'Orkut, MSN e o quarto paralelo'],
  ['tecnologia-snes-olympus-d395-infancia-digital', 'Tecnologia, SNES e Olympus D395: a infância digital'],
  ['ecologia-espiritual', 'Ecologia espiritual'],
  ['me-tornando-eu-mesma', 'Me tornando eu mesma'],
  ['nome-e-presenca', 'Nome e presença'],
  ['casa-arca', 'Casa-arca'],
  ['hecate-no-portao', 'Hécate no portão'],
  ['cronicas-de-lithia', 'Crônicas de Líthia']
];

assert(home.includes('O que você está buscando?'), 'home exposes global search');
assert(home.includes('/moonverse/wing/biblioteca-lunar/'), 'home exposes conventional wing navigation');
assert(home.includes('<title>Moonverse</title>'), 'home title is not duplicated');
assert(home.includes('/moonverse/wiki/#path-tecnologias-que-ainda-brilham'), 'home exposes the approved Batch A1 path');
assert(home.includes('/moonverse/wiki/#path-transicao-e-presenca'), 'home exposes the approved identity path');
assert(home.includes('/moonverse/wiki/#path-santuario-limiar-futuro'), 'home exposes the approved sanctuary path');
assert(wiki.includes('id="path-tecnologias-que-ainda-brilham"'), 'wiki renders the approved Batch A1 path target');
assert(wiki.includes('id="path-transicao-e-presenca"'), 'wiki renders the approved identity path target');
assert(wiki.includes('id="path-santuario-limiar-futuro"'), 'wiki renders the approved sanctuary path target');
assert(!home.includes('path-infancia-e-agua') && !wiki.includes('id="path-infancia-e-agua"'), 'insufficient paths are not advertised');
assert(wiki.includes('entry-index'), 'wiki index is rendered without JavaScript');
assert(atlas.includes('atlas-svg') && atlas.includes('Lista completa'), 'Atlas has visual and textual fallback');
assert(atlas.includes('Portal Moonverse'), 'Atlas renders approved concept nodes');
assert(searchIndex.length === entryRoutes.length, 'search index contains exactly the approved public entries');
for (const [slug, title] of entryRoutes) {
  const article = read(`entry/${slug}/index.html`);
  assert(article.includes('<article class="article">'), `${slug} is semantic HTML`);
  assert(article.includes('<div class="prose">'), `${slug} has JS-independent article prose`);
  assert(article.includes('source-notes'), `${slug} has a source note`);
  assert(article.includes(title), `${slug} preserves its approved title`);
  assert(!article.match(/staging|wrapper|página física|notion-imported|prototype|work_ready|reviewed_by_moon/i), `${slug} has no internal workflow language`);
}
assert(searchIndex.every((item) => entryRoutes.some(([slug, title]) => item.title === title && item.url.includes(slug))), 'search index routes every approved entry');
assert(css.includes('@media') && css.includes('prefers-reduced-motion'), 'responsive and reduced-motion rules exist');
assert(siteJs.includes('prefers-color-scheme: dark'), 'first visit respects operating-system theme preference');
assert(siteJs.includes('if (!response.ok)'), 'search rejects failed index responses');
assert(!home.match(/staging|wrapper|página física|notion-imported|prototype|work_ready|reviewed_by_moon/i), 'home has no internal workflow language');

console.log(`Moonverse smoke tests passed: ${checks.length} checks.`);
