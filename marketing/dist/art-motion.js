// Decorative motion is local to the visible illustration, never the whole page.
(() => {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  const allowed = () => !preference.matches && !document.body.classList.contains('motion-paused') && !document.hidden;
  const controllers = [];
  const decoded = new Map();
  function loadImage(url) {
    if (!decoded.has(url)) {
      const image = new Image();
      image.src = url;
      decoded.set(url, image.decode());
    }
    return decoded.get(url);
  }

  for (const root of document.querySelectorAll('[data-artwork]')) {
    const button = root.querySelector('[data-art-replay]');
    const animations = new Set();
    let visible = false;
    let ready = false;
    let played = false;
    let timer;
    function animate(target, frames, options) {
      const animation = root.querySelector(target).animate(frames, options);
      animations.add(animation);
      animation.finished.then(() => {
        animation.cancel();
        animations.delete(animation);
      }).catch(() => animations.delete(animation));
    }
    function stop() {
      clearTimeout(timer);
      animations.forEach(animation => animation.cancel());
      animations.clear();
    }
    function schedule() {
      if (root.dataset.artwork === 'podium') return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (visible && ready && allowed()) play();
      }, 6500 + Math.random() * 4500);
    }
    function play(replay = false) {
      if (!ready || !allowed()) return;
      stop();
      const firstPlay = !played;
      played = true;
      root.classList.add('artwork-started');
      if (root.dataset.artwork === 'mischief') {
        animate('.art-eyelid', [
          { transform: 'scaleY(0)', offset: 0 },
          { transform: 'scaleY(1)', offset: .4 },
          { transform: 'scaleY(1)', offset: .58 },
          { transform: 'scaleY(0)', offset: 1 },
        ], { duration: 440, delay: 350, easing: 'ease-in-out', fill: 'both' });
        animate('.art-tail', [
          { transform: 'rotate(0deg)' },
          { transform: 'rotate(-4deg)', offset: .3 },
          { transform: 'rotate(2.5deg)', offset: .65 },
          { transform: 'rotate(0deg)' },
        ], { duration: 2300, easing: 'ease-in-out' });
        schedule();
      } else if (root.dataset.artwork === 'doorways') {
        if (firstPlay || replay) {
          animate('.art-vine-left', [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
            { duration: 3200, easing: 'ease-in-out', fill: 'both' });
          animate('.art-vine-right', [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
            { duration: 2600, delay: 500, easing: 'ease-in-out', fill: 'both' });
        }
        for (let i = 0; i < 3; i++) {
          animate(`.art-star-${i}`, [
            { opacity: 0, transform: 'scale(1)', filter: 'brightness(1)' },
            { opacity: 1, transform: 'scale(1.14)', filter: 'brightness(1.65) drop-shadow(0 0 5px #ffe7a2)', offset: .45 },
            { opacity: 0, transform: 'scale(1)', filter: 'brightness(1)' },
          ], { duration: 1900, delay: 400 + i * 650, easing: 'ease-in-out', fill: 'both' });
        }
        schedule();
      } else if (root.dataset.artwork === 'companion') {
        animate('.art-companion', [
          { transform: 'translateY(0) rotate(0deg)' },
          { transform: 'translateY(2px) rotate(-2deg)', offset: .18 },
          { transform: 'translateY(-16px) rotate(3deg)', offset: .45 },
          { transform: 'translateY(0) rotate(-2deg)', offset: .75 },
          { transform: 'translateY(0) rotate(0deg)' },
        ], { duration: 1500, delay: 600, easing: 'ease-in-out' });
        schedule();
      } else {
        animate('.art-map-reveal', [{ strokeDashoffset: 1 }, { strokeDashoffset: 0 }],
          { duration: 3400, easing: 'ease-in-out', fill: 'both' });
        animate('.art-map', [
          { transform: 'scale(.93) rotate(-3deg)' },
          { transform: 'scale(1.01) rotate(.4deg)', offset: .85 },
          { transform: 'scale(1) rotate(0deg)' },
        ], { duration: 3700, easing: 'ease-out' });
      }
    }
    function refresh() {
      const paused = document.body.classList.contains('motion-paused');
      if (button) {
        button.hidden = !ready || preference.matches;
        button.disabled = paused;
      }
      if (ready && (preference.matches || paused)) {
        // Static mode shows the completed art and must not later rewind it.
        played = true;
        root.classList.add('artwork-started');
      }
      if (!allowed() || !visible) stop();
      else if (ready) {
        if (!played) play();
        else schedule();
      }
    }
    controllers.push(refresh);
    button?.addEventListener('click', () => play(true));
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .45;
        refresh();
      }, { threshold: [0, .45] });
      observer.observe(root.querySelector('.art-stage'));
    }
    const urls = [...root.querySelectorAll('svg image')].map(image => image.getAttribute('href'));
    const companion = root.querySelector('img.art-companion');
    if (companion) urls.push(companion.getAttribute('src'));
    Promise.all([...new Set(urls)].map(loadImage)).then(() => {
      ready = true;
      root.classList.add('artwork-ready');
      refresh();
    }).catch(() => {
      // A missing layer must leave the original illustration usable.
      root.classList.add('artwork-failed');
      stop();
    });
  }
  document.addEventListener('artwork-motion-change', () => controllers.forEach(refresh => refresh()));
  document.addEventListener('visibilitychange', () => controllers.forEach(refresh => refresh()));
  preference.addEventListener('change', () => controllers.forEach(refresh => refresh()));
})();
