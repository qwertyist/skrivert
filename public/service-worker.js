const CACHE_NAME = "skrivert-offline-cache-v0";
const urlsToCache = [
  "/",
  "/index.html",
  "/global.css",
  "/quill.css",
  "/favicon.png",
  "/build/bundle.css",
  "/build/bundle.js",
  "/build/bundle.js.map",
  "/data/shortforms.se.json",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(
        urlsToCache.map((url) => {
          return "" + url;
        }),
      );
    }),
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    }),
  );
});
