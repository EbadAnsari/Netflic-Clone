import { Time } from "@interfaces/interface";

export function checkEmail(email: string | undefined | null) {
	return email &&
		RegExp(/^[a-zA-Z0-9._]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]{2,5}$/).exec(email)
		? email
		: "";
}

export function checkPassword(password: string | undefined | null) {
	return password && 6 <= password.length && password.length <= 16
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
