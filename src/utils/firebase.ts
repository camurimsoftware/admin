// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTkYAJOC-Di9dr4FElGj6tqCv6pScEhpM",
  authDomain: "camurim-11e85.firebaseapp.com",
  projectId: "camurim-11e85",
  storageBucket: "camurim-11e85.appspot.com",
  messagingSenderId: "1004474036213",
  appId: "1:1004474036213:web:01bf6f455ddda3bc4efabc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);