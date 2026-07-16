(() => {
  const grid = document.querySelector('#ciclo .phase-grid');
  if (!grid || grid.classList.contains('cycle-circuit')) return;

  const icons = ['search', 'blocks', 'badge-check', 'refresh-cw', 'sparkles'];
  grid.classList.add('cycle-circuit');

  [...grid.children].forEach((node, index) => {
    node.classList.remove('phase-card');
    node.classList.add('cycle-node');

    const marker = document.createElement('div');
    marker.className = 'cycle-node-marker';
    marker.setAttribute('aria-hidden', 'true');
    marker.innerHTML = `
      <span class="cycle-node-icon"><i data-lucide="${icons[index] || 'circle'}"></i></span>
      <span class="cycle-node-port"></span>
    `;
    node.prepend(marker);
  });

  if (window.lucide) {
    window.lucide.createIcons();
  }
})();
