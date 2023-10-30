import {
	ChangeEvent,
	ClassAttributes,
	InputHTMLAttributes,
	ReactNode,
	RefObject,
} from "react";

export interface InputBoxProps {
	label: string;
	component?: ReactNode;
	"data-validation":
		| ((event: ValidationEvent) => ValidationResult)
		| undefined;
	"data-errormessage": string;
	"data-sucessmessage"?: string;
	"data-focused"?: boolean;
}

export type ValidationResult = "error" | "neutral" | "sucess";

export interface ValidationEvent extends ChangeEvent<HTMLInputElement> {}

export interface InputBoxInterface
	extends InputBoxProps,
		ClassAttributes<HTMLInputElement>,
		InputHTMLAttributes<HTMLInputElement> {}

export interface InputRefInterface {
	inputBox: RefObject<HTMLDivElement>;
	inputElement: HTMLInputElement;
	labelElement: HTMLLabelElement;
}
