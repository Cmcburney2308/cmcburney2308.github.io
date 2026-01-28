(function(){
  const listEl = document.querySelector('[data-tour-list]');
  const filterEl = document.querySelector('[data-tour-filter]');
  const nextEl = document.querySelector('[data-next-show]');
  const countdownEl = document.querySelector('[data-countdown]');

  if (!listEl) return;

  const photoFiles = ["IMG-20260127-WA0018.jpg", "IMG-20260127-WA0019.jpg", "IMG-20260127-WA0020.jpg", "IMG-20260127-WA0021.jpg", "IMG-20260127-WA0022.jpg", "IMG-20260127-WA0023.jpg", "IMG-20260127-WA0024.jpg", "IMG-20260127-WA0025.jpg", "IMG-20260127-WA0026.jpg", "475784617-122180895932252610-40630698574932899-n.jpg-2000x1999.jpeg", "476639621-122182880882252610-4699561365073651023-n.jpg-2000x2000.jpeg"];

const photoQuips = [
    'Album Art slays',
    'Christmas Vibes',
    'Loving the holiday spirit',
    'Studio spellwork',
    'Main character lighting',
    'Nights out <3',
    'Mono is so the color <3',
    'Vibe check: passed',
    'The outfit tho!',
    'Studio shooting vibes',
    'Caught mid-moment'
  ];

  const tours = [
    { date: '2026-03-08T19:30:00', city: 'Glasgow', venue: 'Neon Room', region: 'Scotland', note: 'All-ages (16+ with ID)' },
    { date: '2026-03-15T19:00:00', city: 'Manchester', venue: 'The Static Hall', region: 'England', note: 'Support act: local DJ set' },
    { date: '2026-03-22T20:00:00', city: 'Birmingham', venue: 'Pulse Theatre', region: 'England', note: 'Merch pop-up before doors' },
    { date: '2026-03-29T19:30:00', city: 'London', venue: 'Riverlight Studio', region: 'England', note: 'Filming night (consent signage)' },
    { date: '2026-04-05T19:00:00', city: 'Cardiff', venue: 'Skyline Warehouse', region: 'Wales', note: 'Student tickets available' },
  ].map(t => ({...t, ts: new Date(t.date).getTime()})).sort((a,b) => a.ts - b.ts);

  const regions = ['All', ...Array.from(new Set(tours.map(t => t.region)))];

  function fmtDate(ts){
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { weekday:'short', year:'numeric', month:'short', day:'numeric' });
  }

  function render(){
    const region = filterEl ? filterEl.value : 'All';
    const now = Date.now();

    const filtered = tours.filter(t => region === 'All' ? true : t.region === region);

    listEl.innerHTML = '';
    filtered.forEach(t => {
      const isPast = t.ts < now;
      const card = document.createElement('article');
      card.className = 'card panel';
      card.innerHTML = `
        <div class="kicker">${isPast ? 'Completed' : 'Upcoming'} • ${t.region}</div>
        <h3 style="margin:.5rem 0 .35rem; font-size:1.15rem">${t.city} — ${t.venue}</h3>
        <p style="margin:0; color: var(--muted)"><strong>${fmtDate(t.ts)}</strong> • Doors 7pm</p>
        <p style="margin:.55rem 0 0; color: var(--muted)">${t.note}</p>
        <div style="margin-top:12px; display:flex; gap:10px; flex-wrap:wrap">
          <a class="btn" href="#" onclick="return false;">Ticket Link</a>
          <button class="btn" type="button" data-remind="${t.ts}">Remind me</button>
        </div>
      `;
      listEl.appendChild(card);
    });

    const next = tours.find(t => t.ts > Date.now());
    if (nextEl) nextEl.textContent = next ? `${next.city} — ${fmtDate(next.ts)}` : 'No upcoming dates';

    updateCountdown();
  }

  function updateCountdown(){
    const next = tours.find(t => t.ts > Date.now());
    if (!countdownEl) return;
    if (!next) { countdownEl.textContent = '-'; return; }

    const diff = Math.max(0, next.ts - Date.now());
    const totalSeconds = Math.floor(diff / 1000);
    const days = Math.floor(totalSeconds / (3600*24));
    const hours = Math.floor((totalSeconds % (3600*24)) / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);

    countdownEl.textContent = `${days}d ${hours}h ${mins}m`;
  }

  if (filterEl) {
    filterEl.innerHTML = '';
    regions.forEach(r => {
      const opt = document.createElement('option');
      opt.value = r;
      opt.textContent = r;
      filterEl.appendChild(opt);
    });
    filterEl.addEventListener('change', render);
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-remind]');
    if (!btn) return;
    const ts = btn.getAttribute('data-remind');
    try {
      const key = 'casey_mag_reminders';
      const cur = JSON.parse(localStorage.getItem(key) || '[]');
      if (!cur.includes(ts)) cur.push(ts);
      localStorage.setItem(key, JSON.stringify(cur));
      btn.textContent = 'Saved ✓';
      btn.disabled = true;
    } catch(err) {
      console.warn(err);
    }
  });
  const track = document.querySelector('[data-photo-track]');
  const quipEl = document.querySelector('[data-photo-quip]');
  const marquee = document.querySelector('.photo-marquee');

  if (track && Array.isArray(photoFiles) && photoFiles.length) {
    const twice = photoFiles.concat(photoFiles);
    track.innerHTML = twice.map(fn => `
      <img src="assets/img/${fn}" alt="Tour photo" loading="lazy" />
    `).join('');

    let lastIdx = -1;
    function tick(){
      if (!marquee || !quipEl) return;
      const imgs = track.querySelectorAll('img');
      if (!imgs.length) return;

      const m = marquee.getBoundingClientRect();
      const center = (m.top + m.bottom) / 2;
      let bestI = 0;
      let bestD = Infinity;

      imgs.forEach((img, i) => {
        const r = img.getBoundingClientRect();
        const c = (r.top + r.bottom) / 2;
        const d = Math.abs(c - center);
        if (d < bestD){ bestD = d; bestI = i; }
      });

      const idx = bestI % photoFiles.length;
      if (idx !== lastIdx){
        const txt = photoQuips[idx] || 'On tour';
        quipEl.querySelector('span:last-child')?.replaceChildren(document.createTextNode(txt));
        quipEl.dataset.bop = '1';
        setTimeout(() => { quipEl.dataset.bop = '0'; }, 220);
        lastIdx = idx;
      }
      requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
  }




  setInterval(updateCountdown, 30_000);
  render();
})();
