import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { getFirestore } from "firebase/firestore";

export const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID
  };

  const app = initializeApp(config)
  export const auth = getAuth(app)
  export const db = getFirestore(app)  

class Firebase{
    constructor(){
        initializeApp(config)
    }

    signupUser = (email, password) => {
        const auth = getAuth()
        createUserWithEmailAndPassword(auth, email, password)
    }

    // Connexion
    loginUser = (email, password) => {
        const auth = getAuth()
        signInWithEmailAndPassword(auth, email, password)
    }

    // Deconnexion
    signoutUser = () => {
        const auth = getAuth()
        signOut(auth)
    } 

}

export default Firebase