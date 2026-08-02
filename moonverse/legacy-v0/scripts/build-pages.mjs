import fs from 'node:fs';
import path from 'node:path';

const args = new Set(process.argv.slice(2));
const checkOnly = args.has('--check');
const root = path.resolve(new URL('..', import.meta.url).pathname);
const pagesJsonPath = path.join(root, 'data', 'pages.json');
const manifestPath = path.join(root, 'data', 'manifest.json');
const pagesDir = path.join(root, 'pages');

const pages = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
fs.mkdirSync(pagesDir, { recursive: true });

function escapeAttr(value = '') {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function htmlFor(id, page) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeAttr(page.title)} · True Moonverse</title>
  <meta name="description" content="${escapeAttr(page.dek)}" />
  <meta property="og:title" content="${escapeAttr(page.title)} · True Moonverse" />
  <meta property="og:description" content="${escapeAttr(page.dek)}" />
  <meta property="og:type" content="article" />
  <link rel="stylesheet" href="../styles.css" />
  <link rel="stylesheet" href="../editorial.css" />
</head>
<body data-page-id="${id}" class="moon-page">
  <div class="ambient" aria-hidden="true"></div>
  <header class="topbar">
    <a class="brand" href="../index.html">
      <span class="brand-mark">☾</span>
      <span><strong>True Moonverse</strong><small>página física</small></span>
    </a>
    <nav class="topnav" aria-label="Navegação da página">
      <a href="../index.html#palace">Mansão</a>
      <a href="../index.html#atlas">Atlas</a>
      <a href="../index.html#devices">Memórias</a>
    </nav>
  </header>
  <main class="section-pad page-main">
    <div class="section-heading split-heading">
      <div><p class="eyebrow">Lunar Editorial Wiki</p><h2>Página Moonverse</h2></div>
    </div>
    <div id="article-shell" class="article-shell">
      <nav class="left-rail" aria-label="Índice da página"><strong>Índice</strong><ol id="toc"></ol></nav>
      <article id="article-view" class="article-view" aria-live="polite"></article>
      <aside id="infobox" class="right-rail" aria-label="Ficha Moonpedia"></aside>
    </div>
  </main>
  <script src="../page.js"></script>
</body>
</html>
`;
}

const drift = [];
for (const [id, page] of Object.entries(pages)) {
  const wrapper = manifest.pages?.[id]?.wrapper || `pages/${id}.html`;
  const filePath = path.join(root, wrapper);
  const expected = htmlFor(id, page);
  const exists = fs.existsSync(filePath);
  const current = exists ? fs.readFileSync(filePath, 'utf8') : '';

  if (current !== expected) {
    drift.push(wrapper);
    if (!checkOnly) {
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
      fs.writeFileSync(filePath, expected);
      console.log(`${exists ? 'updated' : 'created'} ${wrapper}`);
    }
  }
}

if (checkOnly && drift.length) {
  console.error('Moonverse page wrapper drift detected:');
  for (const file of drift) console.error(`- ${file}`);
  process.exit(1);
}

if (!drift.length) console.log('Moonverse page wrappers are in sync.');
