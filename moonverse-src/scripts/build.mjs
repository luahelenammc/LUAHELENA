import fs from 'node:fs';
import path from 'node:path';

const sourceRoot = path.resolve(new URL('..', import.meta.url).pathname);
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');

const readJson = (relativePath) => JSON.parse(fs.readFileSync(path.join(sourceRoot, relativePath), 'utf8'));
const site = readJson('site.json');
const wings = readJson('data/wings.json').sort((a, b) => a.order - b.order);
const entries = readJson('data/entries.json');
const relations = readJson('data/relations.json');
const paths = readJson('data/paths.json');
const concepts = readJson('data/concepts.json');

const publishablePrivacy = new Set(['public', 'sanitized_approved']);
const published = entries.filter((entry) => (
  entry.status === 'published'
  && publishablePrivacy.has(entry.privacy)
  && entry.publication_approved === true
));
const publishedById = new Map(published.map((entry) => [entry.id, entry]));
const wingsById = new Map(wings.map((wing) => [wing.id, wing]));
const conceptsById = new Map(concepts.map((concept) => [concept.id, concept]));
const publicPaths = paths
  .filter((item) => item.public === true)
  .map((item) => ({ ...item, entries: item.entry_ids.map((id) => publishedById.get(id)).filter(Boolean) }))
  .filter((item) => item.entries.length > 0);

const generated = [];

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
  return /^(https?:\/\/|\/moonverse\/|#)/.test(href) ? href : '#';
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

  const headingId = (text) => {
    const base = slugify(text);
    const count = (seenIds.get(base) || 0) + 1;
    seenIds.set(base, count);
    return count === 1 ? base : `${base}-${count}`;
  };
  const flushParagraph = () => {
    if (paragraph.length) output.push(`<p>${inlineMarkdown(paragraph.join(' '))}</p>`);
    paragraph = [];
  };
  const flushList = () => {
    if (list.length) output.push(`<ul>${list.map((item) => `<li>${inlineMarkdown(item)}</li>`).join('')}</ul>`);
    list = [];
  };
  const flushQuote = () => {
    if (quote.length) output.push(`<blockquote><p>${inlineMarkdown(quote.join(' '))}</p></blockquote>`);
    quote = [];
  };
  const flushAll = () => {
    flushParagraph();
    flushList();
    flushQuote();
  };

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
      return { text, id: count === 1 ? base : `${base}-${count}` };
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

const entryUrl = (entry) => `/moonverse/entry/${entry.slug}/`;
const wingUrl = (wing) => `/moonverse/wing/${wing.id}/`;

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
      <span><strong>Moonverse</strong><small>${escapeHtml(site.subtitle)}</small></span>
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
  <div><strong>Moonverse</strong><span>${escapeHtml(site.author)} × ${escapeHtml(site.coauthor)}</span></div>
  <div class="footer-links"><a href="/moonverse/about/">Sobre o portal</a><a href="/moonverse/wiki/">Índice</a><a href="/moonverse/atlas/">Atlas</a></div>
</footer>`;
}

function shell({ title, description, active = '', content, bodyClass = '', depth = 0 }) {
  const assetRoot = `${'../'.repeat(depth)}assets/`;
  const documentTitle = title === site.title ? site.title : `${title} · ${site.title}`;
  return `<!doctype html>
<html lang="${site.language}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${escapeHtml(documentTitle)}</title>
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

function entryRows(items) {
  if (!items.length) return `<p class="empty-note">Nenhuma página pública nesta ala por enquanto.</p>`;
  return `<ol class="entry-index">${items.map((entry, index) => {
    const wing = wingsById.get(entry.wing);
    return `<li class="entry-row"><a href="${entryUrl(entry)}"><span class="entry-row-index">${String(index + 1).padStart(2, '0')}</span><span class="entry-row-main"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(entry.summary)}</span></span><span class="entry-row-meta">${escapeHtml(wing?.short_title || wing?.title || '')}</span></a></li>`;
  }).join('')}</ol>`;
}

function wingDirectory() {
  return `<div class="wing-directory">${wings.map((wing) => `<a class="wing-line" href="${wingUrl(wing)}" style="--wing-accent:${wing.accent}"><span class="wing-line-number">${String(wing.order).padStart(2, '0')}</span><span><strong>${escapeHtml(wing.title)}</strong><small>${escapeHtml(wing.intro)}</small></span><span class="wing-line-arrow" aria-hidden="true">↗</span></a>`).join('')}</div>`;
}

