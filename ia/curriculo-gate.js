/* CV Evidence Gate v1.0: lexical, deterministic, browser-local; not a commercial ATS. */
(() => {
  'use strict';
  const root=document.getElementById('cv-gate');
  if(!root)return;
  const COPY={
    pt:{
      nav:'Vaga × evidências ↓',
      kicker:'PROVA → CURRÍCULO → OPORTUNIDADE',title:'A evidência vem antes da palavra-chave.',
      intro:'Quatro versões de currículo, uma fonte factual e um método transparente de leitura por vaga. Esta camada pertence à web; as duas páginas A4 permanecem intactas.',
      lens1:'Legibilidade técnica',lens1s:'QA dos PDFs · 14/11/2026',lens1d:'Quatro PDFs pesquisáveis de uma página e seis links ativos por arquivo. Não é aprovação em ATS comercial.',
      lens2:'Qualidade editorial',lens2s:'Revisão orientada a provas',lens2d:'Função reconhecível, demonstração pública, autoria e limites. Protótipo não equivale a implantação.',
      lens3:'Aderência à vaga',lens3s:'Depende da vaga concreta',lens3d:'Requisitos ligados a evidências ou lacunas, sem nota mágica de contratação.',
      routes:'Escolha a rota curricular',routesd:'Arquivos PDF com texto pesquisável e links clicáveis, em português e inglês.',
      knowledge:'Gestão do Conhecimento',knowledged:'Knowledge Operations, documentação de processos e governança de fontes.',
      adoption:'Adoção de IA e Fluxos',adoptiond:'AI Enablement, documentação de workflows e aprendizagem aplicada.',
      primary:'ROTA PRIORITÁRIA',secondary:'ROTA SELETIVA',pdfnote:'Versões com hyperlinks corrigidos em 14/11/2026. Não são currículos personalizados para uma vaga.',
      tool:'Vaga × evidências',toold:'Cole requisitos de uma vaga. Esta leitura determinística identifica alguns temas e indica o que está documentado, é transferível ou não é reivindicado. Não substitui análise humana.',
      label:'Descrição ou requisitos da vaga',placeholder:'Ex.: gestão do conhecimento, documentação de processos, facilitação, Python…',
      run:'Examinar requisitos',clear:'Limpar',copy:'Copiar diagnóstico',copied:'Diagnóstico copiado.',copyfail:'Não foi possível copiar automaticamente.',
      privacy:'O texto é processado apenas neste navegador: não é enviado, salvo nem usado para candidatura.',
      result:'Mapa de evidências',summary:'Tema(s) encontrados: ',empty:'Cole um trecho da vaga antes de analisar.',
      none:'Nenhum tema do catálogo foi encontrado. Isso não demonstra incompatibilidade.',
      foot:'A detecção é lexical e incompleta. Requisitos obrigatórios, país, idioma, trabalho remoto a partir do Brasil e credenciais exigem confirmação humana.',
      documented:'Prova delimitada',transferable:'Capacidade transferível',notClaimed:'Sem claim autorizado',source:'Consultar prova',
      kname:'Gestão de conhecimento',kdesc:'Demonstração pública sintética sobre autoridade documental e escalonamento humano. Não comprova cargo corporativo anterior.',
      dname:'Documentação de processos',ddesc:'Moon Source documenta fontes, procedimentos, handoffs e decisões como projeto independente.',
      qname:'Avaliação qualitativa de IA',qdesc:'Especificação e revisão de casos de teste em demo determinística; não equivale à engenharia de modelos.',
      pname:'Mediação institucional',pdesc:'Experiência hospitalar declarada de comunicação multiprofissional e registros de continuidade.',
      lname:'Aprendizagem e facilitação',ldesc:'Atuação declarada em estágio docente de Sociologia na Educação de Jovens e Adultos.',
      aname:'Adoção organizacional de IA',adesc:'Projetos independentes podem sustentar contribuição em pilotos supervisionados. Rollout empresarial não demonstrado.',
      tname:'Engenharia e infraestrutura',tdesc:'Não há claim de experiência profissional como engenheira de software, backend, ML ou sistemas em produção.',
      rname:'ROI e implantação empresarial',rdesc:'Não há prova de implantação para clientes, adoção enterprise nem retorno financeiro mensurado.'
    },
    en:{
      nav:'Role × evidence ↓',
      kicker:'EVIDENCE → RÉSUMÉ → OPPORTUNITY',title:'Evidence before keywords.',
      intro:'Four résumé versions, one factual source, and a transparent job-requirements reading method. This layer is web-only; the two A4 pages remain unchanged.',
      lens1:'Technical readability',lens1s:'PDF QA · Nov 14, 2026',lens1d:'Four searchable one-page PDFs with six working links each. Not a commercial ATS certification.',
      lens2:'Editorial quality',lens2s:'Evidence-led review',lens2d:'Recognizable roles, public demonstration, authorship, and boundaries. A prototype is not a deployment.',
      lens3:'Role alignment',lens3s:'Requires a specific opening',lens3d:'Requirements tied to evidence or gaps. No invented hiring score.',
      routes:'Choose a résumé track',routesd:'Searchable PDFs with working links in Portuguese and English.',
      knowledge:'Knowledge Management',knowledged:'Knowledge Operations, process documentation, and source governance.',
      adoption:'AI Enablement & Workflows',adoptiond:'AI enablement, workflow documentation, and applied learning.',
      primary:'PRIORITY TRACK',secondary:'SELECTIVE TRACK',pdfnote:'Hyperlinks repaired on Nov 14, 2026. These are not tailored to a specific vacancy.',
      tool:'Role × evidence',toold:'Paste job requirements. This deterministic check detects selected topics and shows documented, transferable, and unclaimed capabilities. It does not replace human review.',
      label:'Job description or requirements',placeholder:'E.g. knowledge management, process documentation, facilitation, Python…',
      run:'Examine requirements',clear:'Clear',copy:'Copy assessment',copied:'Assessment copied.',copyfail:'Automatic copy was not available.',
      privacy:'Your text stays in this browser: it is not sent, saved, or submitted as an application.',
      result:'Evidence map',summary:'Topics detected: ',empty:'Paste a job description excerpt first.',
      none:'No catalogued topic was detected. This does not prove a poor fit.',
      foot:'This is an incomplete keyword-based check. Must-haves, country, language, remote eligibility from Brazil and credentials require human verification.',
      documented:'Bounded evidence',transferable:'Transferable capability',notClaimed:'Not claimed',source:'Inspect evidence',
      kname:'Knowledge management',kdesc:'Public synthetic-record demo for source authority and human escalation. Not evidence of a prior corporate role.',
      dname:'Process documentation',ddesc:'Moon Source documents sources, workflows, handoffs, and decisions as an independent project.',
      qname:'Qualitative AI evaluation',qdesc:'Specification and review of deterministic demo test scenarios; not model engineering.',
      pname:'Institutional mediation',pdesc:'Self-reported hospital experience in multidisciplinary communication and continuity records.',
      lname:'Learning and facilitation',ldesc:'Self-reported adult-education teaching internship in Sociology.',
      aname:'Organizational AI adoption',adesc:'Independent projects offer transferable capabilities for supervised pilots; no enterprise rollout is claimed.',
      tname:'Engineering and infrastructure',tdesc:'No professional software, backend, ML, or production infrastructure engineering role is claimed.',
      rname:'ROI and enterprise deployment',rdesc:'No verified client deployment, enterprise adoption, or measured financial return is claimed.'
    }
  };
  const SOURCE={
    demo:'https://www.luahelena.com.br/ia/demos/governed-knowledge/',
    moon:'https://github.com/luahelenammc/Moon-Source',
    cv:'https://drive.google.com/file/d/1R4NVjrKqMtL_mrSbLTdEtuio-uBDIeu4/view'
  };
  const CATALOG=[
    {name:'kname',desc:'kdesc',status:'documented',source:'demo',terms:['gestao do conhecimento','knowledge management','knowledge operations','base de conhecimento','knowledge base','knowledge governance']},
    {name:'dname',desc:'ddesc',status:'documented',source:'moon',terms:['documentacao de processos','documentacao de fluxos','process documentation','workflow documentation','process mapping','handoff','handoffs','sop','procedimentos operacionais']},
    {name:'qname',desc:'qdesc',status:'documented',source:'demo',terms:['avaliacao qualitativa','governanca de ia','qualitative ai evaluation','ai evaluation','ai governance','quality assurance','criterios de aceitacao','acceptance criteria','governanca de fontes','source governance']},
    {name:'pname',desc:'pdesc',status:'documented',source:'cv',terms:['stakeholder','stakeholders','mediacao de equipes','mediacao institucional','comunicacao institucional','multidisciplinary','equipe multiprofissional','institutional communication']},
    {name:'lname',desc:'ldesc',status:'documented',source:'cv',terms:['educacao de adultos','aprendizagem de adultos','facilitacao','learning materials','adult learning','training materials','facilitation','eja']},
    {name:'aname',desc:'adesc',status:'transferable',source:'moon',terms:['adocao de ia','ai adoption','ai enablement','change management','gestao da mudanca','implantacao de ia','ai implementation']},
    {name:'tname',desc:'tdesc',status:'notClaimed',source:null,terms:['python','javascript','typescript','backend','full stack','mlops','machine learning engineer','software engineer','engenharia de software','kubernetes','aws','azure','production rag']},
    {name:'rname',desc:'rdesc',status:'notClaimed',source:null,terms:['roi','return on investment','enterprise deployment','rollout enterprise','implantacao empresarial','client deployment','customer adoption','receita gerada','revenue generated']}
  ];
  const input=document.getElementById('cv-gate-input'),output=document.getElementById('cv-gate-output'),info=document.getElementById('cv-gate-info'),results=document.getElementById('cv-gate-results'),copy=document.getElementById('cv-gate-copy');
  let lang='pt',found=[];
  const t=key=>COPY[lang][key]||key;
  const normalize=value=>' '+value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim()+' ';
  const element=(tag,klass,text,parent)=>{
    const node=document.createElement(tag);
    if(klass)node.className=klass;
    if(text!==null)node.textContent=text;
    if(parent)parent.appendChild(node);
    return node;
  };
  function render(){
    results.replaceChildren();
    copy.hidden=!found.length;
    if(!found.length){info.textContent='';element('p','cv-gate-empty',t('none'),results);return;}
    info.textContent=t('summary')+found.length+'.';
    found.forEach(item=>{
      const row=element('div','cv-gate-row '+item.status,null,results);
      const head=element('div','cv-gate-rowhead',null,row);
      element('strong','',t(item.name),head);element('small','',t(item.status),head);
      element('p','',t(item.desc),row);
      if(item.source){
        const link=element('a','',t('source')+' ↗',row);
        link.href=(item.source==='cv'&&lang==='en')?'https://drive.google.com/file/d/1F_J-Lw-p45WrXoNRr7vF3ijGYorQqT_v/view':SOURCE[item.source];link.target='_blank';link.rel='noopener noreferrer';
      }
    });
    element('p','cv-gate-note',t('foot'),results);
  }
  function setLanguage(next){
    lang=next==='en'?'en':'pt';
    document.querySelectorAll('[data-cvg-t]').forEach(node=>{node.textContent=t(node.dataset.cvgT);});
    input.placeholder=t('placeholder');
    if(!output.hidden)render();
  }
  document.getElementById('cv-gate-run').addEventListener('click',()=>{
    output.hidden=false;
    const job=input.value.trim();
    if(!job){found=[];results.replaceChildren();copy.hidden=true;info.textContent=t('empty');return;}
    const hay=normalize(job);
    found=CATALOG.filter(item=>item.terms.some(term=>hay.includes(normalize(term))));
    render();
  });
  document.getElementById('cv-gate-clear').addEventListener('click',()=>{
    input.value='';found=[];output.hidden=true;results.replaceChildren();copy.hidden=true;input.focus();
  });
  copy.addEventListener('click',async()=>{
    const report=[t('result'),t('summary')+found.length,...found.map(item=>t(item.name)+' | '+t(item.status)+' | '+t(item.desc)+(item.source?' | '+SOURCE[item.source]:'')),t('foot')].join('\n\n');
    try{
      if(!navigator.clipboard?.writeText)throw Error('unsupported');
      await navigator.clipboard.writeText(report);info.textContent=t('copied');
    }catch(_){info.textContent=t('copyfail');}
  });
  window.moonCVGate={setLanguage};
  setLanguage(document.documentElement.lang.toLowerCase().startsWith('en')?'en':'pt');
})();