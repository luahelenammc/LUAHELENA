import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(new URL('..', import.meta.url).pathname);
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');
const readJson = (p) => JSON.parse(fs.readFileSync(path.join(sourceRoot, p), 'utf8'));

const entries = readJson('data/entries.json');
const wings = readJson('data/wings.json');
const concepts = readJson('data/concepts.json');
const relations = readJson('data/relations.json');
const paths = readJson('data/paths.json');
const ledger = readJson('data/migration-ledger.json');
const errors = [];
const publishablePrivacy = new Set(['public', 'sanitized_approved']);
const wingIds = new Set(wings.map((wing) => wing.id));
const conceptIds = new Set(concepts.map((concept) => concept.id));
const ids = new Set();
const slugs = new Set();
const publicEntries = [];
const publicEntryIds = new Set();
const relationIds = new Set();
const requiredEditorialFields = [
  'editorial_state',
  'source_authority',
  'source_refs',
  'sensitivity',
  'sanitization_required',
  'sanitization_notes',
  'publication_rationale',
  'reviewed_by_moon',
  'reviewed_at',
  'relation_review_state',
  'visual_state',
  'next_action'
];

const isPublic = (entry) => (
  entry.status === 'published'
  && publishablePrivacy.has(entry.privacy)
  && entry.publication_approved === true
);

for (const entry of entries) {
  if (!entry.id || ids.has(entry.id)) errors.push(`duplicate or missing entry id: ${entry.id || '(empty)'}`);
  if (!entry.slug || slugs.has(entry.slug)) errors.push(`duplicate or missing entry slug: ${entry.slug || '(empty)'}`);
  ids.add(entry.id);
  slugs.add(entry.slug);
  if (!wingIds.has(entry.wing)) errors.push(`${entry.id} points to missing wing ${entry.wing}`);
  if (!entry.title || !entry.summary || !entry.lead || !entry.body_markdown) errors.push(`${entry.id} lacks title, summary, lead or body_markdown`);
  for (const field of requiredEditorialFields) {
    if (entry[field] === undefined || entry[field] === null || entry[field] === '') errors.push(`${entry.id} lacks required editorial field ${field}`);
  }
  if (!Array.isArray(entry.source_refs) || !entry.source_refs.length) errors.push(`${entry.id} lacks source_refs`);
  if (entry.privacy === 'sanitized_approved' && (!entry.sanitization_required || !entry.sanitization_notes)) {
    errors.push(`${entry.id} is sanitized_approved without sanitization notes`);
  }
  if (isPublic(entry)) {
    publicEntries.push(entry);
    publicEntryIds.add(entry.id);
    if (!entry.source_authority || /unknown|inferred|unspecified/i.test(entry.source_authority)) errors.push(`public entry ${entry.id} lacks named source authority`);
    if (entry.reviewed_by_moon !== true || !entry.reviewed_at) errors.push(`public entry ${entry.id} lacks Moon review receipt`);
    if (!entry.relation_review_state || !entry.visual_state || !entry.next_action) errors.push(`public entry ${entry.id} lacks editorial receipt fields`);
  }
}

for (const concept of concepts) {
  if (!concept.id || conceptIds.has(concept.id) && concepts.filter((item) => item.id === concept.id).length > 1) errors.push(`duplicate or missing concept id: ${concept.id || '(empty)'}`);
  if (!concept.title || !concept.summary || !concept.url) errors.push(`concept ${concept.id} lacks title, summary or url`);
}

const endpointExists = (id) => ids.has(id) || wingIds.has(id) || conceptIds.has(id);
for (const relation of relations) {
  if (!relation.id || relationIds.has(relation.id)) errors.push(`duplicate or missing relation id: ${relation.id || '(empty)'}`);
  relationIds.add(relation.id);
  if (!endpointExists(relation.source)) errors.push(`relation ${relation.id} has missing source ${relation.source}`);
  if (!endpointExists(relation.target)) errors.push(`relation ${relation.id} has missing target ${relation.target}`);
  if (!relation.evidence) errors.push(`relation ${relation.id} lacks evidence`);
  for (const endpoint of [relation.source, relation.target]) {
    if (ids.has(endpoint) && !publicEntryIds.has(endpoint)) errors.push(`relation ${relation.id} targets non-public entry ${endpoint}`);
  }
}

for (const entry of entries) {
  for (const relationId of entry.relations || []) {
    const relation = relations.find((item) => item.id === relationId);
    if (!relation) errors.push(`${entry.id} references missing relation ${relationId}`);
    else if (relation.source !== entry.id && relation.target !== entry.id) errors.push(`${entry.id} relation reference ${relationId} does not touch entry`);
  }
}

