// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps} from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWGAFdluMUQAFZL57LGi9UDpzh1VxZ6iE",
  authDomain: "interviewmate-a4346.firebaseapp.com",
  projectId: "interviewmate-a4346",
  storageBucket: "interviewmate-a4346.firebasestorage.app",
  messagingSenderId: "692886470146",
  appId: "1:692886470146:web:e0bea223fe3d84de5bf11b",
  measurementId: "G-73EB0C1B3V"
};

// Initialize Firebase
const app = !getApps.length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(app);
export const db = getFirestore(app);