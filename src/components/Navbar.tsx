import { logout } from "@context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { Form, Link } from "react-router-dom";
import DropDown from "./DropDown";
import ProfileIcon from "./ProfileIcon";

export default function Navbar() {
	const [logOutStatus, setLogOutStatus] = useState(false);

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

		if (navBarRef.current)
			navBarRef.current.style.setProperty("--tw-bg-opacity", "0");

		return () => {
			window.onscroll = null;
		};
	}, []);

	return (
		<nav
			ref={navBarRef}
			className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-white bg-opacity-0 px-6 py-4 dark:bg-black md:px-16"
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
						<a className="w-full whitespace-nowrap py-2 text-center lg:px-3 lg:text-lg">
							Home
						</a>
						<a className="w-full whitespace-nowrap py-2 text-center lg:px-3 lg:text-lg">
							Series
						</a>
						<a className="w-full whitespace-nowrap py-2 text-center lg:px-3 lg:text-lg">
							Films
						</a>
						<a className="w-full whitespace-nowrap py-2 text-center lg:px-3 lg:text-lg">
							New & Popular
						</a>
						<a className="w-full whitespace-nowrap py-2 text-center lg:px-3 lg:text-lg">
							My List
						</a>
						<a className="w-full whitespace-nowrap py-2 text-center lg:px-3 lg:text-lg">
							Browse by Languages
						</a>
					</DropDown>
				</div>
			</div>

			<div className="right flex items-center gap-x-6">
				<div
					className="relative flex cursor-pointer select-none gap-x-1"
					onClick={() => {
						setLogOutStatus(!logOutStatus);
					}}
				>
					<ProfileIcon
						className="w-6 rounded-md lg:w-10"
						startColorHue={215}
						endColorHue={212}
					/>
					<img
						src="/public/icons/drop-down-icon.svg"
						className={`${logOutStatus && "rotate-180"} w-5`}
					/>
					<div
						className={`${
							logOutStatus ? "scale-100" : "scale-0"
						} absolute right-0 top-full flex w-40 origin-top-right translate-y-3 flex-col items-center rounded-md bg-white bg-opacity-20 px-3 py-5 text-xs text-white backdrop-blur-3xl transition-transform sm:w-52 sm:text-sm md:rounded-lg md:text-base`}
					>
						<div className="px-21 flex w-full justify-between">
							<img
								src="/public/icons/profile-photo.png"
								className="w-6 rounded-md sm:w-8"
							/>

							<Link to={"/in"} onClick={logout}>
								<img
									src="/public/icons/logout.svg"
									alt=""
									className="w-7 brightness-0 dark:brightness-100"
								/>
							</Link>
						</div>
						<hr className="mx-4 my-4 w-full rounded-full border border-white border-opacity-10" />
					</div>
				</div>
			</div>
		</nav>
	);
}
