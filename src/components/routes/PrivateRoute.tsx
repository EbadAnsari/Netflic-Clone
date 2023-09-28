import { AuthenticationContext } from "@context/AuthContext";
import { useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";

export default function PrivateRoute({ element }: RouteProps) {
	const context = useContext(AuthenticationContext);

	// if (!context?.currentUser) return <Navigate to={"/in/login"} />;

	console.log("as");
	console.log(element);

	return element;
}
