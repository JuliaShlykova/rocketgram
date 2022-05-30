// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-fhEJWd6MkTCz-0C0YO6n77vXQYd7jKA",
  authDomain: "rocketgram-872da.firebaseapp.com",
  projectId: "rocketgram-872da",
  storageBucket: "rocketgram-872da.appspot.com",
  messagingSenderId: "153317856211",
  appId: "1:153317856211:web:df6187b88261cb48f85526"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export default app;
export { db, storage, auth };