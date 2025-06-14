import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB1_qBYzy0Q8YeGjGzoH3qXnL-Hfsv9qmY",
  authDomain: "e-commerce-aba1f.firebaseapp.com",
  projectId: "e-commerce-aba1f",
  storageBucket: "e-commerce-aba1f.firebasestorage.app",
  messagingSenderId: "2394363981",
  appId: "1:2394363981:web:a4987b7b2deacef4f92404",
  measurementId: "G-VL5XSH4S81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export default app;
