// /watchlist.js
// Coloque este arquivo na MESMA pasta do watchlist.html

(function () {
  // =========================
  // 1) SUA WATCHLIST
  // Schema novo (compatível com o painel atualizado):
  //
  // Movies:
  // {
  //   id, type: "movie", title, tags, status,
  //   progress
  // }
  //
  // Series:
  // {
  //   id, type: "series", title, tags, status,
  //   currentSeason, currentEpisode,
  //   currentEpisodeProgress,
  //   seriesProgress,         // opcional; se vazio, o HTML tenta derivar
  //   totalEpisodes,          // opcional; útil para séries fechadas curtas
  //   note                    // opcional
  // }
  // =========================
  const items = [
    // =========================
    // SÉRIES
    // =========================
     {
      id: "theboys",
      type: "series",
      title: "The Boys",
      currentSeason: 5,
      currentEpisode: 4,
      currentEpisodeProgress: 100,
      tags: ["super herói", "violência", "comecei"],
      status: "watched",
      note: "",
    },
    {
      id: "rhobh",
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      currentSeason: 15,
      currentEpisode: 12,
      currentEpisodeProgress: 100,
      tags: ["reality show", "comecei"],
      status: "downloaded",
      note: "",
    },
    {
      id: "shameless",
      type: "series",
      title: "Shameless",
      currentSeason: 5,
      currentEpisode: 4,
      currentEpisodeProgress: 100,
      tags: ["drama", "comédia dramática"],
      status: "watched",
      note: "",
    },
    {
      id: "serial_experiments_lain",
      type: "series",
      title: "Serial Experiments Lain",
      currentSeason: 1,
      currentEpisode: 1,
      currentEpisodeProgress: 20,
      totalEpisodes: 13,
      tags: ["anime", "cyber", "psicológico"],
      status: "downloaded",
    },
    {
      id: "normal_people",
      type: "series",
      title: "Normal People",
      currentSeason: 1,
      currentEpisode: 9,
      currentEpisodeProgress: 100,
      tags: ["drama", "romance"],
      status: "downloaded",
    },
    {
      id: "chainsaw_man",
      type: "series",
      title: "Chainsaw Man",
      currentSeason: 1,
      currentEpisode: 1,
      currentEpisodeProgress: 0,
      tags: ["anime", "ação", "sombrio"],
      status: "downloaded",
    },
    {
      id: "silent_witch",
      type: "series",
      title: "Silent Witch",
      currentSeason: 1,
      currentEpisode: 1,
      currentEpisodeProgress: 0,
      tags: ["anime", "fantasia", "magia"],
      status: "downloaded",
    },
    {
      id: "orange",
      type: "series",
      title: "Orange",
      currentSeason: 1,
      currentEpisode: 1,
      currentEpisodeProgress: 0,
      tags: ["anime"],
      status: "downloaded",
    },

    // =========================
    // FILMES
    // =========================
    {
      id: "caligula",
      type: "movie",
      title: "Caligula",
      tags: ["clássico", "ano-1979", "comecei"],
      status: "downloaded",
      progress: 60,
    },
    {
      id: "everything_everywhere_all_at_once",
      type: "movie",
      title: "Everything Everywhere All at Once",
      tags: ["ano-2022"],
      status: "downloaded",
      progress: 0,
    },
    {
      id: "the_florida_project",
      type: "movie",
      title: "The Florida Project",
      tags: ["ano-2017", "drama", "independente"],
      status: "downloaded",
      progress: 0,
    },
  ];

  // =========================
  // 2) CALENDÁRIO DE LANÇAMENTOS
  // Pode usar chave por id ou por título exato.
  // Datas aceitas: YYYY-MM-DD ou DD/MM/YY(YY)
  // =========================
  const releases = {
    rhobh: [
      { season: 15, episode: 1,  date: "2025-12-04", title: "Hot Girl Summer" },
      { season: 15, episode: 2,  date: "2025-12-11", title: "Bearing It All" },
      { season: 15, episode: 3,  date: "2025-12-18", title: "A Match Made in Beverly Hills" },
      { season: 15, episode: 4,  date: "2026-01-08", title: "A Housewives Heatwave" },
      { season: 15, episode: 5,  date: "2026-01-15", title: "Not Feeling the Healing" },
      { season: 15, episode: 6,  date: "2026-01-22", title: "Star Signs and Bad Times" },
      { season: 15, episode: 7,  date: "2026-01-29", title: "Headlines and Heartbreak" },
      { season: 15, episode: 8,  date: "2026-02-05", title: "Do You Remember?!?" },
      { season: 15, episode: 9,  date: "2026-02-12", title: "Vacation and Manifestation" },
      { season: 15, episode: 10, date: "2026-02-19", title: "The Cult's Out of the Bag" },
      { season: 15, episode: 11, date: "2026-02-26", title: "The Price of Divorce" },
      { season: 15, episode: 12, date: "2026-03-05", title: "Arrivederci Beverly Hills" },
      { season: 15, episode: 13, date: "2026-03-12", title: "Read the Room" },
      { season: 15, episode: 14, date: "2026-03-19", title: "Unmasking the Truth" },
      { season: 15, episode: 15, date: "2026-03-26", title: "Stranded Under the Tuscan Sun" },
      { season: 15, episode: 16, date: "2026-04-02", title: "The Last Supper" },
      { season: 15, episode: 17, date: "2026-04-09", title: "Drama on the Dance Floor" },
      { season: 15, episode: 18, date: "2026-04-16", title: "Closing Chapters" },
      { season: 15, episode: 19, date: "2026-04-23", title: "Reunion Part 1" },
      { season: 15, episode: 20, date: "2026-04-30", title: "Reunion Part 2" },
      { season: 15, episode: 21, date: "2026-05-07", title: "Reunion Part 3" },
    ],
    theboys: [
  { season: 5, episode: 1, date: "2026-04-08", title: "Fifteen Inches of Sheer Dynamite" },
  { season: 5, episode: 2, date: "2026-04-08", title: "Teenage Kix" },
  { season: 5, episode: 3, date: "2026-04-15", title: "Every One of You Sons of Bitches" },
  { season: 5, episode: 4, date: "2026-04-22", title: "King of Hell" },
  { season: 5, episode: 5, date: "2026-04-29", title: "One-Shots" },
  { season: 5, episode: 6, date: "2026-05-06", title: "TBA" },
  { season: 5, episode: 7, date: "2026-05-13", title: "TBA" },
  { season: 5, episode: 8, date: "2026-05-20", title: "TBA" },
],
  };

  // =========================
  // 3) OVERVIEWS DE SÉRIE
  // Útil para calcular progresso da série inteira.
  // =========================
  const seriesOverviews = {
    shameless: [
      { season: 1, episodes: 12, firstRelease: "2011-01-09", lastRelease: "2011-03-27" },
      { season: 2, episodes: 12, firstRelease: "2012-01-08", lastRelease: "2012-04-01" },
      { season: 3, episodes: 12, firstRelease: "2013-01-13", lastRelease: "2013-04-07" },
      { season: 4, episodes: 12, firstRelease: "2014-01-12", lastRelease: "2014-04-06" },
      { season: 5, episodes: 12, firstRelease: "2015-01-11", lastRelease: "2015-04-05" },
      { season: 6, episodes: 12, firstRelease: "2016-01-10", lastRelease: "2016-04-03" },
      { season: 7, episodes: 12, firstRelease: "2016-10-02", lastRelease: "2016-12-18" },
      { season: 8, episodes: 12, firstRelease: "2017-11-05", lastRelease: "2018-01-28" },
      { season: 9, episodes: 14, firstRelease: "2018-09-09", lastRelease: "2019-03-10" },
      { season: 10, episodes: 12, firstRelease: "2019-11-10", lastRelease: "2020-01-26" },
      { season: 11, episodes: 12, firstRelease: "2020-12-06", lastRelease: "2021-04-11" },
    ],
  };

  // =========================
  // 4) EXPORTA EM window
  // =========================
  window.WATCHLIST_DATA = { items };
  window.WATCHLIST_RELEASES = releases;
  window.WATCHLIST_SERIES_OVERVIEWS = seriesOverviews;

  // flags de debug
  window.__WATCHLIST_JS_LOADED__ = true;
  console.log(
    "✅ watchlist.js executou:",
    window.WATCHLIST_DATA?.items?.length ?? "sem items",
    "| releases:",
    window.WATCHLIST_RELEASES ? "OK" : "N/A",
    "| overviews:",
    window.WATCHLIST_SERIES_OVERVIEWS ? "OK" : "N/A"
  );
})();
