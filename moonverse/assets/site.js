(() => {
  const root = document.documentElement;
  const body = document.body;

  const readStoredTheme = () => {
    try {
      const value = window.localStorage.getItem('moonverse-theme');
      return value === 'night' || value === 'paper' ? value : null;
    } catch {
      return null;
    }
  };

  const storeTheme = (value) => {
    try { window.localStorage.setItem('moonverse-theme', value); } catch { /* optional */ }
  };

  const storedTheme = readStoredTheme();
  const prefersNight = window.matchMedia?.('(prefers-color-scheme: dark)').matches === true;
  root.dataset.theme = storedTheme || (prefersNight ? 'night' : 'paper');

  const style = document.createElement('style');
  style.dataset.moonverseDesign = 'wikiwand-v3';
  style.textContent = `
    :root {
      --reader-scale: 1;
      --ww-bg: #f4f5f7;
      --ww-surface: #ffffff;
      --ww-surface-soft: #f8f9fb;
      --ww-border: #dde1e7;
      --ww-border-strong: #c8ced7;
      --ww-text: #20242a;
      --ww-muted: #626b77;
      --ww-faint: #838c98;
      --ww-link: #6b4d8d;
      --ww-shadow: 0 1px 2px rgba(26, 31, 38, .04), 0 12px 34px rgba(26, 31, 38, .07);
      --ww-radius: 14px;
      --ww-header-height: 64px;
    }

    :root[data-theme="night"] {
      --ww-bg: #181a1f;
      --ww-surface: #22252b;
      --ww-surface-soft: #292d34;
      --ww-border: #3a3f49;
      --ww-border-strong: #505764;
      --ww-text: #eef0f3;
      --ww-muted: #b7bec8;
      --ww-faint: #8e97a4;
      --ww-link: #c3a7e2;
      --ww-shadow: 0 1px 2px rgba(0, 0, 0, .25), 0 18px 42px rgba(0, 0, 0, .22);
    }

    html { background: var(--ww-bg); }
    body {
      background: var(--ww-bg);
      color: var(--ww-text);
      font-family: Inter, ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    }

    a { text-decoration-thickness: .06em; text-underline-offset: .16em; }
    a:hover { color: var(--ww-link); }

    .site-header {
      position: sticky;
      top: 0;
      z-index: 50;
      border-bottom: 1px solid var(--ww-border);
      background: color-mix(in srgb, var(--ww-surface) 94%, transparent);
      -webkit-backdrop-filter: blur(18px) saturate(1.2);
      backdrop-filter: blur(18px) saturate(1.2);
      box-shadow: 0 1px 0 rgba(0, 0, 0, .02);
    }

    .header-inner {
      width: min(1480px, calc(100% - 2rem));
      min-height: var(--ww-header-height);
      display: grid;
      grid-template-columns: auto minmax(220px, 640px) auto;
      align-items: center;
      gap: 1.25rem;
    }

    .wordmark { min-width: max-content; gap: .6rem; }
    .wordmark strong { font-family: Georgia, "Times New Roman", serif; font-size: 1.08rem; font-weight: 650; }
    .wordmark small { font-size: .58rem; letter-spacing: .08em; }
    .wordmark-mark { width: 1.9rem; height: 1.9rem; }
    .wordmark-mark::before { width: 1.1rem; height: 1.1rem; left: .34rem; top: .13rem; }
    .wordmark-mark span { width: 1.1rem; height: 1.1rem; left: .57rem; top: .13rem; background: var(--ww-surface); }

    .header-search {
      width: 100%;
      display: flex;
      align-items: center;
      border: 1px solid var(--ww-border);
      border-radius: 999px;
      background: var(--ww-surface-soft);
      overflow: hidden;
      transition: border-color .18s ease, box-shadow .18s ease, background .18s ease;
    }
    .header-search:focus-within {
      border-color: var(--plum);
      background: var(--ww-surface);
      box-shadow: 0 0 0 3px color-mix(in srgb, var(--plum) 18%, transparent);
    }
    .header-search input {
      min-width: 0;
      flex: 1;
      border: 0;
      outline: 0;
      padding: .62rem .85rem .62rem 1rem;
      background: transparent;
      color: var(--ww-text);
      font-size: .86rem;
    }
    .header-search input::placeholder { color: var(--ww-faint); }
    .header-search button {
      border: 0;
      padding: .62rem .9rem;
      background: transparent;
      color: var(--ww-link);
      font-size: .75rem;
      font-weight: 650;
    }

    .primary-nav { justify-self: end; gap: 1rem; font-size: .72rem; }
    .primary-nav a { color: var(--ww-muted); }
    .primary-nav a:hover, .primary-nav a.is-active { color: var(--ww-text); }
    .theme-toggle, .menu-toggle {
      border-color: var(--ww-border-strong);
      border-radius: 999px;
      color: var(--ww-muted);
      background: var(--ww-surface);
    }

    main { min-height: calc(100vh - 150px); }
    .page-wrap { width: min(1320px, calc(100% - 2rem)); }

    .home-intro {
      min-height: auto;
      padding-block: 4.5rem 3rem;
      grid-template-columns: minmax(0, 1.25fr) minmax(280px, .75fr);
      gap: 3.5rem;
    }
    .home-intro h1 {
      max-width: 14ch;
      font-size: clamp(2.9rem, 6.5vw, 5.8rem);
      line-height: .96;
    }
    .intro-dek { max-width: 720px; color: var(--ww-muted); font-size: clamp(1.08rem, 1.7vw, 1.32rem); }
    .home-plate {
      min-height: 22rem;
      padding: 2rem;
      border: 1px solid var(--ww-border);
      border-radius: var(--ww-radius);
      background: var(--ww-surface);
      box-shadow: var(--ww-shadow);
    }
    .home-plate p { font-size: 1.75rem; }
    .moon-plate-mark span { background: var(--ww-surface); }

    .section-block {
      margin-bottom: 1.25rem;
      padding: 2.25rem;
      border: 1px solid var(--ww-border);
      border-radius: var(--ww-radius);
      background: var(--ww-surface);
      box-shadow: 0 1px 2px rgba(26, 31, 38, .025);
    }
    .section-block + .section-block { border-top: 1px solid var(--ww-border); }
    .section-label { margin-bottom: 1.5rem; color: var(--ww-faint); }
    .section-heading { margin-bottom: 1.8rem; }
    .section-heading h2, .feature-grid h2 { font-size: clamp(1.9rem, 3.3vw, 3rem); line-height: 1.08; }
    .feature-grid { gap: 3rem; }
    .feature-note { border-left-color: var(--ww-border-strong); }
    .atlas-teaser { background: var(--ww-surface); }
    .mini-constellation { border-color: var(--ww-border-strong); }

    .wing-line, .path-line, .entry-row a {
      border-color: var(--ww-border);
      border-radius: 9px;
      padding-inline: .7rem;
    }
    .wing-line:hover, .path-line:hover, .entry-row a:hover { background: var(--ww-surface-soft); }

    .page-heading {
      margin-top: 1.5rem;
      padding: 3rem;
      border: 1px solid var(--ww-border);
      border-radius: var(--ww-radius);
      background: var(--ww-surface);
      box-shadow: var(--ww-shadow);
    }
    .page-heading h1 { font-size: clamp(2.7rem, 5.8vw, 5.1rem); }
    .index-layout, .timeline-layout, .atlas-layout, .about-layout { gap: 2rem; padding-block: 2rem 4rem; }
    .context-note, .atlas-list {
      padding: 1.15rem;
      border: 1px solid var(--ww-border);
      border-top: 3px solid var(--plum);
      border-radius: 10px;
      background: var(--ww-surface);
    }
    .index-group {
      padding: 1.4rem;
      border: 1px solid var(--ww-border);
      border-radius: 12px;
      background: var(--ww-surface);
    }
    .index-group h2 { font-size: 1.55rem; }

    .breadcrumb {
      width: min(1440px, calc(100% - 2rem));
      padding-top: 1rem;
      color: var(--ww-faint);
      font-size: .72rem;
    }

    .article-layout {
      width: min(1440px, calc(100% - 2rem));
      grid-template-columns: minmax(190px, 230px) minmax(0, 780px) minmax(230px, 280px);
      gap: clamp(1.4rem, 2.7vw, 2.75rem);
      align-items: start;
      padding-block: 1.4rem 5rem;
    }

    .article-page .article {
      min-width: 0;
      padding: clamp(2rem, 4vw, 3.6rem);
      border: 1px solid var(--ww-border);
      border-radius: var(--ww-radius);
      background: var(--ww-surface);
      box-shadow: var(--ww-shadow);
    }

    .article-page .article-header {
      padding: 0 0 2rem;
      border-bottom: 1px solid var(--ww-border);
    }
    .article-header-rule {
      display: block;
      width: 3.5rem;
      height: .28rem;
      margin-bottom: 1.2rem;
      border-radius: 999px;
      background: var(--wing-accent, var(--plum));
    }
    .article-page .article-header h1 {
      max-width: 18ch;
      margin-bottom: 1rem;
      font-size: clamp(2.45rem, 4.2vw, 4.25rem);
      line-height: 1.02;
      letter-spacing: -.035em;
      text-wrap: balance;
    }
    .article-page .article-lead {
      max-width: 46rem;
      color: var(--ww-muted);
      font-size: clamp(1.08rem, 1.55vw, 1.3rem);
      line-height: 1.5;
    }
    .article-page .article-meta { flex-wrap: wrap; color: var(--ww-faint); }

    .article-rail { top: calc(var(--ww-header-height) + 1.2rem); color: var(--ww-muted); }
    .article-toc {
      padding: .9rem;
      border: 1px solid var(--ww-border);
      border-radius: 10px;
      background: var(--ww-surface);
    }
    .article-toc details { padding: 0; border: 0; }
    .article-toc summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: .75rem;
      color: var(--ww-text);
      cursor: pointer;
      font-size: .67rem;
      font-weight: 750;
      letter-spacing: .1em;
      list-style: none;
      text-transform: uppercase;
    }
    .article-toc summary::-webkit-details-marker { display: none; }
    .article-toc summary::after { content: '−'; color: var(--ww-link); font-size: 1rem; }
    .article-toc details:not([open]) summary::after { content: '+'; }
    .article-toc ol { margin: .75rem 0 0; padding: 0; list-style: none; }
    .article-toc li { margin: .08rem 0; }
    .article-toc a {
      display: block;
      padding: .4rem .5rem;
      border-left: 2px solid transparent;
      border-radius: 0 6px 6px 0;
      color: var(--ww-muted);
      line-height: 1.32;
      text-decoration: none;
      transition: border-color .18s ease, color .18s ease, background .18s ease;
    }
    .article-toc a:hover, .article-toc a.is-active {
      border-left-color: var(--plum);
      background: var(--ww-surface-soft);
      color: var(--ww-text);
    }

    .article-page .article-infobox {
      padding: 1rem 1.05rem 1.15rem;
      border: 1px solid var(--ww-border);
      border-radius: 10px;
      background: var(--ww-surface);
      box-shadow: 0 6px 22px rgba(26, 31, 38, .055);
    }
    .article-page .infobox-rule { height: .26rem; border-radius: 999px; }
    .article-page .article-infobox dt { color: var(--ww-faint); }
    .article-page .article-infobox dd { color: var(--ww-text); }

    .reader-tools {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: .45rem;
      margin: 1rem 0;
      padding-top: 1rem;
      border-top: 1px solid var(--ww-border);
    }
    .reader-tools p { grid-column: 1 / -1; margin: 0; color: var(--ww-faint); font-size: .64rem; letter-spacing: .09em; text-transform: uppercase; }
    .reader-tools button {
      border: 1px solid var(--ww-border-strong);
      border-radius: 8px;
      padding: .45rem;
      background: var(--ww-surface-soft);
      color: var(--ww-text);
      font-weight: 700;
    }
    .reader-tools button:hover { border-color: var(--plum); }

    .article-page .prose {
      padding-block: 2.4rem;
      color: var(--ww-text);
      font-family: Georgia, "Iowan Old Style", "Times New Roman", serif;
      font-size: calc(1.08rem * var(--reader-scale));
      line-height: 1.76;
    }
    .article-page .prose h2 {
      margin-top: 3rem;
      padding-top: 1.35rem;
      border-top: 1px solid var(--ww-border);
      font-size: calc(1.82rem * var(--reader-scale));
      line-height: 1.15;
      scroll-margin-top: calc(var(--ww-header-height) + 1.5rem);
    }
    .article-page .prose h3, .article-page .prose h4 { scroll-margin-top: calc(var(--ww-header-height) + 1.5rem); }
    .article-page .prose p { max-width: 68ch; }
    .article-page .prose blockquote {
      margin: 2rem 0;
      padding: 1.25rem 1.35rem;
      border-left: 4px solid var(--plum);
      border-radius: 0 9px 9px 0;
      background: var(--ww-surface-soft);
      color: var(--ww-text);
    }

    .article-page .source-notes {
      padding: 1.15rem 1.25rem;
      border: 1px solid var(--ww-border);
      border-radius: 10px;
      background: var(--ww-surface-soft);
    }
    .article-page .related-block { margin-top: 2rem; }
    .article-page .relation-list { display: grid; gap: .55rem; }
    .article-page .relation-list li {
      align-items: center;
      padding: .75rem .8rem;
      border: 1px solid var(--ww-border);
      border-radius: 8px;
      background: var(--ww-surface-soft);
    }
    .back-to-top {
      display: inline-flex;
      gap: .4rem;
      margin-top: 1.7rem;
      color: var(--ww-link);
      font-family: ui-sans-serif, system-ui, sans-serif;
      font-size: .76rem;
      text-decoration: none;
    }

    .reading-progress {
      position: fixed;
      z-index: 80;
      top: 0;
      left: 0;
      width: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--plum), var(--blue));
      pointer-events: none;
      transition: width .08s linear;
    }

    .site-footer {
      width: min(1320px, calc(100% - 2rem));
      margin-top: 2rem;
      border-top-color: var(--ww-border-strong);
    }

    @media (max-width: 1180px) {
      .header-inner { grid-template-columns: auto minmax(180px, 1fr) auto; }
      .article-layout { grid-template-columns: 190px minmax(0, 760px); justify-content: center; }
      .article-page .article-infobox { grid-column: 2; position: static; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
      .article-page .article-infobox .infobox-rule, .article-page .article-infobox > .eyebrow { grid-column: 1 / -1; }
      .reader-tools { align-self: start; }
    }

    @media (max-width: 860px) {
      .header-inner { grid-template-columns: auto 1fr auto; }
      .wordmark small { display: none; }
      .header-search { grid-column: 1 / -1; grid-row: 2; margin-bottom: .65rem; }
      .site-header { position: static; }
      .article-layout { display: block; width: min(100% - 1.5rem, 800px); }
      .article-page .article { padding: clamp(1.5rem, 5vw, 2.6rem); }
      .article-toc { margin-bottom: 1rem; }
      .article-page .article-infobox { display: block; margin-top: 1rem; }
      .article-page .prose h2 { scroll-margin-top: 1rem; }
      .home-intro { grid-template-columns: 1fr; gap: 2rem; }
      .home-plate { min-height: 18rem; }
    }

    @media (max-width: 700px) {
      .header-inner, .page-wrap, .site-footer { width: min(100% - 1rem, 1320px); }
      .header-inner { gap: .65rem; padding-top: .45rem; }
      .menu-toggle { display: block; justify-self: end; }
      .primary-nav {
        top: calc(var(--ww-header-height) - .1rem);
        left: .5rem;
        right: .5rem;
        border-color: var(--ww-border);
        border-radius: 10px;
        background: var(--ww-surface);
        box-shadow: var(--ww-shadow);
      }
      .home-intro { padding-block: 3rem 2rem; }
      .home-intro h1 { font-size: clamp(2.65rem, 14vw, 4.7rem); }
      .section-block { padding: 1.3rem; border-radius: 10px; }
      .page-heading { margin-top: .75rem; padding: 2rem 1.25rem; border-radius: 10px; }
      .page-heading h1 { font-size: clamp(2.35rem, 12vw, 4rem); }
      .breadcrumb { width: min(100% - 1rem, 1440px); overflow-x: auto; white-space: nowrap; }
      .article-layout { width: min(100% - .75rem, 800px); padding-top: .75rem; }
      .article-page .article { padding: 1.35rem 1.15rem 2rem; border-radius: 10px; }
      .article-page .article-header h1 { max-width: none; font-size: clamp(2.25rem, 12vw, 3.7rem); }
      .article-page .prose { font-size: calc(1.02rem * var(--reader-scale)); }
      .article-toc { padding: .75rem; }
      .relation-list li { display: block; }
      .relation-list li span { display: block; margin-top: .25rem; }
    }

    @media (prefers-reduced-motion: reduce) {
      .reading-progress { transition: none; }
    }
  `;
  document.head.append(style);

  const syncThemeLabels = () => {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.textContent = root.dataset.theme === 'night' ? 'Papel' : 'Noite';
    });
  };

  syncThemeLabels();
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', () => {
      root.dataset.theme = root.dataset.theme === 'night' ? 'paper' : 'night';
      storeTheme(root.dataset.theme);
      syncThemeLabels();
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
  const assetRoot = body?.dataset.assetRoot || '/moonverse/assets/';

  const headerInner = document.querySelector('.header-inner');
  const primaryNav = document.querySelector('#primary-navigation');
  if (headerInner && primaryNav && !headerInner.querySelector('.header-search')) {
    const form = document.createElement('form');
    form.className = 'header-search';
    form.action = '/moonverse/search/';
    form.setAttribute('role', 'search');
    form.innerHTML = '<input type="search" name="q" aria-label="Buscar no Moonverse" placeholder="Buscar no Moonverse"><button type="submit">Buscar</button>';
    headerInner.insertBefore(form, primaryNav);
  }

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

  function enhanceArticle() {
    if (!body.classList.contains('article-page')) return;

    const progress = document.createElement('div');
    progress.className = 'reading-progress';
    progress.setAttribute('aria-hidden', 'true');
    body.prepend(progress);

    const updateProgress = () => {
      const article = document.querySelector('.article');
      if (!article) return;
      const rect = article.getBoundingClientRect();
      const start = window.scrollY + rect.top;
      const end = start + article.offsetHeight - window.innerHeight;
      const ratio = end <= start ? 1 : Math.min(1, Math.max(0, (window.scrollY - start) / (end - start)));
      progress.style.width = `${ratio * 100}%`;
    };
    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);

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

    let readerScale = 1;
    try {
      const stored = Number(window.localStorage.getItem('moonverse-reader-scale'));
      if (Number.isFinite(stored)) readerScale = Math.min(1.2, Math.max(.9, stored));
    } catch { /* optional */ }
    root.style.setProperty('--reader-scale', String(readerScale));

    if (infobox && !infobox.querySelector('.reader-tools')) {
      const tools = document.createElement('div');
      tools.className = 'reader-tools';
      tools.innerHTML = '<p>Tamanho do texto</p><button type="button" data-reader-down aria-label="Diminuir texto">A−</button><button type="button" data-reader-up aria-label="Aumentar texto">A+</button>';
      const applyScale = (next) => {
        readerScale = Math.min(1.2, Math.max(.9, Math.round(next * 100) / 100));
        root.style.setProperty('--reader-scale', String(readerScale));
        try { window.localStorage.setItem('moonverse-reader-scale', String(readerScale)); } catch { /* optional */ }
      };
      tools.querySelector('[data-reader-down]').addEventListener('click', () => applyScale(readerScale - .05));
      tools.querySelector('[data-reader-up]').addEventListener('click', () => applyScale(readerScale + .05));
      const atlasLink = infobox.querySelector('.text-link');
      infobox.insertBefore(tools, atlasLink || null);
    }

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
      }, { rootMargin: '-16% 0px -70% 0px', threshold: [0, 1] });
      sectionPairs.forEach(({ section }) => observer.observe(section));
      setActive(sectionPairs[0].section.id);
    }
  }

  enhanceArticle();
})();
