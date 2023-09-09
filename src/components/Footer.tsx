import SelectLanguage from "./SelectLanguage";

export default function Footer() {
	return (
		<div className="footer mx-6 py-[60px] text-[#ffffffb3] sm:mx-8 xl:mx-auto xl:max-w-[calc(100%_-_22rem)]">
			<div className="tel py-3">
				Questions? Call&nbsp;
				<a className="underline" href="tel:000-800-919-1694">
					000-800-919-1694
				</a>
			</div>
			<div className="footer-links grid grid-cols-1 gap-y-3 py-3 text-sm font-medium text-[#ffffffb3] underline sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 [&_a]:cursor-pointer">
				<a>FAQ</a>
				<a>Help Centre</a>
				<a>Account</a>
				<a>Media Centre</a>
				<a>Investor Relations</a>
				<a>Jobs</a>
				<a>Ways to Watch</a>
				<a>Terms of Use</a>
				<a>Privacy</a>
				<a>Cookie Preferences</a>
				<a>Corporate Information</a>
				<a>Contact Us</a>
				<a>Speed Test</a>
				<a>Legal Notices</a>
				<a>Only on Netflix</a>
			</div>
			<div className="language w-fit py-3">
				<SelectLanguage />
			</div>
			<p className="py-3">Netflix India</p>
		</div>
	);
}
