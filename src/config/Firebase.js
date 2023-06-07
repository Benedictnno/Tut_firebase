// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth , GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage } from  'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrhttzPG41oxVYjmpoaDkJCprkd5DMVxs",
  authDomain: "fir-course-92088.firebaseapp.com",
  projectId: "fir-course-92088",
  storageBucket: "fir-course-92088.appspot.com",
  messagingSenderId: "356511024444",
  appId: "1:356511024444:web:122f0642f3ebbd06dd8a39",
  measurementId: "G-JVXYH0MY75",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider()
export const db = getFirestore(app)
export const storage = getStorage(app)