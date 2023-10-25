import { ValidationResult } from "@interfaces/InputBoxInterace";
import { useEffect, useRef, useState } from "react";

/**
 *
 * @param containerElement Container div that contain input box and label (is this order).
 * @param focused Set the cursor to the input box if `focused` is true, otherwise not set cursor.
 * @returns two functions `focus` and `leave`. `focus()` to set the focus to the input box and `leave()` to unset the focus of the input box.
 */
export function useInputRef(focused: boolean = false) {
	const inputContainer = useRef<HTMLDivElement>(null);
	const inputElement = useRef<HTMLInputElement>(null);
	const labelElement = useRef<HTMLLabelElement>(null);

	const [inputBoxStatus, setInputBoxStatus] =
		useState<ValidationResult>("neutral");

	let isFocus = false;

	const focus = useRef(() => {
		if (!(inputElement.current && labelElement.current)) return;

		isFocus = true;
		inputElement.current.focus();
		labelElement.current.classList.add("input-email-focus");
	});

	const leave = useRef(() => {
		if (
			(inputElement.current &&
				inputElement?.current.value.length !== 0) ||
			!labelElement.current
		)
			return;
		isFocus = false;
		labelElement.current.classList.remove("input-email-focus");
	});

	useEffect(() => {
		if (
			!(
				inputContainer.current &&
				inputElement.current &&
				labelElement.current
			)
		)
			return;

		if (!(inputElement && labelElement)) return;

		if (focused) {
			focus.current();
		}

		document.body.onclick = function (event: Event) {
			if (
				!(
					inputContainer.current &&
					inputElement.current &&
					labelElement.current
				)
			)
				return;

			if (isFocus) {
				event.stopImmediatePropagation();
				isFocus = false;
				return;
			}

			if (
				inputContainer.current.contains(event.target as Node) ||
				inputElement.current.value.length !== 0
			) {
				labelElement.current.classList.add("input-email-focus");
			} else if (inputElement.current.value === "") {
				labelElement.current.classList.remove("input-email-focus");
			}
		};

		return () => {
			document.body.onclick = null;
		};
	}, [inputContainer, inputElement, labelElement]);

	return {
		focus,
		leave,
		inputContainer,
		setInputBoxStatus,
		inputBoxStatus,
		inputElement,
		labelElement,
	};
}
