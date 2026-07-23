(() => {
  const copy = {
    pt: {
      'nav.entrada':'O problema',
      'nav.mapa':'Apuração',
      'nav.entregas':'Arquitetura',
      'nav.ciclo':'Auditoria',
      'nav.lastro':'Lastro',
      'hero.eyebrow':'Arquitetura Contextual e Auditoria de IA',
      'hero.title':'<span class="hero-line">Construo o <span class="context-word">contexto</span></span><span class="hero-line">para a IA responder</span><span class="hero-line">com base na <span class="tone-gold">realidade</span> —</span><span class="hero-line hero-resolution">não no improviso.</span>',
      'hero.cta1':'Baixar pacote para IA',
      'hero.cta2':'Converse comigo',

      'entrada.label':'O problema',
      'entrada.title':'Uma resposta plausível ainda pode estar errada.',
      'entrada.lead':'A IA pode soar segura mesmo quando recebeu contexto incompleto, desatualizado ou sem fonte confiável. E uma boa ferramenta ainda pode falhar quando não entende como o trabalho realmente acontece.',
      'entrada.card1.title':'Contexto frágil',
      'entrada.card1.text':'Faltam fatos, regras, histórico ou uma fonte clara do que vale agora.',
      'entrada.card2.title':'Trabalho invisível',
      'entrada.card2.text':'O fluxo real, as exceções e as decisões importantes não aparecem nos documentos.',
      'entrada.card3.title':'IA sem critério',
      'entrada.card3.text':'A ferramenta entra sem limites, responsáveis, revisão humana ou definição do que seria uma resposta útil.',
      'entrada.quote.big':'Quando a IA não sabe o que é verdade, ela pode completar a lacuna.',
      'entrada.quote.text':'Meu trabalho é dar chão para ela: realidade, fontes, critérios, limites e revisão.',

      'mapa.label':'Antes da IA',
      'mapa.title':'Primeiro, eu apuro a realidade que a IA precisa respeitar.',
      'mapa.lead':'Entendo a organização por dentro para separar fato de suposição, regra vigente de material antigo e processo oficial do trabalho que realmente acontece.',
      'mapa.card1.title':'Fontes',
      'mapa.card1.text':'O que existe, onde está, quem responde e o que ainda vale.',
      'mapa.card2.title':'Fluxos',
      'mapa.card2.text':'Como o trabalho circula, onde trava e onde nasce o retrabalho.',
      'mapa.card3.title':'Pessoas e papéis',
      'mapa.card3.text':'Quem sabe, executa, decide, valida e assume responsabilidade.',
      'mapa.card4.title':'Linguagem e critérios',
      'mapa.card4.text':'Os termos, prioridades e regras que orientam decisões e respostas.',
      'mapa.card5.title':'Riscos e limites',
      'mapa.card5.text':'O que exige cuidado, revisão humana, reconhecimento de dúvida ou não-resposta.',
      'mapa.card6.title':'Casos de uso',
      'mapa.card6.text':'Onde a IA pode ajudar de verdade — e onde ainda não deveria entrar.',

      'entregas.label':'Arquitetura contextual',
      'entregas.title':'Depois, transformo essa realidade em uma base que pessoas e IA conseguem usar.',
      'entregas.lead':'A forma muda conforme o problema. O núcleo é sempre o mesmo: conhecimento confiável, papéis claros, critérios explícitos e continuidade.',
      'entregas.card1.title':'Mapa contextual',
      'entregas.card1.text':'Uma visão clara do cenário, das fontes, dos fluxos, das pessoas, dos riscos e das prioridades.',
      'entregas.card2.title':'Fonte de verdade',
      'entregas.card2.text':'O que deve ser consultado, qual fonte prevalece e quem pode atualizar.',
      'entregas.card3.title':'Papéis e fluxos',
      'entregas.card3.text':'Responsabilidades, decisões, dependências e passagens de trabalho mais claras.',
      'entregas.card4.title':'Orientação para IA',
      'entregas.card4.text':'Vocabulário, fontes, limites, exemplos e critérios de resposta.',
      'entregas.card5.title':'Documentação viva',
      'entregas.card5.text':'Registros atualizáveis que preservam conhecimento e memória operacional.',
      'entregas.card6.title':'Governança e capacitação',
      'entregas.card6.text':'Revisão humana, responsabilidades e aprendizagem ligada à rotina.',

      'ciclo.label':'Auditoria de IA',
      'ciclo.title':'O trabalho não termina quando a IA começa a responder.',
      'ciclo.lead':'Eu testo antes, observo durante e reviso depois para saber se a IA está ajudando de verdade — ou apenas parecendo ajudar.',
      'ciclo.fase1.label':'Antes do uso',
      'ciclo.fase1.title':'Revisar o contexto',
      'ciclo.fase1.text':'Checar fontes, atualidade, lacunas, conflitos e informações sensíveis.',
      'ciclo.fase2.label':'Antes do uso',
      'ciclo.fase2.title':'Testar situações reais',
      'ciclo.fase2.text':'Usar casos comuns, exceções, ambiguidades e situações de risco.',
      'ciclo.fase3.label':'Com as pessoas',
      'ciclo.fase3.title':'Validar o uso',
      'ciclo.fase3.text':'Confirmar com quem trabalha se a solução é clara, útil e aplicável.',
      'ciclo.fase4.label':'Depois do uso',
      'ciclo.fase4.title':'Auditar respostas',
      'ciclo.fase4.text':'Identificar invenções, omissões, exageros, perda de nuance e falhas de orientação.',
      'ciclo.fase5.label':'Continuidade',
      'ciclo.fase5.title':'Corrigir e manter',
      'ciclo.fase5.text':'Atualizar a base, ajustar critérios e aprender com o que aconteceu.',

      'lastro.label':'Por que eu',
      'lastro.title':'Meu diferencial é entender a instituição por dentro.',
      'lastro.lead':'Não entro como engenheira de modelos. Entro na camada em que IA encontra pessoas, decisões, linguagem, responsabilidade e trabalho real.',
      'lastro.card1.title':'Psicologia Hospitalar',
      'lastro.card1.text':'Experiência com sistemas complexos, informação sensível, crise e decisões com consequência humana.',
      'lastro.card2.title':'Psicologia Organizacional',
      'lastro.card2.text':'Leitura de papéis, cultura, comunicação, conflito, autonomia e mudança.',
      'lastro.card3.title':'Psicopedagogia Institucional',
      'lastro.card3.text':'Aprendizagem e capacitação conectadas à rotina, não só à ferramenta.',
      'lastro.card4.title':'Investigação contextual',
      'lastro.card4.text':'Apuração de fontes, versões, contradições, regras implícitas e conhecimento tácito.',
      'lastro.card5.title':'Mediação e linguagem',
      'lastro.card5.text':'Tradução de complexidade em critérios, textos e passagens de responsabilidade claras.',
      'lastro.card6.title':'Sistemas aplicados com IA',
      'lastro.card6.text':'Assistentes, revisores, fontes vivas, memória, rotinas de qualidade e continuidade.',
      'lastro.boundary.big':'Não desenvolvo o modelo. Construo o chão que ele precisa para responder melhor e funcionar no trabalho real.',
      'lastro.boundary.text':'Meu trabalho complementa equipes técnicas, produto, Qualidade, Gestão de Pessoas, Saúde, Educação e setor público.',
      'lastro.tag1':'apuração contextual',
      'lastro.tag2':'auditoria de IA',
      'lastro.tag3':'fontes confiáveis',
      'lastro.tag4':'fluxos claros',
      'lastro.tag5':'revisão humana',
      'lastro.tag6':'adoção real',
      'lastro.tag7':'memória operacional',

      'contact.quote':'IA confiável precisa de contexto confiável.',
      'contact.title':'Vamos conversar sobre onde esse trabalho pode fazer diferença na sua realidade?',
      'contact.sub':'Posso ajudar a apurar o cenário, estruturar a base e auditar o uso da IA sem perder o trabalho humano de vista.',
      'foot.rights':'Arquitetura Contextual e Auditoria de IA · Limeira/SP · trabalho remoto'
    },

    en: {
      'nav.entrada':'The problem',
      'nav.mapa':'Investigation',
      'nav.entregas':'Architecture',
      'nav.ciclo':'Auditing',
      'nav.lastro':'Foundation',
      'hero.eyebrow':'Context Architecture and AI Auditing',
      'hero.title':'<span class="hero-line">I build the <span class="context-word">context</span></span><span class="hero-line">AI needs to respond</span><span class="hero-line">from <span class="tone-gold">reality</span> —</span><span class="hero-line hero-resolution">not guesswork.</span>',
      'hero.cta1':'Download AI packet',
      'hero.cta2':'Talk to me',

      'entrada.label':'The problem',
      'entrada.title':'A plausible answer can still be wrong.',
      'entrada.lead':'AI can sound confident even when it received incomplete, outdated, or unreliable context. And a good tool can still fail when it does not understand how the work actually happens.',
      'entrada.card1.title':'Fragile context',
      'entrada.card1.text':'Facts, rules, history, or a clear source of what is current are missing.',
      'entrada.card2.title':'Invisible work',
      'entrada.card2.text':'Real workflows, exceptions, and important decisions do not appear in the documents.',
      'entrada.card3.title':'AI without criteria',
      'entrada.card3.text':'The tool enters without boundaries, owners, human review, or a definition of useful output.',
      'entrada.quote.big':'When AI does not know what is true, it may fill the gap.',
      'entrada.quote.text':'My work gives it solid ground: reality, sources, criteria, boundaries, and review.',

      'mapa.label':'Before AI',
      'mapa.title':'First, I investigate the reality AI must respect.',
      'mapa.lead':'I learn the organization from within to separate fact from assumption, current rules from old material, and official process from the work that actually happens.',
      'mapa.card1.title':'Sources',
      'mapa.card1.text':'What exists, where it lives, who owns it, and what is still current.',
      'mapa.card2.title':'Workflows',
      'mapa.card2.text':'How work moves, where it gets stuck, and where rework begins.',
      'mapa.card3.title':'People and roles',
      'mapa.card3.text':'Who knows, acts, decides, validates, and owns responsibility.',
      'mapa.card4.title':'Language and criteria',
      'mapa.card4.text':'The terms, priorities, and rules that guide decisions and outputs.',
      'mapa.card5.title':'Risks and boundaries',
      'mapa.card5.text':'What requires care, human review, acknowledged uncertainty, or no answer.',
      'mapa.card6.title':'Use cases',
      'mapa.card6.text':'Where AI can genuinely help — and where it should not enter yet.',

      'entregas.label':'Context architecture',
      'entregas.title':'Then I turn that reality into a foundation people and AI can use.',
      'entregas.lead':'The format changes with the problem. The core stays the same: trustworthy knowledge, clear roles, explicit criteria, and continuity.',
      'entregas.card1.title':'Context map',
      'entregas.card1.text':'A clear view of the landscape, sources, workflows, people, risks, and priorities.',
      'entregas.card2.title':'Source of truth',
      'entregas.card2.text':'What must be consulted, which source prevails, and who may update it.',
      'entregas.card3.title':'Roles and workflows',
      'entregas.card3.text':'Clearer responsibilities, decisions, dependencies, and handoffs.',
      'entregas.card4.title':'AI guidance',
      'entregas.card4.text':'Vocabulary, sources, boundaries, examples, and response criteria.',
      'entregas.card5.title':'Living documentation',
      'entregas.card5.text':'Updatable records that preserve knowledge and operational memory.',
      'entregas.card6.title':'Governance and enablement',
      'entregas.card6.text':'Human review, accountability, and learning tied to daily work.',

      'ciclo.label':'AI auditing',
      'ciclo.title':'The work does not end when AI starts answering.',
      'ciclo.lead':'I test before, observe during, and review after use to see whether AI is truly helping — or merely looking helpful.',
      'ciclo.fase1.label':'Before use',
      'ciclo.fase1.title':'Review context',
      'ciclo.fase1.text':'Check sources, freshness, gaps, conflicts, and sensitive information.',
      'ciclo.fase2.label':'Before use',
      'ciclo.fase2.title':'Test real situations',
      'ciclo.fase2.text':'Use common cases, exceptions, ambiguity, and risk situations.',
      'ciclo.fase3.label':'With people',
      'ciclo.fase3.title':'Validate the use',
      'ciclo.fase3.text':'Confirm with the people doing the work that the solution is clear, useful, and applicable.',
      'ciclo.fase4.label':'After use',
      'ciclo.fase4.title':'Audit outputs',
      'ciclo.fase4.text':'Find fabrication, omission, exaggeration, lost nuance, and guidance failures.',
      'ciclo.fase5.label':'Continuity',
      'ciclo.fase5.title':'Correct and maintain',
      'ciclo.fase5.text':'Update the foundation, refine criteria, and learn from what happened.',

      'lastro.label':'Why me',
      'lastro.title':'My differentiator is understanding the institution from within.',
      'lastro.lead':'I do not enter as a model engineer. I work where AI meets people, decisions, language, accountability, and real work.',
      'lastro.card1.title':'Hospital Psychology',
      'lastro.card1.text':'Experience with complex systems, sensitive information, crises, and decisions with human consequences.',
      'lastro.card2.title':'Organizational Psychology',
      'lastro.card2.text':'Understanding roles, culture, communication, conflict, autonomy, and change.',
      'lastro.card3.title':'Institutional Psychopedagogy',
      'lastro.card3.text':'Learning and enablement connected to daily work, not only to the tool.',
      'lastro.card4.title':'Context investigation',
      'lastro.card4.text':'Investigation of sources, versions, contradictions, implicit rules, and tacit knowledge.',
      'lastro.card5.title':'Mediation and language',
      'lastro.card5.text':'Translation of complexity into clear criteria, writing, and handoffs.',
      'lastro.card6.title':'Applied AI systems',
      'lastro.card6.text':'Assistants, reviewers, living sources, memory, quality routines, and continuity.',
      'lastro.boundary.big':'I do not build the model. I build the ground it needs to respond better and work in real operations.',
      'lastro.boundary.text':'My work complements technical teams, product, Quality, People, Healthcare, Education, and public-sector organizations.',
      'lastro.tag1':'context investigation',
      'lastro.tag2':'AI auditing',
      'lastro.tag3':'trusted sources',
      'lastro.tag4':'clear workflows',
      'lastro.tag5':'human review',
      'lastro.tag6':'real adoption',
      'lastro.tag7':'operational memory',

      'contact.quote':'Trustworthy AI needs trustworthy context.',
      'contact.title':'Let’s talk about where this work could make a difference in your reality.',
      'contact.sub':'I can help investigate the landscape, structure the foundation, and audit AI use without losing sight of the human work.',
      'foot.rights':'Context Architecture and AI Auditing · Limeira/SP · remote work'
    }
  };

  if (typeof T === 'object' && T.pt && T.en) {
    Object.assign(T.pt, copy.pt);
    Object.assign(T.en, copy.en);
  }

  const syncExtras = () => {
    const english = document.documentElement.lang === 'en';
    document.querySelectorAll('[data-beta-pt][data-beta-en]').forEach((element) => {
      element.textContent = english ? element.dataset.betaEn : element.dataset.betaPt;
    });
    document.title = english
      ? 'Lua Helena Moon — Context Architecture and AI Auditing · Beta V8'
      : 'Lua Helena Moon — Contexto e Auditoria de IA · Beta V8';
  };

  const current = document.documentElement.lang === 'en' ? 'en' : 'pt';
  if (typeof applyLang === 'function') applyLang(current);
  syncExtras();
  new MutationObserver(syncExtras).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});

  const BETA_PACKET = `# LUA HELENA MOON — CONTEXT ARCHITECTURE & AI AUDITING — BETA V8

## What I do
I investigate institutional reality, structure the context AI needs, and audit its outputs before and after use.

The goal is simple: reduce fabricated or weakly grounded answers and make AI more useful in real work.

## What I examine
- sources and what is currently valid
- real workflows and exceptions
- people, roles, decisions, and accountability
- language, criteria, risks, and boundaries
- where AI can help and where it should not be used yet

## Possible outputs
- context map
- source-of-truth model
- clearer roles and workflows
- AI guidance packet
- living documentation
- human-review and governance criteria
- pre-use tests and post-use output audits

## Scope
Lua does not develop foundation models or perform technical infrastructure audits. Her work is contextual, institutional, linguistic, operational, and human-centered.

## Contact
Email: luahelenammc@gmail.com
WhatsApp: +55 41 99222-8411
Discord: moon_aurea
LinkedIn: https://www.linkedin.com/in/luahelena/
`;

  const downloadBetaPacket = () => {
    const blob = new Blob([BETA_PACKET],{type:'text/markdown;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'LUA_HELENA_MOON_CONTEXT_ARCHITECTURE_AI_AUDITING_BETA_V8.md';
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(url);
  };
  document.querySelectorAll('[data-packet]').forEach((button)=>button.onclick=downloadBetaPacket);
})();