// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8gyDid4VIaWLrgq2uoFmZG34L0kE7b1w",
  authDomain: "movie-app-e2649.firebaseapp.com",
  projectId: "movie-app-e2649",
  storageBucket: "movie-app-e2649.appspot.com",
  messagingSenderId: "552479960808",
  appId: "1:552479960808:web:ec7f4fec75907c43a6a35d"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }