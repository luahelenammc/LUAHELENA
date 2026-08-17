import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(new URL('.', import.meta.url).pathname);
const sourceRoot = path.resolve(root, '..');
const siteRoot = path.resolve(sourceRoot, '..', 'moonverse');
const read = (name) => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8'));
const pages = read('public-pages.json').pages;
const rooms = read('rooms.json').rooms;
const albums = read('albums.json').albums;
const memories = read('memory-items.json').items;
const timeline = read('public-timeline.json').events;
const records = read('records.json').records;
const esc = (v='') => String(v).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'",'&#39;');
const write = (rel, text) => { const p=path.join(siteRoot,rel); fs.mkdirSync(path.dirname(p),{recursive:true}); fs.writeFileSync(p,text); };
const pageById = new Map(pages.map(p=>[p.id,p]));
const roomById = new Map(rooms.map(r=>[r.id,r]));

const utility = (active='') => `<nav class="utility-nav" aria-label="Atalhos do Moonverse">
  <a href="/moonverse/" ${active==='hall'?'aria-current="page"':''}>Hall</a>
  <a href="/moonverse/wiki/" ${active==='wiki'?'aria-current="page"':''}>Moonpedia</a>
  <a href="/moonverse/timeline/" ${active==='timeline'?'aria-current="page"':''}>Linha do tempo</a>
  <a href="/moonverse/atlas/" ${active==='atlas'?'aria-current="page"':''}>Atlas</a>
  <a href="/moonverse/albums/" ${active==='albums'?'aria-current="page"':''}>Álbuns</a>
  <a href="/moonverse/memory/" ${active==='memory'?'aria-current="page"':''}>Memórias</a>
  <a href="/moonverse/search/" ${active==='search'?'aria-current="page"':''}>Busca</a>
  <button type="button" data-theme-toggle aria-label="Alternar entre luz e noite">◐</button>
</nav>`;

const shell = ({title, description, content, active='', bodyClass=''}) => `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title==='Moonverse'?'Moonverse':`${title} · Moonverse`)}</title>
<meta name="description" content="${esc(description)}">
<meta name="theme-color" content="#151020">
<link rel="stylesheet" href="/moonverse/assets/v4.css">
</head>
<body class="${esc(bodyClass)}">
<a class="skip" href="#main-content">Pular para o conteúdo</a>
<header class="v4-header"><a class="v4-brand" href="/moonverse/"><span aria-hidden="true">☾</span><span><strong>Moonverse</strong><small>casa · arquivo · memória</small></span></a>${utility(active)}</header>
<main id="main-content">${content}</main>
<footer class="v4-footer"><span>Moonverse · superfície pública</span><a href="/moonverse/about/">Como esta casa funciona</a></footer>
<script src="/moonverse/assets/v4.js" defer></script>
</body>
</html>`;

const door = (room, cls='') => `<a class="hall-door ${cls}" href="/moonverse/room/${room.id}/" aria-label="Entrar em ${esc(room.title)}">
<span class="door-icon" aria-hidden="true">${esc(room.icon)}</span><strong>${esc(room.title)}</strong><small>${esc(room.subtitle)}</small></a>`;

