import { getFirestore }
from "firebase/firestore";

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyC5qtX6sDdyTjJr1RWoB6YVA6YnVwMHTJg",
  authDomain: "study-ai-f5e85.firebaseapp.com",
  projectId: "study-ai-f5e85",
  storageBucket: "study-ai-f5e85.appspot.com",
  messagingSenderId: "59916159595",
  appId: "1:59916159595:web:fdf0724cb66cb9df7c3f2e"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db =
  getFirestore(app);