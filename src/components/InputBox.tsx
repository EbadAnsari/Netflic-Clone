import { useInputRef } from "@hooks/InputBox";
import { InputBoxInterface } from "@interfaces/InputBoxInterace";
import {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	useEffect,
	useImperativeHandle,
} from "react";

export type InputBoxRef = ReturnType<typeof useInputRef>;

function InputBox(
	InputProps: InputBoxInterface,
	ref?: ForwardedRef<InputBoxRef>,
) {
	const {
		focus,
		leave,
		inputElement,
		labelElement,
		inputContainer,
		inputBoxStatus,
		setInputBoxStatus,
	} = useInputRef();

	useImperativeHandle(ref, () => ({
		focus,
		leave,
		inputElement,
		labelElement,
		inputContainer,
		inputBoxStatus,
		setInputBoxStatus,
	}));

	useEffect(() => {
		if (
			inputBoxStatus === "error" ||
			inputBoxStatus === "sucess" ||
			inputBoxStatus === "neutral"
		) {
			// focus.current();
		}
	}, []);

	return (
		<div className="w-full">
			<div
				ref={inputContainer}
				className={`${InputProps.className} ${
					inputBoxStatus === "error" && "sign-in-error-input"
				} relative rounded`}
			>
				<input
					{...InputProps}
					ref={inputElement}
					onFocus={(event) => {
						focus.current();
						if (InputProps.onFocus) InputProps.onFocus(event);
					}}
					onBlur={(event) => {
						leave.current();
						if (InputProps.onBlur) InputProps.onBlur(event);
					}}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						focus.current();
						if (event.target.value.length !== 0) focus.current();
						InputProps.onChange?.(event);
						if (InputProps["data-validation"])
							setInputBoxStatus(
								InputProps["data-validation"](event),
							);
					}}
					required
					className={`w-full rounded border-[1px] border-solid border-zinc-600 px-4 pb-2 pt-6 [&_+_span]:bg-red-500 ${(() => {
						if (inputBoxStatus === "neutral")
							return "border-b border-b-[#52525b]";
						else if (inputBoxStatus === "error")
							return "border-b-2 border-b-red-500";
						else if (inputBoxStatus === "sucess")
							return "border-b-2 border-b-[#4bb543]";
					})()}`}
				/>
				<label
					htmlFor="email"
					ref={labelElement}
					className="input-label absolute left-4 top-1/2 -translate-y-1/2 cursor-text select-none transition-all"
				>
					{InputProps.label}
				</label>
				{InputProps.component}
			</div>
			<span className="error hidden">
				{inputBoxStatus === "error" && InputProps["data-errormessage"]}
			</span>
		</div>
	);
}
export default forwardRef(InputBox);
