import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCnMYaiGX8NeB7ofYOJrE88EntYs1cDOk4",
  authDomain: "soofttest-5763d.firebaseapp.com",
  databaseURL: "https://soofttest-5763d-default-rtdb.firebaseio.com",
  projectId: "soofttest-5763d",
  storageBucket: "soofttest-5763d.appspot.com",
  messagingSenderId: "527293792088",
  appId: "1:527293792088:web:234db4dd8e7e5f8561ef2d",
  measurementId: "G-WMTTJLWGEC",
};

const firebaseApp = initializeApp(firebaseConfig); // Inicializa con la configuracion de Firebase

export default firebaseApp;
