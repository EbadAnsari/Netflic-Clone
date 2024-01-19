import { ReactNode, useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";

interface FixedListProps {
	children: Iterable<ReactNode>;
	items: number;
}

export default function FixedList({ children, items }: FixedListProps) {
	const [child] = useState(Array.from(children));

	if (items < 30) items = 30;

	let startIndex = 0;
	let endIndex = items;
	const numberOfElementsForIntersection = 3;
	const numberOfNodesToAdd = 10;

	const list = useRef<HTMLDivElement>(null);

	function addNodes(start: number, end: number) {
		start = start < 0 ? 0 : start;

		return renderToString(
			<>
				{child.slice(start, end).map((element, index) => (
					<div
						className="fixed-list mx-1"
						data-start={
							index < numberOfElementsForIntersection || undefined
						}
						data-end={
							index + start >=
								end - numberOfElementsForIntersection ||
							undefined
						}
						data-index={index + start}
						key={index + start}
					>
						{element}
					</div>
				))}
			</>,
		);
	}

	function removeNode(at: "start" | "end", numberOfElementToRemove: number) {
		if (!(list.current && numberOfElementToRemove)) return;

		if (!numberOfElementToRemove) {
			return;
		}

		if (at === "start" && list.current.firstChild) {
			list.current.removeChild(list.current.firstChild);
			if (numberOfElementToRemove <= 3) {
				(list.current.children[2] as HTMLDivElement).dataset.start =
					"true";
			}
		} else if (at === "end" && list.current.lastChild) {
			list.current.removeChild(list.current.lastChild);

			if (numberOfElementToRemove <= 3) {
				(
					list.current.children[
						list.current.childElementCount - 3
					] as HTMLDivElement
				).dataset.end = "true";
			}
		}
		removeNode(at, numberOfElementToRemove - 1);
	}

	function getTrueNodes(at: "start" | "end") {
		return Array.from(
			document.querySelectorAll<HTMLDivElement>(`[data-${at}="true"]`),
		);
	}

	function mark(at: "start" | "end", value: "true" | "false") {
		getTrueNodes(at).forEach((element) => {
			element.dataset[at] = value;
		});
	}

	function startIntersection(intersectingNode: HTMLDivElement) {
		if (!list.current) return;

		const index = intersectingNode.dataset.index;

		startIndex -= numberOfNodesToAdd;
		endIndex -= numberOfNodesToAdd;

		if (startIndex < 0) {
			startIndex += numberOfNodesToAdd;
			endIndex += numberOfNodesToAdd;
			return;
		}

		mark("start", "false");
		removeNode("end", numberOfNodesToAdd);

		list.current.innerHTML = addNodes(startIndex, endIndex);

		const elementFromStart = (
			document.querySelector(`[data-index="${index}"]`) as HTMLDivElement
		).offsetLeft;

		if (list.current.scrollLeft) list.current.scrollLeft = elementFromStart;

		startObservation();
	}

	function endIntersection(intersectingNode: HTMLDivElement) {
		if (!list.current) return;

		const index = parseInt(intersectingNode.dataset.index ?? "0");

		const listContainerEdge = list.current.getBoundingClientRect();
		const elementLeftEdge = intersectingNode.getBoundingClientRect().left;

		const listPadding = listContainerEdge.left;

		const elementLeftFromContainerEdge =
			listContainerEdge.width - elementLeftEdge - listPadding;

		mark("end", "false");
		removeNode("start", numberOfNodesToAdd);

		startIndex += numberOfNodesToAdd;
		endIndex += numberOfNodesToAdd;

		if (endIndex > child.length) {
			startIndex -= numberOfNodesToAdd;
			endIndex -= numberOfNodesToAdd;

			const elementLeftFromStart =
				(
					document.querySelector(
						`[data-index="${index}"]`,
					) as HTMLDivElement
				).offsetLeft -
				listPadding -
				(listContainerEdge.width - elementLeftFromContainerEdge);

			if (list.current.scrollLeft) {
				list.current.scrollLeft = elementLeftFromStart;
			}

			return;
		} else if (endIndex + numberOfNodesToAdd >= child.length) {
			endIndex = child.length;
		}

		list.current.innerHTML = addNodes(startIndex, endIndex);

		const elementLeftFromStart =
			(
				document.querySelector(
					`[data-index="${index}"]`,
				) as HTMLDivElement
			).offsetLeft -
			listPadding -
			(listContainerEdge.width - elementLeftFromContainerEdge);

		if (list.current.scrollLeft)
			list.current.scrollLeft = elementLeftFromStart;

		startObservation();
	}

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const target = entry.target as HTMLDivElement;
			console.log(target.dataset);
			if (entry.isIntersecting && target.dataset.start === "true") {
				startIntersection(target);
			} else if (entry.isIntersecting && target.dataset.end === "true") {
				endIntersection(target);
				console.log("Added at back, and removed from front.");
			}
		});
	});

	function startObservation() {
		observer.disconnect();
		Array.from(
			document.querySelectorAll("[data-start],[data-end]"),
		).forEach((element) => {
			observer.observe(element);
		});
	}

	useEffect(() => {
		startObservation();
	}, [list]);

	return (
		<div
			className="scrollbar-none m-4 flex overflow-auto focus-within:outline-dotted focus-within:outline-2"
			ref={list}
		>
			{child.slice(startIndex, endIndex).map((element, index) => (
				<div
					className="fixed-list mx-1"
					data-start={
						index < numberOfElementsForIntersection || undefined
					}
					data-end={
						index >= endIndex - numberOfElementsForIntersection ||
						undefined
					}
					data-index={index}
					key={index}
				>
					{element}
				</div>
			))}
		</div>
	);
}
