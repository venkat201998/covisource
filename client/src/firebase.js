// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFSPy6Kf3ZpvS4Ca97XSdLGlaOs4aBLHQ",
  authDomain: "covisource-d675f.firebaseapp.com",
  projectId: "covisource-d675f",
  storageBucket: "covisource-d675f.appspot.com",
  messagingSenderId: "389632412146",
  appId: "1:389632412146:web:ba6a78d977d5f2322f836b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// export
export const auth = getAuth(app);