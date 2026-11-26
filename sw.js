/* BuBu service worker: app werkt offline, updates komen vanzelf binnen.
   Verhoog VERSION bij elke grote wijziging. */
const VERSION = 'bubu-v41';
const SHELL = ['./', 'index.html', 'manifest.webmanifest',
  'img/logo.png', 'img/hero.png', 'img/icon-192.png',
  'img/m-rood.png', 'img/m-blauw.png', 'img/m-geel.png', 'img/m-groen.png', 'img/m-oranje.png', 'img/m-roze.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request, url = new URL(req.url);
  if (req.method !== 'GET') return;
  const same = url.origin === location.origin;
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (!same && !fonts) return; /* weer, YouTube, analytics: altijd live */
  /* de app zelf: altijd eerst de nieuwste versie, cache alleen als je offline bent */
  if (same && (req.mode === 'navigate' || url.pathname.endsWith('/') || url.pathname.endsWith('index.html'))) {
    e.respondWith(fetch(req, {cache: 'no-store'}).then(res => { if (res.ok) caches.open(VERSION).then(c => c.put(req, res.clone())); return res; })
      .catch(() => caches.match(req).then(h => h || caches.match('index.html'))));
    return;
  }
  /* beelden e.d.: eerst snel uit de cache, ondertussen de nieuwste versie ophalen */
  e.respondWith(caches.open(VERSION).then(async cache => {
    const hit = await cache.match(req);
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone()); return res; }).catch(() => hit);
    return hit || net;
  }));
});
