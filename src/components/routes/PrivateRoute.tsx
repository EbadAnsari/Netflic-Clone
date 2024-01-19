import { useUser } from "@context/AuthContext";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ element }: { element: ReactNode }) {
	const authContext = useUser();

	if (!(authContext?.user?.email && authContext.userInformation?.paid))
		return <Navigate to="/in" />;

	return element;
}
