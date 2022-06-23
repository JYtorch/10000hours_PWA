importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js")
importScripts("https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js")

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
