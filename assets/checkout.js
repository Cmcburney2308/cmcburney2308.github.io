(function(){
  const params = new URLSearchParams(location.search);
  const item = params.get('item') || 'item';
  const price = params.get('price') || '0';
  const items = params.get('items') || '';
  const total = params.get('total') || price;

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

  if (itemEl) {
    if (items) {
      itemEl.textContent = items;
    } else {
      itemEl.textContent = map[item] || item;
    }
  }
  if (priceEl) priceEl.textContent = String(total);

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
        
        if (items) {
          try {
            localStorage.removeItem('casey_cart');
          } catch(e){}
        }
      }, 650);
    });
  }
})();
