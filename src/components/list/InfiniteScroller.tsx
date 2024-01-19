import { ReactNode, useEffect, useState } from "react";

/**
 * @prop gap - it has 2 values which specif their sizes of gap between nodes "low" - 8px, "high" - 16px
 */
interface FixedListProps {
	itemCount: number;
	children: NonNullable<Iterable<ReactNode>>;
}

export default function InfiniteScroller({
	itemCount,
	children,
}: FixedListProps) {
	const [index, setIndex] = useState(itemCount);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((element) => {
				if (element.isIntersecting) setIndex(index + itemCount);
			});
		});
		Array.from(document.querySelectorAll('[data-last="true"]')).forEach(
			(element) => {
				observer.observe(element);
			},
		);
	}, [index]);

	return (
		<div>
			<div className="scrollbar-none m-4 flex gap-3 overflow-auto focus-within:outline-dotted focus-within:outline-2">
				{Array.isArray(children) &&
					Array.from(children)
						.slice(0, index)
						.map((element, index, array) => (
							<div
								data-last={index > array.length - 6}
								data-index={index}
								key={index}
							>
								{element}
							</div>
						))}
			</div>
		</div>
	);
}
