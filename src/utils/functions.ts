import { useLocalStorage } from "@hooks/Storage";
import { ThemeType, Time } from "@interfaces/interface";

export function validEmail(email: string | undefined | null) {
	return (
		typeof email === "string" &&
		!!email.length &&
		!!RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/).exec(email)
	);
}

export function validPassword(password: string | undefined | null) {
	return (
		typeof password === "string" &&
		6 <= password.length &&
		password.length <= 16
	);
}

export function checkEmail(email: string | undefined | null) {
	return typeof email === "string" && email.length && validEmail(email)
		? email
		: "";
}

export function checkPassword(password: string | undefined | null) {
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
