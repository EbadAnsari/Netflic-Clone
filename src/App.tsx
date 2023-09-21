import Layout from "@layout/LayoutManager";
import MediaQuery from "./MediaQuery";
import { isMobileDevice } from "@utils/functions";

export default function App() {
	console.log(isMobileDevice());
	return (
		<>
			<MediaQuery />
			<Layout />
		</>
	);
}
