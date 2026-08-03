(() => {
  const root = document.documentElement;

  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem('moonverse-theme');
      return value === 'night' || value === 'paper' ? value : null;
    } catch {
      return null;
    }
  };
  const storeTheme = (value) => {
    try { window.localStorage.setItem('moonverse-theme', value); } catch { /* storage is optional */ }
  };

  const storedTheme = readStoredTheme();
  const prefersNight = window.matchMedia?.('(prefers-color-scheme: dark)').matches === true;
  root.dataset.theme = storedTheme || (prefersNight ? 'night' : 'paper');

  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    const syncLabel = () => { button.textContent = root.dataset.theme === 'night' ? 'Papel' : 'Noite'; };
    syncLabel();
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'night' ? 'paper' : 'night';
      storeTheme(root.dataset.theme);
      syncLabel();
    });
  });

  const menu = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#primary-navigation');
  menu?.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') === 'true';
    menu.setAttribute('aria-expanded', String(!expanded));
    navigation?.classList.toggle('is-open', !expanded);
  });

  const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' })[char]);
  const params = new URLSearchParams(window.location.search);
  const queryFromUrl = params.get('q') || '';
  const assetRoot = document.body?.dataset.assetRoot || '/moonverse/assets/';

  async function search(query, mount) {
    const normalized = query.trim().toLocaleLowerCase('pt-BR');
    if (!normalized) {
      mount.innerHTML = '<p class="empty-note">Digite algo para começar.</p>';
      return;
    }
    try {
      const response = await fetch(`${assetRoot}search-index.json`);
      if (!response.ok) throw new Error(`Search index returned ${response.status}`);
      const index = await response.json();
      const matches = index.filter((item) => [item.title, item.summary, item.body, item.tags.join(' '), item.wing, item.type].join(' ').toLocaleLowerCase('pt-BR').includes(normalized));
      mount.innerHTML = matches.length
        ? `<ol class="search-list">${matches.map((item) => `<li><a href="${item.url}"><strong>${escapeHtml(item.title)}</strong><span>${escapeHtml(item.summary)}</span><small>${escapeHtml(item.wing)} · ${escapeHtml(item.type)}</small></a></li>`).join('')}</ol>`
        : '<p class="empty-note">Nenhuma página pública correspondeu a essa busca.</p>';
    } catch {
      mount.innerHTML = '<p class="empty-note">A busca não pôde carregar agora. O índice público continua disponível na Wiki.</p>';
    }
  }

  document.querySelectorAll('[data-search-form]').forEach((form) => {
    const input = form.querySelector('input[type="search"]');
    const results = document.querySelector('#search-results');
    if (results && queryFromUrl) {
      input.value = queryFromUrl;
      search(queryFromUrl, results);
    }
    form.addEventListener('submit', (event) => {
      if (results) {
        event.preventDefault();
        search(input.value, results);
      }
    });
  });
})();
