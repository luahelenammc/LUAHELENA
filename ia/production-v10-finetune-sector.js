(() => {
const apply=()=>{const lang=document.documentElement.lang==='en'?'en':'pt';const c=window.V10_FINE_TUNE?.[lang];if(!c)return;const lead=document.querySelector('[data-sector-lead]');if(lead)lead.textContent=c.sectorLead;document.querySelectorAll('#campos .sector-card').forEach((card,i)=>{const x=c.sector?.[i];if(!x)return;const p=card.querySelector('p');if(p)p.textContent=x.t;card.querySelectorAll('.sector-keywords span').forEach((s,j)=>{if(x.k[j]!=null)s.textContent=x.k[j]});});};
document.querySelectorAll('.lang-toggle button').forEach(b=>b.addEventListener('click',()=>setTimeout(apply,60)));
apply();setTimeout(apply,220);setTimeout(apply,520);
})();