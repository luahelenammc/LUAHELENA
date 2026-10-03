const normalize = (value) => String(value || "")
  .normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "")
  .toLowerCase();

const daysBetween = (older, newer) => {
  const a = Date.parse(`${older}T00:00:00Z`);
  const b = Date.parse(`${newer}T00:00:00Z`);
  return Math.floor((b - a) / 86400000);
};

const isSuperseded = (source, allSources) => source.status === "superseded"
  || allSources.some((candidate) => candidate.supersedes?.includes(source.id));

const answerFor = (source, language) => language === "en"
  ? source.answer_en
  : source.answer_pt;

/** Deterministic, source-governed routing. It never generates an answer. */
export function routeQuery(query, sources, today = "2026-10-03", language = "pt") {
  const normalizedQuery = normalize(query);
  const matched = sources.filter((source) =>
    source.keywords.some((keyword) => normalizedQuery.includes(normalize(keyword)))
  );

  if (!matched.length) {
    return {
      status: "unsupported",
      answer: language === "en"
        ? "No registered source supports this question. Do not infer an answer."
        : "Nenhuma fonte registrada sustenta esta pergunta. Não infira uma resposta.",
      selected: [],
      conflicts: [],
      excluded: [],
      escalationOwner: null,
    };
  }

  const excluded = matched.filter((source) => isSuperseded(source, sources));
  const candidates = matched.filter((source) =>
    source.status === "active"
    && source.effectiveDate <= today
    && !isSuperseded(source, sources)
  );

  if (!candidates.length) {
    return {
      status: "escalated",
      answer: language === "en"
        ? "No current authoritative source is available. Ask the source owner to confirm."
        : "Não há fonte autorizada vigente disponível. Peça confirmação à pessoa responsável pela fonte.",
      selected: [],
      conflicts: [],
      excluded,
      escalationOwner: matched[0].owner,
    };
  }

  const highestAuthority = Math.max(...candidates.map((source) => source.authority.level));
  const highest = candidates.filter((source) => source.authority.level === highestAuthority);
  const stale = highest.filter((source) =>
    daysBetween(source.lastReviewedAt, today) > source.staleAfterDays
  );

  if (stale.length) {
    return {
      status: "escalated",
      answer: language === "en"
        ? "The highest-authority source is overdue for review. Do not treat its contents as current."
        : "A fonte de maior autoridade está vencida para revisão. Não trate seu conteúdo como atual.",
      selected: stale,
      conflicts: [],
      excluded,
      escalationOwner: stale[0].owner,
    };
  }

  const topAnswers = new Set(highest.map((source) => answerFor(source, language)));
  if (topAnswers.size > 1) {
    return {
      status: "escalated",
      answer: language === "en"
        ? "Current sources with equal authority conflict. Do not choose between them; ask their owners to reconcile the policy."
        : "Fontes vigentes com a mesma autoridade entram em conflito. Não escolha entre elas; peça que as responsáveis reconciliem a regra.",
      selected: highest,
      conflicts: highest,
      excluded,
      escalationOwner: highest.map((source) => source.owner).join(" / "),
    };
  }

  const selected = [...highest].sort((a, b) =>
    b.effectiveDate.localeCompare(a.effectiveDate)
    || b.lastReviewedAt.localeCompare(a.lastReviewedAt)
  )[0];
  const conflicts = candidates.filter((source) =>
    source.authority.level < highestAuthority
    && answerFor(source, language) !== answerFor(selected, language)
  );

  if (selected.escalationRequired) {
    return {
      status: "escalated",
      answer: answerFor(selected, language),
      selected: [selected],
      conflicts,
      excluded,
      escalationOwner: selected.escalationOwner || selected.owner,
    };
  }

  return {
    status: "answered",
    answer: answerFor(selected, language),
    selected: [selected],
    conflicts,
    excluded,
    escalationOwner: null,
  };
}

export { isSuperseded };
