// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKjMI8mKcHSMfBzV8unXPey-JDB8KunbA",
  authDomain: "ai-trip-planner-app-53647.firebaseapp.com",
  projectId: "ai-trip-planner-app-53647",
  storageBucket: "ai-trip-planner-app-53647.firebasestorage.app",
  messagingSenderId: "1006154369093",
  appId: "1:1006154369093:web:719a72645b4bd05d5efb2c"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);
const db = getFirestore(app);  
export { db }; // Export the db instance for use in other files