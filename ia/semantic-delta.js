(() => {
  const delta = {
    pt: {
      'entrada.card2.text': 'Entendo quem sabe o quê, quem decide, quem executa, quem responde por cada frente e, quando há lacunas, quais pessoas ou fontes podem completar o contexto.',
      'lastro.card5.title': 'Pesquisa e linguagem estratégica',
      'lastro.card5.text': 'Investigo informação fragmentada, desenvolvo fontes e transformo complexidade em briefings, textos e handoffs claros, utilizáveis e defendíveis.',
      'lastro.tag7': 'pesquisa e tradução institucional',
      'packet.tip': 'Envie este arquivo para a sua IA. Ela vai te explicar, de um jeito simples, o que eu faço e onde exatamente posso ajudar você, sua equipe ou sua organização.'
    },
    en: {
      'entrada.card2.text': 'I understand who knows what, who decides, who executes, who owns each front, and, when gaps remain, which people or sources can complete the context.',
      'lastro.card5.title': 'Research and strategic language',
      'lastro.card5.text': 'I investigate fragmented information, develop sources, and turn complexity into clear, usable, and defensible briefs, texts, and handoffs.',
      'lastro.tag7': 'research and institutional translation',
      'packet.tip': 'Send this file to your AI. It will explain, in plain language, what I do and exactly where I could help you, your team, or your organization.'
    }
  };

  if (typeof T === 'object' && T.pt && T.en) {
    Object.assign(T.pt, delta.pt);
    Object.assign(T.en, delta.en);
  }

  // The visible Discord identity may include @, but clipboard output never does.
  document.querySelectorAll('[data-discord]').forEach((button) => {
    button.setAttribute('data-discord', 'moon_aurea');
  });

  if (typeof applyLang === 'function' && typeof getLang === 'function') {
    applyLang(getLang());
  }
})();