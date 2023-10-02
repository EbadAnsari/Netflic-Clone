import { auth } from "@utils/firebase-config";
import {
	User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

export function login(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password);
}
export function signIn(email: string, password: string) {
	return signInWithEmailAndPassword(auth, email, password);
}
export function logout() {
	return signOut(auth);
}

const AuthenticationContext = createContext<User | boolean | null>(true);

export function useAuth() {
	return useContext(AuthenticationContext);
}

export default function Authentication({ children }: PropsWithChildren) {
	const [currentUser, setCurrentUser] = useState<User | boolean | null>(true);

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (user) => {
	// 		setCurrentUser(user);
	// 	});
	// }, []);

	return (
		<AuthenticationContext.Provider value={currentUser}>
			{children}
		</AuthenticationContext.Provider>
	);
}
