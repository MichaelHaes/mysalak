importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.1.0/firebase-messaging-compat.js');

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

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  const link = payload.fcmOptions?.link || payload.data?.link;

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    // icon: "./assets/logo/logomysalak.png",
    data: { url: link },
  };

  self.registration.showNotification(notificationTitle, notificationOptions)
    .then(() => {
      console.log("Notification shown!");
    });
});

self.addEventListener("notificationclick", function (event) {
  console.log("[firebase-messaging-sw.js] Notification click received.");

  event.notification.close();

  // This checks if the client is already open and if it is, it focuses on the tab. If it is not open, it opens a new tab with the URL passed in the notification payload
  event.waitUntil(
    clients
      // https://developer.mozilla.org/en-US/docs/Web/API/Clients/matchAll
      .matchAll({ type: "window", includeUncontrolled: true })
      .then(function (clientList) {
        const url = event.notification.data.url;

        if (!url) return;

        // If relative URL is passed in firebase console or API route handler, it may open a new window as the client.url is the full URL i.e. https://example.com/ and the url is /about whereas if we passed in the full URL, it will focus on the existing tab i.e. https://example.com/about
        for (const client of clientList) {
          if (client.url === url && "focus" in client) {
            return client.focus();
          }
        }

        if (clients.openWindow) {
          console.log("OPENWINDOW ON CLIENT");
          return clients.openWindow(url);
        }
      })
  );
});