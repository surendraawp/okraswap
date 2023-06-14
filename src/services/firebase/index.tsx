// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALE3gndAN2IRBRqa0xP3IJUMNHPUWYLfg",
  authDomain: "okraswap.firebaseapp.com",
  projectId: "okraswap",
  storageBucket: "okraswap.appspot.com",
  messagingSenderId: "66180250287",
  appId: "1:66180250287:web:18cda4a45534eea19e725a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword} ;

