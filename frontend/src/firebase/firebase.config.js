// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiiTlgmfwSqn-IDcqzahkhgb6pLyptS1Q",
  authDomain: "munchiesgarden-d6dd2.firebaseapp.com",
  projectId: "munchiesgarden-d6dd2",
  storageBucket: "munchiesgarden-d6dd2.firebasestorage.app",
  messagingSenderId: "676463223999",
  appId: "1:676463223999:web:efa25a7ec725c6d334520a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Fix: Export as default
export default app;
