// /watchlist.js
// Coloque este arquivo na MESMA pasta do watchlist.html

(function () {
  // =========================
  // WATCHLIST — fonte de verdade simples
  // =========================
  // Regra-mãe:
  // - Você NÃO precisa preencher status manualmente.
  // - Para séries, edite só: season, episode, progress e access.
  // - Se progress === 100, o painel entende: episódio assistido até ali.
  // - O próximo episódio e o próximo lançamento são calculados pelo calendário.
  //
  // access = estado logístico, não estado de progresso:
  // - "downloaded" = já baixado / já disponível para você
  // - "streaming"   = disponível em streaming
  // - "need"        = precisa baixar/encontrar
  // =========================

  const rawItems = [
    // =========================
    // SÉRIES
    // =========================
    {
      id: "theboys",
      type: "series",
      title: "The Boys",
      season: 5,
      episode: 5,
      progress: 100,
      access: "streaming",
      tags: ["super herói", "violência", "comecei"],
      note: "",
    },
    {
      id: "rhobh",
      type: "series",
      title: "The Real Housewives of Beverly Hills",
      season: 15,
      episode: 12,
      progress: 100,
      access: "downloaded",
      tags: ["reality show", "comecei"],
      note: "",
    },
    {
      id: "shameless",
      type: "series",
      title: "Shameless",
      season: 5,
      episode: 4,
      progress: 100,
      access: "downloaded",
      tags: ["drama", "comédia dramática"],
      note: "",
    },
    {
      id: "serial_experiments_lain",
      type: "series",
      title: "Serial Experiments Lain",
      season: 1,
      episode: 1,
      progress: 20,
      access: "downloaded",
      totalEpisodes: 13,
      tags: ["anime", "cyber", "psicológico"],
    },
    {
      id: "normal_people",
      type: "series",
      title: "Normal People",
      season: 1,
      episode: 9,
      progress: 100,
      access: "downloaded",
      tags: ["drama", "romance"],
    },
    {
      id: "chainsaw_man",
      type: "series",
      title: "Chainsaw Man",
      season: 1,
      episode: 1,
      progress: 0,
      access: "downloaded",
      tags: ["anime", "ação", "sombrio"],
    },
    {
      id: "silent_witch",
      type: "series",
      title: "Silent Witch",
      season: 1,
      episode: 1,
      progress: 0,
      access: "downloaded",
      tags: ["anime", "fantasia", "magia"],
    },
    {
      id: "orange",
      type: "series",
      title: "Orange",
      season: 1,
      episode: 1,
      progress: 0,
      access: "downloaded",
      tags: ["anime"],
    },

    // =========================
    // FILMES
    // =========================
    {
      id: "caligula",
      type: "movie",
      title: "Caligula",
      tags: ["clássico", "ano-1979", "comecei"],
      access: "downloaded",
      progress: 60,
    },
    {
      id: "everything_everywhere_all_at_once",
      type: "movie",
      title: "Everything Everywhere All at Once",
      tags: ["ano-2022"],
      access: "downloaded",
      progress: 0,
    },
    {
      id: "the_florida_project",
      type: "movie",
      title: "The Florida Project",
      tags: ["ano-2017", "drama", "independente"],
      access: "downloaded",
      progress: 0,
    },
  ];

  // =========================
  // CALENDÁRIO DE LANÇAMENTOS
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
  // OVERVIEWS DE SÉRIE
  // Útil para calcular progresso da série inteira e próximo episódio quando não há calendário detalhado.
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
    normal_people: [
      { season: 1, episodes: 12, firstRelease: "2020-04-26", lastRelease: "2020-04-26" },
    ],
    serial_experiments_lain: [
      { season: 1, episodes: 13, firstRelease: "1998-07-06", lastRelease: "1998-09-28" },
    ],
    chainsaw_man: [
      { season: 1, episodes: 12, firstRelease: "2022-10-12", lastRelease: "2022-12-28" },
    ],
    orange: [
      { season: 1, episodes: 13, firstRelease: "2016-07-04", lastRelease: "2016-09-26" },
    ],
  };

  // =========================
  // NORMALIZAÇÃO / INTELIGÊNCIA DO PAINEL
  // =========================

  function clampProgress(value) {
    const n = Number(value ?? 0);
    if (!Number.isFinite(n)) return 0;
    return Math.max(0, Math.min(100, Math.round(n)));
  }

  function pad2(n) {
    return String(n).padStart(2, "0");
  }

  function parseDateOnly(input) {
    if (!input) return null;
    const raw = String(input).trim();

    const iso = raw.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (iso) return new Date(`${iso[1]}-${iso[2]}-${iso[3]}T00:00:00`);

    const br = raw.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2}|\d{4})$/);
    if (br) {
      const day = pad2(br[1]);
      const month = pad2(br[2]);
      const year = br[3].length === 2 ? `20${br[3]}` : br[3];
      return new Date(`${year}-${month}-${day}T00:00:00`);
    }

    const fallback = new Date(raw);
    return Number.isNaN(fallback.getTime()) ? null : fallback;
  }

  function todayStart() {
    const d = new Date();
    return new Date(d.getFullYear(), d.getMonth(), d.getDate());
  }

  function dateKey(date) {
    if (!date) return "";
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
  }

  function formatDate(input) {
    const d = input instanceof Date ? input : parseDateOnly(input);
    if (!d) return "data não informada";
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
  }

  function epLabel(season, episode) {
    if (!season || !episode) return "episódio atual";
    return `T${season}E${episode}`;
  }

  function compareEpisode(a, b) {
    const seasonDiff = Number(a.season ?? 0) - Number(b.season ?? 0);
    if (seasonDiff !== 0) return seasonDiff;
    return Number(a.episode ?? 0) - Number(b.episode ?? 0);
  }

  function getReleaseList(item) {
    return releases[item.id] || releases[item.title] || [];
  }

  function findNextCalendarEpisode(item) {
    const list = getReleaseList(item)
      .map((entry) => ({ ...entry, parsedDate: parseDateOnly(entry.date) }))
      .filter((entry) => Number.isFinite(Number(entry.season)) && Number.isFinite(Number(entry.episode)))
      .sort(compareEpisode);

    return list.find((entry) => compareEpisode(entry, item) > 0) || null;
  }

  function findNextOverviewEpisode(item) {
    const overview = seriesOverviews[item.id] || [];
    const seasonInfo = overview.find((s) => Number(s.season) === Number(item.season));

    if (seasonInfo && Number(item.episode) < Number(seasonInfo.episodes)) {
      return {
        season: Number(item.season),
        episode: Number(item.episode) + 1,
        date: seasonInfo.lastRelease,
        title: "",
        source: "overview",
      };
    }

    const nextSeason = overview.find((s) => Number(s.season) > Number(item.season));
    if (nextSeason) {
      return {
        season: Number(nextSeason.season),
        episode: 1,
        date: nextSeason.firstRelease,
        title: "",
        source: "overview",
      };
    }

    return null;
  }

  function getNextEpisode(item) {
    return findNextCalendarEpisode(item) || findNextOverviewEpisode(item);
  }

  function getReleaseState(release) {
    const d = parseDateOnly(release?.date);
    if (!d) return "unknown";
    const today = todayStart();
    if (dateKey(d) === dateKey(today)) return "today";
    return d > today ? "future" : "past";
  }

  function makeHumanSummary(item, nextEpisode) {
    const progress = clampProgress(item.progress);

    if (item.type === "movie") {
      if (progress >= 100) return "Você já assistiu este filme.";
      if (progress > 0) return `Você está assistindo este filme — ${progress}%.`;
      return "Você ainda não começou este filme.";
    }

    const current = epLabel(item.season, item.episode);

    if (progress > 0 && progress < 100) {
      return `Você está assistindo ${current} — ${progress}%.`;
    }

    if (progress <= 0) {
      return `Você ainda vai começar ${current}.`;
    }

    if (!nextEpisode) {
      return `Você assistiu até ${current}. Sem próximo episódio cadastrado.`;
    }

    const next = epLabel(nextEpisode.season, nextEpisode.episode);
    const title = nextEpisode.title && nextEpisode.title !== "TBA" ? ` (${nextEpisode.title})` : "";
    const releaseState = getReleaseState(nextEpisode);

    if (releaseState === "future") {
      return `Você assistiu até ${current}. Próximo: ${next}${title} • ${formatDate(nextEpisode.date)}.`;
    }

    if (releaseState === "today") {
      return `Você assistiu até ${current}. Próximo: ${next}${title} • hoje.`;
    }

    if (releaseState === "past") {
      return `Você assistiu até ${current}. Próximo: ${next}${title} • disponível desde ${formatDate(nextEpisode.date)}.`;
    }

    return `Você assistiu até ${current}. Próximo: ${next}${title}.`;
  }

  function deriveLegacyStatus(item, nextEpisode) {
    const progress = clampProgress(item.progress);
    const access = item.access || "need";

    if (item.type === "movie") {
      if (progress >= 100) return "watched";
      return access;
    }

    if (progress > 0 && progress < 100) return access;
    if (progress <= 0) return access;

    const releaseState = getReleaseState(nextEpisode);
    if (releaseState === "future" || releaseState === "today") return "waiting";
    if (releaseState === "past") return access;
    return "watched";
  }

  function deriveSeriesProgress(item) {
    const overview = seriesOverviews[item.id] || [];
    if (!overview.length) return item.seriesProgress;

    const total = overview.reduce((sum, s) => sum + Number(s.episodes || 0), 0);
    if (!total) return item.seriesProgress;

    let completedBefore = 0;
    for (const s of overview) {
      if (Number(s.season) < Number(item.season)) completedBefore += Number(s.episodes || 0);
    }

    const currentEpisodeCredit = Math.max(0, Number(item.episode || 0) - 1) + clampProgress(item.progress) / 100;
    return Math.round(((completedBefore + currentEpisodeCredit) / total) * 100);
  }

  function normalizeItem(raw) {
    const progress = clampProgress(raw.progress ?? raw.currentEpisodeProgress ?? 0);
    const base = { ...raw, progress };
    const nextEpisode = raw.type === "series" ? getNextEpisode(base) : null;
    const watchSummary = makeHumanSummary(base, nextEpisode);
    const status = deriveLegacyStatus(base, nextEpisode);

    if (raw.type === "movie") {
      return {
        ...base,
        status,
        watchSummary,
        note: raw.note || watchSummary,
      };
    }

    return {
      ...base,
      status,
      nextEpisode,
      nextRelease: nextEpisode?.date || "",
      watchSummary,
      note: raw.note || watchSummary,

      // Compatibilidade com o HTML atual:
      currentSeason: raw.currentSeason ?? raw.season,
      currentEpisode: raw.currentEpisode ?? raw.episode,
      currentEpisodeProgress: progress,
      seriesProgress: raw.seriesProgress ?? deriveSeriesProgress(base),
    };
  }

  function injectMobileChipLayoutPatch() {
    if (typeof document === "undefined") return;
    if (document.getElementById("watchlist-mobile-chip-layout-patch")) return;

    const css = `
      @media (max-width: 640px) {
        .desk {
          padding: 18px 6px !important;
          place-items: start center !important;
        }

        .window {
          width: min(100%, 100vw) !important;
        }

        .content,
        .panel-list,
        .panel-filters {
          padding: 10px !important;
        }

        .list-head {
          align-items: flex-start !important;
          flex-direction: column !important;
        }

        .card {
          padding: 12px 10px !important;
        }

        .card-top {
          display: grid !important;
          grid-template-columns: 1fr !important;
          gap: 10px !important;
        }

        .sticker {
          width: 100% !important;
          min-width: 0 !important;
        }

        .titleline {
          min-width: 0 !important;
          flex: 1 1 auto !important;
        }

        .card-title {
          white-space: normal !important;
          overflow: visible !important;
          text-overflow: clip !important;
          line-height: 1.15 !important;
          max-width: 100% !important;
        }

        .status {
          width: 100% !important;
          align-items: stretch !important;
        }

        .ledrow {
          display: grid !important;
          grid-template-columns: repeat(5, minmax(0, 1fr)) !important;
          gap: 8px !important;
          max-width: none !important;
          width: 100% !important;
        }

        .led {
          width: 100% !important;
          height: 30px !important;
        }

        .legend {
          text-align: left !important;
          font-size: 12px !important;
          padding: 0 2px !important;
        }

        .card-meta {
          display: grid !important;
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 8px !important;
          align-items: stretch !important;
          width: 100% !important;
        }

        .mini {
          width: 100% !important;
          min-width: 0 !important;
          justify-content: center !important;
          min-height: 36px !important;
          border-radius: 18px !important;
          white-space: normal !important;
          text-align: center !important;
          line-height: 1.2 !important;
        }

        .mini-note {
          grid-column: 1 / -1 !important;
          justify-content: flex-start !important;
          text-align: left !important;
          border-radius: 16px !important;
          padding: 10px 12px !important;
          line-height: 1.35 !important;
        }

        .release {
          grid-column: 1 / -1 !important;
          justify-content: center !important;
          border-radius: 999px !important;
          padding: 9px 12px !important;
        }

        .release .release-date,
        .release .release-text {
          white-space: nowrap !important;
        }

        .tags {
          gap: 8px !important;
        }

        .tag {
          flex: 1 1 auto !important;
          min-width: max-content !important;
          text-align: center !important;
        }
      }

      @media (max-width: 390px) {
        .mini {
          font-size: 11px !important;
          padding: 7px 8px !important;
        }

        .mini-note {
          font-size: 12px !important;
        }

        .release {
          font-size: 12px !important;
        }

        .tag {
          font-size: 11px !important;
          padding: 6px 8px !important;
        }
      }
    `;

    const style = document.createElement("style");
    style.id = "watchlist-mobile-chip-layout-patch";
    style.textContent = css;
    document.head.appendChild(style);
  }

  injectMobileChipLayoutPatch();

  const items = rawItems.map(normalizeItem);

  // =========================
  // EXPORTA EM window
  // =========================
  window.WATCHLIST_DATA = { items };
  window.WATCHLIST_RELEASES = releases;
  window.WATCHLIST_SERIES_OVERVIEWS = seriesOverviews;
  window.WATCHLIST_RAW_ITEMS = rawItems;

  // Helper público para debug rápido no console:
  window.getWatchState = function getWatchState(id) {
    return items.find((item) => item.id === id || item.title === id) || null;
  };

  // flags de debug
  window.__WATCHLIST_JS_LOADED__ = true;
  console.log(
    "✅ watchlist.js executou:",
    window.WATCHLIST_DATA?.items?.length ?? "sem items",
    "| releases:",
    window.WATCHLIST_RELEASES ? "OK" : "N/A",
    "| overviews:",
    window.WATCHLIST_SERIES_OVERVIEWS ? "OK" : "N/A",
    "| schema:",
    "progress_driven_v2_mobile_patch"
  );
})();
