const CACHE_NAME = "cinema-kalasan-xxi-v1"; // Nama cache yang akan digunakan
const urlsToCache = [
  "./", // Halaman utama
  "./index.js", // Script JavaScript utama
  "./icons.ico", // Ikon
  "./bootstrap.bundle.min.js", // Library Bootstrap JS
  "./bootstrap.bundle.min.js.map", // Source map untuk Bootstrap JS
  "./bootstrap.min.css", // CSS Bootstrap
  "./bootstrap.min.css.map", // Source map untuk CSS Bootstrap
];

self.addEventListener("install", function (event) {
  // Saat Service Worker diinstal
  event.waitUntil(
    caches.open(CACHE_NAME).then(function (cache) {
      console.log("Opened cache"); // Logging bahwa cache telah dibuka
      return cache.addAll(urlsToCache); // Menyimpan semua URL ke dalam cache
    })
  );
});

self.addEventListener("fetch", function (event) {
  // Saat ada permintaan network
  event.respondWith(
    caches.match(event.request).then(function (response) {
      // Mengecek apakah permintaan ada di cache
      if (response) {
        return response; // Jika ada, mengembalikan respon dari cache
      }
      return fetch(event.request); // Jika tidak, melanjutkan permintaan ke network
    })
  );
});

self.addEventListener("activate", function (event) {
  var cacheWhitelist = ["cinema-kalasan-xxi-v1"]; // Daftar cache yang diizinkan

  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // Menghapus cache yang tidak ada di whitelist
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