const coreIds = ['biblioteca-lunar','quarto-nostalgico','observatorio-nexus','jardim-santuario','espelho-dagua','atelie-de-lithia'];
const hallDoors = coreIds.map((id,i)=>door(roomById.get(id),`door-${i+1}`)).join('');
const hall = `<section class="hall" aria-labelledby="hall-title">
<div class="hall-sky" aria-hidden="true"><i></i><i></i><i></i><i></i></div>
<div class="hall-room">
  <div class="hall-ceiling" aria-hidden="true"></div>
  <div class="moon-window" aria-hidden="true"><span></span></div>
  <div class="hall-titleplate"><p>Você entrou no</p><h1 id="hall-title">Moonverse</h1><span>um palácio mental público, feito para explorar</span></div>
  <div class="hall-doors">${hallDoors}</div>
  <a class="hall-object album-object" href="/moonverse/albums/" aria-label="Abrir os álbuns"><span aria-hidden="true">▤</span><strong>Álbuns</strong></a>
  <a class="hall-object orb-object" href="/moonverse/memory/" aria-label="Invocar uma memória"><span aria-hidden="true">●</span><strong>Máquina Mnésica</strong></a>
  <a class="hall-object atlas-object" href="/moonverse/atlas/" aria-label="Abrir o Atlas"><span aria-hidden="true">✦</span><strong>Atlas</strong></a>
  <a class="hall-object cinema-object" href="/moonverse/room/cinema-musica/" aria-label="Entrar na Sala de Cinema e Música"><span aria-hidden="true">▶</span><strong>Cinema & Música</strong></a>
  <a class="hall-object consultorio-object" href="/moonverse/room/consultorio-warroom/" aria-label="Entrar no Consultório e Warroom"><span aria-hidden="true">⌘</span><strong>Consultório</strong></a>
</div>
<div class="hall-mobile" aria-label="Mapa das salas">
  <p class="kicker">Escolha uma porta</p>
  <div class="mobile-door-grid">${rooms.map(r=>door(r)).join('')}</div>
  <div class="mobile-memory"><a href="/moonverse/albums/">Folhear álbuns</a><a href="/moonverse/memory/">Invocar memória</a><a href="/moonverse/atlas/">Abrir Atlas</a></div>
</div>
<p class="hall-hint">A casa é a entrada. A Moonpedia é a estante. O Atlas é o mapa. A memória é o que acende no caminho.</p>
</section>`;
write('index.html', shell({title:'Moonverse',description:'Uma casa navegável de memórias, projetos, arquivos e relações públicas.',content:hall,active:'hall',bodyClass:'hall-body'}));

function roomPage(room) {
  const related = pages.filter(p=>p.rooms.includes(room.id));
  const objects = room.objects.map((o,i)=>{
    const body = `<span class="object-glyph" aria-hidden="true">${['✦','⌂','◫','◇','☾','▤'][i%6]}</span><span><strong>${esc(o.label)}</strong><small>${esc(o.note)}</small></span>`;
    return o.href ? `<a class="room-object kind-${esc(o.kind)}" href="${esc(o.href)}">${body}</a>` : `<div class="room-object kind-${esc(o.kind)} is-locked" aria-label="${esc(o.label)}">${body}<em>fechado ao público</em></div>`;
  }).join('');
  const docs = related.length ? `<section class="room-docs"><h2>Documentos que moram por aqui</h2><div class="document-strips">${related.map(p=>`<a href="${p.url}"><strong>${esc(p.title)}</strong><span>${esc(p.summary)}</span><b aria-hidden="true">↗</b></a>`).join('')}</div></section>` : `<section class="room-docs"><h2>Acervo em constituição</h2><p>Nenhum documento foi inventado para preencher esta sala. A estrutura permanece aberta para corpus público selecionado.</p></section>`;
  return shell({title:room.title,description:room.subtitle,active:'hall',bodyClass:`room-body tone-${room.tone}`,content:`<section class="room-scene">
    <div class="room-topline"><a href="/moonverse/">← Hall</a><span>${esc(room.icon)} sala</span></div>
    <header class="room-heading"><p class="kicker">uma sala do Moonverse</p><h1>${esc(room.title)}</h1><p>${esc(room.subtitle)}</p></header>
    <div class="room-stage" data-room="${room.id}"><div class="room-moon" aria-hidden="true"></div><div class="room-objects">${objects}</div></div>
    ${docs}
  </section>`});
}
for (const room of rooms) write(`room/${room.id}/index.html`, roomPage(room));

