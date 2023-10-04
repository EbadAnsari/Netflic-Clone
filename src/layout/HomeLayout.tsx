import Footer from "@components/Footer";
import Navbar from "@components/Navbar";
import ImageButton from "@components/PlayButton";
import Scroller from "@components/Scroller";
import TrailerModal from "@components/TrailerModal";
import { add, close } from "@store/slice/TrailerModalSlice";
import { useTheme } from "@utils/functions";
import Chance from "chance";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function HomeLayout() {
	const dispatch = useDispatch();

	const theme = useTheme();

	theme.setTheme("dark");

	const chance = new Chance();

	useEffect(() => {
		dispatch(close());
	}, []);

	return (
		<section className="bg-[#18181b]">
			<Navbar />
			<section className="banner relative">
				<video
					className="h-[56.25vw] w-full object-cover brightness-[80%] transition duration-500"
					src="/public/videos/temp/big-buck-bunny.mp4"
					autoPlay
					muted
					loop
					style={{
						WebkitMask:
							"linear-gradient(rgba(0, 0, 0, 1) 14%, rgba(0, 0, 0, 1) 54%, rgba(255, 255, 255, 0.6) 80%, transparent)",
					}}
				/>
				<div className="absolute top-2/3 ml-[5%] flex w-max gap-3 dark:text-zinc-900">
					<ImageButton
						icon="/public/icons/play-icon.svg"
						text="Play"
						className="w-full"
					/>
					<ImageButton
						onClick={() => {
							dispatch(add());
						}}
						icon="/public/icons/info-icon.svg"
						text="More info"
						className="w-full bg-white bg-opacity-40 text-white"
					/>
				</div>
			</section>

			<Scroller
				title="Popular Shows"
				className="mx-auto w-[max(90%,10rem)] max-w-[90rem]"
			>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
				<div className="flex aspect-video h-full w-36 sm:w-40 md:w-56">
					<img
						src="/public/images/big-buck-bunny.png"
						alt="big-buck-bunny.png"
					/>
				</div>
			</Scroller>

			<TrailerModal
				title="Big Buck Bunny"
				genre="Comedy"
				videoSource="/public/videos/temp/big-buck-bunny.mp4"
				duration={600}
				description="Three rodents amuse themselves by harassing creatures of the forest. However, when they mess with a bunny, he decides to teach them a lesson."
			/>

			{/* <Footer /> */}
			<Footer
				textLink={[
					{ text: "FAQ", link: "#" },
					{ text: "Help Centre", link: "#" },
					{ text: "Account", link: "#" },
					{ text: "Media Centre", link: "#" },
					{ text: "Investor Relations", link: "#" },
					{ text: "Jobs", link: "#" },
					{ text: "Ways to Watch", link: "#" },
					{ text: "Terms of Use", link: "#" },
					{ text: "Privacy", link: "#" },
					{ text: "Cookie Preferences", link: "#" },
					{ text: "Corporate Information", link: "#" },
					{ text: "Contact Us", link: "#" },
					{ text: "Speed Test", link: "#" },
					{ text: "Legal Notices", link: "#" },
					{ text: "Only on Netflix", link: "#" },
				]}
			/>
		</section>
	);
}
