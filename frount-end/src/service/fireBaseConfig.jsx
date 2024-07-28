// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAPN_c6hube90HMPgDHFjzxLlq58NkUUdw",
    authDomain: "trip-planner-ai-e0251.firebaseapp.com",
    projectId: "trip-planner-ai-e0251",
    storageBucket: "trip-planner-ai-e0251.appspot.com",
    messagingSenderId: "950496794678",
    appId: "1:950496794678:web:3c787da2a08ac1a47b2097",
    measurementId: "G-QNW6N8N16R"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
