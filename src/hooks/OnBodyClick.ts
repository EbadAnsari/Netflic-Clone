import { RefObject, useEffect, useRef } from "react";

export interface BodyClickEvent<T> extends MouseEvent {
	element: RefObject<T>;
	clickedInside: boolean;
}

const outSideClickEvent: {
	callback: (event: BodyClickEvent<any>) => void;
	element: RefObject<any>;
}[] = [];

export function useOnBodyClick<T>(
	bodyClickCallback: (event: BodyClickEvent<T>) => void,
) {
	const element = useRef<T>(null);

	const currentEventFunctionIndex = outSideClickEvent.length;

	useEffect(() => {
		outSideClickEvent.push({ callback: bodyClickCallback, element });

		document.body.onclick = function (event: MouseEvent) {
			event.stopImmediatePropagation();

			outSideClickEvent.forEach((functionCallback) => {
				const element = functionCallback.element;
				functionCallback.callback({
					...event,
					element,
					clickedInside: (element.current as HTMLElement).contains(
						event.target as Node,
					),
				});
			});
		};

		return () => {
			outSideClickEvent.splice(currentEventFunctionIndex, 1);
		};
	}, [element]);

	return {
		element,
	};
}
