var cacheName = 'weatherPWA-v1';
var filesToCache = [
    '/',
    '/index.html',
    '/scripts/app.js',
    '/scripts/localforage-1.4.0.js',
    '/styles/ud811.css',
    '/images/clear.png',
    '/images/cloudy-scattered-showers.png',
    '/images/cloudy.png',
    '/images/fog.png',
    '/images/ic_add_white_24px.svg',
    '/images/ic_refresh_white_24px.svg',
    '/images/partly-cloudy.png',
    '/images/rain.png',
    '/images/scattered-showers.png',
    '/images/sleet.png',
    '/images/snow.png',
    '/images/thunderstorm.png',
    '/images/wind.png'
];

// This part is waiting for the service worker to installs and save in the app shell
self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      // Store the cache as a flag in a log document
        caches.open(cacheName).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(filesToCache);
        })
    );
});

// If it is needed it returns, else it let to go internet
self.addEventListener('activate', function(e) {
    console. log('[ServiceWorker] Activate');
   e.waitUntil(
      caches.keys (). then(function (keyList){
        return Promise.all(keyList.map(function (key) {
          if (key !== cacheName) {
             console. log ('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
  })

  // When the application requires of resource information doesn't require the entire internet when it isn't needed
  self.addEventListener('fetch', function(e) {
    console. log(' [ServiceWorker] Fetch', e.request.url);
    e. respondWith(
      // If the service worker doesn't have the information the resource is freed and starts to look for another one
      caches.match (e.request).then (function (response) {
        return response || fetch(e.request);
      })
    );
  });