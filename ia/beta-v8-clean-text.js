(() => {
  const clean = (value) => typeof value === 'string'
    ? value.replace(/\s*—\s*/g, ', ')
    : value;

  if (typeof T === 'object' && T.pt && T.en) {
    Object.keys(T.pt).forEach((key) => { T.pt[key] = clean(T.pt[key]); });
    Object.keys(T.en).forEach((key) => { T.en[key] = clean(T.en[key]); });

    T.pt['hero.title'] = '<span class="hero-line">Construo o <span class="context-word">contexto</span></span><span class="hero-line">para a IA responder</span><span class="hero-line">com base na <span class="tone-gold">realidade</span>,</span><span class="hero-line hero-resolution">não no improviso.</span>';
    T.en['hero.title'] = '<span class="hero-line">I build the <span class="context-word">context</span></span><span class="hero-line">AI needs to respond</span><span class="hero-line">from <span class="tone-gold">reality</span>,</span><span class="hero-line hero-resolution">not guesswork.</span>';

    T.pt['mapa.card6.text'] = 'Onde a IA pode ajudar de verdade e onde ainda não deveria entrar.';
    T.en['mapa.card6.text'] = 'Where AI can genuinely help and where it should not enter yet.';

    T.pt['ciclo.lead'] = 'Eu testo antes, observo durante e reviso depois para saber se a IA está ajudando de verdade ou apenas parecendo ajudar.';
    T.en['ciclo.lead'] = 'I test before, observe during, and review after use to see whether AI is truly helping or merely looking helpful.';
  }

  const sanitizeDom = () => {
    document.title = clean(document.title);

    document.querySelectorAll('meta[content]').forEach((meta) => {
      meta.setAttribute('content', clean(meta.getAttribute('content')));
    });

    document.querySelectorAll('[data-beta-pt],[data-beta-en]').forEach((element) => {
      if (element.dataset.betaPt) element.dataset.betaPt = clean(element.dataset.betaPt);
      if (element.dataset.betaEn) element.dataset.betaEn = clean(element.dataset.betaEn);
    });

    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => { node.nodeValue = clean(node.nodeValue); });
  };

  const sync = () => {
    const lang = document.documentElement.lang === 'en' ? 'en' : 'pt';
    if (typeof applyLang === 'function') applyLang(lang);
    sanitizeDom();
  };

  sync();
  new MutationObserver(sync).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });
})();
