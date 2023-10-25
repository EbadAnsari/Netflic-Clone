import { TMDBResult } from "@interfaces/TheMovieDBInterface";
import { auth, firestore } from "@utils/firebase-config";
import {
	User,
	createUserWithEmailAndPassword,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { collection, getDocs, query, setDoc, where } from "firebase/firestore";
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

export async function setFavouriteMovie(
	oldFavouriteMoviesId: TMDBResult["id"],
	newFavouriteMoviesId: TMDBResult["id"],
) {
	// setDoc
}

export async function setPayment() {
	// setDoc
}

interface UserInterface {
	user: User | null;
	userInfo: {
		email: string;
		isPaid?: boolean;
		favouriteMovies?: number[];
	} | null;
}

const AuthenticationContext = createContext<UserInterface | null>(null);

export function useAuth() {
	return useContext(AuthenticationContext);
}

export default function Authentication({ children }: PropsWithChildren) {
	const [currentUserDetails, setCurrentUserDetails] =
		useState<UserInterface | null>(null);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user)
				getDocs(
					query(
						collection(firestore, "user-info"),
						where("email", "==", user.email),
					),
				).then((data) => {
					data.forEach((e) => {
						setCurrentUserDetails({
							user,
							userInfo: e.data() as UserInterface["userInfo"],
						});
					});
				});
			setCurrentUserDetails({
				user,
				userInfo: null,
			});
		});
	}, []);

	return (
		<AuthenticationContext.Provider value={currentUserDetails}>
			{children}
		</AuthenticationContext.Provider>
	);
}
