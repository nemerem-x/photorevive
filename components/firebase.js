import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
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
const analytics = getAnalytics(app)
const storage = getStorage(app)

