import { useAuth } from "@context/AuthContext";
import { Navigate, RouteProps } from "react-router-dom";

interface PrivateRouteProps {
	redirectTo?: string;
}

export default function PrivateRoute({
	element,
	redirectTo,
}: RouteProps & PrivateRouteProps) {
	const authContext = useAuth();
	return authContext ? element : <Navigate to={redirectTo ?? "/in"} />;
}
