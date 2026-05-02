const fallbackPage = {
  type: 'MOONVERSE PAGE',
  title: 'Página em incubação',
  room: 'Moonverse',
  privacy: 'rascunho',
  source: 'data/pages.json',
  updated: '2026-04-30',
  tags: ['moonverse'],
  hero: 'linear-gradient(135deg, #291a48, #6b4bb7, #f7c8dc)',
  dek: 'Esta página existe como invólucro físico, mas ainda aguarda conteúdo curado.',
  caption: 'Hero provisório gerado por CSS.',
  summary: ['Página física do Moonverse.', 'Renderizada por page.js.', 'Usa styles.css compartilhado.'],
  body: [
    { heading: 'Estado', text: 'Esta página já está no formato correto: arquivo próprio, CSS externo e JS externo. O conteúdo pode ser preenchido em data/pages.json.' },
  ],
  quote: 'Home é portal; página é documento.',
};

function loadSharedStylesheet(href) {
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
}

loadSharedStylesheet('../privacy.css');

async function loadJson(path, fallback = {}) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Could not load ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}

function getPageId() {
  return document.body.dataset.pageId || new URLSearchParams(window.location.search).get('id') || 'maresia';
}

function fallbackPrivacyState(privacy = '') {
  const value = privacy.toLowerCase();
  if (value.includes('sanitizado')) return 'sanitized';
  if (value.includes('curadoria')) return 'curated';
  if (value.includes('privado') || value.includes('não publicável')) return 'restricted';
  if (value.includes('rascunho')) return 'draft';
  return 'public';
}

function setMetaTag(name, content, attr = 'name') {
  let tag = document.querySelector(`meta[${attr}="${name}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function renderPage(page, meta = {}, vocab = {}, theme = {}) {
  const article = document.querySelector('#article-view');
  const toc = document.querySelector('#toc');
  const infobox = document.querySelector('#infobox');
  if (!article || !toc || !infobox) return;

  const privacyStateId = meta.privacy_state || fallbackPrivacyState(page.privacy);
  const privacy = vocab[privacyStateId] || vocab.public || { label: 'publicável', className: 'privacy-public', description: 'Conteúdo apto para leitura pública dentro do Moonverse.' };
  const pageStatus = meta.status || 'draft';
  const heroBackground = theme.gradient || page.hero || fallbackPage.hero;

  document.title = `${page.title} · True Moonverse`;
  document.body.classList.add(privacy.className, `status-${pageStatus}`);
  setMetaTag('description', page.dek);
  setMetaTag('og:title', `${page.title} · True Moonverse`, 'property');
  setMetaTag('og:description', page.dek, 'property');
  setMetaTag('og:type', 'article', 'property');

  toc.innerHTML = page.body.map((section, index) => `<li><a href="#section-${index}">${section.heading}</a></li>`).join('');

  article.innerHTML = `
    <header>
      <div class="breadcrumb"><a href="../index.html">☾ Hall</a> · ${page.room} · ${page.type.toLowerCase()}</div>
      <div class="badge-row"><span class="badge">${page.type}</span><span class="privacy-pill ${privacy.className}">${privacy.label}</span><span class="badge status-badge">${pageStatus}</span></div>
      <h1>${page.title}</h1>
      <p class="article-dek">${page.dek}</p>
      <div class="metadata"><span>${page.updated}</span><span>${page.room}</span><span>${page.privacy}</span></div>
      <figure>
        <div class="hero-image" style="--hero-bg:${heroBackground}"></div>
        <figcaption class="caption">${page.caption}</figcaption>
      </figure>
      <div class="summary-box"><strong>Nesta página</strong><ul>${page.summary.map((item) => `<li>${item}</li>`).join('')}</ul></div>
    </header>
    <div class="article-body">
      ${page.body.map((section, index) => `
        <section id="section-${index}">
          <h2>${section.heading}</h2>
          <p>${section.text}</p>
        </section>
      `).join('')}
      <blockquote>${page.quote}</blockquote>
    </div>
    <footer class="related-footer">
      <strong>Portas relacionadas</strong>
      <div class="room-links">
        <a class="link-card" href="../index.html#palace"><strong>Voltar à mansão</strong><small>Retornar ao mapa de salas.</small></a>
        <a class="link-card" href="../index.html#devices"><strong>Sortear outra memória</strong><small>Usar a Máquina Mnésica.</small></a>
        <a class="link-card" href="../index.html#atlas"><strong>Voltar ao Atlas</strong><small>Buscar outras páginas Moonpedia.</small></a>
      </div>
    </footer>
  `;

  infobox.innerHTML = `
    <h3>Ficha Moonpedia</h3>
    <div class="privacy-card ${privacy.className}"><strong>${privacy.label}</strong><span>${privacy.description}</span></div>
    <dl>
      <div><dt>Status</dt><dd>${pageStatus}</dd></div>
      <div><dt>Tipo</dt><dd>${page.type}</dd></div>
      <div><dt>Sala</dt><dd>${page.room}</dd></div>
      <div><dt>Privacidade</dt><dd>${page.privacy}</dd></div>
      <div><dt>Tema</dt><dd>${theme.label || meta.theme_id || 'tema local'}</dd></div>
      <div><dt>Fonte</dt><dd>${page.source}</dd></div>
      <div><dt>Atualização</dt><dd>${page.updated}</dd></div>
      <div><dt>Tags</dt><dd><div class="tags">${page.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div></dd></div>
    </dl>
  `;
}

function setReadingMode(mode) {
  const shell = document.querySelector('#article-shell');
  if (!shell) return;
  shell.classList.toggle('reading-only', mode === 'reading');
  document.querySelector('#knowledge-mode')?.classList.toggle('active', mode !== 'reading');
  document.querySelector('#reading-mode')?.classList.toggle('active', mode === 'reading');
}

document.querySelector('#knowledge-mode')?.addEventListener('click', () => setReadingMode('knowledge'));
document.querySelector('#reading-mode')?.addEventListener('click', () => setReadingMode('reading'));

async function initPage() {
  const [pages, manifest, privacyStates, themes] = await Promise.all([
    loadJson('../data/pages.json', {}),
    loadJson('../data/manifest.json', { pages: {} }),
    loadJson('../data/privacy-states.json', {}),
    loadJson('../data/themes.json', {}),
  ]);

  const id = getPageId();
  const page = pages[id] || fallbackPage;
  const meta = manifest.pages?.[id] || {};
  const theme = themes[meta.theme_id] || {};
  renderPage(page, meta, privacyStates, theme);
}

initPage();
