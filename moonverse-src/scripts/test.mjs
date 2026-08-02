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
const article = read('entry/o-cheiro-de-maresia/index.html');
const wiki = read('wiki/index.html');
const atlas = read('atlas/index.html');
const css = read('assets/site.css');
const searchIndex = JSON.parse(read('assets/search-index.json'));

assert(home.includes('O que você está buscando?'), 'home exposes global search');
assert(home.includes('/moonverse/wing/biblioteca-lunar/'), 'home exposes conventional wing navigation');
assert(home.includes('<title>Moonverse</title>'), 'home title is not duplicated');
assert(home.includes('/moonverse/wiki/#path-infancia-e-agua'), 'home exposes a real curated path');
assert(wiki.includes('id="path-infancia-e-agua"'), 'wiki renders the curated path target');
assert(!home.includes('path-transicao-e-presenca'), 'empty curated paths are not advertised');
assert(article.includes('<article class="article">'), 'article is semantic HTML');
assert(article.includes('<h2 id="a-cena">A cena</h2>'), 'article preserves Markdown heading structure');
assert(article.includes('<blockquote>'), 'article preserves Markdown quotation structure');
assert(article.includes('Origem: texto autoral.'), 'article uses public source language');
assert(!article.includes('Entrada authored'), 'article does not leak implementation vocabulary');
assert(wiki.includes('entry-index'), 'wiki index is rendered without JavaScript');
assert(atlas.includes('atlas-svg') && atlas.includes('Lista completa'), 'Atlas has visual and textual fallback');
assert(searchIndex.length === 1 && searchIndex[0].title === 'O cheiro de maresia', 'search index contains only approved public entries');
assert(css.includes('@media') && css.includes('prefers-reduced-motion'), 'responsive and reduced-motion rules exist');
assert(!home.match(/staging|wrapper|página física|notion-imported|prototype/i), 'home has no internal workflow language');
assert(!article.match(/staging|wrapper|página física|notion-imported|prototype/i), 'article has no internal workflow language');

console.log(`Moonverse smoke tests passed: ${checks.length} checks.`);
