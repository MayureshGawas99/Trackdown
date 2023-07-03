import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

async function StartFirebase() {
  const firebaseConfig = {
    apiKey: "AIzaSyAiRQAm5EDT1kecjmw_6jjDYCOJk4ytyRw",
    authDomain: "location-tracking-e1ee7.firebaseapp.com",
    databaseURL: "https://location-tracking-e1ee7-default-rtdb.firebaseio.com",
    projectId: "location-tracking-e1ee7",
    storageBucket: "location-tracking-e1ee7.appspot.com",
    messagingSenderId: "227536643894",
    appId: "1:227536643894:web:341fde91d8879eb0a03597",
    measurementId: "G-6Y8ELM7TH7",
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getDatabase(app);
  // console.log(db);
  return db;
}

export default StartFirebase;
