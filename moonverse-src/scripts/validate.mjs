import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(new URL('..', import.meta.url).pathname);
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(sourceRoot, p), 'utf8'));

const entries = readJson('data/entries.json');
const wings = readJson('data/wings.json');
const relations = readJson('data/relations.json');
const paths = readJson('data/paths.json');
const ledger = readJson('data/migration-ledger.json');
const errors = [];
const publishablePrivacy = new Set(['public', 'sanitized_approved']);
const wingIds = new Set(wings.map((wing) => wing.id));
const ids = new Set();
const slugs = new Set();
const publicEntries = [];

for (const entry of entries) {
  if (ids.has(entry.id)) errors.push(`duplicate entry id: ${entry.id}`);
  if (slugs.has(entry.slug)) errors.push(`duplicate entry slug: ${entry.slug}`);
  ids.add(entry.id);
  slugs.add(entry.slug);
  if (!wingIds.has(entry.wing)) errors.push(`${entry.id} points to missing wing ${entry.wing}`);
  if (!entry.title || !entry.summary || !entry.body_markdown) errors.push(`${entry.id} lacks title, summary or body_markdown`);
  if (entry.status === 'published' && publishablePrivacy.has(entry.privacy) && entry.publication_approved === true) {
    publicEntries.push(entry);
  }
}

for (const relation of relations) {
  const sourceExists = ids.has(relation.source) || wingIds.has(relation.source);
  const targetExists = ids.has(relation.target) || wingIds.has(relation.target);
  if (!sourceExists) errors.push(`relation ${relation.id} has missing source ${relation.source}`);
  if (!targetExists) errors.push(`relation ${relation.id} has missing target ${relation.target}`);
}

for (const pathItem of paths) {
  if (!pathItem.id || !Array.isArray(pathItem.entry_ids)) errors.push('invalid path record');
  for (const entryId of pathItem.entry_ids || []) {
    if (!ids.has(entryId)) errors.push(`path ${pathItem.id} points to missing entry ${entryId}`);
  }
}

if (!ledger.dispositions?.length) errors.push('migration ledger has no dispositions');
if (!fs.existsSync(path.join(siteRoot, 'legacy-v0'))) errors.push('legacy-v0 archive is missing');
if (!fs.existsSync(path.join(siteRoot, 'assets', 'search-index.json'))) errors.push('generated search index is missing; run build first');

const generatedHtml = [];
function collectHtml(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory() && item.name !== 'legacy-v0') collectHtml(itemPath);
    else if (item.isFile() && item.name.endsWith('.html')) generatedHtml.push({ path: itemPath, html: fs.readFileSync(itemPath, 'utf8') });
  }
}
collectHtml(siteRoot);

const forbidden = [
  /staging/i,
  /notion-imported/i,
  /página física/i,
  /page wrapper/i,
  /indexed_only/i,
  /prototype/i,
  /\bentry authored\b/i
];
for (const pattern of forbidden) {
  const hit = generatedHtml.find(({ html }) => pattern.test(html));
  if (hit) errors.push(`forbidden internal language reached generated output: ${pattern} in ${path.relative(siteRoot, hit.path)}`);
}

for (const entry of publicEntries) {
  const articlePath = path.join(siteRoot, 'entry', entry.slug, 'index.html');
  if (!fs.existsSync(articlePath)) errors.push(`public entry missing generated article: ${entry.slug}`);
}

const searchIndex = JSON.parse(fs.readFileSync(path.join(siteRoot, 'assets', 'search-index.json'), 'utf8'));
const searchIds = new Set(searchIndex.map((item) => item.id));
for (const entry of publicEntries) {
  if (!searchIds.has(entry.id)) errors.push(`public entry missing from search index: ${entry.id}`);
}
for (const item of searchIndex) {
  if (!publicEntries.some((entry) => entry.id === item.id)) errors.push(`non-public entry leaked into search index: ${item.id}`);
}

const homePath = path.join(siteRoot, 'index.html');
const wikiPath = path.join(siteRoot, 'wiki', 'index.html');
if (fs.existsSync(homePath) && fs.existsSync(wikiPath)) {
  const home = fs.readFileSync(homePath, 'utf8');
  const wiki = fs.readFileSync(wikiPath, 'utf8');
  const anchors = [...home.matchAll(/href="\/moonverse\/wiki\/#([^"]+)"/g)].map((match) => match[1]);
  for (const anchor of anchors) {
    if (!wiki.includes(`id="${anchor}"`)) errors.push(`home points to missing wiki anchor: ${anchor}`);
  }
}

if (errors.length) {
  console.error('Moonverse validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Moonverse validation passed: ${publicEntries.length} public entries; ${ledger.dispositions.length} ledger dispositions; no publication leakage detected.`);
