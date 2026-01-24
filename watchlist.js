// /watchlist.js
// Dados expostos em window para o app enxergar sempre.

window.WATCHLIST_DATA = {
  items: [
    // SÉRIES
    {
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 5,
      tags: ["reality show", "comecei"],
      status: "downloaded",
      progress: 0,
      nextRelease: "22/01/26"
    },
    {
      type: "series",
      title: "Severance",
      season: 2,
      episode: 8,
      tags: ["ficção científica", "thriller", "comecei"],
      status: "downloaded",
      progress: 14,
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
      title: "Jujutsu Kaisen",
      season: 3,
      episode: 5,
      tags: ["anime", "ação", "sobrenatural"],
      status: "",
      progress: 0,
      nextRelease: "30/01/26",
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

    // FILMES
    {
      type: "movie",
      title: "Caligula",
      tags: ["clássico", "ano-1979", "comecei"],
      status: "downloaded",
      progress: 60,
    },
    {
      type: "movie",
      title: "Everything everyone at once",
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
  {
      type: "movie",
      title: "Coerência",
      tags: ["ficção científica", "thriller", "realidades-paralelas"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "movie",
      title: "A Outra Terra",
      tags: ["ficção científica", "drama", "metafísico"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "movie",
      title: "Doentes de Amor",
      tags: ["romance", "comédia", "baseado-em-fatos"],
      status: "downloaded",
      progress: 0,
    },
};

// flags de debug (não atrapalham nada)
window.__WATCHLIST_JS_LOADED__ = true;
console.log("✅ watchlist.js executou:", window.WATCHLIST_DATA?.items?.length ?? "sem items");
