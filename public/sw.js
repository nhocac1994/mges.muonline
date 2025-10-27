// Service Worker for Background Notifications
// This file will handle notifications even when the app is closed

const CACHE_NAME = 'mu-online-v1';
const urlsToCache = [
  '/',
  '/rankings',
  '/download',
  '/login',
  '/register',
  '/icon.jpg',
  '/Mu.PNG'
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.log('Service Worker: Cache failed', error);
      })
  );
  // Skip waiting to activate immediately
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Background sync for notifications
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

// Push event for notifications
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    
    const options = {
      body: data.body,
      icon: '/icon.jpg',
      badge: '/icon.jpg',
      tag: data.tag || 'mu-event',
      requireInteraction: true,
      actions: [
        {
          action: 'open',
          title: 'Mở Game',
          icon: '/icon.jpg'
        },
        {
          action: 'close',
          title: 'Đóng',
          icon: '/icon.jpg'
        }
      ]
    };

    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'open') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Background sync function
async function doBackgroundSync() {
  try {
    // Check for upcoming events
    const response = await fetch('/api/events/check');
    const events = await response.json();
    
    if (events.length > 0) {
      // Send notification for upcoming events
      self.registration.showNotification('🎮 Sự kiện sắp diễn ra!', {
        body: `Có ${events.length} sự kiện sắp bắt đầu`,
        icon: '/icon.jpg',
        tag: 'upcoming-events',
        requireInteraction: true
      });
    }
  } catch (error) {
    console.log('Background sync failed:', error);
  }
}

// Periodic background sync (if supported)
if ('serviceWorker' in navigator && 'periodicSync' in window.ServiceWorkerRegistration.prototype) {
  self.addEventListener('periodicsync', (event) => {
    if (event.tag === 'event-check') {
      event.waitUntil(doBackgroundSync());
    }
  });
}
