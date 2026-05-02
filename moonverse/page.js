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

function renderPage(page) {
  const article = document.querySelector('#article-view');
  const toc = document.querySelector('#toc');
  const infobox = document.querySelector('#infobox');
  if (!article || !toc || !infobox) return;

  document.title = `${page.title} · True Moonverse`;

  toc.innerHTML = page.body.map((section, index) => `<li><a href="#section-${index}">${section.heading}</a></li>`).join('');

  article.innerHTML = `
    <header>
      <div class="breadcrumb"><a href="../index.html">☾ Hall</a> · ${page.room} · ${page.type.toLowerCase()}</div>
      <span class="badge">${page.type}</span>
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
