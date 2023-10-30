import { ThemeType, Time } from "@interfaces/interface";
import { resolve } from "path";
import { MouseEvent } from "react";

type ValidationInputString = string | undefined | null;

export function validEmail(email: ValidationInputString) {
	return (
		typeof email === "string" &&
		!!email.length &&
		!!RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/).exec(email)
	);
}

export function validPassword(password: ValidationInputString) {
	return (
		typeof password === "string" &&
		6 <= password.length &&
		password.length <= 16
	);
}

export function checkEmail(email: ValidationInputString) {
	return typeof email === "string" && email.length && validEmail(email)
		? email
		: "";
}

export function checkPassword(password: ValidationInputString) {
	return typeof password === "string" && validPassword(password)
		? password
		: "";
}

export const secondsToMinutes: (second: number) => Time = (second: number) => ({
	hour: parseInt(second / 3600 + "") || undefined,
	minute: parseInt(((second / 60) % 60) + "") || undefined,
	second: second % 60 || undefined,
});

export async function sleep(duration: number) {
	return new Promise<boolean>((resolve, reject) => {
		setTimeout(() => {
			resolve(true);
		}, duration);
	});
}

export function useTheme() {
	let currentTheme: ThemeType = "";

	function set(mode: ThemeType) {
		document.getElementsByTagName("html")[0].setAttribute("class", mode);
		localStorage.setItem("theme", mode);
	}

	return {
		setTheme(mode: ThemeType) {
			currentTheme = mode;
			set(mode);
		},
		getTheme() {
			return currentTheme;
		},
		toggleTheme() {
			currentTheme = currentTheme === "dark" ? "light" : "dark";
			set(currentTheme);
		},
		theme(): ThemeType {
			const theme: ThemeType = localStorage.getItem("theme") as ThemeType;
			return theme === "dark" || theme === "light" ? theme : "light";
		},
	};
}

export function isMobileDevice() {
	return (
		navigator.maxTouchPoints > 0 &&
		/Android|iPhone/i.test(navigator.userAgent) &&
		matchMedia("(pointer:coarse)").matches
	);
}

export function titlCase(text: string) {
	return text.at(0)?.toUpperCase() + text.substring(1);
}

export function generateRamdomNumber(start: number, end?: number) {
	return Math.floor(
		end && start < end
			? Math.random() * (end - start + 1) - start
			: Math.random() * start + 1,
	);
}

type LineClamps = 1 | 2 | 3 | 4 | 5 | 6;

export function toggleLineClamp(
	lineClamps: {
		[key: string]: LineClamps | undefined;
		xs?: LineClamps;
		sm?: LineClamps;
		md?: LineClamps;
		lg?: LineClamps;
		xl?: LineClamps;
		"2xl"?: LineClamps;
	},
	event: MouseEvent,
) {
	for (const lineClamp in lineClamps) {
		(event.target as HTMLElement).classList.toggle(
			`${lineClamp === "xs" ? "" : lineClamp + ":"}line-clamp-${
				lineClamps[lineClamp]
			}`,
		);
	}
}

export async function halt() {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, 0);
	});
}
