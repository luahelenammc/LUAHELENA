import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const dataDir = path.join(root, 'data');

function readJson(relativePath) {
  const filePath = path.join(root, relativePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

const pages = readJson('data/pages.json');
const rooms = readJson('data/rooms.json');
const memories = readJson('data/memories.json');
const manifest = readJson('data/manifest.json');
const taxonomy = readJson('data/taxonomy.json');
const privacyStates = readJson('data/privacy-states.json');
const themes = readJson('data/themes.json');

const errors = [];
const warnings = [];

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function error(message) {
  errors.push(message);
}

function warning(message) {
  warnings.push(message);
}

const requiredPageFields = ['type', 'title', 'room', 'privacy', 'source', 'updated', 'tags', 'hero', 'dek', 'caption', 'summary', 'body', 'quote'];

for (const [id, page] of Object.entries(pages)) {
  for (const field of requiredPageFields) {
    if (!(field in page)) error(`pages.${id} missing required field: ${field}`);
  }

  if (!manifest.pages[id]) error(`manifest missing page entry for: ${id}`);

  if (!Array.isArray(page.tags)) error(`pages.${id}.tags must be array`);
  if (!Array.isArray(page.summary)) error(`pages.${id}.summary must be array`);
  if (!Array.isArray(page.body)) error(`pages.${id}.body must be array`);

  if (Array.isArray(page.body)) {
    page.body.forEach((section, index) => {
      if (!section.heading || !section.text) error(`pages.${id}.body[${index}] must have heading and text`);
    });
  }
}

for (const [id, meta] of Object.entries(manifest.pages)) {
  if (!pages[id]) error(`manifest.pages.${id} points to missing pages.json entry`);
  if (!taxonomy.page_status.includes(meta.status)) error(`manifest.pages.${id}.status invalid: ${meta.status}`);
  if (!privacyStates[meta.privacy_state]) error(`manifest.pages.${id}.privacy_state invalid: ${meta.privacy_state}`);
  if (!themes[meta.theme_id]) error(`manifest.pages.${id}.theme_id invalid: ${meta.theme_id}`);
  if (!meta.wrapper) error(`manifest.pages.${id} missing wrapper`);
  if (meta.wrapper && !exists(meta.wrapper)) error(`manifest.pages.${id}.wrapper missing file: ${meta.wrapper}`);
}

for (const room of rooms) {
  if (!room.id || !room.title || !room.links) error(`room missing id/title/links: ${JSON.stringify(room)}`);
  if (!taxonomy.room_ids.includes(room.id)) warning(`room id not in taxonomy.room_ids: ${room.id}`);
  for (const link of room.links || []) {
    if (!pages[link.page]) error(`room ${room.id} links to missing page: ${link.page}`);
  }
}

for (const memory of memories) {
  if (!memory.id || !memory.title || !memory.page) error(`memory missing id/title/page: ${JSON.stringify(memory)}`);
  if (!Array.isArray(memory.tags)) error(`memory ${memory.id} tags must be array`);
  if (!pages[memory.page]) error(`memory ${memory.id} points to missing page: ${memory.page}`);
}

const wrapperFiles = fs.readdirSync(path.join(root, 'pages')).filter((file) => file.endsWith('.html'));
for (const file of wrapperFiles) {
  const id = file.replace(/\.html$/, '');
  if (!pages[id]) warning(`wrapper has no pages.json entry: pages/${file}`);
}

if (warnings.length) {
  console.warn('\nMoonverse validation warnings:');
  for (const item of warnings) console.warn(`- ${item}`);
}

if (errors.length) {
  console.error('\nMoonverse validation errors:');
  for (const item of errors) console.error(`- ${item}`);
  process.exit(1);
}

console.log(`Moonverse validation passed: ${Object.keys(pages).length} pages, ${rooms.length} rooms, ${memories.length} memories.`);
