export interface Variantinterface {
	to: string;
	name: string;
}

export interface BaseObject {
	[key: string]: string;
}

export type Prettify<T> = {
	[key in keyof T]: T[key];
} & {};

export interface SignIn {
	location: "/in/login";
	text: "Sign In";
}
export interface SignUp {
	location: "/in";
	text: "Sign Up";
}
export type SigningState = SignIn | SignUp;

export interface TrailerModalState {
	result: "play" | "add" | "close";
}

export interface AppState {
	sign: SigningState;
	modal: TrailerModalState;
}

export interface InputError {
	emailErrorCheck?: boolean;
	passwordErrorCheck?: boolean;
}
export interface CredentialError {
	invalidCredentials: boolean;
}

export interface ModalProps {
	title: string;
	duration: number;
	genre: string;
	videoSource: string;
	description: string;
}

export interface Time {
	second: number | undefined;
	minute: number | undefined;
	hour: number | undefined;
}

export type ThemeType = "light" | "dark" | "";

export type NavigateType = { current: 1 | 2 | 3 };

export interface UserInterface {
	email: string;
	password: string;
}
