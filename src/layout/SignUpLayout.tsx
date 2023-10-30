import Footer from "@components/Footer";
import ThemeButton from "@components/ThemeButton";
import { logout } from "@context/AuthContext";
import { useTheme } from "@utils/functions";
import { Link, Outlet } from "react-router-dom";

export default function SignUpLayout() {
	const theme = useTheme();
	theme.setTheme(theme.theme());

	return (
		<section className="flex h-full flex-col">
			<nav className="flex items-center justify-between border-b border-b-zinc-200 p-4 dark:border-b-zinc-700 dark:bg-zinc-900 sm:p-6">
				<a
					href="https://netflix/signup/"
					className="md:mx-3 md:text-lg lg:mx-5"
				>
					<img
						src="/public/icons/netflix-logo.svg"
						className="h-5 sm:h-11"
					/>
				</a>

				<div className="cursor-pointer p-1 sm:p-2 md:mx-3 md:text-lg lg:mx-5 xl:mx-8">
					<div className="flex gap-7">
						<Link
							to={"/in/login"}
							className="rounded-[4px] bg-[#e50914] px-4 py-1 font-semibold text-white"
						>
							Sign In
						</Link>
						<div
							className="my-auto w-7"
							onClick={() => {
								theme.toggleTheme();
							}}
						>
							<ThemeButton />
						</div>
						<Link to={"/in"} onClick={logout}>
							<img
								src="/public/icons/logout.svg"
								alt=""
								className="w-7 brightness-0 dark:brightness-100"
							/>
						</Link>
					</div>
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