const wikiGroups = [
 ['Sobre Moon',['moon-profile','sobre-a-moon','me-tornando','nome-presenca','cores-fluorescentes','escrita-magia']],
 ['Memória, lugares & tecnologia',['maresia','kairos','sims','orkut-msn','infancia-digital','tecnologia-ia']],
 ['Natureza, espiritualidade & futuro',['ecologia-espiritual','casa-arca','santuario','ecorreligiao','hecate','arquitetura-simbolica','diario-onirico','familia-do-futuro']],
 ['IA, arquivo & mundos autorais',['moon-source','moonwiki','moonverse','lunar-citadel','story-scanner','lithia']]
];
const wikiContent=`<section class="paper-index"><header><p class="kicker">Moonpedia</p><h1>O índice de documentos</h1><p>A casa organiza por atmosfera. Aqui, quando você já sabe que quer ler, os documentos aparecem sem cenário.</p></header>
${wikiGroups.map(([name,ids])=>`<section class="wiki-group"><h2>${esc(name)}</h2>${ids.map(id=>{const p=pageById.get(id);return `<a class="wiki-row" href="${p.url}"><span><strong>${esc(p.title)}</strong><small>${esc(p.summary)}</small></span><b aria-hidden="true">↗</b></a>`}).join('')}</section>`).join('')}
<section class="source-note"><h2>De onde isso vem</h2><p>A Moonwiki/Notion funciona como fonte-mãe editorial. Esta superfície contém somente versões públicas ou sanitizadas; registros privados não são transformados automaticamente em páginas.</p><dl><div><dt>Registros Notion reconciliados</dt><dd>28</dd></div><div><dt>Documentos públicos</dt><dd>${pages.length}</dd></div><div><dt>Corpos privados commitados</dt><dd>0</dd></div></dl></section>
</section>`;
write('wiki/index.html',shell({title:'Moonpedia',description:'Índice pragmático dos documentos públicos do Moonverse.',content:wikiContent,active:'wiki',bodyClass:'paper-body'}));

const timelineContent=`<section class="timeline-v4"><header><p class="kicker">Linha do Tempo Lunar</p><h1>O tempo como corredor da casa</h1><p>Marcos públicos derivados das datas da Moonwiki. Eventos íntimos podem existir no arquivo sem aparecer aqui.</p></header>
<ol class="timeline-list">${timeline.map(e=>`<li ${e.anchor?`id="${esc(e.anchor)}"`:''}><time datetime="${esc(e.date)}">${esc(e.date.slice(0,4))}</time><div><span>${esc(e.phase)} · ${esc(e.type)}</span><h2>${esc(e.title)}</h2><p>${esc(e.summary)}</p>${e.href?`<a href="${e.href}">Abrir documento relacionado →</a>`:''}</div></li>`).join('')}</ol>
<p class="privacy-line">A ausência de um evento nesta linha do tempo não significa ausência na fonte-mãe; significa apenas que a superfície pública tem fronteiras.</p></section>`;
write('timeline/index.html',shell({title:'Linha do Tempo Lunar',description:'Marcos biográficos públicos derivados da Moonwiki.',content:timelineContent,active:'timeline',bodyClass:'orientation-body'}));

