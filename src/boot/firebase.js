// source: https://github.com/quasarframework/quasar/issues/1737#issuecomment-371896583
// Firebase configuration

import firebase from 'firebase/app';
import 'firebase/firestore';
// import 'firebase/functions';

// General firebase configuration settings
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
// Initialize Cloud Firestore through Firebase, and export variables for use
// outside components
const firestore = firebaseApp.firestore();
export {
  firestore, firebase,
};

// leave the export, even if you don't use it
export default ({ Vue }) => {
  // import { firestore } from 'boot/firebase' where needed outside Vue files
  // this.$firestore when inside Vue files
  Vue.prototype.$firestore = firestore;
  Vue.prototype.$firebase = firebase;
};
