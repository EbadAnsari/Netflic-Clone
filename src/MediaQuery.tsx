export default function MediaQuery() {
	return (
		<div className="test relative z-[9999]">
			<div
				data-xsm="xsm"
				data-xm="xm"
				data-sm="sm"
				data-md="md"
				data-lg="lg"
				data-xl="xl"
				data-2xl="2xl"
				className="fixed left-0 top-0 bg-slate-900 bg-opacity-10 p-1.5 text-2xl font-bold text-white before:content-[attr(data-xsm)] hover:left-full hover:-translate-x-full xs:before:content-[attr(data-xm)] sm:before:content-[attr(data-sm)] md:before:content-[attr(data-md)] lg:before:content-[attr(data-lg)] xl:before:content-[attr(data-xl)] 2xl:before:content-[attr(data-2xl)]"
			></div>
		</div>
	);
}
