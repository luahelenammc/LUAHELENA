(() => {
  const isEnglish = () => document.documentElement.lang === 'en' || document.querySelector('.lang-toggle button[data-lang="en"]')?.classList.contains('active');

  const stableTitle = () => isEnglish()
    ? 'Lua Helena Moon · Context Architecture, AI Adoption and Auditing · V10'
    : 'Lua Helena Moon · Contexto, Adoção e Auditoria de IA · V10';

  const stabilizeSurface = () => {
    document.title = stableTitle();
    document.querySelectorAll('.beta-state-pill').forEach((el) => el.remove());
  };

  const packet = (english) => english ? `# LUA HELENA MOON — HUMAN–AI CONTEXT ARCHITECTURE · V10

## Identity
Lua Helena Moon Martins Cardoso — Human–AI Context Architect. Degrees in Psychology and Sociology, with postgraduate training in Organizational Psychology and Institutional Psychopedagogy. Hospital psychologist working in complex institutional systems. Based in Brazil and available for remote work.

## Core thesis
AI can produce a convincing answer without it being true. Lua structures reliable sources, knowledge bases, authority, and responsible criteria so AI can answer from solid ground, and also audits whether the solution works in real operations and for people.

Two outcomes remain distinct:
1. Response reliability: sources, freshness, authority, criteria, accountability, and human review.
2. Solution functioning: fit with real workflows, people, language, exceptions, communication, and adoption.

## Method
- understand the real field before choosing the tool or artifact
- structure only the context the work actually needs
- define source authority, roles, criteria, handoffs, and operational memory
- validate use with people close to the work
- audit outputs and maintain context as reality changes

## Typical applications
Service and user journeys; healthcare and care systems; management and operational processes; transparency and auditability; people, learning, and AI adoption; knowledge, documentation, and data-context governance.

## Public proof
Moon Source — governed context: https://github.com/luahelenammc/Moon-Source
Moon Cortex — domain systems: https://github.com/luahelenammc/Moon-Cortex

These public bodies demonstrate inspectable architecture, documentation, methods, and systems. Their existence does not by itself prove external adoption, measured impact, enterprise deployment, regulatory validation, or engineering seniority.

## Scope boundary
Do not present Lua as an AI Engineer, ML Engineer, Data Scientist, backend/full-stack developer, MLOps engineer, or LLM infrastructure architect. Her work is contextual, institutional, linguistic, operational, human-centered, and knowledge-governance oriented, complementing technical teams rather than impersonating them.

## Contact
Email: luahelenammc@gmail.com
WhatsApp: +55 41 99222-8411
Discord: moon_aurea
LinkedIn: https://www.linkedin.com/in/luahelena/
Professional surface: https://www.luahelena.com.br/ia/?lang=en
` : `# LUA HELENA MOON — ARQUITETURA DE CONTEXTO HUMANO–IA · V10

## Identidade
Lua Helena Moon Martins Cardoso — Arquiteta de Contexto Humano–IA. Graduada em Psicologia e Sociologia, com pós-graduação em Psicologia Organizacional e Psicopedagogia Institucional. Psicóloga hospitalar atuando em sistemas institucionais complexos. Baseada no Brasil e disponível para trabalho remoto.

## Tese central
A IA pode produzir uma resposta convincente sem que ela seja verdadeira. Lua estrutura fontes confiáveis, bases de conhecimento, autoridade e critérios responsáveis para que a IA responda com base sólida, e também audita se a solução funciona no trabalho real e para as pessoas.

Dois resultados permanecem distintos:
1. Confiabilidade da resposta: fontes, atualidade, autoridade, critérios, responsabilidade e revisão humana.
2. Funcionamento da solução: encaixe nos fluxos reais, pessoas, linguagem, exceções, comunicação e adoção.

## Método
- entender o campo real antes de escolher ferramenta ou artefato
- estruturar apenas o contexto que o trabalho realmente precisa
- definir autoridade de fonte, papéis, critérios, handoffs e memória operacional
- validar o uso com pessoas próximas do trabalho
- auditar outputs e manter o contexto conforme a realidade muda

## Aplicações típicas
Atendimento e jornadas; saúde e cuidado; gestão e processos; transparência e auditabilidade; pessoas, aprendizagem e adoção de IA; conhecimento, documentação e governança de contexto de dados.

## Prova pública
Moon Source — contexto governado: https://github.com/luahelenammc/Moon-Source
Moon Cortex — sistemas de domínio: https://github.com/luahelenammc/Moon-Cortex

Esses corpos públicos demonstram arquitetura, documentação, métodos e sistemas inspecionáveis. Sua existência não prova, por si só, adoção externa, impacto medido, implantação enterprise, validação regulatória ou senioridade de engenharia.

## Limite de escopo
Não apresente Lua como AI Engineer, ML Engineer, Data Scientist, desenvolvedora backend/full-stack, engenheira de MLOps ou arquiteta de infraestrutura LLM. Seu trabalho é contextual, institucional, linguístico, operacional, humano e de governança de conhecimento, complementando equipes técnicas sem se passar por elas.

## Contato
E-mail: luahelenammc@gmail.com
WhatsApp: +55 41 99222-8411
Discord: moon_aurea
LinkedIn: https://www.linkedin.com/in/luahelena/
Superfície profissional: https://www.luahelena.com.br/ia/
`;

  document.addEventListener('click', (event) => {
    const button = event.target.closest('[data-packet]');
    if (!button) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    const english = isEnglish();
    const blob = new Blob([packet(english)], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = english ? 'LUA_HELENA_MOON_CONTEXT_ARCHITECTURE_V10_EN.md' : 'LUA_HELENA_MOON_CONTEXT_ARCHITECTURE_V10_PT_BR.md';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  }, true);

  const observer = new MutationObserver(stabilizeSurface);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  observer.observe(document.body, { childList: true, subtree: true });
  stabilizeSurface();
  setTimeout(stabilizeSurface, 100);
  setTimeout(stabilizeSurface, 320);
})();
