import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('..', import.meta.url).pathname);
const pagesJsonPath = path.join(root, 'data', 'pages.json');
const pagesDir = path.join(root, 'pages');

const pages = JSON.parse(fs.readFileSync(pagesJsonPath, 'utf8'));
fs.mkdirSync(pagesDir, { recursive: true });

function htmlFor(id, page) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${page.title} · True Moonverse</title>
  <meta name="description" content="${page.dek.replaceAll('"', '&quot;')}" />
  <link rel="stylesheet" href="../styles.css" />
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
      <div class="reading-toggle" aria-label="Modo de leitura"><button class="chip active" id="knowledge-mode">modo conhecimento</button><button class="chip" id="reading-mode">modo leitura</button></div>
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

for (const [id, page] of Object.entries(pages)) {
  const filePath = path.join(pagesDir, `${id}.html`);
  if (fs.existsSync(filePath)) {
    console.log(`skip ${id}`);
    continue;
  }
  fs.writeFileSync(filePath, htmlFor(id, page));
  console.log(`created ${id}`);
}
