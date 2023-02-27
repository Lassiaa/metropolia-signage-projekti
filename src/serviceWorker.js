/**
 * Name of cache and assets to store in the cache
 */
const staticSignage = "offline-signage"
const coreAssets = [
  "./",
  "./index.html",
  "./css/style.css",
  "./js/index.js",
  "./js/info.js",
  "./js/network.js",
  "./js/ruokalistadata.js",
  "./assets/info.json",
  "./assets/Dia1.JPG",
  "./assets/Dia3.JPG",
  "./assets/Dia5.JPG",
  "./assets/metropolia_s_orange.png",
  "./assets/icons/icon-32x32.png",
  "./assets/icons/icon-64x64.png",
  "./assets/icons/icon-128x128.png",
  "./assets/icons/icon-256x256.png",
  "./assets/icons/icon-512x512.png",
]

/**
 * On install, cache assets
 */
self.addEventListener("install", e => {
	e.waitUntil(
		caches.open(staticSignage).then(cache => {
			// Loop assets to let us know what file is not working
			for (let asset of coreAssets) {
 				cache.add(asset).catch(_=>console.error(`can't load ${asset} to cache`));
 			};
 			return cache;
		})
	);
});

/**
 * Listen for request events
 */
self.addEventListener("fetch", e => {
	e.respondWith(
		caches.match(e.request).then(response => {
			return response || fetch(e.request);
		})
	);
});