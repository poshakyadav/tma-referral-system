// lib/firebase.ts

import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, get, child, push } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAEqGDHwIGRkjKIG3BjqrREtZsNNi1dh4s",
  authDomain: "tma-1-ecbde.firebaseapp.com",
  databaseURL: "https://tma-1-ecbde-default-rtdb.firebaseio.com",
  projectId: "tma-1-ecbde",
  storageBucket: "tma-1-ecbde.appspot.com",
  messagingSenderId: "558204099634",
  appId: "1:558204099634:web:1caf1df215509c0f0a702b"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export { db, ref, set, get, child, push };
