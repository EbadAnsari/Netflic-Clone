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
			const limit = 0.7;
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
					<DropDown>
						<a>Home</a>
						<a>Series</a>
						<a>Films</a>
						<a>New & Popular</a>
						<a>My List</a>
						<a>Browse by Languages</a>
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
						alt=""
					/>
					<Form
						method="GET"
						action="/sign/up"
						onSubmit={logout}
						className={`${
							logOutStatus ? "block" : "hidden"
						} absolute right-6 top-full translate-y-3 bg-black py-5 text-white`}
					>
						<div className="px-3">
							<img
								src="/public/icons/profile-photo.png"
								className="w-8 rounded-md"
							/>
						</div>
						<hr className="my-4 border border-[#1f2937]" />
						<button
							type="submit"
							className="mx-10 block w-max cursor-pointer px-3 text-sm hover:underline"
						>
							Sign out of Netflix
						</button>
					</Form>
				</div>
			</div>
		</nav>
	);
}