for (const pathItem of paths) {
  if (!pathItem.id || !Array.isArray(pathItem.entry_ids)) errors.push('invalid path record');
  for (const entryId of pathItem.entry_ids || []) {
    if (!ids.has(entryId)) errors.push(`path ${pathItem.id} points to missing entry ${entryId}`);
    else if (pathItem.public === true && !publicEntryIds.has(entryId)) errors.push(`public path ${pathItem.id} points to non-public entry ${entryId}`);
  }
  if (pathItem.public === true && pathItem.entry_ids.length < 2) errors.push(`public path ${pathItem.id} has fewer than two approved entries`);
  if (pathItem.public === true && !pathItem.next_action) errors.push(`public path ${pathItem.id} lacks next_action`);
}

if (!ledger.dispositions?.length) errors.push('migration ledger has no dispositions');
if (!fs.existsSync(path.join(siteRoot, 'legacy-v0'))) errors.push('legacy-v0 archive is missing');
if (!fs.existsSync(path.join(siteRoot, 'assets', 'search-index.json'))) errors.push('generated search index is missing; run build first');

const dispositionCounts = {};
for (const disposition of ledger.dispositions || []) {
  dispositionCounts[disposition.kind] = (dispositionCounts[disposition.kind] || 0) + 1;
  if (!disposition.id || !disposition.reason || !disposition.next_action) errors.push(`ledger disposition ${disposition.id || '(empty)'} lacks id, reason or next_action`);
}
if (ledger.summary?.dispositions_total !== ledger.dispositions?.length) errors.push('migration summary dispositions_total conflicts with actual dispositions');
for (const [kind, count] of Object.entries(dispositionCounts)) {
  if (ledger.summary?.disposition_counts?.[kind] !== count) errors.push(`migration summary count for ${kind} conflicts with actual dispositions`);
}
if (ledger.summary?.legacy_page_records !== dispositionCounts.legacy_page) errors.push('legacy page count is not 17 actual registry records');
if (ledger.summary?.legacy_page_structural_superseded !== (ledger.dispositions || []).filter((item) => item.kind === 'legacy_page' && item.disposition === 'superseded_structural').length) errors.push('structural superseded count conflicts with ledger');
if (ledger.summary?.legacy_page_content_intent_records !== ledger.summary?.legacy_page_records - ledger.summary?.legacy_page_structural_superseded) errors.push('content-intent count does not reconcile with legacy page count');
if (ledger.summary?.notion_disposition_records !== (dispositionCounts.notion_snapshot || 0) + (dispositionCounts.notion_record || 0)) errors.push('Notion disposition count conflicts with ledger');
const safeDisposition = new Set(['published', 'published_batch_a1', 'published_batch_a1_annotated', 'migrated', 'absorbed_published', 'superseded_structural']);
const deferredCount = (ledger.dispositions || []).filter((item) => !safeDisposition.has(item.disposition)).length;
if (ledger.summary?.deferred_or_review_required !== deferredCount) errors.push('deferred/review summary count conflicts with actual dispositions');
if (ledger.summary?.public_entries_built !== publicEntries.length) errors.push('public entry summary count conflicts with generated public entries');
if (ledger.summary?.public_paths_built !== paths.filter((item) => item.public === true).length) errors.push('public path summary count conflicts with public paths');

