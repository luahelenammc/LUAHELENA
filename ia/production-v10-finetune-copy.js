(() => {
const pick=()=>window.V10_FINE_TUNE?.[document.documentElement.lang==='en'?'en':'pt'];
const set=(s,v)=>{const e=document.querySelector(s);if(e&&v!=null)e.textContent=v};
const apply=()=>{const c=pick();if(!c)return;const d=document.querySelector('meta[name="description"]');if(d)d.content=c.description;const od=document.querySelector('meta[property="og:description"]');if(od)od.content=c.description;set('.market-position-detail',c.hero);set('.v10-credential-line',c.credential);set('[data-v10="methodLead"]',c.methodLead);set('[data-v10="step2p"]',c.step2);set('[data-v10="step3p"]',c.step3);set('[data-v10="proofLead"]',c.proof);set('[data-i="contact.quote"]',c.quote);set('[data-i="contact.title"]',c.title);set('[data-i="contact.sub"]',c.sub);};
if(typeof T==='object'&&T.pt&&T.en&&window.V10_FINE_TUNE){Object.assign(T.pt,{'contact.quote':V10_FINE_TUNE.pt.quote,'contact.title':V10_FINE_TUNE.pt.title,'contact.sub':V10_FINE_TUNE.pt.sub});Object.assign(T.en,{'contact.quote':V10_FINE_TUNE.en.quote,'contact.title':V10_FINE_TUNE.en.title,'contact.sub':V10_FINE_TUNE.en.sub});}
document.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>setTimeout(apply,40)));
apply();setTimeout(apply,160);setTimeout(apply,420);
})();