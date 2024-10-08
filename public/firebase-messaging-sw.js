// public/firebase-messaging-sw.js

importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.1.0/firebase-messaging-compat.js');

// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     navigator.serviceWorker.register('/firebase-messaging-sw.js')
//       .then(registration => {
//         console.log('Service Worker registered with scope:', registration.scope);
//       }).catch(err => {
//       console.log('Service Worker registration failed:', err);
//     });
//   });
// }
//
// firebase.initializeApp({
//   messagingSenderId: "98518818438",
// })
//
// const initMessaging = firebase.messaging();

const firebaseConfig = {
  apiKey: "AIzaSyBmYSzdYzj9CeSHKrQWTKH6s9Uribwr6G0",
  authDomain: "my-salak.firebaseapp.com",
  projectId: "my-salak",
  storageBucket: "my-salak.appspot.com",
  messagingSenderId: "98518818438",
  appId: "1:98518818438:web:0e4368d93d6f46eacb3b07",
  measurementId: "G-K5J8THWDMN",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});