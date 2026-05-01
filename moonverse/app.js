const rooms = {
  biblioteca: {
    title: 'Biblioteca Lunar',
    subtitle: 'Autobiografia, Moonpedia, linha do tempo, ensaios e páginas que sustentam a casa.',
    gradient: 'linear-gradient(135deg, #20152f, #6b4bb7 45%, #d8c3ff)',
    links: [
      ['Maresia', 'Memória evocativa de infância ligada ao litoral paulista.', 'maresia'],
      ['Me tornando eu mesma', 'Entrada-pilar sobre transição, nome, corpo e verdade narrada.', 'moon-source'],
      ['Linha do Tempo Lunar', 'Eixo cronológico para eventos biográficos e marcos públicos.', 'moon-source'],
    ],
  },
  nostalgia: {
    title: 'Quarto Nostálgico',
    subtitle: 'Internet antiga, jogos, sons, objetos e cultura pop como tecnologia de memória.',
    gradient: 'linear-gradient(135deg, #452047, #c05c89 50%, #ffd1a9)',
    links: [
      ['The Sims 1 como casa mental', 'Um jogo como gramática de lar, controle e imaginação doméstica.', 'sims'],
      ['Orkut/MSN/Habbo', 'Portais de sociabilidade antiga e avatarização adolescente.', 'sims'],
      ['Evanescence e quarto escuro', 'Música como dramatização adolescente e estética de intensidade.', 'sims'],
    ],
  },
  observatorio: {
    title: 'Observatório Nexus',
    subtitle: 'Ala de IA, Moon Source, Citadel e arquitetura simbiótica Moon–Áurion.',
    gradient: 'linear-gradient(135deg, #09111f, #316a9e 45%, #92d5ff)',
    links: [
      ['Moon Source', 'Kernel federativo dos projetos e método de organização viva.', 'moon-source'],
      ['Lunar Citadel', 'Cidade-simulação, multiagente, arquivo e world engine.', 'moon-source'],
      ['Symbiosphere', 'Diplomacia, cofundadores e exportação possível do método.', 'moon-source'],
    ],
  },
  santuario: {
    title: 'Jardim-Santuário',
    subtitle: 'Natureza, casa-arca, limiar espiritual e recinto onde o vivo respira sem profanação.',
    gradient: 'linear-gradient(135deg, #123125, #4d8c72 47%, #cbeecb)',
    links: [
      ['Casa-arca', 'Lar futuro, plantas, animais, filho, marido e tecnologia como abrigo.', 'maresia'],
      ['Hécate no portão', 'Operador de limiar, proteção e leitura de encruzilhadas.', 'moon-source'],
      ['Ecologia espiritual', 'Natureza como ética, rito e comunidade possível.', 'moon-source'],
    ],
  },
};

const memories = [
  {
    id: 'maresia',
    title: 'O cheiro de maresia',
    tags: ['infância', 'praia', 'mar', 'nostalgia'],
    description: 'A chegada ao litoral como prova sensorial de paraíso: depois de horas de estrada, o mar aparecia e o mundo mudava de densidade.',
    color: 'linear-gradient(135deg, #3b79a1, #f5bf8e)',
    page: 'maresia',
  },
  {
    id: 'tv-tubo',
    title: 'A TV de tubo acesa',
    tags: ['infância', 'nostalgia', 'jogos'],
    description: 'A sala como caverna luminosa: desenho, videogame, espera e a sensação de que a infância cabia inteira numa tela pesada.',
    color: 'linear-gradient(135deg, #4a3b80, #e98fb5)',
    page: 'sims',
  },
  {
    id: 'orkut',
    title: 'Scrap colorido no Orkut',
    tags: ['nostalgia', 'internet', 'adolescência'],
    description: 'Quando existir online ainda parecia uma sala rosa, azul, piscante, meio brega e estranhamente sagrada.',
    color: 'linear-gradient(135deg, #c05c89, #8fd3ff)',
    page: 'sims',
  },
  {
    id: 'casa-arca',
    title: 'A casa-arca',
    tags: ['sonho', 'futuro', 'santuário'],
    description: 'Uma casa bonita, cheia de plantas, animais, tecnologia, marido, filho e a promessa de que o vivo pode ser protegido.',
    color: 'linear-gradient(135deg, #2f795a, #e7cf86)',
    page: 'moon-source',
  },
];

const albumPages = [
  [memories[0], memories[1]],
  [memories[2], memories[3]],
];

