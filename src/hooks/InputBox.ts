import { useEffect, useRef } from "react";

/**
 *
 * @param containerElement Container div that contain input box and label (is this order).
 * @param focused Set the cursor to the input box if `focused` is true, otherwise not set cursor.
 * @returns two functions `focus` and `leave`. `focus()` to set the focus to the input box and `leave()` to unset the focus of the input box.
 */
export function useInputRef(focused: boolean = false) {
	const inputBox = useRef<HTMLDivElement>(null);

	let inputElement: HTMLInputElement | null = null;
	let labelElement = inputBox.current?.children[1];

	let isFocus = false;

	const focus = useRef(() => {
		isFocus = true;
		inputElement?.focus();
		labelElement?.classList.add("input-email-focus");
	});
	const leave = useRef(() => {
		if (inputElement?.value.length !== 0) return;
		isFocus = false;
		labelElement?.classList.remove("input-email-focus");
	});

	useEffect(() => {
		focus.current = focus.current;
		leave.current = leave.current;

		inputElement = inputBox.current?.children[0] as HTMLInputElement;
		labelElement = inputBox.current?.children[1];

		if (!(inputBox.current && inputElement && labelElement)) return;

		if (focused) {
			focus.current();
		}

		document.body.onclick = function (event: Event) {
			if (isFocus) {
				event.stopImmediatePropagation();
				isFocus = false;
				return;
			}

			if (
				inputBox.current?.contains(event.target as Node) ||
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
	}, [inputBox]);

	return { focus, leave, inputBox };
}
