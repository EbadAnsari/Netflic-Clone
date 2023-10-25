import { login, logout, signIn, useAuth } from "@context/AuthContext";
let i = 0;

export default function Test() {
	// fetch()
	// 	.then((res) => res.json())
	// 	.then((data) => {});

	(async function () {
		const auth = useAuth();

		// await logout();

		console.log(i++);

		try {
			// await login("ebadansari414@gmail.com", "ebadansari");
		} catch {
			// await signIn("ebadansari414@gmail.com", "ebadansari");
		}

		// console.log(auth, auth && auth.reloadUserInfo.email);
	})();

	return <div>Test mounted</div>;
}
