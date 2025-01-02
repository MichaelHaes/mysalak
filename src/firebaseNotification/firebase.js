// Firebase Cloud Messaging Configuration File.
// Read more at https://firebase.google.com/docs/cloud-messaging/js/client && https://firebase.google.com/docs/cloud-messaging/js/receive

import { initializeApp, getApps, getApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import axios from "axios";
import getDeviceUUID from "../Hooks/useUUID";

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

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const messaging = async () => {
  const supported = await isSupported()
  return supported ? getMessaging(app) : null;
}

export const requestForToken = async () => {
  const fcmMessaging = await messaging()
  const device_id = await getDeviceUUID();

  return getToken(fcmMessaging, {vapidKey: `BNsz8bJljr5JL-IykEOmsIbjb39B3sEzV8FREqn7GUNDSftIlAWWCywE4kfCGW5HBfnshAovcjJgpNi_NUgyj2U`})
    .then((currentToken) => {
      if (currentToken) {
        console.log('current token for client: ', currentToken);

        if (localStorage.getItem('fcmToken') && currentToken !== localStorage.getItem('fcmToken')) {
          localStorage.setItem('fcmToken', currentToken);

        } else if (!localStorage.getItem('fcmToken')) {
          localStorage.setItem('fcmToken', currentToken);
        }

        const user_id = JSON.parse(localStorage.getItem('user_id'));
        const role_id = JSON.parse(localStorage.getItem('role_id'));

        axios.post(`${process.env.REACT_APP_API_URL}/mysalak/register-token`, { user_id:user_id, role_id:role_id, device_id:device_id, token:currentToken })
          .then((response) => {
            console.log("response: ", response)
          })
          .catch((error) => {
            console.log("error: ", error)
          })

      } else {
        console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
    });
};

export const onMessageListener = async () =>
  new Promise(async  (resolve) => {
    const fcmMessaging = await messaging()

    onMessage(fcmMessaging, (payload) => {
      console.log("payload listener: ", payload)
      resolve(payload);
    });
  });