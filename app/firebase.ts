// app/firebaseConfig.ts
import { initializeApp } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth'; // Import Auth type
import { getFirestore, Firestore } from 'firebase/firestore'; // Import Firestore type

const firebaseConfig = {
  apiKey: "AIzaSyARUSxbutgwLzXUDvXf4qfqybFkgDRBdOo",
  authDomain: "babyq-frontauth.firebaseapp.com",
  projectId: "babyq-frontauth",
  storageBucket: "babyq-frontauth.appspot.com",
  messagingSenderId: "391599717930",
  appId: "1:391599717930:web:e27cc0dd97f56bec690d53",
  measurementId: "G-316JW9S77X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app); // Explicitly type auth
const firestore: Firestore = getFirestore(app); // Explicitly type firestore

// Export Firebase services
export { auth, firestore };