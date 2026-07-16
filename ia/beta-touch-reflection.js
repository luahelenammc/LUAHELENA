(() => {
  const selector = '.entry-node,.context-node,.output-node,.foundation-node,.cycle-node';
  const touchLike = window.matchMedia('(hover:none), (pointer:coarse)').matches;
  if (!touchLike) return;

  const duration = 1240;

  document.querySelectorAll(selector).forEach((node) => {
    let timer = 0;

    const play = () => {
      window.clearTimeout(timer);
      node.classList.remove('is-gold-reflecting');

      // Force a fresh animation timeline so every tap produces one full pass.
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