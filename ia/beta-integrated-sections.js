(() => {
  if (typeof T === 'object' && T.pt && T.en) {
    T.pt['beta.context.core'] = 'Contexto integrado';
    T.en['beta.context.core'] = 'Integrated context';
    T.pt['beta.outputs.core'] = 'Uma base, várias formas de uso';
    T.en['beta.outputs.core'] = 'One foundation, many forms of use';
  }

  const makeSvg = (className, content, viewBox = '0 0 1000 700') => {
    const ns = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', className);
    svg.setAttribute('viewBox', viewBox);
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = content;
    return svg;
  };

  const convertCards = (selector, containerClass, nodeClass) => {
    const container = document.querySelector(selector);
    if (!container || container.classList.contains(containerClass)) return null;
    container.classList.add(containerClass);
    [...container.children].forEach((node, index) => {
      node.classList.remove('card', 'proof-card');
      node.classList.add(nodeClass);
      node.dataset.node = String(index);
    });
    return container;
  };

  const entry = convertCards('#entrada .triple-grid', 'entry-circuit', 'entry-node');
  if (entry) {
    [...entry.children].forEach((node, index) => {
      const marker = document.createElement('span');
      marker.className = 'entry-step';
      marker.textContent = String(index + 1).padStart(2, '0');
      const icon = node.querySelector('.ic');
      if (icon) icon.after(marker);
    });
  }

  const context = convertCards('#mapa .card-grid', 'context-network', 'context-node');
  if (context) {
    context.prepend(makeSvg('context-network-lines', `
      <path d="M500 350 L165 110 M500 350 L500 75 M500 350 L835 110 M500 350 L165 590 M500 350 L500 625 M500 350 L835 590" />
      <circle cx="500" cy="350" r="14" />
    `));

    const core = document.createElement('div');
    core.className = 'context-core';
    core.innerHTML = `
      <span class="context-core-icon"><i data-lucide="network"></i></span>
      <strong data-i="beta.context.core">Contexto integrado</strong>
    `;
    context.append(core);
  }

  const outputs = convertCards('#entregas .card-grid', 'output-circuit', 'output-node');
  if (outputs) {
    const core = document.createElement('div');
    core.className = 'output-core';
    core.innerHTML = `
      <span class="output-core-icon"><i data-lucide="waypoints"></i></span>
      <strong data-i="beta.outputs.core">Uma base, várias formas de uso</strong>
    `;
    outputs.prepend(core);

    [...outputs.querySelectorAll('.output-node')].forEach((node, index) => {
      node.dataset.side = index % 2 === 0 ? 'left' : 'right';
      const port = document.createElement('span');
      port.className = 'output-port';
      port.setAttribute('aria-hidden', 'true');
      node.prepend(port);
    });
  }

  const foundation = convertCards('#lastro .proof-grid', 'foundation-circuit', 'foundation-node');
  if (foundation) {
    foundation.prepend(makeSvg('foundation-circuit-lines', `
      <path d="M85 170 H500 H915 V530 H500 H85" />
      <path d="M500 170 V530" />
      <circle cx="85" cy="170" r="8" /><circle cx="500" cy="170" r="8" /><circle cx="915" cy="170" r="8" />
      <circle cx="915" cy="530" r="8" /><circle cx="500" cy="530" r="8" /><circle cx="85" cy="530" r="8" />
    `));

    [...foundation.querySelectorAll('.foundation-node')].forEach((node) => {
      const port = document.createElement('span');
      port.className = 'foundation-port';
      port.setAttribute('aria-hidden', 'true');
      node.prepend(port);
    });
  }

  if (typeof applyLang === 'function' && typeof getLang === 'function') {
    applyLang(getLang());
  }
  if (window.lucide) window.lucide.createIcons();
})();