const generatedFiles = [];
function collectFiles(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const itemPath = path.join(dir, item.name);
    if (item.isDirectory() && !['legacy-v0', 'review-artifacts'].includes(item.name)) collectFiles(itemPath);
    else if (item.isFile()) generatedFiles.push({ path: itemPath, text: fs.readFileSync(itemPath, 'utf8') });
  }
}
collectFiles(siteRoot);
const generatedText = generatedFiles.map(({ text }) => text).join('\n');
const forbidden = [
  /staging/i,
  /notion-imported/i,
  /página física/i,
  /page wrapper/i,
  /indexed_only/i,
  /prototype/i,
  /entry authored/i,
  /work_ready/i,
  /next_action/i,
  /reviewed_by_moon/i
];
for (const pattern of forbidden) {
  const hit = generatedFiles.find(({ text }) => pattern.test(text));
  if (hit) errors.push(`forbidden internal language reached generated output: ${pattern} in ${path.relative(siteRoot, hit.path)}`);
}
const privateUrlPattern = /https?:\/\/(?:docs\.google\.com|drive\.google\.com|[^\s"']*blogspot\.com|[^\s"']*blogger\.com|blogger\.googleusercontent\.com)/i;
if (privateUrlPattern.test(generatedText)) errors.push('private Notion/Drive/Blogger URL reached generated output');

const nonPublicEntries = entries.filter((entry) => !publicEntryIds.has(entry.id));
for (const entry of nonPublicEntries) {
  for (const needle of [entry.id, entry.slug, entry.title]) {
    if (needle && generatedText.includes(needle)) errors.push(`non-public entry leaked into generated output: ${needle}`);
  }
}
if (generatedText.includes('timeline-lunar')) errors.push('timeline-lunar returned as a public article record');

for (const entry of publicEntries) {
  const articlePath = path.join(siteRoot, 'entry', entry.slug, 'index.html');
  if (!fs.existsSync(articlePath)) errors.push(`public entry missing generated article: ${entry.slug}`);
  else {
    const article = fs.readFileSync(articlePath, 'utf8');
    if (!article.includes('<article class="article">')) errors.push(`article is not semantic HTML: ${entry.slug}`);
    if (!article.includes('article-toc')) errors.push(`article lacks table of contents: ${entry.slug}`);
    if (!article.includes('source-notes')) errors.push(`article lacks source notes: ${entry.slug}`);
  }
}

const searchIndex = JSON.parse(fs.readFileSync(path.join(siteRoot, 'assets', 'search-index.json'), 'utf8'));
const searchIds = new Set(searchIndex.map((item) => item.id));
for (const entry of publicEntries) if (!searchIds.has(entry.id)) errors.push(`public entry missing from search index: ${entry.id}`);
for (const item of searchIndex) if (!publicEntryIds.has(item.id)) errors.push(`non-public entry leaked into search index: ${item.id}`);
const graph = JSON.parse(fs.readFileSync(path.join(siteRoot, 'assets', 'graph.json'), 'utf8'));
const graphNodeIds = new Set((graph.nodes || []).map((node) => node.id));
for (const link of graph.links || []) {
  if (!graphNodeIds.has(link.source) || !graphNodeIds.has(link.target)) errors.push(`graph relation has missing node: ${link.id || `${link.source}->${link.target}`}`);
}
for (const node of graph.nodes || []) if (node.kind === 'entry' && !publicEntryIds.has(node.id.replace(/^entry:/, ''))) errors.push(`non-public entry leaked into graph: ${node.id}`);

const homePath = path.join(siteRoot, 'index.html');
const wikiPath = path.join(siteRoot, 'wiki', 'index.html');
if (fs.existsSync(homePath) && fs.existsSync(wikiPath)) {
  const home = fs.readFileSync(homePath, 'utf8');
  const wiki = fs.readFileSync(wikiPath, 'utf8');
  const anchors = [...home.matchAll(/href="\/moonverse\/wiki\/#([^"]+)"/g)].map((match) => match[1]);
  for (const anchor of anchors) if (!wiki.includes(`id="${anchor}"`)) errors.push(`home points to missing wiki anchor: ${anchor}`);
  for (const entry of publicEntries) if (!wiki.includes(`/moonverse/entry/${entry.slug}/`)) errors.push(`Wiki does not conventionally link to public entry: ${entry.id}`);
}

const internalHrefs = [...generatedText.matchAll(/href="(\/moonverse\/[^"#?]*)[^" ]*"/g)].map((match) => match[1]);
for (const href of new Set(internalHrefs)) {
  const relative = href.replace(/^\/moonverse\/?/, '');
  const candidate = relative ? (relative.endsWith('/') ? path.join(siteRoot, relative, 'index.html') : path.join(siteRoot, relative)) : path.join(siteRoot, 'index.html');
  if (!fs.existsSync(candidate)) errors.push(`internal href points to missing artifact: ${href}`);
}

const css = fs.existsSync(path.join(siteRoot, 'assets', 'site.css')) ? fs.readFileSync(path.join(siteRoot, 'assets', 'site.css'), 'utf8') : '';
if (!/@media/.test(css) || !/prefers-reduced-motion/.test(css)) errors.push('generated CSS lacks responsive or reduced-motion rules');
if (!generatedFiles.some(({ path: filePath }) => filePath.endsWith('search/index.html'))) errors.push('search route is missing');

if (errors.length) {
  console.error('Moonverse validation failed:');
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}

console.log(`Moonverse validation passed: ${publicEntries.length} public entries; ${paths.filter((item) => item.public === true).length} public paths; ${relations.length} evidenced relations; ${ledger.dispositions.length} ledger dispositions; no publication leakage detected.`);