const roomNodes=rooms.map((r,i)=>`<a class="atlas-node room-node n${i%6}" href="/moonverse/room/${r.id}/"><strong>${esc(r.title)}</strong><small>sala</small></a>`).join('');
const docNodes=pages.map((p,i)=>`<a class="atlas-node doc-node n${i%6}" href="${p.url}"><strong>${esc(p.title)}</strong><small>${esc(p.rooms.map(id=>roomById.get(id)?.title).filter(Boolean).join(' · '))}</small></a>`).join('');
const atlasContent=`<section class="atlas-v4"><header><p class="kicker">Atlas Moonverse</p><h1>Como as coisas se conectam</h1><p>Salas são filtros de atmosfera; documentos são nós de leitura. Um mesmo documento pode morar em mais de uma parte da casa.</p></header>
<div class="atlas-controls" role="group" aria-label="Filtros do Atlas"><button data-atlas-filter="all" class="is-on">Tudo</button>${rooms.slice(0,6).map(r=>`<button data-atlas-filter="${r.id}">${esc(r.title)}</button>`).join('')}</div>
<div class="atlas-field" aria-label="Mapa textual e visual">${roomNodes}${docNodes}<span class="atlas-lines" aria-hidden="true"></span></div>
<section class="atlas-list"><h2>Lista completa</h2>${rooms.map(r=>`<details><summary>${esc(r.icon)} ${esc(r.title)}</summary><ul>${pages.filter(p=>p.rooms.includes(r.id)).map(p=>`<li><a href="${p.url}">${esc(p.title)}</a></li>`).join('')||'<li>Sem documento público próprio por enquanto.</li>'}</ul></details>`).join('')}</section>
<section id="source-simbiosfera" class="source-note"><h2>Nós de fonte sem página pública</h2><p>Algumas entidades existem na Moonwiki como nós de metadados. Elas podem orientar o Atlas sem obrigar a criação de um artigo. “Simbiosfera” é um exemplo atual desse estado.</p></section></section>`;
write('atlas/index.html',shell({title:'Atlas Moonverse',description:'Mapa de relações e projeções públicas do Moonverse.',content:atlasContent,active:'atlas',bodyClass:'orientation-body'}));

const albumBlocks=albums.map(a=>{
 const items=a.page_ids.map(id=>pageById.get(id)).filter(Boolean);
 return `<article class="album-card ${a.status==='shell'?'album-shell':''}" id="${a.id}"><button type="button" class="album-cover" data-album-toggle aria-expanded="false"><span aria-hidden="true">✦</span><strong>${esc(a.title)}</strong><small>${esc(a.subtitle)}</small></button><div class="album-spreads">${items.length?items.map((p,i)=>`<a class="album-photo" href="${p.url}"><span class="photo-faux" aria-hidden="true">${String(i+1).padStart(2,'0')}</span><strong>${esc(p.title)}</strong><small>${esc(p.summary)}</small><em>${esc(memories.find(m=>m.page_id===p.id)?.image_kind||'editorial')}</em></a>`).join(''):`<p>Estrutura preservada sem conteúdo fictício. Este álbum só será preenchido quando houver material público selecionado.</p>`}</div></article>`;
}).join('');
const albumsContent=`<section class="albums-v4"><header><p class="kicker">Memória para folhear</p><h1>Álbuns</h1><p>Álbum não é uma lista de artigos: é uma forma mais lenta e tátil de atravessar memórias públicas.</p></header><div class="album-shelf">${albumBlocks}</div><p class="factuality">Rótulos como “evocative”, “conceptual” e “symbolic” descrevem o tipo de representação; não fingem que uma imagem imaginada é fotografia documental.</p></section>`;
write('albums/index.html',shell({title:'Álbuns',description:'Álbuns públicos do Moonverse.',content:albumsContent,active:'albums',bodyClass:'memory-body'}));

const fallbackMem=memories.map(m=>`<li data-era="${esc(m.era)}" data-moods="${esc(m.moods.join(' '))}"><a href="${m.href}"><strong>${esc(m.title)}</strong><span>${esc(m.short)}</span></a></li>`).join('');
const memoryContent=`<section class="memory-v4"><header><p class="kicker">Máquina Mnésica</p><h1>Invocar uma memória</h1><p>Sortear não substitui o arquivo. Serve para reencontrar uma coisa que você não estava procurando.</p></header>
<div class="memory-machine"><div class="orb" aria-hidden="true"><span></span></div><div class="memory-console"><label for="memory-mode">Que tipo de memória?</label><select id="memory-mode"><option value="all">qualquer uma</option><option value="infancia">infância</option><option value="cozy">aconchegante</option><option value="uncanny">estranha</option><option value="formative">formativa</option></select><button type="button" data-memory-pick>Invocar</button><div class="memory-result" data-memory-result aria-live="polite"><p>A esfera está quieta. Escolha um modo e invoque.</p></div></div></div>
<details class="memory-fallback"><summary>Ver todas as memórias sem sorteio</summary><ul>${fallbackMem}</ul></details></section>`;
write('memory/index.html',shell({title:'Máquina Mnésica',description:'Sorteador público de memórias do Moonverse.',content:memoryContent,active:'memory',bodyClass:'memory-body'}));

