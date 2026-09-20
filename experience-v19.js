document.documentElement.classList.add('motion-ready');

const heroVideo = document.querySelector('.hero-video');
if (heroVideo) {
  heroVideo.muted = true;
  heroVideo.volume = 0;
  heroVideo.removeAttribute('loop');
  const playHero = () => {
    heroVideo.currentTime = 0;
    heroVideo.play().catch(() => {});
  };
  heroVideo.addEventListener('ended', () => setTimeout(playHero, 3000));
  heroVideo.play().catch(() => {});
}

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const motionTargets = document.querySelectorAll('.stat,.skill,.role,.editorial-card,.section-head,.about-grid > div,.contact > *,.showreel-frame');
  motionTargets.forEach((target, index) => {
    target.classList.add('reveal');
    if (target.classList.contains('editorial-card') || target.classList.contains('showreel-frame')) target.classList.add('reveal-project');
    else target.classList.add(index % 2 ? 'reveal-right' : 'reveal-left');
    target.style.setProperty('--reveal-delay', Math.min(index % 4, 3) * 120 + 'ms');
    if (target.classList.contains('editorial-card')) {
      target.style.setProperty('--ambient-delay', (index % 4) * .38 + 's');
    }
  });

  const strongObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      strongObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -5% 0px' });

  motionTargets.forEach((target) => strongObserver.observe(target));

  // Portfolio content must never remain hidden if a mobile browser delays
  // IntersectionObserver callbacks. Keep the entrance animation, then reveal
  // every editorial card as a safe fallback.
  window.setTimeout(() => {
    document.querySelectorAll('.editorial-card').forEach((card) => card.classList.add('is-visible'));
  }, 900);
}
