import { useInputRef } from "@hooks/InputBox";
import { InputBoxInterface } from "@interfaces/InputBoxInterace";
import {
	ChangeEvent,
	ForwardedRef,
	forwardRef,
	useImperativeHandle,
} from "react";

export type InputBoxRef = ReturnType<typeof useInputRef>;

export function PasswordShowHide({
	passwordElement,
}: Readonly<{
	passwordElement?: HTMLInputElement | null;
}>) {
	return (
		<span
			tabIndex={2}
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
		label,
		focused,
		component,
		errorMessage,
		sucessMessage,
		validation,
		onChange,
		onFocus,
		onBlur,
		...rest
	} = InputProps;

	const {
		focus,
		leave,
		inputElement,
		labelElement,
		inputContainer,
		inputBoxStatus,
		setInputBoxStatus,
	} = useInputRef(focused);

	useImperativeHandle(ref, () => ({
		focus,
		leave,
		inputElement,
		labelElement,
		inputContainer,
		inputBoxStatus,
		setInputBoxStatus,
	}));

	return (
		<div className="w-full">
			<div
				ref={inputContainer}
				className={`${InputProps.className} ${
					inputBoxStatus === "error" && "[&+span.error]:block"
				} relative rounded`}
			>
				<input
					tabIndex={1}
					{...rest}
					ref={inputElement}
					onFocus={(event) => {
						focus.current();
						onFocus?.(event);
					}}
					onBlur={(event) => {
						leave.current();
						onBlur?.(event);
					}}
					onChange={(event: ChangeEvent<HTMLInputElement>) => {
						focus.current();
						if (event.target.value.length !== 0) focus.current();
						onChange?.(event);
						if (validation) setInputBoxStatus(validation(event));
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
					{label}
				</label>
				{component}
			</div>
			<span className="error hidden w-full p-[2px] text-xs text-[#e87c03]">
				{inputBoxStatus === "error" && errorMessage}
			</span>
		</div>
	);
}
export default forwardRef(InputBox);
