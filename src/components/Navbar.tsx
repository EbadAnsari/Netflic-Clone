import { toggleTheme } from "@utils/functions";
import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DropDown from "./DropDown";
import ProfileIcon from "./ProfileIcon";
import ThemeButton from "./ThemeButton";

export default function Navbar() {
	const navLinks = [
		{ link: "Home", to: "/" },
		{ link: "Series", to: "series" },
		{ link: "Films", to: "films" },
		{ link: "New & Popular", to: "" },
		{ link: "My List", to: "my-list" },
		{ link: "Browse by Languages", to: "" },
	];

	const navBarRef = useRef<HTMLElement>(null);

	useEffect(() => {
		window.onscroll = () => {
			if (!navBarRef.current) return;
			const scroll = window.scrollY / 500;
			const limit = 0.85;
			navBarRef.current.style.setProperty(
				"--tw-bg-opacity",
				`${scroll >= limit ? limit : scroll}`,
			);
		};

		if (navBarRef.current) {
			navBarRef.current.style.setProperty("--tw-bg-opacity", "0");
		}

		return () => {
			window.onscroll = null;
		};
	}, []);

	return (
		<nav
			ref={navBarRef}
			className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white px-6 py-4 dark:bg-black md:px-16"
		>
			<div className="left flex items-center gap-x-6">
				<a
					href="https://www.netflix.com/in/"
					target="_blank"
					className="h-4 lg:h-7"
				>
					<img
						src="/public/icons/netflix-logo.svg"
						className="h-4 lg:h-7"
					/>
				</a>
				<div className="nav-links">
					<DropDown title="Browse">
						{navLinks.map((navLinks) => (
							<Link
								to={navLinks.to}
								onClick={() => {
									alert(navLinks.link);
								}}
								className="w-full whitespace-nowrap py-2 text-center lg:px-3 lg:text-lg"
								key={navLinks.link}
							>
								{navLinks.link}
							</Link>
						))}
					</DropDown>
				</div>
			</div>

			<div
				tabIndex={0}
				className="open-drop-down right relative cursor-pointer select-none"
			>
				<div className="flex gap-x-1">
					<ProfileIcon
						className="w-6 rounded-md lg:w-10"
						startColorHue={215}
						endColorHue={212}
					/>
					<img
						src="/public/icons/drop-down-icon.svg"
						className={"w-5 brightness-100"}
					/>
				</div>
				<div className="drop-down absolute right-0 top-full flex w-40 origin-top-right translate-y-3 flex-col items-center rounded-md bg-zinc-400 !bg-opacity-20 px-3 py-5 text-xs text-white backdrop-blur-md dark:bg-white sm:w-52 sm:text-sm md:rounded-lg md:text-base">
					{/* <div className="p-4 backdrop-blur">hello world</div> */}
					<div className="px-21 flex w-full justify-between">
						<img
							src="/public/icons/profile-photo.png"
							className="w-6 rounded-md sm:w-8"
						/>
						<div className="flex gap-x-3">
							<div className="my-auto w-7">
								<ThemeButton onClick={toggleTheme} />
							</div>
							<Link
								to={"/in"}
								onClick={() => {
									// logout
								}}
							>
								<img
									src="/public/icons/logout.svg"
									alt=""
									className="w-7 brightness-100 dark:brightness-100"
								/>
							</Link>
						</div>
					</div>
					<hr className="mx-4 my-4 w-full rounded-full border border-white border-opacity-10" />
				</div>
			</div>
		</nav>
	);
}
