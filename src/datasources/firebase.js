import firebase from "firebase/compat/app"
import "firebase/compat/auth"

const db = firebase.initializeApp({
    apiKey: "",
    authDomain: "",
})

export const firebaseAuth = db.auth()
