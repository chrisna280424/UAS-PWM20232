const CACHE_NAME = "cinema-kalasan-xxi-v1";
const urlsToCache = [
  "./",
  "./index.js",
  "./icons.ico",
  "./bootstrap.bundle.min.js",
  "./bootstrap.bundle.min.js.map",
  "./bootstrap.min.css",
  "./bootstrap.min.css.map",
];

self.addEventListener("install", function (event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Cache hit - return response
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = ["cinema-kalasan-xxi-v1"];

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
