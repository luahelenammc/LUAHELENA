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
const titles = {
  haaiah: 'Haaiah 70% — o runtime angelológico de Moon',
  nith: 'Nith-Haiah 30% — o source interno de Moon'
};

const activateAngel = (angel, options = {}) => {
  const target = panels.find((panel) => panel.dataset.angelPanel === angel);
  if (!target) return;
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
  document.title = titles[angel] || titles.haaiah;
  document.documentElement.dataset.angel = angel;
  if (options.updateHash !== false) history.replaceState(null, '', angel === 'nith' ? '#nith-haiah' : '#haaiah');
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

const initialAngel = window.location.hash.toLowerCase().startsWith('#nith') ? 'nith' : 'haaiah';
activateAngel(initialAngel, { updateHash: false, scroll: false });
loadNithHaiahPortrait();