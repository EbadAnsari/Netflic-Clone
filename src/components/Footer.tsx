import SelectLanguage from "./SelectLanguage";

interface FooterProps {
	textLink: {
		text: string;
		link: string;
	}[];
}

export default function Footer({ textLink }: FooterProps) {
	return (
		// <div className="footer mx-6 py-[60px] text-[#ffffffb3] sm:mx-8 xl:mx-auto xl:max-w-[calc(100%_-_22rem)]">
		// 	<div className="tel py-3">
		// 		Questions? Call&nbsp;
		// 		<a className="hover:underline" href="tel:000-800-919-1694">
		// 			000-800-919-1694
		// 		</a>
		// 	</div>
		// 	<div className="footer-links grid grid-cols-1 gap-y-3 bg-zinc-100 py-3 text-sm font-medium text-[#ffffffb3] dark:bg-zinc-900 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 [&>a]:w-fit hover:[&>a]:underline [&_a]:cursor-pointer">
		// 		<a>FAQ</a>
		// 		<a>Help Centre</a>
		// 		<a>Account</a>
		// 		<a>Media Centre</a>
		// 		<a>Investor Relations</a>
		// 		<a>Jobs</a>
		// 		<a>Ways to Watch</a>
		// 		<a>Terms of Use</a>
		// 		<a>Privacy</a>
		// 		<a>Cookie Preferences</a>
		// 		<a>Corporate Information</a>
		// 		<a>Contact Us</a>
		// 		<a>Speed Test</a>
		// 		<a>Legal Notices</a>
		// 		<a>Only on Netflix</a>
		// 	</div>
		// 	<div className="language w-fit py-3">
		// 		<SelectLanguage shrink={false} />
		// 	</div>
		// 	<p className="py-3">Netflix India</p>
		// </div>

		<footer className="mt-auto w-full bg-zinc-100 px-4 py-8 text-slate-600 dark:bg-zinc-900 dark:text-zinc-300 sm:px-10 md:px-16 lg:px-20 xl:mx-auto">
			<div className="footer text-[#737373]">
				<div className="tel mb-7 py-3">
					Questions? Call&nbsp;
					<a
						className="font-semibold hover:underline"
						href="tel:000-800-919-1694"
					>
						000-800-919-1694
					</a>
				</div>
				<div className="footer-links grid grid-cols-1 gap-y-3 py-3 text-sm font-medium text-slate-600 dark:text-zinc-300 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 [&>a]:w-fit hover:[&>a]:underline [&_a]:cursor-pointer">
					{/* <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:w-[calc(100%_-_10rem)] xl:w-[calc(100%_-_15rem)] [&>a]:text-xs"> */}
					{textLink.map((link) => (
						<a key={link.link + link.text} href={link.link}>
							{link.text}
						</a>
					))}
				</div>
				<div className="language w-fit pb-3 pt-8">
					<SelectLanguage
						// shrink={false}
						className="rounded-lg px-3 [&_select]:py-3"
						scale="1"
					/>
				</div>
				<p className="py-3">Netflix India</p>
			</div>
		</footer>
	);
}
