import { User } from "@class/User";
import { auth } from "@utils/firebase-config";
import { onAuthStateChanged } from "firebase/auth";
import {
	PropsWithChildren,
	createContext,
	useContext,
	useEffect,
	useState,
} from "react";

const UserContext = createContext<User>(new User(null));

export function useUser() {
	return useContext(UserContext);
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

			userDetails.setUser(user).then(() => {
				setCurrentUserDetails(userDetails);
				// userDetails.logout();
			});
		});

		return unscribe;
	}, []);

	return (
		<UserContext.Provider value={currentUserDetails}>
			<div
				className="fixed left-1/2 z-[999] bg-red-200 p-6"
				onClick={() => {
					userDetails.logout();
				}}
			>
				Delete
			</div>
			{children}
		</UserContext.Provider>
	);
}
