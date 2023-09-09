import { RefObject, useEffect } from "react";

export function useCheckBox(
	checkBox: RefObject<HTMLLabelElement>,
	checkBoxState: boolean = false,
) {
	let value = checkBoxState;
	function handleClick() {
		value = checkBox.current?.classList.toggle("checkbox-on", !value)!;
	}

	function removeChild(parentElement: Element) {
		if (parentElement.firstChild) {
			parentElement.removeChild(parentElement.firstChild);
			removeChild(parentElement);
		}
	}

	useEffect(() => {
		if (checkBox.current === null) return;
		removeChild(checkBox.current);
		checkBox.current.appendChild(document.createTextNode("Remember Me"));
		checkBox.current?.classList.add("checkbox");
		checkBox.current?.addEventListener("click", handleClick);
	}, [checkBox]);
	return () => value;
}
