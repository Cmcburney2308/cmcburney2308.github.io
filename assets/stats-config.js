const STATS_CONFIG = {
  monthlyListeners: 450,
  socialFollowers: 307,
  citiesTouring: 5,
  singlesReleased: 2,
  newsletterThisMonth: 85
};

document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('[data-count-to]');
  if (counters.length > 0) {
    const values = [
      STATS_CONFIG.monthlyListeners,
      STATS_CONFIG.socialFollowers,
      STATS_CONFIG.citiesTouring,
      STATS_CONFIG.singlesReleased
    ];
    
    counters.forEach((el, idx) => {
      if (values[idx] !== undefined) {
        el.setAttribute('data-count-to', values[idx]);
      }
    });
  }
  
  const newsletterText = document.querySelector('.social-proof-text strong');
  if (newsletterText) {
    newsletterText.textContent = `${STATS_CONFIG.newsletterThisMonth}+`;
  }
  
  const achievementBadges = document.querySelectorAll('.achievement-badge');
  achievementBadges.forEach(badge => {
    if (badge.textContent.includes('Followers')) {
      const roundedCount = Math.floor(STATS_CONFIG.socialFollowers / 100) * 100;
      badge.innerHTML = `
        <svg width="18" height="18"><use href="#icon-trophy"/></svg>
        ${roundedCount}+ Followers
      `;
    }
  });
});