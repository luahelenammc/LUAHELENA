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

  solutionNodes.forEach((node) => {
    node.classList.add('solution-node');

    if (node.querySelector(':scope > .solution-badge')) return;

    const badge = document.createElement('span');
    badge.className = 'solution-badge';
    badge.setAttribute('aria-hidden', 'true');
    badge.innerHTML = '<i data-lucide="check"></i>';
    node.append(badge);
  });

  if (window.lucide) window.lucide.createIcons();
})();