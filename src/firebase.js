import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCasMA7VSOsxAsB_gOF9ZWoBw72_yGGiQ4",
  authDomain: "chat-app-66d03.firebaseapp.com",
  projectId: "chat-app-66d03",
  storageBucket: "chat-app-66d03.firebasestorage.app",
  messagingSenderId: "1092364539262",
  appId: "1:1092364539262:web:362f29b744ec1101f2cf2f",
  measurementId: "G-QJ3PPC7T7W"
};
// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