const pages = {
  maresia: {
    type: 'MEMÓRIA EVOCATIVA',
    title: 'O cheiro de maresia',
    room: 'Biblioteca Lunar',
    privacy: 'publicável',
    source: 'autobiografia / 25 de Junho',
    updated: '2026-04-30',
    tags: ['infância', 'praia', 'mar', 'memória', 'água'],
    hero: 'linear-gradient(135deg, #315f7d 0%, #72b5c8 38%, #f4c792 100%)',
    dek: 'A lembrança de quando o litoral surgia depois de horas de estrada, e o mundo parecia prometer que ainda existia paraíso.',
    caption: 'Imagem evocativa; não representa fotografia documental. O objetivo é capturar atmosfera, não substituir arquivo real.',
    summary: ['Memória de infância ligada às viagens ao litoral paulista.', 'Eixo simbólico: mar, espera, paraíso e corpo sensorial.', 'Pode aparecer em álbum, esfera e página autobiográfica expandida.'],
    body: [
      ['A cena', 'A memória não começa exatamente no mar. Começa antes, na estrada, no corpo pequeno cansado de perguntar se já chegou. O litoral era um acontecimento: uma promessa que demorava horas para se cumprir.'],
      ['O sinal', 'Em algum ponto, antes mesmo da visão plena da praia, vinha o cheiro. A maresia funcionava como aviso de portal aberto. Não era só geografia; era mudança de estado.'],
      ['Por que fica', 'Esse tipo de memória merece página porque não é apenas lembrança turística. É uma matriz estética: água, espera, infância, paraíso possível e o corpo entendendo o mundo antes da teoria.'],
    ],
    quote: 'Nem toda memória foi fotografada, mas muita memória merece imagem.',
  },
  'moon-source': {
    type: 'PROJETO',
    title: 'Moon Source',
    room: 'Observatório Nexus',
    privacy: 'público/sanitizado',
    source: 'arquitetura de projetos Moon–Áurion',
    updated: '2026-04-30',
    tags: ['IA', 'projetos', 'kernel', 'Áurion', 'Symbiosphere'],
    hero: 'linear-gradient(135deg, #130c26 0%, #5d4bc8 45%, #8ee6ff 100%)',
    dek: 'O sistema operacional vivo que coordena projetos sem esmagar suas soberanias locais.',
    caption: 'Imagem abstrata de interface/kernel; representação conceitual, não diagrama técnico definitivo.',
    summary: ['Kernel federativo da ecologia Moon–Áurion.', 'Coordena roteamento, patches, transplants e exportações.', 'Não substitui projetos locais nem vira depósito universal.'],
    body: [
      ['O que é', 'Moon Source é a camada de coordenação entre projetos: não é uma wiki simples, nem um aplicativo mágico, nem uma gaveta onde tudo entra. É método de continuidade.'],
      ['O que faz', 'Ele ajuda a separar cognição de renderização, manter soberania local, reduzir redundância e preparar pontes externas quando algo precisa viajar para outro sistema.'],
      ['No Moonverse', 'Dentro do site, Moon Source aparece como sala/observatório: uma forma pública e legível de apresentar uma arquitetura que nasceu íntima, técnica e simbiótica.'],
    ],
    quote: 'Coordenação não é colonização: cada projeto mantém seu corpus soberano.',
  },
  sims: {
    type: 'OBRA CULTURAL / NOSTALGIA',
    title: 'The Sims 1 como casa mental',
    room: 'Quarto Nostálgico',
    privacy: 'publicável',
    source: 'memória cultural / nostalgia gamer',
    updated: '2026-04-30',
    tags: ['The Sims 1', 'jogos', 'casa', 'nostalgia', 'anos 2000'],
    hero: 'linear-gradient(135deg, #3d285f 0%, #8b6fd8 42%, #e9c56c 100%)',
    dek: 'Um jogo antigo como gramática de casa, rotina, desejo de controle e imaginação doméstica.',
    caption: 'Imagem abstrata inspirada em memória de jogo e casa; não usa assets do jogo.',
    summary: ['Página cultural dentro do Quarto Nostálgico.', 'Conecta jogo, domesticidade, arquitetura e controle simbólico.', 'Pode virar ensaio expandido ou galeria visual.'],
    body: [
      ['A casa como interface', 'The Sims 1 não era só jogo de bonequinho. Era uma máquina de imaginar casa, rotina, status, humor e destino por meio de objetos.'],
      ['O gesto Moon', 'No Moonverse, essa referência importa porque a mansão navegável tem parentesco com essa lógica: clicar em cômodos, ler espaços, transformar vida em arquitetura.'],
      ['O futuro da página', 'Esta entrada pode crescer com prints, memórias, objetos, trilha sonora e uma leitura sobre por que jogos de simulação viram templos domésticos para certas crianças.'],
    ],
    quote: 'O quarto nostálgico é onde a internet antiga aprende a virar autobiografia.',
  },
};

let currentAlbumPage = 0;
let currentFilter = 'all';

