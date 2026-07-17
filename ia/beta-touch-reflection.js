(() => {
  const selector = '.entry-node,.context-node,.output-node,.foundation-node,.cycle-node';
  const nodes = [...document.querySelectorAll(selector)];

  nodes.forEach((node) => {
    if (!node.querySelector(':scope > .circuit-sheen')) {
      const sheen = document.createElement('span');
      sheen.className = 'circuit-sheen';
      sheen.setAttribute('aria-hidden', 'true');
      node.prepend(sheen);
    }
  });

  const touchLike = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (!touchLike) return;

  const duration = 1980;

  nodes.forEach((node) => {
    let timer = 0;

    const play = () => {
      window.clearTimeout(timer);
      node.classList.remove('is-gold-reflecting');

      // Restart a single complete pass on every released tap.
      void node.offsetWidth;
      node.classList.add('is-gold-reflecting');

      timer = window.setTimeout(() => {
        node.classList.remove('is-gold-reflecting');
      }, duration);
    };

    node.addEventListener('click', (event) => {
      if (event.target.closest('a,button')) return;
      play();
    }, { passive: true });
  });
})();
