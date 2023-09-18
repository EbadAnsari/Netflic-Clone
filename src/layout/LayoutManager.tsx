import PlanForm from "@components/signup/PlanForm";
import LandingSignIn, { SignInAction } from "@components/landing-page/SignIn";
import LandingSignUp, { SignUpAction } from "@components/landing-page/SignUp";
import Password from "@components/signup/Password";
import SignUpHome from "@components/signup/SignUpHome";
import HomeLayout from "@layout/HomeLayout";
import LandingPage from "@layout/LandingPageLayout";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import SignUpLayout from "./SignUpLayout";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<HomeLayout />}></Route>
			<Route path="in" element={<LandingPage />}>
				<Route
					index
					element={<LandingSignUp />}
					action={SignUpAction}
				></Route>
				<Route
					path="login"
					action={SignInAction}
					element={<LandingSignIn />}
				></Route>
			</Route>
			<Route path="signup" element={<SignUpLayout />}>
				<Route index element={<SignUpHome />}></Route>
				<Route path="planform" element={<PlanForm />}></Route>
				<Route path="password" element={<Password />}></Route>
			</Route>
		</Route>,
	),
);

export default function Layout() {
	return <RouterProvider router={router} />;
}
