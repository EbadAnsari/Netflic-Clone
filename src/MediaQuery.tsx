import { useRef } from "react";

export default function MediaQuery() {
	const element = useRef<HTMLDivElement>(null);

	window.addEventListener("mousemove", (event) => {
		if (!element.current) return;

		(element.current.firstChild as HTMLParagraphElement).innerText =
			"CLK X : " + event.clientX;

		(element.current.lastChild as HTMLParagraphElement).innerText =
			"CLK Y : " + event.clientY;
	});

	return (
		<div className="test fixed left-0 top-0 z-[9999] select-none p-1.5 text-white">
			<div
				data-xsm="xsm"
				data-xm="xm"
				data-sm="sm"
				data-md="md"
				data-lg="lg"
				data-xl="xl"
				data-2xl="2xl"
				className="bg-slate-900 bg-opacity-10 text-2xl font-bold before:content-[attr(data-xsm)] xs:before:content-[attr(data-xm)] sm:before:content-[attr(data-sm)] md:before:content-[attr(data-md)] lg:before:content-[attr(data-lg)] xl:before:content-[attr(data-xl)] 2xl:before:content-[attr(data-2xl)]"
			></div>
			<div
				ref={element}
				className="flex w-full flex-col text-lg font-bold"
			>
				<p className="x">CLK X</p>
				<p className="y">CLK Y</p>
			</div>
		</div>
	);
}
