import fs from 'node:fs';
import path from 'node:path';
const root=path.resolve(new URL('..',import.meta.url).pathname);
const entries=JSON.parse(fs.readFileSync(path.join(root,'data','entries.json'),'utf8'));
const publicEntries=entries.filter(e=>e.status==='published'&&e.publication_approved===true&&['public','sanitized_approved'].includes(e.privacy));
const errors=[];
const properTitles=['Me tornando eu mesma','Meu Macho'];
for(const e of publicEntries){
 if(e.editorial_language!=='encyclopedic_ptbr_v1')errors.push(e.id+' lacks encyclopedic editorial language stamp');
 if(!/^## /m.test(e.body_markdown)||((e.body_markdown.match(/^## /gm)||[]).length<3))errors.push(e.id+' needs at least three encyclopedic sections');
 if(/(^|\n)>\s/m.test(e.body_markdown))errors.push(e.id+' contains literary blockquote');
 let prose=e.body_markdown; for(const title of properTitles) prose=prose.replaceAll(title,''); if(/\b(eu|meu|minha|meus|minhas)\b/i.test(prose))errors.push(e.id+' uses first-person singular in article body');
 if(/[?]$/.test((e.lead||'').trim()))errors.push(e.id+' uses rhetorical-question lead');
 if(!e.lead||e.lead.length<70)errors.push(e.id+' lead is too short to be definitional');
}
if(errors.length){console.error('Moonpedia editorial validation failed:');errors.forEach(e=>console.error('- '+e));process.exit(1)}
console.log('Moonpedia editorial validation passed: '+publicEntries.length+' encyclopedic public articles.');