function home() {
  const featured = published[0];
  const featuredWing = featured ? wingsById.get(featured.wing) : null;
  const featuredBlock = featured ? `<section class="page-wrap section-block feature-block" aria-labelledby="feature-title">
  <div class="section-label"><span>01</span><span>Uma entrada para começar</span></div>
  <div class="feature-grid">
    <div><p class="eyebrow">${escapeHtml(featuredWing?.title || '')}</p><h2 id="feature-title"><a href="${entryUrl(featured)}">${escapeHtml(featured.title)}</a></h2><p>${escapeHtml(featured.lead)}</p><a class="text-link" href="${entryUrl(featured)}">Abrir a página <span aria-hidden="true">→</span></a></div>
    <div class="feature-note"><span class="quote-mark" aria-hidden="true">“</span><p>Nem toda memória foi fotografada, mas muita memória merece imagem.</p><small>— O cheiro de maresia</small></div>
  </div>
</section>` : '';
  const pathBlock = publicPaths.length ? `<section class="page-wrap section-block" aria-labelledby="paths-title">
  <div class="section-label"><span>03</span><span>Leituras guiadas</span></div>
  <div class="section-heading"><p class="eyebrow">Caminhos pelo Moonverse</p><h2 id="paths-title">Percursos para atravessar.</h2></div>
  <div class="path-list">${publicPaths.map((item, index) => `<a class="path-line" href="/moonverse/wiki/#path-${item.id}"><span>${String(index + 1).padStart(2, '0')}</span><span><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.description)}</small></span><span aria-hidden="true">→</span></a>`).join('')}</div>
</section>` : '';

  const content = `<section class="home-intro page-wrap">
  <div class="home-intro-copy">
    <p class="eyebrow">Portal Moonverse</p>
    <h1>Uma vida também pode ser lida como <em>território</em>.</h1>
    <p class="intro-dek">${escapeHtml(site.description)}</p>
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
    <small>${escapeHtml(site.author)}<br>edição pública · 2026</small>
  </div>
</section>
${featuredBlock}
<section class="page-wrap section-block" aria-labelledby="wings-title">
  <div class="section-label"><span>02</span><span>Territórios</span></div>
  <div class="section-heading"><p class="eyebrow">As seis alas</p><h2 id="wings-title">Escolha uma porta.</h2><p>Os territórios organizam memórias, obras e projetos por atmosfera e afinidade.</p></div>
  ${wingDirectory()}
</section>
${pathBlock}
<section class="page-wrap section-block atlas-teaser" aria-labelledby="atlas-title">
  <div class="section-label"><span>04</span><span>Cartografia</span></div>
  <div class="atlas-teaser-grid"><div><p class="eyebrow">Atlas Moonverse</p><h2 id="atlas-title">As relações também podem ocupar espaço.</h2><p>Uma constelação simples mostra onde cada página se encontra. A lista continua sendo a forma completa de leitura.</p><a class="text-link" href="/moonverse/atlas/">Abrir o Atlas <span aria-hidden="true">↗</span></a></div><div class="mini-constellation" aria-hidden="true"><i></i><i></i><i></i><span></span></div></div>
</section>`;
  return shell({ title: site.title, description: site.description, content });
}

