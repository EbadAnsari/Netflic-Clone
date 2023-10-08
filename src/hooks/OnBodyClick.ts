import { useRef, useEffect, useState } from "react";

const outSideClickEvent: ((event: MouseEvent) => void)[] = [];

export function useOnBodyClick<T>(outSide: boolean) {
	const [isOutSide, setIsOutSide] = useState<boolean>(outSide);
	const currentEventIndex = outSideClickEvent.length;
	const element = useRef<T>(null);

	outSideClickEvent.push(function (event: MouseEvent) {
		setIsOutSide(
			element.current !== null &&
				(element.current as HTMLElement).contains(event.target as Node),
		);
	});

	function createCurrentHandler() {
		document.body.onclick = function (event: MouseEvent) {
			outSideClickEvent.forEach((handleFunction) => {
				handleFunction(event);
			});
		};
	}
	function destroyCurrentHandler() {
		outSideClickEvent.splice(currentEventIndex, 1);
	}

	useEffect(() => {
		destroyCurrentHandler();
		createCurrentHandler();
	}, [element]);

	return {
		isOutSide,
		element,
	};
}
