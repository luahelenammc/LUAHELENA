(() => {
  const content = {
    pt: {
      nav: 'Aplicações',
      label: 'Aplicações',
      title: 'Onde esse trabalho se aplica.',
      lead: 'O domínio muda; o problema de contexto se repete. Eu organizo o que governa, como o trabalho realmente acontece e onde a IA pode entrar sem criar mais ruído.',
      cards: [
        {tone:'cyan',icon:'messages-square',title:'Atendimento e jornadas',keywords:['canais','encaminhamentos','continuidade'],text:'Organizar fontes, critérios e encaminhamentos para reduzir respostas inconsistentes e perdas de contexto.'},
        {tone:'rose',icon:'heart-pulse',title:'Saúde e cuidado',keywords:['informação sensível','equipes multiprofissionais','decisões críticas'],text:'Tornar legíveis fluxos, responsabilidades e limites de informação em contextos sensíveis.'},
        {tone:'mint',icon:'workflow',title:'Gestão e processos',keywords:['fluxo real','papéis','passagens'],text:'Explicitar o fluxo real, as exceções e as passagens de responsabilidade antes de automatizar.'},
        {tone:'gold',icon:'scan-search',title:'Transparência e auditoria',keywords:['fontes','rastreabilidade','revisão'],text:'Ligar respostas e decisões às fontes, aos critérios e aos pontos de revisão que as sustentam.'},
        {tone:'violet',icon:'users-round',title:'Pessoas e aprendizagem',keywords:['autonomia','capacitação','adoção'],text:'Transformar adoção de IA em prática compreensível, treinável e revisável dentro da rotina.'},
        {tone:'blue',icon:'database',title:'Conhecimento e dados',keywords:['autoridade','atualidade','memória'],text:'Dar autoridade, atualidade e destino ao conhecimento disperso para que ele continue utilizável.'}
      ]
    },
    en: {
      nav: 'Applications',
      label: 'Applications',
      title: 'Where this work applies.',
      lead: 'The domain changes; the context problem repeats. I organize what governs, how the work actually happens, and where AI can enter without creating more noise.',
      cards: [
        {tone:'cyan',icon:'messages-square',title:'Service and journeys',keywords:['channels','routing','continuity'],text:'Organize sources, criteria, and routing so service loses less context and produces fewer inconsistent answers.'},
        {tone:'rose',icon:'heart-pulse',title:'Healthcare and care',keywords:['sensitive information','multidisciplinary teams','critical decisions'],text:'Make workflows, accountability, and information boundaries legible in sensitive settings.'},
        {tone:'mint',icon:'workflow',title:'Management and processes',keywords:['real workflow','roles','transitions'],text:'Make the real workflow, exceptions, and responsibility transitions explicit before automating.'},
        {tone:'gold',icon:'scan-search',title:'Transparency and auditing',keywords:['sources','traceability','review'],text:'Connect answers and decisions to the sources, criteria, and review points that support them.'},
        {tone:'violet',icon:'users-round',title:'People and learning',keywords:['autonomy','enablement','adoption'],text:'Turn AI adoption into a practice people can understand, learn, review, and sustain in real work.'},
        {tone:'blue',icon:'database',title:'Knowledge and data',keywords:['authority','freshness','memory'],text:'Give scattered knowledge authority, freshness, and a clear destination so it stays usable.'}
      ]
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
    const nav=document.querySelector('[data-sector-nav]');
    if(nav) nav.textContent=c.nav;
    if(window.lucide) window.lucide.createIcons();
  }
  function install(){
    if(document.getElementById('campos')) return;
    const cycle=document.getElementById('ciclo');
    if(!cycle) return;
    cycle.insertAdjacentHTML('beforebegin',`<section class="block wrap reveal" id="campos"><div class="block-grid"><div class="rail"><div class="rail-sticky"><span class="num-big">03</span><span class="label" data-sector-label></span></div></div><div><h2 class="section-title" data-sector-title></h2><p class="section-lead" data-sector-lead></p><div class="sector-grid" data-sector-grid></div></div></div></section>`);
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