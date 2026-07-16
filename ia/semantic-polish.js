(() => {
  if (typeof T !== 'object' || !T.pt || !T.en) return;

  // Editorial rule: keep the conversational voice without em-dash mannerisms.
  for (const locale of [T.pt, T.en]) {
    for (const key of Object.keys(locale)) {
      if (typeof locale[key] === 'string') {
        locale[key] = locale[key].replace(/\s*—\s*/g, ', ');
      }
    }
  }

  // Root visits are Portuguese by default. English remains an explicit choice
  // through ?lang=en, which is already managed by the language controls.
  window.getLang = () => {
    const requested = new URLSearchParams(location.search).get('lang');
    return requested === 'en' ? 'en' : 'pt';
  };

  if (typeof applyLang === 'function') {
    applyLang(window.getLang());
  }
})();
