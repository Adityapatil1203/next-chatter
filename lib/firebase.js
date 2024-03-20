import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRxPmjFOqR409Z3iB8WXWvya-aZLX5v_k",
  authDomain: "chat-app-d5d73.firebaseapp.com",
  projectId: "chat-app-d5d73",
  storageBucket: "chat-app-d5d73.appspot.com",
  messagingSenderId: "143318421404",
  appId: "1:143318421404:web:2aa921e229adff455c4259",
  measurementId: "G-2HH6RKR18D"
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);
const auth = getAuth(app);

export { app, firestore, auth };