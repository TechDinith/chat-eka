// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6GHEeUzyQ0z5nRpfFam18rzMRLqeEibo",
  authDomain: "test-projects-b10ec.firebaseapp.com",
  projectId: "test-projects-b10ec",
  storageBucket: "test-projects-b10ec.appspot.com",
  messagingSenderId: "283021549638",
  appId: "1:283021549638:web:0867e5223a865cea9e6a47",
  measurementId: "G-48WMX99N5D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