const searchContent=`<section class="search-v4"><header><p class="kicker">Busca universal</p><h1>Encontrar sem passear</h1><p>Quando você sabe o que procura, não precisa atravessar a mansão inteira.</p></header>
<form data-v4-search><label for="q">Buscar documentos públicos</label><div><input id="q" name="q" type="search" autocomplete="off" placeholder="memória, IA, infância, Líthia…"><button>Buscar</button></div></form><div class="search-results" data-v4-results><p>Digite um termo ou entre pela <a href="/moonverse/wiki/">Moonpedia</a>.</p></div></section>`;
write('search/index.html',shell({title:'Busca',description:'Busca nos documentos públicos do Moonverse.',content:searchContent,active:'search',bodyClass:'orientation-body'}));

const aboutContent=`<section class="about-v4"><header><p class="kicker">Sobre a casa</p><h1>Quatro modos de entrar no mesmo arquivo</h1></header>
<div class="about-grid"><article><span>01</span><h2>Casa</h2><p>A navegação poética. Salas e objetos transformam o corpus em espaço explorável.</p></article><article><span>02</span><h2>Moonpedia</h2><p>A navegação documental. Quando a leitura começa, o cenário recua e a página sustenta.</p></article><article><span>03</span><h2>Memória</h2><p>Álbuns e a Máquina Mnésica permitem folhear ou invocar lembranças sem seguir um índice.</p></article><article><span>04</span><h2>Atlas, busca e tempo</h2><p>Ferramentas pragmáticas para encontrar relações, datas e documentos sem depender da metáfora da casa.</p></article></div>
<section class="source-note"><h2>Fonte e fronteira</h2><p>A Moonwiki/Notion é a fonte-mãe editorial. O site é uma camada pública, estática e curada. Ter acesso a uma fonte não equivale a ter permissão para publicá-la. Material íntimo, clínico, familiar, institucional ou de terceiros pode existir na origem e permanecer invisível aqui.</p><p><strong>A Moonwiki guarda. O Moonverse publica. A casa encanta. O Atlas encontra. A página sustenta.</strong></p></section></section>`;
write('about/index.html',shell({title:'Sobre o Moonverse',description:'Como a casa, a Moonpedia, a memória e o Atlas trabalham juntos.',content:aboutContent,active:'',bodyClass:'paper-body'}));

write('assets/v4.css', fs.readFileSync(path.join(root,'v4.css'),'utf8'));
for (const part of ['core','hall','room','surface','memory','responsive']) write(`assets/v4-${part}.css`, fs.readFileSync(path.join(root,`v4-${part}.css`),'utf8'));
write('assets/v4.js', fs.readFileSync(path.join(root,'v4.js'),'utf8'));
write('assets/v4-public.json', JSON.stringify({version:'4.0.0',rooms:rooms.map(({id,title,icon,subtitle})=>({id,title,icon,subtitle})),pages:pages.map(({source_record_ids,...safe})=>safe),albums,memories,timeline:timeline.map(({source_id,...safe})=>safe),source_counts:{notion_records:records.length,public_documents:pages.length,raw_private_bodies_committed:0}},null,2)+'\n');
console.log(`Moonverse V4 overlay built: ${rooms.length} rooms, ${albums.length} albums, ${memories.length} memory items, ${pages.length} public documents.`);
