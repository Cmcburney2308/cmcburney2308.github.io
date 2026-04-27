(function(){
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }
  
  setTimeout(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, 3000);
})();

function sendNotification(title, options = {}) {
  if (!('Notification' in window)) {
    console.log('Notifications not supported');
    return;
  }
  
  if (Notification.permission === 'granted') {
    const notification = new Notification(title, {
      icon: 'assets/img/475784617-122180895932252610-40630698574932899-n.jpg-2000x1999.jpeg',
      badge: 'assets/img/475784617-122180895932252610-40630698574932899-n.jpg-2000x1999.jpeg',
      ...options
    });
    
    setTimeout(() => notification.close(), 5000);
    
    return notification;
  } else if (Notification.permission === 'default') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        sendNotification(title, options);
      }
    });
  }
}

function handleNewsletterSignup(email) {
  try {
    const subscribers = JSON.parse(localStorage.getItem('casey_subscribers') || '[]');
    
    if (subscribers.includes(email)) {
      sendNotification('Already Subscribed! 💜', {
        body: 'You\'re already on the fan club list!',
        tag: 'newsletter'
      });
      return { success: false, message: 'Already subscribed!' };
    }
    
    subscribers.push(email);
    localStorage.setItem('casey_subscribers', JSON.stringify(subscribers));
    
    sendNotification('Welcome to the Fan Club! 💜', {
      body: 'Thanks for subscribing! You\'ll get exclusive updates.',
      tag: 'newsletter'
    });
    
    return { success: true, message: 'Welcome to the fan club!' };
  } catch(err) {
    return { success: false, message: 'Something went wrong' };
  }
}

function handleTourNotification(email) {
  try {
    const notifications = JSON.parse(localStorage.getItem('casey_tour_notifications') || '[]');
    
    if (notifications.includes(email)) {
      sendNotification('Already Subscribed! 🎤', {
        body: 'You\'re already signed up for tour notifications!',
        tag: 'tour'
      });
      return { success: false, message: 'Already subscribed!' };
    }
    
    notifications.push(email);
    localStorage.setItem('casey_tour_notifications', JSON.stringify(notifications));
    
    sendNotification('Tour Notifications Enabled! 🎤', {
      body: 'You\'ll be notified when new tour dates are announced!',
      tag: 'tour'
    });
    
    return { success: true, message: 'You\'ll be notified about new tour dates!' };
  } catch(err) {
    return { success: false, message: 'Something went wrong' };
  }
}

function setTourReminder(tourDate, city, venue) {
  try {
    const reminders = JSON.parse(localStorage.getItem('casey_tour_reminders') || '[]');
    const reminderKey = `${tourDate}-${city}`;
    
    if (reminders.includes(reminderKey)) {
      sendNotification('Reminder Already Set! ⏰', {
        body: `You already have a reminder for ${city}`,
        tag: 'reminder'
      });
      return { success: false, message: 'Reminder already set!' };
    }
    
    reminders.push(reminderKey);
    localStorage.setItem('casey_tour_reminders', JSON.stringify(reminders));
    
    sendNotification('Reminder Set! ⏰', {
      body: `We'll remind you about the ${city} show at ${venue}`,
      tag: 'reminder'
    });
    
    const showDate = new Date(tourDate);
    const reminderDate = new Date(showDate.getTime() - 24 * 60 * 60 * 1000);
    const now = new Date();
    
    if (reminderDate > now) {
      const timeUntilReminder = reminderDate.getTime() - now.getTime();
      
      if (timeUntilReminder < 24 * 60 * 60 * 1000) {
        setTimeout(() => {
          sendNotification('Show Tomorrow! 🎤', {
            body: `Don't forget: ${city} show at ${venue} tomorrow!`,
            tag: 'show-reminder',
            requireInteraction: true
          });
        }, timeUntilReminder);
      }
    }
    
    return { success: true, message: 'Reminder saved!' };
  } catch(err) {
    return { success: false, message: 'Something went wrong' };
  }
}

(function(){
  const reminders = JSON.parse(localStorage.getItem('casey_tour_reminders') || '[]');
  
  if (reminders.length === 0) return;
})();

window.notifications = {
  send: sendNotification,
  newsletter: handleNewsletterSignup,
  tourNotification: handleTourNotification,
  tourReminder: setTourReminder
};
