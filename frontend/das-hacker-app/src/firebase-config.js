// src/firebase-config.js
// import firebase from "firebase/app";
// import "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDYo7sY-QZvD9qd4Ye92Rqt68tN2fSiVRk",
    authDomain: "das-hackers.firebaseapp.com",
    databaseURL: "https://das-hackers-default-rtdb.firebaseio.com",
    projectId: "das-hackers",
    storageBucket: "das-hackers.appspot.com",
    messagingSenderId: "164807527902",
    appId: "1:164807527902:web:2193b8712654e79028614f",
    measurementId: "G-GKHFZFPJT1"
  };

const app = initializeApp(firebaseConfig);
// firebase.initializeApp(firebaseConfig);

// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app); // Initialize Firestore
export const auth = getAuth(app);
// export const auth = firebase.auth();
