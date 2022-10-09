// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqMRUu_h4O3WLFd9QOKYEP6LglVSKxocc",
  authDomain: "chat-51790.firebaseapp.com",
  projectId: "chat-51790",
  storageBucket: "chat-51790.appspot.com",
  messagingSenderId: "411560483153",
  appId: "1:411560483153:web:b224326df58383e6015b70"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const storage = getStorage();
export const db = getFirestore();

