// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIMVXFUaE1shxitYbDyorL4G6FxxlMWAw",
  authDomain: "hblogapi.firebaseapp.com",
  projectId: "hblogapi",
  storageBucket: "hblogapi.appspot.com",
  messagingSenderId: "458975829175",
  appId: "1:458975829175:web:3e9eea249adc9df7598132",
  measurementId: "G-2QTCPXBBCT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const auth = getAuth(app);
