import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjGc21n3tpeFHCEacLNE8r7rHk8vqNUzY",
  authDomain: "dashboard-test-acee4.firebaseapp.com",
  projectId: "dashboard-test-acee4",
  storageBucket: "dashboard-test-acee4.firebasestorage.app",
  messagingSenderId: "205678704080",
  appId: "1:205678704080:web:c6805f1d46ba4885b4f5d5",
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize services
const auth = getAuth(app);
const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();

export { auth, db };
