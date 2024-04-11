import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD22J43a1dU-pe2XxZjnJlWiKG_JwsEgT8",
    authDomain: "mini-blog-8194c.firebaseapp.com",
    projectId: "mini-blog-8194c",
    storageBucket: "mini-blog-8194c.appspot.com",
    messagingSenderId: "548309309473",
    appId: "1:548309309473:web:3c319f90146f52b4d76b60"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };