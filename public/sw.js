
self.addEventListener('push', function(event) {
  const data = event.data.json();
  
  const options = {
    body: data.description,
    icon: '/placeholder.svg',
    badge: '/placeholder.svg',
    vibrate: [100, 50, 100],
    data: {
      url: data.url || '/',
      timestamp: Date.now()
    },
    actions: [
      {
        action: 'open',
        title: 'Xem chi tiết'
      },
      {
        action: 'close',
        title: 'Đóng'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  if (event.action === 'close') {
    return;
  }
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});

// Cache calendar data
self.addEventListener('fetch', function(event) {
  if (event.request.url.includes('calendar')) {
    event.respondWith(
      caches.open('calendar-data').then(function(cache) {
        return cache.match(event.request).then(function(response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});
