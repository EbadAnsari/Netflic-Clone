import { halt } from "@utils/functions";
import { useEffect, useRef, useState } from "react";

export default function FixedList() {
	const total = new Array<number>(30)
		.fill(1)
		.map((number, index) => number + index);

	const limit = 15;
	const [buffer, setBuffer] = useState<{
		data: number[];
	}>({
		data: total.slice(0, limit),
	});

	const fixedListRef = useRef<HTMLDivElement>(null);

	async function checkVisible(element: Element) {
		return await new Promise<IntersectionObserverEntry>((resolve) => {
			new IntersectionObserver((entries) => {
				entries.forEach((observerEntry) => {
					if (observerEntry.isIntersecting) resolve(observerEntry);
				});
			}).observe(element);
		});
	}

	const fixedListObserver = new IntersectionObserver(
		(entries) => {
			entries.forEach((element) => {
				const node = element.target as HTMLDivElement;

				if (element.isIntersecting) {
					node.dataset.visible = "true";
				} else {
					node.dataset.visible = "false";
				}

				(async function () {
					if (
						node.dataset.last === "true" &&
						node.dataset.visible === "true"
					) {
						let visibleElementNodeList =
							document.querySelectorAll<HTMLDivElement>(
								'[data-visible="true"]',
							);

						const firstElementIntersectionObserverEntry =
							await checkVisible(
								visibleElementNodeList[0]
									.previousElementSibling as Element,
							);

						let visibleElement = [
							firstElementIntersectionObserverEntry.target,
						].concat(
							Array.from(visibleElementNodeList),
						) as HTMLDivElement[];

						const newStart = parseInt(
							visibleElement[0].dataset.elementIndex!,
						);

						const newEnd = parseInt(
							visibleElement[visibleElement.length - 1].dataset
								.elementIndex!,
						);

						const newElementList = total.slice(newStart, newEnd);

						if (fixedListRef.current?.scrollLeft) {
							fixedListRef.current.scrollLeft =
								firstElementIntersectionObserverEntry.target
									.clientWidth -
								firstElementIntersectionObserverEntry
									.intersectionRect.width;
						}

						setBuffer({
							data: newElementList.concat(
								total.slice(
									newEnd,
									newEnd + limit - newElementList.length,
								),
							),
						});
					} else if (
						node.dataset.first === "true" &&
						node.dataset.visible === "true"
					) {
						await halt();

						const visibleElementNodeList = Array.from(
							document.querySelectorAll<HTMLDivElement>(
								'[data-visible="true"]',
							),
						);

						const isLastNodeVisible = await checkVisible(
							visibleElementNodeList.at(-1)!.nextElementSibling!,
						);

						if (isLastNodeVisible.isIntersecting)
							visibleElementNodeList.push(
								isLastNodeVisible.target as HTMLDivElement,
							);

						const startIndex =
							parseInt(
								visibleElementNodeList.at(0)?.dataset
									.elementIndex!,
							) - 1;

						const endIndex = parseInt(
							visibleElementNodeList.at(-1)?.dataset
								.elementIndex!,
						);

						const previousStartIndex =
							limit - visibleElementNodeList.length;

						if (fixedListRef.current?.scrollLeft)
							fixedListRef.current.scrollLeft = 1000;

						if (
							previousStartIndex > 0 &&
							startIndex > previousStartIndex
						) {
							const previousElementList = total.slice(
								startIndex - previousStartIndex,
								endIndex,
							);
							if (previousElementList !== buffer.data)
								setBuffer({
									data: previousElementList,
								});
						}
					}
				})();
			});
		},
		{
			threshold: 1,
		},
	);

	// console.log(buffer.data);

	useEffect(() => {
		if (fixedListRef.current) {
			Array.from(fixedListRef.current.children).forEach((element) => {
				fixedListObserver.observe(element);
			});
		}
		return () => {
			fixedListObserver.disconnect();
		};
	}, [buffer, fixedListRef]);

	return (
		<div
			className="scrollbar-none m-4 flex gap-2 overflow-auto focus-within:outline-dotted focus-within:outline-2"
			tabIndex={0}
			ref={fixedListRef}
		>
			{buffer.data.map((element, index) => (
				<div
					key={index + " " + element}
					data-element-index={element - 1}
					data-first={index === 0}
					data-last={
						index === limit - 3 ||
						index === limit - 2 ||
						index === limit - 1
					}
					className={`inline-block ${(() => {
						if (element % 5 === 0) return "bg-sky-400";
						if (element % 3 === 0) return "bg-lime-400";
						if (element % 2 === 0) return "bg-pink-400";
						return "bg-amber-400";
					})()} ${element}`}
				>
					<p className="aspect-video w-40 text-center text-7xl text-white">
						{element}
					</p>
				</div>
			))}
		</div>
	);
}
