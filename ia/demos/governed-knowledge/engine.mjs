// A deliberately small, deterministic routing fixture, not a natural-language model.
// It decides from explicit source metadata. It cannot interpret intent or clinical meaning.
const normalize = (v) => String(v ?? "").normalize("NFD")
  .replace(/[\u0300-\u036f]/g, "").toLowerCase()
  .replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, " ");

const matchesKeyword = (normalizedQuery, keyword) => {
  const term = normalize(keyword);
  return term.length > 0 && (` ${normalizedQuery} `).includes(` ${term} `);
};
const daysBetween = (older, newer) => (Date.parse(`${newer}T00:00:00Z`) -
  Date.parse(`${older}T00:00:00Z`)) / 86400000;
const answerFor = (source, lang) => lang === "en" ? source.answer_en : source.answer_pt;

export function isSuperseded(source, allSources, today = "2026-10-03") {
  if (source.status === "superseded") return true;
  return allSources.some((candidate) =>
    candidate.status === "active" && candidate.effectiveDate <= today &&
    candidate.supersedes?.includes(source.id));
}

export function routeQuery(query, sources, today = "2026-10-03", language = "pt") {
  const en = language === "en";
  const relevant = (sources || []).filter((source) =>
    (source.keywords || []).some((keyword) => matchesKeyword(normalize(query), keyword)));
  const trace = [];
  const step = (code, records = []) => trace.push({code, ids: records.map((x) => x.id)});
  step("matched", relevant);
  const unsupported = {
    status:"unsupported", answer:en
      ? "No registered topic matches this query. This keyword fixture cannot infer a new answer."
      : "Nenhum tópico cadastrado corresponde à consulta. Este teste por palavras-chave não pode inferir uma resposta.",
    selected:[], conflicts:[], excluded:[], escalationOwner:null, trace
  };
  if (!relevant.length) { step("unsupported"); return unsupported; }

  const excluded = relevant.filter((x) => isSuperseded(x, sources, today));
  const eligible = relevant.filter((x) => x.status === "active"
    && x.effectiveDate <= today && !isSuperseded(x, sources, today));
  step("excluded", excluded); step("eligible", eligible);
  const escalated = (answer, chosen, conflicts, owner, reason) => {
    step(reason, chosen);
    return {status:"escalated", answer, selected:chosen, conflicts, excluded,
      escalationOwner:owner, trace};
  };
  if (!eligible.length) return escalated(
    en ? "No current authorized source is available. Ask its owner for review."
       : "Nenhuma fonte autorizada está vigente. Encaminhe para revisão pela pessoa responsável.",
    [], [], relevant[0].owner_en || relevant[0].owner, "no_current_source"
  );
  const level = Math.max(...eligible.map((x) => x.authority.level));
  const highest = eligible.filter((x) => x.authority.level === level);
  step("highest", highest);
  const stale = highest.filter((x) => daysBetween(x.lastReviewedAt, today) > x.staleAfterDays);
  if (stale.length) return escalated(
    en ? "The highest-authority source is overdue for review. Do not treat it as current."
       : "A fonte de maior autoridade está vencida para revisão. Não trate seu conteúdo como atual.",
    stale, [], (en ? stale[0].owner_en : stale[0].owner_pt) || stale[0].owner, "stale"
  );
  const different = new Set(highest.map((x) => answerFor(x, language)));
  if (different.size > 1) return escalated(
    en ? "Current sources with equal authority disagree. A human owner must reconcile them."
       : "Fontes vigentes com a mesma autoridade entram em conflito. Uma pessoa responsável deve conciliá-las.",
    highest, highest,
    highest.map((x)=>(en?x.owner_en:x.owner_pt)||x.owner).join(" / "), "top_conflict"
  );
  const selected=[...highest].sort((a,b) => b.effectiveDate.localeCompare(a.effectiveDate)
    || b.lastReviewedAt.localeCompare(a.lastReviewedAt))[0];
  const conflicts=eligible.filter((x) => x.authority.level < level
    && answerFor(x, language) !== answerFor(selected, language));
  step("lower_conflicts", conflicts);
  if (selected.escalationRequired) return escalated(
    answerFor(selected, language), [selected], conflicts,
    selected.escalationOwner || (en?selected.owner_en:selected.owner_pt), "human_required"
  );
  step("answered", [selected]);
  return {status:"answered", answer:answerFor(selected, language), selected:[selected],
    conflicts, excluded, escalationOwner:null, trace};
}
