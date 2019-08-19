// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase/app";
import "firebase/auth";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyC7UuaJl2bUoaNi069v_owu600YOvTC1pk",
  authDomain: "pokedex-790af.firebaseapp.com",
  databaseURL: "https://pokedex-790af.firebaseio.com",
  projectId: "pokedex-790af",
  storageBucket: "",
  messagingSenderId: "586995379020",
  appId: "1:586995379020:web:5e0c874f08b51261"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Exporting connection to provider for google signin
export const provider = new firebase.auth.GoogleAuthProvider();

// Exporting connection to database as a variable
export const firestore = firebase.firestore();

export default firebase;
