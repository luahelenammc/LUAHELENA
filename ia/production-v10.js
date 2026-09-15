(() => {
const css=document.createElement('link');css.rel='stylesheet';css.href='/ia/production-v10-finetune.css?v=3';document.head.appendChild(css);
const src=['/ia/production-v10-base.js?v=1','/ia/production-v10-finetune-data.js?v=3','/ia/production-v10-finetune-copy.js?v=3','/ia/production-v10-finetune-sector.js?v=3','/ia/production-v10-finetune-nav.js?v=3'];
const load=i=>{if(i>=src.length)return;const s=document.createElement('script');s.src=src[i];s.onload=()=>load(i+1);document.body.appendChild(s);};load(0);
})();