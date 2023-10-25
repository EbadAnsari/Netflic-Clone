import { logout } from "@context/AuthContext";
import { useEffect, useState } from "react";
import { Form } from "react-router-dom";
import DropDown from "./DropDown";
import ProfileIcon from "./ProfileIcon";

export default function Navbar() {
	const [opacity, setOpacity] = useState<number>(0);
	const [logOutStatus, setLogOutStatus] = useState(false);

	useEffect(() => {
		window.onscroll = () => {
			const scroll = window.scrollY / 500;
			const limit = 0.85;
			setOpacity(scroll >= limit ? limit : scroll);
		};

		return () => {
			window.onscroll = null;
		};
	}, []);

	return (
		<nav
			style={{
				backgroundColor: `rgba(0, 0, 0, ${opacity})`,
			}}
			className="fixed left-0 top-0 z-50 flex w-full items-center justify-between bg-zinc-900 px-6 py-4 md:px-16"
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
				<div className="nav-links text-white">
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
					<Form
						method="GET"
						action="/in"
						onSubmit={logout}
						className={`${
							logOutStatus ? "scale-100" : "scale-0"
						} absolute right-0 top-full flex w-40 origin-top-right translate-y-3 flex-col items-center rounded-md bg-white bg-opacity-20 px-3 py-5 text-xs text-white backdrop-blur-3xl transition-transform sm:w-52 sm:text-sm md:rounded-lg md:text-base`}
					>
						<div className="w-full">
							<img
								src="/public/icons/profile-photo.png"
								className="w-6 rounded-md sm:w-8"
							/>
						</div>
						<hr className="mx-4 my-4 w-full rounded-full border border-white border-opacity-10" />
						<button
							type="submit"
							className="block w-max cursor-pointer px-3 text-center hover:underline"
						>
							Sign out of Netflix
						</button>
					</Form>
				</div>
			</div>
		</nav>
	);
}
