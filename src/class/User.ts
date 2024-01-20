import { TMDBResult as MovieInfo } from "@interfaces/TheMovieDBInterface";
import { Nullable } from "@interfaces/interface";
import { auth, firestore } from "@utils/firebase-config";
import {
	User as FirebaseUser,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "firebase/auth";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { Dispatch, SetStateAction } from "react";

type UserDispatch = Dispatch<SetStateAction<User>>;
type Payment =
	| {
			paid: false;
			time?: Timestamp;
	  }
	| { paid: true; time: Timestamp };

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

export class UserError extends Error {
	static UserNotSet = "User must be set.";
	static DispatchNotSet = "Dispatch not set.";
}

export class User implements Nullable<UserInterface> {
	static Collection = {
		likedMovieCollection: "liked-movie",
		userInformationCollection: "user-info",
	} as const;

	static DocumentReference = {
		likedMovieDocumentReference: (id: number) =>
			doc(firestore, User.Collection.likedMovieCollection, `${id}`),
		userInformationDocumentReference: (uid: string) =>
			doc(firestore, User.Collection.userInformationCollection, uid),
	} as const;

	user: FirebaseUser | null;
	userInformation: UserInfo | null;

	private dispatch: UserDispatch | null;

	private addUser(user: UserInfo) {
		return setDoc(this.userInformationDocRef(user.uid), user);
	}

	private async getUser(uid: string) {
		return (
			await getDoc(this.userInformationDocRef(uid))
		).data() as UserInfo;
	}

	private checkUser(user: FirebaseUser | null): user is null {
		return user === null;
	}
	private checkDispatch(dispatch: UserDispatch | null): dispatch is null {
		return dispatch === null;
	}

	constructor(dispatch: UserDispatch | null) {
		this.user = this.userInformation = null;
		this.dispatch = dispatch;
	}

	setDispatchFunction(dispatch: UserDispatch) {
		this.dispatch = dispatch;
	}
	userInformationDocRef(uid: string) {
		return doc(firestore, User.Collection.userInformationCollection, uid);
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

	/**
	 * Use upload the user information in the database.
	 */
	async setUser(user: FirebaseUser) {
		if (this.checkDispatch(this.dispatch)) {
			throw new UserError(UserError.UserNotSet);
		}

		this.user = user;
		try {
			this.userInformation = await this.getUser(user.uid);
			console.log("Get user");
		} catch (error) {
			await this.addUser({
				likedMovies: [],
				payment: { paid: false },
				uid: this.user.uid,
				email: this.user.email,
			});
		}
		this.dispatch(this);
	}

	/**
	 * Use to set the payment to true.
	 */
	async setPaid() {
		if (this.checkUser(this.user))
			throw new UserError(UserError.UserNotSet);
		return setDoc(
			User.DocumentReference.userInformationDocumentReference(
				this.user?.uid,
			),
			{
				...this.userInformation,
				payment: { paid: true, time: Timestamp.now() },
			},
		);
	}

	/**
	 * Use to set the liked movie.
	 */
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
