import Footer from "@components/Footer";
import TrailerModal from "@components/TrailerModal";
import Navbar from "@components/Navbar";
import PlayButton from "@components/PlayButton";
import { useSession } from "@hooks/Storage";
import { add, close } from "@store/slice/TrailerModalSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import VideoPlay from "@components/VideoPlay";

export default function HomeLayout() {
	const session = useSession();
	const dispatch = useDispatch();

	if (!(session.get("email") && session.get("password"))) {
		return <Navigate to={"/sign/up"} />;
	}

	useEffect(() => {
		dispatch(close());
	}, []);

	return (
		<section className="bg-[#18181b]">
			<Navbar />
			<section className="banner relative">
				<video
					className="h-[56.25vw] w-full object-cover brightness-[60%] transition duration-500"
					src="/public/videos/temp/big-buck-bunny.mp4"
					autoPlay
					muted
					loop
				/>
				<div className="absolute top-2/3 ml-10 flex w-max gap-3">
					<PlayButton
						icon="/public/icons/play-icon.svg"
						text="Play"
						className="w-full gap-2 [&>div]:w-9 [&>p]:text-xl"
					/>
					<PlayButton
						onClick={() => {
							dispatch(add());
						}}
						icon="/public/icons/info-icon.svg"
						text="More info"
						className="w-full gap-3 bg-white bg-opacity-40 text-white [&>div]:w-9 [&>p]:text-xl"
					/>
				</div>
			</section>

			{/* <VideoPlay /> */}

			<TrailerModal
				title="Big Buck Bunny"
				genre="Comedy"
				videoSource="/public/videos/temp/big-buck-bunny.mp4"
				duration={600}
				description="Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson."
			/>

			<Footer />
		</section>
	);
}
