(() => {
  const nodes = [...document.querySelectorAll('#entrada .entry-node')].slice(0, 3);

  nodes.forEach((node) => {
    node.classList.add('problem-node');

    if (node.querySelector(':scope > .problem-badge')) return;

    const badge = document.createElement('span');
    badge.className = 'problem-badge';
    badge.setAttribute('aria-hidden', 'true');
    badge.innerHTML = '<i data-lucide="triangle-alert"></i>';
    node.append(badge);
  });

  if (window.lucide) window.lucide.createIcons();
})();
