import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCTOuiuT5dqmR5cL6qahK_j9afLBP0K3f0",
  authDomain: "clase02042022-af765.firebaseapp.com",
  projectId: "clase02042022-af765",
  storageBucket: "clase02042022-af765.appspot.com",
  messagingSenderId: "245375031856",
  appId: "1:245375031856:web:1a9db3e4b6424a4c7eabf5",
  measurementId: "G-3P6283T3SD" 
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;