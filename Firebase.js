import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "lona-17662.firebaseapp.com",
  projectId: "lona-17662",
  storageBucket: "lona-17662.firebasestorage.app",
  messagingSenderId: "565704649844",
  appId: "1:565704649844:web:9904d93fec63e25ff0f521",
  measurementId: "G-LFR28GNPBX",
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
export const dataBase = getFirestore(app);
export default app;
