/* Curriculum tenure: local, calendar-month resolution, never a claimed exact start day. */
(() => {
  'use strict';
  const labels = {
    pt: { current:(n)=>n<1?'Há menos de 1 ano':'Há mais de '+n+' '+(n===1?'ano':'anos'), fromYear:y=>'Desde '+y,
      fixed:(m)=>{const y=Math.floor(m/12), r=m%12;const a=[];if(y)a.push(y+' '+(y===1?'ano':'anos'));if(r)a.push(r+' '+(r===1?'mês':'meses'));return '≈ '+(a.join(' e ')||'menos de 1 mês');},
      note:'Duração aproximada por mês informado. A atualização anual ocorre no primeiro dia do mês de início.'},
    en: { current:(n)=>n<1?'Less than 1 year':'Over '+n+' '+(n===1?'year':'years'), fromYear:y=>'Since '+y,
      fixed:(m)=>{const y=Math.floor(m/12), r=m%12;const a=[];if(y)a.push(y+' '+(y===1?'year':'years'));if(r)a.push(r+' '+(r===1?'month':'months'));return '≈ '+(a.join(' and ')||'less than 1 month');},
      note:'Approximate month-level duration. The anniversary increments on the first day of the documented start month.'}
  };
  const lang = () => document.documentElement.lang.toLowerCase().startsWith('en')?'en':'pt';
  const months = (start,end) => {
    const a=/^(\d{4})-(0[1-9]|1[0-2])$/.exec(start);
    const b=/^(\d{4})-(0[1-9]|1[0-2])$/.exec(end);
    if(!a||!b) return null;
    return Math.max(0,(Number(b[1])-Number(a[1]))*12+Number(b[2])-Number(a[2]));
  };
  const todayMonth = (d) => d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0');
  const elements=()=>document.querySelectorAll('[data-tenure-start]');
  function refresh(asOf=new Date()){
    const locale=labels[lang()];
    elements().forEach(el=>{
      const start=el.dataset.tenureStart;
      const end=el.dataset.tenureEnd||'current';
      let text;
      if(/^\d{4}$/.test(start)){text=locale.fromYear(start);}
      else if(end==='current'){const m=months(start,todayMonth(asOf));text=m===null?'':locale.current(Math.floor(m/12));}
      else {const m=months(start,end);text=m===null?'':locale.fixed(m);}
      const override=el.dataset[lang()==='en'?'tenureLabelEn':'tenureLabelPt'];
      el.textContent=override||text;
      if(end==='current'&&/^\d{4}-/.test(start))el.title=locale.note;
    });
  }
  function scheduleMidnight(){
    const now=new Date();
    const next=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,2);
    setTimeout(()=>{refresh();scheduleMidnight();},Math.max(1000,Math.min(2147483647,next-now)));
  }
  window.moonCVTenure={refresh,months};
  document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
  window.addEventListener('focus',()=>refresh());
  window.addEventListener('beforeprint',()=>refresh());
  refresh();
  scheduleMidnight();
})();
