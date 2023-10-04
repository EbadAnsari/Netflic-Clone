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
				<p className="pb-1 text-sm sm:pb-2 sm:text-base md:text-lg lg:text-xl">
					{title}
				</p>
			)}
			<div className="relative">
				<div
					className="absolute left-0 top-0 z-10 flex h-full cursor-pointer select-none place-items-center px-2 hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-sm"
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
					className="absolute right-0 top-0 z-10 flex h-full cursor-pointer select-none place-items-center px-2 hover:bg-white hover:bg-opacity-10 hover:backdrop-blur-sm"
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
