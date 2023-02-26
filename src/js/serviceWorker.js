//Name of cache and assets to store in the cache
const staticSignage = "signage-site-v1"
const assets = [
  "/",
  "/index.html",
  "/css/style.css",
  "/js/app.js",
  "/js/index.js",
  "/js/ruokalistadata.js",
  "/js/network.js",
  "/assets/DIA1.JPG",
  "/assets/DIA2.JPG",
  "/assets/DIA3.JPG",
  "/assets/metropolia_s_orange.png",
]

/**
 * Push assets to cache
 * Give an error if a file is not found
 * @param {*} cache 
 * @returns promise of assets
 */
const filesUpdate = cache => {
    const stack = [];
    assets.forEach(file => stack.push(
        cache.add(file).catch(_=>console.error(`can't load ${file} to cache`))
    ));
    return Promise.all(stack);
};

installEvent.waitUntil(caches.open(staticSignage).then(filesUpdate));

//Service worker to fetch the assets
self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
})