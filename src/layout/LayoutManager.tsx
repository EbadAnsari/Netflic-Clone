import PrivateRoute from "@components/routes/PrivateRoute";
import Homepage from "@components/routes/root/Homepage";
import LikedMovies from "@components/routes/root/LikedMovies";
import UserInfo from "@components/routes/root/UserInfo";
import Password from "@components/routes/signup/Password";
import HomeLayout from "@layout/HomeLayout";
import LandingPage from "@layout/LandingPageLayout";
import SignUpLayout from "@layout/SignUpLayout";
import LandingSignIn, { SignInAction } from "@routes/landing-page/SignIn";
import LandingSignUp from "@routes/landing-page/SignUp";
import PlanForm from "@routes/signup/PlanForm";
import SignUpHome from "@routes/signup/SignUpHome";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route
				path="/"
				element={<PrivateRoute element={<HomeLayout />} />}
				action={() => {
					console.log("E");

					return null;
				}}
			>
				<Route index element={<Homepage />}></Route>
				<Route path=":userId" element={<LikedMovies />}></Route>
				<Route path="user/:userId" element={<UserInfo />}></Route>
			</Route>
			<Route path="in" element={<LandingPage />}>
				<Route index element={<LandingSignUp />}></Route>
				<Route
					path="login"
					action={SignInAction}
					element={<LandingSignIn />}
				></Route>
			</Route>
			<Route path="signup" element={<SignUpLayout />}>
				<Route
					index
					element={<PrivateRoute element={<SignUpHome />} />}
				></Route>
				<Route path="planform" element={<PlanForm />}></Route>
				<Route path="password" element={<Password />}></Route>
			</Route>
		</Route>,
	),
);

export default function Layout() {
	return <RouterProvider router={router} />;
}
