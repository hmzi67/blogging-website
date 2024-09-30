// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Import Storage

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCBDTGhRZ4Soz36M8BlmvtlndoOgtfax80",
  authDomain: "blogging-763da.firebaseapp.com",
  projectId: "blogging-763da",
  storageBucket: "blogging-763da.appspot.com",
  messagingSenderId: "67688640113",
  appId: "1:67688640113:web:fa0daa5e800d6f879775d0",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Storage


export { db, storage };
