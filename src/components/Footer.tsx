import SelectLanguage from "./SelectLanguage";

interface FooterProps {
	textLink: {
		text: string;
		link: string;
	}[];
}

export default function Footer({ textLink }: FooterProps) {
	return (
		<footer className="mt-auto w-full bg-zinc-100 px-4 py-8 text-slate-600 dark:bg-zinc-900 dark:text-zinc-300 sm:px-10 md:px-16 lg:px-20 xl:mx-auto">
			<div className="footer text-[#737373]">
				<div className="tel mb-7 py-3">
					Questions? Call&nbsp;
					<a
						className="font-semibold underline hover:underline"
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
						className="rounded-lg px-3 [&_select]:py-3"
						scale="1"
					/>
				</div>
				<p className="py-3">Netflix India</p>
			</div>
		</footer>
	);
}
