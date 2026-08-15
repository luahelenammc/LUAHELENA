(() => {
  const root = document.documentElement;
  const stored = localStorage.getItem('moonverse-theme');
  const systemDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  if (stored === 'light' || stored === 'night') root.dataset.theme = stored;
  else root.dataset.theme = systemDark ? 'night' : 'light';

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const next = root.dataset.theme === 'night' ? 'light' : 'night';
      root.dataset.theme = next;
      localStorage.setItem('moonverse-theme', next);
    });
  });

  document.querySelectorAll('[data-album-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      const card = button.closest('.album-card');
      const open = !card.classList.contains('is-open');
      card.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });

  const memoryButton = document.querySelector('[data-memory-pick]');
  if (memoryButton) {
    const select = document.querySelector('#memory-mode');
    const result = document.querySelector('[data-memory-result]');
    const items = [...document.querySelectorAll('.memory-fallback li')].map((li) => ({
      era: li.dataset.era || '',
      moods: (li.dataset.moods || '').split(/\s+/).filter(Boolean),
      href: li.querySelector('a')?.getAttribute('href') || '#',
      title: li.querySelector('strong')?.textContent?.trim() || 'Memória',
      short: li.querySelector('span')?.textContent?.trim() || ''
    }));
    let last = -1;
    const pick = () => {
      const mode = select.value;
      let pool = items.map((item, index) => ({ item, index })).filter(({ item }) => (
        mode === 'all' || item.era === mode || item.moods.includes(mode)
      ));
      if (pool.length > 1) pool = pool.filter(({ index }) => index !== last);
      if (!pool.length) {
        result.innerHTML = '<p>Nenhuma memória pública nessa combinação ainda.</p>';
        return;
      }
      const chosen = pool[Math.floor(Math.random() * pool.length)];
      last = chosen.index;
      result.innerHTML = `<h2>${escapeText(chosen.item.title)}</h2><p>${escapeText(chosen.item.short)}</p><a href="${safePath(chosen.item.href)}">Abrir a memória →</a>`;
    };
    memoryButton.addEventListener('click', pick);
  }

  const atlasButtons = [...document.querySelectorAll('[data-atlas-filter]')];
  if (atlasButtons.length) {
    const docNodes = [...document.querySelectorAll('.doc-node')];
    atlasButtons.forEach((button) => button.addEventListener('click', () => {
      const filter = button.dataset.atlasFilter;
      atlasButtons.forEach((b) => b.classList.toggle('is-on', b === button));
      docNodes.forEach((node) => {
        if (filter === 'all') node.classList.remove('is-dim');
        else {
          const roomName = button.textContent.trim();
          node.classList.toggle('is-dim', !node.querySelector('small')?.textContent?.includes(roomName));
        }
      });
    }));
  }

  const searchForm = document.querySelector('[data-v4-search]');
  if (searchForm) {
    const input = searchForm.querySelector('input[type="search"]');
    const results = document.querySelector('[data-v4-results]');
    const params = new URLSearchParams(location.search);
    if (params.get('q')) input.value = params.get('q');

    const renderSearch = async (query) => {
      const q = query.trim().toLocaleLowerCase('pt-BR');
      if (!q) {
        results.innerHTML = '<p>Digite um termo ou entre pela <a href="/moonverse/wiki/">Moonpedia</a>.</p>';
        return;
      }
      results.innerHTML = '<p>Procurando pela casa…</p>';
      try {
        const response = await fetch('/moonverse/assets/search-index.json');
        if (!response.ok) throw new Error(`search index ${response.status}`);
        const index = await response.json();
        const tokens = q.split(/\s+/).filter(Boolean);
        const matches = index.filter((item) => {
          const hay = `${item.title || ''} ${item.summary || ''} ${item.body || ''} ${(item.tags || []).join(' ')}`.toLocaleLowerCase('pt-BR');
          return tokens.every((token) => hay.includes(token));
        }).slice(0, 20);
        results.innerHTML = matches.length ? matches.map((item) => `<a class="search-result" href="${safePath(item.url)}"><span><strong>${escapeText(item.title)}</strong><p>${escapeText(item.summary || '')}</p></span><b aria-hidden="true">↗</b></a>`).join('') : '<p>Nenhum documento público encontrado. A fonte privada não é pesquisada por esta interface.</p>';
      } catch (error) {
        results.innerHTML = '<p>A busca não conseguiu carregar o índice. Use a <a href="/moonverse/wiki/">Moonpedia</a>.</p>';
      }
    };

    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const q = input.value.trim();
      history.replaceState(null, '', q ? `?q=${encodeURIComponent(q)}` : location.pathname);
      renderSearch(q);
    });
    if (input.value) renderSearch(input.value);
  }

  function escapeText(value = '') {
    const div = document.createElement('div');
    div.textContent = String(value);
    return div.innerHTML;
  }
  function safePath(value = '#') {
    const path = String(value);
    return path.startsWith('/moonverse/') || path.startsWith('#') ? path : '#';
  }
})();