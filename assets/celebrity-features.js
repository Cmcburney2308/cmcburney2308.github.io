(function(){
  const fanWall = document.querySelector('[data-fan-wall]');
  if (!fanWall) return;
  
  const messages = [
    { name: 'Sarah M.', message: 'Your music got me through tough times. Thank you! 💜', time: '2 hours ago' },
    { name: 'James K.', message: 'Can\'t wait for the Glasgow show! See you there!', time: '5 hours ago' },
    { name: 'Emma L.', message: 'Just discovered your music and I\'m obsessed! 🎵', time: '1 day ago' },
    { name: 'Alex R.', message: 'The new single is on repeat! Absolute fire 🔥', time: '1 day ago' },
    { name: 'Mia T.', message: 'Your voice is incredible! Keep doing what you do ✨', time: '2 days ago' },
    { name: 'Oliver P.', message: 'Been following since day one! So proud of how far you\'ve come 🌟', time: '3 hours ago' },
    { name: 'Sophie W.', message: 'This is the soundtrack to my life right now 💕', time: '4 hours ago' },
    { name: 'Liam H.', message: 'Your lyrics speak to my soul. Thank you for being real', time: '6 hours ago' },
    { name: 'Ava B.', message: 'Manchester show was AMAZING! Best night ever! 🎤', time: '7 hours ago' },
    { name: 'Noah C.', message: 'Can you come to Edinburgh? We need you here! 🏴󠁧󠁢󠁳󠁣󠁴󠁿', time: '8 hours ago' },
    { name: 'Isabella D.', message: 'Your energy is unmatched! Keep shining ⭐', time: '9 hours ago' },
    { name: 'Ethan F.', message: 'Just bought all the merch! Love supporting you 🛍️', time: '10 hours ago' },
    { name: 'Charlotte G.', message: 'You inspire me to chase my dreams 💫', time: '11 hours ago' },
    { name: 'Lucas M.', message: 'The production on your tracks is insane! 🎧', time: '12 hours ago' },
    { name: 'Amelia S.', message: 'Your Instagram stories always make my day 📱', time: '13 hours ago' },
    { name: 'Mason J.', message: 'Switching It is my gym anthem! 💪', time: '14 hours ago' },
    { name: 'Harper K.', message: 'You deserve all the success coming your way! 🏆', time: '15 hours ago' },
    { name: 'Elijah N.', message: 'Your voice gives me chills every time 😍', time: '16 hours ago' },
    { name: 'Evelyn R.', message: 'Can\'t stop listening! You\'re on repeat 24/7 🔁', time: '17 hours ago' },
    { name: 'Logan T.', message: 'The visuals for your latest single are stunning! 🎬', time: '18 hours ago' },
    { name: 'Abigail V.', message: 'You make me believe in music again 🎶', time: '19 hours ago' },
    { name: 'Jackson W.', message: 'Your stage presence is electric! ⚡', time: '20 hours ago' },
    { name: 'Emily Y.', message: 'Thank you for being authentic and real 🙏', time: '21 hours ago' },
    { name: 'Aiden Z.', message: 'Your music helped me through a breakup. Forever grateful 💔➡️💜', time: '22 hours ago' },
    { name: 'Madison A.', message: 'The way you connect with fans is beautiful 🤗', time: '23 hours ago' },
    { name: 'Carter B.', message: 'Your talent is undeniable! Keep rising! 📈', time: '1 day ago' },
    { name: 'Scarlett C.', message: 'I play your songs for my little sister. She loves you! 👧', time: '1 day ago' },
    { name: 'Grayson D.', message: 'The emotion in your voice is everything 😢', time: '1 day ago' },
    { name: 'Lily E.', message: 'You\'re going to be huge! Mark my words 🚀', time: '1 day ago' },
    { name: 'Wyatt F.', message: 'Your music videos are art! 🎨', time: '1 day ago' },
    { name: 'Zoey G.', message: 'Can we get a collab with another artist? 🤝', time: '1 day ago' },
    { name: 'Jack H.', message: 'Your TikToks are hilarious! Love your personality 😂', time: '1 day ago' },
    { name: 'Chloe I.', message: 'The acoustic version hits different 🎸', time: '1 day ago' },
    { name: 'Ryan J.', message: 'You\'re the reason I started making music 🎹', time: '1 day ago' },
    { name: 'Grace K.', message: 'Your fashion sense is iconic! 👗', time: '1 day ago' },
    { name: 'Nathan L.', message: 'The bridge in your new song is perfection! 🎵', time: '2 days ago' },
    { name: 'Victoria M.', message: 'You make pop music cool again! 😎', time: '2 days ago' },
    { name: 'Dylan N.', message: 'Your harmonies are angelic! 👼', time: '2 days ago' },
    { name: 'Hannah O.', message: 'I cry every time I hear your ballads 😭', time: '2 days ago' },
    { name: 'Luke P.', message: 'The choreography in your videos is sick! 💃', time: '2 days ago' },
    { name: 'Addison Q.', message: 'You\'re my comfort artist 🫂', time: '2 days ago' },
    { name: 'Isaac R.', message: 'Your live performances are better than the studio versions! 🎤', time: '2 days ago' },
    { name: 'Nora S.', message: 'The storytelling in your lyrics is beautiful 📖', time: '2 days ago' },
    { name: 'Caleb T.', message: 'You deserve a Grammy! 🏅', time: '2 days ago' },
    { name: 'Layla U.', message: 'Your positive energy is contagious! ☀️', time: '2 days ago' },
    { name: 'Hunter V.', message: 'The production quality keeps getting better! 🎚️', time: '2 days ago' },
    { name: 'Aria W.', message: 'You inspire me to be myself 💖', time: '2 days ago' },
    { name: 'Aaron X.', message: 'Your music is my therapy 🧘', time: '2 days ago' },
    { name: 'Bella Y.', message: 'The way you interact with fans is everything! 💬', time: '2 days ago' },
    { name: 'Christian Z.', message: 'Your growth as an artist is incredible! 📊', time: '3 days ago' },
    { name: 'Stella A.', message: 'You make me want to dance! 💃', time: '3 days ago' },
    { name: 'Landon B.', message: 'Your voice is so unique! One of a kind 🦄', time: '3 days ago' },
    { name: 'Savannah C.', message: 'The melodies stick in my head for days! 🎼', time: '3 days ago' },
    { name: 'Josiah D.', message: 'You\'re changing the game! 🎮', time: '3 days ago' },
    { name: 'Audrey E.', message: 'Your confidence is inspiring! 💪', time: '3 days ago' },
    { name: 'Lincoln F.', message: 'The bass in your tracks is fire! 🔊', time: '3 days ago' },
    { name: 'Brooklyn G.', message: 'You make me feel less alone 🤝', time: '3 days ago' },
    { name: 'Ezra H.', message: 'Your work ethic is admirable! 💼', time: '3 days ago' },
    { name: 'Claire I.', message: 'The visuals match the vibe perfectly! 🎥', time: '3 days ago' },
    { name: 'Maverick J.', message: 'You\'re the future of pop music! 🔮', time: '3 days ago' },
    { name: 'Penelope K.', message: 'Your smile lights up the stage! 😊', time: '3 days ago' },
    { name: 'Easton L.', message: 'The drops in your songs are insane! 🎧', time: '3 days ago' },
    { name: 'Skylar M.', message: 'You make me believe in love again! 💕', time: '3 days ago' },
    { name: 'Colton N.', message: 'Your range is incredible! 🎤', time: '3 days ago' },
    { name: 'Violet O.', message: 'The way you tell stories through music is magic ✨', time: '4 days ago' },
    { name: 'Jaxon P.', message: 'You\'re my favorite artist right now! 🌟', time: '4 days ago' },
    { name: 'Aurora Q.', message: 'Your music videos deserve awards! 🏆', time: '4 days ago' },
    { name: 'Bentley R.', message: 'The energy you bring is unmatched! ⚡', time: '4 days ago' },
    { name: 'Hazel S.', message: 'You make me proud to be a fan! 🙌', time: '4 days ago' },
    { name: 'Axel T.', message: 'Your beats are addictive! 🥁', time: '4 days ago' },
    { name: 'Lucy U.', message: 'The emotion you convey is powerful! 💪', time: '4 days ago' },
    { name: 'Declan V.', message: 'You\'re going places! Watch out world! 🌍', time: '4 days ago' },
    { name: 'Ellie W.', message: 'Your authenticity shines through! ✨', time: '4 days ago' },
    { name: 'Silas X.', message: 'The mixing on your tracks is perfect! 🎚️', time: '4 days ago' },
    { name: 'Paisley Y.', message: 'You make me want to sing along! 🎤', time: '4 days ago' },
    { name: 'Theo Z.', message: 'Your journey is inspiring! Keep going! 🚶', time: '4 days ago' },
    { name: 'Ruby A.', message: 'The hooks in your songs are catchy! 🪝', time: '5 days ago' },
    { name: 'Asher B.', message: 'You deserve all the recognition! 👏', time: '5 days ago' },
    { name: 'Ivy C.', message: 'Your music makes me feel alive! 🌱', time: '5 days ago' },
    { name: 'Miles D.', message: 'The production value is top tier! 🎬', time: '5 days ago' },
    { name: 'Elena E.', message: 'You\'re a breath of fresh air! 🌬️', time: '5 days ago' },
    { name: 'Kai F.', message: 'Your creativity knows no bounds! 🎨', time: '5 days ago' },
    { name: 'Piper G.', message: 'The way you perform is captivating! 👀', time: '5 days ago' },
    { name: 'Beau H.', message: 'You make music that matters! 💯', time: '5 days ago' },
    { name: 'Willow I.', message: 'Your passion is evident in every note! 🎵', time: '5 days ago' },
    { name: 'Sawyer J.', message: 'You\'re building something special! 🏗️', time: '5 days ago' },
    { name: 'Nova K.', message: 'The vibes are immaculate! ✨', time: '5 days ago' },
    { name: 'Rhett L.', message: 'You make me feel understood! 🤗', time: '5 days ago' },
    { name: 'Athena M.', message: 'Your talent is a gift! 🎁', time: '5 days ago' },
    { name: 'Knox N.', message: 'The transitions in your songs are smooth! 🌊', time: '5 days ago' },
    { name: 'Iris O.', message: 'You bring joy to so many people! 😊', time: '5 days ago' },
    { name: 'River P.', message: 'Your music is timeless! ⏰', time: '5 days ago' },
    { name: 'Quinn Q.', message: 'The layers in your production are amazing! 🎹', time: '6 days ago' },
    { name: 'Phoenix R.', message: 'You\'re rising like your name! 🔥', time: '6 days ago' },
    { name: 'Sage S.', message: 'Your wisdom shows in your lyrics! 📚', time: '6 days ago' },
    { name: 'Rowan T.', message: 'You make me believe in dreams! 💭', time: '6 days ago' }
  ];
  
  let currentIndex = 0;
  
  function renderFanWall() {
    const displayMessages = [];
    for (let i = 0; i < 5; i++) {
      displayMessages.push(messages[(currentIndex + i) % messages.length]);
    }
    
    fanWall.innerHTML = displayMessages.map(msg => `
      <div class="fan-message">
        <div class="fan-avatar">${msg.name.charAt(0)}</div>
        <div class="fan-content">
          <div class="fan-header">
            <strong>${msg.name}</strong>
            <span class="fan-time">${msg.time}</span>
          </div>
          <p>${msg.message}</p>
        </div>
      </div>
    `).join('');
    
    currentIndex = (currentIndex + 1) % messages.length;
  }
  
  renderFanWall();
  setInterval(renderFanWall, 60000);
})();

