import json
from collections import Counter
from pathlib import Path

payload_path = Path('.moonverse-c1-payload.json')
payload = json.loads(payload_path.read_text(encoding='utf-8'))
data_root = Path('moonverse-src/data')

def read(name):
    return json.loads((data_root / name).read_text(encoding='utf-8'))

def write(name, value):
    (data_root / name).write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')

entries = read('entries.json')
existing_entry_ids = {item['id'] for item in entries}
new_entry_ids = {item['id'] for item in payload['entries']}
if existing_entry_ids & new_entry_ids:
    raise SystemExit(f'duplicate entry IDs: {sorted(existing_entry_ids & new_entry_ids)}')
entries.extend(payload['entries'])
write('entries.json', entries)

relations = read('relations.json')
existing_relation_ids = {item['id'] for item in relations}
new_relation_ids = {item['id'] for item in payload['relations']}
if existing_relation_ids & new_relation_ids:
    raise SystemExit(f'duplicate relation IDs: {sorted(existing_relation_ids & new_relation_ids)}')
relations.extend(payload['relations'])
write('relations.json', relations)

paths = read('paths.json')
existing_path_ids = {item['id'] for item in paths}
new_path_ids = {item['id'] for item in payload['paths']}
if existing_path_ids & new_path_ids:
    raise SystemExit(f'duplicate path IDs: {sorted(existing_path_ids & new_path_ids)}')
paths.extend(payload['paths'])
write('paths.json', paths)

ledger = read('migration-ledger.json')
for update in payload['legacy_page_updates']:
    matches = [item for item in ledger['dispositions'] if item['kind'] == update['kind'] and item['id'] == update['id']]
    if len(matches) != 1:
        raise SystemExit(f'ledger target mismatch for {(update["kind"], update["id"])}: {len(matches)}')
    matches[0].update(update)
existing_ledger_keys = {(item['kind'], item['id']) for item in ledger['dispositions']}
for item in payload['new_ledger_records']:
    key = (item['kind'], item['id'])
    if key in existing_ledger_keys:
        raise SystemExit(f'duplicate ledger key: {key}')
    ledger['dispositions'].append(item)
    existing_ledger_keys.add(key)

counts = Counter(item['kind'] for item in ledger['dispositions'])
structural = sum(1 for item in ledger['dispositions'] if item['kind'] == 'legacy_page' and item['disposition'] == 'superseded_structural')
safe = {'published', 'published_batch_a1', 'published_batch_a1_annotated', 'migrated', 'absorbed_published', 'superseded_structural'}
public_entries = [item for item in entries if item.get('status') == 'published' and item.get('privacy') in {'public', 'sanitized_approved'} and item.get('publication_approved') is True]
public_paths = [item for item in paths if item.get('public') is True]
summary = ledger.setdefault('summary', {})
summary['dispositions_total'] = len(ledger['dispositions'])
summary['disposition_counts'] = dict(sorted(counts.items()))
summary['legacy_page_records'] = counts.get('legacy_page', 0)
summary['legacy_page_structural_superseded'] = structural
summary['legacy_page_content_intent_records'] = counts.get('legacy_page', 0) - structural
summary['notion_disposition_records'] = counts.get('notion_snapshot', 0) + counts.get('notion_record', 0)
summary['public_entries_built'] = len(public_entries)
summary['public_paths_built'] = len(public_paths)
summary['deferred_or_review_required'] = sum(1 for item in ledger['dispositions'] if item['disposition'] not in safe)
write('migration-ledger.json', ledger)

registry = read('source-registry.json')
registry.update(payload['source_registry'])
write('source-registry.json', registry)

audit = Path('moonverse-src/CURRENT_STATE_AUDIT.md')
audit.write_text(audit.read_text(encoding='utf-8') + '''

## V2 Batch C1 — 2026-08-03

Two public entries were added after Chat constitution: `lunar-citadel` and `familia-do-futuro`. Two guided paths were added: `ia-cidade-e-simbiose` and `futuro-invencao-e-pertencimento`.

The public corpus now has 13 entries. Biblioteca Lunar and Observatório Nexus each have at least two entries. Ateliê de Líthia remains intentionally sparse with one canonical entrance; a second page is deferred until Moon selects sufficient canonical Líthia material rather than allowing the build to invent lore.

This satisfies the V2 editorial-density rule through five inhabited wings plus one explicit, source-governed exception. It does not by itself authorize 3D integration.
''', encoding='utf-8')

report = Path('moonverse-src/CONTENT_MIGRATION_REPORT.md')
report.write_text(report.read_text(encoding='utf-8') + '''

## Batch C1 disposition

`Lunar Citadel` promotes the legacy Citadel intention as a public architectural synthesis with infrastructure, partners and unsupported claims excluded. `A Família do Futuro como reparação` is a new public essay derived from bounded autobiographical anchors; it does not reproduce the raw archive or private future-family scenes.
''', encoding='utf-8')

test_file = Path('moonverse-src/scripts/test.mjs')
test_file.write_text(r'''import fs from 'node:fs';
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
''', encoding='utf-8')
