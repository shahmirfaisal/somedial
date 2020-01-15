import firebase from "firebase/app";
import "firebase/analytics";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBbdvZ_r6c5Cu6cyyz67pMf_gcBD5TGe7Q",
  authDomain: "somedial-3f51d.firebaseapp.com",
  databaseURL: "https://somedial-3f51d.firebaseio.com",
  projectId: "somedial-3f51d",
  storageBucket: "somedial-3f51d.appspot.com",
  messagingSenderId: "890457473056",
  appId: "1:890457473056:web:112e206a1391b46a4e7c45",
  measurementId: "G-K587SBRK9M"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
