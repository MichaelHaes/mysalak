// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyBmYSzdYzj9CeSHKrQWTKH6s9Uribwr6G0",
  authDomain: "my-salak.firebaseapp.com",
  projectId: "my-salak",
  storageBucket: "my-salak.appspot.com",
  messagingSenderId: "98518818438",
  appId: "1:98518818438:web:0e4368d93d6f46eacb3b07",
  measurementId: "G-K5J8THWDMN"
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export const requestForToken = () => {
  return getToken(messaging, { vapidKey: `BNsz8bJljr5JL-IykEOmsIbjb39B3sEzV8FREqn7GUNDSftIlAWWCywE4kfCGW5HBfnshAovcjJgpNi_NUgyj2U` })
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);

        if(localStorage.getItem('fcmToken') && currentToken !==localStorage.getItem('fcmToken')){
          localStorage.setItem('fcmToken', currentToken);

        }

        else if(!localStorage.getItem('fcmToken')){
          localStorage.setItem('fcmToken', currentToken);

        }
      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });