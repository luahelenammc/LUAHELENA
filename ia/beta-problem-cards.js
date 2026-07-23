(() => {
  const problemNodes = [...document.querySelectorAll('#entrada .entry-node')].slice(0, 3);

  problemNodes.forEach((node) => {
    node.classList.add('problem-node');

    if (node.querySelector(':scope > .problem-badge')) return;

    const badge = document.createElement('span');
    badge.className = 'problem-badge';
    badge.setAttribute('aria-hidden', 'true');
    badge.innerHTML = '<i data-lucide="triangle-alert"></i>';
    node.append(badge);
  });

  const solutionNodes = [
    ...document.querySelectorAll('#mapa .context-node'),
    ...document.querySelectorAll('#entregas .output-node'),
    ...document.querySelectorAll('#ciclo .cycle-node'),
    ...document.querySelectorAll('#lastro .foundation-node')
  ];

  solutionNodes.forEach((node, index) => {
    node.classList.add('solution-node');
    node.dataset.solutionOrder = String(index);

    if (node.querySelector(':scope > .solution-badge')) return;

    const badge = document.createElement('span');
    badge.className = 'solution-badge';
    badge.setAttribute('aria-hidden', 'true');
    badge.innerHTML = `
      <svg class="solution-check" viewBox="0 0 24 24" aria-hidden="true">
        <path class="solution-check-path" pathLength="1" d="M5.2 12.7 9.4 17 18.9 7.4" />
      </svg>
    `;
    node.append(badge);
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pendingChecks = new WeakMap();

  const clearPendingCheck = (node) => {
    const timer = pendingChecks.get(node);
    if (timer) window.clearTimeout(timer);
    pendingChecks.delete(node);
  };

  const setChecked = (node, checked) => {
    clearPendingCheck(node);

    if (!checked) {
      node.classList.remove('is-checked');
      return;
    }

    const localOrder = Number(node.dataset.solutionOrder || 0) % 6;
    const delay = prefersReducedMotion ? 0 : 900 + localOrder * 85;
    const timer = window.setTimeout(() => {
      node.classList.add('is-checked');
      pendingChecks.delete(node);
    }, delay);
    pendingChecks.set(node, timer);
  };

  if ('IntersectionObserver' in window) {
    const checkObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const visibleEnough = entry.isIntersecting && entry.intersectionRatio >= 0.42;
        setChecked(entry.target, visibleEnough);
      });
    }, {
      threshold: [0, 0.18, 0.42, 0.66],
      rootMargin: '0px 0px -6% 0px'
    });

    solutionNodes.forEach((node) => checkObserver.observe(node));
  } else {
    solutionNodes.forEach((node) => node.classList.add('is-checked'));
  }

  const footerInner = document.querySelector('.foot-inner');
  if (footerInner && !footerInner.querySelector('.back-to-top')) {
    const backToTop = document.createElement('a');
    backToTop.className = 'back-to-top';
    backToTop.href = '#top';
    backToTop.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 19V5" />
        <path d="m6.8 10.2 5.2-5.2 5.2 5.2" />
      </svg>
    `;

    const syncBackToTopLabel = () => {
      const english = document.documentElement.lang === 'en';
      const label = english ? 'Back to top' : 'Voltar ao topo';
      backToTop.setAttribute('aria-label', label);
      backToTop.setAttribute('title', label);
    };

    backToTop.addEventListener('click', (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    });

    syncBackToTopLabel();
    new MutationObserver(syncBackToTopLabel).observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['lang']
    });

    footerInner.append(backToTop);
  }

  if (window.lucide) window.lucide.createIcons();
})();