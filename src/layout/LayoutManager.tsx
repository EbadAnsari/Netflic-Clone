import HomeLayout from "@layout/HomeLayout";
import LandingPage from "@layout/LandingPageLayout";
import LandingSignIn, { SignInAction } from "@routes/landing-page/SignIn";
import LandingSignUp, { SignUpAction } from "@routes/landing-page/SignUp";
import Password from "@routes/signup/Password";
import PlanForm from "@routes/signup/PlanForm";
import SignUpHome from "@routes/signup/SignUpHome";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import SignUpLayout from "@layout/SignUpLayout";
import PrivateRoute from "@components/routes/PrivateRoute";

console.log("as");
const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route
				element={<PrivateRoute element={<HomeLayout />} />}
				index
			></Route>
			{/* <Route index element={<HomeLayout />}></Route> */}
			<Route path="in" action={SignUpAction} element={<LandingPage />}>
				<Route index element={<LandingSignUp />}></Route>
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
