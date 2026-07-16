(() => {
  // Canonical wording: "sua IA" / "your AI".
  // Discord clipboard value: moon_aurea, without the @ prefix.
  const packetTipPt = 'Baixa um pacote estruturado com meu perfil, escopo, método, entregas, limites e contatos — pronto para você enviar à sua IA, para que ela compreenda meu trabalho com precisão e ajude a avaliar possíveis encaixes profissionais.';
  const packetTipEn = 'Downloads a structured packet with my profile, scope, method, deliverables, boundaries, and contact details — ready for you to share with your AI so it can understand my work accurately and help assess potential professional fit.';

  if (typeof T === 'object' && T.pt && T.en) {
    T.pt['packet.tip'] = packetTipPt;
    T.en['packet.tip'] = packetTipEn;
  }

  document.querySelectorAll('[data-discord]').forEach((button) => {
    button.setAttribute('data-discord', 'moon_aurea');
  });

  if (typeof applyLang === 'function' && typeof getLang === 'function') {
    applyLang(getLang());
  }
})();
