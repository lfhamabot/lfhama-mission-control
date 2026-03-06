const CACHE_NAME = 'lfhama-mission-control-v2';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-72.jpg',
  '/icon-96.jpg',
  '/icon-128.jpg',
  '/icon-144.jpg',
  '/icon-152.jpg',
  '/icon-192.jpg',
  '/icon-384.jpg',
  '/icon-512.jpg',
  '/lfhama-avatar.jpg'
];

// Install event - cache assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});
