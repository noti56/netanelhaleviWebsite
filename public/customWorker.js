// import { precacheAndRoute } from 'workbox-precaching';
// precacheAndRoute(self.__WB_MANIFEST);


// console.log("Service Worker Loaded...");

// self.addEventListener("push", e => {
//     const data = e?.data?.json();
//     console.log("Push Recieved...");
//     self?.registration?.showNotification(data.title, {
//         body: "Notified by Traversy Media!",
//         icon: "http://image.ibb.co/frYOFd/tmlogo.png"

//     });
// });
'use strict';

self.__WB_DISABLE_DEV_LOGS = true;

console.log("custom service worker is running");
self.addEventListener('push', function (event) {
    const data = JSON.parse(event.data.text());
    event.waitUntil(
        registration.showNotification(data.title, {
            body: data.message,
            //   icon: '/icons/android-chrome-192x192.png'
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            if (clientList.length > 0) {
                let client = clientList[0];
                for (let i = 0; i < clientList.length; i++) {
                    if (clientList[i].focused) {
                        client = clientList[i];
                    }
                }
                return client.focus();
            }
            return clients.openWindow('/');
        })
    );
});