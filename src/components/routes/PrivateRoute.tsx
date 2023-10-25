import { useAuth } from "@context/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element }: { element: ReactNode }) {
	const authContext = useAuth();

	console.log(authContext);

	if (!(authContext?.user?.email && authContext.userInfo?.isPaid))
		return <Navigate to="/in" />;

	return element;
}
