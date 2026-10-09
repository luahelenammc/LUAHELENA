import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { routeQuery } from "./engine.mjs";

const { sources: base } = JSON.parse(await readFile(new URL("./sources.json", import.meta.url), "utf8"));
const page = await readFile(new URL("./index.html", import.meta.url), "utf8");
const byId = (id) => base.find((source) => source.id === id);

test("higher-authority current policy wins over a conflicting lower-authority FAQ", () => {
  const result = routeQuery("Qual é o limite de reembolso para hotel?", base);
  assert.equal(result.status, "answered");
  assert.equal(result.selected[0].id, "NORTHSTAR-TRAVEL-03");
  assert.match(result.answer, /US\$ 180/);
  assert.deepEqual(result.conflicts.map((source) => source.id), ["NORTHSTAR-TRAVEL-FAQ-01"]);
});

test("conflicting sources at the highest authority escalate without selecting an answer", () => {
  const peerPolicy = { ...byId("NORTHSTAR-TRAVEL-03"), id: "NORTHSTAR-TRAVEL-PEER", version: "3.1", answer_pt: "A política limita o reembolso a US$ 225 por noite.", answer_en: "The policy caps reimbursement at US$225 per night." };
  const result = routeQuery("Qual é o limite de reembolso para hotel?", [...base, peerPolicy]);
  assert.equal(result.status, "escalated");
  assert.equal(result.selected.length, 2);
  assert.match(result.answer, /mesma autoridade entram em conflito/);
});

test("a stale authoritative source is not presented as current", () => {
  const result = routeQuery("A política de privacidade ainda vale?", base);
  assert.equal(result.status, "escalated");
  assert.equal(result.selected[0].id, "NORTHSTAR-PRIVACY-01");
  assert.match(result.answer, /vencida para revisão/);
});

test("an unsupported question does not receive an invented answer", () => {
  const result = routeQuery("Qual é a política de licença médica?", base);
  assert.equal(result.status, "unsupported");
  assert.equal(result.selected.length, 0);
  assert.match(result.answer, /não pode inferir/);
});

test("a superseded version is excluded and the current version is cited", () => {
  const result = routeQuery("Qual é o limite de reembolso para hotel?", base);
  assert.equal(result.status, "answered");
  assert.equal(result.selected[0].version, "3.0");
  assert.ok(result.excluded.some((source) => source.id === "NORTHSTAR-TRAVEL-02"));
  assert.doesNotMatch(result.answer, /US\$ 150/);
});

test("a new policy version propagates through supersedes metadata", () => {
  const update = { ...byId("NORTHSTAR-TRAVEL-03"), id: "NORTHSTAR-TRAVEL-04", version: "4.0", effectiveDate: "2026-10-01", lastReviewedAt: "2026-10-01", supersedes: ["NORTHSTAR-TRAVEL-03"], answer_pt: "A política atualizada limita o reembolso a US$ 210 por noite.", answer_en: "The updated policy caps reimbursement at US$210 per night." };
  const result = routeQuery("Qual é o limite de reembolso para hotel?", [...base, update]);
  assert.equal(result.status, "answered");
  assert.equal(result.selected[0].id, "NORTHSTAR-TRAVEL-04");
  assert.match(result.answer, /US\$ 210/);
  assert.ok(result.excluded.some((source) => source.id === "NORTHSTAR-TRAVEL-03"));
});

test("a rule requiring case review escalates to its named owner", () => {
  const result = routeQuery("Como solicito uma adaptação no trabalho?", base);
  assert.equal(result.status, "escalated");
  assert.equal(result.escalationOwner, "Fictional People Operations");
  assert.match(result.answer, /não decide elegibilidade/);
});

test("every registered source has unique identity and bilingual governance metadata", () => {
  const ids = base.map((source) => source.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const source of base) {
    for (const field of ["title_pt", "title_en", "owner_pt", "owner_en", "updatePath_pt", "updatePath_en"]) {
      assert.equal(typeof source[field], "string", `${source.id}.${field}`);
      assert.ok(source[field].length > 0, `${source.id}.${field}`);
    }
    assert.match(source.owner_en, /^Fictional /, source.id);
  }
});

test("the published interface stays noindex and accurately discloses synthetic deterministic behavior", () => {
  assert.match(page, /<meta name="robots" content="noindex,follow">/);
  assert.match(page, /Nenhum modelo de IA gera respostas/);
  assert.match(page, /No AI model generates answers/);
  assert.match(page, /Cenário ficcional e didático/);
  assert.match(page, /Architecture, specification, integration and QA: Lua Helena Moon Martins Cardoso\. Implementation developed with AI assistance\./);
});

test("same-authority conflict can be reproduced from the public seven-record fixture", () => {
  const r = routeQuery("Como funciona o trabalho remoto?", base);
  assert.equal(r.status, "escalated");
  assert.equal(r.selected.length, 2);
  assert.ok(r.trace.some((s) => s.code === "top_conflict"));
});
test("substrings are not treated as independent topic words", () => {
  const r=routeQuery("O hotelzinho acolhe pessoas?",base);
  assert.equal(r.status,"unsupported");
});
test("generic information requests do not accidentally trigger privacy policy", () => {
  const r=routeQuery("Onde encontro informações para visitantes?",base);
  assert.equal(r.status,"unsupported");
});
test("supersession does not take effect before the new policy becomes effective", () => {
  const future={...byId("NORTHSTAR-TRAVEL-03"),id:"NORTHSTAR-TRAVEL-FUTURE",
    effectiveDate:"2027-01-01",supersedes:["NORTHSTAR-TRAVEL-03"]};
  const r=routeQuery("Qual é o limite de hotel?",[...base,future]);
  assert.equal(r.selected[0].id,"NORTHSTAR-TRAVEL-03");
});
test("the trace exposes match, exclusion, authority selection and final decision", () => {
  const r=routeQuery("hotel",base);
  const codes=r.trace.map((s)=>s.code);
  for (const expected of ["matched","excluded","eligible","highest","answered"])
    assert.ok(codes.includes(expected),expected);
  assert.ok(r.trace.find((x)=>x.code==="excluded").ids.includes("NORTHSTAR-TRAVEL-02"));
});

test("the interface offers five real reproducible scenarios with a decision trace", () => {
  assert.equal((page.match(/data-label-pt=/g)||[]).length, 5);
  assert.match(page, /Rastro da decisão/);
  assert.match(page, /Inspect all seven fictional sources/);
  assert.match(page, /noindex,follow/);
});
