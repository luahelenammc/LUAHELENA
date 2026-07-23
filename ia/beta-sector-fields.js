(() => {
  const content = {
    pt: {
      nav: 'Campos de atuação',
      label: 'Onde isso gera valor',
      title: 'Os mesmos problemas atravessam saúde, serviços, empresas e poder público.',
      lead: 'A tecnologia muda de setor, mas a camada humana costuma repetir as mesmas dores: atendimento sem continuidade, fluxos fragmentados, informação que não chega, responsabilidades difusas e decisões sem lastro. É aí que meu trabalho entra.',
      priorities: [
        ['messages-square','Atendimento e jornadas'],
        ['heart-pulse','Saúde e cuidado'],
        ['workflow','Gestão e processos'],
        ['scan-search','Transparência e auditoria']
      ],
      cards: [
        {tone:'cyan',icon:'messages-square',rank:'Prioridade',title:'Atendimento e jornadas',pain:'Canais que não compartilham contexto, pedidos repetidos, encaminhamentos confusos e pessoas que precisam começar tudo de novo.',action:'Mapear a jornada, as fontes, os pontos de passagem e os critérios de escalonamento para tornar o atendimento mais contínuo e compreensível.'},
        {tone:'rose',icon:'heart-pulse',rank:'Prioridade',title:'Saúde e cuidado',pain:'Informação sensível dispersa, equipes multiprofissionais, fluxos críticos, comunicação difícil e decisões com consequência humana.',action:'Estruturar contexto, responsabilidades, linguagem e limites para apoiar cuidado, comunicação, orientação e adoção segura de IA.'},
        {tone:'mint',icon:'workflow',rank:'Prioridade',title:'Gestão e processos',pain:'Processo formal diferente do processo vivido, retrabalho, dependência de pessoas-chave e passagens de responsabilidade frágeis.',action:'Revelar o fluxo real, explicitar papéis, reduzir ambiguidades e transformar conhecimento tácito em documentação utilizável.'},
        {tone:'gold',icon:'scan-search',rank:'Prioridade',title:'Transparência e auditoria',pain:'Respostas convincentes sem fonte clara, versões conflitantes, decisões opacas e indicadores que mostram atividade sem explicar resultado.',action:'Definir fonte de verdade, critérios de revisão, rastreabilidade, ownership e rotinas de auditoria contextual e de respostas de IA.'},
        {tone:'violet',icon:'users-round',rank:'Transversal',title:'Pessoas, papéis e aprendizagem',pain:'Tecnologia implantada sem clareza de responsabilidade, sem capacitação ligada à rotina e sem participação de quem executa o trabalho.',action:'Desenhar papéis, autonomia, validação humana, letramento em IA e aprendizagem institucional aplicada.'},
        {tone:'blue',icon:'files',rank:'Transversal',title:'Conhecimento e documentação',pain:'Arquivos dispersos, regras envelhecidas, memória presa em indivíduos e bases que crescem sem governança.',action:'Organizar fontes, versões, decisões e atualizações em documentação viva e conhecimento confiável para pessoas e IA.'},
        {tone:'green',icon:'building-2',rank:'Transversal',title:'Serviços e operações',pain:'Áreas e sistemas funcionam isoladamente, exceções não têm destino claro e a experiência se quebra entre canais, equipes ou fornecedores.',action:'Criar interfaces, handoffs e critérios comuns para integrar operação sem fingir que integração técnica resolve tudo sozinha.'},
        {tone:'quiet',icon:'chart-no-axes-combined',rank:'Transversal',title:'Dados e decisão',pain:'Dados existem, mas não viram informação útil; dashboards acumulam números sem contexto, responsabilidade ou consequência operacional.',action:'Conectar indicadores a perguntas reais, fontes, responsáveis, limites de interpretação e decisões que precisam ser tomadas.'}
      ],
      bridgeTitle:'Não é uma lista de setores em que finjo especialização.',
      bridgeText:'É um mapa de problemas recorrentes nos quais minha arquitetura de contexto pode complementar equipes técnicas, operacionais e institucionais — no público, no privado e no terceiro setor.',
      tags:['saúde','serviços','empresas','governo','educação','operações']
    },
    en: {
      nav: 'Application fields',
      label: 'Where this creates value',
      title: 'The same problems cut across healthcare, services, companies, and the public sector.',
      lead: 'Technology changes by sector, but the human layer often repeats the same pain: fragmented service, broken workflows, information that does not travel, unclear accountability, and decisions without reliable grounding. That is where my work fits.',
      priorities: [
        ['messages-square','Service and journeys'],
        ['heart-pulse','Healthcare and care'],
        ['workflow','Management and processes'],
        ['scan-search','Transparency and auditing']
      ],
      cards: [
        {tone:'cyan',icon:'messages-square',rank:'Priority',title:'Service and journeys',pain:'Channels do not share context, requests repeat, referrals are confusing, and people have to start over.',action:'Map the journey, sources, handoffs, and escalation criteria to make service more continuous and understandable.'},
        {tone:'rose',icon:'heart-pulse',rank:'Priority',title:'Healthcare and care',pain:'Sensitive information is scattered across multidisciplinary teams, critical workflows, difficult communication, and consequential decisions.',action:'Structure context, accountability, language, and boundaries to support care, communication, guidance, and safe AI adoption.'},
        {tone:'mint',icon:'workflow',rank:'Priority',title:'Management and processes',pain:'Official process differs from lived work, rework accumulates, key people become bottlenecks, and handoffs remain fragile.',action:'Reveal the real workflow, clarify roles, reduce ambiguity, and turn tacit knowledge into usable documentation.'},
        {tone:'gold',icon:'scan-search',rank:'Priority',title:'Transparency and auditing',pain:'Convincing answers lack clear sources, versions conflict, decisions are opaque, and metrics show activity without explaining outcomes.',action:'Define sources of truth, review criteria, traceability, ownership, and routines for contextual and AI-output auditing.'},
        {tone:'violet',icon:'users-round',rank:'Cross-sector',title:'People, roles, and learning',pain:'Technology is deployed without clear accountability, learning tied to routine, or participation from the people doing the work.',action:'Design roles, autonomy, human validation, AI literacy, and applied institutional learning.'},
        {tone:'blue',icon:'files',rank:'Cross-sector',title:'Knowledge and documentation',pain:'Files are scattered, rules age, memory remains trapped in individuals, and knowledge bases grow without governance.',action:'Organize sources, versions, decisions, and updates into living documentation and trustworthy knowledge for people and AI.'},
        {tone:'green',icon:'building-2',rank:'Cross-sector',title:'Services and operations',pain:'Areas and systems operate in isolation, exceptions lack a clear destination, and experience breaks across channels, teams, or vendors.',action:'Create interfaces, handoffs, and shared criteria that integrate operations without pretending technical integration solves everything.'},
        {tone:'quiet',icon:'chart-no-axes-combined',rank:'Cross-sector',title:'Data and decisions',pain:'Data exists but does not become useful information; dashboards collect numbers without context, ownership, or operational consequence.',action:'Connect indicators to real questions, sources, owners, interpretation boundaries, and decisions that need to be made.'}
      ],
      bridgeTitle:'This is not a list of sectors where I pretend to be a specialist.',
      bridgeText:'It is a map of recurring problems where my context architecture can complement technical, operational, and institutional teams — across public, private, and nonprofit settings.',
      tags:['healthcare','services','companies','government','education','operations']
    }
  };

  function lang(){ return document.documentElement.lang === 'en' ? 'en' : 'pt'; }
  function card(c){
    return `<article class="sector-card" data-tone="${c.tone}"><div class="sector-head"><div class="sector-title-wrap"><span class="sector-icon"><i data-lucide="${c.icon}"></i></span><h3>${c.title}</h3></div><span class="sector-rank">${c.rank}</span></div><p class="sector-pain">${c.pain}</p><div class="sector-action"><i data-lucide="arrow-right"></i><span>${c.action}</span></div></article>`;
  }
  function render(){
    const c=content[lang()];
    const section=document.getElementById('campos');
    if(!section) return;
    section.querySelector('[data-sector-label]').textContent=c.label;
    section.querySelector('[data-sector-title]').textContent=c.title;
    section.querySelector('[data-sector-lead]').textContent=c.lead;
    section.querySelector('[data-sector-priority]').innerHTML=c.priorities.map(([icon,text])=>`<div class="sector-priority-item" style="--sector-accent:var(--gold)"><i data-lucide="${icon}"></i><span>${text}</span></div>`).join('');
    section.querySelector('[data-sector-grid]').innerHTML=c.cards.map(card).join('');
    section.querySelector('[data-sector-bridge-title]').textContent=c.bridgeTitle;
    section.querySelector('[data-sector-bridge-text]').textContent=c.bridgeText;
    section.querySelector('[data-sector-tags]').innerHTML=c.tags.map(t=>`<span>${t}</span>`).join('');
    const nav=document.querySelector('[data-sector-nav]'); if(nav) nav.textContent=c.nav;
    if(window.lucide) window.lucide.createIcons();
  }
  function install(){
    if(document.getElementById('campos')) return;
    const cycle=document.getElementById('ciclo');
    if(!cycle) return;
    cycle.insertAdjacentHTML('beforebegin',`<section class="block wrap reveal" id="campos"><div class="block-grid"><div class="rail"><div class="rail-sticky"><span class="num-big">03</span><span class="label" data-sector-label></span></div></div><div><h2 class="section-title" data-sector-title></h2><p class="section-lead" data-sector-lead></p><div class="sector-frame"><div class="sector-priority" data-sector-priority></div><div class="sector-grid" data-sector-grid></div><div class="sector-bridge"><div><strong data-sector-bridge-title></strong><p data-sector-bridge-text></p></div><div class="sector-bridge-tags" data-sector-tags></div></div></div></div></div></section>`);
    const cycleNum=cycle.querySelector('.num-big'); if(cycleNum) cycleNum.textContent='04';
    const lastroNum=document.querySelector('#lastro .num-big'); if(lastroNum) lastroNum.textContent='05';
    const navLastro=document.querySelector('.nav-links a[href="#lastro"]');
    if(navLastro) navLastro.insertAdjacentHTML('beforebegin','<a href="#campos" data-sector-nav></a>');
    render();
    const section=document.getElementById('campos');
    if(section){
      if(!('IntersectionObserver' in window)) section.classList.add('show');
      else new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.disconnect();}}),{threshold:.08}).observe(section);
    }
    document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setTimeout(render,0)));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
})();