function wiki() {
  const grouped = new Map();
  for (const entry of published) {
    if (!grouped.has(entry.type)) grouped.set(entry.type, []);
    grouped.get(entry.type).push(entry);
  }
  const groups = [...grouped.entries()].map(([type, items]) => `<section class="index-group" aria-labelledby="type-${slugify(type)}"><h2 id="type-${slugify(type)}">${escapeHtml(type)}</h2>${entryRows(items)}</section>`).join('');
  const pathSections = publicPaths.map((item) => `<section class="page-wrap section-block path-section" id="path-${item.id}" aria-labelledby="path-title-${item.id}"><div class="section-label"><span>Leitura guiada</span><span>${String(item.entries.length).padStart(2, '0')}</span></div><div class="section-heading"><p class="eyebrow">Caminho pelo Moonverse</p><h2 id="path-title-${item.id}">${escapeHtml(item.title)}</h2><p>${escapeHtml(item.description)}</p></div>${entryRows(item.entries)}</section>`).join('');
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Índice Moonverse</p><h1>Uma página leva a outra.</h1><p class="intro-dek">O índice reúne as entradas públicas por tipo, ala e relação.</p><form class="search-form inline-search" action="/moonverse/search/" data-search-form><label for="wiki-search">Buscar no índice</label><div class="search-control"><input id="wiki-search" name="q" type="search" placeholder="Digite um título, tema ou palavra"><button type="submit">Buscar <span aria-hidden="true">↗</span></button></div></form></section><section class="page-wrap index-layout"><div>${groups || '<p class="empty-note">Nenhuma página pública disponível.</p>'}</div><aside class="context-note"><p class="eyebrow">Como ler</p><p>As alas são portas temáticas; os tipos indicam a natureza de cada página. Relações explícitas aparecem nos artigos e no Atlas.</p><a class="text-link" href="/moonverse/about/">Sobre a fonte pública <span aria-hidden="true">→</span></a></aside></section>${pathSections}`;
  return shell({ title: 'Wiki', description: 'Índice público do Moonverse.', active: 'wiki', content, depth: 1 });
}

function wingPage(wing) {
  const items = published.filter((entry) => entry.wing === wing.id);
  const content = `<section class="page-wrap page-heading wing-heading" style="--wing-accent:${wing.accent}"><p class="eyebrow">Ala ${String(wing.order).padStart(2, '0')}</p><h1>${escapeHtml(wing.title)}</h1><p class="intro-dek">${escapeHtml(wing.intro)}</p></section><section class="page-wrap index-layout"><div><div class="section-label"><span>Entradas públicas</span><span>${String(items.length).padStart(2, '0')}</span></div>${entryRows(items)}</div><aside class="context-note"><p class="eyebrow">Nesta ala</p><p>As páginas reunidas aqui compartilham uma atmosfera e um campo de sentido.</p><a class="text-link" href="/moonverse/atlas/">Ver relações no Atlas <span aria-hidden="true">↗</span></a></aside></section>`;
  return shell({ title: wing.title, description: wing.intro, active: 'wiki', content, depth: 2 });
}

function sourceLabel(kind) {
  return ({ authored: 'síntese autoral', imported: 'texto importado', curated: 'texto curado', annotated: 'síntese anotada' })[kind] || 'fonte editorial';
}

function article(entry) {
  const wing = wingsById.get(entry.wing);
  const headings = headingsFromMarkdown(entry.body_markdown);
  const toc = headings.length ? `<ol>${headings.map((item) => `<li><a href="#${item.id}">${escapeHtml(item.text)}</a></li>`).join('')}</ol>` : '';
  const relationItems = relations.filter((relation) => relation.source === entry.id || relation.target === entry.id).map((relation) => {
    const otherId = relation.source === entry.id ? relation.target : relation.source;
    const otherEntry = publishedById.get(otherId);
    const otherWing = wingsById.get(otherId);
    const otherConcept = conceptsById.get(otherId);
    const href = otherEntry ? entryUrl(otherEntry) : otherWing ? wingUrl(otherWing) : otherConcept ? otherConcept.url : '#';
    const label = otherEntry?.title || otherWing?.title || otherConcept?.title || relation.label;
    return `<li><a href="${href}">${escapeHtml(label)}</a><span>${escapeHtml(relation.label)}</span></li>`;
  }).join('');
  const jsonLd = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Article', headline: entry.title, description: entry.summary, author: { '@type': 'Person', name: site.author }, isPartOf: { '@type': 'WebSite', name: site.title, url: 'https://www.luahelena.com.br/moonverse/' } });
  const sourceRefs = entry.source_refs?.length ? entry.source_refs.map(escapeHtml).join(', ') : 'referência não exibida';
  const boundaryNote = entry.sanitization_required
    ? `<p>Fronteira pública: ${escapeHtml(entry.sanitization_notes)}</p>`
    : `<p>Fronteira pública: esta síntese não amplia detalhes pessoais ou de terceiros além do necessário ao tema.</p>`;
  const content = `<div class="page-wrap breadcrumb"><a href="/moonverse/">Moonverse</a><span aria-hidden="true">/</span><a href="${wingUrl(wing)}">${escapeHtml(wing.title)}</a><span aria-hidden="true">/</span><span>${escapeHtml(entry.title)}</span></div><div class="article-layout page-wrap"><aside class="article-rail article-toc"><p class="eyebrow">Nesta página</p>${toc}</aside><article class="article"><header class="article-header"><p class="eyebrow">${escapeHtml(entry.type)} · ${escapeHtml(wing.title)}</p><h1>${escapeHtml(entry.title)}</h1><p class="article-lead">${escapeHtml(entry.lead)}</p><div class="article-meta"><span>${escapeHtml(entry.date_label)}</span><span>·</span><span>por ${escapeHtml(site.author)}</span></div></header><div class="prose">${markdownToHtml(entry.body_markdown)}</div><div class="source-notes"><p class="eyebrow">Fonte e forma</p><p>Origem: ${escapeHtml(sourceLabel(entry.source_kind))}. Referência editorial: ${sourceRefs}.</p>${boundaryNote}<p>Esta página pertence à superfície pública do Moonverse; ela não representa o corpus privado inteiro.</p></div>${relationItems ? `<section class="related-block"><p class="eyebrow">Relações</p><ul class="relation-list">${relationItems}</ul></section>` : ''}</article><aside class="article-rail article-infobox"><div class="infobox-rule" style="--wing-accent:${wing.accent}"></div><p class="eyebrow">Ficha</p><dl><dt>Ala</dt><dd><a href="${wingUrl(wing)}">${escapeHtml(wing.title)}</a></dd><dt>Palavras-chave</dt><dd>${entry.tags.map((tag) => `<span class="tag">${escapeHtml(tag)}</span>`).join(' ')}</dd><dt>Última edição</dt><dd>${escapeHtml(entry.updated)}</dd></dl><a class="text-link" href="/moonverse/atlas/">Abrir no Atlas <span aria-hidden="true">↗</span></a></aside></div><script type="application/ld+json">${jsonLd}</script>`;
  return shell({ title: entry.title, description: entry.summary, active: 'wiki', bodyClass: 'article-page', content, depth: 2 });
}

function timeline() {
  const items = [...published].sort((a, b) => String(a.published).localeCompare(String(b.published)));
  const timelineItems = items.map((entry, index) => `<li class="timeline-item"><div class="timeline-marker">${String(index + 1).padStart(2, '0')}</div><div><p class="eyebrow">${escapeHtml(entry.date_label)}</p><h2><a href="${entryUrl(entry)}">${escapeHtml(entry.title)}</a></h2><p>${escapeHtml(entry.summary)}</p></div></li>`).join('');
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Linha do tempo</p><h1>O arquivo também tem duração.</h1><p class="intro-dek">A linha do tempo reúne marcos que possuem uma página pública correspondente.</p></section><section class="page-wrap timeline-layout"><ol class="timeline-list">${timelineItems}</ol><aside class="context-note"><p class="eyebrow">Critério</p><p>Somente datas e acontecimentos aprovados para publicação aparecem aqui.</p></aside></section>`;
  return shell({ title: 'Linha do tempo', description: 'Linha do tempo pública do Moonverse.', active: 'timeline', content, depth: 1 });
}

