(function(){
  const params = new URLSearchParams(location.search);
  const item = params.get('item') || 'item';
  const price = params.get('price') || '0';

  const map = {
    pack: 'Purple Era Digital Pack',
    vip: 'Meet & Greet Pass',
    tee: 'Neon Heart Tee'
  };

  const itemEl = document.querySelector('[data-order-item]');
  const priceEl = document.querySelector('[data-order-price]');
  const statusEl = document.querySelector('[data-order-status]');
  const btn = document.querySelector('[data-simulate-pay]');
  const success = document.querySelector('[data-success]');

  if (itemEl) itemEl.textContent = map[item] || item;
  if (priceEl) priceEl.textContent = String(price);

  function setStatus(s){ if (statusEl) statusEl.textContent = s; }

  if (btn){
    btn.addEventListener('click', () => {
      setStatus('Processing…');
      btn.disabled = true;
      setTimeout(() => {
        setStatus('Complete');
        if (success) success.hidden = false;
        btn.disabled = false;
        success?.scrollIntoView({behavior:'smooth', block:'start'});
      }, 650);
    });
  }
})();
