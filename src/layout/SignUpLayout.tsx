import Footer from "@components/Footer";
import ThemeButton from "@components/ThemeButton";
import { useTheme } from "@utils/functions";
import { Outlet } from "react-router-dom";

export default function SignUpLayout() {
	const theme = useTheme();
	theme.setTheme("light");

	return (
		<section className="flex h-full flex-col">
			<nav className="flex items-center justify-between border-b border-b-zinc-200 p-4 dark:border-b-zinc-700 dark:bg-zinc-900 sm:p-6">
				<a
					href="https://netflix/signup/"
					className="md:mx-3 md:text-lg lg:mx-5"
				>
					<img
						src="/public/icons/netflix-logo.svg"
						alt=""
						className="h-5 sm:h-11"
					/>
				</a>

				<div
					className="w-7 cursor-pointer rounded-full p-1 sm:w-10 sm:p-2 md:mx-3 md:text-lg lg:mx-5 xl:mx-8"
					onClick={() => {
						theme.toggleTheme();
					}}
				>
					<ThemeButton />
				</div>
			</nav>

			<section className="overflow-x-hidden dark:text-zinc-100">
				<Outlet />
			</section>

			<Footer
				textLink={[
					{ text: "FAQ", link: "#" },
					{ text: "Help Centre", link: "#" },
					{ text: "Netflix Shop", link: "#" },
					{ text: "Terms of Use", link: "#" },
					{ text: "Privacy", link: "#" },
					{ text: "Cookie Preferences", link: "#" },
					{ text: "Corporate Information", link: "#" },
				]}
			/>
		</section>
	);
}
