import PrivateRoute from "@components/routes/PrivateRoute";
import LandingSignIn from "@components/routes/in/Login";
import LandingSignUp, { landingPage } from "@components/routes/in/SignUp";
import Films from "@components/routes/root/Films";
import Homepage from "@components/routes/root/Homepage";
import LikedMovies from "@components/routes/root/LikedMovies";
import Series from "@components/routes/root/Series";
import UserInfo from "@components/routes/root/UserInfo";
import Password, { passwordAction } from "@components/routes/signup/Password";
import HomeLayout from "@layout/HomeLayout";
import LandingPage from "@layout/LandingPageLayout";
import SignUpLayout from "@layout/SignUpLayout";
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
			<Route path="/" element={<PrivateRoute element={<HomeLayout />} />}>
				<Route index element={<Homepage />}></Route>
				<Route path="series" element={<Series />}></Route>
				<Route path="films" element={<Films />}></Route>
				<Route path="my-list" element={<LikedMovies />}></Route>
				<Route path="user" element={<UserInfo />}></Route>
			</Route>
			<Route path="in" element={<LandingPage />} action={landingPage}>
				<Route index element={<LandingSignUp />}></Route>
				<Route path="login" element={<LandingSignIn />}></Route>
			</Route>
			<Route path="signup" element={<SignUpLayout />}>
				<Route
					index
					element={<PrivateRoute element={<SignUpHome />} />}
				></Route>
				<Route path="planform" element={<PlanForm />}></Route>
				<Route
					path="password"
					element={<Password />}
					action={passwordAction}
				></Route>
			</Route>
		</Route>,
	),
);

export default function Layout() {
	return <RouterProvider router={router} />;
}
