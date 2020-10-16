import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAI0tS9Dpw-n5aF8WUMqexGeFPcfSISX-k",
  authDomain: "instagram-clone-cca34.firebaseapp.com",
  databaseURL: "https://instagram-clone-cca34.firebaseio.com",
  projectId: "instagram-clone-cca34",
  storageBucket: "instagram-clone-cca34.appspot.com",
  messagingSenderId: "797665559162",
  appId: "1:797665559162:web:c1957675b9837b078cb1c3",
  measurementId: "G-JD6HLZ9V1X",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
