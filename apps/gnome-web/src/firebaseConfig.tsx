import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";

// 🔥 Tutaj wklej swoje dane z Firebase Console!
const firebaseConfig = {
  apiKey: "TWOJ_KLUCZ",
  authDomain: "TWOJ_PROJEKT.firebaseapp.com",
  projectId: "TWOJ_PROJEKT",
  storageBucket: "TWOJ_PROJEKT.appspot.com",
  messagingSenderId: "TWOJ_ID",
  appId: "TWOJ_APP_ID",
};

// 🔥 Inicjalizacja Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// 🚀 Eksportujemy, żebyś mógł tego użyć gdzie indziej
export { auth, provider };
