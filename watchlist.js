// /watchlist.js
// Dados expostos em window para o app enxergar sempre.

(function () {
  // =========================
  // 1) SUA WATCHLIST
  // =========================
  const items = [
    // SÉRIES
    {
      type: "series",
      title: "Jujutsu Kaisen",
      season: 3,
      episode: 7, // você edita manualmente: último episódio que VOCÊ viu
      tags: ["anime", "ação", "sobrenatural"],
      status: "downloaded",
      progress: 0,
    },
    {
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 9, // você edita manualmente
      tags: ["reality show", "comecei"],
      status: "downloaded",
      progress: 0,
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
      title: "Calígula",
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
    {
      type: "movie",
      title: "Coerência",
      tags: ["ficção científica", "thriller", "realidades paralelas"],
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
      tags: ["romance", "comédia", "baseado em fatos"],
      status: "downloaded",
      progress: 0,
    },
  ];

  // =========================
  // 2) CALENDÁRIO DE LANÇAMENTOS (ALIMENTE AQUI)
  // Formato:
  // window.WATCHLIST_RELEASES["Título Exato"][temporada][episódio] = "YYYY-MM-DD"
  // =========================
  const releases = {
    "The Real Housewives of Beverly Hills": {
      15: {
        1: "2025-12-04",
        2: "2025-12-11",
        3: "2025-12-18",
        4: "2026-01-08",
        5: "2026-01-15",
        6: "2026-01-22",
        7: "2026-01-29",
        8: "2026-02-05",
        9: "2026-02-12",
        10: "2026-02-19",
        11: "2026-02-26",
        12: "2026-03-05",
      },
    },

    "Jujutsu Kaisen": {
      3: {
        1: "2026-01-09",
        2: "2026-01-09",
        3: "2026-01-16",
        4: "2026-01-23",
        5: "2026-01-30",
        6: "2026-02-06",
        7: "2026-02-13",
        8: "2026-02-27",
      },
    },
  };

  // =========================
  // 3) AUTO: calcula último lançado + próximo a lançar
  // e preenche item.nextRelease (DD/MM/YY) pro badge do HTML
  // =========================
  function toDate(iso) {
    // iso YYYY-MM-DD
    const [y, m, d] = String(iso).split("-").map(Number);
    const dt = new Date(y, (m || 1) - 1, d || 1);
    dt.setHours(0, 0, 0, 0);
    return dt;
  }

  function toDDMMYY(date) {
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yy = String(date.getFullYear()).slice(-2);
    return `${dd}/${mm}/${yy}`;
  }

  function computeReleaseInfo(showTitle, seasonNumber) {
    const show = releases[showTitle];
    if (!show) return null;

    const season = show[Number(seasonNumber)];
    if (!season) return null;

    const list = Object.entries(season)
      .map(([ep, iso]) => ({
        season: Number(seasonNumber),
        episode: Number(ep),
        dateIso: String(iso),
        date: toDate(iso),
      }))
      .sort((a, b) => (a.date - b.date) || (a.episode - b.episode));

    if (!list.length) return null;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // próximo a lançar: menor data >= hoje
    const next = list.find((x) => x.date.getTime() >= today.getTime()) || null;

    // último lançado: maior data < next.date (se next existir), senão maior <= hoje
    let last = null;
    if (next) {
      for (const x of list) {
        if (x.date.getTime() < next.date.getTime()) last = x;
      }
    } else {
      for (const x of list) {
        if (x.date.getTime() <= today.getTime()) last = x;
      }
    }

    return { last, next, all: list };
  }

  // aplica nos itens (somente séries)
  for (const it of items) {
    if (it.type !== "series") continue;

    const info = computeReleaseInfo(it.title, it.season);
    if (!info) continue;

    it.releaseInfo = {
      last: info.last
        ? { season: info.last.season, episode: info.last.episode, dateIso: info.last.dateIso }
        : null,
      next: info.next
        ? { season: info.next.season, episode: info.next.episode, dateIso: info.next.dateIso }
        : null,
    };

    // Para o badge existente do HTML (que lê item.nextRelease):
    // - se tiver próximo (>= hoje), usa ele
    // - senão, usa o último (vai aparecer como "Já lançou!")
    const badgeTarget = info.next ? info.next.date : (info.last ? info.last.date : null);
    if (badgeTarget) it.nextRelease = toDDMMYY(badgeTarget);
  }

  // =========================
  // 4) EXPORTA EM window
  // =========================
  window.WATCHLIST_DATA = { items };
  window.WATCHLIST_RELEASES = releases;

  // flags de debug (não atrapalham nada)
  window.__WATCHLIST_JS_LOADED__ = true;
  console.log("✅ watchlist.js executou:", window.WATCHLIST_DATA?.items?.length ?? "sem items");
})();
