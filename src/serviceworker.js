const CACHE_KEY = 'GbfArcarumCalc-Cache-v2';

self.addEventListener('install', (event) => {
  self.skipWaiting();

  const urlsToCache = [
    './',
    'index.html',
    'style.css',
    'index.js',
    'img/logo.png',
    'img/logo.svg',
    'img/icon-192.png',
    'img/icon-512.png',
    'img/share_image_logo.png'
  ];

  event.waitUntil(
    caches
      .open(CACHE_KEY)
      .then((cache) => cache.addAll(urlsToCache.map((url) => new Request(url, { cache: 'no-cache', mode: 'no-cors' }))))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(fetch(event.request).catch(() => caches.match(event.request)));
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_KEY];

  const deleteOldCache = caches.keys().then((cacheNames) => {
    const deletePromises = cacheNames.map((cacheName) => {
      if (!cacheWhitelist.includes(cacheName)) {
        return caches.delete(cacheName);
      }
    });

    return Promise.all(deletePromises);
  });

  const claim = self.clients.claim();

  event.waitUntil(Promise.all([deleteOldCache, claim]));
});
