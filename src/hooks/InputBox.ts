import { RefObject, useEffect } from "react";

/**
 *
 * @param containerElement Container div that contain input box and label (is this order).
 * @param focused Set the cursor to the input box if `focused` is true, otherwise not set cursor.
 * @returns two functions `focus` and `leave`. `focus()` to set the focus to the input box and `leave()` to unset the focus of the input box.
 */
export function useInputBox(
	containerElement: RefObject<HTMLElement>,
	focused: boolean = false,
) {
	let inputElement: HTMLInputElement | null = null;
	let labelElement = containerElement.current?.children[1];

	let isFocus = false;

	function focus() {
		isFocus = true;
		inputElement?.focus();
		labelElement?.classList.add("input-email-focus");
	}
	function leave() {
		if (inputElement?.value.length !== 0) return;
		isFocus = false;
		labelElement?.classList.remove("input-email-focus");
	}

	useEffect(() => {
		inputElement = containerElement.current
			?.children[0] as HTMLInputElement;
		labelElement = containerElement.current?.children[1];

		if (!(containerElement.current && inputElement && labelElement)) return;

		if (focused) {
			focus();
		}

		document.body.onclick = function (event: Event) {
			if (isFocus) {
				event.stopImmediatePropagation();
				isFocus = false;
				return;
			}

			if (
				containerElement.current?.contains(event.target as Node) ||
				inputElement?.value.length !== 0
			) {
				labelElement?.classList.add("input-email-focus");
			} else if (inputElement.value === "") {
				labelElement?.classList.remove("input-email-focus");
			}
		};

		return () => {
			document.body.onclick = null;
		};
	}, [containerElement]);

	return { focus, leave };
}
