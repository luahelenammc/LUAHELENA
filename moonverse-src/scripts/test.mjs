import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(new URL('..', import.meta.url).pathname);
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');
const readSite = (p) => fs.readFileSync(path.join(siteRoot, p), 'utf8');
const readSource = (p) => JSON.parse(fs.readFileSync(path.join(sourceRoot, 'data', p), 'utf8'));
const checks = [];

function assert(condition, message) {
  if (!condition) throw new Error(message);
  checks.push(message);
}

const home = readSite('index.html');
const wiki = readSite('wiki/index.html');
const atlas = readSite('atlas/index.html');
const css = readSite('assets/site.css');
const siteJs = readSite('assets/site.js');
const searchIndex = JSON.parse(readSite('assets/search-index.json'));
const sourceEntries = readSource('entries.json');
const paths = readSource('paths.json');
const approvedEntries = sourceEntries.filter((item) => item.status === 'published' && ['public', 'sanitized_approved'].includes(item.privacy) && item.publication_approved === true);
const publicPaths = paths.filter((item) => item.public === true);
const nonPublicPaths = paths.filter((item) => item.public !== true);

assert(home.includes('O que você está buscando?'), 'home exposes global search');
assert(home.includes('/moonverse/wing/biblioteca-lunar/'), 'home exposes conventional wing navigation');
assert(home.includes('<title>Moonverse</title>'), 'home title is not duplicated');
assert(wiki.includes('entry-index'), 'wiki index is rendered without JavaScript');
assert(atlas.includes('atlas-svg') && atlas.includes('Lista completa'), 'Atlas has visual and textual fallback');
assert(atlas.includes('Portal Moonverse'), 'Atlas renders approved concept nodes');
assert(searchIndex.length === approvedEntries.length, 'search index contains exactly the approved public entries');

for (const item of searchIndex) {
  const relative = new URL(item.url, 'https://moonverse.local').pathname.replace(/^\/moonverse\//, '');
  const article = readSite(`${relative}index.html`);
  assert(article.includes('<article class="article">'), `${item.id} is semantic HTML`);
  assert(article.includes('<div class="prose">'), `${item.id} has JS-independent article prose`);
  assert(article.includes('source-notes'), `${item.id} has a source note`);
  assert(article.includes(item.title), `${item.id} preserves its approved title`);
  assert(!article.match(/staging|wrapper|página física|notion-imported|prototype|work_ready|reviewed_by_moon/i), `${item.id} has no internal workflow language`);
}

for (const item of publicPaths) {
  assert(item.entry_ids.length >= 2, `${item.id} has enough entries to be public`);
  assert(home.includes(`/moonverse/wiki/#path-${item.id}`), `${item.id} is advertised on home`);
  assert(wiki.includes(`id="path-${item.id}"`), `${item.id} is rendered in wiki`);
}

for (const item of nonPublicPaths) {
  assert(!home.includes(`path-${item.id}`) && !wiki.includes(`id="path-${item.id}"`), `${item.id} is not advertised while nonpublic`);
}

assert(searchIndex.every((item) => approvedEntries.some((entry) => entry.id === item.id && entry.title === item.title)), 'search index routes every approved entry');
assert(css.includes('@media') && css.includes('prefers-reduced-motion'), 'responsive and reduced-motion rules exist');
assert(siteJs.includes('prefers-color-scheme: dark'), 'first visit respects operating-system theme preference');
assert(siteJs.includes('if (!response.ok)'), 'search rejects failed index responses');
assert(!home.match(/staging|wrapper|página física|notion-imported|prototype|work_ready|reviewed_by_moon/i), 'home has no internal workflow language');

console.log(`Moonverse smoke tests passed: ${checks.length} checks across ${approvedEntries.length} public entries and ${publicPaths.length} public paths.`);
