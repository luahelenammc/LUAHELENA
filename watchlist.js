// /watchlist.js
// Dados expostos em window para o app enxergar sempre.
//
// Status aceitos (você escolhe por item):
// - "need"       -> precisa baixar
// - "downloaded" -> baixado
// - "streaming"  -> streaming
// - "waiting"    -> aguardando episódio / lançamento
// - "watched"    -> assistido (dica: coloque progress: 100)
//
// Obs.: Para séries, você pode (opcional) alimentar um calendário de lançamentos
// em window.WATCHLIST_RELEASES (exemplo no final). Se existir calendário, o HTML
// calcula automaticamente "LANÇADO ATÉ" + "PRÓXIMO".
// Se NÃO existir, ele usa item.nextRelease (se você preencher).

window.WATCHLIST_DATA = {
  items: [
    // SÉRIES
    {
      type: "series",
      title: "Jujutsu Kaisen",
      displayTitle: "Jujutsu Kaisen",
      season: 3,
      episode: 7,
      tags: ["anime", "acao", "sobrenatural"],
      status: "waiting",
      progress: 0,
      nextRelease: "13/02/26",
    },
    {
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      displayTitle: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 9,
      tags: ["reality-show", "comecei"],
      status: "waiting",
      progress: 0,
      nextRelease: "12/02/26",
    },
    {
      type: "series",
      title: "Severance",
      displayTitle: "Severance",
      season: 2,
      episode: 8,
      tags: ["ficcao-cientifica", "thriller", "comecei"],
      status: "downloaded",
      progress: 14,
    },
    {
      type: "series",
      title: "Normal People",
      displayTitle: "Normal People",
      season: 1,
      episode: 9,
      tags: ["drama", "romance"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "series",
      title: "Chainsaw Man",
      displayTitle: "Chainsaw Man",
      season: 1,
      episode: 1,
      tags: ["anime", "acao", "sombrio"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "series",
      title: "Silent Witch",
      displayTitle: "Silent Witch",
      season: 1,
      episode: 1,
      tags: ["anime", "fantasia", "magia"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "series",
      title: "Orange",
      displayTitle: "Orange",
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
      displayTitle: "Calígula",
      tags: ["classico", "ano-1979", "comecei"],
      status: "downloaded",
      progress: 60,
    },
    {
      type: "movie",
      title: "Everything Everywhere All at Once",
      displayTitle: "Everything Everywhere All at Once",
      tags: ["ano-2022"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "movie",
      title: "The Florida Project",
      displayTitle: "The Florida Project",
      tags: ["ano-2017", "drama", "independente"],
      status: "downloaded",
      progress: 0,
    },

    // NOVOS BAIXADOS (com title ASCII + displayTitle com acento)
    {
      type: "movie",
      title: "Coherence",
      displayTitle: "Coerência",
      tags: ["ficcao-cientifica", "thriller", "realidades-paralelas"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "movie",
      title: "Another Earth",
      displayTitle: "A Outra Terra",
      tags: ["ficcao-cientifica", "drama", "metafisico"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "movie",
      title: "The Big Sick",
      displayTitle: "Doentes de Amor",
      tags: ["romance", "comedia", "baseado-em-fatos"],
      status: "downloaded",
      progress: 0,
    },
  ],
};

// (OPCIONAL) Calendário de lançamentos por título EXACT (use o campo "title" do item):
// - Você pode colocar várias temporadas no mesmo array.
// - Datas aceitas: "DD/MM/YY" ou "DD/MM/YYYY".
//
// window.WATCHLIST_RELEASES = {
//   "Jujutsu Kaisen": [
//     { season: 3, episode: 4, date: "23/01/26" },
//     { season: 3, episode: 5, date: "30/01/26" },
//   ],
//   "The Real Housewives of Beverly Hills": [
//     { season: 15, episode: 6, date: "22/01/26" },
//   ],
// };

window.__WATCHLIST_JS_LOADED__ = true;
console.log("✅ watchlist.js executou:", window.WATCHLIST_DATA?.items?.length ?? "sem items");
