import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "photorevive-1c57a.firebaseapp.com",
  projectId: "photorevive-1c57a",
  storageBucket: "photorevive-1c57a.appspot.com",
  messagingSenderId: "124974127898",
  appId: "1:124974127898:web:a2574a70840a1e7bf36aa3",
  measurementId: "G-8JS6PX6LT6"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
// export const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null)

// let app; let analytics; let storage;
// if(typeof window != "undefined"){
//   app = initializeApp(firebaseConfig);
//   storage = getStorage(app);
//   analytics = isSupported().then(yes => yes ? getAnalytics(app) : null);
// }
// export {app, analytics, storage}


// let analytics; let storage;
// if (firebaseConfig?.projectId) {
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);

//   if (app.name && typeof window !== 'undefined') {
//     analytics = getAnalytics(app);
//   }
//   storage = getStorage(app);
// }

// export {analytics, storage};