import { ReactNode, useRef } from "react";

interface ScrollerProps {
	children: ReactNode[];
	className?: string;
	title?: string;
}

export default function Scroller({
	children,
	title,
	className,
}: ScrollerProps) {
	const scroller = useRef<HTMLDivElement>(null);
	return (
		<div className={`relative ${className}`}>
			{title && (
				<p className="text-sm sm:text-base md:text-lg">{title}</p>
			)}
			<div className="relative [&_div.scroller-button]:hover:bg-white [&_div.scroller-button]:hover:bg-opacity-10 [&_div.scroller-button]:hover:backdrop-blur-sm">
				<div
					className="scroller-button absolute left-0 top-0 z-10 flex h-full cursor-pointer select-none place-items-center px-2"
					onClick={() => {
						if (scroller.current)
							scroller.current.scrollLeft -= 300;
					}}
				>
					<img
						src="/public/icons/drop-down-icon.svg"
						className="rotate-90"
						alt=""
					/>
				</div>
				<div
					ref={scroller}
					className="scrollbar-none flex w-full gap-2 overflow-x-scroll scroll-smooth sm:gap-3 md:gap-4"
				>
					{children.map((node, index) => {
						return (
							<div key={index} className="transition-all">
								{node}
							</div>
						);
					})}
				</div>
				<div
					className="scroller-button absolute right-0 top-0 z-10 flex h-full cursor-pointer select-none place-items-center px-2"
					onClick={() => {
						if (scroller.current)
							scroller.current.scrollLeft += 300;
					}}
				>
					<img
						src="/public/icons/drop-down-icon.svg"
						className="-rotate-90"
						alt=""
					/>
				</div>
			</div>
		</div>
	);
}
