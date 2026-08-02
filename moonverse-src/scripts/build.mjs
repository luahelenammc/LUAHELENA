import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(new URL('..', import.meta.url).pathname);
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');

const site = readJson('site.json');
const wings = readJson('data/wings.json').sort((a, b) => a.order - b.order);
const entries = readJson('data/entries.json');
const relations = readJson('data/relations.json');
const paths = readJson('data/paths.json');

const published = entries.filter((entry) => (
  entry.status === 'published'
  && entry.privacy === 'public'
  && entry.publication_approved === true
));
const publishedById = new Map(published.map((entry) => [entry.id, entry]));
const wingsById = new Map(wings.map((wing) => [wing.id, wing]));

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(sourceRoot, relativePath), 'utf8'));
}

function write(relativePath, content) {
  const target = path.join(siteRoot, relativePath);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
  generated.push(relativePath);
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function safeHref(value = '#') {
  const href = String(value);
  if (/^(https?:\/\/|\/moonverse\/|#)/.test(href)) return href;
  return '#';
}

function slugify(value = '') {
  return String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'secao';
}

function inlineMarkdown(value = '') {
  let html = escapeHtml(value);
  html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => `<a href="${escapeHtml(safeHref(href))}">${label}</a>`);
  html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  html = html.replace(/__([^_]+)__/g, '<strong>$1</strong>');
  html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  html = html.replace(/_([^_]+)_/g, '<em>$1</em>');
  return html;
}

function markdownToHtml(markdown = '') {
  const lines = String(markdown).replaceAll('\r\n', '\n').split('\n');
  const output = [];
  let paragraph = [];
  let list = [];
  let quote = [];
  const seenIds = new Map();

  function headingId(text) {
    const base = slugify(text);
    const count = (seenIds.get(base) || 0) + 1;
    seenIds.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  }

  function flushParagraph() {
    if (paragraph.length) {
      output.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
      paragraph = [];
    }
  }

  function flushList() {
    if (list.length) {
      output.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
      list = [];
    }
  }

  function flushQuote() {
    if (quote.length) {
      output.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`);
      quote = [];
    }
  }

  function flushAll() {
    flushParagraph();
    flushList();
    flushQuote();
  }

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    if (!line.trim()) {
      flushAll();
      continue;
    }
    const heading = line.match(/^(#{2,4})\s+(.+)$/);
    if (heading) {
      flushAll();
      const level = Math.min(4, heading[1].length);
      output.push(`<h${level} id="${headingId(heading[2])}">${inlineMarkdown(heading[2])}</h${level}>`);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet) {
      flushParagraph();
      flushQuote();
      list.push(bullet[1]);
      continue;
    }
    const quoteLine = line.match(/^>\s?(.+)$/);
    if (quoteLine) {
      flushParagraph();
      flushList();
      quote.push(quoteLine[1]);
      continue;
    }
    flushList();
    flushQuote();
    paragraph.push(line);
  }
  flushAll();
  return output.join('\n');
}

function headingsFromMarkdown(markdown = '') {
  const seen = new Map();
  return String(markdown).split(/\r?\n/)
    .map((line) => line.match(/^(#{2,4})\s+(.+)$/))
    .filter(Boolean)
    .map((match) => {
      const text = match[2];
      const base = slugify(text);
      const count = (seen.get(base) || 0) + 1;
      seen.set(base, count);
      return { level: match[1].length, text, id: count === 1 ? base : `${base}-${count}` };
    });
}

function plainText(value = '') {
  return String(value)
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*_`]/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
}

function entryUrl(entry) {
  return `/moonverse/entry/${entry.slug}/`;
}

function wingUrl(wing) {
  return `/moonverse/wing/${wing.id}/`;
}

function header(active = '') {
  const nav = [
    ['wiki', 'Wiki', '/moonverse/wiki/'],
    ['timeline', 'Linha do tempo', '/moonverse/timeline/'],
    ['atlas', 'Atlas', '/moonverse/atlas/'],
    ['about', 'Sobre', '/moonverse/about/']
  ];
  return `<a class="skip-link" href="#main-content">Pular para o conteúdo</a>
<header class="site-header">
  <div class="header-inner">
    <a class="wordmark" href="/moonverse/" aria-label="Moonverse, início">
      <span class="wordmark-mark" aria-hidden="true"><span></span></span>
      <span><strong>Moonverse</strong><small>arquivo público em formação</small></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="primary-navigation">Menu</button>
    <nav id="primary-navigation" class="primary-nav" aria-label="Navegação principal">
      ${nav.map(([id, label, href]) => `<a class="${active === id ? 'is-active' : ''}" href="${href}"${active === id ? ' aria-current="page"' : ''}>${label}</a>`).join('')}
      <button class="theme-toggle" type="button" data-theme-toggle aria-label="Alternar tema">Noite</button>
    </nav>
  </div>
</header>`;
}

function footer() {
  return `<footer class="site-footer">
  <div><strong>Moonverse</strong><span>Lua Helena Moon × Áurion</span></div>
  <div class="footer-links"><a href="/moonverse/about/">Sobre o portal</a><a href="/moonverse/wiki/">Índice</a><a href="/moonverse/atlas/">Atlas</a></div>
</footer>`;
}

function shell({ title, description, active, content, bodyClass = '', depth = 0 }) {
  const assetRoot = `${'../'.repeat(depth)}assets/`;
  return `<!doctype html>
<html lang="${site.language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(title)} · Moonverse</title>
  <meta name="description" content="${escapeHtml(description || site.description)}">
  <meta name="theme-color" content="#f3eee5">
  <link rel="stylesheet" href="${assetRoot}site.css">
</head>
<body class="${bodyClass}" data-asset-root="${assetRoot}">
${header(active)}
<main id="main-content">${content}</main>
${footer()}
<script src="${assetRoot}site.js" defer></script>
</body>
</html>
`;
}

function entryById(id) {
  return publishedById.get(id);
}

function entryRows(items) {
  if (!items.length) return `<p class="empty-note">Este percurso ainda não tem páginas públicas para abrir.</p>`;
  return `<ol class="entry-index">${items.map((entry) => {
    const wing = wingsById.get(entry.wing);
    return `<li class="entry-row"><a href="${entryUrl(entry)}"><span class="entry-row-index">${String(items.indexOf(entry) + 1).padStart(2, '0')}</span><span class="entry-row-main"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(entry.summary)}</span></span><span class="entry-row-meta">${escapeHtml(wing?.short_title || wing?.title || '')}</span></a></li>`;
  }).join('')}</ol>`;
}

function wingDirectory() {
  return `<div class="wing-directory">${wings.map((wing) => {
    const items = published.filter((entry) => entry.wing === wing.id);
    return `<a class="wing-line" href="${wingUrl(wing)}" style="--wing-accent:${wing.accent}"><span class="wing-line-number">0${wing.order}</span><span><strong>${escapeHtml(wing.title)}</strong><small>${escapeHtml(wing.intro)}</small></span><span class="wing-line-arrow" aria-hidden="true">↗</span></a>`;
  }).join('')}</div>`;
}

function home() {
  const featured = published[0];
  const pathItems = paths.filter((item) => item.public);
  const featuredWing = wingsById.get(featured.wing);
  const content = `<section class="home-intro page-wrap">
  <div class="home-intro-copy">
    <p class="eyebrow">Portal Moonverse</p>
    <h1>Uma vida também pode ser lida como <em>território</em>.</h1>
    <p class="intro-dek">O Moonverse é a superfície pública de um arquivo autoral: páginas sobre memória, obra, transição, projetos e os lugares onde essas coisas se tocam.</p>
    <form class="search-form hero-search" action="/moonverse/search/" data-search-form>
      <label for="home-search">O que você está buscando?</label>
      <div class="search-control"><input id="home-search" name="q" type="search" placeholder="memória, Moon Source, infância…" autocomplete="off"><button type="submit" aria-label="Buscar">Buscar <span aria-hidden="true">↗</span></button></div>
    </form>
    <p class="quiet-note">Leitura primeiro. O mapa é uma segunda porta.</p>
  </div>
  <div class="home-plate" aria-label="Marca visual do Moonverse">
    <div class="moon-plate-mark" aria-hidden="true"><span></span></div>
    <p>um arquivo<br><em>que respira</em></p>
    <span class="plate-rule"></span>
    <small>Lua Helena Moon<br>edição pública · 2026</small>
  </div>
</section>
<section class="page-wrap section-block feature-block" aria-labelledby="feature-title">
  <div class="section-label"><span>01</span><span>Uma entrada para começar</span></div>
  <div class="feature-grid">
    <div><p class="eyebrow">${escapeHtml(featuredWing?.title || 'Biblioteca Lunar')}</p><h2 id="feature-title"><a href="${entryUrl(featured)}">${escapeHtml(featured.title)}</a></h2><p>${escapeHtml(featured.lead)}</p><a class="text-link" href="${entryUrl(featured)}">Abrir a página <span aria-hidden="true">→</span></a></div>
    <div class="feature-note"><span class="quote-mark" aria-hidden="true">“</span><p>${escapeHtml('Nem toda memória foi fotografada, mas muita memória merece imagem.')}</p><small>— entrada pública</small></div>
  </div>
</section>
<section class="page-wrap section-block" aria-labelledby="wings-title">
  <div class="section-label"><span>02</span><span>Territórios</span></div>
  <div class="section-heading"><p class="eyebrow">As seis alas</p><h2 id="wings-title">Escolha uma porta, não um card.</h2><p>Os territórios organizam o arquivo por atmosfera e jurisdição. O que ainda não tem página pública continua sendo promessa, não decoração.</p></div>
  ${wingDirectory()}
</section>
<section class="page-wrap section-block" aria-labelledby="paths-title">
  <div class="section-label"><span>03</span><span>Leituras guiadas</span></div>
  <div class="section-heading"><p class="eyebrow">Caminhos pelo Moonverse</p><h2 id="paths-title">Duas maneiras de atravessar.</h2></div>
  <div class="path-list">${pathItems.map((pathItem, index) => `<a class="path-line" href="/moonverse/wiki/#path-${pathItem.id}"><span>0${index + 1}</span><span><strong>${escapeHtml(pathItem.title)}</strong><small>${escapeHtml(pathItem.description)}</small></span><span aria-hidden="true">→</span></a>`).join('')}</div>
</section>
<section class="page-wrap section-block atlas-teaser" aria-labelledby="atlas-title">
  <div class="section-label"><span>04</span><span>Cartografia</span></div>
  <div class="atlas-teaser-grid"><div><p class="eyebrow">Atlas Moonverse</p><h2 id="atlas-title">As relações também podem ocupar espaço.</h2><p>Uma constelação simples mostra onde a página está. A lista continua sendo a forma completa de leitura.</p><a class="text-link" href="/moonverse/atlas/">Abrir o Atlas <span aria-hidden="true">↗</span></a></div><div class="mini-constellation" aria-hidden="true"><i></i><i></i><i></i><span></span></div></div>
</section>`;
  return shell({ title: site.title, description: site.description, active: '', content });
}

function wiki() {
  const grouped = new Map();
  for (const entry of published) {
    if (!grouped.has(entry.type)) grouped.set(entry.type, []);
    grouped.get(entry.type).push(entry);
  }
  const groups = [...grouped.entries()].map(([type, items]) => `<section class="index-group" aria-labelledby="type-${slugify(type)}"><h2 id="type-${slugify(type)}">${escapeHtml(type)}</h2>${entryRows(items)}</section>`).join('');
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Índice Moonverse</p><h1>Uma página leva a outra.</h1><p class="intro-dek">O índice público é pequeno de propósito: cada entrada tem fonte, fronteira e espaço para crescer sem fingir completude.</p><form class="search-form inline-search" action="/moonverse/search/" data-search-form><label for="wiki-search">Buscar no índice</label><div class="search-control"><input id="wiki-search" name="q" type="search" placeholder="Digite um título, tema ou palavra"><button type="submit">Buscar <span aria-hidden="true">↗</span></button></div></form></section><section class="page-wrap index-layout"><div>${groups}</div><aside class="context-note"><p class="eyebrow">Como ler</p><p>As alas são portas temáticas; os tipos dizem que espécie de página você abriu. Relações explícitas aparecem dentro do artigo e no Atlas.</p><a class="text-link" href="/moonverse/about/">Sobre a fonte pública <span aria-hidden="true">→</span></a></aside></section>`;
  return shell({ title: 'Wiki', description: 'Índice público do Moonverse.', active: 'wiki', content, depth: 1 });
}

function wingPage(wing) {
  const items = published.filter((entry) => entry.wing === wing.id);
  const content = `<section class="page-wrap page-heading wing-heading" style="--wing-accent:${wing.accent}"><p class="eyebrow">Ala 0${wing.order}</p><h1>${escapeHtml(wing.title)}</h1><p class="intro-dek">${escapeHtml(wing.intro)}</p></section><section class="page-wrap index-layout"><div><div class="section-label"><span>Entradas públicas</span><span>${String(items.length).padStart(2, '0')}</span></div>${entryRows(items)}</div><aside class="context-note"><p class="eyebrow">Jurisdição</p><p>Esta ala organiza uma possibilidade de leitura; ela não possui autoridade sobre o arquivo inteiro.</p><a class="text-link" href="/moonverse/atlas/">Ver relações no Atlas <span aria-hidden="true">↗</span></a></aside></section>`;
  return shell({ title: wing.title, description: wing.intro, active: 'wiki', content, depth: 2 });
}

function article(entry) {
  const wing = wingsById.get(entry.wing);
  const headings = headingsFromMarkdown(entry.body_markdown);
  const toc = headings.length ? `<ol>${headings.map((item) => `<li><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`).join('')}</ol>` : '';
  const relationItems = relations.filter((relation) => relation.source === entry.id || relation.target === entry.id).map((relation) => {
    const otherId = relation.source === entry.id ? relation.target : relation.source;
    const otherEntry = entryById(otherId);
    const otherWing = wingsById.get(otherId);
    const href = otherEntry ? entryUrl(otherEntry) : otherWing ? wingUrl(otherWing) : '#';
    const label = otherEntry?.title || otherWing?.title || relation.label;
    return `<li><a href="${href}">${escapeHtml(label)}</a><span>${escapeHtml(relation.label)}</span></li>`;
  }).join('');
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: entry.title, description: entry.summary, author: { '@type': 'Person', name: site.author }, isPartOf: { '@type': 'WebSite', name: site.title, url: 'https://www.luahelena.com.br/moonverse/' } });
  const content = `<div class="page-wrap breadcrumb"><a href="/moonverse/">Moonverse</a><span aria-hidden="true">/</span><a href="${wingUrl(wing)}">${escapeHtml(wing.title)}</a><span aria-hidden="true">/</span><span>${escapeHtml(entry.title)}</span></div><div class="article-layout page-wrap"><aside class="article-rail article-toc"><p class="eyebrow">Nesta página</p>${toc}</aside><article class="article"><header class="article-header"><p class="eyebrow">${escapeHtml(entry.type)} · ${escapeHtml(wing.title)}</p><h1>${escapeHtml(entry.title)}</h1><p class="article-lead">${escapeHtml(entry.lead)}</p><div class="article-meta"><span>${escapeHtml(entry.date_label)}</span><span>·</span><span>por ${escapeHtml(site.author)}</span></div></header><div class="prose">${markdownToHtml(entry.body_markdown)}</div><div class="source-notes"><p class="eyebrow">Fonte e forma</p><p>Entrada ${escapeHtml(entry.source_kind)}. Referência editorial: ${entry.source_refs.map(escapeHtml).join(', ')}.</p><p>Esta página pertence à superfície pública do Moonverse; ela não representa o corpus privado inteiro.</p></div>${relationItems ? `<section class="related-block"><p class="eyebrow">Relações</p><ul class="relation-list">${relationItems}</ul></section>` : ''}</article><aside class="article-rail article-infobox"><div class="infobox-rule" style="--wing-accent:${wing.accent}"></div><p class="eyebrow">Ficha</p><dl><dt>Ala</dt><dd><a href="${wingUrl(wing)}">${escapeHtml(wing.title)}</a></dd><dt>Palavras-chave</dt><dd>${entry.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join(' ')}</dd><dt>Última edição</dt><dd>${escapeHtml(entry.updated)}</dd></dl><a class="text-link" href="/moonverse/atlas/">Abrir no Atlas <span aria-hidden="true">↗</span></a></aside></div><script type="application/ld+json">${jsonLd}</script>`;
  return shell({ title: entry.title, description: entry.summary, active: 'wiki', bodyClass: 'article-page', content, depth: 2 });
}

function timeline() {
  const items = [...published].sort((a, b) => String(a.published).localeCompare(String(b.published)));
  const timelineItems = items.map((entry, index) => `<li class="timeline-item"><div class="timeline-marker">${String(index + 1).padStart(2, '0')}</div><div><p class="eyebrow">${escapeHtml(entry.date_label)}</p><h2><a href="${entryUrl(entry)}">${escapeHtml(entry.title)}</a></h2><p>${escapeHtml(entry.summary)}</p></div></li>`).join('');
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Linha do tempo</p><h1>O arquivo também tem duração.</h1><p class="intro-dek">A timeline mostra apenas marcos que possuem uma página pública correspondente. Nenhuma data privada é deduzida para preencher o desenho.</p></section><section class="page-wrap timeline-layout"><ol class="timeline-list">${timelineItems}</ol><aside class="context-note"><p class="eyebrow">Critério</p><p>Uma linha do tempo pública não precisa fingir que sabe tudo. Ela só abre o que pode ser lido.</p></aside></section>`;
  return shell({ title: 'Linha do tempo', description: 'Linha do tempo pública do Moonverse.', active: 'timeline', content, depth: 1 });
}

function graphData() {
  const nodes = [
    ...wings.map((wing) => ({ id: `wing:${wing.id}`, kind: 'wing', label: wing.title, summary: wing.intro, url: wingUrl(wing), accent: wing.accent })),
    ...published.map((entry) => ({ id: `entry:${entry.id}`, kind: 'entry', label: entry.title, summary: entry.summary, url: entryUrl(entry), wing: entry.wing, tags: entry.tags }))
  ];
  const links = relations.filter((relation) => (
    (publishedById.has(relation.source) || wingsById.has(relation.source))
    && (publishedById.has(relation.target) || wingsById.has(relation.target))
  )).map((relation) => ({ ...relation, source: publishedById.has(relation.source) ? `entry:${relation.source}` : `wing:${relation.source}`, target: publishedById.has(relation.target) ? `entry:${relation.target}` : `wing:${relation.target}` }));
  return { version: 1, nodes, links };
}

function atlas() {
  const graph = graphData();
  const wingY = new Map(wings.map((wing, index) => [wing.id, 118 + index * 82]));
  const svgW = 820;
  const svgH = Math.max(610, wings.length * 82 + 80);
  const lines = graph.links.map((link) => {
    const sourceWing = link.source.startsWith('wing:') ? link.source.slice(5) : publishedById.get(link.source.slice(6))?.wing;
    const targetWing = link.target.startsWith('wing:') ? link.target.slice(5) : publishedById.get(link.target.slice(6))?.wing;
    const sourceEntry = link.source.startsWith('entry:');
    const targetEntry = link.target.startsWith('entry:');
    const x1 = sourceEntry ? 605 : 220;
    const x2 = targetEntry ? 605 : 220;
    const y1 = sourceEntry ? 118 : wingY.get(sourceWing) || 118;
    const y2 = targetEntry ? 118 : wingY.get(targetWing) || 118;
    return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="graph-link" />`;
  }).join('');
  const wingNodes = wings.map((wing) => `<a href="${wingUrl(wing)}" class="svg-node svg-wing" style="--node-accent:${wing.accent}" transform="translate(220 ${wingY.get(wing.id)})"><circle r="10"></circle><text x="24" y="5">${escapeHtml(wing.title)}</text></a>`).join('');
  const entryNodes = published.map((entry) => `<a href="${entryUrl(entry)}" class="svg-node svg-entry" transform="translate(605 118)"><circle r="16"></circle><text x="-34" y="-28">${escapeHtml(entry.title)}</text></a>`).join('');
  const svg = `<svg class="atlas-svg" viewBox="0 0 ${svgW} ${svgH}" role="img" aria-labelledby="atlas-figure-title atlas-figure-desc"><title id="atlas-figure-title">Constelação pública do Moonverse</title><desc id="atlas-figure-desc">Relações entre as alas do Moonverse e as entradas que já podem ser lidas publicamente.</desc><g class="graph-lines">${lines}</g><g>${wingNodes}${entryNodes}</g></svg>`;
  const list = `<div class="atlas-list"><p class="eyebrow">Lista completa</p><ul>${published.map((entry) => `<li><a href="${entryUrl(entry)}"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(wingsById.get(entry.wing)?.title || '')}</span></a></li>`).join('')}${wings.filter((wing) => !published.some((entry) => entry.wing === wing.id)).map((wing) => `<li class="atlas-empty"><a href="${wingUrl(wing)}"><strong>${escapeHtml(wing.title)}</strong><span>ala sem páginas públicas ainda</span></a></li>`).join('')}</ul></div>`;
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Atlas Moonverse</p><h1>Uma constelação legível.</h1><p class="intro-dek">O mapa é uma camada de orientação. A lista ao lado e os links comuns continuam sendo a forma completa de acesso.</p></section><section class="page-wrap atlas-layout"><figure class="atlas-figure"><div class="atlas-toolbar"><span>Vista pública · relações explícitas</span><a href="/moonverse/wiki/">Voltar ao índice</a></div>${svg}<figcaption>As linhas representam relações editoriais nomeadas; o vazio também é informação.</figcaption></figure>${list}</section><section class="page-wrap atlas-note"><p class="eyebrow">Princípio do Atlas</p><p>O 3D é uma possibilidade futura, não uma condição para conhecer o Moonverse. Esta versão usa uma superfície 2D determinística e acessível; qualquer integração direta com o 3D Cluster Engine exigirá autorização própria.</p></section>`;
  return shell({ title: 'Atlas', description: 'Atlas relacional e textual do Moonverse.', active: 'atlas', content, depth: 1 });
}

function about() {
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Sobre o portal</p><h1>O Moonverse não é o arquivo inteiro.</h1><p class="intro-dek">Ele é a parte do arquivo que pode ser compartilhada como experiência pública: com contexto, forma e fronteira.</p></section><section class="page-wrap about-layout"><article class="prose"><h2>Wiki e Portal</h2><p>A Moon Wiki organiza fontes, estados, relações e decisões editoriais. O Portal Moonverse revela apenas o subconjunto aprovado. Um não substitui o outro.</p><h2>Como uma página chega aqui</h2><ol><li>Existe uma fonte autorizada ou uma obra assumida.</li><li>O material recebe forma editorial e revisão de privacidade.</li><li>A publicação é explicitamente aprovada.</li><li>O gerador transforma o registro em HTML, busca, timeline e relações.</li></ol><h2>Por que o mapa é opcional</h2><p>Uma constelação pode ajudar a orientar, mas nenhuma pessoa deveria precisar operar um canvas para ler uma biografia. O Moonverse continua sendo uma wiki antes de ser uma interface espacial.</p></article><aside class="context-note"><p class="eyebrow">Autoria</p><p>Lua Helena Moon<br>com Áurion</p><p class="eyebrow">Estado desta superfície</p><p>Uma primeira edição pública, deliberadamente pequena e reversível.</p></aside></section>`;
  return shell({ title: 'Sobre', description: 'Fonte, autoridade e fronteiras do Portal Moonverse.', active: 'about', content, depth: 1 });
}

function searchPage() {
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Busca</p><h1>Encontre uma página.</h1><p class="intro-dek">A busca consulta somente o índice público gerado junto com o site.</p><form class="search-form inline-search" action="/moonverse/search/" data-search-form><label for="search-page-input">Buscar no Moonverse</label><div class="search-control"><input id="search-page-input" name="q" type="search" placeholder="Título, tema, palavra-chave"><button type="submit">Buscar <span aria-hidden="true">↗</span></button></div></form></section><section class="page-wrap search-results-section" aria-live="polite"><div id="search-results"><p class="empty-note">Digite algo para começar.</p></div></section>`;
  return shell({ title: 'Busca', description: 'Busca pública do Moonverse.', active: '', content, depth: 1 });
}

function notFound() {
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">404</p><h1>Esta porta ainda não existe.</h1><p class="intro-dek">Volte ao início ou escolha uma ala do Moonverse.</p><a class="text-link" href="/moonverse/">Voltar ao portal <span aria-hidden="true">→</span></a></section>`;
  return shell({ title: 'Página não encontrada', description: 'A página solicitada não existe.', active: '', content, depth: 0 });
}

const generated = [];
const cleanTargets = ['index.html', 'wiki', 'entry', 'wing', 'timeline', 'atlas', 'about', 'search', 'assets', '404.html', 'README.md', '.nojekyll'];
fs.mkdirSync(siteRoot, { recursive: true });
for (const target of cleanTargets) fs.rmSync(path.join(siteRoot, target), { recursive: true, force: true });
fs.mkdirSync(path.join(siteRoot, 'legacy-v0'), { recursive: true });

write('index.html', home());
write('wiki/index.html', wiki());
for (const wing of wings) write(`wing/${wing.id}/index.html`, wingPage(wing));
for (const entry of published) write(`entry/${entry.slug}/index.html`, article(entry));
write('timeline/index.html', timeline());
write('atlas/index.html', atlas());
write('about/index.html', about());
write('search/index.html', searchPage());
write('404.html', notFound());
write('assets/site.css', fs.readFileSync(path.join(sourceRoot, 'src/styles/site.css'), 'utf8'));
write('assets/site.js', fs.readFileSync(path.join(sourceRoot, 'src/client/site.js'), 'utf8'));
write('assets/search-index.json', JSON.stringify(published.map((entry) => ({ id: entry.id, title: entry.title, url: entryUrl(entry), summary: entry.summary, body: plainText(entry.body_markdown), tags: entry.tags, type: entry.type, wing: wingsById.get(entry.wing)?.title || '', wing_id: entry.wing })), null, 2) + '\n');
write('assets/graph.json', JSON.stringify(graphData(), null, 2) + '\n');
write('assets/publication-manifest.json', JSON.stringify({ generated_at: new Date().toISOString().slice(0, 10), entries: published.map((entry) => entry.id), wings: wings.map((wing) => wing.id) }, null, 2) + '\n');
write('README.md', '# Moonverse public artifact\n\n> ' + site.generated_warning + '\n\nGenerated from `moonverse-src/` for the public `/moonverse/` path. The historical implementation is preserved in `legacy-v0/`.\n');
write('.nojekyll', '');
write('.generated-files.json', JSON.stringify(generated, null, 2) + '\n');

console.log(`Moonverse build complete: ${published.length} public entries, ${wings.length} wings, ${generated.length} generated files.`);
