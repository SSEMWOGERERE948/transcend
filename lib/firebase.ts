import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBJpDk7Db5I5fcXYdEjVHNJewXOvD0pvw8",
  authDomain: "transcend-28bd6.firebaseapp.com",
  projectId: "transcend-28bd6",
  storageBucket: "transcend-28bd6.firebasestorage.app",
  messagingSenderId: "211502500156",
  appId: "1:211502500156:web:6a3cc18729739983127639",
  measurementId: "G-TKD2066DMM"
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
