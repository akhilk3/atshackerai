import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD9VO8XQRND6I2HqcSHWHFR8kQYpD8mZes",
  authDomain: "atshackerai.firebaseapp.com",
  projectId: "atshackerai",
  storageBucket: "atshackerai.firebasestorage.app",
  messagingSenderId: "293391427865",
  appId: "1:293391427865:web:4db0e874fd5a16f7f63d88",
  measurementId: "G-DBPRSDGJNP"
};

// Safe initialization for Next.js hot-reloads
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

auth.useDeviceLanguage();

export { app, auth };