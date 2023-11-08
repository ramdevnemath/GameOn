import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyDvSlbUuIubg0VELRD8RHqKoWlfddqTpFc",
  authDomain: "gameon-401112.firebaseapp.com",
  projectId: "gameon-401112",
  storageBucket: "gameon-401112.appspot.com",
  messagingSenderId: "490901314465",
  appId: "1:490901314465:web:5fa9eef1396333f27ac9e0",
  measurementId: "G-JYVMJZHWJ5"
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)