(function(){
  const statusEl = document.querySelector('[data-live-status]');
  if (!statusEl) return;
  
  const isOnline = false;
  
  if (isOnline) {
    statusEl.innerHTML = '<span class="status-dot online"></span> Online now';
    statusEl.classList.add('active');
  } else {
    statusEl.innerHTML = '<span class="status-dot"></span> Last seen recently';
  }
})();

(function(){
  const nowPlaying = document.querySelector('[data-now-playing]');
  if (!nowPlaying) return;
  
  const track = {
    title: 'Switching It (Instrumental)',
    plays: '1.2K',
    isPlaying: false
  };
  
  nowPlaying.innerHTML = `
    <div class="now-playing-content">
      <div class="equalizer ${track.isPlaying ? 'active' : ''}">
        <span></span><span></span><span></span>
      </div>
      <div>
        <strong>${track.title}</strong>
        <p class="note" style="margin:0">${track.plays} plays this week</p>
      </div>
    </div>
  `;
})();

(function(){
  const countdownEl = document.querySelector('[data-event-countdown]');
  if (!countdownEl) return;
  
  const eventDate = new Date('2026-03-08T19:30:00').getTime();
  
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = eventDate - now;
    
    if (distance < 0) {
      countdownEl.innerHTML = '<strong>Event started!</strong>';
      return;
    }
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    countdownEl.innerHTML = `
      <div class="countdown-grid">
        <div class="countdown-item">
          <strong>${days}</strong>
          <span>Days</span>
        </div>
        <div class="countdown-item">
          <strong>${hours}</strong>
          <span>Hours</span>
        </div>
        <div class="countdown-item">
          <strong>${minutes}</strong>
          <span>Mins</span>
        </div>
      </div>
    `;
  }
  
  updateCountdown();
  setInterval(updateCountdown, 60000);
})();

