(() => {
  const delta = {
    pt: {
      'entrada.title':'Uma solução pode estar tecnicamente certa e ainda falhar na realidade.',
      'entrada.lead':'A IA pode inventar quando recebe contexto frágil. E pode ser rejeitada, mal utilizada ou contornada quando ignora o trabalho real, a linguagem e a experiência das pessoas.',
      'entrada.card2.title':'Solução fora da realidade',
      'entrada.card2.text':'A ferramenta não acompanha o fluxo, as exceções, a linguagem ou as necessidades de quem vai usá-la.',
      'entrada.quote.big':'Eficiência técnica, experiência humana e realidade institucional precisam ser desenhadas juntas.',
      'entrada.quote.text':'É nessa camada que eu trabalho.',
      'mapa.title':'Primeiro, eu apuro a realidade que a solução de IA precisa respeitar.',
      'entregas.lead':'A forma muda conforme o problema. O núcleo é simples: a IA precisa de informação confiável e a solução precisa caber no trabalho real.',
      'entregas.card6.text':'Revisão humana, responsabilidades, comunicação e aprendizagem ligadas à rotina.',
      'ciclo.lead':'Eu testo antes, observo durante e reviso depois para saber se a IA responde bem e se a solução realmente funciona para as pessoas.',
      'ciclo.fase3.text':'Confirmar com quem trabalha se a solução é clara, útil, compreensível e aplicável.',
      'lastro.card5.title':'Mediação, linguagem e adoção',
      'lastro.card5.text':'Tradução de complexidade em critérios, comunicação e formas de uso que façam sentido para as pessoas.',
      'contact.quote':'Tecnologia útil precisa funcionar na instituição e para as pessoas.',
      'contact.sub':'Posso ajudar a apurar o cenário, estruturar a base e auditar se a IA responde bem e se encaixa no trabalho real.'
    },
    en: {
      'entrada.title':'A solution can be technically sound and still fail in reality.',
      'entrada.lead':'AI may fabricate when it receives fragile context. And it may be rejected, misused, or bypassed when it ignores real work, language, and people’s experience.',
      'entrada.card2.title':'A solution disconnected from reality',
      'entrada.card2.text':'The tool does not fit the workflow, exceptions, language, or needs of the people expected to use it.',
      'entrada.quote.big':'Technical efficiency, human experience, and institutional reality need to be designed together.',
      'entrada.quote.text':'That is the layer where I work.',
      'mapa.title':'First, I investigate the reality the AI solution must respect.',
      'entregas.lead':'The format changes with the problem. The core is simple: AI needs reliable information, and the solution needs to fit real work.',
      'entregas.card6.text':'Human review, accountability, communication, and learning tied to daily work.',
      'ciclo.lead':'I test before, observe during, and review after use to see whether AI answers well and whether the solution truly works for people.',
      'ciclo.fase3.text':'Confirm with the people doing the work that the solution is clear, useful, understandable, and applicable.',
      'lastro.card5.title':'Mediation, language, and adoption',
      'lastro.card5.text':'Translating complexity into criteria, communication, and ways of working that make sense to people.',
      'contact.quote':'Useful technology needs to work within the institution and for the people.',
      'contact.sub':'I can help investigate the landscape, structure the foundation, and audit whether AI answers well and fits real work.'
    }
  };

  if (typeof T === 'object' && T.pt && T.en) {
    Object.assign(T.pt, delta.pt);
    Object.assign(T.en, delta.en);
  }

  document.querySelectorAll('[data-beta-pt][data-beta-en]').forEach((element) => {
    if (element.classList.contains('market-position-detail')) {
      element.dataset.betaPt = 'Uma solução de IA pode estar tecnicamente pronta e ainda falhar na prática. Eu apuro a realidade institucional, organizo fontes, fluxos, responsabilidades e critérios, e audito se a IA responde bem e funciona para as pessoas.';
      element.dataset.betaEn = 'An AI solution can be technically ready and still fail in practice. I investigate institutional reality, organize sources, workflows, responsibilities, and criteria, and audit whether AI answers well and works for people.';
    }
  });

  const lang = document.documentElement.lang === 'en' ? 'en' : 'pt';
  if (typeof applyLang === 'function') applyLang(lang);

  document.querySelectorAll('[data-beta-pt][data-beta-en]').forEach((element) => {
    element.textContent = lang === 'en' ? element.dataset.betaEn : element.dataset.betaPt;
  });

  const packet = `# LUA HELENA MOON — CONTEXT ARCHITECTURE & AI AUDITING — BETA V8.1

## Core principle
An AI solution can be technically sound and still fail in reality.

Technical efficiency, human experience, and institutional reality need to be designed together.

## What I do
I investigate institutional reality, structure the context AI needs, and audit both its outputs and its fit with real work.

## What I examine
- sources and what is currently valid
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
    anchor.download = 'LUA_HELENA_MOON_CONTEXT_ARCHITECTURE_AI_AUDITING_BETA_V8_1.md';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };

  document.querySelectorAll('[data-packet]').forEach((button) => {
    button.onclick = downloadPacket;
  });
})();
