(function(){
  const nav = document.querySelector('[data-nav]');
  const navBtn = document.querySelector('[data-nav-toggle]');
  if (nav && navBtn) {
    navBtn.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      navBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a) return;
      if (nav.classList.contains('open')) {
        nav.classList.remove('open');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });

    document.addEventListener('click', (e) => {
      if (!nav.classList.contains('open')) return;
      const inside = e.target.closest('[data-nav]') || e.target.closest('[data-nav-toggle]');
      if (!inside) {
        nav.classList.remove('open');
        navBtn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const counters = document.querySelectorAll('[data-count-to]');
  if (counters.length) {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = (el) => {
      const target = Number(el.getAttribute('data-count-to') || 0);
      const duration = prefersReduced ? 1 : 900;
      const start = performance.now();
      const from = 0;
      const step = (t) => {
        const p = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = Math.round(from + (target - from) * eased);
        el.textContent = String(val);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });

    counters.forEach(el => io.observe(el));
  }

  const audio = document.querySelector('audio[data-audio]');
  const btn = document.querySelector('[data-audio-btn]');
  const range = document.querySelector('[data-audio-range]');
  const time = document.querySelector('[data-audio-time]');

  const fmt = (s) => {
    if (!Number.isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2,'0')}`;
  };

  function setBtnLabel(playing){
    if (!btn) return;
    btn.textContent = playing ? 'Pause' : 'Play';
    btn.setAttribute('aria-pressed', playing ? 'true' : 'false');
  }

  if (audio && btn && range && time) {
    setBtnLabel(false);

    btn.addEventListener('click', async () => {
      try {
        if (audio.paused) {
          await audio.play();
          setBtnLabel(true);
        } else {
          audio.pause();
          setBtnLabel(false);
        }
      } catch (e) {
        console.warn(e);
      }
    });

    audio.addEventListener('loadedmetadata', () => {
      range.min = 0;
      range.max = audio.duration || 30;
      range.value = 0;
      time.textContent = `${fmt(0)} / ${fmt(audio.duration)}`;
    });

    audio.addEventListener('timeupdate', () => {
      if (!range.matches(':active')) range.value = audio.currentTime;
      time.textContent = `${fmt(audio.currentTime)} / ${fmt(audio.duration)}`;
    });

    audio.addEventListener('ended', () => {
      setBtnLabel(false);
    });

    range.addEventListener('input', () => {
      audio.currentTime = Number(range.value || 0);
    });
  }
})();


(function(){
  const root = document.documentElement;
  const btn = document.querySelector('[data-theme-toggle]');

  function preferred(){
    try{
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }catch(e){ return 'dark'; }
  }

  function apply(theme){
    root.dataset.theme = theme;
    try{ localStorage.setItem('theme', theme); }catch(e){}
    if (btn){
      const isLight = theme === 'light';
      btn.setAttribute('aria-pressed', String(isLight));
      btn.querySelector('[data-theme-label]')?.replaceChildren(document.createTextNode(isLight ? 'Light' : 'Dark'));
      btn.querySelector('[data-theme-icon]')?.replaceChildren(document.createTextNode(isLight ? '☀' : '☾'));
    }
  }

  const saved = (() => { try { return localStorage.getItem('theme'); } catch(e){ return null; } })();
  apply(saved || preferred());

  if (btn){
    btn.addEventListener('click', () => {
      const next = (root.dataset.theme === 'light') ? 'dark' : 'light';
      apply(next);
    });
  }
})();
