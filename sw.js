importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js")

// This is the "Offline page" service worker

importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');

const CACHE = "pwabuilder-page";

// TODO: replace the following with the correct offline fallback page i.e.: const offlineFallbackPage = "offline.html";
const offlineFallbackPage = "offline.html";

self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

self.addEventListener('install', async (event) => {
  event.waitUntil(
    caches.open(CACHE)
      .then((cache) => cache.add(offlineFallbackPage))
  );
});

if (workbox.navigationPreload.isSupported()) {
  workbox.navigationPreload.enable();
}

self.addEventListener('fetch', (event) => {
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const preloadResp = await event.preloadResponse;

        if (preloadResp) {
          return preloadResp;
        }

        const networkResp = await fetch(event.request);
        return networkResp;
      } catch (error) {

        const cache = await caches.open(CACHE);
        const cachedResp = await cache.match(offlineFallbackPage);
        return cachedResp;
      }
    })());
  }
});

firebase.initializeApp({
  apiKey: '${{ secrets.API_KEY }}',
  authDomain: '${{ secrets.AUTH_DOMAIN }}',
  projectId: '${{ secrets.PROJECT_ID }}',
  storageBucket: '${{ secrets.STORAGE_BUCKET }}',
  messagingSenderId: '${{ secrets.MESSAGING_SENDER_ID }}',
  appId: '${{ secrets.APP_ID }}',
  measurementId: '${{ secrets.MEASUREMENT_ID }}',   
});
const messaging = firebase.messaging();
// console.log(messaging)
messaging.setBackgroundMessageHandler(payload => {
  const notification = JSON.parse(payload.data.notification);
  const notificationTitle = notification.title;
  const notificationOptions = {
    body: notification.body
  };
  //Show the notification :)
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
