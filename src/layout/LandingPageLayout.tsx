import Footer from "@components/Footer";
import QuestionAnswer from "@components/QuestionAnswer";
import SelectLanguage from "@components/SelectLanguage";
import { SigningState } from "@interfaces/interface";
import { setTheme } from "@utils/functions";
import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";

export default function LandingPage() {
	const variant: SigningState = useSelector(
		(state: any) => state.SigningReducer,
	);

	setTheme("dark");

	const questionAndAnswer = [
		{
			question: "What is Netflix?",
			answer: [
				"Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more - on thousands of internet-connected devices.",
				"You can watch as much as you want, whenever you want, without a single ad all for one low monthly price. There's always something new to discover, and new TV shows and movies are added every week!",
			],
		},
		{
			question: "How much does Netflix cost?",
			answer: [
				"Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 649 to ₹ 149 a month. No extra costs, no contracts.",
			],
		},
		{
			question: "Where can I watch?",
			answer: [
				"Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.",
				"You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
			],
		},
		{
			question: "How do I cancel?",
			answer: [
				"Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees start or stop your account anytime.",
			],
		},
		{
			question: "What can I watch on Netflix?",
			answer: [
				"Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.",
			],
		},
		{
			question: "Is Netflix good for kids?",
			answer: [
				"The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space.",
				"Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don’t want kids to see.",
			],
		},
	];

	return (
		<>
			<nav className="absolute top-0 h-20 w-full md:bg-transparent lg:h-[86px]">
				<div className="mx-auto flex h-full items-center justify-between px-5 xl:max-w-6xl">
					<a
						href="https://www.netflix.com/in/"
						target="_blank"
						className="left w-24 lg:w-36"
					>
						<img src="/public/icons/netflix-logo.svg" />
					</a>

					<div className="right flex items-center gap-x-6">
						<SelectLanguage shrink />

						<Link
							to={variant.location}
							className="rounded-[4px] bg-[#e50914] px-4 py-1 font-semibold text-white"
						>
							{variant.text}
						</Link>
					</div>
				</div>
			</nav>

			<Outlet />

			<hr className="h-2 border-0 bg-[#232323]" />

			<section>
				<div className="bg-black py-14">
					<div className="mx-9 grid-cols-12 items-center lg:grid xl:mx-auto xl:w-[calc(100%_-_20rem)]">
						<div className="left col-span-6 flex flex-col gap-y-6 lg:grid">
							<h1 className="text-center text-3xl font-black text-white lg:text-left lg:text-5xl">
								Enjoy on your TV
							</h1>
							<p className="text-center text-lg text-white lg:text-left lg:text-2xl">
								Watch on smart TVs, PlayStation, Xbox,
								Chromecast, Apple TV, Blu-ray players and more.
							</p>
						</div>
						<div className="right col-span-6 bg-transparent">
							<div className="relative mx-auto grid w-fit grid-cols-12 items-center justify-items-center">
								<video
									loop
									muted
									autoPlay
									playsInline
									src="/public/videos/tv-video.m4v"
									className="absolute left-[13%] top-[22%] col-span-12 col-start-1 row-start-1 w-[74%] -translate-y-2"
								></video>
								<img
									src="/public/images/tv.png"
									className="relative z-20 col-span-12 col-start-1 row-start-1 mx-auto"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<hr className="h-2 border-0 bg-[#232323]" />

			<section>
				<div className="bg-black py-14">
					<div className="mx-9 flex grid-cols-12 flex-col-reverse items-center lg:grid xl:mx-auto xl:w-[calc(100%_-_20rem)]">
						<div className="right relative col-span-6">
							<img
								src="/public/images/mobile.jpg"
								className="mx-auto"
							/>
							<div className="absolute bottom-[7%] left-1/2 grid w-[70%] -translate-x-1/2 grid-cols-12 items-center justify-between gap-x-3 rounded-lg border-2 border-solid border-[#5f5e5e] bg-black px-3 py-2 sm:w-3/5 sm:rounded-xl 2xl:justify-normal">
								<img
									src="/public/images/mobile-image.png"
									className="col-span-2"
								/>
								<div className="col-span-8 2xl:w-full">
									<p className="text-xs font-bold text-white sm:text-base">
										Stranger Things
									</p>
									<p className="text-xs text-[#0071eb] sm:text-base">
										Downloading...
									</p>
								</div>
								<div
									className="col-span-2 aspect-square bg-cover bg-center"
									style={{
										backgroundImage:
											"url('/public/gifs/download-icon.gif')",
									}}
								></div>
							</div>
						</div>
						<div className="left col-span-6 flex flex-col gap-y-6 lg:grid">
							<h1 className="text-center text-3xl font-black text-white lg:text-left lg:text-5xl">
								Download your shows to watch offline
							</h1>
							<p className="text-center text-lg text-white lg:text-left lg:text-2xl">
								Save your favourites easily and always have
								something to watch.
							</p>
						</div>
					</div>
				</div>
			</section>

			<hr className="h-2 border-0 bg-[#232323]" />

			<section>
				<div className="bg-black py-14">
					<div className="mx-9 grid-cols-12 items-center lg:grid xl:mx-auto xl:w-[calc(100%_-_20rem)]">
						<div className="left col-span-6 flex flex-col gap-y-6 lg:grid">
							<h1 className="text-center text-3xl font-black text-white lg:text-left lg:text-5xl">
								Watch everywhere
							</h1>
							<p className="text-center text-lg text-white lg:text-left lg:text-2xl">
								Stream unlimited movies and TV shows on your
								phone, tablet, laptop, and TV.
							</p>
						</div>
						<div className="right relative col-span-6 bg-transparent">
							<div className="relative mx-auto grid w-fit grid-cols-12 items-center justify-items-center">
								<video
									loop
									muted
									autoPlay
									playsInline
									src="/public/videos/monitor-mobile-tab-video.m4v"
									className="absolute left-[49.1%] top-[10.1%] col-span-12 col-start-1 row-start-1 w-[62%] -translate-x-1/2"
								></video>

								<img
									src="/public/images/monitor-mobile-tab.png"
									className="relative z-20 col-span-12 col-start-1 row-start-1 mx-auto"
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<hr className="h-2 border-0 bg-[#232323]" />

			<section>
				<div className="bg-black py-14">
					<div className="mx-9 flex grid-cols-12 flex-col-reverse items-center lg:grid xl:mx-auto xl:w-[calc(100%_-_20rem)]">
						<div className="right relative col-span-6">
							<img
								src="/public/images/kids-profile-image.png"
								className="mx-auto"
							/>
						</div>
						<div className="left col-span-6 flex flex-col gap-y-6 lg:grid">
							<h1 className="text-center text-3xl font-black text-white lg:text-left lg:text-5xl">
								Create profiles for kids
							</h1>
							<p className="text-center text-lg text-white lg:text-left lg:text-2xl">
								Send children on adventures with their favourite
								characters in a space made just for them—free
								with your membership.
							</p>
						</div>
					</div>
				</div>
			</section>

			<hr className="h-2 border-0 bg-[#232323]" />

			<section>
				<div className="bg-black py-14">
					<div className="mx-9 xl:mx-auto xl:w-[calc(100%_-_20rem)] 2xl:w-[74rem]">
						<h1 className="text-center text-3xl font-black text-white lg:text-5xl">
							Frequently Asked Questions
						</h1>
						<QuestionAnswer questionAndAnswer={questionAndAnswer} />
					</div>
				</div>
			</section>

			<hr className="h-2 border-0 bg-[#232323]" />

			<section className="mx-auto bg-black [&>footer]:w-11/12 dark:[&>footer]:bg-black">
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
		</>
	);
}
