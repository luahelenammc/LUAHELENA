import { routeQuery } from './engine.mjs';
(function moonMotionV4(){
 const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
 let lang=new URLSearchParams(location.search).get("lang")==="en"?"en":"pt",registry=null,caseId="travel",outcome=null,timers=[];
 const data={
 pt:{
  title:"De qual fonte vem a resposta? | Moon Source",
  desc:"Cinco animações didáticas mostram como regras de fonte, versão e autoridade evitam respostas inventadas.",
  stages:["Os documentos chegam","As regras verificam","A decisão aparece"],
  statuses:{answered:"Resposta autorizada",escalated:"Revisão humana",unsupported:"Sem fonte"},
  roles:{chosen:"Prioritária",review:"Revisar",conflict:"Divergente",excluded:"Superada",neutral:"Encontrada"},
  docName:{"NORTHSTAR-TRAVEL-03":"Política aprovada","NORTHSTAR-TRAVEL-FAQ-01":"FAQ de suporte","NORTHSTAR-TRAVEL-02":"Política antiga","NORTHSTAR-PRIVACY-01":"Política de privacidade","NORTHSTAR-ACCOMMODATION-01":"Guia de adaptações","NORTHSTAR-REMOTE-01":"Procedimento A","NORTHSTAR-REMOTE-02":"Procedimento B"},
  scenes:{
   travel:{status:"answered",value:"US$ 180",summary:"A política aprovada prevalece. A FAQ e a versão antiga não decidem.",kind:"✓"},
   privacy:{status:"escalated",value:"Revisão vencida",summary:"Uma política sem revisão atual não pode sustentar a resposta.",kind:"!"},
   accommodation:{status:"escalated",value:"Decisão humana",summary:"O guia orienta, mas a aprovação é responsabilidade de uma pessoa.",kind:"!"},
   remote:{status:"escalated",value:"Conflito detectado",summary:"Duas regras com a mesma autoridade dizem coisas diferentes.",kind:"!"},
   unsupported:{status:"unsupported",value:"Sem evidência",summary:"Sem documento correspondente, nenhuma resposta é inventada.",kind:"×"}
  },
  explainer:"O que a regra verificou",sourceLabel:"Fontes consideradas",traceLabel:"Rastro da decisão",fullAnswer:"Resultado completo",empty:"Nenhuma fonte corresponde ao assunto.",loading:"Carregando fontes fictícias…",failed:"Não foi possível carregar as fontes.",count:"fontes",ask:"Base fictícia · 03/10/2026",
  trace:{matched:"Encontrar registros",excluded:"Descartar versões antigas",eligible:"Verificar vigência",highest:"Comparar autoridade",stale:"Revisão vencida",top_conflict:"Conflito na mesma autoridade",human_required:"Decisão reservada a uma pessoa",lower_conflicts:"Registrar divergências",answered:"Resposta sustentada",no_current_source:"Sem fonte vigente",unsupported:"Nenhuma correspondência"},
  sourceSuffix:"Autoridade",none:"nenhum registro",sourceIntro:"São documentos inventados para a demonstração. Nenhum dado real está envolvido."
 },
 en:{
  title:"Where does an answer come from? | Moon Source",
  desc:"Five visual scenarios show how source authority, freshness and version rules prevent invented answers.",
  stages:["Documents appear","Rules check the sources","The outcome appears"],
  statuses:{answered:"Source-backed answer",escalated:"Human review",unsupported:"No supporting source"},
  roles:{chosen:"Governs",review:"Review",conflict:"Disagrees",excluded:"Outdated",neutral:"Matched"},
  docName:{"NORTHSTAR-TRAVEL-03":"Approved policy","NORTHSTAR-TRAVEL-FAQ-01":"Support FAQ","NORTHSTAR-TRAVEL-02":"Old policy","NORTHSTAR-PRIVACY-01":"Privacy policy","NORTHSTAR-ACCOMMODATION-01":"Accommodation guide","NORTHSTAR-REMOTE-01":"Procedure A","NORTHSTAR-REMOTE-02":"Procedure B"},
  scenes:{
   travel:{status:"answered",value:"US$ 180",summary:"Approved policy prevails. Neither the FAQ nor the old version can override it.",kind:"✓"},
   privacy:{status:"escalated",value:"Review overdue",summary:"A policy past its review deadline cannot support a current answer.",kind:"!"},
   accommodation:{status:"escalated",value:"Human decision",summary:"The guide gives a route, but a person must approve the request.",kind:"!"},
   remote:{status:"escalated",value:"Conflict found",summary:"Two equally authoritative procedures contradict each other.",kind:"!"},
   unsupported:{status:"unsupported",value:"No evidence",summary:"Without a matching source, no answer is fabricated.",kind:"×"}
  },
  explainer:"What the rules checked",sourceLabel:"Sources considered",traceLabel:"Decision trace",fullAnswer:"Full outcome",empty:"No source in the register matches the topic.",loading:"Loading fictional sources…",failed:"Could not load the source register.",count:"sources",ask:"Fictional snapshot · 2026-10-03",
  trace:{matched:"Find records",excluded:"Remove outdated versions",eligible:"Check effective sources",highest:"Compare authority",stale:"Review overdue",top_conflict:"Equal-authority conflict",human_required:"Human decision required",lower_conflicts:"Record disagreements",answered:"Sourced answer",no_current_source:"No current source",unsupported:"No keyword match"},
  sourceSuffix:"Authority",none:"no records",sourceIntro:"These records are fictional. No real-world personal or organizational data is used."
 }};
 const L=()=>data[lang];
 const cases=$$(".case");
 const rec=(id)=>registry.sources.find(s=>s.id===id);
 const query=()=>cases.find(x=>x.dataset.case===caseId)?.dataset[lang==="en"?"queryEn":"queryPt"]||"";
 const clear=()=>{timers.forEach(clearTimeout);timers=[]};
 const phase=(n)=>{const s=$("#stage");s.dataset.phase=String(n);$("#motion-caption").textContent=n===0?L().stages[0]:L().stages[Math.max(0,n-1)];if(n===3){$("#result-visual").setAttribute("aria-hidden","false");$("#announce").textContent=L().scenes[caseId].value+" · "+L().scenes[caseId].summary;}};
 const delay=(fn,ms)=>timers.push(setTimeout(fn,ms));
 const matched=()=>{const ids=outcome?.trace.find(x=>x.code==="matched")?.ids||[];return ids.map(rec).filter(Boolean);};
 function role(s){
   if(outcome.excluded.some(x=>x.id===s.id))return "excluded";
   if(outcome.conflicts.some(x=>x.id===s.id))return "conflict";
   if(outcome.selected.some(x=>x.id===s.id))return outcome.status==="answered"?"chosen":"review";
   return "neutral";
 }
 function docCard(s,i){
   const tag=role(s);
   const answer=s["answer_"+lang]||"";
   const amount=answer.match(/US\$\s?(\d+)/);
   const value=amount&&s.topic==="travel"?"US$ "+amount[1]:"";
   return `<article class="doc" data-role="${esc(tag)}" style="--delay:${i*115}ms">
     <span class="doc-mark" aria-hidden="true">${tag==="excluded"?"×":tag==="chosen"?"✓":tag==="conflict"?"!":"▤"}</span>
     <span class="doc-copy"><strong>${esc(L().docName[s.id]||s["title_"+lang])}</strong><small>v${esc(s.version)} · ${esc(L().sourceSuffix)} ${Number(s.authority.level)}/5 · ${esc(L().roles[tag])}</small></span>
     ${value?`<span class="doc-value">${esc(value)}</span>`:""}
    </article>`;
 }
 function renderDetails(){
   const list=matched();
   $("#full-answer").textContent=outcome.answer;
   $("#source-explain").innerHTML=list.length?list.map(s=>`<li><b>${esc(L().docName[s.id]||s["title_"+lang])}</b> · v${esc(s.version)} · ${esc(L().roles[role(s)])}</li>`).join(""):`<li>${esc(L().empty)}</li>`;
   $("#trace-explain").innerHTML=outcome.trace.map(t=>`<li>${esc(L().trace[t.code]||t.code)}${t.ids.length?": "+esc(t.ids.map(id=>L().docName[id]||id).join(", ")):""}</li>`).join("");
   $("#source-register").innerHTML=registry.sources.map(s=>`<li>${esc(s["title_"+lang])} · v${esc(s.version)} · ${esc(s.id)}</li>`).join("");
 }
 function render(){
   if(!registry)return;
   outcome=routeQuery(query(),registry.sources,registry.asOf,lang);
   const selected=L().scenes[caseId];let display=selected;
   if(caseId==="travel"&&outcome.status==="answered"){
     const governed=outcome.selected[0]?.["answer_"+lang]||"";
     const amount=governed.match(/US\$\s?(\d+)/);
     if(amount)display={...selected,value:"US$ "+amount[1]};
   }
   if(outcome.status!==selected.status){display={status:outcome.status,value:L().statuses[outcome.status],summary:outcome.answer,kind:"!"};}
   const docs=matched();
   $("#documents").innerHTML=docs.length?docs.map(docCard).join(""):`<div class="no-doc"><b>∅</b><span>${esc(L().empty)}</span></div>`;
   $("#doc-count").textContent=`${String(docs.length).padStart(2,"0")} ${L().count}`;
   $("#result-visual").innerHTML=`<div class="result-mark" aria-hidden="true">${esc(display.kind)}</div><span class="result-badge">${esc(L().statuses[outcome.status])}</span><h2 class="result-value">${esc(display.value)}</h2><p class="result-sub">${esc(display.summary)}</p>`;
   $("#result-visual").setAttribute("aria-hidden","true");
   $("#stage").dataset.outcome=outcome.status;
   $("#announce").textContent="";
   renderDetails();
 }
 function play(){
   if(!registry)return;clear();phase(0);render();
   if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){phase(3);return}
   delay(()=>phase(1),70);
   delay(()=>phase(2),1020);
   delay(()=>phase(3),2360);
 }
 function select(id){
   caseId=id;
   cases.forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.case===id)));
   play();
 }
 function translate(to){
   lang=to;document.documentElement.lang=to==="en"?"en":"pt-BR";document.title=L().title;
   $('meta[name="description"]').content=L().desc;
   $$("[data-pt][data-en]").forEach(x=>x.textContent=x.dataset[to]);
   $$(".langs button").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.lang===to)));
   const url="/ia/"+(to==="en"?"?lang=en":"");
   $("#portfolio").href=url;$("#portfolio-foot").href=url;$("#brand").href=url;
   $("#guide-link").href="https://github.com/luahelenammc/Moon-Source/blob/main/docs/FROM_METHOD_TO_IMPLEMENTATION"+(to==="en"?"":".pt-BR")+".md";
   try{const u=new URL(location.href);if(to==="en")u.searchParams.set("lang","en");else u.searchParams.delete("lang");history.replaceState(null,"",u.pathname+u.search+u.hash)}catch{}
   if(registry)play();
 }
 function start(){
   cases.forEach(b=>b.addEventListener("click",()=>select(b.dataset.case)));
   $("#replay").addEventListener("click",play);
   $$(".langs button").forEach(b=>b.addEventListener("click",()=>translate(b.dataset.lang)));
   window.addEventListener("popstate",()=>translate(new URLSearchParams(location.search).get("lang")==="en"?"en":"pt"));
   translate(lang);$("#documents").textContent=L().loading;$("#replay").disabled=true;
   fetch(new URL("./sources.json",import.meta.url)).then(r=>{if(!r.ok)throw Error("HTTP "+r.status);return r.json()}).then(data=>{
     if(!Array.isArray(data?.sources)||data.sources.length!==7)throw Error("Invalid test fixture");
     registry=data;$("#replay").disabled=false;select("travel");
   }).catch(()=>{
     $("#documents").textContent=L().failed;
     $("#replay").disabled=true;
   });
 }
 start();
})();
