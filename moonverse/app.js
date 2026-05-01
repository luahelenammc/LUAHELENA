let rooms = [];
let memories = [];
let pages = {};
let currentAlbumPage = 0;
let currentFilter = 'all';
let atlasFilter = 'all';
let atlasSearch = '';

async function loadJson(path, fallback) {
  try {
    const response = await fetch(path);
    if (!response.ok) throw new Error(`Failed to load ${path}`);
    return await response.json();
  } catch (error) {
    console.warn(error);
    return fallback;
  }
}

const fallbackRooms = [
  {
    id: 'biblioteca', icon: '📚', title: 'Biblioteca Lunar',
    subtitle: 'Autobiografia, Moonpedia, linha do tempo, ensaios e páginas que sustentam a casa.',
    gradient: 'linear-gradient(135deg, #20152f, #6b4bb7 45%, #d8c3ff)',
    links: [{ title: 'O cheiro de maresia', description: 'Memória evocativa de infância ligada ao litoral paulista.', page: 'maresia' }],
  },
];

const fallbackMemories = [
  { id: 'maresia', title: 'O cheiro de maresia', tags: ['infância', 'praia'], affect: 'nostalgia doce', type: 'memória evocativa', description: 'A chegada ao litoral como prova sensorial de paraíso.', color: 'linear-gradient(135deg, #3b79a1, #f5bf8e)', page: 'maresia' },
];

const fallbackPages = {
  maresia: {
    type: 'MEMÓRIA EVOCATIVA', title: 'O cheiro de maresia', room: 'Biblioteca Lunar', privacy: 'publicável', source: 'autobiografia', updated: '2026-04-30',
    tags: ['infância', 'praia'], hero: 'linear-gradient(135deg, #315f7d, #f4c792)', dek: 'Memória de litoral e infância.', caption: 'Imagem evocativa.',
    summary: ['Memória de infância.'], body: [{ heading: 'A cena', text: 'A memória começa antes do mar: começa na estrada.' }], quote: 'Nem toda memória foi fotografada, mas muita memória merece imagem.',
  },
};

function pageEntries() {
  return Object.entries(pages);
}

function allPageTypes() {
  return ['all', ...new Set(pageEntries().map(([, page]) => page.type))];
}

function allMemoryTags() {
  return ['all', ...new Set(memories.flatMap((memory) => memory.tags))];
}

function renderPalaceGrid() {
  const grid = document.querySelector('#palace-grid');
  if (!grid) return;
  grid.innerHTML = rooms.map((room, index) => `
    <button class="room-card ${index === 0 ? 'active' : ''}" data-room="${room.id}">
      <span>${room.icon}</span>
      <strong>${room.title}</strong>
      <small>${room.subtitle}</small>
    </button>
  `).join('');
}

function renderRoom(roomId = rooms[0]?.id) {
  const room = rooms.find((item) => item.id === roomId) || rooms[0];
  const display = document.querySelector('#room-display');
  if (!display || !room) return;

  document.querySelectorAll('.room-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.room === room.id);
  });

  display.innerHTML = `
    <div class="room-display-inner">
      <div class="room-art" style="--room-bg:${room.gradient}">
        <span class="portal-dot"></span><span class="portal-dot"></span><span class="portal-dot"></span>
      </div>
      <div class="room-content">
        <p class="eyebrow">Sala ativa</p>
        <h3>${room.title}</h3>
        <p>${room.subtitle}</p>
        <div class="room-links">
          ${room.links.map((link) => `
            <a class="link-card" href="#article-lab" data-open-page="${link.page}">
              <strong>${link.title}</strong>
              <small>${link.description}</small>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function albumPages() {
  const chunks = [];
  for (let i = 0; i < memories.length; i += 2) chunks.push(memories.slice(i, i + 2));
  return chunks.length ? chunks : [memories];
}

function renderAlbum() {
  const spread = document.querySelector('#album-spread');
  if (!spread) return;
  const pagesChunk = albumPages();
  currentAlbumPage = Math.min(currentAlbumPage, pagesChunk.length - 1);

  spread.innerHTML = pagesChunk[currentAlbumPage].map((memory) => `
    <div>
      <button class="memory-photo" style="--memory-bg:${memory.color}" data-open-page="${memory.page}">
        <strong>${memory.title}</strong>
      </button>
      <p class="memory-caption">${memory.description}</p>
      <div class="tags">${memory.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
    </div>
  `).join('');
}

function renderMemoryFilters() {
  const filterBox = document.querySelector('#memory-filters');
  if (!filterBox) return;
  filterBox.innerHTML = allMemoryTags().map((tag) => `
    <button class="chip ${tag === currentFilter ? 'active' : ''}" data-memory-filter="${tag}">${tag === 'all' ? 'todas' : tag}</button>
  `).join('');
}

function drawMemory() {
  const pool = currentFilter === 'all' ? memories : memories.filter((memory) => memory.tags.includes(currentFilter));
  const selected = pool[Math.floor(Math.random() * pool.length)] || memories[0];
  const result = document.querySelector('#memory-result');
  if (!result || !selected) return;

  result.innerHTML = `
    <span class="badge">${selected.type}</span>
    <h4>${selected.title}</h4>
    <p>${selected.description}</p>
    <small>Afeto dominante: ${selected.affect}</small>
    <div class="tags">${selected.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
    <p><a class="link-card" href="#article-lab" data-open-page="${selected.page}"><strong>Abrir portal relacionado</strong><small>Ler na página editorial/wiki</small></a></p>
  `;
}

