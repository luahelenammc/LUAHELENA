(() => {
const links=()=>[...document.querySelectorAll('.nav-links a[href^="#"]')];
const active=id=>links().forEach(a=>{const on=a.getAttribute('href')===`#${id}`;a.classList.toggle('is-active',on);on?a.setAttribute('aria-current','location'):a.removeAttribute('aria-current')});
const sections=['entrada','campos','metodo-v10','prova-publica','lastro'].map(id=>document.getElementById(id)).filter(Boolean);
if(!sections.length)return;active(location.hash.slice(1)||sections[0].id);
if('IntersectionObserver'in window){const io=new IntersectionObserver(es=>{const v=es.filter(e=>e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];if(v)active(v.target.id)},{rootMargin:'-24% 0px -62% 0px',threshold:[0,.15,.35,.6]});sections.forEach(s=>io.observe(s));}
window.addEventListener('hashchange',()=>active(location.hash.slice(1)));
})();