// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyChvvHArQHi4ZKDeFpdzj0tadHgTOs4EJc",
  authDomain: "eskuvoi-webgaleria.firebaseapp.com",
  projectId: "eskuvoi-webgaleria",
  storageBucket: "eskuvoi-webgaleria.appspot.com",
  messagingSenderId: "209353421110",
  appId: "1:209353421110:web:289a0b4b06e57691a7655f"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
