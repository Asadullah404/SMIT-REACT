// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBp8fqE20BrdjfoWQE2anS5pWmfa8FwzAk",
  authDomain: "myecom-32082.firebaseapp.com",
  projectId: "myecom-32082",
  storageBucket: "myecom-32082.appspot.com",
  messagingSenderId: "562465890430",
  appId: "1:562465890430:web:9a4de20ca7e4d80503b82f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export { fireDB, auth }