
import { initializeApp } from "firebase/app";
import { getFirestore,collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBpY4yOI8YdCATnL4qctRzR61VUbeY2NyQ",
  authDomain: "movieworld-38d2c.firebaseapp.com",
  projectId: "movieworld-38d2c",
  storageBucket: "movieworld-38d2c.appspot.com",
  messagingSenderId: "501143451431",
  appId: "1:501143451431:web:3a0a52812d988150859b02",
  measurementId: "G-E155W5QTY2"
};

const app = initializeApp(firebaseConfig);
export const db=getFirestore(app);
export const moviesRef=collection(db,"movies");
export const reviewsRef=collection(db,"reviews");
export const usersRef=collection(db,"Users");

export default app