import { PropsWithChildren, ReactNode, useEffect, useRef } from "react";

interface ScrollerProps {
	children: Iterable<ReactNode>;
	className?: string;
	title?: string;
}

export function Option({ children }: PropsWithChildren) {
	return children;
}

export default function Scroller({
	children,
	title,
	className,
}: ScrollerProps) {
	const scroller = useRef<HTMLDivElement>(null);

	const scrollBarButtonRef = {
		left: useRef<HTMLButtonElement>(null),
		right: useRef<HTMLButtonElement>(null),
	};

	useEffect(() => {
		if (
			scroller.current &&
			scroller.current.scrollWidth <= scroller.current.clientWidth &&
			scrollBarButtonRef.left.current &&
			scrollBarButtonRef.right.current
		) {
			scrollBarButtonRef.left.current.style.display = "none";
			scrollBarButtonRef.right.current.style.display = "none";
		}
	}, []);

	if (
		!(children instanceof Array) ||
		!children?.[0]?.$$typeof ||
		children.length === 0
	)
		return "";
	const options = Array.from(children);

	return (
		<div className={`relative text-white ${className ?? ""}`}>
			{title && (
				<p className="pb-0.5 text-base font-semibold text-zinc-800 dark:text-zinc-100 sm:text-base md:pb-2 md:text-xl">
					{title}
				</p>
			)}
			<div className="relative [&_button.scroller-button]:hover:bg-white [&_button.scroller-button]:hover:bg-opacity-10 [&_button.scroller-button]:hover:backdrop-blur-sm">
				<button
					className={`scroller-button absolute left-0 top-0 z-10 flex h-full cursor-pointer select-none place-items-center rounded-l-sm px-1 sm:px-2`}
					onClick={() => {
						if (scroller.current)
							scroller.current.scrollLeft -= 300;
					}}
					ref={scrollBarButtonRef.left}
				>
					<img
						src="/public/icons/drop-down-icon.svg"
						className="rotate-90"
					/>
				</button>
				<div
					ref={scroller}
					className="scrollbar-none flex w-full gap-2 overflow-x-scroll scroll-smooth sm:gap-3 md:gap-4"
				>
					{options.map((node, index) => {
						return <div key={index}>{node}</div>;
					})}
				</div>
				<button
					className="scroller-button absolute right-0 top-0 z-10 flex h-full cursor-pointer select-none place-items-center rounded-r-sm px-1 sm:px-2"
					onClick={() => {
						if (scroller.current)
							scroller.current.scrollLeft += 300;
					}}
					ref={scrollBarButtonRef.right}
				>
					<img
						src="/public/icons/drop-down-icon.svg"
						className="-rotate-90"
					/>
				</button>
			</div>
		</div>
	);
}
