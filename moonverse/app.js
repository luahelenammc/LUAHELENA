let rooms = [];
let memories = [];
let pages = {};
let currentAlbumPage = 0;
let currentFilter = 'all';
let atlasFilter = 'all';
let atlasSearch = '';

const physicalPageIds = new Set(['maresia', 'moon-source', 'sims', 'me-tornando', 'casa-arca', 'lithia']);

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

function pageHref(pageId) {
  return physicalPageIds.has(pageId) ? `./pages/${pageId}.html` : null;
}

function pageLink(pageId, title = 'Abrir página', description = 'Ler em página física do Moonverse') {
  const href = pageHref(pageId);
  if (!href) {
    return `<span class="link-card disabled-link"><strong>${title}</strong><small>${description}<br />Em incubação: página física ainda não criada.</small></span>`;
  }
  return `<a class="link-card" href="${href}" target="_blank" rel="noopener noreferrer"><strong>${title}</strong><small>${description}</small></a>`;
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
          ${room.links.map((link) => pageLink(link.page, link.title, link.description)).join('')}
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

  spread.innerHTML = pagesChunk[currentAlbumPage].map((memory) => {
    const href = pageHref(memory.page);
    const photo = `
      <span class="memory-photo" style="--memory-bg:${memory.color}">
        <strong>${memory.title}</strong>
      </span>
    `;
    return `
      <div>
        ${href ? `<a class="memory-photo-link" href="${href}" target="_blank" rel="noopener noreferrer">${photo}</a>` : photo}
        <p class="memory-caption">${memory.description}</p>
        <div class="tags">${memory.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
      </div>
    `;
  }).join('');
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
    <p>${pageLink(selected.page, 'Abrir portal relacionado', 'Ler em página física do Moonverse')}</p>
  `;
}

function renderArticlePicker() {
  const picker = document.querySelector('#article-picker');
  if (!picker) return;
  picker.innerHTML = pageEntries().map(([id, page]) => {
    const href = pageHref(id);
    const label = `${page.type.split('/')[0].trim()} · ${page.title}`;
    if (!href) return `<span class="chip disabled-link">${label} · incubação</span>`;
    return `<a class="chip" href="${href}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  }).join('');
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
      ${pageLink(id, 'Abrir página', page.room)}
    </article>
  `).join('') : `<p class="empty-state">Nenhuma página encontrada nesse filtro. O arquivo ainda está nascendo.</p>`;
}

document.addEventListener('click', (event) => {
  const roomButton = event.target.closest('[data-room]');
  if (roomButton) renderRoom(roomButton.dataset.room);

  const filterButton = event.target.closest('[data-memory-filter]');
  if (filterButton) {
    currentFilter = filterButton.dataset.memoryFilter;
    renderMemoryFilters();
    drawMemory();
  }

  const atlasButton = event.target.closest('[data-atlas-filter]');
  if (atlasButton) {
    atlasFilter = atlasButton.datasetAtlasFilter;
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
}

init();
