import { TMDBResult as MovieInfo } from "@interfaces/TheMovieDBInterface";
import {
	User as FirebaseUser,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";
import { auth, firestore } from "@utils/firebase-config";
import { Nullable } from "@interfaces/interface";

type UserDispatch = Dispatch<SetStateAction<User>>;
type Payment =
	| {
			paid: false;
			time?: Date;
	  }
	| { paid: true; time: Date };

export interface UserInfo {
	email: string | null;
	uid: string;
	payment: Payment;
	likedMovies: string[];
}

export interface UserInterface {
	user: FirebaseUser;
	userInformation: UserInfo;
}

export class User implements Nullable<UserInterface> {
	static Collection = {
		likedMovieCollection: "liked-movie",
		userInfoCollection: "user-info",
	} as const;

	static DocumentReference = {
		likedMovieDocumentReference: (id: number) =>
			doc(firestore, User.Collection.likedMovieCollection, `${id}`),
		userInformationDocumentReference: (id: string) =>
			doc(firestore, User.Collection.userInfoCollection, id),
	} as const;

	user: FirebaseUser | null;
	userInformation: UserInfo | null;

	private dispatch: UserDispatch | null;

	private addUser(user: UserInfo) {
		return setDoc(this.userInfoDocRef(user.uid), user);
	}

	private async getUser(uid: string) {
		return (await getDoc(this.userInfoDocRef(uid))).data() as UserInfo;
	}

	constructor(dispatch: UserDispatch | null) {
		this.user = this.userInformation = null;
		this.dispatch = dispatch;
	}

	setDispatchFunction(dispatch: UserDispatch) {
		this.dispatch = dispatch;
	}

	userInfoDocRef(uid: string) {
		return doc(firestore, User.Collection.userInfoCollection, uid);
	}
	likedMovieDocRef(movieId: number) {
		return doc(
			firestore,
			User.Collection.likedMovieCollection,
			`${movieId}`,
		);
	}

	login(email: string, password: string) {
		return signInWithEmailAndPassword(auth, email, password);
	}
	signin(email: string, password: string) {
		return createUserWithEmailAndPassword(auth, email, password);
	}
	logout() {
		return signOut(auth);
	}

	async setUser(user: FirebaseUser) {
		if (!this.dispatch) return;

		this.user = user;
		try {
			this.userInformation = await this.getUser(user.uid);
		} catch (error) {
			console.log(
				this.addUser({
					likedMovies: [],
					payment: { paid: false },
					uid: this.user.uid,
					email: this.user.email,
				}),
			);
		}
		this.dispatch(this);
	}

	async likeMovie(movieInfo: MovieInfo) {
		if (!this.user) throw new Error("User must be set user.");
		else if (!this.userInformation)
			throw new Error("Unable to like movie.");

		this.userInformation.likedMovies.push(`${movieInfo.id}`);

		const likeMovie = Promise.all([
			setDoc(
				User.DocumentReference.likedMovieDocumentReference(
					movieInfo.id,
				),
				movieInfo,
			),
			setDoc(
				User.DocumentReference.userInformationDocumentReference(
					this.userInformation.uid,
				),
				this.userInformation,
			),
		]);

		(await likeMovie).forEach((value) => {
			console.log(value);
		});
	}
}
