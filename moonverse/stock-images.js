const stockPools = {
  sea: ['sea', 'beach', 'coast', 'ocean', 'waves'],
  nostalgia: ['vintage,computer', 'retro,bedroom', 'old,television', 'music,room', 'analog'],
  archive: ['library', 'archive', 'books', 'study', 'museum'],
  ai: ['abstract,technology', 'data,light', 'network', 'interface', 'future'],
  sanctuary: ['plants,home', 'garden,house', 'greenhouse', 'forest,light', 'botanical'],
  mirror: ['mirror,water', 'soft,portrait', 'reflection', 'water,light', 'pastel'],
  fantasy: ['map,desk', 'mountains,mist', 'old,map', 'castle,landscape', 'mythic,forest'],
  moon: ['moon,night', 'stars', 'night,window', 'dreamy,light', 'purple,sky'],
};

const pinterestPools = {
  sea: ['nostalgic beach editorial', 'childhood beach memory aesthetic', 'coastal nostalgia photography'],
  nostalgia: ['early 2000s bedroom aesthetic', 'retro internet room aesthetic', 'nostalgic computer bedroom'],
  archive: ['dark academia library aesthetic', 'editorial library photography', 'archive room aesthetic'],
  ai: ['abstract technology editorial aesthetic', 'digital archive aesthetic', 'futuristic interface editorial'],
  sanctuary: ['indoor garden sanctuary aesthetic', 'plant filled home aesthetic', 'greenhouse home editorial'],
  mirror: ['mirror water editorial aesthetic', 'soft feminine reflection aesthetic', 'pastel identity editorial'],
  fantasy: ['fantasy cartography desk aesthetic', 'worldbuilding map aesthetic', 'mythic forest editorial'],
  moon: ['moonlit room aesthetic', 'purple moon aesthetic', 'dreamy night editorial'],
};

const tagMap = {
  'praia': 'sea',
  'mar': 'sea',
  'água': 'sea',
  'infância': 'nostalgia',
  'nostalgia': 'nostalgia',
  'internet antiga': 'nostalgia',
  'jogos': 'nostalgia',
  'the sims 1': 'nostalgia',
  'biblioteca': 'archive',
  'arquivo': 'archive',
  'moonpedia': 'archive',
  'ia': 'ai',
  'sistema': 'ai',
  'observatório': 'ai',
  'santuário': 'sanctuary',
  'natureza': 'sanctuary',
  'casa': 'sanctuary',
  'futuro': 'sanctuary',
  'espelho': 'mirror',
  'corpo': 'mirror',
  'transição': 'mirror',
  'feminilidade': 'mirror',
  'fantasia': 'fantasy',
  'mapa': 'fantasy',
  'mitologia': 'fantasy',
  'worldbuilding': 'fantasy',
  'lua': 'moon',
  'noite': 'moon',
};

function normalizeTag(value = '') {
  return String(value).trim().toLowerCase();
}

function poolForTags(tags = []) {
  for (const tag of tags.map(normalizeTag)) {
    const pool = tagMap[tag];
    if (pool) return pool;
  }
  return 'moon';
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function stockUrl(tags = [], width = 1200, height = 820) {
  const pool = poolForTags(tags);
  const query = pick(stockPools[pool] || stockPools.moon);
  const lock = Math.floor(Math.random() * 100000);
  return `https://loremflickr.com/${width}/${height}/${encodeURIComponent(query)}?lock=${lock}`;
}

function pinterestSearchUrl(tags = []) {
  const pool = poolForTags(tags);
  const query = pick(pinterestPools[pool] || pinterestPools.moon);
  return `https://www.pinterest.com/search/pins/?q=${encodeURIComponent(query)}`;
}

function applyStockImage(element, tags = [], options = {}) {
  if (!element) return null;
  const width = options.width || 1200;
  const height = options.height || 820;
  const url = stockUrl(tags, width, height);
  element.style.setProperty('--stock-image', `url("${url}")`);
  element.classList.add('has-stock-image');
  element.dataset.stockTags = tags.join(', ');
  return url;
}

function attachStockButton(container, target, tags, label = 'Sortear imagem') {
  if (!container || !target) return;
  if (container.querySelector('.stock-refresh')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'stock-refresh';
  button.textContent = label;
  button.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    applyStockImage(target, tags);
  });
  container.appendChild(button);
}

function attachPinterestButton(container, tags, label = 'Pinterest') {
  if (!container) return;
  if (container.querySelector('.pinterest-search')) return;

  const link = document.createElement('a');
  link.className = 'pinterest-search';
  link.href = pinterestSearchUrl(tags);
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = label;
  link.addEventListener('click', (event) => {
    event.stopPropagation();
  });
  container.appendChild(link);
}

window.MoonverseStockImages = {
  stockUrl,
  pinterestSearchUrl,
  applyStockImage,
  attachStockButton,
  attachPinterestButton,
  poolForTags,
};
