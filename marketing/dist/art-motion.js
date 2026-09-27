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
      if (root.dataset.artwork !== 'mischief') return;
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (visible && ready && allowed()) play();
      }, 6500 + Math.random() * 4500);
    }
    function play() {
      if (!ready || !allowed()) return;
      stop();
      played = true;
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
      button.hidden = !ready || preference.matches;
      button.disabled = document.body.classList.contains('motion-paused');
      if (!allowed() || !visible) stop();
      else if (ready) {
        if (!played) play();
        else schedule();
      }
    }
    controllers.push(refresh);
    button.addEventListener('click', play);
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        visible = entries[0].isIntersecting && entries[0].intersectionRatio >= .45;
        refresh();
      }, { threshold: [0, .45] });
      observer.observe(root.querySelector('.art-stage'));
    }
    const urls = [...root.querySelectorAll('svg image')].map(image => image.getAttribute('href'));
    Promise.all([...new Set(urls)].map(loadImage)).then(() => {
      ready = true;
      root.classList.add('artwork-ready');
      refresh();
    }).catch(() => {
      // A missing layer must leave the original illustration usable.
      stop();
    });
  }
  document.addEventListener('artwork-motion-change', () => controllers.forEach(refresh => refresh()));
  document.addEventListener('visibilitychange', () => controllers.forEach(refresh => refresh()));
  preference.addEventListener('change', () => controllers.forEach(refresh => refresh()));
})();
