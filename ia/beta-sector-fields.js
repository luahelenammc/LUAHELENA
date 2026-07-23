(() => {
  const content = {
    pt: {
      nav: 'Aplicações',
      label: 'Aplicações',
      title: 'Onde esse trabalho se aplica.',
      lead: 'Problemas de contexto aparecem em diferentes setores. O método continua o mesmo: entender, estruturar, validar e manter.',
      cards: [
        {tone:'cyan',icon:'messages-square',title:'Atendimento e jornadas',keywords:['canais','encaminhamentos','continuidade'],text:'Organizar a experiência de quem pede, recebe e encaminha.'},
        {tone:'rose',icon:'heart-pulse',title:'Saúde e cuidado',keywords:['informação sensível','equipes multi','decisões críticas'],text:'Dar clareza a fluxos, responsabilidades e comunicação.'},
        {tone:'mint',icon:'workflow',title:'Gestão e processos',keywords:['fluxo real','papéis','handoffs'],text:'Reduzir retrabalho, ambiguidade e dependência de memória individual.'},
        {tone:'gold',icon:'scan-search',title:'Transparência e auditoria',keywords:['fontes','rastreabilidade','revisão'],text:'Explicitar o que sustenta respostas, decisões e indicadores.'},
        {tone:'violet',icon:'users-round',title:'Pessoas e aprendizagem',keywords:['autonomia','capacitação','adoção'],text:'Conectar tecnologia, responsabilidade e rotina.'},
        {tone:'blue',icon:'database',title:'Conhecimento e dados',keywords:['documentação viva','indicadores','memória'],text:'Transformar informação dispersa em base utilizável.'}
      ],
      scope: 'Empresas · serviços públicos · terceiro setor'
    },
    en: {
      nav: 'Applications',
      label: 'Applications',
      title: 'Where this work applies.',
      lead: 'Context problems appear across sectors. The method remains the same: understand, structure, validate, and maintain.',
      cards: [
        {tone:'cyan',icon:'messages-square',title:'Service and journeys',keywords:['channels','referrals','continuity'],text:'Organize the experience of requesting, receiving, and routing service.'},
        {tone:'rose',icon:'heart-pulse',title:'Healthcare and care',keywords:['sensitive information','multidisciplinary teams','critical decisions'],text:'Bring clarity to workflows, accountability, and communication.'},
        {tone:'mint',icon:'workflow',title:'Management and processes',keywords:['real workflow','roles','handoffs'],text:'Reduce rework, ambiguity, and dependence on individual memory.'},
        {tone:'gold',icon:'scan-search',title:'Transparency and auditing',keywords:['sources','traceability','review'],text:'Make the grounding of answers, decisions, and indicators explicit.'},
        {tone:'violet',icon:'users-round',title:'People and learning',keywords:['autonomy','enablement','adoption'],text:'Connect technology, accountability, and routine.'},
        {tone:'blue',icon:'database',title:'Knowledge and data',keywords:['living documentation','indicators','memory'],text:'Turn scattered information into a usable foundation.'}
      ],
      scope: 'Companies · public services · nonprofit organizations'
    }
  };

  function lang(){ return document.documentElement.lang === 'en' ? 'en' : 'pt'; }
  function card(c){
    return `<article class="sector-card" data-tone="${c.tone}"><div class="sector-head"><span class="sector-icon"><i data-lucide="${c.icon}"></i></span><h3>${c.title}</h3></div><div class="sector-keywords">${c.keywords.map(k=>`<span>${k}</span>`).join('')}</div><p>${c.text}</p></article>`;
  }
  function render(){
    const c=content[lang()];
    const section=document.getElementById('campos');
    if(!section) return;
    section.querySelector('[data-sector-label]').textContent=c.label;
    section.querySelector('[data-sector-title]').textContent=c.title;
    section.querySelector('[data-sector-lead]').textContent=c.lead;
    section.querySelector('[data-sector-grid]').innerHTML=c.cards.map(card).join('');
    section.querySelector('[data-sector-scope]').textContent=c.scope;
    const nav=document.querySelector('[data-sector-nav]');
    if(nav) nav.textContent=c.nav;
    if(window.lucide) window.lucide.createIcons();
  }
  function install(){
    if(document.getElementById('campos')) return;
    const cycle=document.getElementById('ciclo');
    if(!cycle) return;
    cycle.insertAdjacentHTML('beforebegin',`<section class="block wrap reveal" id="campos"><div class="block-grid"><div class="rail"><div class="rail-sticky"><span class="num-big">03</span><span class="label" data-sector-label></span></div></div><div><h2 class="section-title" data-sector-title></h2><p class="section-lead" data-sector-lead></p><div class="sector-grid" data-sector-grid></div><p class="sector-scope" data-sector-scope></p></div></div></section>`);
    const cycleNum=cycle.querySelector('.num-big');
    if(cycleNum) cycleNum.textContent='04';
    const lastroNum=document.querySelector('#lastro .num-big');
    if(lastroNum) lastroNum.textContent='05';
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