import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPpDOrS4haRgVGBBklwrKbIif7dZ6ybh8",
  authDomain: "clone-react-802f2.firebaseapp.com",
  projectId: "clone-react-802f2",
  storageBucket: "clone-react-802f2.appspot.com",
  messagingSenderId: "665246938383",
  appId: "1:665246938383:web:ea4b36ea411d9d12713a7a",
  measurementId: "G-7R2V9P7VS0",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { auth, db };
