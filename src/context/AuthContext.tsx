import { auth } from "@utils/firebase-config";
import { User, onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, createContext, useEffect, useState } from "react";

export interface AuthenticationContextInterface {
	signIn: (email: string, password: string) => void;
	login: (email: string, password: string) => void;
	currentUser: User | null;
}

export const AuthenticationContext =
	createContext<AuthenticationContextInterface | null>(null);

export default function Authentication({ children }: PropsWithChildren) {
	const [currentUser, setCurrentUser] = useState<User | null>(null);

	function login(email: string, password: string) {
		console.log("Login with : ", { email, password });
	}

	function signIn(email: string, password: string) {
		console.log("Sign In with : ", { email, password });
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			setCurrentUser(user);
		});
	}, []);

	return (
		<AuthenticationContext.Provider value={{ currentUser, login, signIn }}>
			{children}
		</AuthenticationContext.Provider>
	);
}
