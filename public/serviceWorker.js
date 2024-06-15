const CACHE_NAME = "version-1";
const urlsToCache = ["index.html", "offline.html"];

// Install SW
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
      .catch((error) => {
        console.error("Cache open failed: ", error);
      })
  );
});

// Listen for requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches
      .match(event.request)
      .then((response) => {
        // Return cached response if found, otherwise fetch from network
        console.log("cache match");
        return (
          response ||
          fetch(event.request).catch(() => {
            return caches.match("offline.html");
          })
        );
      })
      .catch((error) => {
        console.error("Fetch failed: ", error);
        return caches.match("offline.html");
      })
  );
});

// Activate the SW
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        console.log("activated");
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log("Deleting cache: ", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .catch((error) => {
        console.error("Activation failed: ", error);
      })
  );
});
