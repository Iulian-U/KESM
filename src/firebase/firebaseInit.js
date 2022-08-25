import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "kesm-project.firebaseapp.com",
  projectId: "kesm-project",
  storageBucket: "kesm-project.appspot.com",
  messagingSenderId: "840283317356",
};

//initialize firebase
initializeApp(firebaseConfig);

//initialize services
const db = getFirestore();
const auth = getAuth();

export { db, auth };
