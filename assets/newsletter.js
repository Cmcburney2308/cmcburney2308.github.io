(function(){
  const form = document.querySelector('[data-newsletter-form]');
  if (!form) return;

  const input = document.querySelector('[data-newsletter-email]');
  const status = document.querySelector('[data-newsletter-status]');
  const btn = document.querySelector('[data-newsletter-submit]');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const email = input.value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      status.textContent = 'Please enter a valid email';
      status.style.color = 'var(--accent2)';
      return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Subscribing...';
    
    setTimeout(() => {
      const result = window.notifications.newsletter(email);
      
      if (result.success) {
        status.textContent = result.message;
        status.style.color = 'var(--accent)';
        input.value = '';
        btn.textContent = 'Subscribed ✓';
        
        setTimeout(() => {
          btn.textContent = 'Subscribe';
          btn.disabled = false;
          status.textContent = '';
        }, 3000);
      } else {
        status.textContent = result.message;
        status.style.color = 'var(--muted)';
        btn.disabled = false;
        btn.textContent = 'Subscribe';
      }
    }, 600);
  });
})();