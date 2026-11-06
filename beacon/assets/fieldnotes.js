/* Progressive enhancement: the entire reading room remains crawlable without JS. */
(() => {
  "use strict";
  const tools = document.getElementById("fn-tools");
  const search = document.getElementById("fn-search");
  const count = document.getElementById("fn-count");
  const noMatch = document.getElementById("fn-no-match");
  const cards = [...document.querySelectorAll("#fn-results .fn-entry")];
  if (!tools || !search || !count || !noMatch || cards.length === 0) return;
  tools.hidden = false;

  const searchable = cards.map(card => ({
    element: card,
    terms: (card.textContent || "").toLocaleLowerCase("en").replace(/\s+/g, " ")
  }));
  function render() {
    const query = search.value.trim().toLocaleLowerCase("en").replace(/\s+/g, " ");
    let shown = 0;
    for (const item of searchable) {
      const matches = query.length === 0 || item.terms.includes(query);
      item.element.hidden = !matches;
      if (matches) shown += 1;
    }
    count.textContent = shown + " of " + cards.length + " notes";
    noMatch.hidden = shown !== 0;
  }
  search.addEventListener("input", render);
  search.addEventListener("search", render);
  render();
})();
