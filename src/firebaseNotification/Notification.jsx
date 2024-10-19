import React, { useState, useEffect } from 'react';
import { onMessageListener } from './firebase';
import toast, { Toaster } from 'react-hot-toast';

const Notification = () => {
  const [notificationPayload, setNotificationPayload] = useState(null);

  const notify = (title, body) =>
    toast(
      <div>
        <strong>{title}</strong>
        <p>{body}</p>
      </div>
    );

  useEffect(() => {
    const subscribeToNotifications = () => {
      onMessageListener()
        .then((payload) => {
          console.log('Notification received!');
          setNotificationPayload(payload);
          notify(payload?.notification?.title, payload?.notification?.body);
        })
        .catch((err) => console.log('Failed to listen for notification: ', err));
    };

    subscribeToNotifications();

    if (notificationPayload) {
      subscribeToNotifications();
    }

  }, [notificationPayload]);

  return (
    <>
      <Toaster />
    </>
  );
};

export default Notification;