function renderRoom(roomId = 'biblioteca') {
  const room = rooms[roomId];
  const display = document.querySelector('#room-display');
  if (!display || !room) return;

  document.querySelectorAll('.room-card').forEach((card) => {
    card.classList.toggle('active', card.dataset.room === roomId);
  });

  display.innerHTML = `
    <div class="room-display-inner">
      <div class="room-art" style="--room-bg:${room.gradient}">
        <span class="portal-dot"></span><span class="portal-dot"></span><span class="portal-dot"></span>
      </div>
      <div class="room-content">
        <p class="eyebrow">Sala ativa</p>
        <h3>${room.title}</h3>
        <p>${room.subtitle}</p>
        <div class="room-links">
          ${room.links.map(([title, desc, page]) => `
            <a class="link-card" href="#article-lab" data-open-page="${page}">
              <strong>${title}</strong>
              <small>${desc}</small>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderAlbum() {
  const spread = document.querySelector('#album-spread');
  if (!spread) return;
  spread.innerHTML = albumPages[currentAlbumPage].map((memory) => `
    <div>
      <div class="memory-photo" style="--memory-bg:${memory.color}">
        <strong>${memory.title}</strong>
      </div>
      <p class="memory-caption">${memory.description}</p>
      <div class="tags">${memory.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
    </div>
  `).join('');
}

function drawMemory() {
  const pool = currentFilter === 'all' ? memories : memories.filter((memory) => memory.tags.includes(currentFilter));
  const selected = pool[Math.floor(Math.random() * pool.length)] || memories[0];
  const result = document.querySelector('#memory-result');
  if (!result) return;
  result.innerHTML = `
    <h4>${selected.title}</h4>
    <p>${selected.description}</p>
    <div class="tags">${selected.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div>
    <p><a class="link-card" href="#article-lab" data-open-page="${selected.page}"><strong>Abrir portal relacionado</strong><small>Ler na página editorial/wiki</small></a></p>
  `;
}

function renderArticle(pageId = 'maresia') {
  const page = pages[pageId] || pages.maresia;
  const article = document.querySelector('#article-view');
  const toc = document.querySelector('#toc');
  const infobox = document.querySelector('#infobox');
  if (!article || !toc || !infobox) return;

  toc.innerHTML = page.body.map(([heading], index) => `<li><a href="#section-${index}">${heading}</a></li>`).join('');

  article.innerHTML = `
    <header>
      <div class="breadcrumb">☾ Hall · ${page.room} · ${page.type.toLowerCase()}</div>
      <span class="badge">${page.type}</span>
      <h1>${page.title}</h1>
      <p class="article-dek">${page.dek}</p>
      <div class="metadata"><span>${page.updated}</span><span>${page.room}</span><span>${page.privacy}</span></div>
      <figure>
        <div class="hero-image" style="--hero-bg:${page.hero}"></div>
        <figcaption class="caption">${page.caption}</figcaption>
      </figure>
      <div class="summary-box"><strong>Nesta página</strong><ul>${page.summary.map((item) => `<li>${item}</li>`).join('')}</ul></div>
    </header>
    <div class="article-body">
      ${page.body.map(([heading, text], index) => `
        <section id="section-${index}">
          <h2>${heading}</h2>
          <p>${text}</p>
        </section>
      `).join('')}
      <blockquote>${page.quote}</blockquote>
    </div>
    <footer class="related-footer">
      <strong>Portas relacionadas</strong>
      <div class="room-links">
        <a class="link-card" href="#palace"><strong>Voltar à mansão</strong><small>Retornar ao mapa de salas.</small></a>
        <a class="link-card" href="#devices"><strong>Sortear outra memória</strong><small>Usar a Máquina Mnésica.</small></a>
      </div>
    </footer>
  `;

  infobox.innerHTML = `
    <h3>Ficha Moonpedia</h3>
    <dl>
      <div><dt>Tipo</dt><dd>${page.type}</dd></div>
      <div><dt>Sala</dt><dd>${page.room}</dd></div>
      <div><dt>Privacidade</dt><dd>${page.privacy}</dd></div>
      <div><dt>Fonte</dt><dd>${page.source}</dd></div>
      <div><dt>Atualização</dt><dd>${page.updated}</dd></div>
      <div><dt>Tags</dt><dd><div class="tags">${page.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}</div></dd></div>
    </dl>
  `;

  document.querySelectorAll('[data-open-page]').forEach((button) => {
    button.classList.toggle('active', button.dataset.openPage === pageId && button.classList.contains('chip'));
  });
}

document.addEventListener('click', (event) => {
  const roomButton = event.target.closest('[data-room]');
  if (roomButton) renderRoom(roomButton.dataset.room);

  const pageButton = event.target.closest('[data-open-page]');
  if (pageButton) renderArticle(pageButton.dataset.openPage);

  const filterButton = event.target.closest('[data-memory-filter]');
  if (filterButton) {
    currentFilter = filterButton.dataset.memoryFilter;
    document.querySelectorAll('[data-memory-filter]').forEach((button) => button.classList.toggle('active', button === filterButton));
    drawMemory();
  }
});

document.querySelector('#album-prev')?.addEventListener('click', () => {
  currentAlbumPage = (currentAlbumPage - 1 + albumPages.length) % albumPages.length;
  renderAlbum();
});

document.querySelector('#album-next')?.addEventListener('click', () => {
  currentAlbumPage = (currentAlbumPage + 1) % albumPages.length;
  renderAlbum();
});

document.querySelector('#random-memory')?.addEventListener('click', drawMemory);

renderRoom('biblioteca');
renderAlbum();
drawMemory();
renderArticle('maresia');