function graphData() {
  const nodes = [
    ...wings.map((wing) => ({ id: `wing:${wing.id}`, kind: 'wing', label: wing.title, summary: wing.intro, url: wingUrl(wing), accent: wing.accent })),
    ...published.map((entry) => ({ id: `entry:${entry.id}`, kind: 'entry', label: entry.title, summary: entry.summary, url: entryUrl(entry), wing: entry.wing, tags: entry.tags })),
    ...concepts.map((concept) => ({ id: `concept:${concept.id}`, kind: 'concept', label: concept.title, summary: concept.summary, url: concept.url, accent: concept.accent }))
  ];
  const nodeIdFor = (id) => publishedById.has(id) ? `entry:${id}` : wingsById.has(id) ? `wing:${id}` : conceptsById.has(id) ? `concept:${id}` : null;
  const links = relations.filter((relation) => (
    nodeIdFor(relation.source) && nodeIdFor(relation.target)
  )).map((relation) => ({ ...relation, source: nodeIdFor(relation.source), target: nodeIdFor(relation.target) }));
  return { version: 1, nodes, links };
}

function atlas() {
  const graph = graphData();
  const wingY = new Map(wings.map((wing, index) => [wing.id, 118 + index * 82]));
  const entriesByWing = new Map(wings.map((wing) => [wing.id, published.filter((entry) => entry.wing === wing.id)]));
  const entryPosition = new Map();
  const conceptPosition = new Map(concepts.map((concept, index) => [concept.id, { x: 730, y: 180 + index * 170 }]));
  for (const wing of wings) {
    entriesByWing.get(wing.id).forEach((entry, index) => entryPosition.set(entry.id, { x: 605 + (index % 2) * 110, y: wingY.get(wing.id) + Math.floor(index / 2) * 44 }));
  }
  const svgW = 820;
  const svgH = Math.max(610, wings.length * 82 + 80);
  const pointFor = (nodeId) => {
    if (nodeId.startsWith('wing:')) return { x: 220, y: wingY.get(nodeId.slice(5)) || 118 };
    if (nodeId.startsWith('concept:')) return conceptPosition.get(nodeId.slice(8)) || { x: 730, y: 180 };
    return entryPosition.get(nodeId.slice(6)) || { x: 605, y: 118 };
  };
  const lines = graph.links.map((link) => {
    const a = pointFor(link.source);
    const b = pointFor(link.target);
    return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="graph-link" />`;
  }).join('');
  const wingNodes = wings.map((wing) => `<a href="${wingUrl(wing)}" class="svg-node svg-wing" style="--node-accent:${wing.accent}" transform="translate(220 ${wingY.get(wing.id)})"><circle r="10"></circle><text x="24" y="5">${escapeHtml(wing.title)}</text></a>`).join('');
  const entryNodes = published.map((entry) => {
    const p = entryPosition.get(entry.id);
    return `<a href="${entryUrl(entry)}" class="svg-node svg-entry" transform="translate(${p.x} ${p.y})"><circle r="16"></circle><text x="-34" y="-28">${escapeHtml(entry.title)}</text></a>`;
  }).join('');
  const conceptNodes = concepts.map((concept) => { const p = conceptPosition.get(concept.id); return `<a href="${safeHref(concept.url)}" class="svg-node svg-concept" style="--node-accent:${concept.accent}" transform="translate(${p.x} ${p.y})"><circle r="12"></circle><text x="-145" y="5">${escapeHtml(concept.title)}</text></a>`; }).join('');
  const svg = `<svg class="atlas-svg" viewBox="0 0 ${svgW} ${svgH}" role="group" aria-labelledby="atlas-figure-title atlas-figure-desc"><title id="atlas-figure-title">Constelação pública do Moonverse</title><desc id="atlas-figure-desc">Relações entre alas, entradas públicas e conceitos editoriais aprovados.</desc><g class="graph-lines">${lines}</g><g>${wingNodes}${entryNodes}${conceptNodes}</g></svg>`;
  const list = `<div class="atlas-list"><p class="eyebrow">Lista completa</p><ul>${published.map((entry) => `<li><a href="${entryUrl(entry)}"><strong>${escapeHtml(entry.title)}</strong><span>${escapeHtml(wingsById.get(entry.wing)?.title || '')}</span></a></li>`).join('')}${wings.filter((wing) => !published.some((entry) => entry.wing === wing.id)).map((wing) => `<li class="atlas-empty"><a href="${wingUrl(wing)}"><strong>${escapeHtml(wing.title)}</strong><span>explorar a ala</span></a></li>`).join('')}${concepts.map((concept) => `<li class="atlas-concept"><a href="${safeHref(concept.url)}"><strong>${escapeHtml(concept.title)}</strong><span>conceito editorial</span></a></li>`).join('')}</ul></div>`;
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Atlas Moonverse</p><h1>Uma constelação legível.</h1><p class="intro-dek">O mapa é uma camada de orientação. A lista ao lado e os links comuns continuam sendo a forma completa de acesso.</p></section><section class="page-wrap atlas-layout"><figure class="atlas-figure"><div class="atlas-toolbar"><span>Vista pública · relações explícitas</span><a href="/moonverse/wiki/">Voltar ao índice</a></div>${svg}<figcaption>As linhas representam relações editoriais nomeadas; o vazio também é informação.</figcaption></figure>${list}</section><section class="page-wrap atlas-note"><p class="eyebrow">Princípio do Atlas</p><p>O mapa aproxima páginas sem substituir a leitura. Cada ponto continua ligado a uma entrada ou ala convencional.</p></section>`;
  return shell({ title: 'Atlas', description: 'Atlas relacional e textual do Moonverse.', active: 'atlas', content, depth: 1 });
}

function about() {
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Sobre o portal</p><h1>O Moonverse não é o arquivo inteiro.</h1><p class="intro-dek">Ele é a parte do arquivo que pode ser compartilhada como experiência pública: com contexto, forma e fronteira.</p></section><section class="page-wrap about-layout"><article class="prose"><h2>Wiki e Portal</h2><p>A Moon Wiki organiza fontes, relações e decisões editoriais. O Portal Moonverse revela apenas o subconjunto aprovado. Um não substitui o outro.</p><h2>Como uma página chega aqui</h2><ol><li>Existe uma fonte autorizada ou uma obra assumida.</li><li>O material recebe forma editorial e revisão de privacidade.</li><li>A publicação é explicitamente aprovada.</li><li>O registro se transforma em página, busca, linha do tempo e relações.</li></ol><h2>Por que o mapa é opcional</h2><p>Uma constelação pode ajudar a orientar, mas nenhuma pessoa deveria precisar operar um mapa para ler uma biografia. O Moonverse continua sendo uma wiki antes de ser uma interface espacial.</p></article><aside class="context-note"><p class="eyebrow">Autoria</p><p>${escapeHtml(site.author)}<br>com ${escapeHtml(site.coauthor)}</p><p class="eyebrow">Edição</p><p>Uma seleção pública, autoral e deliberadamente cuidadosa.</p></aside></section>`;
  return shell({ title: 'Sobre', description: 'Fonte, autoridade e fronteiras do Portal Moonverse.', active: 'about', content, depth: 1 });
}

function searchPage() {
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">Busca</p><h1>Encontre uma página.</h1><p class="intro-dek">A busca consulta somente as páginas públicas do Moonverse.</p><form class="search-form inline-search" action="/moonverse/search/" data-search-form><label for="search-page-input">Buscar no Moonverse</label><div class="search-control"><input id="search-page-input" name="q" type="search" placeholder="Título, tema, palavra-chave"><button type="submit">Buscar <span aria-hidden="true">↗</span></button></div></form></section><section class="page-wrap search-results-section" aria-live="polite"><div id="search-results"><p class="empty-note">Digite algo para começar.</p></div></section>`;
  return shell({ title: 'Busca', description: 'Busca pública do Moonverse.', content, depth: 1 });
}

function notFound() {
  const content = `<section class="page-wrap page-heading"><p class="eyebrow">404</p><h1>Esta porta ainda não existe.</h1><p class="intro-dek">Volte ao início ou escolha uma ala do Moonverse.</p><a class="text-link" href="/moonverse/">Voltar ao portal <span aria-hidden="true">→</span></a></section>`;
  return shell({ title: 'Página não encontrada', description: 'A página solicitada não existe.', content });
}

const cleanTargets = ['index.html', 'wiki', 'entry', 'wing', 'timeline', 'atlas', 'about', 'search', 'assets', '404.html', 'README.md', '.nojekyll', '.generated-files.json'];
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
write('assets/search-index.json', JSON.stringify(published.map((entry) => ({
  id: entry.id,
  title: entry.title,
  url: entryUrl(entry),
  summary: entry.summary,
  body: plainText(entry.body_markdown),
  tags: entry.tags,
  type: entry.type,
  wing: wingsById.get(entry.wing)?.title || '',
  wing_id: entry.wing
})), null, 2) + '\n');
write('assets/graph.json', JSON.stringify(graphData(), null, 2) + '\n');
  write('assets/publication-manifest.json', JSON.stringify({ generated_at: site.build_date || new Date().toISOString().slice(0, 10), entries: published.map((entry) => entry.id), wings: wings.map((wing) => wing.id) }, null, 2) + '\n');
write('README.md', `# Moonverse public artifact

> ${site.generated_warning}

Generated from \`moonverse-src/\` for the public \`/moonverse/\` path. The historical implementation is preserved in \`legacy-v0/\`.
`);
write('.nojekyll', '');
write('.generated-files.json', JSON.stringify(generated, null, 2) + '\n');

console.log(`Moonverse build complete: ${published.length} public entries, ${wings.length} wings, ${generated.length} generated files.`);
