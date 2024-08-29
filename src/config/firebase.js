import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCy6Hd3fojMjJw1vwSFdSp7YhwQeGHaef0",
    authDomain: "food-tracker-platform.firebaseapp.com",
    projectId: "food-tracker-platform",
    storageBucket: "food-tracker-platform.appspot.com",
    messagingSenderId: "473724942136",
    appId: "1:473724942136:web:1dbf5c61a6811c909ef3cd",
    measurementId: "G-J6XQZVKBK4",
};
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
