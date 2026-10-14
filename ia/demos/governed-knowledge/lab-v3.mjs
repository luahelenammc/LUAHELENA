import { routeQuery } from './engine.mjs';
(function moonDecisionLab(){
 const copy={
  pt:{
   title:"Laboratório de decisões | Lua Helena · Moon Source",description:"Cinco cenários fictícios e uma demonstração determinística de autoridade, vigência e revisão humana.",
   status:{answered:"Resposta com fonte",escalated:"Revisão humana necessária",unsupported:"Sem evidência, sem resposta"},
   heading:{travel:"A política aprovada resolve a divergência.",privacy:"Uma fonte desatualizada não deve decidir.",accommodation:"O fluxo existe. A decisão é humana.",remote:"Duas regras equivalentes, nenhuma resposta segura.",unsupported:"Nenhuma fonte. Nenhuma resposta inventada.",custom:"O que este registro permite concluir?"},
   reasons:{answered:"A resposta é sustentada pela fonte vigente de maior autoridade. Se documentos de menor autoridade discordam, a divergência continua visível, mas não revoga a política aprovada.",answeredSimple:"A fonte vigente de maior autoridade sustenta a resposta. Sua identificação e seus critérios ficam expostos.",stale:"A fonte de maior autoridade excedeu seu prazo de revisão. Seu conteúdo não pode ser tratado como orientação atual validada.",top_conflict:"Duas fontes vigentes de mesma autoridade entram em conflito. O sistema não escolhe arbitrariamente qual delas é verdadeira.",human_required:"A fonte define um encaminhamento, mas exige decisão humana no caso individual. O sistema não aprova a solicitação.",no_current_source:"Há registros relacionados, mas nenhum deles está vigente e autorizado para orientar a resposta.",unsupported:"Nenhuma palavra-chave cadastrada corresponde à pergunta. Este exemplo não compreende linguagem livre como um modelo de IA."},
   trace:{matched:"Encontrar registros",excluded:"Excluir versões superadas",eligible:"Verificar fontes vigentes",highest:"Identificar maior autoridade",stale:"Bloquear revisão vencida",top_conflict:"Sinalizar conflito de mesma autoridade",human_required:"Encaminhar decisão humana",lower_conflicts:"Registrar divergência inferior",answered:"Apresentar resposta com fonte",no_current_source:"Sem fonte vigente",unsupported:"Sem correspondência cadastrada"},
   reason:"Por que este resultado?",evidence:"Fontes consideradas",traceTitle:"Rastro da decisão",answer:"Resultado governado",boundary:"Limite de decisão",none:"Nenhum registro nesta etapa",missing:"Não há registros correspondentes.",
   source:"Selecionada",review:"Revisão",conflict:"Divergente",excluded:"Superada",candidate:"Considerada",
   owner:"Responsável",authority:"Autoridade",version:"Versão",effective:"Vigência",reviewed:"Revisão",path:"Atualização",active:"Ativa",superseded:"Superada",
   escalation:"Encaminhamento",copy:"Copiar rastro",copied:"Copiado",copyFail:"Falha na cópia",loaded:"Base fictícia de",loading:"Preparando sete fontes fictícias…",failed:"Não foi possível carregar o registro de fontes. Confira sua conexão e atualize a página.",steps:"etapas",found:"registros encontrados",
   evidenceHelp:"Nenhum conflito fica escondido. Os registros permanecem identificáveis por versão e autoridade.",traceHelp:"Cada linha corresponde a uma regra executada, sem modelo de linguagem."
  },
  en:{
   title:"Decision Lab | Lua Helena · Moon Source",description:"Five fictional knowledge-governance scenarios showing deterministic source authority, freshness and human review.",
   status:{answered:"Source-backed answer",escalated:"Human review required",unsupported:"No evidence, no invented answer"},
   heading:{travel:"The approved policy resolves the mismatch.",privacy:"An overdue source should not decide.",accommodation:"The process exists. A person must decide.",remote:"Two equally authoritative rules, no safe answer.",unsupported:"No source. No fabricated answer.",custom:"What can this register support?"},
   reasons:{answered:"The highest-authority current source governs the answer. Disagreements from lower-authority material stay visible, but do not override approved policy.",answeredSimple:"The current highest-authority source supports this answer, with its identity and criteria exposed.",stale:"The highest-authority source is overdue for review. Its content cannot be presented as validated current guidance.",top_conflict:"Two current sources with equal authority disagree. The system does not arbitrarily decide which is true.",human_required:"The source defines a review route but requires human judgment for the individual case. The system cannot approve the request.",no_current_source:"Related records exist, but none is currently authorized and effective.",unsupported:"No registered keyword matches the query. This fixture does not understand free-form language as an AI model does."},
   trace:{matched:"Match registered sources",excluded:"Exclude superseded versions",eligible:"Check active, effective sources",highest:"Identify highest authority",stale:"Block overdue source",top_conflict:"Flag equal-authority conflict",human_required:"Require human decision",lower_conflicts:"Record lower-authority disagreement",answered:"Show sourced answer",no_current_source:"No current source",unsupported:"No registered keyword match"},
   reason:"Why this result?",evidence:"Sources considered",traceTitle:"Decision trace",answer:"Governed outcome",boundary:"Decision boundary",none:"No records in this step",missing:"No matching records.",
   source:"Selected",review:"Needs review",conflict:"Disagreement",excluded:"Superseded",candidate:"Considered",
   owner:"Owner",authority:"Authority",version:"Version",effective:"Effective",reviewed:"Reviewed",path:"Update path",active:"Active",superseded:"Superseded",
   escalation:"Escalation owner",copy:"Copy trace",copied:"Copied",copyFail:"Copy failed",loaded:"Fictional snapshot",loading:"Preparing seven fictional sources…",failed:"The synthetic source register could not be loaded. Check your connection and reload.",steps:"steps",found:"records matched",
   evidenceHelp:"Disagreements stay visible. Every record remains attributable by version and authority.",traceHelp:"Each line is an executed rule, not AI-generated reasoning."
  }
 };
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 let lang=new URLSearchParams(location.search).get("lang")==="en"?"en":"pt",registry=null,active="travel",lastQuery="",outcome=null;
 const T=()=>copy[lang],cases=$$(".scenario");
 const readCase=id=>{const el=cases.find(x=>x.dataset.case===id);return el?.dataset[lang==="en"?"queryEn":"queryPt"]||"";};
 const localized=(obj,base)=>obj[base+"_"+lang]||obj[base+"_pt"]||"";
 const fmtDate=v=>{const m=/^(\d{4})-(\d{2})-(\d{2})$/.exec(String(v||""));return m?(lang==="en"?m[2]+"/"+m[3]+"/"+m[1]:m[3]+"/"+m[2]+"/"+m[1]):esc(v);};
 function reasonFor(r){
   if(r.status==="unsupported")return T().reasons.unsupported;
   const codes=new Set(r.trace.map(x=>x.code));
   for(const code of ["stale","top_conflict","human_required","no_current_source"])if(codes.has(code))return T().reasons[code];
   return r.conflicts.length?T().reasons.answered:T().reasons.answeredSimple;
 }
 function matched(r){const ids=r.trace.find(x=>x.code==="matched")?.ids||[];return ids.map(id=>registry.sources.find(s=>s.id===id)).filter(Boolean);}
 function recordState(s,r){
   if(r.excluded.some(v=>v.id===s.id))return ["excluded",T().excluded];
   if(r.conflicts.some(v=>v.id===s.id))return ["conflict",T().conflict];
   if(r.selected.some(v=>v.id===s.id))return r.status==="answered"?["picked",T().source]:["conflict",T().review];
   return ["",T().candidate];
 }
 function evidenceHTML(s,r){
   const [cls,badge]=recordState(s,r);
   return '<article class="evidence-card '+cls+'"><div><strong>'+esc(localized(s,"title"))+'</strong><small>'+esc(s.id)+' · '+esc(T().version)+' '+esc(s.version)+' · '+esc(T().authority)+' '+Number(s.authority.level)+'/5</small><small>'+esc(localized(s,"owner"))+'</small></div><span class="evidence-tag">'+esc(badge)+'</span></article>';
 }
 function traceHTML(r){
   return r.trace.map((step,i)=>'<li><span class="trace-dot">'+(i+1)+'</span><div class="trace-body"><b>'+esc(T().trace[step.code]||step.code)+'</b><span>'+esc(step.ids.length?step.ids.join(" · "):T().none)+'</span></div></li>').join("");
 }
 function show(query,id){
   if(!registry)return;
   lastQuery=query;outcome=routeQuery(query,registry.sources,registry.asOf,lang);
   const r=outcome,list=matched(r),status=r.status,owner=r.escalationOwner;
   const ownerNote=owner?'<p class="decision-reason"><b>'+esc(T().escalation)+':</b> '+esc(owner)+'</p>':'';
   const html='<div class="decision-top"><span class="status-chip '+esc(status)+'">'+esc(T().status[status])+'</span><span class="decision-number">'+list.length+' '+esc(T().found)+'</span></div>'+
    '<h3>'+esc(T().heading[id]||T().heading.custom)+'</h3><p class="decision-lead">'+esc(reasonFor(r))+'</p>'+
    '<div class="decision-answer '+esc(status)+'"><div class="answer-label">'+esc(status==="answered"?T().answer:T().boundary)+'</div><p>'+esc(r.answer)+'</p></div>'+ownerNote+
    '<section class="stage-section"><div class="stage-subhead"><h4>'+esc(T().evidence)+'</h4><span>'+String(list.length).padStart(2,"0")+' / 07</span></div><p class="explanation">'+esc(T().evidenceHelp)+'</p>'+
    (list.length?'<div class="evidence-list">'+list.map(s=>evidenceHTML(s,r)).join("")+'</div>':'<p class="explanation">'+esc(T().missing)+'</p>')+'</section>'+
    '<section class="stage-section"><div class="stage-subhead"><h4>'+esc(T().traceTitle)+'</h4><span>'+r.trace.length+' '+esc(T().steps)+'</span></div><p class="explanation">'+esc(T().traceHelp)+'</p><ol class="trace-list">'+traceHTML(r)+'</ol></section>';
   $("#decision").innerHTML=html;$("#asof").textContent=T().loaded+" · "+fmtDate(registry.asOf);$("#copy-button").disabled=false;$("#copy-label").textContent=T().copy;
 }
 function renderRegister(){
   if(!registry)return;
   $("#registry-grid").innerHTML=registry.sources.map(s=>{
     const retired=s.status==="superseded";
     return '<article class="registry-card"><header><div><h3>'+esc(localized(s,"title"))+'</h3><span class="record-id">'+esc(s.id)+'</span></div><span class="record-badge '+(retired?"obsolete":"")+'">'+esc(retired?T().superseded:T().active)+'</span></header><dl>'+
     '<dt>'+esc(T().authority)+'</dt><dd>'+esc(localized(s.authority,"label"))+' · '+Number(s.authority.level)+'/5</dd>'+
     '<dt>'+esc(T().version)+'</dt><dd>'+esc(s.version)+'</dd>'+
     '<dt>'+esc(T().effective)+'</dt><dd>'+fmtDate(s.effectiveDate)+'</dd>'+
     '<dt>'+esc(T().reviewed)+'</dt><dd>'+fmtDate(s.lastReviewedAt)+'</dd>'+
     '<dt>'+esc(T().owner)+'</dt><dd>'+esc(localized(s,"owner"))+'</dd>'+
     '<dt>'+esc(T().path)+'</dt><dd>'+esc(localized(s,"updatePath"))+'</dd></dl></article>';
   }).join("");
 }
 function choose(id,mobile){
   if(!registry)return;
   active=id;cases.forEach(x=>x.setAttribute("aria-pressed",String(x.dataset.case===id)));show(readCase(id),id);
   if(mobile&&matchMedia("(max-width: 780px)").matches)$("#resultado").scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"});
 }
 function translate(next){
   lang=next==="en"?"en":"pt";document.documentElement.lang=lang==="en"?"en":"pt-BR";document.title=T().title;
   $('meta[name="description"]').content=T().description;
   $$("[data-pt][data-en]").forEach(el=>el.textContent=el.dataset[lang]);
   $$(".languages button").forEach(btn=>btn.setAttribute("aria-pressed",String(btn.dataset.lang===lang)));
   $("#proof-guide-link").href="https://github.com/luahelenammc/Moon-Source/blob/main/docs/FROM_METHOD_TO_IMPLEMENTATION"+(lang==="en"?"":".pt-BR")+".md";
   const portfolio="/ia/"+(lang==="en"?"?lang=en":"");
   $("#portfolio-top").href=portfolio;$("#portfolio-foot").href=portfolio;$(".brand").href=portfolio;
   $("#query-input").placeholder=lang==="en"?"e.g. hotel":"Ex.: hotel";
   if(registry){renderRegister();show(active==="custom"?lastQuery:readCase(active),active)}else $("#decision").textContent=T().loading;
 }
 function setUrl(){
   try{const u=new URL(location.href);if(lang==="en")u.searchParams.set("lang","en");else u.searchParams.delete("lang");history.replaceState(null,"",u.pathname+u.search+u.hash)}catch{}
 }
 async function copyTrace(){
   if(!outcome)return;
   const list=matched(outcome);
   const text=[T().title,lastQuery,T().status[outcome.status],outcome.answer,reasonFor(outcome),T().evidence,...list.map(s=>s.id+" · "+localized(s,"title")+" · "+recordState(s,outcome)[1]),T().traceTitle,...outcome.trace.map(x=>(T().trace[x.code]||x.code)+": "+x.ids.join(", ")),"https://www.luahelena.com.br/ia/demos/governed-knowledge/"].join("\n");
   try{
     if(navigator.clipboard?.writeText)await navigator.clipboard.writeText(text);
     else{let el=document.createElement("textarea");el.value=text;document.body.append(el);el.select();let ok=document.execCommand("copy");el.remove();if(!ok)throw new Error("clipboard")}
     $("#copy-label").textContent=T().copied;
   }catch{$("#copy-label").textContent=T().copyFail}
   clearTimeout(copyTrace.timer);copyTrace.timer=setTimeout(()=>$("#copy-label").textContent=T().copy,2200);
 }
 function start(){
   cases.forEach(el=>el.addEventListener("click",()=>choose(el.dataset.case,true)));
   $$(".languages button").forEach(btn=>btn.addEventListener("click",()=>{translate(btn.dataset.lang);setUrl()}));
   $("#query-form").addEventListener("submit",e=>{e.preventDefault();if(!registry)return;const q=$("#query-input").value.trim();if(!q)return;active="custom";cases.forEach(x=>x.setAttribute("aria-pressed","false"));show(q,"custom");$("#query-details").open=false;if(matchMedia("(max-width: 780px)").matches)$("#resultado").scrollIntoView({block:"start",behavior:matchMedia("(prefers-reduced-motion:reduce)").matches?"auto":"smooth"})});
   $("#copy-button").addEventListener("click",copyTrace);
   window.addEventListener("popstate",()=>translate(new URLSearchParams(location.search).get("lang")==="en"?"en":"pt"));
   translate(lang);
   fetch(new URL("./sources.json",import.meta.url)).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(data=>{
     if(!Array.isArray(data?.sources)||data.sources.length!==7||!data.asOf)throw Error("Unexpected fixture");
     registry=data;renderRegister();choose("travel",false);
   }).catch(()=>{$("#decision").textContent=T().failed;$("#copy-button").disabled=true});
 }
 start();
})();
