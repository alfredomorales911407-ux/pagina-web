const CACHE_NAME = 'agroguia-cache-v1';
const urlsToCache = [
  './',
  './index.html',
  './css/style.css',
  './js/data.js',
  './js/app.js',
  './instalar/pwa.js',
  './instalar/manifest.json',
  './instalar/icon-192.jpg',
  './instalar/icon-512.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Cache abierto para AgroGuía');
        return cache.addAll(urlsToCache.map(url => new Request(url, {cache: 'reload'})));
      })
      .catch(err => console.error('[SW] Error al cachear recursos:', err))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            console.log('[SW] Eliminando cache antiguo:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});