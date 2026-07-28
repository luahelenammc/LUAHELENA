const matrix = document.getElementById('nameMatrix');
if (matrix) {
  for (let i = 1; i <= 72; i += 1) {
    const dot = document.createElement('span');
    dot.className = `name-dot${i === 25 ? ' active' : ''}`;
    dot.setAttribute('aria-hidden', 'true');
    matrix.appendChild(dot);
  }
}

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

const copyButton = document.getElementById('copyName');
const copyStatus = document.getElementById('copyStatus');
if (copyButton && copyStatus) {
  copyButton.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('נתה');
      copyButton.textContent = 'Copiado ✓';
      copyStatus.textContent = 'O trigrama נתה foi copiado.';
    } catch (error) {
      copyStatus.textContent = 'Não foi possível copiar automaticamente.';
    }
    window.setTimeout(() => { copyButton.textContent = 'Copiar נתה'; }, 1800);
  });
}

const loadPortraitStyles = () => {
  const href = 'assets/nith-haiah-portrait.css';
  if (document.querySelector(`link[href="${href}"]`)) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = href;
  document.head.appendChild(link);
};

const loadNithHaiahPortrait = async () => {
  const host = document.querySelector('.totem');
  if (!host) return;

  host.classList.add('portrait-host');
  host.setAttribute('aria-busy', 'true');
  loadPortraitStyles();

  const parts = [
    'assets/nith-haiah-portrait/part00.b64',
    'assets/nith-haiah-portrait/part01.b64',
    'assets/nith-haiah-portrait/part02.b64'
  ];

  try {
    const responses = await Promise.all(parts.map((path) => fetch(path, { cache: 'force-cache' })));
    const failed = responses.find((response) => !response.ok);
    if (failed) throw new Error(`Falha ao carregar retrato: HTTP ${failed.status}`);

    const encoded = (await Promise.all(responses.map((response) => response.text())))
      .join('')
      .replace(/\s+/g, '');

    const figure = document.createElement('figure');
    figure.className = 'portrait-figure';

    const image = document.createElement('img');
    image.width = 480;
    image.height = 600;
    image.loading = 'lazy';
    image.decoding = 'async';
    image.alt = 'Reconstituição visual autoral de Nith-Haiah como figura angelical contemplativa: vestes marfim e verde-esmeralda, livro aberto, lâmpada, asas dourado-lilás, halo com os 72 nomes e uma alusão distante à travessia do mar.';
    image.src = `data:image/webp;base64,${encoded}`;

    const caption = document.createElement('figcaption');
    caption.innerHTML = '<strong>Reconstituição visual autoral · 2026</strong>Síntese historiograficamente informada das camadas de Lenain, da tradição dos 72 nomes e da Qabalah hermética. Não pretende ser uma iconografia antiga documentada.';

    figure.append(image, caption);
    host.replaceChildren(figure);
    host.removeAttribute('aria-busy');
  } catch (error) {
    console.error(error);
    host.innerHTML = '<p class="portrait-error">A reconstituição visual não pôde ser carregada. O texto historiográfico permanece disponível ao lado.</p>';
    host.removeAttribute('aria-busy');
  }
};

const revealItems = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add('visible'));
}

loadNithHaiahPortrait();
