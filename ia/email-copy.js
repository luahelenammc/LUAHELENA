(() => {
  const email = 'luahelenammc@gmail.com';

  document.querySelectorAll('a.btn-email[href^="mailto:"]').forEach((button) => {
    const label = button.querySelector('span:last-child');

    const showCopied = () => {
      const original = label ? label.textContent : 'Email';
      button.classList.add('copied');
      if (label) {
        label.textContent = document.documentElement.lang === 'en' ? 'Copied' : 'Copiado';
      }

      window.setTimeout(() => {
        button.classList.remove('copied');
        if (label) label.textContent = original;
      }, 1300);
    };

    button.addEventListener('click', () => {
      if (navigator.clipboard?.writeText) {
        navigator.clipboard.writeText(email).then(showCopied).catch(() => {
          window.prompt('Email:', email);
        });
      } else {
        window.prompt('Email:', email);
      }
      // Do not preventDefault: the existing mailto action must still open.
    });
  });
})();
