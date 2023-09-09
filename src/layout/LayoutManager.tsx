import SignIn, { SignInAction } from "@components/SignIn";
import SignUp, { SignUpAction } from "@components/SignUp";
import HomeLayout from "@layout/HomeLayout";
import LandingPage from "@layout/LandingPageLayout";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/">
			<Route index element={<HomeLayout />}></Route>
			<Route path="sign" element={<LandingPage />}>
				<Route
					path="up"
					element={<SignUp />}
					action={SignUpAction}
				></Route>
				<Route
					path="in"
					action={SignInAction}
					element={<SignIn />}
				></Route>
			</Route>
		</Route>,
	),
);

export default function Layout() {
	return <RouterProvider router={router} />;
}
