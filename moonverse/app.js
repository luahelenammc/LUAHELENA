let rooms = [];
let memories = [];
let pages = {};
let manifest = { pages: {} };
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

function stock() {
  return window.MoonverseStockImages;
}

function parseTags(value = '') {
  return String(value).split(',').map((tag) => tag.trim()).filter(Boolean);
}

function applyInitialStockImages() {
  document.querySelectorAll('.stock-surface').forEach((surface) => {
    stock()?.applyStockImage(surface, parseTags(surface.dataset.stockTags));
    stock()?.attachStockButton(surface, surface, parseTags(surface.dataset.stockTags));
  });
}

function pageMeta(pageId) {
  return manifest.pages?.[pageId] || {};
}

function pageEntries() {
  return Object.entries(pages).filter(([id]) => pageMeta(id).atlas_visible !== false);
}

function pageHref(pageId) {
  const meta = pageMeta(pageId);
  if (meta.wrapper) return `./${meta.wrapper}`;
  if (meta.status === 'notion-indexed') return null;
  return pages[pageId] ? `./pages/${pageId}.html` : null;
}

function statusLabel(pageId) {
  const status = pageMeta(pageId).status || 'draft';
  return `<span class="tag status-tag status-${status}">${status}</span>`;
}

function pageLink(pageId, title = 'Abrir página', description = 'Ler em página física do Moonverse') {
  const href = pageHref(pageId);
  if (!href) {
    return `<span class="link-card disabled-link"><strong>${title}</strong><small>${description}<br />Em staging: importado do Notion, ainda sem página física pública.</small></span>`;
  }
  return `<a class="link-card" href="${href}" target="_blank" rel="noopener noreferrer"><strong>${title}</strong><small>${description}</small></a>`;
}

function allPageTypes() {
  return ['all', ...new Set(pageEntries().map(([, page]) => page.type))];
}

function allMemoryTags() {
  return ['all', ...new Set(memories.flatMap((memory) => memory.tags))];
}

