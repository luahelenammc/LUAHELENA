const matrix = document.getElementById('nameMatrix');
for (let i = 1; i <= 72; i += 1) {
  const dot = document.createElement('span');
  dot.className = `name-dot${i === 25 ? ' active' : ''}`;
  dot.setAttribute('aria-hidden', 'true');
  matrix.appendChild(dot);
}

const progress = document.getElementById('progress');
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const ratio = max > 0 ? window.scrollY / max : 0;
  progress.style.width = `${Math.min(100, Math.max(0, ratio * 100))}%`;
};
updateProgress();
window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('resize', updateProgress);

const copyButton = document.getElementById('copyName');
const copyStatus = document.getElementById('copyStatus');
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
