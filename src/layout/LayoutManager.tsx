import PrivateRoute from "@components/routes/PrivateRoute";
import Password, { PasswordAction } from "@components/routes/signup/Password";
import HomeLayout from "@layout/HomeLayout";
import LandingPage from "@layout/LandingPageLayout";
import SignUpLayout from "@layout/SignUpLayout";
import LandingSignIn, { SignInAction } from "@routes/landing-page/SignIn";
import LandingSignUp, { SignUpAction } from "@routes/landing-page/SignUp";
import PlanForm, { PlanFormAction } from "@routes/signup/PlanForm";
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
				index
				element={
					<PrivateRoute redirectTo="/in" element={<HomeLayout />} />
				}
			></Route>
			<Route path="in" action={SignUpAction} element={<LandingPage />}>
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
					element={
						<PrivateRoute
							redirectTo="/signup/password"
							element={<SignUpHome />}
						/>
					}
				></Route>
				<Route
					path="planform"
					element={
						<PrivateRoute
							redirectTo="/signup/password"
							element={<PlanForm />}
						/>
					}
					action={PlanFormAction}
				></Route>
				<Route
					path="password"
					element={<Password />}
					action={PasswordAction}
				></Route>
			</Route>
		</Route>,
	),
);

export default function Layout() {
	return <RouterProvider router={router} />;
}
