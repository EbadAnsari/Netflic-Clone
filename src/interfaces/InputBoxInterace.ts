import {
	ClassAttributes,
	InputHTMLAttributes,
	ReactNode,
	RefObject,
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

export interface InputRefInterface {
	inputBox: RefObject<HTMLDivElement>;
	inputElement: HTMLInputElement;
	labelElement: HTMLLabelElement;
}
