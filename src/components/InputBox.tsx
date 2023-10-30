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

export function PasswordShowHide({
	passwordElement,
}: {
	passwordElement?: HTMLInputElement | null;
}) {
	return (
		<span
			className="absolute right-0 top-0 inline-flex h-full cursor-pointer select-none items-center rounded bg-transparent p-3 text-center uppercase text-[#737373]"
			onClick={(event) => {
				if (!passwordElement) return;

				const target = event.target as HTMLSpanElement;

				if (passwordElement.type === "password") {
					passwordElement.type = "text";
					target.innerText = "hide";
				} else {
					passwordElement.type = "password";
					target.innerText = "show";
				}
				passwordElement.focus();
			}}
		>
			show
		</span>
	);
}

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
		if (InputProps["data-focused"]) {
			focus.current();
		}
	}, []);

	return (
		<div className="w-full">
			<div
				ref={inputContainer}
				className={`${InputProps.className} ${
					inputBoxStatus === "error" && "[&+span.error]:block"
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
					className={`w-full rounded border border-solid border-zinc-600 px-4 pb-2 pt-6 [&_+_span]:bg-[#e87c03] ${(() => {
						if (inputBoxStatus === "neutral")
							return "border-b border-b-zinc-600";
						else if (inputBoxStatus === "error")
							return "!border-b-2 !border-b-[#e87c03]";
						else if (inputBoxStatus === "sucess")
							return "!border-b-2 !border-b-[#4bb543]";
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
			<span className="error hidden w-full p-[2px] text-xs text-[#e87c03]">
				{inputBoxStatus === "error" && InputProps["data-errormessage"]}
			</span>
		</div>
	);
}
export default forwardRef(InputBox);
