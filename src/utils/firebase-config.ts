import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
	apiKey: "AIzaSyAwnq1503UtcsQ2wGivAugSyc0ezKwO7Jc",
	authDomain: "netflix-414.firebaseapp.com",
	projectId: "netflix-414",
	storageBucket: "netflix-414.appspot.com",
	messagingSenderId: "1058952696858",
	appId: "1:1058952696858:web:7945d6f7f4638ed4d3ada3",
	measurementId: "G-0VN2JJ943D",
});

export const auth = getAuth(app);
export const firestore = getFirestore(app);
