import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyC7WL-M9gtn7EorfkNtj3rEGd_uejLCidA",
  authDomain: "transcend-edu.firebaseapp.com",
  projectId: "transcend-edu",
  storageBucket: "transcend-edu.firebasestorage.app",
  messagingSenderId: "623639368900",
  appId: "1:623639368900:web:0dc1fcf4e714952a4de591",
  measurementId: "G-0SX0296MHD"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
