import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// SolarInspetion Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCFTnEJdniwUag6QkfqmNTPQWXyFeQLDE",
    authDomain: "solarinspection.firebaseapp.com",
    projectId: "solarinspection",
    storageBucket: "solarinspection.firebasestorage.app",
    messagingSenderId: "682683769979",
    appId: "1:682683769979:web:9f8cf691d11f42bb79eede",
    measurementId: "G-YW7GCKNCNB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);

export default app;
