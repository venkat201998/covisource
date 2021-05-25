import firebase from "firebase/app";
import "firebase/auth";

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
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();