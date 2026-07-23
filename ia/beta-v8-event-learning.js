(() => {
  const delta = {
    pt: {
      'entrada.title':'Uma resposta pode parecer certa sem estar certa. E uma solução pode responder certo sem funcionar para as pessoas.',
      'entrada.lead':'A IA não responde automaticamente com o que é verdadeiro. Ela calcula o que é mais provável a partir dos padrões e do contexto que recebe. Fontes sólidas, bases de conhecimento atualizadas, critérios claros e responsabilidade dão chão para respostas melhores. Depois, ainda é preciso verificar se a solução cabe no trabalho real e faz sentido para as pessoas.',
      'entrada.card2.title':'Solução fora da realidade',
      'entrada.card2.text':'A ferramenta não acompanha o fluxo, as exceções, a linguagem ou as necessidades de quem vai usá-la.',
      'entrada.quote.big':'Uma resposta confiável e uma solução que funciona são dois resultados diferentes.',
      'entrada.quote.text':'Meu trabalho conecta os dois.',
      'mapa.title':'Primeiro, eu apuro a realidade que a solução de IA precisa respeitar.',
      'entregas.lead':'A forma muda conforme o problema. O núcleo é simples: fontes confiáveis e critérios responsáveis para orientar a resposta, além de fluxos e validação humana para a solução funcionar na realidade.',
      'entregas.card6.text':'Revisão humana, responsabilidades, comunicação e aprendizagem ligadas à rotina.',
      'ciclo.lead':'Eu testo antes, observo durante e reviso depois para saber se a IA responde com base sólida e se a solução realmente funciona para as pessoas.',
      'ciclo.fase3.text':'Confirmar com quem trabalha se a solução é clara, útil, compreensível e aplicável.',
      'lastro.card5.title':'Mediação, linguagem e adoção',
      'lastro.card5.text':'Tradução de complexidade em critérios, comunicação e formas de uso que façam sentido para as pessoas.',
      'contact.quote':'IA confiável precisa de base sólida. Tecnologia útil precisa funcionar para as pessoas.',
      'contact.sub':'Posso ajudar a apurar o cenário, estruturar fontes, bases de conhecimento e critérios, e auditar tanto as respostas da IA quanto seu encaixe no trabalho real.'
    },
    en: {
      'entrada.title':'An answer can look right without being right. And a solution can answer correctly without working for people.',
      'entrada.lead':'AI does not automatically respond with what is true. It calculates what is most likely from the patterns and context it receives. Solid sources, up-to-date knowledge bases, clear criteria, and accountability provide a stronger foundation for better answers. The solution still needs to fit real work and make sense to people.',
      'entrada.card2.title':'A solution disconnected from reality',
      'entrada.card2.text':'The tool does not fit the workflow, exceptions, language, or needs of the people expected to use it.',
      'entrada.quote.big':'A trustworthy answer and a solution that works are two different outcomes.',
      'entrada.quote.text':'My work connects both.',
      'mapa.title':'First, I investigate the reality the AI solution must respect.',
      'entregas.lead':'The format changes with the problem. The core is simple: reliable sources and responsible criteria to guide the answer, plus workflows and human validation so the solution works in reality.',
      'entregas.card6.text':'Human review, accountability, communication, and learning tied to daily work.',
      'ciclo.lead':'I test before, observe during, and review after use to see whether AI answers from solid ground and whether the solution truly works for people.',
      'ciclo.fase3.text':'Confirm with the people doing the work that the solution is clear, useful, understandable, and applicable.',
      'lastro.card5.title':'Mediation, language, and adoption',
      'lastro.card5.text':'Translating complexity into criteria, communication, and ways of working that make sense to people.',
      'contact.quote':'Trustworthy AI needs solid ground. Useful technology needs to work for people.',
      'contact.sub':'I can help investigate the landscape, structure sources, knowledge bases, and criteria, and audit both AI outputs and their fit with real work.'
    }
  };

  if (typeof T === 'object' && T.pt && T.en) {
    Object.assign(T.pt, delta.pt);
    Object.assign(T.en, delta.en);
  }

  document.querySelectorAll('[data-beta-pt][data-beta-en]').forEach((element) => {
    if (element.classList.contains('market-position-detail')) {
      element.dataset.betaPt = 'A IA pode produzir uma resposta convincente sem que ela seja verdadeira. Eu estruturo fontes, bases de conhecimento e critérios responsáveis para que responda com base sólida, e audito também se a solução funciona no trabalho real e para as pessoas.';
      element.dataset.betaEn = 'AI can produce a convincing answer without it being true. I structure reliable sources, knowledge bases, and responsible criteria so it can answer from solid ground, and I also audit whether the solution works in real operations and for people.';
    }
  });

  const currentLang = () => document.documentElement.lang === 'en' ? 'en' : 'pt';
  const syncTitle = () => {
    const english = currentLang() === 'en';
    const isBeta = /\/ia\/beta(?:\.html)?\/?$/.test(window.location.pathname);
    document.title = english
      ? `Lua Helena Moon — Context Architecture, Adoption and AI Auditing · ${isBeta ? 'Beta V8.1' : 'V8.1'}`
      : `Lua Helena Moon — Contexto, Adoção e Auditoria de IA · ${isBeta ? 'Beta V8.1' : 'V8.1'}`;
  };

  const lang = currentLang();
  if (typeof applyLang === 'function') applyLang(lang);

  document.querySelectorAll('[data-beta-pt][data-beta-en]').forEach((element) => {
    element.textContent = lang === 'en' ? element.dataset.betaEn : element.dataset.betaPt;
  });
  syncTitle();
  new MutationObserver(syncTitle).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang']
  });

  const packet = `# LUA HELENA MOON — CONTEXT ARCHITECTURE & AI AUDITING — V8.1

## Core principles
AI does not guarantee truth. It calculates the most likely response from the patterns and context it receives.

Reliable answers require solid sources, up-to-date knowledge bases, clear criteria, and accountability.

A solution can answer correctly and still fail if it does not fit real work, institutional reality, or people’s experience.

## What I do
I investigate institutional reality, structure the context AI needs, and audit both the reliability of its outputs and its fit with real work.

## What I examine
- sources and what is currently valid
- knowledge bases, authority, and update responsibility
- real workflows, exceptions, and friction
- people, roles, decisions, and accountability
- language, criteria, risks, and boundaries
- how the solution will be understood, used, and received
- where AI can help and where it should not be used yet

## Possible outputs
- context map
- source-of-truth model
- clearer roles and workflows
- AI guidance packet
- living documentation
- human-review and governance criteria
- adoption and communication recommendations
- pre-use tests and post-use output audits

## Scope
Lua does not develop foundation models or perform technical infrastructure audits. Her work is contextual, institutional, linguistic, operational, and human-centered.

## Professional foundation
Lua holds degrees in Psychology and Sociology, with postgraduate qualifications in Organizational Psychology and Institutional Psychopedagogy. As a hospital psychologist, she works in complex systems involving institutional workflows, multidisciplinary teams, sensitive information, and decisions that require accountability.

## Contact
Email: luahelenammc@gmail.com
WhatsApp: +55 41 99222-8411
Discord: moon_aurea
LinkedIn: https://www.linkedin.com/in/luahelena/
`;

  const downloadPacket = () => {
    const blob = new Blob([packet], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'LUA_HELENA_MOON_CONTEXT_ARCHITECTURE_AI_AUDITING_V8_1.md';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  document.querySelectorAll('[data-packet]').forEach((button) => {
    button.onclick = downloadPacket;
  });
})();