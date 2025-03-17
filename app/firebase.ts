import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Only import getStorage


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
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);
const db = getFirestore(app);

// Export Firebase services
// Export Firebase services
// Export Firebase services
// Export Firebase services
export { db, auth, firestore, storage, addDoc, collection };
