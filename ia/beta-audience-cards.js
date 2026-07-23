(() => {
  const content = {
    pt: {
      label: 'Públicos',
      title: 'Para quem esse trabalho faz sentido.',
      lead: 'Organizações que precisam tornar conhecimento, processos e decisões mais claros para pessoas e IA.',
      cards: [
        {tone:'cyan',icon:'building-2',title:'Empresas',keywords:['processos','conhecimento','adoção'],text:'Para equipes, operações e produtos que precisam reduzir ruído e estruturar o uso de IA.'},
        {tone:'gold',icon:'landmark',title:'Serviços públicos',keywords:['atendimento','integração','transparência'],text:'Para serviços que precisam conectar áreas, orientar pessoas e responder com mais clareza.'},
        {tone:'rose',icon:'heart-handshake',title:'Terceiro setor',keywords:['impacto','continuidade','memória'],text:'Para iniciativas que precisam coordenar redes, preservar conhecimento e sustentar impacto.'}
      ]
    },
    en: {
      label: 'Audiences',
      title: 'Who this work is for.',
      lead: 'Organizations that need to make knowledge, processes, and decisions clearer for people and AI.',
      cards: [
        {tone:'cyan',icon:'building-2',title:'Companies',keywords:['processes','knowledge','adoption'],text:'For teams, operations, and products that need less noise and a more structured use of AI.'},
        {tone:'gold',icon:'landmark',title:'Public services',keywords:['service','integration','transparency'],text:'For services that need to connect areas, guide people, and respond more clearly.'},
        {tone:'rose',icon:'heart-handshake',title:'Nonprofit sector',keywords:['impact','continuity','memory'],text:'For initiatives that need to coordinate networks, preserve knowledge, and sustain impact.'}
      ]
    }
  };

  function lang(){ return document.documentElement.lang === 'en' ? 'en' : 'pt'; }
  function card(c){
    return `<article class="audience-card" data-tone="${c.tone}"><div class="audience-card-head"><span class="audience-icon"><i data-lucide="${c.icon}"></i></span><h3>${c.title}</h3></div><div class="audience-keywords">${c.keywords.map(k=>`<span>${k}</span>`).join('')}</div><p>${c.text}</p></article>`;
  }
  function render(){
    const c=content[lang()];
    const section=document.getElementById('publicos');
    if(!section) return;
    section.querySelector('[data-audience-label]').textContent=c.label;
    section.querySelector('[data-audience-title]').textContent=c.title;
    section.querySelector('[data-audience-lead]').textContent=c.lead;
    section.querySelector('[data-audience-grid]').innerHTML=c.cards.map(card).join('');
    if(window.lucide) window.lucide.createIcons();
  }
  function install(){
    if(document.getElementById('publicos')) return;
    const cycle=document.getElementById('ciclo');
    if(!cycle) return;
    cycle.insertAdjacentHTML('beforebegin',`<section class="block wrap reveal" id="publicos"><div class="block-grid"><div class="rail"><div class="rail-sticky"><span class="num-big">04</span><span class="label" data-audience-label></span></div></div><div><h2 class="section-title" data-audience-title></h2><p class="section-lead" data-audience-lead></p><div class="audience-grid" data-audience-grid></div></div></div></section>`);
    const cycleNum=cycle.querySelector('.num-big');
    if(cycleNum) cycleNum.textContent='05';
    const lastroNum=document.querySelector('#lastro .num-big');
    if(lastroNum) lastroNum.textContent='06';
    render();
    const section=document.getElementById('publicos');
    if(section){
      if(!('IntersectionObserver' in window)) section.classList.add('show');
      else new IntersectionObserver((entries,obs)=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show');obs.disconnect();}}),{threshold:.08}).observe(section);
    }
    document.querySelectorAll('[data-lang]').forEach(btn=>btn.addEventListener('click',()=>setTimeout(render,0)));
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
})();