(() => {
  const circuit = document.querySelector('#ciclo .cycle-circuit');
  if (!circuit) return;

  const desktopQuery = window.matchMedia('(min-width:1101px) and (hover:hover) and (pointer:fine)');
  const ns = 'http://www.w3.org/2000/svg';

  let svg = circuit.querySelector(':scope > .cycle-branch-lines');
  let path;

  if (!svg) {
    svg = document.createElementNS(ns, 'svg');
    svg.setAttribute('class', 'cycle-branch-lines');
    svg.setAttribute('preserveAspectRatio', 'none');
    svg.setAttribute('aria-hidden', 'true');
    svg.innerHTML = `
      <defs>
        <linearGradient id="cycle-branch-gradient" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="rgba(232,201,122,.72)" />
          <stop offset="48%" stop-color="rgba(159,135,255,.68)" />
          <stop offset="100%" stop-color="rgba(139,220,255,.58)" />
        </linearGradient>
      </defs>
      <path />
    `;
    circuit.prepend(svg);
  }

  path = svg.querySelector('path');
  if (!path) return;

  let frame = 0;

  const draw = () => {
    frame = 0;

    if (!desktopQuery.matches) {
      svg.hidden = true;
      path.removeAttribute('d');
      return;
    }

    const nodes = [...circuit.querySelectorAll(':scope > .cycle-node')];
    if (nodes.length < 5) {
      svg.hidden = true;
      return;
    }

    const circuitRect = circuit.getBoundingClientRect();
    if (!circuitRect.width || !circuitRect.height) return;

    const upper = nodes.slice(0, 3);
    const lower = nodes.slice(3, 5);
    const rectOf = (node) => node.getBoundingClientRect();
    const centerX = (node) => {
      const rect = rectOf(node);
      return rect.left - circuitRect.left + rect.width / 2;
    };

    const upperBottom = Math.max(...upper.map((node) => rectOf(node).bottom - circuitRect.top));
    const lowerTop = Math.min(...lower.map((node) => rectOf(node).top - circuitRect.top));
    const busY = upperBottom + Math.max(0, lowerTop - upperBottom) / 2;

    const commands = [];
    upper.forEach((node) => {
      const x = centerX(node);
      commands.push(`M ${x.toFixed(2)} ${upperBottom.toFixed(2)} V ${busY.toFixed(2)}`);
    });

    commands.push(
      `M ${centerX(upper[0]).toFixed(2)} ${busY.toFixed(2)} H ${centerX(upper[2]).toFixed(2)}`
    );

    lower.forEach((node) => {
      const x = centerX(node);
      commands.push(`M ${x.toFixed(2)} ${busY.toFixed(2)} V ${lowerTop.toFixed(2)}`);
    });

    svg.hidden = false;
    svg.setAttribute('viewBox', `0 0 ${circuitRect.width} ${circuitRect.height}`);
    path.setAttribute('d', commands.join(' '));
  };

  const scheduleDraw = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(draw);
  };

  if ('ResizeObserver' in window) {
    const resizeObserver = new ResizeObserver(scheduleDraw);
    resizeObserver.observe(circuit);
    [...circuit.querySelectorAll(':scope > .cycle-node')].forEach((node) => resizeObserver.observe(node));
  } else {
    window.addEventListener('resize', scheduleDraw, { passive: true });
  }

  if (typeof desktopQuery.addEventListener === 'function') {
    desktopQuery.addEventListener('change', scheduleDraw);
  } else if (typeof desktopQuery.addListener === 'function') {
    desktopQuery.addListener(scheduleDraw);
  }

  window.addEventListener('load', scheduleDraw, { once: true });
  requestAnimationFrame(scheduleDraw);
})();
