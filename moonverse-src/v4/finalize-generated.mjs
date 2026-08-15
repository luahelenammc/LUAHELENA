import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('.', import.meta.url).pathname);
const siteRoot = path.resolve(root, '..', '..', 'moonverse');
const manifestPath = path.join(siteRoot, '.generated-files.json');
const files = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const v4 = [
  'room/biblioteca-lunar/index.html',
  'room/quarto-nostalgico/index.html',
  'room/observatorio-nexus/index.html',
  'room/jardim-santuario/index.html',
  'room/espelho-dagua/index.html',
  'room/atelie-de-lithia/index.html',
  'room/cinema-musica/index.html',
  'room/consultorio-warroom/index.html',
  'albums/index.html',
  'memory/index.html',
  'assets/v4.css',
  'assets/v4-core.css',
  'assets/v4-hall.css',
  'assets/v4-room.css',
  'assets/v4-surface.css',
  'assets/v4-memory.css',
  'assets/v4-responsive.css',
  'assets/v4.js'
];
for (const rel of v4) if (!files.includes(rel)) files.push(rel);
fs.writeFileSync(manifestPath, JSON.stringify(files, null, 2) + '\n');
console.log(`Moonverse V4 generated-file manifest finalized: ${files.length} tracked paths.`);
