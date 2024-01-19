import { useUser } from "@context/AuthContext";
import { ReactNode } from "react";
import { Navigate, RouteProps } from "react-router-dom";

interface ConditionalRouteProps {
	redirectTo: string;
	element: ReactNode;
	condition?: boolean;
}

export default function ConditionalRoute({
	element,
	condition,
}: ConditionalRouteProps) {
	// debugger;
	return condition ? element : <Navigate to="/in" />;
}
