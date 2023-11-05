import Footer from "@components/Footer";
import Modal from "@components/Modal";
import Navbar from "@components/Navbar";
import { setTheme } from "@utils/functions";
import Chance from "chance";
import { Outlet } from "react-router-dom";

export default function HomeLayout() {
	setTheme("dark");

	return (
		<section>
			<Navbar />

			<Outlet />

			<Modal />

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
