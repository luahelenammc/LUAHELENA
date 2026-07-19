(() => {
  'use strict';

  const body = document.body;
  if (!body || body.classList.contains('vibecurb-beta')) return;
  body.classList.add('vibecurb-beta');

  const html = document.documentElement;
  const currentLang = () => html.lang === 'en' ? 'en' : 'pt';
  const copy = {
    pt: {
      badge: 'BETA DE DESIGN',
      field: 'CAMPO DE CONTEXTO',
      axisA: 'PESSOAS',
      axisB: 'CONHECIMENTO',
      axisC: 'DECISÃO',
      title: 'Lua Helena Moon — IA, papéis e contexto institucional · Beta V7'
    },
    en: {
      badge: 'DESIGN BETA',
      field: 'CONTEXT FIELD',
      axisA: 'PEOPLE',
      axisB: 'KNOWLEDGE',
      axisC: 'DECISION',
      title: 'Lua Helena Moon — AI, roles, and institutional context · V7 Beta'
    }
  };

  const nav = document.querySelector('.nav');
  if (nav) {
    const progress = document.createElement('div');
    progress.className = 'vibe-scroll-progress';
    progress.setAttribute('aria-hidden', 'true');
    progress.innerHTML = '<span></span>';
    nav.append(progress);
  }

  const badge = document.createElement('a');
  badge.className = 'vibe-beta-badge';
  badge.href = '#top';
  badge.setAttribute('aria-label', 'Voltar ao topo');
  badge.innerHTML = '<span class="vibe-beta-dot"></span><span data-vibe-copy="badge">BETA DE DESIGN</span><strong>07</strong>';
  body.append(badge);

  const heroField = document.querySelector('.v4-deco');
  if (heroField) {
    heroField.classList.add('vibe-context-field');
    const readout = document.createElement('div');
    readout.className = 'vibe-field-readout';
    readout.innerHTML = `
      <div class="vibe-field-head"><span data-vibe-copy="field">CAMPO DE CONTEXTO</span><b>07—BETA</b></div>
      <div class="vibe-field-axis"><span data-vibe-copy="axisA">PESSOAS</span><i></i><span data-vibe-copy="axisB">CONHECIMENTO</span><i></i><span data-vibe-copy="axisC">DECISÃO</span></div>
    `;
    heroField.append(readout);
  }

  document.querySelectorAll('main section[id]').forEach((section, index) => {
    section.dataset.vibeIndex = String(index).padStart(2, '0');
  });

  const navLinks = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  navLinks.forEach((link, index) => {
    link.style.setProperty('--nav-index', `'${String(index).padStart(2, '0')}'`);
  });

  const updateCopy = () => {
    const lang = currentLang();
    document.querySelectorAll('[data-vibe-copy]').forEach((node) => {
      const key = node.getAttribute('data-vibe-copy');
      if (copy[lang][key]) node.textContent = copy[lang][key];
    });
    document.title = copy[lang].title;
    badge.setAttribute('aria-label', lang === 'en' ? 'Back to top' : 'Voltar ao topo');
  };

  const updateProgress = () => {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    const value = Math.min(1, Math.max(0, scrollY / max));
    html.style.setProperty('--vibe-progress', `${(value * 100).toFixed(2)}%`);
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    const activeSection = visible.target.id;
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${activeSection}`;
      link.classList.toggle('is-current', isActive);
      if (isActive) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-28% 0px -58% 0px', threshold: [0, .1, .35, .65] });

  document.querySelectorAll('main section[id]').forEach((section) => sectionObserver.observe(section));

  if (heroField && matchMedia('(pointer:fine)').matches) {
    heroField.addEventListener('pointermove', (event) => {
      const box = heroField.getBoundingClientRect();
      const x = ((event.clientX - box.left) / box.width - .5) * 2;
      const y = ((event.clientY - box.top) / box.height - .5) * 2;
      heroField.style.setProperty('--field-x', x.toFixed(3));
      heroField.style.setProperty('--field-y', y.toFixed(3));
    }, { passive: true });
    heroField.addEventListener('pointerleave', () => {
      heroField.style.setProperty('--field-x', '0');
      heroField.style.setProperty('--field-y', '0');
    }, { passive: true });
  }

  new MutationObserver(updateCopy).observe(html, { attributes: true, attributeFilter: ['lang'] });
  addEventListener('scroll', updateProgress, { passive: true });
  addEventListener('resize', updateProgress, { passive: true });
  updateCopy();
  updateProgress();
})();
