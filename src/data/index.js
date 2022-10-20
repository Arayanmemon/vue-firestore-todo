import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCtslJkQ7dwUaES1oR4WIVw_QDl9m2HiXM",
  authDomain: "todo-app-2bccb.firebaseapp.com",
  projectId: "todo-app-2bccb",
  storageBucket: "todo-app-2bccb.appspot.com",
  messagingSenderId: "389594824682",
  appId: "1:389594824682:web:f27c0f88fee08912c6bc93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export{ db};