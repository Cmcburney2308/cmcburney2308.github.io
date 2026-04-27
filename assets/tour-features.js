(function(){
  const viewerEl = document.querySelector('[data-tour-views]');
  if (!viewerEl) return;
  
  let baseViews = 1247;
  
  function updateViewers() {
    const change = Math.floor(Math.random() * 20) - 10;
    baseViews = Math.max(800, Math.min(2000, baseViews + change));
    viewerEl.textContent = baseViews.toLocaleString();
  }
  
  setInterval(updateViewers, 10000);
})();

(function(){
  const totalShows = document.querySelector('[data-total-shows]');
  const totalCities = document.querySelector('[data-total-cities]');
  const ticketsSold = document.querySelector('[data-tickets-sold]');
  
  if (!totalShows || !totalCities || !ticketsSold) return;
  
  let currentTickets = 0;
  const targetTickets = 847;
  
  function animateTickets() {
    if (currentTickets < targetTickets) {
      currentTickets += Math.ceil((targetTickets - currentTickets) / 20);
      ticketsSold.textContent = currentTickets.toLocaleString();
      requestAnimationFrame(animateTickets);
    } else {
      ticketsSold.textContent = targetTickets.toLocaleString();
    }
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTickets();
        observer.unobserve(entry.target);
      }
    });
  });
  
  observer.observe(ticketsSold);
})();

(function(){
  const viewButtons = document.querySelectorAll('[data-view-mode]');
  const tourList = document.querySelector('[data-tour-list]');
  
  if (!tourList || viewButtons.length === 0) return;
  
  viewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const mode = this.getAttribute('data-view-mode');
      
      viewButtons.forEach(b => b.style.opacity = '0.6');
      this.style.opacity = '1';
      
      if (mode === 'list') {
        tourList.classList.remove('grid-3');
        tourList.classList.add('tour-list-view');
      } else {
        tourList.classList.add('grid-3');
        tourList.classList.remove('tour-list-view');
      }
    });
  });
})();

(function(){
  const emailInput = document.querySelector('[data-tour-notify-email]');
  const submitBtn = document.querySelector('[data-tour-notify-submit]');
  const statusEl = document.querySelector('[data-tour-notify-status]');
  
  if (!emailInput || !submitBtn || !statusEl) return;
  
  submitBtn.addEventListener('click', () => {
    const email = emailInput.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      statusEl.textContent = 'Please enter a valid email address';
      statusEl.style.color = 'var(--accent2)';
      return;
    }
    
    submitBtn.disabled = true;
    submitBtn.textContent = 'Subscribing...';
    
    setTimeout(() => {
      const result = window.notifications.tourNotification(email);
      
      if (result.success) {
        statusEl.textContent = '✓ ' + result.message;
        statusEl.style.color = 'var(--accent)';
        emailInput.value = '';
        submitBtn.textContent = 'Subscribed ✓';
        
        setTimeout(() => {
          submitBtn.textContent = 'Notify Me';
          submitBtn.disabled = false;
          statusEl.textContent = '';
        }, 3000);
      } else {
        statusEl.textContent = result.message;
        statusEl.style.color = 'var(--muted)';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Notify Me';
      }
    }, 600);
  });
  
  emailInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      submitBtn.click();
    }
  });
})();

(function(){
  const checkInterval = setInterval(() => {
    const tourCards = document.querySelectorAll('[data-tour-list] .card');
    
    if (tourCards.length > 0) {
      clearInterval(checkInterval);
      
      tourCards.forEach((card, index) => {
        const availabilities = [
          { status: 'selling-fast', text: '🔥 Selling Fast', color: 'var(--accent2)' },
          { status: 'available', text: '✓ Available', color: 'var(--accent)' },
          { status: 'few-left', text: '⚠️ Few Left', color: '#fbbf24' },
          { status: 'available', text: '✓ Available', color: 'var(--accent)' },
          { status: 'available', text: '✓ Available', color: 'var(--accent)' }
        ];
        
        const availability = availabilities[index % availabilities.length];
        
        const badge = document.createElement('span');
        badge.className = 'availability-badge';
        badge.textContent = availability.text;
        badge.style.color = availability.color;
        badge.style.fontSize = '.85rem';
        badge.style.fontWeight = '700';
        badge.style.marginTop = '8px';
        badge.style.display = 'inline-block';
        
        const kicker = card.querySelector('.kicker');
        if (kicker) {
          kicker.appendChild(badge);
        }
      });
    }
  }, 100);
})();

(function(){
  const links = document.querySelectorAll('a[href="#dates"]');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const tourList = document.querySelector('[data-tour-list]');
      if (tourList) {
        tourList.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
