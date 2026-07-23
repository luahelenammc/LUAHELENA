(() => {
  const copy = {
    pt: {
      'nav.entrada':'O problema',
      'nav.mapa':'Apuração',
      'nav.entregas':'Arquitetura',
      'nav.ciclo':'Uso e auditoria',
      'nav.lastro':'Lastro',
      'hero.eyebrow':'Arquitetura Contextual e Auditoria de IA',
      'hero.title':'<span class="hero-line">Construo o <span class="context-word">contexto</span></span><span class="hero-line">para a IA responder</span><span class="hero-line">com base na <span class="tone-gold">realidade</span> —</span><span class="hero-line hero-resolution">não no improviso.</span>',
      'hero.cta1':'Baixar pacote para IA',
      'hero.cta2':'Converse comigo',

      'entrada.label':'O problema',
      'entrada.title':'Uma resposta plausível ainda pode estar errada — e uma boa ferramenta ainda pode fracassar na rotina.',
      'entrada.lead':'A IA pode produzir respostas convincentes com contexto incompleto, desatualizado ou sem autoridade definida. Também pode ser aplicada ao problema errado, ignorar o fluxo real e aumentar ruído, retrabalho ou dependência. Em questões humanas e institucionais, confiança exige compreender simultaneamente a informação, o trabalho e as pessoas.',
      'entrada.card1.title':'Contexto ausente ou frágil',
      'entrada.card1.text':'Quando faltam fatos, regras, exceções, histórico ou fonte confiável, a IA pode completar a lacuna com algo plausível — não necessariamente verdadeiro.',
      'entrada.card2.title':'Trabalho difícil de enxergar',
      'entrada.card2.text':'Fluxos oficiais não coincidem com a rotina, papéis se sobrepõem, decisões ficam dispersas e passagens importantes dependem da memória individual.',
      'entrada.card3.title':'IA sem governança nem adoção',
      'entrada.card3.text':'A ferramenta entra sem critérios de utilidade, responsáveis, revisão humana, aprendizagem, limites ou um desenho claro de como deverá apoiar o trabalho.',
      'entrada.quote.big':'Quando a IA não sabe o que é verdade, ela pode completar a lacuna. Quando não entende o trabalho, pode automatizar a coisa errada.',
      'entrada.quote.text':'Meu trabalho começa antes da ferramenta: apurar o problema certo, a realidade que a solução deverá respeitar e as condições humanas e institucionais para ela funcionar.',

      'mapa.label':'Antes da IA',
      'mapa.title':'Primeiro, eu apuro a realidade que a IA e a solução deverão respeitar.',
      'mapa.lead':'Investigo a organização por dentro para conectar objetivos, pessoas, processos e conhecimento; separar o que existe do que se presume; e distinguir o fluxo oficial do trabalho que realmente acontece.',
      'mapa.card1.title':'Fontes e evidências',
      'mapa.card1.text':'Quais documentos, sistemas, registros e pessoas sustentam cada informação — e qual é a autoridade, atualidade, proveniência e confiabilidade de cada fonte.',
      'mapa.card2.title':'Fluxos, gargalos e exceções',
      'mapa.card2.text':'Como o trabalho circula na prática, onde a informação se perde, onde nasce o retrabalho, quais atalhos existem e quais exceções revelam o processo real.',
      'mapa.card3.title':'Papéis, competências e colaboração',
      'mapa.card3.text':'Quem sabe, executa, decide, valida e responde; quais dependências e passagens existem; e onde há lacunas, sobreposições, tensões ou sobrecarga.',
      'mapa.card4.title':'Linguagem e critérios de decisão',
      'mapa.card4.text':'Vocabulário institucional, prioridades, classificações, padrões de resposta e critérios que orientam escolhas e que pessoas e IA precisam compreender do mesmo modo.',
      'mapa.card5.title':'Contradições, limites e riscos',
      'mapa.card5.text':'Fontes conflitantes, regras implícitas, dados ausentes, informação sensível e situações em que a IA deve reconhecer incerteza, pedir validação ou não responder.',
      'mapa.card6.title':'Casos de uso e prioridades',
      'mapa.card6.text':'Onde a IA pode gerar valor, reduzir atrito, melhorar qualidade ou preservar continuidade — e onde automatizar ainda não faz sentido ou não possui contexto suficiente.',

      'entregas.label':'Arquitetura contextual',
      'entregas.title':'Depois, transformo a apuração em uma base para decidir, colaborar e usar IA com confiança.',
      'entregas.lead':'As entregas se adaptam ao problema. Podem organizar conhecimento, esclarecer responsabilidades, desenhar fluxos e assistentes, preparar pessoas ou orientar decisões — sempre sobre uma base revisável e conectada ao trabalho real.',
      'entregas.card1.title':'Diagnóstico e mapa contextual',
      'entregas.card1.text':'Uma visão integrada de objetivos, pessoas, processos, fontes, riscos e prioridades, mostrando o que já existe, o que falta e qual é a menor intervenção realmente útil.',
      'entregas.card2.title':'Arquitetura de fontes e conhecimento',
      'entregas.card2.text':'Fontes vivas, rotas de consulta, precedência, critérios de autoridade, responsáveis e protocolos de atualização para preservar verdade e continuidade.',
      'entregas.card3.title':'Papéis, fluxos e decisões',
      'entregas.card3.text':'Responsabilidades, competências, alçadas, dependências, passagens e pontos de revisão explícitos para reduzir ruído, lacunas e retrabalho.',
      'entregas.card4.title':'Desenho de assistentes e soluções',
      'entregas.card4.text':'Propósito, usuários, tarefas, entradas, saídas, fontes, limites, permissões e padrões de resposta definidos antes e durante a implementação.',
      'entregas.card5.title':'Documentação viva e memória operacional',
      'entregas.card5.text':'Registros atualizáveis que mostram o que vale agora, o que mudou, por que mudou, quem responde e como manter conhecimento mesmo quando pessoas e prioridades mudam.',
      'entregas.card6.title':'Governança, revisão e capacitação',
      'entregas.card6.text':'Critérios de segurança e responsabilidade, validação humana, aprendizagem conectada à rotina e formas de acompanhar se a IA está sendo útil de verdade.',

      'ciclo.label':'Uso e auditoria',
      'ciclo.title':'O trabalho não termina quando a IA começa a responder — nem quando a ferramenta é lançada.',
      'ciclo.lead':'Faço apurações e auditorias contextuais antes e depois do uso, valido a solução com pessoas próximas do trabalho e acompanho como respostas, fluxos e aprendizagem evoluem na rotina.',
      'ciclo.fase1.label':'Antes do uso',
      'ciclo.fase1.title':'Auditar entradas',
      'ciclo.fase1.text':'Revisar fontes, atualidade, autoridade, lacunas, conflitos, informação sensível e instruções que orientarão a IA.',
      'ciclo.fase2.label':'Trabalho real',
      'ciclo.fase2.title':'Testar cenários',
      'ciclo.fase2.text':'Usar casos reais, exceções, perguntas ambíguas, situações de risco e condições em que a IA deve pedir validação ou se recusar a concluir.',
      'ciclo.fase3.label':'Adoção',
      'ciclo.fase3.title':'Validar com pessoas',
      'ciclo.fase3.text':'Verificar com quem executa, decide e responde se a solução melhora clareza, colaboração e resultado — e preparar aprendizagem ligada à rotina.',
      'ciclo.fase4.label':'Depois do uso',
      'ciclo.fase4.title':'Auditar respostas e causas',
      'ciclo.fase4.text':'Analisar invenções, extrapolações, omissões, linguagem enganosa e perda de nuance, rastreando se a falha veio da fonte, instrução, fluxo, uso ou sistema.',
      'ciclo.fase5.label':'Continuidade',
      'ciclo.fase5.title':'Corrigir, aprender e evoluir',
      'ciclo.fase5.text':'Atualizar a base, ajustar critérios e fluxos, registrar incidentes, ampliar o que funciona e acompanhar mudanças na organização e na IA.',

      'lastro.label':'Por que eu',
      'lastro.title':'Meu diferencial é auditar a IA sem perder de vista o sistema humano que ela atravessa.',
      'lastro.lead':'Não entro como engenheira de modelos nem como auditora técnica de infraestrutura. Trabalho onde IA, pessoas, conhecimento, aprendizagem, poder, decisões e responsabilidade se encontram — e onde uma resposta errada ou uma adoção mal desenhada pode parecer correta por tempo demais.',
      'lastro.card1.title':'Psicologia Hospitalar',
      'lastro.card1.text':'Experiência em sistemas complexos, equipes multiprofissionais, informação sensível, decisões sob pressão, comunicação de risco e consequências humanas reais.',
      'lastro.card2.title':'Psicologia Organizacional',
      'lastro.card2.text':'Leitura de papéis, autoridade, cultura, autonomia, conflitos, colaboração e mudança para compreender não só o processo formal, mas as pessoas que o fazem funcionar.',
      'lastro.card3.title':'Psicopedagogia Institucional',
      'lastro.card3.text':'Desenho de aprendizagem, letramento e capacitação conectados ao trabalho real para que a adoção não termine no lançamento da ferramenta.',
      'lastro.card4.title':'Investigação e governança de conhecimento',
      'lastro.card4.text':'Apuração de fontes, versões, contradições, conhecimento tácito, autoria, proveniência, atualização e diferenças entre processo formal e trabalho vivido.',
      'lastro.card5.title':'Mediação e linguagem estratégica',
      'lastro.card5.text':'Reconhecimento de tensões, sobrecarga e falhas de comunicação, com tradução da complexidade em briefings, critérios, textos e passagens de responsabilidade claras.',
      'lastro.card6.title':'Sistemas aplicados com IA',
      'lastro.card6.text':'Construção e manutenção de assistentes, revisores, fontes vivas, motores visuais, critérios de resposta, rotinas de qualidade, memória e continuidade.',
      'lastro.boundary.big':'Não desenvolvo o modelo. Estruturo o que ele deve considerar, desenho como ele entra no trabalho, testo como responde e investigo onde pode falhar.',
      'lastro.boundary.text':'Meu trabalho complementa equipes técnicas, produto, Qualidade, Gestão de Pessoas, Saúde, Educação, setor público e organizações que precisam conectar IA, conhecimento e trabalho humano sem transformar plausibilidade em verdade institucional.',
      'lastro.tag1':'apuração contextual',
      'lastro.tag2':'auditoria de IA',
      'lastro.tag3':'fluxos e decisões',
      'lastro.tag4':'governança de conhecimento',
      'lastro.tag5':'adoção e aprendizagem',
      'lastro.tag6':'revisão humana',
      'lastro.tag7':'tradução institucional',

      'contact.quote':'IA confiável não nasce só de um bom modelo. Nasce de contexto verificável, trabalho legível, pessoas preparadas e revisão contínua.',
      'contact.title':'Vamos conversar sobre onde esse trabalho pode fazer diferença na sua realidade?',
      'contact.sub':'Se sua organização quer usar IA, corrigir algo já em funcionamento, organizar conhecimento ou melhorar decisões e fluxos, posso ajudar a apurar o cenário, estruturar a solução, preparar a adoção e auditar o uso.',
      'foot.rights':'Arquitetura Contextual e Auditoria de IA · Limeira/SP · trabalho remoto'
    },

    en: {
      'nav.entrada':'The problem',
      'nav.mapa':'Investigation',
      'nav.entregas':'Architecture',
      'nav.ciclo':'Use and auditing',
      'nav.lastro':'Foundation',
      'hero.eyebrow':'Context Architecture and AI Auditing',
      'hero.title':'<span class="hero-line">I build the <span class="context-word">context</span></span><span class="hero-line">AI needs to respond</span><span class="hero-line">from <span class="tone-gold">reality</span> —</span><span class="hero-line hero-resolution">not guesswork.</span>',
      'hero.cta1':'Download AI packet',
      'hero.cta2':'Talk to me',

      'entrada.label':'The problem',
      'entrada.title':'A plausible answer can still be wrong — and a good tool can still fail in daily work.',
      'entrada.lead':'AI can produce convincing outputs from incomplete, outdated, or unauthorized context. It can also be applied to the wrong problem, ignore real workflows, and increase noise, rework, or dependency. In human and institutional matters, trust requires understanding information, work, and people together.',
      'entrada.card1.title':'Missing or fragile context',
      'entrada.card1.text':'When facts, rules, exceptions, history, or trustworthy sources are missing, AI may fill the gap with something plausible — not necessarily true.',
      'entrada.card2.title':'Work that is hard to see',
      'entrada.card2.text':'Official workflows differ from daily practice, roles overlap, decisions remain scattered, and important handoffs depend on individual memory.',
      'entrada.card3.title':'AI without governance or adoption',
      'entrada.card3.text':'The tool enters without usefulness criteria, accountable owners, human review, learning, boundaries, or a clear design for supporting the work.',
      'entrada.quote.big':'When AI does not know what is true, it may fill the gap. When it does not understand the work, it may automate the wrong thing.',
      'entrada.quote.text':'My work begins before the tool: investigating the right problem, the reality the solution must respect, and the human and institutional conditions it needs to work.',

      'mapa.label':'Before AI',
      'mapa.title':'First, I investigate the reality both AI and the solution will be expected to respect.',
      'mapa.lead':'I study the organization from within to connect goals, people, processes, and knowledge; separate what exists from what is assumed; and distinguish official workflows from the work that actually happens.',
      'mapa.card1.title':'Sources and evidence',
      'mapa.card1.text':'Which documents, systems, records, and people support each piece of information — and the authority, freshness, provenance, and reliability of every source.',
      'mapa.card2.title':'Workflows, bottlenecks, and exceptions',
      'mapa.card2.text':'How work moves in practice, where information is lost, where rework begins, which shortcuts exist, and which exceptions reveal the real process.',
      'mapa.card3.title':'Roles, capabilities, and collaboration',
      'mapa.card3.text':'Who knows, acts, decides, validates, and owns each part; which dependencies and handoffs exist; and where gaps, overlap, tension, or overload appear.',
      'mapa.card4.title':'Language and decision criteria',
      'mapa.card4.text':'Institutional vocabulary, priorities, classifications, response patterns, and criteria that guide choices and that people and AI must understand consistently.',
      'mapa.card5.title':'Contradictions, boundaries, and risks',
      'mapa.card5.text':'Conflicting sources, implicit rules, missing data, sensitive information, and situations where AI must acknowledge uncertainty, request validation, or not answer.',
      'mapa.card6.title':'Use cases and priorities',
      'mapa.card6.text':'Where AI can create value, reduce friction, improve quality, or preserve continuity — and where automation still makes little sense or lacks sufficient context.',

      'entregas.label':'Context architecture',
      'entregas.title':'Then I turn the investigation into a foundation for better decisions, collaboration, and trustworthy AI use.',
      'entregas.lead':'Outputs adapt to the problem. They may organize knowledge, clarify accountability, design workflows and assistants, prepare people, or guide decisions — always through a reviewable foundation connected to real work.',
      'entregas.card1.title':'Context diagnosis and map',
      'entregas.card1.text':'An integrated view of goals, people, processes, sources, risks, and priorities, showing what exists, what is missing, and the smallest intervention that would actually help.',
      'entregas.card2.title':'Source and knowledge architecture',
      'entregas.card2.text':'Living sources, consultation routes, precedence, authority criteria, accountable owners, and update protocols that preserve truth and continuity.',
      'entregas.card3.title':'Roles, workflows, and decisions',
      'entregas.card3.text':'Responsibilities, capabilities, decision rights, dependencies, handoffs, and review points made explicit to reduce noise, gaps, and rework.',
      'entregas.card4.title':'Assistant and solution design',
      'entregas.card4.text':'Purpose, users, tasks, inputs, outputs, sources, boundaries, permissions, and response standards defined before and during implementation.',
      'entregas.card5.title':'Living documentation and operational memory',
      'entregas.card5.text':'Updatable records showing what is current, what changed, why it changed, who owns it, and how knowledge remains available as people and priorities change.',
      'entregas.card6.title':'Governance, review, and enablement',
      'entregas.card6.text':'Safety and accountability criteria, human validation, learning connected to daily work, and ways to track whether AI is genuinely useful.',

      'ciclo.label':'Use and auditing',
      'ciclo.title':'The work does not end when AI starts answering — or when the tool launches.',
      'ciclo.lead':'I conduct contextual investigations and audits before and after use, validate the solution with people close to the work, and follow how outputs, workflows, and learning evolve in practice.',
      'ciclo.fase1.label':'Before use',
      'ciclo.fase1.title':'Audit inputs',
      'ciclo.fase1.text':'Review sources, freshness, authority, gaps, conflicts, sensitive information, and the instructions that will guide AI.',
      'ciclo.fase2.label':'Real work',
      'ciclo.fase2.title':'Test scenarios',
      'ciclo.fase2.text':'Use real cases, exceptions, ambiguous questions, risk situations, and conditions in which AI must request validation or decline to conclude.',
      'ciclo.fase3.label':'Adoption',
      'ciclo.fase3.title':'Validate with people',
      'ciclo.fase3.text':'Check with those who act, decide, and own the work whether the solution improves clarity, collaboration, and outcomes — and prepare learning tied to daily practice.',
      'ciclo.fase4.label':'After use',
      'ciclo.fase4.title':'Audit outputs and causes',
      'ciclo.fase4.text':'Analyze fabrication, extrapolation, omission, misleading language, and lost nuance, tracing whether the failure came from the source, instruction, workflow, use case, or system.',
      'ciclo.fase5.label':'Continuity',
      'ciclo.fase5.title':'Correct, learn, and evolve',
      'ciclo.fase5.text':'Update the foundation, refine criteria and workflows, record incidents, expand what works, and follow changes in both the organization and the AI system.',

      'lastro.label':'Why me',
      'lastro.title':'My differentiator is auditing AI without losing sight of the human system it moves through.',
      'lastro.lead':'I do not enter as a model engineer or technical infrastructure auditor. I work where AI, people, knowledge, learning, power, decisions, and accountability meet — where a wrong answer or poorly designed adoption can look right for far too long.',
      'lastro.card1.title':'Hospital Psychology',
      'lastro.card1.text':'Experience in complex systems, multidisciplinary teams, sensitive information, high-pressure decisions, risk communication, and real human consequences.',
      'lastro.card2.title':'Organizational Psychology',
      'lastro.card2.text':'Understanding roles, authority, culture, autonomy, conflict, collaboration, and change to read not only the formal process but the people who make it work.',
      'lastro.card3.title':'Institutional Psychopedagogy',
      'lastro.card3.text':'Learning, literacy, and enablement connected to real work so adoption does not end when the tool launches.',
      'lastro.card4.title':'Investigation and knowledge governance',
      'lastro.card4.text':'Investigation of sources, versions, contradictions, tacit knowledge, authorship, provenance, updates, and gaps between formal processes and lived work.',
      'lastro.card5.title':'Mediation and strategic language',
      'lastro.card5.text':'Recognizing tension, overload, and communication failures while translating complexity into clear briefs, criteria, writing, and handoffs.',
      'lastro.card6.title':'Applied AI systems',
      'lastro.card6.text':'Building and maintaining assistants, reviewers, living sources, visual engines, response criteria, quality routines, memory, and continuity.',
      'lastro.boundary.big':'I do not build the model. I structure what it should consider, design how it enters the work, test how it responds, and investigate where it may fail.',
      'lastro.boundary.text':'My work complements technical teams, product, Quality, People, Healthcare, Education, public-sector organizations, and institutions that must connect AI, knowledge, and human work without mistaking plausibility for institutional truth.',
      'lastro.tag1':'context investigation',
      'lastro.tag2':'AI auditing',
      'lastro.tag3':'workflows and decisions',
      'lastro.tag4':'knowledge governance',
      'lastro.tag5':'adoption and learning',
      'lastro.tag6':'human review',
      'lastro.tag7':'institutional translation',

      'contact.quote':'Trustworthy AI does not come from a good model alone. It comes from verifiable context, legible work, prepared people, and continuous review.',
      'contact.title':'Let’s talk about where this work could make a difference in your reality.',
      'contact.sub':'If your organization wants to use AI, fix something already in operation, organize knowledge, or improve decisions and workflows, I can help investigate the landscape, structure the solution, prepare adoption, and audit its use.',
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

  const BETA_PACKET = `# LUA HELENA MOON — CONTEXT ARCHITECTURE & AI AUDITING PACKET — BETA V8

## Positioning
Lua Helena Moon is a hospital psychologist and Human–AI Context Architect working across contextual investigation, knowledge governance, institutional translation, AI adoption, workflow design, and applied AI auditing.

She helps organizations reduce fabricated or weakly grounded AI outputs while also improving decisions, collaboration, continuity, and the practical adoption of AI.

Her work connects four layers:

1. Investigate institutional reality, the right problem, and the real conditions of work before AI use.
2. Structure sources, roles, workflows, criteria, boundaries, and validation rights into governed context.
3. Design assistants, solution flows, living documentation, and learning connected to daily practice.
4. Audit inputs and outputs before and after use, trace failure causes, and evolve the system over time.

## What she investigates
- sources, versions, provenance, freshness, and authority
- real workflows, bottlenecks, exceptions, friction, and tacit knowledge
- roles, capabilities, decision rights, owners, and human validators
- institutional vocabulary, priorities, and recurring decision criteria
- contradictions, gaps, sensitive information, and uncertainty boundaries
- realistic use cases, priorities, and cases that should not be automated
- collaboration, adoption, learning, and accountability conditions

## Possible outputs
- organizational context diagnosis and map
- source-of-truth and precedence model
- role, capability, workflow, and decision-rights map
- living source and knowledge architecture
- assistant or solution-flow specification
- AI orientation packet
- living documentation and operational memory
- governance, human-review, and accountability model
- learning and enablement connected to real work
- pre-use contextual audit and scenario tests
- post-use output audit and failure diagnosis
- context maintenance and incident-learning process

## Professional foundation
Her foundation combines Hospital Psychology, Organizational Psychology, Institutional Psychopedagogy, Sociology, contextual investigation, mediation, strategic communication, knowledge governance, and the practical construction of AI-assisted systems.

## Scope boundary
Lua does not develop foundation models, perform cybersecurity audits, certify legal compliance, or present herself as an ML engineer. Her audit scope is contextual, institutional, linguistic, operational, and human-centered. She works alongside technical, legal, data, security, product, quality, and domain teams when those layers are required.

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

  document.querySelectorAll('[data-packet]').forEach((button) => {
    button.onclick = downloadBetaPacket;
  });
})();
