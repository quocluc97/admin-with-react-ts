// Scripts for firebase and firebase messaging

// Initialize the Firebase app in the service worker by passing the generated config
// const { initializeApp } = require('https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js');
// const { getMessaging } = require( 'https://www.gstatic.com/firebasejs/9.6.8/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.5.0/firebase-messaging-compat.js')



firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    const notification = new Notification({
        title: notificationTitle
    });
});