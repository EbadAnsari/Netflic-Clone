import { BaseObject, Prettify } from "@interfaces/interface";

export const enum RememberMeValues {
	email = "email",
	password = "password",
}

export type RememberMe = {
	[key in keyof typeof RememberMeValues]: string | undefined;
} & BaseObject;

let rememberMe: null | Prettify<RememberMe> =
	localStorage.getItem("remember-me") &&
	JSON.parse(localStorage.getItem("remember-me")!);

export function getAllRememberMe() {
	return rememberMe;
}

export function getRememberMe(key: string) {
	return rememberMe?.[key] ?? "";
}

export function isRememberMeSet() {
	return !!rememberMe;
}

export function setRememberMe(key: string, value: string) {
	rememberMe = { ...rememberMe, [key]: value } as RememberMe;
	localStorage.setItem("remember-me", JSON.stringify(rememberMe));
}
