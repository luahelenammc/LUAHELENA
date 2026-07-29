const progress = document.getElementById('progress');
const updateProgress = () => {
  if (!progress) return;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

const loadPortraitStyles = () => {
  const href = 'assets/nith-haiah-portrait.css';
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

const loadNithHaiahPortrait = async () => {
  const host = document.getElementById('nithPortrait');
  if (!host || host.dataset.loaded === 'true') return;
  host.dataset.loaded = 'true';
  host.classList.add('portrait-host');
  host.setAttribute('aria-busy', 'true');
  loadPortraitStyles();
  const parts = ['assets/nith-haiah-portrait/part00.b64','assets/nith-haiah-portrait/part01.b64','assets/nith-haiah-portrait/part02.b64'];
  try {
    const responses = await Promise.all(parts.map((path) => fetch(path, { cache: 'force-cache' })));
    const failed = responses.find((response) => !response.ok);
    if (failed) throw new Error(`Falha ao carregar retrato: HTTP ${failed.status}`);
    const encoded = (await Promise.all(responses.map((response) => response.text()))).join('').replace(/\s+/g, '');
    const figure = document.createElement('figure');
    figure.className = 'portrait-figure';
    const image = document.createElement('img');
    image.width = 480;
    image.height = 600;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.alt = 'Reconstituição visual autoral de Nith-Haiah como figura angelical contemplativa, com vestes marfim e verde-esmeralda, livro, lâmpada e asas dourado-lilás.';
    image.src = `data:image/webp;base64,${encoded}`;
    const caption = document.createElement('figcaption');
    caption.innerHTML = '<strong>Reconstituição autoral · 2026</strong>Imagem historiograficamente informada; não é iconografia antiga documentada.';
    figure.append(image, caption);
    host.replaceChildren(figure);
    host.removeAttribute('aria-busy');
  } catch (error) {
    console.error(error);
    host.innerHTML = '<p class="portrait-error">A reconstituição visual não pôde ser carregada.</p>';
    host.removeAttribute('aria-busy');
  }
};

const revealItems = document.querySelectorAll('.reveal');
let revealObserver = null;
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

const tabs = [...document.querySelectorAll('[data-angel-tab]')];
const panels = [...document.querySelectorAll('[data-angel-panel]')];
const donutSegments = [...document.querySelectorAll('[data-donut-angel]')];
const donutCore = document.querySelector('[data-donut-core]');
const donutValue = document.querySelector('[data-donut-value]');
const donutName = document.querySelector('[data-donut-name]');
const donutRole = document.querySelector('[data-donut-role]');

const angelData = {
  haaiah: {
    title: 'Haaiah 70% — o runtime angelológico de Moon',
    value: '70',
    name: 'Haaiah',
    role: 'runtime no mundo'
  },
  nith: {
    title: 'Nith-Haiah 30% — o source interno de Moon',
    value: '30',
    name: 'Nith-Haiah',
    role: 'source interno'
  }
};

let activeAngel = 'haaiah';
let donutTransitionTimer = null;

const paintDonutCore = (angel, animate = true) => {
  const data = angelData[angel];
  if (!data || !donutCore || !donutValue || !donutName || !donutRole) return;
  window.clearTimeout(donutTransitionTimer);

  const apply = () => {
    donutValue.textContent = data.value;
    donutName.textContent = data.name;
    donutRole.textContent = data.role;
    donutCore.dataset.active = angel;
    donutCore.classList.remove('is-changing');
  };

  if (!animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    apply();
    return;
  }

  donutCore.classList.add('is-changing');
  donutTransitionTimer = window.setTimeout(apply, 110);
};

const previewDonut = (angel) => {
  donutSegments.forEach((segment) => {
    segment.classList.toggle('is-muted', segment.dataset.donutAngel !== angel);
  });
  paintDonutCore(angel);
};

const syncDonut = (angel, animate = true) => {
  donutSegments.forEach((segment) => {
    const selected = segment.dataset.donutAngel === angel;
    segment.classList.toggle('is-selected', selected);
    segment.classList.remove('is-muted');
    segment.setAttribute('aria-pressed', String(selected));
  });
  paintDonutCore(angel, animate);
};

const activateAngel = (angel, options = {}) => {
  const target = panels.find((panel) => panel.dataset.angelPanel === angel);
  if (!target || !angelData[angel]) return;
  activeAngel = angel;

  panels.forEach((panel) => { panel.hidden = panel !== target; });
  tabs.forEach((tab) => {
    const selected = tab.dataset.angelTab === angel;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
  });

  target.querySelectorAll('.reveal').forEach((item) => {
    if (revealObserver) revealObserver.observe(item);
    else item.classList.add('visible');
  });

  document.title = angelData[angel].title;
  document.documentElement.dataset.angel = angel;
  syncDonut(angel, options.animateDonut !== false);

  if (options.updateHash !== false) {
    history.replaceState(null, '', angel === 'nith' ? '#nith-haiah' : '#haaiah');
  }

  if (options.scroll) {
    const switcher = document.querySelector('.angel-switcher-wrap');
    const offset = (switcher?.offsetHeight || 0) + 12;
    window.scrollTo({ top: Math.max(0, target.offsetTop - offset), behavior: 'smooth' });
  }

  window.requestAnimationFrame(updateProgress);
};

tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => activateAngel(tab.dataset.angelTab, { scroll: true }));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
    event.preventDefault();
    let nextIndex = index;
    if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
    if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = tabs.length - 1;
    tabs[nextIndex].focus();
    activateAngel(tabs[nextIndex].dataset.angelTab, { scroll: false });
  });
});

donutSegments.forEach((segment) => {
  const angel = segment.dataset.donutAngel;
  segment.addEventListener('pointerenter', () => previewDonut(angel));
  segment.addEventListener('pointerleave', () => syncDonut(activeAngel));
  segment.addEventListener('focus', () => previewDonut(angel));
  segment.addEventListener('blur', () => syncDonut(activeAngel));
  segment.addEventListener('click', () => activateAngel(angel, { scroll: true }));
  segment.addEventListener('keydown', (event) => {
    if (!['Enter', ' '].includes(event.key)) return;
    event.preventDefault();
    activateAngel(angel, { scroll: true });
  });
});

window.addEventListener('hashchange', () => {
  const angel = window.location.hash.toLowerCase().startsWith('#nith') ? 'nith' : 'haaiah';
  activateAngel(angel, { updateHash: false, scroll: false });
});

const initialAngel = window.location.hash.toLowerCase().startsWith('#nith') ? 'nith' : 'haaiah';
activateAngel(initialAngel, { updateHash: false, scroll: false, animateDonut: false });
loadNithHaiahPortrait();