(function(){
  const trendingItems = document.querySelectorAll('[data-trending]');
  trendingItems.forEach(item => {
    const badge = document.createElement('span');
    badge.className = 'trending-badge';
    badge.innerHTML = '🔥 Trending';
    item.querySelector('.kicker').appendChild(badge);
  });
})();

(function(){
  const feedEl = document.querySelector('[data-social-feed]');
  if (!feedEl) return;
  
  const posts = [
    { platform: 'Instagram', content: 'Studio vibes today ✨', likes: 234, time: '3h' },
    { platform: 'TikTok', content: 'New dance challenge coming soon!', likes: 567, time: '6h' },
    { platform: 'Twitter', content: 'Thank you for 300+ followers! 💜', likes: 89, time: '1d' }
  ];
  
  feedEl.innerHTML = posts.map(post => `
    <div class="social-post">
      <div class="social-post-header">
        <strong>${post.platform}</strong>
        <span class="note">${post.time} ago</span>
      </div>
      <p class="note" style="margin:.5rem 0">${post.content}</p>
      <div class="social-post-footer">
        <span>❤️ ${post.likes}</span>
      </div>
    </div>
  `).join('');
})();

(function(){
  const exclusiveContent = document.querySelectorAll('[data-exclusive]');
  
  exclusiveContent.forEach(el => {
    el.addEventListener('click', function(e) {
      if (this.classList.contains('unlocked')) {
        if (e.target.tagName === 'IMG') {
          openImageModal(e.target.src);
        }
        return;
      }
      
      this.classList.add('unlocking');
      setTimeout(() => {
        this.classList.remove('unlocking');
        this.classList.add('unlocked');
      }, 800);
    });
  });
  
  function openImageModal(src) {
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
      <div class="image-modal-backdrop"></div>
      <div class="image-modal-content">
        <button class="image-modal-close" aria-label="Close">&times;</button>
        <img src="${src}" alt="Exclusive content enlarged" />
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    setTimeout(() => modal.classList.add('active'), 10);
    
    const close = () => {
      modal.classList.remove('active');
      setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = '';
      }, 300);
    };
    
    modal.querySelector('.image-modal-close').addEventListener('click', close);
    modal.querySelector('.image-modal-backdrop').addEventListener('click', close);
    
    const escHandler = (e) => {
      if (e.key === 'Escape') {
        close();
        document.removeEventListener('keydown', escHandler);
      }
    };
    document.addEventListener('keydown', escHandler);
  }
})();

(function(){
  const viewCounter = document.querySelector('[data-view-count]');
  if (!viewCounter) return;
  
  let views = parseInt(localStorage.getItem('casey_page_views') || '0');
  views += 1;
  localStorage.setItem('casey_page_views', views);
  
  const totalViews = views + 1247;
  viewCounter.textContent = totalViews.toLocaleString();
})();
