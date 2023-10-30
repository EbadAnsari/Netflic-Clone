import Layout from "@layout/LayoutManager";
import MediaQuery from "./MediaQuery";
import Test from "@components/Test";
import Spinner from "@components/Spinner";
import LoadingSpinner from "@components/icons/LoadingSpinner";
import FixedList from "@components/FixedList";

export default function App() {
	return (
		<>
			<div>
				<Layout />
				<MediaQuery />
			</div>
			{/* <div className=""> */}
			{/* <FixedList /> */}
			{/* </div> */}
			{/* <Test /> */}
			{/* <div className="w-5"> */}
			{/* <Spinner animate dotColor="#000" /> */}
			{/* <LoadingSpinner width="5px" /> */}
			{/* </div> */}
		</>
	);
}
