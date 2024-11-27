import { initializeApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCk3j484FDucPKy5IgdymkAx66Rf9rGOZ8",
  authDomain: "doda-2f906.firebaseapp.com",
  projectId: "doda-2f906",
  storageBucket: "doda-2f906.appspot.com",
  messagingSenderId: "408553173318",
  appId: "1:408553173318:web:921af50c3907c9e0f0b547",
  measurementId: "G-9VYFSH98HZ",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };
