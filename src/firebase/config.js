import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCGt6VpGuNp95wGzl71QfpgPk9uftJHQS0",
  authDomain: "spotify-673d1.firebaseapp.com",
  projectId: "spotify-673d1",
  storageBucket: "spotify-673d1.appspot.com",
  messagingSenderId: "975647846510",
  appId: "1:975647846510:web:995881212a14b63b21b67f",
  measurementId: "G-N1TWN9Y3ZT",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

