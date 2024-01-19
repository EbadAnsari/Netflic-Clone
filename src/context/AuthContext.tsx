import { auth } from "@utils/firebase-config";
import { User } from "@class/User";
import {
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
	return signInWithEmailAndPassword(auth, email, password);
}
export function signIn(email: string, password: string) {
	return createUserWithEmailAndPassword(auth, email, password);
}
export function logout() {
	return signOut(auth);
}

const AuthenticationContext = createContext<User>(new User(null));

export function useUser() {
	return useContext(AuthenticationContext);
}

export default function Authentication({
	children,
}: Readonly<PropsWithChildren>) {
	const [currentUserDetails, setCurrentUserDetails] = useState<User>(
		new User(null),
	);

	const userDetails = new User(setCurrentUserDetails);

	useEffect(() => {
		const unscribe = onAuthStateChanged(auth, (user) => {
			if (!user) return;

			userDetails
				.setUser(user)
				.then(() => setCurrentUserDetails(userDetails));
		});

		return unscribe;
	}, []);

	return (
		<AuthenticationContext.Provider value={currentUserDetails}>
			{children}
		</AuthenticationContext.Provider>
	);
}
