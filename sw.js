// Service Worker – Lecteur Vocal PWA
// Version du cache : incrémenter pour forcer la mise à jour
const CACHE_VERSION = 'lecteur-vocal-v1.0';

// Fichiers à mettre en cache pour le mode hors-ligne
const CACHE_FILES = [
  './',
  './index.html',
  './manifest.json'
];

// ─── INSTALLATION ───
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(CACHE_FILES))
      .then(() => self.skipWaiting())
  );
});

// ─── ACTIVATION (nettoyage des anciens caches) ───
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_VERSION)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── FETCH : Cache-first pour les ressources de l'app, réseau pour le reste ───
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // On ne gère que les requêtes GET vers notre propre origine
  if (event.request.method !== 'GET') return;
  if (!url.origin.includes(self.location.origin) && !url.hostname.includes('fonts.googleapis.com') && !url.hostname.includes('fonts.gstatic.com')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        // Mise en cache des polices Google Fonts
        if (url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
          const cloned = response.clone();
          caches.open(CACHE_VERSION).then(cache => cache.put(event.request, cloned));
        }
        return response;
      }).catch(() => {
        // Hors ligne et pas en cache : page de fallback basique
        if (event.request.destination === 'document') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
