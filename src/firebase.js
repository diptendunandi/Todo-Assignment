import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import { EmailAuthProvider } from "firebase/auth";
import { getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBwguocnwBXYotNwHycNJMmKzRvSQ2KRi8",
  authDomain: "xeggo-ef293.firebaseapp.com",
  projectId: "xeggo-ef293",
  storageBucket: "xeggo-ef293.appspot.com",
  messagingSenderId: "158553683125",
  appId: "1:158553683125:web:7992b231dc8bf3d709fafc",
  measurementId: "G-GMRH7W4DCQ"
};

const app = initializeApp(firebaseConfig);
const provider = new EmailAuthProvider();
const auth = getAuth();
const db = getFirestore(app);
export {provider, auth}
export default db;