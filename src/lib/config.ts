// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAIF8UhTpqgwdZOv9E2Gps_Mv1uEmdt-hM",

  authDomain: "realman-7cc75.firebaseapp.com",

  databaseURL: "https://realman-7cc75-default-rtdb.asia-southeast1.firebasedatabase.app",

  projectId: "realman-7cc75",

  storageBucket: "realman-7cc75.appspot.com",

  messagingSenderId: "94362129273",

  appId: "1:94362129273:web:922e06944a5abdda7295a8",

  measurementId: "G-BVB1ERHBP3"


};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
