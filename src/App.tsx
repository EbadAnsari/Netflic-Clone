import Layout from "@layout/LayoutManager";
import MediaQuery from "./MediaQuery";
import Test from "@components/Test";
import Spinner from "@components/Spinner";
import LoadingSpinner from "@components/icons/LoadingSpinner";

export default function App() {
	return (
		<>
			<Layout />
			{/* <Test /> */}
			{/* <div className="w-5"> */}
			{/* <Spinner animate dotColor="#000" /> */}
			{/* <LoadingSpinner width="5px" /> */}
			{/* </div> */}
			<MediaQuery />
		</>
	);
}
