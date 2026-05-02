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

async function loadPages() {
  try {
    const response = await fetch('../data/pages.json');
    if (!response.ok) throw new Error('Could not load pages.json');
    return await response.json();
  } catch (error) {
    console.warn(error);
    return {};
  }
}

function getPageId() {
  return document.body.dataset.pageId || new URLSearchParams(window.location.search).get('id') || 'maresia';
}

function privacyState(privacy = '') {
  const value = privacy.toLowerCase();
  if (value.includes('sanitizado')) return { className: 'privacy-sanitized', label: 'sanitizado', note: 'Conteúdo preparado para leitura pública sem expor bastidores íntimos.' };
  if (value.includes('curadoria')) return { className: 'privacy-curated', label: 'curadoria', note: 'Conteúdo publicável com seleção cuidadosa de forma e contexto.' };
  if (value.includes('privado') || value.includes('não publicável')) return { className: 'privacy-private', label: 'restrito', note: 'Conteúdo sensível; esta página deve funcionar apenas como referência segura.' };
  if (value.includes('rascunho')) return { className: 'privacy-draft', label: 'rascunho', note: 'Página estruturalmente pronta, ainda em elaboração.' };
  return { className: 'privacy-public', label: 'publicável', note: 'Conteúdo apto para leitura pública dentro do Moonverse.' };
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

function renderPage(page) {
  const article = document.querySelector('#article-view');
  const toc = document.querySelector('#toc');
  const infobox = document.querySelector('#infobox');
  if (!article || !toc || !infobox) return;

  const privacy = privacyState(page.privacy);
  document.title = `${page.title} · True Moonverse`;
  document.body.classList.add(privacy.className);
  setMetaTag('description', page.dek);
  setMetaTag('og:title', `${page.title} · True Moonverse`, 'property');
  setMetaTag('og:description', page.dek, 'property');
  setMetaTag('og:type', 'article', 'property');

  toc.innerHTML = page.body.map((section, index) => `<li><a href="#section-${index}">${section.heading}</a></li>`).join('');

  article.innerHTML = `
    <header>
      <div class="breadcrumb"><a href="../index.html">☾ Hall</a> · ${page.room} · ${page.type.toLowerCase()}</div>
      <div class="badge-row"><span class="badge">${page.type}</span><span class="privacy-pill ${privacy.className}">${privacy.label}</span></div>
      <h1>${page.title}</h1>
      <p class="article-dek">${page.dek}</p>
      <div class="metadata"><span>${page.updated}</span><span>${page.room}</span><span>${page.privacy}</span></div>
      <figure>
        <div class="hero-image" style="--hero-bg:${page.hero}"></div>
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
    <div class="privacy-card ${privacy.className}"><strong>${privacy.label}</strong><span>${privacy.note}</span></div>
    <dl>
      <div><dt>Tipo</dt><dd>${page.type}</dd></div>
      <div><dt>Sala</dt><dd>${page.room}</dd></div>
      <div><dt>Privacidade</dt><dd>${page.privacy}</dd></div>
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
  const pages = await loadPages();
  const page = pages[getPageId()] || fallbackPage;
  renderPage(page);
}

initPage();
