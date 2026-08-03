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

  function enhanceArticleReading() {
    if (!document.body.classList.contains('article-page')) return;

    const style = document.createElement('style');
    style.dataset.moonverseReadingLayer = 'v2.1';
    style.textContent = `
      .article-page .site-header {
        position: sticky;
        top: 0;
        z-index: 30;
        background: color-mix(in srgb, var(--paper) 90%, transparent);
        -webkit-backdrop-filter: blur(18px);
        backdrop-filter: blur(18px);
      }
      .article-page .header-inner { min-height: 4.65rem; }
      .article-page .breadcrumb { width: min(1360px, calc(100% - 3rem)); padding-top: 1.15rem; }
      .article-page .article-layout {
        width: min(1360px, calc(100% - 3rem));
        grid-template-columns: minmax(170px, 220px) minmax(0, 790px) minmax(220px, 280px);
        gap: clamp(1.5rem, 3vw, 3rem);
        padding-block: 2.5rem 6rem;
      }
      .article-page .article-header {
        position: relative;
        padding: .25rem 0 2.3rem;
      }
      .article-header-rule {
        display: block;
        width: 4.6rem;
        height: .34rem;
        margin-bottom: 1.45rem;
        border-radius: 999px;
        background: var(--wing-accent, var(--plum));
      }
      .article-page .article-header h1 {
        max-width: 12ch;
        margin-bottom: 1.2rem;
        font-size: clamp(2.65rem, 5vw, 4.85rem);
        line-height: .99;
        letter-spacing: -.045em;
        text-wrap: balance;
      }
      .article-page .article-lead {
        max-width: 44rem;
        font-size: clamp(1.14rem, 1.8vw, 1.42rem);
        line-height: 1.46;
      }
      .article-page .article-meta { flex-wrap: wrap; }
      .article-page .article-rail { top: 6.2rem; }
      .article-toc details { border-top: 2px solid var(--plum); padding-top: .9rem; }
      .article-toc summary {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: .75rem;
        color: var(--ink);
        cursor: pointer;
        font-size: .69rem;
        font-weight: 650;
        letter-spacing: .12em;
        list-style: none;
        text-transform: uppercase;
      }
      .article-toc summary::-webkit-details-marker { display: none; }
      .article-toc summary::after { content: '−'; color: var(--plum); font-size: 1rem; }
      .article-toc details:not([open]) summary::after { content: '+'; }
      .article-toc ol { margin: .9rem 0 0; padding: 0; list-style: none; }
      .article-toc li { margin: .12rem 0; }
      .article-toc a {
        display: block;
        padding: .42rem .55rem;
        border-left: 2px solid transparent;
        color: var(--ink-soft);
        line-height: 1.35;
        text-decoration: none;
        transition: border-color .18s ease, color .18s ease, background .18s ease;
      }
      .article-toc a:hover,
      .article-toc a.is-active {
        border-left-color: var(--plum);
        background: var(--paper-deep);
        color: var(--ink);
      }
      .article-page .article-infobox {
        padding: 1rem 1.1rem 1.15rem;
        border: 1px solid var(--rule);
        border-radius: 1.15rem;
        background: var(--paper-deep);
        box-shadow: 0 .9rem 2.5rem color-mix(in srgb, var(--ink) 8%, transparent);
      }
      .article-page .infobox-rule { border-radius: 999px; }
      .article-page .prose {
        padding-block: 2.6rem;
        font-size: 1.1rem;
        line-height: 1.76;
      }
      .article-page .prose h2 {
        margin-top: 3.25rem;
        padding-top: 1.45rem;
        border-top: 1px solid var(--rule);
        font-size: clamp(1.9rem, 3vw, 2.4rem);
        scroll-margin-top: 7rem;
      }
      .article-page .prose h3,
      .article-page .prose h4 { scroll-margin-top: 7rem; }
      .article-page .prose figure {
        margin: 2.2rem 0;
        padding: .3rem;
        border: 1px solid var(--rule);
        border-radius: .9rem;
        background: var(--paper-deep);
      }
      .article-page .prose figure img { display: block; width: 100%; height: auto; border-radius: .65rem; }
      .article-page .prose figcaption {
        padding: .75rem .65rem .55rem;
        color: var(--ink-faint);
        font-family: var(--sans);
        font-size: .76rem;
        text-align: center;
      }
      .article-page .source-notes {
        padding: 1.15rem 1.3rem;
        border: 1px solid var(--rule);
        border-radius: .95rem;
        background: var(--paper-deep);
      }
      .article-page .related-block { margin-top: 2.4rem; padding-top: 1.4rem; }
      .article-page .relation-list { display: grid; gap: .55rem; }
      .article-page .relation-list li {
        align-items: center;
        padding: .78rem .85rem;
        border: 1px solid var(--rule);
        border-radius: .8rem;
        background: color-mix(in srgb, var(--paper-deep) 64%, transparent);
      }
      .back-to-top {
        display: inline-flex;
        gap: .45rem;
        margin-top: 2rem;
        color: var(--plum);
        font-family: var(--sans);
        font-size: .76rem;
        letter-spacing: .04em;
        text-decoration: none;
      }
      @media (max-width: 1120px) {
        .article-page .article-layout { grid-template-columns: 180px minmax(0, 760px); }
        .article-page .article-infobox { grid-column: 2; position: static; }
      }
      @media (max-width: 760px) {
        .article-page .site-header { position: static; }
        .article-page .breadcrumb,
        .article-page .article-layout { width: min(100% - 2rem, 790px); }
        .article-page .article-layout { display: block; padding-block: 1.5rem 4rem; }
        .article-page .article-header h1 { max-width: none; font-size: clamp(2.55rem, 13vw, 4.2rem); }
        .article-page .article-toc { margin-bottom: 2rem; padding: 0; border: 0; }
        .article-page .article-toc ol { display: block; padding: 0; }
        .article-page .article-toc a { padding-block: .5rem; }
        .article-page .article-infobox { display: block; margin-top: 2rem; }
      }
    `;
    document.head.append(style);

    const header = document.querySelector('.article-header');
    if (header && !header.querySelector('.article-header-rule')) {
      const rule = document.createElement('span');
      rule.className = 'article-header-rule';
      rule.setAttribute('aria-hidden', 'true');
      const infoboxRule = document.querySelector('.infobox-rule');
      const wingAccent = infoboxRule ? getComputedStyle(infoboxRule).backgroundColor : '';
      if (wingAccent) rule.style.background = wingAccent;
      header.prepend(rule);
    }

    const toc = document.querySelector('.article-toc');
    if (toc && !toc.querySelector('details')) {
      toc.setAttribute('aria-label', 'Sumário da página');
      const details = document.createElement('details');
      details.open = true;
      const summary = document.createElement('summary');
      summary.textContent = 'Conteúdo';
      const list = toc.querySelector('ol');
      details.append(summary);
      if (list) details.append(list);
      toc.replaceChildren(details);
    }

    const infobox = document.querySelector('.article-infobox');
    infobox?.setAttribute('aria-label', 'Ficha da entrada');

    const article = document.querySelector('.article');
    if (article && !article.querySelector('.back-to-top')) {
      const back = document.createElement('a');
      back.className = 'back-to-top';
      back.href = '#main-content';
      back.innerHTML = 'Voltar ao início <span aria-hidden="true">↑</span>';
      article.append(back);
    }

    const tocLinks = [...document.querySelectorAll('.article-toc a[href^="#"]')];
    const sectionPairs = tocLinks
      .map((link) => ({ link, section: document.querySelector(link.getAttribute('href')) }))
      .filter((pair) => pair.section);
    if (sectionPairs.length && 'IntersectionObserver' in window) {
      const setActive = (id) => {
        sectionPairs.forEach(({ link, section }) => link.classList.toggle('is-active', section.id === id));
      };
      const observer = new IntersectionObserver((entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      }, { rootMargin: '-18% 0px -68% 0px', threshold: [0, 1] });
      sectionPairs.forEach(({ section }) => observer.observe(section));
      setActive(sectionPairs[0].section.id);
    }
  }

  enhanceArticleReading();
})();
