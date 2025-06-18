import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBL8AITGV-0pn0n_U5_q7R9TF4vn71pB3E",
  authDomain: "contatos-emergencia.firebaseapp.com",
  projectId: "contatos-emergencia",
  storageBucket: "contatos-emergencia.appspot.com",
  messagingSenderId: "839952391789",
  appId: "1:839952391789:web:31ef230cffdfd395226964",
  databaseURL: "https://contatos-emergencia-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);


/*import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBL8AITGV-0pn0n_U5_q7R9TF4vn71pB3E",
  authDomain: "contatos-emergencia.firebaseapp.com",
  databaseURL: "https://contatos-emergencia-default-rtdb.firebaseio.com",
  projectId: "contatos-emergencia",
  storageBucket: "contatos-emergencia.appspot.com",
  messagingSenderId: "839952391789",
  appId: "1:839952391789:web:31ef230cffdfd395226964"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);

signInAnonymously(auth).catch((error) => {
  console.error('Erro no login anônimo:', error);
});

export { db };*/