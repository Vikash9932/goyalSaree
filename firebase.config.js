import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const firebaseConfig = {
  apiKey: "AIzaSyDbNa3jcniq66sPKsbIBWljPa_CJSv7CVI",
  authDomain: "goyalsaree-99edd.firebaseapp.com",
  databaseURL: "https://goyalsaree-99edd-default-rtdb.firebaseio.com",
  projectId: "goyalsaree-99edd",
  storageBucket: "goyalsaree-99edd.appspot.com",
  messagingSenderId: "294097089707",
  appId: "1:294097089707:web:87f19164c54a38cc9e33ee",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}

export const db = firebase.firestore();

// export default db;
