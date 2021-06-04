import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';

var config = {
  apiKey: "AIzaSyA8bPq53R7Nppb0C2gSPaQeRnU81424vOo",
  authDomain: "yunko-scholarship.firebaseapp.com",
  projectId: "yunko-scholarship",
  storageBucket: "yunko-scholarship.appspot.com",
  messagingSenderId: "470579484567",
  appId: "1:470579484567:web:7fb9674d2157ebe35056d2",
  measurementId: "G-9HBBJGVGME"
};


firebase.initializeApp(config);


const db = firebase.firestore();
const settings = {/* your settings... */ timestampsInSnapshots: true};
db.settings(settings);

export { db, firebase };
