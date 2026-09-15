(() => {
const pick=()=>window.V10_FINE_TUNE?.[document.documentElement.lang==='en'?'en':'pt'];
const set=(s,v)=>{const e=document.querySelector(s);if(e&&v!=null)e.textContent=v};
const setI=(k,v)=>set(`[data-i="${k}"]`,v);
const prune=()=>{
  document.querySelector('#entrada .quote-card')?.remove();
  const foundation=[...document.querySelectorAll('#lastro .foundation-node')];
  foundation.slice(4).forEach(n=>n.remove());
  document.querySelector('#lastro .foundation-circuit-lines')?.remove();
  document.querySelector('#lastro .tag-cloud')?.remove();
};
const apply=()=>{
  const c=pick();if(!c)return;
  const d=document.querySelector('meta[name="description"]');if(d)d.content=c.description;
  const od=document.querySelector('meta[property="og:description"]');if(od)od.content=c.description;
  set('.market-position-detail',c.hero);
  set('.v10-credential-line',c.credential);
  setI('entrada.title',c.problemTitle);
  setI('entrada.lead',c.problemLead);
  set('[data-v10="methodLead"]',c.methodLead);
  set('[data-v10="step2p"]',c.step2);
  set('[data-v10="step3p"]',c.step3);
  set('[data-v10="proofLead"]',c.proof);
  setI('lastro.title',c.foundationTitle);
  setI('lastro.lead',c.foundationLead);
  (c.foundationCards||[]).forEach((x,i)=>{setI(`lastro.card${i+1}.title`,x[0]);setI(`lastro.card${i+1}.text`,x[1]);});
  setI('lastro.boundary.big',c.foundationBoundary);
  setI('lastro.boundary.text',c.foundationBoundaryText);
  setI('contact.quote',c.quote);
  setI('contact.title',c.title);
  setI('contact.sub',c.sub);
  prune();
};
if(typeof T==='object'&&T.pt&&T.en&&window.V10_FINE_TUNE){
  const keys=(c)=>({'entrada.title':c.problemTitle,'entrada.lead':c.problemLead,'lastro.title':c.foundationTitle,'lastro.lead':c.foundationLead,'lastro.card1.title':c.foundationCards[0][0],'lastro.card1.text':c.foundationCards[0][1],'lastro.card2.title':c.foundationCards[1][0],'lastro.card2.text':c.foundationCards[1][1],'lastro.card3.title':c.foundationCards[2][0],'lastro.card3.text':c.foundationCards[2][1],'lastro.card4.title':c.foundationCards[3][0],'lastro.card4.text':c.foundationCards[3][1],'lastro.boundary.big':c.foundationBoundary,'lastro.boundary.text':c.foundationBoundaryText,'contact.quote':c.quote,'contact.title':c.title,'contact.sub':c.sub});
  Object.assign(T.pt,keys(V10_FINE_TUNE.pt));Object.assign(T.en,keys(V10_FINE_TUNE.en));
}
document.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>setTimeout(apply,40)));
apply();setTimeout(apply,160);setTimeout(apply,420);
})();