import { initializeApp } from 'firebase/app';
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";

// TODO: Replace with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyDk7vrBX3YqrHLm3yEOiyhsv2183u2nmZg",
    authDomain: "my-react-blog-55666.firebaseapp.com",
    databaseURL: "https://my-react-blog-55666-default-rtdb.firebaseio.com",
    projectId: "my-react-blog-55666",
    storageBucket: "my-react-blog-55666.appspot.com",
    messagingSenderId: "200867363027",
    appId: "1:200867363027:web:5397026dbec90ae37c7c26"
};

const app = initializeApp(firebaseConfig);

// Get a reference to the database service
const database = getDatabase(app);

export default database

export const auth = getAuth(app);
