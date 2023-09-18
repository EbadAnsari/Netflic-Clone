import { useInputRef } from "@hooks/InputBox";
import {
	ChangeEvent,
	ClassAttributes,
	ForwardedRef,
	InputHTMLAttributes,
	ReactNode,
	forwardRef,
	useEffect,
} from "react";

export interface InputBoxStatus {
	error:
		| { isError: false }
		| { isError: true; color?: string; message: string };
	sucess: { isSucess: boolean; color?: string };
}

export interface InputBoxProps {
	label: string;
	component?: ReactNode;
}

export type InputBoxInterface = InputBoxProps &
	InputBoxStatus &
	ClassAttributes<HTMLInputElement> &
	InputHTMLAttributes<HTMLInputElement>;

const InputBox = forwardRef(
	(InputProps: InputBoxInterface, ref?: ForwardedRef<HTMLInputElement>) => {
		const { focus, leave, inputBox } = useInputRef();

		useEffect(() => {
			if (
				InputProps.error.isError ||
				InputProps.sucess.isSucess ||
				InputProps.value?.toString().length !== 0
			) {
				focus.current();
			}
		}, []);

		return (
			<div className="w-full">
				<div
					ref={inputBox}
					className={`input-box-container ${InputProps.className} ${
						InputProps.error.isError && "sign-in-error-input"
					} relative rounded`}
				>
					<input
						{...InputProps}
						ref={ref}
						onFocus={focus.current}
						onBlur={() => {
							leave.current();
						}}
						onChange={(event: ChangeEvent<HTMLInputElement>) => {
							focus.current();
							InputProps.onChange?.(event);
						}}
						required
						style={{
							borderBottom:
								InputProps.value?.toString().length === 0
									? "1px solid #52525b"
									: "2px solid " +
									  ((InputProps.error.isError &&
											(InputProps.error.color ||
												"#e87c03")) ||
											(InputProps.sucess.isSucess &&
												(InputProps.sucess.color ||
													"#4bb543"))),
						}}
						className={`w-full rounded border-[1px] border-zinc-600 px-4 pb-2 pt-6 [&_+_span]:bg-red-500`}
					/>
					<label
						htmlFor="email"
						className={`input-label ${
							InputProps.error.isError &&
							!InputProps.value?.toString().length &&
							"input-email-focus"
						} absolute left-4 top-1/2 -translate-y-1/2 cursor-text select-none transition-all`}
					>
						{InputProps.label}
						{/* Email */}
					</label>
					{InputProps.component}
				</div>
				<span className="error hidden">
					{InputProps.error.isError && InputProps.error.message}
				</span>
			</div>
		);
	},
);

export default InputBox;