function plainFromMarkdown(markdown = '') {
  return String(markdown)
    .replace(/^#+\s*/gm, '')
    .replace(/\n{2,}/g, ' ')
    .trim();
}

function tagsForNotionEntry(entry = {}) {
  const tags = ['Notion', 'Moonwiki'];
  if (entry.source_kind) tags.push(entry.source_kind);
  if (entry.title?.toLowerCase().includes('trans')) tags.push('transição');
  if (entry.title?.toLowerCase().includes('hospital')) tags.push('hospital');
  if (entry.title?.toLowerCase().includes('ufpr')) tags.push('UFPR');
  return [...new Set(tags)];
}

function typeForNotionEntry(entry = {}) {
  if (entry.source_kind === 'timeline') return 'MOONWIKI / LINHA DO TEMPO';
  if (entry.source_kind === 'database_page') return 'MOONWIKI / DATABASE';
  return 'MOONWIKI / VERBETE IMPORTADO';
}

function roomForNotionEntry(entry = {}) {
  const title = (entry.title || '').toLowerCase();
  if (title.includes('trans') || title.includes('nome') || title.includes('thf') || title.includes('crs')) return 'Espelho d’Água';
  if (title.includes('hospital') || title.includes('crispim')) return 'Observatório Nexus';
  return 'Biblioteca Lunar';
}

function pageFromNotionIndexEntry(entry = {}) {
  return {
    type: typeForNotionEntry(entry),
    title: entry.title,
    room: roomForNotionEntry(entry),
    privacy: 'staging / precisa de curadoria',
    source: 'Notion Moonwiki Biography',
    updated: entry.notion_last_seen || '2026-05-14',
    tags: tagsForNotionEntry(entry),
    hero: 'linear-gradient(135deg, #211734 0%, #6b4bb7 45%, #e8d7ff 100%)',
    dek: entry.highlight || 'Verbete importado do Notion para staging do Moonverse.',
    caption: 'Entrada importada do Notion; visual e publicação dependem de curadoria posterior.',
    summary: [
      'Entrada recuperada do Notion Moonwiki Biography.',
      'Aparece no Atlas como staging para revisão editorial.',
      'Só vira página pública completa depois de curadoria de privacidade, tema e wrapper.'
    ],
    body: [
      { heading: 'Estado da importação', text: `Este verbete foi indexado a partir do Notion. Status: ${entry.import_status || 'indexed_only'}.` },
      { heading: 'Fonte', text: entry.url || 'URL não registrada.' }
    ],
    quote: 'Notion é fonte; Moonverse é renderização curada.'
  };
}

function pageFromFullNotionEntry(slug, entry = {}) {
  const plain = plainFromMarkdown(entry.content_markdown || '');
  return {
    type: 'MOONWIKI / IMPORTADO DO NOTION',
    title: entry.title || slug,
    room: roomForNotionEntry(entry),
    privacy: 'staging / precisa de curadoria',
    source: 'Notion Moonwiki Biography',
    updated: '2026-05-14',
    tags: [...new Set(['Notion', 'Moonwiki', ...(entry.properties?.['Fase da vida'] || []), ...(entry.properties?.['Tipo de evento'] || [])])],
    hero: 'linear-gradient(135deg, #211734 0%, #6b4bb7 45%, #e8d7ff 100%)',
    dek: plain.slice(0, 220) + (plain.length > 220 ? '…' : ''),
    caption: 'Conteúdo integral extraído do Notion; ainda em staging editorial.',
    summary: [
      'Conteúdo integral já importado do Notion.',
      'Entrada visível no Atlas para conferência.',
      'Publicação plena depende de curadoria de privacidade e acabamento visual.'
    ],
    body: [
      { heading: 'Texto importado do Notion', text: plain },
      { heading: 'Fonte', text: entry.source_url || 'URL não registrada.' }
    ],
    quote: 'O arquivo chega primeiro como dado; só depois vira sala habitável.'
  };
}

function mergeNotionImports(notionIndex = {}, notionFull = {}) {
  const entries = Array.isArray(notionIndex.entries) ? notionIndex.entries : [];
  for (const entry of entries) {
    if (!entry.slug || pages[entry.slug]) continue;
    pages[entry.slug] = pageFromNotionIndexEntry(entry);
    manifest.pages = manifest.pages || {};
    manifest.pages[entry.slug] = manifest.pages[entry.slug] || {
      status: entry.import_status === 'full_fetched' ? 'notion-imported' : 'notion-indexed',
      privacy_state: 'curated',
      theme_id: 'placeholder_lunar',
      atlas_visible: true,
      room_visible: false,
      wrapper: null
    };
  }

  const fullPages = notionFull.pages || {};
  for (const [slug, entry] of Object.entries(fullPages)) {
    pages[slug] = pageFromFullNotionEntry(slug, entry);
    manifest.pages = manifest.pages || {};
    manifest.pages[slug] = {
      ...(manifest.pages[slug] || {}),
      status: 'notion-imported',
      privacy_state: 'curated',
      theme_id: 'placeholder_lunar',
      atlas_visible: true,
      room_visible: true,
      wrapper: `pages/${slug}.html`
    };
  }
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

  const roomTags = [room.title, room.id, ...(room.links || []).map((link) => pages[link.page]?.tags || []).flat()].filter(Boolean);

  display.innerHTML = `
    <div class="room-display-inner">
      <div class="room-art stock-surface" data-stock-tags="${roomTags.join(', ')}" style="--room-bg:${room.gradient}">
        <span class="portal-dot"></span><span class="portal-dot"></span><span class="portal-dot"></span>
      </div>
      <div class="room-content">
        <p class="eyebrow">Sala ativa</p>
        <h3>${room.title}</h3>
        <p>${room.subtitle}</p>
        <div class="room-links">
          ${room.links
            .filter((link) => pageMeta(link.page).room_visible !== false)
            .map((link) => pageLink(link.page, link.title, `${link.description} · ${pageMeta(link.page).status || 'draft'}`))
            .join('')}
        </div>
      </div>
    </div>
  `;

  const surface = display.querySelector('.room-art.stock-surface');
  stock()?.applyStockImage(surface, roomTags);
  stock()?.attachStockButton(surface, surface, roomTags);
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

  spread.innerHTML = pagesChunk[currentAlbumPage].map((memory, index) => {
    const href = pageHref(memory.page);
    const photo = `
      <span class="memory-photo stock-surface" data-stock-tags="${memory.tags.join(', ')}" style="--memory-bg:${memory.color}">
        <strong>${memory.title}</strong>
      </span>
    `;
    return `
      <div>
        ${href ? `<a class="memory-photo-link" href="${href}" target="_blank" rel="noopener noreferrer">${photo}</a>` : photo}
        <p class="memory-caption">${memory.description}</p>
        <div class="tags">${memory.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')} ${statusLabel(memory.page)}</div>
      </div>
    `;
  }).join('');

  spread.querySelectorAll('.memory-photo.stock-surface').forEach((surface) => {
    stock()?.applyStockImage(surface, parseTags(surface.dataset.stockTags), { width: 700, height: 520 });
    const container = surface.closest('.memory-photo-link') || surface;
    stock()?.attachStockButton(container, surface, parseTags(surface.dataset.stockTags), 'Trocar imagem');
  });
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
    <div class="memory-result-image stock-surface" data-stock-tags="${selected.tags.join(', ')}"></div>
    <span class="badge">${selected.type}</span>
    ${statusLabel(selected.page)}
    <h4>${selected.title}</h4>
    <p>${selected.description}</p>
    <small>Afeto dominante: ${selected.affect}</small>
    <div class="tags">${selected.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
    <p>${pageLink(selected.page, 'Abrir portal relacionado', 'Ler em página física do Moonverse')}</p>
  `;

  const surface = result.querySelector('.memory-result-image.stock-surface');
  stock()?.applyStockImage(surface, selected.tags, { width: 900, height: 520 });
  stock()?.attachStockButton(surface, surface, selected.tags, 'Trocar imagem');
}

function renderArticlePicker() {
  const picker = document.querySelector('#article-picker');
  if (!picker) return;
  picker.innerHTML = pageEntries().map(([id, page]) => {
    const href = pageHref(id);
    const label = `${page.type.split('/')[0].trim()} · ${page.title}`;
    if (!href) return `<span class="chip disabled-link">${label} · staging</span>`;
    return `<a class="chip" href="${href}" target="_blank" rel="noopener noreferrer">${label} · ${pageMeta(id).status || 'draft'}</a>`;
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

  const results = pageEntries().filter(([id, page]) => {
    const meta = pageMeta(id);
    const matchesType = atlasFilter === 'all' || page.type === atlasFilter;
    const haystack = `${page.title} ${page.type} ${page.room} ${page.tags.join(' ')} ${page.dek} ${meta.status || ''} ${meta.privacy_state || ''}`.toLowerCase();
    const matchesQuery = !query || haystack.includes(query);
    return matchesType && matchesQuery;
  });

  grid.innerHTML = results.length ? results.map(([id, page]) => `
    <article class="atlas-card status-${pageMeta(id).status || 'draft'}">
      <div class="atlas-thumb stock-surface" data-stock-tags="${page.tags.join(', ')}"></div>
      <span class="badge">${page.type}</span>
      ${statusLabel(id)}
      <h3>${page.title}</h3>
      <p>${page.dek}</p>
      <div class="tags">${page.tags.slice(0, 5).map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
      ${pageLink(id, 'Abrir página', page.room)}
    </article>
  `).join('') : `<p class="empty-state">Nenhuma página encontrada nesse filtro. O arquivo ainda está nascendo.</p>`;

  grid.querySelectorAll('.atlas-thumb.stock-surface').forEach((surface) => {
    stock()?.applyStockImage(surface, parseTags(surface.dataset.stockTags), { width: 700, height: 420 });
    stock()?.attachStockButton(surface, surface, parseTags(surface.dataset.stockTags), 'Trocar');
  });
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
document.querySelector('#atlas-search')?.addEventListener('input', (event) => {
  atlasSearch = event.target.value;
  renderAtlas();
});

async function init() {
  const [loadedRooms, loadedMemories, loadedPages, loadedManifest, notionIndex, notionFull] = await Promise.all([
    loadJson('./data/rooms.json', fallbackRooms),
    loadJson('./data/memories.json', fallbackMemories),
    loadJson('./data/pages.json', fallbackPages),
    loadJson('./data/manifest.json', { pages: {} }),
    loadJson('./data/notion/moonwiki-biography-index.json', { entries: [] }),
    loadJson('./data/notion/moonwiki-biography-full-pages.json', { pages: {} }),
  ]);

  rooms = loadedRooms;
  memories = loadedMemories;
  pages = loadedPages;
  manifest = loadedManifest;
  mergeNotionImports(notionIndex, notionFull);

  renderPalaceGrid();
  renderRoom(rooms[0]?.id);
  renderMemoryFilters();
  renderAlbum();
  drawMemory();
  renderArticlePicker();
  renderAtlasFilters();
  renderAtlas();
  applyInitialStockImages();
}

init();