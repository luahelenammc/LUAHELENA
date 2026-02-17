// /watchlist.js
// Coloque este arquivo na MESMA pasta do watchlist.html

(function () {
  // =========================
  // 1) SUA WATCHLIST
  // =========================
  const items = [
    // =========================
    // SÉRIES
    // =========================
    {
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 9, // último episódio que VOCÊ viu
      tags: ["reality show", "comecei"],
      status: "watched", // pode ser: need | downloaded | streaming | waiting | watched
      progress: 0,
      // nextRelease é opcional (o HTML consegue pegar do calendário),
      // mas deixar aqui não quebra nada.
      nextRelease: "22/01/26",
    },
    {
      type: "series",
      title: "Jujutsu Kaisen",
      season: 3,
      episode: 7,
      tags: ["anime", "ação", "sobrenatural"],
      status: "watched",
      progress: 0,
      nextRelease: "23/01/26",
    },
    {
      type: "series",
      title: "Severance",
      season: 2,
      episode: 0,
      tags: ["ficção científica", "thriller", "comecei"],
      status: "waiting",
      progress: 0,
    },
    {
      type: "series",
      title: "Normal People",
      season: 1,
      episode: 9,
      tags: ["drama", "romance"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "series",
      title: "Chainsaw Man",
      season: 1,
      episode: 1,
      tags: ["anime", "ação", "sombrio"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "series",
      title: "Silent Witch",
      season: 1,
      episode: 1,
      tags: ["anime", "fantasia", "magia"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "series",
      title: "Orange",
      season: 1,
      episode: 1,
      tags: ["anime"],
      status: "downloaded",
      progress: 0,
    },

    // =========================
    // FILMES
    // =========================
    {
      type: "movie",
      title: "Caligula",
      tags: ["clássico", "ano-1979", "comecei"],
      status: "downloaded",
      progress: 60,
    },
    {
      type: "movie",
      title: "Everything Everywhere All at Once",
      tags: ["ano-2022"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "movie",
      title: "The Florida Project",
      tags: ["ano-2017", "drama", "independente"],
      status: "downloaded",
      progress: 0,
    },

    // EXEMPLO usando watched:
    // {
    //   type: "movie",
    //   title: "Exemplo de Filme",
    //   tags: ["exemplo"],
    //   status: "watched",
    //   progress: 100,
    // },
  ];

  // =========================
  // 2) CALENDÁRIO DE LANÇAMENTOS (ATIVO!)
  // Formato que o HTML reconhece (objeto de arrays):
  //
  // window.WATCHLIST_RELEASES = {
  //   "Título Exato": [
  //     { season: 15, episode: 6, date: "22/01/26" }, // DD/MM/YY ou DD/MM/YYYY
  //     ...
  //   ]
  // }
  // =========================
 const releases = {
  "The Real Housewives of Beverly Hills": [
    { season: 15, episode: 4, date: "08/01/26" },
    { season: 15, episode: 5, date: "15/01/26" },
    { season: 15, episode: 6, date: "22/01/26" },
    { season: 15, episode: 7, date: "29/01/26" },
    { season: 15, episode: 8, date: "05/02/26" },
    { season: 15, episode: 9, date: "12/02/26" },
    { season: 15, episode: 10, date: "19/02/26" },
    { season: 15, episode: 11, date: "26/02/26" },
  ],

  "Jujutsu Kaisen": [
    { season: 3, episode: 3, date: "16/01/26" },
    { season: 3, episode: 4, date: "23/01/26" },
    { season: 3, episode: 5, date: "30/01/26" },
    { season: 3, episode: 6, date: "06/02/26" },
    { season: 3, episode: 7, date: "13/02/26" },
    { season: 3, episode: 8, date: "27/02/26" },
  ],
};


  // =========================
  // 3) EXPORTA EM window
  // =========================
  window.WATCHLIST_DATA = { items };
  window.WATCHLIST_RELEASES = releases;

  // flags de debug
  window.__WATCHLIST_JS_LOADED__ = true;
  console.log(
    "✅ watchlist.js executou:",
    window.WATCHLIST_DATA?.items?.length ?? "sem items",
    "| releases:",
    window.WATCHLIST_RELEASES ? "OK" : "N/A"
  );
})();
