import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics, isSupported } from "firebase/analytics";

export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAs709w74Gi8c5zZnbTwwqwUeve-eB_wJo",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "doap-1908.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "doap-1908",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "doap-1908.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "619777181269",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:619777181269:web:a54bcb279a3bfe17bb36dc",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-263DDN24Z8"
};

// Initialize Firebase once
export const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const firebaseAuth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

// Initialize Analytics in supported browser environments
export let firebaseAnalytics = null;
if (typeof window !== "undefined") {
  isSupported().then((yes) => {
    if (yes) {
      firebaseAnalytics = getAnalytics(firebaseApp);
    }
  }).catch(() => {});
}
