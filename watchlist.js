// /watchlist.js
// Dados expostos em window para o app enxergar sempre.

window.WATCHLIST_DATA = {
  items: [
    // SÉRIES
    {
      id: "s-001",
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 5,
      tags: ["reality show", "comecei"],
      status: "downloaded",
      progress: 0,
    },
    {
      id: "s-002",
      type: "series",
      title: "Severance",
      season: 2,
      episode: 8,
      tags: ["ficção científica", "thriller", "comecei"],
      status: "downloaded",
      progress: 14,
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
    {
      id: "s-006",
      type: "series",
      title: "Jujutsu Kaisen",
      season: 3,
      episode: 4,
      tags: ["anime", "ação", "sobrenatural"],
      status: "downloaded",
      progress: 0,
    },
    {
  id: "s-007",
  type: "series",
  title: "Orange",
  season: 1,
  episode: 1,
  tags: ["anime"],
  status: "downloaded",
  progress: 0,
},

    // FILMES
    {
      id: "m-001",
      type: "movie",
      title: "Caligula",
      tags: ["clássico", "ano-1979", "comecei"],
      status: "downloaded",
      progress: 55,
    },
    {
      id: "m-004",
      type: "movie",
      title: "Everything everyone at once",
      tags: ["ano-2022"],
      status: "downloaded",
      progress: 0,
    },
    {
      id: "m-005",
      type: "movie",
      title: "The Florida Project",
      tags: ["ano-2017", "drama", "independente"],
      status: "downloaded",
      progress: 0,
    },
  ],
};

// flags de debug (não atrapalham nada)
window.__WATCHLIST_JS_LOADED__ = true;
console.log("✅ watchlist.js executou:", window.WATCHLIST_DATA?.items?.length ?? "sem items");
