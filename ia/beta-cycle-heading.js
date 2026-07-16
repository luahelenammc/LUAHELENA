(() => {
  document.querySelectorAll('#ciclo .cycle-node').forEach((node) => {
    if (node.querySelector('.cycle-node-heading')) return;

    const children = [...node.children];
    const label = children.find((child) => child.classList?.contains('mini-label'));
    const title = children.find((child) => child.tagName === 'H3');
    if (!label || !title) return;

    const heading = document.createElement('div');
    heading.className = 'cycle-node-heading';
    node.insertBefore(heading, label);
    heading.append(label, title);
  });
})();
