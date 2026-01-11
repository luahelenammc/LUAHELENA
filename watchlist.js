
// Coloque este arquivo na mesma pasta do seu index.html

const WATCHLIST_DATA = {
  items: [
    // =========================
    // SÉRIES
    // =========================
    {
      id: "s-001",
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 4,
      tags: ["reality show", "comecei"],
      status: "downloaded",
      progress: 12,
    },
    {
      id: "s-002",
      type: "series",
      title: "Severance",
      season: 2,
      episode: 6,
      tags: ["ficção científica", "thriller", "comecei"],
      status: "downloaded",
      progress: 5,
    },
    {
      id: "s-003",
      type: "series",
      title: "Normal People",
      season: 1,
      episode: 9,
      tags: ["drama", "romance"],
      status: "downloaded",
      progress: 0,
    },
    {
      id: "s-004",
      type: "series",
      title: "Chainsaw Man",
      season: 1,
      episode: 1,
      tags: ["anime", "ação", "sombrio"],
      status: "downloaded",
      progress: 0,
    },
    {
      id: "s-005",
      type: "series",
      title: "Silent Witch",
      season: 1,
      episode: 1,
      tags: ["anime", "fantasia", "magia"],
      status: "downloaded",
      progress: 0,
    },

    // Jujutsu kaisen s01e01-02 -> dois itens (E01 e E02)
    {
      id: "s-006",
      type: "series",
      title: "Jujutsu Kaisen",
      season: 1,
      episode: 1,
      tags: ["anime", "ação", "sobrenatural"],
      status: "downloaded",
      progress: 0,
    },
    {
      id: "s-007",
      type: "series",
      title: "Jujutsu Kaisen",
      season: 1,
      episode: 2,
      tags: ["anime", "ação", "sobrenatural"],
      status: "downloaded",
      progress: 0,
    },

    // =========================
    // FILMES
    // =========================
    {
      id: "m-001",
      type: "movie",
      title: "Caligula",
      tags: ["clássico", "ano-1979", "comecei"],
      status: "downloaded",
      progress: 55,
    },
    {
      id: "m-002",
      type: "movie",
      title: "Ocean's 8",
      tags: ["golpe", "ano-2008", "comecei"],
      status: "downloaded",
      progress: 20,
    },
    {
      id: "m-003",
      type: "movie",
      title: "Everything everyone at once",
      tags: ["ano-2022"],
      status: "downloaded",
      progress: 0,
    },
    {
      id: "m-004",
      type: "movie",
      title: "The Florida Project",
      tags: ["ano-2017", "drama", "independente"],
      status: "downloaded",
      progress: 0,
    },
  ],
};
// Nome do arquivo: data.js  (exato)
// Coloque este arquivo na mesma pasta do seu index.html

const WATCHLIST_DATA = {
  items: [
    // SÉRIES
    {
      id: "s-001",
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 4,
      tags: ["started"],
      status: "need",
      progress: 12,
    },
    {
      id: "s-002",
      type: "series",
      title: "Severance",
      season: 2,
      episode: 6,
      tags: ["started"],
      status: "need",
      progress: 5,
    },
    {
      id: "s-003",
      type: "series",
      title: "Normal People",
      season: 1,
      episode: 9,
      tags: [],
      status: "need",
      progress: 0,
    },
    {
      id: "s-004",
      type: "series",
      title: "Chainsaw Man",
      season: 1,
      episode: 1,
      tags: [],
      status: "need",
      progress: 0,
    },
    {
      id: "s-005",
      type: "series",
      title: "Silent Witch",
      season: 1,
      episode: 1,
      tags: [],
      status: "need",
      progress: 0,
    },

    // Jujutsu kaisen s01e01-02  -> dois itens (E01 e E02)
    {
      id: "s-006",
      type: "series",
      title: "Jujutsu Kaisen",
      season: 1,
      episode: 1,
      tags: [],
      status: "need",
      progress: 0,
    },
    {
      id: "s-007",
      type: "series",
      title: "Jujutsu Kaisen",
      season: 1,
      episode: 2,
      tags: [],
      status: "need",
      progress: 0,
    },

    // FILMES
    {
      id: "m-001",
      type: "movie",
      title: "Caligula",
      tags: ["year-1979", "started"],
      status: "need",
      progress: 55,
    },
    {
      id: "m-002",
      type: "movie",
      title: "Ocean's 8",
      tags: ["year-2008", "started"],
      status: "need",
      progress: 20,
    },
    {
      id: "m-003",
      type: "movie",
      title: "Everything everyone at once",
      tags: ["year-2022"],
      status: "need",
      progress: 0,
    },
    {
      id: "m-004",
      type: "movie",
      title: "The Florida Project",
      tags: ["year-2017"],
      status: "need",
      progress: 0,
    },
  ],
};

window.WATCHLIST_DATA = {
  items: [ /* ... */ ]
};