function renderArticlePicker() {
  const picker = document.querySelector('#article-picker');
  if (!picker) return;
  picker.innerHTML = pageEntries().slice(0, 8).map(([id, page], index) => `
    <button class="chip ${index === 0 ? 'active' : ''}" data-open-page="${id}">${page.type.split('/')[0].trim()} · ${page.title}</button>
  `).join('');
}

function renderAtlasFilters() {
  const filters = document.querySelector('#atlas-filters');
  if (!filters) return;
  filters.innerHTML = allPageTypes().map((type) => `
    <button class="chip ${type === atlasFilter ? 'active' : ''}" data-atlas-filter="${type}">${type === 'all' ? 'tudo' : type.toLowerCase()}</button>
  `).join('');
}

function renderAtlas() {
  const grid = document.querySelector('#atlas-grid');
  if (!grid) return;
  const query = atlasSearch.trim().toLowerCase();

  const results = pageEntries().filter(([, page]) => {
    const matchesType = atlasFilter === 'all' || page.type === atlasFilter;
    const haystack = `${page.title} ${page.type} ${page.room} ${page.tags.join(' ')} ${page.dek}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesType && matchesQuery;
  });

  grid.innerHTML = results.length ? results.map(([id, page]) => `
    <article class="atlas-card">
      <span class="badge">${page.type}</span>
      <h3>${page.title}</h3>
      <p>${page.dek}</p>
      <div class="tags">${page.tags.slice(0, 5).map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
      <a class="link-card" href="#article-lab" data-open-page="${id}"><strong>Abrir página</strong><small>${page.room}</small></a>
    </article>
  `).join('') : `<p class="empty-state">Nenhuma página encontrada nesse filtro. O arquivo ainda está nascendo.</p>`;
}

function renderArticle(pageId = pageEntries()[0]?.[0]) {
  const page = pages[pageId] || pages.maresia || Object.values(pages)[0];
  const article = document.querySelector('#article-view');
  const toc = document.querySelector('#toc');
  const infobox = document.querySelector('#infobox');
  if (!article || !toc || !infobox || !page) return;

  toc.innerHTML = page.body.map((section, index) => `<li><a href="#section-${index}">${section.heading}</a></li>`).join('');

  article.innerHTML = `
    <header>
      <div class="breadcrumb">☾ Hall · ${page.room} · ${page.type.toLowerCase()}</div>
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
        <a class="link-card" href="#palace"><strong>Voltar à mansão</strong><small>Retornar ao mapa de salas.</small></a>
        <a class="link-card" href="#devices"><strong>Sortear outra memória</strong><small>Usar a Máquina Mnésica.</small></a>
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

  document.querySelectorAll('[data-open-page]').forEach((button) => {
    button.classList.toggle('active', button.dataset.openPage === pageId && button.classList.contains('chip'));
  });
}

function setReadingMode(mode) {
  const shell = document.querySelector('#article-shell');
  if (!shell) return;
  shell.classList.toggle('reading-only', mode === 'reading');
  document.querySelector('#knowledge-mode')?.classList.toggle('active', mode !== 'reading');
  document.querySelector('#reading-mode')?.classList.toggle('active', mode === 'reading');
}

document.addEventListener('click', (event) => {
  const roomButton = event.target.closest('[data-room]');
  if (roomButton) renderRoom(roomButton.dataset.room);

  const pageButton = event.target.closest('[data-open-page]');
  if (pageButton) renderArticle(pageButton.dataset.openPage);

  const filterButton = event.target.closest('[data-memory-filter]');
  if (filterButton) {
    currentFilter = filterButton.dataset.memoryFilter;
    renderMemoryFilters();
    drawMemory();
  }

  const atlasButton = event.target.closest('[data-atlas-filter]');
  if (atlasButton) {
    atlasFilter = atlasButton.dataset.atlasFilter;
    renderAtlasFilters();
    renderAtlas();
  }
});

document.querySelector('#album-prev')?.addEventListener('click', () => {
  const pagesChunk = albumPages();
  currentAlbumPage = (currentAlbumPage - 1 + pagesChunk.length) % pagesChunk.length;
  renderAlbum();
});

document.querySelector('#album-next')?.addEventListener('click', () => {
  const pagesChunk = albumPages();
  currentAlbumPage = (currentAlbumPage + 1) % pagesChunk.length;
  renderAlbum();
});

document.querySelector('#random-memory')?.addEventListener('click', drawMemory);
document.querySelector('#knowledge-mode')?.addEventListener('click', () => setReadingMode('knowledge'));
document.querySelector('#reading-mode')?.addEventListener('click', () => setReadingMode('reading'));
document.querySelector('#atlas-search')?.addEventListener('input', (event) => {
  atlasSearch = event.target.value;
  renderAtlas();
});

async function init() {
  [rooms, memories, pages] = await Promise.all([
    loadJson('./data/rooms.json', fallbackRooms),
    loadJson('./data/memories.json', fallbackMemories),
    loadJson('./data/pages.json', fallbackPages),
  ]);

  renderPalaceGrid();
  renderRoom(rooms[0]?.id);
  renderMemoryFilters();
  renderAlbum();
  drawMemory();
  renderArticlePicker();
  renderAtlasFilters();
  renderAtlas();
  renderArticle('maresia');
}

init();
