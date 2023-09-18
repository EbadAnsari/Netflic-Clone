import Layout from "@layout/LayoutManager";
import { useState } from "react";
import MediaQuery from "./MediaQuery";
import { useTheme } from "@utils/functions";

export default function App() {
	useTheme("dark");

	return (
		<>
			<MediaQuery />
			<Layout />
		</>
	);
}
